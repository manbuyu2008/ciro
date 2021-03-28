package cc.water.ciro.system.dao;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.query.RoleQuery;

import java.util.HashMap;
import java.util.List;

@MapperDao
public interface RoleDao {
	
	public int insertRole(Role role);
	
	public int deleteRoleByKey(Long id);
	
	public int deleteRoleByKeys(List<Integer> ids);
	
	public Role selectRoleByKey(Long id);

	public Role getRoleByCode(String code);

	public List<Role> selectRoleByKeys(List<Integer> ids);
	
	public int updateRoleByKey(Role role);
	
	public List<Role> selectRoleListWithPage(RoleQuery roleQuery);
	
	public int getRoleListCount(RoleQuery roleQuery);
	
	public int insertRolePermission(HashMap map);
	
	public List<Role> selectAllRole();
	
	public List<Role> selectRoleByUserId(Long userId);
	
	public int deleteRolePermissionByRoleId(Long roleId);

	public int findRowNo(RoleQuery roleQuery);
}
