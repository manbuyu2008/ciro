/**
 * panel - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 */
(function ($) {
    function removeNode(node) {
        node.each(function () {
            $(this).remove();
            if ($.browser.msie) {
                this.outerHTML = '';
            }
        });
    }

    function setSize(target, param, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var pheader = state.dc.header;
        var pbody = state.dc.body;

        if (param) {
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }

        if (opts.fit == true) {
            var p = panel.parent();
            p.addClass('panel-noscroll');
            if (p[0].tagName == 'BODY') $('html').addClass('panel-fit');
            opts.width = p.width();
            opts.height = p.height() - getCssIntValue(p, "padding-bottom") - getCssIntValue(p, "padding-top");
        }
        panel.css({
            left: opts.left,
            top: opts.top,
            right: '',
            bottom: ''
        });
        var $target = $(target), p0 = $target.parent();

        if (!isNaN(opts.width)) {
            panel._outerWidth(opts.width);
        } else {
            panel.width('auto');
        }
        pheader.add(pbody)._outerWidth(panel.width());
        var hv = opts.height - getCssIntValue($target, "margin-top") - getCssIntValue($target, "margin-bottom");
        if (!isNaN(opts.height)) {
            panel._outerHeight(hv);
            var h = pheader.outerHeight();
            if (!h) h = 0;
            //更新内容区高度（解决圆弧边框问题） updated by lizhentao 20140917
            var height = panel.height() - h;
            if(opts.boundOffset){
                height -= opts.boundOffset;
            }
            pbody._outerHeight(height);
        } else {
            pbody.height('auto');
        }
        panel.css('height', '');

        opts.onResize.apply(target, [opts.width, hv]);

        pbody.find('div').triggerHandler('_resize');
    }

    function movePanel(target, param, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        if (param) {
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }
        panel.css({
            left: opts.left,
            top: opts.top
        });
        opts.onMove.apply(target, [opts.left, opts.top]);
    }

    function wrapPanel(target) {
        var $target = $(target);

        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        $target.addClass('panel-body');
        var panel = $('<div class="panel" targetid="' + $target.attr('id') + '"></div>').insertBefore(target);
        panel[0].appendChild(target);
//		var panel = $(target).addClass('panel-body').wrap('<div class="panel"></div>').parent();
        panel.bind('_resize', {target: target}, function (e) {
            var target = e.data.target;
            var state = $.data(target, 'panel');
            var opts = state.options;
            if (opts.fit == true) {
                setSize(target, undefined, state);
            }
            return false;
        });

        return panel;
    }

    function addHeader(target, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        if (opts.tools && typeof opts.tools == 'string') {
            panel.find('>div.panel-header>div.panel-tool .panel-tool-a').appendTo(opts.tools);
        }
        removeNode(panel.children('div.panel-header'));
        if (opts.title && !opts.noheader) {
            var header = state.dc.header = $('<div class="panel-header"><div class="panel-title">' + opts.title + '</div></div>').prependTo(panel);
            if (opts.iconCls) {
                header.find('.panel-title').addClass('panel-with-icon');
                $('<div class="panel-icon"></div>').addClass(opts.iconCls).appendTo(header);
            }
            var tool = $('<div class="panel-tool"></div>').appendTo(header);
            tool.bind('click', function (e) {
                e.stopPropagation();
            });
            if (opts.tools) {
                if (typeof opts.tools == 'string') {
                    $(opts.tools).children().each(function (tool) {
                        var $this = $(this);
                        $this.addClass($this.attr('iconCls')).addClass('panel-tool-a').appendTo(tool);
                    }, [tool]);
                } else {
                    for (var i = 0, len = opts.tools.length; i < len; i++) {
                        var t = $('<a href="javascript:void(0)"></a>').addClass(opts.tools[i].iconCls).appendTo(tool);
                        if (opts.tools[i].handler) {
                            t.bind('click', eval(opts.tools[i].handler));
                        }
                    }
                }
            }
            if (opts.collapsible) {
                $('<a class="panel-tool-collapse" href="javascript:void(0)"></a>').appendTo(tool).bind('click', {target: target}, function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'panel');
                    var opts = state.options;
                    if (opts.collapsed == true) {
                        expandPanel(target, true, state);
                    } else {
                        collapsePanel(target, true, state);
                    }
                    return false;
                });
            }
            if (opts.minimizable) {
                $('<a class="panel-tool-min" href="javascript:void(0)"></a>').appendTo(tool).bind('click', {target: target}, function (e) {
                    minimizePanel(e.data.target);
                    return false;
                });
            }
            if (opts.maximizable) {
                $('<a class="panel-tool-max" href="javascript:void(0)"></a>').appendTo(tool).bind('click', {target: target}, function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'panel');
                    var opts = state.options;
                    if (opts.maximized == true) {
                        restorePanel(target, state);
                    } else {
                        maximizePanel(target, state);
                    }
                    return false;
                });
            }
            if (opts.closable) {
                $('<a class="panel-tool-close" href="javascript:void(0)"></a>').appendTo(tool).bind('click', {target: target}, function (e) {
                    closePanel(e.data.target);
                    return false;
                });
            }
            state.dc.body.removeClass('panel-body-noheader');
        } else {
            state.dc.body.addClass('panel-body-noheader');
            state.dc.header = $();
        }
    }

    /**
     * load content from remote site if the href attribute is defined
     */
    function loadData(target, state) {
        if (!state) state = $.data(target, 'panel');
        if (state.options.href && (!state.isLoaded || !state.options.cache)) {
            state.isLoaded = false;
            clearOuter(target);
            var pbody = state.dc.body;
            if (state.options.loadingMessage) {
                pbody.html('<div class="panel-loading">' + state.options.loadingMessage + '</div>');
            }
            var pnlId = $(target).attr('id');
            $.ajax({
                url: state.options.href,
                cache: false,
                success: function (data) {
                    var $target = $('#' + pnlId);
                    var target = $target[0];
                    var state = $.data(target, 'panel');
                    var pbody = state.dc.body;
                    pbody.html(state.options.extractor.call(target, data));
                    if ($.parser) {
                        $.parser.parse(pbody);
                    }
                    state.options.onLoad.apply(target, arguments);
                    state.isLoaded = true;
                }
            });
        }
    }

    /**
     * clear objects that placed outer of panel
     */
    function clearOuter(target) {
        var t = $(target);
        t.find('.combo-f').each(function () {
            $(this).combo('destroy');
        });
        t.find('.m-btn').each(function () {
            $(this).menubutton('destroy');
        });
        t.find('.s-btn').each(function () {
            $(this).splitbutton('destroy');
        });
    }

    function doLayout(target) {
        $(target).find('div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible').each(function () {
            $(this).triggerHandler('_resize', [true]);
        });
    }

    function openPanel(target, forceOpen, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;

        if (forceOpen != true) {
            if (opts.onBeforeOpen.call(target) == false) return;
        }
        panel.show();
        //panel过大时，自动最大化，用于对话框
        if (opts.maxWhenExceed && (opts.top < 0 || opts.left < 0)) {
            opts.maximized = true;
        }
        opts.closed = false;
        opts.minimized = false;
        opts.onOpen.call(target);

        if (opts.maximized == true) {
            opts.maximized = false;
            maximizePanel(target, state);
        }
        if (opts.collapsed == true) {
            opts.collapsed = false;
            collapsePanel(target, false, state);
        }

        if (!opts.collapsed) {
            loadData(target, state);
            doLayout(target);
        }
    }

    function closePanel(target, forceClose, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        if (!panel.is(':visible')) return;
        if (forceClose != true) {
            if (opts.onBeforeClose.call(target) == false) return;
        }
        panel.hide();
        opts.closed = true;
        opts.onClose.call(target);
    }

    function destroyPanel(target, forceDestroy, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;

        if (forceDestroy != true) {
            if (opts.onBeforeDestroy.call(target) == false) return;
        }
        clearOuter(target);
        removeNode(panel);
        opts.onDestroy.call(target);
    }

    function collapsePanel(target, animate, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var body = state.dc.body;
        var tool = state.dc.header.find('a.panel-tool-collapse');

        if (opts.collapsed == true) return;

        body.stop(true, true);	// stop animation
        if (opts.onBeforeCollapse.call(target) == false) return;

        tool.addClass('panel-tool-expand');
        if (animate == true) {
            var id = $(target).attr('id');
            body.slideUp('normal', function () {
                var target = $('#' + id)[0];
                var opts = $.data(target, 'panel').options;
                opts.collapsed = true;
                opts.onCollapse.call(target);
            });
        } else {
            body.hide();
            opts.collapsed = true;
            opts.onCollapse.call(target);
        }
    }

    function expandPanel(target, animate, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var body = state.dc.body;
        var tool = state.dc.header.find('a.panel-tool-collapse');

        if (opts.collapsed == false) return;

        body.stop(true, true);	// stop animation
        if (opts.onBeforeExpand.call(target) == false) return;

        tool.removeClass('panel-tool-expand');
        if (animate == true) {
            var id = $(target).attr('id');
            body.slideDown('normal', function () {
                var target = $('#' + id)[0];
                var state = $.data(target, 'panel');
                var opts = state.options;
                opts.collapsed = false;
                opts.onExpand.call(target);
                loadData(target, state);
                doLayout(target);
            });
        } else {
            body.show();
            opts.collapsed = false;
            opts.onExpand.call(target);
            loadData(target, state);
            doLayout(target);
        }
    }

    function maximizePanel(target, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var tool = state.dc.header.find('a.panel-tool-max');

        if (opts.maximized == true) return;

        tool.addClass('panel-tool-restore');
        if (opts.top < 0 || opts.left < 0) {
            tool.hide();
        }
        if (!state.original) {
            state.original = {
                width: opts.width,
                height: opts.height,
                left: opts.left,
                top: opts.top,
                fit: opts.fit
            };
        }
        opts.left = 0;
        opts.top = 0;
        opts.fit = true;
        setSize(target, undefined, state);
        opts.minimized = false;
        opts.maximized = true;
        opts.onMaximize.call(target);
    }

    function minimizePanel(target, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        panel.hide();
        opts.minimized = true;
        opts.maximized = false;
        opts.onMinimize.call(target);
    }

    function restorePanel(target, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var tool = state.dc.header.find('a.panel-tool-max');

        if (opts.maximized == false) return;

        panel.show();
        tool.removeClass('panel-tool-restore');
        var original = state.original;
        opts.width = original.width;
        opts.height = original.height;
        opts.left = original.left;
        opts.top = original.top;
        opts.fit = original.fit;
        setSize(target, undefined, state);
        opts.minimized = false;
        opts.maximized = false;
        state.original = null;
        opts.onRestore.call(target);
    }

    function setProperties(target, state) {
        if (!state) state = $.data(target, 'panel');
        var opts = state.options;
        var panel = state.panel;
        var header = state.dc.header;
        var body = state.dc.body;

        panel.css(opts.style);
        panel.addClass(opts.cls);

        if (opts.border) {
            header.removeClass('panel-header-noborder');
            body.removeClass('panel-body-noborder');
        } else {
            header.addClass('panel-header-noborder');
            body.addClass('panel-body-noborder');
        }
        header.addClass(opts.headerCls);
        body.addClass(opts.bodyCls);
    }

    function setTitle(target, title) {
        var state = $.data(target, 'panel');
        state.options.title = title;
        state.dc.header.find('div.panel-title').html(title);
    }

    var TO = false;
    var canResize = true;
    $(window).unbind('.panel').bind('resize.panel', function () {
        if (!canResize) return;
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function () {
            canResize = false;
            var layout = $('body.layout');
            if (layout.length) {
                //打开的对话框，如果最大化，要重新搞整下
                $('body div.window-body:visible').panel('resize');
                layout.layout('resize');
            } else {
                $('body').children('div.panel,div.accordion,div.tabs-container,div.layout').triggerHandler('_resize');
            }
            canResize = true;
            TO = false;
        }, 200);
    });

    $.fn.panel = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.panel.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'panel');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), options);
                $(this).attr('title', '');
                state = $.data(this, 'panel', {
                    options: opts,
                    panel: wrapPanel(this),
                    isLoaded: false
                });
                state.dc = {
                    body: state.panel.children('div.panel-body')
                };
            }

            if (opts.content) {
                $(this).html(opts.content);
                if ($.parser) {
                    $.parser.parse(this);
                }
            }

            addHeader(this, state);
            setProperties(this, state);

            if (opts.doSize == true) {
                state.panel.css('display', 'block');
                setSize(this, undefined, state);
            }
            if (opts.closed == true || opts.minimized == true) {
                state.panel.hide();
            } else {
                openPanel(this, undefined, state);
            }
        }, [options]);
    };

    $.fn.panel.methods = {
        options: function (jq) {
            return $.data(jq[0], 'panel').options;
        },
        panel: function (jq) {
            return $.data(jq[0], 'panel').panel;
        },
        header: function (jq) {
            return $.data(jq[0], 'panel').dc.header;
        },
        body: function (jq) {
            return $.data(jq[0], 'panel').dc.body;
        },
        setTitle: function (jq, title) {
            return jq.each(function () {
                setTitle(this, title);
            });
        },
        open: function (jq, forceOpen) {
            return jq.each(function () {
                openPanel(this, forceOpen);
            });
        },
        close: function (jq, forceClose) {
            return jq.each(function () {
                closePanel(this, forceClose);
            });
        },
        destroy: function (jq, forceDestroy) {
            return jq.each(function () {
                destroyPanel(this, forceDestroy);
            });
        },
        refresh: function (jq, href) {
            return jq.each(function () {
                var state = $.data(this, 'panel');
                state.isLoaded = false;
                if (href) {
                    state.options.href = href;
                }
                loadData(this, state);
            });
        },
        resize: function (jq, param) {
            return jq.each(function () {
                setSize(this, param);
            });
        },
        move: function (jq, param) {
            return jq.each(function () {
                movePanel(this, param);
            });
        },
        maximize: function (jq) {
            return jq.each(function () {
                maximizePanel(this);
            });
        },
        minimize: function (jq) {
            return jq.each(function () {
                minimizePanel(this);
            });
        },
        restore: function (jq) {
            return jq.each(function () {
                restorePanel(this);
            });
        },
        collapse: function (jq, animate) {
            return jq.each(function () {
                collapsePanel(this, animate);
            });
        },
        expand: function (jq, animate) {
            return jq.each(function () {
                expandPanel(this, animate);
            });
        }
    };

    $.fn.panel.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ['id', 'width', 'height', 'left', 'top',
            'title', 'iconCls', 'cls', 'headerCls', 'bodyCls', 'tools', 'href',
            {cache: 'boolean', fit: 'boolean', border: 'boolean', noheader: 'boolean'},
            {collapsible: 'boolean', minimizable: 'boolean', maximizable: 'boolean'},
            {closable: 'boolean', collapsed: 'boolean', minimized: 'boolean', maximized: 'boolean', closed: 'boolean'}
        ]), {
            loadingMessage: t.attr('loadingMessage')
        });
