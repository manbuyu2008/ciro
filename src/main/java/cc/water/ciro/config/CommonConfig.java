package cc.water.ciro.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("commonConfig")
public class CommonConfig {

    /*是否启用验证码*/
    @Value("${commonConfig.useVerifyCode}")
    private boolean useVerifyCode = true;

    /*查询菜单是否默认收缩*/
    @Value("${commonConfig.useCollapsed}")
    private boolean useCollapsed = true;

    @Value("${commonConfig.copyRight}")
    private String copyRight;


    public boolean getUseCollapsed() {
        return useCollapsed;
    }

    public boolean getUseVerifyCode() {
        return useVerifyCode;
    }

    public String getCopyRight() {
        return copyRight;
    }
}