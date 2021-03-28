package cc.water.ciro.system.service.impl;

import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.system.dao.ParamDao;
import cc.water.ciro.system.domain.SysParamBean;
import cc.water.ciro.system.domain.SysParamExample;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.service.ParamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ParamServiceImpl extends BaseService implements ParamService , InitializingBean {

    @Autowired
    private ParamDao sysParamDao;
    @Autowired
    private SystemConfig systemConfig;
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static  Map<String, String> paramMap = new HashMap<String, String>();
    /**
     * 保存数据
     */
    public void addSysParam(SysParamBean sysParam) {
        sysParamDao.insertSelective(sysParam);
        clearCache();
    }

    /**
     * 根据主键获取数据
     */
    @Transactional(readOnly = true)
    public SysParamBean getSysParamByKey(Long id) {
        SysParamBean sysParam = sysParamDao.selectByPrimaryKey(id);
        return sysParam;
    }

    /**
     * 根据主键获取数据
     */
    @Transactional(readOnly = true)
    public Map<String, String> getAllSysParam() {
        List<SysParamBean> sysParamList = sysParamDao.getAllSysParam();
        Map<String, String> map = new HashMap<String, String>();
        for (SysParamBean sysParam : sysParamList) {
            map.put(sysParam.getName(), sysParam.getValue());
        }
        return map;
    }

    /**
     * 根据多个id批量获取数据
     *
     * @param ids
     */
    @Transactional(readOnly = true)
    public List<SysParamBean> getSysParamByKeys(List<String> ids) {
        SysParamExample example = new SysParamExample();
        SysParamExample.Criteria criteria = example.createCriteria();
        List<Long> paramIds = new ArrayList<Long>();
        for (String id : ids) {
            paramIds.add(NumberUtil.parseLong(id));
        }
        criteria.andIdIn(paramIds);
        List<SysParamBean> paramList = sysParamDao.selectByExample(example);
        return paramList;
    }

    public void deleteByKey(Long id) {
        sysParamDao.deleteByPrimaryKey(id);
        clearCache();
    }

    public void deleteByKeys(List<Long> ids) {
        SysParamExample example = new SysParamExample();
        SysParamExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        sysParamDao.deleteByExample(example);
        clearCache();
    }

    public void updateSysParamByKey(SysParamBean sysParam) {
        sysParamDao.updateByPrimaryKeySelective(sysParam);
        clearCache();
    }

    @Override
    public void updateSysParam(SysParamBean sysParam) {
        sysParamDao.updateByPrimaryKey(sysParam);
        clearCache();
    }

    @Transactional(readOnly = true)
    public SysParamBean selectByName(String name) {
        return sysParamDao.selectByName(name);
    }

    @Transactional
    public String getValueByName(String name) {
        if (paramMap == null) {
            initParamMap();
        }
        if (paramMap.containsKey(name)) {
            return paramMap.get(name);
        }else{
            SysParamBean sysParamBean = selectByName(name);
            if(sysParamBean!=null){
                paramMap.put(name,sysParamBean.getValue());
                return sysParamBean.getValue();
            }
            ParamInitEnum paramInitEnum = ParamInitEnum.getByCode(name);
            if(paramInitEnum==null) return "";
            SysParamBean sysParam = new SysParamBean();
            sysParam.setName(name);
            sysParam.setValue(paramInitEnum.getValue());
            sysParam.setType(paramInitEnum.getParamType());
            addSysParam(sysParam);
            paramMap.put(name,paramInitEnum.getValue());
            return paramInitEnum.getValue();
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        initParamMap();
    }
    public void clearCache() {
        synchronized (ParamServiceImpl.class) {
            if (paramMap != null) {
                paramMap.clear();
                paramMap = null;
                try {
                    afterPropertiesSet();
                } catch (Exception e) {
                    logger.error("afterPropertiesSet is error", e);
                }
            }
        }
    }
    /**
     * 初始化
     */
    private synchronized void initParamMap() {
        paramMap = new HashMap<String, String>();
        synchronized (paramMap) {
            List<SysParamBean> paramDOs = sysParamDao.getAllSysParam();
            if (paramDOs != null) {
                for (SysParamBean item : paramDOs) {
                    paramMap.put(item.getName(), item.getValue());
                }
            }
        }
    }

}
