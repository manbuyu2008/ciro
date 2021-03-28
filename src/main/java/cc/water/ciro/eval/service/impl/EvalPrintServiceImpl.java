package cc.water.ciro.eval.service.impl;

import cc.water.ciro.common.service.impl.BaseService;
import cc.water.ciro.eval.mapper.EvalReportPrintDao;
import cc.water.ciro.eval.reportBean.ReportPrintEventEnum;
import cc.water.ciro.eval.reportBean.ReportPrintUser;
import cc.water.ciro.eval.reportQuery.EvalReportPrintQuery;
import cc.water.ciro.eval.service.EvalPrintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EvalPrintServiceImpl extends BaseService implements EvalPrintService {
	
	@Autowired
	private EvalReportPrintDao evalReportPrintDao;

	@Override
	public ReportPrintUser reportDetailPrint(EvalReportPrintQuery evalReportPrintQuery) {
		return evalReportPrintDao.reportDetailPrint(evalReportPrintQuery);
	}

	@Override
	public List<ReportPrintEventEnum> reportSelfEnumPrint(EvalReportPrintQuery evalReportPrintQuery) {
		return evalReportPrintDao.reportSelfEnumPrint(evalReportPrintQuery);
	}

	@Override
	public List<ReportPrintEventEnum> reportEventPrint(EvalReportPrintQuery evalReportPrintQuery) {
		return evalReportPrintDao.reportEventPrint(evalReportPrintQuery);
	}
}
