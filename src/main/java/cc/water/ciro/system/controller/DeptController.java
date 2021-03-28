package cc.water.ciro.system.controller;

import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.page.Pagination;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.enums.BooleanEnum;
import cc.water.ciro.enums.StateEnum;
import cc.water.ciro.system.domain.Dept;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.PermissionService;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/admin/dept/")
public class DeptController extends ListController<Dept> {

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private DeptService deptService;
    @Autowired
    private UserService userService;
    final static String path = "sys/base/dept/";

    @RequestMapping("list.vm")
    @RequiresPermissions("dept:query")
    public String goListView(HttpServletRequest request, HttpServletResponse response,
                             Model model) {
        return path + "listDept";
    }

    @RequestMapping("data.vm")
    @RequiresPermissions("dept:query")
    @ResponseBody
    public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.data();
    }

    protected void loadData(final List<Dept> list, int total) throws Exception {
        DeptQuery deptQuery = new DeptQuery();
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
        deptQuery.setPageNo(page);
        deptQuery.setPageSize(rows);
        context.getResponseParams().put("pageNumber", page);
        deptQuery.setCode(context.getRequestParams().getStrIgnoreNull("code"));
        deptQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
        deptQuery.setId(Long.valueOf(context.getRequestParams().getStrIgnoreNull("dept")));
        deptQuery.setStatus(context.getRequestParams().getStrIgnoreNull("status"));
        deptQuery.setOneDeptSelect(context.getRequestParams().getStrIgnoreNull("oneDeptSelect"));
        List<Dept> deptBeans = new ArrayList<Dept>();
        String adminDept = context.getActiveUser().getUser().getAdminDeptId();
        if (UtilPub.isNotEmpty(adminDept)) {
            deptBeans = deptService
                    .getDeptByKeys(Arrays.asList(adminDept.split(CoreConsts.MORE_STRING)));
        }
        List<String> levelCodes = new ArrayList<String>();
        for (Dept deptBean : deptBeans) {
            levelCodes.add(deptBean.getLevelCode());
        }
        deptQuery.set_levelCodes(levelCodes);
        deptQuery.setPageNo(page);
        Pagination pagination = deptService.getDeptWithPage(deptQuery);
        if (pagination != null && pagination.getRows() != null) {
            list.addAll(pagination.getRows());
            setTotal(pagination.getTotal());
        }
    }

    @RequestMapping("card.vm")
    @RequiresPermissions("dept:edit")
    public String goEditView(Model model) {
        String deptId = context.getRequest().getParameter("id");
        Dept dept = new Dept();
        if (StringUtil.isNotEmpty(deptId) && StringUtil.isNumeric(deptId)) {
            dept = deptService.getDeptByKey(NumberUtil.parseLong(deptId));
        } else {
            dept.setStatus(StateEnum.NORMAL.getCode());
        }
        model.addAttribute("dept", JSONObject.toJSONString(dept));
        return path + "cardDept";
    }

    @RequestMapping("save.vm")
    @RequiresPermissions("dept:edit")
    @ResponseBody
    public void save(Model model, Dept dept) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), dept);
            if (dept.getId() > 0) {
                if (StringUtil.isNotEmptyEx(dept.getParentId()) && dept.getId() == 1) {
                    returnErrorMsg("code", "顶级部门的上级部门请保持为空！");
                    return;
                }
                if (StringUtil.isEmptyEx(dept.getParentId()) && dept.getId() != 1) {
                    returnErrorMsg("code", "已存在顶级部门，上级部门不能为空！");
                    return;
                }
                if (StringUtil.isEmpty(dept.getParentId())) dept.setParentId("0");
                if (dept.getStatus().equals(StateEnum.DISABLE.getCode())) {
                    UserQuery userQuery = new UserQuery();
                    userQuery.setDeptId(dept.getId());
                    int pcnt = userService.findListNum(userQuery);
                    if (pcnt > 0) {
                        returnErrorMsg("code", "部门存在人员，不能停用！");
                        return;
                    }
                }
                if (StringUtil.isNotEmptyEx(dept.getParentId())) {
                    Dept parentDept = deptService.getDeptByKey(NumberUtil.parseLong(dept.getParentId()));
                    dept.setLevelNum(parentDept.getLevelNum() + 1);
                    dept.setLevelCode(parentDept.getLevelCode() + CoreConsts.NULL_STRING + dept.getId());
                }
                dept.setMender(context.getActiveUser().getUserid());
                deptService.updateDeptByKey(dept);
                setBean(dept);
                setResult(true, "角色修改成功");
            } else {
                if (StringUtil.isEmptyEx(dept.getParentId())) {
                    returnErrorMsg("code", "已存在顶级部门，上级部门不能为空！");
                    return;
                }
                dept.setCreater(context.getActiveUser().getUserid());
                dept.setCreateDate(new Date());
                Dept parentDept = deptService.getDeptByKey(NumberUtil.parseLong(dept.getParentId()));
                dept.setLevelNum(parentDept.getLevelNum() + 1);
                dept.setLevelCode(parentDept.getLevelCode() + CoreConsts.NULL_STRING);
                deptService.addDept(dept);
                dept.setLevelCode(parentDept.getLevelCode() + CoreConsts.NULL_STRING+ dept.getId());
                deptService.updateDeptByKey(dept);
                setBean(dept);
                setResult(true, "角色新增成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("del.vm")
    @RequiresPermissions("dept:del")
    @ResponseBody
    public void doDelete(Long id) {
        try {
            if (id == 1) {
                returnErrorMsg("code", "顶级部门，不能删除！");
                return;
            }
            UserQuery userQuery = new UserQuery();
            userQuery.setDeptId(id);
            userQuery.setOneDeptSelect("0");
            userQuery.setLevelCodeSeparator(CoreConsts.LEVELCODE_SEPARATOR);
            int pcnt = userService.findListNum(userQuery);
            if (pcnt > 0) {
                returnErrorMsg("code", "部门存在人员，不能删除！");
                return;
            }
            deptService.deleteByKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "删除成功");
    }


    @RequestMapping("export.vm")
    @RequiresPermissions("dept:query")
    public void export(Model model, Dept dept) {
        try {
            super.export();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
