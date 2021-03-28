package cc.water.ciro.eval.service;

import cc.water.ciro.eval.reportBean.ReportPrintEventEnum;
import cc.water.ciro.eval.reportBean.ReportPrintUser;
import cc.water.ciro.eval.reportQuery.EvalReportPrintQuery;

import java.util.List;

public interface EvalPrintService {
    public ReportPrintUser reportDetailPrint(EvalReportPrintQuery evalReportPrintQuery);

    public List<ReportPrintEventEnum> reportSelfEnumPrint(EvalReportPrintQuery evalReportPrintQuery);

    public List<ReportPrintEventEnum> reportEventPrint(EvalReportPrintQuery evalReportPrintQuery);
}
