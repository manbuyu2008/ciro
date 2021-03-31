/**
 * pagination - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *     linkbutton
 *
 */
(function ($) {
    function buildToolbar(target, state) {
        if (!state) state = $.data(target, 'pagination');
        var opts = state.options;

        var bb = state.bb = {};	// the buttons;

        var conf = {
            first:{
                iconCls:'pagination-first',
                handler:function (e) {
                    var target = e.data.target;
                    var opts = $.data(target, 'pagination').options;
                    if (opts.pageNumber > 1) selectPage(target, 1);
                }
            },
            prev:{
                iconCls:'pagination-prev',
                handler:function (e) {
                    var target = e.data.target;
                    var opts = $.data(target, 'pagination').options;
                    if (opts.pageNumber > 1) selectPage(target, opts.pageNumber - 1);
                }
            },
            next:{
                iconCls:'pagination-next',
                handler:function (e) {
                    var target = e.data.target;
                    var opts = $.data(target, 'pagination').options;
                    var pageCount = Math.ceil(opts.total / opts.pageSize);
                    if (opts.pageNumber < pageCount) selectPage(target, opts.pageNumber + 1);
                }
            },
            last:{
                iconCls:'pagination-last',
                handler:function (e) {
                    var target = e.data.target;
                    var opts = $.data(target, 'pagination').options;
                    var pageCount = Math.ceil(opts.total / opts.pageSize);
                    if (opts.pageNumber < pageCount) selectPage(target, pageCount);
                }
            },
            refresh:{
                iconCls:'pagination-load',
                handler:function (e) {
                    var target = e.data.target;
                    var opts = $.data(target, 'pagination').options;
                    if (opts.onBeforeRefresh.call(target, opts.pageNumber, opts.pageSize) != false) {
                        selectPage(target, opts.pageNumber);
                        opts.onRefresh.call(target, opts.pageNumber, opts.pageSize);
                    }
                }
            }
        };

        var pager = $(target).addClass('pagination').html('<table cellspacing="0" cellpadding="0" border="0"><tr></tr></table>');
        var tr = pager.find('tr');

        function createButton(name) {
            var a = $('<a href="javascript:void(0)"></a>').appendTo(tr);
            a.wrap('<td></td>');
            a.linkbutton({
                iconCls:conf[name].iconCls,
                plain:true
            }).unbind('.pagination').bind('click.pagination', {target: target}, conf[name].handler);
            return a;
        }

        if (opts.showPageList) {
            var ps = $('<select class="pagination-page-list"></select>');
            ps.bind('change', function () {
                opts.pageSize = parseInt($(this).val());
                opts.onChangePageSize.call(target, opts.pageSize);
                opts.sizeChange=true;
                selectPage(target, opts.pageNumber);
                opts.sizeChange=false;
            });
            var i, len;
            for (i = 0, len = opts.pageList.length; i < len; i++) {
                $('<option></option>').text(opts.pageList[i]).appendTo(ps);
            }
            $('<td></td>').append(ps).appendTo(tr);

            $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
        }

        bb.first = createButton('first');
        bb.prev = createButton('prev');
        $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);

        $('<span style="padding-left:6px;"></span>').html(opts.beforePageText).appendTo(tr).wrap('<td></td>');
        bb.num = $('<input class="pagination-num" type="text" value="1" size="2">').appendTo(tr).wrap('<td></td>');
        if (opts.readonly) bb.num.attr('readonly', true);
        bb.num.unbind('.pagination').bind('keydown.pagination', {target: target}, function (e) {
            if (e.keyCode == 13) {
                var pageNumber = parseInt($(this).val()) || 1;
                selectPage(e.data.target, pageNumber);
                return false;
            }
        });
        bb.after = $('<span style="padding-right:6px;"></span>').appendTo(tr).wrap('<td></td>');
        $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
        bb.next = createButton('next');
        if (opts.showLast) bb.last = createButton('last');
        else bb.last = $();

        if (opts.showRefresh) {
            $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
            bb.refresh = createButton('refresh');
        }

        if (opts.buttons) {
            $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
            for (i = 0, len = opts.buttons.length; i < len; i++) {
                var btn = opts.buttons[i];
                if (btn == '-') {
                    $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
                } else {
                    var td = $('<td></td>').appendTo(tr);
                    $('<a href="javascript:void(0)"></a>').appendTo(td).linkbutton($.extend(btn, {
                        plain:true
                    })).bind('click', eval(btn.handler || function () {
                    }));
                }
            }
        }

        $('<div class="pagination-info"></div>').appendTo(pager);
        $('<div style="clear:both;"></div>').appendTo(pager);
    }

    function selectPage(target, page) {
        var state = $.data(target, 'pagination');
        var opts = state.options;
        /*huangxl：增加切换页事件*/
        if (opts.onBeforeSelectPage && !opts.onBeforeSelectPage(page)) return;
        refreshData(target, {pageNumber:page}, state);
        opts.onSelectPage.call(target, opts.pageNumber, opts.pageSize);
    }

    function refreshData(target, param, state) {
        if (!state) state = $.data(target, 'pagination');
        var opts = state.options;
        var bb = state.bb;

        $.extend(opts, param || {});

        var ps = $(target).find('select.pagination-page-list');
        if (ps.length) {
            ps.val(opts.pageSize + '');
            opts.pageSize = parseInt(ps.val());
        }

        var pageCount = Math.ceil(opts.total / opts.pageSize) || 1;
        if (opts.pageNumber < 1) {
            opts.pageNumber = 1;
        }
        if (opts.pageNumber > pageCount) {
            opts.pageNumber = pageCount
        }
        bb.num.val(opts.pageNumber);
        bb.after.html(opts.afterPageText.replace(/{pages}/, pageCount));


        var pinfo = opts.displayMsg;
        pinfo = pinfo.replace(/{from}/, opts.total == 0 ? 0 : opts.pageSize * (opts.pageNumber - 1) + 1);
        pinfo = pinfo.replace(/{to}/, Math.min(opts.pageSize * (opts.pageNumber), opts.total));
        pinfo = pinfo.replace(/{total}/, opts.total);

        $(target).find('div.pagination-info').html(pinfo);

        bb.first.add(bb.prev).linkbutton({disabled:(opts.pageNumber == 1)});
        bb.next.add(bb.last).linkbutton({disabled:(opts.pageNumber == pageCount)});

        setLoadStatus(target, opts.loading);
    }

    function setLoadStatus(target, loading) {
        var state = $.data(target, 'pagination');
        var opts = state.options;
        var bb = state.bb;
        opts.loading = loading;
        if (opts.showRefresh) {
            if (opts.loading) {
                bb.refresh.linkbutton({iconCls:'pagination-loading'});
            } else {
                bb.refresh.linkbutton({iconCls:'pagination-load'});
            }
        }
    }

    $.fn.pagination = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.pagination.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var opts;
            var state = $.data(this, 'pagination');
            if (state) {
                $.extend(state.options, options);
            } else {
                opts = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), options);
                state = $.data(this, 'pagination', {
                    options:opts
                });
            }

            buildToolbar(this, state);
            refreshData(this, undefined, state);
        }, [options]);
    };

    $.fn.pagination.methods = {
        options:function (jq) {
            return $.data(jq[0], 'pagination').options;
        },
        loading:function (jq) {
            return jq.each(function () {
                setLoadStatus(this, true);
            });
        },
        loaded:function (jq) {
            return jq.each(function () {
                setLoadStatus(this, false);
            });
        },
        //获取总页数
        getPageCount: function(jq) {
            var opts = $.data(jq[0], 'pagination').options;
            return Math.ceil(opts.total / opts.pageSize) || 1;
        },
        getTotalCount: function(jq) {
            var opts = $.data(jq[0], 'pagination').options;
            return opts.total;
        },
        refresh:function (jq, options) {
            return jq.each(function () {
                refreshData(this, options);
            });
        },
        select:function (jq, page) {
            return jq.each(function () {
                selectPage(this, page);
            });
        }
    };

    $.fn.pagination.parseOptions = function (target) {
        var t = $(target);
        return $.extend({},
            $.parser.parseOptions(target, [
                {total:'number', pageSize:'number', pageNumber:'number'},
                {loading:'boolean', showPageList:'boolean', showRefresh:'boolean'}
            ]), {
                pageList:(t.attr('pageList') ? eval(t.attr('pageList')) : undefined)
            });
    };

    $.fn.pagination.defaults = {
        total:1,
        pageSize:10,
        pageNumber:1,
        pageList:[10, 20, 30, 50],
        loading:false,
        buttons:null,
        showPageList:true,
        showRefresh:true,
        showLast: true,
        readonly: false,

        onSelectPage:function (pageNumber, pageSize) {
        },
        onBeforeRefresh:function (pageNumber, pageSize) {
        },
        onRefresh:function (pageNumber, pageSize) {
        },
        onChangePageSize:function (pageSize) {
        },

        beforePageText:'',
        afterPageText:'/{pages}',
        displayMsg:'Displaying {from} to {to} of {total} items'
    };
})(jQuery);