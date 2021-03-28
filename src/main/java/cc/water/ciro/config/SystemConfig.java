package cc.water.ciro.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("systemConfig")
public class SystemConfig {

    @Value("${sysConfig.defaultPwd}")
    private String defaultPwd;

    @Value("${sysConfig.errorCountPwd}")
    private int errorCountPwd;

    @Value("${sysConfig.filePath}")
    private String filePath;

    @Value("${sysConfig.platformIp}")
    private String platformIp;

    @Value("${sysConfig.platformKey}")
    private String platformKey;

    @Value("${sysConfig.pwdLen}")
    private int pwdLen;

    @Value("${sysConfig.corpName}")
    private String corpName;

    public int getPwdLen() {
        return pwdLen;
    }

    public String getDefaultPwd() {
        return defaultPwd;
    }


    public int getErrorCountPwd() {
        return errorCountPwd;
    }

    public String getPlatformIp() {
        return platformIp;
    }

    public String getPlatformKey() {
        return platformKey;
    }

    public void setPlatformKey(String platformKey) {
        this.platformKey = platformKey;
    }

    public String getCorpName() {
        return corpName;
    }

    public String getFilePath() {
        return filePath;
    }
}