package cc.water.ciro.eval.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.mapper.EvalUserTypeDao;
import cc.water.ciro.eval.query.EvalUserTypeQuery;
import cc.water.ciro.eval.service.EvalUserTypeService;
import cc.water.ciro.system.domain.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("userTypeComboService")
@Transactional
public class UserTypeListComboServiceImpl extends BaseListComboService<EvalUserType> {

    @Autowired
    private EvalUserTypeDao evalUserTypeDao;
    @Autowired
    private EvalUserTypeService evalUserTypeService;
    @Override
    protected BaseQuery instanceQuery() {
        return new EvalUserTypeQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        Pagination pagination = evalUserTypeService.getEvalUserTypeWithPage((EvalUserTypeQuery) query);
        List<EvalUserType> list = pagination.getRows();
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(EvalUserType evalUserType:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(evalUserType.getTypeName());
            comboEntity.setValue(String.valueOf(evalUserType.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<EvalUserType> findMapList(BaseQuery query) {
        Pagination pagination = evalUserTypeService.getEvalUserTypeWithPage((EvalUserTypeQuery) query);
        List<EvalUserType> list = pagination.getRows();
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery evalUserTypeQuery) {
        return evalUserTypeDao.findRowNo((EvalUserTypeQuery)evalUserTypeQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        return evalUserTypeService.getEvalUserTypeCount((EvalUserTypeQuery)query);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }


}
