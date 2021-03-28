package cc.water.ciro.system.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.query.UserQuery;

import java.util.List;

public interface UserService {
	/**
	 * 保存数据
	 * @param user
	 * @return
	 */
	public void addUser(User user);
	/**
	 * 根据主键查询
	 * @param id
	 * @return
	 */
	public User getUserByKey(Long id);
	/**
	 * 根据主键批量查询
	 * @param ids
	 * @return
	 */
	public List<User> getUserByKeys(List<Integer> ids);
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
	public void deleteByKeys(List<Integer> ids);
	/**
	 * 根据主键更新用户角色
	 * @return
	 */
	public void updateUserRole(Long userId, String roleIds);

	/**
	 * 根据主键更新
	 * @return
	 */
	public void updateUserByKey(User user);

	/**
	 * 更新
	 * @return
	 */
	public void updateUser(User user);

	/**
	 * 分页
	 * @param userQuery
	 * @return
	 */
	public Pagination getUserWithPage(UserQuery userQuery);
	
	/**
	 * 通过用户名获取用户信息
	 * @param username
	 * @return
	 */
	public User getUserByUsername(String username);

	public int findRowNo(UserQuery userQuery);

	public  List<User> findList(UserQuery userQuery);

	public  int findListNum(UserQuery userQuery);

	/**
	 * 重置密码
	 * @param userId
	 * @return
	 */
	public void resetPassword(Long userId);
}
