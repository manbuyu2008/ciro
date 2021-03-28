package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.system.dao.PermissionDao;
import cc.water.ciro.system.domain.Permission;
import cc.water.ciro.system.enums.RolePermissonTypeEnum;
import cc.water.ciro.system.query.PermissionQuery;
import cc.water.ciro.system.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
@Service
@Transactional
public class PermissionServiceImpl  extends BaseService implements PermissionService{
	
	@Autowired
	private PermissionDao permissionDao;
	
	public void addPermission(Permission permission) {
		 permission.setCreateDate(new Date());
		 permissionDao.insertPermission(permission);
	}
	@Transactional(readOnly=true)
	public Permission getPermissionByKey(Integer id) {
		// TODO Auto-generated method stub
		return permissionDao.selectPermissionByKey(id);
	}

	@Transactional(readOnly=true)
	public Permission getPermissionByName(String name) {
		// TODO Auto-generated method stub
		return permissionDao.selectPermissionByName(name);
	}
	@Transactional(readOnly=true)
	public List<Permission> getPermissionByKeys(List<Integer> ids) {
		// TODO Auto-generated method stub
		return permissionDao.selectPermissionByKeys(ids);
	}

	public void deletePermissionByKey(Integer id) {
		// TODO Auto-generated method stub
		 permissionDao.deletePermissionByKey(id);
	}

	public void deletePermissionByKeys(List<Integer> ids) {
		// TODO Auto-generated method stub
		 permissionDao.deletePermissionByKeys(ids);
	}

	public void updatePermissionByKey(Permission permission) {
		 permission.setUpdateDate(new Date());
		 permissionDao.updatePermissionByKey(permission);
	}
	@Transactional(readOnly=true)
	public Pagination getPermissionWithPage(PermissionQuery permissionQuery) {
		Pagination<Permission> pagination=new Pagination<Permission>(permissionQuery.getPageNo(), permissionQuery.getPageSize(), permissionDao.getPermissionListCount());
		List<Permission> permissionList=permissionDao.selectPermissionListWithPage(permissionQuery);
		pagination.setRows(permissionList);
		return pagination;
	}
	
	@Transactional(readOnly=true)
	public List<Permission> getAllPermission(Long roleId) {
		List<Permission> permissionMeunList=permissionDao.selectPermissionByParentid(1l);
		HashMap map=new HashMap();
		map.put("roleId",roleId);
		map.put("status", RolePermissonTypeEnum.check.getCode());
		List<Permission> myPermissionList=permissionDao.selectPermissionByRoleId(map);
		Set set=new HashSet();
		for(int i=0;i<myPermissionList.size();i++){
			Permission p=myPermissionList.get(i);
			set.add(p.getId());
		}
		for(Permission permissionMeun:permissionMeunList){
			if(set.contains(permissionMeun.getId())){
				permissionMeun.setChecked(true);
			}else{
				permissionMeun.setChecked(false);
			}
			List<Permission> permissionOneChildList=permissionDao.selectPermissionByParentid(permissionMeun.getId());
			permissionMeun.setSubsetPermission(permissionOneChildList);
			for(Permission permissionChild:permissionOneChildList){
				if(set.contains(permissionChild.getId())){
					permissionChild.setChecked(true);
				}else{
					permissionChild.setChecked(false);
				}
				List<Permission> permissionTwoChildList=permissionDao.selectPermissionByParentid(permissionChild.getId());
				for(Permission permissionTwoChild:permissionTwoChildList){
					if(set.contains(permissionTwoChild.getId())){
						permissionTwoChild.setChecked(true);
					}else{
						permissionTwoChild.setChecked(false);
					}
				}
				permissionChild.setSubsetPermission(permissionTwoChildList);
			}
		}
		return permissionMeunList;
	}
	
	@Transactional(readOnly=true)
	public List<Permission> getPermissionByRoleId(Long roleId,String status) {
		HashMap map=new HashMap();
		map.put("roleId",roleId);
		map.put("status", status);
		return permissionDao.selectPermissionByRoleId(map);
	}
	@Transactional(readOnly=true)
	public List<Permission> getPermissionMenuByUserId(Long userid) {
		List<Permission> permissionList=permissionDao.selectPermissionMenuByUserId(userid);
		for(Permission p:permissionList){	
			HashMap map=new HashMap();
			map.put("parentid", p.getId());
			map.put("userid", userid);
			p.setSubsetPermission(permissionDao.selectPermissionByParentidNotOne(map));
		}
		return permissionDao.selectPermissionMenuByUserId(userid);
	}
	@Transactional(readOnly=true)
	public List<Permission> getPermissionByUserId(Long userid) {
		return permissionDao.selectPermissionByUserId(userid);
	}

	@Override
	public List<Permission> getPermissionByParentId(Long parentId) {
		return permissionDao.selectPermissionByParentid(parentId);
	}

	public boolean isLeaf(Long id) {
		return UtilPub.isEmpty(permissionDao.selectPermissionByParentid(id));
	}
	

}
