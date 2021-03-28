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
var shTypeCombo,evalLevelList;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        //考评阶段
        shTypeCombo = coco.plugin.combo.shType({
            comboId: "status",
            panelWidth: 400,
            canEmpty: true
        });

        evalLevelList = coco.plugin.list.evalLevelList({
            listId: "did",
            panelWidth: 400,
            canEmpty: true,
            value: $("#did").val()
        });
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "考评评语列表",
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
                    {title: '评语名称', field: 'name', width: 180,sortable: true},
                    {field: "didName", title:"考评等级", width:80, sortable:true},
                    {field: "statusName", title:"考评阶段", width:80, sortable:true}
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
