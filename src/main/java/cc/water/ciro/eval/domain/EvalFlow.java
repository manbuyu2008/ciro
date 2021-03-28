package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.BooleanEnum;

import java.util.Date;

public class EvalFlow  extends BaseEntity {
    private Long id;

    private String name;

    private String detail;

    private String ksEval;

    private String ksEvalName;

    private String ksRole;

    private String ksNote;

    private String dkEval;

    private String dkEvalName;

    private String dkRole;

    private String dkNote;

    private String corpEval;

    private String corpEvalName;

    private String corpRole;

    private String corpIds;

    private String corpNote;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail == null ? null : detail.trim();
    }

    public String getKsEval() {
        return ksEval;
    }

    public void setKsEval(String ksEval) {
        this.ksEval = ksEval == null ? null : ksEval.trim();
    }

    public String getKsRole() {
        return ksRole;
    }

    public void setKsRole(String ksRole) {
        this.ksRole = ksRole == null ? null : ksRole.trim();
    }

    public String getKsNote() {
        return ksNote;
    }

    public void setKsNote(String ksNote) {
        this.ksNote = ksNote == null ? null : ksNote.trim();
    }

    public String getDkEval() {
        return dkEval;
    }

    public void setDkEval(String dkEval) {
        this.dkEval = dkEval == null ? null : dkEval.trim();
    }

    public String getDkRole() {
        return dkRole;
    }

    public void setDkRole(String dkRole) {
        this.dkRole = dkRole == null ? null : dkRole.trim();
    }

    public String getDkNote() {
        return dkNote;
    }

    public void setDkNote(String dkNote) {
        this.dkNote = dkNote == null ? null : dkNote.trim();
    }

    public String getCorpEval() {
        return corpEval;
    }

    public void setCorpEval(String corpEval) {
        this.corpEval = corpEval == null ? null : corpEval.trim();
    }

    public String getCorpRole() {
        return corpRole;
    }

    public void setCorpRole(String corpRole) {
        this.corpRole = corpRole == null ? null : corpRole.trim();
    }

    public String getCorpIds() {
        return corpIds;
    }

    public void setCorpIds(String corpIds) {
        this.corpIds = corpIds == null ? null : corpIds.trim();
    }

    public String getCorpNote() {
        return corpNote;
    }

    public void setCorpNote(String corpNote) {
        this.corpNote = corpNote == null ? null : corpNote.trim();
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

    public String getKsEvalName() {
        if (StringUtil.isEmpty(ksEvalName) && ksEval != null) {
            BooleanEnum booleanEnum  = BooleanEnum.getByCode(ksEval);
            if(booleanEnum==null) return "";
            return booleanEnum.getMessage3();
        }
        return ksEvalName;
    }

    public String getDkEvalName() {
        if (StringUtil.isEmpty(dkEvalName) && dkEval != null) {
            BooleanEnum booleanEnum  = BooleanEnum.getByCode(dkEval);
            if(booleanEnum==null) return "";
            return booleanEnum.getMessage3();
        }
        return dkEvalName;
    }

    public String getCorpEvalName() {
        if (StringUtil.isEmpty(corpEvalName) && corpEval != null) {
            BooleanEnum booleanEnum  = BooleanEnum.getByCode(corpEval);
            if(booleanEnum==null) return "";
            return booleanEnum.getMessage3();
        }
        return corpEvalName;
    }
}