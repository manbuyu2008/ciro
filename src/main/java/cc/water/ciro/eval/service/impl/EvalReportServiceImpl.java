package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.eval.mapper.EvalReportDao;
import cc.water.ciro.eval.reportBean.*;
import cc.water.ciro.eval.reportQuery.EvalReportDwQuery;
import cc.water.ciro.eval.service.EvalReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EvalReportServiceImpl extends BaseService implements EvalReportService {
	
	@Autowired
	private EvalReportDao evalReportDao;

	@Override
	public List<EvalReportUser> getPortalSelf(EvalReportDwQuery evalReportDwQuery) {
		return evalReportDao.getPortalSelf(evalReportDwQuery);
	}

	@Override
	public Pagination getReportDwPieWithPage(EvalReportDwQuery reportDwQuery) {
		Pagination<EvalReportDwPie> pagination=new Pagination<EvalReportDwPie>(reportDwQuery.getPageNo(),
				reportDwQuery.getPageSize(), evalReportDao.getReportDwPieCount(reportDwQuery));
		List<EvalReportDwPie> reportList=evalReportDao.getReportDwPie(reportDwQuery);
		pagination.setRows(reportList);
		return pagination;
	}

	@Override
	public Pagination getReportDwWithPage(EvalReportDwQuery reportDwQuery) {
		Pagination<EvalReportDw> pagination=new Pagination<EvalReportDw>(reportDwQuery.getPageNo(),
				reportDwQuery.getPageSize(), evalReportDao.getReportDwCount(reportDwQuery));
		List<EvalReportDw> reportList=evalReportDao.getReportDw(reportDwQuery);
		pagination.setRows(reportList);
		return pagination;
	}

	@Override
	public Pagination getReportKsWithPage(EvalReportDwQuery reportDwQuery) {
		Pagination<EvalReportKs> pagination=new Pagination<EvalReportKs>(reportDwQuery.getPageNo(),
				reportDwQuery.getPageSize(), evalReportDao.getReportKsCount(reportDwQuery));
		List<EvalReportKs> reportList=evalReportDao.getReportKs(reportDwQuery);
		pagination.setRows(reportList);
		return pagination;
	}

	@Override
	public Pagination getReportUserWithPage(EvalReportDwQuery reportDwQuery) {
		Pagination<EvalReportUser> pagination=new Pagination<EvalReportUser>(reportDwQuery.getPageNo(),
				reportDwQuery.getPageSize(), evalReportDao.getReportUserCount(reportDwQuery));
		List<EvalReportUser> reportList=evalReportDao.getReportUser(reportDwQuery);
		pagination.setRows(reportList);
		return pagination;
	}

	@Override
	public Pagination getReportDwDataWithPage(EvalReportDwQuery reportDwQuery) {
		Pagination<EvalReportDwData> pagination=new Pagination<EvalReportDwData>(reportDwQuery.getPageNo(),
				reportDwQuery.getPageSize(), evalReportDao.getReportDwDataCount(reportDwQuery));
		List<EvalReportDwData> reportList=evalReportDao.getReportDwData(reportDwQuery);
		pagination.setRows(reportList);
		return pagination;
	}

	@Override
	public Pagination getReportUserDataWithPage(EvalReportDwQuery reportDwQuery) {
		if(reportDwQuery.getType()%2!=0) {
			Pagination<EvalReportUserData> pagination = new Pagination<EvalReportUserData>(reportDwQuery.getPageNo(),
					reportDwQuery.getPageSize(), evalReportDao.getReportUserDataCount(reportDwQuery));
			List<EvalReportUserData> reportList = evalReportDao.getReportUserData(reportDwQuery);
			pagination.setRows(reportList);
			return pagination;
		} else{
			Pagination<EvalReportUserData> pagination = new Pagination<EvalReportUserData>(reportDwQuery.getPageNo(),
					reportDwQuery.getPageSize(), evalReportDao.getReportUserDataWCount(reportDwQuery));
			List<EvalReportUserData> reportList = evalReportDao.getReportUserDataW(reportDwQuery);
			pagination.setRows(reportList);
			return pagination;
		}
	}
}
