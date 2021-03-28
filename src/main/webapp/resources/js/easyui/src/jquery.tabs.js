/**
 * tabs - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      panel
 *   linkbutton
 *
 */
(function ($) {

    /**
     * get the max tabs scroll width(scope)
     */
    function getMaxScrollWidth(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var header = state.dc.header;
        var tabsWidth = 0;	// all tabs width
        $('ul.tabs li', header).each(function () {
            tabsWidth += $(this).outerWidth(true);
        });
        var wrapWidth = header.children('div.tabs-wrap').width();
        var padding = parseInt(header.find('ul.tabs').css('padding-left'));

        return tabsWidth - wrapWidth + padding;
    }

    /**
     * set the tabs scrollers to show or not,
     * dependent on the tabs count and width
     */
    function setScrollers(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options;
        var header = state.dc.header;
        var tool = header.children('div.tabs-tool');
        var sLeft = header.children('div.tabs-scroller-left');
        var sRight = header.children('div.tabs-scroller-right');
        var wrap = state.dc.wrap;

        // set the tool height
        tool._outerHeight(header.outerHeight() - (opts.plain ? 2 : 0));

        var tabsWidth = 0;
        $('ul.tabs li', header).each(function () {
            tabsWidth += $(this).outerWidth(true);
        });
        var cWidth = header.width() - tool.outerWidth();

        if (tabsWidth > cWidth) {
            sLeft.show();
            sRight.show();
            tool.css('right', sRight.outerWidth());
            wrap.css({
                marginLeft: sLeft.outerWidth(),
                marginRight: sRight.outerWidth() + tool.outerWidth(),
                left: 0,
                width: cWidth - sLeft.outerWidth() - sRight.outerWidth()
            });
        } else {
            sLeft.hide();
            sRight.hide();
            tool.css('right', 0);
            wrap.css({
                marginLeft: 0,
                marginRight: tool.outerWidth(),
                left: 0,
                width: cWidth
            });
            wrap.scrollLeft(0);
        }
    }

    function addTools(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options;
        var header = state.dc.header;

        if (opts.tools) {
            if (typeof opts.tools == 'string') {
                var t = $(opts.tools);
                t.addClass('tabs-tool').appendTo(header);
                t.show();
            } else {
                header.children('div.tabs-tool').remove();
                var tools = $('<div class="tabs-tool"></div>').appendTo(header);
                for (var i = 0, len = opts.tools.length; i < len; i++) {
                    var tool = $('<a href="javascript:void(0);"></a>').appendTo(tools);
                    tool[0].onclick = eval(opts.tools[i].handler || function () {
                    });
                    opts.tools[i].plain = true;
                    tool.linkbutton(opts.tools[i]);
                }
            }
        } else {
            header.children('div.tabs-tool').remove();
        }
    }

    function setSize(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options;
        var cc = $(container);
        if (opts.fit == true) {
            var p = cc.parent();
            p.addClass('panel-noscroll');
            if (p[0].tagName == 'BODY') $('html').addClass('panel-fit');
            opts.width = p.width();
            opts.height = p.height() - getCssIntValue(cc, "margin-top") - getCssIntValue(cc, "margin-bottom") - getCssIntValue(p, "padding-bottom") - getCssIntValue(p, "padding-top")
        }
        cc.width(opts.width).height(opts.height);

        var header = state.dc.header;
        header._outerWidth(opts.width);

        setScrollers(container, state);

        var panels = cc.children('div.tabs-panels');
        var height = opts.height - getCssIntValue(cc, "margin-top") - getCssIntValue(cc, "margin-bottom");
        if (!isNaN(height)) {
            panels._outerHeight(height - header.outerHeight());
        } else {
            panels.height('auto');
        }
        var width = opts.width;
        if (!isNaN(width)) {
            panels._outerWidth(width);
        } else {
            panels.width('auto');
        }
    }

    /**
     * set selected tab panel size
     */
    function setSelectedSize(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options;
        var tab = getSelectedTab(container, state);
        if (tab) {
            var panels = state.dc.panels;
            var width = opts.width == 'auto' ? 'auto' : panels.width();
            var height = opts.height == 'auto' ? 'auto' : panels.height();
            tab.panel('resize', {
                width: width,
                height: height
            });
            opts.onSelectedTabResize.call(container, tab);
        }
    }

    /**
     * wrap the tabs header and body
     */
    function wrapTabs(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var tabs = state.tabs;
        var cc = $(container);
        if (!cc.attr('id')) cc.attr('id', $.parser.getObjGUID());
        cc.addClass('tabs-container');
        cc.wrapInner('<div class="tabs-panels"/>');
        var header = state.dc.header = $('<div class="tabs-header">'
            + '<div class="tabs-scroller-left"></div>'
            + '<div class="tabs-scroller-right"></div>'
            + '<div class="tabs-wrap">'
            + '<ul class="tabs"></ul>'
            + '</div>'
            + '</div>').prependTo(container);
        state.dc.wrap = header.children('div.tabs-wrap');
        var panels = state.dc.panels = cc.children('div.tabs-panels');

        panels.children('div').each(function (i) {
            var pp = $(this);
            var opts = $.extend({}, $.parser.parseOptions(this), {
                selected: (pp.attr('selected') ? true : undefined)
            });
            tabs.push(pp);
            createTab(container, pp, opts, state);
        });

        header.find('.tabs-scroller-left, .tabs-scroller-right').hover(
            function () {
                $(this).addClass('tabs-scroller-over');
            },
            function () {
                $(this).removeClass('tabs-scroller-over');
            }
        );
        cc.bind('_resize', function (e, force) {
            var state = $.data(this, 'tabs');
            var opts = state.options;
            if (opts.fit == true || force) {
                setSize(this, state);
                setSelectedSize(this, state);
            }
            return false;
        });
    }

    function setProperties(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options, cc = $(container);
        var header = state.dc.header;
        var panels = state.dc.panels;

        if (opts.plain == true) {
            header.addClass('tabs-header-plain');
        } else {
            header.removeClass('tabs-header-plain');
        }
        if (opts.border == true) {
            header.removeClass('tabs-header-noborder');
            panels.removeClass('tabs-panels-noborder');
        } else {
            header.addClass('tabs-header-noborder');
            panels.addClass('tabs-panels-noborder');
        }

        $('.tabs-scroller-left', header).unbind('.tabs').bind('click.tabs', {container: container}, function (e) {
            var opts = $.data(e.data.container, 'tabs').options;
            var wrap = $('.tabs-wrap', header);
            var pos = wrap.scrollLeft() - opts.scrollIncrement;
            wrap.animate({scrollLeft: pos}, opts.scrollDuration);
        });

        $('.tabs-scroller-right', header).unbind('.tabs').bind('click.tabs', {container: container}, function (e) {
            var container = e.data.container;
            var state = $.data(container, 'tabs');
            var opts = state.options;
            var wrap = $('.tabs-wrap', header);
            var pos = Math.min(
                wrap.scrollLeft() + opts.scrollIncrement,
                getMaxScrollWidth(container, state)
            );
            wrap.animate({scrollLeft: pos}, opts.scrollDuration);
        });
    }

    function createTab(container, pp, options, state) {
        if (!state) state = $.data(container, 'tabs');
        options = options || {};
        var $container = $(container);
        pp.attr('tabsId', $container.attr('id'));
        // create panel
        pp.panel($.extend({}, options, {
            border: false,
            noheader: true,
            closed: true,
            doSize: false,
            iconCls: (options.icon ? options.icon : undefined),
            onLoad: function () {
                var container = $('#' + $(this).attr('tabsId'))[0];
                var state = $.data(container, 'tabs');
                if (options.onLoad) {
                    options.onLoad.call(this, arguments);
                }
                state.options.onLoad.call(container, $(this));
            }
        }));

        var opts = pp.panel('options');
        var tabs = state.dc.header.find('ul.tabs');

        function getTabIndex(tabs, li) {
            return tabs.find('li').index(li);
        }

        opts.tab = $('<li></li>').appendTo(tabs);	// set the tab object in panel options
        opts.tab.unbind('.tabs').bind('click.tabs', {container: container},function (e) {
            if ($(this).hasClass('tabs-disabled')) return;
            var container = e.data.container;
            var state = $.data(container, 'tabs');
            var tabs = state.dc.header.find('ul.tabs');
            selectTab(container, getTabIndex(tabs, this), state);
        }).bind('contextmenu.tabs', {container: container}, function (e) {
                var $this = $(this);
                if ($this.hasClass('tabs-disabled')) {
                    return;
                }
                var container = e.data.container;
                var state = $.data(container, 'tabs');
                var tabs = state.dc.header.find('ul.tabs');
                state.options.onContextMenu.call(container, e, $this.find('span.tabs-title').html(), getTabIndex(tabs, this));
            });
        var a_inner = $('<a href="javascript:void(0)" class="tabs-inner"></a>').appendTo(opts.tab);
        var s_title = $('<span class="tabs-title"></span>').html(opts.title).appendTo(a_inner);
        var s_icon = $('<span class="tabs-icon"></span>').appendTo(a_inner);


        if (opts.closable) {
            s_title.addClass('tabs-closable');
            var a_close = $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(opts.tab);
            a_close.unbind('.tabs').bind('click.tabs', {container: container}, function (e) {
                var $this = $(this);
                if ($this.parent().hasClass('tabs-disabled')) {
                    return;
                }
                var container = e.data.container;
                var tabs = $(container).children('div.tabs-header').find('ul.tabs');
                closeTab(container, getTabIndex(tabs, $this.parent()));
                return false;
            });
        }
        if (opts.iconCls) {
            s_title.addClass('tabs-with-icon');
            s_icon.addClass(opts.iconCls);
        }

        if (opts.tools) {
            var p_tool = $('<span class="tabs-p-tool"></span>').insertAfter(a_inner);
            if (typeof opts.tools == 'string') {
                $(opts.tools).children().appendTo(p_tool);
            } else {
                for (var i = 0, len = opts.tools.length; i < len; i++) {
                    var t = $('<a href="javascript:void(0)"></a>').appendTo(p_tool);
                    t.addClass(opts.tools[i].iconCls);
                    if (opts.tools[i].handler) {
                        t.bind('click', eval(opts.tools[i].handler));
                    }
                }
            }
            var pr = p_tool.children().length * 12;
            if (opts.closable) {
                pr += 8;
            } else {
                pr -= 3;
                p_tool.css('right', '5px');
            }
            s_title.css('padding-right', pr + 'px');
        }
    }

    function addTab(container, options) {
        var state = $.data(container, 'tabs');
        var opts = state.options;
        var tabs = state.tabs;
        if (options.selected == undefined) options.selected = true;

        var pp = $('<div></div>').appendTo(state.dc.panels);
        tabs.push(pp);
        createTab(container, pp, options, state);

        opts.onAdd.call(container, options.title, tabs.length - 1);

        setScrollers(container, state);

        if (options.selected) {
            selectTab(container, tabs.length - 1, state);	// select the added tab panel
        }
    }

    /**
     * update tab panel, param has following properties:
     * tab: the tab panel to be updated
     * options: the tab panel options
     */
    function updateTab(container, param) {
        var state = $.data(container, 'tabs');
        var selectHis = state.selectHis;
        var pp = param.tab;	// the tab panel
        var oldTitle = pp.panel('options').title;
        pp.panel($.extend({}, param.options, {
            iconCls: (param.options.icon ? param.options.icon : undefined)
        }));

        var opts = pp.panel('options');	// get the tab panel options
        var tab = opts.tab;

        tab.find('span.tabs-icon').attr('class', 'tabs-icon');
        tab.find('a.tabs-close').remove();
        tab.find('span.tabs-title').html(opts.title);

        if (opts.closable) {
            tab.find('span.tabs-title').addClass('tabs-closable');
            $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(tab);
        } else {
            tab.find('span.tabs-title').removeClass('tabs-closable');
        }
        if (opts.iconCls) {
            tab.find('span.tabs-title').addClass('tabs-with-icon');
            tab.find('span.tabs-icon').addClass(opts.iconCls);
        } else {
            tab.find('span.tabs-title').removeClass('tabs-with-icon');
        }

        if (oldTitle != opts.title) {
            for (var i = 0, len = selectHis.length; i < len; i++) {
                if (selectHis[i] == oldTitle) {
                    selectHis[i] = opts.title;
                }
            }
        }

        setProperties(container, state);

        state.options.onUpdate.call(container, opts.title, getTabIndex(container, pp, state));
    }

    /**
     * close a tab with specified index or title
     */
    function closeTab(container, which) {
        var state = $.data(container, 'tabs');
        var opts = state.options;
        var tabs = state.tabs;
        var selectHis = state.selectHis;

        if (!exists(container, which, state)) return;

        var tab = getTab(container, which, undefined, state);
        var title = tab.panel('options').title;

        var index = getTabIndex(container, tab, state);
        if (opts.onBeforeClose.call(container, title, index) == false) return;

        tab = getTab(container, which, true, state);
        tab.panel('options').tab.remove();
        tab.panel('destroy');

        opts.onClose.call(container, title, index);

        setScrollers(container, state);

        // remove the select history item
        for (var i = 0, len = selectHis.length; i < len; i++) {
            if (selectHis[i] == title) {
                selectHis.splice(i, 1);
                i--;
            }
        }

        // select the nearest tab panel
        var hisTitle = selectHis.pop();
        if (hisTitle) {
            selectTab(container, hisTitle, state);
        } else if (tabs.length) {
            selectTab(container, 0, state);
        }
    }

    /**
     * get the specified tab panel
     */
    function getTab(container, which, removeit, state) {
        if (!state) state = $.data(container, 'tabs');
        var tabs = state.tabs, tab;
        if (typeof which == 'number') {
            if (which < 0 || which >= tabs.length) {
                return null;
            } else {
                tab = tabs[which];
                if (removeit) {
                    tabs.splice(which, 1);
                }
                return tab;
            }
        }
        for (var i = 0, len = tabs.length; i < len; i++) {
            tab = tabs[i];
            if (tab.panel('options').title == which) {
                if (removeit) {
                    tabs.splice(i, 1);
                }
                return tab;
            }
        }
        return null;
    }

    function getTabIndex(container, tab, state) {
        if (!state) state = $.data(container, 'tabs');
        var tabs = state.tabs;
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i][0] == tab) {
                return i;
            }
        }
        return -1;
    }

    function getSelectedTab(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var tabs = state.tabs;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel('options').closed == false) {
                return tab;
            }
        }
        return null;
    }

    /**
     * do first select action, if no tab is setted the first tab will be selected.
     */
    function doFirstSelect(container, state) {
        if (!state) state = $.data(container, 'tabs');
        var tabs = state.tabs;
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i].panel('options').selected) {
                selectTab(container, i, state);
                return;
            }
        }
        if (tabs.length) {
            selectTab(container, 0, state);
        }
    }

    function selectTab(container, which, state) {
        if (!state) state = $.data(container, 'tabs');
        var opts = state.options;
        var tabs = state.tabs;
        var selectHis = state.selectHis;

        if (tabs.length == 0) return;

        var selected = getSelectedTab(container, state);
        var selectedTitle = undefined;
        if (selected) selectedTitle = selected.panel('options').title;
        if (opts.onBeforeSelect && opts.onBeforeSelect.call(container, selectedTitle, which) === false) return;
        if (selected) {
            selected.panel('close');
            selected.panel('options').tab.removeClass('tabs-selected');
        }

        var panel = getTab(container, which, undefined, state); // get the panel to be activated
        if (!panel) return;

        panel.panel('open');
        var title = panel.panel('options').title;	// the panel title
        selectHis.push(title);	// push select history

        var tab = panel.panel('options').tab;	// get the tab object
        tab.addClass('tabs-selected');

        // scroll the tab to center position if required.
        var wrap = state.dc.wrap;
        var leftPos = tab.position().left + wrap.scrollLeft();
        var left = leftPos - wrap.scrollLeft();
        var right = left + tab.outerWidth(), pos;
        if (left < 0 || right > wrap.innerWidth()) {
            pos = Math.min(
                leftPos - (wrap.width() - tab.width()) / 2,
                getMaxScrollWidth(container, state)
            );
            wrap.animate({scrollLeft: pos}, opts.scrollDuration);
        } else {
            pos = Math.min(
                wrap.scrollLeft(),
                getMaxScrollWidth(container, state)
            );
            wrap.animate({scrollLeft: pos}, opts.scrollDuration);
        }

        setSelectedSize(container, state);

        opts.onSelect.call(container, title, getTabIndex(container, panel, state));
    }

    function exists(container, which, state) {
        return getTab(container, which, undefined, state) != null;
    }


    $.fn.tabs = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.tabs.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'tabs');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                state = $.data(this, 'tabs', {
                    options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), options),
                    tabs: [],
                    dc: {},
                    selectHis: []
                });
                wrapTabs(this, state);
            }

            addTools(this, state);
            setProperties(this, state);
            setSize(this, state);

            doFirstSelect(this, state);
        }, [options]);
    };

    $.fn.tabs.methods = {
        options: function (jq) {
            return $.data(jq[0], 'tabs').options;
        },
        tabs: function (jq) {
            return $.data(jq[0], 'tabs').tabs;
        },
        resize: function (jq, param) {
            return jq.each(function () {
                var state = $.data(this, 'tabs');
                var opt = state.options
                if (param.width) opt.width = param.width;
                if (param.height) opt.height = param.height;
                setSize(this, state);
                setSelectedSize(this, state);
            });
        },
        add: function (jq, options) {
            return jq.each(function () {
                addTab(this, options);
            });
        },
        close: function (jq, which) {
            return jq.each(function () {
                closeTab(this, which);
            });
        },
        getTab: function (jq, which) {
            return getTab(jq[0], which);
        },
        getTabIndex: function (jq, tab) {
            return getTabIndex(jq[0], tab);
        },
        getSelected: function (jq) {
            return getSelectedTab(jq[0]);
        },
        select: function (jq, which) {
            return jq.each(function () {
                selectTab(this, which);
            });
        },
        exists: function (jq, which) {
            return exists(jq[0], which);
        },
        update: function (jq, options) {
            return jq.each(function () {
                updateTab(this, options);
            });
        },
        enableTab: function (jq, which) {
            return jq.each(function () {
                getTab(this, which).panel('options').tab.removeClass('tabs-disabled');
            });
        },
        disableTab: function (jq, which) {
            return jq.each(function () {
                getTab(this, which).panel('options').tab.addClass('tabs-disabled');
            });
        }
    };

    $.fn.tabs.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, [
            'width', 'height', 'tools',
            {fit: 'boolean', border: 'boolean', plain: 'boolean'}
        ]));
    };

    $.fn.tabs.defaults = {
        width: 'auto',
        height: 'auto',
        plain: false,
        fit: false,
        border: true,
        tools: null,
        scrollIncrement: 100,
        scrollDuration: 400,
        onLoad: function (panel) {
        },
        onSelect: function (title, index) {
        },
        onBeforeClose: function (title, index) {
        },
        onClose: function (title, index) {
        },
        onAdd: function (title, index) {
        },
        onUpdate: function (title, index) {
        },
        onContextMenu: function (e, title, index) {
        },
        onSelectedTabResize: function(tab) {
        }

    };
})(jQuery);