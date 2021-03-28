package cc.water.ciro.system.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.query.DeptQuery;

import java.util.List;

public interface DeptService {
	/**
	 * 保存数据
	 * @param dept
	 * @return
	 */
	public void addDept(Dept dept);
	/**
	 * 根据主键查询
	 * @param id
	 * @return
	 */
	public Dept getDeptByKey(Long id);
	/**
	 * 根据主键批量查询
	 * @param ids
	 * @return
	 */
	public List<Dept> getDeptByKeys(List<String> ids);
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
	public void updateDeptByKey(Dept dept);

	/**
	 * 更新
	 * @return
	 */
	public void updateDept(Dept dept);
	/**
	 * 分页
	 * @param deptQuery
	 * @return
	 */
	public Pagination getDeptWithPage(DeptQuery deptQuery);
	/**
	 * 数量
	 * @param deptQuery
	 * @return
	 */
	public int getDeptCount(DeptQuery deptQuery);

	/**
	 * 所有权限下的下级
	 * @param id
	 * @return
	 */
	public List<Dept> findListByParentId(String id, List<Dept> deptBeans, String status);

	/**
	 * 所有有权限的部门
	 * @param deptQuery
	 * @return
	 */
	public List<Dept> findList(DeptQuery deptQuery);

	/**
	 * 所有有权限的部门
	 * @param deptIds
	 * @return
	 */
	public List<Long> findMyDeptList(List<String> deptIds);

	/**
	 * 通过部门名称或者编码获取部门信息
	 * @param deptname
	 * @return
	 */
	public Dept getDeptByContent(String deptname);
	/**
	 * 通过部门名称获取部门信息
	 * @param deptname
	 * @return
	 */
	public Dept getDeptByDeptname(String deptname);

	/**
	 * 通过部门编码获取部门信息
	 * @param deptCode
	 * @return
	 */
	public Dept getDeptByDeptCode(String deptCode);
	/**
	 * 是否末级
	 * @param id
	 * @return
	 */
	public boolean isLeaf(Long id);
}
