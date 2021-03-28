/**
 * combobox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *
 */
(function ($) {
    /**
     * scroll panel to display the specified item
     */
    function scrollTo(target, value) {
        var panel = $(target).combo('panel');
        var item = panel.find('div.combobox-item[value="' + value + '"]'), h;
        if (item.length) {
            var itop = item.position().top, scrtop = panel.scrollTop();
            if (itop <= 0) {
                h = scrtop + itop;
                panel.scrollTop(h);
            } else {
                var iheight = item.outerHeight(), pnlHeight = panel.height();
                if (itop + iheight > pnlHeight) {
                    h = scrtop + itop + iheight - pnlHeight;
                    panel.scrollTop(h);
                }
            }
        }
    }

    /**
     * select previous item
     */
    function selectPrev(target) {
        var t = $(target);
        var panel = t.combo('panel');
        var values = t.combo('getValues');
        var item = panel.find('div.combobox-item[value="' + values.pop() + '"]');
        if (item.length) {
            var prev = item.prev(':visible');
            if (prev.length) {
                item = prev;
            }
        } else {
            item = panel.find('div.combobox-item:visible:last');
        }
        var value = item.attr('value');
        select(target, value);
//		setValues(target, [value]);
        scrollTo(target, value);
    }

    /**
     * select next item
     */
    function selectNext(target) {
        var t = $(target);
        var panel = t.combo('panel');
        var values = t.combo('getValues');
        var item = panel.find('div.combobox-item[value="' + values.pop() + '"]');

        if (item.length) {
            var next = item.next(':visible');
            if (next.length) {
                item = next;
            }
        } else {
            item = panel.find('div.combobox-item:visible:first');
        }
        var value = item.attr('value');
        select(target, value);
//		setValues(target, [value]);
        scrollTo(target, value);
    }

    /**
     * select the specified value
     */
    function select(target, value, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var i, len;
        if (opts.multiple) {
            var values = $(target).combo('getValues');
            for (i = 0, len = values.length; i < len; i++) {
                if (values[i] == value) return;
            }
            values.push(value);
            setValues(target, values, false, state);
        } else {
            setValues(target, [value], false, state);
        }

        for (i = 0, len = data.length; i < len; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onSelect.call(target, data[i]);
                return;
            }
        }
    }

    /**
     * unselect the specified value
     */
    function unselect(target, value, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var values = $(target).combo('getValues');
        var i, len;
        for (i = 0, len = values.length; i < len; i++) {
            if (values[i] == value) {
                values.splice(i, 1);
                setValues(target, values, false, state);
                break;
            }
        }
        for (i = 0, len = data.length; i < len; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onUnselect.call(target, data[i]);
                return;
            }
        }
    }

    /**
     * set values
     */
    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var t = $(target);
        var panel = t.combo('panel');

        panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
        var vv = [], ss = [];
        for (var i = 0, len = values.length; i < len; i++) {
            var v = values[i];
            var s = v;
            for (var j = 0, lj = data.length; j < lj; j++) {
                if (data[j][opts.valueField] == v) {
                    s = data[j][opts.textField];
                    break;
                }
            }
            if(v||s) {
                vv.push(v);
                ss.push(s);
            }
            panel.find('div.combobox-item[value="' + v + '"]').addClass('combobox-item-selected');
        }

        if (!remainText) {
            t.combo('setText', ss.join(opts.separator));
        }
        t.combo('setValues', vv);
        if (opts.onAfterChange) opts.onAfterChange.call(target);
    }

    function transformData(target, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = [];
        $('>option', target).each(function (opts, data) {
            var item = {};
            var t = $(this);
            var val = t.attr('value'), text = t.html();
            item[opts.valueField] = val != undefined ? val : text;
            item[opts.textField] = text;
            item['selected'] = t.prop('selected');
            data.push(item);
        }, [opts, data]);
        return data;
    }

    /**
     * load data, the old list items will be removed.
     */
    function loadData(target, data, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var t = $(target);
        var panel = t.combo('panel');

        state.data = data;

        var selected = t.combobox('getValues');
        panel.empty();	// clear old data
        for (var i = 0, len = data.length; i < len; i++) {
            var row = data[i];
            var v = row[opts.valueField];
            var s = row[opts.textField];
            var item = $('<div class="combobox-item"></div>').appendTo(panel);
            item.attr('value', v);
            if (opts.formatter) {
                item.html(opts.formatter.call(target, row, opts));
            } else {
                item.html(s);
            }
            if (row['selected']) {
                if (selected.indexOf(v) < 0) selected.push(v);
            }
        }
        if (opts.multiple) {
            setValues(target, selected, remainText, state);
        } else {
            if (selected.length) {
                setValues(target, [selected[selected.length - 1]], remainText, state);
            } else {
                setValues(target, [], remainText, state);
            }
        }

        opts.onLoadSuccess.call(target, data);

        $('.combobox-item', panel).hover(
            function () {
                $(this).addClass('combobox-item-hover');
            },
            function () {
                $(this).removeClass('combobox-item-hover');
            }
        ).bind('click', {target: target}, function (e) {
                var target = e.data.target;
                var state = $.data(target, 'combobox');
                var opts = state.options;
                var item = $(this);
                if (opts.multiple) {
                    if (item.hasClass('combobox-item-selected')) {
                        unselect(target, item.attr('value'), state);
                    } else {
                        select(target, item.attr('value'), state);
                    }
                } else {
                    select(target, item.attr('value'), state);
                    t.combo('hidePanel');
                }
            });
    }

    /**
     * request remote data if the url property is setted.
     */
    function request(target, url, param, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        if (url) opts.url = url;
//		if (!opts.url) return;
        param = param || {};

        if (opts.onBeforeLoad.call(target, param) == false) return;

        var targetId = $(target).attr('id');
        opts.loader.call(target, param, function (data) {
            var target = $('#' + targetId)[0];
            loadData(target, data, remainText);
        }, function () {
            opts.onLoadError.apply(this, arguments);
        }, opts);
    }

    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;

        if (opts.multiple && !q) {
            setValues(target, [], true, state);
        } else {
            setValues(target, [q], true, state);
        }

        if (opts.mode == 'remote') {
            request(target, null, {q:q}, true, state);
        } else {
            var panel = $(target).combo('panel');
            panel.find('div.combobox-item').hide();
            var data = state.data;
            for (var i = 0, len = data.length; i < len; i++) {
                var row = data[i];
                if (opts.filter.call(target, q, row, opts)) {
                    var v = row[opts.valueField];
                    var s = row[opts.textField];
                    var item = panel.find('div.combobox-item[value="' + v + '"]');
                    item.show();
                    if (s == q) {
                        setValues(target, [v], true, state);
                        item.addClass('combobox-item-selected');
                    }
                }
            }
        }
    }

    /**
     * create the component
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var t = $(target);
        t.addClass('combobox-f');
        t.combo($.extend({}, opts, {
            onShowPanel:function () {
                var t = $(this);
                t.combo('panel').find('div.combobox-item').show();
                scrollTo(this, t.combobox('getValue'));
                opts.onShowPanel.call(this);
            }
        }));
    }

    $.fn.combobox = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combobox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combobox');
            if (state) {
                $.extend(state.options, options);
                create(this, state);
            } else {
                state = $.data(this, 'combobox', {
                    options:$.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options)
                });
                create(this, state);
                if (!state.options.data) loadData(this, transformData(this, state), false, state);
            }
            if (state.options.data) {
                loadData(this, state.options.data, false, state);
            }
            request(this, undefined, undefined, false, state);
        }, [options]);
    };


    $.fn.combobox.methods = {
        options:function (jq) {
            return $.data(jq[0], 'combobox').options;
        },
        getData:function (jq) {
            return $.data(jq[0], 'combobox').data;
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
                $(this).combo('clear');
                var panel = $(this).combo('panel');
                panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
            });
        },
        loadData:function (jq, data) {
            return jq.each(function () {
                loadData(this, data);
            });
        },
        reload:function (jq, url) {
            return jq.each(function () {
                request(this, url);
            });
        },
        select:function (jq, value) {
            return jq.each(function () {
                select(this, value);
            });
        },
        unselect:function (jq, value) {
            return jq.each(function () {
                unselect(this, value);
            });
        }
    };

    $.fn.combobox.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, [
            'valueField', 'textField', 'mode', 'method', 'url'
        ]));
    };

    $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
        valueField:'value',
        textField:'text',
        mode:'local', // or 'remote'
        method:'post',
        url:null,
        data:null,

        keyHandler:{
            up:function () {
                selectPrev(this);
            },
            down:function () {
                selectNext(this);
            },
            enter:function () {
                var t = $(this);
                var values = t.combobox('getValues');
                t.combobox('setValues', values);
                t.combobox('hidePanel');
            },
            query:function (q) {
                doQuery(this, q);
            }
        },
        filter:function (q, row, opts) {
            if (!opts) opts = $(this).combobox('options');
            return row[opts.textField].indexOf(q) == 0;
        },
        formatter:function (row, opts) {
            if (!opts) opts = $(this).combobox('options');
            return row[opts.textField];
        },
        loader:function (param, success, error, opts) {
            if (!opts) opts = $(this).combobox('options');
            if (!opts.url) return false;
            $.ajax({
                type:opts.method,
                url:opts.url,
                data:param,
                dataType:'json',
                success:function (data) {
                    success(data);
                },
                error:function () {
                    error.apply(this, arguments);
                }
            });
        },

        onBeforeLoad:function (param) {
        },
        onLoadSuccess:function () {
        },
        onLoadError:function () {
        },
        onSelect:function (record) {
        },
        onUnselect:function (record) {
        }
    });
})(jQuery);