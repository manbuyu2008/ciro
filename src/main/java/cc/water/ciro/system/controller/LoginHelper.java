package cc.water.ciro.system.controller;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-12
 * Time: 上午1:07
 * To change this template use File | Settings | File Templates.
 */

import cc.water.ciro.enums.LoginFlagEnum;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 登录验证类
 */
@Service
public final class LoginHelper {
    @Autowired
    protected UserService userService;

    /**
     * 用户锁定
     *
     * @param user
     * @throws Exception
     */
    public void lockUser(User user) throws Exception {
        user.setErrorCount(user.getErrorCount() + 1);
        user.setFlag(LoginFlagEnum.LOCK.getCode());
        userService.updateUser(user);
    }

    public void userErrorCount(User user) throws Exception {
        user.setErrorCount(user.getErrorCount() + 1);
        userService.updateUser(user);
    }

    /**
     * 用户解除锁定
     *
     * @param user
     * @param user
     * @throws Exception
     */
    public void unlockUser(User user) throws Exception {
        user.setErrorCount(0);
        user.setFlag(LoginFlagEnum.NORMAL.getCode());
        userService.updateUser(user);
    }


}