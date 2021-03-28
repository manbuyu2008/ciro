package cc.water.ciro.eval.controller;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.logger.CocoLogger;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.*;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilExport;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.config.SystemConfig;
import cc.water.ciro.eval.domain.EvalBaseInfo;
import cc.water.ciro.eval.domain.EvalLevel;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;
import cc.water.ciro.eval.enums.EvalZqStatusEnum;
import cc.water.ciro.eval.mapper.EvalReportDao;
import cc.water.ciro.eval.query.EvalLevelQuery;
import cc.water.ciro.eval.query.EvalZqQuery;
import cc.water.ciro.eval.reportBean.*;
import cc.water.ciro.eval.reportQuery.EvalReportDwQuery;
import cc.water.ciro.eval.service.EvalLevelService;
import cc.water.ciro.eval.service.EvalReportService;
import cc.water.ciro.eval.service.EvalZqService;
import cc.water.ciro.init.SysParam;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.service.DeptService;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Controller
@RequestMapping("/eval/report/")
public class EvalReportController extends ListController<EvalBaseInfo> {
    @Autowired
    private DeptService deptService;
    @Autowired
    private EvalReportDao evalReportDao;
    @Autowired
    private EvalZqService evalZqService;
    @Autowired
    private EvalLevelService evalLevelService;
    @Autowired
    private EvalReportService evalReportService;
    @Autowired
    private SystemConfig systemConfig;

    final static String path = "eval/report/";

