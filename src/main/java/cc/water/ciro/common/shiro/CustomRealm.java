package cc.water.ciro.common.shiro;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.sercurity.DES;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.system.domain.*;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.PermissionService;
import cc.water.ciro.system.service.RoleService;
import cc.water.ciro.system.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CustomRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;
    @Autowired
    private DeptService deptService;
    @Autowired
    private SystemConfig systemConfig;
    @Autowired
    private PermissionService permissionService;

    // 设置realm的名称
    @Override
    public void setName(String name) {
        super.setName("customRealm");
    }

    //realm的认证方法，从数据库查询用户信息
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken token) throws AuthenticationException {
        String userCode = (String) token.getPrincipal();
        if(!checkKeyBack(systemConfig.getCorpName(),systemConfig.getPlatformKey())){
            throw new AuthenticationException("系统未注册，请联系管理员！");
        }
        User user = null;
        Dept dept = null;
        try {
            user = userService.getUserByUsername(userCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (null == user) {
            return null;
        }
        try {
            dept = deptService.getDeptByKey(user.getDeptId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (null == dept) {
            dept = new Dept();
        }
        String password = user.getPassword();
        ActiveUser activeUser = new ActiveUser();
        activeUser.setUserid(user.getId());
        activeUser.setName(user.getName());
        activeUser.setDeptId(user.getDeptId());
        activeUser.setDept(dept);
        activeUser.setUsercode(user.getUsername());
        activeUser.setSceneid(user.getBz());
        activeUser.setUser(user);
            List<Permission> menus = null;
        try {
            menus = permissionService.getPermissionMenuByUserId(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (menus.size() == 0) {
            throw new AuthenticationException("未分配任何权限，请联系管理员！");
        }
        activeUser.setMenus(menus);
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
                activeUser, password, this.getName());
        return simpleAuthenticationInfo;
    }

    private boolean checkKeyBack(String regName,String regKey) {
        boolean result = false;
        String[] regKeys = regKey.split(",");
        if(regKeys.length!=2) return   false;
        DES des = null;// 自定义密钥
        try {
            des = new DES("ydyf");
            String sortKry = des.decrypt(regKeys[0]);
            String platKey =  new SimpleHash("md5",regName+sortKry+CoreConsts.PWD_REG_STRING,(Object)null,5).toHex();
            if(platKey.equals(regKeys[1])) {
                return   true;
            }
        } catch (Exception e) {
            result  = false;
        }
        return result;
    }

    // 授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {
        ActiveUser activeUser = (ActiveUser) principals.getPrimaryPrincipal();
        List<Permission> permissionList = null;
        Set<String> roles = new HashSet<String>();
        try {
            permissionList = permissionService.getPermissionByUserId(activeUser.getUserid());
            List<Role> roleList = activeUser.getUser().getRoleList();
            if(roleList!=null) {
                for (Role role:roleList){
                    roles.add(role.getCode());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<String> permissions = new ArrayList<String>();
        if (permissionList != null) {
            for (Permission permission : permissionList) {
                permissions.add(permission.getPercode());
            }
        }

        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addStringPermissions(permissions);
        simpleAuthorizationInfo.setRoles(roles);
        return simpleAuthorizationInfo;
    }

    //清除缓存
    public void clearCached() {
        PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
        super.clearCache(principals);
    }
}
