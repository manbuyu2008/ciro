<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="huangxl">
<link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/css/themes/sys/index.css"/>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/index/indexLook.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/themes/index/indexControl.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/build/theme/roma.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/build/dist/echarts.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/build/Echart.js"></script>
</head>
<body class="easyui-layout">
<div region="north" border="true" class="cs-north">
    <div class="cs-north-bg">
        <div class="cs-north-logo">
            <div style="width:80px;display: inline;float:left; ">
                <img src="<%=CONTEXT_PATH%>/resources/image/index/logo.jpg" width="80" height="55" align="middle"/>
            </div>
            <div style="display: inline;float:left;margin-top: 10px;">
                ${corpName}
                <span style="font-size: small;font-family: 'Adobe 楷体 Std R'">-医德医风考评系统</span>
            </div>
        </div>
        <ul class="ui-skin-nav">
            <li class="li-skinitem" title="gray"><span class="gray" rel="gray"></span></li>
            <li class="li-skinitem" title="pepper-grinder"><span class="pepper-grinder" rel="pepper-grinder"></span>
            </li>
            <li class="li-skinitem" title="blue"><span class="blue" rel="blue"></span></li>
            <li class="li-skinitem" title="cupertino"><span class="cupertino" rel="cupertino"></span></li>
            <li class="li-skinitem" title="dark-hive"><span class="dark-hive" rel="dark-hive"></span></li>
            <li class="li-skinitem" title="sunny"><span class="sunny" rel="sunny"></span></li>
            <li class="li-skinitem" title="bootstrap"><span class="bootstrap" rel="bootstrap"></span></li>
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
        <%--<div title="系统管理">--%>
        <%--<ul>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="sys/dept/Dept/list" class="cs-navi-tab">--%>
        <%--<span class="icon icon-nav">&nbsp;</span>--%>
        <%--<span class="nav">部门管理</span></a>--%>
        <%--</div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="sys/user/User/list" class="cs-navi-tab">--%>
        <%--<span class="icon icon-users">&nbsp;</span>--%>
        <%--<span class="nav">用户管理</span>--%>
        <%--</a>--%>
        <%--</div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="sys/menu/Menu/list" class="cs-navi-tab">--%>
        <%--<span class="icon icon-users">&nbsp;</span>--%>
        <%--<span class="nav">菜单管理</span>--%>
        <%--</a>--%>
        <%--</div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="demo/easyloader.html" class="cs-navi-tab">--%>
        <%--<span class="icon icon-role">&nbsp;</span>--%>
        <%--<span class="nav">角色管理</span></a></div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="demo/easyloader.html" class="cs-navi-tab">--%>
        <%--<span class="icon icon-set">&nbsp;</span>--%>
        <%--<span class="nav">权限设置</span></a></div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="">--%>
        <%--<a href="javascript:void(0);" src="demo/easyloader.html" class="cs-navi-tab">--%>
        <%--<span class="icon icon-log">&nbsp;</span>--%>
        <%--<span class="nav">系统日志</span></a>--%>
        <%--</div>--%>
        <%--</li>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div title="Layout">--%>
        <%--<a href="javascript:void(0);" src="demo/accordion.html" class="cs-navi-tab">accordion</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/layout.html" class="cs-navi-tab">layout</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/layout1.html" class="cs-navi-tab">layout1</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/layout2.html" class="cs-navi-tab">layout2</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/panel.html" class="cs-navi-tab">panel</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/panel2.html" class="cs-navi-tab">panel1</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/tabs.html" class="cs-navi-tab">tabs</a></p>--%>
        <%--</div>--%>
        <%--<div title="Menu and ButtonBean">--%>
        <%--<a href="javascript:void(0);" src="demo/menu.html" class="cs-navi-tab">menu</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/menubutton.html" class="cs-navi-tab">menubutton</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/linkbutton.html" class="cs-navi-tab">linkbutton</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/splitbutton.html" class="cs-navi-tab">splitbutton</a></p>--%>
        <%--</div>--%>
        <%--<div title="Form">--%>
        <%--<a href="javascript:void(0);" src="demo/form.html" class="cs-navi-tab">form</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/validatebox.html" class="cs-navi-tab">validatebox</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/combo.html" class="cs-navi-tab">combo</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/combobox.html" class="cs-navi-tab">combobox</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/combotree.html" class="cs-navi-tab">combotree</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/combogrid.html" class="cs-navi-tab">combogrid</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/numberbox.html" class="cs-navi-tab">numberbox</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/numberbox2.html" class="cs-navi-tab">numberbox1</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/datebox.html" class="cs-navi-tab">datebox</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/datetimebox.html" class="cs-navi-tab">datetimebox</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/calendar.html" class="cs-navi-tab">calendar</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/timespinner.html" class="cs-navi-tab">timespinner</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/numberspinner.html"--%>
        <%--class="cs-navi-tab">numberspinner</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/slider.html" class="cs-navi-tab">slider</a></p>--%>
        <%--</div>--%>
        <%--<div title="Window">--%>
        <%--<a href="javascript:void(0);" src="demo/window.html" class="cs-navi-tab">window</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/dialog.html" class="cs-navi-tab">dialog</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/messager.html" class="cs-navi-tab">messager</a></p>--%>
        <%--</div>--%>
        <%--<div title="DataGrid and Tree">--%>
        <%--<a href="javascript:void(0);" src="demo/datagrid.html" class="cs-navi-tab">datagrid</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/propertygrid.html" class="cs-navi-tab">propertygrid</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/tree.html" class="cs-navi-tab">tree</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/tree2.html" class="cs-navi-tab">tree1</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/treegrid.html" class="cs-navi-tab">treegrid</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/treegrid2.html" class="cs-navi-tab">treegrid1</a></p>--%>
        <%--<a href="javascript:void(0);" src="demo/treegrid3.html" class="cs-navi-tab">treegrid2</a></p>--%>
        <%--</div>--%>
    </div>
