<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>日常医德行为加分标准</title>
<script type="text/javascript" src="/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="/jsp/eval/evalStd/listEvalStd.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <c:choose>
            <c:when test="${status==0}">
                <shiro:hasPermission name="evalStd:edit0">
                    <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:edit0">
                    <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:del0">
                    <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:del0">
                    <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:query0">
                    <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
                       onclick="page.query()">查询
                    </a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:edit0">
                    <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
                       onclick="page.cardEx()">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:query0">
                    <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
                       onclick="page.exportExcel()">导出
                    </a>
                </shiro:hasPermission>
            </c:when>
            <c:when test="${status==1}">
                <shiro:hasPermission name="evalStd:edit1">
                    <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:edit1">
                    <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:del1">
                    <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:del1">
                    <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:query1">
                <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
                   onclick="page.query()">查询
                </a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:edit1">
                    <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
                       onclick="page.cardEx()">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:query1">
                <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
                   onclick="page.exportExcel()">导出
                </a>
                </shiro:hasPermission>
            </c:when>
            <c:when test="${status==2}">
                <shiro:hasPermission name="evalStd:edit2">
                    <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:edit2">
                    <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:del2">
                    <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
                </shiro:hasPermission>
                <shiro:lacksPermission name="evalStd:del2">
                    <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
                </shiro:lacksPermission>

                <shiro:hasPermission name="evalStd:query2">
                    <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
                       onclick="page.query()">查询
                    </a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:edit2">
                    <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
                       onclick="page.cardEx()">新增</a>
                </shiro:hasPermission>
                <shiro:hasPermission name="evalStd:query2">
                    <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
                       onclick="page.exportExcel()">导出
                    </a>
                </shiro:hasPermission>
            </c:when>
        </c:choose>

    </div>
</div>
<div region="center" border="false">
    <div id="center-div" class="easyui-layout" fit="true">
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 93px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <tbody>
                <input type="hidden" id="status" name="status" value="${status}">
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
                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>状态:</td>
                    <td nowrap class='coco_txt' align='left' style='width:20%'>
                        <input type="text" id="eventType" name="eventType" class="easyui-validatebox coco_input"
                               value="">
                </tr>
                </tbody>
            </table>
        </div>
        <div region="center" border="false">

            <table id="tbList"></table>

        </div>
    </div>
</div>
</body>
<script type="text/javascript">
    var isDw = $("#status").val()==2;
    var title = "日常医德行为标准";
    if(isDw) {
        title = "一票认定较差标准";
    }
    var pageParam = $.extend({
        title: title,
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>