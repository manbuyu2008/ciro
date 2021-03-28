var eventTypeCombo
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        eventTypeCombo = coco.plugin.combo.comboStatus({
            comboId:"eventType",
            canEmpty:false,
            required:true,
            value:$("#eventType").val()
        });
    },
    //返回列表
    list: function () {
        var status = $("#status").val();
        var data = $$json.stringify({status:"" + status,pageSize: "" + pageParam.pageSize, pageNumber: "" + pageParam.pageNumber, queryParams: $$json.stringify(pageParam.queryParams)});
        coco.page.model.list(data);
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
    }
});
