var page = {
    //查询/刷新
    query: function () {
        if (!coco.page.model.checkValid("queryForm")) return;
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        coco.eui.grid.setGridPageNumber("tbList", 1);
        $("#tbList").datagrid("reload", {query: true, data: queryParams });
    },
    //新增
    card: function () {
        var pager = $('#tbList').datagrid('getPager');
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.card("", data);
    },
    //编辑
    edit: function (id) {
        var pager = $('#tbList').datagrid('getPager');
        var pagination = $('#tbList').datagrid('options').pagination;
        var pageSize = 0;
        var pageNumber = 0;
        if (pager && pagination) {
            pageSize = pager.pagination("options").pageSize;
            pageNumber = pager.pagination("options").pageNumber;
        }
        var data = $$json.stringify({pageSize: "" + pageSize, pageNumber: "" + pageNumber, queryParams: coco.page.model.getCardDataStr("queryForm")});
        coco.page.model.card(id, data);
    },
    //删除
    del: function (id) {
        coco.page.model.del(id, function (success) {
            if (success) {
                $("#tbList").datagrid("reload");
            }
        });
    },
    exportExcel: function () {
        var queryParams = coco.page.model.getCardDataStr("queryForm");
        coco.utils.exportExcelExA("tbList", pageParam.filterStr, pageParam.title, $$json.parse(queryParams));
    }
};