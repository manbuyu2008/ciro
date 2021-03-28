/**
 * portal - jQuery EasyUI
 *
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   draggable
 *   panel
 *
 */
(function ($) {
    /**
     * 绘制网格
     * @param portal
     */
    function drawGrid(portal, show) {
        if (show) {
            //增加样式，绘制横线，间隔20像素
            portal.addClass('portal-grid');
            $('#' + portal.attr('id') + '__g' + ' > tbody > tr > td').addClass("portal-grid-td");
        } else {
            portal.removeClass('portal-grid');
            $('#' + portal.attr('id') + '__g' + ' > tbody > tr > td').removeClass("portal-grid-td");
        }
    }

    /**
     * 增加网格线的table
     * @param portal
     * @param gridColCount
     */
    function addGrid(portal, gridColCount) {
        //加table，绘制竖线，按设置的列数绘制
        var st = ['<table id="' + portal.attr('id') + '__g" style="position:relative;border-collapse: collapse"><tr>'];
        for (var j = 0; j < gridColCount; j++) {
            st.push('<td></td>');
        }
        st.push("</tr></table>");
        $(st.join("")).prependTo(portal);
//        var table = document.createElement('table');
//        table.id = portal.attr('id') + '__g';
//        table.style.position = 'relative';
//
//        table.style.borderCollapse = "collapse";
//        var tr = document.createElement("tr");
//
//        for (var j = 0; j < gridColCount; j++) {
//            var td = document.createElement("td");
////            td.innerText = "aaa";
//            tr.appendChild(td);
//        }
//        table.appendChild(tr);
//        portal.prepend(table);
    }

    /**
     * initialize the portal
     */
    function init(target, state) {
        var $target = $(target);
        $target.addClass('portal-wrap');
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var portalId = $target.attr('id');
        if (!state) state = $.data(target, 'portal');
        var opts = state.options;
        //门户区
        state.portal = $('<div class="portal" id="' + portalId + '__p"></div>').prependTo($target);
        state.portal.css("margin-left", opts.margine.left + 'px');
        state.portal.css("margin-top", opts.margine.top + 'px');
        state.portal.css("margin-right", opts.margine.right + 'px');
        state.portal.css("margin-bottom", opts.margine.bottom + 'px');
        //添加网格线控件
        addGrid(state.portal, opts.gridColCount);
        if (!opts.readonly) drawGrid(state.portal, true);

        calcCellWidths(opts);

        $target.bind('_resize', {target:target}, function (e) {
            setSize(e.data.target);
        });
        setSize($('#' + portalId)[0]);

//        setInterval(function () {
//            setPortalSize($('#' + portalId)[0]);
//        }, 500);
    }

    function setSize(target) {
        var $target = $(target);
        var state = $.data(target, 'portal');
        var opts = state.options, p;
        if (opts.fit) {
            p = $target.parent();
            opts.width = p.width() - getCssIntValue(p, "padding-left") - getCssIntValue(p, "padding-right");
            opts.height = p.height() - getCssIntValue(p, "padding-bottom") - getCssIntValue(p, "padding-top");
        }
        if (!isNaN(opts.width)) {
            var w = opts.width - getCssIntValue($target, "margin-left") - getCssIntValue($target, "margin-right");
            if ($.boxModel == true) {
                $target.width(w - ($target.outerWidth() - $target.width()));
            } else {
                $target.width(w - 2);
            }
        } else {
            $target.width('auto');
        }
        if (!isNaN(opts.height)) {
            var h = opts.height  - getCssIntValue($target, "margin-top") - getCssIntValue($target, "margin-bottom");
            if ($.boxModel == true) {
                $target.height(h - ($target.outerHeight() - $target.height()));
            } else {
                $target.height(h - 2);
            }
        } else {
            $target.height('auto');
        }
        setPortalSize(target, state);
    }

    function setPortalSize(target, state) {
        var $target = $(target), isInterval = !state;
        if (!state) state = $.data(target, 'portal');
        var h = getScrollHeight(target);
        //没有变化
        if (isInterval && $target.attr('lastscrollheight') == h) return;

        $target.attr('lastscrollheight', h);
        var opts = state.options;
        var width = $target.width();
        state.portal.height($target.height() - opts.margine.top - opts.margine.bottom);
        var w = width - opts.margine.left - opts.margine.right;
        state.portal.width(w);
        //IE8下 没有滚动条的时候，scrollHeight很小
        var p = state.portal[0];
        if (h > p.clientHeight) w -= opts.scrollbarSize;
        else h = p.clientHeight;

        opts.gridColWidth = Math.floor(w / opts.gridColCount);

        $('#' + state.portal.attr('id') + '__g').width(opts.gridColCount * opts.gridColWidth)
            .height(h).show();

        //重新计算portlet大小
        var portalOpts = {
            gridColWidth:opts.gridColWidth,
            gridRowHeight:opts.gridRowHeight,
            gridColCount:opts.gridColCount,
            margine:opts.portletMargine
        };
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet("portalOptions", portalOpts);
        });
        opts.onResize.call(target, opts.width, opts.height);
    }

    function getScrollHeight(target) {
        var h = 0;
        enumPortlets(target, function (portletId) {
            var opts = $('#' + portletId).portlet("options");
            var b = opts.top + opts.height;
            if (h < b) h = b;
        });
        return h;
    }

    //param: id, title, url, bounds
    function addPortlets(target, param) {
        var state = $.data(target, 'portal');
        if (!param.length) param = [param];
        var top = 0, p, portlets = [];
        for (var i = 0, len = param.length; i < len; i++) {
            p = param[i];
            if (p.bounds.left == undefined || !p.bounds.width) {
                p.bounds.left = -999;
                p.bounds.top = 0;
                p.bounds.width = 1;
                p.bounds.height = 15;
                portlets.push(p);
            } else {
                top = Math.max(top, p.bounds.top + p.bounds.height);
            }
            addPortlet(target, p, state);
        }
        resetPortlets(target, state, portlets, top);
    }

    function addPortlet(target, portlet, state) {
        if (!state) state = $.data(target, 'portal');
        var opts = state.options;
        var p = $('<div id="' + portlet.id + '"></div>').appendTo(state.portal);
        p.portlet($.extend({
            portalId:$(target).attr("id"),
            readonly:opts.readonly,
            portalOptions:{
                gridColWidth:opts.gridColWidth,
                gridRowHeight:opts.gridRowHeight,
                gridColCount:opts.gridColCount,
                margine:opts.portletMargine
            },
            getCellBounds:getCellBounds,
            getActualBounds:getActualBounds,
            onPortletResize:function (portlet, param) {
                var portalId = $(portlet).attr('portalId');
                checkBoundsResize($('#' + portalId)[0], param);
            },
            onPortletDrag:function (portlet, param) {
                var portalId = $(portlet).attr('portalId');
                checkBoundsDrag($('#' + portalId)[0], param);
            }
        }, portlet));
    }

    /**
     * 获取所有的门户组件
     * @param target
     */
    function getPortlets(target) {
        var portlets = [];
        enumPortlets(target, function (portletId) {
            var opts = $('#' + portletId).portlet("options");
            portlets.push({
                id:portletId,
                key:opts.key,
                bounds:opts.bounds
            });
        });
        return portlets.sort(function (r1, r2) {
            var n = r1.bounds.top - r2.bounds.top;
            if (n != 0) return n;
            return r1.bounds.left - r2.bounds.left;
        });
    }

    function enumPortlets(target, fn) {
        var $target = $(target);
        var portlets = [];
        $('#' + $target.attr('id') + '__p > div.portlet').each(function () {
            var id = $(this).attr('targetid');
            if (fn(id) == false) return false;
        });
        return portlets;
    }

    function clear(target) {
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet('close');
        });
    }

    //判断矩形是否相交
    function isRectIntersect(r1, r2) {
        return (Math.abs(2 * r1.left + r1.width - 2 * r2.left - r2.width) < r1.width + r2.width &&
            Math.abs(2 * r1.top + r1.height - 2 * r2.top - r2.height) < r1.height + r2.height);
    }

    /**
     * 获取所有的门户组件
     * @param target
     * @param param:{bounds:, excludePortletIds:}
     */
    function checkBoundsResize(target, param) {
        var bounds = param.bounds;
        enumPortlets(target, function (portletId) {
            if (param.excludePortletIds.indexOf(portletId) >= 0) return;
            var opts = $('#' + portletId).portlet("options");
            var b = opts.bounds;
            var dir = param.dir;
            //没有相交，则不用管，规则：中心点之间的距离小于边长和的一半
            if (!isRectIntersect(b, bounds)) return;
            if (dir.indexOf('e') >= 0) {
                bounds.width = b.left - bounds.left;
            }

            if (dir.indexOf('w') >= 0) {
                bounds.width = bounds.width + bounds.left - b.left - b.width;
                bounds.left = b.left + b.width;
            }

            if (!isRectIntersect(b, bounds)) return;
            if (dir.indexOf('s') >= 0) {//dir.indexOf('e') < 0 &&
                bounds.height = b.top - bounds.top;
            }

            if (dir.indexOf('n') >= 0) {//dir.indexOf('w') < 0 &&
                bounds.height = bounds.height + bounds.top - b.top - b.height;
                bounds.top = b.top + b.height;
            }
        });
    }

    /**
     * 获取所有的门户组件
     * @param target
     * @param param:{bounds:, excludePortletIds: pageX,pageY}
     */
    function checkBoundsDrag(target, param) {
        var state = $.data(target, 'portal');
        var portalOpts = {
            gridColWidth:state.options.gridColWidth,
            gridRowHeight:state.options.gridRowHeight,
            gridColCount:state.options.gridColCount,
            margine:state.options.portletMargine
        };
        var bounds = getActualBounds(param.bounds, portalOpts);
        var oldBounds = $.extend({}, bounds);
        var lastBounds = getActualBounds(param.lastBounds, portalOpts);
        //修正不能超出边界
        var mw = portalOpts.gridColWidth * portalOpts.gridColCount;
        //找出鼠标周围最大空白区域
        var blank = {
            left: 0,
            top: 0,
            right: mw,
            bottom:99999
        };
        var px = param.pageX, py = param.pageY + state.portal.scrollTop();
        enumPortlets(target, function (portletId) {
            if (param.excludePortletIds.indexOf(portletId) >= 0) return;
            var opts = $('#' + portletId).portlet("options");
//            var b = opts.bounds;
//            //当前鼠标位置有东东，不准
//            if (px >= b.left && px <= b.left + b.width &&
//                py >= b.top && py <= b.top + b.height) {
//                param.accept = false;
//                return false;
//            }

            var b = getActualBounds(opts.bounds, portalOpts);

            //当前鼠标位置有东东，不准
            if (px >= b.left && px <= b.left + b.width &&
                py >= b.top && py <= b.top + b.height) {
                param.accept = false;
                return false;
            }
            if (px < b.left)
                blank.right = Math.min(blank.right, b.left);
            else if (px > b.left + b.width)
                blank.left = Math.max(blank.left, b.left + b.width);
            if (py < b.top)
                blank.bottom = Math.min(blank.bottom, b.top);
            else if (py > b.top + b.height)
                blank.top = Math.max(blank.top, b.top + b.height);

            //没有相交，则不用管，规则：中心点之间的距离小于边长和的一半
            if (!isRectIntersect(b, bounds)) return;

            if (px < b.left) {
                bounds.width = b.left - bounds.left;
            } /*else {
                bounds.left = b.left + b.width;
            }*/
            if (!isRectIntersect(b, bounds)) return;

            if (py < b.top) {
                bounds.height = b.top - bounds.top;
            } /*else {
                bounds.top = b.top + b.height;
            }*/
            if (!isRectIntersect(b, bounds)) return;
            if (px > b.left) {
                bounds.left = b.left + b.width;
            }
            if (!isRectIntersect(b, bounds)) return;
            if (py > b.top) {
                bounds.top = b.top + b.height;
            }
        });
        //不准就不准了，直接返回
        if (!param.accept) return;

        if (bounds.left + bounds.width > mw) bounds.width = mw - bounds.left;

        //变小了，按最大区域来
        if (bounds.width < oldBounds.width || bounds.height < oldBounds.height) {
            bounds.width = Math.min(oldBounds.width, blank.right - blank.left);
            bounds.left = blank.right - bounds.width;

            blank.bottom = Math.min(blank.bottom, Math.max(bounds.top + bounds.height, oldBounds.top + oldBounds.height, lastBounds.top + lastBounds.height));
            bounds.height = Math.min(oldBounds.height, blank.bottom - blank.top);
            bounds.top = blank.bottom - bounds.height;
        }

        bounds = getCellBounds(bounds, portalOpts);
        param.bounds.left = bounds.left;
        param.bounds.top = bounds.top;
        param.bounds.width = bounds.width;
        param.bounds.height = bounds.height;
    }

    //将区域从像素换算成单元格
    function getCellBounds(bounds, opts) {
        return {
            left:Math.floor(bounds.left / opts.gridColWidth),
            top:Math.floor(bounds.top / opts.gridRowHeight),
            width:Math.floor(bounds.width / opts.gridColWidth),
            height:Math.floor(bounds.height / opts.gridRowHeight)
        };
    }

    //将区域从单元格换算成像素
    function getActualBounds(bounds, opts) {
        return {
            left:bounds.left * opts.gridColWidth,
            top:bounds.top * opts.gridRowHeight,
            width:bounds.width * opts.gridColWidth,
            height:bounds.height * opts.gridRowHeight
        };
    }

    function setReadOnly(target, readonly) {
        var state = $.data(target, 'portal');
        state.options.readonly = readonly;
        drawGrid(state.portal, !readonly);
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet('setReadOnly', readonly);
        });
    }

    function calcCellWidths(options) {
        var colCellWidths = [];
        for (i = 0, len = options.columnWidths.length; i < len; i++) {
            colCellWidths.push(Math.round(options.columnWidths[i] * options.gridColCount / 100));
        }
        options.colCellWidths = colCellWidths;
    }

    function layout(target, param) {
        var state = $.data(target, 'portal');
        var opts = state.options;
        opts.columnWidths = param;
        calcCellWidths(opts);
        var portlets = getPortlets(target);
        resetPortlets(target, state, portlets, 0);
    }

    function resetPortlets(target, state, portlets, top) {
        var opts = state.options;
        var colCellWidths = opts.colCellWidths;
        if (!top) top = 0;
        var col = 0, left = 0, width = colCellWidths[0];
        //重新计算portlet大小
        var portalOpts = {
            gridColWidth:opts.gridColWidth,
            gridRowHeight:opts.gridRowHeight,
            gridColCount:opts.gridColCount,
            margine:opts.portletMargine
        };
        var i, len;
        for (i = 0, len = portlets.length; i < len; i++) {
            var p = portlets[i];
            $('#' + p.id).portlet('portletResize', {
                bounds:{
                    left:left,
                    top:top,
                    width:width,
                    height:15
                },
                portalOptions:portalOpts
            });
            col++;
            if (col < opts.columnWidths.length) {
                left += width;
                width = colCellWidths[col];
            } else {
                top += 15;
                left = 0;
                width = colCellWidths[0];
                col = 0;
            }
        }
    }

    function maximizePortlet(target) {
        $('#' + $(target).attr('id') + '__p').css("overflow-y", "hidden");
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet("maximize");
        });
    }

    $.fn.portal = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.portal.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'portal');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'portal', {
                    options:$.extend({}, $.fn.portal.defaults, options)
                });
                init(this, state);
            }
            if (state.options.border) {
                $(this).removeClass('portal-noborder');
            } else {
                $(this).addClass('portal-noborder');
            }
            setSize(this);
        });
    };

    $.fn.portal.methods = {
        options:function (jq) {
            return $.data(jq[0], 'portal').options;
        },
        resize:function (jq, param) {
            return jq.each(function () {
                if (param) {
                    var opts = $.data(this, 'portal').options;
                    if (param.width) opts.width = param.width;
                    if (param.height) opts.height = param.height;
                }
                setSize(this);
            });
        },
        getPortlets:function (jq) {
            return getPortlets(jq[0]);
        },
        add:function (jq, param) {    // param: {panel,columnIndex}
            return addPortlets(jq[0], param);
        },
        clear:function (jq) {    // param: {panel,columnIndex}
            return clear(jq[0]);
        },
        remove:function (jq, portletId) {
            return $('#' + portletId).portlet('close');
        },
        setReadOnly:function (jq, param) {
            setReadOnly(jq[0], param);
        },
        layout:function (jq, param) {
            layout(jq[0], param);
        },
        maximizePortlet: function(jq) {
            maximizePortlet(jq[0]);
        }
    };

    $.fn.portal.defaults = {
        width:'auto',
        height:'auto',
        border:true,
        fit:true,
        columnWidths:[50, 50], //列布局，数组,记录各列列宽，和=100；默认2列
        readonly:true,
        gridColCount:16, //网格列数
        gridRowHeight:20, //网格行高
        scrollbarSize:18,
        margine:{//边距
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        portletMargine:{//组件边距
            left:10,
            top:10,
            right:0,
            bottom:0
        },
        autoArrange:{//自动排列
            afterDrag:true, //拖动后自动调位置
            afterResize:false, //改变大小后自动调位置
            left:true, //自动左移
            top:true, //自动上移
            leftPrior:true//优先左移
        },
        onResize:function (width, height) {
        },
        onStateChange:function () {
        }
    };
})(jQuery);