var shTypeCombo,evalLevelList;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        //考评阶段
        shTypeCombo = coco.plugin.combo.shType({
            comboId: "status",
            panelWidth: 400,
            canEmpty: false,
            required: true
        });

        evalLevelList = coco.plugin.list.evalLevelList({
            listId: "did",
            panelWidth: 400,
            canEmpty: false,
            required: true,
            value: $("#did").val()
        });
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
    }
});
