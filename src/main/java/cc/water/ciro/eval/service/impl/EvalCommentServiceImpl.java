package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.domain.EvalComment;
import cc.water.ciro.eval.domain.EvalCommentExample;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.enums.EvalRoleEnum;
import cc.water.ciro.eval.mapper.EvalCommentDao;
import cc.water.ciro.eval.mapper.EvalLevelDao;
import cc.water.ciro.eval.query.EvalCommentQuery;
import cc.water.ciro.eval.service.EvalCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class EvalCommentServiceImpl extends BaseService implements EvalCommentService {
	
	@Autowired
	private EvalCommentDao evalCommentDao;
	@Autowired
	private EvalLevelDao evalLevelDao;
	public void addEvalComment(EvalComment evalComment) {
		 evalComment.setCreateDate(new Date());
		 evalCommentDao.insert(evalComment);
	}
	@Transactional(readOnly=true)
	public EvalComment getEvalCommentByKey(Long id) {
		return evalCommentDao.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=true)
	public List<EvalComment> getEvalCommentByKeys(List<Long> ids) {
		EvalCommentExample example = new  EvalCommentExample();
		EvalCommentExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		return evalCommentDao.selectByExample(example);
	}

	public void deleteEvalCommentByKey(Long id) {
		 evalCommentDao.deleteByPrimaryKey(id);
	}

	public void deleteEvalCommentByKeys(List<Long> ids) {
		EvalCommentExample example = new  EvalCommentExample();
		EvalCommentExample.Criteria criteria = example.createCriteria();
		criteria.andIdIn(ids);
		 evalCommentDao.deleteByExample(example);
	}

	public void updateEvalCommentByKey(EvalComment evalComment) {
		 evalCommentDao.updateByPrimaryKey(evalComment);
	}

	@Transactional(readOnly=true)
	public Pagination getEvalCommentWithPage(EvalCommentQuery evalCommentQuery) {
		EvalCommentExample example = new  EvalCommentExample();
		example.setOffset(evalCommentQuery.getStartRow());
		example.setLimit(evalCommentQuery.getPageSize());
		EvalCommentExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalCommentQuery.getStatus())) {
			criteria.andStatusEqualTo(evalCommentQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalCommentQuery.getDid())) {
			criteria.andDidEqualTo(evalCommentQuery.getDid());
		}
		Pagination<EvalComment> pagination=new Pagination<EvalComment>(evalCommentQuery.getPageNo(), evalCommentQuery.getPageSize(), evalCommentDao.countByExample(example));
		List<EvalComment> evalCommentList=evalCommentDao.selectByExample(example);
		if(evalCommentList!=null){
			for(EvalComment evalComment:evalCommentList){
				EvalRoleEnum evalRoleEnum = EvalRoleEnum.getByCode(evalComment.getStatus());
				if(evalRoleEnum!=null) evalComment.setStatusName(evalRoleEnum.getMessage());
				EvalLevel evalLevel = evalLevelDao.selectByPrimaryKey(Long.valueOf(evalComment.getDid()));
				if(evalLevel!=null) evalComment.setDidName(evalLevel.getName());
			}

		}
		pagination.setRows(evalCommentList);
		return pagination;
	}

	@Override
	public int getEvalCommentCount(EvalCommentQuery evalCommentQuery) {
		EvalCommentExample example = new  EvalCommentExample();
		EvalCommentExample.Criteria criteria = example.createCriteria();
		if(StringUtil.isNotEmpty(evalCommentQuery.getStatus())) {
			criteria.andStatusEqualTo(evalCommentQuery.getStatus());
		}
		if(StringUtil.isNotEmpty(evalCommentQuery.getDid())) {
			criteria.andDidEqualTo(evalCommentQuery.getDid());
		}
		return evalCommentDao.countByExample(example);
	}

	@Override
	public List<EvalComment> findList(EvalCommentQuery evalCommentQuery) {
		return evalCommentDao.findList(evalCommentQuery);
	}

	@Override
	public int findListNum(EvalCommentQuery evalCommentQuery) {
		return evalCommentDao.findListNum(evalCommentQuery);
	}
}
