package cc.water.ciro.eval.controller;

import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.PageMap;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.eval.domain.EvalZq;
import cc.water.ciro.eval.enums.EvalFlowStatusEnum;
import cc.water.ciro.eval.enums.EvalZqStatusEnum;
import cc.water.ciro.eval.query.EvalBaseInfoQuery;
import cc.water.ciro.eval.query.EvalZqQuery;
import cc.water.ciro.eval.service.EvalBaseInfoService;
import cc.water.ciro.eval.service.EvalZqService;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/eval/evalZq/")
public class EvalZqController extends ListController<EvalZq> {

    @Autowired
    private UserService userService;
    @Autowired
    private EvalZqService evalZqService;
    @Autowired
    private EvalBaseInfoService evalBaseInfoService;
    final static String path = "eval/evalZq/";

    @RequestMapping("list.vm")
    @RequiresPermissions("evalZq:query")
    public String goListView(HttpServletRequest request, HttpServletResponse response,
                             Model model) {
        String status = request.getParameter("status");
        if (StringUtil.isEmpty(status)) {
            status = context.getRequestParams().getStrIgnoreNull("status");
        }
        model.addAttribute("status", status);
        return path + "listEvalZq";
    }

    @RequestMapping("data.vm")
    @RequiresPermissions("evalZq:query")
    @ResponseBody
    public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.data();
    }

    protected void loadData(final List<EvalZq> list, int total) throws Exception {
        EvalZqQuery evalZqQuery = new EvalZqQuery();
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
        evalZqQuery.setPageNo(page);
        evalZqQuery.setPageSize(rows);
        context.getResponseParams().put("pageNumber", page);
        evalZqQuery.setStatus(context.getRequestParams().getStrIgnoreNull("status"));
        evalZqQuery.setCode(context.getRequestParams().getStrIgnoreNull("typeCode"));
        evalZqQuery.setName(context.getRequestParams().getStrIgnoreNull("typeName"));
        evalZqQuery.setPageNo(page);
        Pagination pagination = evalZqService.getEvalZqWithPage(evalZqQuery);
        if (pagination != null && pagination.getRows() != null) {
            list.addAll(pagination.getRows());
            setTotal(pagination.getTotal());
        }
    }

    @RequestMapping("card.vm")
    @RequiresPermissions("evalZq:edit")
    public String goEditView(Model model) {
        String evalZqId = context.getRequest().getParameter("id");
        EvalZq evalZq = new EvalZq();
        if (StringUtil.isNotEmpty(evalZqId) && StringUtil.isNumeric(evalZqId)) {
            evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(evalZqId));
        }
        model.addAttribute("dataBean", JSONObject.toJSONString(evalZq));
        return path + "cardEvalZq";
    }

    @RequestMapping("save.vm")
    @RequiresPermissions("evalZq:edit")
    @ResponseBody
    public void save(Model model, EvalZq evalZq) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), evalZq);
            if (evalZq.getId() > 0) {
                evalZq.setMender(context.getActiveUser().getUserid());
                evalZqService.updateEvalZqByKey(evalZq);
                setBean(evalZq);
                setResult(true, "考评期间修改成功");
            } else {
                evalZq.setCreater(context.getActiveUser().getUserid());
                evalZq.setCreateDate(new Date());
                evalZq.setStatus(EvalZqStatusEnum.START.getCode());
                evalZq.setQuorum(0);
                evalZq.setRealNum(0);
                evalZqService.addEvalZq(evalZq);
                setBean(evalZq);
                setResult(true, "考评期间新增成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("del.vm")
    @RequiresPermissions("evalZq:del")
    @ResponseBody
    public void doDelete(Long id) {
        try {
            UserQuery userQuery = new UserQuery();
            userQuery.setEvalType(id);
            int useCount = userService.findListNum(userQuery);
            if (useCount > 0) {
                returnErrorMsg("code", "考评期间已被人员使用，请勿删除");
                return;
            }
            evalZqService.deleteEvalZqByKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "删除成功");
    }

    @RequestMapping("custom.vm")
    @RequiresPermissions("evalZq:edit")
    @ResponseBody
    public void custom() {
        try {
            PageMap map = context.getRequestParams();
            String actionType = map.getStrIgnoreNull("actionType");
            String id = map.getStrIgnoreNull("id");
            if (StringUtil.isEmptyEx(id) || !StringUtil.isNumeric(id)) {
                returnErrorMsg("code", "周期不存在！");
                return;
            }
           /*周期结束成功*/
            if (actionType != null && actionType.equals("end")) {
                EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(id));
                EvalBaseInfoQuery evalBaseInfoQuery =  new  EvalBaseInfoQuery();
                evalBaseInfoQuery.setPeriodId(id);
                evalBaseInfoQuery.setStatus(String.valueOf(EvalFlowStatusEnum.KP_END.getValue()));
                int real_num =  evalBaseInfoService.getEvalBaseInfoCount(evalBaseInfoQuery);
                UserQuery userQuery = new UserQuery();
                userQuery.setToEval(BooleanEnum.YES.getCode());
                userQuery.setEvalTypes(evalZq.getUserType());
                int quorum = userService.findListNum(userQuery);
                evalZq.setRealNum(real_num);
                evalZq.setQuorum(quorum);
                evalZq.setStatus(EvalZqStatusEnum.END.getCode());
                evalZqService.updateEvalZqByKey(evalZq);
                setResult(true, "周期结束成功");
            } else if (actionType != null && actionType.equals("start")) {
                EvalZq evalZq = evalZqService.getEvalZqByKey(NumberUtil.parseLong(id));
                evalZq.setStatus(EvalZqStatusEnum.START.getCode());
                evalZqService.updateEvalZqByKey(evalZq);
                setResult(true, "周期开启成功");
            }
        } catch (Exception e) {
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }


    @RequestMapping("export.vm")
    @RequiresPermissions("evalZq:query")
    public void export(Model model, EvalZq evalZq) {
        try {
            super.export();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
