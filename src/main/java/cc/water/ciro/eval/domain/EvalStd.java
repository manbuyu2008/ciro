package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.StateEnum;

import java.math.BigDecimal;
import java.util.Date;

public class EvalStd extends BaseEntity {
    private Long id;

    private String code;

    private String name;

    private String remark;

    private String status;

    private String eventType;

    private String eventTypeName;

    private BigDecimal beginScore;

    private BigDecimal endScore;

    private BigDecimal scoreMax;

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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType == null ? null : eventType.trim();
    }

    public String getEventTypeName() {
        if(StringUtil.isNotEmpty(eventType)) return StateEnum.getByCode(eventType).getMessage();
        return eventTypeName;
    }

    public BigDecimal getBeginScore() {
        return beginScore;
    }

    public void setBeginScore(BigDecimal beginScore) {
        this.beginScore = beginScore;
    }

    public BigDecimal getEndScore() {
        return endScore;
    }

    public void setEndScore(BigDecimal endScore) {
        this.endScore = endScore;
    }

    public BigDecimal getScoreMax() {
        return scoreMax;
    }

    public void setScoreMax(BigDecimal scoreMax) {
        this.scoreMax = scoreMax;
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