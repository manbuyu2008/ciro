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
            title: "考评等级列表",
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
                    {title: '考评等级编码', field: 'code', width: 180,sortable: true},
                    {title: '考评等级名称', field: 'name', width: 180,sortable: true},
                    {field: "beginScore", title:"分值范围开始", width:80, sortable:true},
                    {field: "endScore", title:"分值范围结束", width:80, sortable:true}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
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
