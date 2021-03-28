/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.common.page;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 *                       
 * @Filename PageParam.java
 *
 * @Description 分页参数
 *
 * @Version 1.0
 *
 * @Author tanyongfu
 *
 * @Email tyongfu@yiji.com
 *       
 * @History
 *<li>Author: tanyongfu</li>
 *<li>Date: 2012-6-2</li>
 *<li>Version: 1.0</li>
 *<li>Content: create</li>
 *
 */
public class PageParam {
	//第几页
	int	pageNo = 1;
	//页面大小
	int	pageSize = 10;
	// 总共的数据量
	private int total;
	// 共有多少页
	private int totalPage;

	public PageParam() {
	}
	
	public PageParam(int pageNo, int pageSize) {
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.total = total;
		if (total % pageSize == 0) {
			this.totalPage = total / pageSize;
		} else {
			this.totalPage = total / pageSize + 1;
		}
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPageNo() {
		return pageNo;
	}
	
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	
	public int getPageSize() {
		return pageSize;
	}
	
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	/**
	 * @return
	 * @see Object#toString()
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.SHORT_PREFIX_STYLE);
	}
}
