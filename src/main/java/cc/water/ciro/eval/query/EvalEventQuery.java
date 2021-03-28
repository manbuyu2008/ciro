package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

import java.util.Date;
import java.util.List;

public class EvalEventQuery extends BaseQuery{
    private String userId;

    private String ksId;

    private String typeId;

    private String isSh;

    private String shResult;

    private Date eventDate;

    private Date beginDate;

    private Date endDate;

    private String status;

    private List<String> ksList;

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

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getIsSh() {
        return isSh;
    }

    public void setIsSh(String isSh) {
        this.isSh = isSh;
    }

    public String getShResult() {
        return shResult;
    }

    public void setShResult(String shResult) {
        this.shResult = shResult;
    }

    public List<String> getKsList() {
        return ksList;
    }

    public void setKsList(List<String> ksList) {
        this.ksList = ksList;
    }
}
