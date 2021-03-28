/**
 * linkbutton - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function ($) {

    function createButton(target, state) {
        if (!state) state = $.data(target, 'linkbutton');
        var opts = state.options, $target = $(target);

        $target.empty();
        $target.addClass('l-btn');
        if (opts.id) {
            $target.attr('id', opts.id);
        } else {
            $(target).attr('id', '');
//            $target.removeAttr('id');
        }
        if (opts.plain) {
            $target.addClass('l-btn-plain');
        } else {
            $target.removeClass('l-btn-plain');
        }

        if (opts.text) {
            $target.html(opts.text).wrapInner(
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                    '</span>' +
                    '</span>'
            );
            if (opts.iconCls) {
                $target.find('.l-btn-text').addClass(opts.iconCls).css('padding-left', '20px');
            }
        } else {
            $target.html('&nbsp;').wrapInner(
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                    '<span class="l-btn-empty"></span>' +
                    '</span>' +
                    '</span>'
            );
            if (opts.iconCls) {
                $target.find('.l-btn-empty').addClass(opts.iconCls);
            }
        }
        $target.unbind('.linkbutton').bind('focus.linkbutton',function () {
            var opts = $.data(this, 'linkbutton').options;
            if (!opts.disabled) {
                $(this).find('span.l-btn-text').addClass('l-btn-focus');
            }
        }).bind('blur.linkbutton', function () {
                $(this).find('span.l-btn-text').removeClass('l-btn-focus');
            });

        setDisabled(target, opts.disabled, state);
    }

    function setDisabled(target, disabled, state) {
        if (!state) state = $.data(target, 'linkbutton');
        var $target = $(target);
        if (disabled) {
            state.options.disabled = true;
            var href = $(target).attr('href');
            if (href) {
                state.href = href;
                $target.attr('href', 'javascript:void(0)');
            }
            if (target.onclick) {
                state.onclick = target.onclick;
                target.onclick = null;
            }
//			var onclick = $(target).attr('onclick');
//			if (onclick) {
//				state.onclick = onclick;
//				$(target).attr('onclick', '');
//			}
            $target.addClass('l-btn-disabled');
        } else {
            state.options.disabled = false;
            if (state.href) {
                $target.attr('href', state.href);
            }
            if (state.onclick) {
                target.onclick = state.onclick;
            }
            $target.removeClass('l-btn-disabled');
        }
    }

    function changeIcon(target, iconCls) {
        var state = $.data(target, 'linkbutton');
        var opts = state.options, $target = $(target);
        var btn;
        if (opts.text) {
            btn = $target.find('.l-btn-text');

        } else {
            btn = $target.find('.l-btn-empty');

        }
        if (opts.iconCls) btn.removeClass(opts.iconCls);
        btn.addClass(iconCls);
        opts.iconCls = iconCls;
    }

    $.fn.linkbutton = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.linkbutton.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'linkbutton');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'linkbutton', {
                    options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
                });
                $(this).prop('disabled', false);
            }

            createButton(this, state);
        }, [options]);
    };

    $.fn.linkbutton.methods = {
        options: function (jq) {
            return $.data(jq[0], 'linkbutton').options;
        },
        changeIcon: function (jq, icon) {
            return jq.each(function () {
                changeIcon(this, icon);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
            });
        }
    };

    $.fn.linkbutton.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ['id', 'iconCls', {plain: 'boolean'}]), {
            disabled: (t.prop('disabled') ? true : undefined),
            text: $.trim(t.html()),
            iconCls: (t.attr('icon') || t.attr('iconCls'))
        });
    };

    $.fn.linkbutton.defaults = {
        id: undefined,
        disabled: false,
        plain: false,
        text: '',
        iconCls: undefined
    };

})(jQuery);
