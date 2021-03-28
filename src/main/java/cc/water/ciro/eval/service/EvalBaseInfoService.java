package cc.water.ciro.eval.service;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalBaseInfo;
import cc.water.ciro.eval.domain.EvalBaseViewParam;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.enums.EvalListTypeEnum;
import cc.water.ciro.eval.query.EvalBaseInfoQuery;
import org.springframework.ui.Model;

import java.util.List;

public interface EvalBaseInfoService {
	public void addEvalBaseInfo(EvalBaseInfo evalBaseInfo);
	
	public EvalBaseInfo getEvalBaseInfoByKey(Long id);

	public  EvalBaseViewParam checkFlowStatus(Model model, EvalFlow evalFlow,
													EvalBaseInfo evalBaseInfo, EvalListTypeEnum listTypeEnum, Long userId);

	public List<EvalBaseInfo> getEvalBaseInfoByKeys(List<Long> ids);
	
	public void deleteEvalBaseInfoByKey(Long id);
	
	public void deleteEvalBaseInfoByKeys(List<Long> ids);
	
	public void updateEvalBaseInfoByKey(EvalBaseInfo evalBaseInfo);
	
	public Pagination getEvalBaseInfoWithPage(EvalBaseInfoQuery evalBaseInfoQuery);
	
	public  int getEvalBaseInfoCount(EvalBaseInfoQuery evalBaseInfoQuery);

	public EvalBaseInfo saveSelf(EvalBaseInfo evalBaseInfo,ActionContext context) throws Exception;

	public EvalBaseInfo saveKs(EvalBaseInfo evalBaseInfo,ActionContext context) throws Exception;

	public void saveAutoKs(String ids,ActionContext context) throws Exception;

	public EvalBaseInfo saveDk(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception;

	public void saveAutoDk(String ids,ActionContext context) throws Exception;

	public EvalBaseInfo saveDw(EvalBaseInfo evalBaseInfo, ActionContext context) throws Exception;

	public void saveAutoDw(String ids,ActionContext context) throws Exception;

	public void rejectKs(ActionContext context)  throws Exception;

	public void rejectDk(ActionContext context)  throws Exception;

	public void rejectDw(ActionContext context)  throws Exception;

	public void cancelDw(ActionContext context)  throws Exception;
}
