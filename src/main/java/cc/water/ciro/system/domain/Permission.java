package cc.water.ciro.system.domain;

import cc.water.ciro.common.domain.BaseEntity;

import java.util.List;


public class Permission extends BaseEntity{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String name;
	
	private String url;
	
	private String type;
	
	private String percode;
	
	private Long parentid;
	
	private String parentids;
	
	private String sortstring;
	
	private String available;

	private String menuIcon;

	private List<Permission> subsetPermission;
	
	private boolean checked;
	
	
	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public List<Permission> getSubsetPermission() {
		return subsetPermission;
	}

	public void setSubsetPermission(List<Permission> subsetPermission) {
		this.subsetPermission = subsetPermission;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPercode() {
		return percode;
	}

	public void setPercode(String percode) {
		this.percode = percode;
	}

	public Long getParentid() {
		return parentid;
	}

	public void setParentid(Long parentid) {
		this.parentid = parentid;
	}

	public String getParentids() {
		return parentids;
	}

	public void setParentids(String parentids) {
		this.parentids = parentids;
	}

	public String getSortstring() {
		return sortstring;
	}

	public void setSortstring(String sortstring) {
		this.sortstring = sortstring;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public String getAvailable() {
		return available;
	}

	public void setAvailable(String available) {
		this.available = available;
	}
	
	
	
}
