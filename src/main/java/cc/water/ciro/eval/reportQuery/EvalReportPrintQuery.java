package cc.water.ciro.eval.reportQuery;

import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;

public class EvalReportPrintQuery extends BaseQuery{
    private Long id;

    private String type;

    private String status = "0";

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
