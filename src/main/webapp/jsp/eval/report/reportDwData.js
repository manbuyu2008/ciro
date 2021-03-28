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
            isOnlySelectLeaf: false,
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
            title: "是否考评考评分析列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'dwDataQuery.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [[
                {field: "periodName", title: "考评期间", width: 80, sortable: true, rowspan: 2},
                {field: "deptName", title: "部门", width: 80,  sortable: true, rowspan: 2},
                {field: "userTypeName", title: "考评类别", width: 80, sortable: true, rowspan: 2},
                {field: "allNum", title: "总人数", width: 80, sortable: true, rowspan: 2},
                {title: '自评', colspan: 2},
                {title: '科室考评', colspan: 2},
                {title: '大科考评', colspan: 2},
                {title: '单位考评', colspan: 2}
            ],
                [
                    {field: "selfYesNum", title: "已提交", width: 80, formatter: page.selfYesOperator},
                    {field: "selfNoNum", title: "未提交", width: 80, formatter: page.selfNoOperator},
                    {field: "ksYesNum", title: "已审批", width: 80, formatter: page.ksYesOperator},
                    {field: "ksNoNum", title: "未审批", width: 80, formatter: page.ksNoOperator},
                    {field: "dkYesNum", title: "已审批", width: 80, formatter: page.dkYesOperator},
                    {field: "dkNoNum", title: "未审批", width: 80, formatter: page.dkNoOperator},
                    {field: "dwYesNum", title: "已审批", width: 80, formatter: page.dwYesOperator},
                    {field: "dwNoNum", title: "未审批", width: 80, formatter: page.dwNoOperator}
                ]],
            pagination: true,
            rownumbers: true
        });
    },
    selfYesOperator: function (value, rowData, rowIndex) {
        var title = "已提交自评人员";
        var type = 1;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    selfNoOperator: function (value, rowData, rowIndex) {
        var title = "未提交自评人员";
        var type = 2;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    ksYesOperator: function (value, rowData, rowIndex) {
        var title = "科室已审批考评人员";
        var type = 3;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    ksNoOperator: function (value, rowData, rowIndex) {
        var title = "科室未审批考评人员";
        var type = 4;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    dkYesOperator: function (value, rowData, rowIndex) {
        var title = "大科已审批考评人员";
        var type = 5;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    dkNoOperator: function (value, rowData, rowIndex) {
        var title = "大科未审批考评人员";
        var type = 6;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    dwYesOperator: function (value, rowData, rowIndex) {
        var title = "单位已审批考评人员";
        var type = 7;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    dwNoOperator: function (value, rowData, rowIndex) {
        var title = "单位未审批考评人员";
        var type = 8;
        return "<a style='color:#009CFF' href='###' class='vp_opt' " +
            "onclick=page.next(" + rowData.deptId + "," + rowData.periodId + ",'"+title+ "',"+type+")>" + value + "</a>";
    },
    next: function (deptId, periodId,title,type) {
        var param = "?ksId=" + deptId + "&zq=" + periodId+ "&type=" + type+ "&title=" + title;
        var href = '/eval/report/reportUserData.vm' + param;
        window.top.addTab(title, href);
    }
});
