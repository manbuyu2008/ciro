package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalSelfScoreStd;
import cc.water.ciro.eval.query.EvalSelfScoreStdQuery;

import java.util.List;

public interface EvalSelfScoreStdService {
	public void addEvalSelfScoreStd(EvalSelfScoreStd evalSelfScoreStd);
	
	public EvalSelfScoreStd getEvalSelfScoreStdByKey(Long id);

	public List<EvalSelfScoreStd> getEvalSelfScoreStdByKeys(List<Long> ids);
	
	public void deleteEvalSelfScoreStdByKey(Long id);
	
	public void deleteEvalSelfScoreStdByKeys(List<Long> ids);
	
	public void updateEvalSelfScoreStdByKey(EvalSelfScoreStd evalSelfScoreStd);
	
	public Pagination getEvalSelfScoreStdWithPage(EvalSelfScoreStdQuery evalSelfScoreStdQuery);
	
	public  int getEvalSelfScoreStdCount(EvalSelfScoreStdQuery evalSelfScoreStdQuery);

	public  List<EvalSelfScoreStd> findList(EvalSelfScoreStdQuery evalSelfScoreStdQuery);

	public  int findListNum(EvalSelfScoreStdQuery evalSelfScoreStdQuery);
}
