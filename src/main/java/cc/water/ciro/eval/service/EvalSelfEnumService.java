package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalSelfEnum;
import cc.water.ciro.eval.query.EvalSelfEnumQuery;

import java.util.List;

public interface EvalSelfEnumService {
	public void addEvalSelfEnum(EvalSelfEnum evalSelfEnum);
	
	public EvalSelfEnum getEvalSelfEnumByKey(Long id);

	public List<EvalSelfEnum> getEvalSelfEnumByKeys(List<Long> ids);
	
	public void deleteEvalSelfEnumByKey(Long id);
	
	public void deleteEvalSelfEnumByKeys(List<Long> ids);
	
	public void updateEvalSelfEnumByKey(EvalSelfEnum evalSelfEnum);
	
	public Pagination getEvalSelfEnumWithPage(EvalSelfEnumQuery evalSelfEnumQuery);
	
	public  int getEvalSelfEnumCount(EvalSelfEnumQuery evalSelfEnumQuery);

}
