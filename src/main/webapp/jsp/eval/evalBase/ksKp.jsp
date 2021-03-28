<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/jsp/eval/evalBase/ksKp.js"></script>
<tr  class="ksTr">
    <td rowspan="5">科<br/>室<br/>考<br/>核</td>
    <td rowspan="2">1</td>
    <td rowspan="2">加<br/>分</td>
    <td colspan="10">
        <table style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;" width="100%"
               border="1"
               bordercolor="#000000">
            <tr style="height: 25px;">
                <td width="12%">时间</td>
                <td width="52%" colspan="5">表彰内容</td>
                <td width="10%">级别</td>
                <td width="10%">形式</td>
                <td width="8%">加分</td>
                <td width="8%">操作</td>
            </tr>
            <c:set var="ks_i" value="0"/>
            <c:forEach items="${bean.addKsEnumList}" var="item">
                <c:set var="ks_i" value="${ks_i+1}"/>
                <tr style="height: 25px;" id = "ksJfTr_${ks_i}">
                    <td>
                        <input id="ks${ks_i}" name="ks${ks_i}" type="hidden"
                               value="${item.id}"/>
                        <input id="ksevent${ks_i}" name="ksevent${ks_i}" type="hidden"
                               value="${item.eventId}"/>
                        <input id="kssj${ks_i}" name="kssj${ks_i}" class="vp_input_100_100"readonly disabled
                               type="text"
                               value="<fmt:formatDate value="${item.eventDate}" type="date" dateStyle="long"/>"/>
                    </td>
                    <td colspan="5">
                        <input id="kslrid${ks_i}" name="kslrid${ks_i}" type="hidden"
                               value="${item.stdId}"/>
                        <input id="kslr${ks_i}" name="kslr${ks_i}" class="vp_input_100_100"readonly disabled
                               type="text"
                               value="${item.eventName}"/>
                    </td>
                    <td>
                        <input id="ksjb${ks_i}" name="ksjb${ks_i}" class="vp_input_100_100" type="text"
                               value="${item.eventJb}"/>
                    </td>
                    <td>
                        <input id="ksxs${ks_i}" name="ksxs${ks_i}" class="vp_input_100_100" type="text"
                               value="${item.eventXs}"/>
                    </td>
                    <td>
                        <input id="ksjf${ks_i}" name="ksjf${ks_i}" class="vp_input_100_100"readonly disabled
                               type="text"
                               value="${item.score}" precision="2"/>
                    </td>
                    <td>
                        <c:choose>
                            <c:when test="${baseViewParam.listKsEdit}">
                                <a href="#" style="color: blue" onclick="page.removeJfTr(${ks_i})">删除</a>
                                <a href="#"  style="color: blue"  onclick="ksKpPage.fileView(${item.eventId})">附件</a>
                            </c:when>
                            <c:otherwise>
                                <a href="#"  style="color: blue"  onclick="ksKpPage.fileView(${item.eventId})">附件</a>
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>
            </c:forEach>
            <input id="ksAddSize" name="ksAddSize" type="hidden" value="${ks_i}"/>
        </table>
    </td>
</tr>


<tr align="left">
    <td colspan="10" style="font-weight: normal;">
        合计加分：<input type="text" id="kshejf" name="kshejf" value="" readonly disabled/>分
    </td>