</div>
<div id="mainPanle" region="center" border="true" border="false">
    <div id="tabs" class="easyui-tabs" fit="true" border="false">
        <div title="首页">
            <div class="cs-home-remark">
                <h1>jQuery EasyUI 1.3.0 Demo</h1> <br>
                制作：黄兴良 <br>
                博客：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a><br>
                说明：jQuery EasyUI 1.3.0 Demo分类整理。
                <input type="text" id="userId" name="userId" class="easyui-validatebox" value=""
                       validType="validName['人员',false,100]"/>

                <input type="text" id="dept" name="dept" class="coco_input"/>

                <input type="text" id="adminDept" name="adminDept" class="coco_input"/>
                <%--<div id="div1" style="width:900px;height:400px;border:1px solid #dddddd;margin:10px auto;"></div>--%>
                <div id="echart" style="width:100%; height:300px;"></div>
                <div id="echart_zzt1" style="width:100%; height:300px;"></div>
                <div id="echart_zzt2" style="width:100%; height:300px;"></div>
                <div id="echart_zzt3" style="width:80%; height:500px;"></div>
                <script type="text/javascript">
                    /*饼图*/
                    var data = [{name: '张三', value: 50}, {name: '李四', value: 120}, {name: '王五', value: 220}];
                    var title = {
                        text: '人员积分图',
                        subtext: '纯属虚构',
                        x: 'center'
                    };
                    var option = ECharts.ChartOptionTemplates.Pie(title, data, "人员积分图");

                    var container = $("#echart")[0];

                    opt = ECharts.ChartConfig(container, option);

                    ECharts.Charts.RenderChart(opt);

                    /*柱状图*/
                    var data = [{name: '2014-01', value: 20, group: '预售量'}, {
                        name: '2014-01',
                        value: 40,
                        group: '实际销售量'
                    }, {name: '2014-02', value: 30, group: '预售量'}, {
                        name: '2014-02',
                        value: 10,
                        group: '实际销售量'
                    }, {name: '2014-03', value: 200, group: '预售量'}, {
                        name: '2014-03',
                        value: 60,
                        group: '实际销售量'
                    }, {name: '2014-04', value: 50, group: '预售量'}, {
                        name: '2014-04',
                        value: 45,
                        group: '实际销售量'
                    }, {name: '2014-05', value: 110, group: '预售量'}, {
                        name: '2014-05',
                        value: 80,
                        group: '实际销售量'
                    }, {name: '2014-06', value: 90, group: '预售量'}, {name: '2014-06', value: 60, group: '实际销售量'}];

                    var title = {
                        text: '销售日期分布图',
                        subtext: '纯属虚构'
                    };
                    var option = ECharts.ChartOptionTemplates.Bars(title, data);

                    var container = $("#echart_zzt1")[0];

                    opt = ECharts.ChartConfig(container, option);

                    ECharts.Charts.RenderChart(opt);


                    /*折线图*/
                    var option = ECharts.ChartOptionTemplates.Lines(title,data,'lines',false);

                    var container = $("#echart_zzt2")[0];

                    opt = ECharts.ChartConfig(container, option);

                    ECharts.Charts.RenderChart(opt);

                    /*中国地图*/
                    var data = [
                        {group:"北京",name: '北京',value: Math.round(Math.random()*1000)},
                        {group:"天津",name: '天津',value: Math.round(Math.random()*1000)},
                        {group:"苹果1",name: '上海',value: Math.round(Math.random()*1000)},
                        {group:"苹果5",name: '重庆',value: Math.round(Math.random()*1000)},
                        {group:"苹果3",name: '河北',value: Math.round(Math.random()*1000)},
                        {group:"苹果1",name: '河南',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '云南',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '辽宁',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '湖南',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '安徽',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '山东',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '新疆',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '江苏',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '浙江',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '江西',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '湖北',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '广西',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '甘肃',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '山西',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '陕西',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '吉林',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '福建',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '贵州',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '广东',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '青海',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '西藏',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '四川',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '宁夏',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '海南',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '台湾',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '香港',value: Math.round(Math.random()*1000)},
                        {group:"苹果7",name: '澳门',value: Math.round(Math.random()*1000)}
                    ];
                    var option = ECharts.ChartOptionTemplates.Maps(title,data);

                    var container = $("#echart_zzt3")[0];

                    opt = ECharts.ChartConfig(container, option);

                    ECharts.Charts.RenderChart(opt);

                    //                    var data = [{ name: '2014-01', value: 20, group:'预售量' }, { name: '2014-01', value: 40, group:'实际销售量' }, { name: '2014-02', value: 30, group:'预售量' }, { name: '2014-02', value: 10, group:'实际销售量' }, { name: '2014-03', value: 200, group:'预售量' }, { name: '2014-03', value: 60, group:'实际销售量' }, { name: '2014-04', value: 50, group:'预售量' }, { name: '2014-04', value: 45, group:'实际销售量' }, { name: '2014-05', value: 110, group:'预售量' }, { name: '2014-05', value: 80, group:'实际销售量' }, { name: '2014-06', value: 90, group:'预售量' }, { name: '2014-06', value: 60, group:'实际销售量'}];
                    //
                    //                    var option = ECharts.ChartOptionTemplates.Lines(data,'lines',false);
                    //
                    //                    var container = $("#echart_zzt1")[0];
                    //
                    //                    opt = ECharts.ChartConfig(container, option);
                    //
                    //                    ECharts.Charts.RenderChart(opt);
                    //
                    //
                    //
                    //                    var option = ECharts.ChartOptionTemplates.Lines(data, 'lines', true);
                    //
                    //                    var container = $("#echart_zzt2")[0];
                    //
                    //                    opt = ECharts.ChartConfig(container, option);
                    //
                    //                    ECharts.Charts.RenderChart(opt);


                    //                                var data_zzt2 = [{ name: '2014-01', value: 20, group:'预售量' }, { name: '2014-01', value: 40, group:'实际销售量' }, { name: '2014-02', value: 30, group:'预售量' }, { name: '2014-02', value: 10, group:'实际销售量' }, { name: '2014-03', value: 200, group:'预售量' }, { name: '2014-03', value: 60, group:'实际销售量' }, { name: '2014-04', value: 50, group:'预售量' }, { name: '2014-04', value: 45, group:'实际销售量' }, { name: '2014-05', value: 110, group:'预售量' }, { name: '2014-05', value: 80, group:'实际销售量' }, { name: '2014-06', value: 90, group:'预售量' }, { name: '2014-06', value: 60, group:'实际销售量'}];
                    //
                    //                                var option_zzt2 = ECharts.ChartOptionTemplates.Bars({},data_zzt2,'Love');
                    //
                    //                                var container_zzt2 = $("#echart_zzt2")[0];
                    //
                    //                                var opt_zzt2 = ECharts.ChartConfig(container_zzt2, option_zzt2);
                    //
                    //                                ECharts.Charts.RenderChart(opt_zzt2);
                    ////
                    //
                    //                                var option_zzt3 = ECharts.ChartOptionTemplates.Bars({},data_zzt2, 'Love', true);
                    //
                    //                                var container_zzt3 = $("#echart_zzt3")[0];
                    //
                    //                                var opt_zzt3 = ECharts.ChartConfig(container_zzt3, option_zzt3);
                    //
                    //                                ECharts.Charts.RenderChart(opt_zzt3);


                </script>
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

</body>
</html>
