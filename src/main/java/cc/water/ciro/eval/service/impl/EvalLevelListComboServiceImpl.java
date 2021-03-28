package cc.water.ciro.eval.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.mapper.EvalLevelDao;
import cc.water.ciro.eval.query.EvalLevelQuery;
import cc.water.ciro.eval.service.EvalLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("evalLevelComboService")
@Transactional
public class EvalLevelListComboServiceImpl extends BaseListComboService<EvalLevel> {

    @Autowired
    private EvalLevelDao evalLevelDao;
    @Autowired
    private EvalLevelService evalLevelService;
    @Override
    protected BaseQuery instanceQuery() {
        return new EvalLevelQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<EvalLevel> list = evalLevelService.findList((EvalLevelQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(EvalLevel evalLevel:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(evalLevel.getName());
            comboEntity.setValue(String.valueOf(evalLevel.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<EvalLevel> findMapList(BaseQuery query) {
        List<EvalLevel> list = evalLevelService.findList((EvalLevelQuery) query);
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery query) {
        EvalLevelQuery evalLevelQuery = (EvalLevelQuery)query;
//        String status =context.getRequestParams().getStrIgnoreNull("status");
//        if(StringUtil.isNotEmpty(status)){
//            evalLevelQuery.setStatus(status);
//        }
        return evalLevelDao.findRowNo(evalLevelQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        EvalLevelQuery evalLevelQuery = (EvalLevelQuery)query;
//        String status =context.getRequestParams().getStrIgnoreNull("status");
//        if(StringUtil.isNotEmpty(status)){
//            evalLevelQuery.setStatus(status);
//        }
        return evalLevelService.findListNum(evalLevelQuery);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }


}
