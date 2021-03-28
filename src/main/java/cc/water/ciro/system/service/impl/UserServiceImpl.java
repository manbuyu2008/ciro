package cc.water.ciro.system.service.impl;


import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.system.dao.DeptDao;
import cc.water.ciro.system.dao.UserDao;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.domain.SysUserRole;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.enums.RoleLevelEnum;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.RoleService;
import cc.water.ciro.system.service.UserService;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl  extends BaseService implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private DeptDao deptDao;
    @Autowired
    private RoleService roleService;
    @Autowired
    private SystemConfig systemConfig;

    @Override
    public void resetPassword(Long userId) {
        User user = userDao.selectUserByKey(userId);
        if(user!=null){
            /*默认密码*/
            String defaultPwd =  systemConfig.getDefaultPwd();
            String newPassword = new SimpleHash("md5",defaultPwd + CoreConsts.PWD_ENCODE_STRING + user.getSalt(),(Object)null,2).toHex();
            user.setPassword(newPassword);
            userDao.updateUserByKey(user);
        }
    }

    /**
     * 保存数据
     */
    public void addUser(User user) {
        String salt = NumberUtil.randomLetter();
        user.setSalt(salt);
        user.setCreateDate(new Date());
        /*默认密码*/
        String defaultPwd =  systemConfig.getDefaultPwd();
        String newPassword = new SimpleHash("md5",defaultPwd + CoreConsts.PWD_ENCODE_STRING + salt,(Object)null,2).toHex();
        user.setPassword(newPassword);
        userDao.insertUser(user);
        HashMap map = new HashMap();
        Role role = roleService.getRoleByCode(RoleLevelEnum.normal.getCode());
        if(role!=null) {
            map.put("userId", user.getId());
            map.put("roleId", role.getId());
            userDao.insertUserRole(map);
        }
    }

    /**
     * 根据主键获取数据
     */
    @Transactional(readOnly = true)
    public User getUserByKey(Long id) {
        User user = userDao.selectUserByKey(id);
        if (user != null) {
            user.setRoleList(roleService.getRoleByUserId(id));
            user.setDept(deptDao.selectByPrimaryKey(user.getDeptId()));
        }
        return user;
    }

    /**
     * 根据多个id批量获取数据
     */
    @Transactional(readOnly = true)
    public List<User> getUserByKeys(List<Integer> ids) {

        return userDao.selectUserByKeys(ids);
    }


    public void deleteByKey(Long id) {
        userDao.deleteUserRoleByUserId(id);
        userDao.deleteUserByKey(id);
    }


    public void deleteByKeys(List<Integer> ids) {

        userDao.deleteUserByKeys(ids);
    }



    public void updateUserRole(Long userId, String roleIds) {
        if(StringUtil.isNotEmpty(roleIds)) {
            userDao.deleteUserRoleByUserId(userId);
            String[] roleIdArray = roleIds.split(",");
            List<SysUserRole> sysUserRoles = new ArrayList<SysUserRole>();
            for(String roleId:roleIdArray) {
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setSysUserId(userId);
                sysUserRole.setSysRoleId(NumberUtil.parseLong(roleId));
                sysUserRoles.add(sysUserRole);
            }
            userDao.insertUserRoleBatch(sysUserRoles);
        }else{
            new Exception("角色提交有误！");
        }
    }

    public void updateUserByKey(User user) {
        userDao.updateUserByKey(user);
    }
    @Override
    public void updateUser(User user) {
        userDao.updateUserByKey(user);
    }

    @Transactional(readOnly = true)
    public Pagination getUserWithPage(UserQuery userQuery) {
        Pagination<User> pagination = new Pagination<User>(userQuery.getPageNo(), userQuery.getPageSize(), userDao.getUserListCount(userQuery));
        List<User> userList = userDao.selectUserListWithPage(userQuery);
        for (User user : userList) {
            user.setRoleList(roleService.getRoleByUserId(user.getId()));
            user.setDept(deptDao.selectByPrimaryKey(user.getDeptId()));
        }
        pagination.setRows(userList);
        return pagination;
    }

    @Override
    public int findRowNo(UserQuery userQuery) {
        return userDao.findRowNo(userQuery);
    }

    @Override
    public List<User> findList(UserQuery userQuery) {
        List<User> list = userDao.findList(userQuery);
        for(User user:list){
            user.setRoleList(roleService.getRoleByUserId(user.getId()));
            user.setDept(deptDao.selectByPrimaryKey(user.getDeptId()));
        }
        return list;
    }

    @Override
    public int findListNum(UserQuery userQuery) {
        return userDao.findListNum(userQuery);
    }

    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        User user =  userDao.selectUserByUsername(username);
        if(user!=null){
            user.setRoleList(roleService.getRoleByUserId(user.getId()));
            user.setDept(deptDao.selectByPrimaryKey(user.getDeptId()));
        }
        return user;
    }
}
