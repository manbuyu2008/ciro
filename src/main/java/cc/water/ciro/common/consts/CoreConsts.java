package cc.water.ciro.common.consts;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午12:51
 * To change this template use File | Settings | File Templates.
 */
public final class CoreConsts {
    public final static String USER_LOGIN_ID_X = "USER_LOGIN_ID_X";
    /*取session中账号信息参数*/
    public final static String LOGIN_CODE = "_LOGIN_CODE";

    //登录事件
    public static String EVENT_LOGIN = "E_LOGIN";
    //注销事件
    public static String EVENT_LOGOUT = "E_LOGOUT";
    //初始密码
    public static final String DEF_PWD = "1";
    /*系统空数据*/
    public static final String NULL_STRING = "-";
    /*多数据存储间隔*/
    public static final String MORE_STRING = ",";
    /*系统树形结构code分隔符*/
    public final static String LEVELCODE_SEPARATOR = "-";
    public final static String MENU_SEPARATOR = "/";
    /*加密秘钥*/
    public static final String PWD_ENCODE_STRING = "ciroPwd!@#$!@#$%!";
    /*授权秘钥*/
    public static final String PWD_REG_STRING =  "ciroPlatKey!###%^&*()";
    /*是否需要验证码配置参数名称*/
    public static final String LOGIN_HAS_VERIFY = "isLoginVerify";
}
