package cc.water.ciro.common.service.impl;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.service.IServiceIntf;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/11/27.
 */
public class BaseService implements IServiceIntf {
    protected ActionContext context;

    public BaseService() {
    }

    public void setContext(ActionContext context) {
        this.context = context;
    }

    public ActionContext getContext() {
        return this.context;
    }

    protected void buildPaginationParam() {
        PageMap responseParams = this.context.getResponseParams();
        PageMap requestParams = this.context.getRequestParams();
        responseParams.put("queryParams", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("queryParams"), "{}"));
        responseParams.put("pageSize", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("pageSize"), "20"));
        responseParams.put("pageNo", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("pageNo"), "1"));
    }

    protected void buildListParam() {
        PageMap responseParams = this.context.getResponseParams();
        PageMap requestParams = this.context.getRequestParams();
        responseParams.put("queryParams", UtilPub.checkEmpty(requestParams.getStrIgnoreNull("queryParams"), "{}"));
    }

    protected List<Long> convertToLong(List<String> list){
        List<Long> reList = new ArrayList<Long>();
        for(String value:list){
            reList.add(NumberUtil.parseLong(value));
        }
        return  reList;
    }

}
