var deptTree;
var adminDept;
var sexCombo;
var toEvalCombo;
var evalTypeCombo;
var stateCombo;
var evalDept;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load',pageParam.jsonObject);
        sexCombo = coco.plugin.combo.comboSex({
            comboId:"sex",
            canEmpty:false,
            required:true,
            value:$("#sex").val()
        });
        toEvalCombo = coco.plugin.combo.comboBoolean({
            comboId:"toEval",
            canEmpty:false,
            required:true,
            value:$("#toEval").val(),
            onChange:function(value){
                if(value!="YES"){
                    $(".tr_eval").hide();
                    if(evalTypeCombo){
                        evalTypeCombo.setValue("");
                    }
                    if(evalDept){
                        evalDept.setValue("");
                    }
                } else{
                    $(".tr_eval").show();
                    if(evalDept){
                        evalDept.setValue(deptTree.getValue());
                    }
                }
            }
        });
        evalTypeCombo = coco.plugin.list.evalTypeList({
            listId: "evalType",
            panelWidth: 400,
            required: true,
            canEmpty: false
        });
        stateCombo = coco.plugin.combo.comboStatus({
            comboId:"state",
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
            value:$("#state").val()
        });
        if(stateCombo.getValue()=="NORMAL"){
            $(".tr_stopInfo").hide();
            $("#stopInfo").val("");
            $("#stopTime").val("");
        }else{
            $(".tr_stopInfo").show();
        }
        deptTree = coco.plugin.tree.deptTree({
            treeId:"deptId",
            canEmpty:false,
            panelWidth:400,
            isOnlySelectLeaf:true,
            hasDefRoot:false,
            required:true,
            onChange:function(value){
                if(toEvalCombo.getValue()=="YES"&&evalDept){
                    evalDept.setValue(value);
                }
                if(adminDept){
                    adminDept.setValue(value);
                }
            }
        });
        adminDept = coco.plugin.tree.deptTree({
            treeId:"adminDeptId",
            canEmpty:false,
            panelWidth:400,
            isOnlySelectLeaf:false,
            hasDefRoot:false,
            multiple:true,
            required:true
        });
        evalDept = coco.plugin.tree.deptTree({
            treeId:"evalDept",
            canEmpty:false,
            panelWidth:400,
            isOnlySelectLeaf:true,
            hasDefRoot:false,
            required:true
        });
        if($("#id").val()==""){
            $("#pwdDef").hide();
        }else{
            $("#pwdDef").show();
        }
        if(toEvalCombo.getValue()!="YES"){
            $(".tr_eval").hide();
            if(evalTypeCombo){
                evalTypeCombo.setValue("");
            }
            if(evalDept){
                evalDept.setValue("");
            }
        } else{
            $(".tr_eval").show();
            if(evalDept){
                evalDept.setValue(deptTree.getValue());
            }
        }
    },
    pwdDef:function(){
        $$msg.confirm("确实要初始化该记录密码吗？", function (isOk) {
            if (!isOk) return;
                $$msg.showWait("正在处理，请稍候...");
        coco.utils.ajaxPostData("custom.vm?actionType=pwdDef", {userId:$("#id").val()},
            function (data) {
                if (data.state) {
                    $$msg.slideMsg("密码初始化成功！");
                }
                else {
                    $$msg.slideError(data.msg);
                }
                $$msg.closeWait();
            });
        });
    } ,
    //从json对象给页面输入框赋值
    loadData:function (data) {
        $("#id").val(data["id"]);
        $("#username").val(data["username"]);
        $("#name").val(data["name"]);
        $("#deptId").val(data["deptId"]);
        $("#adminDeptId").val(data["adminDeptId"]);
        $("#birthdate").val(data["birthdate"]);
        $("#postName").val(data["postName"]);
        $("#phone").val(data["phone"]);
        $("#mobile").val(data["mobile"]);
        $("#email").val(data["email"]);
        $("#bz").val(data["bz"]);
        $("#state").val(data["state"]);
        $("#stopInfo").val(data["stopInfo"]);
        $("#stopTime").val(data["stopTime"]);
        $("#sex").val(data["sex"]);
    }
});
