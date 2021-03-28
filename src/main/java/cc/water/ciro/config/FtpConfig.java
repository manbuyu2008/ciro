package cc.water.ciro.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("ftpConfig")
public class FtpConfig {
    @Value("${ftpConFig.ftpServerIp}")
    private String ftpServerIp;

    @Value("${ftpConFig.ftpPort}")
    private String ftpPort;

    @Value("${ftpConFig.ftpUserName}")
    private String ftpUserName;

    @Value("${ftpConFig.ftpPassword}")
    private String ftpPassword;

    public String getFtpServerIp() {
        return ftpServerIp;
    }

    public String getFtpPort() {
        return ftpPort;
    }

    public String getFtpUserName() {
        return ftpUserName;
    }

    public String getFtpPassword() {
        return ftpPassword;
    }
}