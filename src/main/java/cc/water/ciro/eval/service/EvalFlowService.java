package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.query.EvalFlowQuery;

import java.util.List;

public interface EvalFlowService {
	public void addEvalFlow(EvalFlow evalFlow);
	
	public EvalFlow getEvalFlowByKey(Long id);

	public List<EvalFlow> getEvalFlowByKeys(List<Long> ids);
	
	public void deleteEvalFlowByKey(Long id);
	
	public void deleteEvalFlowByKeys(List<Long> ids);
	
	public void updateEvalFlowByKey(EvalFlow evalFlow);
	
	public Pagination getEvalFlowWithPage(EvalFlowQuery evalFlowQuery);
	
	public  int getEvalFlowCount(EvalFlowQuery evalFlowQuery);

	public  List<EvalFlow> findList(EvalFlowQuery evalFlowQuery);

	public  int findListNum(EvalFlowQuery evalFlowQuery);


}
