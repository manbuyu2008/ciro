<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评期间</title>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/base/base.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/report/reportDwSum.js"></script>
</head>
<body style="text-align: center;">
<div style="overflow:hidden;margin-bottom:15px;margin-top:0px;height:35px" border="false"
     align="left">
    <div class="vp_func_toolbar">
        <a id='printview' href="###" class="easyui-linkbutton" iconCls='icon-search' gapv=''
           onclick="page.print()">打印
        </a>
    </div>
</div>
<div>
    <span id="title" style="font-size: 25px;font-weight:bold;">${corpName}内部评价考评结果表<br/>单位考评统计表（人）</span>
</div>
<table align="center" width="950" border="0" style="font-size: 15px;font-weight: bold;margin-bottom:5px;">
    <tr>
        <td width="400" align="left">填报单位：${corpName}
        <td width="266" align="center">填报时间：${nowDate}</td>
        <td width="100" align="right">考评期间：</td>
        <td width="200" nowrap class='vp_txt' align="left">
            <input type="text" id="zq" name="zq" class="vp_input_100"
                   value="${evalZq.id}">
        </td>
    </tr>
</table>
<table align="center" width="950" border="1" style="font-size: 12px;font-weight: bold;border-collapse:collapse;"
       bordercolor="#000000">
    <%--<tr style="height: 25px;">--%>
    <%--<td align="center" colspan="4" style="font-size: 18px">县区卫生局必填项目</td>--%>
    <%--</tr>--%>
    <%--<tr style="font-weight: normal;height: 25px;">--%>
    <%--<td>县（市） 区实有二级以下<br>医疗机构（中心 站 所）数</td>--%>
    <%--<td><%=map.getStrIgnoreNull("corpAllNum")%>--%>
    <%--</td>--%>
    <%--<td>其中，已展开医德考<br>评工作的多少家</td>--%>
    <%--<td><%=map.getStrIgnoreNull("corpCjNum")%>--%>
    <%--</td>--%>
    <%--</tr>--%>
    <tr style="height: 25px;">
        <%--<td align="center" colspan="4" style="font-size: 18px">县区卫生局和各家二级以上医院共同填报项目</td>--%>
        <td align="center" colspan="4" style="font-size: 18px">${evalZq.name}考评结果汇总</td>
    </tr>
    <tr style="font-weight: normal;height: 25px;" align="left">
        <td>应参加考评人数</td>
        <td width="50px">${evalZq.quorum}
        </td>
        <td>实参加考评人数</td>
        <td width="50px">${evalZq.realNum}
        </td>
    </tr>
    <tr style="height: 25px;">
        <td colspan="4" style="font-weight: normal;" align="left">
            其中：${sumStr}
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <table>
                <c:forEach items="${baseInfoList}" var="item">
                    <tr style="font-weight: bold;font-size: 15px">
                        <td>医德考评${item.evalLevel.name}人员名单</td>
                    </tr>
                    <tr style="font-size: 12px">
                        <td colspan="4">
                            <c:forEach items="${item.userInfoList}" var="item_info">
                                &nbsp;${item_info.userName}（${item_info.ksName}）
                            </c:forEach>
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </td>
    </tr>
</table>
<div style="text-align: center">
    <span style="margin-left: 20px"></span>
    <span></span>
</div>
<table>
</table>
</body>
<script type="text/javascript">
    // editEngine.js引用内容
    var pageParam = $.extend({
        hasList: 0,
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
</script>
</html>
