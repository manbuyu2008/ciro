package cc.water.ciro.eval.reportQuery;

import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;

import java.util.List;

public class EvalReportDwQuery extends BaseQuery{
    /*人员*/
    private Long userId;
    /*科室*/
    private Long ksId;
    /*期间*/
    private Long periodId;
    /*人员考评类别*/
    private Long userTypeId;
    /*职称*/
    private String zc;
    /*性别*/
    private String sex;
    /*用户名*/
    private String userName;
    /*年龄开始*/
    private int nlStart;
    /*年龄结束*/
    private int nlEnd;

    private int status;

    private int type = 0;

    private int selfSubmit  = EvalFlowStatusEnum.KP_ME_SUBMIT.getValue();

    private int ksSubmit  = EvalFlowStatusEnum.KP_KS_SUBMIT.getValue();

    private int dkSubmit  = EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue();

    private int dwSubmit  = EvalFlowStatusEnum.KP_END.getValue();
    /*管理部门*/
    private List<String> ksList;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getKsId() {
        return ksId;
    }

    public void setKsId(Long ksId) {
        this.ksId = ksId;
    }

    public Long getPeriodId() {
        return periodId;
    }

    public void setPeriodId(Long periodId) {
        this.periodId = periodId;
    }

    public Long getUserTypeId() {
        return userTypeId;
    }

    public void setUserTypeId(Long userTypeId) {
        this.userTypeId = userTypeId;
    }

    public String getZc() {
        return zc;
    }

    public void setZc(String zc) {
        this.zc = zc;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getNlStart() {
        return nlStart;
    }

    public void setNlStart(int nlStart) {
        this.nlStart = nlStart;
    }

    public int getNlEnd() {
        return nlEnd;
    }

    public void setNlEnd(int nlEnd) {
        this.nlEnd = nlEnd;
    }

    public int getSelfSubmit() {
        return selfSubmit;
    }

    public void setSelfSubmit(int selfSubmit) {
        this.selfSubmit = selfSubmit;
    }

    public int getKsSubmit() {
        return ksSubmit;
    }

    public void setKsSubmit(int ksSubmit) {
        this.ksSubmit = ksSubmit;
    }

    public int getDkSubmit() {
        return dkSubmit;
    }

    public void setDkSubmit(int dkSubmit) {
        this.dkSubmit = dkSubmit;
    }

    public int getDwSubmit() {
        return dwSubmit;
    }

    public void setDwSubmit(int dwSubmit) {
        this.dwSubmit = dwSubmit;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public List<String> getKsList() {
        return ksList;
    }

    public void setKsList(List<String> ksList) {
        this.ksList = ksList;
    }
}
