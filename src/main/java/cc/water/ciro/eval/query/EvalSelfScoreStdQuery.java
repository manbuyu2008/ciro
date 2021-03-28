package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

import java.util.Date;

public class EvalSelfScoreStdQuery extends BaseQuery{

    private String code;

    private String name;

    private String userTypeId;

    private String status;

    public String getUserTypeId() {
        return userTypeId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserTypeId(String userTypeId) {
        this.userTypeId = userTypeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
