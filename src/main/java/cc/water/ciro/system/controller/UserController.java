package cc.water.ciro.system.controller;

import cc.water.ciro.common.base.CommonHelper;
import cc.water.ciro.common.consts.CoreConsts;
import cc.water.ciro.common.controller.ListController;
import cc.water.ciro.common.util.MapBeanUtil;
import cc.water.ciro.common.util.StringUtil;
import cc.water.ciro.common.utils.NumberUtil;
import cc.water.ciro.common.utils.UtilPub;
import cc.water.ciro.enums.PrivEnum;
import cc.water.ciro.enums.StateEnum;
import cc.water.ciro.system.domain.Role;
import cc.water.ciro.system.domain.User;
import cc.water.ciro.system.enums.ParamInitEnum;
import cc.water.ciro.system.query.DeptQuery;
import cc.water.ciro.system.query.UserQuery;
import cc.water.ciro.system.service.DeptService;
import cc.water.ciro.system.service.ParamService;
import cc.water.ciro.system.service.RoleService;
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
import java.util.*;

@Controller
@RequestMapping("/admin/user/")
public class UserController extends ListController<User> {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    protected CommonHelper commonHelper;
    @Autowired
    private ParamService paramService;
    @Autowired
    protected DeptService deptService;
    final static String path = "sys/base/user/";

    @RequestMapping("list.vm")
    @RequiresPermissions("user:query")
    public String goListView(HttpServletRequest request, HttpServletResponse response,
                             Model model) {
        return path + "listUser";
    }

    @RequestMapping("data.vm")
    @RequiresPermissions("user:query")
    @ResponseBody
    public void data(HttpServletRequest request, HttpServletResponse response, Model model) {
        super.data();
    }

    protected void loadData(final List<User> list, int total) throws Exception {
        UserQuery userQuery = new UserQuery();
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
        String sort = context.getPageEntity().getSort();
        if (UtilPub.isNotEmpty(sort) && sort.equals("deptName")) {
            sort = "T.name";
        } else if (UtilPub.isNotEmpty(sort)) {
            sort = "U." + sort;
        }
        userQuery.setPageNo(page);
        userQuery.setPageSize(rows);
        String order = context.getPageEntity().getOrder();
        context.getResponseParams().put("pageNumber", page);
        userQuery.setUsername(context.getRequestParams().getStrIgnoreNull("code"));
        userQuery.setDeptId(context.getRequestParams().getInt("dept"));
        userQuery.setState(context.getRequestParams().getStrIgnoreNull("state"));
        userQuery.setOneDeptSelect(context.getRequestParams().getStrIgnoreNull("oneDeptSelect"));
        userQuery.setLevelCodeSeparator(CoreConsts.LEVELCODE_SEPARATOR);
        userQuery.setName(context.getRequestParams().getStrIgnoreNull("name"));
        userQuery.setDeptName(context.getRequestParams().getStrIgnoreNull("deptName"));
        User user = context.getActiveUser().getUser();
        List<Role> roles = user.getRoleList();
        int dataLevelMax = PrivEnum.user.getValue();
        for (Role role : roles) {
            int roleLevelValue = NumberUtil.parseInt(role.getDataLevel());
            if (roleLevelValue > dataLevelMax)
                dataLevelMax = roleLevelValue;
        }
        /*获取可操作科室ID*/
        List<Long> deptIdList = new ArrayList<Long>();
        DeptQuery deptQuery = new DeptQuery();
        if (!StringUtil.isEmpty(user.getAdminDeptId())) {
            deptIdList = deptService
                    .findMyDeptList(Arrays.asList(user.getAdminDeptId().split(",")));
        }
        boolean isSelf = dataLevelMax == PrivEnum.user.getValue();
        if (isSelf) {
            userQuery.setId(user.getId());
        }
        if (!deptIdList.isEmpty()) {
            userQuery.setDeptIds(deptIdList);
        }
        String strOrder = parseSort(sort, order);
        userQuery.setStrOrder(strOrder);
        userQuery.setPageNo(page);
        List<User> userList = userService.findList(userQuery);
        list.addAll(userList);
        total = userService.findListNum(userQuery);
        setTotal(total);
    }

    @RequestMapping("card.vm")
    @RequiresPermissions("user:edit")
    public String goEditView(Model model) {
        String userId = context.getRequest().getParameter("id");
        String deptId = context.getRequestParams().getStrIgnoreNull("dept");
        User user = new User();
        if (StringUtil.isNotEmpty(userId) && StringUtil.isNumeric(userId)) {
            user = userService.getUserByKey(NumberUtil.parseLong(userId));
        } else {
            boolean isLeaf = deptService.isLeaf(NumberUtil.parseLong(deptId));
            if (isLeaf) {
                user.setDeptId(NumberUtil.parseLong(deptId));
                user.setAdminDeptId(deptId);
            }
            user.setState(StateEnum.NORMAL.getCode());
        }
        model.addAttribute("user", JSONObject.toJSONString(user));
        return path + "cardUser";
    }

    @RequestMapping("save.vm")
    @RequiresPermissions("user:edit")
    @ResponseBody
    public void save(Model model, User user) {
        try {
            MapBeanUtil.map2PO(context.getRequestParams(), user);
            if (user.getId() != null && user.getId() > 0) {
                user.setMender(context.getActiveUser().getUserid());
                userService.updateUserByKey(user);
                setBean(user);
                setResult(true, "用户修改成功");
            } else {
                user.setCreater(context.getActiveUser().getUserid());
                user.setCreateDate(new Date());
                user.setErrorCount(0);
                user.setSkin("bootstrap");
                userService.addUser(user);
                setBean(user);
                setResult(true, "用户新增成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("del.vm")
    @RequiresPermissions("user:del")
    @ResponseBody
    public void doDelete(Long id) {
        try {
            id = Long.valueOf(context.getRequest().getParameter("id"));
            userService.deleteByKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
        setResult(true, "删除成功");
    }

    @RequestMapping("custom.vm")
    @ResponseBody
    protected void custom() throws Exception {
        try {
            String actionType = context.getRequest().getParameter("actionType");
			/*设置角色*/
            if (actionType.equals("roleGrant")) {
                String roleIds = context.getRequestParams().getStrIgnoreNull("roleIds");
                String userId = context.getRequestParams().getStrIgnoreNull("userId");
                userService.updateUserRole(NumberUtil.parseLong(userId), roleIds);
                setResult(true, "设置角色成功");
            } else if (actionType.equals("pwdDef")) { /*重置初始化密码*/
                String userId = context.getRequestParams().getStrIgnoreNull("userId");
                userService.resetPassword(NumberUtil.parseLong(userId));
                setResult(true, "重置初始化密码成功");
            } else if (actionType.equals("setSkin")) { /*选择皮肤*/
                String skin = context.getRequestParams().getStrIgnoreNull("skin");
                if(StringUtil.isEmpty(skin))  setResult(false, "选择皮肤失败");
                User userSession = context.getActiveUser().getUser();
                userSession.setSkin(skin);
                User user =  userService.getUserByKey(userSession.getId());
                user.setSkin(skin);
                userService.updateUser(user);
                setResult(true, "设置皮肤成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnErrorMsg("code", e.getMessage());
            return;
        }
    }

    @RequestMapping("export.vm")
    @RequiresPermissions("user:query")
    public void export(Model model, User user) {
        try {
            super.export();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
