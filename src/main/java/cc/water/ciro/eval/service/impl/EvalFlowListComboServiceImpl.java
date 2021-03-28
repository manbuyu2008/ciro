package cc.water.ciro.eval.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.mapper.EvalFlowDao;
import cc.water.ciro.eval.query.EvalFlowQuery;
import cc.water.ciro.eval.service.EvalFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("evalFlowComboService")
@Transactional
public class EvalFlowListComboServiceImpl extends BaseListComboService<EvalFlow> {

    @Autowired
    private EvalFlowDao evalFlowDao;
    @Autowired
    private EvalFlowService evalFlowService;
    @Override
    protected BaseQuery instanceQuery() {
        return new EvalFlowQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<EvalFlow> list = evalFlowService.findList((EvalFlowQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(EvalFlow evalFlow:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(evalFlow.getName());
            comboEntity.setValue(String.valueOf(evalFlow.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<EvalFlow> findMapList(BaseQuery query) {
        List<EvalFlow> list = evalFlowService.findList((EvalFlowQuery) query);
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery query) {
        EvalFlowQuery evalFlowQuery = (EvalFlowQuery)query;
        return evalFlowDao.findRowNo(evalFlowQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        EvalFlowQuery evalFlowQuery = (EvalFlowQuery)query;
        return evalFlowService.findListNum(evalFlowQuery);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }


}
