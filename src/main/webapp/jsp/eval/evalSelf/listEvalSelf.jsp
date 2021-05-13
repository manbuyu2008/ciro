<%@ page import="cc.water.ciro.eval.enums.EvalFlowStatusEnum" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>自我考评</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalSelf/listEvalSelf.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">

        <shiro:hasPermission name="evalSelf:edit">
            <input id="permissionEdit" name="permissionEdit" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalSelf:edit">
            <input id="permissionEdit" name="permissionEdit" value="0" type="hidden"/>
        </shiro:lacksPermission>

        <shiro:hasPermission name="evalSelf:edit">
            <input id="permissionDel" name="permissionDel" value="1" type="hidden"/>
        </shiro:hasPermission>
        <shiro:lacksPermission name="evalSelf:edit">
            <input id="permissionDel" name="permissionDel" value="0" type="hidden"/>
        </shiro:lacksPermission>


        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
           onclick="page.query()">查询
        </a>
        <shiro:hasPermission name="evalSelf:edit">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.autoCreate()">新增</a>
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
<input type="hidden" id="listType" name="listType" value="self"/>
<table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
    <tbody>
    <tr class="p_tr">
        <td nowrap class='p_td_lbl' align='right' style='width:10%'>周期:</td>
        <td style='width:40%' nowrap class='vp_txt' align='left'>
            <input type="text" id="periodId" name="periodId" class="vp_input_100" value=""/>
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
<!--提交确认窗口-->
<div style="display: none;">
    <div id="choosePeriod" style="overflow: hidden;">
        <br>
        选择考评期间：<input id="zq" name="zq" editable="false" class="vp_input" value=""/>
    </div>
</div>
<%--<div id="m_test" >--%>
    <%--<table id="tb_test"></table>--%>
<%--</div>--%>
<script type="text/javascript">
    var bc = <%=EvalFlowStatusEnum.KP_ME_SAVE.getValue()%>;
    var pageParam = $.extend({
        title: "个人自评",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>