var v_login = {
    doLogin: function () {
        function __login() {
            var _code = $("#code");
            var code = _code.val().trim(), pwd = "", verifyCode = "";
            if (code == "" || code == '请输入用户帐号') {
                _code.focus();
                alert("请输入账号。");
                return;
            }
            var _pwd = $("#pwd");
            pwd = _pwd.val();
            if (pwd == "" || pwd == '请输入密码') {
                _pwd.focus();
                alert("请输入密码。");
                return;
            }
            if (pageParam.isLoginVerify) {
                var _verifyCode = $("#verifyCode");
                verifyCode = _verifyCode.val();
                if (verifyCode == "" || verifyCode == '请输入验证码') {
                    _verifyCode.focus();
                    alert("请输入验证码。");
                    return;
                }
            }
            coco.page.model.login({
                userCode: code, pwd: pwd, verifyCode: verifyCode
            }, function (state, result, msg) {
                if (state) {
                    $.cookie("loginCode", code);// 一周
                    window.location = "/admin/index.vm";
                } else {
                    $('#imgVerifyCode').attr('src', 'verifyCode.vm?t=' + Math.random());
                    var focusId;
                    if (result == "user") {
                        focusId = "code";
                    } else if (result == "pwd") {
                        focusId = "pwd";
                    } else {
                        focusId = "verifyCode";
                    }
                    coco.page.dom.focusSel(focusId);
                    alert(msg);
                    return;
                }
            });
        }

        coco.utils.msg.showWait("正在登录，请稍候...", __login);
    }
};

$(function () {
    var s;
    var comboWidth = 180;
    if (!$.browser.msie) comboWidth += 6;
    $('#code').val($.cookie("loginCode"));
    var code = $('#code').val();
    if (code == "" || code == '请输入用户帐号') {
        coco.page.dom.focusSel('code');
    } else {
        coco.page.dom.focusSel('pwd');
    }
    $.hotkeys.bindHotkey('enter', function (evt) {
        v_login.doLogin();
    });
    $.hotkeys.bindCallback("enter", function (event) {
        var id = event.target.id;
        if (id == "verifyCode" || id == "btnLogin") {
            v_login.doLogin();
            return false;
        }
        return true;
    });
    sys_loaded();
});