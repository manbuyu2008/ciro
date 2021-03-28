var menuTree;
var statusCombo;
var comboTrue;
var comboIcon;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        comboTrue = coco.plugin.combo.comboTrue({
            comboId:"isLeaf",
            canEmpty:false,
            required:true,
            onChange:function(value){
                if(value==0){
                    $(".tr_leaf").hide();
                    $("#menuUrl").val("");
                    $("#menuIcon").val("");
                    $("#buttons").val("");
                }else{
                    $(".tr_leaf").show();
                }
            },
            value:$("#isLeaf").val()
        });
        if(comboTrue.getValue()==0){
            $(".tr_leaf").hide();
            $("#menuUrl").val("");
            $("#menuIcon").val("");
            $("#buttons").val("");
        }else{
            $(".tr_leaf").show();
        }
        statusCombo = coco.plugin.combo.comboPrivPerson({
            comboId:"status",
            canEmpty:false,
            required:true,
            onChange:function(value){
               if(value==1){
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
        if(statusCombo.getValue()==0){
            $(".tr_stopInfo").hide();
            $("#stopInfo").val("");
            $("#stopTime").val("");
        }else{
            $(".tr_stopInfo").show();
        }
        comboIcon = coco.plugin.combo.comboIcon({
            comboId:"menuIcon",
            canEmpty:false,
            required:true,
            value:$("#menuIcon").val()
        });
        coco.plugin.list.buttonList({
            listId:"buttons",
            panelWidth:400,
            multiple:true,
            canSearch:true,
            dept:$("#buttons").val(),
            required:true,
            canEmpty:false
        });
        menuTree = coco.plugin.tree.menuTree({
            treeId:"parentId",
            canEmpty:true,
            isLeaf:0,
            panelWidth:400,
            isOnlySelectLeaf:false,
            hasDefRoot:false,
            required:false
        });
    },
    //从json对象给页面输入框赋值
    loadData:function (data) {
         $("#id").val(data["id"]);
         $("#code").val(data["code"]);
         $("#name").val(data["name"]);
         $("#levelCode").val(data["levelCode"]);
         $("#levelNum").val(data["levelNum"]);
         $("#parentId").val(data["parentId"]);
         $("#isLeaf").val(data["isLeaf"]);
         $("#menuOrder").val(data["menuOrder"]);
         $("#menuIcon").val(data["menuIcon"]);
         $("#menuUrl").val(data["menuUrl"]);
         $("#buttons").val(data["buttons"]);
         $("#note").val(data["note"]);
         $("#status").val(data["status"]);
         $("#version").val(data["version"]);
    }

});
