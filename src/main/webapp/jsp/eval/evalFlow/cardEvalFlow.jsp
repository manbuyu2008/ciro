<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评流程设置</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalFlow/cardEvalFlow.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='save' href="###" class="easyui-linkbutton " iconCls='icon-save'    plain="false"
           onclick="page.save()">保存
        </a>
        <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-saveadd'    plain="false"
           onclick="page.save(true)">保存并新增</a>
        <a id='list' href="###" class="easyui-linkbutton" iconCls='icon-list'      plain="false"
           onclick="page.list()">列表
        </a>

    </div>
</div>
<div id="form" region="center" border="false" >
    <input type="hidden" id="id" name="id" />
    <input type="hidden" id="evalType" name="evalType" value="year" />
    <input type="hidden" id="cycleType" name="cycleType" value="ty" />
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='vp_caption' colspan="2">[基础信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 12%;">流程名称：</td>
            <td nowrap class="vp_txt" style="width: 88%;">
                <input type="text" id="name" name="name" value=""
                       class="vp_input easyui-validatebox"
                       required="true" missingMessage="流程名称必须输入"
                       validType="validName['流程名称',false,60]"/>
            </td>
        </tr>

        <tr class="p_tr">
            <td class='vp_caption' colspan="2">[科室考评节点设置]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">是否启用：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="ksEval" name="ksEval" value="" class="vp_input"/>
            </td>
        </tr>

        <tr class="p_tr">
            <td class='vp_caption' colspan="2">[大科总支考评节点设置]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">是否启用：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="dkEval" name="dkEval" value="" class="vp_input"/>
            </td>
        </tr>


        <tr class="p_tr">
            <td class='vp_caption' colspan="2">[单位考评节点启用]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">是否启用：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="corpEval" name="corpEval" value="" class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">备注：</td>
            <td nowrap class="vp_txt">
            <textarea id="remark" name="remark" rows="2" cols="100%" style="width:100%;" class="easyui-validatebox"
                      validType="validDesc['备注', true, 255]"></textarea>
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