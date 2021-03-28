package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.domain.EvalUserTypeExample;
import cc.water.ciro.eval.query.EvalUserTypeQuery;

import java.util.List;

public interface EvalUserTypeService {
	public void addEvalUserType(EvalUserType evalUserType);
	
	public EvalUserType getEvalUserTypeByKey(Long id);

	public List<EvalUserType> getEvalUserTypeByKeys(List<Long> ids);
	
	public void deleteEvalUserTypeByKey(Long id);
	
	public void deleteEvalUserTypeByKeys(List<Long> ids);
	
	public void updateEvalUserTypeByKey(EvalUserType evalUserType);
	
	public Pagination getEvalUserTypeWithPage(EvalUserTypeQuery evalUserTypeQuery);
	
	public  int getEvalUserTypeCount(EvalUserTypeQuery evalUserTypeQuery);

}
