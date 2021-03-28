package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalEventEnum;
import cc.water.ciro.eval.domain.EvalEventEnumExample;
import cc.water.ciro.eval.mapper.EvalFlowDao;
import cc.water.ciro.eval.mapper.EvalEventEnumDao;
import cc.water.ciro.eval.query.EvalEventEnumQuery;
import cc.water.ciro.eval.service.EvalEventEnumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalEventEnumServiceImpl extends BaseService implements EvalEventEnumService {
	
	@Autowired
	private EvalEventEnumDao evalEventEnumDao;
	@Autowired
	private EvalFlowDao evalFlowDao;

	public void addEvalEventEnum(EvalEventEnum evalEventEnum) {
		 evalEventEnum.setCreateDate(new Date());
		 evalEventEnumDao.insert(evalEventEnum);
	}
	@Transactional(readOnly=true)
	public EvalEventEnum getEvalEventEnumByKey(Long id) {
		return evalEventEnumDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalEventEnum> getEvalEventEnumByKeys(List<Long> ids) {
		EvalEventEnumExample example = new  EvalEventEnumExample();
		EvalEventEnumExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalEventEnumDao.selectByExample(example);
	}

	public void deleteEvalEventEnumByKey(Long id) {
		 evalEventEnumDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalEventEnumByKeys(List<Long> ids) {
		EvalEventEnumExample example = new  EvalEventEnumExample();
		EvalEventEnumExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalEventEnumDao.deleteByExample(example);
	}

	public void updateEvalEventEnumByKey(EvalEventEnum evalEventEnum) {
		 evalEventEnumDao.updateByPrimaryKey(evalEventEnum);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalEventEnumWithPage(EvalEventEnumQuery evalEventEnumQuery) {
		EvalEventEnumExample example = new  EvalEventEnumExample();
		EvalEventEnumExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalEventEnumQuery.getParentId())) {
			criteria.andParentIdEqualTo(evalEventEnumQuery.getParentId());
		}
		if(evalEventEnumQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalEventEnumQuery.getIds()));
		}
		if(StringUtil.isNotEmpty(evalEventEnumQuery.getStatus())) {
			criteria.andStatusEqualTo(evalEventEnumQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalEventEnumQuery.getType())) {
			criteria.andTypeEqualTo(evalEventEnumQuery.getType());
		}
		Pagination<EvalEventEnum> pagination=new Pagination<EvalEventEnum>(evalEventEnumQuery.getPageNo(), evalEventEnumQuery.getPageSize(), evalEventEnumDao.countByExample(example));
		List<EvalEventEnum> evalEventEnumList=evalEventEnumDao.selectByExample(example);
//		if(evalEventEnumList!=null) {
//			for (EvalEventEnum evalEventEnum : evalEventEnumList) {
//			}
//		}
		pagination.setRows(evalEventEnumList);
		return pagination;
	}

	@Override
	public int getEvalEventEnumCount(EvalEventEnumQuery evalEventEnumQuery) {
		EvalEventEnumExample example = new  EvalEventEnumExample();
		EvalEventEnumExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalEventEnumQuery.getParentId())) {
			criteria.andParentIdEqualTo(evalEventEnumQuery.getParentId());
		}
		if(evalEventEnumQuery.getIds()!=null) {
			criteria.andIdIn(convertToLong(evalEventEnumQuery.getIds()));
		}
		return evalEventEnumDao.countByExample(example);
	}

}
