package cc.water.ciro.common.page;

import java.util.List;

public class PaginationBack<T> {
    public PaginationBack(int index, int pageSize, int total) {
        this.index = index;
        this.pageSize = pageSize;
        this.total = total;
        if (total % pageSize == 0) {
            this.totalPage = total / pageSize;
        } else {
            this.totalPage = total / pageSize + 1;
        }
    }

    // 总共的数据量
    private int total;

    // 每页显示多少条
    private int pageSize;

    // 共有多少页
    private int totalPage;

    // 当前是第几页
    private int index;

    // 数据
    private List<T> data;

    // 连接路径
    private String path = "";

    private String pageStr;

    private boolean entityOrField = false;
    /**
     * 页码HTML信息
     */
    @SuppressWarnings("unused")
    private String pageHTML;

    private int startPage; // 开始页面

    private int endPage; // 结束页面

    private int displayNum = 5; // 显示的页数

    /**
     * @return the startPage
     */
    public int getStartPage() {
        return startPage;
    }

    /**
     * @return the endPage
     */
    public int getEndPage() {
        return endPage;
    }

    /**
     * @return the path
     */
    public String getPath() {
        return path;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    /**
     * 设置路径前缀，页面第一页index为1
     *
     * @param path 此path含有参数形式，如/aa/article?page=,或者/bb/article/list/
     */
    public void setPath(String path) {
        this.path = path;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalPage() {
        return (this.total + this.pageSize - 1) / this.pageSize;
    }

    public int getIndex() {
        return index;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    /**
     * @return the total
     */
    public int getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(int total) {
        this.total = total;
    }

    public String getPageHTML() {
        totalPage = getTotalPage();
        StringBuffer displayInfo = new StringBuffer();
        if (totalPage != 0 && pageSize != 0) {
            displayInfo.append("<div class='pager'>");
            displayInfo.append("<span class='item nolink'>共<span class='num'>" + totalPage + "</span>页/<span class='num'>" + total + "</span>条记录</span>");
            //displayInfo.append("<span class='item nolink'>/<span class='num'>" + total + "</span>条记录</span>");
            // 判断如果当前是第一页 则“首页”和“第一页”失去链接
            if (index <= 1) {
                displayInfo.append("<span class='item nolink'>首页</span>");
                displayInfo.append("<span class='item nolink'>上一页</span>");
            } else {
                displayInfo.append("<span class='item'><a href='" + path + "1'>首页</a></span>");
                displayInfo.append("<span class='item'><a href='" + path + (index - 1) + "'>上一页</a></span>");
            }

            countPages();
            displayInfo.append("<span class='item nums'>");
            for (int i = startPage; i <= endPage; i++) {
                if (i == index) {
                    displayInfo.append("<span class='nolink'>" + i + "</span>");
                } else {
                    displayInfo.append("<a href='" + path + i + "'>" + i + "</a>");
                }
            }
            displayInfo.append("</span>");

            if (index >= totalPage) {
                displayInfo.append("<span class='item nolink'>下一页</span>");
                displayInfo.append("<span class='item nolink'>尾页</span>");
            } else {
                displayInfo.append("<span class='item'><a href='" + path + (index + 1) + "'>下一页</a></span>");
                displayInfo.append("<span class='item'><a href='" + path + totalPage + "'>尾页</a></span>");
            }
            displayInfo.append("</div>");
        }
        return displayInfo.toString();
    }

    /**
     * 计算起始页和结束页
     */
    public void countPages() {

        if (index - displayNum / 2 < 1) {
            startPage = 1;
            endPage = displayNum > totalPage ? totalPage : displayNum;
        } else if (index + displayNum / 2 > totalPage) {
            int n = totalPage - displayNum + 1;
            startPage = n > 0 ? n : 1;
            endPage = totalPage;
        } else {
            startPage = index - displayNum / 2;
            endPage = startPage + displayNum - 1;
        }
    }

    /**
     * @param pageHTML the pageHTML to set
     */
    public void setPageHTML(String pageHTML) {
        this.pageHTML = pageHTML;
    }

    public String getPageStr() {
        StringBuffer sb = new StringBuffer();
        if (total > 0) {
            sb.append("	<ul>\n");
            if (index == 1) {
                sb.append("	<li><a>共<font color=red>" + total + "</font>条</a></li>\n");
                sb.append("	<li><input type=\"number\" value=\"\" id=\"toGoPage\" style=\"width:50px;text-align:center;float:left\" placeholder=\"页码\"/></li>\n");
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"toTZ();\"  class=\"btn btn-mini btn-success\">跳转</a></li>\n");
                sb.append("	<li><a>首页</a></li>\n");
                sb.append("	<li><a>上页</a></li>\n");
            } else {
                sb.append("	<li><a>共<font color=red>" + total + "</font>条</a></li>\n");
                sb.append("	<li><input type=\"number\" value=\"\" id=\"toGoPage\" style=\"width:50px;text-align:center;float:left\" placeholder=\"页码\"/></li>\n");
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"toTZ();\"  class=\"btn btn-mini btn-success\">跳转</a></li>\n");
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"nextPage(1)\">首页</a></li>\n");
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"nextPage(" + (index - 1) + ")\">上页</a></li>\n");
            }
            int showTag = 5;//分页标签显示数量
            int startTag = 1;
            if (index > showTag) {
                startTag = index - 1;
            }
            int endTag = startTag + showTag - 1;
            for (int i = startTag; i <= totalPage && i <= endTag; i++) {
                if (index == i)
                    sb.append("<li><a><font color='#808080'>" + i + "</font></a></li>\n");
                else
                    sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"nextPage(" + i + ")\">" + i + "</a></li>\n");
            }
            if (index == totalPage) {
                sb.append("	<li><a>下页</a></li>\n");
                sb.append("	<li><a>尾页</a></li>\n");
            } else {
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"nextPage(" + (index + 1) + ")\">下页</a></li>\n");
                sb.append("	<li style=\"cursor:pointer;\"><a onclick=\"nextPage(" + getTotalPage() + ")\">尾页</a></li>\n");
            }
            sb.append("	<li><a>第" + index + "页</a></li>\n");
            sb.append("	<li><a>共" + getTotalPage() + "页</a></li>\n");


