package cc.water.ciro.system.query;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.query.BaseQuery;

import java.util.List;

public class DeptQuery extends BaseQuery {
	private String parentId;
	private List<String> _levelCodes;
	private String code;
	private String name;
	private String status;
	private String levelCodeChild;
	/*部门是否单选*/
	private String oneDeptSelect;

	private String levelCodeSeparator = CoreConsts.LEVELCODE_SEPARATOR;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

    public List<String> get_levelCodes() {
        return _levelCodes;
    }

    public void set_levelCodes(List<String> _levelCodes) {
        this._levelCodes = _levelCodes;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLevelCodeChild() {
		return levelCodeChild;
	}

	public void setLevelCodeChild(String levelCodeChild) {
		this.levelCodeChild = levelCodeChild;
	}

	public String getOneDeptSelect() {
		return oneDeptSelect;
	}

	public void setOneDeptSelect(String oneDeptSelect) {
		this.oneDeptSelect = oneDeptSelect;
	}

	public String getLevelCodeSeparator() {
		return levelCodeSeparator;
	}

	public void setLevelCodeSeparator(String levelCodeSeparator) {
		this.levelCodeSeparator = levelCodeSeparator;
	}
}
