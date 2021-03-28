package cc.water.ciro.eval.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.enums.EvalEventTypeEnum;
import cc.water.ciro.eval.enums.EvalRoleEnum;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.User;
import com.alibaba.fastjson.annotation.JSONField;

import java.math.BigDecimal;
import java.util.Date;

public class EvalEvent  extends BaseEntity {
    private Long id;

    private String userId;

    private String ksId;

    private String typeId;

    private String stdId;

    private String eventName;
    @JSONField(format="yyyy-MM-dd")
    private Date eventDate;

    private BigDecimal score;

    private String status;

    private String isSh;

    private String shResult;

    private BigDecimal qrScore;

    private String shRemark;

    private String fileUrl;

    private String remark;

    private Date addTime;

    private Date updateTime;

    private Long creater;

    private Long mender;

    @JSONField(serialize = false)
    private User user;
    @JSONField(serialize = false)
    private EvalStd evalStd;
    @JSONField(serialize = false)
    private Dept dept;

    private String typeName;

    private String userName;

    private String stdName;

    private String deptName;

    private String statusName;

    private String isShName;

    private String shResultName;

    private String scoreLimit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getKsId() {
        return ksId;
    }

    public void setKsId(String ksId) {
        this.ksId = ksId == null ? null : ksId.trim();
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId == null ? null : typeId.trim();
    }

    public String getStdId() {
        return stdId;
    }

    public void setStdId(String stdId) {
        this.stdId = stdId == null ? null : stdId.trim();
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName == null ? null : eventName.trim();
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
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
        this.status = status == null ? null : status.trim();
    }

    public String getIsSh() {
        return isSh;
    }

    public void setIsSh(String isSh) {
        this.isSh = isSh == null ? null : isSh.trim();
    }

    public String getShResult() {
        return shResult;
    }

    public void setShResult(String shResult) {
        this.shResult = shResult == null ? null : shResult.trim();
    }

    public BigDecimal getQrScore() {
        return qrScore;
    }

    public void setQrScore(BigDecimal qrScore) {
        this.qrScore = qrScore;
    }

    public String getShRemark() {
        return shRemark;
    }

    public void setShRemark(String shRemark) {
        this.shRemark = shRemark == null ? null : shRemark.trim();
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl == null ? null : fileUrl.trim();
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EvalStd getEvalStd() {
        return evalStd;
    }

    public void setEvalStd(EvalStd evalStd) {
        this.evalStd = evalStd;
    }

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public String getUserName() {
        if (StringUtil.isEmpty(userName) && user != null) return user.getName();
        return userName;
    }

    public String getStdName() {
        if (StringUtil.isEmpty(stdName) && evalStd != null) return evalStd.getName();
        return stdName;
    }

    public String getDeptName() {
        if (StringUtil.isEmpty(deptName) && dept != null) return dept.getName();
        return deptName;
    }

    public String getStatusName() {
        if (StringUtil.isEmpty(statusName) && status != null) {
            EvalRoleEnum evalRoleEnum  = EvalRoleEnum.getByCode(status);
            if(evalRoleEnum==null) return "";
            return evalRoleEnum.getMessage();
        }
        return statusName;
    }

    public String getIsShName() {
        if (StringUtil.isEmpty(isShName) && isSh != null) {
            BooleanEnum booleanEnum  = BooleanEnum.getByCode(isSh);
            if(booleanEnum==null) return "";
            return booleanEnum.getMessage();
        }
        return isShName;
    }

    public String getShResultName() {
        if (StringUtil.isEmpty(shResultName) && shResult != null) {
            BooleanEnum booleanEnum  = BooleanEnum.getByCode(shResult);
            if(booleanEnum==null) return "";
            return booleanEnum.getMessage2();
        }
        return shResultName;
    }

    public String getScoreLimit() {
        if (StringUtil.isEmpty(scoreLimit) && evalStd != null){
            if(evalStd.getStatus().equals("2")) return  "无";           /*一票认定较差*/
            return evalStd.getBeginScore()+"~"+evalStd.getEndScore();
        }
        return scoreLimit;
    }

    public String getTypeName() {
        if (StringUtil.isEmpty(typeName) && typeId != null) {
            EvalEventTypeEnum eventTypeEnum  = EvalEventTypeEnum.getByCode(typeId);
            if(eventTypeEnum==null) return "";
            return eventTypeEnum.getMessage();
        }
        return typeName;
    }
}