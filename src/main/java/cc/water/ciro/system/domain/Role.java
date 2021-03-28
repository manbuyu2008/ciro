package cc.water.ciro.system.domain;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.PrivEnum;

public class Role extends BaseEntity{

	private static final long serialVersionUID = 1L;
	
	private long id;
	
	private String code;

	private String name;

	private String level;

	private String dataLevel;

	private String dataName;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getDataLevel() {
		return dataLevel;
	}

	public void setDataLevel(String dataLevel) {
		this.dataLevel = dataLevel;
	}

	public String getDataName() {
		if(StringUtil.isNotEmpty(dataLevel)&&PrivEnum.getByValue(NumberUtil.parseInt(dataLevel))!=null) {
			return PrivEnum.getByValue(NumberUtil.parseInt(dataLevel)).getMessage();
		}else{
			return "";
		}
	}
}
