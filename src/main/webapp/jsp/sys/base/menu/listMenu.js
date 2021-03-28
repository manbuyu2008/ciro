$(function () {
    init();
    window.checkValid = page.checkValid;
});

function init() {
    page._init();
    page.initTree();
    page.initGrid();
    collapse();
    sys_loaded();
}
function collapse() {
    $("#layout").layout("collapse", "west");
}
var menuTree;
var comboPrivPerson;
page = $.extend(page, {
    idField: "id",
    _init: function () {
        $('#queryForm').form('load', pageParam.queryParams);
        comboPrivPerson = coco.plugin.combo.comboPrivPerson({
            comboId: "status",
            canEmpty: true,
            value: $("#status").val()
        });
    },
    initGrid: function () {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        var dataParams = { data: queryParams };
        $('#tbList').datagrid({
            title: "菜单列表",
            idField: page.idField,
            nowrap: false,
            fit: true,
            fitColumns: true,
            striped: true,
            url: 'data',
            singleSelect: true,
            pageList: [20, 50, 100],
            pageSize: pageParam.pageSize,
            pageNumber: pageParam.pageNumber,
            queryParams: dataParams,
            frozenColumns: [
                [
                    {field: page.idField, title: "操作", width: 80, align: 'center', formatter: page.handleFormatter},
                    {title: '编码', field: 'code', width: 80, align: 'center', sortable: true},
                    {title: '菜单名称', field: 'name', width: 80, align: 'center', sortable: true}
                ]
            ],
            columns: [
                [
                    {title: '上级菜单', field: 'parentName', width: 120, align: 'center', sortable: true},
                    {title: '菜单排序', field: 'menuOrder', width: 120, align: 'center', sortable: true},
                    {title: '菜单链接', field: 'menuUrl', width: 120, align: 'center', sortable: true},
                    {title: '菜单图标', field: 'menuIcon', width: 120, align: 'center', sortable: true},
                    {title: '包含按钮', field: 'buttonsName', width: 220, align: 'center', sortable: true},
                    {title: '是否根节点', field: 'isLeaf', width: 120, align: 'center', sortable: true, formatter: page.leafFormatter},
                    {title: '级别', field: 'status', width: 120, align: 'center', sortable: true, formatter: page.statusFormatter}
                ]
            ],
            rowStyler: function (index, row) {
                if (row.status != 0) {
                    return 'color:#CC2222;';
                }
            },
            pagination: true,
            rownumbers: true
        });
    },
    //初始化树
    initTree: function () {
        menuTree = coco.plugin.tree.MenuOutTree({      //整个树
            treeId: "menuTree",
            loadall:true,
            onClick: function (node) {
                $("#menu").val(node.id);
                page.query();//刷新datagrid
            }
        });
        if (menuTree) {
            menuTree.tree("expandAll", menuTree.tree("getRoot").target);
            /*树展开一级*/
            menuTree.tree("select", menuTree.tree("getRoot").target);
            $("#menu").val(menuTree.tree("getRoot").id);
        }
        $("#oneMenu").checked = false;
    },
    oneMenu: function (check) {
        if (check) {
            $("#oneMenuSelect").val(1);
            page.query();
            return;
        }
        $("#oneMenuSelect").val(0);
        page.query();
        return;
    },
    statusFormatter: function (value, rowData, rowIndex) {
        if (value == 0) return "用户";
        else   return "系统";
    },
    leafFormatter: function (value, rowData, rowIndex) {
        if (value == 1) return "是";
        else   return "否";
    },
    //操作列
    handleFormatter: function (value, rowData, rowIndex) {
        if (!1 == 1) return "<span style='color: gray;'>无权限</span>";
        var s = "";
        if (1 == 1) s += "<a href='###' class='coco_opt' onclick=page.edit('" + value + "')>[详细]</a>";
        if (1 == 1) s += "<a href='###' class='coco_opt' onclick=page.del('" + value + "')>[删除]</a>";
        return s;
    },
    //查询时的条件验证；
    checkValid: function () {
        return true;
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
