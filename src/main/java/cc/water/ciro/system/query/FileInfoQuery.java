package cc.water.ciro.system.query;

import cc.water.ciro.common.query.BaseQuery;

public class FileInfoQuery extends BaseQuery{
    private String saveName;
    private String name;
    private String status;

    public String getSaveName() {
        return saveName;
    }

    public void setSaveName(String saveName) {
        this.saveName = saveName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
