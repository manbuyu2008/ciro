<%@ page import="cc.water.ciro.eval.enums.EvalFlowStatusEnum" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>个人自评</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/jsp/eval/evalSelf/cardEvalSelf.js"></script>
<script type="text/javascript" src="/resources/js/themes/base/base.js"></script>
</head>
<body class="easyui-layout">
<c:if test="${view!='true'}">
<div region="north" style="overflow:hidden;height:35px;" border="false">
    <div id="toolbar" class="coco_toolbar">
        <a id='save' href="###" class="easyui-linkbutton " iconCls='icon-save' plain="false"
           onclick="page.saveHandle(false)">保存
        </a>
        <a id="submit" href="#" class="easyui-linkbutton" iconCls='icon-saveadd' plain="false"
           onclick="page.saveHandle(true)">提交</a>

        <a id="del" href="#" class="easyui-linkbutton" iconCls='icon-remove' plain="false"
           onclick="page.delHandle()">删除</a>

            <a id='list' href="###" class="easyui-linkbutton" iconCls='icon-list' plain="false"
               onclick="page.listEx()">列表
            </a>
    </div>
</div>
</c:if>
<div id="form" region="center" border="false">
    <input type="hidden" id="id" name="id" value="${bean.id}"/>
    <input type="hidden" id="status" name="status" value="${bean.status}"/>
    <table border="1" bordercolor="#000000"
           style="font-size: 9pt;text-align: center;font-weight: bold;border-collapse:collapse;height: 400px;width: 100%;">
        <c:if test="${baseViewParam.listSelfView}">
            <%@ include file="/jsp/eval/evalBase/head.jsp" %>

            <%@ include file="/jsp/eval/evalBase/score.jsp" %>

            <%@ include file="/jsp/eval/evalBase/self.jsp" %>
        </c:if>
        <c:if test="${baseViewParam.listKsView}">
            <%@ include file="/jsp/eval/evalBase/ksKp.jsp" %>
        </c:if>
        <c:if test="${baseViewParam.listDkView}">
            <%@ include file="/jsp/eval/evalBase/dksKp.jsp" %>
        </c:if>
        <c:if test="${baseViewParam.listDwView}">
            <%@ include file="/jsp/eval/evalBase/dwKp.jsp" %>
        </c:if>
    </table>
    </td>
    </tr>
    </table>
</div>
<div id="m_test">
    <table id="tb_test"></table>
</div>

</body>
</html>
<script type="text/javascript">
    var pageParam = $.extend({
        hasList: 0,
        jsonObject:${dataBean},
        queryParams:${data.queryParams},
        pageSize:${data.pageSize},
        pageNumber:${data.pageNumber}
    }, pageParam || {});
    var bc = <%=EvalFlowStatusEnum.KP_ME_SAVE.getValue()%>;
    var tj = <%=EvalFlowStatusEnum.KP_ME_SUBMIT.getValue()%>;
    var isEdit = ${baseViewParam.canEdit};
    var kskp = ${baseViewParam.listKsEdit};
    var dkkp = ${baseViewParam.listDkEdit};
    var dwkp = ${baseViewParam.listDwEdit};
    var evalLevelList = ${evalLevelList};
</script>
