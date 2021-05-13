$(function() {
    var themes = {
        'gray' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/gray/easyui.css',
        'pepper-grinder' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/pepper-grinder/easyui.css',
        'blue' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/default/easyui.css',
        'cupertino' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/cupertino/easyui.css',
        'dark-hive' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/dark-hive/easyui.css',
        'bootstrap' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/bootstrap/easyui.css',
        'sunny' : pageParam.CONTEXT_PATH+'/resources/css/themes/sys/sunny/easyui.css'
    };
    //if(getCookie('cs-skin')) {
    //    var skin = getCookie('cs-skin');
    if(coco.options.skin!="") {
        var skin = coco.options.skin;
       $('#swicth-style').attr('href', themes[skin]);
        $this = $('.li-skinitem span[rel='+skin+']');
        $this.addClass('cs-skin-on');
        skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
        skin == 'dark-hive' ? $('.p_td_lbl').css('color', '#FFFFFF') : $('.p_td_lbl').css('color', '#000000');
    }
});
function setCookie(name,value) {//两个参数，一个是cookie的名子，一个是值
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {//取cookies函数        
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
