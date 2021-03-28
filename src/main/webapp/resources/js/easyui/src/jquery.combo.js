/**
 * combo - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   panel
 *   validatebox
 *
 */
(function ($) {
    function getCssIntValue($target, p) {
        var v = $target.css(p);
        if (v) {
            if (v.endsWith("px")) v = v.substr(0, v.length - 2);
        }
        return "0" + v;
    }

    function setSize(target, width, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;

        if (width) opts.width = width;
//        opts.width = opts.width - getCssIntValue($(target), "padding-left") - getCssIntValue($(target), "padding-right");

        combo.appendTo('body');
        if (isNaN(opts.width)) {
            opts.width = combo.find('input.combo-text').outerWidth();
        }
        var w = opts.width;
        if ($.browser.msie) w += opts.eapborder;
        var arrowWidth = 0;
        if (opts.hasDownArrow) {
            arrowWidth = combo.find('.combo-arrow').outerWidth();
        }
        //修正IE下的bug，子宽度超长，下一句父宽度会设置无效
        var ct = combo.find('input.combo-text');
        combo.width(w);
        alert(combo.width());
        alert(arrowWidth);
        ct.width(combo.width() - arrowWidth);


        // 修正IE下子元素超过父元素宽度
        if (ct.width() > w)
            ct.width(w - arrowWidth);

        //将panel延迟加载
        var panel = state.panel;
        if (panel) setPanelSize(panel, state);

        combo.insertAfter(target);
    }

    //设置panel尺寸
    function setPanelSize(panel, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;

        // 因input控件宽度修改变小,DataGrid默认最小宽度为250
        var w = opts.panelWidth ? opts.panelWidth : state.combo.outerWidth();
        if (opts.columns && w < 250)  w = 250;

        panel.panel('resize', {
            width: w,
            height: opts.panelHeight
        });
    }

    function setDownArrow(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        if (opts.hasDownArrow) {
            combo.find('.combo-arrow').show();
        } else {
            combo.find('.combo-arrow').hide();
        }
    }

    /**
     * create the combo component.
     */
    function init(target, opts) {
        var $target = $(target);
        var tabIndex = $target.attr("tabIndex");
        $target.addClass('combo-f').removeAttr("tabIndex").hide();
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var span = $('<span class="combo"></span>').insertAfter(target);
        var input = $('<input type="text" class="combo-text">').appendTo(span);
        if (tabIndex) {
            $target.attr("tabIndex", "");
            input.attr("tabIndex", tabIndex);
        }
        $('<span><span class="combo-arrow"></span></span><input type="hidden" class="combo-value">').appendTo(span);
        //panel加载延迟，createPanel

        var name = $target.attr('name');
        if (name) {
            span.find('input.combo-value').attr('name', name);
            $target.removeAttr('name').attr('comboName', name);
        }
        input.attr('autocomplete', 'off');
        return {
            combo: span,
            panel: opts.afterPanelInited ? undefined : createPanel(target)
        };
    }

    function createPanel(target) {
        var panel = $('<div class="combo-panel" targetid="' + $(target).attr('id') + '"></div>').appendTo('body');
        panel.panel({
            doSize: false,
            closed: true,
            cls: 'combo-p',
            style: {
                position: 'absolute',
                zIndex: 10
            },
            onOpen: function () {
                $(this).panel('resize');
            },
            onClose: function () {
                var target = $('#' + $(this).attr('targetid'))[0];
                var state = $.data(target, 'combo');
                state.options.onHidePanel.call(target);
            }
        });
        return panel;
    }

    /**
     * panel延迟加载
     */
    function initPanel(target, state) {
        var panel = createPanel(target);

        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        state.panel = panel;
        setPanelSize(panel, state);
        //buildEvents
        buildPanelEvents(panel, opts.disabled);
        if (opts.afterPanelInited) opts.afterPanelInited(target, panel);
        return panel;
    }

    function buildPanelEvents(panel, disabled) {
        panel.unbind('.combo');
//        if (!disabled) {
//            panel.bind('mousedown.combo', function (e) {
//                return false;
//            });
//        }
    }

    function destroy(target) {
        var state = $.data(target, 'combo');
        var input = state.combo.find('input.combo-text');
        input.validatebox('destroy');
        if (state.panel) state.panel.panel('destroy');
        state.combo.remove();
        $(target).remove();
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        var input = combo.find('.combo-text');
        var arrow = combo.find('.combo-arrow');
        /*$(target).unbind(".combo").bind("_resize", function() {
         setSize(this);
         });*/
        $(document).unbind('.combo').bind('mousedown.combo', function (e) {
            var allPanel = $('body>div.combo-p>div.combo-panel');
            var p = $(e.target).closest('div.combo-panel', allPanel);
            if (p.length) {
                return;
            }
            allPanel.panel('close');
        });

        combo.unbind('.combo');
        var panel = state.panel;
        if (panel) buildPanelEvents(panel, opts.disabled);
        input.unbind('.combo');
        arrow.unbind('.combo');

        if (!opts.disabled) {
            input.bind('mousedown.combo',function (e) {
                e.stopPropagation();
            }).bind('keydown.combo', {target: target},function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'combo');
                    var opts = state.options;
                    var input = $(this);
                    switch (e.keyCode) {
                        case 38:    // up
                            if (opts.keyHandler.up) opts.keyHandler.up.call(target, input.val());
                            break;
                        case 40:    // down
                            if (!isPanelVisible(target, state)) {
                                var comboId = $(target).attr('id');
                                setTimeout(function () {
                                    var target = $('#' + comboId)[0];
                                    var state = $.data(target, 'combo');
                                    showPanel(target, state);
                                    validate(target, true, state);
                                }, 0);
                            }
                            else if (opts.keyHandler.down) opts.keyHandler.down.call(target, input.val());
                            break;
                        case 13:    // enter
                            if (isPanelVisible(target, state)) {
                                e.preventDefault();
                                if (opts.keyHandler.enter) opts.keyHandler.enter.call(target, input.val());
                                return false;
                            }
                        case 9:        // tab
                        case 27:    // esc
                            hidePanel(target, state);
                            break;
                        case 37:
                            if (e.ctrlKey && opts.keyHandler.ctrlLeft) {
                                opts.keyHandler.ctrlLeft.call(target, input.val());
                                return false;
                            }
                            break;
                        case 39:
                            if (e.ctrlKey && opts.keyHandler.ctrlRight) {
                                opts.keyHandler.ctrlRight.call(target, input.val());
                                return false;
                            }
                            break;
//                        default:

                    }
                }).bind('input.combo propertychange.combo', {target: target}, function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'combo');
                    var opts = state.options;
                    var q = $(this).val();
                    if (state.isInput && opts.editable && opts.doQuery != null && state.previousValue != q) {
                        if (getValues(target, state).length) setValue(target, '', state);
                        if (state.timer) {
                            clearTimeout(state.timer);
                        }
                        var comboId = $(target).attr('id');
                        state.timer = setTimeout(function () {
                            var target = $('#' + comboId)[0];
                            var state = $.data(target, 'combo');
                            var opts = state.options;
                            var input = state.combo.find('input.combo-text');
                            if (state.previousValue != q) {
                                state.previousValue = q;
                                opts.doBeforeQuery.call(target, q);
                                showPanel(target, state, true);
                                opts.doQuery.call(target, q);
                                validate(target, true, state);
                            }
                        }, opts.delay);
                    }
                });

            arrow.bind('click.combo', {target: target},function (e) {
                var target = e.data.target;
                var state = $.data(target, 'combo');
                var input = $(this);
                if (!state.panel) panel = initPanel(target, state);
                else panel = state.panel;
                if (panel.is(':visible')) {
                    hidePanel(target, state);
                } else {
                    $('div.combo-panel').panel('close');
                    showPanel(target, state);
                }
                input.focus();
            }).bind('mouseenter.combo',function () {
                    $(this).addClass('combo-arrow-hover');
                }).bind('mouseleave.combo',function () {
                    $(this).removeClass('combo-arrow-hover');
                }).bind('mousedown.combo', function () {
                    return false;
                });
        }
    }

    // when window resize, reset the width and height of the window's mask
    $(window).resize(function () {
        $('.combo-f').each(function () {
            hidePanel(this);
        });
    });

    /**
     * show the drop down panel.
     */
    function showPanel(target, state, isQuery) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        var panel = state.panel;
        if (!panel) panel = initPanel(target, state);
        if ($.fn.window) {
            panel.panel('panel').css('z-index', $.fn.window.defaults.zIndex++);
        }

        if (!panel.is(':visible')) {
            //没搞懂，有些时候，panel在hidden的情况下，获取的width会有问题。
            panel.panel('move', {
                left: -9999,
                top: 0
            });
            panel.panel('open');
            opts.onShowPanel.call(target, isQuery);
        }

        function getLeft() {
            var left = combo.offset().left
            var winWidth = document.body.clientWidth + $(document).scrollLeft();//$(window).width() + $(document).scrollLeft();
            var pnlWidth = panel.outerWidth();
            if (left + pnlWidth > winWidth) {
                left = winWidth - pnlWidth;
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        }

        function getTop() {
            var ctop = combo.offset().top, cheight = combo.outerHeight(), wheight = document.body.clientHeight, /*$(window).height(), */scrTop = $(document).scrollTop(), pheight = panel.outerHeight();
            var top = ctop + cheight;
            if (top + pheight > wheight + scrTop) {
                top = ctop - pheight;
            }
            if (top < scrTop) {
                top = ctop + cheight;
            }
            return top;
        }


        (function(){
            if (panel.is(':visible')){
                panel.panel('move', {
                    left:getLeft(),
                    top:getTop()
                });
                setTimeout(arguments.callee, 200);
            }
        })();
    }

    /**
     * hide the drop down panel.
     */
    function hidePanel(target, state) {
        if (!state) state = $.data(target, 'combo');
        var panel = state.panel;
        if (!panel) return;
        panel.panel('close');
//        state.options.onHidePanel.call(target);
    }

    function isPanelVisible(target, state) {
        if (!state) state = $.data(target, 'combo');
        var panel = state.panel;
        return (panel && panel.is(':visible'));
    }

    function validate(target, doit, state) {
        if (!state) state = $.data(target, 'combo');
        var input = state.combo.find('input.combo-text');
        var opts = {};
        if ($(input).data('validatebox')) {
            opts = $(input).data('validatebox').options;
            if (opts.required == undefined) {
                opts.required = false;
            }
        }
		//fix by luoch 2014.05.27
        input.validatebox($.extend(opts,state.options));
        /********* *********/
        //input.validatebox(state.options);
        if (doit) {
            input.validatebox('validate');
            input.trigger('mouseleave');
        }
    }

    function setDisabled(target, disabled, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        if (disabled) {
            opts.disabled = true;
            $(target).prop('disabled', true);
            combo.find('.combo-value').prop('disabled', true);
            combo.find('.combo-text').prop('disabled', true);
        } else {
            opts.disabled = false;
            $(target).prop('disabled', false);
            combo.find('.combo-value').prop('disabled', false);
            combo.find('.combo-text').prop('disabled', false);
        }
    }

    function clear(target, state) {
        setValueText(target, {value: '', text: ''}, state);
    }

    function getText(target, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        return combo.find('input.combo-text').val();
    }

    function setText(target, text, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        state.isInput = false;
        combo.find('input.combo-text').val(text);
        validate(target, true, state);
        if (text) state.previousValue = text; else state.previousValue = '';
        state.isInput = true;
    }

    function getValues(target, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        return combo.find('input.combo-value').val().split(',');
    }

    function setValues(target, values, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var oldValues = getValues(target, state);

        var combo = state.combo;
        combo.find('input.combo-value').val(values.join(','));

        if (values.join(',') != oldValues.join(',')) {
            if (opts.multiple) {
                opts.onChange.call(target, values.join(','), oldValues.join(','));
            } else {
                opts.onChange.call(target, values[0], oldValues[0]);
            }
        }
    }

    /**
     * 设置文本和值
     * @param target
     * @param values
     * @param state
     */
    function setValueTexts(target, values, state) {
        if (!state) state = $.data(target, 'combo');
        var i, len, texts = [], vals = [];
        for (i = 0, len = values.length; i < len; i++) {
            vals.push(values[i].value);
            texts.push(values[i].text);
        }
        setText(target, texts.join(','), state);
        setValues(target, vals, state);
    }

    function setValueText(target, value, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var i, len, values = [];
        if (opts.multiple) {
            var vs = (value.value + '').split(',');
            len = vs.length;
            if (len > 1) {
                var txts = (value.text + '').split(',');
                for (i = 0; i < len; i++) {
                    values.push({value: vs[i], text: txts[i]});
                }
            } else {
                values.push(value);
            }
        } else values.push(value);
        setValueTexts(target, values, state);
    }

    function getValue(target, state) {
        var values = getValues(target, state);
        return values[0];
    }

    function setValue(target, value, state) {
        var values;
        if (value != undefined) values = (value + '').split(',');
        else values = [value];
        setValues(target, values, state);
    }

    /**
     * set the initialized value
     */
    function initValue(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var fn = opts.onChange;
        opts.onChange = function () {
        };
        if (opts.multiple) {
            if (opts.value) {
                if (typeof opts.value == 'object') {
                    setValues(target, opts.value, state);
                } else {
                    setValue(target, opts.value, state);
                }
            } else {
                setValues(target, [], state);
            }
        } else {
            setValue(target, opts.value, state);	// set initialize value
        }
        opts.onChange = fn;
    }

    function getPanel(target) {
        var state = $.data(target, 'combo');
        var panel = state.panel;
        if (panel) return panel;
        return initPanel(target, state);
    }

    function moveTo(target, expr) {
        var state = $.data(target, 'combo');
        $(target).appendTo(expr);
        state.combo.insertAfter(target);
    }

    $.fn.combo = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.combo.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combo');
            var $this = $(this);
            /*默认宽度为input的宽度*/
            if (!options.width || options.width == 'auto') {
                if ($this.is(":visible")) options.width = $this.width();
                else options.width = $this.width() - options.eapborder;
            }

            if (state) {
                $.extend(state.options, options);
                state.isInput = false;
            } else {
                var opts = $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), options);
                var r = init(this, opts);
                state = $.data(this, 'combo', {
                    options: opts,
                    combo: r.combo,
                    panel: r.panel,
                    previousValue: '',
                    isInput: true
                });
                $this.prop('disabled', false);
            }
            $('input.combo-text', state.combo).attr('readonly', !state.options.editable);
            setDownArrow(this, state);
            setDisabled(this, state.options.disabled, state);
            setSize(this, undefined, state);
            bindEvents(this, state);
            validate(this, false, state);
            initValue(this, state);
            state.isInput = true;
        }, [options]);
    };

    $.fn.combo.methods = {
        state: function (jq) {
            return $.data(jq[0], 'combo');
        },
        options: function (jq) {
            return $.data(jq[0], 'combo').options;
        },
        panel: function (jq) {
            return getPanel(jq[0]);
        },
        textbox: function (jq) {
            return $.data(jq[0], 'combo').combo.find('input.combo-text');
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        },
        resize: function (jq, width) {
            return jq.each(function () {
                setSize(this, width);
            });
        },
        showPanel: function (jq) {
            return jq.each(function () {
                showPanel(this);
            });
        },
        hidePanel: function (jq) {
            return jq.each(function () {
                hidePanel(this);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
                bindEvents(this);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
                bindEvents(this);
            });
        },
        validate: function (jq) {
            return jq.each(function () {
                validate(this, true);
            });
        },
        isValid: function (jq) {
            var input = $.data(jq[0], 'combo').combo.find('input.combo-text');
            return input.validatebox('isValid');
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        getText: function (jq) {
            return getText(jq[0]);
        },
        setText: function (jq, text) {
            return jq.each(function () {
                setText(this, text);
            });
        },
        getValues: function (jq) {
            return getValues(jq[0]);
        },
        setValues: function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        getValue: function (jq) {
            return getValue(jq[0]);
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        },
        setValueText: function (jq, value) {
            return jq.each(function (value) {
                setValueText(this, value);
            }, [value]);
        },
        setValueTexts: function (jq, values) {
            return jq.each(function (values) {
                setValueTexts(this, values);
            }, [values]);
        },
        panelCreated: function (jq) {
            var state = $.data(jq[0], 'combo');
            return state.panel != undefined;
        },
        moveTo: function (jq, expr) {
            return jq.each(function (expr) {
                moveTo(this, expr);
            }, [expr]);
        }
    };

    $.fn.combo.parseOptions = function (target) {
        var t = $(target);
        var css = t.attr("class") + "";
        if (css.indexOf("easyui-") < 0)
            return $.extend({}, $.fn.validatebox.parseOptions(target), {
                width: (parseInt(target.style.width) || undefined),
                disabled: (t.prop('disabled') ? true : undefined),
                value: (t.val() || undefined)
            });
        var th = t.attr('panelHeight');
        return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, [
            'width', 'separator', {panelWidth: 'number', editable: 'boolean', hasDownArrow: 'boolean', delay: 'number'}
        ]), {
            panelHeight: (th == 'auto' ? 'auto' : parseInt(th) || undefined),
            multiple: (t.attr('multiple') ? true : undefined),
            disabled: (t.prop('disabled') ? true : undefined),
            value: (t.val() || undefined)
        });
    };

    // Inherited from $.fn.validatebox.defaults
    $.fn.combo.defaults = $.extend({}, $.fn.validatebox.defaults, {
        width: 'auto',
        panelWidth: null,
        panelHeight: 200,
        multiple: false,
        separator: ',',
        editable: true,
        disabled: false,
        hasDownArrow: true,
        value: '',
        delay: 200, // delay to do searching from the last key input event.
        eapborder: 6,

        keyHandler: {
            up: function () {
            },
            down: function () {
            },
            enter: function () {
            }
        },
        doBeforeQuery: function (q) {
        },
        doQuery: undefined,
        onShowPanel: function () {
        },
        onHidePanel: function () {
        },
        onChange: function (newValue, oldValue) {
        }
    });
})(jQuery);
