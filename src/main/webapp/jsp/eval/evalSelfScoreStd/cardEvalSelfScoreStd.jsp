<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评基础分管理</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalSelfScoreStd/cardEvalSelfScoreStd.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
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
    <input type="hidden" id="status" name="status" value="${status}">
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[考评基础分基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">项目编码：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="code" name="code" value=""
                       class="easyui-validatebox vp_input" required="true"  validType="validName['编码',false,30]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">项目名称：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="name" name="name" value=""  style="font-size:12px;width:80% "
                       class="easyui-validatebox vp_input_100" required="true"  validType="validName['名称',false,200]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">考评类别：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="userTypeId" name="userTypeId" value=""
                       class="easyui-validatebox vp_input" required="true" />
            </td>
        </tr>
        <tr class="p_tr" id="tr_score">
            <td nowrap class="p_td_lbl">分值：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="score" name="score" value="" class="vp_input easyui-numberbox" precision="2" />
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script type="text/javascript">
    var pageParam = $.extend({
        hasList:0,
        jsonObject:${dataBean},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</body>
</html>