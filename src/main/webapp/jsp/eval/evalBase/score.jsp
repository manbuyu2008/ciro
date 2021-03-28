<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<c:if test="${fn:length(bean.selfScoreStdList)>0}">
    <c:set var="i" value="0"/>
    <tr style="font-weight: normal;text-align: left;">
        <td style="text-align: center;font-weight: bold;"  width="7%">
            <p>考<br/>评<br/>细<br/>则<br/>内<br/>容</p>
        </td>
        <td colspan="12" valign="top" style="border: 0px">
            <table style="font-size: 9pt;text-align: center;border-collapse:collapse; border: 0px;height: 100%"
                   width="100%"
                   border="1" bordercolor="#000000">
                <tr style="flow:left;font-weight: bold;">
                    <td id='xh' width="4%">序号</td>
                    <td id='item_content' width="80%">考评内容</td>
                    <td id='score' width="16%">基础分</td>
                </tr>
                <c:forEach items="${bean.selfScoreStdList}" var="item">
                    <c:set var="i" value="${i+1}"/>
                    <tr>
                        <td id='xh_${item.id}'>${i}
                        </td>
                        <td id='content_${item.id}'>${item.name}
                        </td>
                        <td id='score_${item.id}'>${item.score}
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </td>
    </tr>
</c:if>
<script type="text/javascript">
</script>