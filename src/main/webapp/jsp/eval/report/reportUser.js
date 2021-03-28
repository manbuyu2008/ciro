$(function () {
    init();
    window.checkValid = page.checkValid;
});
function init() {
    page._init();
    page.initGrid();
    sys_loaded();
}
var zqCombo, deptTree, evalType, sexCombo;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        zqCombo = coco.plugin.list.evalZqList({
            listId: "periodId",
            canEmpty: false,
            required: true,
            value: $("#periodId").val()
        });
        deptTree = coco.plugin.tree.deptTree({
            treeId: "ksId",
            canEmpty: true,
            isOnlySelectLeaf:false,
            value: $("#ksId").val()
        });
        evalType = coco.plugin.list.evalTypeList({
            listId: "userTypeId",
            canEmpty: true,
            value: $("#userTypeId").val()
        });
        sexCombo = coco.plugin.combo.comboSex({
            comboId: "sex",
            canEmpty: true,
            value: $("#sex").val()
        });
    },
    initGrid: function () {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: "人员考评明细列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'userQuery.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [[
                {field: "periodName", title: "考评期间", width: 80, sortable: true, rowspan: 2},
                {field: "userTypeName", title: "考评类别", width: 80, sortable: true, rowspan: 2},
                {field: "deptName", title: "部门", width: 100, sortable: true, rowspan: 2},
                {field: "userName", title: "人员", width: 80, sortable: true, rowspan: 2},
                {field: 'zc', title: '职称', width: 80, sortable: true, rowspan: 2},
                {field: 'nl', title: '年龄', width: 80, sortable: true, rowspan: 2},
                {title: '自评', colspan: 2},
                {title: '科室考评', colspan: 2},
                {title: '大科考评', colspan: 2},
                {title: '单位考评', colspan: 2},
                {title: '结果', colspan: 2},
                {
                    field: 'id',
                    title: '操作',
                    width: 60,
                    formatter: page.detailFormatter,
                    opt: true,
                    sortable: true,
                    rowspan: 2
                }
            ],
                [
                    {field: 'selfScore', title: '得分', width: 80, sortable: true},
                    {field: 'selfLv', title: '等次', width: 80, sortable: true},
                    {field: 'ksScore', title: '得分', width: 80, sortable: true},
                    {field: 'ksLv', title: '等次', width: 80, sortable: true},
                    {field: 'dkScore', title: '得分', width: 80, sortable: true},
                    {field: 'dkLv', title: '等次', width: 80, sortable: true},
                    {field: 'corpScore', title: '得分', width: 80, sortable: true},
                    {field: 'corpLv', title: '等次', width: 80, sortable: true},
                    {field: 'score', title: '得分', width: 80, sortable: true},
                    {field: 'evalLv', title: '等次', width: 80, sortable: true}
                ]],
            pagination: true,
            rownumbers: true
        });
    },
    detailFormatter: function (value, rowData, rowIndex) {
        return "<a href='###' style='color: #0D5BA1' class='vp_opt' onclick=page.doOperator('" + value + "')>明细</a>";
    },
    doOperator: function (value) {
        var href = "/eval/evalBaseInfo/cardSelf.vm?id=" + value + "&view=true&t=" + Math.random();
        window.parent.addTab("人员考评明细", href);
    }
});
