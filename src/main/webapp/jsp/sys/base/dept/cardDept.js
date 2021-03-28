var deptTree;
var statusCombo;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        statusCombo = coco.plugin.combo.comboStatus({
            comboId:"status",
            canEmpty:false,
            required:true,
            onChange:function(value){
               if(value=="NORMAL"){
                   $(".tr_stopInfo").hide();
                   $("#stopInfo").val("");
                   $("#stopTime").val("");
               }else{
                   $(".tr_stopInfo").show();
                   $("#stopTime").datebox('setValue',window.$$date.getNowDateStr());
               }
            },
            value:$("#status").val()
        });
        if(statusCombo.getValue()=="NORMAL"){
            $(".tr_stopInfo").hide();
            $("#stopInfo").val("");
            $("#stopTime").val("");
        }else{
            $(".tr_stopInfo").show();
        }
        deptTree = coco.plugin.tree.deptTree({
            treeId:"parentId",
            canEmpty:false,
            panelWidth:400,
            isOnlySelectLeaf:false,
            hasDefRoot:false,
            required:true
        });
        if($("#id").val()==1){
            deptTree.setEnabled(false);
        }
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
        $("#levelCode").val(data["levelCode"]);
        $("#parentId").val(data["parentId"]);
        $("#deptType").val(data["deptType"]);
        $("#note").val(data["note"]);
        $("#status").val(data["status"]);
        $("#stopInfo").val(data["stopInfo"]);
        $("#stopTime").val(data["stopTime"]);
    }
});
