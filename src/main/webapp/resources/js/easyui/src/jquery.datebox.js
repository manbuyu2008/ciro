/**
 * datebox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      calendar
 *   combo
 *
 */
(function ($) {
    /**
     * create date box
     */
    function createBox(target, state) {
        if (!state) state = $.data(target, 'datebox');
        var opts = state.options, $target = $(target);

        $target.addClass('datebox-f');

        if (!$target.attr("id")) $target.attr("id", $.parser.getObjGUID());
        opts.afterPanelInited = createCalendar;
        $target.combo($.extend({}, opts, {
            onShowPanel:function () {
                var target = this;
                var state = $.data(target, 'datebox');
                var opts = state.options;
                state.calendar.calendar('resize');
                opts.onShowPanel.call(target);
                state = null;
                opts = null;
            }
        }));

        var $parent = $target.combo('textbox').parent();
        $parent.addClass('datebox');
        $target.combo('setValueText', {value: opts.value, text:opts.value});
    }

    function createCalendar(target, panel) {
        var state = $.data(target, 'datebox');
        var opts = state.options;
        var $target = $(target);

        state.calendar = $('<div comboid="' + $target.attr('id') + '"></div>').appendTo(panel).wrap('<div class="datebox-calendar-inner"></div>');
        state.calendar.calendar({
            fit:true,
            border:false,
            onSelect:function (date) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'datebox');
                var opts = state.options, $target = $(target);

                var value = opts.formatter(date);
                setValue(target, value, state);
                $target.combo('hidePanel');
                $target.combo('textbox').focus().select();
                opts.onSelect.call(target, date);
            }
        });
        setValue(target, $target.combo('getValue'), state);

        var button = $('<div class="datebox-button"></div>').appendTo(panel);
        $('<a href="javascript:void(0)" class="datebox-current">' + opts.currentText + '</a><a href="javascript:void(0)" class="datebox-close">' + opts.closeText + '</a>').appendTo(button);
        button.find('.datebox-current,.datebox-close').hover(
            function () {
                $(this).addClass('datebox-button-hover');
            },
            function () {
                $(this).removeClass('datebox-button-hover');
            }
        );
        button.find('.datebox-current').bind('click', {target: target}, function (e) {
            var state = $.data(e.data.target, 'datebox');
            state.calendar.calendar({
                year:new Date().getFullYear(),
                month:new Date().getMonth() + 1,
                current:new Date()
            });
        });
        button.find('.datebox-close').bind('click', {target: target}, function (e) {
            var $target = $(e.data.target);
            $target.combo('hidePanel');
            $target.combo('textbox').focus().select();
        });
    }

    /**
     * called when user inputs some value in text box
     */
    function doQuery(target, q) {
        setValue(target, q);
    }

    /**
     * called when user press enter key
     */
    function doEnter(target) {
        var state = $.data(target, 'datebox');
        var opts = state.options;
        var c = state.calendar;
        var value = opts.formatter(c.calendar('options').current);
        setValue(target, value, state);
        $(target).combo('hidePanel');
    }

    function setValue(target, value, state) {
        if (!state) state = $.data(target, 'datebox');
        var opts = state.options;
        $(target).combo('setValue', value).combo('setText', value);
        if (state.calendar && value && value != '') state.calendar.calendar('moveTo', opts.parser(value));
    }

    $.fn.datebox = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.datebox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = $.extend({validType: "isDate"}, options);
        return this.each(function (options) {
            var state = $.data(this, 'datebox');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'datebox', {
                    options:$.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options)
                });
            }
            createBox(this, state);
        }, [options]);
    };

    $.fn.datebox.methods = {
        options:function (jq) {
            return $.data(jq[0], 'datebox').options;
        },
        calendar:function (jq) {    // get the calendar object
            return $.data(jq[0], 'datebox').calendar;
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        }
    };

    $.fn.datebox.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), {
        });
    };

    $.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
        panelWidth:180,
        panelHeight:'auto',

        keyHandler:{
            up:function () {
            },
            down:function () {
            },
            enter:function () {
                doEnter(this);
            },
            query:function (q) {
                doQuery(this, q);
            }
        },
        doQuery: function(q) {
            doQuery(this, q);
        },
        currentText:'Today',
        closeText:'Close',
        okText:'Ok',

        formatter:function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return m + '/' + d + '/' + y;
        },
        parser:function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        },

        onSelect:function (date) {
        }
    });
})(jQuery);
