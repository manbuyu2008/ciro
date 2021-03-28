<%@ page import="cc.water.ciro.system.enums.ParamInitEnum" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评参数管理</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/jsp/eval/param/editEvalParam.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-save'    plain="false"
           onclick="page.saveHandle()">保存
        </a>
    </div>
</div>
<%--
 * Created by huangxl at 2013-01-17 14:20:23
 * 实体【考评系统参数(DB_YDKP_PARAM)】的卡片编辑页面jsp
 --%>
<div id="form" region="center" border="false" >
<table class="p_tbl" cellspacing="1" cellpadding="0">
    <tbody>
    <tr class="p_tr">
        <td class='vp_caption' colspan="2">[基础信息]</td>
    </tr>
    <tr class="p_tr">
        <td nowrap class="p_td_lbl" style="width:25%"><%=ParamInitEnum.checkEvent.getMessage()%>：</td>
        <td nowrap class="vp_txt" style="width:75%">
            <input type="checkbox" id="<%=ParamInitEnum.checkEvent.getCode()%>"
                   name="<%=ParamInitEnum.checkEvent.getCode()%>"
                   value="${checkEvent}"  ${eventCheck}><label
                for="<%=ParamInitEnum.checkEvent.getCode()%>"><%=ParamInitEnum.checkEvent.getMessage()%></label>
        </td>
    </tr>
    <tr class="p_tr">
        <td nowrap class="p_td_lbl" style="width:25%"><%=ParamInitEnum.unite.getMessage()%>：</td>
        <td nowrap class="vp_txt" style="width:75%">
            <input type="checkbox" id="<%=ParamInitEnum.unite.getCode()%>"
                   name="<%=ParamInitEnum.unite.getCode()%>"
                   value="${unite}"  ${uniteCheck}><label
                for="<%=ParamInitEnum.unite.getCode()%>"><%=ParamInitEnum.unite.getMessage()%></label>
        </td>
    </tr>
    <tr class="p_tr">
        <td nowrap class="p_td_lbl" style="width:25%"><%=ParamInitEnum.initScore.getMessage()%>：</td>
        <td nowrap class="vp_txt" style="width:75%">
            <input type="text" id="<%=ParamInitEnum.initScore.getCode()%>"
                   name="<%=ParamInitEnum.initScore.getCode()%>"
                   value="${initScore}" tabindex="25"
                   class="vp_input easyui-numberbox" min="0" max="1000" precision="2"/>
        </td>
    </tr>
    </tbody>
</table>
</div>

<script type="text/javascript">
    var uniteCode="<%=ParamInitEnum.unite.getCode()%>";
    var eventCode="<%=ParamInitEnum.checkEvent.getCode()%>";
</script>
