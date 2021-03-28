$(function () {
    init();
    window.checkValid = page.checkValid;
});
var eventDate;
var deptTree;
var userCombo;
var typeIdCombo;
function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasRight = hasEdit || hasDel ;
    var ckWidth = (hasEdit ? 30 : 0) + (hasDel ? 30 : 0);
    page._init();
    page.initGrid(hasRight,ckWidth);
    sys_loaded();
}
var menuTree;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        eventDate = coco.ctrl.dateQuery({
            valueTagId:"eventDate"
        });
        deptTree = coco.plugin.tree.deptTree({
            treeId: "ksId",
            canEmpty: true,
            panelWidth: 400,
            isOnlySelectLeaf: true,
            hasDefRoot: false
        });
        userCombo = coco.plugin.list.userList({
            listId: "userId",
            panelWidth: 400,
            canEmpty: true,
            value: $("#userId").val()
        });
        //事件分类
        typeIdCombo = coco.plugin.combo.jjf({
            comboId: "typeId",
            panelWidth: 400,
            canEmpty: true
        });
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        var isDw = $("#status").val()=="dw";
        $('#tbList').datagrid({
            title: "考评加减分事件列表",
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
                    {field:"deptName", title:"科室", width:80, sortable:true},
                    {field:"userName", title:"人员", width:80, sortable:true},
                    //{field:"stdName", title:"标准", width:170, sortable:true},
                    {field:"eventName", title:"事件名称", width:170, sortable:true},
                    {field:"eventDate", title:"时间", width:90, sortable:true},
                    {field:"score", title:"分数", width:50,hidden:isDw, sortable:true},
                    {field:"typeName", title:"事件类型", width:80, hidden:isDw, sortable:true},
                    {field:"statusName", title:"档案分类", width:80, sortable:true},
                    {field:'isShName', title:'审核状态', width:60, sortable:true},
                    {field:'shResultName', title:'审核结果', width:60, formatter:page.formatterResult, sortable:true},
                    {field:'qrScore', title:'确认分数', width:50,hidden:isDw,formatter:page.formatterQrScore, sortable:true}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },

    formatterQrScore:function (value, rowData, rowIndex) {
        if (value == "0") {
            return "";
        }
        return value;
    },

    formatterResult:function (value, rowData, rowIndex) {
        if (value == "通过") {
            return "<font color='green'>通过</font> ";
        } else if (value =="未通过") {
            return "<font color='red'>未通过</font> ";
        }
        return "";
    },
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.editEx('" + value + "')>[详细]</a>";
        if (hasDel&&rowData.isSh == "NO") s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
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
