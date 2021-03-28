package cc.water.ciro.common.service.impl;

import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.service.ITreeComboService;
import cc.water.ciro.common.utils.UtilPub;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/11/27.
 */
public abstract class BaseTreeComboService extends BaseService implements ITreeComboService {
    public BaseTreeComboService() {
    }
    public void combo() throws Exception {
        List<Map<String, Object>> list;
        PageMap map = context.getRequestParams();
        if (!map.getBoolean("multiple") && !map.getBoolean("loadall"))
            list = findChildren();
        else list = findAllData();
        context.getResponseParams().put("data", list);
    }


    @Override
    public List<Map<String, Object>> findAllData() throws Exception {
        List<Map<String, Object>> list = findChildren();
        fillTreeData(list);
        return list;
    }

    /**
     * 填充儿子，逐级填充，递归调用
     * @param list
     * @throws Exception
     */
    protected void fillTreeData(List<Map<String, Object>> list) throws Exception {
        if (UtilPub.isEmpty(list)) return;
        for (Map<String, Object> map: list) {
            if (!"end".equals(map.get("end"))) continue;
            context.getRequestParams().put("id", map.get("id"));
            List<Map<String, Object>> l = findChildren();
            map.remove("end");
            map.put("children", l);
            fillTreeData(l);
        }
    }

    public void findTextsByIdMethod() throws Exception {
        PageMap map = context.getRequestParams();
        String ids = map.getStrIgnoreNull("id");
        StringBuilder sbValue = new StringBuilder(64);
        StringBuilder sbText = new StringBuilder(64);
        if (ids.contains(",")) {
            String[] idArray = ids.split(",");
            for (String s: idArray) {
                String text = findTextById(s);
                if (UtilPub.isNotEmpty(text)) {
                    sbValue.append(",").append(s);
                    sbText.append(",").append(text);
                }
            }
        } else {
            String text = findTextById(ids);
            if (UtilPub.isNotEmpty(text)) {
                sbValue.append(",").append(ids);
                sbText.append(",").append(text);
            }
        }

        PageMap mapResp = context.getResponseParams();
        if (sbValue.length() > 0) {
            mapResp.put("value", sbValue.substring(1));
            mapResp.put("text", sbText.substring(1));
        } else {
            mapResp.put("value", "");
            mapResp.put("text", "");
        }
    }

    /**
     * 根据名称获取文本。
     * @param id
     * @return
     * @throws Exception
     */
    protected abstract String findTextById(String id) throws Exception;


}