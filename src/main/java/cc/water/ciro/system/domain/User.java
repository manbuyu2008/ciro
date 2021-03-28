package cc.water.ciro.system.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.enums.LoginFlagEnum;
import cc.water.ciro.enums.StateEnum;
import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;
import java.util.List;

public class User extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Long deptId;

    private String deptName;

    private String adminDeptId;

    private String username;

    @JSONField(serialize = false)
    private String password;

    private String name;

    private String email;

    private String phone;

    private String toEval;

    private Long evalDept;

    private Long evalType;

    private String photo;

    private String skin;

    private String mobile;

    private String postName;

    private String sex;

    private String loginIp;
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date lastDate;

    private int errorCount;

    private String state;

    private String stateName;

    private String flagName;
    @JSONField (format="yyyy-MM-dd")
    private Date birthdate;
    @JSONField (format="yyyy-MM-dd")
    private Date stopTime;

    private String stopInfo;

    private String bz;

    private String flag;

    private String salt;

    private Dept dept;

    private List<Role> roleList;

    private String roleNames;

    private String roleIds;

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public String getDeptName() {
        if (StringUtil.isEmpty(deptName) && dept != null) return dept.getName();
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getToEval() {
        return toEval;
    }

    public void setToEval(String toEval) {
        this.toEval = toEval;
    }

    public Long getEvalType() {
        return evalType;
    }

    public void setEvalType(Long evalType) {
        this.evalType = evalType;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Date getLastDate() {
        return lastDate;
    }

    public void setLastDate(Date lastDate) {
        this.lastDate = lastDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public int getErrorCount() {
        return errorCount;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getAdminDeptId() {
        return adminDeptId;
    }

    public void setAdminDeptId(String adminDeptId) {
        this.adminDeptId = adminDeptId;
    }

    public void setErrorCount(int errorCount) {
        this.errorCount = errorCount;
    }

    public String getSkin() {
        return skin;
    }

    public void setSkin(String skin) {
        this.skin = skin;
    }

    public Long getEvalDept() {
        return evalDept;
    }

    public void setEvalDept(Long evalDept) {
        this.evalDept = evalDept;
    }

    public String getRoleNames() {
        String roleNames = "";
        if(roleList!=null){
            for(Role role:roleList){
                if(StringUtil.isEmpty(roleNames)){
                    roleNames = role.getName();
                }else{
                    roleNames = roleNames+","+role.getName();
                }
            }
        }
        return roleNames;
    }

    public String getRoleIds() {
        String roleIds = "";
        if(roleList!=null){
            for(Role role:roleList){
                if(StringUtil.isEmpty(roleIds)){
                    roleIds = String.valueOf(role.getId());
                }else{
                    roleIds = roleIds+","+role.getId();
                }
            }
        }
        return roleIds;
    }


    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    public String getFlagName() {
        if(StringUtil.isNotEmpty(flag)&&LoginFlagEnum.getByCode(flag)!=null) {
            return LoginFlagEnum.getByCode(flag).getMessage();
        }else{
            return "";
        }
    }

    public void setFlagName(String flagName) {
        this.flagName = flagName;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Date getStopTime() {
        return stopTime;
    }

    public void setStopTime(Date stopTime) {
        this.stopTime = stopTime;
    }

    public String getStopInfo() {
        return stopInfo;
    }

    public void setStopInfo(String stopInfo) {
        this.stopInfo = stopInfo;
    }

    public String getStateName() {
        if(StringUtil.isNotEmpty(state)&& StateEnum.getByCode(state)!=null) {
            return StateEnum.getByCode(state).getMessage();
        }else{
            return "";
        }
    }
}
