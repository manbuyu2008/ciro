<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<title>考评评语管理</title>
<script type="text/javascript" src="/jsp/sys/common/common_card.js"></script>
<script type="text/javascript" src="/jsp/eval/evalComment/cardEvalComment.js"></script>
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
    <table id="sys__card" class="p_tbl" cellspacing="1" cellpadding="0">
        <tbody>
        <tr class="p_tr">
            <td class='coco_caption' colspan="2">[评语模板基本信息]</td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">模板名称：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="name" name="name" value=""
                       class="easyui-validatebox vp_input_100" required="true" validType="validName['编码',false,50]"/>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">评语：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <textarea id="comment" name="comment" rows="5"
                          style="width:85%;height: 100%;border: 0;font-size:12px"
                          class="easyui-validatebox"
                          required="true"
                          validType="required:true,validDesc['评语', true, 1000]"></textarea>
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">考评等级：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="did" name="did"
                       class="easyui-validatebox vp_input" />
            </td>
        </tr>
        <tr class="p_tr">
            <td nowrap class="p_td_lbl" style="width:15%">考评阶段：</td>
            <td nowrap class="vp_txt" style="width:85%">
                <input type="text" id="status" name="status"
                       class="easyui-validatebox vp_input" />
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