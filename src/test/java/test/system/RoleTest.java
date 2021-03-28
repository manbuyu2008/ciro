package test.system;

import com.alibaba.fastjson.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.service.RoleService;

import test.common.SpringJunitTest;

public class RoleTest extends SpringJunitTest{
	@Autowired
	private RoleService roleService;
	@Test
	public void saveTest(){
		Role role=new Role();
		role.setName("管理员");
		//Permission permission=new Permission();
		//permission.setId(56l);
		roleService.addRole(role);
		
	}
	@Test
	public void updateRoleByKey(){
		Role role=new Role();
		role.setId((int) 12l);
		role.setName("wallllll");
		String ss = JSONObject.toJSONString(role);
//		roleService.updateRoleByKey(role);
	}
}
