/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.config.serivce.imp;

import cc.water.ciro.common.utils.MethodUtil;
import cc.water.ciro.config.CommonConfig;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.config.serivce.CommonParamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 *
 *
 */
@Service("commonParamService")
public class CommonParamServiceImpl implements CommonParamService, InitializingBean {
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static Map<String, String> paramMap = null;
    @Autowired
    CommonConfig commonConfig;

    @Override
    public Map<String, String> getSysParameters() {
        if (paramMap == null) {
            try {
                initParamMap();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return paramMap;
    }

    @Override
    public String getSysParameterValue(String paramName) {
        if (paramMap == null) {
            try {
                initParamMap();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return paramMap.get(paramName);
    }

    @Override
    public void clearCache() {
        paramMap = null;
    }

    private synchronized void initParamMap() throws InvocationTargetException, IllegalAccessException {
        paramMap = new HashMap<String, String>();
        synchronized (paramMap) {
            Map<String, String> map = new HashMap<String, String>((Map) MethodUtil.returnMap(commonConfig.getClass(), commonConfig));
            paramMap.putAll(map);
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        initParamMap();
    }

    protected void initConfigValue(SystemConfig config) {
//		config.setUseVerifyCode(Boolean.parseBoolean(paramMap.get(ConfigConstant.USER_VERIFY_CODE)));
    }
}
