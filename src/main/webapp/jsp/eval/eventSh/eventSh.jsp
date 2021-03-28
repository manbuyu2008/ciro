<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评加减分档案审核</title>
<script type="text/javascript" src="/jsp/sys/common/common_list.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/eventSh/eventSh.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-search' plain="false"
           onclick="page.query()">查询
        </a>
        <shiro:hasPermission name="evalEvent:sh">
            <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-add' plain="false"
               onclick="page.moreSh()">批量审核</a>
        </shiro:hasPermission>
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-reload' plain="false"
           onclick="page.exportExcel()">导出
        </a>
    </div>
</div>
<div region="center" border="false">
    <div id="center-div" class="easyui-layout" fit="true">
        <div region="north" id="queryForm" title="查询条件" style="overflow:hidden; height: 152px;"
             collapsible="true" collapsed="${useCollapsed}">
            <table id="form" class="p_tbl" cellspacing="1" cellpadding="0">
                <tbody>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right'>科室：</td>
                    <td nowrap class='coco_txt'>
                        <input type="text" id="ksId" name="ksId" class="coco_input"
                               value="">
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>人员：</td>
                    <td nowrap class="coco_txt">
                        <input type="text" id="userId" name="userId" class="coco_input"
                               value="">
                    </td>
                </tr>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right'>查询时间：</td>
                    <td nowrap class='coco_txt'>
                        <input type="hidden" id="eventDate" name="eventDate" class="coco_input"
                               value="">
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>档案类别：</td>
                    <td nowrap class="coco_txt">
                        <input type="text" id="status" name="status" class="coco_input"
                               value="">
                    </td>
                </tr>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right'>审核结果：</td>
                    <td nowrap class='coco_txt'>
                        <input type="text" id="shResult" name="shResult" class="coco_input"
                               value="">
                    </td>
                    <td nowrap class='p_td_lbl' align='right'>审核状态：</td>
                    <td nowrap class="coco_txt">
                        <input type="text" id="isSh" name="isSh" class="coco_input"
                               value="">
                    </td>
                </tr>
                <tr class="p_tr">
                    <td nowrap class='p_td_lbl' align='right'>事件分类：</td>
                    <td nowrap class='coco_txt'>
                        <input type="text" id="typeId" name="typeId" class="coco_input"
                               value="">
                    </td>
                    <td nowrap class='p_td_lbl' colspan="2">&nbsp;</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div region="center" border="false">

            <table id="tbList"></table>

        </div>
    </div>
</div>

<div id="activity-dialog" class="easyui-dialog" icon="icon-save" closed="true" modal="true"
     style="padding:5px;width:350px;height:350px;">
    <table id="baseTab" class="p_tbl" cellspacing="1" cellpadding="0">
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[基础信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">所属科室：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sdept" name="sdept" disabled/>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">人员：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="suserId" name="suserId" disabled/>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">档案类别：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sstatus" name="sstatus" disabled/>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">标准：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sbz" name="sbz" disabled/>
        </tr>
        <tr class="p_tr tr_corp">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">分值范围：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sscoreLimit" name="sscoreLimit" disabled/>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">事件名称：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="seventName" name="seventName" disabled/>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">时间：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sDate" name="sDate" disabled/>
        </tr>
        <tr class="p_tr tr_corp">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">分数：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input" style="width: 80%" type="text" id="sScore" name="sScore" disabled/>
        </tr>
    </table>
    <table id="shTab" class="p_tbl" cellspacing="1" cellpadding="0">
        <input type="hidden" id="id" name="id"/>
        <input type="hidden" id="sissh" name="sissh"/>
        <input type="hidden" id="stat" name="stat"/>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[审核信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">审核结果：</td>
            <td nowrap class='coco_txt' align="left">
                <input type="radio" id="sresultY" name="sresult" onclick="page.pass();"/><label for="sresultY"
                                                                                                onclick="page.pass();">通过</label>
                <input type="radio" id="sresultN" name="sresult" onclick="page.unPass();"/><label for="sresultN"
                                                                                                  onclick="page.unPass();">未通过</label>
        </tr>
        <tr class="p_tr tr_corp" id="tr_sqrScore">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">确认分数：</td>
            <td nowrap class='coco_txt' align="left">
                <input class="coco_input easyui-numberbox" min="0"
                       max="9999.99" precision="2"
                       style="width: 80%" type="text" id="sqrScore" name="sqrScore"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width: 20%" align="right">审核意见：</td>
            <td nowrap class='coco_txt' align="left">
                <textarea id="sshRemark" name="sshRemark" class="easyui-validatebox"
                          validType="validDesc['审核意见', true, 500]"
                          style="width: 80%;height: 80px;"></textarea></td>
        </tr>
    </table>
</div>
</body>
<script type="text/javascript">
    var pageParam = $.extend({
        title: "考评加减分档案审核",
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    document.title = pageParam.title;
</script>