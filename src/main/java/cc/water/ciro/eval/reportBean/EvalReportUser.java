package cc.water.ciro.eval.reportBean;

import java.io.Serializable;
import java.math.BigDecimal;

public class EvalReportUser  implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Long userId;

    private String userName;

    private Long deptId;

    private String deptName;

    private Long periodId;

    private String periodName;

    private Long userTypeId;

    private String userTypeName;

    private int nl;

    private String zc;

    private String selfLv;

    private BigDecimal selfScore;

    private String ksLv;

    private BigDecimal ksScore;

    private String dkLv;

    private BigDecimal dkScore;

    private String corpLv;

    private BigDecimal corpScore;

    private String evalLv;

    private BigDecimal score;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Long getUserTypeId() {
        return userTypeId;
    }

    public void setUserTypeId(Long userTypeId) {
        this.userTypeId = userTypeId;
    }

    public String getUserTypeName() {
        return userTypeName;
    }

    public void setUserTypeName(String userTypeName) {
        this.userTypeName = userTypeName;
    }

    public int getNl() {
        return nl;
    }

    public void setNl(int nl) {
        this.nl = nl;
    }

    public String getZc() {
        return zc;
    }

    public void setZc(String zc) {
        this.zc = zc;
    }

    public String getSelfLv() {
        return selfLv;
    }

    public void setSelfLv(String selfLv) {
        this.selfLv = selfLv;
    }

    public String getKsLv() {
        return ksLv;
    }

    public void setKsLv(String ksLv) {
        this.ksLv = ksLv;
    }

    public String getDkLv() {
        return dkLv;
    }

    public void setDkLv(String dkLv) {
        this.dkLv = dkLv;
    }


    public BigDecimal getSelfScore() {
        return selfScore;
    }

    public void setSelfScore(BigDecimal selfScore) {
        this.selfScore = selfScore;
    }

    public BigDecimal getKsScore() {
        return ksScore;
    }

    public void setKsScore(BigDecimal ksScore) {
        this.ksScore = ksScore;
    }

    public BigDecimal getDkScore() {
        return dkScore;
    }

    public void setDkScore(BigDecimal dkScore) {
        this.dkScore = dkScore;
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

    public Long getPeriodId() {
        return periodId;
    }

    public void setPeriodId(Long periodId) {
        this.periodId = periodId;
    }

    public String getPeriodName() {
        return periodName;
    }

    public void setPeriodName(String periodName) {
        this.periodName = periodName;
    }
}