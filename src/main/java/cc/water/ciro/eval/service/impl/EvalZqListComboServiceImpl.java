package cc.water.ciro.eval.service.impl;


import cc.water.ciro.common.domain.ComboEntity;
import cc.water.ciro.common.query.BaseQuery;
import cc.water.ciro.common.service.impl.BaseListComboService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.UserUtil;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.enums.EvalZqStatusEnum;
import cc.water.ciro.eval.mapper.EvalZqDao;
import cc.water.ciro.eval.query.EvalZqQuery;
import cc.water.ciro.eval.service.EvalZqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("evalZqComboService")
@Transactional
public class EvalZqListComboServiceImpl extends BaseListComboService<EvalZq> {

    @Autowired
    private EvalZqDao evalZqDao;
    @Autowired
    private EvalZqService evalZqService;
    @Override
    protected BaseQuery instanceQuery() {
        return new EvalZqQuery();
    }

    @Override
    protected List<ComboEntity> findComboList(BaseQuery query) {
        List<EvalZq> list = evalZqService.findList((EvalZqQuery) query);
        List<ComboEntity> comboEntityList = new ArrayList<ComboEntity>();
        for(EvalZq evalZq:list){
            ComboEntity comboEntity = new ComboEntity();
            comboEntity.setText(evalZq.getName());
            comboEntity.setValue(String.valueOf(evalZq.getId()));
            comboEntityList.add(comboEntity);
        }
        return comboEntityList;
    }

    @Override
    protected List<EvalZq> findMapList(BaseQuery query) {
        EvalZqQuery evalZqQuery = (EvalZqQuery) query;
        int isNeed = context.getRequestParams().getInt("isNeed");
        String status = context.getRequestParams().getStrIgnoreNull("status");
        Long userId = UserUtil.getActiveUser().getUserid();
        if(isNeed>0){
            evalZqQuery.set_sql("AND u.END_DATE>=SYSDATE() AND U.STATUS!='"+ EvalZqStatusEnum.END.getCode() +"'"+
                    " AND NOT EXISTS(SELECT 1 FROM  tbl_eval_base_info INFO WHERE U.ID=INFO.period_id AND INFO.user_id="+userId+" ) " +
                    " AND EXISTS (SELECT  1 FROM `sys_user` A,`tbl_eval_user_type` B \n" +
                    "WHERE A.to_eval='YES' AND  A.ID="+userId+" AND A.eval_type=B.ID AND INSTR(CONCAT(',',U.USER_TYPE,','),CONCAT(',',A.eval_type,','))>0 )");
        }
        if(StringUtil.isNotEmpty(status)) evalZqQuery.setStatus(status);
        List<EvalZq> list = evalZqService.findList(evalZqQuery);
        return list;
    }

    @Override
    protected int findRowNo(BaseQuery query) {
        EvalZqQuery evalZqQuery = (EvalZqQuery)query;
        String status =context.getRequestParams().getStrIgnoreNull("status");
        if(StringUtil.isNotEmpty(status)){
            evalZqQuery.setStatus(status);
        }
        return evalZqDao.findRowNo(evalZqQuery);
    }

    @Override
    protected int findListNum(BaseQuery query) {
        EvalZqQuery evalZqQuery = (EvalZqQuery)query;
        String status =context.getRequestParams().getStrIgnoreNull("status");
        if(StringUtil.isNotEmpty(status)){
            evalZqQuery.setStatus(status);
        }
        return evalZqService.findListNum(evalZqQuery);
    }

    @Override
    public String getIdByContent() throws Exception {
        return null;
    }


}
