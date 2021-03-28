/**
 * Created by denglw at 2012-07-04 13:21:54
 * 实体【个人自评(F_YDKP_GWZP)】的卡片页面js
 */
var i = 0;
var ksKpPage, dksKpPage, dwKpPage;
page = $.extend(page, {
    pageHeight: 400,
    _init: function () {
        $('#dd').dialog({
            modal: true
        });
        $('#dd').dialog("close");
        headPage.init();
        selfPage.init();
        if (ksKpPage){
            ksKpPage.init();
            ksKpPage.calKsAddScore();
            ksKpPage.calKsDelScore();
        }
        if (dksKpPage) {
            dksKpPage.init();
            dksKpPage.calDkAddScore();
            dksKpPage.calDkDelScore();
        }
        if (dwKpPage) {
            dwKpPage.init();
        }
        if (!isEdit) {
            $("#del").hide();
            $("#save").hide();
            $("#submit").hide();
        }
    },
    //保存
    saveHandle: function (isAdd) {
        if (isAdd) {
            $("#status").val(tj);
            coco.page.model.saveEx("saveSelf.vm", "form", function (success, data) {
                if (!success) return;
                page.listEx();
            });
        } else {
            $("#status").val(bc);
            coco.page.model.saveEx("saveSelf.vm", "form", function (success, data) {
                if (!success) return;
                if (page.loadData && data.bean) page.loadData(data.bean);
            });
        }
    },
    //从json对象给页面输入框赋值
    loadData: function (data) {
        $("#id").val(data["id"]);
    },
    //删除
    delHandle: function () {
        coco.page.model.delEx("delSelf.vm", $("#id").val(), function (success) {
            if (success)  page.listEx();
        });
    },
    //列表
    listEx: function () {
        var data = $$json.stringify({
            pageSize: "" + pageParam.pageSize,
            pageNumber: "" + pageParam.pageNumber,
            queryParams: $$json.stringify(pageParam.queryParams)
        });
        if (typeof data != 'string') data = $$json.stringify(data);
        var s = "listSelf.vm?t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },
    //保存校验
    checkValid: function () {
        return true;
    }
});
