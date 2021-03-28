package cc.water.ciro.common.query;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class BaseQuery implements Serializable{
	private static final long serialVersionUID = 1L;
	/*用户IDs*/
	private List<String> ids;
	/*用户ID*/
	private Long id;
	//每页数
	protected int pageSize=10;
	//页码
	protected int pageNo=1;
	//起始行
	protected int startRow;
	//自定义条件
	protected String _sql;
	//自定义排序
	protected String strOrder;
	//自定义查询对象和值
	List<Map<String, Object>> _list;

	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		this.startRow = pageNo<=0?0:(pageNo-1)*this.pageSize;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo=pageNo;
		this.startRow = pageNo<=0?0:(pageNo-1)*this.pageSize;
	}

	public String get_sql() {
		return _sql;
	}

	public void set_sql(String _sql) {
		this._sql = _sql;
	}

	public List<Map<String, Object>> get_list() {
		return _list;
	}

	public void set_list(List<Map<String, Object>> _list) {
		this._list = _list;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	public String getStrOrder() {
		return strOrder;
	}

	public void setStrOrder(String strOrder) {
		this.strOrder = strOrder;
	}

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}
}
