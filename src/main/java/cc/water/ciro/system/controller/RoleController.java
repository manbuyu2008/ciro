package cc.water.ciro.system.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.EnumUtil;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.PrivEnum;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.enums.RoleLevelEnum;
import cc.water.ciro.system.enums.RoleLevelTypeEnum;
import cc.water.ciro.system.query.RoleQuery;
import cc.water.ciro.system.service.PermissionService;
import cc.water.ciro.system.service.RoleService;
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
@RequestMapping("/admin/role/")
public class RoleController extends ListController<Role> {
	
	@Autowired
	private PermissionService permissionService;
	@Autowired
	private RoleService roleService;

	final static String path = "sys/base/role/";
	
	@RequestMapping("list.vm")
	@RequiresPermissions("role:query")
	public String goListView(HttpServletRequest request, HttpServletResponse response,
							 Model model) {
		return path + "listRole";
	}

	@RequestMapping("data.vm")
	@RequiresPermissions("role:query")
	@ResponseBody
	public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
		super.data();
	}

	protected void loadData(final List<Role> list, int total) throws Exception {
		RoleQuery roleQuery = new RoleQuery();
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
		roleQuery.setPageNo(page);
		roleQuery.setPageSize(rows);
		String order = context.getPageEntity().getOrder();
		context.getResponseParams().put("pageNumber", page);
		roleQuery.setCode(context.getRequestParams().getStrIgnoreNull("code"));
		roleQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
		roleQuery.setPageNo(page);
		Pagination pagination= roleService.getRoleWithPage(roleQuery);
		if(pagination!=null&&pagination.getRows()!=null) {
			list.addAll(pagination.getRows());
			setTotal(pagination.getTotal());
		}
	}

	@RequestMapping("card.vm")
	@RequiresPermissions("role:edit")
	public String goEditView(Model model) {
		String roleId = context.getRequest().getParameter("id");
		Role role = new Role();
		if (StringUtil.isNotEmpty(roleId) && StringUtil.isNumeric(roleId)) {
			role = roleService.getRoleByKey(NumberUtil.parseLong(roleId));
		}
		model.addAttribute("role", JSONObject.toJSONString(role));
		model.addAttribute("level", role.getLevel());
		List<Map<String,String>>  dataLevelMap = new ArrayList<Map<String,String>>();
		List<PrivEnum>   list = (List<PrivEnum>)  EnumUtil.getEnumList(PrivEnum.class);
		for(PrivEnum privEnum:list){
			Map<String,String> map = new HashMap<String,String>();
			map.put("id", String.valueOf(privEnum.getValue()));
			map.put("text",privEnum.getMessage());
			dataLevelMap.add(map);
		}
		model.addAttribute("dataLevel", JSONObject.toJSONString(dataLevelMap));
		return path + "cardRole";
	}

	@RequestMapping("save.vm")
	@RequiresPermissions("role:edit")
	@ResponseBody
	public void save(Model model, Role role) {
		try {
			MapBeanUtil.map2PO(context.getRequestParams(), role);
			if (role.getId() > 0) {
				role.setMender(context.getActiveUser().getUserid());
				roleService.updateRoleByKey(role);
				setBean(role);
				setResult(true, "角色修改成功");
			} else {
				role.setCreater(context.getActiveUser().getUserid());
				role.setCreateDate(new Date());
				role.setLevel(RoleLevelTypeEnum.user.getCode());
				roleService.addRole(role);
				setBean(role);
				setResult(true, "角色新增成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
	}

	@RequestMapping("del.vm")
	@RequiresPermissions("role:del")
	@ResponseBody
	public void doDelete(Long id) {
		try {
			Role role =  roleService.getRoleByKey(id);
			if(role.getLevel().equals("sys")){
				returnErrorMsg("code", "系统预置角色，请勿删除");
				return;
			}
			roleService.deleteRoleByKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}

	
	@RequestMapping("saveRole.vm")
	@RequiresPermissions("role:edit")
	@ResponseBody
	public void saveRole(Long roleId,String ids,String ids2){
		try {
			roleService.saveRole(roleId,ids,ids2);
		} catch (Exception e) {
			e.printStackTrace();
			returnErrorMsg("code", e.getMessage());
			return;
		}
		setResult(true, "删除成功");
	}

	@RequestMapping("export.vm")
	@RequiresPermissions("role:query")
	public void export(Model model, Role role) {
		try {
			super.export();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
