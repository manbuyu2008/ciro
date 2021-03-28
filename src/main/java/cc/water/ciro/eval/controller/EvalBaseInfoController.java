package cc.water.ciro.eval.controller;

import cc.water.ciro.common.base.CommonHelper;
import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.DateUtil;
import cc.water.ciro.common.util.JDataSourceUtil;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.common.EvalCommonHelper;
import cc.water.ciro.eval.domain.*;
import cc.water.ciro.eval.enums.*;
import cc.water.ciro.eval.query.EvalBaseInfoQuery;
import cc.water.ciro.eval.query.EvalEventEnumQuery;
import cc.water.ciro.eval.query.EvalEventQuery;
import cc.water.ciro.eval.query.EvalLevelQuery;
import cc.water.ciro.eval.reportBean.EvalReportUser;
import cc.water.ciro.eval.reportBean.ReportPrintEventEnum;
import cc.water.ciro.eval.reportBean.ReportPrintUser;
import cc.water.ciro.eval.reportQuery.EvalReportDwQuery;
import cc.water.ciro.eval.reportQuery.EvalReportPrintQuery;
import cc.water.ciro.eval.service.*;
import cc.water.ciro.init.SysParam;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.FileInfoService;
import cc.water.ciro.system.service.ParamService;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.data.JsonDataSource;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/eval/evalBaseInfo/")
public class EvalBaseInfoController extends ListController<EvalBaseInfo> {
    @Autowired
    private DeptService deptService;
    @Autowired
    private SystemConfig systemConfig;
    @Autowired
    private EvalBaseInfoService evalBaseInfoService;
    @Autowired
    private EvalZqService evalZqService;
    @Autowired
    private EvalLevelService evalLevelService;
    @Autowired
    private EvalUserTypeService evalUserTypeService;
    @Autowired
    private EvalFlowService evalFlowService;
    @Autowired
    private ParamService paramService;
    @Autowired
    private EvalEventService evalEventService;
    @Autowired
    private FileInfoService fileInfoService;
    @Autowired
    private EvalPrintService evalPrintService;
    @Autowired
    private EvalReportService evalReportService;

    final static String pathSelf = "eval/evalSelf/";
    final static String pathKs = "eval/evalKs/";
    final static String pathDk = "eval/evalDk/";
    final static String pathDw = "eval/evalDw/";

    /********************************************
     * 列表展示
     ***********************************************************************/
    @RequestMapping("listSelf.vm")
    @RequiresPermissions("evalSelf:edit")
    public String goListView(HttpServletRequest request, HttpServletResponse response,
                             Model model) {
        return pathSelf + "listEvalSelf";
    }

    @RequestMapping("listKs.vm")
    @RequiresPermissions("evalKs:edit")
    public String listKs(HttpServletRequest request, HttpServletResponse response,
                         Model model) {
        return pathKs + "listEvalKs";
    }

    @RequestMapping("listDk.vm")
    @RequiresPermissions("evalDk:edit")
    public String listDk(HttpServletRequest request, HttpServletResponse response,
                         Model model) {
        return pathDk + "listEvalDk";
    }

    @RequestMapping("listDw.vm")
    @RequiresPermissions("evalDw:edit")
    public String listDw(HttpServletRequest request, HttpServletResponse response,
                         Model model) {
        return pathDw + "listEvalDw";
    }

    /********************************************
     * 数据查询
     ***********************************************************************/

    @RequestMapping("dataSelf.vm")
    @RequiresPermissions("evalSelf:edit")
    @ResponseBody
    public void dataSelf(HttpServletRequest request, HttpServletResponse response, Model model) {
        context.getRequestParams().put("listType", EvalListTypeEnum.self.getCode());
        super.data();
    }

    @RequestMapping("dataKs.vm")
    @RequiresPermissions("evalKs:edit")
    @ResponseBody
    public void dataKs(HttpServletRequest request, HttpServletResponse response, Model model) {
        context.getRequestParams().put("listType", EvalListTypeEnum.ks.getCode());
        super.data();
    }

    @RequestMapping("dataDk.vm")
    @RequiresPermissions("evalDk:edit")
    @ResponseBody
    public void dataDk(HttpServletRequest request, HttpServletResponse response, Model model) {
        context.getRequestParams().put("listType", EvalListTypeEnum.dk.getCode());
        super.data();
    }

