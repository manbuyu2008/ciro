$(function () {
    init();
    window.checkValid = page.checkValid;
});
function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasRight = hasEdit;
    var ckWidth = (hasEdit ? 80 : 0);
    page._init();
    page.initGrid(hasRight,ckWidth);
    sys_loaded();
}
var periodId
page = $.extend(page, {
    idField: "id",
    pageHeight:80,
    _init:function () {
        //年度
        periodId = coco.plugin.list.evalZqList({
            listId:"periodId",
            width:200,
            canEmpty:true
        });
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: "大科考评列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'dataDk.vm',
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            pagination: true,
            rownumbers: true,
            selectOnCheck:false,
            checkOnSelect:true,
            frozenColumns: [
                [
                    {field:"CK", checkbox:true, title:"审核", opt:true, checkFormatter:function (value, rowData, rowIndex) {
                        var re = {
                            visible:true,
                            enabled:true
                        };
                        var maxStatus = bc;
                        var status = rowData.status;
                        if (status > maxStatus) {
                            re.checked = false;
                            re.enabled = false;
                        }
                        return re;
                    }},
                    {
                        field: page.idField,
                        title: "操作",
                        width: ckWidth,
                        align: 'center',
                        formatter: page.handleFormatter,
                        hidden: !hasRight,
                        opt: true
                    }
                ]
            ],
            columns: [
                [
                    {field: "periodName", title: "考评期间", width: 30, sortable: true},
                    {field: "ksName", title: "科室", width: 30, sortable: true},
                    {field: "userName", title: "姓名", width: 30, sortable: true},
                    {field: "sexName", title: "性别", width: 20, sortable: true},
                    {field: "nl", title: "年龄", width: 20, sortable: true},
                    {field: "zc", title: "职称", width: 20, sortable: true},
                    {field: "statusName", title: "流程状态", width: 20, sortable: true}
                ]
            ] ,
            onClickRow:function (rowIndex, rowData) {
                var maxStatus = bc;
                var status = rowData.status;
                if (status > maxStatus) {
                    $('#tbList').datagrid("unselectRow", rowIndex);
                }
            }
        });
    },
    handleFormatter:function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var maxStatus = bc;
        var status = rowData.status;
        var note=status <= maxStatus ? "<font color='red'> [考评]</font>" : "[查看]";
        if (!hasEdit) return "<span style='color: gray;'>无权限</span>";
        var s = "";
        if (hasEdit) s += "<a href='###' class='vp_opt' onclick=page.editEx('" + value + "')>"+note+"</a>&nbsp;";
        return s;
    },
    autoSubmit:function () {
        var rows = $("#tbList").datagrid("getChecked");
        if (rows.length == 0) {
            coco.utils.msg.slideError("请选择要审核的数据！");
            return;
        }
        var ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids = ids + rows[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        coco.utils.ajaxPostData("customDk.vm?actionType=autoSubmit", {ids:ids}, function (data) {
            if (data.state) {
                coco.utils.msg.slideMsg("审核成功！");
                page.query();
            } else {
                coco.utils.msg.slideMsg(data.msg);
            }
        });
    },
    //编辑
    editEx: function (id) {
        var pager = $('#tbList').datagrid('getPager');
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.cardEx("cardDk.vm",id, data);
    },
});
