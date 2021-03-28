package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.SexEnum;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.User;
import com.alibaba.fastjson.annotation.JSONField;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class EvalBaseInfo extends BaseEntity {

    private Long id;

    private String periodId;

    @JSONField(serialize = false)
    private EvalZq evalZq;

    private String periodName;

    private String selPeriodName;

    private String ks;

    @JSONField(serialize = false)
    private Dept ksDept;

    private String ksName;

    private Long userId;

    @JSONField(serialize = false)
    private User user;

    private String userName;

    private String selUserName;

    private String sex;

    private String sexName;

    private Integer nl;

    private String zc;

    private String selfAdvice;

    @JSONField(format = "yyyy-MM-dd")
    private Date selfDate;

    private String selfLv;

    private BigDecimal selfScore;

    private Long ksUserId;

    @JSONField(serialize = false)
    private User ksUser;

    private String ksUserName;

    private String ksAdvice;

    @JSONField(format = "yyyy-MM-dd")
    private Date ksDate;

    private String ksLv;

    private BigDecimal ksScore;

    private Long dkUserId;


    @JSONField(serialize = false)
    private User dkUser;

    private String dkUserName;

    private String dkAdvice;

    @JSONField(format = "yyyy-MM-dd")
    private Date dkDate;

    private String dkLv;

    private BigDecimal dkScore;

    private Long dwUserId;

    @JSONField(serialize = false)
    private User dwUser;

    private String dwUserName;

    private String corpAdvice;

    @JSONField(format = "yyyy-MM-dd")
    private Date corpDate;

    private String corpLv;

    private BigDecimal corpScore;

    private String evalLv;

    private BigDecimal score;

    private Long flowId;

    private Integer status;

    private String statusName;

    private Date createDate;

    private Date updateDate;

    private Long creater;

    private Long mender;

    @JSONField(serialize = false)
    private List<EvalSelfScoreStd> selfScoreStdList; //基础分项目明细

    @JSONField(serialize = false)
    private List<EvalSelfEnum> selfEnumList; //自评明细

    @JSONField(serialize = false)
    private List<EvalEventEnum> addKsEnumList; //科室加分明细

    @JSONField(serialize = false)
    private List<EvalEventEnum> delKsEnumList; //科室减分明细

    @JSONField(serialize = false)
    private List<EvalEventEnum> addDkEnumList; //大科室加分明细

    @JSONField(serialize = false)
    private List<EvalEventEnum> delDkEnumList; //大科室减分明细

    @JSONField(serialize = false)
    private List<EvalEventEnum> dwEnumList; //单位一票认定较差明细

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeriodId() {
        return periodId;
    }

    public void setPeriodId(String periodId) {
        this.periodId = periodId == null ? null : periodId.trim();
    }

    public String getKs() {
        return ks;
    }

    public void setKs(String ks) {
        this.ks = ks == null ? null : ks.trim();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
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
        this.zc = zc == null ? null : zc.trim();
    }

    public String getSelfAdvice() {
        return selfAdvice;
    }

    public void setSelfAdvice(String selfAdvice) {
        this.selfAdvice = selfAdvice == null ? null : selfAdvice.trim();
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
        this.selfLv = selfLv == null ? null : selfLv.trim();
    }

    public BigDecimal getSelfScore() {
        return selfScore;
    }

    public void setSelfScore(BigDecimal selfScore) {
        this.selfScore = selfScore;
    }

    public Long getKsUserId() {
        return ksUserId;
    }

    public void setKsUserId(Long ksUserId) {
        this.ksUserId = ksUserId;
    }

    public String getKsAdvice() {
        return ksAdvice;
    }

    public void setKsAdvice(String ksAdvice) {
        this.ksAdvice = ksAdvice == null ? null : ksAdvice.trim();
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
        this.ksLv = ksLv == null ? null : ksLv.trim();
    }

    public BigDecimal getKsScore() {
        return ksScore;
    }

    public void setKsScore(BigDecimal ksScore) {
        this.ksScore = ksScore;
    }

    public Long getDkUserId() {
        return dkUserId;
    }

    public void setDkUserId(Long dkUserId) {
        this.dkUserId = dkUserId;
    }

    public String getDkAdvice() {
        return dkAdvice;
    }

    public void setDkAdvice(String dkAdvice) {
        this.dkAdvice = dkAdvice == null ? null : dkAdvice.trim();
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
        this.dkLv = dkLv == null ? null : dkLv.trim();
    }

    public BigDecimal getDkScore() {
        return dkScore;
    }

    public void setDkScore(BigDecimal dkScore) {
        this.dkScore = dkScore;
    }

    public Long getDwUserId() {
        return dwUserId;
    }

    public void setDwUserId(Long dwUserId) {
        this.dwUserId = dwUserId;
    }

    public String getCorpAdvice() {
        return corpAdvice;
    }

    public void setCorpAdvice(String corpAdvice) {
        this.corpAdvice = corpAdvice == null ? null : corpAdvice.trim();
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
        this.corpLv = corpLv == null ? null : corpLv.trim();
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
        this.evalLv = evalLv == null ? null : evalLv.trim();
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public Long getFlowId() {
        return flowId;
    }

    public void setFlowId(Long flowId) {
        this.flowId = flowId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
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

    public Dept getKsDept() {
        return ksDept;
    }

    public void setKsDept(Dept ksDept) {
        this.ksDept = ksDept;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EvalZq getEvalZq() {
        return evalZq;
    }

    public void setEvalZq(EvalZq evalZq) {
        this.evalZq = evalZq;
    }

    public User getKsUser() {
        return ksUser;
    }

    public void setKsUser(User ksUser) {
        this.ksUser = ksUser;
    }

    public User getDkUser() {
        return dkUser;
    }

    public void setDkUser(User dkUser) {
        this.dkUser = dkUser;
    }

    public User getDwUser() {
        return dwUser;
    }

    public void setDwUser(User dwUser) {
        this.dwUser = dwUser;
    }

    public List<EvalEventEnum> getDwEnumList() {
        return dwEnumList;
    }

    public void setDwEnumList(List<EvalEventEnum> dwEnumList) {
        this.dwEnumList = dwEnumList;
    }

    public List<EvalEventEnum> getDelDkEnumList() {
        return delDkEnumList;
    }

    public void setDelDkEnumList(List<EvalEventEnum> delDkEnumList) {
        this.delDkEnumList = delDkEnumList;
    }

    public List<EvalEventEnum> getAddDkEnumList() {
        return addDkEnumList;
    }

    public void setAddDkEnumList(List<EvalEventEnum> addDkEnumList) {
        this.addDkEnumList = addDkEnumList;
    }

    public List<EvalEventEnum> getAddKsEnumList() {
        return addKsEnumList;
    }

    public void setAddKsEnumList(List<EvalEventEnum> addKsEnumList) {
        this.addKsEnumList = addKsEnumList;
    }

    public List<EvalEventEnum> getDelKsEnumList() {
        return delKsEnumList;
    }

    public void setDelKsEnumList(List<EvalEventEnum> delKsEnumList) {
        this.delKsEnumList = delKsEnumList;
    }

    public List<EvalSelfScoreStd> getSelfScoreStdList() {
        return selfScoreStdList;
    }

    public void setSelfScoreStdList(List<EvalSelfScoreStd> selfScoreStdList) {
        this.selfScoreStdList = selfScoreStdList;
    }

    public String getKsName() {
        if (StringUtil.isEmpty(ksName) && ksDept != null) return ksDept.getName();
        return ksName;
    }

    public String getUserName() {
        if (StringUtil.isEmpty(userName) && user != null) return user.getName();
        return userName;
    }

    public String getSexName() {
        if (StringUtil.isEmpty(sexName) && sex != null) {
            SexEnum sexEnum  = SexEnum.getByCode(sex);
            if(sexEnum==null) return "";
            return sexEnum.getMessage();
        }
        return sexName;
    }

    public String getPeriodName() {
        if (StringUtil.isEmpty(periodName) && evalZq != null) return evalZq.getName();
        return periodName;
    }

    public String getStatusName() {
        if (StringUtil.isEmpty(statusName) && status != null) {
            EvalFlowStatusEnum flowStatusEnum  = EvalFlowStatusEnum.getByValue(status);
            if(flowStatusEnum==null) return "";
            return flowStatusEnum.getMessage();
        }
        return statusName;
    }

    public List<EvalSelfEnum> getSelfEnumList() {
        return selfEnumList;
    }

    public void setSelfEnumList(List<EvalSelfEnum> selfEnumList) {
        this.selfEnumList = selfEnumList;
    }

    public String getKsUserName() {
        if (StringUtil.isEmpty(ksUserName) && ksUser != null) return ksUser.getName();
        return ksUserName;
    }

    public String getDkUserName() {
        if (StringUtil.isEmpty(dkUserName) && dkUser != null) return dkUser.getName();
        return dkUserName;
    }

    public String getDwUserName() {
        if (StringUtil.isEmpty(dwUserName) && dwUser != null) return dwUser.getName();
        return dwUserName;
    }

    public String getSelUserName() {
        return selUserName;
    }

    public void setSelUserName(String selUserName) {
        this.selUserName = selUserName;
    }

    public String getSelPeriodName() {
        return selPeriodName;
    }

    public void setSelPeriodName(String selPeriodName) {
        this.selPeriodName = selPeriodName;
    }
}