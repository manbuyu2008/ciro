/**
 /**
 * portlet - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      panel
 *   draggable
 *   resizable
 *
 */
(function ($) {
    function setSize(target, param) {
        var opts = $.data(target, 'portlet').options;
        if (param) {
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }
        $(target).panel('resize', opts);
    }

    function moveportlet(target, param) {
        var state = $.data(target, 'portlet');
        if (param) {
            if (param.left != null) state.options.left = param.left;
            if (param.top != null) state.options.top = param.top;
        }
        $(target).panel('move', state.options);
        if (state.shadow) {
            state.shadow.css({
                left:state.options.left,
                top:state.options.top
            });
        }
    }

    function create(target) {
        var state = $.data(target, 'portlet'), $target = $(target);
        var options = state.options;
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        if (state.options.portalId) $target.attr('portalId', state.options.portalId);
        if (!options.frameCreated) {
            $('<iframe style="width:100%;height:100%;" ' +
                'scrolling="' + options.framescrolling + '" ' +
                'frameborder="' + options.frameborder + '"></iframe>').appendTo($target).attr("src", options.url);
            options.frameCreated = true;
        }
        var tools = state.options.tools || [];
        var id = $target.attr('id');

        if (state.options.refresh) {
            tools.push({
                iconCls:'panel-tool-reload',
                handler:function () {
                    var frm = $('#' + id + '>iframe');
                    var url = frm.attr('src');
                    frm.attr('src', '').attr('src', url);
                }
            });
        }
        if (options.moreurl && options.moreurl != '') {
            tools.push({
                iconCls:'panel-tool-more',
                handler:function () {
                    var target = $('#' + id)[0];
                    var opts = $.data(target, 'portlet').options;
                    var title = opts.title;
                    if (opts.moretitle) title = opts.moretitle;
                    opts.openMoreUrl.call(target, title, opts.moreurl);
                }
            });
        }

        var win = $(target).panel($.extend({}, state.options, {
            border:false,
            doSize:true, // size the panel, the property undefined in portlet component
            closed:true, // close the panel
            cls:'portlet',
            headerCls:'portlet-header',
            bodyCls:'portlet-body',
            tools:tools,
            boundOffset: 6, //圆弧边框高度计算偏差 added by lizhentao 20140917
            closable:state.options.closable && !state.options.readonly,
            onBeforeDestroy:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                if (state.options.onBeforeDestroy.call(target) == false) return false;
                if (state.shadow) state.shadow.remove();
            },
            onClose:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                state.options.onClose.call(target);
                $(this).portlet("destroy");
            },
            onOpen:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                if (state.shadow) {
                    state.shadow.css({
                        display:'block',
                        zIndex:$.fn.portlet.defaults.zIndex++,
                        left:state.options.left,
                        top:state.options.top,
                        width:state.portlet.outerWidth(),
                        height:state.portlet.outerHeight()
                    });
                }
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                state.options.onOpen.call(target);
            },
            onResize:function (width, height) {
                var target = this;
                var state = $.data(target, 'portlet');
                var opts = $(target).panel('options');
                state.options.width = opts.width;
                state.options.height = opts.height;
                state.options.left = opts.left;
                state.options.top = opts.top;
                if (state.shadow) {
                    state.shadow.css({
                        left:state.options.left,
                        top:state.options.top,
                        width:state.portlet.outerWidth(),
                        height:state.portlet.outerHeight()
                    });
                }

                state.options.onResize.call(target, width, height);
            },
            onMaximize:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);
            }
        }));

        state.portlet = win.panel('panel');

        // create shadow
        if (state.shadow) state.shadow.remove();
        if (state.options.shadow == true) {
            state.shadow = $('<div class="portlet-shadow"></div>').insertAfter(state.portlet);
            state.shadow.css({
                display:'none'
            });
        }

        var parent;
        // if require center the portlet
        if (state.options.left == null) {
            var width = state.options.width;
            if (isNaN(width)) {
                width = state.portlet.outerWidth();
            }

            parent = state.portlet.parent();
            state.options.left = (parent.width() - width) / 2 + parent.scrollLeft();

        }
        if (state.options.top == null) {
            var height = state.portlet.height;
            if (isNaN(height)) {
                height = state.portlet.outerHeight();
            }

            parent = state.portlet.parent();
            state.options.top = (parent.height() - height) / 2 + parent.scrollTop();

        }
        moveportlet(target);

        if (state.options.closed == false) {
            win.portlet('open');	// open the portlet
        }
        resizePortlet(target, state);
    }

    /**
     * set portlet drag and resize property
     */
    function setProperties(target) {
        var state = $.data(target, 'portlet');
        state.portlet.draggable({
            handle:'>div.panel-header>div.panel-title',
            disabled:state.options.readonly,
            proxy:function () {
                var target = $('#' + $(this).attr('targetid'))[0], state = $.data(target, 'portlet');

                return state.proxy;
            },
            onBeforeDrag:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                var param = getActualBounds(target, state);
                var ep = $(e.data.parent);
                param.left -= ep.scrollLeft();
                param.top -= ep.scrollTop();
                e.data.startLeft = param.left;
                e.data.startTop = param.top;
                e.data.left = param.left;
                e.data.top = param.top;
                e.data.width = param.width;
                e.data.height = param.height;

                e.data.lastLeft = state.options.bounds.left;
                e.data.lastTop = state.options.bounds.top;
                e.data.lastWidth = state.options.bounds.width;
                e.data.lastHeight = state.options.bounds.height;

                if (state.shadow) state.shadow.css('z-index', $.fn.portlet.defaults.zIndex++);
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                if (!state.proxy) {
                    state.proxy = $('<div class="portlet-proxy"></div>').insertAfter(state.portlet);
                }
//                var param = getActualBounds(target, state);
                state.proxy.css({
                    display:'none',
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);

                state.proxy.show();
            },
            onDrag:function (e) {
                var target = $('#' + $(this).attr('targetid'))[0];
                var state = $.data(target, 'portlet');
                doDragParam(target, state, e);
                state.proxy.css({
                    display:'block',
                    left:e.data.left,
                    top:e.data.top,
                    width:e.data.width,
                    height:e.data.height
                });
                return false;
            },
            onStopDrag:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');

                //doDragParam(target, state, e);
//                //位置换算成单元格单位
//                var bounds = getCellBounds(target, e.data, state);
                state.options.bounds.left = e.data.lastLeft;
                state.options.bounds.top = e.data.lastTop;
                state.options.bounds.width = e.data.lastWidth;
                state.options.bounds.height = e.data.lastHeight;
                var bounds = getActualBounds(target, state);

                state.options.left = bounds.left + state.options.portalOptions.margine.left;
                state.options.top = bounds.top + state.options.portalOptions.margine.top;
                state.options.width = bounds.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
                state.options.height = bounds.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
//                $target.portlet('move');
                setSize(target);
//                state.proxy.remove();
                state.proxy = null;
            }
        });

        state.portlet.resizable({
            disabled:state.options.readonly,
            onBeforeResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                var param = getActualBounds(target, state);
                e.data.startLeft = param.left;
                e.data.startTop = param.top;
                e.data.left = param.left;
                e.data.top = param.top;
                e.data.width = param.width;
                e.data.height = param.height;

                if (state.shadow) state.shadow.css('z-index', $.fn.portlet.defaults.zIndex++);
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                //这玩意不能去掉，否则在变小时document的mouseup不能触发
                state.pmask = $('<div class="portlet-proxy-mask" style="width:100%;height:100%"></div>').insertAfter(state.portlet);
                state.pmask.css({
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:0, //e.data.left,
                    top:0//e.data.top,
//                    width:state.portlet.outerWidth(),
//                    height:state.portlet.outerHeight()
                });

                if (!state.proxy) {
                    state.proxy = $('<div class="portlet-proxy"></div>').insertAfter(state.portlet);
                }

                state.proxy.css({
                    display:'none',
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);

                state.proxy.show();
            },
            onResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                doResizeParam(target, state, e);
                state.proxy.css({
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                doResizeParam(target, state, e);
                //位置换算成单元格单位
                var bounds = getCellBounds(target, e.data, state);
                state.options.bounds.left = bounds.left;
                state.options.bounds.top = bounds.top;
                state.options.bounds.width = bounds.width;
                state.options.bounds.height = bounds.height;

                state.options.left = e.data.left + state.options.portalOptions.margine.left;
                state.options.top = e.data.top + state.options.portalOptions.margine.top;
                state.options.width = e.data.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
                state.options.height = e.data.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
                setSize(target);

                state.pmask.remove();
                state.pmask = null;
                state.proxy.remove();
                state.proxy = null;
            }
        });
    }

    //重新计算尺寸
    function resizePortlet(target, state) {
        var param = getActualBounds(target, state);
        state.options.left = param.left + state.options.portalOptions.margine.left;
        state.options.top = param.top + state.options.portalOptions.margine.top;
        state.options.width = param.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
        state.options.height = param.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
        setSize(target);
    }

    function doResizeParam(target, state, e) {
        var opts = state.options.portalOptions;
        var gc = opts.gridColWidth, gw = opts.gridColCount * opts.gridColWidth, gr = opts.gridRowHeight;

        var l = e.data.left, t = e.data.top, w = e.data.width, h = e.data.height;
        if (l < 0) l = 0;
        if (t < 0) t = 0;

        t = getNearValue(t, gr);
        l = getNearValue(l, gc);
        h = getNearValue(e.data.top + h, gr) - t;
        if (h < 1) h = 1;
        w = getNearValue(e.data.left + w, gc) - l;
        if (w < 1) w = 1;
        if (l + w > gw) l = gw - w;

        e.data.left = l;
        e.data.top = t;
        e.data.width = w;
        e.data.height = h;
        var bounds = getCellBounds(target, e.data, state);
        if (state.options.onPortletResize) state.options.onPortletResize.call(target, target, {
            dir:e.data.dir,
            last:{
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            },
            bounds:bounds,
            excludePortletIds:[$(target).attr('id')]
        });

        bounds = getActualBoundsEx(target, bounds, state);
        e.data.left = bounds.left;
        e.data.top = bounds.top;
        e.data.width = bounds.width;
        e.data.height = bounds.height;
    }

    function doDragParam(target, state, e) {
        var opts = state.options.portalOptions;
        var gc = opts.gridColWidth, gw = opts.gridColCount * opts.gridColWidth, gr = opts.gridRowHeight;

        var l = e.data.left, t = e.data.top;
        if (l < 0) l = 0;
        if (t < 0) t = 0;

        t = getNearValue(t, gr);

        var ww = e.data.width;
        if (l + ww > gw) l = gw - ww;
        l = getNearValue(l, gc);

        e.data.left = l;
        e.data.top = t;

        var bounds = getCellBounds(target, e.data, state);
        bounds.width = state.options.bounds.width;
        bounds.height = state.options.bounds.height;
        var param = {
            pageX:e.pageX,
            pageY:e.pageY,
            accept:true,
            bounds:bounds,
            lastBounds: {
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            },
            excludePortletIds:[$(target).attr('id')]
        };
        if (state.options.onPortletDrag) state.options.onPortletDrag.call(target, target, param);
        if (param.accept && bounds.width > 0 && bounds.height > 0) {
            e.data.lastLeft = bounds.left;
            e.data.lastTop = bounds.top;
            e.data.lastWidth = bounds.width;
            e.data.lastHeight = bounds.height;
        } else {
            bounds = {
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            };
        }
        bounds = getActualBoundsEx(target, bounds, state);
        e.data.left = bounds.left;
        e.data.top = bounds.top;
        e.data.width = bounds.width;
        e.data.height = bounds.height;
    }

    function getNearValue(val, sep) {
        var n = val % sep;
        if (n < Math.floor(sep / 2)) val -= n;
        else val += sep - n;
        return val;
    }

    function getCellBounds(target, bounds, state) {
        return state.options.getCellBounds(bounds, state.options.portalOptions);
    }

    function getActualBounds(target, state) {
        if (!state) state = $.data(target, 'portlet');
        return getActualBoundsEx(target, state.options.bounds, state);
    }

    function getActualBoundsEx(target, bounds, state) {
        if (!state) state = $.data(target, 'portlet');
        var opts = state.options;
        return state.options.getActualBounds(bounds, opts.portalOptions);
    }

    $.fn.portlet = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.portlet.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.panel(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'portlet');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'portlet', {
                    options:$.extend({}, $.fn.portlet.defaults, $.fn.portlet.parseOptions(this), options)
                });
            }
            create(this);
            setProperties(this);
        }, [options]);
    };

    $.fn.portlet.methods = {
        options:function (jq) {
            return $.data(jq[0], 'portlet').options;
        },
        portlet:function (jq) {
            return $.data(jq[0], 'portlet').portlet;
        },
        resize:function (jq, param) {
            return jq.each(function () {
                setSize(this, param);
            });
        },
        move:function (jq, param) {
            return jq.each(function () {
                moveportlet(this, param);
            });
        },
        portletResize: function (jq, param){
            var state = $.data(jq[0], 'portlet');
            var opts = state.options;
            opts = $.extend(opts, param);
            resizePortlet(jq[0], state);
        },
        portalOptions:function (jq, param) {
            var state = $.data(jq[0], 'portlet');
            var opts = state.options;
            if (!param) return opts.portalOptions;
            else {
                opts.portalOptions = $.extend(opts.portalOptions || {}, param);
                resizePortlet(jq[0], state);
            }
        },
        setReadOnly:function (jq, param) {
            jq.portlet({readonly:param});
        }
    };

    $.fn.portlet.parseOptions = function (target) {
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [
            {shadow:'boolean'}
        ]));
    };

    // Inherited from $.fn.panel.defaults
    $.fn.portlet.defaults = $.extend({}, $.fn.panel.defaults, {
        zIndex:1000,
        shadow:true,
        refresh:true,
        readonly:false,
        bounds:{
            left:0,
            top:0,
            width:0,
            height:0
        },
        margine:{
            left:10,
            top:10,
            right:0,
            bottom:0
        },
        // portlet's property which difference from panel
        title:'New portlet',
        collapsible:false,
        minimizable:false,
        maximizable:false,
        showrefresh:true, //显示刷新按钮
        showmore:true, //显示更多链接按钮
        closable:true,
        closed:false,
        framescrolling:'no',
        frameborder:0,
        openMoreUrl:function (title, url) {
        }
    });
})(jQuery);