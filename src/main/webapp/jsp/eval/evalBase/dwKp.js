var dwkhdcstandarCombo;
var dwKpPage = {
    init:function(){
          dwkhdcstandarCombo = coco.plugin.list.evalLevelList({
            listId: "corpLv",
            canEmpty: false,
              required: true,
              value:$("#corpLv").val()
        });
        if (!listDwEdit) {
            //设置input不可编辑
            $(".dwTr input").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            //设置textarea不可编辑
            $(".dwTr textarea").each(function () {
                $(this).attr("readonly", "readonly");
                $(this).attr("disabled", "disabled");
            });
            dwkhdcstandarCombo.setEnabled(false);
        }
    } ,
    changeKsLevel: function (data) {
        for (var x = 0; x < evalLevelList.length; x++) {
            var bean = evalLevelList[x];
            if (bean.beginScore <= data && bean.endScore >= data) {
                dwkhdcstandarCombo.setValue(bean.id);
                return;
            }
        }
    },
    calDwLevel: function () {
        var dwnum = 0;
        $("input[id^=dwid]").each(function (i) {
            dwnum = dwnum + 1;
        });
        if(dwnum>0){
            dwkhdcstandarCombo.setValue(jcId);
            dwkhdcstandarCombo.setEnabled(false);
        }else{
            dwKpPage.changeKsLevel($("#corpScore").val());
            dwkhdcstandarCombo.setEnabled(true);
        }
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
                $("#dwFileView").html(content);
                $("#dwFileView").dialog({
                    title: "附件查看",
                    modal: true,
                    draggable: true,
                    closable: true,
                    cache: false,
                    buttons: [
                        {
                            text: '取消',
                            handler: function () {
                                $("#dwFileView").dialog("close");
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
        //var kskpdc=dwkhdcstandarCombo.getValue();
        //if(kskpdc==null||kskpdc==""){
        //    coco.utils.msg.alert("请选择科室考评等次");
        //    return;
        //}
        /*暂时不控制等级评语*/
        selfPage.makeTableZp("","dw","corpAdvice");
        $("#m_test").show();
        coco.page.dom.openIframeDialog({
            divId: "m_test", title: "单位评语模板", width: 600, height: 400,
            disable_close_button: true
        });
    }
}