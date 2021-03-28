package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.query.EvalStdQuery;
import cc.water.ciro.eval.query.EvalZqQuery;

import java.util.List;

public interface EvalZqService {
	public void addEvalZq(EvalZq evalZq);
	
	public EvalZq getEvalZqByKey(Long id);

	public List<EvalZq> getEvalZqByKeys(List<Long> ids);
	
	public void deleteEvalZqByKey(Long id);
	
	public void deleteEvalZqByKeys(List<Long> ids);
	
	public void updateEvalZqByKey(EvalZq evalZq);
	
	public Pagination getEvalZqWithPage(EvalZqQuery evalZqQuery);
	
	public  int getEvalZqCount(EvalZqQuery evalZqQuery);

	public  List<EvalZq> findList(EvalZqQuery evalZqQuery);

	public  int findListNum(EvalZqQuery evalZqQuery);
}
