package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

public class EvalUserTypeQuery extends BaseQuery{
    private String code;
    private String name;

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
}
