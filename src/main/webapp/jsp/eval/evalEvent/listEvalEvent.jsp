<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评加减分档案</title>
<script type="text/javascript" src="/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="/jsp/eval/evalEvent/listEvalEvent.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
<c:choose>
    <c:when test="${status=='ks'}">
        <shiro:hasPermission name="evalEvent:edit_ks">
            <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:edit_ks">
            <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
        </shiro:lacksPermission>

        <shiro:hasPermission name="evalEvent:del_ks">
            <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:del_ks">
            <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
        </shiro:lacksPermission>
        <shiro:hasPermission name="evalEvent:query_ks">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
           onclick="page.query()">查询
        </a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:edit_ks">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.cardEx()">新增</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:query_ks">
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
           onclick="page.exportExcel()">导出
        </a>
        </shiro:hasPermission>
    </c:when>
    <c:when test="${status=='dk'}">
        <shiro:hasPermission name="evalEvent:edit_dk">
            <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:edit_dk">
            <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
        </shiro:lacksPermission>

        <shiro:hasPermission name="evalEvent:del_dk">
            <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:del_dk">
            <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
        </shiro:lacksPermission>
        <shiro:hasPermission name="evalEvent:query_dk">
            <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
               onclick="page.query()">查询
            </a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:edit_dk">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.cardEx()">新增</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:query_dk">
            <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
               onclick="page.exportExcel()">导出
            </a>
        </shiro:hasPermission>
    </c:when>
    <c:when test="${status=='dw'}">
        <shiro:hasPermission name="evalEvent:edit_dw">
            <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:edit_dw">
            <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
        </shiro:lacksPermission>

        <shiro:hasPermission name="evalEvent:del_dw">
            <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalEvent:del_dw">
            <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
        </shiro:lacksPermission>
        <shiro:hasPermission name="evalEvent:query_dw">
            <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
               onclick="page.query()">查询
            </a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:edit_dw">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.cardEx()">新增</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="evalEvent:query_dw">
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
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 88px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <tbody>
                <input type="hidden" id="status" name="status" value="${status}">
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>科室:</td>
                    <td style='width:40%' nowrap class='vp_txt' align='left'>
                        <input id="ksId" name="ksId" class="easyui-validatebox vp_input"
                               value="" />
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>人员:</td>
                    <td nowrap class='vp_txt' align='left'>
                        <input type="text" id="userId" name="userId" class="vp_input"
                               value=""/>
                    </td>
                </tr>
                <tr class="p_tr">

                    <td nowrap class='p_td_lbl' align='right'>查询时间：</td>
                    <td nowrap class='vp_txt' style="white-space: nowrap">
                        <input type="hidden" id="eventDate" name="eventDate" class="vp_input"
                               value=""/>
                    </td>
                    <td nowrap class='p_td_lbl' align='right' style='width:10%'>事件分类:</td>
                    <td style='width:40%' nowrap class='vp_txt' align='left'>
                        <input type="text" id="typeId" name="typeId" class="vp_input"
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
</body>
<script type="text/javascript">
    var pageParam = $.extend({
        title: "考评加减分档案",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>