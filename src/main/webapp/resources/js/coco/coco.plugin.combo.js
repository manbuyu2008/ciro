coco.plugin.combo = {};
coco.plugin.combo.comboSex = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            textField: "text",
            emptyValue:"",
            data: [
                {id: "1", text: "男"},
                {id: "2", text: "女"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};


coco.plugin.combo.comboStatus = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "NORMAL", text: "启用"},
                {id: "DISABLE", text: "停用"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};
coco.plugin.combo.comboBoolean = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "YES", text: "是"},
                {id: "NO", text: "否"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};

coco.plugin.combo.comboPrivPerson = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "0", text: "用户"},
                {id: "2", text: "系统"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};

coco.plugin.combo.comboIcon = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "icon-sys", text: "icon-sys"},
                {id: "icon-set", text: "icon-set"},
                {id: "icon-add1", text: "icon-add1"},
                {id: "icon-nav", text: "icon-nav"},
                {id: "icon-users", text: "icon-users"},
                {id: "icon-role", text: "icon-role"},
                {id: "icon-log", text: "icon-log"},
                {id: "icon-delete", text: "icon-delete"},
                {id: "icon-magic", text: "icon-magic"},
                {id: "icon-database", text: "icon-database"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};


/*-----------------------------------考评控件----------------------------------------------------*/
coco.plugin.combo.shType = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "ks", text: "科室考核"},
                {id: "dk", text: "大科考核"},
                {id: "dw", text: "单位考核"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};

coco.plugin.combo.jjf = function (options) {
    var instance = {options: initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            valueField: "id",
            emptyValue:"",
            textField: "text",
            data: [
                {id: "0", text: "加分、奖励"},
                {id: "1", text: "减分"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};

coco.plugin.combo.evalCheck= function (options) {
    var instance = {options:initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            emptyValue:"",
            valueField:"id",
            textField:"text",
            data:[
                {id:"YES", text:"通过"},
                {id:"NO", text:"未通过"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};

coco.plugin.combo.evalBoolean= function (options) {
    var instance = {options:initOptions()};
    var inst = coco.ctrl.combobox(instance.options);

    function initOptions() {
        options = $.extend({
            emptyValue:"",
            valueField:"id",
            textField:"text",
            data:[
                {id:"YES", text:"启用"},
                {id:"NO", text:"停用"}
            ]
        }, options || {});
        return options;
    }

    instance = inst;
    return instance;
};
