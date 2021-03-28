package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.domain.EvalEvent;
import cc.water.ciro.eval.domain.EvalEventExample;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.mapper.EvalEventDao;
import cc.water.ciro.eval.query.EvalEventQuery;
import cc.water.ciro.eval.service.EvalEventService;
import cc.water.ciro.eval.service.EvalStdService;
import cc.water.ciro.system.dao.UserDao;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalEventServiceImpl extends BaseService implements EvalEventService {
	
	@Autowired
	private EvalEventDao evalEventDao;
	@Autowired
	private UserService userService;
	@Autowired
	private EvalStdService evalStdService;
	@Autowired
	private DeptService deptService;
	public void addEvalEvent(EvalEvent evalEvent) {
		 evalEvent.setCreateDate(new Date());
		 evalEventDao.insert(evalEvent);
	}
	@Transactional(readOnly=true)
	public EvalEvent getEvalEventByKey(Long id) {
		EvalEvent evalEvent = evalEventDao.selectByPrimaryKey(id);
		evalEvent.setUser(userService.getUserByKey(Long.valueOf(evalEvent.getUserId())));
		evalEvent.setEvalStd(evalStdService.getEvalStdByKey(Long.valueOf(evalEvent.getStdId())));
		evalEvent.setDept(deptService.getDeptByKey(Long.valueOf(evalEvent.getKsId())));
		return evalEventDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalEvent> getEvalEventByKeys(List<Long> ids) {
		EvalEventExample example = new  EvalEventExample();
		EvalEventExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		List<EvalEvent> evalEvents =    evalEventDao.selectByExample(example);
		for(EvalEvent evalEvent:evalEvents){
			evalEvent.setUser(userService.getUserByKey(Long.valueOf(evalEvent.getUserId())));
			evalEvent.setEvalStd(evalStdService.getEvalStdByKey(Long.valueOf(evalEvent.getStdId())));
			evalEvent.setDept(deptService.getDeptByKey(Long.valueOf(evalEvent.getKsId())));
		}
		return evalEvents;
	}

	public void deleteEvalEventByKey(Long id) {
		 evalEventDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalEventByKeys(List<Long> ids) {
		EvalEventExample example = new  EvalEventExample();
		EvalEventExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalEventDao.deleteByExample(example);
	}

	public void updateEvalEventByKey(EvalEvent evalEvent) {
		 evalEventDao.updateByPrimaryKey(evalEvent);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalEventWithPage(EvalEventQuery evalEventQuery) {
		EvalEventExample example = new  EvalEventExample();
		example.setOffset(evalEventQuery.getStartRow());
		example.setLimit(evalEventQuery.getPageSize());
		EvalEventExample.Criteria criteria = example.createCriteria();
		if(evalEventQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalEventQuery.getIds()));
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getStatus())) {
			criteria.andStatusEqualTo(evalEventQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getIsSh())) {
			criteria.andIsShEqualTo(evalEventQuery.getIsSh());
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getShResult())) {
			criteria.andShResultEqualTo(evalEventQuery.getShResult());
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getTypeId())) {
			criteria.andTypeIdEqualTo(evalEventQuery.getTypeId());
		}
		if(evalEventQuery.getKsId()!=null&&!evalEventQuery.getKsId().equals("0")) {
			criteria.andKsIdEqualTo(evalEventQuery.getKsId());
		}
		if(evalEventQuery.getUserId()!=null&&!evalEventQuery.getUserId().equals("0")) {
			criteria.andUserIdEqualTo(evalEventQuery.getUserId());
		}
		if(evalEventQuery.getBeginDate()!=null&&evalEventQuery.getEndDate()!=null) {
			criteria.andEventDateBetween(evalEventQuery.getBeginDate(),evalEventQuery.getEndDate());
		}
		if (evalEventQuery.getKsList() != null && evalEventQuery.getKsList().size() > 0) {
			criteria.andKsIdIn(evalEventQuery.getKsList());
		}
		example.setOrderByClause(" is_sh,EVENT_DATE desc,KS_ID,USER_ID,ID");
		Pagination<EvalEvent> pagination=new Pagination<EvalEvent>(evalEventQuery.getPageNo(), evalEventQuery.getPageSize(), evalEventDao.countByExample(example));
		List<EvalEvent> evalEventList=evalEventDao.selectByExample(example);
		if(evalEventList!=null) {
			for (EvalEvent evalEvent : evalEventList) {
				evalEvent.setUser(userService.getUserByKey(Long.valueOf(evalEvent.getUserId())));
				evalEvent.setEvalStd(evalStdService.getEvalStdByKey(Long.valueOf(evalEvent.getStdId())));
				evalEvent.setDept(deptService.getDeptByKey(Long.valueOf(evalEvent.getKsId())));
			}
		}
		pagination.setRows(evalEventList);
		return pagination;
	}

	@Override
	public int getEvalEventCount(EvalEventQuery evalEventQuery) {
		EvalEventExample example = new  EvalEventExample();
		EvalEventExample.Criteria criteria = example.createCriteria();
		if(evalEventQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalEventQuery.getIds()));
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getStatus())) {
			criteria.andStatusEqualTo(evalEventQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalEventQuery.getTypeId())) {
			criteria.andTypeIdEqualTo(evalEventQuery.getTypeId());
		}
		if(evalEventQuery.getKsId()!=null&&!evalEventQuery.getKsId().equals("0")) {
			criteria.andKsIdEqualTo(evalEventQuery.getKsId());
		}
		if(evalEventQuery.getUserId()!=null&&!evalEventQuery.getUserId().equals("0")) {
			criteria.andUserIdEqualTo(evalEventQuery.getUserId());
		}
		if(evalEventQuery.getBeginDate()!=null&&evalEventQuery.getEndDate()!=null) {
			criteria.andEventDateBetween(evalEventQuery.getBeginDate(),evalEventQuery.getEndDate());
		}
		return evalEventDao.countByExample(example);
	}

	@Override
	public void copyCheck(ActionContext context) {
		PageMap map = context.getRequestParams();
		String id =context.getRequest().getParameter("id");
		EvalEvent evalEvent=evalEventDao.selectByPrimaryKey(Long.valueOf(id));
		String selId = StringUtil.defaultIfBlank(context.getRequest().getParameter("selIds"),"");
		String hasId = StringUtil.defaultIfBlank(context.getRequest().getParameter("hasId"),"");
		String[] selIds = selId.split(",");
		JSONObject jsonObject = new JSONObject();
		for(int i=0;i<selIds.length;i++){
			if(hasId.indexOf(selIds[i])>=0) continue;
			evalEvent.setUserId(selIds[i]);
			evalEvent.setId(null);
			int flag = evalEventDao.selectSame(evalEvent);
			if(flag>0){
				User user= userService.getUserByKey(Long.valueOf(selIds[i]));
				jsonObject.put("data", true);
				jsonObject.put("id", selIds[i]);
				jsonObject.put("name", user.getName()+"["+user.getUsername()+"]");
				jsonObject.put("deptName",user.getDeptName());
				break;
			}
		}
		context.getResponseParams().put("data", jsonObject.toString());
	}

	@Override
	public void copySave(ActionContext context,String eventSet) {
		PageMap map = context.getRequestParams();
		String id =map.getStrIgnoreNull("id");
		EvalEvent evalEvent=evalEventDao.selectByPrimaryKey(Long.valueOf(id));
		String selId = context.getRequestParams().getStrIgnoreNull("selIds");
		String[] selIds = selId.split(",");
			for(int i=0;i<selIds.length;i++){
				evalEvent.setId(null);
				evalEvent.setFileUrl("");
				if(eventSet.equals(BooleanEnum.NO.getCode())){
					evalEvent.setIsSh(BooleanEnum.YES.getCode());
					evalEvent.setShResult(BooleanEnum.YES.getCode());
					evalEvent.setQrScore(evalEvent.getScore());
				}else{
					evalEvent.setIsSh(BooleanEnum.NO.getCode());
					evalEvent.setShResult(null);
					evalEvent.setShRemark("");
					evalEvent.setQrScore(BigDecimal.valueOf(0));
				}
				User user= userService.getUserByKey(Long.valueOf(selIds[i]));
				evalEvent.setUserId(selIds[i]);
				evalEvent.setKsId(String.valueOf(user.getDeptId()));
				addEvalEvent(evalEvent);
			}
	}
}
