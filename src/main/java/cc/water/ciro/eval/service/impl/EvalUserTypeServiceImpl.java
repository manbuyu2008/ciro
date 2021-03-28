package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.domain.EvalUserTypeExample;
import cc.water.ciro.eval.mapper.EvalFlowDao;
import cc.water.ciro.eval.mapper.EvalUserTypeDao;
import cc.water.ciro.eval.query.EvalUserTypeQuery;
import cc.water.ciro.eval.service.EvalFlowService;
import cc.water.ciro.eval.service.EvalUserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class EvalUserTypeServiceImpl extends BaseService implements EvalUserTypeService {
	
	@Autowired
	private EvalUserTypeDao evalUserTypeDao;
	@Autowired
	private EvalFlowDao evalFlowDao;

	public void addEvalUserType(EvalUserType evalUserType) {
		 evalUserType.setCreateDate(new Date());
		 evalUserTypeDao.insert(evalUserType);
	}
	@Transactional(readOnly=true)
	public EvalUserType getEvalUserTypeByKey(Long id) {
		return evalUserTypeDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalUserType> getEvalUserTypeByKeys(List<Long> ids) {
		EvalUserTypeExample example = new  EvalUserTypeExample();
		EvalUserTypeExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalUserTypeDao.selectByExample(example);
	}

	public void deleteEvalUserTypeByKey(Long id) {
		 evalUserTypeDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalUserTypeByKeys(List<Long> ids) {
		EvalUserTypeExample example = new  EvalUserTypeExample();
		EvalUserTypeExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalUserTypeDao.deleteByExample(example);
	}

	public void updateEvalUserTypeByKey(EvalUserType evalUserType) {
		 evalUserTypeDao.updateByPrimaryKey(evalUserType);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalUserTypeWithPage(EvalUserTypeQuery evalUserTypeQuery) {
		EvalUserTypeExample example = new  EvalUserTypeExample();
		EvalUserTypeExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalUserTypeQuery.getCode())) {
			criteria.andTypeCodeLike('%'+evalUserTypeQuery.getCode()+'%');
		}
		if(StringUtil.isNotEmpty(evalUserTypeQuery.getName())) {
			criteria.andTypeNameLike('%'+evalUserTypeQuery.getName()+'%');
		}
		if(evalUserTypeQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalUserTypeQuery.getIds()));
		}
		Pagination<EvalUserType> pagination=new Pagination<EvalUserType>(evalUserTypeQuery.getPageNo(), evalUserTypeQuery.getPageSize(), evalUserTypeDao.countByExample(example));
		List<EvalUserType> evalUserTypeList=evalUserTypeDao.selectByExample(example);
		if(evalUserTypeList!=null) {
			for (EvalUserType evalUserType : evalUserTypeList) {
				evalUserType.setFlowBean(evalFlowDao.selectByPrimaryKey(Long.valueOf(evalUserType.getFlowId())));
			}
		}
		pagination.setRows(evalUserTypeList);
		return pagination;
	}

	@Override
	public int getEvalUserTypeCount(EvalUserTypeQuery evalUserTypeQuery) {
		EvalUserTypeExample example = new  EvalUserTypeExample();
		EvalUserTypeExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalUserTypeQuery.getCode())) {
			criteria.andTypeCodeLike(evalUserTypeQuery.getCode());
		}
		if(StringUtil.isNotEmpty(evalUserTypeQuery.getName())) {
			criteria.andTypeNameLike(evalUserTypeQuery.getName());
		}
		if(evalUserTypeQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalUserTypeQuery.getIds()));
		}
		return evalUserTypeDao.countByExample(example);
	}

}
