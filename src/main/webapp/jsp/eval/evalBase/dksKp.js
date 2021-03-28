var dksstandarCombo;
var dksKpPage = {
    init:function() {
        dksstandarCombo =  coco.plugin.list.evalLevelList({
            listId: "dkLv",
            canEmpty: false,
            required: true,
            value:$("#dkLv").val()
        });
        if (!listDkEdit) {
            //设置input不可编辑
            $(".dksTr input").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            //设置textarea不可编辑
            $(".dksTr textarea").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            dksstandarCombo.setEnabled(false);
        }
    },
    changeKsLevel: function (data) {
        for (var x = 0; x < evalLevelList.length; x++) {
            var bean = evalLevelList[x];
            if (bean.beginScore <= data && bean.endScore >= data) {
                dksstandarCombo.setValue(bean.id);
                return;
            }
        }
    },
    calDkAddScore: function () {
        var jfnum = 0;
        $("input[id^=dksjf]").each(function (i) {
            jfnum = jfnum + $(this).val().toDouble();
        });
        $("#dkshejf").val(jfnum);
        return jfnum;
    },
    calDkDelScore: function () {
        var jfnum = 0;
        $("input[id^=dkfkskf]").each(function (i) {
            jfnum = jfnum + $(this).val().toDouble();
        });
        $("#dkshekf").val(jfnum);
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
                $("#dkFileView").html(content);
                $("#dkFileView").dialog({
                    title: "附件查看",
                    modal: true,
                    draggable: true,
                    closable: true,
                    cache: false,
                    buttons: [
                        {
                            text: '取消',
                            handler: function () {
                                $("#dkFileView").dialog("close");
                            }
                        }
                    ]
                });
            } else {
                coco.utils.msg.slideMsg(data.msg);
            }
        });
    },
    getZpInfo:function(){
        //var kskpdc=dksstandarCombo.getValue();
        //if(kskpdc==null||kskpdc==""){
        //    coco.utils.msg.alert("请选择科室考评等次");
        //    return;
        //}
        /*暂时不控制等级评语*/
        selfPage.makeTableZp("","dk","dkAdvice");
        $("#m_test").show();
        coco.page.dom.openIframeDialog({
            divId: "m_test", title: "大科评语模板", width: 600, height: 400,
            disable_close_button: true
        });
    }
}