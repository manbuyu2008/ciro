package cc.water.ciro.common.utils;

import cc.water.ciro.config.CommonConfig;

import java.util.HashMap;
import java.util.Map;

public class SysConfigUtil {
	private static CommonConfig commonConfig;
	private static Map<String, String> paramMap = null;
	public synchronized static void init(CommonConfig config) {
		if (commonConfig == null) {
			commonConfig = config;
		}
	}

	public String getSysParameterValue(String paramName) {
		if (paramMap == null) {
			initParamMap();
		}
		return paramMap.get(paramName);
	}

	private synchronized void initParamMap() {
		paramMap = new HashMap<String, String>();
		synchronized (paramMap) {
			Map<String, String> map = new HashMap<String, String>((Map) commonConfig);
		}
	}

	public static CommonConfig getCommonConfig() {
		return commonConfig;
	}


}
