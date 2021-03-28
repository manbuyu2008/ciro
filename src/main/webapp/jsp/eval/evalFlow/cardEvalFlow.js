var ksEval, dkEval, corpEval;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load', pageParam.jsonObject);
        ksEval = coco.plugin.combo.evalBoolean({
            comboId: "ksEval",
            canEmpty: false,
            required: true
        });
        dkEval = coco.plugin.combo.evalBoolean({
            comboId: "dkEval",
            canEmpty: false,
            required: true
        });
        corpEval = coco.plugin.combo.evalBoolean({
            comboId: "corpEval",
            canEmpty: false,
            required: true
        });
    },
    //选择是否启用分数最大值限制
    clickChecked:function (data) {
        if ($(data).attr("checked")=="checked") {
            $("#scoreMax").val("YES");
        }else{
            $("#scoreMax").val("NO");
        }
    },
    //保存校验
    checkValid: function () {
        if (ksEval.getValue()=="NO"&&dkEval.getValue()=="NO"&&corpEval.getValue()=="NO") {
            coco.utils.msg.error("流程审批节点不能全部停用，请重新设置.");
            return false;
        }
        return true;
    }
});



