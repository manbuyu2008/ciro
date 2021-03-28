package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalStd;
import cc.water.ciro.eval.domain.EvalStdExample;
import cc.water.ciro.eval.mapper.EvalStdDao;
import cc.water.ciro.eval.query.EvalStdQuery;
import cc.water.ciro.eval.service.EvalStdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalStdServiceImpl extends BaseService implements EvalStdService {
	
	@Autowired
	private EvalStdDao evalStdDao;
	
	public void addEvalStd(EvalStd evalStd) {
		 evalStd.setCreateDate(new Date());
		 evalStdDao.insert(evalStd);
	}
	@Transactional(readOnly=true)
	public EvalStd getEvalStdByKey(Long id) {
		return evalStdDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalStd> getEvalStdByKeys(List<Long> ids) {
		EvalStdExample example = new  EvalStdExample();
		EvalStdExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalStdDao.selectByExample(example);
	}

	public void deleteEvalStdByKey(Long id) {
		 evalStdDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalStdByKeys(List<Long> ids) {
		EvalStdExample example = new  EvalStdExample();
		EvalStdExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalStdDao.deleteByExample(example);
	}

	public void updateEvalStdByKey(EvalStd evalStd) {
		 evalStdDao.updateByPrimaryKey(evalStd);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalStdWithPage(EvalStdQuery evalStdQuery) {
		EvalStdExample example = new  EvalStdExample();
		example.setOffset(evalStdQuery.getStartRow());
		example.setLimit(evalStdQuery.getPageSize());
		EvalStdExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalStdQuery.getCode())) {
			criteria.andCodeLike('%'+evalStdQuery.getCode()+'%');
		}
		if(StringUtil.isNotEmpty(evalStdQuery.getName())) {
			criteria.andNameLike('%'+evalStdQuery.getName()+'%');
		}
		if(StringUtil.isNotEmpty(evalStdQuery.getStatus())) {
			criteria.andStatusEqualTo(evalStdQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalStdQuery.getEventType())) {
			criteria.andEventTypeEqualTo(evalStdQuery.getEventType());
		}
		if(evalStdQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalStdQuery.getIds()));
		}
		Pagination<EvalStd> pagination=new Pagination<EvalStd>(evalStdQuery.getPageNo(), evalStdQuery.getPageSize(), evalStdDao.countByExample(example));
		List<EvalStd> evalStdList=evalStdDao.selectByExample(example);
		pagination.setRows(evalStdList);
		return pagination;
	}

	@Override
	public int getEvalStdCount(EvalStdQuery evalStdQuery) {
		EvalStdExample example = new  EvalStdExample();
		EvalStdExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalStdQuery.getCode())) {
			criteria.andCodeLike(evalStdQuery.getCode());
		}
		if(StringUtil.isNotEmpty(evalStdQuery.getName())) {
			criteria.andNameLike(evalStdQuery.getName());
		}
		if(StringUtil.isNotEmpty(evalStdQuery.getStatus())) {
			criteria.andStatusEqualTo(evalStdQuery.getStatus());
		}
		if(evalStdQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalStdQuery.getIds()));
		}
		return evalStdDao.countByExample(example);
	}

	@Override
	public List<EvalStd> findList(EvalStdQuery evalStdQuery) {
		return evalStdDao.findList(evalStdQuery);
	}

	@Override
	public int findListNum(EvalStdQuery evalStdQuery) {
		return  evalStdDao.findListNum(evalStdQuery);
	}
}
