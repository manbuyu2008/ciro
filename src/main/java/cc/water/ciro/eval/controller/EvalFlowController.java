package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.query.EvalFlowQuery;
import cc.water.ciro.eval.service.EvalFlowService;
import cc.water.ciro.system.query.UserQuery;
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
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/eval/evalFlow/")
public class EvalFlowController extends ListController<EvalFlow> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalFlowService evalFlowService;

	final static String path = "eval/evalFlow/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("evalFlow:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listEvalFlow";
	}



	@RequestMapping("data.vm")
	@RequiresPermissions("evalFlow:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalFlow> list, int total) throws Exception {
		EvalFlowQuery evalFlowQuery = new EvalFlowQuery();
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
		evalFlowQuery.setPageNo(page);
		evalFlowQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalFlowQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
		evalFlowQuery.setPageNo(page);
		Pagination pagination= evalFlowService.getEvalFlowWithPage(evalFlowQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("evalFlow:edit")
	public String goEditView(Model model) {
		String evalFlowId = context.getRequest().getParameter("id");
		String status = context.getRequestParams().getStrIgnoreNull("status");
		EvalFlow evalFlow = new EvalFlow();
		if (StringUtil.isNotEmpty(evalFlowId) && StringUtil.isNumeric(evalFlowId)) {
			evalFlow = evalFlowService.getEvalFlowByKey(NumberUtil.parseLong(evalFlowId));
		}else {
			evalFlow.setKsEval(BooleanEnum.YES.getCode());
			evalFlow.setDkEval(BooleanEnum.YES.getCode());
			evalFlow.setCorpEval(BooleanEnum.YES.getCode());
		}
		model.addAttribute("status", status);
		model.addAttribute("dataBean", JSONObject.toJSONString(evalFlow));
		return path + "cardEvalFlow";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("evalFlow:edit")
	@ResponseBody
	public void save(Model model, EvalFlow evalFlow) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalFlow);
			if (evalFlow.getId() > 0) {
				evalFlow.setMender(context.getActiveUser().getUserid());
				evalFlow.setDetail(BooleanEnum.NO.getCode());
				evalFlowService.updateEvalFlowByKey(evalFlow);
				setBean(evalFlow);
				setResult(true, "考评等级修改成功");
			} else {
				evalFlow.setCreater(context.getActiveUser().getUserid());
				evalFlow.setAddTime(new Date());
				evalFlow.setDetail(BooleanEnum.NO.getCode());
				evalFlowService.addEvalFlow(evalFlow);
				setBean(evalFlow);
				setResult(true, "考评等级新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("evalFlow:del")
	@ResponseBody
	public void doDelete(Long id) {
		try {
			UserQuery userQuery = new UserQuery();
			userQuery.setEvalType(id);
			int useCount =  userService.findListNum(userQuery);
			if(useCount>0){
				returnErrorMsg("code", "考评等级已被人员使用，请勿删除");
				return;
			}
			evalFlowService.deleteEvalFlowByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions("evalFlow:query")
	public void export(Model model, EvalFlow evalFlow) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
