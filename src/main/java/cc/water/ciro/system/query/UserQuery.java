package cc.water.ciro.system.query;

import cc.water.ciro.common.query.BaseQuery;

import java.util.List;

public class UserQuery extends BaseQuery{

    private long deptId;

    private String username;

    private String name;

    private String flag;

    private String state;

    private String email;

    private String phone;

    /*部门IDs*/
    private List<Long> deptIds;

    /*部门名称*/
    private String deptName;

    private String levelCodeSeparator;

    /*部门是否单选*/
    private String oneDeptSelect;

    private String toEval;

    private Long evalDept;

    private Long evalType;

    private String evalTypes;

    public long getDeptId() {
        return deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public String getLevelCodeSeparator() {
        return levelCodeSeparator;
    }

    public void setLevelCodeSeparator(String levelCodeSeparator) {
        this.levelCodeSeparator = levelCodeSeparator;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Long> getDeptIds() {
        return deptIds;
    }

    public void setDeptIds(List<Long> deptIds) {
        this.deptIds = deptIds;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getOneDeptSelect() {
        return oneDeptSelect;
    }

    public void setOneDeptSelect(String oneDeptSelect) {
        this.oneDeptSelect = oneDeptSelect;
    }

    public Long getEvalType() {
        return evalType;
    }

    public void setEvalType(Long evalType) {
        this.evalType = evalType;
    }

    public String getToEval() {
        return toEval;
    }

    public void setToEval(String toEval) {
        this.toEval = toEval;
    }

    public Long getEvalDept() {
        return evalDept;
    }

    public void setEvalDept(Long evalDept) {
        this.evalDept = evalDept;
    }

    public String getEvalTypes() {
        return evalTypes;
    }

    public void setEvalTypes(String evalTypes) {
        this.evalTypes = evalTypes;
    }
}
