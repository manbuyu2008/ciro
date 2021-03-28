(function ($) {
    function init(target) {
        var $target = $(target);
        if (!target.id) $target.attr('id', $.parser.getObjGUID());
        $target.addClass("tooltip-f");
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        if (!opts.autoShow) return;
        var $target = $(target);

        $target.unbind(".tooltip").bind("mousemove.tooltip", {target: target},function (e) {
            var target = e.data.target;
            var state = $.data(target, "tooltip");
            var opts = state.options;
            if (opts.trackMouse) {
                opts.trackMouseX = e.pageX;
                opts.trackMouseY = e.pageY;
                reposition(target, undefined, state);
            }
        }).bind(opts.showEvent + ".tooltip", {target: target},function (e) {
                show(e.data.target, e);
            }).bind(opts.hideEvent + ".tooltip", {target: target}, function (e) {
                hide(e.data.target, e);
            })
    }

    function bindTipTarget(target, param) {
        var state = $.data(target, "tooltip");
        var opts = state.options;
        var tiptarget = param.tiptarget;
        var $tiptarget = $(tiptarget);
        if (opts.trackMouse) {
            $tiptarget.unbind(".tooltip").bind("mousemove.tooltip", {target: target, tipTarget: tiptarget}, function (e) {
                var target = e.data.target;
                var state = $.data(target, "tooltip");
                var opts = state.options;
                opts.trackMouseX = e.pageX;
                opts.trackMouseY = e.pageY;
                reposition(target, e.data.tiptarget, state);
            });
        }
        if (opts.showEvent)
            $tiptarget.bind(opts.showEvent + ".tooltip", {target: target, param: param}, function (e) {
                show(e.data.target, param);
                return false;
            });
        if (opts.hideEvent)
            $tiptarget.bind(opts.hideEvent + ".tooltip", {target: target}, function (e) {
                function posInDomArray(x, y, dom) {
                    var set = dom.offset();
                    return (x >= set.left && x <= set.left + dom._outerWidth() &&
                    y >= set.top && y <= set.top + dom._outerHeight());
                }

                var target = e.data.target;
                var state = $.data(target, "tooltip");

                if (posInDomArray(e.clientX, e.clientY, state.tip)) return;
                if (posInDomArray(e.clientX, e.clientY, state.tip.children(".tooltip-arrow-outer"))) return;
                hide(e.data.target, e);
                return false;
            })
    }

    function clear(target, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state.showTimer) {
            clearTimeout(state.showTimer);
            state.showTimer = null;
        }
        if (state.hideTimer) {
            clearTimeout(state.hideTimer);
            state.hideTimer = null;
        }
    }

    function reposition(target, tiptarget, state) {
        if (!state) state = $.data(target, "tooltip");
        if (!state || !state.tip) {
            return;
        }
        if (!tiptarget) tiptarget = target;
        var opts = state.options;
        var tip = state.tip, left, top, $target;
        if (opts.trackMouse) {
            $target = $();
            left = opts.trackMouseX + opts.deltaX;
            top = opts.trackMouseY + opts.deltaY;
        } else {
            $target = $(tiptarget);
            left = $target.offset().left + opts.deltaX;
            top = $target.offset().top + opts.deltaY;
        }
        switch (opts.position) {
            case "right":
                left += $target._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - $target._outerHeight()) / 2;
                break;
            case "left":
                left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - $target._outerHeight()) / 2;
                break;
            case "top":
                left -= (tip._outerWidth() - $target._outerWidth()) / 2;
                top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
            case "bottom":
                left -= (tip._outerWidth() - $target._outerWidth()) / 2;
                top += $target._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
        }
        tip.css({left: left, top: top, zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))});
        opts.onPosition.call(target, tiptarget, left, top);
    }

    function show(target, param, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        var tip = state.tip;

        if (!tip) {
            tip = $("<div class=\"tooltip\">" +
                "<div class=\"tooltip-content\"></div>" +
                "<div class=\"tooltip-arrow-outer\"></div>" +
                "<div class=\"tooltip-arrow\"></div>" +
                "</div>").appendTo("body");
            state.tip = tip;
            update(target, undefined, state);
        } else if (param.content) {
            update(target, param.content, state);
        }
        tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + opts.position);
        clear(target, state);
        var id = target.id;
        state.showTimer = setTimeout(function () {
            var target = $('#' + id)[0];
            var state = $.data(target, "tooltip");
            var opts = state.options;
            var tip = state.tip;
            var tiptarget =  param.tiptarget ? param.tiptarget : target;
            var postarget = param.postarget? param.postarget : tiptarget;
            reposition(target, postarget, state);

            tip.show();
            opts.onShow.call(target, param);
            var arrowOuter = tip.children(".tooltip-arrow-outer");
            var arrow = tip.children(".tooltip-arrow");
            var bc = "border-" + opts.position + "-color";
            arrowOuter.add(arrow).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            });
            arrowOuter.css(bc, tip.css(bc));
            arrow.css(bc, tip.css("backgroundColor"));
            param = null;
        }, opts.showDelay);
    }

    function hide(target, param, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state && state.tip) {
            clear(target, state);
            var id = target.id;
            state.hideTimer = setTimeout(function () {
                var target = $('#' + id)[0];
                var state = $.data(target, "tooltip");
                state.tip.hide();
                state.options.onHide.call(target, param);
            }, state.options.hideDelay);
        }
    }

    function update(target, content, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        if (content) {
            opts.content = content;
        }
        if (!state.tip) return;
        var cc = typeof opts.content == "function" ? opts.content.call(target) : opts.content;
        state.tip.children(".tooltip-content").html(cc);
        opts.onUpdate.call(target, cc);
    }

    function destroy(target, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state) {
            clear(target, state);
            var opts = state.options;
            if (state.tip) {
                state.tip.remove();
            }
            var $target = $(target);
            if (opts.title) {
                $target.attr("title", opts.title);
            }
            $.removeData(target, "tooltip");
            $target.unbind(".tooltip").removeClass("tooltip-f");
            opts.onDestroy.call(target);
        }
    }

    $.fn.tooltip = function (options, param) {
        if (typeof options == "string") {
            return $.fn.tooltip.methods[options](this, param);
        }
        options = options || {};
        return this.each(function (_options) {
            var state = $.data(this, "tooltip");
            if (state) {
                $.extend(state.options, _options);
            } else {
                state = $.data(this, "tooltip", {options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _options)});
                init(this);
            }
            bindEvents(this, state);
            update(this, undefined, state);
        }, [options]);
    };

    $.fn.tooltip.methods = {
        options: function (jq) {
            return $.data(jq[0], "tooltip").options;
        },
        tip: function (jq) {
            return $.data(jq[0], "tooltip").tip;
        },
        arrow: function (jq) {
            return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function (jq, param) {
            return jq.each(function () {
                show(this, param);
            });
        },
        hide: function (jq, param) {
            return jq.each(function () {
                hide(this, param);
            });
        },
        update: function (jq, content) {
            return jq.each(function () {
                update(this, content);
            });
        },
        reposition: function (jq) {
            return jq.each(function () {
                reposition(this);
            });
        },
        bindTipTarget: function (jq, param) {
            return jq.each(function () {
                bindTipTarget(this, param);
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        }
    };
    $.fn.tooltip.parseOptions = function (target) {
        var t = $(target);
        var opts = $.extend({}, $.parser.parseOptions(target,
            ["position", "showEvent", "hideEvent", "content", {deltaX: "number", deltaY: "number", showDelay: "number", hideDelay: "number"}]),
            {title: t.attr("title")});
        t.attr("title", "");
        if (!opts.content) {
            opts.content = opts.title;
        }
        return opts;
    };

    $.fn.tooltip.defaults = {
        position: "bottom",
        content: null,
        trackMouse: false,
        deltaX: 0,
        deltaY: 0,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        showDelay: 200,
        hideDelay: 0,
        autoShow: true,
        onShow: function (e) {
        },
        onHide: function (e) {
        },
        onUpdate: function (content) {
        },
        onPosition: function (left, top) {
        },
        onDestroy: function () {
        }
    }
})(jQuery);