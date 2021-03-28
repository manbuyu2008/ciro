<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评期间</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="/jsp/eval/evalZq/cardEvalZq.js"></script>
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
    <input type="hidden" id="score" name="score" value="100" />
    <input type="hidden" id="status" name="status" value="" />
    <input type="hidden" id="scoreMax" name="scoreMax" value="NO" />
    <input type="hidden" id="evalType" name="evalType" value="year" />
    <input type="hidden" id="cycleType" name="cycleType" value="ty" />
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[考评期间基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">期间编码：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="code" name="code" value=""
                       class="easyui-validatebox vp_input" required="true"  validType="validName['编码',false,30]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">期间名称：</td>
            <td nowrap class="vp_txt" style="width:55%">
                <input type="text" id="name" name="name" value=""  style="font-size:12px;width:50% "
                       class="easyui-validatebox vp_input_100" required="true"  validType="validName['名称',false,200]"/>
            </td>
        </tr>

        <tr class="p_tr" id="tr_personType">
            <td nowrap class="p_td_lbl">考评类别：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="userType" name="userType" value=""
                       class="easyui-validatebox vp_input"/>
                <span style="color: red;">注：需要参加考评的人员的考评类别</span>
            </td>
        </tr>
        <%--<tr class="p_tr">--%>
            <%--<td nowrap class="p_td_lbl">考评明细项分数上线控制：</td>--%>
            <%--<td nowrap class="vp_txt">--%>
                <%--<input type="hidden" id="scoreMax" name="scoreMax" value="" />--%>
                <%--<input type="checkbox" id="scoreMaxCheck"--%>
                       <%--name="scoreMaxCheck"--%>
                       <%--value=""  onclick="page.clickChecked(this);"/><label--%>
                    <%--for="scoreMaxCheck">是否启用考评明细项分数上线控制</label>--%>
            <%--</td>--%>
        <%--</tr>--%>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">期间开始时间：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="beginDate" name="beginDate" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">期间截至时间：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="endDate" name="endDate" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">调用考评档案的时间范围：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="eventBegin" name="eventBegin" value=""
                       class="vp_input"/> ~
                <input type="text" id="eventEnd" name="eventEnd" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">
                [各阶段有效日期范围]
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="###" onclick="page.setNextDate();" style="color:blue;">默认与期间日期范围相同</a>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">个人自评日期范围：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="grzpBegin" name="grzpBegin" value=""
                       class="vp_input"/>至
                <input type="text" id="grzpEnd" name="grzpEnd" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">科室考评日期范围：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="ksevalBegin" name="ksevalBegin" value=""
                       class="vp_input"/>至
                <input type="text" id="ksevalEnd" name="ksevalEnd" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">大科（总支）考评日期范围：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="dkevalBegin" name="dkevalBegin" value=""
                       class="vp_input"/>至
                <input type="text" id="dkevalEnd" name="dkevalEnd" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">单位考评日期范围：</td>
            <td nowrap class="vp_txt">
                <input type="text" id="dwevalBegin" name="dwevalBegin" value=""
                       class="vp_input"/>至
                <input type="text" id="dwevalEnd" name="dwevalEnd" value=""
                       class="vp_input"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">备注：</td>
            <td nowrap class="vp_txt" style="width:85%">
            <textarea id="remark" name="remark" rows="3" class="easyui-validatebox"
                      validType="validDesc['备注', true, 255]"
                      style="font-size:12px;width:80% "></textarea>
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