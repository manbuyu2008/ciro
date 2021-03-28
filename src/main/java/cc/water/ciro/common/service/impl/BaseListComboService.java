package cc.water.ciro.common.service.impl;

import cc.water.ciro.common.base.CommonHelper;
import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.IComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;

import java.util.*;

/**
 * Created by Administrator on 2016/11/27.
 */
public abstract class BaseListComboService<E extends BaseEntity> extends BaseService implements IComboService {

    protected abstract BaseQuery instanceQuery();

    public void combo() throws Exception {
        PageMap map = context.getRequestParams();
        String id = map.getStrIgnoreNull("id");
        int page = map.getInt("page");
        int rows = map.getInt("rows");
        String[] searchNames = null;
        String searchValue = null;
        if (StringUtil.isNotEmpty(id) && page != 0) {
            BaseQuery baseQuery = instanceQuery();
            if(id.contains(",")){
                baseQuery.setIds(Arrays.asList(id.split(",")));
            }else {
                baseQuery.setId(NumberUtil.parseLong(id));
            }
            baseQuery.setPageNo(page);
            baseQuery.setPageSize(rows);
            int rowNo = this.findRowNo(baseQuery);
            page = CommonHelper.getPageNoByRowId(rowNo, rows);
        } else {
            if (rows != 0 && page == 0) {
                page = 1;
            }
            if (page == 0 || rows == 0) {
                String page_p = context.getRequest().getParameter("page");
                if (UtilPub.isNotEmpty(page_p)) {
                    page = Integer.parseInt(page_p);
                }
                String rows_p = context.getRequest().getParameter("rows");
                if (UtilPub.isNotEmpty(rows_p)) {
                    rows = Integer.parseInt(rows_p);
                }
            }
            if(page == 0 || rows == 0){
                page=1;
                rows=999;
            }
            String strSearchNames = map.getStrIgnoreNull("searchNames");
            if (UtilPub.isNotEmpty(strSearchNames)) {
                searchNames = strSearchNames.split(",");
            }
            searchValue = map.getStrIgnoreNull("searchValue");
        }
        loadData(page, rows, searchNames, searchValue, context);
    }

    /**
     * 加载数据
     *
     * @return
     * @throws Exception
     */
    protected void loadData(int page, int rows, String[] searchNames, String searchValue, ActionContext context) throws Exception {
        PageMap responseParams = context.getResponseParams();
        Map<String, Object> mapParams = new HashMap<String, Object>();
        List<Map<String, Object>> listParams = new ArrayList<Map<String, Object>>();
        BaseQuery baseQuery = instanceQuery();
        if (searchNames != null) {
            for (String s : searchNames) {
                mapParams = new HashMap<String, Object>();
                mapParams.put("text", s);
                mapParams.put("value", searchValue.toUpperCase());
                listParams.add(mapParams);
            }
            baseQuery.set_list(listParams);
        }
        int total = findListNum(baseQuery);
        baseQuery.setPageNo(page);
        baseQuery.setPageSize(rows);
        List<E> list  =  findMapList(baseQuery);
        responseParams.put("rows", list);
        responseParams.put("total", total);
        responseParams.put("pageNumber", page);
    }

    public void getTextsById() throws Exception {
        PageMap map = context.getRequestParams();
        String ids = map.getStrIgnoreNull("id");
        BaseQuery baseQuery = instanceQuery();
        if (UtilPub.isNotEmpty(ids)) {
            String[] sp_ids = ids.split(",");
            List<String> list= Arrays.asList(sp_ids);
            baseQuery.setIds(list);
        }
        List<ComboEntity> list = findComboList(baseQuery);
        StringBuilder bkText = new StringBuilder(64);
        StringBuilder bkId = new StringBuilder(64);
        for (ComboEntity bean : list) {
            String sValue, sText;
            sValue = bean.getValue();
            sText = bean.getText();
            bkId.append(",").append(sValue);
            bkText.append(",").append(sText);
        }
        PageMap responseParams = context.getResponseParams();
        if (bkId.length() > 0) {
            responseParams.put("value", bkId.substring(1));
            responseParams.put("text", bkText.substring(1));
        } else {
            responseParams.put("value", "");
            responseParams.put("text", "");
        }
    }

    protected abstract List<ComboEntity> findComboList(BaseQuery query);

    protected  abstract  List<E> findMapList(BaseQuery query);

    protected abstract int findRowNo(BaseQuery query);

    protected abstract int findListNum(BaseQuery query);
}