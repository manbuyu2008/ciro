<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>菜单管理</title>
<script type="text/javascript" src="/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="/jsp/sys/base/menu/listMenu.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
           onclick="page.query()">查询
        </a>
        <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
           onclick="page.card()">新增</a>
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
           onclick="page.exportExcel()">导出
        </a>

    </div>
</div>
<div region="center" border="false">
    <div id="center-div" class="easyui-layout" fit="true">
        <div region="center" border="false">
            <div id="layout" class="easyui-layout" data-options="fit:true">
                <div id="leftDiv" title="菜单预览" data-options="region:'west',split:true,border:true,tools:'#tt'"
                     style="width:200px">
                    <%--菜单树，动态创建--%>
                    <ul id="menuTree" class="easyui-tree" animate="false"></ul>
                </div>
                <div id="tt">
                    <input id="oneMenu" type="checkbox" value="仅本级"
                           onclick="page.oneMenu(this.checked)" />
                    <label for="oneMenu" style="vertical-align:middle;">仅本级</label>
                    <a class="layout-button-left" href="javascript:void(0)" onclick="collapse()"></a>
                </div>
                <div data-options="region:'center',border:false">
                    <div id="center-right-div" class="easyui-layout" fit="true">
                        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 95px;"
                             collapsible="true" collapsed="${useCollapsed}">
                            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                                <tbody>
                                <input type="hidden" id="menu" name="menu" value="">
                                <input type="hidden" id="oneMenuSelect" name="oneMenuSelect" value="0">
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
                                <tr class="p_tr">
                                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>菜单级别:</td>
                                    <td nowrap class='coco_txt' align='left' style='width:20%'>
                                        <input id="status" name="status" class="coco_input" value=""/>
                                    </td>
                                    <td nowrap class='p_td_lbl' align='right' style='width:10%'></td>
                                    <td nowrap class='coco_txt' align='left' style='width:20%'>
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
            </div>
        </div>
    </div>

</div>
</body>
<script type="text/javascript">
    var pageParam = $.extend({
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>