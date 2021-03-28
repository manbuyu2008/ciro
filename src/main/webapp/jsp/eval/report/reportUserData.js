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
    },
    initGrid: function () {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: pageParam.title+"列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'userDataQuery.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [[
                {field: "deptName", title: "部门", width: 100, sortable: true},
                {field: "userName", title: "人员", width: 80, sortable: true},
                {field: 'zc', title: '职称', width: 80, sortable: true},
                {field: 'sex', title: '性别', width: 80, sortable: true},
                {field:"mobile", title:"手机", width:80,sortable:true},
                {field:"email", title:"邮箱", width:80,sortable:true}
                ]],
            pagination: true,
            rownumbers: true
        });
    }
});
