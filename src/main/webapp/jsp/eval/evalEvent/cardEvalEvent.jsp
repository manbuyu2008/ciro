<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评加减分档案</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalEvent/cardEvalEvent.js"></script>
<style type="text/css">
    body {
        font: 13px Arial, Helvetica, Sans-serif;
    }
</style>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='save' href="###" class="easyui-linkbutton " iconCls='icon-save'    plain="false"
           onclick="page.save()">保存
        </a>
        <a id="submit" href="#" class="easyui-linkbutton" iconCls='icon-saveadd'    plain="false"
           onclick="page.save(true)">保存并新增</a>
        <a id='copy' href="###" class="easyui-linkbutton " iconCls='icon-reload'    plain="false"
           onclick="page.copyHandle()">复制到其他人员
        </a>
        <a id='list' href="###" class="easyui-linkbutton" iconCls='icon-list'      plain="false"
           onclick="page.list()">列表
        </a>

    </div>
</div>
<div id="form" region="center" border="false" >
    <input type="hidden" id="nodes" name="nodes" value=""/>
    <input type="hidden" id="hasId" name="hasId" value=""/>
    <input type="hidden" id="id" name="id" />
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[考评加减分档案基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:12%">所属科室：</td>
            <td nowrap class="vp_txt" style="width:88%">
                <input type="hidden" id="type" name="type" value=""/>
                <input type="text" id="ksId" name="ksId"
                       value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">人员：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="userId" name="userId"
                       value=""
                       class="vp_input" />
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">考核分类：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="status" name="status" value="" class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr" id="type_span">
            <td nowrap class="p_td_lbl">事件分类：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="typeId" name="typeId" value="" class="vp_input" />
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">标准：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="stdId" name="stdId" value="" style="width: 500px"
                       class="vp_input_100" />
            </td>
        </tr>
        <tr class="p_tr" id="score_span">
            <td nowrap class="p_td_lbl"></td>
            <td nowrap class="vp_txt">
                <span id="span_fw">分值范围：<input id="begin" readonly="readonly" value="${evalStd.beginScore}"/>
                    至<input id="end" readonly="readonly" value="${evalStd.endScore}"/></span>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">事件名称：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="eventName" name="eventName" value=""
                       class="vp_input easyui-validatebox" style="width:80%"
                       required="true"
                       validType="validName['事件名称',false,200]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">时间：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="eventDate" name="eventDate" value=""
                       class="vp_input" />
            </td>
        </tr>
        <tr class="p_tr" id="tr_score">
            <td nowrap class="p_td_lbl">分数：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="score" name="score" value="" class="vp_input easyui-numberbox" precision="2" />
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">档案附件：</td>
            <td nowrap class="vp_txt" colspan="3">
                <div id="fileQueueInit"></div>
                <div id="fileQueue"></div>
                <input type="file" id="fileId" name="fileId" value="文件上传"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">备注：</td>
            <td nowrap class="vp_txt">
            <textarea id="remark" name="remark" rows="3" class="easyui-validatebox"
                      validType="validDesc['备注', true, 255]"
                      style="width:99%;word-break:break-all" ></textarea>
            </td>
        </tr>
        <tr class="p_tr shMes">
            <td class='vp_caption' colspan="2">[审核信息]</td>
        </tr>
        <tr class="p_tr shMes">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">审核结果：</td>
            <td nowrap class='vp_txt' align="left">
                <input type="text" id="shResult" name="shResult" value=""
                       required="true" class="vp_input" disabled/>
        </tr>
        <tr class="p_tr shMes" id="tr_sqrScore">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">确认分数：</td>
            <td nowrap class='vp_txt' align="left">
                <input class="vp_input easyui-numberbox" min="0"
                       max="9999.99" precision="2"
                       style="width: 80%" type="text" id="qrScore" name="qrScore" value="" disabled/>
            </td>
        </tr>
        <tr class="p_tr shMes">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">审核意见：</td>
            <td nowrap class='vp_txt' align="left">
            <textarea id="shRemark" name="shRemark" class="easyui-validatebox"
                      validType="validDesc['审核意见', true, 500]"
                      style="width: 80%;height: 80px;" disabled></textarea></td>
        </tr>
        </tbody>
    </table>
</div>
<div style="display: none;">
    <div id="sh_dialog">
        <div class="easyui-layout" fit="true">
            <div region="west" title="部门" style="width:200px;">
                <ul id="deptId" name="deptId"></ul>
            </div>
            <div region="center" title="人员">
                <table id="per_grid" name="per_grid"></table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var isSh = "${evalEvent.isSh}";
    var v_is_my = ${isMy};
    var jsessionid = "${jsessionid}";
    var userId = "${userId}";
    var fileInitList = ${fileInitList};
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