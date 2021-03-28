<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>部门管理</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="/jsp/sys/base/dept/cardDept.js"></script>
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
            <td class='coco_caption' colspan="2">[部门基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">编码：</td>
            <td nowrap class="coco_txt" style="width:85%">
                <input type="text" id="code" name="code"
                        class="coco_input easyui-validatebox" required="true"
                       missingMessage="编码必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">部门名称：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="name" name="name" class="coco_input easyui-validatebox"  required="true"
                       missingMessage="用户名必须输入"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">上级部门：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="parentId" name="parentId" class="coco_input" />
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">部门性质：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="deptType" name="deptType"
                         class="coco_input easyui-validatebox"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td class='coco_caption' colspan="6">[其他信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">状态：</td>
            <td nowrap class="coco_txt" colspan="4">
                <input type="text" id="status" name="status" class="coco_input easyui-validatebox" />
            </td>
        </tr>
        <tr class="p_tr tr_stopInfo">
            <td nowrap class="p_td_lbl">停用时间：</td>
            <td nowrap class="coco_txt">
                <input type="text" id="stopTime" name="stopTime" class="coco_input easyui-datebox"  required="true"/>
            </td>
        </tr>
        <tr class="p_tr tr_stopInfo">
            <td nowrap class="p_td_lbl">停用信息：</td>
            <td nowrap class="coco_txt" colspan="4">
                <input type="text" id="stopInfo" name="stopInfo" style="width:100%"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">备注：</td>
            <td nowrap class="coco_txt" colspan="4">
                <textarea id="note" name="note" cols="3" rows="3"
                          style="width:100%;font-size: 12px;" class="easyui-validatebox"
                          validType="validName['备注',true,200]"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script type="text/javascript">
    var pageParam = $.extend({
        hasList:0,
        jsonObject:${dept},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</body>
</html>