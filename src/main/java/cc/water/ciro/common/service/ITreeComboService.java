package cc.water.ciro.common.service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/11/27.
 */
public interface ITreeComboService extends IComboService {
    /**
     * 数据请求，根据id拉下级
     * @throws Exception
     */
    public List<Map<String, Object>> findChildren() throws Exception;

    /**
     * 数据请求，一次加载所有
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> findAllData() throws Exception;

    /**
     * 获取指定节点的父节点id数组,从父到远祖
     * @return
     */
    public void findParentNodeIdArray();


}

