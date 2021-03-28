package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalSelfScoreStd;
import cc.water.ciro.eval.domain.EvalSelfScoreStdExample;
import cc.water.ciro.eval.domain.EvalUserType;
import cc.water.ciro.eval.mapper.EvalSelfScoreStdDao;
import cc.water.ciro.eval.mapper.EvalUserTypeDao;
import cc.water.ciro.eval.query.EvalSelfScoreStdQuery;
import cc.water.ciro.eval.service.EvalSelfScoreStdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalSelfScoreStdServiceImpl extends BaseService implements EvalSelfScoreStdService {
	
	@Autowired
	private EvalSelfScoreStdDao evalSelfScoreStdDao;
	@Autowired
	private EvalUserTypeDao evalUserTypeDao;

	public void addEvalSelfScoreStd(EvalSelfScoreStd evalSelfScoreStd) {
		 evalSelfScoreStd.setCreateDate(new Date());
		 evalSelfScoreStdDao.insert(evalSelfScoreStd);
	}
	@Transactional(readOnly=true)
	public EvalSelfScoreStd getEvalSelfScoreStdByKey(Long id) {
		return evalSelfScoreStdDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalSelfScoreStd> getEvalSelfScoreStdByKeys(List<Long> ids) {
		EvalSelfScoreStdExample example = new  EvalSelfScoreStdExample();
		EvalSelfScoreStdExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalSelfScoreStdDao.selectByExample(example);
	}

	public void deleteEvalSelfScoreStdByKey(Long id) {
		 evalSelfScoreStdDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalSelfScoreStdByKeys(List<Long> ids) {
		EvalSelfScoreStdExample example = new  EvalSelfScoreStdExample();
		EvalSelfScoreStdExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalSelfScoreStdDao.deleteByExample(example);
	}

	public void updateEvalSelfScoreStdByKey(EvalSelfScoreStd evalSelfScoreStd) {
		 evalSelfScoreStdDao.updateByPrimaryKey(evalSelfScoreStd);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalSelfScoreStdWithPage(EvalSelfScoreStdQuery evalSelfScoreStdQuery) {
		EvalSelfScoreStdExample example = new  EvalSelfScoreStdExample();
		example.setOffset(evalSelfScoreStdQuery.getStartRow());
		example.setLimit(evalSelfScoreStdQuery.getPageSize());
		EvalSelfScoreStdExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalSelfScoreStdQuery.getCode())) {
			criteria.andCodeLike('%'+evalSelfScoreStdQuery.getCode()+'%');
		}
		if(StringUtil.isNotEmpty(evalSelfScoreStdQuery.getName())) {
			criteria.andNameLike('%'+evalSelfScoreStdQuery.getName()+'%');
		}
		Pagination<EvalSelfScoreStd> pagination=new Pagination<EvalSelfScoreStd>(evalSelfScoreStdQuery.getPageNo(), evalSelfScoreStdQuery.getPageSize(), evalSelfScoreStdDao.countByExample(example));
		List<EvalSelfScoreStd> evalSelfScoreStdList=evalSelfScoreStdDao.selectByExample(example);
		for(EvalSelfScoreStd evalSelfScoreStd:evalSelfScoreStdList){
			EvalUserType userType = evalUserTypeDao.selectByPrimaryKey(Long.valueOf(evalSelfScoreStd.getUserTypeId()));
			if(userType!=null) evalSelfScoreStd.setUserTypeName(userType.getTypeName());
		}
		pagination.setRows(evalSelfScoreStdList);
		return pagination;
	}

	@Override
	public int getEvalSelfScoreStdCount(EvalSelfScoreStdQuery evalSelfScoreStdQuery) {
		EvalSelfScoreStdExample example = new  EvalSelfScoreStdExample();
		EvalSelfScoreStdExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalSelfScoreStdQuery.getCode())) {
			criteria.andCodeLike(evalSelfScoreStdQuery.getCode());
		}
		if(StringUtil.isNotEmpty(evalSelfScoreStdQuery.getName())) {
			criteria.andNameLike(evalSelfScoreStdQuery.getName());
		}
		return evalSelfScoreStdDao.countByExample(example);
	}

	@Override
	public List<EvalSelfScoreStd> findList(EvalSelfScoreStdQuery evalSelfScoreStdQuery) {
		return evalSelfScoreStdDao.findList(evalSelfScoreStdQuery);
	}

	@Override
	public int findListNum(EvalSelfScoreStdQuery evalSelfScoreStdQuery) {
		return evalSelfScoreStdDao.findListNum(evalSelfScoreStdQuery);
	}
}
