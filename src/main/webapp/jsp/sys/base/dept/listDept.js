$(function () {
    init();
    window.checkValid = page.checkValid;
});

function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasRight = hasEdit || hasDel ;
    var ckWidth = (hasEdit?50:0)+(hasDel?50:0);
    page._init();
    page.initTree();
    page.initGrid(hasRight,ckWidth);
    collapse();
    sys_loaded();
}
function collapse() {
    $("#layout").layout("collapse", "west");
}
var deptTree;
var statusCombo;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        statusCombo = coco.plugin.combo.comboStatus({
            comboId:"status",
            canEmpty:true,
            value:$("#status").val()
        });
        $('#import-dialog').dialog({
            title: '数据导入',
            height: 250,
            width: 400,
            resizable: true,
            closed: true,
            iconCls: 'icon-save',
            modal: true,
            buttons: [
                {
                    text: '确认',
                    iconCls: 'icon-ok',
                    handler: function () {
                        if (!coco.page.model.checkValid("importExcelForm")) {
                            return
                        };
                        var filePath = $("#upload").val();
                        filePath = filePath.substr(filePath.lastIndexOf("."));
                        if (!filePath.endsWith(".xlsx")) {
                            coco.utils.msg.alert("请上传2003以上版本的Excel文件!");
                            return false;
                        } else {
                            coco.utils.msg.showWait("正在处理Excel,请稍候!");
                            //$("#importExcelForm").submit();
                            page.UpladFile();
                            coco.utils.msg.closeWait();
                        }
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $("#import-dialog").dialog("close");
                    }
                }
            ]
        });
    },
    UpladFile: function(){
        var formData = new FormData($("#importExcelForm")[0]);
        $.ajax({
            url: pageParam.CONTEXT_PATH+'/eval/evalImport/deptImport.vm',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.state) {
                    coco.utils.msg.slideMsg(returndata.msg);
                    $("#upload").val("");
                    $("#import-dialog").dialog("close");
                    page.query();
                }else{
                    coco.utils.msg.slideError(returndata.msg);
                    $("#import-dialog").dialog("close");
                }
            },
            error: function (returndata) {
                coco.utils.msg.slideError(returndata.msg);
                $("#import-dialog").dialog("close");
            }
        });
    },
    initImportDialog: function () {
        $("#import-dialog").dialog("open");
    },
    initGrid: function (hasRight,ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "部门列表",
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
            frozenColumns: [
                [
                    {field: page.idField, title: "操作", width: ckWidth,  formatter: page.handleFormatter,hidden:!hasRight,opt:true},
                    {title: '部门编码', field: 'code', width: 200, align: 'center', sortable: true},
                    {title: '部门名称', field: 'name', width: 200, align: 'center', sortable: true}
                ]
            ],
            columns: [
                [
                    {title: '上级部门', field: 'parentName', width: 180, align: 'center', sortable: true},
                    {title: '状态', field: 'statusName', width: 120, align: 'center', sortable: true}
                ]
            ],
            rowStyler: function(index,row){
                if (row.status==0){
                    return 'background-color:#fff;color:#a0a0a0;';
                }
            },
            pagination: true,
            rownumbers: true
        });
    },
    //初始化树
    initTree: function () {
        deptTree = coco.plugin.tree.deptOutTree({      //整个树
            treeId: "deptTree",
            onClick: function (node) {
                $("#dept").val(node.id);
                page.query();//刷新datagrid
            }
        });
        deptTree.tree("expand", deptTree.tree("getRoot").target);
        /*树展开一级*/
        deptTree.tree("select", deptTree.tree("getRoot").target);
        $("#dept").val(deptTree.tree("getRoot").id);
        $("#oneDept").checked = false;
    },
    oneDept: function (check) {
        if (check) {
            $("#oneDeptSelect").val(1);
            page.query();
            return;
        }
        $("#oneDeptSelect").val(0);
        page.query();
        return;
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
    },
    saveColsWidth: function () {
        coco.eui.grid.saveColsWidth(pageParam.key, "tbList", true);
    }
});
function getSelected() {
    var selected = $('#test').datagrid('getSelected');
    if (selected) {
        alert(selected.code + ":" + selected.name + ":" + selected.addr + ":" + selected.col4);
    }
}
function getSelections() {
    var ids = [];
    var rows = $('#test').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        ids.push(rows[i].code);
    }
    alert(ids.join(':'));
}
