/**
 * combogrid - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *   datagrid
 *
 */
(function ($) {
    /**
     * 创建grid
     * @param target
     * @param panel
     */
    function createGrid(target, panel) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;
        var t = $(target);

        if (!grid) {
            grid = $('<table comboid="' + t.attr('id') + '"></table>').appendTo(panel);
            state.grid = grid;
        }
        grid.datagrid($.extend({}, opts, {
            border:false,
            fit:true,
            singleSelect:(!opts.multiple),
            onLoadSuccess:function (data) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                var remainText = state.remainText;
                var values = $(target).combo('getValues');
                setValues(target, values, remainText, state);
                opts.onLoadSuccess.apply(target, arguments);
            },
            onClickRow:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                state.remainText = false;
                retrieveValues(target, state);
                var $target = $(target);
                if (!opts.multiple) {
                    $target.combo('hidePanel');
                }
                $target.combo('textbox').focus().select();
                opts.onClickRow.call(this, index, row);
            },
            onSelect:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelect.call(this, index, row);
            },
            onUnselect:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onUnselect.call(this, index, row);
            },
            onSelectAll:function (rows) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelectAll.call(this, rows);
            },
            onUnselectAll:function (rows) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                if (opts.multiple) retrieveValues(target, state);
                opts.onUnselectAll.call(this, rows);
            }
        }));

        /**
         * retrieve values from datagrid panel.
         */
        function retrieveValues(target, state) {
            if (!state) state = $.data(target, 'combogrid');
            var grid = state.grid;
            var t = $(target);
            var remainText = state.remainText;
            var rows = grid.datagrid('getSelections');
            var vv = [], ss = [];
            if(opts.multiple && opts.canSearch && t.combo('getText') != ""){
                //add by lizhentao 20141008 添加处理多选搜索设值处理
                var cv = {}, //当前选中值
                    gv = {}, //表格中的值
                    gr = grid.datagrid('getData').rows, //表格所有数据
                    ov = t.combo('getValues'), //原选中值
                    ot = t.combo('getText').split(opts.separator); //原值文本
                for(var i = 0; i < rows.length; i++){
                    cv[rows[i][opts.idField]] = rows[i];
                }
                for(var i = 0; i < gr.length; i++){
                    if(!cv[gr[i][opts.idField]]){
                        gv[gr[i][opts.idField]] = gr[i];
                    }
                }
                for(var i = 0; i < ov.length; i++){
                    if(cv[ov[i]]){//原值处于选中状态
                        vv.push(ov[i]);
                        ss.push(cv[ov[i]][opts.textField]);
                        cv[ov[i]] = false; //选中值已处理，移除
                    }else if(!gv[ov[i]]){//原值不在表格中，保留原值
                        vv.push(ov[i]);
                        ss.push(ot[i]);
                    }
                }
                //处理未处理的选中值
                for(var id in cv){
                    if(cv[id]){
                        vv.push(id);
                        ss.push(cv[id][opts.textField]);
                    }
                }
            }else{
                for (var i = 0, len = rows.length; i < len; i++) {
                    var row = rows[i];
                    vv.push(row[opts.idField]);
                    ss.push(row[opts.textField]);
                }
            }
            if (!remainText) {
                t.combo('setText', ss.join(opts.separator));
            }
            if (!opts.multiple) {
                t.combo('setValues', (vv.length ? vv : ['']));
            } else {
                t.combo('setValues', vv);
            }
        }
    }

    /**
     * create this component.
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        var t = $(target);
        if (!t.attr("id")) t.attr("id", $.parser.getObjGUID());
        t.addClass('combogrid-f');
        //创建panel之后，再创建grid
        opts.afterPanelInited = createGrid;
        t.combo(opts);
    }


    /**
     * select the specified row via step value,
     */
    function selectRow(target, step, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        var rowCount = grid.datagrid('getRows').length;
        state.remainText = false;

        var index;
        var selections = grid.datagrid('getSelections');
        if (selections.length) {
            index = grid.datagrid('getRowIndex', selections[selections.length - 1][opts.idField]);
            index += step;
            if (index < 0) index = 0;
            if (index >= rowCount) index = rowCount - 1;
        } else if (step > 0) {
            index = 0;
        } else if (step < 0) {
            index = rowCount - 1;
        } else {
            index = -1;
        }
        if (index >= 0) {
            grid.datagrid('clearSelections');
            grid.datagrid('selectRow', index);
            if (step == 0) {//触发onclickrow事件
                opts.onClickRow.call(this, index, grid.datagrid('getRowByIndex', index));
            }
        }
    }

    /**
     * select the specified row via step value,
     */
    function selectPage(target, step) {
        var state = $.data(target, 'combogrid');
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        var gridopts = grid.datagrid("options");
        if (!gridopts.pagination) return;
        var pagenum = gridopts.pageNumber;
        var pager;
        if (step < 0 && pagenum > 1) {
            pager = grid.datagrid("getPager");
            pager.pagination("select", pagenum - 1);
        } else if (step > 0) {
            pager = grid.datagrid("getPager");
            var page = pager.pagination("getPageCount");
            if (pagenum < page) pager.pagination("select", pagenum + 1);
        }
    }

    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combogrid');
        var t = $(target);
        var opts = state.options;
        var grid = state.grid;

        if (!grid) {
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        } else {
            var rows = grid.datagrid('getRows');
            var ss = [];
            state.donotFired = true;
     		grid.datagrid('clearSelections');
            for (var i = 0, len = values.length; i < len; i++) {
                var value = values[i];
                if (value == "") continue;
                var index = grid.datagrid('getRowIndex', value);
                if (index >= 0) {
                    grid.datagrid('selectRow', index);
                    ss.push(rows[index][opts.textField]);
                } else {
                    //ss.push(value);
                    /*** liuh fix 2013/09/29 若在数据中未找到相对应的值,则给予原文本值 ***/
                    var _text = t.combo('getText');
                    //edit by lizhentao 20141008 解决多选文本显示问题
                    ss.push(_text.split(opts.separator)[i]);
                }
            }
            state.donotFired = false;
            if (!remainText) {
                t.combo('setText', ss.join(opts.separator));
            }
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        }
        if (opts.onAfterChange) opts.onAfterChange.call(target);
    }

    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        state.remainText = true;

        /*if (opts.multiple && !q) {
            setValues(target, [], true, state);
        } else {
            setValues(target, [q], true, state);
        }*/
        try {
            if (opts.onQuery) opts.onQuery.call(target, q);
            else if (opts.mode == 'remote') {
                grid.datagrid('clearSelections');
                grid.datagrid('load', $.extend({}, opts.queryParams, {q: q}));
            } else {
                if (!q) return;
                var rows = grid.datagrid('getRows');
                for (var i = 0, len = rows.length; i < len; i++) {
                    if (opts.filter.call(target, q, rows[i], opts)) {
                        grid.datagrid('clearSelections');
                        grid.datagrid('selectRow', i);
                        return;
                    }
                }
            }
        } finally {
           // state.remainText = false;
        }
    }

    function getGrid(target) {
        var state = $.data(target, 'combogrid');
        var grid = state.grid;
        if (grid) return grid;
        $(target).combo("panel");
        return state.grid;
    }

    $.fn.combogrid = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combogrid.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return $.fn.combo.methods[options](this, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combogrid');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'combogrid', {
                    options:$.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), options)
                });
            }

            create(this, state);
        }, [options]);
    };

    $.fn.combogrid.methods = {
        options:function (jq) {
            return $.data(jq[0], 'combogrid').options;
        },
        // get the datagrid object.
        grid:function (jq) {
            return getGrid(jq[0]);
        },
        setValues:function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        },
        clear:function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'combogrid');
                var grid = state.grid;
                if (grid) grid.datagrid('clearSelections');
                $(this).combo('clear');
            });
        }
    };

    $.fn.combogrid.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.datagrid.parseOptions(target),
            $.parser.parseOptions(target, ['idField', 'textField', 'mode']));
    };

    $.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
        loadMsg:null,
        idField:null,
        textField:null, // the text field to display.
        mode:'local', // or 'remote'

        keyHandler:{
            up:function () {
                selectRow(this, -1);
            },
            down:function () {
                selectRow(this, 1);
            },
            enter:function () {
                selectRow(this, 0);
                $(this).combo('hidePanel');
            },
            ctrlLeft: function() {
                selectPage(this, -1);
            },
            ctrlRight: function() {
                selectPage(this, 1);
            }
        },
        doQuery: function(q) {
            doQuery(this, q);
        },
        filter:function (q, row, opts) {
            if (!opts) opts = $(this).combogrid('options');
            return row[opts.textField].indexOf(q) == 0;
        }
    });
})(jQuery);
