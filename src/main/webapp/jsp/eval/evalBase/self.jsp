<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript"
        src="/jsp/eval/evalBase/self.js"></script>

<tr style="font-weight: normal;text-align: left;">
    <td colspan="13" valign="top">

        <table style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;" width="100%"
               border="1" bordercolor="#000000">
            <tr style="flow:left;">
                <td id='grzp' width="4%" rowspan="4">个<br/>人<br/>自<br/>评</td>
                <td id='bs' width="3%" rowspan="3">1</td>
                <td id='cjjyqk' width="4%" rowspan="3"><p>参<br/>加<br/>教<br/>育<br/>情<br/>况</p></td>
            </tr>
            <tr style="font-weight: normal;text-align: left; height:122px;" id="table_le" class="selfTr">
                <td colspan="10" valign="top">
                    <table style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;"
                           width="100%"
                           border="1" id="Table1" bordercolor="#000000">
                        <tr style="font-weight: normal;text-align: left">
                            <td colspan="10">
                                <c:if test="${baseViewParam.listSelfEdit}">
                                    <a id='addrow' href="###" class="easyui-linkbutton" iconCls='icon-add'
                                       readonly="readonly"
                                       onclick="selfPage.build_row()">增加一行
                                    </a>
                                </c:if>
                            </td>
                        </tr>
                        <tr style="height: 25px;" id="title">
                            <td width="15%">时间</td>
                            <td width="55%">
                                <div align="center">学习内容</div>
                            </td>
                            <td width="20%">学习形式</td>
                            <td width="10%">操作</td>
                        </tr>

                        <c:set var="self_i" value="0"/>
                        <c:forEach items="${bean.selfEnumList}" var="item">
                            <c:set var="self_i" value="${self_i+1}"/>
                            <tr style="height: 25px;" id="tr${self_i}">
                                <td width="15%">
                                    <input id="gr${self_i}" name="gr${self_i}" type="hidden" value="${item.id}"/>

                                    <input id="grsj${self_i}" name="grsj${self_i}" class="vp_input_100_100"
                                           type="text"
                                           value="${item.eventDate}"/>
                                </td>
                                <td width="55%">
                                    <input id="grxx${self_i}" name="grxx${self_i}" class="vp_input_100_100"
                                           value="${item.content}"
                                           type="text"/></td>
                                <td width="20%">
                                    <input id="grxs${self_i}" name="grxs${self_i}" class="vp_input_100_100"
                                           value="${item.xs}"
                                           type="text"/></td>
                                <td width="10%">
                                    <c:choose>
                                        <c:when test="${baseViewParam.listSelfEdit}">
                                            <a href="#" style="color: #BC3604" onclick="selfPage.delete_row(${self_i})">删除</a>
                                        </c:when>
                                        <c:otherwise>
                                            不可操作
                                        </c:otherwise>
                                    </c:choose>
                                </td>
                            </tr>
                        </c:forEach>
                    </table>
                </td>
            </tr>
            <input id="allrow" name="allrow" type="hidden" value="${fn:length(bean.selfEnumList)}"/>
            <input id="del_id" name="del_id" type="hidden" value=""/>
            <input id="now_id" name="now_id" type="hidden" value=""/>
            <tr style="font-weight: normal;text-align: left" id="note_le">
                <td colspan="10">
                </td>
            </tr>
            <tr class="selfTr">
                <td height="180">2</td>
                <td>自<br/>我<br/>评<br/>价</td>
                <td colspan="10">
                    <table width="100%" height="183px" border="1">
                        <tr height="70%">
                            <td >
                    <textarea id="selfAdvice" name="selfAdvice" rows="3"
                              style="width:100%;height: 100%;border: 0;font-size:12px" class="easyui-validatebox"
                              required="true"
                              validType="required:true,validDesc['自我评价', true, 1000]">${bean.selfAdvice}</textarea>
                            </td>
                        </tr>
                        <tr align="right" height="30%">
                            <td>
                                <%--<c:if test="${baseViewParam.listSelfEdit}">--%>
                                <%--<div style="float:left;margin-left:5px ">--%>
                                    <%--<a id='zpItem' href="###" class="easyui-linkbutton" iconCls='icon-list'--%>
                                       <%--onclick="selfPage.getZpInfo()">获取自评模板--%>
                                    <%--</a>--%>
                                <%--</div>--%>
                                <%--</c:if>--%>
                                <table>
                                    <tr align="right" style="font-size: 12px;">
                                        <td>自评分数：
                                            <input type="text" id="selfScore" name="selfScore" value="${bean.selfScore}"
                                                   class="easyui-numberbox" style="width: 100px;" min="1"
                                                   max="999"
                                                   precision="2"/>
                                        </td>
                                        <td>自评等次：<input id="selfLv" name="selfLv"
                                                        value="${bean.selfLv}"
                                                        class="vp_input" style="width: 200px;border: 0;height: 105%"
                                                        type="text"/>
                                        </td>
                                        <td colspan="2">个人签名：<label
                                                style="font-weight:bold;">${bean.userName} &nbsp;</label></td>
                                        <td><label style="font-weight:bold;"><fmt:formatDate value="${bean.selfDate}"
                                                                                             type="date"
                                                                                             dateStyle="long"/>
                                        </label></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <script type="text/javascript">
                var listSelfEdit = ${baseViewParam.listSelfEdit};
            </script>