package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.domain.EvalZqExample;
import cc.water.ciro.eval.mapper.EvalZqDao;
import cc.water.ciro.eval.query.EvalStdQuery;
import cc.water.ciro.eval.query.EvalZqQuery;
import cc.water.ciro.eval.service.EvalZqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalZqServiceImpl extends BaseService implements EvalZqService {
	
	@Autowired
	private EvalZqDao evalZqDao;
	
	public void addEvalZq(EvalZq evalZq) {
		 evalZq.setCreateDate(new Date());
		 evalZqDao.insert(evalZq);
	}
	@Transactional(readOnly=true)
	public EvalZq getEvalZqByKey(Long id) {
		return evalZqDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalZq> getEvalZqByKeys(List<Long> ids) {
		EvalZqExample example = new  EvalZqExample();
		EvalZqExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalZqDao.selectByExample(example);
	}

	public void deleteEvalZqByKey(Long id) {
		 evalZqDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalZqByKeys(List<Long> ids) {
		EvalZqExample example = new  EvalZqExample();
		EvalZqExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalZqDao.deleteByExample(example);
	}

	public void updateEvalZqByKey(EvalZq evalZq) {
		 evalZqDao.updateByPrimaryKeySelective(evalZq);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalZqWithPage(EvalZqQuery evalZqQuery) {
		EvalZqExample example = new  EvalZqExample();
		example.setOffset(evalZqQuery.getStartRow());
		example.setLimit(evalZqQuery.getPageSize());
		EvalZqExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalZqQuery.getCode())) {
			criteria.andCodeLike('%'+evalZqQuery.getCode()+'%');
		}
		if(StringUtil.isNotEmpty(evalZqQuery.getName())) {
			criteria.andNameLike('%'+evalZqQuery.getName()+'%');
		}
		if(evalZqQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalZqQuery.getIds()));
		}
		if(StringUtil.isNotEmpty(evalZqQuery.getStatus())) {
			criteria.andStatusEqualTo(evalZqQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalZqQuery.getStrOrder())) {
			example.setOrderByClause(evalZqQuery.getStrOrder());
		}
		Pagination<EvalZq> pagination=new Pagination<EvalZq>(evalZqQuery.getPageNo(), evalZqQuery.getPageSize(), evalZqDao.countByExample(example));
		List<EvalZq> evalZqList=evalZqDao.selectByExample(example);
		pagination.setRows(evalZqList);
		return pagination;
	}

	@Override
	public int getEvalZqCount(EvalZqQuery evalZqQuery) {
		EvalZqExample example = new  EvalZqExample();
		EvalZqExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalZqQuery.getCode())) {
			criteria.andCodeLike(evalZqQuery.getCode());
		}
		if(StringUtil.isNotEmpty(evalZqQuery.getName())) {
			criteria.andNameLike(evalZqQuery.getName());
		}
		if(evalZqQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalZqQuery.getIds()));
		}
		return evalZqDao.countByExample(example);
	}

	@Override
	public List<EvalZq> findList(EvalZqQuery evalZqQuery) {
		return evalZqDao.findList(evalZqQuery);
	}

	@Override
	public int findListNum(EvalZqQuery evalZqQuery) {
		return evalZqDao.findListNum(evalZqQuery);
	}
}
