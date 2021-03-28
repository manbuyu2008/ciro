package cc.water.ciro.eval.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.mapper.EvalStdDao;
import cc.water.ciro.eval.query.EvalStdQuery;
import cc.water.ciro.eval.service.EvalStdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("evalStdComboService")
@Transactional
public class EvalStdListComboServiceImpl extends BaseListComboService<EvalStd> {

    @Autowired
    private EvalStdDao evalStdDao;
    @Autowired
    private EvalStdService evalStdService;
    @Override
    protected BaseQuery instanceQuery() {
        return new EvalStdQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<EvalStd> list = evalStdService.findList((EvalStdQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(EvalStd evalStd:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(evalStd.getName());
            comboEntity.setValue(String.valueOf(evalStd.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<EvalStd> findMapList(BaseQuery query) {
        EvalStdQuery evalStdQuery = (EvalStdQuery)query;
        String status =context.getRequestParams().getStrIgnoreNull("status");
        if(StringUtil.isNotEmpty(status)){
            evalStdQuery.setStatus(status);
        }
        String eventType =context.getRequestParams().getStrIgnoreNull("eventType");
        if(StringUtil.isNotEmpty(eventType)){
            evalStdQuery.setEventType(eventType);
        }
        List<EvalStd> list = evalStdService.findList(evalStdQuery);
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery query) {
        EvalStdQuery evalStdQuery = (EvalStdQuery)query;
        String status =context.getRequestParams().getStrIgnoreNull("status");
        if(StringUtil.isNotEmpty(status)){
            evalStdQuery.setStatus(status);
        }
        String eventType =context.getRequestParams().getStrIgnoreNull("eventType");
        if(StringUtil.isNotEmpty(eventType)){
            evalStdQuery.setEventType(eventType);
        }
        return evalStdDao.findRowNo(evalStdQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        EvalStdQuery evalStdQuery = (EvalStdQuery)query;
        String status =context.getRequestParams().getStrIgnoreNull("status");
        if(StringUtil.isNotEmpty(status)){
            evalStdQuery.setStatus(status);
        }
        String eventType =context.getRequestParams().getStrIgnoreNull("eventType");
        if(StringUtil.isNotEmpty(eventType)){
            evalStdQuery.setEventType(eventType);
        }
        return evalStdService.findListNum(evalStdQuery);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }


}
