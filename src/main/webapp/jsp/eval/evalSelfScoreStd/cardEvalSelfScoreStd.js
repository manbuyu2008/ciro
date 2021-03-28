var evalTypeCombo;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        evalTypeCombo = coco.plugin.list.evalTypeList({
            listId: "userTypeId",
            panelWidth: 400,
            required: true,
            canEmpty: false
        });
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
    }
});
