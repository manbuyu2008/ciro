/**
 * accordion - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      panel
 *
 */
(function ($) {

    function setSize(container, state) {
        if (!state) state = $.data(container, 'accordion');
        var opts = state.options;
        var panels = state.panels;

        var cc = $(container);
        opts.fit ? $.extend(opts, cc._fit()) : cc._fit(false);

//        if (opts.fit == true) {
//            var p = cc.parent();
//            p.addClass('panel-noscroll');
//            opts.width = p.width();
//            opts.height = p.height();
//        }

        if (opts.width > 0) {
            cc._outerWidth(opts.width);
        }
        var panelHeight = 'auto';
        if (opts.height > 0) {
            cc._outerHeight(opts.height);
            // get the first panel's header height as all the header height
            var headerHeight = panels.length ? panels[0].panel('header').css('height', '')._outerHeight() : 'auto';
            panelHeight = cc.height() - (panels.length - 1) * headerHeight;
        }
        for (var i = 0, len = panels.length; i < len; i++) {
            var panel = panels[i];
            var header = panel.panel('header');
            header._outerHeight(headerHeight);
            panel.panel('resize', {
                width:cc.width(),
                height:panelHeight
            });
        }
    }

    /**
     * get the current panel
     */
    function getCurrent(container, state) {
        if (!state) state = $.data(container, 'accordion');
        var panels = state.panels;
        for (var i = 0, len = panels.length; i < len; i++) {
            var panel = panels[i];
            if (panel.panel('options').collapsed == false) {
                return panel;
            }
        }
        return null;
    }

    /**
     * get panel index, start with 0
     */
    function getPanelIndex(container, panel, state) {
        if (!state) state = $.data(container, 'accordion');
        var panels = state.panels, p = $(panel)[0];
        for (var i = 0, len = panels.length; i < len; i++) {
            if (panels[i][0] == p) {
                return i;
            }
        }
        return -1;
    }

    /**
     * get the specified panel, remove it from panel array if removeit setted to true.
     */
    function getPanel(container, which, removeit, state) {
        if (!state) state = $.data(container, 'accordion');
        var panels = state.panels, panel;
        if (typeof which == 'number') {
            if (which < 0 || which >= panels.length) {
                return null;
            } else {
                panel = panels[which];
                if (removeit) {
                    panels.splice(which, 1);
                }
                return panel;
            }
        }
        for (var i = 0, len = panels.length; i < len; i++) {
            panel = panels[i];
            if (panel.panel('options').title == which) {
                if (removeit) {
                    panels.splice(i, 1);
                }
                return panel;
            }
        }
        return null;
    }

    function setProperties(container, state) {
        if (!state) state = $.data(container, 'accordion');
        var opts = state.options;
        var cc = $(container);
        if (opts.border) {
            cc.removeClass('accordion-noborder');
        } else {
            cc.addClass('accordion-noborder');
        }
    }

    function wrapAccordion(container) {
        var cc = $(container);
        cc.addClass('accordion');

        var panels = [];
        cc.children('div').each(function (container) {
            var opts = $.extend({}, $.parser.parseOptions(this), {
                selected:($(this).prop('selected') ? true : undefined)
            });
            var pp = $(this);
            panels.push(pp);
            createPanel(container, pp, opts);
        }, [container]);

        cc.bind('_resize', function (e, force) {
            var container = this;
            var state = $.data(container, 'accordion');
            var opts = state.options;
            if (opts.fit == true || force) {
                setSize(container, state);
            }
            return false;
        });

        return {
            accordion:cc,
            panels:panels
        }
    }

    function createPanel(container, pp, options) {
        pp.panel($.extend({}, options, {
            collapsible:false,
            minimizable:false,
            maximizable:false,
            closable:false,
            doSize:false,
            collapsed:true,
            headerCls:'accordion-header',
            bodyCls:'accordion-body',

            onBeforeExpand:function () {
                var t = $(this);
                var container = t.parents("div.accordion")[0];
                var curr = getCurrent(container), header;
                if (curr) {
                    header = $(curr).panel('header');
                    header.removeClass('accordion-header-selected');
                    header.find('.accordion-collapse').triggerHandler('click');
                }
                header = t.panel('header');
                header.addClass('accordion-header-selected');
                header.find('.accordion-collapse').removeClass('accordion-expand');
            },
            onExpand:function () {
                var pp = $(this), container = pp.parents("div.accordion")[0];
                var state = $.data(container, 'accordion');
                var opts = state.options;
                opts.onSelect.call(container, pp.panel('options').title, getPanelIndex(container, this, state));

            },
            onBeforeCollapse:function () {
                var header = $(this).panel('header');
                header.removeClass('accordion-header-selected');
                header.find('.accordion-collapse').addClass('accordion-expand');
            }
        }));

        var header = pp.panel('header');
        var t = $('<a class="accordion-collapse accordion-expand" href="javascript:void(0)"></a>').appendTo(header.children('div.panel-tool'));
        t.bind('click', function (e) {
            var $this = $(this);
            var container = $this.parents("div.accordion")[0];
            var state = $.data(container, 'accordion');
            var animate = state.options.animate;
            var pp = $($($this.parents("div.panel-header")[0]).next("div.panel-body")[0]);
            stopAnimate(container, state);
            if (pp.panel('options').collapsed) {
                pp.panel('expand', animate);
            } else {
                pp.panel('collapse', animate);
            }
            return false;
        });

        header.click(function () {
            $(this).find('.accordion-collapse').triggerHandler('click');
            return false;
        });
    }

    /**
     * select and set the specified panel active
     */
    function select(container, which, state) {
        if (!state) state = $.data(container, 'accordion');
        var panel = getPanel(container, which, false, state);
        if (!panel) return;

        var curr = getCurrent(container, state);
        if (curr && curr[0] == panel[0]) {
            return;
        }

        panel.panel('header').triggerHandler('click');
    }

    function doFirstSelect(container, state) {
        if (!state) state = $.data(container, 'accordion');
        var panels = state.panels;
        for (var i = 0, len = panels.length; i < len; i++) {
            if (panels[i].panel('options').selected) {
                _select(i, container, state);
                return;
            }
        }
        if (panels.length) {
            _select(0, container, state);
        }

        function _select(index, container, state) {
            var opts = state.options;
            var animate = opts.animate;
            opts.animate = false;
            select(container, index, state);
            opts.animate = animate;
        }
    }

    /**
     * stop the animation of all panels
     */
    function stopAnimate(container, state) {
        if (!state) state = $.data(container, 'accordion');
        var panels = state.panels;
        for (var i = 0, len = panels.length; i < len; i++) {
            panels[i].stop(true, true);
        }
    }

    function add(container, options) {
        var state = $.data(container, 'accordion');
        var opts = state.options;
        var panels = state.panels;
        if (options.selected == undefined) options.selected = true;

        stopAnimate(container, state);

        var pp = $('<div></div>').appendTo(container);
        panels.push(pp);
        createPanel(container, pp, options);
        setSize(container, state);

        opts.onAdd.call(container, options.title, panels.length - 1);

        if (options.selected) {
            select(container, panels.length - 1, state);
        }
    }

    function remove(container, which) {
        var state = $.data(container, 'accordion');
        var opts = state.options;
        var panels = state.panels;

        stopAnimate(container, state);

        var panel = getPanel(container, which, false, state);
        if (!panel) return;
        var title = panel.panel('options').title;
        var index = getPanelIndex(container, panel, state);

        if (opts.onBeforeRemove.call(container, title, index) == false) return;
        panels.splice(index, 1);

        panel.panel('destroy');
        if (panels.length) {
            setSize(container, state);
            var curr = getCurrent(container, state);
            if (!curr) {
                select(container, 0, state);
            }
        }

        opts.onRemove.call(container, title, index);
    }

    function clear(container) {
        var state = $.data(container, 'accordion');
        var opts = state.options;
        var panels = state.panels, panel;

        stopAnimate(container, state);
        if (opts.onBeforeRemove.call(container) == false) return;

        for (var i = panels.length - 1; i >= 0; i--) {
            panel = panels[i];
            panels.splice(i, 1);
            if (panel) panel.panel('destroy');
        }

        setSize(container, state);
        opts.onRemove.call(container);
    }


    $.fn.accordion = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.accordion.methods[options](this, param);
        }

        options = options || {};

        return this.each(function (options) {
            var state = $.data(this, 'accordion');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.opts = opts;
            } else {
                opts = $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), options);
                var r = wrapAccordion(this);
                state = $.data(this, 'accordion', {
                    options:opts,
                    accordion:r.accordion,
                    panels:r.panels
                });
            }

            setProperties(this, state);
            setSize(this, state);
            doFirstSelect(this, state);
        }, [options]);
    };

    $.fn.accordion.methods = {
        options:function (jq) {
            return $.data(jq[0], 'accordion').options;
        },
        panels:function (jq) {
            return $.data(jq[0], 'accordion').panels;
        },
        resize:function (jq) {
            return jq.each(function () {
                setSize(this);
            });
        },
        getSelected:function (jq) {
            return getCurrent(jq[0]);
        },
        getPanel:function (jq, which) {
            return getPanel(jq[0], which);
        },
        getPanelIndex:function (jq, panel) {
            return getPanelIndex(jq[0], panel);
        },
        select:function (jq, which) {
            return jq.each(function () {
                select(this, which);
            });
        },
        add:function (jq, options) {
            return jq.each(function () {
                add(this, options);
            });
        },
        remove:function (jq, which) {
            return jq.each(function () {
                remove(this, which);
            });
        },
        clear:function (jq) {
            return jq.each(function () {
                clear(this);
            });
        }
    };

    $.fn.accordion.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, [
            'width', 'height', {fit:'boolean', border:'boolean', animate:'boolean'}
        ]));
    };


    $.fn.accordion.defaults = {
        width:'auto',
        height:'auto',
        fit:false,
        border:true,
        animate:true,

        onSelect:function (title, index) {
        },
        onAdd:function (title, index) {
        },
        onBeforeRemove:function (title, index) {
        },
        onRemove:function (title, index) {
        }
    };
})(jQuery);