package cc.water.ciro.eval.query;

import cc.water.ciro.common.query.BaseQuery;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class EvalBaseInfoQuery extends BaseQuery{

    private String periodId;

    private String ks;

    private List<String> ksList;

    private String userId;

    private String sex;

    private Integer nl;

    private String zc;

    private Date selfDate;

    private String selfLv;

    private BigDecimal selfScore;

    private Date ksDate;

    private String ksLv;

    private BigDecimal ksScore;

    private Date dkDate;

    private String dkLv;

    private BigDecimal dkScore;

    private Date corpDate;

    private String corpLv;

    private BigDecimal corpScore;

    private String evalLv;

    private BigDecimal score;

    private String status;

    public String getPeriodId() {
        return periodId;
    }

    public void setPeriodId(String periodId) {
        this.periodId = periodId;
    }

    public String getKs() {
        return ks;
    }

    public void setKs(String ks) {
        this.ks = ks;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getNl() {
        return nl;
    }

    public void setNl(Integer nl) {
        this.nl = nl;
    }

    public String getZc() {
        return zc;
    }

    public void setZc(String zc) {
        this.zc = zc;
    }

    public Date getSelfDate() {
        return selfDate;
    }

    public void setSelfDate(Date selfDate) {
        this.selfDate = selfDate;
    }

    public String getSelfLv() {
        return selfLv;
    }

    public void setSelfLv(String selfLv) {
        this.selfLv = selfLv;
    }

    public BigDecimal getSelfScore() {
        return selfScore;
    }

    public void setSelfScore(BigDecimal selfScore) {
        this.selfScore = selfScore;
    }

    public Date getKsDate() {
        return ksDate;
    }

    public void setKsDate(Date ksDate) {
        this.ksDate = ksDate;
    }

    public String getKsLv() {
        return ksLv;
    }

    public void setKsLv(String ksLv) {
        this.ksLv = ksLv;
    }

    public BigDecimal getKsScore() {
        return ksScore;
    }

    public void setKsScore(BigDecimal ksScore) {
        this.ksScore = ksScore;
    }

    public Date getDkDate() {
        return dkDate;
    }

    public void setDkDate(Date dkDate) {
        this.dkDate = dkDate;
    }

    public String getDkLv() {
        return dkLv;
    }

    public void setDkLv(String dkLv) {
        this.dkLv = dkLv;
    }

    public BigDecimal getDkScore() {
        return dkScore;
    }

    public void setDkScore(BigDecimal dkScore) {
        this.dkScore = dkScore;
    }

    public Date getCorpDate() {
        return corpDate;
    }

    public void setCorpDate(Date corpDate) {
        this.corpDate = corpDate;
    }

    public String getCorpLv() {
        return corpLv;
    }

    public void setCorpLv(String corpLv) {
        this.corpLv = corpLv;
    }

    public BigDecimal getCorpScore() {
        return corpScore;
    }

    public void setCorpScore(BigDecimal corpScore) {
        this.corpScore = corpScore;
    }

    public String getEvalLv() {
        return evalLv;
    }

    public void setEvalLv(String evalLv) {
        this.evalLv = evalLv;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getKsList() {
        return ksList;
    }

    public void setKsList(List<String> ksList) {
        this.ksList = ksList;
    }
}
