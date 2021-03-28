<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript"
        src="<%=CONTEXT_PATH%>/jsp/eval/evalBase/dwKp.js"></script>
<tr>
    <td rowspan="3">单<br/>位<br/>考<br/>核</td>
</tr>
<tr style="height: 25px;"  class="dwTr">
    <td>1</td>
    <td>一<br/>票<br/>认<br/>定<br/>较<br/>差</td>
    <td colspan="10" valign="top">

        <input id="zqStatus" name="zqStatus" type="hidden" value="${evalZq.status}"/>
        <table style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;" width="100%"
               border="1"
               bordercolor="#000000" id="dwtable">
            <tr style="height: 25px;" id="yprdtrtitle">
                <td width="12%">时间</td>
                <td width="82%" colspan="8">一票认定标准事由</td>
                <td width="6%">操作</td>
            </tr>
            <c:set var="dw_i" value="0"/>
            <c:forEach items="${bean.dwEnumList}" var="item">
                <c:set var="dw_i" value="${dw_i+1}"/>
                <tr style="height: 25px;" id="dwTr_${dw_i}">
                    <td>
                        <input id="dwid${dw_i}" name="dwid${dw_i}" type="hidden"
                               value="${item.id}"/>
                        <input id="dwevent${ks_i}" name="dwevent${ks_i}" type="hidden"
                               value="${item.eventId}"/>
                        <input id="dwdate${dw_i}" name="dwdate${dw_i}" type="text"       readonly="readonly"  disabled
                               value="<fmt:formatDate value="${item.eventDate}" type="date" dateStyle="long"/>"
                               class="vp_input_100_100"/>
                    </td>
                    <td colspan="8">
                        <input id="dwlrid${dw_i}" name="dwlrid${dw_i}"
                               value="${item.stdId}"
                               type="hidden"/>
                        <input id="dwlr${dw_i}" name="dwlr${dw_i}" type="text"    readonly="readonly"  disabled
                               value="${item.eventName}"
                               class="vp_input_100_100"/>
                    </td>
                    <td>
                        <c:if test="${baseViewParam.listDwEdit}">
                            <a href="#" style="color: blue" onclick="page.removeTr(${ks_i})">删除</a>
                        </c:if>
                        <c:if test="${not empty item.fileUrl}">
                            <a href="#" style="color: blue" onclick="dwKpPage.fileView(${item.eventId})">附件</a>
                        </c:if>
                        <c:if test="${!baseViewParam.listDwEdit&&empty item.fileUrl}">
                            不可操作
                        </c:if>
                    </td>
                </tr>
            </c:forEach>
            <input id="dwSize" name="dwSize" type="hidden" value="${ks_i}"/>
        </table>
    </td>
</tr>

<tr class="dwTr">
    <td>2</td>
    <td>单<br/>位<br/>考<br/>核<br/>意<br/>见</td>
    <td colspan="10">
        <table width="100%" height="100%">
            <tr>
                <td>
                    <textarea id="corpAdvice" name="corpAdvice" rows="3"
                              style="width:100%;height:100px;border: 0;font-size:12px">${bean.corpAdvice}</textarea>
                </td>
            </tr>
            <tr align="right" style="font-size: 9pt;">
                <td>
                    <c:if test="${baseViewParam.listDwEdit}">
                        <div style="float:left;margin-left:5px ">
                            <a id='zpItem' href="###" class="easyui-linkbutton" iconCls='icon-list'
                               onclick="dwKpPage.getZpInfo()">获取评语模板
                            </a>
                        </div>
                    </c:if>
                    考核得分
                    <input id="corpScore" name="corpScore" type="text" onblur="dwKpPage.calDwLevel();"
                           class="vp_input" style="width:200px" value="${bean.corpScore}" precision="2"/>
                    考核等次：
                    <input id="corpLv" name="corpLv" class="vp_input" type="text"
                           value="${bean.corpLv}"
                           style="width:200px;"/>
                </td>
            </tr>
            <tr align="right">
                <td>
                    单位负责人签名：
                    <label style="font-weight:bold;">${bean.dwUserName}</label>
                </td>
            </tr>
            <tr align="right">
                <td>
                    <label style="font-weight:bold;"><fmt:formatDate value="${bean.corpDate}" type="date" dateStyle="long"/></label>
                </td>
            </tr>
        </table>
    </td>
</tr>
<!--附件查看窗口-->
<div style="display: none;background: #fff;">
    <div id="dwFileView" style="overflow: auto;width: 350px;">
    </div>
</div>
<script>
    var listDwEdit = ${baseViewParam.listDwEdit};
    var initScore = ${initScore};
    var jcId = "${jcId}";
</script>