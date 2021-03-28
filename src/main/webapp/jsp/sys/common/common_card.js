$(function () {
    init();
    if (page._init) page._init();
    $('body').form('validate');
    window.checkValid = page.checkValid;
    sys_loaded();
});

function init() {

}
var page = {
    hasDetail: false, //是否有明细
    //增加
    add: function () {
        var data = $.extend({
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber
        }, pageParam.queryParams);
        coco.page.model.card("", data);
    },

    //删除
    del: function () {
        coco.page.model.del($("#id").val(), function (success) {
            if (success) page.list();
        });
    },

    //保存 (isAdd=true,保存并新增)
    save: function (isAdd) {
        coco.page.model.save("form", function (success, data) {
            if (!success) return;
            page.afterSave(data, isAdd);
        }, pageParam.hasList);

    },
    //默认的保存后事件
    defaultAfterSave: function (data, isAdd) {
        if (isAdd) page.add();
        else {
            if (page.loadData && data.bean) page.loadData(data.bean);
        }
    },
    //提交后事件
    afterSave: function (data, isAdd) {
        page.defaultAfterSave(data, isAdd);
    },
    //返回列表
    list: function () {
        var data = $$json.stringify({pageSize: "" + pageParam.pageSize, pageNumber: "" + pageParam.pageNumber, queryParams: $$json.stringify(pageParam.queryParams)});
        coco.page.model.list(data);
    },
    getId: function () {
        return $("#id").val();
    },
    //设置url中参数值
    setParam: function (param, value) {
        var query = location.search.substring(1);
        var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");
        if (p.test(query)) {
            //query = query.replace(p,"$1="+value);
            var firstParam = query.split(param)[0];
            var secondParam = query.split(param)[1];
            if (secondParam.indexOf("&") > -1) {
                var lastPraam = secondParam.split("&")[1];
                return  '?' + firstParam + '&' + param + '=' + value + '&' + lastPraam;
            } else {
                if (firstParam) {
                    return '?' + firstParam + '&' + param + '=' + value;
                } else {
                    return '?' + param + '=' + value;
                }
            }
        } else {
            if (query == '') {
                return '?' + param + '=' + value;
            } else {
                return '?' + query + '&' + param + '=' + value;
            }
        }
    }
};