</tr>
<tr  class="ksTr">
    <td rowspan="2">2</td>
    <td rowspan="2">扣<br/>分</td>
    <td colspan="10">
        <table id="ksAddScore" style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;border-color:#000000;"
               width="100%" border="1">
            <tr style="height: 25px;">
                <td width="12%">时间</td>
                <td width="72%" colspan="7">
                    <div align="center">扣分事由</div>
                </td>
                <td width="8%">扣分</td>
                <td width="8%">操作</td>
            </tr>
            <c:set var="ks_j" value="0"/>
            <c:forEach items="${bean.delKsEnumList}" var="item">
                <c:set var="ks_j" value="${ks_j+1}"/>
                <tr style="height: 25px;" id = "ksKfTr_${ks_j}">
                    <td>
                        <input id="kfks${ks_j}" name="kfks${ks_j}" type="hidden"
                               value="${item.id}"/>
                        <input id="kfksevent${ks_j}" name="kfksevent${ks_j}" type="hidden"
                               value="${item.eventId}"/>
                        <input id="kfkssj${ks_j}" name="kfkssj${ks_j}" class="vp_input_100_100"readonly disabled
                               type="text"
                               value="<fmt:formatDate value="${item.eventDate}" type="date" dateStyle="long"/>"/>
                    </td>
                    <td colspan="7">
                        <input id="kfkslrid${ks_j}" name="kfkslrid${ks_j}" type="hidden"
                               value="${item.stdId}"/>
                        <input id="kfkslr${ks_j}" name="kfkslr${ks_j}" class="vp_input_100_100"readonly disabled
                               value="${item.eventName}"
                               type="text"/>
                    </td>
                    <td>
                        <input id="kfkskf${ks_j}" name="kfkskf${ks_j}" class="vp_input_100_100"readonly disabled
                               type="text" precision="2"
                               value="${item.score}"/>
                    </td>
                    <td>
                        <c:choose>
                            <c:when test="${baseViewParam.listKsEdit}">
                                <a href="#"  style="color: blue"  onclick="page.removeKfTr(${ks_j})">删除</a>
                                <a href="#"  style="color: blue"  onclick="ksKpPage.fileView(${item.eventId})">附件</a>
                            </c:when>
                            <c:otherwise>
                                <a href="#"  style="color: blue"  onclick="ksKpPage.fileView(${item.eventId})">附件</a>
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>
            </c:forEach>
            <input id="ksDelSize" name="ksDelSize" type="hidden" value="${ks_j}"/>
        </table>
    </td>
</tr>


<tr align="left">
    <td colspan="10" style="font-weight: normal;">
        合计扣分：<input id="kshekf" name="kshekf" type="text" value="" precision="2" readonly disabled/>分
    </td>
</tr>
<tr  class="ksTr">
    <td>3</td>
    <td>考<br/>评<br/>意<br/>见</td>
    <td colspan="10" height="180px">
        <table height="100%" width="100%" style="font-size: 9pt;">
            <tr>
                <td>
                    <textarea id="ksAdvice" name="ksAdvice" rows="3" class="easyui-validatebox"
                              validType="validDesc['考评意见',true,4000]"
                              style="width:100%;height:100px;border: 0;font-size:12px">${bean.ksAdvice}</textarea>
                </td>
            </tr>
            <tr align="right">
                <td>
                    <c:if test="${baseViewParam.listKsEdit}">
                        <div style="float:left;margin-left:5px ">
                            <a id='zpItem' href="###" class="easyui-linkbutton" iconCls='icon-list'
                               onclick="ksKpPage.getZpInfo()">获取评语模板
                            </a>
                        </div>
                    </c:if>
                    考核得分：<input id="ksScore" name="ksScore" type="text"    readonly disabled
                                value="${bean.ksScore}" precision="2"/>分；考核等次为：
                    <input id="ksLv" name="ksLv"
                           class="vp_input" style="width: 200px;border: 0;height: 105%" type="text"
                           value="${bean.ksLv}"/>
                </td>
            </tr>
            <tr align="right">
                <td>
                    科室负责人签名：<label style="font-weight:bold;">${bean.ksUserName}
                </label>
                </td>
            </tr>
            <tr align="right">
                <td>
                    <label style="font-weight:bold;"><fmt:formatDate value="${bean.ksDate}" type="date" dateStyle="long"/>
                    </label>
                </td>
            </tr>
        </table>
    </td>
</tr>
<!--附件查看窗口-->
<div style="display: none;background: #fff;">
    <div id="ksFileView" style="overflow: auto;width: 350px;">

    </div>
</div>
<script type="text/javascript">
    var listKsEdit = ${baseViewParam.listKsEdit};
    var initScore = ${initScore};
</script>