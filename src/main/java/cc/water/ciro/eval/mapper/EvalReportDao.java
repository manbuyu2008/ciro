package cc.water.ciro.eval.mapper;

import cc.water.ciro.common.annotation.MapperDao;
import cc.water.ciro.eval.reportBean.*;
import cc.water.ciro.eval.reportQuery.EvalReportDwQuery;

import java.util.HashMap;
import java.util.List;

@MapperDao
public interface EvalReportDao {
    List<EvalReportUser> getPortalSelf(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportUserInfo> getReportUserInfo(HashMap map);

    List<EvalReportDwPie> getReportDwPie(EvalReportDwQuery evalReportDwQuery);

    int getReportDwPieCount(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportDw> getReportDw(EvalReportDwQuery evalReportDwQuery);

    int getReportDwCount(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportKs> getReportKs(EvalReportDwQuery evalReportDwQuery);

    int getReportKsCount(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportUser> getReportUser(EvalReportDwQuery evalReportDwQuery);

    int getReportUserCount(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportDwData> getReportDwData(EvalReportDwQuery evalReportDwQuery);

    int getReportDwDataCount(EvalReportDwQuery evalReportDwQuery);


    List<EvalReportUserData> getReportUserData(EvalReportDwQuery evalReportDwQuery);

    int getReportUserDataCount(EvalReportDwQuery evalReportDwQuery);

    List<EvalReportUserData> getReportUserDataW(EvalReportDwQuery evalReportDwQuery);

    int getReportUserDataWCount(EvalReportDwQuery evalReportDwQuery);


}