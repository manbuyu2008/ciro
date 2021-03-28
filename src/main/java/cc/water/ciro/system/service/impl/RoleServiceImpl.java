package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.system.dao.RoleDao;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.enums.RolePermissonTypeEnum;
import cc.water.ciro.system.query.RoleQuery;
import cc.water.ciro.system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl  extends BaseService implements RoleService {
	@Autowired
	private RoleDao roleDao;
	
	public void addRole(Role role) {
		role.setCreateDate(new Date());
		roleDao.insertRole(role);
	}
	@Transactional(readOnly=true)
	public Role getRoleByKey(Long id) {
		return roleDao.selectRoleByKey(id);
	}

	@Override
	public Role getRoleByCode(String code) {
		return roleDao.getRoleByCode(code);
	}

	@Transactional(readOnly=true)
	public List<Role> getRoleByKeys(List<Integer> ids) {
		return roleDao.selectRoleByKeys(ids);
	}

	public void deleteRoleByKey(Long id) {
		 roleDao.deleteRolePermissionByRoleId(id);
		 roleDao.deleteRoleByKey(id);
	}

	public void deleteRoleByKeys(List<Integer> ids) {
		 roleDao.deleteRoleByKeys(ids);
	}

	public void updateRoleByKey(Role role) {
		 role.setUpdateDate(new Date());
		 roleDao.updateRoleByKey(role);
	}
	@Transactional(readOnly=true)
	public Pagination getRoleWithPage(RoleQuery roleQuery) {
		Pagination<Role> pagination=new Pagination<Role>(roleQuery.getPageNo(), roleQuery.getPageSize(), roleDao.getRoleListCount(roleQuery));
		List<Role> roleList=roleDao.selectRoleListWithPage(roleQuery);
		pagination.setRows(roleList);
		return pagination;
	}

	@Override
	public int getRoleCount(RoleQuery roleQuery) {
		return roleDao.getRoleListCount(roleQuery);
	}

	@Transactional(readOnly=true)
	public List<Role> getAllRole(){
		return roleDao.selectAllRole();
	}
	
	@Transactional(readOnly=true)
	public List<Role> getRoleByUserId(Long userId){
		return roleDao.selectRoleByUserId(userId);
	}
	
	public void deleteRolePermissionByRoleId(Long roleId){
		roleDao.deleteRolePermissionByRoleId(roleId);
	}
	public void addRolePermission(Long roleId, Long permissionId,String status) {
		HashMap map=new HashMap();
		map.put("roleId", roleId);
		map.put("permissionId", permissionId);
		map.put("status", status);
		roleDao.insertRolePermission(map);
		
	}

	@Override
	public void saveRole(Long roleId, String ids, String ids2) {
		deleteRolePermissionByRoleId(roleId);
		String[] idStr=ids.split(",");
		for(int i=0;i<idStr.length;i++){
			addRolePermission(roleId, Long.parseLong(idStr[i]), RolePermissonTypeEnum.check.getCode());
		}
		if(StringUtil.isNotEmpty(ids2)){
			String[] idStr2=ids2.split(",");
			for(int i=0;i<idStr2.length;i++){
				addRolePermission(roleId, Long.parseLong(idStr2[i]), RolePermissonTypeEnum.unCheck.getCode());
			}
		}
	}
}
