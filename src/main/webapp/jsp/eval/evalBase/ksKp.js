var standarCombo;
var ksKpPage = {
    init: function () {
        //科室考核等级
        standarCombo = coco.plugin.list.evalLevelList({
            listId: "ksLv",
            canEmpty: false,
            required: true,
            value:$("#ksLv").val()
        });
        if (!listKsEdit) {
            //设置input不可编辑
            $(".ksTr input").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            //设置textarea不可编辑
            $(".ksTr textarea").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            standarCombo.setEnabled(false);
        }
    },
    calKsAddScore: function () {
        var jfnum = 0;
        $("input[id^=ksjf]").each(function (i) {
            jfnum = jfnum + $(this).val().toDouble();
        });
        $("#kshejf").val(jfnum);
        return jfnum;
    },
    calKsDelScore: function () {
        var jfnum = 0;
        $("input[id^=kfkskf]").each(function (i) {
            jfnum = jfnum + $(this).val().toDouble();
        });
        $("#kshekf").val(jfnum);
        return jfnum;
    },
    fileView: function (eventId) {
        coco.utils.ajaxPostData("custom.vm?actionType=fileView", {eventId: eventId}, function (data) {
            if (data.state) {
                var content = "";
                for (var x = 0; x < data.list.length; x++) {
                    var bean = data.list[x];
                    var size = Math.ceil(bean.fileSize / 1024);
                    var detail = "        <div style=\"margin-top: 8px;\">" +
                        "<span class=\"fileName\" style=\"color:blue\">" + bean.name + "(" + size + "KB)</span><span class=\"data\">" +
                        "<a target=\"_blank\"  href=\"/front/file/fileDown.vm?fileId="+bean.id+ "\""+
                    "style=\"color:red;font-family:楷体;font-size:14px;\">[下载]</a></span></div>"
                    content = content + detail;
                }
                $("#ksFileView").html(content);
                $("#ksFileView").dialog({
                    title: "附件查看",
                    modal: true,
                    draggable: true,
                    closable: true,
                    cache: false,
                    buttons: [
                        {
                            text: '取消',
                            handler: function () {
                                $("#ksFileView").dialog("close");
                            }
                        }
                    ]
                });
            } else {
                coco.utils.msg.slideMsg(data.msg);
            }
        });
    },
    changeKsLevel: function (data) {
        for (var x = 0; x < evalLevelList.length; x++) {
            var bean = evalLevelList[x];
            if (bean.beginScore <= data && bean.endScore >= data) {
                standarCombo.setValue(bean.id);
                return;
            }
        }
    },
    getZpInfo: function () {
        /*暂时不控制等级评语*/
        selfPage.makeTableZp("","ks","ksAdvice");
        $("#m_test").show();
        coco.page.dom.openIframeDialog({
            divId: "m_test", title: "科室评语模板", width: 600, height: 400,
            disable_close_button: true
        });
    }
}