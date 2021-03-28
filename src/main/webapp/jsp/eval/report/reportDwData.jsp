<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>是否考评考评分析</title>
<script type="text/javascript" src="/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="/resources/js/themes/index/indexLook.js"></script>
<script type="text/javascript" src="/jsp/eval/report/reportDwData.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <shiro:hasPermission name="reportDwData:query">
            <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
               onclick="page.query()">查询
            </a>
            <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
               onclick="page.exportExcel()">导出
            </a>
        </shiro:hasPermission>
    </div>
</div>
<div region="center" border="false">
    <div id="center-div" class="easyui-layout" fit="true">
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 60px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <input type="hidden" id="exportType" name="exportType"  value="dwData">
                <tbody>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">科室：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="ksId" name="ksId" class="coco_input" value="${ksId}">
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>考评期间：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="periodId" name="periodId" class="coco_input"  value="${periodId}">
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
        title: "是否考评考评分析",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>