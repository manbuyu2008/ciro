package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.query.EvalLevelQuery;

import java.util.List;

public interface EvalLevelService {
	public void addEvalLevel(EvalLevel evalLevel);
	
	public EvalLevel getEvalLevelByKey(Long id);

	public List<EvalLevel> getEvalLevelByKeys(List<Long> ids);
	
	public void deleteEvalLevelByKey(Long id);
	
	public void deleteEvalLevelByKeys(List<Long> ids);
	
	public void updateEvalLevelByKey(EvalLevel evalLevel);
	
	public Pagination getEvalLevelWithPage(EvalLevelQuery evalLevelQuery);
	
	public  int getEvalLevelCount(EvalLevelQuery evalLevelQuery);

	public  List<EvalLevel> findList(EvalLevelQuery evalLevelQuery);

	public  int findListNum(EvalLevelQuery evalLevelQuery);
}
