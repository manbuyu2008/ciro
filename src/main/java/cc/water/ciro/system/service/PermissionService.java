package cc.water.ciro.system.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.query.PermissionQuery;

import java.util.List;

public interface PermissionService {
	public void addPermission(Permission permission);
	
	public Permission getPermissionByKey(Integer id);

	public Permission getPermissionByName(String name);

	public List<Permission> getPermissionByKeys(List<Integer> ids);
	
	public void deletePermissionByKey(Integer id);
	
	public void deletePermissionByKeys(List<Integer> ids);
	
	public void updatePermissionByKey(Permission permission);
	
	public Pagination getPermissionWithPage(PermissionQuery permissionQuery);
	
	public List<Permission> getAllPermission(Long roleId);
	
	public List<Permission> getPermissionByRoleId(Long roleId,String status);
	
	public List<Permission> getPermissionMenuByUserId(Long userid);
	
	public List<Permission> getPermissionByUserId(Long userid);

	public List<Permission> getPermissionByParentId(Long parentId);

	/**
	 * 是否末级
	 * @param id
	 * @return
	 */
	public boolean isLeaf(Long id);
}
