var flowCombo;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        flowCombo = coco.plugin.list.evalFlowList({
            listId: "flowId",
            panelWidth: 400,
            required: true,
            canEmpty: false
        });
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#typeCode").val(data["typeCode"]);
        $("#typeName").val(data["typeName"]);
    }
});
