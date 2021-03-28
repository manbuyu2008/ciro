package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalEventEnum;
import cc.water.ciro.eval.query.EvalEventEnumQuery;

import java.util.List;

public interface EvalEventEnumService {
	public void addEvalEventEnum(EvalEventEnum evalEventEnum);
	
	public EvalEventEnum getEvalEventEnumByKey(Long id);

	public List<EvalEventEnum> getEvalEventEnumByKeys(List<Long> ids);
	
	public void deleteEvalEventEnumByKey(Long id);
	
	public void deleteEvalEventEnumByKeys(List<Long> ids);
	
	public void updateEvalEventEnumByKey(EvalEventEnum evalEventEnum);
	
	public Pagination getEvalEventEnumWithPage(EvalEventEnumQuery evalEventEnumQuery);
	
	public  int getEvalEventEnumCount(EvalEventEnumQuery evalEventEnumQuery);

}
