var beginDate, endDate, eventBegin, eventEnd,evalTypeCombo,
    grzpBegin, grzpEnd, ksevalBegin, ksevalEnd, dkevalBegin, dkevalEnd,dwevalBegin, dwevalEnd;
page = $.extend(page, {
    _init: function () {
        $('#form').form('load', pageParam.jsonObject);
        if($("#scoreMax").val()=="YES"){
            $("#scoreMaxCheck").attr("checked","checked");
        }else{
            $("#scoreMaxCheck").removeAttr("checked");
        }
        evalTypeCombo = coco.plugin.list.evalTypeList({
            listId: "userType",
            panelWidth: 400,
            multiple:true,
            required: true,
            canEmpty: false
        });
        beginDate = $('#beginDate').datebox({
            required: true
        });
        endDate = $('#endDate').datebox({
            required: true
        });
        eventBegin = $('#eventBegin').datebox({
            required: true
        });
        eventEnd = $('#eventEnd').datebox({
            required: true
        });
        grzpBegin = $('#grzpBegin').datebox({
            required: true
        });
        grzpEnd = $('#grzpEnd').datebox({
            required: true
        });
        ksevalBegin = $('#ksevalBegin').datebox({
            required: true
        });
        ksevalEnd = $('#ksevalEnd').datebox({
            required: true
        });
        dkevalBegin = $('#dkevalBegin').datebox({
            required: true
        });
        dkevalEnd = $('#dkevalEnd').datebox({
            required: true
        });
        dwevalBegin = $('#dwevalBegin').datebox({
            required: true
        });
        dwevalEnd = $('#dwevalEnd').datebox({
            required: true
        });
    },
    //返回列表
    list: function () {
        var status = $("#status").val();
        var data = $$json.stringify({
            status: "" + status,
            pageSize: "" + pageParam.pageSize,
            pageNumber: "" + pageParam.pageNumber,
            queryParams: $$json.stringify(pageParam.queryParams)
        });
        coco.page.model.list(data);
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
        //验证日期范围
        var beginv = beginDate.datebox("getValue");
        var endv = endDate.datebox("getValue");
        if (grzpBegin.datebox("getValue") > grzpEnd.datebox("getValue")) {
            coco.utils.msg.alert("个人自评的起始日期大于个人自评的截至日期，请重新设置.");
            grzpBegin.datebox('textbox').focus();
            return false;
        }
        if (ksevalBegin.datebox("getValue") > ksevalEnd.datebox("getValue")) {
            coco.utils.msg.alert("科室考评的起始日期大于科室考评的截至日期，请重新设置.");
            ksevalBegin.datebox('textbox').focus();
            return false;
        }
        if (dkevalBegin.datebox("getValue") > dkevalEnd.datebox("getValue")) {
            coco.utils.msg.alert("大科室考评的起始日期大于大科室考评的截至日期，请重新设置.");
            dkevalBegin.datebox('textbox').focus();
            return false;
        }
        if (dwevalBegin.datebox("getValue") > dwevalEnd.datebox("getValue")) {
            coco.utils.msg.alert("单位考评的起始日期大于单位考评的截至日期，请重新设置.");
            dwevalBegin.datebox('textbox').focus();
            return false;
        }
        return true;
    },
    setNextDate: function () {
        var beginv = beginDate.datebox("getValue");
        var endv = endDate.datebox("getValue");
        grzpBegin.datebox("setValue", beginv);
        ksevalBegin.datebox("setValue", beginv);
        dkevalBegin.datebox("setValue", beginv);
        dwevalBegin.datebox("setValue", beginv);

        grzpEnd.datebox("setValue", endv);
        ksevalEnd.datebox("setValue", endv);
        dkevalEnd.datebox("setValue", endv);
        dwevalEnd.datebox("setValue", endv);
    },
    //从json对象给页面输入框赋值
    loadData: function (data) {
        $("#id").val(data["id"]);
        $("#code").val(data["code"]);
        $("#name").val(data["name"]);
    }
});



