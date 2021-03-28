package cc.water.ciro.system.dao;


import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.system.domain.SysUserRole;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.query.UserQuery;

import java.util.HashMap;
import java.util.List;

@MapperDao
public interface UserDao {
	/**
	 * 添加数据
	 * @param user
	 */
	public int insertUser(User user);
	/**
	 * 根据主键删除数据
	 * @param id
	 * @return
	 */
	public int deleteUserByKey(Long id);
	/**
	 * 根据主键批量删除数据
	 * @param ids
	 * @return
	 */
	public int deleteUserByKeys(List<Integer> ids);
	/**
	 * 根据主键查询数据
	 * @param id
	 * @return
	 */
	public User selectUserByKey(Long id);
	/**
	 * 根据主键批量查询数据
	 * @param ids
	 * @return
	 */
	public List<User> selectUserByKeys(List<Integer> ids);
	/**
	 * 根据主键更新数据
	 * @param user
	 * @return
	 */
	public int updateUserByKey(User user);
	/**
	 * 分页查询数据
	 * @param userQuery
	 * @return
	 */
	public List<User> selectUserListWithPage(UserQuery userQuery);
	
	/**
	 * 总条数
	 * @return
	 */
	public int getUserListCount(UserQuery userQuery);

	/**
	 * 添加用户和角色关联表
	 * @param map
	 * @return
	 */
	public int insertUserRole(HashMap map);
	/**
	 * 批量添加用户和角色关联表
	 * @param list
	 * @return
	 */
	public int insertUserRoleBatch(List<SysUserRole> list);
	
	/**
	 * 通过用户名获取用户信息
	 * @param username
	 * @return
	 */
	public User selectUserByUsername(String username);
		
	public int deleteUserRoleByUserId(Long userId);

	public int findRowNo(UserQuery userQuery);

	public  List<User> findList(UserQuery userQuery);

	public  int findListNum(UserQuery userQuery);
}
