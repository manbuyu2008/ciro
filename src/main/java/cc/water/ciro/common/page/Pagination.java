package cc.water.ciro.common.page;

import java.util.List;

public class Pagination<T> {
    public Pagination(int pageNumber, int pageSize, int total) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.total = total;
        if(pageSize==0) this.totalPage=1;
        else {
            if (total % pageSize == 0) {
                this.totalPage = total / pageSize;
            } else {
                this.totalPage = total / pageSize + 1;
            }
        }
    }

    // 总共的数据量
    private int total;

    // 每页显示多少条
    private int pageSize;

    // 共有多少页
    private int totalPage;

    // 当前是第几页
    private int pageNumber;

    // 数据
    private List<T> rows;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}
