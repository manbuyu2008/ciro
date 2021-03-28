package cc.water.ciro.system.dao;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.query.PermissionQuery;

import java.util.HashMap;
import java.util.List;

@MapperDao
public interface PermissionDao {
	
	public int insertPermission(Permission permission);
	
	public int deletePermissionByKey(Integer id);
	
	public int deletePermissionByKeys(List<Integer> ids);
	
	public Permission selectPermissionByKey(Integer id);

	public Permission selectPermissionByName(String name);

	public List<Permission> selectPermissionByKeys(List<Integer> ids);
	
	public int updatePermissionByKey(Permission permission);
	
	public List<Permission> selectPermissionListWithPage(PermissionQuery permissionQuery);
	
	public int getPermissionListCount();
	
	public List<Permission> selectAllPermission();
	
	public List<Permission> selectPermissionByRoleId(HashMap map);
	
	public List<Permission> selectPermissionByMenu();
	
	public List<Permission> selectPermissionByParentid(Long parentid);
	
	public List<Permission> selectPermissionMenuByUserId(Long userid);
	
	public List<Permission> selectPermissionByUserId(Long userid);
	
	public List<Permission> selectPermissionByParentidNotOne(HashMap map);
}
