<%@ page import="cc.water.ciro.eval.enums.EvalFlowStatusEnum" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="huangxl">
<link rel="stylesheet" type="text/css" href="/resources/css/themes/sys/index.css"/>
<script type="text/javascript" src="/resources/js/themes/index/indexLook.js"></script>
<script type="text/javascript" src="/resources/js/themes/index/indexControl.js"></script>
</head>
<body class="easyui-layout">
<div region="north" border="true" class="cs-north">
    <div class="cs-north-bg">
        <div class="cs-north-logo">
            <div style="width:80px;display: inline;float:left; ">
                <img src="/resources/image/index/logo.jpg" width="80" height="55" align="middle"/>
            </div>
            <div style="display: inline;float:left;margin-top: 10px;">
                ${corpName}
                <span style="font-size: small;font-family: 'Adobe 楷体 Std R'">-内部管控评价系统</span>
            </div>
        </div>
        <ul class="ui-skin-nav">
            <li class="li-skinitem" title="bootstrap"><span class="bootstrap" rel="bootstrap"></span></li>
            <li class="li-skinitem" title="gray"><span class="gray" rel="gray"></span></li>
            <li class="li-skinitem" title="pepper-grinder"><span class="pepper-grinder" rel="pepper-grinder"></span>
            </li>
            <li class="li-skinitem" title="blue"><span class="blue" rel="blue"></span></li>
            <li class="li-skinitem" title="cupertino"><span class="cupertino" rel="cupertino"></span></li>
            <li class="li-skinitem" title="dark-hive"><span class="dark-hive" rel="dark-hive"></span></li>
            <li class="li-skinitem" title="sunny"><span class="sunny" rel="sunny"></span></li>
        </ul>
        <ul class="ui-skin-nav">
            <li class="head"><span>欢迎您:<font color="#dc143c">${activeUser.name}
            </font>[<font color="#d2691e">${activeUser.dept.name}
            </font>] <a id="editpass">修改密码</a> <a id="loginOut">安全退出</a></span></li>
        </ul>
    </div>
</div>
<div region="west" border="true" split="true" title="用户菜单" class="cs-west" collapsible="true">
    <div class="easyui-accordion" fit="true" border="false">
        <c:forEach items="${activeUser.menus}" var="menu">
            <div title="${menu.name}" id="lm${menu.id}">
                <ul>
                    <c:forEach items="${menu.subsetPermission}" var="sub">
                        <c:choose>
                            <c:when test="${not empty sub.url}">
                                <li id="z${sub.id }">
                                    <div class="">
                                        <a href="javascript:void(0);" src="<%=basePath%>${sub.url}" class="cs-navi-tab">
                                            <span class="icon ${sub.menuIcon }">&nbsp;</span>
                                            <span class="nav">${sub.name }</span></a>
                                    </div>
                                </li>
                            </c:when>
                        </c:choose>

                    </c:forEach>
                </ul>
            </div>
        </c:forEach>
    </div>
</div>
<div id="mainPanle" region="center" border="true" border="false">
    <div id="tabs" class="easyui-tabs" fit="true" border="false">
        <div title="首页">
            <div class="cs-home-remark">
                <shiro:hasRole name="normal">
                    <div id="self_wrapper" class="wrapper"
                         style="width: 49%;height:300px;float: left;margin-top: 10px;">
                        <div id="selfPanel" class="easyui-panel" title="个人自评">
                            <table id="tbListSelf"></table>
                        </div>
                    </div>
                </shiro:hasRole>
                <shiro:hasRole name="ks">
                    <div id="ks_wrapper" class="wrapper" style="width: 49%;height:300px;float: left;margin-top: 10px;">
                        <div id="ksPanel" class="easyui-panel" title="科室考评">
                            <table id="tbListKs"></table>
                        </div>
                    </div>
                </shiro:hasRole>
                <shiro:hasRole name="dk">
                    <div id="dks_wrapper" class="wrapper" style="width: 49%;height:300px;float: left;margin-top: 10px;">
                        <div id="dksPanel" class="easyui-panel" title="大科室考评">
                            <table id="tbListDks"></table>
                        </div>
                    </div>
                </shiro:hasRole>
                <shiro:hasRole name="dw">
                    <div id="dw_wrapper" class="wrapper" style="width: 49%;height:300px;float: left;margin-top: 10px;">
                        <div id="dwPanel" class="easyui-panel" title="单位考评">
                            <table id="tbListDw"></table>
                        </div>
                    </div>
                </shiro:hasRole>
            </div>
        </div>
    </div>
</div>
<div id="pwd_chg" icon="icon-list">
    <table cellpadding=3>
        <tr>
            <td>旧密码<font color="red">*</font> ：</td>
            <td><input type="password" id="txtOldPass" class="txt01" value=""/></td>
        </tr>
        <tr>
            <td>新密码<font color="red">*</font>：</td>
            <td><input type="password" id="txtNewPass" class="txt01" value=""/></td>
        </tr>
        <tr>
            <td>确认密码<font color="red">*</font>：</td>
            <td><input type="password" id="txtRePass" class="txt01" value=""/></td>
        </tr>
    </table>
</div>
<div region="south" border="false" class="cs-south">${copyRight}
</div>

<div id="mm" class="easyui-menu cs-tab-menu">
    <div id="mm-tabupdate">刷新</div>
    <div class="menu-sep"></div>
    <div id="mm-tabclose">关闭</div>
    <div id="mm-tabcloseother">关闭其他</div>
    <div id="mm-tabcloseall">关闭全部</div>
    <div class="menu-sep"></div>
    <div id="mm-tabcloseright">右侧关闭</div>
    <div id="mm-tabcloseleft">左侧关闭</div>
</div>
<script type="text/javascript">
    var bc_ks = <%=EvalFlowStatusEnum.KP_KS_SAVE.getValue()%>;
    var bc_dks = <%=EvalFlowStatusEnum.KP_DKS_SAVE.getValue()%>;
    var bc_dw = <%=EvalFlowStatusEnum.KP_DW_SAVE.getValue()%>;
</script>
</body>
</html>
