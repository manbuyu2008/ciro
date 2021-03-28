package cc.water.ciro.system.service.impl;


import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.system.dao.DeptDao;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.domain.DeptExample;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DeptServiceImpl extends BaseService implements DeptService {

    @Autowired
    private DeptDao deptDao;
    /**
     * 保存数据
     */
    public void addDept(Dept dept) {
        deptDao.insert(dept);
    }

    /**
     * 根据主键获取数据
     */
    @Transactional(readOnly = true)
    public Dept getDeptByKey(Long id) {
        Dept dept = deptDao.selectByPrimaryKey(id);
        return dept;
    }

    /**
     * 根据多个id批量获取数据
     * @param ids
     */
    @Transactional(readOnly = true)
    public List<Dept> getDeptByKeys(List<String> ids) {
        DeptExample example = new DeptExample();
        DeptExample.Criteria criteria =  example.createCriteria();
        List<Long> deptIds = new ArrayList<Long>();
        for(String id:ids){
            deptIds.add(NumberUtil.parseLong(id));
        }
        criteria.andIdIn(deptIds);
        List<Dept> deptList = deptDao.selectByExample(example);
        return deptList;
    }


    public void deleteByKey(Long id) {
        deptDao.deleteByPrimaryKey(id);
    }


    public void deleteByKeys(List<Long> ids) {
        DeptExample example = new DeptExample();
        DeptExample.Criteria criteria =  example.createCriteria();
        criteria.andIdIn(ids);
        deptDao.deleteByExample(example);
    }


    public void updateDeptByKey(Dept dept) {
        deptDao.updateByPrimaryKeySelective(dept);
    }

    @Override
    public void updateDept(Dept dept) {
        deptDao.updateByPrimaryKey(dept);
    }

    @Transactional(readOnly = true)
    public Pagination getDeptWithPage(DeptQuery deptQuery) {
        Pagination<Dept> pagination = new Pagination<Dept>(deptQuery.getPageNo(), deptQuery.getPageSize(), deptDao.findListNum(deptQuery));
        List<Dept> deptList = deptDao.findList(deptQuery);
        for (Dept dept : deptList) {
            dept.setParentDept(deptDao.selectByPrimaryKey(Long.valueOf(dept.getParentId())));
        }
        pagination.setRows(deptList);
        return pagination;
    }

    @Override
    public int getDeptCount(DeptQuery deptQuery) {
        return deptDao.findListNum(deptQuery);
    }

    @Override
    public List<Dept> findList(DeptQuery deptQuery) {
        List<Dept> deptBeanList = deptDao.findList(deptQuery);
        return deptBeanList;
    }

    @Override
    public List<Long> findMyDeptList(List<String> deptIds) {
        List<Long> myDeptIds = new ArrayList<Long>();
        if(!deptIds.isEmpty()) {
            List<Dept> deptBeanList  =  getDeptByKeys(deptIds);
            List<String> levelCodes = new ArrayList<String>();
            for (Dept dept : deptBeanList) {
                levelCodes.add(dept.getLevelCode());
            }
            DeptQuery deptQuery = new DeptQuery();
            deptQuery.set_levelCodes(levelCodes);
            List<Dept> deptAndChildList = deptDao.findList(deptQuery);
            for (Dept dept : deptAndChildList) {
                myDeptIds.add(dept.getId());
            }
        }
        return myDeptIds;
    }

    @Transactional(readOnly = true)
    public List<Dept> findListByParentId(String id, List<Dept> deptBeans, String status) {
        DeptQuery deptQuery = new DeptQuery();
        List<String> levelCodes = new ArrayList<String>();
        for (Dept deptBean : deptBeans) {
            levelCodes.add(deptBean.getLevelCode());
        }
        deptQuery.set_levelCodes(levelCodes);
        deptQuery.setParentId(id);
        List<Dept> deptBeanList = deptDao.findList(deptQuery);
        return deptBeanList;
    }

    @Transactional(readOnly = true)
    public Dept getDeptByContent(String deptname) {
        return deptDao.findDeptByContent(deptname);
    }

    @Transactional(readOnly = true)
    public Dept getDeptByDeptname(String deptname) {
        return deptDao.findDeptByContent(deptname);
    }

    @Transactional(readOnly = true)
    public Dept getDeptByDeptCode(String deptCode) {
        return deptDao.findDeptByCode(deptCode);
    }

    public boolean isLeaf(Long id) {
        DeptExample deptExample = new DeptExample();
        DeptExample.Criteria criteria = deptExample.createCriteria();
        criteria.andParentIdEqualTo(String.valueOf(id));
        return UtilPub.isEmpty(deptDao.selectByExample(deptExample));
    }
}
