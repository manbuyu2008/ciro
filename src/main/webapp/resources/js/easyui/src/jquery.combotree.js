/**
 * combotree - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *      tree
 *
 */
(function ($) {
    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        if (!state.tree) $(target).combo("panel");
        state.remainText = true;

        if (opts.onQuery) opts.onQuery.call(target, q);
        state.remainText = false;
    }

    function doBeforeQuery(target, q, state) {
        if (!state) state = $.data(target, 'combotree');
        state.remainText = true;
    }

    function createTree(target, panel) {
        var state = $.data(target, 'combotree');
        var opts = state.options;
        var tree = state.tree;
        var $target = $(target);
        if (!tree) {
            tree = $('<ul comboid="' + $target.attr('id') + '"></ul>').appendTo(panel);
            state.tree = tree;
        }

        tree.tree($.extend({}, opts, {
            checkbox: opts.multiple,
            onLoadSuccess: function (node, data) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                var $target = $(target);
                var values = $target.combotree('getValues');
                if (opts.multiple) {
                    var nodes = state.tree.tree('getChecked');
                    for (var i = 0, len = nodes.length; i < len; i++) {
                        var id = nodes[i].id;
                        if (indexOfArray(values, id) < 0)
                            values.push(id);
                    }
                }
                setValues(target, values, state.remainText, state);
                opts.onLoadSuccess.call(this, node, data);
            },
            onClick: function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                state.remainText = false;
                var opts = state.options;
                /*huangxl 增加beforeclick事件*/
                if (opts.onBeforeClick && !opts.onBeforeClick.call(target, node)) return;
                retrieveValues(target);
                var $target = $(target);
                if (!opts.multiple) // Liuh 2013/12/13 因支持通过文本选择节点,则多选状态不关闭
                $target.combo('hidePanel');
                $target.combo('textbox').focus().select();
                opts.onClick.call(target, node);
            },
            onSelect:function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelect.call(this, node);
            },
            onUnselect:function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onUnselect.call(this, node);
            },
            onCheck: function (node, checked) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                state.remainText = false;
                retrieveValues(target, state);
                var opts = state.options;
                opts.onCheck.call(target, node, checked);
            }
        }));

        /**
         * retrieve values from tree panel.
         */
        function retrieveValues(target, state) {
            if (!state) state = $.data(target, 'combotree');
            var opts = state.options;
            var tree = state.tree;
            var $target = $(target);
            var vv = [], ss = [];
            if (opts.multiple) {
                var nodes = tree.tree('getChecked');
                for (var i = 0, len = nodes.length; i < len; i++) {
                    vv.push(nodes[i].id);
                    ss.push(nodes[i].text);
                }
            } else {
                var node = tree.tree('getSelected');
                if (node) {
                    vv.push(node.id);
                    ss.push(node.text);
                }
            }
            if (!state.remainText) $target.combo('setText', ss.join(opts.separator)).combo('setValues', vv);
        }
    }

    /**
     * create the combotree component.
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        var $target = $(target);
        $target.addClass('combotree-f');
        if (!$target.attr("id")) $target.attr("id", $.parser.getObjGUID());
        //创建panel之后，再创建grid
        opts.afterPanelInited = createTree;
        $target.combo(opts);
    }

    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        var tree = state.tree;
        var t = $(target);
        if (!tree) {
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        } else {
            tree.find('span.tree-checkbox').addClass('tree-checkbox0').removeClass('tree-checkbox1 tree-checkbox2');
            var vv = [], ss = [];
            state.donotFired = true;
            for (var i = 0, len = values.length; i < len; i++) {
                var v = values[i];
                var s = v;
                var node = tree.tree('find', v);
                if (node) {
                    s = node.text;
                    tree.tree('check', node.target);
                    tree.tree('select', node.target);
                }
                vv.push(v);
                ss.push(s);
            }
            state.donotFired = false;
            if (!remainText) t.combo('setText', ss.join(opts.separator));
            t.combo('setValues', vv);
        }
    }

    /**
     * select the specified row via step value,
     */
    function selectRow(target, step, state) {
        if (!state) state = $.data(target, 'combotree');
        if (!state.tree) $(target).combo("panel");
        var tree = state.tree;
        state.remainText = false;
        if (step < 0) tree.tree("selectPrev");
        else tree.tree("selectNext");
    }

    function getTree(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (tree) return tree;
        $(target).combo("panel");
        return state.tree;
    }

    function expandSelected(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (!tree) return tree;
        var node = tree.tree("getSelected");
        if (node) tree.tree("expand", node.target);
    }

    function collapseSelected(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (!tree) return tree;
        var node = tree.tree("getSelected");
        if (node) tree.tree("collapse", node.target);
    }

    $.fn.combotree = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combotree.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combotree');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'combotree', {
                    options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), options)
                });
            }
            create(this, state);
        }, [options]);
    };


    $.fn.combotree.methods = {
        options: function (jq) {
            return $.data(jq[0], 'combotree').options;
        },
        tree: function (jq) {
            return getTree(jq[0]);
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                var opts = state.options;
                opts.data = data;
                if (!state.tree) $(this).combo("panel");
                var tree = state.tree;

                tree.tree('loadData', data);
            });
        },
        reload: function (jq, url) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                var opts = state.options;
                if (!state.tree) $(this).combo("panel");
                var tree = state.tree;
                if (url) opts.url = url;
                tree.tree({url: opts.url});
            });
        },
        setValues: function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        },
        clear: function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                if (state.tree) {
                    $(this).combo("panel");
                    var tree = state.tree;
                    tree.find('div.tree-node-selected').removeClass('tree-node-selected');
                    var cc = tree.tree('getChecked');
                    for (var i = 0, len = cc.length; i < len; i++) {
                        tree.tree('uncheck', cc[i].target);
                    }
                }
                $(this).combo('clear');
            });
        }
    };

    $.fn.combotree.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.tree.parseOptions(target));
    };

    $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {
        editable: false,
        keyHandler:{
            up:function () {
                selectRow(this, -1);
            },
            down:function () {
                selectRow(this, 1);
            },
            enter:function () {
//                selectRow(this, 0);
                var state = $.data(this, 'combotree');
                var opts = state.options;
                var node = state.tree.tree('getSelected');
                opts.onClick.call(this, node);
                $(this).combo('hidePanel');
            },
            ctrlLeft: function() {
                collapseSelected(this);
            },
            ctrlRight: function() {
                expandSelected(this);
            }
        },
        doBeforeQuery: function(q) {
            doBeforeQuery(this, q);
        },
        doQuery: function(q) {
            doQuery(this, q);
        }
    });
})(jQuery);