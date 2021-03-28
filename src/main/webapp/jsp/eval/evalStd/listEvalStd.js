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
var eventTypeCombo;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        eventTypeCombo = coco.plugin.combo.comboStatus({
            comboId:"eventType",
            canEmpty:true,
            required:false,
            value:$("#eventType").val()
        });
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        var isDw = $("#status").val()==2;
        var title = "日常医德行为标准";
        if(isDw) {
            title = "一票认定较差标准";
        }
        $('#tbList').datagrid({
            title: title+"列表",
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
                    {field: page.idField, title: "操作", width: ckWidth, align: 'center',formatter: page.handleFormatter, hidden: !hasRight,opt:true},
                    {title: title+'编码', field: 'code', width: 60, sortable: true},
                    {title: title+'名称', field: 'name', width: 220,  sortable: true},
                    {field: "beginScore", title:"分值范围开始", width:80,hidden: isDw, sortable:true},
                    {field: "endScore", title:"分值范围结束", width:80,hidden: isDw, sortable:true},
                    {field: "scoreMax", title:"考评中最大分值", width:60, hidden: isDw,sortable:true,formatter:page.dataFormatter},
                    {field: "eventTypeName", title:"状态", width:60, sortable:true,formatter:page.eventTypeFormatter}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },
    eventTypeFormatter: function (value, rowData, rowIndex) {
        if (value == "启用") {
            return "<font color='green'>启用</font> ";
        } else if (value =="停用") {
            return "<font color='red'>停用</font> ";
        }
        return "";
    },
    dataFormatter:function (value) {
        if (value >= 1000) return "--";
        return   value;
    },
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.editEx('" + value + "')>[详细]</a>";
        if (hasDel) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        return s;
    },
    //新增
    cardEx: function () {
        var pager = $('#tbList').datagrid('getPager');
        var status = $('#status').val();
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({status: "" + status,pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.card("", data);
    },
    //编辑
    editEx: function (id) {
        var pager = $('#tbList').datagrid('getPager');
        var status = $('#status').val();
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({status: "" + status,pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.card(id, data);
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
    }
});