    @RequestMapping("dataDw.vm")
    @RequiresPermissions("evalDw:edit")
    @ResponseBody
    public void dataDw(HttpServletRequest request, HttpServletResponse response, Model model) {
        context.getRequestParams().put("listType", EvalListTypeEnum.dw.getCode());
        super.data();
    }


    protected void loadData(final List<EvalBaseInfo> list, int total) throws Exception {
        EvalBaseInfoQuery evalBaseInfoQuery = new EvalBaseInfoQuery();
        int page = 0;
        int rows = 0;
        if (context.getRequestParams().containsKey("page")) {
            page = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("page"));
        } else {
            page = context.getPageEntity().getPage();
        }
        if (context.getRequestParams().containsKey("rows")) {
            rows = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("rows"));
        } else {
            rows = context.getPageEntity().getRows();
        }
        evalBaseInfoQuery.setPageNo(page);
        evalBaseInfoQuery.setPageSize(rows);
        context.getResponseParams().put("pageNumber", page);
        /*各个审批列表分别处理*/
        String listType = context.getRequestParams().getStrIgnoreNull("listType");
        String portal = context.getRequestParams().getStrIgnoreNull("portal");
        String adminDept = context.getActiveUser().getUser().getAdminDeptId();
        List<Dept> deptBeans = new ArrayList<Dept>();
         /*自评列表*/
        if (listType.equals(EvalListTypeEnum.self.getCode())) {
            evalBaseInfoQuery.setUserId(String.valueOf(context.getActiveUser().getUserid()));
        } else {     /*审批列表*/
            /*是否统一提交*/
            String unite = paramService.getValueByName(ParamInitEnum.unite.getCode());
            DeptQuery deptQuery = new DeptQuery();
            deptQuery.setPageSize(999);
            if (UtilPub.isNotEmpty(adminDept)) {
                deptBeans = deptService.getDeptByKeys(Arrays.asList(adminDept.split(CoreConsts.MORE_STRING)));
            }
            List<String> levelCodes = new ArrayList<String>();
            for (Dept deptBean : deptBeans) {
                levelCodes.add(deptBean.getLevelCode());
            }
            deptQuery.set_levelCodes(levelCodes);
            deptQuery.setPageNo(page);
            Pagination<Dept> pagination = deptService.getDeptWithPage(deptQuery);
            List<String> ksList = new ArrayList<String>();
            if (pagination != null && pagination.getPageSize() > 0) {
                for (Dept dept : pagination.getRows()) {
                    ksList.add(String.valueOf(dept.getId()));
                }
            }
            /*科室审批列表*/
            if (listType.equals(EvalListTypeEnum.ks.getCode())) {
                StringBuffer stringBuffer = new StringBuffer();
                if(StringUtil.isNotEmptyEx(portal)){
                    stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_zq q WHERE q.id = period_id " +
                            "AND q.status!='" + EvalZqStatusEnum.END.getCode() + "') and status<" + EvalFlowStatusEnum.KP_KS_SUBMIT.getValue());
                }
                /*流程节点启用*/
                stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_flow f WHERE f.id= FLOW_ID " +
                        "AND f.KS_EVAL='" + BooleanEnum.YES.getCode() + "')");
                if (unite.equals(BooleanEnum.YES.getCode())) {
                    stringBuffer.append(" AND EXISTS(\n" +
                            "SELECT  1  FROM tbl_eval_zq zq\n" +
                            "WHERE zq.id = period_id \n" +
                            "AND (zq.GRZP_END<CURDATE() OR (zq.GRZP_END>=CURDATE() \n" +
                            "AND NOT EXISTS(SELECT 1 FROM sys_user USER WHERE USER.to_eval='" + BooleanEnum.YES.getCode() + "'\n" +
                            "AND tbl_eval_base_info.KS=USER.eval_dept\n" +
                            "AND INSTR(CONCAT(',',zq.USER_TYPE,','),CONCAT(',',user.eval_type,','))>0\n" +
                            "AND (USER.ID NOT IN(SELECT USER_ID FROM tbl_eval_base_info A WHERE A.period_id= zq.id AND A.KS=USER.eval_dept)\n" +
                            "OR  USER.ID IN (SELECT USER_ID FROM tbl_eval_base_info A " +
                            "WHERE A.period_id= zq.id AND A.KS=USER.eval_dept AND A.STATUS<" + EvalFlowStatusEnum.KP_KS_WAIT.getValue() + "))\n" +
                            "))))");
                }
                /*流程已经到达节点*/
                stringBuffer.append(" AND STATUS >=  "
                        + EvalFlowStatusEnum.KP_KS_WAIT.getValue());
                  /*流程节点有角色权限*/
                List<Role> roleList = context.getActiveUser().getUser().getRoleList();
                boolean isKsRole = false;
                if (roleList != null) {
                    for (Role role : roleList) {
                        if (role.getCode().equals(EvalRoleEnum.ks.getCode())) {
                            isKsRole = true;
                            break;
                        }
                    }
                }
                if (!isKsRole) {
                    stringBuffer.append(" AND 1=2 ");
                }
                evalBaseInfoQuery.set_sql(stringBuffer.toString());
                /*流程节点有部门权限*/
                evalBaseInfoQuery.setKsList(ksList);
            /*大科室审批列表*/
            } else if (listType.equals(EvalListTypeEnum.dk.getCode())) {
                StringBuffer stringBuffer = new StringBuffer();
                if(StringUtil.isNotEmptyEx(portal)){
                    stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_zq q WHERE q.id = period_id " +
                            "AND q.status!='" + EvalZqStatusEnum.END.getCode() + "') and status<" + EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue());
                }
                /*流程节点启用*/
                stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_flow f WHERE f.id= FLOW_ID " +
                        "AND f.DK_EVAL='" + BooleanEnum.YES.getCode() + "')");
                if (unite.equals(BooleanEnum.YES.getCode())) {
                    stringBuffer.append(" AND EXISTS(\n" +
                            "SELECT  1  FROM tbl_eval_zq zq\n" +
                            "WHERE zq.id = period_id \n" +
                            "AND (zq.KSEVAL_END<CURDATE() OR (zq.KSEVAL_END>=CURDATE() \n" +
                            "AND NOT EXISTS(SELECT 1 FROM sys_user USER WHERE USER.to_eval='" + BooleanEnum.YES.getCode() + "'\n" +
                            "AND tbl_eval_base_info.KS=USER.eval_dept\n" +
                            "AND INSTR(CONCAT(',',zq.USER_TYPE,','),CONCAT(',',user.eval_type,','))>0\n" +
                            "AND USER.ID IN (SELECT USER_ID FROM tbl_eval_base_info A " +
                            "WHERE A.period_id= zq.id AND A.KS=USER.eval_dept AND A.STATUS<" + EvalFlowStatusEnum.KP_DKS_WAIT.getValue() + ")\n" +
                            "))))");
                }
                /*流程已经到达节点*/
                stringBuffer.append(" AND STATUS >=  "
                        + EvalFlowStatusEnum.KP_DKS_WAIT.getValue());
                  /*流程节点有角色权限*/
                List<Role> roleList = context.getActiveUser().getUser().getRoleList();
                boolean isKsRole = false;
                if (roleList != null) {
                    for (Role role : roleList) {
                        if (role.getCode().equals(EvalRoleEnum.dk.getCode())) {
                            isKsRole = true;
                            break;
                        }
                    }
                }
                if (!isKsRole) {
                    stringBuffer.append(" AND 1=2 ");
                }
                evalBaseInfoQuery.set_sql(stringBuffer.toString());
                 /*流程节点有部门权限*/
                evalBaseInfoQuery.setKsList(ksList);
                  /*单位审批列表*/
            } else if (listType.equals(EvalListTypeEnum.dw.getCode())) {
                StringBuffer stringBuffer = new StringBuffer();
                if(StringUtil.isNotEmptyEx(portal)){
                    stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_zq q WHERE q.id = period_id " +
                            "AND q.status!='" + EvalZqStatusEnum.END.getCode() + "') and status<" + EvalFlowStatusEnum.KP_END.getValue());
                }
                /*流程节点启用*/
                stringBuffer.append(" AND EXISTS(SELECT 1 FROM tbl_eval_flow f WHERE f.id= FLOW_ID " +
                        "AND f.CORP_EVAL='" + BooleanEnum.YES.getCode() + "')");
                if (unite.equals(BooleanEnum.YES.getCode())) {
                    stringBuffer.append(" AND EXISTS(\n" +
                            "SELECT  1  FROM tbl_eval_zq zq\n" +
                            "WHERE zq.id = period_id \n" +
                            "AND (zq.DKEVAL_END<CURDATE() OR (zq.DKEVAL_END>=CURDATE() \n" +
                            "AND NOT EXISTS(SELECT 1 FROM sys_user USER WHERE USER.to_eval='" + BooleanEnum.YES.getCode() + "'\n" +
                            "AND tbl_eval_base_info.KS=USER.eval_dept\n" +
                            "AND INSTR(CONCAT(',',zq.USER_TYPE,','),CONCAT(',',user.eval_type,','))>0\n" +
                            "AND USER.ID IN (SELECT USER_ID FROM tbl_eval_base_info A " +
                            "WHERE A.period_id= zq.id AND A.KS=USER.eval_dept AND A.STATUS<" + EvalFlowStatusEnum.KP_DW_WAIT.getValue() + ")\n" +
                            "))))");
                }
                /*流程已经到达节点*/
                stringBuffer.append(" AND STATUS >=  "
                        + EvalFlowStatusEnum.KP_DW_WAIT.getValue());
                /*流程节点有角色权限*/
                List<Role> roleList = context.getActiveUser().getUser().getRoleList();
                boolean isKsRole = false;
                if (roleList != null) {
                    for (Role role : roleList) {
                        if (role.getCode().equals(EvalRoleEnum.dw.getCode())) {
                            isKsRole = true;
                            break;
                        }
                    }
                }
                if (!isKsRole) {
                    stringBuffer.append(" AND 1=2 ");
                }
                evalBaseInfoQuery.set_sql(stringBuffer.toString());
                 /*流程节点有部门权限*/
                evalBaseInfoQuery.setKsList(ksList);
            }
        }
        if (StringUtil.isNotEmptyEx(portal)&&listType.equals(EvalListTypeEnum.self.getCode())) {
            EvalReportDwQuery evalReportDwQuery = new EvalReportDwQuery();
            evalReportDwQuery.setUserId(context.getActiveUser().getUserid());
            List<EvalReportUser> userList = evalReportService.getPortalSelf(evalReportDwQuery);
            if(userList!=null){
                for(EvalReportUser user:userList){
                    EvalBaseInfo evalBaseInfo = new EvalBaseInfo();
                    evalBaseInfo.setUserId(user.getUserId());
                    evalBaseInfo.setSelUserName(user.getUserName());
                    evalBaseInfo.setSelPeriodName(user.getPeriodName());
                    evalBaseInfo.setPeriodId(String.valueOf(user.getPeriodId()));
                    list.add(evalBaseInfo);
                }
                setTotal(userList.size());
            }
        }else {
            evalBaseInfoQuery.setPeriodId(context.getRequestParams().getStrIgnoreNull("periodId"));
            evalBaseInfoQuery.setPageNo(page);
            Pagination pagination = evalBaseInfoService.getEvalBaseInfoWithPage(evalBaseInfoQuery);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
            }
        }
    }


    /********************************************
     * 个人数据管理
     ***********************************************************************/
    @RequestMapping("cardSelf.vm")
    public String cardSelf(Model model) throws Exception {
        String evalBaseInfoId = context.getRequest().getParameter("id");
        String view = context.getRequest().getParameter("view");
        String periodId = context.getRequestParams().getStrIgnoreNull("periodId");
        if(StringUtil.isEmptyEx(periodId)) periodId =  context.getRequest().getParameter("periodId");
        EvalBaseInfo evalBaseInfo = new EvalBaseInfo();
        if (StringUtil.isNotEmpty(evalBaseInfoId) && StringUtil.isNumeric(evalBaseInfoId)) {
            evalBaseInfo = evalBaseInfoService.getEvalBaseInfoByKey(NumberUtil.parseLong(evalBaseInfoId));
        } else {
            evalBaseInfo.setStatus(EvalFlowStatusEnum.KP_ME_WAIT.getValue());
            evalBaseInfo.setPeriodId(periodId);
            User user = context.getActiveUser().getUser();
            evalBaseInfo.setUserId(context.getActiveUser().getUserid());
            evalBaseInfo.setUser(user);
            evalBaseInfo.setKs(String.valueOf(user.getEvalDept()));
            evalBaseInfo.setSex(user.getSex());
            evalBaseInfo.setCreateDate(new Date());
            evalBaseInfo.setSelfDate(new Date());
            evalBaseInfo.setZc(user.getPostName());
            evalBaseInfo.setNl(CommonHelper.getAge(user.getBirthdate()));
            List<EvalSelfEnum> selfEnumList = new ArrayList<EvalSelfEnum>(); //自评明细
            for (int i = 1; i <= 4; i++) {
                EvalSelfEnum evalSelfEnum = new EvalSelfEnum();
                selfEnumList.add(evalSelfEnum);
            }
            evalBaseInfo.setSelfEnumList(selfEnumList);
        }

        EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalBaseInfo.getPeriodId()));
        model.addAttribute("evalZq", evalZq);
        /*系统初始化分数*/
        String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
        if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_ME_WAIT.getValue()) {
            evalBaseInfo.setSelfScore(NumberUtil.parseBigDecimal(initScore));
        }
        Long evalType = evalBaseInfo.getUser().getEvalType();
        EvalUserType evalUserType = evalUserTypeService.getEvalUserTypeByKey(evalType);
        EvalBaseViewParam evalBaseViewParam = new EvalBaseViewParam();
        if (evalUserType != null) {
            EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalUserType.getFlowId());
            evalBaseViewParam = evalBaseInfoService.checkFlowStatus(model, evalFlow, evalBaseInfo, EvalListTypeEnum.self, context.getActiveUser().getUserid());
        } else {
            evalBaseViewParam = evalBaseInfoService.checkFlowStatus(model, null, evalBaseInfo, EvalListTypeEnum.self, context.getActiveUser().getUserid());
        }

        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> evalLevelList = evalLevelService.findList(evalLevelQuery);
        model.addAttribute("evalLevelList", JSONObject.toJSONString(evalLevelList));
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("bean", evalBaseInfo);
        model.addAttribute("initScore", initScore);
        model.addAttribute("view", view);
        model.addAttribute("dataBean", JSONObject.toJSONString(evalBaseInfo));
        return pathSelf + "cardEvalSelf";
    }

    @RequestMapping("saveSelf.vm")
    @RequiresPermissions("evalSelf:edit")
    @ResponseBody
    public void saveSelf(Model model, EvalBaseInfo evalBaseInfo) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), evalBaseInfo);
            EvalBaseInfo baseInfo = evalBaseInfoService.saveSelf(evalBaseInfo, context);
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_ME_SAVE.getValue()) {
                setBean(baseInfo);
                setResult(true, "保存成功");
            } else {
                setResult(true, "提交成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("delSelf.vm")
    @RequiresPermissions("evalSelf:edit")
    @ResponseBody
    public void doDelete(Long id) {
        try {
            EvalBaseInfo baseInfo = evalBaseInfoService.getEvalBaseInfoByKey(id);
            if (baseInfo.getStatus() >= EvalFlowStatusEnum.KP_ME_SUBMIT.getValue()) {
                returnErrorMsg("code", "考评信息已提交，请勿删除");
                return;
            }
            if (!baseInfo.getUserId().equals(context.getActiveUser().getUserid())) {
                returnErrorMsg("code", "非自己考评信息，请勿删除");
                return;
            }
            evalBaseInfoService.deleteEvalBaseInfoByKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "删除成功");
    }

    /********************************************
     * 科室数据管理
     ***********************************************************************/
    @RequestMapping("cardKs.vm")
    @RequiresPermissions("evalKs:edit")
    public String cardKs(Model model) throws Exception {
        String evalBaseInfoId = context.getRequest().getParameter("id");
        EvalBaseInfo evalBaseInfo = evalBaseInfoService.getEvalBaseInfoByKey(NumberUtil.parseLong(evalBaseInfoId));
        if (evalBaseInfo == null) {
            throw new Exception("考评数据不存在！");
        }
        EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
        evalBaseInfoService.checkFlowStatus(model, evalFlow, evalBaseInfo, EvalListTypeEnum.ks, context.getActiveUser().getUserid());
        /*系统初始化分数*/
        String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
        if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_WAIT.getValue()) {
            evalBaseInfo.setKsScore(NumberUtil.parseBigDecimal(initScore));
        }
        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> evalLevelList = evalLevelService.findList(evalLevelQuery);
        model.addAttribute("evalLevelList", JSONObject.toJSONString(evalLevelList));
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("initScore", initScore);
        model.addAttribute("bean", evalBaseInfo);
        model.addAttribute("dataBean", JSONObject.toJSONString(evalBaseInfo));
        return pathKs + "cardEvalKs";
    }

    @RequestMapping("saveKs.vm")
    @RequiresPermissions("evalKs:edit")
    @ResponseBody
    public void saveKs(Model model, EvalBaseInfo evalBaseInfo) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), evalBaseInfo);
            EvalBaseInfo baseInfo = evalBaseInfoService.saveKs(evalBaseInfo, context);
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_KS_SAVE.getValue()) {
                setBean(baseInfo);
                setResult(true, "保存成功");
            } else {
                setResult(true, "提交成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    /********************************************
     * 大科室数据管理
     ***********************************************************************/
    @RequestMapping("cardDk.vm")
    @RequiresPermissions("evalDk:edit")
    public String cardDk(Model model) throws Exception {
        String evalBaseInfoId = context.getRequest().getParameter("id");
        EvalBaseInfo evalBaseInfo = evalBaseInfoService.getEvalBaseInfoByKey(NumberUtil.parseLong(evalBaseInfoId));
        if (evalBaseInfo == null) {
            throw new Exception("考评数据不存在！");
        }
        EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
        evalBaseInfoService.checkFlowStatus(model, evalFlow, evalBaseInfo, EvalListTypeEnum.dk, context.getActiveUser().getUserid());
        /*系统初始化分数*/
        String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
        if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_WAIT.getValue()) {
            evalBaseInfo.setDkScore(NumberUtil.parseBigDecimal(initScore));
        }
        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> evalLevelList = evalLevelService.findList(evalLevelQuery);
        model.addAttribute("evalLevelList", JSONObject.toJSONString(evalLevelList));
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("initScore", initScore);
        model.addAttribute("bean", evalBaseInfo);
        model.addAttribute("dataBean", JSONObject.toJSONString(evalBaseInfo));
        return pathDk + "cardEvalDk";
    }

    @RequestMapping("saveDk.vm")
    @RequiresPermissions("evalDk:edit")
    @ResponseBody
    public void saveDk(Model model, EvalBaseInfo evalBaseInfo) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), evalBaseInfo);
            EvalBaseInfo baseInfo = evalBaseInfoService.saveDk(evalBaseInfo, context);
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DKS_SAVE.getValue()) {
                setBean(baseInfo);
                setResult(true, "保存成功");
            } else {
                setResult(true, "提交成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    /********************************************
     * 单位数据管理
     ***********************************************************************/
    @RequestMapping("cardDw.vm")
    @RequiresPermissions("evalDw:edit")
    public String cardDw(Model model) throws Exception {
        String evalBaseInfoId = context.getRequest().getParameter("id");
        EvalBaseInfo evalBaseInfo = evalBaseInfoService.getEvalBaseInfoByKey(NumberUtil.parseLong(evalBaseInfoId));
        if (evalBaseInfo == null) {
            throw new Exception("考评数据不存在！");
        }
        EvalFlow evalFlow = evalFlowService.getEvalFlowByKey(evalBaseInfo.getFlowId());
        evalBaseInfoService.checkFlowStatus(model, evalFlow, evalBaseInfo, EvalListTypeEnum.dw, context.getActiveUser().getUserid());
        /*系统初始化分数*/
        String initScore = paramService.getValueByName(ParamInitEnum.initScore.getCode());
        if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_WAIT.getValue()) {
            evalBaseInfo.setCorpScore(NumberUtil.parseBigDecimal(initScore));
        }
        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> evalLevelList = evalLevelService.findList(evalLevelQuery);
        for (EvalLevel level : evalLevelList) {
            if (level.getName().equals("较差")) {
                model.addAttribute("jcId", level.getId());
                break;
            }
        }
        model.addAttribute("evalLevelList", JSONObject.toJSONString(evalLevelList));
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("initScore", initScore);
        model.addAttribute("bean", evalBaseInfo);
        model.addAttribute("dataBean", JSONObject.toJSONString(evalBaseInfo));
        return pathDw + "cardEvalDw";
    }

    @RequestMapping("saveDw.vm")
    @RequiresPermissions("evalDw:edit")
    @ResponseBody
    public void saveDw(Model model, EvalBaseInfo evalBaseInfo) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), evalBaseInfo);
            EvalBaseInfo baseInfo = evalBaseInfoService.saveDw(evalBaseInfo, context);
            if (evalBaseInfo.getStatus() == EvalFlowStatusEnum.KP_DW_SAVE.getValue()) {
                setBean(baseInfo);
                setResult(true, "保存成功");
            } else {
                setResult(true, "提交成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }


    /********************************************
     * 其他服务管理
     ***********************************************************************/
    @RequestMapping("customKs.vm")
    @ResponseBody
    @RequiresPermissions("evalKs:edit")
    public void customKs() throws Exception {
        try {
            String actionType = context.getRequest().getParameter("actionType");
            PageMap map = context.getRequestParams();
            /*校验选择事件*/
            if (actionType.equals("autoSubmit")) { /*批量审核*/
                String ids = map.getStrIgnoreNull("ids");
                if (UtilPub.isNotEmpty(ids)) {
                    evalBaseInfoService.saveAutoKs(ids, context);
                }
                setResult(true, "审核成功");
            } else if (actionType.equals("reject")) { /*驳回审核*/
                evalBaseInfoService.rejectKs(context);
                setResult(true, "驳回成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("customDk.vm")
    @ResponseBody
    @RequiresPermissions("evalDk:edit")
    public void customDk() throws Exception {
        try {
            String actionType = context.getRequest().getParameter("actionType");
            PageMap map = context.getRequestParams();
            /*校验选择事件*/
            if (actionType.equals("autoSubmit")) { /*批量审核*/
                String ids = map.getStrIgnoreNull("ids");
                if (UtilPub.isNotEmpty(ids)) {
                    evalBaseInfoService.saveAutoDk(ids, context);
                }
                setResult(true, "审核成功");
            } else if (actionType.equals("reject")) { /*驳回审核*/
                evalBaseInfoService.rejectDk(context);
                setResult(true, "驳回成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("customDw.vm")
    @ResponseBody
    @RequiresPermissions("evalDw:edit")
    public void customDw() throws Exception {
        try {
            String actionType = context.getRequest().getParameter("actionType");
            PageMap map = context.getRequestParams();
            /*校验选择事件*/
            if (actionType.equals("autoSubmit")) { /*批量审核*/
                String ids = map.getStrIgnoreNull("ids");
                if (UtilPub.isNotEmpty(ids)) {
                    evalBaseInfoService.saveAutoDw(ids, context);
                }
                setResult(true, "审核成功");
            } else if (actionType.equals("cancel")) { /*取回审核*/
                evalBaseInfoService.cancelDw(context);
                setResult(true, "驳回成功");
            } else if (actionType.equals("reject")) { /*驳回审核*/
                evalBaseInfoService.rejectDw(context);
                setResult(true, "驳回成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    /********************************************
     * 数据导出
     ***********************************************************************/

    @RequestMapping("custom.vm")
    @ResponseBody
    public void custom() throws Exception {
        try {
            String actionType = context.getRequest().getParameter("actionType");
            PageMap map = context.getRequestParams();
            /*校验选择事件*/
            if (actionType.equals("fileView")) { /*查询附件*/
                String eventId = map.getStrIgnoreNull("eventId");
                List<FileInfo> fileInfoList = new ArrayList<FileInfo>();
                if (UtilPub.isNotEmpty(eventId)) {
                    EvalEvent evalEvent = evalEventService.getEvalEventByKey(Long.valueOf(eventId));
                    if (evalEvent != null && StringUtil.isNotEmpty(evalEvent.getFileUrl())) {
                        if (StringUtil.isNotEmpty(evalEvent.getFileUrl())) {
                            List<Long> ids = new ArrayList<Long>();
                            String[] files = evalEvent.getFileUrl().split(",");
                            for (String file : files) {
                                ids.add(NumberUtil.parseLong(file));
                            }
                            fileInfoList = fileInfoService.getFileInfoByKeys(ids);
                        }
                    }
                }
                context.getResponseParams().put("list", fileInfoList);
                setResult(true, "查询附件成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("print.vm")
    @RequiresPermissions(value = {"evalSelf:edit", "evalKs:edit", "evalDk:edit", "evalDw:edit"}, logical = Logical.OR)
    public String print(Model model, Long id) throws Exception {
        EvalReportPrintQuery evalReportPrintQuery = new EvalReportPrintQuery();
        evalReportPrintQuery.setId(id);
        evalReportPrintQuery.setPageSize(999);
        ReportPrintUser userKpList = evalPrintService.reportDetailPrint(evalReportPrintQuery);
        userKpList.setTitle(systemConfig.getCorpName()+"医德医风考评表");
        List<ReportPrintEventEnum> userSelfEnumList = evalPrintService.reportSelfEnumPrint(evalReportPrintQuery);

        evalReportPrintQuery.setStatus(EvalRoleEnum.ks.getCode());
        evalReportPrintQuery.setType(EvalEventTypeEnum.jiafen.getCode());
        List<ReportPrintEventEnum> ksAddEventList = evalPrintService.reportEventPrint(evalReportPrintQuery);
        evalReportPrintQuery.setType(EvalEventTypeEnum.jianfen.getCode());
        List<ReportPrintEventEnum> ksDelEventList = evalPrintService.reportEventPrint(evalReportPrintQuery);

        evalReportPrintQuery.setStatus(EvalRoleEnum.dk.getCode());
        evalReportPrintQuery.setType(EvalEventTypeEnum.jiafen.getCode());
        List<ReportPrintEventEnum> dkAddEventList = evalPrintService.reportEventPrint(evalReportPrintQuery);
        evalReportPrintQuery.setType(EvalEventTypeEnum.jianfen.getCode());
        List<ReportPrintEventEnum> dkDelEventList = evalPrintService.reportEventPrint(evalReportPrintQuery);

        evalReportPrintQuery.setStatus(EvalRoleEnum.dw.getCode());
        evalReportPrintQuery.setType(EvalEventTypeEnum.yipiao.getCode());
        List<ReportPrintEventEnum> dwEventList = evalPrintService.reportEventPrint(evalReportPrintQuery);
        // 报表数据源
        JRDataSource jrDataSource = new JDataSourceUtil(MapBeanUtil.PO2Map(userKpList,false));
        JRDataSource selfEnum = new JRBeanCollectionDataSource(userSelfEnumList);
        JRDataSource ksAddEnum = new JRBeanCollectionDataSource(ksAddEventList);
        JRDataSource ksDelEnum = new JRBeanCollectionDataSource(ksDelEventList);

        JRDataSource dkAddEnum = new JRBeanCollectionDataSource(dkAddEventList);
        JRDataSource dkDelEnum = new JRBeanCollectionDataSource(dkDelEventList);

        JRDataSource dwEnum = new JRBeanCollectionDataSource(dwEventList);
        // 动态指定报表模板url
        model.addAttribute("url", "/report/kpmx.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);
        model.addAttribute("SUBREPORT_DIR", SysParam.getWebRootPath()+"report/");
        String[] subKeys = {"selfEnum","ksAddEnum","ksDelEnum","dkAddEnum","dkDelEnum","dwEnum"};
        model.addAttribute("subReportDataKeys", subKeys);
        model.addAttribute("selfEnum", selfEnum);
        model.addAttribute("ksAddEnum", ksAddEnum);
        model.addAttribute("ksDelEnum", ksDelEnum);
        model.addAttribute("dkAddEnum", dkAddEnum);
        model.addAttribute("dkDelEnum", dkDelEnum);
        model.addAttribute("dwEnum", dwEnum);
        return "reportView"; // 对应jasper-views.xml中的bean id
    }

    @RequestMapping("export.vm")
    @RequiresPermissions(value = {"evalSelf:edit", "evalKs:edit", "evalDk:edit", "evalDw:edit"}, logical = Logical.OR)
    public void export(Model model, EvalBaseInfo evalBaseInfo) {
        try {
            super.export();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
