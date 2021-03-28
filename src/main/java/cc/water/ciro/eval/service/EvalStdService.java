package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.query.EvalStdQuery;

import java.util.List;

public interface EvalStdService {
	public void addEvalStd(EvalStd evalStd);
	
	public EvalStd getEvalStdByKey(Long id);

	public List<EvalStd> getEvalStdByKeys(List<Long> ids);
	
	public void deleteEvalStdByKey(Long id);
	
	public void deleteEvalStdByKeys(List<Long> ids);
	
	public void updateEvalStdByKey(EvalStd evalStd);
	
	public Pagination getEvalStdWithPage(EvalStdQuery evalStdQuery);
	
	public  int getEvalStdCount(EvalStdQuery evalStdQuery);

	public  List<EvalStd> findList(EvalStdQuery evalStdQuery);

	public  int findListNum(EvalStdQuery evalStdQuery);

}
