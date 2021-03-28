package cc.water.ciro.system.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.StateEnum;

public class Dept extends BaseEntity {
    private Long id;

    private String code;

    private String name;

    private String parentId;

    private String parentName;

    private Long levelNum;

    private String levelCode;

    private String deptType;

    private String status;

    private String statusName;

    private String stopInfo;

    private String stopTime;

    private String remark;

    private Dept parentDept;

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

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId == null ? null : parentId.trim();
    }

    public Long getLevelNum() {
        return levelNum;
    }

    public void setLevelNum(Long levelNum) {
        this.levelNum = levelNum;
    }

    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode == null ? null : levelCode.trim();
    }

    public String getDeptType() {
        return deptType;
    }

    public void setDeptType(String deptType) {
        this.deptType = deptType == null ? null : deptType.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getStopInfo() {
        return stopInfo;
    }

    public void setStopInfo(String stopInfo) {
        this.stopInfo = stopInfo == null ? null : stopInfo.trim();
    }

    public String getStopTime() {
        return stopTime;
    }

    public void setStopTime(String stopTime) {
        this.stopTime = stopTime == null ? null : stopTime.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getParentName() {
        if (StringUtil.isEmpty(parentName) && parentDept != null) return parentDept.getName();
        return parentName;
    }

    public String getStatusName() {
        if(StringUtil.isNotEmpty(status)&& StateEnum.getByCode(status)!=null) {
            return StateEnum.getByCode(status).getMessage();
        }else{
            return "";
        }
    }

    public Dept getParentDept() {
        return parentDept;
    }

    public void setParentDept(Dept parentDept) {
        this.parentDept = parentDept;
    }
}