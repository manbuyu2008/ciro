package cc.water.ciro.eval.service;

import cc.water.ciro.common.domain.ActionContext;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalEvent;
import cc.water.ciro.eval.query.EvalEventQuery;

import java.util.List;

public interface EvalEventService {
	public void addEvalEvent(EvalEvent evalEvent);
	
	public EvalEvent getEvalEventByKey(Long id);

	public List<EvalEvent> getEvalEventByKeys(List<Long> ids);
	
	public void deleteEvalEventByKey(Long id);
	
	public void deleteEvalEventByKeys(List<Long> ids);
	
	public void updateEvalEventByKey(EvalEvent evalEvent);
	
	public Pagination getEvalEventWithPage(EvalEventQuery evalEventQuery);
	
	public  int getEvalEventCount(EvalEventQuery evalEventQuery);

	public  void copyCheck(ActionContext context);

	public  void copySave(ActionContext context,String eventSet);

}
