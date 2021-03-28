<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>日常医德行为加分标准</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/jsp/eval/evalStd/cardEvalStd.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='query' href="###" class="easyui-linkbutton " iconCls='icon-save' plain="false"
           onclick="page.save()">保存
        </a>
        <a id="btn" href="#" class="easyui-linkbutton" iconCls='icon-saveadd' plain="false"
           onclick="page.save(true)">保存并新增</a>
        <a id='excel' href="###" class="easyui-linkbutton" iconCls='icon-list' plain="false"
           onclick="page.list()">列表
        </a>

    </div>
</div>
<div id="form" region="center" border="false">
    <input type="hidden" id="id" name="id"/>
    <input type="hidden" id="status" name="status"/>
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[日常医德行为加分标准基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">等级编码：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="code" name="code" value=""
                       class="easyui-validatebox vp_input" required="true" validType="validName['编码',false,30]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">等级名称：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="name" name="name" value="" style="font-size:12px;width:80% "
                       class="easyui-validatebox vp_input_100" required="true" validType="validName['名称',false,200]"/>
            </td>
        </tr>
        <c:choose>
            <c:when test="${status!=2}">
                <tr class="p_tr">
                    <td nowrap class="p_td_lbl" style="width:15%">分值范围（前后包含）：</td>
                    <td nowrap class="vp_txt" style="width:85%">
                        <input type="text" id="beginScore" name="beginScore" value="" required="true"
                               class="easyui-numberbox" style="width: 50px;" min="1" precision="2"/>
                        至
                        <input type="text" id="endScore" name="endScore" value="" required="true"
                               class="easyui-numberbox" style="width: 50px;" min="1" precision="2"/>
                            <%--<span style="color: #ff0000;">结束值大于1000,表示无上限</span>--%>
                    </td>
                </tr>
                <tr class="p_tr">
                    <td nowrap class="p_td_lbl" style="width:15%">该项最大加分值：</td>
                    <td nowrap class="vp_txt" style="width:85%">
                        <input type="text" id="scoreMax" name="scoreMax" value="" required="true"
                               class="easyui-numberbox" style="width: 100px;" min="1" precision="2"/>
                    </td>
                </tr>
            </c:when>
        </c:choose>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl">状态：</td>
            <td nowrap class="coco_txt" colspan="4">
                <input type="text" id="eventType" name="eventType" class="coco_input easyui-validatebox" />
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
        hasList: 0,
        jsonObject:${dataBean},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</body>
</html>