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
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'ksQuery.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [[
                {field: "periodName", title: "考评期间", width: 80, sortable: true, rowspan: 2},
                {field: "userTypeName", title: "考评类型", width: 80, formatter: page.deptFormatter, sortable: true, rowspan: 2},
                {field: "deptName", title: "部门", width: 80, formatter: page.deptFormatter, sortable: true, rowspan: 2},
                {title: '自评等次', colspan: 4},
                {title: '科室考评等次', colspan: 4},
                {title: '大科总支考评等次', colspan: 4},
                {title: '单位考评等次', colspan: 4}
            ],
                [
                    {field: 'zpName1', title: '优秀', width: 80, sortable: true},
                    {field: 'zpName2', title: '良好', width: 80, sortable: true},
                    {field: 'zpName3', title: '一般', width: 80, sortable: true},
                    {field: 'zpName4', title: '较差', width: 80, sortable: true},
                    {field: 'kName1', title: '优秀', width: 80, sortable: true},
                    {field: 'kName2', title: '良好', width: 80, sortable: true},
                    {field: 'kName3', title: '一般', width: 80, sortable: true},
                    {field: 'kName4', title: '较差', width: 80, sortable: true},
                    {field: 'dkName1', title: '优秀', width: 80, sortable: true},
                    {field: 'dkName2', title: '良好', width: 80, sortable: true},
                    {field: 'dkName3', title: '一般', width: 80, sortable: true},
                    {field: 'dkName4', title: '较差', width: 80, sortable: true},
                    {field: 'dwName1', title: '优秀', width: 80, sortable: true},
                    {field: 'dwName2', title: '良好', width: 80, sortable: true},
                    {field: 'dwName3', title: '一般', width: 80, sortable: true},
                    {field: 'dwName4', title: '较差', width: 80, sortable: true}
                ]],
            pagination: true,
            rownumbers: true
        });
    },
    deptFormatter: function (value, rowData, rowIndex) {
        return "<a style='color: #0D5BA1' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + ","+rowData.userTypeId+")>" + value + "</a>";
    },
    next: function (deptId,userTypeId) {
        var v_zq = zqCombo.getValue();
        var param = "?ksId=" + deptId + "&zq=" + v_zq+ "&userTypeId=" + userTypeId;
        var href = pageParam.CONTEXT_PATH+'/eval/report/reportUser.vm' + param;
        window.top.addTab("人员考评明细查询",href);
    }
});
