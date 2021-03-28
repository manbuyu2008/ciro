package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.eval.domain.EvalSelfScoreStd;
import cc.water.ciro.eval.query.EvalSelfScoreStdQuery;
import cc.water.ciro.eval.service.EvalSelfScoreStdService;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
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
@RequestMapping("/eval/evalSelfScoreStd/")
public class EvalSelfScoreStdController extends ListController<EvalSelfScoreStd> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalSelfScoreStdService evalSelfScoreStdService;

	final static String path = "eval/evalSelfScoreStd/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("evalSelfScoreStd:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listEvalSelfScoreStd";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions("evalSelfScoreStd:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalSelfScoreStd> list, int total) throws Exception {
		EvalSelfScoreStdQuery evalSelfScoreStdQuery = new EvalSelfScoreStdQuery();
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
		evalSelfScoreStdQuery.setPageNo(page);
		evalSelfScoreStdQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalSelfScoreStdQuery.setCode(context.getRequestParams().getStrIgnoreNull("code"));
		evalSelfScoreStdQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
		evalSelfScoreStdQuery.setPageNo(page);
		Pagination pagination= evalSelfScoreStdService.getEvalSelfScoreStdWithPage(evalSelfScoreStdQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("evalSelfScoreStd:edit")
	public String goEditView(Model model) {
		String evalSelfScoreStdId = context.getRequest().getParameter("id");
		EvalSelfScoreStd evalSelfScoreStd = new EvalSelfScoreStd();
		if (StringUtil.isNotEmpty(evalSelfScoreStdId) && StringUtil.isNumeric(evalSelfScoreStdId)) {
			evalSelfScoreStd = evalSelfScoreStdService.getEvalSelfScoreStdByKey(NumberUtil.parseLong(evalSelfScoreStdId));
		}
		model.addAttribute("dataBean", JSONObject.toJSONString(evalSelfScoreStd));
		return path + "cardEvalSelfScoreStd";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("evalSelfScoreStd:edit")
	@ResponseBody
	public void save(Model model, EvalSelfScoreStd evalSelfScoreStd) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalSelfScoreStd);
			if (evalSelfScoreStd.getId() > 0) {
				evalSelfScoreStd.setMender(context.getActiveUser().getUserid());
				evalSelfScoreStdService.updateEvalSelfScoreStdByKey(evalSelfScoreStd);
				setBean(evalSelfScoreStd);
				setResult(true, "考评基础分修改成功");
			} else {
				evalSelfScoreStd.setCreater(context.getActiveUser().getUserid());
				evalSelfScoreStd.setCreateDate(new Date());
				evalSelfScoreStdService.addEvalSelfScoreStd(evalSelfScoreStd);
				setBean(evalSelfScoreStd);
				setResult(true, "考评基础分新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("evalSelfScoreStd:del")
	@ResponseBody
	public void doDelete(Long id) {
		try {
			UserQuery userQuery = new UserQuery();
			userQuery.setEvalType(id);
			int useCount =  userService.findListNum(userQuery);
			if(useCount>0){
				returnErrorMsg("code", "考评基础分已被人员使用，请勿删除");
				return;
			}
			evalSelfScoreStdService.deleteEvalSelfScoreStdByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions("evalSelfScoreStd:query")
	public void export(Model model, EvalSelfScoreStd evalSelfScoreStd) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
