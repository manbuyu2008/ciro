package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.reportBean.ReportPrintEventEnum;
import cc.water.ciro.eval.reportBean.ReportPrintUser;
import cc.water.ciro.eval.reportQuery.EvalReportPrintQuery;

import java.util.List;

@MapperDao
public interface EvalReportPrintDao {
    ReportPrintUser reportDetailPrint(EvalReportPrintQuery evalReportPrintQuery);

    List<ReportPrintEventEnum> reportSelfEnumPrint(EvalReportPrintQuery evalReportPrintQuery);

    List<ReportPrintEventEnum> reportEventPrint(EvalReportPrintQuery evalReportPrintQuery);

}