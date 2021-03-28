/**
 * Created by huangxl at 2013-01-17 14:20:23
 * 实体【考评系统参数(DB_YDKP_PARAM)】的卡片页面js
 */
page = $.extend(page, {
    vp_init: function () {
    },
    //保存 (isAdd=true,保存并新增)
    saveHandle:function (isAdd) {
        if($("#"+uniteCode).attr("checked")=="checked"){
            $("#"+uniteCode).val("YES");
        }else{
            $("#"+uniteCode).val("NO");
        }
        if($("#"+eventCode).attr("checked")=="checked"){
            $("#"+eventCode).val("YES");
        }else{
            $("#"+eventCode).val("NO");
        }
        coco.page.model.save("form", function (success, data) {
            if (!success) return;
            page.afterSave(data, isAdd);
        }, null);
    },
    //
    //从json对象给页面输入框赋值
    loadData:function (data) {
    $("#id").val(data["id"]);
    },
    //保存校验
    checkValid: function () {
        return true;
    }
});
