var ksKpPage, dksKpPage, dwKpPage;
page = $.extend(page, {
    removeTr: function (obj) {
        $("#dwTr_" + obj).remove();
        dwKpPage.calDwLevel();
    },
    pageHeight: 600,
    isInKsJf: function (data) {
        for (var x = 0; x < evalLevelList.length; x++) {
            var bean = evalLevelList[x];
            if (bean.begin <= data && bean.end >= data) {
                if (standarCombo.getValue() == null || standarCombo.getValue() == "") standarCombo.setValue(bean.id);
                return;
            }
        }
    },
    _init: function () {
        headPage.init();
        selfPage.init();
        if (ksKpPage) {
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
            $("#save").hide();
            $("#submit").hide();
            $("#reject").hide();
            if($("#zqStatus").val()!="END"){
                $("#cancel").show();
            }
        } else {
            $("#cancel").hide();
            dwKpPage.calDwLevel();
        }
    },
    resultDwScore: function () {
        $("#dkScore").val(initScore + $("#dkshejf").val().toDouble() - $("#dkshekf").val().toDouble());
        dksKpPage.changeKsLevel($("#dkScore").val())
    },
    //取回
    cancel:function() {
        var param = {
            id: $("#id").val(),
            actionType: "cancel"
        };
        $.post("customDw.vm", param,
            function(data) {
                if (!data.state) {
                    coco.utils.msg.slideError(data.msg)
                } else {
                    coco.utils.msg.slideMsg("操作成功");
                    page.listEx();
                }
            }, "json");
    },
    //保存
    saveHandle: function (isAdd) {
        if (isAdd) {
            $("#status").val(tj);
            coco.page.model.saveEx("form", function (success, data) {
                if (!success) return;
                page.listEx();
            });
        } else {
            $("#status").val(bc);
            coco.page.model.save("form", function (success, data) {
                if (!success) return;
            });
        }
    },
    //保存
    saveHandle: function (isAdd) {
        if (isAdd) {
            $("#status").val(tj);
            coco.page.model.saveEx("saveDw.vm", "form", function (success, data) {
                if (!success) return;
                page.listEx();
            });
        } else {
            $("#status").val(bc);
            coco.page.model.saveEx("saveDw.vm", "form", function (success, data) {
                if (!success) return;
                if (page.loadData && data.bean) page.loadData(data.bean);
            });
        }
    },
    //列表
    listEx: function () {
        var data = $$json.stringify({
            pageSize: "" + pageParam.pageSize,
            pageNumber: "" + pageParam.pageNumber,
            queryParams: $$json.stringify(pageParam.queryParams)
        });
        if (typeof data != 'string') data = $$json.stringify(data);
        var s = "listDw.vm?t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    }
    ,
//保存校验
    checkValid: function () {
        return true;
    },
    print: function () {
        var value = $("#id").val();
        var href = "/eval/evalBaseInfo/print.vm?id=" + value + "&t=" + Math.random();
        window.parent.addTab("人员考评明细打印", href);
    },
    reject: function () {
        coco.utils.msg.confirm("是否确认驳回考评？", function (data) {
            if (data) {
                var param = {
                    id: $("#id").val(),
                    actionType: "reject"
                };
                $.post("customDw.vm", param,
                    function (data) {
                        if (!data.state) {
                            coco.utils.msg.slideError(data.msg)
                        } else {
                            coco.utils.msg.slideMsg("驳回成功");
                            page.listEx();
                        }
                    }, "json");
            }
        });
    }
})
