package cc.water.ciro.common.domain;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;

public class BaseEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	@JSONField(serialize = false)
	private Date createDate;
	@JSONField(serialize = false)
	private Date updateDate;
	@JSONField(serialize = false)
	private Long creater;
	@JSONField(serialize = false)
	private Long mender;

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
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
	
	
}
