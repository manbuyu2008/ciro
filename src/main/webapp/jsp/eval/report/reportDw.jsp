<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>单位考评统计表</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/index/indexLook.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/report/reportDw.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <shiro:hasPermission name="reportDw:query">
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
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 128px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <input type="hidden" id="exportType" name="exportType"  value="dw">
                <tbody>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">科室：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="ksId" name="ksId" class="coco_input">
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>考评期间：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="periodId" name="periodId" class="coco_input"  value="${periodId}">
                    </td>
                </tr>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">人员类型：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="userTypeId" name="userTypeId" class="coco_input">
                    </td>
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">职称：</td>
                    <td nowrap class='coco_txt'>
                        <input type="text" id="zc" name="zc" class="coco_input" style="width:40%">
                    </td>

                </tr>
                </tbody>
                <tbody id="forMore">
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">性别：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="sex" name="sex" class="coco_input">
                    </td>
                    <td nowrap class='p_td_lbl' align='right' style="width:10%">年龄范围：</td>
                    <td nowrap class='coco_txt' style="width:40%">
                        <input type="text" id="nlStart" name="nlStart" class="easyui-numberbox">&nbsp;至&nbsp;
                        <input type="text" id="nlEnd" name="nlEnd" class="easyui-numberbox">
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
        title: "单位考评统计列表",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>
</html>