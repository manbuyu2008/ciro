<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>角色管理</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/base/role/cardRole.js"></script>
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
            <td class='coco_caption' colspan="2">[角色基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">角色编码：</td>
            <td nowrap class="coco_txt" style="width:85%">
                <input type="text" id="code" name="code"
                        class="coco_input easyui-validatebox" required="true"
                       <c:if test='${level=="sys"}'>disabled</c:if>
                       missingMessage="角色编码必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">角色名称：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="name" name="name" class="coco_input easyui-validatebox"
                       required="true"
                       missingMessage="角色名称必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">数据权限：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="dataLevel" name="dataLevel" class="coco_input easyui-combobox"
                       editable="false"
                       valueField="id" textField="text"
                       required="true"
                       missingMessage="数据权限必须输入"/>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script type="text/javascript">
    var pageParam = $.extend({
        hasList:0,
        dataLevel:${dataLevel},
        jsonObject:${role},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</body>
</html>