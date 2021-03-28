package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.domain.EvalLevelExample;
import cc.water.ciro.eval.mapper.EvalLevelDao;
import cc.water.ciro.eval.query.EvalLevelQuery;
import cc.water.ciro.eval.service.EvalLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalLevelServiceImpl extends BaseService implements EvalLevelService {
	
	@Autowired
	private EvalLevelDao evalLevelDao;
	
	public void addEvalLevel(EvalLevel evalLevel) {
		 evalLevel.setCreateDate(new Date());
		 evalLevelDao.insert(evalLevel);
	}
	@Transactional(readOnly=true)
	public EvalLevel getEvalLevelByKey(Long id) {
		return evalLevelDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalLevel> getEvalLevelByKeys(List<Long> ids) {
		EvalLevelExample example = new  EvalLevelExample();
		EvalLevelExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalLevelDao.selectByExample(example);
	}

	public void deleteEvalLevelByKey(Long id) {
		 evalLevelDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalLevelByKeys(List<Long> ids) {
		EvalLevelExample example = new  EvalLevelExample();
		EvalLevelExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalLevelDao.deleteByExample(example);
	}

	public void updateEvalLevelByKey(EvalLevel evalLevel) {
		 evalLevelDao.updateByPrimaryKey(evalLevel);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalLevelWithPage(EvalLevelQuery evalLevelQuery) {
		EvalLevelExample example = new  EvalLevelExample();
		example.setOffset(evalLevelQuery.getStartRow());
		example.setLimit(evalLevelQuery.getPageSize());
		EvalLevelExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalLevelQuery.getCode())) {
			criteria.andCodeLike('%'+evalLevelQuery.getCode()+'%');
		}
		if(StringUtil.isNotEmpty(evalLevelQuery.getName())) {
			criteria.andNameLike('%'+evalLevelQuery.getName()+'%');
		}
		Pagination<EvalLevel> pagination=new Pagination<EvalLevel>(evalLevelQuery.getPageNo(), evalLevelQuery.getPageSize(), evalLevelDao.countByExample(example));
		List<EvalLevel> evalLevelList=evalLevelDao.selectByExample(example);
		pagination.setRows(evalLevelList);
		return pagination;
	}

	@Override
	public int getEvalLevelCount(EvalLevelQuery evalLevelQuery) {
		EvalLevelExample example = new  EvalLevelExample();
		EvalLevelExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalLevelQuery.getCode())) {
			criteria.andCodeLike(evalLevelQuery.getCode());
		}
		if(StringUtil.isNotEmpty(evalLevelQuery.getName())) {
			criteria.andNameLike(evalLevelQuery.getName());
		}
		return evalLevelDao.countByExample(example);
	}

	@Override
	public List<EvalLevel> findList(EvalLevelQuery evalLevelQuery) {
		return evalLevelDao.findList(evalLevelQuery);
	}

	@Override
	public int findListNum(EvalLevelQuery evalLevelQuery) {
		return evalLevelDao.findListNum(evalLevelQuery);
	}
}