//			sb.append("	<li><select title='显示条数' style=\"width:55px;float:left;\" onchange=\"changeCount(this.value)\">\n");
//			sb.append("	<option value='"+pageSize+"'>"+pageSize+"</option>\n");
//			sb.append("	<option value='10'>10</option>\n");
//			sb.append("	<option value='20'>20</option>\n");
//			sb.append("	<option value='30'>30</option>\n");
//			sb.append("	<option value='40'>40</option>\n");
//			sb.append("	<option value='50'>50</option>\n");
//			sb.append("	<option value='60'>60</option>\n");
//			sb.append("	<option value='70'>70</option>\n");
//			sb.append("	<option value='80'>80</option>\n");
//			sb.append("	<option value='90'>90</option>\n");
//			sb.append("	<option value='99'>99</option>\n");
//			sb.append("	</select>\n");
//			sb.append("	</li>\n");


            sb.append("</ul>\n");
            sb.append("<script type=\"text/javascript\">\n");

            //换页函数
            sb.append("function nextPage(page){");
            sb.append(" top.jzts();");
            sb.append("	if(true && document.forms[0]){\n");
            sb.append("		var url = document.forms[0].getAttribute(\"action\");\n");
            sb.append("		if(url.indexOf('?')>-1){url += \"&" + (entityOrField ? "index" : "page.index") + "=\";}\n");
            sb.append("		else{url += \"?" + (entityOrField ? "index" : "pageIndex") + "=\";}\n");
            sb.append("		url = url + page + \"&" + (entityOrField ? "pageSize" : "pageSize") + "=" + pageSize + "\";\n");
            sb.append("		document.forms[0].action = url;\n");
            sb.append("		document.forms[0].submit();\n");
            sb.append("	}else{\n");
            sb.append("		var url = document.location+'';\n");
            sb.append("		if(url.indexOf('?')>-1){\n");
            sb.append("			if(url.indexOf('index')>-1){\n");
            sb.append("				var reg = /index=\\d*/g;\n");
            sb.append("				url = url.replace(reg,'index=');\n");
            sb.append("			}else{\n");
            sb.append("				url += \"&" + (entityOrField ? "index" : "pageIndex") + "=\";\n");
            sb.append("			}\n");
            sb.append("		}else{url += \"?" + (entityOrField ? "index" : "pageIndex") + "=\";}\n");
            sb.append("		url = url + page + \"&" + (entityOrField ? "pageSize" : "pageSize") + "=" + pageSize + "\";\n");
            sb.append("		document.location = url;\n");
            sb.append("	}\n");
            sb.append("}\n");

            //调整每页显示条数
            sb.append("function changeCount(value){");
            sb.append(" top.jzts();");
            sb.append("	if(true && document.forms[0]){\n");
            sb.append("		var url = document.forms[0].getAttribute(\"action\");\n");
            sb.append("		if(url.indexOf('?')>-1){url += \"&" + (entityOrField ? "index" : "page.index") + "=\";}\n");
            sb.append("		else{url += \"?" + (entityOrField ? "index" : "page.index") + "=\";}\n");
            sb.append("		url = url + \"1&" + (entityOrField ? "pageSize" : "page.pageSize") + "=\"+value;\n");
            sb.append("		document.forms[0].action = url;\n");
            sb.append("		document.forms[0].submit();\n");
            sb.append("	}else{\n");
            sb.append("		var url = document.location+'';\n");
            sb.append("		if(url.indexOf('?')>-1){\n");
            sb.append("			if(url.indexOf('index')>-1){\n");
            sb.append("				var reg = /index=\\d*/g;\n");
            sb.append("				url = url.replace(reg,'index=');\n");
            sb.append("			}else{\n");
            sb.append("				url += \"1&" + (entityOrField ? "index" : "page.index") + "=\";\n");
            sb.append("			}\n");
            sb.append("		}else{url += \"?" + (entityOrField ? "index" : "page.index") + "=\";}\n");
            sb.append("		url = url + \"&" + (entityOrField ? "pageSize" : "page.pageSize") + "=\"+value;\n");
            sb.append("		document.location = url;\n");
            sb.append("	}\n");
            sb.append("}\n");

            //跳转函数
            sb.append("function toTZ(){\n");
            sb.append("var toPaggeVlue = document.getElementById(\"toGoPage\").value;\n");
            sb.append("if(toPaggeVlue == ''){document.getElementById(\"toGoPage\").value=1;}\n");
            sb.append("if(isNaN(Number(toPaggeVlue))){document.getElementById(\"toGoPage\").value=1;}\n");
            sb.append("if(Number(toPaggeVlue)>"+totalPage+"){document.getElementById(\"toGoPage\").value="+totalPage+";}\n");
            sb.append("if(Number(toPaggeVlue)<1){document.getElementById(\"toGoPage\").value=1;}\n");
            sb.append("nextPage(document.getElementById(\"toGoPage\").value);\n");
            sb.append("}\n");
            sb.append("</script>\n");
        }
        pageStr = sb.toString();
        return pageStr;
    }

    public void setPageStr(String pageStr) {
        this.pageStr = pageStr;
    }

}
