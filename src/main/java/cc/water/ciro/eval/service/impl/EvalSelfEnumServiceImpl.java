package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalSelfEnum;
import cc.water.ciro.eval.domain.EvalSelfEnumExample;
import cc.water.ciro.eval.mapper.EvalFlowDao;
import cc.water.ciro.eval.mapper.EvalSelfEnumDao;
import cc.water.ciro.eval.query.EvalSelfEnumQuery;
import cc.water.ciro.eval.service.EvalSelfEnumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalSelfEnumServiceImpl extends BaseService implements EvalSelfEnumService {
	
	@Autowired
	private EvalSelfEnumDao evalSelfEnumDao;
	@Autowired
	private EvalFlowDao evalFlowDao;

	public void addEvalSelfEnum(EvalSelfEnum evalSelfEnum) {
		 evalSelfEnum.setCreateDate(new Date());
		 evalSelfEnumDao.insert(evalSelfEnum);
	}
	@Transactional(readOnly=true)
	public EvalSelfEnum getEvalSelfEnumByKey(Long id) {
		return evalSelfEnumDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalSelfEnum> getEvalSelfEnumByKeys(List<Long> ids) {
		EvalSelfEnumExample example = new  EvalSelfEnumExample();
		EvalSelfEnumExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalSelfEnumDao.selectByExample(example);
	}

	public void deleteEvalSelfEnumByKey(Long id) {
		 evalSelfEnumDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalSelfEnumByKeys(List<Long> ids) {
		EvalSelfEnumExample example = new  EvalSelfEnumExample();
		EvalSelfEnumExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalSelfEnumDao.deleteByExample(example);
	}

	public void updateEvalSelfEnumByKey(EvalSelfEnum evalSelfEnum) {
		 evalSelfEnumDao.updateByPrimaryKey(evalSelfEnum);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalSelfEnumWithPage(EvalSelfEnumQuery evalSelfEnumQuery) {
		EvalSelfEnumExample example = new  EvalSelfEnumExample();
		EvalSelfEnumExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalSelfEnumQuery.getParentId())) {
			criteria.andParentIdEqualTo(evalSelfEnumQuery.getParentId());
		}
		if(evalSelfEnumQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalSelfEnumQuery.getIds()));
		}
		Pagination<EvalSelfEnum> pagination=new Pagination<EvalSelfEnum>(evalSelfEnumQuery.getPageNo(), evalSelfEnumQuery.getPageSize(), evalSelfEnumDao.countByExample(example));
		List<EvalSelfEnum> evalSelfEnumList=evalSelfEnumDao.selectByExample(example);
//		if(evalSelfEnumList!=null) {
//			for (EvalSelfEnum evalSelfEnum : evalSelfEnumList) {
//			}
//		}
		pagination.setRows(evalSelfEnumList);
		return pagination;
	}

	@Override
	public int getEvalSelfEnumCount(EvalSelfEnumQuery evalSelfEnumQuery) {
		EvalSelfEnumExample example = new  EvalSelfEnumExample();
		EvalSelfEnumExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalSelfEnumQuery.getParentId())) {
			criteria.andParentIdEqualTo(evalSelfEnumQuery.getParentId());
		}
		if(evalSelfEnumQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalSelfEnumQuery.getIds()));
		}
		return evalSelfEnumDao.countByExample(example);
	}

}
