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
        evalType = coco.plugin.list.evalTypeList({
            listId: "userTypeId",
            canEmpty: true,
            value: $("#userTypeId").val()
        });
    },
    initGrid: function () {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: "单位考评构成图",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'dwPieQuery.vm',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            columns: [[
                    {field: 'lvName', title: '等次', width: 80, sortable: true},
                    {field: 'lvNum', title: '数量', width: 80, sortable: true}
                ]],
            pagination: true,
            rownumbers: true,
            onLoadSuccess : function(data) {
                var datas= new Array();
                for(var i=0;i<data.rows.length;i++){
                    var dataColumn = {};
                    dataColumn.name= data.rows[i].lvName;
                    dataColumn.value= data.rows[i].lvNum;
                    datas[i] =  dataColumn;
                }
                //在数据加载成功的时候触发
                var option = ECharts.ChartOptionTemplates.Pie("", datas, "单位考评构成图");

                var container = $("#imgChart")[0];

                opt = ECharts.ChartConfig(container, option);

                ECharts.Charts.RenderChart(opt);
            }
        });
    }
});
