package cc.water.ciro.eval.reportBean;

import java.io.Serializable;

public class EvalReportUserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String userId;

    private String ksId;

    private String userName;

    private String ksName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getKsId() {
        return ksId;
    }

    public void setKsId(String ksId) {
        this.ksId = ksId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getKsName() {
        return ksName;
    }

    public void setKsName(String ksName) {
        this.ksName = ksName;
    }
}