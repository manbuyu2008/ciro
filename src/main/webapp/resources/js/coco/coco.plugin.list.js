coco.plugin.list = {};
coco.plugin.list.userList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", username:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "username", title: "编码", width: 60},
                    {field: "name", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/admin/user/combo/",
            getParam: function () {
                return {
                    dept: instance.options.dept,
                    state: instance.options.state   /**/
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setDept = function (dept) {
        if (instance.options.dept == dept) return;
        instance.options.dept = dept;
        instance.refresh();
    };
    instance.setState = function (state) {
        if (instance.options.state == state) return;
        instance.options.state = state;
        instance.refresh();
    };
    return instance;
};

coco.plugin.list.roleList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", code:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "code", title: "角色编码", width: 60},
                    {field: "name", title: "角色名称", width: 100}
                ]
            ],
            urlCombo: "/admin/role/combo/",
            getParam: function () {
                return {
                    code: instance.options.code,
                    isAdmin: instance.options.isAdmin
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setDept = function (dept) {
        if (instance.options.dept == dept) return;
        instance.options.dept = dept;
        instance.refresh();
    };
    return instance;
};

coco.plugin.list.evalTypeList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", typeCode:"", typeName:"(空)"},
            idField: "id",
            textField: "typeName",
            canPage: true,
            columns: [
                [
                    {field: "typeCode", title: "编码", width: 60},
                    {field: "typeName", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/eval/userType/combo/",
            getParam: function () {
                return {
                    dept: instance.options.dept
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setDept = function (dept) {
        if (instance.options.dept == dept) return;
        instance.options.dept = dept;
        instance.refresh();
    };
    return instance;
};

coco.plugin.list.evalStdList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", code:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "code", title: "编码", width: 60},
                    {field: "name", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/eval/evalStd/combo/",
            getParam: function () {
                return {
                    status: instance.options.status,
                    eventType: instance.options.eventType
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setStatus = function (status) {
        if (instance.options.status == status) return;
        instance.options.status = status;
        instance.refresh();
    };
    instance.setEventType = function (eventType) {
        if (instance.options.eventType == eventType) return;
        instance.options.eventType = eventType;
        instance.refresh();
    };
    return instance;
};


coco.plugin.list.evalLevelList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", code:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "code", title: "编码", width: 60},
                    {field: "name", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/eval/evalLevel/combo/",
            getParam: function () {
                return {
                    status: instance.options.status
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setStatus = function (status) {
        if (instance.options.status == status) return;
        instance.options.status = status;
        instance.refresh();
    };
    return instance;
};

coco.plugin.list.evalFlowList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "name", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/eval/evalFlow/combo/",
            getParam: function () {
                return {
                    status: instance.options.status
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setStatus = function (status) {
        if (instance.options.status == status) return;
        instance.options.status = status;
        instance.refresh();
    };
    return instance;
};

coco.plugin.list.evalZqList = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.list(instance.options);
    function initOptions() {
        options = $.extend({
            emptyRow:{id:"", code:"", name:"(空)"},
            idField: "id",
            textField: "name",
            canPage: true,
            columns: [
                [
                    {field: "code", title: "编码", width: 60},
                    {field: "name", title: "名称", width: 100}
                ]
            ],
            urlCombo: "/eval/evalZq/combo/",
            getParam: function () {
                return {
                    isNeed: instance.options.isNeed,
                    status: instance.options.status
                };
            }
        }, options || {});
        return options;
    }

    instance = inst;
    instance.setIsNeed = function (isNeed) {
        if (instance.options.isNeed == isNeed) return;
        instance.options.isNeed = isNeed;
        instance.refresh();
    };
    instance.setStatus = function (status) {
        if (instance.options.status == status) return;
        instance.options.status = status;
        instance.refresh();
    };
    return instance;
};