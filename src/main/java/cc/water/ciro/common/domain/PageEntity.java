package cc.water.ciro.common.domain;

import java.io.Serializable;

/**
 * Created by huangxl on 2016/11/29.
 */
public class PageEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	//页码
	private int page=1;
	//每页记录数
	private int rows=20;
	//排序字段
	private String sort;
	//升序、降序
	private String order;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
