/**
 * Created by hxl at 2012-08-13 17:50:35
 */
var zqCombo, corpTree;
page = $.extend(page, {
    pageHeight:80,
    _init:function () {
        zqCombo = coco.plugin.list.evalZqList({
            listId:"zq",
            canEmpty:false,
            required:true,
            status:'END',
            value:$("#zq").val(),
            onChange:function (data) {
                var url = "reportDwSum.vm?periodId=" + data + "&t=" + Math.random();
                window.location.href = url;
            }
        });
    },
    print: function () {
        var periodId = zqCombo.getValue();
        if(periodId==""){
            coco.utils.msg.slideError("打印失败：请选择考评周期！");
            return;
        }
        var href = "/eval/report/reportDwSumPrint.vm?periodId=" + periodId + "&t=" + Math.random();
        window.parent.addTab("考评结果表打印", href);
    }
});