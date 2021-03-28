package cc.water.ciro.eval.service;

import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.query.EvalZqQuery;
import cc.water.ciro.eval.reportBean.EvalReportUser;
import cc.water.ciro.eval.reportQuery.EvalReportDwQuery;

import java.util.List;

public interface EvalReportService {

	public List<EvalReportUser> getPortalSelf(EvalReportDwQuery evalReportDwQuery);

	public Pagination getReportDwPieWithPage(EvalReportDwQuery reportDwQuery);

	public Pagination getReportDwWithPage(EvalReportDwQuery reportDwQuery);

	public Pagination getReportKsWithPage(EvalReportDwQuery reportDwQuery);

	public Pagination getReportUserWithPage(EvalReportDwQuery reportDwQuery);

	public Pagination getReportDwDataWithPage(EvalReportDwQuery reportDwQuery);

	public Pagination getReportUserDataWithPage(EvalReportDwQuery reportDwQuery);

}
