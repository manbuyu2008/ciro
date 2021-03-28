package cc.water.ciro.system.query;

import cc.water.ciro.common.query.BaseQuery;

public class RoleQuery extends BaseQuery{
    private String code;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
