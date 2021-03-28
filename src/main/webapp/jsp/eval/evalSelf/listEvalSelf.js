$(function () {
    init();
    window.checkValid = page.checkValid;
});
function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasRight = hasEdit || hasDel ;
    var ckWidth = (hasEdit ? 10 : 0) + (hasDel ? 10 : 0);
    page._init();
    page.initGrid(hasRight,ckWidth);
    sys_loaded();
}
var periodId,comboKpPeriod;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        //年度
        periodId = coco.plugin.list.evalZqList({
            listId:"periodId",
            width:200,
            canEmpty:true
        });
    },
    autoCreate:function() {
            comboKpPeriod = coco.plugin.list.evalZqList({
                listId:"zq",
                required:true,
                canEmpty:false,
                isNeed:1
            });
        popDialog();
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "个人自评列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'dataSelf.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [
                [
                    {field: page.idField, title: "操作", width: ckWidth, align: 'center',formatter: page.handleFormatter, hidden: !hasRight,opt:true},
                    {field:"periodName", title:"考评期间", width:30,sortable:true},
                    {field:"ksName", title:"科室", width:30,sortable:true},
                    {field:"userName", title:"姓名", width:30,sortable:true},
                    {field:"sexName", title:"性别", width:20,sortable:true},
                    {field:"nl", title:"年龄", width:20,sortable:true},
                    {field:"zc", title:"职称", width:20,sortable:true},
                    {field:"statusName", title:"流程状态", width:20,sortable:true}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },
    handleFormatter:function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var nowStatus = bc;
        var status = rowData.status;
        var data = status <= nowStatus ? true : false;
        var note=status <= nowStatus ? "<font color='red'> [修改]</font>" : "[查看]";
        if (!hasEdit && !hasDel) return "<span style='color: gray;'>无权限</span>";
        var s = "";
        if (hasEdit) s += "<a href='###' class='vp_opt' onclick=page.editEx('" + value + "')>"+note+"</a>&nbsp;";
        if (hasDel && status <= nowStatus ) s += "<a href='###' class='vp_opt' onclick=page.delHandle('" + value + "')>[删除]</a>";
        return s;
    },
    //删除
    delHandle:function (value) {
        coco.page.model.delEx("delSelf.vm",value, function (success) {
            if (success) page.query();
        });
    },
    //新增编辑
    cardEx: function () {
        var pager = $('#tbList').datagrid('getPager');
        var periodId = comboKpPeriod.getValue();
        var id = $('#id').val();
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({periodId: "" + periodId,pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        var s = "cardSelf.vm?id=" + id + "&t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },
    //编辑
    editEx: function (id) {
        var pager = $('#tbList').datagrid('getPager');
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.cardEx("cardSelf.vm",id, data);
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
    }
});

function popDialog() {
    //选择周期
    $("#choosePeriod").dialog({
        width:300,
        height:120,
        title:"请选择考评周期",
        modal:true,
        draggable:true,
        closable:true,
        cache:false,
        buttons:[
            {
                text:'确定',
                handler:function () {
                    var period = $("input[name='zq']").val();
                    if (coco.utils.str.isEmpty(period) || period == "-") {
                        coco.utils.msg.slideError("请选择考评周期!");
                        return;
                    }
                    page.cardEx();
                }
            },
            {
                text:'取消',
                handler:function () {
                    $("#choosePeriod").dialog("close");
                }
            }
        ]
    });
};


