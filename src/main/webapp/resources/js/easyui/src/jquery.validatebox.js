/**
 * validatebox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 */
(function ($) {

    function init(target) {
        $(target).addClass('validatebox-text');
    }

    /**
     * destroy the box, including it's tip object.
     */
    function destroyBox(target) {
        var state = $.data(target, 'validatebox');
        state.validating = false;
        var tip = state.tip;
        if (tip) {
            tip.remove();
        }
        var $target = $(target);
        $target.unbind();
        $target.remove();
    }

    /**
     * 取消验证 Liuh since 2013/12/25
     *
     * @param target
     * @param options
     */
    function cancelValidate(target, options) {
        var state = $.data(target, 'validatebox');
        state.validating = false;
        options.rules = state.options.rules;
        state.options = options;
        var tip = state.tip;
        if (tip) {
            tip.remove();
        }
        var $target = $(target);
        //$target.unbind();
        $target.removeClass('validatebox-text validatebox-invalid');
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var box = $(target);

        state.validating = false;
        //输入监听
        var en = $.browser.msie ? "propertychange.validatebox" : "input.validatebox";
        box.unbind('.validatebox').bind('focus.validatebox',function () {
            var target = this;
            var state = $.data(target, 'validatebox');
            state.validating = true;
            state.value = undefined;
            _validate(target, state);
        }).bind('blur.validatebox',function () {
                var target = this;
                var state = $.data(target, 'validatebox');
                state.validating = false;
                hideTip(target);
            }).bind(en,function () {
                var target = this;
                var state = $.data(target, 'validatebox');
                _validate(target, state);
            }).bind('mouseenter.validatebox',function () {
                var target = this;
                if ($(target).hasClass('validatebox-invalid')) {
                    showTip(target);
                }
            }).bind('mouseleave.validatebox', function () {
                hideTip(this);
            });

        function _validate(target, state) {
            var box = $(target);
            if (state.validating) {
                if (state.value != box.val()) {    // when box value changed, validate it
                    state.value = box.val();
                    validate(target);
                }
            }
        }
    }

    /**
     * show tip message.
     */
    function showTip(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var box = $(target);
        var msg = state.message;
        var tip = state.tip;
        if (!tip) {
            tip = $(
                '<div class="validatebox-tip">' +
                    '<span class="validatebox-tip-content">' +
                    '</span>' +
                    '<span class="validatebox-tip-pointer">' +
                    '</span>' +
                    '</div>'
            ).appendTo('body');
            state.tip = tip;
        }
        tip.find('.validatebox-tip-content').html(msg);
        /*zhenggm：提示超出屏幕，处理下位置*/
        /*tip.css({
         display:'block',
         left:box.offset().left + box.outerWidth(),
         top:box.offset().top
         })*/
        var bw = box.outerWidth(), bh = box.outerHeight(), bs = box.offset();
        var x = bs.left + bw, y = bs.top;
        if (x + tip.outerWidth() > document.body.offsetWidth) {
            x = bs.left;
            y = bs.top + bh;
            if (y + tip.outerHeight() > document.body.offsetHeight - 20) y = bs.top - bh;
        }

        // Liuh fix 2013/12/31 若提示文字为空则不显示
        if (msg == '' || msg == null) {
            tip.css({display: 'none', left: x, top: y});
        }
        else {
            tip.css({display: "block", left: x, top: y});
        }
    }

    /**
     * hide tip message.
     */
    function hideTip(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var tip = state.tip;
        if (tip) {
            tip.remove();
            state.tip = null;
        }
    }

    /**
     * 动态验证 Liuh add 2014/01/06
     *
     * @param target
     * @param state
     */
    function activateValidate(target, state) {
        $(target).data('validatebox', state);

        validate(target);
    }

    /**
     * do validate action
     */
    function validate(target) {
        var state = $.data(target, 'validatebox');
        var opts = state.options;
        var box = $(target);
        var value = box.val();

        function setTipMessage(msg) {
            state.message = msg;
        }

        // if the box is disabled, skip validate action.
        var disabled = box.prop('disabled');
        if (disabled == true || disabled == 'true') {
            return true;
        }

        if (opts.required) {
            if (value == '') {
                box.addClass('validatebox-invalid');
                setTipMessage(opts.missingMessage);
                showTip(target, state);
                return false;
            }
        }
        if (opts.customValid) {
            var s = opts.customValid.call(target, value);
            if (typeof s == 'string' && s.length > 0) {
                box.addClass('validatebox-invalid');
                setTipMessage(s);
                showTip(target, state);
                return false;
            }
        } else if (opts.validType) {
            var result = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
            var rule = opts.rules[result[1]];
            if (value && rule) {
                var param = eval(result[2]);
                if (!rule['validator'](value, param)) {
                    box.addClass('validatebox-invalid');

                    var message = rule['message'];
                    if (param) {
                        for (var i = 0; i < param.length; i++) {
                            message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
                        }
                    }
                    setTipMessage(opts.invalidMessage || message);
                    showTip(target, state);
                    return false;
                }
            }
        }

        box.removeClass('validatebox-invalid');
        hideTip(target, state);
        return true;
    }

    $.fn.validatebox = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.validatebox.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'validatebox');
            if (state) {
                $.extend(state.options, options);
            } else {
                init(this);
                state = $.data(this, 'validatebox', {
                    options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), options)
                });
            }

            bindEvents(this, state);
        }, [options]);
    };

    $.fn.validatebox.methods = {
        destroy: function (jq) {
            return jq.each(function () {
                destroyBox(this);
            });
        },
        validate: function (jq) {
            return jq.each(function () {
                validate(this);
            });
        },
        isValid: function (jq) {
            return validate(jq[0]);
        },
        activate: function (jq, state) {
            activateValidate(jq[0], state);
        },
        cancel: function (jq, options) {
            cancelValidate(jq[0], options);
        }
    };

    $.fn.validatebox.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ['validType', 'missingMessage', 'invalidMessage']), {
            required: (t.attr('required') ? true : undefined)
        });
    };

    $.fn.validatebox.defaults = {
        required: false,
        validType: null,
        missingMessage: 'This field is required.',
        invalidMessage: null,
        customValid: undefined,
        rules: {
            email: {
                validator: function (value) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
                },
                message: 'Please enter a valid email address.'
            },
            url: {
                validator: function (value) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
                },
                message: 'Please enter a valid URL.'
            },
            length: {
                validator: function (value, param) {
                    var len = $.trim(value).length;
                    return len >= param[0] && len <= param[1]
                },
                message: 'Please enter a value between {0} and {1}.'
            },
            remote: {
                validator: function (value, param) {
                    var data = {};
                    data[param[1]] = value;
                    var response = $.ajax({
                        url: param[0],
                        dataType: 'json',
                        data: data,
                        async: false,
                        cache: false,
                        type: 'post'
                    }).responseText;
                    return response == 'true';
                },
                message: 'Please fix this field.'
            }
        }
    };
})(jQuery);