//
//
//        return {
//			id: t.attr('id'),
//			width: (parseInt(target.style.width) || undefined),
//			height: (parseInt(target.style.height) || undefined),
//			left: (parseInt(target.style.left) || undefined),
//			top: (parseInt(target.style.top) || undefined),
//			title: (t.attr('title') || undefined),
//			iconCls: (t.attr('iconCls') || t.attr('icon')),
//			cls: t.attr('cls'),
//			headerCls: t.attr('headerCls'),
//			bodyCls: t.attr('bodyCls'),
//			tools: t.attr('tools'),
//			href: t.attr('href'),
//			loadingMessage: t.attr('loadingMessage'),
//			cache: (t.attr('cache') == 'true' ? true : undefined),
//			fit: (t.attr('fit') == 'true' ? true : undefined),
//			border: (t.attr('border') == 'true' ? true : undefined),
//			noheader: (t.attr('noheader') == 'true' ? true : undefined),
//			collapsible: (t.attr('collapsible') == 'true' ? true : undefined),
//			minimizable: (t.attr('minimizable') == 'true' ? true : undefined),
//			maximizable: (t.attr('maximizable') == 'true' ? true : undefined),
//			closable: (t.attr('closable') == 'true' ? true : undefined),
//			collapsed: (t.attr('collapsed') == 'true' ? true : undefined),
//			minimized: (t.attr('minimized') == 'true' ? true : undefined),
//			maximized: (t.attr('maximized') == 'true' ? true : undefined),
//			closed: (t.attr('closed') == 'true' ? true : undefined)
//		}
    };

    $.fn.panel.defaults = {
        id: null,
        title: null,
        iconCls: null,
        width: 'auto',
        height: 'auto',
        left: null,
        top: null,
        cls: null,
        headerCls: null,
        bodyCls: null,
        style: {},
        href: null,
        cache: true,
        fit: false,
        border: true,
        doSize: true,	// true to set size and do layout
        noheader: false,
        content: null,	// the body content if specified
        maxWhenExceed: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        closed: false,

        // custom tools, every tool can contain two properties: iconCls and handler
        // iconCls is a icon CSS class
        // handler is a function, which will be run when tool button is clicked
        tools: null,

        loadingMessage: 'Loading...',
        extractor: function (data) {	// define how to extract the content from ajax response, return extracted data
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches = pattern.exec(data);
            if (matches) {
                return matches[1];	// only extract body content
            } else {
                return data;
            }
        },

        onLoad: function () {
        },
        onBeforeOpen: function () {
        },
        onOpen: function () {
        },
        onBeforeClose: function () {
        },
        onClose: function () {
        },
        onBeforeDestroy: function () {
        },
        onDestroy: function () {
        },
        onResize: function (width, height) {
        },
        onMove: function (left, top) {
        },
        onMaximize: function () {
        },
        onRestore: function () {
        },
        onMinimize: function () {
        },
        onBeforeCollapse: function () {
        },
        onBeforeExpand: function () {
        },
        onCollapse: function () {
        },
        onExpand: function () {
        }
    };
})(jQuery);
