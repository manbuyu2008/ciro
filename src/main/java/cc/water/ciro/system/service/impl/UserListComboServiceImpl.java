package cc.water.ciro.system.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.system.dao.DeptDao;
import cc.water.ciro.system.dao.UserDao;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.query.UserQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("userComboService")
@Transactional
public class UserListComboServiceImpl extends BaseListComboService<User> {

    @Autowired
    private UserDao userDao;
    @Autowired
    private DeptDao deptDao;

    @Override
    protected BaseQuery instanceQuery() {
        UserQuery userQuery = new UserQuery();
        return userQuery;
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<User> list = userDao.findList((UserQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for (User user : list) {
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(user.getName());
            comboEntity.setValue(String.valueOf(user.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<User> findMapList(BaseQuery query) {
        UserQuery userQuery = (UserQuery) query;
        String dept = context.getRequestParams().getStrIgnoreNull("dept");
        List<Long> deptIds = new ArrayList<Long>();
        if (StringUtil.isNotEmpty(dept)) {
            String[] depts = dept.split(",");
            for (String dt : depts) {
                deptIds.add(NumberUtil.parseLong(dt));
            }
            userQuery.setDeptIds(deptIds);
        } else {
            dept = context.getRequest().getParameter("dept");
            if (StringUtil.isNotEmpty(dept)) {
                String[] depts = dept.split(",");
                for (String dt : depts) {
                    deptIds.add(NumberUtil.parseLong(dt));
                }
                userQuery.setDeptIds(deptIds);
            }
        }
        List<User> list = userDao.findList(userQuery);
        for (User user : list) {
            Dept deptBean = deptDao.selectByPrimaryKey(user.getDeptId());
            if (dept != null) user.setDept(deptBean);
        }
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery query) {
        UserQuery userQuery = (UserQuery) query;
        String dept = context.getRequestParams().getStrIgnoreNull("dept");
        List<Long> deptIds = new ArrayList<Long>();
        if (StringUtil.isNotEmpty(dept)) {
            String[] depts = dept.split(",");
            for (String dt : depts) {
                deptIds.add(NumberUtil.parseLong(dt));
            }
            userQuery.setDeptIds(deptIds);
        } else {
            dept = context.getRequest().getParameter("dept");
            if (StringUtil.isNotEmpty(dept)) {
                String[] depts = dept.split(",");
                for (String dt : depts) {
                    deptIds.add(NumberUtil.parseLong(dt));
                }
                userQuery.setDeptIds(deptIds);
            }
        }
        return userDao.findRowNo((UserQuery) userQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        UserQuery userQuery = (UserQuery) query;
        String dept = context.getRequestParams().getStrIgnoreNull("dept");
        List<Long> deptIds = new ArrayList<Long>();
        if (StringUtil.isNotEmpty(dept)) {
            String[] depts = dept.split(",");
            for (String dt : depts) {
                deptIds.add(NumberUtil.parseLong(dt));
            }
            userQuery.setDeptIds(deptIds);
        } else {
            dept = context.getRequest().getParameter("dept");
            if (StringUtil.isNotEmpty(dept)) {
                String[] depts = dept.split(",");
                for (String dt : depts) {
                    deptIds.add(NumberUtil.parseLong(dt));
                }
                userQuery.setDeptIds(deptIds);
            }
        }
        return userDao.findListNum(userQuery);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }
}
