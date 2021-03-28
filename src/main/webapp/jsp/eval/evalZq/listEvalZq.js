$(function () {
    init();
    window.checkValid = page.checkValid;
});
function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasRight = hasEdit || hasDel ;
    var ckWidth = (hasEdit ? 40 : 0) + (hasDel ? 40 : 0);
    page._init();
    page.initGrid(hasRight,ckWidth);
    sys_loaded();
}
var menuTree;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "期间列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'data.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [
                [
                    {field: page.idField, title: "操作", width: ckWidth, align: 'center', formatter: page.handleFormatter, hidden: !hasRight,opt:true},
                    {title: '期间编码', field: 'code', width: 120, align: 'center', sortable: true},
                    {title: '期间名称', field: 'name', width: 120, align: 'center', sortable: true},
                    {title:"期间开始时间", field: "beginDate",  align: 'center', width:120, sortable:true},
                    {title:"期间截至日期", field: "endDate",  align: 'center',width:120, sortable:true},
                    {title:"状态", field: "statusName",  align: 'center',width:120, sortable:true,formatter:page.statusFormatter}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },
    statusFormatter: function (value, rowData, rowIndex) {
        if (value == "开始") {
            return "<font color='green'>开始</font> ";
        } else if (value =="结束") {
            return "<font color='red'>结束</font> ";
        }
        return "";
    },
    //取回
    setEnd:function(value) {
        $$msg.confirm("确实要结束该周期记录吗？", function (isOk) {
            if (!isOk) return;
            var param = {
                id: value,
                actionType: "end"
            };
            $$msg.showWait("正在处理，请稍候...");
            coco.utils.ajaxPostData("custom.vm?", param, function (data) {
                if (data.state) {
                    coco.utils.msg.slideMsg("结束周期成功！");
                    page.query();
                } else {
                    coco.utils.msg.slideMsg(data.msg);
                }
                $$msg.closeWait();
            });
        });
    },
    setStart:function(value) {
        $$msg.confirm("确实要继续开启该周期记录吗？", function (isOk) {
            if (!isOk) return;
            var param = {
                id: value,
                actionType: "start"
            };
            $$msg.showWait("正在处理，请稍候...");
            coco.utils.ajaxPostData("custom.vm?", param, function (data) {
                if (data.state) {
                    coco.utils.msg.slideMsg("开启周期成功！");
                    page.query();
                } else {
                    coco.utils.msg.slideMsg(data.msg);
                }
                $$msg.closeWait();
            });
        });
    },
    //保
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.edit('" + value + "')>[详细]</a>";
        if (hasDel) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        if (hasDel&&rowData.status!="END") s += "<a href='###' class='coco_opt' onclick=page.setEnd('" + value + "')>[结束]</a>";
        if (hasDel&&rowData.status=="END") s += "<a href='###' class='coco_opt' onclick=page.setStart('" + value + "')>[开启]</a>";
        return s;
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
    }
});
