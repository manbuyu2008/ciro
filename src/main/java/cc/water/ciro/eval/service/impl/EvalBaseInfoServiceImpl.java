package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.DateUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UserUtil;
import cc.water.ciro.common.utils.UtilDate;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.common.EvalCommonHelper;
import cc.water.ciro.eval.domain.*;
import cc.water.ciro.eval.enums.*;
import cc.water.ciro.eval.mapper.*;
import cc.water.ciro.eval.query.EvalBaseInfoQuery;
import cc.water.ciro.eval.query.EvalEventEnumQuery;
import cc.water.ciro.eval.query.EvalEventQuery;
import cc.water.ciro.eval.service.*;
import cc.water.ciro.system.dao.DeptDao;
import cc.water.ciro.system.dao.UserDao;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.service.ParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalBaseInfoServiceImpl extends BaseService implements EvalBaseInfoService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private DeptDao deptDao;
    @Autowired
    private EvalBaseInfoDao evalBaseInfoDao;
    @Autowired
    private EvalFlowDao evalFlowDao;
    @Autowired
    private EvalZqDao evalZqDao;
    @Autowired
    private EvalUserTypeDao evalUserTypeDao;
    @Autowired
    private EvalSelfEnumDao evalSelfEnumDao;
    @Autowired
    private EvalEventEnumDao evalEventEnumDao;
    @Autowired
    private EvalEventDao evalEventDao;
    @Autowired
    private EvalLevelDao evalLevelDao;
    @Autowired
    private EvalSelfScoreStdDao evalSelfScoreStdDao;
    @Autowired
    private EvalEventEnumService evalEventEnumService;
    @Autowired
    private EvalZqService evalZqService;
    @Autowired
    private EvalFlowService evalFlowService;
    @Autowired
    private EvalEventService evalEventService;
    @Autowired
    private ParamService paramService;

    public void addEvalBaseInfo(EvalBaseInfo evalBaseInfo) {
        evalBaseInfo.setCreateDate(new Date());
        evalBaseInfoDao.insertSelective(evalBaseInfo);
    }

    @Override
    public EvalBaseViewParam checkFlowStatus(Model model, EvalFlow evalFlow, EvalBaseInfo evalBaseInfo, EvalListTypeEnum listTypeEnum, Long userId) {
        EvalBaseViewParam baseViewParam = new EvalBaseViewParam();
        EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalBaseInfo.getPeriodId()));
        if (evalFlow == null || evalBaseInfo == null || listTypeEnum == null) {
            baseViewParam.setListSelfView(false);
            baseViewParam.setListSelfEdit(false);
            baseViewParam.setListKsView(false);
            baseViewParam.setListKsEdit(false);
            baseViewParam.setListDkView(false);
            baseViewParam.setListDkEdit(false);
            baseViewParam.setListDwView(false);
            baseViewParam.setListDwEdit(false);
            baseViewParam.setCanEdit(false);
        } else if (evalBaseInfo.getStatus() < EvalFlowStatusEnum.KP_ME_SUBMIT.getValue()) {      /*流程在个人自评*/
            baseViewParam.setListKsView(false);
            baseViewParam.setListKsEdit(false);
            baseViewParam.setListDkView(false);
            baseViewParam.setListDkEdit(false);
            baseViewParam.setListDwView(false);
            baseViewParam.setListDwEdit(false);
            if (listTypeEnum == EvalListTypeEnum.selfAdmin) {
                baseViewParam.setListSelfView(true);
                baseViewParam.setListSelfEdit(true);
                baseViewParam.setCanEdit(true);
            } else if (listTypeEnum == EvalListTypeEnum.self && evalBaseInfo.getUserId().equals(userId)) {
                baseViewParam.setListSelfView(true);
                baseViewParam.setListSelfEdit(true);
                baseViewParam.setCanEdit(true);
            } else {
                baseViewParam.setListSelfView(true);
                baseViewParam.setListSelfEdit(false);
                baseViewParam.setCanEdit(false);
            }
        } else if (evalBaseInfo.getStatus() < EvalFlowStatusEnum.KP_KS_SUBMIT.getValue()) {  /*流程在科室考评*/
            baseViewParam.setListSelfView(true);
            baseViewParam.setListSelfEdit(false);
            baseViewParam.setListDkView(false);
            baseViewParam.setListDkEdit(false);
            baseViewParam.setListDwView(false);
            baseViewParam.setListDwEdit(false);

            if (listTypeEnum == EvalListTypeEnum.ks) {
                baseViewParam.setListKsView(true);
                baseViewParam.setListKsEdit(true);
                baseViewParam.setCanEdit(true);
            } else {
                baseViewParam.setListKsView(false);
                baseViewParam.setListKsEdit(false);
                baseViewParam.setCanEdit(false);
            }
        } else if (evalBaseInfo.getStatus() < EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue()) {     /*流程在大科室考评*/
            baseViewParam.setListSelfView(true);
            baseViewParam.setListSelfEdit(false);
            if (evalFlow.getKsEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListKsView(true);
                baseViewParam.setListKsEdit(false);
            } else {
                baseViewParam.setListKsView(false);
                baseViewParam.setListKsEdit(false);
            }
            baseViewParam.setListDwView(false);
            baseViewParam.setListDwEdit(false);

            if (listTypeEnum == EvalListTypeEnum.dk) {
                baseViewParam.setListDkView(true);
                baseViewParam.setListDkEdit(true);
                baseViewParam.setCanEdit(true);
            } else {
                baseViewParam.setListDkView(false);
                baseViewParam.setListDkEdit(false);
                baseViewParam.setCanEdit(false);
            }
        } else if (evalBaseInfo.getStatus() < EvalFlowStatusEnum.KP_END.getValue()) {      /*流程在单位考评*/
            baseViewParam.setListSelfView(true);
            baseViewParam.setListSelfEdit(false);
            if (evalFlow.getKsEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListKsView(true);
                baseViewParam.setListKsEdit(false);
            } else {
                baseViewParam.setListKsView(false);
                baseViewParam.setListKsEdit(false);
            }
            if (evalFlow.getDkEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListDkView(true);
                baseViewParam.setListDkEdit(false);
            } else {
                baseViewParam.setListDkView(false);
                baseViewParam.setListDkEdit(false);
            }
            if (listTypeEnum == EvalListTypeEnum.dw) {
                baseViewParam.setListDwView(true);
                baseViewParam.setListDwEdit(true);
                baseViewParam.setCanEdit(true);
            } else {
                baseViewParam.setListDwView(false);
                baseViewParam.setListDwEdit(false);
                baseViewParam.setCanEdit(false);
            }
        } else if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_END.getValue()) {      /*流程结束*/
            baseViewParam.setListSelfView(true);
            baseViewParam.setListSelfEdit(false);
            baseViewParam.setCanEdit(false);
            if (evalFlow.getKsEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListKsView(true);
                baseViewParam.setListKsEdit(false);
            } else {
                baseViewParam.setListKsView(false);
                baseViewParam.setListKsEdit(false);
            }
            if (evalFlow.getDkEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListDkView(true);
                baseViewParam.setListDkEdit(false);
            } else {
                baseViewParam.setListDkView(false);
                baseViewParam.setListDkEdit(false);
            }
            if (evalFlow.getCorpEval().equals(BooleanEnum.YES.getCode())) {
                baseViewParam.setListDwView(true);
                baseViewParam.setListDwEdit(false);
            } else {
                baseViewParam.setListDwView(false);
                baseViewParam.setListDwEdit(false);
            }
        }
        if (evalZq.getStatus().equals(EvalZqStatusEnum.END.getCode())) {
            baseViewParam.setCanEdit(false);
        }
         /*基础分项目明细*/
        User user = userDao.selectUserByKey(evalBaseInfo.getUserId());
        List<EvalSelfScoreStd> evalSelfScoreStdList = new ArrayList<EvalSelfScoreStd>();
        if(user!=null&&user.getEvalType()!=0) {
            EvalSelfScoreStdExample selfScoreStdExample = new EvalSelfScoreStdExample();
            EvalSelfScoreStdExample.Criteria selfScoreStdExampleCriteria = selfScoreStdExample.createCriteria();
            selfScoreStdExampleCriteria.andUserTypeIdEqualTo(String.valueOf(user.getEvalType()));
            evalSelfScoreStdList = evalSelfScoreStdDao.selectByExample(selfScoreStdExample);
        }
        evalBaseInfo.setSelfScoreStdList(evalSelfScoreStdList);

        /*科室加减分明细*/
        if (baseViewParam.isListKsView()) {
            List<EvalEventEnum> addKsEnumList = new ArrayList<EvalEventEnum>();
            List<EvalEventEnum> delKsEnumList = new ArrayList<EvalEventEnum>();
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_KS_WAIT.getValue()) {
                EvalEventQuery evalEventQuery = new EvalEventQuery();
                evalEventQuery.setPageSize(9999);
                evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                evalEventQuery.setStatus(EvalRoleEnum.ks.getCode());
                evalEventQuery.setTypeId(EvalEventTypeEnum.jiafen.getCode());
                evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                    for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                        EvalEventEnum evalEventEnum = new EvalEventEnum();
                        evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                        evalEventEnum.setEventDate(evalEvent.getEventDate());
                        evalEventEnum.setEventName(evalEvent.getEventName());
                        evalEventEnum.setScore(evalEvent.getQrScore());
                        evalEventEnum.setStdId(evalEvent.getStdId());
                        evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                        evalEventEnum.setType(evalEvent.getTypeId());
                        evalEventEnum.setStatus(evalEvent.getStatus());
                        evalEventEnum.setEventId(evalEvent.getId());
                        addKsEnumList.add(evalEventEnum);
                    }
                }
                evalEventQuery.setTypeId(EvalEventTypeEnum.jianfen.getCode());
                Pagination<EvalEvent> evalDelEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                if (evalDelEventPagination != null && evalDelEventPagination.getRows() != null) {
                    for (EvalEvent evalEvent : evalDelEventPagination.getRows()) {
                        EvalEventEnum evalEventEnum = new EvalEventEnum();
                        evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                        evalEventEnum.setEventDate(evalEvent.getEventDate());
                        evalEventEnum.setEventName(evalEvent.getEventName());
                        evalEventEnum.setScore(evalEvent.getQrScore());
                        evalEventEnum.setStdId(evalEvent.getStdId());
                        evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                        evalEventEnum.setType(evalEvent.getTypeId());
                        evalEventEnum.setStatus(evalEvent.getStatus());
                        evalEventEnum.setEventId(evalEvent.getId());
                        delKsEnumList.add(evalEventEnum);
                    }
                }
            } else {
                EvalEventEnumQuery evalEventEnumQuery = new EvalEventEnumQuery();
                evalEventEnumQuery.setParentId(String.valueOf(evalBaseInfo.getId()));
                evalEventEnumQuery.setStatus(EvalListTypeEnum.ks.getCode());
                evalEventEnumQuery.setType(EvalEventTypeEnum.jiafen.getCode());
                Pagination<EvalEventEnum> paginationAdd = evalEventEnumService.getEvalEventEnumWithPage(evalEventEnumQuery);
                if (paginationAdd != null && paginationAdd.getRows() != null)
                    addKsEnumList.addAll(paginationAdd.getRows());

                evalEventEnumQuery.setType(EvalEventTypeEnum.jianfen.getCode());
                Pagination<EvalEventEnum> paginationDel = evalEventEnumService.getEvalEventEnumWithPage(evalEventEnumQuery);
                if (paginationDel != null && paginationDel.getRows() != null)
                    delKsEnumList.addAll(paginationDel.getRows());
            }
            evalBaseInfo.setAddKsEnumList(addKsEnumList);
            evalBaseInfo.setDelKsEnumList(delKsEnumList);
            model.addAttribute("evalZq", evalZq);
        }
          /*大科加减分数据*/
        if (baseViewParam.isListDkView()) {
            List<EvalEventEnum> addDkEnumList = new ArrayList<EvalEventEnum>();
            List<EvalEventEnum> delDkEnumList = new ArrayList<EvalEventEnum>();
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DKS_WAIT.getValue()) {
                EvalEventQuery evalEventQuery = new EvalEventQuery();
                evalEventQuery.setPageSize(9999);
                evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                evalEventQuery.setStatus(EvalRoleEnum.dk.getCode());
                evalEventQuery.setTypeId(EvalEventTypeEnum.jiafen.getCode());
                evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                    for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                        EvalEventEnum evalEventEnum = new EvalEventEnum();
                        evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                        evalEventEnum.setEventDate(evalEvent.getEventDate());
                        evalEventEnum.setEventName(evalEvent.getEventName());
                        evalEventEnum.setScore(evalEvent.getQrScore());
                        evalEventEnum.setStdId(evalEvent.getStdId());
                        evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                        evalEventEnum.setType(evalEvent.getTypeId());
                        evalEventEnum.setStatus(evalEvent.getStatus());
                        evalEventEnum.setEventId(evalEvent.getId());
                        addDkEnumList.add(evalEventEnum);
                    }
                }
                evalEventQuery.setTypeId(EvalEventTypeEnum.jianfen.getCode());
                Pagination<EvalEvent> evalDelEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                if (evalDelEventPagination != null && evalDelEventPagination.getRows() != null) {
                    for (EvalEvent evalEvent : evalDelEventPagination.getRows()) {
                        EvalEventEnum evalEventEnum = new EvalEventEnum();
                        evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                        evalEventEnum.setEventDate(evalEvent.getEventDate());
                        evalEventEnum.setEventName(evalEvent.getEventName());
                        evalEventEnum.setScore(evalEvent.getQrScore());
                        evalEventEnum.setStdId(evalEvent.getStdId());
                        evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                        evalEventEnum.setType(evalEvent.getTypeId());
                        evalEventEnum.setStatus(evalEvent.getStatus());
                        evalEventEnum.setEventId(evalEvent.getId());
                        delDkEnumList.add(evalEventEnum);
                    }
                }
            } else {
                EvalEventEnumQuery evalEventEnumQuery = new EvalEventEnumQuery();
                evalEventEnumQuery.setParentId(String.valueOf(evalBaseInfo.getId()));
                evalEventEnumQuery.setStatus(EvalListTypeEnum.dk.getCode());
                evalEventEnumQuery.setType(EvalEventTypeEnum.jiafen.getCode());
                Pagination<EvalEventEnum> paginationAdd = evalEventEnumService.getEvalEventEnumWithPage(evalEventEnumQuery);
                if (paginationAdd != null && paginationAdd.getRows() != null)
                    addDkEnumList.addAll(paginationAdd.getRows());

                evalEventEnumQuery.setType(EvalEventTypeEnum.jianfen.getCode());
                Pagination<EvalEventEnum> paginationDel = evalEventEnumService.getEvalEventEnumWithPage(evalEventEnumQuery);
                if (paginationDel != null && paginationDel.getRows() != null)
                    delDkEnumList.addAll(paginationDel.getRows());
            }
            evalBaseInfo.setAddDkEnumList(addDkEnumList);
            evalBaseInfo.setDelDkEnumList(delDkEnumList);

            model.addAttribute("evalZq", evalZq);
        }

          /*一票认定较差*/
        if (baseViewParam.isListDwView()) {
            List<EvalEventEnum> dwEnumList = new ArrayList<EvalEventEnum>();
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_WAIT.getValue()) {
                EvalEventQuery evalEventQuery = new EvalEventQuery();
                evalEventQuery.setPageSize(9999);
                evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                evalEventQuery.setStatus(EvalRoleEnum.dw.getCode());
                evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                    for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                        EvalEventEnum evalEventEnum = new EvalEventEnum();
                        evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                        evalEventEnum.setEventDate(evalEvent.getEventDate());
                        evalEventEnum.setEventName(evalEvent.getEventName());
                        evalEventEnum.setScore(evalEvent.getQrScore());
                        evalEventEnum.setStdId(evalEvent.getStdId());
                        evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                        evalEventEnum.setType(evalEvent.getTypeId());
                        evalEventEnum.setStatus(evalEvent.getStatus());
                        evalEventEnum.setEventId(evalEvent.getId());
                        dwEnumList.add(evalEventEnum);
                    }
                }
            } else {
                EvalEventEnumQuery evalEventEnumQuery = new EvalEventEnumQuery();
                evalEventEnumQuery.setParentId(String.valueOf(evalBaseInfo.getId()));
                evalEventEnumQuery.setStatus(EvalListTypeEnum.dw.getCode());
                Pagination<EvalEventEnum> paginationAdd = evalEventEnumService.getEvalEventEnumWithPage(evalEventEnumQuery);
                if (paginationAdd != null && paginationAdd.getRows() != null)
                    dwEnumList.addAll(paginationAdd.getRows());
            }
            evalBaseInfo.setDwEnumList(dwEnumList);
            model.addAttribute("evalZq", evalZq);
        }

        model.addAttribute("baseViewParam", baseViewParam);
        return baseViewParam;
    }

    @Transactional(readOnly = true)
    public EvalBaseInfo getEvalBaseInfoByKey(Long id) {
        EvalBaseInfo evalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(id);
        if (evalBaseInfo != null) {
            EvalSelfEnumExample selfEnumExample = new EvalSelfEnumExample();
            EvalSelfEnumExample.Criteria selfEnumExampleCriteria = selfEnumExample.createCriteria();
            selfEnumExampleCriteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
            List<EvalSelfEnum> selfEnumList = evalSelfEnumDao.selectByExample(selfEnumExample);
            evalBaseInfo.setSelfEnumList(selfEnumList);

            evalBaseInfo.setEvalZq(evalZqDao.selectByPrimaryKey(Long.valueOf(evalBaseInfo.getPeriodId())));
            evalBaseInfo.setUser(userDao.selectUserByKey(evalBaseInfo.getUserId()));
            evalBaseInfo.setKsUser(userDao.selectUserByKey(evalBaseInfo.getKsUserId()));
            evalBaseInfo.setDkUser(userDao.selectUserByKey(evalBaseInfo.getDkUserId()));
            evalBaseInfo.setDwUser(userDao.selectUserByKey(evalBaseInfo.getDwUserId()));
            evalBaseInfo.setKsDept(deptDao.selectByPrimaryKey(Long.valueOf(evalBaseInfo.getKs())));
        }
        return evalBaseInfo;
    }

    @Transactional(readOnly = true)
    public List<EvalBaseInfo> getEvalBaseInfoByKeys(List<Long> ids) {
        EvalBaseInfoExample example = new EvalBaseInfoExample();
        EvalBaseInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        return evalBaseInfoDao.selectByExample(example);
    }

    public void deleteEvalBaseInfoByKey(Long id) {
        EvalSelfEnumExample example = new EvalSelfEnumExample();
        EvalSelfEnumExample.Criteria criteria = example.createCriteria();
        criteria.andParentIdEqualTo(String.valueOf(id));
        evalSelfEnumDao.deleteByExample(example);
        evalBaseInfoDao.deleteByPrimaryKey(id);
    }

    public void deleteEvalBaseInfoByKeys(List<Long> ids) {
        EvalBaseInfoExample example = new EvalBaseInfoExample();
        EvalBaseInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        evalBaseInfoDao.deleteByExample(example);
    }

    public void updateEvalBaseInfoByKey(EvalBaseInfo evalBaseInfo) {
        evalBaseInfoDao.updateByPrimaryKey(evalBaseInfo);
    }

    @Transactional(readOnly = true)
    public Pagination getEvalBaseInfoWithPage(EvalBaseInfoQuery evalBaseInfoQuery) {
        EvalBaseInfoExample example = new EvalBaseInfoExample();
        example.setOffset(evalBaseInfoQuery.getStartRow());
        example.setLimit(evalBaseInfoQuery.getPageSize());
        EvalBaseInfoExample.Criteria criteria = example.createCriteria();
        if (evalBaseInfoQuery.getIds() != null) {
            criteria.andIdIn(convertToLong(evalBaseInfoQuery.getIds()));
        }
        if (evalBaseInfoQuery.getUserId() != null && StringUtil.isNotEmptyEx(evalBaseInfoQuery.getUserId())) {
            criteria.andUserIdEqualTo(NumberUtil.parseLong(evalBaseInfoQuery.getUserId()));
        }
        if (evalBaseInfoQuery.getPeriodId() != null && StringUtil.isNotEmptyEx(evalBaseInfoQuery.getPeriodId())) {
            criteria.andPeriodIdEqualTo(evalBaseInfoQuery.getPeriodId());
        }
        if (evalBaseInfoQuery.getKsList() != null && evalBaseInfoQuery.getKsList().size() > 0) {
            criteria.andKsIn(evalBaseInfoQuery.getKsList());
        }
        if (evalBaseInfoQuery.get_sql() != null) {
            example.set_sql(evalBaseInfoQuery.get_sql());
        }
        example.setOrderByClause("period_id desc,STATUS,ks,id");
        Pagination<EvalBaseInfo> pagination = new Pagination<EvalBaseInfo>(evalBaseInfoQuery.getPageNo(), evalBaseInfoQuery.getPageSize(), evalBaseInfoDao.countByExample(example));
        List<EvalBaseInfo> evalBaseInfoList = evalBaseInfoDao.selectByExample(example);
        if (evalBaseInfoList != null) {
            for (EvalBaseInfo evalBaseInfo : evalBaseInfoList) {
                EvalSelfEnumExample selfEnumExample = new EvalSelfEnumExample();
                EvalSelfEnumExample.Criteria selfEnumExampleCriteria = selfEnumExample.createCriteria();
                selfEnumExampleCriteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
                List<EvalSelfEnum> selfEnumList = evalSelfEnumDao.selectByExample(selfEnumExample);
                evalBaseInfo.setSelfEnumList(selfEnumList);
                evalBaseInfo.setEvalZq(evalZqDao.selectByPrimaryKey(Long.valueOf(evalBaseInfo.getPeriodId())));
                evalBaseInfo.setUser(userDao.selectUserByKey(evalBaseInfo.getUserId()));
                evalBaseInfo.setKsUser(userDao.selectUserByKey(evalBaseInfo.getKsUserId()));
                evalBaseInfo.setDkUser(userDao.selectUserByKey(evalBaseInfo.getDkUserId()));
                evalBaseInfo.setDwUser(userDao.selectUserByKey(evalBaseInfo.getDwUserId()));
                evalBaseInfo.setKsDept(deptDao.selectByPrimaryKey(Long.valueOf(evalBaseInfo.getKs())));
            }
        }
        pagination.setRows(evalBaseInfoList);
        return pagination;
    }

    @Override
    public int getEvalBaseInfoCount(EvalBaseInfoQuery evalBaseInfoQuery) {
        EvalBaseInfoExample example = new EvalBaseInfoExample();
        EvalBaseInfoExample.Criteria criteria = example.createCriteria();
        if (evalBaseInfoQuery.getIds() != null) {
            criteria.andIdIn(convertToLong(evalBaseInfoQuery.getIds()));
        }
        if (evalBaseInfoQuery.getPeriodId() != null) {
            criteria.andPeriodIdEqualTo(evalBaseInfoQuery.getPeriodId());
        }
        if (evalBaseInfoQuery.getStatus() != null) {
            criteria.andStatusEqualTo(Integer.valueOf(evalBaseInfoQuery.getStatus()));
        }
        return evalBaseInfoDao.countByExample(example);
    }

    @Override
    public void rejectKs(ActionContext context) throws Exception {
        String id = context.getRequest().getParameter("id");
        if (StringUtil.isNotEmptyEx(id)) {
            EvalBaseInfo baseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(id));
            if (baseInfo == null) {
                throw new Exception("考评数据不存在！");
            }
            EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(baseInfo.getFlowId());
            //流程操作记录信息
            Long userId = context.getActiveUser().getUserid();
            EvalEventEnumExample example = new EvalEventEnumExample();
            EvalEventEnumExample.Criteria criteria = example.createCriteria();
            criteria.andParentIdEqualTo(String.valueOf(baseInfo.getId()));
            criteria.andStatusEqualTo(EvalRoleEnum.ks.getCode());
            evalEventEnumDao.deleteByExample(example);
            baseInfo.setStatus(EvalCommonHelper.getPreNode(evalFlow, baseInfo.getStatus()));
            baseInfo.setKsScore(null);
            baseInfo.setKsUserId(null);
            baseInfo.setKsLv("");
            baseInfo.setKsAdvice("");
            baseInfo.setKsLv("");
            evalBaseInfoDao.updateByPrimaryKey(baseInfo);
        }
    }

    @Override
    public void rejectDk(ActionContext context) throws Exception {
        String id = context.getRequest().getParameter("id");
        if (StringUtil.isNotEmptyEx(id)) {
            EvalBaseInfo baseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(id));
            if (baseInfo == null) {
                throw new Exception("考评数据不存在！");
            }
            EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(baseInfo.getFlowId());
            //流程操作记录信息
            Long userId = context.getActiveUser().getUserid();
            EvalEventEnumExample example = new EvalEventEnumExample();
            EvalEventEnumExample.Criteria criteria = example.createCriteria();
            criteria.andParentIdEqualTo(String.valueOf(baseInfo.getId()));
            criteria.andStatusEqualTo(EvalRoleEnum.dk.getCode());
            evalEventEnumDao.deleteByExample(example);
            baseInfo.setStatus(EvalCommonHelper.getPreNode(evalFlow, baseInfo.getStatus()));
            baseInfo.setDkScore(null);
            baseInfo.setDkUserId(null);
            baseInfo.setDkLv("");
            baseInfo.setDkAdvice("");
            baseInfo.setDkLv("");
            evalBaseInfoDao.updateByPrimaryKey(baseInfo);
        }
    }

    @Override
    public void rejectDw(ActionContext context) throws Exception {
        String id = context.getRequest().getParameter("id");
        if (StringUtil.isNotEmptyEx(id)) {
            EvalBaseInfo baseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(id));
            if (baseInfo == null) {
                throw new Exception("考评数据不存在！");
            }
            EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(baseInfo.getFlowId());
            //流程操作记录信息
            Long userId = context.getActiveUser().getUserid();
            EvalEventEnumExample example = new EvalEventEnumExample();
            EvalEventEnumExample.Criteria criteria = example.createCriteria();
            criteria.andParentIdEqualTo(String.valueOf(baseInfo.getId()));
            criteria.andStatusEqualTo(EvalRoleEnum.dw.getCode());
            evalEventEnumDao.deleteByExample(example);
            baseInfo.setStatus(EvalCommonHelper.getPreNode(evalFlow, baseInfo.getStatus()));
            baseInfo.setCorpScore(null);
            baseInfo.setDwUserId(null);
            baseInfo.setCorpLv("");
            baseInfo.setCorpAdvice("");
            baseInfo.setCorpLv("");
            evalBaseInfoDao.updateByPrimaryKey(baseInfo);
        }
    }

    @Override
    public void cancelDw(ActionContext context) throws Exception {
        String id = context.getRequest().getParameter("id");
        if (StringUtil.isNotEmptyEx(id)) {
            EvalBaseInfo baseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(id));
            if (baseInfo == null) {
                throw new Exception("考评数据不存在！");
            }
            EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(baseInfo.getFlowId());
            baseInfo.setStatus(EvalCommonHelper.getPreNode(evalFlow, baseInfo.getStatus()));
            evalBaseInfoDao.updateByPrimaryKey(baseInfo);
        }
    }

    @Override
    public EvalBaseInfo saveSelf(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception {
        boolean isNew = evalBaseInfo.getId() == 0;
        checkSelfSave(evalBaseInfo, isNew);
        if (isNew) {
            checkSelfBean(evalBaseInfo);
            evalBaseInfo.setSelfDate(new Date());
            addEvalBaseInfo(evalBaseInfo);
            List<EvalSelfEnum> evalSelfEnumList = readEnumsFromMap(context, evalBaseInfo.getId());
            if (evalSelfEnumList.size() > 0) {
                evalSelfEnumDao.insertBatch(evalSelfEnumList);
            }
            evalBaseInfo.setSelfEnumList(evalSelfEnumList);
        } else {
            updateEvalBaseInfoByKey(evalBaseInfo);
            List<EvalSelfEnum> evalSelfEnumList = readEnumsFromMap(context, evalBaseInfo.getId());
            EvalSelfEnumExample example = new EvalSelfEnumExample();
            EvalSelfEnumExample.Criteria criteria = example.createCriteria();
            criteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
            evalSelfEnumDao.deleteByExample(example);
            if (evalSelfEnumList.size() > 0) {
                evalSelfEnumDao.insertBatch(evalSelfEnumList);
            }
            evalBaseInfo.setSelfEnumList(evalSelfEnumList);
        }
        return evalBaseInfo;
    }

    @Override
    public EvalBaseInfo saveKs(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception {
        checkKsBean(evalBaseInfo);
        EvalBaseInfo oldEvalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(evalBaseInfo.getId());
        if (oldEvalBaseInfo == null) throw new Exception("考评数据不存在");
        EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(oldEvalBaseInfo.getFlowId());
        oldEvalBaseInfo.setKsLv(evalBaseInfo.getKsLv());
        oldEvalBaseInfo.setKsScore(evalBaseInfo.getKsScore());
        oldEvalBaseInfo.setKsAdvice(evalBaseInfo.getKsAdvice());
        oldEvalBaseInfo.setKsUserId(context.getActiveUser().getUserid());
        oldEvalBaseInfo.setKsDate(new Date());
        int status = EvalCommonHelper.getNextNode(evalFlow, evalBaseInfo.getStatus());
        oldEvalBaseInfo.setStatus(status);
        if (status == EvalFlowStatusEnum.KP_END.getValue()) {
            oldEvalBaseInfo.setEvalLv(evalBaseInfo.getDkLv());
            oldEvalBaseInfo.setScore(evalBaseInfo.getDkScore());
        }
        updateEvalBaseInfoByKey(oldEvalBaseInfo);

        List<EvalEventEnum> evalKsAddEnumList = readKsAddEnumsFromMap(context, evalBaseInfo.getId());
        List<EvalEventEnum> evalKsDelEnumList = readKsDelEnumsFromMap(context, evalBaseInfo.getId());
        EvalEventEnumExample example = new EvalEventEnumExample();
        EvalEventEnumExample.Criteria criteria = example.createCriteria();
        criteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
        criteria.andStatusEqualTo(EvalRoleEnum.ks.getCode());
        evalEventEnumDao.deleteByExample(example);
        List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
        evalEventEnumList.addAll(evalKsAddEnumList);
        evalEventEnumList.addAll(evalKsDelEnumList);
        if (evalEventEnumList.size() > 0) {
            evalEventEnumDao.insertBatch(evalEventEnumList);
        }
        oldEvalBaseInfo.setAddKsEnumList(evalKsAddEnumList);
        oldEvalBaseInfo.setDelKsEnumList(evalKsDelEnumList);
        return oldEvalBaseInfo;
    }

    @Override
    public void saveAutoKs(String ids, ActionContext context) throws Exception {
        if (UtilPub.isNotEmpty(ids)) {
            String[] mid = ids.split(",");
            for (String smid : mid) {
                EvalBaseInfo evalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(smid));
                if (evalBaseInfo == null) throw new Exception("考评数据不存在");
                        /*系统初始化分数*/
                EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalBaseInfo.getPeriodId()));
                if (evalZq == null) throw new Exception("考评期间不存在");
                EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
                if (evalFlow == null) throw new Exception("考评流程不存在");
                if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_KS_WAIT.getValue()) {
                    /*科室加减分*/
                    String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
                    BigDecimal scoreEnumSum = NumberUtil.parseBigDecimal(initScore);
                    List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
                    List<EvalEventEnum> evalKsAddEnumList = new ArrayList<EvalEventEnum>();
                    List<EvalEventEnum> evalKsDelEnumList = new ArrayList<EvalEventEnum>();
                    EvalEventQuery evalEventQuery = new EvalEventQuery();
                    evalEventQuery.setPageSize(9999);
                    evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                    evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                    evalEventQuery.setStatus(EvalRoleEnum.ks.getCode());
                    evalEventQuery.setTypeId(EvalEventTypeEnum.jiafen.getCode());
                    evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                    evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                    Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                    if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                        for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                            EvalEventEnum evalEventEnum = new EvalEventEnum();
                            evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                            evalEventEnum.setEventDate(evalEvent.getEventDate());
                            evalEventEnum.setEventName(evalEvent.getEventName());
                            evalEventEnum.setScore(evalEvent.getQrScore());
                            evalEventEnum.setStdId(evalEvent.getStdId());
                            evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                            evalEventEnum.setType(evalEvent.getTypeId());
                            evalEventEnum.setStatus(evalEvent.getStatus());
                            evalEventEnum.setEventId(evalEvent.getId());
                            evalKsAddEnumList.add(evalEventEnum);
                            scoreEnumSum = scoreEnumSum.add(evalEvent.getQrScore());
                        }
                    }
                    evalEventQuery.setTypeId(EvalEventTypeEnum.jianfen.getCode());
                    Pagination<EvalEvent> evalDelEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                    if (evalDelEventPagination != null && evalDelEventPagination.getRows() != null) {
                        for (EvalEvent evalEvent : evalDelEventPagination.getRows()) {
                            EvalEventEnum evalEventEnum = new EvalEventEnum();
                            evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                            evalEventEnum.setEventDate(evalEvent.getEventDate());
                            evalEventEnum.setEventName(evalEvent.getEventName());
                            evalEventEnum.setScore(evalEvent.getQrScore());
                            evalEventEnum.setStdId(evalEvent.getStdId());
                            evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                            evalEventEnum.setType(evalEvent.getTypeId());
                            evalEventEnum.setStatus(evalEvent.getStatus());
                            evalEventEnum.setEventId(evalEvent.getId());
                            evalKsDelEnumList.add(evalEventEnum);
                            scoreEnumSum = scoreEnumSum.subtract(evalEvent.getQrScore());
                        }
                    }
                     /*科室加减分插入*/
                    EvalEventEnumExample enumExample = new EvalEventEnumExample();
                    EvalEventEnumExample.Criteria enumExampleCriteria = enumExample.createCriteria();
                    enumExampleCriteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
                    enumExampleCriteria.andStatusEqualTo(EvalRoleEnum.ks.getCode());
                    evalEventEnumDao.deleteByExample(enumExample);
                    evalEventEnumList.addAll(evalKsAddEnumList);
                    evalEventEnumList.addAll(evalKsDelEnumList);
                    if (evalEventEnumList.size() > 0) {
                        evalEventEnumDao.insertBatch(evalEventEnumList);
                    }
                    evalBaseInfo.setKsScore(scoreEnumSum);
                /*考评等级*/
                    EvalLevelExample example = new EvalLevelExample();
                    EvalLevelExample.Criteria criteria = example.createCriteria();
                    criteria.andBeginScoreLessThanOrEqualTo(evalBaseInfo.getKsScore());
                    criteria.andEndScoreGreaterThanOrEqualTo(evalBaseInfo.getKsScore());
                    List<EvalLevel> levelList = evalLevelDao.selectByExample(example);
                    if (levelList != null && levelList.size() > 0) {
                        evalBaseInfo.setKsLv(String.valueOf(levelList.get(0).getId()));
                    }
                    evalBaseInfo.setKsAdvice("同意");
                }
                evalBaseInfo.setKsUserId(context.getActiveUser().getUserid());
                evalBaseInfo.setKsDate(new Date());
                int status = EvalCommonHelper.getNextNode(evalFlow,EvalFlowStatusEnum.KP_KS_SUBMIT.getValue());
                evalBaseInfo.setStatus(status);
                if (status == EvalFlowStatusEnum.KP_END.getValue()) {
                    evalBaseInfo.setEvalLv(evalBaseInfo.getKsLv());
                    evalBaseInfo.setScore(evalBaseInfo.getKsScore());
                }
                updateEvalBaseInfoByKey(evalBaseInfo);
            }
        }
    }

    @Override
    public void saveAutoDk(String ids, ActionContext context) throws Exception {
        if (UtilPub.isNotEmpty(ids)) {
            String[] mid = ids.split(",");
            for (String smid : mid) {
                EvalBaseInfo evalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(smid));
                if (evalBaseInfo == null) throw new Exception("考评数据不存在");
                        /*系统初始化分数*/
                EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalBaseInfo.getPeriodId()));
                if (evalZq == null) throw new Exception("考评期间不存在");
                EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
                if (evalFlow == null) throw new Exception("考评流程不存在");
                if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DKS_WAIT.getValue()) {
                    /*大科室加减分*/
                    String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
                    BigDecimal scoreEnumSum = NumberUtil.parseBigDecimal(initScore);
                    List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
                    List<EvalEventEnum> evalKsAddEnumList = new ArrayList<EvalEventEnum>();
                    List<EvalEventEnum> evalKsDelEnumList = new ArrayList<EvalEventEnum>();
                    EvalEventQuery evalEventQuery = new EvalEventQuery();
                    evalEventQuery.setPageSize(9999);
                    evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                    evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                    evalEventQuery.setStatus(EvalRoleEnum.dk.getCode());
                    evalEventQuery.setTypeId(EvalEventTypeEnum.jiafen.getCode());
                    evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                    evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                    Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                    if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                        for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                            EvalEventEnum evalEventEnum = new EvalEventEnum();
                            evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                            evalEventEnum.setEventDate(evalEvent.getEventDate());
                            evalEventEnum.setEventName(evalEvent.getEventName());
                            evalEventEnum.setScore(evalEvent.getQrScore());
                            evalEventEnum.setStdId(evalEvent.getStdId());
                            evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                            evalEventEnum.setType(evalEvent.getTypeId());
                            evalEventEnum.setStatus(evalEvent.getStatus());
                            evalEventEnum.setEventId(evalEvent.getId());
                            evalKsAddEnumList.add(evalEventEnum);
                            scoreEnumSum = scoreEnumSum.add(evalEvent.getQrScore());
                        }
                    }
                    evalEventQuery.setTypeId(EvalEventTypeEnum.jianfen.getCode());
                    Pagination<EvalEvent> evalDelEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                    if (evalDelEventPagination != null && evalDelEventPagination.getRows() != null) {
                        for (EvalEvent evalEvent : evalDelEventPagination.getRows()) {
                            EvalEventEnum evalEventEnum = new EvalEventEnum();
                            evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                            evalEventEnum.setEventDate(evalEvent.getEventDate());
                            evalEventEnum.setEventName(evalEvent.getEventName());
                            evalEventEnum.setScore(evalEvent.getQrScore());
                            evalEventEnum.setStdId(evalEvent.getStdId());
                            evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                            evalEventEnum.setType(evalEvent.getTypeId());
                            evalEventEnum.setStatus(evalEvent.getStatus());
                            evalEventEnum.setEventId(evalEvent.getId());
                            evalKsDelEnumList.add(evalEventEnum);
                            scoreEnumSum = scoreEnumSum.subtract(evalEvent.getQrScore());
                        }
                    }
                     /*大科室加减分插入*/
                    EvalEventEnumExample enumExample = new EvalEventEnumExample();
                    EvalEventEnumExample.Criteria enumExampleCriteria = enumExample.createCriteria();
                    enumExampleCriteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
                    enumExampleCriteria.andStatusEqualTo(EvalRoleEnum.dk.getCode());
                    evalEventEnumDao.deleteByExample(enumExample);
                    evalEventEnumList.addAll(evalKsAddEnumList);
                    evalEventEnumList.addAll(evalKsDelEnumList);
                    if (evalEventEnumList.size() > 0) {
                        evalEventEnumDao.insertBatch(evalEventEnumList);
                    }
                    evalBaseInfo.setDkScore(scoreEnumSum);
                /*考评等级*/
                    EvalLevelExample example = new EvalLevelExample();
                    EvalLevelExample.Criteria criteria = example.createCriteria();
                    criteria.andBeginScoreLessThanOrEqualTo(evalBaseInfo.getKsScore());
                    criteria.andEndScoreGreaterThanOrEqualTo(evalBaseInfo.getKsScore());
                    List<EvalLevel> levelList = evalLevelDao.selectByExample(example);
                    if (levelList != null && levelList.size() > 0) {
                        evalBaseInfo.setDkLv(String.valueOf(levelList.get(0).getId()));
                    }
                    evalBaseInfo.setDkAdvice("同意");
                }
                evalBaseInfo.setDkUserId(context.getActiveUser().getUserid());
                evalBaseInfo.setDkDate(new Date());
                int status = EvalCommonHelper.getNextNode(evalFlow, EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue());
                evalBaseInfo.setStatus(status);
                if (status == EvalFlowStatusEnum.KP_END.getValue()) {
                    evalBaseInfo.setEvalLv(evalBaseInfo.getDkLv());
                    evalBaseInfo.setScore(evalBaseInfo.getDkScore());
                }
                updateEvalBaseInfoByKey(evalBaseInfo);
            }
        }
    }

    @Override
    public void saveAutoDw(String ids, ActionContext context) throws Exception {
        if (UtilPub.isNotEmpty(ids)) {
            String[] mid = ids.split(",");
            for (String smid : mid) {
                EvalBaseInfo evalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(Long.valueOf(smid));
                if (evalBaseInfo == null) throw new Exception("考评数据不存在");
                        /*系统初始化分数*/
                EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalBaseInfo.getPeriodId()));
                if (evalZq == null) throw new Exception("考评期间不存在");
                EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
                if (evalFlow == null) throw new Exception("考评流程不存在");
                if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_WAIT.getValue()) {
                    /*单位一票认定较差*/
                    String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
                    BigDecimal scoreEnumSum = NumberUtil.parseBigDecimal(initScore);
                    List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
                    List<EvalEventEnum> evaldwEnumList = new ArrayList<EvalEventEnum>();
                    EvalEventQuery evalEventQuery = new EvalEventQuery();
                    evalEventQuery.setPageSize(9999);
                    evalEventQuery.setUserId(String.valueOf(evalBaseInfo.getUserId()));
                    evalEventQuery.setIsSh(BooleanEnum.YES.getCode());
                    evalEventQuery.setStatus(EvalRoleEnum.dw.getCode());
                    evalEventQuery.setTypeId(EvalEventTypeEnum.yipiao.getCode());
                    evalEventQuery.setBeginDate(DateUtil.parse(evalZq.getEventBegin()));
                    evalEventQuery.setEndDate(DateUtil.parse(evalZq.getEndDate()));
                    Pagination<EvalEvent> evalAddEventPagination = evalEventService.getEvalEventWithPage(evalEventQuery);
                    boolean isContain  = false;
                    if (evalAddEventPagination != null && evalAddEventPagination.getRows() != null) {
                        for (EvalEvent evalEvent : evalAddEventPagination.getRows()) {
                            EvalEventEnum evalEventEnum = new EvalEventEnum();
                            evalEventEnum.setParentId(String.valueOf(evalBaseInfo.getId()));
                            evalEventEnum.setEventDate(evalEvent.getEventDate());
                            evalEventEnum.setEventName(evalEvent.getEventName());
                            evalEventEnum.setScore(evalEvent.getQrScore());
                            evalEventEnum.setStdId(evalEvent.getStdId());
                            evalEventEnum.setFileUrl(evalEvent.getFileUrl());
                            evalEventEnum.setType(evalEvent.getTypeId());
                            evalEventEnum.setStatus(evalEvent.getStatus());
                            evalEventEnum.setEventId(evalEvent.getId());
                            evaldwEnumList.add(evalEventEnum);
                            isContain = true;
                        }
                    }
                     /*单位一票认定较差插入*/
                    EvalEventEnumExample enumExample = new EvalEventEnumExample();
                    EvalEventEnumExample.Criteria enumExampleCriteria = enumExample.createCriteria();
                    enumExampleCriteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
                    enumExampleCriteria.andStatusEqualTo(EvalRoleEnum.dw.getCode());
                    evalEventEnumDao.deleteByExample(enumExample);
                    evalEventEnumList.addAll(evaldwEnumList);
                    if (evalEventEnumList.size() > 0) {
                        evalEventEnumDao.insertBatch(evalEventEnumList);
                    }
                    evalBaseInfo.setCorpScore(scoreEnumSum);
                    /*考评等级*/
                    if(isContain){
                        EvalLevelExample example = new EvalLevelExample();
                        EvalLevelExample.Criteria criteria = example.createCriteria();
                        criteria.andNameEqualTo("较差");
                        List<EvalLevel> levelList = evalLevelDao.selectByExample(example);
                        if (levelList != null && levelList.size() > 0) {
                            evalBaseInfo.setCorpLv(String.valueOf(levelList.get(0).getId()));
                        }
                    }else {
                        EvalLevelExample example = new EvalLevelExample();
                        EvalLevelExample.Criteria criteria = example.createCriteria();
                        criteria.andBeginScoreLessThanOrEqualTo(evalBaseInfo.getKsScore());
                        criteria.andEndScoreGreaterThanOrEqualTo(evalBaseInfo.getKsScore());
                        List<EvalLevel> levelList = evalLevelDao.selectByExample(example);
                        if (levelList != null && levelList.size() > 0) {
                            evalBaseInfo.setCorpLv(String.valueOf(levelList.get(0).getId()));
                        }
                    }
                    evalBaseInfo.setCorpAdvice("同意");
                }
                evalBaseInfo.setDwUserId(context.getActiveUser().getUserid());
                evalBaseInfo.setCorpDate(new Date());
                int status = EvalCommonHelper.getNextNode(evalFlow,EvalFlowStatusEnum.KP_DW_SUBMIT.getValue());
                evalBaseInfo.setStatus(status);
                if (status == EvalFlowStatusEnum.KP_END.getValue()) {
                    evalBaseInfo.setEvalLv(evalBaseInfo.getCorpLv());
                    evalBaseInfo.setScore(evalBaseInfo.getCorpScore());
                }
                updateEvalBaseInfoByKey(evalBaseInfo);
            }
        }
    }

    @Override
    public EvalBaseInfo saveDk(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception {
        checkDksBean(evalBaseInfo);
        EvalBaseInfo oldEvalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(evalBaseInfo.getId());
        if (oldEvalBaseInfo == null) throw new Exception("考评数据不存在");
        EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(oldEvalBaseInfo.getFlowId());
        oldEvalBaseInfo.setDkLv(evalBaseInfo.getDkLv());
        oldEvalBaseInfo.setDkScore(evalBaseInfo.getDkScore());
        oldEvalBaseInfo.setDkAdvice(evalBaseInfo.getDkAdvice());
        oldEvalBaseInfo.setDkUserId(context.getActiveUser().getUserid());
        oldEvalBaseInfo.setDkDate(new Date());
        int status = EvalCommonHelper.getNextNode(evalFlow, evalBaseInfo.getStatus());
        oldEvalBaseInfo.setStatus(status);
        if (status == EvalFlowStatusEnum.KP_END.getValue()) {
            oldEvalBaseInfo.setEvalLv(evalBaseInfo.getDkLv());
            oldEvalBaseInfo.setScore(evalBaseInfo.getDkScore());
        }
        updateEvalBaseInfoByKey(oldEvalBaseInfo);

        List<EvalEventEnum> evalDkAddEnumList = readDkAddEnumsFromMap(context, evalBaseInfo.getId());
        List<EvalEventEnum> evalDkDelEnumList = readDkDelEnumsFromMap(context, evalBaseInfo.getId());
        EvalEventEnumExample example = new EvalEventEnumExample();
        EvalEventEnumExample.Criteria criteria = example.createCriteria();
        criteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
        criteria.andStatusEqualTo(EvalRoleEnum.dk.getCode());
        evalEventEnumDao.deleteByExample(example);
        List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
        evalEventEnumList.addAll(evalDkAddEnumList);
        evalEventEnumList.addAll(evalDkDelEnumList);
        if (evalEventEnumList.size() > 0) {
            evalEventEnumDao.insertBatch(evalEventEnumList);
        }
        oldEvalBaseInfo.setAddDkEnumList(evalDkAddEnumList);
        oldEvalBaseInfo.setDelDkEnumList(evalDkDelEnumList);
        return oldEvalBaseInfo;
    }

    @Override
    public EvalBaseInfo saveDw(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception {
        checkDwBean(evalBaseInfo);
        EvalBaseInfo oldEvalBaseInfo = evalBaseInfoDao.selectByPrimaryKey(evalBaseInfo.getId());
        if (oldEvalBaseInfo == null) throw new Exception("考评数据不存在");
        EvalFlow evalFlow = evalFlowDao.selectByPrimaryKey(oldEvalBaseInfo.getFlowId());
        oldEvalBaseInfo.setCorpLv(evalBaseInfo.getCorpLv());
        oldEvalBaseInfo.setCorpScore(evalBaseInfo.getCorpScore());
        oldEvalBaseInfo.setCorpAdvice(evalBaseInfo.getCorpAdvice());
        oldEvalBaseInfo.setDwUserId(context.getActiveUser().getUserid());
        oldEvalBaseInfo.setCorpDate(new Date());
        int status = EvalCommonHelper.getNextNode(evalFlow, evalBaseInfo.getStatus());
        oldEvalBaseInfo.setStatus(status);
        if (status == EvalFlowStatusEnum.KP_END.getValue()) {
            oldEvalBaseInfo.setEvalLv(evalBaseInfo.getDkLv());
            oldEvalBaseInfo.setScore(evalBaseInfo.getDkScore());
        }
        updateEvalBaseInfoByKey(oldEvalBaseInfo);

        List<EvalEventEnum> evalDwEnumList = readDwEnumsFromMap(context, evalBaseInfo.getId());
        EvalEventEnumExample example = new EvalEventEnumExample();
        EvalEventEnumExample.Criteria criteria = example.createCriteria();
        criteria.andParentIdEqualTo(String.valueOf(evalBaseInfo.getId()));
        criteria.andStatusEqualTo(EvalRoleEnum.dw.getCode());
        evalEventEnumDao.deleteByExample(example);
        List<EvalEventEnum> evalEventEnumList = new ArrayList<EvalEventEnum>();
        evalEventEnumList.addAll(evalDwEnumList);
        if (evalEventEnumList.size() > 0) {
            evalEventEnumDao.insertBatch(evalEventEnumList);
        }
        oldEvalBaseInfo.setDwEnumList(evalEventEnumList);
        return oldEvalBaseInfo;
    }

    //得到个人自评-学习情况
    private List<EvalSelfEnum> readEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("allrow"));
        List<EvalSelfEnum> list = new ArrayList<EvalSelfEnum>();
        for (int i = 1; i <= j; i++) {
            if (UtilPub.isNotEmpty(pageMap.getStrIgnoreNull("grsj" + i))
                    || UtilPub.isNotEmpty(pageMap.getStrIgnoreNull("grxx" + i)) || UtilPub.isNotEmpty(pageMap.getStrIgnoreNull("grxs" + i))) {
                EvalSelfEnum enumType = new EvalSelfEnum();
                String id = pageMap.getStrIgnoreNull("gr" + i);
                if (StringUtil.isNotEmpty(id)) {
                    enumType.setId(Long.valueOf(id));
                }
                enumType.setEventDate(pageMap.getStrIgnoreNull("grsj" + i));
                enumType.setContent(pageMap.getStrIgnoreNull("grxx" + i));
                enumType.setXs(pageMap.getStrIgnoreNull("grxs" + i));
                enumType.setParentId(String.valueOf(parentId));
                enumType.setCreater(context.getActiveUser().getUserid());
                enumType.setCreateDate(new Date());
                list.add(enumType);
            }
        }
        return list;
    }

    //得到科室考评-加分
    private List<EvalEventEnum> readKsAddEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("ksAddSize"));
        List<EvalEventEnum> list = new ArrayList<EvalEventEnum>();
        for (int i = 1; i <= j; i++) {
            String kslrid = pageMap.getStrIgnoreNull("kslrid" + i);
            if (UtilPub.isNotEmpty(kslrid)) {
                EvalEventEnum evalEventEnum = new EvalEventEnum();
                String id = pageMap.getStrIgnoreNull("ks" + i);    /*先删再追加，不需要*/
                if (StringUtil.isNotEmptyEx(id)) {
                    evalEventEnum.setMender(context.getActiveUser().getUserid());
                    evalEventEnum.setUpdateDate(new Date());
                }
                String eventId = pageMap.getStrIgnoreNull("ksevent" + i);
                EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(NumberUtil.parseLong(eventId));
                if (evalEvent == null) throw new Exception("加分数据不存在！");
                evalEventEnum.setEventJb(pageMap.getStrIgnoreNull("ksjb" + i));
                evalEventEnum.setEventXs(pageMap.getStrIgnoreNull("ksxs" + i));
                evalEventEnum.setParentId(String.valueOf(parentId));
                evalEventEnum.setEventDate(evalEvent.getEventDate());
                evalEventEnum.setEventName(evalEvent.getEventName());
                evalEventEnum.setScore(evalEvent.getQrScore());
                evalEventEnum.setStdId(evalEvent.getStdId());
                evalEventEnum.setType(evalEvent.getTypeId());
                evalEventEnum.setStatus(evalEvent.getStatus());
                evalEventEnum.setEventId(evalEvent.getId());
                evalEventEnum.setCreater(context.getActiveUser().getUserid());
                evalEventEnum.setCreateDate(new Date());
                list.add(evalEventEnum);
            }
        }
        return list;
    }

    //得到科室考评-减分
    private List<EvalEventEnum> readKsDelEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("ksDelSize"));
        List<EvalEventEnum> list = new ArrayList<EvalEventEnum>();
        for (int i = 1; i <= j; i++) {
            String kslrid = pageMap.getStrIgnoreNull("kfkslrid" + i);
            if (UtilPub.isNotEmpty(kslrid)) {
                EvalEventEnum evalEventEnum = new EvalEventEnum();
                String id = pageMap.getStrIgnoreNull("kfks" + i);    /*先删再追加，不需要*/
                if (StringUtil.isNotEmptyEx(id)) {
                    evalEventEnum.setMender(context.getActiveUser().getUserid());
                    evalEventEnum.setUpdateDate(new Date());
                }
                String eventId = pageMap.getStrIgnoreNull("ksevent" + i);
                EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(NumberUtil.parseLong(eventId));
                if (evalEvent == null) throw new Exception("扣分数据不存在！");
                evalEventEnum.setEventJb(pageMap.getStrIgnoreNull("kfksjb" + i));
                evalEventEnum.setEventXs(pageMap.getStrIgnoreNull("kfksxs" + i));
                evalEventEnum.setParentId(String.valueOf(parentId));
                evalEventEnum.setEventDate(evalEvent.getEventDate());
                evalEventEnum.setEventName(evalEvent.getEventName());
                evalEventEnum.setScore(evalEvent.getQrScore());
                evalEventEnum.setStdId(evalEvent.getStdId());
                evalEventEnum.setType(evalEvent.getTypeId());
                evalEventEnum.setStatus(evalEvent.getStatus());
                evalEventEnum.setEventId(evalEvent.getId());
                evalEventEnum.setCreater(context.getActiveUser().getUserid());
                evalEventEnum.setCreateDate(new Date());
                list.add(evalEventEnum);
            }
        }
        return list;
    }

    //得到大科室考评-加分
    private List<EvalEventEnum> readDkAddEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("dksAddSize"));
        List<EvalEventEnum> list = new ArrayList<EvalEventEnum>();
        for (int i = 1; i <= j; i++) {
            String kslrid = pageMap.getStrIgnoreNull("dkslrid" + i);
            if (UtilPub.isNotEmpty(kslrid)) {
                EvalEventEnum evalEventEnum = new EvalEventEnum();
                String id = pageMap.getStrIgnoreNull("dks" + i);    /*先删再追加，不需要*/
                if (StringUtil.isNotEmptyEx(id)) {
                    evalEventEnum.setMender(context.getActiveUser().getUserid());
                    evalEventEnum.setUpdateDate(new Date());
                }
                String eventId = pageMap.getStrIgnoreNull("dksevent" + i);
                EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(NumberUtil.parseLong(eventId));
                if (evalEvent == null) throw new Exception("加分数据不存在！");
                evalEventEnum.setEventJb(pageMap.getStrIgnoreNull("dksjb" + i));
                evalEventEnum.setEventXs(pageMap.getStrIgnoreNull("dksxs" + i));
                evalEventEnum.setParentId(String.valueOf(parentId));
                evalEventEnum.setEventDate(evalEvent.getEventDate());
                evalEventEnum.setEventName(evalEvent.getEventName());
                evalEventEnum.setScore(evalEvent.getQrScore());
                evalEventEnum.setStdId(evalEvent.getStdId());
                evalEventEnum.setType(evalEvent.getTypeId());
                evalEventEnum.setStatus(evalEvent.getStatus());
                evalEventEnum.setEventId(evalEvent.getId());
                evalEventEnum.setCreater(context.getActiveUser().getUserid());
                evalEventEnum.setCreateDate(new Date());
                list.add(evalEventEnum);
            }
        }
        return list;
    }

    //得到大科室考评-减分
    private List<EvalEventEnum> readDkDelEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("dksDelSize"));
        List<EvalEventEnum> list = new ArrayList<EvalEventEnum>();
        for (int i = 1; i <= j; i++) {
            String kslrid = pageMap.getStrIgnoreNull("kfdkslrid" + i);
            if (UtilPub.isNotEmpty(kslrid)) {
                EvalEventEnum evalEventEnum = new EvalEventEnum();
                String id = pageMap.getStrIgnoreNull("kfdks" + i);    /*先删再追加，不需要*/
                if (StringUtil.isNotEmptyEx(id)) {
                    evalEventEnum.setMender(context.getActiveUser().getUserid());
                    evalEventEnum.setUpdateDate(new Date());
                }
                String eventId = pageMap.getStrIgnoreNull("kfdksevent" + i);
                EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(NumberUtil.parseLong(eventId));
                if (evalEvent == null) throw new Exception("扣分数据不存在！");
                evalEventEnum.setEventJb(pageMap.getStrIgnoreNull("kfdksjb" + i));
                evalEventEnum.setEventXs(pageMap.getStrIgnoreNull("kfdksxs" + i));
                evalEventEnum.setParentId(String.valueOf(parentId));
                evalEventEnum.setEventDate(evalEvent.getEventDate());
                evalEventEnum.setEventName(evalEvent.getEventName());
                evalEventEnum.setScore(evalEvent.getQrScore());
                evalEventEnum.setStdId(evalEvent.getStdId());
                evalEventEnum.setType(evalEvent.getTypeId());
                evalEventEnum.setStatus(evalEvent.getStatus());
                evalEventEnum.setEventId(evalEvent.getId());
                evalEventEnum.setCreater(context.getActiveUser().getUserid());
                evalEventEnum.setCreateDate(new Date());
                list.add(evalEventEnum);
            }
        }
        return list;
    }

    //得到大科室考评-加分
    private List<EvalEventEnum> readDwEnumsFromMap(ActionContext context, Long parentId) throws Exception {
        PageMap pageMap = context.getRequestParams();
        Integer j = Integer.valueOf(pageMap.getStrIgnoreNull("dwSize"));
        List<EvalEventEnum> list = new ArrayList<EvalEventEnum>();
        for (int i = 1; i <= j; i++) {
            String eventId = pageMap.getStrIgnoreNull("dwevent" + i);
            if (UtilPub.isNotEmpty(eventId)) {
                EvalEventEnum evalEventEnum = new EvalEventEnum();
                String dwid = pageMap.getStrIgnoreNull("dwid" + i);
                if (StringUtil.isNotEmptyEx(dwid)) {
                    evalEventEnum.setMender(context.getActiveUser().getUserid());
                    evalEventEnum.setUpdateDate(new Date());
                }
                EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(NumberUtil.parseLong(eventId));
                if (evalEvent == null) throw new Exception("一票认定较差数据不存在！");
                evalEventEnum.setParentId(String.valueOf(parentId));
                evalEventEnum.setEventDate(evalEvent.getEventDate());
                evalEventEnum.setEventName(evalEvent.getEventName());
                evalEventEnum.setScore(evalEvent.getQrScore());
                evalEventEnum.setStdId(evalEvent.getStdId());
                evalEventEnum.setType(evalEvent.getTypeId());
                evalEventEnum.setStatus(evalEvent.getStatus());
                evalEventEnum.setEventId(evalEvent.getId());
                evalEventEnum.setCreater(context.getActiveUser().getUserid());
                evalEventEnum.setCreateDate(new Date());
                list.add(evalEventEnum);
            }
        }
        return list;
    }

    /**
     * 保存校验
     *
     * @param bean  要保存的对象
     * @param isNew 是否新增
     * @throws Exception 校验失败，直接抛出异常
     */
    public void checkSelfSave(EvalBaseInfo bean, boolean isNew) throws Exception {
        EvalUserType evalUserType = evalUserTypeDao.selectByPrimaryKey(UserUtil.getActiveUser().getUser().getEvalType());
        if (evalUserType == null || !UserUtil.getActiveUser().getUser().getToEval().equals(BooleanEnum.YES.getCode()))
            throw new Exception("对不起，您的人员类型设置有误，您暂时无法参加考评。");
        EvalFlow typeFlow = evalFlowDao.selectByPrimaryKey(evalUserType.getFlowId());
        if (typeFlow == null)
            throw new Exception("对不起，您的考评流程设置有误，您暂时无法参加考评。");
        bean.setFlowId(typeFlow.getId());
        EvalBaseInfoExample example = new EvalBaseInfoExample();
        EvalBaseInfoExample.Criteria criteria = example.createCriteria();
        criteria.andPeriodIdEqualTo(bean.getPeriodId());
        criteria.andUserIdEqualTo(bean.getUserId());
        boolean flag = evalBaseInfoDao.selectByExample(example).size() > 0;
        if (flag && isNew) {
            throw new Exception("对不起，您已经参加了该周期考评，请勿重复参加。");
        }
        String periodId = bean.getPeriodId();  //期间id;
        EvalZq cb = evalZqDao.selectByPrimaryKey(Long.valueOf(periodId));
        if (cb != null) {
            String begin = cb.getGrzpBegin();
            String end = cb.getGrzpEnd();
            String now = UtilDate.getToday();
            if (UtilPub.isNotEmpty(begin) && UtilPub.isNotEmpty(end)) {
                if (now.compareTo(begin) < 0) {
                    throw new Exception("该考评期间的个人自评时间未开始,保存失败");
                }
                if (now.compareTo(end) > 0) {
                    throw new Exception("该考评期间的个人自评时间已结束,保存失败");
                }
            }
        }
        bean.setStatus(EvalCommonHelper.getNextNode(typeFlow, bean.getStatus()));
    }

    public void checkSelfBean(EvalBaseInfo bean) throws Exception {
        if (StringUtil.isEmptyEx(bean.getPeriodId())) throw new Exception("考评周期不能为空");
        if (StringUtil.isEmptyEx(bean.getKs())) throw new Exception("自评部门不能为空");
    }

    public void checkKsBean(EvalBaseInfo bean) throws Exception {
        if (StringUtil.isEmptyEx(bean.getKsLv())) throw new Exception("考评等级不能为空");
        if (bean.getKsScore() == BigDecimal.ZERO) throw new Exception("考评分数不能为空");
    }

    public void checkDksBean(EvalBaseInfo bean) throws Exception {
        if (StringUtil.isEmptyEx(bean.getDkLv())) throw new Exception("考评等级不能为空");
        if (bean.getDkScore() == BigDecimal.ZERO) throw new Exception("考评分数不能为空");
    }

    public void checkDwBean(EvalBaseInfo bean) throws Exception {
        if (StringUtil.isEmptyEx(bean.getCorpLv())) throw new Exception("考评等级不能为空");
        if (bean.getCorpScore() == BigDecimal.ZERO) throw new Exception("考评分数不能为空");
    }

}
