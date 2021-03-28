package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

public class EvalCommentQuery extends BaseQuery{
    private String did;
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }
}
