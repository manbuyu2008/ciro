package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalFlow;
import cc.water.ciro.eval.domain.EvalFlowExample;
import cc.water.ciro.eval.mapper.EvalFlowDao;
import cc.water.ciro.eval.query.EvalFlowQuery;
import cc.water.ciro.eval.service.EvalFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalFlowServiceImpl extends BaseService implements EvalFlowService {
	
	@Autowired
	private EvalFlowDao evalFlowDao;
	
	public void addEvalFlow(EvalFlow evalFlow) {
		 evalFlow.setCreateDate(new Date());
		 evalFlowDao.insert(evalFlow);
	}
	@Transactional(readOnly=true)
	public EvalFlow getEvalFlowByKey(Long id) {
		return evalFlowDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalFlow> getEvalFlowByKeys(List<Long> ids) {
		EvalFlowExample example = new  EvalFlowExample();
		EvalFlowExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalFlowDao.selectByExample(example);
	}

	public void deleteEvalFlowByKey(Long id) {
		 evalFlowDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalFlowByKeys(List<Long> ids) {
		EvalFlowExample example = new  EvalFlowExample();
		EvalFlowExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalFlowDao.deleteByExample(example);
	}

	public void updateEvalFlowByKey(EvalFlow evalFlow) {
		 evalFlowDao.updateByPrimaryKey(evalFlow);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalFlowWithPage(EvalFlowQuery evalFlowQuery) {
		EvalFlowExample example = new  EvalFlowExample();
		example.setOffset(evalFlowQuery.getStartRow());
		example.setLimit(evalFlowQuery.getPageSize());
		EvalFlowExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalFlowQuery.getName())) {
			criteria.andNameLike('%'+evalFlowQuery.getName()+'%');
		}
		if(evalFlowQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalFlowQuery.getIds()));
		}
		Pagination<EvalFlow> pagination=new Pagination<EvalFlow>(evalFlowQuery.getPageNo(), evalFlowQuery.getPageSize(), evalFlowDao.countByExample(example));
		List<EvalFlow> evalFlowList=evalFlowDao.selectByExample(example);
		pagination.setRows(evalFlowList);
		return pagination;
	}

	@Override
	public int getEvalFlowCount(EvalFlowQuery evalFlowQuery) {
		EvalFlowExample example = new  EvalFlowExample();
		EvalFlowExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalFlowQuery.getName())) {
			criteria.andNameLike(evalFlowQuery.getName());
		}
		if(evalFlowQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalFlowQuery.getIds()));
		}
		return evalFlowDao.countByExample(example);
	}

	@Override
	public List<EvalFlow> findList(EvalFlowQuery evalFlowQuery) {
		return evalFlowDao.findList(evalFlowQuery);
	}

	@Override
	public int findListNum(EvalFlowQuery evalFlowQuery) {
		return  evalFlowDao.findListNum(evalFlowQuery);
	}
}
