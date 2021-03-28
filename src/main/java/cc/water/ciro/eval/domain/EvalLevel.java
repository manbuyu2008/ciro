package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;

import java.math.BigDecimal;
import java.util.Date;

public class EvalLevel extends BaseEntity {
    private Long id;

    private String code;

    private String name;

    private BigDecimal beginScore;

    private BigDecimal endScore;

    private String remark;

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