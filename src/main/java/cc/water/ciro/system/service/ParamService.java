package cc.water.ciro.system.service;

import cc.water.ciro.system.domain.SysParamBean;

import java.util.List;
import java.util.Map;

public interface ParamService {
	/**
	 * 保存数据
	 * @param sysParam
	 * @return
	 */
	public void addSysParam(SysParamBean sysParam);
	/**
	 * 根据主键查询
	 * @param id
	 * @return
	 */
	public SysParamBean getSysParamByKey(Long id);
	/**
	 * 获取所有数据
	 * @param
	 * @return
	 */
	public Map<String,String> getAllSysParam();
	/**
	 * 根据主键批量查询
	 * @param ids
	 * @return
	 */
	public List<SysParamBean> getSysParamByKeys(List<String> ids);
	/**
	 * 根据主键删除
	 * @param id
	 * @return
	 */
	public void deleteByKey(Long id);
	/**
	 * 根据主键批量删除
	 * @param ids
	 * @return
	 */
	public void deleteByKeys(List<Long> ids);
	/**
	 * 根据主键更新
	 * @return
	 */
	public void updateSysParamByKey(SysParamBean sysParam);

	/**
	 * 更新
	 * @return
	 */
	public void updateSysParam(SysParamBean sysParam);

	public SysParamBean selectByName(String name);

	public String getValueByName(String name);
}
