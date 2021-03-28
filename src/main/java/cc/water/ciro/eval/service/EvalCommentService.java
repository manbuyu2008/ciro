package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalComment;
import cc.water.ciro.eval.query.EvalCommentQuery;

import java.util.List;

public interface EvalCommentService {
	public void addEvalComment(EvalComment evalComment);
	
	public EvalComment getEvalCommentByKey(Long id);

	public List<EvalComment> getEvalCommentByKeys(List<Long> ids);
	
	public void deleteEvalCommentByKey(Long id);
	
	public void deleteEvalCommentByKeys(List<Long> ids);
	
	public void updateEvalCommentByKey(EvalComment evalComment);
	
	public Pagination getEvalCommentWithPage(EvalCommentQuery evalCommentQuery);
	
	public  int getEvalCommentCount(EvalCommentQuery evalCommentQuery);

	public  List<EvalComment> findList(EvalCommentQuery evalCommentQuery);

	public  int findListNum(EvalCommentQuery evalCommentQuery);
}
