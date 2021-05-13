<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评类型管理</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalUserType/cardEvalUserType.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-save'    plain="false"
           onclick="page.save()">保存
        </a>
        <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-saveadd'    plain="false"
           onclick="page.save(true)">保存并新增</a>
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-list'      plain="false"
           onclick="page.list()">列表
        </a>

    </div>
</div>
<div id="form" region="center" border="false" >
    <input type="hidden" id="id" name="id" />
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[考评类型基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">考评类型编码：</td>
            <td nowrap class="coco_txt" style="width:85%">
                <input type="text" id="typeCode" name="typeCode"
                        class="coco_input easyui-validatebox" required="true"
                       missingMessage="考评类型编码必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">考评类型名称：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="typeName" name="typeName" class="coco_input easyui-validatebox"
                       required="true"
                       missingMessage="考评类型名称必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">考评流程：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="flowId" name="flowId" class="coco_input easyui-validatebox"
                       />
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script type="text/javascript">
    var pageParam = $.extend({
        hasList:0,
        jsonObject:${evalUserType},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</body>
</html>