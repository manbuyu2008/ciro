package cc.water.ciro.system.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PermissionController extends ListController<Permission> {
		@Autowired
		private PermissionService permissionService;
		@RequestMapping("/admin/permission/doAdd.vm")
		public void doAdd(Permission permission){
			permissionService.addPermission(permission);
		}

}
