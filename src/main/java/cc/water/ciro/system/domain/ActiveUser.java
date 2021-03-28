package cc.water.ciro.system.domain;

import cc.water.ciro.enums.PrivEnum;

import java.io.Serializable;
import java.util.List;

public class ActiveUser implements Serializable{
	private Long userid;
	private String usercode;//账号
	private String name;//用户名称
	private Long deptId;//部门ID
	private Dept dept;//部门
	private User user;//用户
	/*数据权限*/
	private PrivEnum dataLevel;
	private String sceneid;
	private List<Permission> menus;//菜单
	private List<Permission> permissions;//权限
	private String platformName;//平台授权名称

	public String getSceneid() {
		return sceneid;
	}
	public void setSceneid(String sceneid) {
		this.sceneid = sceneid;
	}
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public String getUsercode() {
		return usercode;
	}
	public void setUsercode(String usercode) {
		this.usercode = usercode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Permission> getMenus() {
		return menus;
	}
	public void setMenus(List<Permission> menus) {
		this.menus = menus;
	}
	public List<Permission> getPermissions() {
		return permissions;
	}
	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public Long getDeptId() {
		return deptId;
	}

	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}

	public Dept getDept() {
		return dept;
	}

	public void setDept(Dept dept) {
		this.dept = dept;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public PrivEnum getDataLevel() {
		return dataLevel;
	}

	public void setDataLevel(PrivEnum dataLevel) {
		this.dataLevel = dataLevel;
	}

	public String getPlatformName() {
		return platformName;
	}

	public void setPlatformName(String platformName) {
		this.platformName = platformName;
	}
}
