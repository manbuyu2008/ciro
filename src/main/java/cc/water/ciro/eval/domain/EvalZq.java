package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.enums.EvalZqStatusEnum;

import java.math.BigDecimal;
import java.util.Date;

public class EvalZq extends BaseEntity {
    private Long id;

    private String code;

    private String name;

    private String cycleType;

    private String userType;

    private String evalType;

    private BigDecimal score;

    private String scoreMax;

    private String beginDate;

    private String endDate;

    private String eventBegin;

    private String eventEnd;

    private String grzpBegin;

    private String grzpEnd;

    private String ksevalBegin;

    private String ksevalEnd;

    private String dkevalBegin;

    private String dkevalEnd;

    private String dwevalBegin;

    private String dwevalEnd;

    private String remark;

    private Integer quorum;

    private Integer realNum;

    private String status;

    private String statusName;

    private Date addTime;

    private Date updateTime;

    private Long creater;

    private Long mender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCycleType() {
        return cycleType;
    }

    public void setCycleType(String cycleType) {
        this.cycleType = cycleType == null ? null : cycleType.trim();
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType == null ? null : userType.trim();
    }

    public String getEvalType() {
        return evalType;
    }

    public void setEvalType(String evalType) {
        this.evalType = evalType == null ? null : evalType.trim();
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public String getScoreMax() {
        return scoreMax;
    }

    public void setScoreMax(String scoreMax) {
        this.scoreMax = scoreMax == null ? null : scoreMax.trim();
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate == null ? null : beginDate.trim();
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate == null ? null : endDate.trim();
    }

    public String getEventBegin() {
        return eventBegin;
    }

    public void setEventBegin(String eventBegin) {
        this.eventBegin = eventBegin == null ? null : eventBegin.trim();
    }

    public String getEventEnd() {
        return eventEnd;
    }

    public void setEventEnd(String eventEnd) {
        this.eventEnd = eventEnd == null ? null : eventEnd.trim();
    }

    public String getGrzpBegin() {
        return grzpBegin;
    }

    public void setGrzpBegin(String grzpBegin) {
        this.grzpBegin = grzpBegin == null ? null : grzpBegin.trim();
    }

    public String getGrzpEnd() {
        return grzpEnd;
    }

    public void setGrzpEnd(String grzpEnd) {
        this.grzpEnd = grzpEnd == null ? null : grzpEnd.trim();
    }

    public String getKsevalBegin() {
        return ksevalBegin;
    }

    public void setKsevalBegin(String ksevalBegin) {
        this.ksevalBegin = ksevalBegin == null ? null : ksevalBegin.trim();
    }

    public String getKsevalEnd() {
        return ksevalEnd;
    }

    public void setKsevalEnd(String ksevalEnd) {
        this.ksevalEnd = ksevalEnd == null ? null : ksevalEnd.trim();
    }

    public String getDkevalBegin() {
        return dkevalBegin;
    }

    public void setDkevalBegin(String dkevalBegin) {
        this.dkevalBegin = dkevalBegin == null ? null : dkevalBegin.trim();
    }

    public String getDkevalEnd() {
        return dkevalEnd;
    }

    public void setDkevalEnd(String dkevalEnd) {
        this.dkevalEnd = dkevalEnd == null ? null : dkevalEnd.trim();
    }

    public String getDwevalBegin() {
        return dwevalBegin;
    }

    public void setDwevalBegin(String dwevalBegin) {
        this.dwevalBegin = dwevalBegin == null ? null : dwevalBegin.trim();
    }

    public String getDwevalEnd() {
        return dwevalEnd;
    }

    public void setDwevalEnd(String dwevalEnd) {
        this.dwevalEnd = dwevalEnd == null ? null : dwevalEnd.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getQuorum() {
        return quorum;
    }

    public void setQuorum(Integer quorum) {
        this.quorum = quorum;
    }

    public Integer getRealNum() {
        return realNum;
    }

    public void setRealNum(Integer realNum) {
        this.realNum = realNum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusName() {
        if(StringUtil.isEmpty(statusName)&&StringUtil.isNotEmpty(status)) return EvalZqStatusEnum.getByCode(status).getMessage();
        return statusName;
    }

    public Long getCreater() {
        return creater;
    }

    public void setCreater(Long creater) {
        this.creater = creater;
    }

    public Long getMender() {
        return mender;
    }

    public void setMender(Long mender) {
        this.mender = mender;
    }
}