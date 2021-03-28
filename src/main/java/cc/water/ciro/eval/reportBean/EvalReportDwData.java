package cc.water.ciro.eval.reportBean;

import java.io.Serializable;
import java.math.BigDecimal;

public class EvalReportDwData implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long deptId;

    private Long parentId;

    private String deptName;

    private String levelCode;

    private Long periodId;

    private String periodName;

    private Long userTypeId;

    private String userTypeName;

    private int allNum;

    private int selfYesNum;

    private int selfNoNum;

    private int ksYesNum;

    private int ksNoNum;

    private int dkYesNum;

    private int dkNoNum;

    private int dwYesNum;

    private int dwNoNum;

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

    public int getAllNum() {
        return allNum;
    }

    public void setAllNum(int allNum) {
        this.allNum = allNum;
    }

    public int getSelfYesNum() {
        return selfYesNum;
    }

    public void setSelfYesNum(int selfYesNum) {
        this.selfYesNum = selfYesNum;
    }

    public int getSelfNoNum() {
        return selfNoNum;
    }

    public void setSelfNoNum(int selfNoNum) {
        this.selfNoNum = selfNoNum;
    }

    public int getKsYesNum() {
        return ksYesNum;
    }

    public void setKsYesNum(int ksYesNum) {
        this.ksYesNum = ksYesNum;
    }

    public int getKsNoNum() {
        return ksNoNum;
    }

    public void setKsNoNum(int ksNoNum) {
        this.ksNoNum = ksNoNum;
    }

    public int getDkYesNum() {
        return dkYesNum;
    }

    public void setDkYesNum(int dkYesNum) {
        this.dkYesNum = dkYesNum;
    }

    public int getDkNoNum() {
        return dkNoNum;
    }

    public void setDkNoNum(int dkNoNum) {
        this.dkNoNum = dkNoNum;
    }

    public int getDwYesNum() {
        return dwYesNum;
    }

    public void setDwYesNum(int dwYesNum) {
        this.dwYesNum = dwYesNum;
    }

    public int getDwNoNum() {
        return dwNoNum;
    }

    public void setDwNoNum(int dwNoNum) {
        this.dwNoNum = dwNoNum;
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

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode;
    }
}