    @RequestMapping("reportDwSum.vm")
    @RequiresPermissions("reportDwSum:query")
    public String reportDwSum(HttpServletRequest request, HttpServletResponse response,
                              Model model) {
        String periodId = request.getParameter("periodId");
        EvalZq evalZq = new EvalZq();
        if (StringUtil.isEmptyEx(periodId)) {
            EvalZqQuery evalZqQuery = new EvalZqQuery();
            evalZqQuery.setStatus(EvalZqStatusEnum.END.getCode());
            evalZqQuery.setStrOrder(" end_date desc");
            Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
            if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
                evalZq = pagination.getRows().get(0);
            }
        } else {
            evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(periodId));
        }
        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> levelList = evalLevelService.findList(evalLevelQuery);
        List<EvalReportUserBaseInfo> baseInfoList = new ArrayList<EvalReportUserBaseInfo>();
        StringBuffer sumStr = new StringBuffer();
        for (EvalLevel level : levelList) {
            EvalReportUserBaseInfo userBaseInfo = new EvalReportUserBaseInfo();
            userBaseInfo.setEvalLevel(level);
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("levelId", String.valueOf(level.getId()));
            map.put("periodId", String.valueOf(evalZq.getId()));
            map.put("status", String.valueOf(EvalFlowStatusEnum.KP_END.getValue()));
            List<EvalReportUserInfo> reportUserInfoList = evalReportDao.getReportUserInfo(map);
            if (reportUserInfoList != null) {
                userBaseInfo.setUserInfoList(reportUserInfoList);
            } else {
                userBaseInfo.setUserInfoList(new ArrayList<EvalReportUserInfo>());
            }
            sumStr.append(level.getName() + "人数<font color='red'>" + userBaseInfo.getUserInfoList().size() + "</font>人;");
            baseInfoList.add(userBaseInfo);
        }
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("sumStr", sumStr.toString());
        model.addAttribute("baseInfoList", baseInfoList);
        model.addAttribute("nowDate", DateUtil.simpleFormatYmd(new Date()));
        model.addAttribute("evalZq", evalZq);
        return path + "reportDwSum";
    }

    @RequestMapping("reportDwSumPrint.vm")
    @RequiresPermissions("reportDwSum:query")
    public String reportDwSumPrint(HttpServletRequest request, HttpServletResponse response,
                              Model model) {
        String periodId = request.getParameter("periodId");
        EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(periodId));
        EvalLevelQuery evalLevelQuery = new EvalLevelQuery();
        List<EvalLevel> levelList = evalLevelService.findList(evalLevelQuery);
        List<EvalReportDwSumPrint> baseInfoList = new ArrayList<EvalReportDwSumPrint>();
        StringBuffer sumStr = new StringBuffer();
        for (EvalLevel level : levelList) {
            EvalReportDwSumPrint print = new EvalReportDwSumPrint();
            print.setItemTitle("医德考评"+level.getName()+"人员名单:");
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("levelId", String.valueOf(level.getId()));
            map.put("periodId", String.valueOf(evalZq.getId()));
            map.put("status", String.valueOf(EvalFlowStatusEnum.KP_END.getValue()));
            List<EvalReportUserInfo> reportUserInfoList = evalReportDao.getReportUserInfo(map);
            StringBuffer itemDetail = new StringBuffer(100);
            if (reportUserInfoList != null) {
                sumStr.append(level.getName() + "人数 " + reportUserInfoList.size() + " 人;");
                for(EvalReportUserInfo userInfo:reportUserInfoList){
                    itemDetail.append(" "+userInfo.getUserName()+"("+userInfo.getKsName()+") ");
                }
            } else {
                sumStr.append(level.getName() + "人数 0 人;");
            }
            print.setItemDetail(itemDetail.toString());
            baseInfoList.add(print);
        }
        model.addAttribute("title",systemConfig.getCorpName()+"医德医风考评结果表");
        model.addAttribute("corpName", systemConfig.getCorpName());
        model.addAttribute("strDate", DateUtil.simpleFormatYmd(new Date()));
        model.addAttribute("zqName", evalZq.getName());
        model.addAttribute("realNum", evalZq.getRealNum().toString());
        model.addAttribute("quorum", evalZq.getQuorum().toString());
        model.addAttribute("numDetail", sumStr.toString());
        model.addAttribute("baseInfoList", baseInfoList);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(baseInfoList);
        // 动态指定报表模板url
        model.addAttribute("url", "/report/kphz.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);
        model.addAttribute("SUBREPORT_DIR", SysParam.getWebRootPath()+"report/");
        return "reportView"; // 对应jasper-views.xml中的bean id
    }


    @RequestMapping("reportDwPie.vm")
    @RequiresPermissions("reportDwPie:query")
    public String reportDwPie(HttpServletRequest request, HttpServletResponse response,
                           Model model) {
        EvalZq evalZq = new EvalZq();
        EvalZqQuery evalZqQuery = new EvalZqQuery();
        evalZqQuery.setStrOrder(" end_date desc");
        Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
        if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
            evalZq = pagination.getRows().get(0);
        }
        model.addAttribute("periodId", evalZq.getId());
        return path + "reportDwPie";
    }

    @RequestMapping("dwPieQuery.vm")
    @RequiresPermissions("reportDwPie:query")
    @ResponseBody
    public void dwPieQuery(HttpServletRequest request, HttpServletResponse response, Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportDwPie> list = new ArrayList<EvalReportDwPie>();
            makeQuery(query);
            query.setStatus(EvalFlowStatusEnum.KP_END.getValue());
            Pagination<EvalReportDwPie> pagination = evalReportService.getReportDwPieWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    @RequestMapping("reportDw.vm")
    @RequiresPermissions("reportDw:query")
    public String reportDw(HttpServletRequest request, HttpServletResponse response,
                           Model model) {
        EvalZq evalZq = new EvalZq();
        EvalZqQuery evalZqQuery = new EvalZqQuery();
        evalZqQuery.setStrOrder(" end_date desc");
        Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
        if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
            evalZq = pagination.getRows().get(0);
        }
        model.addAttribute("periodId", evalZq.getId());
        return path + "reportDw";
    }

    @RequestMapping("dwQuery.vm")
    @RequiresPermissions("reportDw:query")
    @ResponseBody
    public void dwQuery(HttpServletRequest request, HttpServletResponse response, Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportDw> list = new ArrayList<EvalReportDw>();
            makeQuery(query);
            Pagination<EvalReportDw> pagination = evalReportService.getReportDwWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    @RequestMapping("reportKs.vm")
    @RequiresPermissions("reportKs:query")
    public String reportKs(HttpServletRequest request, HttpServletResponse response,
                           Model model) {
        String zq = context.getRequest().getParameter("zq");
        String ksId = context.getRequest().getParameter("ksId");
        if(StringUtil.isNotEmptyEx(zq)){
            model.addAttribute("periodId",zq);
        }else{
            EvalZq evalZq = new EvalZq();
            EvalZqQuery evalZqQuery = new EvalZqQuery();
            evalZqQuery.setStrOrder(" end_date desc");
            Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
            if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
                evalZq = pagination.getRows().get(0);
            }
            model.addAttribute("periodId", evalZq.getId());
        }
        if(StringUtil.isNotEmptyEx(ksId)) {
            model.addAttribute("ksId", ksId);
        }
        return path + "reportKs";
    }

    @RequestMapping("ksQuery.vm")
    @RequiresPermissions("reportKs:query")
    @ResponseBody
    public void ksQuery(HttpServletRequest request, HttpServletResponse response, Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportDw> list = new ArrayList<EvalReportDw>();
            makeQuery(query);
            Pagination<EvalReportDw> pagination = evalReportService.getReportKsWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    @RequestMapping("reportUser.vm")
    @RequiresPermissions("reportUser:query")
    public String reportUser(HttpServletRequest request, HttpServletResponse response,
                             Model model, EvalReportDwQuery query) throws Exception {

        String zq = context.getRequest().getParameter("zq");
        String ksId = context.getRequest().getParameter("ksId");
        String userTypeId = context.getRequest().getParameter("userTypeId");
        if(StringUtil.isNotEmptyEx(zq)){
            model.addAttribute("periodId",zq);
        }else{
            EvalZq evalZq = new EvalZq();
            EvalZqQuery evalZqQuery = new EvalZqQuery();
            evalZqQuery.setStrOrder(" end_date desc");
            Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
            if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
                evalZq = pagination.getRows().get(0);
            }
            model.addAttribute("periodId", evalZq.getId());
        }
        if(StringUtil.isNotEmptyEx(ksId)) {
            model.addAttribute("ksId", ksId);
        }
        if(StringUtil.isNotEmptyEx(userTypeId)) {
            model.addAttribute("userTypeId", userTypeId);
        }
        return path + "reportUser";
    }

    @RequestMapping("userQuery.vm")
    @RequiresPermissions("reportUser:query")
    @ResponseBody
    public void userQuery(HttpServletRequest request, HttpServletResponse response,
                            Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportUser> list = new ArrayList<EvalReportUser>();
            makeQuery(query);
            Pagination<EvalReportUser> pagination = evalReportService.getReportUserWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    @RequestMapping("reportDwData.vm")
    @RequiresPermissions("reportDwData:query")
    public String reportDwData(HttpServletRequest request, HttpServletResponse response,
                               Model model) {
        String zq = context.getRequest().getParameter("zq");
        String ksId = context.getRequest().getParameter("ksId");
        if(StringUtil.isNotEmptyEx(zq)){
            model.addAttribute("periodId",zq);
        }else{
            EvalZq evalZq = new EvalZq();
            EvalZqQuery evalZqQuery = new EvalZqQuery();
            evalZqQuery.setStrOrder(" end_date desc");
            Pagination<EvalZq> pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
            if (pagination != null && pagination.getRows() != null && pagination.getRows().size() > 0) {
                evalZq = pagination.getRows().get(0);
            }
            model.addAttribute("periodId", evalZq.getId());
        }
        if(StringUtil.isNotEmptyEx(ksId)) {
            model.addAttribute("ksId", ksId);
        }
        return path + "reportDwData";
    }
    /******************************************************************用户信息****************************************************************************/
    @RequestMapping("userDataQuery.vm")
    @RequiresPermissions("reportDwData:query")
    @ResponseBody
    public void userDataQuery(HttpServletRequest request, HttpServletResponse response,
                          Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportUserData> list = new ArrayList<EvalReportUserData>();
            makeQuery(query);
            int itype = query.getType();
            if (itype <= 2) {
                query.setStatus(EvalFlowStatusEnum.KP_ME_SUBMIT.getValue());
            } else if (itype <= 4) {
                query.setStatus(EvalFlowStatusEnum.KP_KS_SUBMIT.getValue());
            } else if (itype <= 6) {
                query.setStatus(EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue());
            } else if (itype <= 8) {
                query.setStatus(EvalFlowStatusEnum.KP_END.getValue());
            }
            Pagination<EvalReportUserData> pagination = evalReportService.getReportUserDataWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    @RequestMapping("reportUserData.vm")
    @RequiresPermissions("reportDwData:query")
    public String reportUserData(HttpServletRequest request, HttpServletResponse response,
                               Model model) {
        String zq = context.getRequest().getParameter("zq");
        String ksId = context.getRequest().getParameter("ksId");
        String title = request.getParameter("title");
        String type = context.getRequest().getParameter("type");
        model.addAttribute("zq", zq);
        model.addAttribute("ksId", ksId);
        model.addAttribute("type", type);
        model.addAttribute("title", title);
        return path + "reportUserData";
    }

    @RequestMapping("dwDataQuery.vm")
    @RequiresPermissions("reportDwData:query")
    @ResponseBody
    public void dwDataQuery(HttpServletRequest request, HttpServletResponse response,
                            Model model, EvalReportDwQuery query) {
        try {
            List<EvalReportDwData> list = new ArrayList<EvalReportDwData>();
            makeQuery(query);
            Pagination<EvalReportDwData> pagination = evalReportService.getReportDwDataWithPage(query);
            if (pagination != null && pagination.getRows() != null) {
                list.addAll(pagination.getRows());
                setTotal(pagination.getTotal());
                context.getResponseParams().put("rows", list);
            }else{
                setTotal(0);
                context.getResponseParams().put("rows",list);
            }
            setResult(true, "获取数据成功");
        } catch (Exception e) {
            CocoLogger.error("加载数据失败", e);
            returnErrorMsg("code", "获取数据失败");
            return ;
        }
    }

    public  void  makeQuery(EvalReportDwQuery query) throws Exception {
        MapBeanUtil.map2PO(context.getRequestParams(), query);
        int page = 0;
        int rows = 0;
        if (context.getRequestParams().containsKey("page")) {
            page = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("page"));
        } else {
            page = context.getPageEntity().getPage();
        }
        if (context.getRequestParams().containsKey("rows")) {
            rows = Integer.parseInt(context.getRequestParams().getStrIgnoreNull("rows"));
        } else {
            rows = context.getPageEntity().getRows();
        }
        query.setPageNo(page);
        query.setPageSize(rows);

        	 /*查询管理权限部门*/
        String adminDept = context.getActiveUser().getUser().getAdminDeptId();
        List<Dept> deptBeans = new ArrayList<Dept>();
        DeptQuery deptQuery = new DeptQuery();
        deptQuery.setPageSize(999);
        if (UtilPub.isNotEmpty(adminDept)) {
            deptBeans = deptService.getDeptByKeys(Arrays.asList(adminDept.split(CoreConsts.MORE_STRING)));
        }
        List<String> levelCodes = new ArrayList<String>();
        for (Dept deptBean : deptBeans) {
            levelCodes.add(deptBean.getLevelCode());
        }
        deptQuery.set_levelCodes(levelCodes);
        deptQuery.setPageNo(page);
        Pagination<Dept> deptPagination = deptService.getDeptWithPage(deptQuery);
        List<String> ksList = new ArrayList<String>();
        if (deptPagination != null && deptPagination.getPageSize() > 0) {
            for (Dept dept : deptPagination.getRows()) {
                ksList.add(String.valueOf(dept.getId()));
            }
        }
        query.setKsList(ksList);
        context.getResponseParams().put("pageNumber", page);
        query.setPageNo(page);
    }

    @RequestMapping("export.vm")
    @RequiresPermissions("evalZq:query")
    public void export(Model model, EvalZq evalZq, EvalReportDwQuery query) {
        try {
           String  exportType =  context.getRequestParams().getStrIgnoreNull("exportType");
            if(exportType.equals("dwPie")){
                List<EvalReportDwPie> list = new ArrayList<EvalReportDwPie>();
                makeQuery(query);
                query.setStatus(EvalFlowStatusEnum.KP_END.getValue());
                Pagination<EvalReportDwPie> pagination = evalReportService.getReportDwPieWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
            }else if(exportType.equals("dw")){
                List<EvalReportDw> list = new ArrayList<EvalReportDw>();
                makeQuery(query);
                Pagination<EvalReportDw> pagination = evalReportService.getReportDwWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
                PageMap map = context.getRequestParams();
                UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
            }else if(exportType.equals("ks")){
                List<EvalReportDw> list = new ArrayList<EvalReportDw>();
                makeQuery(query);
                Pagination<EvalReportDw> pagination = evalReportService.getReportKsWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
                PageMap map = context.getRequestParams();
                UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
            }else if(exportType.equals("user")){
                List<EvalReportUser> list = new ArrayList<EvalReportUser>();
                makeQuery(query);
                Pagination<EvalReportUser> pagination = evalReportService.getReportUserWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
                PageMap map = context.getRequestParams();
                UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
            }else if(exportType.equals("dwData")){
                List<EvalReportDwData> list = new ArrayList<EvalReportDwData>();
                makeQuery(query);
                Pagination<EvalReportDwData> pagination = evalReportService.getReportDwDataWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
                PageMap map = context.getRequestParams();
                UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
            }else if(exportType.equals("userData")){
                List<EvalReportUserData> list = new ArrayList<EvalReportUserData>();
                makeQuery(query);
                int itype = query.getType();
                if (itype <= 2) {
                    query.setStatus(EvalFlowStatusEnum.KP_ME_SUBMIT.getValue());
                } else if (itype <= 4) {
                    query.setStatus(EvalFlowStatusEnum.KP_KS_SUBMIT.getValue());
                } else if (itype <= 6) {
                    query.setStatus(EvalFlowStatusEnum.KP_DKS_SUBMIT.getValue());
                } else if (itype <= 8) {
                    query.setStatus(EvalFlowStatusEnum.KP_END.getValue());
                }
                Pagination<EvalReportUserData> pagination = evalReportService.getReportUserDataWithPage(query);
                if (pagination != null && pagination.getRows() != null) {
                    list.addAll(pagination.getRows());
                    setTotal(pagination.getTotal());
                    context.getResponseParams().put("rows", list);
                }else{
                    setTotal(0);
                    context.getResponseParams().put("rows",list);
                }
                PageMap map = context.getRequestParams();
                UtilExport.exportToExcel(context.getResponse(), MapUtils.toList(list,null,null), map.getStr("model"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
