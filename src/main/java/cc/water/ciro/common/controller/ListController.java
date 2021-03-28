package cc.water.ciro.common.controller;

import cc.water.ciro.common.domain.BaseEntity;
import cc.water.ciro.common.logger.CocoLogger;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.util.MapUtils;
import cc.water.ciro.common.utils.UtilExport;

import java.util.ArrayList;
import java.util.List;

public class ListController<E extends BaseEntity> extends BaseController {

    public void data() {
        try {
            final List<E> list = new ArrayList<E>();
            int total = 0;
            loadData(list,total);
            setListData(list);
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    protected void loadData(final List<E> list, int total) throws Exception {

    }

    /**
     * 导出到excel[jsp]
     *
     * @return 返回到JSP页面;
     */
    public void export() throws Exception {
        final List<E> list = new ArrayList<E>(64);
        loadData(list, 0);
        PageMap map = context.getRequestParams();
        UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
    }

    /**
     * 设返回数据
     *
     * @param list
     */
    protected void setListData(List<E> list) throws Exception {
        context.getResponseParams().put("rows", list);
    }

    protected void setBean(E bean) {
        context.getResponseParams().put("bean", bean);
    }

    protected void custom() throws Exception{

    }
	
}
