package cc.water.ciro.system.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.system.dao.RoleDao;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.query.RoleQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("roleComboService")
@Transactional
public class RoleListComboServiceImpl extends BaseListComboService<Role> {

    @Autowired
    private RoleDao roleDao;

    @Override
    protected BaseQuery instanceQuery() {
        return new RoleQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<Role> list = roleDao.selectRoleListWithPage((RoleQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(Role role:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(role.getName());
            comboEntity.setValue(String.valueOf(role.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<Role> findMapList(BaseQuery query) {
        List<Role> list = roleDao.selectRoleListWithPage((RoleQuery)query);
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery roleQuery) {
        return roleDao.findRowNo((RoleQuery)roleQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        return roleDao.getRoleListCount((RoleQuery)query);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }
}
