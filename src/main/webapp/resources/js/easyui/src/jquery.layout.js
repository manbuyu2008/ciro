/**
 * layout - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   resizable
 *   panel
 */
(function ($) {
    var resizing = false;	// indicate if the region panel is resizing

    function setSize(container, state) {
        if (!state) state = $.data(container, 'layout');
        var opts = state.options;
        var panels = state.panels;

        var cc = $(container);

        if (opts.fit == true) {
            var p = cc.parent();
            p.addClass('panel-noscroll');
            if (p[0].tagName == 'BODY') $('html').addClass('panel-fit');
            cc.width(p.width());
            cc.height(p.height() - getCssIntValue(cc, "margin-top") - getCssIntValue(cc, "margin-bottom") - getCssIntValue(p, "padding-bottom") - getCssIntValue(p, "padding-top"));
            //cc.height(p.height());
        }

        /*** 新UI要求预设边框 Liuh 2013/05/28 ***/
        var w = cc.width();
        if(cc[0].tagName == 'BODY'){
            w = w - state.options.marginLeft - state.options.marginRight;
        }

        var cpos = {
            top: 0,
            left: 0,
            width: w,
            //height: cc.height() - getCssIntValue(cc, "margin-top") - getCssIntValue(cc, "margin-bottom")-10
            height: cc.height() - getCssIntValue(cc, "margin-top") - getCssIntValue(cc, "margin-bottom") - 3
        };

        // set north panel size
        function setNorthSize(pp) {
            if (!pp.length) return;
            var ppopts = pp.panel('options');
            pp.panel('resize', {
                width: cc.width(),
                height: ppopts.height,
                left: 0,
                top: 0
            });
            cpos.top += ppopts.height;
            cpos.height -= ppopts.height;
        }

        if (isVisible(panels.expandNorth)) {
            setNorthSize(panels.expandNorth);
        } else {
            setNorthSize(panels.north);
        }

        // set south panel size
        function setSouthSize(pp) {
            if (!pp.length) return;
            var ppopts = pp.panel('options');
            pp.panel('resize', {
                width: cc.width(),
                height: ppopts.height,
                left: 0,
                top: cc.height() - ppopts.height
            });
            cpos.height -= ppopts.height;
        }

        if (isVisible(panels.expandSouth)) {
            setSouthSize(panels.expandSouth);
        } else {
            setSouthSize(panels.south);
        }

        // set east panel size
        function setEastSize(pp) {
            if (!pp.length) return;
            var ppopts = pp.panel('options');
            pp.panel('resize', {
                width: ppopts.width,
                height: cpos.height,
                left: cc.width() - ppopts.width,
                top: cpos.top
            });
            cpos.width -= ppopts.width;
        }

        if (isVisible(panels.expandEast)) {
            setEastSize(panels.expandEast);
        } else {
            setEastSize(panels.east);
        }

        // set west panel size
        function setWestSize(pp) {
            if (!pp.length) return;
            var ppopts = pp.panel('options');
            pp.panel('resize', {
                width: ppopts.width,
                height: cpos.height,
                left: 0,
                top: cpos.top
            });
            cpos.left += ppopts.width;
            cpos.width -= ppopts.width;
        }

        if (isVisible(panels.expandWest)) {
            setWestSize(panels.expandWest);
        } else {
            setWestSize(panels.west);
        }

        panels.center.panel('resize', cpos);
    }

    /**
     * initialize and wrap the layout
     */
    function init(container, state) {
        if (!state) state = $.data(container, 'layout');
        var cc = $(container);

        if (cc[0].tagName == 'BODY') {
            $('html').addClass('panel-fit');
        }
        cc.addClass('layout');

        function _add(cc, container, state) {
            cc.children('div').each(function (container, state) {
                var opts = $.parser.parseOptions(this, ['region']);
                var r = opts.region;
                if (r == 'north' || r == 'south' || r == 'east' || r == 'west' || r == 'center') {
                    addPanel(container, {region: r}, this, state);
                }
            }, [container, state]);
        }

        cc.children('form').length ? _add(cc.children('form'), container, state) : _add(cc, container, state);

        $('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>').appendTo(cc);

        cc.bind('_resize', {container: container}, function (e, force) {
            var st = $.data(e.data.container, 'layout');
            var opts = st.options;
            if (opts.fit == true || force) {
                setSize(e.data.container, st);
            }
            return false;
        });
    }

    /**
     * Add a new region panel
     */
    function addPanel(container, param, el, state) {
        param.region = param.region || 'center';
        if (!state) state = $.data(container, 'layout');
        var panels = state.panels;
        var cc = $(container);
        var dir = param.region;

        if (panels[dir].length) return;	// the region panel is already exists
        var pp;
        if (el) pp = $(el);
        else pp = cc.children('div[region=' + dir + ']');

//        var pp = cc.children('div[region=' + dir + ']');
        if (!pp.length) {
            pp = $('<div></div>').appendTo(cc);	// the predefined panel isn't exists, create a new panel instead
        }

        // create region panel
        //huangxl 当panell不允许收缩时，去掉收缩按钮
        var opt = $.extend({}, {
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : 'auto'),
            height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : 'auto'),
            split: (pp.attr('split') ? pp.attr('split') == 'true' : undefined),
            doSize: false,
            cls: ('layout-panel layout-panel-' + dir),
            bodyCls: 'layout-body',
            collapsible: false
        }, param);
        if (pp.attr('collapsible')) opt.onOpen = function () {
            var buttonDir = {north: 'up', south: 'down', east: 'right', west: 'left'};
            if (!buttonDir[dir]) return;

            var iconCls = 'layout-button-' + buttonDir[dir];

            // add collapse tool to panel header
            var tool = $(this).panel('header').children('div.panel-tool');
            if (!tool.children('a.' + iconCls).length) {
                var t = $('<a href="javascript:void(0)"></a>').addClass(iconCls).appendTo(tool);
                t.bind('click', {dir: dir, container: container}, function (e) {
                    collapsePanel(e.data.container, e.data.dir);
                    return false;
                });
            }
        };
        pp.panel(opt);

        panels[dir] = pp;

        if (pp.panel('options').split) {
            var panel = pp.panel('panel');
            panel.addClass('layout-split-' + dir);

            var handles = '';
            if (dir == 'north') handles = 's';
            else if (dir == 'south') handles = 'n';
            else if (dir == 'east') handles = 'w';
            else if (dir == 'west') handles = 'e';

            panel.resizable({
                handles: handles,
                onStartResize: function (e) {
                    var panel = $(this);
                    var container = panel.parents(".layout")[0];
                    var cc = $(container);
                    resizing = true;
                    var proxy;
                    if (dir == 'north' || dir == 'south') {
                        proxy = $('>div.layout-split-proxy-v', container);
                    } else {
                        proxy = $('>div.layout-split-proxy-h', container);
                    }
                    var top = 0, left = 0, width = 0, height = 0;
                    var pos = {display: 'block'};
                    if (dir == 'north') {
                        pos.top = parseInt(panel.css('top')) + panel.outerHeight() - proxy.height();
                        pos.left = parseInt(panel.css('left'));
                        pos.width = panel.outerWidth();
                        pos.height = proxy.height();
                    } else if (dir == 'south') {
                        pos.top = parseInt(panel.css('top'));
                        pos.left = parseInt(panel.css('left'));
                        pos.width = panel.outerWidth();
                        pos.height = proxy.height();
                    } else if (dir == 'east') {
                        pos.top = parseInt(panel.css('top')) || 0;
                        pos.left = parseInt(panel.css('left')) || 0;
                        pos.width = proxy.width();
                        pos.height = panel.outerHeight();
                    } else if (dir == 'west') {
                        pos.top = parseInt(panel.css('top')) || 0;
                        pos.left = panel.outerWidth() - proxy.width();
                        pos.width = proxy.width();
                        pos.height = panel.outerHeight();
                    }
                    proxy.css(pos);

                    $('<div class="layout-mask"></div>').css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                },
                onResize: function (e) {
                    var panel = $(this);
                    var container = panel.parents(".layout")[0];
                    var proxy;
                    if (dir == 'north' || dir == 'south') {
                        proxy = $('>div.layout-split-proxy-v', container);
                        proxy.css('top', e.pageY - $(container).offset().top - proxy.height() / 2);
                    } else {
                        proxy = $('>div.layout-split-proxy-h', container);
                        proxy.css('left', e.pageX - $(container).offset().left - proxy.width() / 2);
                    }
                    return false;
                },
                onStopResize: function () {
                    var panel = $(this);
                    var container = panel.parents(".layout")[0];
                    var cc = $(container);
                    $('>div.layout-split-proxy-v', container).css('display', 'none');
                    $('>div.layout-split-proxy-h', container).css('display', 'none');
                    var opts = pp.panel('options');
                    opts.width = panel.outerWidth();
                    opts.height = panel.outerHeight();
                    opts.left = panel.css('left');
                    opts.top = panel.css('top');
                    pp.panel('resize');
                    setSize(container);
                    resizing = false;

                    cc.find('>div.layout-mask').remove();
                }
            });
        }
    }

    /**
     * remove a region panel
     */
    function removePanel(container, region, state) {
        if (!state) state = $.data(container, 'layout');
        var panels = state.panels;
        if (panels[region].length) {
            panels[region].panel('destroy');
            panels[region] = $();
            var expandP = 'expand' + region.substring(0, 1).toUpperCase() + region.substring(1);
            if (panels[expandP]) {
                panels[expandP].panel('destroy');
                panels[expandP] = undefined;
            }
        }
    }

    function collapsePanel(container, region, animateSpeed, state, hideWhenCollapse) {
        if (!state) state = $.data(container, 'layout');
//        if (animateSpeed == undefined) animateSpeed = 'normal';
        var opts = state.options;
        var panels = state.panels;

        var p = panels[region];
        var popts = p.panel('options');
        if (popts.onBeforeCollapse.call(p) == false) return;
        // expand panel name: expandNorth, expandSouth, expandWest, expandEast
        var expandP = 'expand' + region.substring(0, 1).toUpperCase() + region.substring(1);
        if (!panels[expandP]) {
            if (!hideWhenCollapse) {
                panels[expandP] = createExpandPanel(region, popts.title);
                panels[expandP].panel('panel').bind('click', {pnlRegion: p, container: container, panels: panels}, function (e) {
//                var copts = getOption(e.data.container, e.data.panels), p = e.data.pnlRegion;
//                p.panel('expand', false).panel('open').panel('resize', copts.collapse);
//                p.panel('panel').animate(copts.expand);
                    expandPanel(e.data.container, region);
                    return false;
                });
            } else panels[expandP] = {visible: false};
        }

        var copts = getOption(container, panels);
        if (!isVisible(panels[expandP])) {
            panels.center.panel('resize', copts.resizeC);
        }
//        p.panel('panel').animate(copts.collapse, animateSpeed, function () {
        p.panel('collapse', false).panel('close');
        if (!hideWhenCollapse) {
            panels[expandP].panel('open').panel('resize', copts.expandP);
            if (region == "north" || region == "south") panels[expandP].panel('body').hide();
        } else panels[expandP].visible = true;
//        });
        if (state.options.onRegionCollapsed) state.options.onRegionCollapsed.call(container, region);

        /**
         * create expand panel
         */
        function createExpandPanel(dir, title) {
            var icon;
            if (dir == 'east') icon = 'layout-button-left';
            else if (dir == 'west') icon = 'layout-button-right';
            else if (dir == 'north') icon = 'layout-button-down';
            else if (dir == 'south') icon = 'layout-button-up';
            if (!title) title = '&nbsp;';
            var p = $('<div></div>').appendTo(container).panel({
                cls: 'layout-expand',
                title: title,
                closed: true,
                doSize: false,
                tools: [
                    {
                        iconCls: icon,
                        handler: function () {
                            var container = $(this).parents(".layout")[0];
                            expandPanel(container, region);
                            return false;
                        }
                    }
                ]
            });
            p.panel('panel').hover(
                function () {
                    $(this).addClass('layout-expand-over');
                },
                function () {
                    $(this).removeClass('layout-expand-over');
                }
            );
            return p;
        }

        /**
         * get collapse option:{
         *   resizeC:{},
         *   expand:{},
         *   expandP:{},    // the expand holder panel
         *   collapse:{}
         * }
         */
        function getOption(container, panels) {
            var hs;
            if (!hideWhenCollapse) hs = 28; else hs = 0;
            var cc = $(container), hh;
            if (region == 'east') {
                return {
                    resizeC: {
                        width: panels.center.panel('options').width + panels['east'].panel('options').width - 28
                    },
                    expand: {
                        left: cc.width() - panels['east'].panel('options').width
                    },
                    expandP: {
                        top: panels['east'].panel('options').top,
                        left: cc.width() - hs,
                        width: hs,
                        height: panels['center'].panel('options').height
                    },
                    collapse: {
                        left: cc.width()
                    }
                };
            } else if (region == 'west') {
                return {
                    resizeC: {
                        width: panels.center.panel('options').width + panels['west'].panel('options').width - 28,
                        left: hs
                    },
                    expand: {
                        left: 0
                    },
                    expandP: {
                        left: 0,
                        top: panels['west'].panel('options').top,
                        width: hs,
                        height: panels['center'].panel('options').height
                    },
                    collapse: {
                        left: -panels['west'].panel('options').width
                    }
                };
            } else if (region == 'north') {
                hh = cc.height() - hs;
                if (isVisible(panels.expandSouth)) {
                    hh -= panels.expandSouth.panel('options').height;
                } else if (isVisible(panels.south)) {
                    hh -= panels.south.panel('options').height;
                }
                panels.east.panel('resize', {top: hs, height: hh});
                panels.west.panel('resize', {top: hs, height: hh});
                if (isVisible(panels.expandEast)) panels.expandEast.panel('resize', {top: hs, height: hh});
                if (isVisible(panels.expandWest)) panels.expandWest.panel('resize', {top: hs, height: hh});

                return {
                    resizeC: {
                        top: hs,
                        height: hh
                    },
                    expand: {
                        top: 0
                    },
                    expandP: {
                        top: 0,
                        left: 0,
                        width: cc.width(),
                        height: hs
                    },
                    collapse: {
                        top: -panels['north'].panel('options').height
                    }
                };
            } else if (region == 'south') {
                hh = cc.height() - hs;
                if (isVisible(panels.expandNorth)) {
                    hh -= panels.expandNorth.panel('options').height;
                } else if (isVisible(panels.north)) {
                    hh -= panels.north.panel('options').height;
                }
                panels.east.panel('resize', {height: hh});
                panels.west.panel('resize', {height: hh});
                if (isVisible(panels.expandEast)) panels.expandEast.panel('resize', {height: hh});
                if (isVisible(panels.expandWest)) panels.expandWest.panel('resize', {height: hh});

                return {
                    resizeC: {
                        height: hh
                    },
                    expand: {
                        top: cc.height() - panels['south'].panel('options').height
                    },
                    expandP: {
                        top: cc.height() - hs,
                        left: 0,
                        width: cc.width(),
                        height: hs
                    },
                    collapse: {
                        top: cc.height()
                    }
                };
            }
        }
    }

    function expandPanel(container, region, state) {
        if (!state) state = $.data(container, 'layout');
        var panels = state.panels;

        var eopts = getOption(container, panels);
        var p = panels[region];
        if (p.panel('options').onBeforeExpand.call(p) == false) return;
        var expandP = 'expand' + region.substring(0, 1).toUpperCase() + region.substring(1);

        if (panels[expandP].length) panels[expandP].panel('close');
        else panels[expandP].visible = false;

        var pp = p.panel('panel');
        p.panel("header").unbind(".layout").bind("click.layout", {container: container}, function(e){
            var container = e.data.container;
            var state = $.data(container, 'layout');
            collapsePanel(container, region, 0, state, false);
        });
        pp.stop(true, true);
        p.panel('expand', false).panel('open').panel('resize', eopts.collapse);
//        pp.animate(eopts.expand, function () {
        setSize(container);
        if (state.options.onRegionExpanded) state.options.onRegionExpanded.call(container, region);
//        });

        /**
         * get expand option: {
         *   collapse:{},
         *   expand:{}
         * }
         */
        function getOption(container, panels) {
            var cc = $(container);
            if (region == 'east' && panels.expandEast) {
                return {
                    collapse: {
                        left: cc.width()
                    },
                    expand: {
                        left: cc.width() - panels['east'].panel('options').width
                    }
                };
            } else if (region == 'west' && panels.expandWest) {
                return {
                    collapse: {
                        left: -panels['west'].panel('options').width
                    },
                    expand: {
                        left: 0
                    }
                };
            } else if (region == 'north' && panels.expandNorth) {
                return {
                    collapse: {
                        top: -panels['north'].panel('options').height
                    },
                    expand: {
                        top: 0
                    }
                };
            } else if (region == 'south' && panels.expandSouth) {
                return {
                    collapse: {
                        top: cc.height()
                    },
                    expand: {
                        top: cc.height() - panels['south'].panel('options').height
                    }
                };
            }
        }
    }

    function bindEvents(container, state) {
        if (!state) state = $.data(container, 'layout');
        var panels = state.panels;

        // bind east panel events
        if (panels.east.length) {
            panels.east.panel('panel').bind('mouseover', {container: container, panels: panels, region: 'east'}, _collapse);
        }

        // bind west panel events
        if (panels.west.length) {
            panels.west.panel('panel').bind('mouseover', {container: container, panels: panels, region: 'west'}, _collapse);
        }

        // bind north panel events
        if (panels.north.length) {
            panels.north.panel('panel').bind('mouseover', {container: container, panels: panels, region: 'north'}, _collapse);
        }

        // bind south panel events
        if (panels.south.length) {
            panels.south.panel('panel').bind('mouseover', {container: container, panels: panels, region: 'south'}, _collapse);
        }

        panels.center.panel('panel').bind('mouseover', {container: container, panels: panels, region: 'center'}, _collapse);

        function _collapse(e) {
            if (resizing == true) return;
            var container = e.data.container, panels = e.data.panels, region = e.data.region;
            if (region != 'east' && isVisible(panels.east) && isVisible(panels.expandEast)) {
                collapsePanel(container, 'east');
            }
            if (region != 'west' && isVisible(panels.west) && isVisible(panels.expandWest)) {
                collapsePanel(container, 'west');
            }
            if (region != 'north' && isVisible(panels.north) && isVisible(panels.expandNorth)) {
                collapsePanel(container, 'north');
            }
            if (region != 'south' && isVisible(panels.south) && isVisible(panels.expandSouth)) {
                collapsePanel(container, 'south');
            }
            return false;
        }
    }

    function isVisible(pp) {
        if (!pp) return false;
        if (pp.length) {
            return pp.panel('panel').is(':visible');
        } else {
            return pp.visible;
        }
    }

    function initCollapse(container, state) {
        if (!state) state = $.data(container, 'layout');
        var panels = state.panels;
        if (panels.east.length && panels.east.panel('options').collapsed) {
            collapsePanel(container, 'east', 0, state);
        }
        if (panels.west.length && panels.west.panel('options').collapsed) {
            collapsePanel(container, 'west', 0, state);
        }
        if (panels.north.length && panels.north.panel('options').collapsed) {
            collapsePanel(container, 'north', 0, state);
        }
        if (panels.south.length && panels.south.panel('options').collapsed) {
            collapsePanel(container, 'south', 0, state);
        }
    }

    $.fn.layout = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.layout.methods[options](this, param);
        }
        options = options || {};

        return this.each(function (options) {
            var state = $.data(this, 'layout');
            if (state) {
                $.extend(state.options, options);
            } else {
                var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), options);

                $.data(this, 'layout', {
                    options: opts,
                    panels: {center: $(), north: $(), south: $(), east: $(), west: $()}
                });
                init(this, state);
                bindEvents(this, state);
            }
            setSize(this, state);
            initCollapse(this, state);
        }, [options]);
    };

    $.fn.layout.methods = {
        resize: function (jq) {
            return jq.each(function () {
                setSize(this);
            });
        },
        panel: function (jq, region) {
            return $.data(jq[0], 'layout').panels[region];
        },
        collapse: function (jq, region) {
            return jq.each(function () {
                collapsePanel(this, region);
            });
        },
        collapseEx: function (jq, region) {
            return jq.each(function () {
                collapsePanel(this, region, 0, undefined, true);
            });
        },
        expand: function (jq, region) {
            return jq.each(function () {
                expandPanel(this, region);
            });
        },
        add: function (jq, options) {
            return jq.each(function () {
                var state = $.data(this, 'layout');
                addPanel(this, options, undefined, state);
                setSize(this, state);
                if ($(this).layout('panel', options.region).panel('options').collapsed) {
                    collapsePanel(this, options.region, 0, state);
                }
            });
        },
        remove: function (jq, region) {
            return jq.each(function () {
                var state = $.data(this, 'layout');
                removePanel(this, region, state);
                setSize(this, state);
            });
        }
    };

    $.fn.layout.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, [
            {fit: 'boolean', marginTop: 'number', marginBottom: 'number', marginLeft: 'number', marginRight: 'number'}
        ]));
    };

    $.fn.layout.defaults = {
        fit: false,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        hideWhenCollapse: false,
        onRegionExpanded: undefined,//function(region)
        onRegionCollapsed: undefined//function(region)
    };

})(jQuery);
