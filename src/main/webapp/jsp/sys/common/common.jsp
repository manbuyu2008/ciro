<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
    if (request.getProtocol().compareTo("HTTP/1.0") == 0)
        response.setHeader("Pragma", "no-cache,");
    if (request.getProtocol().compareTo("HTTP/1.1") == 0)
        response.setHeader("Cache-Control", "no-cache");
    String CONTEXT_PATH = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + CONTEXT_PATH + "/";
    String jsessionid = request.getSession().getId();
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="copyright" content="版权归COCO所有">
    <title>${platformName}</title>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/css/easyui/tooltip.css">
    <script type="text/javascript">
        document.write("<div id='loading' style='position:absolute;left:0;width:100%;height:100%;top:0;background:#E0ECFF;z-index: 9999'>\
         <div class='panel-loading' id='vp_loading'><span style='color:darkcyan;font-size: 18px'>正在加载页面，请稍候...</span></div></div>");
        setTimeout(function () {
            var _mask = $('#vp_loading');
            if (_mask.length == 0) return;
            _mask.removeClass("vp_loading");
            _mask.addClass("vp_txt_12");
            _mask.html("页面加载超时。请<a  onclick='window.location.reload()'>刷新</a>重试。 ");
        }, 15000);

        function sys_loaded(notParseEle) {
            var _mask = document.getElementById('loading');
            if (_mask) {
                _mask.parentNode.removeChild(_mask);
            }
        }
    </script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/jquery/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/easyui/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/easyui/jquery.easyui.src.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/coco/coco.src.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/coco/coco.plugin.tree.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/coco/coco.plugin.list.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/coco/coco.plugin.combo.js"></script>
    <link rel="stylesheet" href="<%=CONTEXT_PATH%>/resources/css/common.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/css/themes/sys/default.css"/>
<%--    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/js/uploadify/uploadify.css">--%>
<%--    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/uploadify/jquery.uploadify.js"></script>--%>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/js/uploadify/uploadifive.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/uploadify/jquery.uploadifive.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/css/themes/sys/bootstrap/easyui.css"
          id="swicth-style"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>/resources/css/themes/sys/icon.css"/>
    <script type="text/javascript">
        var  CONTEXT_PATH = "<%=CONTEXT_PATH%>";
        coco.options = {
            contextPath: '<%=CONTEXT_PATH%>', //应
            skin: '${skin}', //皮肤
            emptyValue: '0',
            isEmpty: function (str) {
                if (coco.utils.str.isEmptyStr(str)) return true;
                return false;
            }
        };
        var pageParam = $.extend({
            CONTEXT_PATH: '<%=CONTEXT_PATH%>'
        }, pageParam || {});
    </script>