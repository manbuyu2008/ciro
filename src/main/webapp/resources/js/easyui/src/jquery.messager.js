/**
 * messager - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *     linkbutton
 *  window
 *  progressbar
 */
(function ($) {

    /**
     * show window with animate, after sometime close the window
     */
    function show(el, type, speed, timeout) {
        var win = $(el).window('window');
        if (!win) return;

        switch (type) {
            case null:
                win.show();
                break;
            case 'slide':
                win.slideDown(speed);
                break;
            case 'fade':
                win.fadeIn(speed);
                break;
            case 'show':
                win.show(speed);
                break;
        }

        var timer = null;
        if (timeout > 0) {
            timer = setTimeout(function () {
                hide(el, type, speed);
            }, timeout);
        }
        win.hover(
            function () {
                if (timer) {
                    clearTimeout(timer);
                }
            },
            function () {
                if (timeout > 0) {
                    timer = setTimeout(function () {
                        hide(el, type, speed);
                    }, timeout);
                }
            }
        )

    }

    /**
     * hide window with animate
     */
    function hide(el, type, speed) {
        if (el.locked == true) return;
        el.locked = true;

        var win = $(el).window('window');
        if (!win) return;

        switch (type) {
            case null:
                win.hide();
                break;
            case 'slide':
                win.slideUp(speed);
                break;
            case 'fade':
                win.fadeOut(speed);
                break;
            case 'show':
                win.hide(speed);
                break;
        }

        setTimeout(function () {
            $(el).window('destroy');
            el = null;
        }, speed);
    }

    /**
     * create a dialog, when dialog is closed destroy it
     */
    function createDialog(title, content, buttons) {
        var id = $.parser.getObjGUID();
        var win = $('<div id="' + id + '" class="messager-body"></div>').appendTo('body');
        win.append(content);
        if (buttons) {
            var tb = $('<div class="messager-button"></div>').appendTo(win);
            for (var label in buttons) {
                $('<a></a>').attr('href', 'javascript:void(0)').text(label)
                    .css('margin-left', 10)
                    .bind('click', eval(buttons[label]))
                    .appendTo(tb).linkbutton();
            }
        }
        win.window({
            title: title,
            noheader: (title ? false : true),
            width: 300,
            height: 'auto',
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function () {
                setTimeout(function () {
                    $('#' + id).window('destroy');
                }, 100);
            }
        });
        win.window('window').addClass('messager-window');
        win.children('div.messager-button').children('a:first').focus();
        return win;
    }

    $.messager = {
        show: function (options) {
            var opts = $.extend({
                showType: 'slide',
                showSpeed: 600,
                width: 250,
                height: 100,
                msg: '',
                title: '',
                timeout: 4000
            }, options || {});

            var win = $('<div class="messager-body"></div>').html(opts.msg).appendTo('body');
            var showType = opts.showType, showSpeed = opts.showSpeed, timeout = opts.timeout;
            win.window({
                title: opts.title,
                width: opts.width,
                height: opts.height,
                collapsible: false,
                minimizable: false,
                maximizable: false,
                shadow: false,
                draggable: false,
                resizable: false,
                closed: true,
                onBeforeOpen: function () {
                    show(this, showType, showSpeed, timeout);
                    return false;
                },
                onBeforeClose: function () {
                    hide(this);
                    /*zhenggm：去掉效果, opts.showType, opts.showSpeed*/
                    return false;
                },
                onResize: function () {
                    var id = this.id;
                    setTimeout(function () {
                        $('#' + id).window('window').css({
                            left: '',
                            top: '',
                            right: 0,
                            bottom: -document.body.scrollTop - document.documentElement.scrollTop
                        });
                    }, 50);
                }
            });

            // set the message window to the right bottom position
            win.window('window').css({
                left: '',
                top: '',
                right: 0,
                zIndex: $.fn.window.defaults.zIndex++,
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            });
            win.window('open');
        },

        alert: function (title, msg, icon, fn) {
            var content = '<div>' + msg + '</div>';
            switch (icon) {
                case 'error':
                    content = '<div class="messager-icon messager-error"></div>' + content;
                    break;
                case 'info':
                    content = '<div class="messager-icon messager-info"></div>' + content;
                    break;
                case 'question':
                    content = '<div class="messager-icon messager-question"></div>' + content;
                    break;
                case 'warning':
                    content = '<div class="messager-icon messager-warning"></div>' + content;
                    break;
            }
            content += '<div style="clear:both;"/>';

            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).dialog({closed: true});
                if (fn) {
                    fn();
                    return false;
                }
            };
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
        },

        confirm: function (title, msg, fn) {
            var content = '<div class="messager-icon messager-question"></div>'
                + '<div>' + msg + '</div>'
                + '<div style="clear:both;"/>';
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn(true);
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn(false);
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
        },

        prompt: function (title, msg, fn) {
            var content = '<div class="messager-icon messager-question"></div>'
                + '<div>' + msg + '</div>'
                + '<br/>'
                + '<input class="messager-input" type="text"/>'
                + '<div style="clear:both;"/>';
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn($('.messager-input', win).val());
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
            win.children('input.messager-input').focus();
        },

        promptEx: function (title, msg, fn) {
            var content = msg;
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                var win = $('#' + id);
                if (!win.form('validate')) return;
                win.window('close');
                if (fn) {
                    fn($('.messager-input', win).val());
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
            $.parser.parse(win);
            win.children('input.messager-input').focus();
        },

        progress: function (options) {
            var opts = $.extend({
                title: '',
                msg: '',	// The message box body text
                text: undefined,	// The text to display in the progress bar
                interval: 300	// The length of time in milliseconds between each progress update
            }, options || {});

            var methods = {
                bar: function () {	// get the progress bar object
                    return $('body>div.messager-window').find('div.messager-p-bar');
                },
                close: function () {	// close the progress window
                    var win = $('#' + id);
                    if (win.length) {
                        if (win[0].timer) {
                            clearInterval(win[0].timer);
                        }
                        win.window('close');
                    }
                }
            };

            if (typeof options == 'string') {
                var method = methods[options];
                return method();
            }

            var content = '<div class="messager-progress"><div class="messager-p-msg"></div><div class="messager-p-bar"></div></div>';
            var win = createDialog(opts.title, content, null);
            var id = win.attr('id');
            win.find('div.messager-p-msg').html(opts.msg);
            var bar = win.find('div.messager-p-bar');
            bar.progressbar({
                text: opts.text
            });
            win.window({
                closable: false
            });

            if (opts.interval) {
                win[0].timer = setInterval(function () {
                    var bar = $('#' + id).find('div.messager-p-bar');
                    var v = bar.progressbar('getValue');
                    v += 10;
                    if (v > 100) v = 0;
                    bar.progressbar('setValue', v);
                }, opts.interval);
            }
        }
    };

    $.messager.defaults = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

})(jQuery);
