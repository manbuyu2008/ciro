package cc.water.ciro.common.domain;

import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.system.domain.ActiveUser;
import org.json.JSONException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-7-11
 * Time: 上午12:05
 * To change this template use File | Settings | File Templates.
 */
public final class ActionContext {
    private Map<String, Object> session;
    private HttpServletRequest request;
    private HttpServletResponse response;

    //页面参数（查询条件）
    private String dataParam;
    //请求的页面Bean
    private PageMap requestParams = new PageMap();
    //返回的页面Bean
    private PageMap responseParams = new PageMap();

    private ActiveUser activeUser;

    private PageEntity pageEntity = new PageEntity();

    public ActionContext() {
    }

    public PageMap getRequestParams() {
        return requestParams;
    }

    public void setRequestParams(PageMap requestParams) {
        if (requestParams != null) this.requestParams = requestParams;
    }

    public PageMap getResponseParams() {
        return responseParams;
    }

    public void setResponseParams(PageMap responseParams) {
        this.responseParams = responseParams;
    }


    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletResponse getResponse() {
        return response;
    }

    public void setResponse(HttpServletResponse response) {
        this.response = response;
    }

    public Map<String, Object> getSession() {
        return session;
    }

    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public void setDataParam(String data) throws JSONException {
        this.dataParam = data;
        requestParams = new PageMap();
        responseParams = new PageMap();
        requestParams.addJson(data, request);
        requestParams.put("queryParams", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("queryParams"), "{}"));
        requestParams.put("pageSize", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("pageSize"), "20"));
        requestParams.put("pageNumber", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("pageNumber"), "1"));
        setPageEntity();
        responseParams.putAll(requestParams);
    }

    public void setPageEntity() {
        pageEntity = new PageEntity();
        String page = request.getParameter("page");
        if(StringUtil.isNotEmpty(page)&&StringUtil.isNumeric(page)) {
            pageEntity.setPage(Integer.parseInt(page));
            requestParams.put("pageNumber", Integer.parseInt(page));
        }
        String rows = request.getParameter("rows");
        if(StringUtil.isNotEmpty(page)&&StringUtil.isNumeric(rows)) {
            pageEntity.setRows(Integer.parseInt(rows));
            requestParams.put("pageSize", Integer.parseInt(rows));
        }
        if(StringUtil.isNotEmpty(request.getParameter("sort")))
        pageEntity.setSort(request.getParameter("sort"));
        if(StringUtil.isNotEmpty(request.getParameter("order")))
        pageEntity.setOrder(request.getParameter("order"));
    }

    public PageEntity getPageEntity() {
        return pageEntity;
    }

    public void setPageEntity(PageEntity pageEntity) {
        this.pageEntity = pageEntity;
    }

    public String getDataParam() {
        return dataParam;
    }

    public ActiveUser getActiveUser() {
        return activeUser;
    }

    public void setActiveUser(ActiveUser activeUser) {
        this.activeUser = activeUser;
    }
}