package test.system;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.service.ParamService;
import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cc.water.ciro.common.utils.MD5;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;

import test.common.SpringJunitTest;

public class TestSystem extends SpringJunitTest {
    @Autowired
    private UserService userService;
    @Autowired
    private ParamService paramService;

    @Test
    public void addUserTest() throws Exception {
        for(int i=120;i<200;i++) {
            User user = new User();
            user.setUsername(i+"");
            user.setPassword("70d899e30904b26e1cdb652261180a51");
            user.setSalt("nwehdyli");
            user.setName("测试用户"+i);
            user.setFlag("NORMAL");
            user.setPostName("普通员工");
            user.setSex("2");
            user.setBirthdate(new Date());
            user.setDeptId(new Long(4));
            user.setAdminDeptId("4");
            user.setSkin("blue");
            user.setToEval("YES");
            user.setEvalType(new Long(1));
            user.setState("2");
            user.setCreater(new Long(30));
            user.setCreateDate(new Date());
            userService.addUser(user);
        }
    }

    @Test
    public void getUserBykey() {
        UserQuery userQuery = new UserQuery();
        userQuery.setState("DISABLE");
        List<User> list = userService.findList(userQuery);
//			User user=userService.getUserByKey(29l);
//			System.out.println(user.getUsername());
    }

    @Test
    public void getUserByKeys() {
        List<Integer> numList = new ArrayList<Integer>();
        numList.add(19);
        numList.add(20);
        List<User> userList = userService.getUserByKeys(numList);
        System.out.println(userList.size());
    }

    @Test
    public void deleteUserBykey() {
        //System.out.println(userService.deleteByKey(10));
    }

    @Test
    public void deleteUserByKeys() {
        List<Integer> ids = new ArrayList<Integer>();
        ids.add(17);
        ids.add(18);
        //System.out.println(userService.deleteByKeys(ids));
    }

    @Test
    public void getParams() {
        paramService.getValueByName(ParamInitEnum.unite.getCode());
        //System.out.println(userService.deleteByKeys(ids));
    }


    @Test
    public void updateUserByKey() {
        User user = new User();
        user.setId(30l);
        user.setPassword(new MD5().getMD5ofStr("123"));
        userService.updateUserByKey(user);
    }

    @Test
    public void getUserWithPage() {
        UserQuery userQuery = new UserQuery();
        userQuery.setPageNo(1);
        userQuery.setPageSize(20);
        Pagination p = userService.getUserWithPage(userQuery);
        System.out.println(JSON.toJSONString(p));
//			List<User> userList=p.getData();
//			for(User user:userList){
//				System.out.println(user.getId());
//			}
    }

    @Test
    public void getUserByUsername() {
        User user = userService.getUserByUsername("wanglinlei");
        System.out.println(user.getName());
    }
}
