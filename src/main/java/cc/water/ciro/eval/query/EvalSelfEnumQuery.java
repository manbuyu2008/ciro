package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

public class EvalSelfEnumQuery extends BaseQuery{
    private String parentId;

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}
