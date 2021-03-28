package cc.water.ciro.eval.controller;

import cc.water.ciro.common.base.CommonHelper;
import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.DateUtil;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.FileUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.domain.EvalEvent;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.enums.EvalRoleEnum;
import cc.water.ciro.eval.query.EvalEventQuery;
import cc.water.ciro.eval.service.EvalEventService;
import cc.water.ciro.eval.service.EvalStdService;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.FileInfo;
import cc.water.ciro.system.domain.FileInit;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.FileInfoService;
import cc.water.ciro.system.service.ParamService;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/eval/evalEvent/")
public class EvalEventController extends ListController<EvalEvent> {
	@Autowired
	private DeptService deptService;
	@Autowired
	private UserService userService;
	@Autowired
	private EvalEventService evalEventService;
	@Autowired
	private FileInfoService fileInfoService;
	@Autowired
	private EvalStdService evalStdService;
	@Autowired
	private SystemConfig systemConfig;
	@Autowired
	private ParamService paramService;
	final static String path = "eval/evalEvent/";
	final static String pathSh = "eval/eventSh/";

	@RequestMapping("list.vm")
	@RequiresPermissions(value = {"evalEvent:query_ks", "evalEvent:query_dk", "evalEvent:query_dw","evalEvent:sh"}, logical = Logical.OR)
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		String status = request.getParameter("status");
		if(StringUtil.isEmpty(status)){
			status = context.getRequestParams().getStrIgnoreNull("status");
		}
		model.addAttribute("status",status);
		return path + "listEvalEvent";
	}

	@RequestMapping("listSh.vm")
	@RequiresPermissions("evalEvent:sh")
	public String listSh(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		String status = request.getParameter("status");
		if(StringUtil.isEmpty(status)){
			status = context.getRequestParams().getStrIgnoreNull("status");
		}
		model.addAttribute("status",status);
		return pathSh + "eventSh";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions(value = {"evalEvent:query_ks", "evalEvent:query_dk", "evalEvent:query_dw","evalEvent:sh"}, logical = Logical.OR)
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalEvent> list, int total) throws Exception {
		EvalEventQuery evalEventQuery = new EvalEventQuery();
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
		evalEventQuery.setPageNo(page);
		evalEventQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalEventQuery.setStatus(context.getRequestParams().getStrIgnoreNull("status"));
		evalEventQuery.setUserId(context.getRequestParams().getStrIgnoreNull("userId"));
		evalEventQuery.setTypeId(context.getRequestParams().getStrIgnoreNull("typeId"));
		evalEventQuery.setKsId(context.getRequestParams().getStrIgnoreNull("ksId"));
		evalEventQuery.setIsSh(context.getRequestParams().getStrIgnoreNull("isSh"));
		evalEventQuery.setShResult(context.getRequestParams().getStrIgnoreNull("shResult"));
		String eventDate = context.getRequestParams().getStrIgnoreNull("eventDate");
		 /*查询管理权限部门*/
		String adminDept = context.getActiveUser().getUser().getAdminDeptId();
		List<Dept> deptBeans = new ArrayList<Dept>();
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
		Pagination<Dept> deptPagination = deptService.getDeptWithPage(deptQuery);
		List<String> ksList = new ArrayList<String>();
		if (deptPagination != null && deptPagination.getPageSize() > 0) {
			for (Dept dept : deptPagination.getRows()) {
				ksList.add(String.valueOf(dept.getId()));
			}
		}
		evalEventQuery.setKsList(ksList);

		String dateFw = "";
		if(StringUtil.isNotEmpty(eventDate)){
			dateFw = CommonHelper.getDateCon(eventDate);
		}
		if(StringUtil.isNotEmpty(dateFw)){
			String[] fws = dateFw.split(",");
			evalEventQuery.setBeginDate(DateUtil.parse(fws[0]));
			evalEventQuery.setEndDate(DateUtil.parse(fws[1]));
		}
		evalEventQuery.setPageNo(page);
		Pagination pagination= evalEventService.getEvalEventWithPage(evalEventQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions(value = {"evalEvent:edit_ks", "evalEvent:edit_dk", "evalEvent:edit_dw"}, logical = Logical.OR)
	public String card(Model model) {
		String evalEventId = context.getRequest().getParameter("id");
		String status = context.getRequestParams().getStrIgnoreNull("status");
		EvalEvent evalEvent = new EvalEvent();
		List<FileInit> fileInitList = new ArrayList<FileInit>();
		EvalStd evalStd = new   EvalStd();
		if (StringUtil.isNotEmpty(evalEventId) && StringUtil.isNumeric(evalEventId)) {
			evalEvent = evalEventService.getEvalEventByKey(NumberUtil.parseLong(evalEventId));
			if(evalEvent!=null&&StringUtil.isNotEmpty(evalEvent.getFileUrl())){
				String[] fileIds =   evalEvent.getFileUrl().split(",");
				for(String fileId:fileIds){
					FileInit fileInit = new FileInit();
					FileInfo fileInfo =  fileInfoService.getFileInfoByKey(NumberUtil.parseLong(fileId));
					if(fileInfo!=null){
						fileInit.setId(fileInfo.getId());
						fileInit.setName(fileInfo.getName());
						fileInit.setSize(fileInfo.getFileSize());
						fileInitList.add(fileInit);
					}
				}
			}
			if(StringUtil.isNotEmpty(evalEvent.getStdId())){
				evalStd = 	evalStdService.getEvalStdByKey(NumberUtil.parseLong(evalEvent.getStdId()));
				if(evalStd==null) evalStd = new   EvalStd();
			}
		}else {
			evalEvent.setEventDate(new Date());
			evalEvent.setStatus(status);
		}

		model.addAttribute("dataBean", JSONObject.toJSONString(evalEvent));
		model.addAttribute("evalEvent", evalEvent);
		model.addAttribute("status", status);
		model.addAttribute("evalStd", evalStd);
		model.addAttribute("jsessionid", request.getSession().getId());
		model.addAttribute("isMy", evalEvent.getCreater()==context.getActiveUser().getUserid());
		model.addAttribute("userId",context.getActiveUser().getUserid());
		model.addAttribute("fileInitList",JSONObject.toJSONString(fileInitList));
		return path + "cardEvalEvent";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions(value = {"evalEvent:edit_ks", "evalEvent:edit_dk", "evalEvent:edit_dw"}, logical = Logical.OR)
	@ResponseBody
	public void save(HttpServletRequest request, HttpServletResponse response,Model model, EvalEvent evalEvent) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalEvent);
			String fileValue = context.getRequestParams().getStrIgnoreNull("fileValue");
			/*是否启用审核*/
			String eventSet = paramService.getValueByName(ParamInitEnum.checkEvent.getCode());
			if (evalEvent.getId() > 0) {
				EvalEvent oldEvalEvent =   evalEventService.getEvalEventByKey(evalEvent.getId());
				if(oldEvalEvent==null){
					setResult(false, "不存在考评加减分档案，修改失败");
					return;
				}
				List<String> delList = CommonHelper.getStrDel(fileValue,oldEvalEvent.getFileUrl(),",");
				if(delList!=null) {
					// 文件保存目录路径
					String savePath = systemConfig.getFilePath();
					for (String delId : delList) {
						FileInfo fileInfo = fileInfoService.getFileInfoByKey(Long.valueOf(delId));
						if (fileInfo != null) {
							String saveFilePath = savePath + File.separator + fileInfo.getPath() + File.separator + fileInfo.getSaveName() + fileInfo.getSuffix();
							FileUtil.removeFile(saveFilePath);
							fileInfoService.deleteFileInfoByKey(Long.valueOf(delId));
						}
					}
				}
				evalEvent.setFileUrl(fileValue);
				evalEvent.setMender(context.getActiveUser().getUserid());
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
				evalEventService.updateEvalEventByKey(evalEvent);
				setBean(evalEvent);
				setResult(true, "考评加减分档案修改成功");
			} else {
				evalEvent.setFileUrl(fileValue);
				evalEvent.setCreater(context.getActiveUser().getUserid());
				evalEvent.setCreateDate(new Date());
				/**/
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
				if(evalEvent.getStatus().equals(EvalRoleEnum.dw.getCode())) evalEvent.setTypeId("10");
				evalEventService.addEvalEvent(evalEvent);
				setBean(evalEvent);
				setResult(true, "考评加减分档案新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions(value = {"evalEvent:del_ks", "evalEvent:del_dk", "evalEvent:del_dw"}, logical = Logical.OR)
	@ResponseBody
	public void doDelete(Long id) {
		try {
			UserQuery userQuery = new UserQuery();
			userQuery.setEvalType(id);
			int useCount =  userService.findListNum(userQuery);
			if(useCount>0){
				returnErrorMsg("code", "考评加减分档案已被人员使用，请勿删除");
				return;
			}
			evalEventService.deleteEvalEventByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions(value = {"evalEvent:query_ks", "evalEvent:query_dk", "evalEvent:query_dw"}, logical = Logical.OR)
	public void export(Model model, EvalEvent evalEvent) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("custom.vm")
	@ResponseBody
	@RequiresPermissions(value = {"evalEvent:query_ks", "evalEvent:query_dk", "evalEvent:query_dw"}, logical = Logical.OR)
	public void custom() throws Exception {
		try {
			String actionType = context.getRequest().getParameter("actionType");
			PageMap map = context.getRequestParams();
			String id = map.getStrIgnoreNull("id");
			/*校验选择事件*/
			if (actionType.equals("copyCheck")) {
				evalEventService.copyCheck(context);
				setResult(true, "校验选择事件成功");
			} else if (actionType.equals("copySave")) { /*复制事件*/
				/*是否启用审核*/
				String eventSet = paramService.getValueByName(ParamInitEnum.checkEvent.getCode());
				evalEventService.copySave(context,eventSet);
				setResult(true, "复制事件成功");
			} else if (actionType.equals("saveMore")) { /*批量审核*/
				String ids = map.getStrIgnoreNull("ids");
				if (UtilPub.isNotEmpty(ids)) {
					String[] mid = ids.split(",");
					for (String smid : mid) {
						EvalEvent evalEvent = evalEventService.getEvalEventByKey(Long.valueOf(smid));
						evalEvent.setIsSh(BooleanEnum.YES.getCode());
						evalEvent.setShRemark("批量审核");
						evalEvent.setShResult(BooleanEnum.YES.getCode());
						evalEvent.setQrScore(evalEvent.getScore());
						evalEventService.updateEvalEventByKey(evalEvent);
					}
				}
				setResult(true, "审核成功");
			}
			if (UtilPub.isNotEmpty(id)) {
				if (actionType.equals("load")) { /*加载数据*/
					EvalEvent evalEvent = evalEventService.getEvalEventByKey(Long.valueOf(id));
					context.getResponseParams().put("data", JSONObject.toJSONString(evalEvent));
					setResult(true, "加载数据成功");
				} else if (actionType.equals("save")) { /*审核单个数据*/
					EvalEvent evalEvent = evalEventService.getEvalEventByKey(Long.valueOf(id));
					evalEvent.setIsSh(BooleanEnum.YES.getCode());
					evalEvent.setShResult(map.getStrIgnoreNull("sresult"));
					evalEvent.setShRemark(map.getStrIgnoreNull("sshRemark"));
					evalEvent.setQrScore(BigDecimal.valueOf(map.getDouble("sqrScore")));
					evalEventService.updateEvalEventByKey(evalEvent);
					setResult(true, "审核成功");
				} else if (actionType.equals("canl")) { /*取消审核单个数据*/
					EvalEvent evalEvent = evalEventService.getEvalEventByKey(Long.valueOf(id));
					evalEvent.setIsSh(BooleanEnum.NO.getCode());
					evalEvent.setShResult(null);
					evalEvent.setShRemark(null);
					evalEvent.setQrScore(null);
					evalEventService.updateEvalEventByKey(evalEvent);
					setResult(true, "审核成功");
				}
			}
		} catch (Exception e) {
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

}
