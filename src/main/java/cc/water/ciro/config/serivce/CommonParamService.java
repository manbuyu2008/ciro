/**
 * www.yiji.com Inc.
 * Copyright (c) 2011 All Rights Reserved.
 */
package cc.water.ciro.config.serivce;

import java.util.Map;

/**
 *系统配置参数
 * 
 */
public interface CommonParamService {

	public String getSysParameterValue(String paramName);

	public Map<String, String> getSysParameters();

	public void clearCache();
	
}
