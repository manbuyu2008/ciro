package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.EnumUtil;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.PrivEnum;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.query.EvalUserTypeQuery;
import cc.water.ciro.eval.service.EvalUserTypeService;
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
@RequestMapping("/eval/userType/")
public class EvalUserTypeController extends ListController<EvalUserType> {
	
	@Autowired
	private UserService userService;
	@Autowired
	private EvalUserTypeService evalUserTypeService;

	final static String path = "eval/evalUserType/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("evalUserType:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listEvalUserType";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions("evalUserType:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<EvalUserType> list, int total) throws Exception {
		EvalUserTypeQuery evalUserTypeQuery = new EvalUserTypeQuery();
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
		evalUserTypeQuery.setPageNo(page);
		evalUserTypeQuery.setPageSize(rows);
		context.getResponseParams().put("pageNumber", page);
		evalUserTypeQuery.setCode(context.getRequestParams().getStrIgnoreNull("typeCode"));
		evalUserTypeQuery.setName(context.getRequestParams().getStrIgnoreNull("typeName"));
		evalUserTypeQuery.setPageNo(page);
		Pagination pagination= evalUserTypeService.getEvalUserTypeWithPage(evalUserTypeQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("evalUserType:edit")
	public String goEditView(Model model) {
		String evalUserTypeId = context.getRequest().getParameter("id");
		EvalUserType evalUserType = new EvalUserType();
		if (StringUtil.isNotEmpty(evalUserTypeId) && StringUtil.isNumeric(evalUserTypeId)) {
			evalUserType = evalUserTypeService.getEvalUserTypeByKey(NumberUtil.parseLong(evalUserTypeId));
		}
		model.addAttribute("evalUserType", JSONObject.toJSONString(evalUserType));
		return path + "cardEvalUserType";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("evalUserType:edit")
	@ResponseBody
	public void save(Model model, EvalUserType evalUserType) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), evalUserType);
			if (evalUserType.getId() > 0) {
				evalUserType.setMender(context.getActiveUser().getUserid());
				evalUserTypeService.updateEvalUserTypeByKey(evalUserType);
				setBean(evalUserType);
				setResult(true, "考评类型修改成功");
			} else {
				evalUserType.setCreater(context.getActiveUser().getUserid());
				evalUserType.setCreateDate(new Date());
				evalUserTypeService.addEvalUserType(evalUserType);
				setBean(evalUserType);
				setResult(true, "考评类型新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("evalUserType:del")
	@ResponseBody
	public void doDelete(Long id) {
		try {
			UserQuery userQuery = new UserQuery();
			userQuery.setEvalType(id);
			int useCount =  userService.findListNum(userQuery);
			if(useCount>0){
				returnErrorMsg("code", "考评类型已被人员使用，请勿删除");
				return;
			}
			evalUserTypeService.deleteEvalUserTypeByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}



	@RequestMapping("export.vm")
	@RequiresPermissions("evalUserType:query")
	public void export(Model model, EvalUserType evalUserType) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
