package test;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.sercurity.DES;
import cc.water.ciro.system.domain.Role;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.crypto.hash.SimpleHash;

/**
 * Created by Administrator on 2016/11/24.
 */
public class Test {
    public static void main(String[] args) throws Exception {
        String corpName = "徐州市医德医风考评系统";
        String test =  DES.strDefaultKey;
        DES des = new DES("ydyf");// 自定义密钥
        System.out.println("加密前的字符：" + test);
//        System.out.println("解密后的字符：" + des.decrypt(des.encrypt(test)));
        System.out.println("加密后的字符：" + des.encrypt(test));// length=32   des.encrypt(test),platKey

        String password =  new SimpleHash("md5",corpName+"ciroPwd!@#$!@#$%!"+"vilkjuye",(Object)null,2).toHex();

        String platKey =  new SimpleHash("md5",corpName + DES.strDefaultKey+ CoreConsts.PWD_REG_STRING,(Object)null,5).toHex();
        System.out.println(password);
        System.out.println(des.encrypt(test)+","+platKey);
//        Role role=new Role();
//        role.setId((int) 12l);
//        role.setName("wallllll");
//        String ss = JSONObject.toJSONString(role);
//        System.out.println(ss);
    }
}
