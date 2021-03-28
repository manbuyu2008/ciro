package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

public class EvalEventEnumQuery extends BaseQuery{
    private String parentId;

    /*考评类型：科室 大科 单位*/
    private String status;
    /*明细类型：加分 减分 一票*/
    private String type;

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
