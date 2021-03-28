page = $.extend(page, {
    _init: function () {
        $("#dataLevel").combobox({
            valueField:'id',
            textField:'text',
            data: pageParam.dataLevel
        });
        $('#form').form('load',pageParam.jsonObject);
        //$("#dataLevel").combobox("loadData", pageParam.dataLevel);
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
        $("#dataLevel").val(data["dataLevel"]);
    }
});
