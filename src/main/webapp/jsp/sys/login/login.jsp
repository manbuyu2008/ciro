<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/jsp/sys/common/common.jsp" %>
<script type="text/javascript">
    var p = window.parent;
    if (p.parent && p != window) {
        while (p.parent && p.parent != p) {
            p = p.parent
        }
        p.location = "login.vm";
    }
    var pageParam = {
        sysName: "${platformName}",
        isLoginVerify:${useVerifyCode}
    };
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="huangxl">
<!-- CSS -->
<link rel="stylesheet" href="<%=CONTEXT_PATH%>/resources/css/themes/login/style.css">
<script type="text/javascript" src="<%=CONTEXT_PATH%>/resources/js/jquery/jquery.cookie.js"></script>
<script src="<%=CONTEXT_PATH%>/jsp/sys/login/login.js"></script>
</head>
<body>
<div class="login">
    <div class="login-top">
        <%--<h1>用户登录</h1>--%>
        <h1>${platformName}</h1>
        <form>
            <input type="text" id="code" name="code" class="code" required="true"
                   value="请输入用户帐号"
                   onfocus="if (this.value == ''||this.value=='请输入用户帐号')this.value = '';"
                   onblur="if (this.value == '') {this.value = '请输入用户帐号';}">
            <input type="password" id="pwd" name="pwd" class="pwd" required="true"
                   value="请输入密码"
                   onfocus="this.value = '';"
                   onblur="if (this.value == '') {this.value = '请输入密码';}">
            <c:choose>
                <c:when test="${useVerifyCode}">
                    <input type="text" id="verifyCode" name="verifyCode" required="true" class="verifyCode"
                           maxlength="4"
                           value="请输入验证码" onfocus="this.value = '';"
                           onblur="if (this.value == '') {this.value = '请输入验证码';}">
                    <img img alt="验证码"
                         id="imgVerifyCode" src="verifyCode.vm"
                         title="看不清?，点击更换"
                         onclick="$('#imgVerifyCode').attr('src', 'verifyCode.vm?t=' + Math.random())"/>
                </c:when>
            </c:choose>
            <div class="forgot">
                <input type="v_submit" value="  登录" onclick="v_login.doLogin()" align="center" readonly="readonly">
                <input type="reset" value="重置">
            </div>
        </form>
    </div>
    <div class="login-bottom">
        <h3>为了你更好的使用 我们在不懈努力</h3>
    </div>
</div>
</body>
<script type="text/javascript">
    var pageParam = $.extend({
        CONTEXT_PATH: '<%=CONTEXT_PATH%>'
    }, pageParam || {});
</script>
</html>

