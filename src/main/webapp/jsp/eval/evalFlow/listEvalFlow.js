$(function () {
    init();
    window.checkValid = page.checkValid;
});
function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasRight = hasEdit || hasDel ;
    var ckWidth = (hasEdit ? 20 : 0) + (hasDel ? 20 : 0);
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
            title: "考评流程列表",
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
                    {field:"name",title:"流程名称",width:80},
                    {field:"ksEvalName", title:"（启停）科室考评", width:80, formatter:page.formatterHandler},
                    {field:"dkEvalName", title:"（启停）大科考评", width:80, formatter:page.formatterHandler},
                    {field:"corpEvalName", title:"（启停）单位考评", width:80, formatter:page.formatterHandler}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },
    formatterHandler:function (value, rowData, rowIndex) {
        if (value == "启用") {
            return "<font color='green'>启用</font> ";
        } else if (value =="停用") {
            return "<font color='red'>停用</font> ";
        }
        return "";
    },
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.edit('" + value + "')>[详细]</a>";
        if (hasDel) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        return s;
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
    }
});
