package cc.water.ciro.system.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.query.RoleQuery;

import java.util.List;

public interface RoleService {
	public void addRole(Role role);
	
	public Role getRoleByKey(Long id);

	public Role getRoleByCode(String code);
	
	public List<Role> getRoleByKeys(List<Integer> ids);
	
	public void deleteRoleByKey(Long id);
	
	public void deleteRoleByKeys(List<Integer> ids);
	
	public void updateRoleByKey(Role role);
	
	public Pagination getRoleWithPage(RoleQuery roleQuery);

	public int getRoleCount(RoleQuery roleQuery);

	public List<Role> getAllRole();
	
	public List<Role> getRoleByUserId(Long userId);
	
	public void deleteRolePermissionByRoleId(Long roleId);
	
	public void addRolePermission(Long roleId,Long permissionId,String status);

	public void saveRole(Long roleId,String ids,String ids2);
}
