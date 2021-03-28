<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<script type="text/javascript"
        src="/jsp/eval/evalBase/head.js"></script>
<style type="text/css">
    .vp_input_100_100 {
        width: 90%;
        height: 100%;
        border: 0;
    }

    .mask {
        height: 100%;
        width: 98%;
        position: absolute;
        _position: absolute;
        top: 35px;
        z-index: 2000;
    }

    .opacity {
        opacity: 0.3;
        filter: alpha(opacity = 30);
        background-color: #E0ECFF;
    }
</style>
<tr>
    <td colspan="13" style="padding-bottom:10px;">
        <span style="font-size: 28px;font-weight:bold;">${corpName}医德医风考评表</span><br/> <br/>
        <label>(${evalZq.name})</label>
        <input type="hidden" id="periodId" name="periodId"  value="${evalZq.id}"/>
    </td>
</tr>
<tr>
    <td colspan="2" width="7%">科室</td>
    <td colspan="2" width="12%">
        <input type="text" id="ks" name="ks"
               class="vp_input_100_100" required="true"      disabled="disabled"
               value="${bean.ks}"/></td>
    <td width="6%">人员</td>
    <td width="15%">
        <input type="text" id="userId" name="userId"    disabled="disabled"
               class="vp_input_100_100" style="height: 100%" required="true"
               value="${bean.userId}"/>
    </td>
    <td width="7%">性别</td>
    <td width="6%">
        <input type="text" id="sex" name="sex"     readonly="readonly"     disabled="disabled"
               class="vp_input_100_100 easyui-validatebox" value="${bean.sex}"/></td>
    <td width="6%">年龄</td>
    <td width="8%">
        <input type="text" id="nl" name="nl"   readonly="readonly"
               class="vp_input_100_100 easyui-numberbox" max="150" min="1" value="${bean.nl}"/></td>
    <td width="8%">职称</td>
    <td colspan="2">
        <input type="text" id="zc" name="zc"     readonly="readonly"     disabled="disabled"
               class="vp_input_100_100 easyui-validatebox" required="true"
               value="${bean.zc}"/></td>
</tr>
<script type="text/javascript">
    var head = "";
</script>