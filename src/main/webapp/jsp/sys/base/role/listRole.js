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
    page.initGrid(hasRight, ckWidth);
    sys_loaded();
}
var menuTree;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        $('#role_dialog').dialog({
            title: '权限授权',
            closed: true,
            closable: true,
            modal: true,
            resizable: true,
            buttons: [
                {
                    text: '确认',
                    iconCls: 'icon-ok',
                    handler: function () {
                        page.saveRole();
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#role_dialog').dialog('close');
                    }
                }
            ],
            onOpen: function () {
                $('#role_dialog').dialog("resize", {});  //不加这个，右边边框显示有点问题
                $('#code').focus();
            }
        });
    },
    initGrid: function (hasRight, ckWidth) {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = {data: queryParams};
        $('#tbList').datagrid({
            title: "角色列表",
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
                    {title: '角色编码', field: 'code', width: 180, align: 'center', sortable: true},
                    {title: '角色名称', field: 'name', width: 180, align: 'center', sortable: true}
                ]
            ],
            columns: [
                [
                    {title: '数据权限', field: 'dataName', width: 120, align: 'center', sortable: true}
                ]
            ],
            pagination: true,
            rownumbers: true
        });
    },
    //保存角色授权
    saveRole: function () {
        var nodes = $('#menuTree').tree('getChecked');
        var nodes2 = $('#menuTree').tree('getChecked2');
        var s = '';
        for (var i = 0; i < nodes.length; i++) {
            if (s != '') s += ',';
            s += nodes[i].id;
        }
        if (s == '') {
            coco.utils.msg.slideError("请选择授权功能!");
            return false;
        }
        /*上级下包含未选的下级*/
        var s2 = '';
        for (var i = 0; i < nodes2.length; i++) {
            if (s2 != '') s2 += ',';
            s2 += nodes2[i].id;
        }

        var relFlag = true;
        $.post("saveRole.vm", {ids: s,ids2: s2, roleId: $("#roleId").val()}, function (data) {
            if (data.state) {
                $$msg.slideMsg("保存成功！");
                $('#role_dialog').dialog('close');
            } else {
                $$msg.slideError(data.msg);
                relFlag = false;
                return false;
            }
            $$msg.closeWait();
        }, "json");
        return relFlag;
    },
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        var hasEdit = $("#permissionEdit").val() > 0;
        var hasDel = $("#permissionDel").val() > 0;
        var hasGrant = $("#permissionGrant").val() > 0;
        var s = "";
        if (hasEdit) s += "<a href='###' class='coco_opt' onclick=page.edit('" + value + "')>[详细]</a>";
        if (hasDel) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        if (hasGrant) s += "<a href='###' class='coco_opt' onclick=page.role('" + value + "','" + rowData["dataLevel"] + "')>[权限授权]</a>";
        return s;
    },
    role: function (id, priv) {
        $("#roleId").val(id);
        page.initTree(priv);
        $('#role_dialog').dialog('open');
    },
    //初始化树
    initTree: function (priv) {
        menuTree = coco.plugin.tree.MenuOutTree({      //整个树
            treeId: "menuTree",
            isOnlySelectLeaf: false,
            hasDefRoot: false,
            multiple: true,
            checkbox: true,
            cascadeCheck: true,
            canUse: true,
            hasShowCheck: "1",
            roleId: $("#roleId").val()
        });
        if (menuTree) {
            //menuTree.tree("collapseAll", menuTree.tree("getRoot").target);
            //menuTree.tree("expand", menuTree.tree("getRoot").target);
        }
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
    }
});
