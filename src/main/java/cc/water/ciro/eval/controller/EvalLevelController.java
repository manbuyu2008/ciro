package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.EnumUtil;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.PrivEnum;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.query.EvalLevelQuery;
import cc.water.ciro.eval.service.EvalLevelService;
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
import java.util.*;

@Controller
@RequestMapping("/eval/evalLevel/")
public class EvalLevelController extends ListController<EvalLevel> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalLevelService evalLevelService;

	final static String path = "eval/evalLevel/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("evalLevel:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listEvalLevel";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions("evalLevel:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalLevel> list, int total) throws Exception {
		EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
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
		evalLevelQuery.setPageNo(page);
		evalLevelQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalLevelQuery.setCode(context.getRequestParams().getStrIgnoreNull("typeCode"));
		evalLevelQuery.setName(context.getRequestParams().getStrIgnoreNull("typeName"));
		evalLevelQuery.setPageNo(page);
		Pagination pagination= evalLevelService.getEvalLevelWithPage(evalLevelQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("evalLevel:edit")
	public String goEditView(Model model) {
		String evalLevelId = context.getRequest().getParameter("id");
		EvalLevel evalLevel = new EvalLevel();
		if (StringUtil.isNotEmpty(evalLevelId) && StringUtil.isNumeric(evalLevelId)) {
			evalLevel = evalLevelService.getEvalLevelByKey(NumberUtil.parseLong(evalLevelId));
		}
		model.addAttribute("dataBean", JSONObject.toJSONString(evalLevel));
		return path + "cardEvalLevel";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("evalLevel:edit")
	@ResponseBody
	public void save(Model model, EvalLevel evalLevel) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalLevel);
			if (evalLevel.getId() > 0) {
				evalLevel.setMender(context.getActiveUser().getUserid());
				evalLevelService.updateEvalLevelByKey(evalLevel);
				setBean(evalLevel);
				setResult(true, "考评等级修改成功");
			} else {
				evalLevel.setCreater(context.getActiveUser().getUserid());
				evalLevel.setCreateDate(new Date());
				evalLevelService.addEvalLevel(evalLevel);
				setBean(evalLevel);
				setResult(true, "考评等级新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("evalLevel:del")
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
			evalLevelService.deleteEvalLevelByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions("evalLevel:query")
	public void export(Model model, EvalLevel evalLevel) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
