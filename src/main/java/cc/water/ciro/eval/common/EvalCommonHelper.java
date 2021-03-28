package cc.water.ciro.eval.common;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.domain.EvalBaseInfo;
import cc.water.ciro.eval.domain.EvalBaseViewParam;
import cc.water.ciro.eval.domain.EvalEventEnum;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.enums.EvalEventTypeEnum;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;
import cc.water.ciro.eval.enums.EvalListTypeEnum;
import cc.water.ciro.eval.query.EvalEventEnumQuery;
import cc.water.ciro.eval.service.EvalEventEnumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

/**
 * Created by Administrator on 2017/1/2.
 */
public class EvalCommonHelper {

    public static int getPreNode(EvalFlow flow, int status) throws Exception {
        if (flow != null) {
            //得到当前流程设置
            String ksEval = flow.getKsEval();
            String dkEval = flow.getDkEval();
            String corpEval = flow.getCorpEval();
            //根据当前状态，返回上个流程
            if (status == EvalFlowStatusEnum.KP_DW_SUBMIT.getValue() || status == EvalFlowStatusEnum.KP_END.getValue()) {
                return EvalFlowStatusEnum.KP_DW_SAVE.getValue();
            } else if (status >= EvalFlowStatusEnum.KP_DW_WAIT.getValue() && status <= EvalFlowStatusEnum.KP_DW_SAVE.getValue()) {
                if (dkEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DKS_DW_BACK.getValue();
                if (ksEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_KS_DW_BACK.getValue();
                return EvalFlowStatusEnum.KP_ME_DW_BACK.getValue();
            } else if (status >= EvalFlowStatusEnum.KP_KS_SUBMIT.getValue() && status <= EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue()) {
                if (ksEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_KS_DKS_BACK.getValue();
                return EvalFlowStatusEnum.KP_ME_DKS_BACK.getValue();
            } else if (status >= EvalFlowStatusEnum.KP_ME_SUBMIT.getValue() && status <= EvalFlowStatusEnum.KP_KS_SUBMIT.getValue()) {
                return EvalFlowStatusEnum.KP_ME_KS_BACK.getValue();
            }
        }
        return status;
    }

    //得到该用户应继续的流程状态
    public static int getNextNode(EvalFlow flow, int status) throws Exception {
        if (flow != null) {
            //得到当前流程设置
            String ksEval = flow.getKsEval();
            String dkEval = flow.getDkEval();
            String corpEval = flow.getCorpEval();
            //根据当前状态，返回下个流程
            if (status == EvalFlowStatusEnum.KP_ME_SUBMIT.getValue()) {
                if (ksEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_KS_WAIT.getValue();
                if (dkEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DKS_WAIT.getValue();
                if (corpEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DW_WAIT.getValue();
                return EvalFlowStatusEnum.KP_END.getValue();
            } else if (status == EvalFlowStatusEnum.KP_KS_SUBMIT.getValue()) {
                if (dkEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DKS_WAIT.getValue();
                if (corpEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DW_WAIT.getValue();
                return EvalFlowStatusEnum.KP_END.getValue();
            } else if (status == EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue()) {
                if (corpEval.equals(BooleanEnum.YES.getCode()))
                    return EvalFlowStatusEnum.KP_DW_WAIT.getValue();
                return EvalFlowStatusEnum.KP_END.getValue();
            } else if (status == EvalFlowStatusEnum.KP_DW_SUBMIT.getValue()) {
                return EvalFlowStatusEnum.KP_END.getValue();
            }
        }
        return status;
    }
}
