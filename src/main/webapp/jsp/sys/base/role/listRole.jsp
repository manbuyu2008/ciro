<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>角色管理</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/base/role/listRole.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">

        <shiro:hasPermission name="role:edit">
            <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="role:edit">
            <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
        </shiro:lacksPermission>

        <shiro:hasPermission name="role:del">
            <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="role:del">
            <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
        </shiro:lacksPermission>
        <shiro:hasPermission name="role:grant">
            <input id="permissionGrant" name="permissionGrant" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="role:grant">
            <input id="permissionGrant" name="permissionGrant" value="0" type="hidden"/>
        </shiro:lacksPermission>


        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
           onclick="page.query()">查询
        </a>
        <shiro:hasPermission name="role:edit">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.card()">新增</a>
        </shiro:hasPermission>
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
           onclick="page.exportExcel()">导出
        </a>
    </div>
</div>
<div region="center" border="false">
    <div id="center-div" class="easyui-layout" fit="true">
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 65px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <tbody>
                <input type="hidden" id="roleId" name="roleId" value="">
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>编码:</td>
                    <td nowrap class='coco_txt' align='left' style='width:20%'>
                        <input type="text" id="code" name="code" class="easyui-validatebox coco_input"
                               value="">
                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>名称:</td>
                    <td nowrap class='coco_txt' align='left' style='width:20%'>
                        <input id="name" name="name" class="easyui-validatebox coco_input"
                               value=""/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div region="center" border="false">

            <table id="tbList"></table>

        </div>
    </div>
</div>
<div id="role_dialog" style="padding:5px; width:550px;height:500px; ">
    <div id="treeDiv" title="权限授权">
        <%--菜单树，动态创建--%>
        <ul id="menuTree" class="easyui-tree" animate="false"></ul>
    </div>
</div>
</body>
<script type="text/javascript">
    var roleType = 2;      /*角色*/
    var pageParam = $.extend({
        title: "角色管理",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>