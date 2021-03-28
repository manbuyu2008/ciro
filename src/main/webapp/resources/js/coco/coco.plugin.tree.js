coco.plugin.tree = {};
/**
 *部门下拉树形结构
 *
 * @param options
 * @returns {{options: *}}
 */
coco.plugin.tree.deptTree = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.tree(instance.options);
    function initOptions() {
        options = $.extend({
            urlCombo: "/admin/dept/treeCombo/",
            panelWidth:300,
            canSearch:true,
            status:"NORMAL",
            canUse: false,//true-使用 false-查询
            containsStop: false,
            canEmpty:coco.options.canEmpty,
            getParam: function () {
                return {
                    containsStop: options.containsStop,
                    canUse: options.canUse,
                    required: options.required,
                    status: options.status,
                    onlyLeaf: options.isOnlySelectLeaf
                };
            }
        }, options || {});
        return options;
    }
    instance = inst;
    return instance;
};
/**
 *部门树形结构
 *
 * @param options
 * @returns {{options: *}}
 */
coco.plugin.tree.deptOutTree = function (options) {
    var instance = coco.ctrl.tree(initOptions());
    function initOptions() {
        options = $.extend({
            isOnlySelectLeaf:false,
            combotree:false,
            urlCombo: "/admin/dept/treeCombo/",
            getParam:function () {
                return {
                    status: options.status,
                    containsStop: options.containsStop,
                    canUse: options.canUse,
                    required: options.required,
                    onlyLeaf: options.isOnlySelectLeaf
                };
            }
        }, options || {});
        return options;
    }
    return instance;
};

/**
 *菜单下拉树形结构
 *
 * @param options
 * @returns {{options: *}}
 */
coco.plugin.tree.menuTree = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.tree(instance.options);
    function initOptions() {
        options = $.extend({
            urlCombo: "/admin/menu/treeCombo/",
            panelWidth:300,
            canSearch:true,
            canUse: false,//true-使用 false-查询
            containsStop: false,
            canEmpty:coco.options.includeOtherDept,
            getParam: function () {
                return {
                    containsStop: options.containsStop,
                    canUse: options.canUse,
                    required: options.required,
                    status: options.status,
                    isLeaf: options.isLeaf,
                    hasButtons: options.hasButtons,
                    onlyLeaf: options.isOnlySelectLeaf
                };
            }
        }, options || {});
        return options;
    }
    instance = inst;
    return instance;
};

/**
 *菜单树形结构
 *
 * @param options
 * @returns {{options: *}}
 */
coco.plugin.tree.MenuOutTree = function (options) {
    var instance = coco.ctrl.tree(initOptions());
    function initOptions() {
        options = $.extend({
            isOnlySelectLeaf:false,
            combotree:false,
            urlCombo: "/admin/menu/treeCombo/",
            getParam:function () {
                return {
                    status: options.status,
                    hasShowCheck: options.hasShowCheck,
                    master: options.master,
                    roleId: options.roleId,
                    containsStop: options.containsStop,
                    canUse: options.canUse,
                    required: options.required,
                    onlyLeaf: options.isOnlySelectLeaf
                };
            }
        }, options || {});
        return options;
    }
    return instance;
};