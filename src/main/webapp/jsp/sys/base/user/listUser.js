$(function () {
    init();
    window.checkValid = page.checkValid;
});

function init() {
    var hasEdit = $("#permissionEdit").val() > 0;
    var hasDel = $("#permissionDel").val() > 0;
    var hasGrant = $("#permissionGrant").val() > 0;
    var hasRight = hasEdit || hasDel || hasGrant;
    var ckWidth = (hasEdit ? 40 : 0) + (hasDel ? 40 : 0) + (hasGrant ? 60 : 0);
    page._init();
    page.initTree();
    page.initGrid(hasRight, ckWidth);
    page.initDialog();
    sys_loaded();
}
function collapse() {
    $("#layout").layout("collapse", "west");
}
var deptTree;
var stateCombo;
var roleCombo;
var userCombo;
var exportChoose;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        stateCombo = coco.plugin.combo.comboStatus({
            comboId: "state",
            canEmpty: true,
            value: $("#state").val()
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
                        }
                        ;
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
    initImportDialog: function () {
        $("#import-dialog").dialog("open");
    },
    UpladFile: function(){
        var formData = new FormData($("#importExcelForm")[0]);
        $.ajax({
            url: '/eval/evalImport/userImport.vm',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $("#upload").val("");
                $("#import-dialog").dialog("close");
                page.query();
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
    initDialog: function () {
        userCombo = coco.plugin.list.userList({
            listId: "userId",
            panelWidth: 400,
            required: true,
            canEmpty: false
        });
        roleCombo = coco.plugin.list.roleList({
            listId: "roleIds",
            panelWidth: 400,
            isAdmin: false,
            multiple: true,
            canSearch: true,
            required: true,
            canEmpty: false
        });
        $('#role_grant').dialog({
            title: '角色授权',
            closed: true,
            closable: false,
            modal: true,
            resizable: true,
            buttons: [
                {
                    text: '确认',
                    iconCls: 'icon-ok',
                    handler: function () {
                        coco.utils.ajaxPostData("custom.vm?actionType=roleGrant", {
                                userId: userCombo.getValue(),
                                roleIds: roleCombo.getValue()
                            },
                            function (data) {
                                if (data) {
                                    coco.utils.msg.alert("角色授权成功");
                                    $('#role_grant').dialog('close');
                                    page.query();
                                } else {
                                    coco.utils.msg.slideError("角色授权失败");
                                }
                            });
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#role_grant').dialog('close');

                    }
                }
            ]
        });

        exportChoose = coco.ctrl.dualSelect({
            objvarname: "conditionSelect",
            prefix: "_conditionSelect",
            parentId: "exportChoose",
            readonly: false,
            idField: "code",
            leftTitle: "导出字段选择",
            rightTitle: "已选择字段",
            canMove: true,
            notParse: false,
            leftCols: [
                {field: 'code', title: '编码', width: 80, hidden: true},
                {field: 'name', title: '字段名称', width: 80}
            ],
            rightCols: [
                {field: 'code', title: '编码', width: 80, hidden: true},
                {field: 'name', title: '字段名称', width: 80}
            ]
        });
        $('#exportChoose').dialog({
            title: '数据导出',
            closed: true,
            closable: false,
            modal: true,
            resizable: true,
            buttons: [
                {
                    text: '确认',
                    iconCls: 'icon-ok',
                    handler: function () {
                        var conditionData = exportChoose.getSelectedRows();
                        var changeAfter = new Array()
                        for (var i = 0; i < conditionData.length; i++) {
                            changeAfter[i] = conditionData[i].code + "-" + conditionData[i].name;
                        }
                        var queryParams = coco.page.model.getCardDataJson("queryForm");
                        coco.utils.exportDataExA("tbList", pageParam.filterStr, pageParam.title, queryParams);
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#exportChoose').dialog('close');

                    }
                }
            ]
        });
    },
    initGrid: function (hasRight, ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: "用户列表",
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
                    {
                        field: page.idField,
                        title: "操作",
                        width: ckWidth,
                        align: 'center',
                        formatter: page.handleFormatter,
                        hidden: !hasRight,
                        opt: true
                    },
                    {title: '登录编码', field: 'username', width: 80, align: 'center', sortable: true},
                    {title: '用户名', field: 'name', width: 80, align: 'center', sortable: true}
                ]
            ],
            columns: [
                [
                    {title: '部门名称', field: 'deptName', width: 120, align: 'center', sortable: true},
                    {title: '职位', field: 'postName', width: 120, align: 'center', sortable: true},
                    {title: '性别', field: 'sexName', width: 60, align: 'center', sortable: true},
                    {title: '办公电话', field: 'officeTel', width: 120, align: 'center', sortable: true},
                    {title: '手机', field: 'mobile', width: 120, align: 'center', sortable: true},
                    {title: '邮箱', field: 'email', width: 120, align: 'center', sortable: true},
                    {title: '所属角色', field: 'roleNames', width: 120, align: 'center', sortable: true},
                    {
                        title: '所属角色ID',
                        field: 'roleIds',
                        width: 120,
                        align: 'center',
                        sortable: true,
                        hidden: true,
                        opt: true
                    },
                    {title: '状态', field: 'stateName', width: 80, align: 'center', sortable: true}
                ]
            ],
            rowStyler: function (index, row) {
                if (row.status == 0) {
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
            status: "1",
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
        var hasGrant = $("#permissionGrant").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.edit('" + value + "')>[详细]</a>";
        if (hasDel) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        if (hasGrant) s += "<a href='###' class='coco_opt' onclick=page.grant('" + value + "','" + rowData["roleIds"] + "')>[角色授权]</a>";
        return s;
    },
    //角色授权
    grant: function (id, roleIds) {
        userCombo.setValue(id);
        roleCombo.setValue(roleIds);
        $('#role_grant').dialog('open');
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
