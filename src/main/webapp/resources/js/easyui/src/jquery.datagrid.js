/**
 * datagrid - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *  panel
 *     resizable
 *     linkbutton
 *     pagination
 *
 */
(function ($) {
    var DATAGRID_SERNO = 0;

    function setSize(target, param, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var panel = state.panel;

        if (param) {
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
        }

        if (opts.fit == true) {
            var p = panel.panel('panel').parent();
            opts.width = p.width();
            opts.height = p.height();
        }

        panel.panel('resize', {
            width: opts.width,
            height: opts.height
        });
        //edit by lizhentao 20141009 修改查询框
        var $searchbox = $('div.datagrid-toolbar>input.datagrid-search', panel);
        if ($searchbox.length > 0){
            //$searchbox.searchbox("resize", opts.width - 4 - $('div.datagrid-toolbar>span.searchbox', panel).position().left);
            $searchbox._outerWidth(opts.width);
        }
    }

    function setBodySize(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var wrap = state.panel;
        var innerWidth = wrap.width();
        var innerHeight = wrap.height();

        var view = dc.view;
        var view1 = dc.view1;
        var view2 = dc.view2;
        var header1, table1, header2, table2;

        // set view width
        view.width(innerWidth);
        header1 = view1.children('div.datagrid-header');
        table1 = header1.find('table');

        var headerInner = header1.children('div.datagrid-header-inner').show();
        view1.width(headerInner.find('table').width());
        if (!opts.showHeader) headerInner.hide();
        innerWidth -= view1._outerWidth();
        view1.children('div.datagrid-header,div.datagrid-body,div.datagrid-footer,div.datagrid-editor').width(view1.width());
        header1.css('height', '');
        table1.css('height', '');

        header2 = view2.children('div.datagrid-header');
        table2 = header2.find('table');
        view2.width(innerWidth);
        view2.children('div.datagrid-header,div.datagrid-body,div.datagrid-footer,div.datagrid-editor').width(view2.width());
        header2.css('height', '');
        table2.css('height', '');
        var hh = Math.max(table1.height(), table2.height());

        // set header height
        table1.height(hh);
        header1._outerHeight(hh);

        table2.height(hh);
        header2._outerHeight(hh);

        if (!state.data || !state.data.rows || state.data.rows.length == 0) {
            headerInner = header2.children('div.datagrid-header-inner').show();
            dc.body2.children('div.datagrid-emptybody').width(headerInner.find('table').width()).height(1);
            if (!opts.showHeader) headerInner.hide();
        }

        // set body height
        if (opts.height != 'auto') {
            function decHeight(h, h1) {
                if (h1) return h -= h1;
                return h;
            }

            var height = innerHeight;
            height = decHeight(height, view2.children('div.datagrid-header')._outerHeight());
            height = decHeight(height, view2.children('div.datagrid-footer')._outerHeight());
            height = decHeight(height, wrap.children('div.datagrid-toolbar')._outerHeight());
            wrap.children('div.datagrid-pager').each(function () {
                height -= $(this)._outerHeight();
            });

            view1.children('div.datagrid-body').height(height);
            view2.children('div.datagrid-body').height(height);
        }

        view.height(view2.height());
        var w = view1._outerWidth();
        view2.css('left', w ? w : 0);
    }

    function fixRowHeight(target, index, forceFix, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;

        if (!dc.body1.is(':empty') && (!opts.nowrap || opts.autoRowHeight || forceFix)) {
            var tr1, tr2;
            if (index != undefined) {
                tr1 = opts.finder.getTr(target, index, 'body', 1, state);
                tr2 = opts.finder.getTr(target, index, 'body', 2, state);
                _setTrHeight(tr1, tr2);
            } else {
                tr1 = opts.finder.getTr(target, 0, 'allbody', 1, state);
                tr2 = opts.finder.getTr(target, 0, 'allbody', 2, state);
                _setTrHeight(tr1, tr2);
                if (opts.showFooter) {
                    tr1 = opts.finder.getTr(target, 0, 'allfooter', 1, state);
                    tr2 = opts.finder.getTr(target, 0, 'allfooter', 2, state);
                    _setTrHeight(tr1, tr2);
                }
            }
        }

        setBodySize(target, state);
        if (opts.height == 'auto') {
            var body1 = dc.body1.parent();
            var body2 = dc.body2;
            var height = 0;
            var width = 0;
            body2.children().each(function () {
                var c = $(this);
                if (c.is(':visible')) {
                    height += c._outerHeight();
                    width = Math.max(width, c._outerWidth());
                }
            });
            if (width > body2.width()) {
                height += 18;	// add the horizontal scroll height
            }
            body1.height(height);
            body2.height(height);
            dc.view.height(dc.view2.height());
        }
        dc.body2.triggerHandler('scroll');
    }

    // set body row or footer row height
    function _setTrHeight(trs1, trs2) {
        for (var i = 0, len = trs2.length; i < len; i++) {
            var tr1 = $(trs1[i]);
            var tr2 = $(trs2[i]);
//                tr1.css('height', '');
//                tr2.css('height', '');
          var height = Math.max(tr1.height(), tr2.height());
            tr1.css('height', height);
            tr2.css('height', height);
        }
    }

    /**
     * wrap and return the grid object, fields and columns
     */
    function wrapGrid(target, options) {
        var $target = $(target);

        var panel = $(
            '<div class="datagrid-wrap">' +
                '<div class="datagrid-view eap-container" id=' + $.parser.getObjGUID() + '>' +
                '</div>' +
                '</div>'
        ).insertAfter(target);

        var hideColBtn = null, hideColFields = null;
        if (options.canHideColumn) {
            hideColBtn = $('<div class="hide-column-button" style="z-index: 10">&nbsp;</div>').appendTo('body');
            var columnHtml = [];
            columnHtml.push('<div class="hide-column-fields" style="width:' + options.hideColComboWidth + 'px;z-index:11">');
            anazyCols(options.columns, columnHtml);
            columnHtml.push('</div>');
            hideColFields = $(columnHtml.join("")).appendTo('body');
            if (hideColFields.height() > 200) hideColFields.height(200);
        }

        //解析datagrid的columns
        function anazyCols(cols, columnHtml) {
            //得到导出的文本
            function getExpText(str) {
                if ($$str.isEmpty(str)) return "";
                str = str + "";
                str = str.replace(/<br>/g, "\n");
                str = str.replace(/&nbsp;/g, " ");
                if (str.indexOf('<') < 0 || str.indexOf('>') < 0) return str;
                try {
                    var s = $(str).text();
                    if ($$str.isEmpty(s)) return str;
                    return s;
                } catch (e) {
                    return str;
                }
            }

            //解析跨单元格的列
            function anazySub(pcol, index, preTitle) {
                if (!preTitle) preTitle = getExpText(pcol.title);
                var subcols = cols[index];
                var i = 0, len = pcol.colspan;
                while (i < len) {
                    var col = subcols[0];
                    subcols.splice(0, 1);
                    //有checkbox的列或操作列或没有列标题，忽略
                    if (col.checkbox || col.opt || !col.title) {
                        i++;
                        continue;
                    }
                    if (col.field) addToCols(col, preTitle);
                    else anazySub(col, index + 1, preTitle + "-" + getExpText(col.title));
                    i += (col.colspan && col.colspan > 0) ? col.colspan : 1;
                }
            }

            function addToCols(col, prefix) {
                var checked = !col.hidden ? "checked='checked'" : "";
                var title = getExpText(col.title);
                if (prefix) title = prefix + "-" + title;
                 //当前列是否能够出现在checkbox列表里面
                if(col.canSelect==undefined||col.canSelect){
                    columnHtml.push("<input type='checkbox' value='" + col.field + "'" + checked + " />&nbsp;&nbsp;" + title);
                    columnHtml.push("<br>");
                }
            }

            if (!cols || cols.length == 0) return;
            var temp = cols, col;
            //将列完全复制一份出来，稍后有删除操作，不要影响grid原生的列定义
            cols = [];
            var i, len;
            for (i = 0, len = temp.length; i < len; i++) cols.push(temp[i].concat());

            for (i = 0, len = cols[0].length; i < len; i++) {
                col = cols[0][i];
                //有checkbox的列或操作列或没有列标题，忽略
                if (col.checkbox || col.opt || !col.title) continue;
                if (col.field) addToCols(col);
                else anazySub(col, 1);
            }
        }

        panel.panel({
            doSize: false
        });
        panel.panel('panel').addClass('datagrid').bind('_resize', {target: target}, function (e, force) {
            var target = e.data.target;
            var st = $.data(target, 'datagrid');
            var opts = st.options;
            $('div.hide-column-fields').hide();
            $('div.hide-column-button').hide();
            if (opts.fit == true || force) {
                setSize(target, undefined, st);
                fixColumnSize(target, undefined, st);
            }
            return false;
        });
        $target.hide().appendTo(panel.children('div.datagrid-view'));

        var view = panel.children('div.datagrid-view');
        var view1, view2;

        if (options.rownumbers || (options.frozenColumns && options.frozenColumns.length > 0)) {
            view1 = $('<div class="datagrid-view1">' +
                '<div class="datagrid-body">' +
                '<div class="datagrid-body-inner"></div>' +
                '</div>' +
                '</div>').appendTo(view);
        } else view1 = $();

        view2 = $('<div class="datagrid-view2">' +
            '<div class="datagrid-body"></div>' +
            '</div>').appendTo(view);

        var body1 = view1.children('div.datagrid-body').children('div.datagrid-body-inner'),
            body2 = view2.children('div.datagrid-body');
        return {
            panel: panel,
            dc: {    // some data container
                view: view,
                view1: view1,
                view2: view2,

                header1: createHeader(view1), // view1.children('div.datagrid-header').children('div.datagrid-header-inner'),
                header2: createHeader(view2), //view2.children('div.datagrid-header').children('div.datagrid-header-inner'),

                body1: body1,
                body2: body2,

                footer1: createFooter(view1, options), // view1.children('div.datagrid-footer').children('div.datagrid-footer-inner'),
                footer2: createFooter(view2, options), // view2.children('div.datagrid-footer').children('div.datagrid-footer-inner'),

                editor1: createEditor(body1, options),
                editor2: createEditor(body2, options),
                editorTool: createEditorTool(view, options),
                hideColBtn: hideColBtn,
                hideColFields: hideColFields
            }
        };

        function createHeader(container) {
            if (container.length > 0) {// && opts.showHeader
                var rt = $('<div class="datagrid-header">' +
                    '<div class="datagrid-header-inner"></div>' +
                    '</div>').prependTo(container);
                return rt.children('.datagrid-header-inner');
            }
            return $();
        }

        function createFooter(container, opts) {
            if (container.length > 0 && opts.showFooter) {
                var rt = $('<div class="datagrid-footer">' +
                    '<div class="datagrid-footer-inner"></div>' +
                    '</div>').appendTo(container);
                return rt.children('.datagrid-footer-inner');
            }
            return $();
        }

        function createEditor(container, opts) {
            if (container.length > 0 && !opts.readonly) {
                /*.bind('mousedown.datagrid', {target: target}, function (e) {
                 return false;
                 });*/
                return $('<div class="datagrid-editor">' +
//                    '<div class="datagrid-editor-inner"></div>' +
                    '</div>').hide().appendTo(container);//.children('.datagrid-editor-inner');
            }
            return $();
        }

        function createEditorTool(container, opts) {
            if (!opts.readonly && opts.showEditorTool) {
                var $toolbar = $('<div class="datagrid-editor-toolbar" style="display: none;"></div>').appendTo(container);
                if (opts.rownumbers) $toolbar.css('left', '25px');
//                $('<div class="datagrid-editor-toolempty" style="float:left">&nbsp;</div>').appendTo($toolbar);
                $('<a href="javascript:void(0)"></a>').css('float', 'left').bind('click', {target: target},function (e) {
                    var target = e.data.target;
                    editorBtnEndClick(target, false);
                }).appendTo($toolbar).linkbutton({
                        text: '确定',
                        iconCls: 'icon-ok',
                        plain: true
                    });
//                $('<a href="javascript:void(0)"></a>').css('float', 'left').bind('click', {target: target},function (e) {
//                    var target = e.data.target;
//                    editorBtnEndClick(target, true);
//                }).appendTo($toolbar).linkbutton({
//                        text: '取消',
//                        iconCls: 'icon-cancel',
//                        plain: true
//                    });

                return $toolbar;
            }
            return $();
        }
    }

    function buildGrid(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var panel = state.panel, $target = $(target), targetId;
        if (!$target.attr('id')) {
            targetId = $.parser.getObjGUID();
            $target.attr('id', targetId);
        } else targetId = $target.attr('id');
        panel.panel($.extend({}, opts, {
            id: null,
            doSize: false,
            onResize: function (width, height) {
                setTimeout(function () {
                    var target = $('#' + targetId)[0];
                    var st = $.data(target, 'datagrid');
                    if (st) {
                        setBodySize(target, st);
                        fitColumns(target, st);
                        st.options.onResize.call(st.panel, width, height);
                    }
                }, 0);
            },
            onExpand: function () {
                //setBodySize(target);
                var target = $('#' + targetId)[0];
                fixRowHeight(target);
                opts.onExpand.call(this);
            }
        }));

        state.rowIdPrefix = 'datagrid-row-r' + (++DATAGRID_SERNO);
        createColumnHeader(dc.header1, opts.frozenColumns, true, 0);
        var beginIndex = opts.frozenColumns ? opts.frozenColumns.length + 1 : 0;
        createColumnHeader(dc.header2, opts.columns, false, beginIndex);
        createColumnStyle(target, state);

        dc.header1.add(dc.header2).css('display', opts.showHeader ? 'block' : 'none');
        dc.footer1.add(dc.footer2).css('display', opts.showFooter ? 'block' : 'none');

        state.search = undefined;
        if (opts.canSearch) initSearchOptions(state);
        var $toolbar;
        if (opts.toolbar) {
            if (typeof opts.toolbar == 'string') {
                $toolbar = $(opts.toolbar);
                $toolbar.addClass('datagrid-toolbar').prependTo(panel);
                $toolbar.show();
            } else {
                $('div.datagrid-toolbar', panel).remove();
                $toolbar = $('<div class="datagrid-toolbar"></div>').prependTo(panel);
                for (var i = 0, len = opts.toolbar.length; i < len; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == '-') {
                        $('<div class="datagrid-btn-separator"></div>').appendTo($toolbar);
                    } else {
                        var tool = $('<a href="javascript:void(0)"></a>');
                        tool[0].onclick = eval(btn.handler || function () {
                        });
                        tool.css('float', 'left').appendTo($toolbar).linkbutton($.extend({}, btn, {
                            plain: true
                        }));
                    }
                }
            }
            if (opts.showSearch) buildSearch(target, $toolbar, state);
        } else if (opts.showSearch) {//能搜索
            $('div.datagrid-toolbar', panel).remove();
            $toolbar = $('<div class="datagrid-toolbar"></div>').prependTo(panel);
            buildSearch(target, $toolbar, state);
        } else {
            $('div.datagrid-toolbar', panel).remove();
        }

        $('div.datagrid-pager', panel).remove();
        if (opts.pagination) {
            var pager = $('<div class="datagrid-pager" parentId="' + targetId + '"></div>');
            if (opts.pagePosition == 'bottom') {
                pager.appendTo(panel);
            } else if (opts.pagePosition == 'top') {
                pager.addClass('datagrid-pager-top').prependTo(panel);
            } else {
                var ptop = $('<div class="datagrid-pager datagrid-pager-top"></div>').prependTo(panel);
                pager.appendTo(panel);
                pager = pager.add(ptop);
            }
            pager.pagination({
                showPageList:opts.showPageList,
                pageNumber: opts.pageNumber,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                showRefresh: opts.pageShowRefresh,
                showLast: opts.pageShowLast,
                readonly: opts.pageReadonly,
                onSelectPage: function (pageNum, pageSize) {
                    var target = $('#' + $(this).attr('parentId'))[0];
                    var state = $.data(target, 'datagrid');
                    var opts = state.options;
                    /*huangxl：增加切换页事件*/
                    if (opts.onBeforeSelectPage && !opts.onBeforeSelectPage(pageNum,pageSize)) return;

                    //正在编辑中，不允许翻页
                    if (isEditing(target, state)) return;
                    // save the page state
                    opts.pageNumber = pageNum;
                    opts.pageSize = pageSize;
                    opts.sizeChange =  $.data(this, 'pagination').options.sizeChange;
                    $(this).pagination('refresh', {
                        pageNumber: pageNum,
                        pageSize: pageSize
                    });
                    request(target, undefined, state);	// request new page data
                }
            });
            opts.pageSize = pager.pagination('options').pageSize;	// repare the pageSize value
        }

        function initSearchOptions(state) {
            var opts = state.options;
            var fields;
             var firstNameSearch_fields=[];
            opts.searchFieldNames = undefined;
            if (!opts.searchFields) fields = undefined;
            else if (opts.searchFields == 'auto') {
                fields = [
                    {field: '-', title: '任意字段'}
                ];
                getFields(fields, opts.frozenColumns);
                getFields(fields, opts.columns,firstNameSearch_fields);
                opts.searchFields = fields;
            } else fields = opts.searchFields;

            if (fields) {
                var ss = [];
                for (var i = 0, len = fields.length; i < len; i++) {
                    if (fields[i].field != '-') ss.push(fields[i].field);
                }
                opts.searchFieldNames = ss.join(",");//所有字段
            }
            if(firstNameSearch_fields.length>0){
                 var  fnSearch = [];
                for (var i = 0, len = firstNameSearch_fields.length; i < len; i++) {
                    if (firstNameSearch_fields[i].field != '-') {
                        fnSearch.push(firstNameSearch_fields[i].field);
                    }
                }
                opts.firstNameSearchFieldNames = fnSearch.join(",");
            }
            function getFields(fields, columns,firstNameSearch_fields) {
                if (columns) {
                    for (var i = 0, len = columns.length; i < len; i++) {
                        var cc = columns[i];
                        for (var j = 0, lj = cc.length; j < lj; j++) {
                            var c = cc[j];
                            if (c.field && !c.checkbox&&c.canSearch==undefined)
                            {
                                 if(c.firstNameSearch==undefined)
                                 {
                                      fields.push({field: c.field, title: c.title});
                                 } else{
                                       firstNameSearch_fields.push({field: c.field, title: c.title});
                                 }
                            }
                        }
                    }
                }
                return null;
            }
        }

        function buildSearch(target, $toolbar, state) {
            /*canSearch: false,//是否允许搜索
             searchFields: undefined,//搜索字段，取值：none：不需要区分字段 || auto：显示列 || [{field:'',title:''}]
             onSearch: undefined,*/
            var opts = state.options;
            var fields = opts.searchFields;

            //edit by lizhentao 20141009 修改查询框
            /*var $search = $('<span class="datagrid-search"></span>').appendTo($toolbar);
             state.search = $search;
             var gridId = $(target).attr('id');
             $search.searchbox({
             prompt: '在这里输入您要搜索的内容',
             menu: fields,
             searcher: function (value, name,firstName) {
             var target = $("#" + gridId)[0];
             doSearch(target, value, name,firstName);
             }
             });*/
            var input = $('<input type="text" class="datagrid-search searchbox-prompt" value="在这里输入您要搜索的内容">').appendTo($toolbar)
                .unbind('.datagrid').bind('input.datagrid propertychange.datagrid', function(e){
                    var value = this.value;
                    if($(this).is('.searchbox-prompt')){
                        value = '';
                    }
                    doSearch(target, value, '-', null);
                }).bind('blur.datagrid', function(){
                    if(this.value == ''){
                        this.value = '在这里输入您要搜索的内容';
                        $(this).addClass('searchbox-prompt');
                    }
                }).bind('focus.datagrid', function(){
                    if($(this).is('.searchbox-prompt')){
                        this.value = '';
                        $(this).removeClass('searchbox-prompt');
                    }
                });
        }

        function createColumnHeader(container, columns, frozen, beginIndex) {
            if (!container) return;
            if ((!columns || columns.length == 0) && (!frozen || !opts.rownumbers)) return;
            if (!columns) columns = [];
            var $container = $(container);
            $container.show();
            $container.empty();
            var t = $('<table class="datagrid-htable" border="0" cellspacing="0" cellpadding="0"><tbody></tbody></table>').appendTo(container);
            var td;
            for (var i = 0, ilen = columns.length; i < ilen; i++) {
                var tr = $('<tr class="datagrid-header-row"></tr>').appendTo($('tbody', t));
                var cols = columns[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    var col = cols[j];
                    col.index = ++beginIndex;
                    var attr = '';
                    if (col.rowspan) attr += 'rowspan="' + col.rowspan + '" ';
                    if (col.colspan) attr += 'colspan="' + col.colspan + '" ';
                    td = $('<td ' + attr + '></td>').appendTo(tr);

                    if (col.checkbox) {
                        td.attr('field', col.field);
                        $('<div class="datagrid-header-check"><input type="checkbox"/></div>').appendTo(td);
                    } else if (col.field) {
                        td.attr('field', col.field);
                        var cell = $('<div class="datagrid-cell"><span>' + col.title + '</span><span class="datagrid-sort-icon">&nbsp;</span></div>').appendTo(td);
                        if (col.resizable == false) cell.attr('resizable', 'false');
                        if (col.width) {
                            cell._outerWidth(col.width);
                            col.boxWidth = parseInt(cell[0].style.width);
                        } else {
                            col.auto = true;

                        }


                        cell.css('text-align', 'center');
                        /*huangxl：标题默认居中 (col.align || 'left')*/

                        // define the cell class and selector
                        col.cellClass = 'datagrid-cell-c' + DATAGRID_SERNO + '-' + col.field.replace('.', '-');
                        col.cellSelector = 'div.' + col.cellClass;
                    } else {
                        $('<div class="datagrid-cell-group">' + col.title + '</div>').appendTo(td);
                    }

                    if (col.hidden) {
                        td.hide();
                    }
                }
            }
            if (frozen && opts.rownumbers) {
                td = $('<td rowspan="' + columns.length + '"><div class="datagrid-header-rownumber"></div></td>');
                if ($('tr', t).length == 0) {
                    td.wrap('<tr class="datagrid-header-row"></tr>').parent().appendTo($('tbody', t));
                } else {
                    td.prependTo($('tr:first', t));
                }
            }
        }

        function createColumnStyle(target, state) {
            var dc = state.dc;
            dc.view.children('style').remove();
            var ss = ['<style type="text/css">'];
            var fields = getColumnFields(target, true, state).concat(getColumnFields(target), state);
            for (var i = 0, len = fields.length; i < len; i++) {
                var col = getColumnOption(target, fields[i], state);
                if (col && !col.checkbox) {
                    ss.push(col.cellSelector + ' {width:' + col.boxWidth + 'px;}');
                }
            }
            ss.push('</style>');
            $(ss.join('\n')).prependTo(dc.view);
        }
    }

    /**
     * 搜索
     * @param target grid控件
     * @param value 搜索内容
     * @param name 搜索字段，为空或-时，表示任意字段
     * @param firstName 搜索字段，不参与首字符匹配
     */
    function doSearch(target, value, name,firstName) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        if (!opts.onSearch) return;
        if (!name || name == '' || name == '-') name = opts.searchFieldNames;
        if (!firstName || firstName == '' || firstName == '-') firstName = opts.firstNameSearchFieldNames;
        if (state.search) state.search.searchbox('setValue', value);
        opts.onSearch.call(target, value, name,firstName);
    }


    /**
     * bind the datagrid events
     */
    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;

        var header;
        header = dc.header2.add(dc.header1);
        header.find('td:has(div.datagrid-cell)').unbind('.datagrid').bind('mouseenter.datagrid', {target: target},function (e) {
            var target = e.data.target;
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var $this = $(this);
            if (opts.canHideColumn) {
                var hideColBtn = state.dc.hideColBtn;
                var left = $this.offset().left;
                var top = $this.offset().top;
                left += $this._outerWidth() - hideColBtn._outerWidth() - 5;
                top += Math.floor(($this._outerHeight() - hideColBtn._outerHeight()) / 2);
                hideColBtn.css({
                    left: left,
                    top: top,
                    zIndex: $.fn.window.defaults.zIndex++,
                    display: 'block'
                });
            }
            $this.addClass('datagrid-header-over');
        }).bind('mouseleave.datagrid', {target: target},function (e) {
                $(this).removeClass('datagrid-header-over');
//                var target = e.data.target;
//                var state = $.data(target, 'datagrid');
//                var opts = state.options;
//                if (opts.canHideColumn) state.dc.hideColBtn.hide();
            }).bind('contextmenu.datagrid', {target: target}, function (e) {
                var target = e.data.target;
                var state = $.data(target, 'datagrid');
                var opts = state.options;
                var field = $(this).attr('field');
                opts.onHeaderContextMenu.call(target, e, field);
            });
        header.find('input[type=checkbox]').unbind('.datagrid').bind('click.datagrid', {target: target}, function (e) {
            var target = e.data.target;
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            if (opts.singleSelect && opts.selectOnCheck) return false;
            if ($(this).is(':checked')) {
                checkAll(target, undefined, state);
            } else {
                uncheckAll(target, undefined, state);
            }
            e.stopPropagation();
        });

        var cells = header.find('div.datagrid-cell');
        cells.unbind('.datagrid').bind('click.datagrid', {target: target},function (e) {
            var $this = $(this), target = e.data.target;
            if (e.pageX < $this.offset().left + $this._outerWidth() - 5) {
                var st = $.data(target, 'datagrid');
                var opts = st.options;
                //正在编辑中，不允许翻页
                if (isEditing(target, st)) return;

                var f = $(this).parent().attr('field');
                var col = getColumnOption(target, f, st);
                if (!col.sortable || st.resizing) return;
                opts.sortName = opts.sortName || [];
                opts.sortOrder = opts.sortOrder || [];
                var index = indexOfArray(opts.sortName, f);
                var len = 0;
                if (index == -1) {
                    len = opts.sortName.length;
                } else {
                    len = index;
                }
                opts.sortName[len] = f;
                opts.sortOrder[len] = 'asc';


                var c = 'datagrid-sort-asc';
                if ($(this).hasClass(c)) {
                    c = 'datagrid-sort-desc';
                    opts.sortOrder[len] = 'desc';
                }

                //没按ctrlkey单列排序
                if (!e.ctrlKey) {
                    cells.removeClass('datagrid-sort-asc datagrid-sort-desc');
                    if (len == 0) {
                        cells.each(function () {
                            $(this).find("span.eap_span").remove();
                            $(this).removeClass('datagrid-sort-asc datagrid-sort-desc');
                        })
                    }
                    $(this).addClass(c);
                    if (opts.doSortColumn) {
                        opts.doSortColumn.call(target, opts.sortName, opts.sortOrder);
                    } else {
                        if (opts.remoteSort) {
                            request(target, undefined, st);
                        } else {
                            loadData(target, st.data, st);
                        }
                        if (opts.onSortColumn) opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
                    }
                } else {
                    if (len == 0) {
                        cells.each(function () {
                            $(this).find("span.eap_span").remove();
                            $(this).removeClass('datagrid-sort-asc datagrid-sort-desc');
                        })
                    }
                    if (!$(this).has("span.eap_span").length) {
                        $("<span class='eap_span'>" + opts.sortNumber[len] + "</span>").appendTo($(this));
                    }
                    $(this).removeClass('datagrid-sort-asc datagrid-sort-desc');
                    $(this).addClass(c);
                }
            }
        }).bind('dblclick.datagrid', {target: target}, function (e) {
                var $this = $(this), target = e.data.target;
                if (e.pageX > $this.offset().left + $(this)._outerWidth() - 5) {
                    var field = $this.parent().attr('field');
                    var col = getColumnOption(target, field);
                    if (col.resizable == false) return;
                    autoSizeColumn(target, field);
                    col.auto = false;
                }
            });


        //wqh 加多列排序
        $(document).unbind(".datagrid").bind("keyup.datagrid", {target: target},function (e) {
            if (e.keyCode == 17) {
                target = e.data.target;
                var st = $.data(target, 'datagrid');
                var opts = st.options;
                if (opts.sortName && opts.sortName.length) {
                    if (opts.doSortColumn) {
                        opts.doSortColumn.call(target, opts.sortName, opts.sortOrder);
                    } else {
                        if (opts.remoteSort) {
                            request(target, undefined, st);
                        } else {
                            loadData(target, st.data, st);
                        }
                        if (opts.onSortColumn) opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
                    }
                }

            }

        }).bind("click.datarid", function (e) {
                if (opts.canHideColumn)  $("div.hide-column-fields").hide();
            });


        var gridId = $(target).attr('id');
        cells.each(function () {
            var $this = $(this);
            $this.resizable({
                handles: 'e',
                disabled: $this.attr('resizable') == 'false',
                minWidth: 25,
                onStartResize: function (e) {
                    var target = $('#' + gridId)[0];
                    var state = $.data(target, 'datagrid');
                    var panel = state.panel;
                    var dc = state.dc;
                    var header = dc.header2.add(dc.header1);
                    state.resizing = true;
                    header.css('cursor', 'e-resize');
                    if (!state.proxy) {
                        state.proxy = $('<div class="datagrid-resize-proxy"></div>').appendTo(dc.view);
                    }
                    state.proxy.css({
                        left: e.pageX - $(panel).offset().left - 1,
                        display: 'none'
                    });
                    if (state.proxy) setTimeout(state.proxy.show, 500);
                },
                onResize: function (e) {
                    var target = $('#' + gridId)[0];
                    var state = $.data(target, 'datagrid');
                    var panel = state.panel;
                    state.proxy.css({
                        left: e.pageX - $(panel).offset().left - 1,
                        display: 'block'
                    });
                    return false;
                },
                onStopResize: function () {
                    var target = $('#' + gridId)[0];
                    var state = $.data(target, 'datagrid');
                    var opts = state.options;
                    var dc = state.dc;
                    var header = dc.header2.add(dc.header1);

                    header.css('cursor', '');
                    var field = $(this).parent().attr('field');
                    var col = getColumnOption(target, field, state);

                    col.width = $(this)._outerWidth();
                    col.boxWidth = parseInt(this.style.width);
                    col.auto = undefined;
                    fixColumnSize(target, field, state);
                    dc.view2.children('div.datagrid-header').scrollLeft(dc.body2.scrollLeft());
                    state.proxy.remove();
                    state.proxy = null;
                    if ($(this).parents('div:first.datagrid-header').parent().hasClass('datagrid-view1')) {
                        setBodySize(target, state);
                    }
                    fitColumns(target, state);
                    opts.onResizeColumn.call(target, field, col.width);
                    state.resizing = false;
                }
            });
        });

        var body;
        body = dc.body1.add(dc.body2);
        body.unbind().bind('mouseover', {target: target},function (e) {
            var tr = $(e.target).closest('tr.datagrid-row');
            if (!tr.length) return;
            var index = getIndex(tr);
            var target = e.data.target;
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            opts.finder.getTr(target, index, undefined, undefined, state).addClass('datagrid-row-over');
            e.stopPropagation();
        }).bind('mouseout', {target: target},function (e) {
                var tr = $(e.target).closest('tr.datagrid-row');
                if (!tr.length)  return;
                var index = getIndex(tr);
                var target = e.data.target;
                var state = $.data(target, 'datagrid');
                var opts = state.options;
                opts.finder.getTr(target, index, undefined, undefined, state).removeClass('datagrid-row-over');
                e.stopPropagation();
            }).bind('click', {target: target},function (e) {
                var tt = $(e.target);
                var tr = tt.closest('tr.datagrid-row');
                if (!tr.length)  return;
                var index = getIndex(tr);
                var target = e.data.target;
                var state = $.data(target, 'datagrid');
                var opts = state.options;
                if (tt.parent().hasClass('datagrid-cell-check')) {    // click the checkbox
                    if (opts.singleSelect && opts.selectOnCheck) {
                        if (!opts.checkOnSelect) {
                            uncheckAll(target, true, state);
                        }
                        checkRow(target, index, undefined, state);
                    } else {
                        if (tt.is(':checked')) {
                            checkRow(target, index, undefined, state);
                        } else {
                            uncheckRow(target, index, undefined, state);
                        }
                    }
                } else {
                    var row = opts.finder.getRow(target, index, state);
                    var td = tt.closest('td[field]', tr);
                    if (td.length) {
                        var field = td.attr('field');
                        opts.onClickCell.call(target, index, field, row[field]);
                    }

                    if (opts.singleSelect == true) {
                        selectRow(target, index, undefined, state);
                    } else {
                        if (opts.finder.getTr(target, index, undefined, undefined, state).hasClass('datagrid-row-selected')) { // Liuh fix 2013/12/25
                            unselectRow(target, index, undefined, state);
                        } else {
                            selectRow(target, index, undefined, state);
                        }
                    }
                    opts.onClickRow.call(target, index, row,e);
                }
                e.stopPropagation();
            }).bind('dblclick', {target: target},function (e) {
                var tt = $(e.target);
                var tr = tt.closest('tr.datagrid-row');
                if (!tr.length) return;
                var index = getIndex(tr);

                var target = e.data.target;
                var state = $.data(target, 'datagrid');
                var opts = state.options;

                var row = opts.finder.getRow(target, index, state);
                var td = tt.closest('td[field]', tr);
                if (td.length) {
                    var field = td.attr('field');
                    opts.onDblClickCell.call(target, index, field, row[field]);
                }
                opts.onDblClickRow.call(target, index, row);
                e.stopPropagation();
            }).bind('contextmenu', {target: target}, function (e) {
                var tr = $(e.target).closest('tr.datagrid-row');
                if (!tr.length) return;
                var index = getIndex(tr);
                var target = e.data.target;
                var state = $.data(target, 'datagrid');
                var opts = state.options;
                var row = opts.finder.getRow(target, index, state);
                opts.onRowContextMenu.call(target, e, index, row);
                e.stopPropagation();
            });
        dc.body2.bind('scroll', {target: target}, function (e) {
            var target = e.data.target;
            var state = $.data(target, 'datagrid');
            var dc = state.dc;
            dc.view1.children('div.datagrid-body').scrollTop($(this).scrollTop());
            if (state.editing.index != undefined) {
                setEditorToolPos(state);
            }
            dc.view2.children('div.datagrid-header,div.datagrid-footer').scrollLeft($(this).scrollLeft());
            //dc.editor2.find('div>div.datagrid-editor-toolempty').width($(this).scrollLeft());
        });

        function getIndex(tr) {
            if (tr.attr('datagrid-row-index')) {
                return parseInt(tr.attr('datagrid-row-index'));
            } else {
                return tr.attr('node-id');
            }
        }

        if (!opts.canHideColumn) return;

        //wqh隐藏列
        dc.hideColBtn.unbind(".datagrid").bind("click.datagrid", {target: target}, function (e) {
            var target = e.data.target;
            var state = $.data(target, 'datagrid');
            var dc = state.dc;
            var btn = $(this);
            var $divFields = dc.hideColFields;
            var offset = btn.offset();
            var left = offset.left;
            var top = offset.top;
            var w = $divFields._outerWidth();
            if (left + w > document.body.clientWidth - 5) left = document.body.clientWidth - w - 5;
            top += btn._outerHeight();

            $divFields.css({
                left: left,
                top: top,
                zIndex: $.fn.window.defaults.zIndex++
            }).show();
            e.stopPropagation();
        });
        $("div.hide-column-fields").bind("mouseleave", function (e) {
            $("div.hide-column-button").hide();
            $(this).hide();
        });

        $('div.hide-column-fields input[type=checkbox]').bind("click", function (e) {
            var state = $.data(target, 'datagrid');
            var panel = state.panel;
            $("div.hide-column-button").hide();
            var isHidden = $(this).prop("checked");
            var $td = panel.find('td[field="' + this.value + '"]');
            if (!isHidden) {
                $td.hide();
            } else {
                $td.show();
            }
            var col = getColumnOption(target, this.value, state);
            if (col) {
                col.hidden = !isHidden;
                 var opts = state.options;
                /*fix:IE8下非固定列全部隐藏之后，再点击重新显示列，隔行数据不显示问题*/
                var _cols=opts.columns;
                var isAllHidden=true;
                for (var i = 0, len = _cols.length; i < len; i++) {
                    var cc = _cols[i];
                    for (var j = 0, lj = cc.length; j < lj; j++) {
                        var c = cc[j];
                       if(c.hidden==undefined||! c.hidden){
                           isAllHidden=false;
                            break;
                       }
                    }
                }
                /*如果非固定列已经全部隐藏，则不设置行高*/
                 if(!isAllHidden){
                   $(".datagrid-view1 .datagrid-body").css('overflow-y','hidden');
                   fitColumns(target, state);
                 } else{
                    /*如果非固定列已经全部隐藏，设置左边固定列垂直方向滚动条为auto*/
                   $(".datagrid-view1 .datagrid-body").css('overflow-y','auto');
                 }
            }
            e.stopPropagation();
        });
    }

    $(window).resize(function () {
        $('div.hide-column-fields').hide();
        $('div.hide-column-button').hide();
    });

    function setEditorToolPos(state) {
        var dc = state.dc;
        var pos = dc.editor2.position();
        var hh = dc.header2._outerHeight();
        var t = pos.top + hh + dc.editor2._outerHeight();
        var h = dc.editorTool._outerHeight();
        if (dc.view.height() - t >= h)
            dc.editorTool.css('top', t);
        else dc.editorTool.css('top', pos.top + hh - h);
    }

    /**
     * adjusts the column width to fit the contents.
     */
    function autoSizeColumn(target, field) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        if (field) {
            setSize(target, state, field);
            if (opts.fitColumns) {
                setBodySize(target, state);
                fitColumns(target, state);
            }
        } else {
            var canFitColumns = false;
            var fields = getColumnFields(target, true, state).concat(getColumnFields(target, false, state));
            for (var i = 0, len = fields.length; i < len; i++) {
                var f = fields[i];
                var col = getColumnOption(target, f, state);
                if (col.auto) {
                    setSize(target, state, f);
                    canFitColumns = true;
                }
            }
            if (canFitColumns && opts.fitColumns) {
                setBodySize(target, state);
                fitColumns(target, state);
            }
        }

        function setSize(target, state, field) {
            $('div.hide-column-fields').hide();
            $('div.hide-column-button').hide();

            var opts = state.options;
            var dc = state.dc;
            var headerCell = dc.view.find('div.datagrid-header td[field="' + field + '"] div.datagrid-cell');
            headerCell.css('width', '');
            var col = getColumnOption(target, field, state);
            col.width = undefined;
            col.boxWidth = undefined;
            col.auto = true;
            fixColumnSize(target, field, state);
            var width = Math.max(headerCell._outerWidth(), getWidth(opts, 'allbody'), getWidth(opts, 'allfooter'));
            headerCell._outerWidth(width);
            col.width = width;
            col.boxWidth = parseInt(headerCell[0].style.width);
            fixColumnSize(target, field, state);
            opts.onResizeColumn.call(target, field, col.width);

            // get cell width of specified type(body or footer)
            function getWidth(opts, type) {
                var width = 0;
                opts.finder.getTr(target, 0, type, undefined, state).find('td[field="' + field + '"] div.datagrid-cell').each(function () {
                    var w = $(this)._outerWidth();
                    if (width < w) {
                        width = w;
                    }
                });
                return width;
            }
        }
    }

    /**
     * expand the columns to fit the grid width
     */
    function fitColumns(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        if (!opts.fitColumns) {
            return;
        }
        var header = dc.view2.children('div.datagrid-header');
        var fieldWidths = 0;
        var lastColumn, col, i, len;
        var fields = getColumnFields(target, false, state);
        for (i = 0, len = fields.length; i < len; i++) {
            col = getColumnOption(target, fields[i], state);
            if (canResize(col)) {
                fieldWidths += col.width;
                lastColumn = col;
            }
        }
        var headerInner = header.children('div.datagrid-header-inner').show();
        var leftWidth = header.width() - header.find('table').width() - opts.scrollbarSize;
        var rate = leftWidth / fieldWidths;
        if (!opts.showHeader) headerInner.hide();
        for (i = 0, len = fields.length; i < len; i++) {
            col = getColumnOption(target, fields[i], state);
            if (canResize(col)) {
                var width = Math.floor(col.width * rate);
                addHeaderWidth(header, col, width);
                leftWidth -= width;
            }
        }

        if (leftWidth && lastColumn) {
            addHeaderWidth(header, lastColumn, leftWidth);
        }
        fixColumnSize(target, undefined, state);

        function canResize(col) {
            if (!col.hidden && !col.checkbox && !col.auto) return true;
        }

        function addHeaderWidth(header, col, width) {
            col.width += width;
            col.boxWidth += width;
            header.find('td[field="' + col.field + '"] div.datagrid-cell').width(col.boxWidth);
        }
    }

    /**
     * fix column size with the specified field
     */

    function fixColumnSize(target, field, state) {
        if (!state) state = $.data(target, 'datagrid');
        var dc = state.dc;
        var table = dc.view.find('table.datagrid-btable,table.datagrid-ftable');
        table.css('table-layout', 'fixed');
        if (field) {
            fix(target, state, field);
        } else {
            var ff = getColumnFields(target, true, state).concat(getColumnFields(target, false, state));	// get all fields
            for (var i = 0; i < ff.length; i++) {
                fix(target, state, ff[i]);
            }
        }
        table.css('table-layout', 'auto');
        fixMergedSize(target, state);

        var gridId = $(target).attr('id');
        setTimeout(function () {
            var target = $('#' + gridId)[0];
            var state = $.data(target, 'datagrid');
            fixRowHeight(target, undefined, undefined, state);
            fixEditableSize(target, state);
        }, 0);

        function fix(target, state, field) {
            var dc = state.dc;
            var col = getColumnOption(target, field, state);
            if (col.checkbox) return;

            var style = dc.view.children('style')[0];
            var styleSheet = style.styleSheet ? style.styleSheet : (style.sheet || document.styleSheets[document.styleSheets.length - 1]);
            var rules = styleSheet.cssRules || styleSheet.rules;
            for (var i = 0, len = rules.length; i < len; i++) {
                var rule = rules[i];
                if (rule.selectorText.toLowerCase() == col.cellSelector.toLowerCase()) {
                    rule.style['width'] = col.boxWidth ? col.boxWidth + 'px' : 'auto';
                    break;
                }
            }
        }
    }

    /**
     * 动态设置列标题
     * @param target
     * @param params 可以是对象{field:,title:}，也可以是对象数组
     */
    function fixColumnTitle(target, params) {
        var state = $.data(target, 'datagrid');
        var dc = state.dc;
        var header = dc.view1.children('div.datagrid-header').add(dc.view2.children('div.datagrid-header'));
        var param;
        if (!params.length) params = [params];
        for (var i = 0, len = params.length; i < len; i++) {
            param = params[i];
            header.find('td[field=' + param.field + '] div.datagrid-cell span').eq(0).text(param.title);
        }
    }

    function fixMergedSize(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var dc = state.dc;
        var body = dc.body1.add(dc.body2);
        body.find('td.datagrid-td-merged').each(function (target, state) {
            var td = $(this);
            var colspan = td.attr('colspan') || 1;
            var width = getColumnOption(target, td.attr('field'), state).width;

            for (var i = 1; i < colspan; i++) {
                td = td.next();
                width += getColumnOption(target, td.attr('field'), state).width + 1;
            }
            td.children('div.datagrid-cell')._outerWidth(width);
        }, [target, state]);
    }

    function fixEditableSize(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var dc = state.dc;
        dc.view.find('div.datagrid-editable').each(function (target) {
            var cell = $(this);
            var field = cell.parent().attr('field');
            var col = getColumnOption(target, field);
            cell._outerWidth(col.width);
            var ed = $.data(this, 'datagrid.editor');
            if (ed.actions.resize) {
                ed.actions.resize(ed.target, cell.width());
            }
        }, [target]);

    }

    function getColumnOption(target, field, state) {
        /*huangxl：排序字段为空时，直接返回*/
        if (!field) return undefined;
        /*end*/
        function find(columns) {
            if (columns) {
                for (var i = 0, len = columns.length; i < len; i++) {
                    var cc = columns[i];
                    for (var j = 0, lj = cc.length; j < lj; j++) {
                        var c = cc[j];
                        if (c.field == field) {
                            return c;
                        }
                    }
                }
            }
            return null;
        }

        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var col = find(opts.columns);
        if (!col) {
            col = find(opts.frozenColumns);
        }
        return col;
    }

    /**
     * get column fields which will be show in row
     */
    function getColumnFields(target, frozen, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var columns = (frozen == true) ? (opts.frozenColumns || [
            []
        ]) : opts.columns;
        if (columns.length == 0) return [];

        var fields = [];

        function getColumnIndex(fields, count) {
            var c = 0;
            var i = 0;
            while (true) {
                if (fields[i] == undefined) {
                    if (c == count) {
                        return i;
                    }
                    c++;
                }
                i++;
            }
        }

        function getFields(columns, r) {
            var ff = [];
            var c = 0;
            var i, len;
            for (i = 0, len = columns[r].length; i < len; i++) {
                var col = columns[r][i];
                if (col.field) {
                    ff.push([c, col.field]);	// store the field index and name
                }
                c += parseInt(col.colspan || '1');
            }
            for (i = 0, len = ff.length; i < len; i++) {
                ff[i][0] = getColumnIndex(fields, ff[i][0]);	// calculate the real index in fields array
            }
            for (i = 0, len = ff.length; i < len; i++) {
                var f = ff[i];
                fields[f[0]] = f[1];	// update the field name
            }
        }

        for (var i = 0, len = columns.length; i < len; i++) {
            getFields(columns, i);
        }

        return fields;
    }

    /**
     * load data to the grid
     */
    function loadData(target, data, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var selectedRows = state.selectedRows;
        data = opts.loadFilter.call(target, data);
        state.data = data;
        if (data.footer) {
            state.footer = data.footer;
        }
        //huangxl 增加onBeforeBind方法，数据加载成功后绑定前
        if (opts.onBeforeBind) opts.onBeforeBind.call(target, data);

        if (!opts.remoteSort) {
            var opt = getColumnOption(target, opts.sortName, state);
            if (opt) {
                //huangxl：col.option增加number属性，确定是否数字
                var sortFunc = opt.sorter || function (a, b) {
                    a = a + "";
                    b = b + "";
                    if (opt.number) {
                        a = a.toDouble();
                        b = b.toDouble();
                        return (a > b ? 1 : -1);
                    }
                    return a.localeCompare(b);
                };
                data.rows.sort(function (r1, r2) {
                    return sortFunc(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == 'asc' ? 1 : -1);
                });
            }
        }

        // render datagrid view
        if (opts.view.onBeforeRender) {
            opts.view.onBeforeRender.call(opts.view, target, data.rows, state);
        }
        opts.view.render.call(opts.view, target, dc.body2, false, state);
        opts.view.render.call(opts.view, target, dc.body1, true, state);
        if (opts.showFooter) {
            opts.view.renderFooter.call(opts.view, target, dc.footer2, false, state);
            opts.view.renderFooter.call(opts.view, target, dc.footer1, true, state);
        }
        if (opts.view.onAfterRender) {
            opts.view.onAfterRender.call(opts.view, target, state);
        }
        opts.total = data.total;
        var pager = getPager(target, state);
        if (pager.length) {
            if (pager.pagination('options').total != data.total) {
                pager.pagination('refresh', {total: data.total});
//                pager.pagination({total:data.total});
            }

            if (pager.pagination('options').pageNumber != data.pageNumber) {
                pager.pagination('refresh', {pageNumber: data.pageNumber});
//                pager.pagination({total:data.total});
            }
        }
//        setTimeout(function(){
        fixRowHeight(target, undefined, undefined, state);
//        }, 500);

        dc.body2.triggerHandler('scroll');

        //setSelection();
        selectedRows.splice(0, selectedRows.length);
        opts.onLoadSuccess.call(target, data);
        autoSizeColumn(target);
    }

    /**
     * Return the index of specified row or -1 if not found.
     * row: id value or row record
     */
    function getRowIndex(target, row, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var rows = state.data.rows;
        if (typeof row == 'object') {
            return indexOfArray(rows, row);
        } else {
            return indexOfRowId(rows, opts.idField, row);
        }
    }

    function getSelectedRows(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;

        if (opts.idField) {
            return state.selectedRows;
        } else {
            var rows = [];
            opts.finder.getTr(target, '', 'selected', 2, state).each(function (rows) {
                var index = parseInt($(this).attr('datagrid-row-index'));
                rows.push(data.rows[index]);
            }, [rows]);
            return rows;
        }
    }

    /**
     * select record by idField.
     */
    function selectRecord(target, idValue, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        if (opts.idField) {
            var index = getRowIndex(target, idValue, state);
            if (index >= 0) {
                selectRow(target, index, undefined, state);
            }
        }
    }

    /**
     * select a row with specified row index which start with 0.
     */
    function selectRow(target, index, notCheck, state) {
        if (!state) state = $.data(target, 'datagrid');
        var dc = state.dc;
        var opts = state.options;
        var data = state.data;
        var selectedRows = $.data(target, 'datagrid').selectedRows;

        //如果有cannot-select的class属性就不能select
        var tr = opts.finder.getTr(target, index, undefined, undefined, state)
        if(tr.hasClass('cannot-select'))return

        if (opts.singleSelect) {
            unselectAll(target, undefined, state);
            selectedRows.splice(0, selectedRows.length);
        }
        if (!notCheck && opts.checkOnSelect) {
            checkRow(target, index, true, state);	// don't select the row again
        }

        if (opts.idField) {
            var row = opts.finder.getRow(target, index, state);
            if (!row[opts.idField]||indexOfRowId(selectedRows, opts.idField, row[opts.idField]) < 0)
                selectedRows.push(row);
        }

        opts.onSelect.call(target, index, data.rows[index]);

        //var tr = opts.finder.getTr(target, index, undefined, undefined, state).addClass('datagrid-row-selected');
        tr.addClass('datagrid-row-selected')
        if (tr.length) {
            var body2 = dc.body2;
            var top = tr.position().top;// - headerHeight;
            if (top <= 0) {
                body2.scrollTop(body2.scrollTop() + top);
            } else {
                var th = tr._outerHeight(), bh = body2[0].clientHeight;
                if (top + th > bh) {
                    body2.scrollTop(body2.scrollTop() + top + th - bh);// - bh + 18
                }
            }
        }
    }

    /**
     * unselect a row.
     */
    function unselectRow(target, index, notCheck, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var selectedRows = state.selectedRows;

        if (!notCheck && opts.checkOnSelect) {
            uncheckRow(target, index, true, state);	// don't unselect the row again
        }
        opts.finder.getTr(target, index, undefined, undefined, state).removeClass('datagrid-row-selected');
        var row = opts.finder.getRow(target, index, state);

        if (opts.idField) {
            if(row[opts.idField]){
                removeArrayItem(selectedRows, opts.idField, row[opts.idField])
            }else{
                removeArrayItem(selectedRows, row)
            }
        }
        opts.onUnselect.call(target, index, row);
    }

    /**
     * Select all rows of current page.
     */
    function selectAll(target, notCheck, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var rows = state.data.rows;
        state.selectedRows = [];
        var selectedRows = state.selectedRows;

        if (!notCheck && opts.checkOnSelect) {
            checkAll(target, true, state);	// don't select rows again
        }
        opts.finder.getTr(target, '', 'allbody', undefined, state).not( $(".cannot-select") ).addClass('datagrid-row-selected');
        if (opts.idField) {
            var sExists = {};
            for (var index = 0, len = rows.length; index < len; index++) {
                if(opts.finder.getTr(target, index, undefined, undefined, state).hasClass('cannot-select'))continue
                var row = rows[index];
                if (row[opts.idField]) {
                    if (!sExists[row[opts.idField]]) {
                        selectedRows.push(row);
                        sExists[row[opts.idField]] = 1;
                    }
                } else {
                    selectedRows.push(row);
                }
            }
        }
        opts.onSelectAll.call(target, rows);
    }

    function unselectAll(target, notCheck, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var rows = state.data.rows;
        var selectedRows = state.selectedRows;

        if (!notCheck && opts.checkOnSelect) {
            uncheckAll(target, true, state);	// don't unselect rows again
        }
        opts.finder.getTr(target, '', 'selected', undefined, state).removeClass('datagrid-row-selected');
        selectedRows.splice(0, selectedRows.length);
        /*if (opts.idField) {
         for (var index = 0; index < rows.length; index++) {
         removeArrayItem(selectedRows, opts.idField, rows[index][opts.idField]);
         }
         }*/
        opts.onUnselectAll.call(target, rows);
    }

    /**
     * check a row, the row index start with 0
     */
    function checkRow(target, index, notSelect, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;
        if (!notSelect && opts.selectOnCheck) {
            selectRow(target, index, true, state);	// don't check the row again
        }
        var ck;
        if (notSelect) ck = opts.finder.getTr(target, index, undefined, undefined, state).find('div.datagrid-cell-check input[type=checkbox]');
        else ck = opts.finder.getTr(target, index, undefined, undefined, state).find('div.datagrid-cell-check input:enabled[type=checkbox]');
        if (ck.length) {
            $.fn.prop ? ck.prop('checked', true) : ck.attr('checked', true);
            //如果一个未check的都没有就将header上的check全选
            var allck = opts.finder.getTr(target, '', 'allbody', undefined, state).add(opts.finder.getTr(target, '', 'editor', undefined, state)).find('div.datagrid-cell-check input:enabled[type=checkbox]:visible:not(:checked)');
            if(allck&&allck.length==0){
                var headerck = state.dc.header1.add( state.dc.header2).find('>table>tbody>tr>td div.datagrid-header-check input:enabled[type=checkbox]:not(:checked)');
                if (headerck.length) {
                    $.fn.prop ? headerck.prop('checked', true) : headerck.attr('checked', true);
                }
            }
            //__syncEditorCheck(ck);
            opts.onCheck.call(target, index, data.rows[index]);
        }
    }

    /**
     * uncheck a row
     */
    function uncheckRow(target, index, notSelect, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;
        if (!notSelect && opts.selectOnCheck) {
            unselectRow(target, index, true, state);	// don't uncheck the row again
        }
        var ck;
        if (notSelect) ck = opts.finder.getTr(target, index, undefined, undefined, state).find('div.datagrid-cell-check input[type=checkbox]');
        else ck = opts.finder.getTr(target, index, undefined, undefined, state).find('div.datagrid-cell-check input:enabled[type=checkbox]');
        if (ck.length) {
            $.fn.prop ? ck.prop('checked', false) : ck.attr('checked', false);
            //如果一个未check的都没有就触发checkAll事件
        /*    var allck = opts.finder.getTr(target, '', 'allbody', undefined, state).add(opts.finder.getTr(target, '', 'editor', undefined, state)).find('div.datagrid-cell-check input:enabled[type=checkbox]:visible:checked');
            if(allck&&allck.length==0){
                var headerck = state.dc.header1.add( state.dc.header2).find('>table>tbody>tr>td div.datagrid-header-check input:enabled[type=checkbox]:checked');
                if (headerck.length) {
                    $.fn.prop ? headerck.prop('checked', false) : headerck.attr('checked', false);
                }
            }*/

            //改成只要uncheckRow,肯定就不是全选了，就要把header里的去掉.
            var headerck = state.dc.header1.add( state.dc.header2).find('>table>tbody>tr>td div.datagrid-header-check input:enabled[type=checkbox]:checked');
            if (headerck.length) {
                $.fn.prop ? headerck.prop('checked', false) : headerck.attr('checked', false);
            }
            //__syncEditorCheck(ck);
            opts.onUncheck.call(target, index, data.rows[index]);
        }
    }

    /**
     * 同步设置浮动编辑层checkbox状态 Liuh fix 2013/12/25
     * @param ck
     * @private
     */
    function __syncEditorCheck(ck) {
        var editor = ck.parents('table.datagrid-btable').next('div.datagrid-editor');
        editor.find('input[type=checkbox]').prop('checked', ck.prop('checked'));
    }

    /**
     * check all checkbox on current page
     */
    function checkAll(target, notSelect, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;
        if (!notSelect && opts.selectOnCheck) {
            selectAll(target, true, state);	// don't check rows again
        }
        var allck = opts.finder.getTr(target, '', 'allbody', undefined, state).add(opts.finder.getTr(target, '', 'editor', undefined, state)).find('div.datagrid-cell-check input:enabled[type=checkbox]');
        $.fn.prop ? allck.prop('checked', true) : allck.attr('checked', true);
        opts.onCheckAll.call(target, data.rows);
    }

    /**
     * uncheck all checkbox on current page
     */
    function uncheckAll(target, notSelect, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;
        if (!notSelect && opts.selectOnCheck) {
            unselectAll(target, true, state);	// don't uncheck rows again
        }
        var allck = opts.finder.getTr(target, '', 'allbody', undefined, state).add(opts.finder.getTr(target, '', 'editor', undefined, state)).find('div.datagrid-cell-check input:enabled[type=checkbox]');
        $.fn.prop ? allck.prop('checked', false) : allck.attr('checked', false);
        opts.onUncheckAll.call(target, data.rows);
    }

    /**
     * Begin edit a row
     */
    function beginEdit(target, index) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        if (opts.readonly) {
            alert('请设置readonly属性。');
            return;
        }
        if (isEditing(target, state)) return;

        var row = opts.finder.getRow(target, index, state);
        if (opts.onBeforeEdit.call(target, index, row) == false) return;
        createEditor(target, index, row, state);
        validateRow(target, state);	// validate the row data
        /*$(document).unbind('.datagrid').bind('mousedown.datagrid', {target: target}, function (e) {
         endEdit(e.data.target);
         return false;
         });*/
    }

//编辑的按钮
    function editorBtnEndClick(target, cancel) {
        var opts = $.data(target, 'datagrid').options;
        opts.onEditorBtnClick.call(target, !cancel);
    }

    /**
     * Stop edit a row.
     * index: the row index.
     * cancel: if true, restore the row data.
     */
    function endEdit(target, cancel, state, isDelete) {
        if (!state) state = $.data(target, 'datagrid');
        if (!isEditing(target, state)) return;
        var opts = state.options;
        var updatedRows = state.updatedRows;
        var insertedRows = state.insertedRows;

        var tr = opts.finder.getTr(target, 0, 'editor', undefined, state), index = state.editing.index, insertedIndex = state.editing.insertedIndex;
        var row = opts.finder.getRow(target, index, state);

        if (!cancel) {
            ///*huangxl:endEdit时不再校验，外部自行校验*/
            if (!validateRow(target)) return;	// invalid row data
            /*end*/
            var changed = false;
            var changes = {oldValue: {}, newValue: {}};
            tr.find('div.datagrid-editable').each(function () {
                var field = $(this).parent().attr('field');
                var ed = $.data(this, 'datagrid.editor');
                var value = ed.actions.getValue(ed.target);
                if (row[field] != value) {
                    changed = true;
                    changes[field] = value;
                    changes.oldValue[field] = row[field];
                    changes.newValue[field] = value;
                    row[field] = value;
                }
            });
            if (changed) {
                if (indexOfArray(insertedRows, row) == -1 && indexOfArray(updatedRows, row) == -1) {
                    updatedRows.push(row);
                }
            }
        }
//        $(document).unbind('.datagrid');
        var dc = state.dc;
        dc.editor2.add(dc.editor1).add(dc.editorTool).hide();
        state.editing.index = undefined;
        state.editing.insertedIndex = undefined;
        if (!cancel) {
            opts.onAfterEdit.call(target, index, row, changes);
        } else {
            opts.onCancelEdit.call(target, index, row);
        }

        opts.onEndEdit.call(target, index, row);
        if (!cancel) {
            opts.view.refreshRow.call(opts.view, target, index, state);
        } else if (insertedIndex == index && !isDelete) {
            deleteRow(target, index, state);
        }

        if(opts.onAfterEndEdit) opts.onAfterEndEdit.call(target, row, index);
    }

    function isEditing(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        return state.editing.index != undefined;
    }

    /**
     * get the specified row editors
     */
    function getEditors(target) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var tr = opts.finder.getTr(target, 0, 'editor', undefined, state);
        var editors = [];
        tr.children('td').each(function (editors) {
            var cell = $(this).find('div.datagrid-editable');
            if (cell.length) {
                var ed = $.data(cell[0], 'datagrid.editor');
                editors.push(ed);
            }
        }, [editors]);
        return editors;
    }

    /**
     * get the cell editor
     *
     */
    function getEditor(target, field) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var tr = opts.finder.getTr(target, 0, 'editor', undefined, state);
        var cell = tr.children('td[field="' + field + '"]').find('div.datagrid-editable');
        if (cell.length) {
            return $.data(cell[0], 'datagrid.editor');
        }
        return null;
    }

//动态改变editor
    function setColEditor(target, param, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        if (!param.length) param = [param];
        var i, len, col, p;
        for (i = 0, len = param.length; i < len; i++) {
            p = param[i];
            col = getColumnOption(target, p.field, state);
            if (!col) continue;
            col.editor = p.editor;
        }

        if (!state.editing.rendered) return;
        var index, row;
        if (isEditing(target, state)) {
            index = state.editing.index;
            row = state.data.rows[index];
        } else {
            index = 0;
            row = {};
        }
        var trNotEditor = opts.finder.getTr(target, index, undefined, undefined, state);
        var tr = opts.finder.getTr(target, index, 'editor', undefined, state), $td;
        for (var j = 0, jl = param.length; j < jl; j++) {
            p = param[j];
            $td = tr.children('td[field="' + p.field + '"]');
            if ($td.length > 0) {
                destroyColEditor($td);
                createColEditor(target, $td, state, row[p.field], trNotEditor.find('td[field="' + p.field + '"] > div'));
            }
        }
        bindEnterEvent(target, state);
    }

    /**
     * create the row editor and adjust the row height.
     */
    function createEditor(target, index, row, state) {
        if (!state) state = $.data(target, 'datagrid');
        var dc = state.dc;
        var opts = state.options;
        state.editing.index = index;
        var tr = opts.finder.getTr(target, index, undefined, undefined, state), treditor;
        if (!state.editing.rendered) {
            opts.view.renderEditor.call(opts.view, target, dc.editor2, false, state);
            opts.view.renderEditor.call(opts.view, target, dc.editor1, true, state);
            treditor = opts.finder.getTr(target, index, 'editor', undefined, state);
            opts.view.attrRowIndex(treditor, index);
            treditor.children('td').each(function (target, tr, row, state) {
                var t = $(this);
                var field = t.attr("field");
                if (field) {
                    var cell = getCell(tr, field);
                    createColEditor(target, t, state, row[field], cell);
                } else {
                    var rn = tr.find('td.datagrid-td-rownumber > div').html();
                    setColEditorValue(t, rn);
                }
            }, [target, tr, row, state]);
            bindEnterEvent(target, state);
            state.editing.rendered = true;
        } else {
            treditor = opts.finder.getTr(target, index, 'editor', undefined, state);
            opts.view.attrRowIndex(treditor, index);
            treditor.children('td').each(function (tr, row) {
                var t = $(this);
                var field = t.attr("field");
                if (field) {
                    var cell = getCell(tr, field);
                    setColEditorValue(t, row[field], cell);
                } else {
                    var rn = tr.find('td.datagrid-td-rownumber > div').html();
                    setColEditorValue(t, rn);
                }
            }, [tr, row]);
        }
        var tr_editor = opts.finder.getTr(target, 0, 'editor', undefined, state);
        var styleValue = opts.rowStyler ? opts.rowStyler.call(target, index, row) : '';
        tr_editor.attr('style', styleValue || '').css('height', tr.css('height'));

        // opts.finder.getTr(target, 0, 'editor', undefined, state).css('height', tr.css('height'));
        var gridId = $(target).attr('id');
        setTimeout(function () {
            var target = $('#' + gridId)[0];
            var state = $.data(target, 'datagrid');
            var dc = state.dc;
            var opts = state.options;
            var tr = opts.finder.getTr(target, index, 'body', 2, state);
            var pos = tr.position();
            dc.editor2.add(dc.editor1).css('top', pos.top + dc.body2.scrollTop()).show();//
            dc.editorTool.show();
            setEditorToolPos(state);
            $.hotkeys.focusFirst(state.dc.view[0]);
        }, 100);

        function getCell(tr, field) {
            return tr.find('td[field="' + field + '"] > div');
        }
    }

    function setColEditorValue($td, cellValue, origCell) {
        var cell = $td.find('div.datagrid-editable');
        if (cell.length > 0) {
            var ed = $.data(cell[0], 'datagrid.editor');
            if (origCell)
                ed.actions.setValue(ed.target, cellValue, origCell.html());

            if (ed.actions.resize) {
                ed.actions.resize(ed.target, cell.width());
            }
        } else if (origCell) {
            $td.empty().append(origCell.clone());
        } else {
            $td.children('div').html(cellValue);
        }
    }

    function createColEditor(target, $td, state, cellValue, origCell) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;

        var cell = $td.find('div.datagrid-cell');
        if (!cell.length) cell = $td.find('div.datagrid-cell-check');
        var field = $td.attr('field');
        var col = getColumnOption(target, field, state), hasEditor = false;
        if (col && col.editor) {
            // get edit type and options
            var edittype, editoptions;
            if (typeof col.editor == 'string') {
                edittype = col.editor;
            } else {
                edittype = col.editor.type;
                editoptions = col.editor.options;
            }

            // get the specified editor
            var editor = opts.editors[edittype];
            if (editor) {
                var oldHtml = cell.html();
                //var width = col.width - 4;
                var width = col.width;
                // 需减少padding-left与padding-right liuh 2013/06/09
                cell.addClass('datagrid-editable');
                cell._outerWidth(width);
                cell.empty();
                var ed = {
                    actions: editor,
                    target: editor.init(cell, editoptions, col.index), //.find('td')
                    field: field,
                    type: edittype,
                    oldHtml: oldHtml
                };
                $.data(cell[0], 'datagrid.editor', ed);
                ed.actions.setValue(ed.target, cellValue, origCell.html());
                if (ed.actions.resize) {
                    ed.actions.resize(ed.target, cell.width());
                }
                hasEditor = true;
            }
        }
        if (!hasEditor) {
            if (origCell) cell.parent().empty().append(origCell.clone());
            else cell.html(cellValue);
        }
    }

    function destroyColEditor($td) {
        var cell = $td.find('div.datagrid-editable');
        if (cell.length) {
            var ed = $.data(cell[0], 'datagrid.editor');
            if (ed.actions.destroy) {
                ed.actions.destroy(ed.target);
            }
            cell.html("");
            $.removeData(cell[0], 'datagrid.editor');

            cell.removeClass('datagrid-editable');
            cell.css('width', '');
        }
    }

    /**
     * Validate while editing, if valid return true.
     */
    function validateRow(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        if (!isEditing(target, state)) return;
        var tr = state.options.finder.getTr(target, state.editing.index, 'editor', undefined, state);

        var vbox = tr.find('.validatebox-text');
        vbox.validatebox('validate');
        vbox.trigger('mouseleave');
        var invalidbox = tr.find('.validatebox-invalid');
        return invalidbox.length == 0;
    }

    /**
     * Get changed rows, if state parameter is not assigned, return all changed.
     * state: inserted,deleted,updated
     */
    function getChanges(target, changeState) {
        var state = $.data(target, 'datagrid');
        var insertedRows = state.insertedRows;
        var deletedRows = state.deletedRows;
        var updatedRows = state.updatedRows;

        if (!changeState) {
            var rows = [];
            rows = rows.concat(insertedRows);
            rows = rows.concat(deletedRows);
            rows = rows.concat(updatedRows);
            return rows;
        } else if (changeState == 'inserted') {
            return insertedRows;
        } else if (changeState == 'deleted') {
            return deletedRows;
        } else if (changeState == 'updated') {
            return updatedRows;
        }

        return [];
    }

    function deleteRow(target, index, state) {
        if (!state) state = $.data(target, 'datagrid');
        if (state.editing.index == index) {
            endEdit(target, true, state, true);
        }

        var opts = state.options;
        var data = state.data;
        var insertedRows = state.insertedRows;
        var deletedRows = state.deletedRows;
        var selectedRows = state.selectedRows;

        var row = data.rows[index];
        if (indexOfArray(insertedRows, row) >= 0) {
            removeArrayItem(insertedRows, row);
        } else {
            deletedRows.push(row);
        }
        if(data.rows[index][opts.idField]){
            removeArrayItem(selectedRows, opts.idField, data.rows[index][opts.idField]);
        }else{
            removeArrayItem(selectedRows, data.rows[index]);
        }

        opts.view.deleteRow.call(opts.view, target, index, state);
        if (opts.height == 'auto') {
            fixRowHeight(target, undefined, undefined, state);	// adjust the row height
        }
        state.dc.editor2.add(state.dc.editor1).add(state.dc.editorTool).hide();
    }

    function insertRow(target, param, state) {
        if (!state) state = $.data(target, 'datagrid');
        var view = state.options.view;
        var insertedRows = state.insertedRows;
        view.insertRow.call(view, target, param.index, param.row, state);
        insertedRows.push(param.row);
    }

    function appendRow(target, row, state) {
        if (!state) state = $.data(target, 'datagrid');
        var view = state.options.view;
        var insertedRows = state.insertedRows;
        view.insertRow.call(view, target, null, row, state);
        insertedRows.push(row);
    }

    function hideEditorTool(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        if (state.options.showEditorTool) {
            var dc = state.dc;
            if (dc) dc.editor2.add(dc.editor1).add(dc.editorTool).hide();
        }
    }

    function initChanges(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var data = state.data;
        var rows = data.rows;
        var originalRows = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            originalRows.push($.extend({}, rows[i]));
        }
        state.originalRows = originalRows;
        state.updatedRows = [];
        state.insertedRows = [];
        state.deletedRows = [];
    }

    function acceptChanges(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        if (!isEditing(target, state)) return;
        if (validateRow(target, state)) {
            endEdit(target, false, state);
            initChanges(target, state);
        }
    }

    function rejectChanges(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        if (!isEditing(target, state)) return;
        var opts = state.options;
        var originalRows = state.originalRows;
        var insertedRows = state.insertedRows;
        var deletedRows = state.deletedRows;
        var selectedRows = state.selectedRows;
        var data = state.data;
        var i, len;
        endEdit(target, true, state);

        var selectedIds = [];
        for (i = 0, len = selectedRows.length; i < len; i++) {
            selectedIds.push(selectedRows[i][opts.idField]);
        }
        selectedRows.splice(0, selectedRows.length);

        data.total += deletedRows.length - insertedRows.length;
        data.rows = originalRows;
        loadData(target, data, state);
        for (i = 0, len = selectedIds.length; i < len; i++) {
            selectRecord(target, selectedIds[i], state);
        }
        initChanges(target, state);
    }

    /**
     * request remote data
     */
    function request(target, params, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;

        if (params) opts.queryParams = params;
//		if (!opts.url) return;

        var param = opts.queryParams || {};
        if (opts.pagination) {
            $.extend(param, {
                page: opts.pageNumber,
                rows: opts.pageSize,
                sizeChange:opts.sizeChange
            });
        }
        if (opts.sortName && opts.sortName.length > 0) {
            $.extend(param, {
                sort: opts.sortName.join(','),
                order: opts.sortOrder.join(',')
            });
        }

        if (opts.onBeforeLoad.call(target, param) == false) return;

        var $target = $(target);
        loading(target, state);
        var gridId = $target.attr('id');
        setTimeout(function () {
            doRequest(gridId);
            opts.sortName = [];
            opts.sortOrder = [];
        }, 0);

        function doRequest(gridId) {
            var target = $('#' + gridId)[0];
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var result = opts.loader.call(target, param, function (data) {
                setTimeout(function () {
                    loaded($('#' + gridId)[0]);
                }, 0);
                var target = $('#' + gridId)[0];
                loadData(target, data);
                setTimeout(function () {
                    initChanges($('#' + gridId)[0]);
                }, 0);
            }, function () {
                setTimeout(function () {
                    loaded($('#' + gridId)[0]);
                }, 0);
                opts.onLoadError.apply($('#' + gridId)[0], arguments);
            });
            if (result == false) {
                loaded(target, state);
            }
        }
    }

    function mergeCells(target, param) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var rows = state.data.rows;

        param.rowspan = param.rowspan || 1;
        param.colspan = param.colspan || 1;

        if (param.index < 0 || param.index >= rows.length) return;
        if (param.rowspan == 1 && param.colspan == 1) return;

        var value = rows[param.index][param.field];	// the cell value

        var tr = opts.finder.getTr(target, param.index, undefined, undefined, state);
        var td = tr.find('td[field="' + param.field + '"]');
        td.attr('rowspan', param.rowspan).attr('colspan', param.colspan);
        td.addClass('datagrid-td-merged');
        var i, len;
        for (i = 1, len = param.colspan; i < len; i++) {
            td = td.next();
            td.hide();
            rows[param.index][td.attr('field')] = value;
        }
        for (i = 1, len = param.rowspan; i < len; i++) {
            tr = tr.next();
            td = tr.find('td[field="' + param.field + '"]').hide();
            rows[param.index + i][td.attr('field')] = value;
            for (var j = 1, lj = param.colspan; j < lj; j++) {
                td = td.next();
                td.hide();
                rows[param.index + i][td.attr('field')] = value;
            }
        }

        fixMergedSize(target, state);
    }

    /**
     * 获取列宽信息，返回json格式：[{field:'aa', width:120}]
     */
    function getColsWidth(target) {
        var dc = $.data(target, 'datagrid').dc;
        var colsWidth = {};

        var header = dc.view1.children('div.datagrid-header').add(dc.view2.children('div.datagrid-header'));
        header.find('td[field]').each(function () {
            var t = $(this);
            colsWidth[t.attr('field')] = t.width();
        });
        return colsWidth;
    }

    function getColsHide(target) {
        var dc = $.data(target, 'datagrid').dc;
        var colsWidth = {};

        var header = dc.view1.children('div.datagrid-header').add(dc.view2.children('div.datagrid-header'));
        header.find('td[field]').each(function () {
            var t = $(this);
            colsWidth[t.attr('field')] = t.is(":hidden");
        });
        return colsWidth;
    }

    $.fn.datagrid = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.datagrid.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'datagrid');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                opts = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {queryParams: {}}), $.fn.datagrid.parseOptions(this), options);
                $(this).css('width', '').css('height', '');

                var wrapResult = wrapGrid(this, opts);
                state = $.data(this, 'datagrid', {
                    editing: {},
                    options: opts,
                    panel: wrapResult.panel,
                    dc: wrapResult.dc,
                    selectedRows: [],
                    data: {total: 0, rows: []},
                    originalRows: [],
                    updatedRows: [],
                    insertedRows: [],
                    deletedRows: []
                });
            }

            buildGrid(this, state);

            setSize(this, undefined, state);
            if(!options.initNotQuery){
                request(this, undefined, state);
            }

            bindEvents(this, state);
        });
    };

    /*huangxl editor的input绑定click和change事件，方便前端自动计算列的计算*/
    function bindEvent(obj, opt) {
        if (!opt) return;
        if (opt.click) obj.click(opt.click);
        if (opt.change) obj.change(opt.change);
    }

    //回车事件
    function bindEnterEvent(target, state) {
        $.hotkeys.parseContainElements(state.dc.view[0]);
        if (state.options.onLastColEnter) {
            var targetId = target.id;
            var viewId = state.dc.view[0].id;
            $.hotkeys.bindCallback("enterLast." + viewId, function () {
                var $target = $('#' + targetId), target = $target[0];
                var state = $.data(target, 'datagrid');
                if (state.editing.index == undefined) return;
                var index = state.editing.index;
                endEdit(target, false, state);
                if (state.editing.index != undefined) return;
                state.options.onLastColEnter.call(target, index, index == state.data.rows.length - 1);
                return false;
            });
            $.hotkeys.bindCallback("enter." + viewId, function (e) {
                var $target = $('#' + targetId), target = $target[0];
//                alert(e.id);
                enterColumnEditor(target, e.id);
                return false;
            });
        }
    }

    //回车时某列编辑控件获取焦点时触发，需要移动滚动条
    function enterColumnEditor(target, elementId) {
        var state = $.data(target, 'datagrid');
        var dc = state.dc;
        var el = $('#' + elementId);
        if (el.length) {
            var body2 = dc.body2;
            var left = el.position().left;// - headerHeight;
            if (left <= 0) {
                body2.scrollLeft(body2.scrollLeft() + left);
            } else {
                var th = el._outerWidth(), bh = body2[0].clientWidth;
                if (left + th > bh) {
                    body2.scrollLeft(body2.scrollLeft() + left + th - bh);// - bh + 18
                }
            }
        }
    }

    function refreshGrid(target) {
        var state = $.data(target, 'datagrid');
        var data = state.data;
        var dc = state.dc, opts = state.options;
        data.total = opts.total;
        opts.view.render.call(opts.view, target, dc.body2, false, state);
        opts.view.render.call(opts.view, target, dc.body1, true, state);
    }

    function getOptions(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var gopts = state.options;
        var popts = state.panel.panel('options');
        var opts = $.extend(gopts, {
            width: popts.width,
            height: popts.height,
            closed: popts.closed,
            collapsed: popts.collapsed,
            minimized: popts.minimized,
            maximized: popts.maximized
        });
        var pager = getPager(target, state);
        if (pager.length) {
            var pagerOpts = pager.pagination('options');
            $.extend(opts, {
                pageNumber: pagerOpts.pageNumber,
                pageSize: pagerOpts.pageSize
            });
        }
        return opts;
    }

    function getPager(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        return state.panel.children('div.datagrid-pager')
    }

    function loading(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        var opts = state.options;
        getPager(target, state).pagination('loading');
        if (opts.loadMsg) {
            var panel = state.panel;
            $('<div class="datagrid-mask" style="display:block"></div>').appendTo(panel);
            var msg = $('<div class="datagrid-mask-msg" style="display:block"></div>').html(opts.loadMsg).appendTo(panel);
            msg.css('left', (panel.width() - msg._outerWidth()) / 2);

        }
    }

    function loaded(target, state) {
        if (!state) state = $.data(target, 'datagrid');
        getPager(target, state).pagination('loaded');
        var panel = state.panel;
        panel.children('div.datagrid-mask-msg').remove();
        panel.children('div.datagrid-mask').remove();
    }

    var editors = {
        text: {
            init: function (container, options, tabIndex) {
                var input = $('<input type="text" class="datagrid-editable-input" tabIndex="' + tabIndex + '">').appendTo(container);
                bindEvent(input, options);
                if (options && options.disabled) input.attr("disabled", true);
                if(options&&options.required!=undefined){
                    input.validatebox({
                        required:options.required
                    });
                }
                return input;
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            setEnabled: function (target, e) {
                $(target).attr("disabled", !e);
            }
        },
        textarea: {
            init: function (container, options, tabIndex) {
                var input = $('<textarea class="datagrid-editable-input" tabIndex="' + tabIndex + '"></textarea>').appendTo(container);
                bindEvent(input, options);
                return input;
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            setEnabled: function (target, e) {
                $(target).attr("disabled", !e);
            }
        },
        checkbox: {
            init: function (container, options, tabIndex) {
                var input = $('<input type="checkbox" tabIndex="' + tabIndex + '">').appendTo(container);
                input.val(options.on);
                input.attr('offval', options.off);
                bindEvent(input, options);
                return input;
            },
            getValue: function (target) {
                if ($(target).is(':checked')) {
                    return $(target).val();
                } else {
                    return $(target).attr('offval');
                }
            },
            setValue: function (target, value) {
                var checked = false;
                if ($(target).val() == value) {
                    checked = true;
                }
                $.fn.prop ? $(target).prop('checked', checked) : $(target).attr('checked', checked);
            },
            setEnabled: function (target, e) {
                $(target).attr("disabled", !e);
            }
        },
        numberbox: {
            init: function (container, options, tabIndex) {
                var input = $('<input type="text" class="datagrid-editable-input" tabIndex="' + tabIndex + '">').appendTo(container);
                input.numberbox(options);
                /*change时及时赋值，避免input和number的value不同*/
                if (options && options.change) {
                    input.change(function () {
                        $(this).numberbox("setValue", $(this).val());
                        options.change.call(this);
                    });
                }

                return input;
            },
            destroy: function (target) {
                $(target).numberbox('destroy');
            },
            getValue: function (target) {
                return $(target).numberbox('getValue');
            },
            setValue: function (target, value) {
                $(target).numberbox('setValue', value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            setEnabled: function (target, e) {
                $(target).attr("disabled", !e);
            }
        },
        validatebox: {
            init: function (container, options, tabIndex) {
                var input = $('<input type="text" class="datagrid-editable-input" tabIndex="' + tabIndex + '">').appendTo(container);
                input.validatebox(options);
                bindEvent(input, options);
                return input;
            },
            destroy: function (target) {
                $(target).validatebox('destroy');
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            setEnabled: function (target, e) {
                $(target).attr("disabled", !e);
            }
        },
        datebox: {
            init: function (container, options, tabIndex) {
                var input = $('<input type="text" tabIndex="' + tabIndex + '">').appendTo(container);
                input.datebox(options);
                bindEvent(input, options);
                return input;
            },
            destroy: function (target) {
                $(target).datebox('destroy');
            },
            getValue: function (target) {
                return $(target).datebox('getValue');
            },
            setValue: function (target, value) {
                $(target).datebox('setValue', value);
            },
            resize: function (target, width) {
                $(target).datebox('resize', width);
            },
            setEnabled: function (target, e) {
                if (e) $(target).datebox("enable");
                else $(target).datebox("disable");
            }
        },
        combobox: {
            init: function (container, options, tabIndex) {
                var combo = $('<input type="text" tabIndex="' + tabIndex + '">').appendTo(container);
                combo.combobox(options || {});
                return combo;
            },
            destroy: function (target) {
                $(target).combobox('destroy');
            },
            getValue: function (target) {
                return $(target).combobox('getValue');
            },
            setValue: function (target, value, text) {
                $(target).combobox('setValueText', {value: value, text: text});
            },
            resize: function (target, width) {
                $(target).combobox('resize', width)
            },
            setEnabled: function (target, e) {
                if (e) $(target).combobox("enable");
                else $(target).combobox("disable");
            }
        },
        combotree: {
            init: function (container, options, tabIndex) {
                var combo = $('<input type="text" tabIndex="' + tabIndex + '">').appendTo(container);
                combo.combotree(options);
                return combo;
            },
            destroy: function (target) {
                $(target).combotree('destroy');
            },
            getValue: function (target) {
                return $(target).combotree('getValue');
            },
            setValue: function (target, value, text) {
                $(target).combotree('setValueText', {value: value, text: text});
            },
            resize: function (target, width) {
                $(target).combotree('resize', width)
            },
            setEnabled: function (target, e) {
                if (e) $(target).combotree("enable");
                else $(target).combotree("disable");
            }
        }
    };

    $.fn.datagrid.methods = {
        options: function (jq) {
            return getOptions(jq[0]);
        },
        getPanel: function (jq) {
            return $.data(jq[0], 'datagrid').panel;
        },
        getPager: function (jq) {
            return getPager(jq[0]);
        },
        getToolbar: function (jq) {//huangxl 增加返回toolbar的方法
            return $.data(jq[0], "datagrid").panel.find("div.datagrid-toolbar");
        },
        getColumnFields: function (jq, frozen) {
            return getColumnFields(jq[0], frozen);
        },
        getColumnOption: function (jq, field) {
            return getColumnOption(jq[0], field);
        },
        resize: function (jq, param) {
            return jq.each(function () {
                setSize(this, param);
            });
        },
        load: function (jq, params) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = getOptions(this, state);
                opts.pageNumber = 1;
                var pager = getPager(this, state);
                pager.pagination({pageNumber: 1});
                request(this, params, state);
            });
        },
        reload: function (jq, params) {
            return jq.each(function () {
                request(this, params);
            });
        },
        reloadFooter: function (jq, footer) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = state.options;
                var dc = state.dc;

                if (footer) {
                    state.footer = footer;
                }
                if (opts.showFooter) {
                    opts.view.renderFooter.call(opts.view, this, dc.footer2, false, state);
                    opts.view.renderFooter.call(opts.view, this, dc.footer1, true, state);
                    if (opts.view.onAfterRender) {
                        opts.view.onAfterRender.call(opts.view, this, state);
                    }
                    fixRowHeight(this, undefined, undefined, state);
                }
            });
        },
        loading: function (jq) {
            return jq.each(function () {
                loading(this);
            });
        },
        loaded: function (jq) {
            return jq.each(function () {
                loaded(this);
            });
        },
        fitColumns: function (jq) {
            return jq.each(function () {
                fitColumns(this);
            });
        },
        fixColumnSize: function (jq, field) {
            return jq.each(function () {
                fixColumnSize(this, field);
            });
        },
        fixRowHeight: function (jq, index) {
            return jq.each(function () {
                fixRowHeight(this, index);
            });
        },
        autoSizeColumn: function (jq, field) {    // adjusts the column width to fit the contents.
            return jq.each(function () {
                autoSizeColumn(this, field);
            });
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                loadData(this, data);
                initChanges(this);
            });
        },
        getData: function (jq) {
            return $.data(jq[0], 'datagrid').data;
        },
        getRows: function (jq) {
            return $.data(jq[0], 'datagrid').data.rows;
        },
        getRowByIndex: function (jq, index) {
            return $.data(jq[0], 'datagrid').data.rows[index];
        },
        getFooterRows: function (jq) {
            return $.data(jq[0], 'datagrid').footer;
        },
        getRowIndex: function (jq, id) {    // id or row record
            return getRowIndex(jq[0], id);
        },
        getChecked: function (jq) {
            var rr = [];
            var state = $.data(jq[0], 'datagrid');
            var rows = state.data.rows;
            var dc = state.dc;
            dc.body1.add(dc.body2).find("table.datagrid-btable").find('div.datagrid-cell-check input:checked').each(function (rr, rows) {
                var index = $(this).parents('tr.datagrid-row:first').attr('datagrid-row-index');
                rr.push(rows[index]);
            }, [rr, rows]);
            return rr;
        },
        getSelected: function (jq) {
            var rows = getSelectedRows(jq[0]);
            return rows.length > 0 ? rows[0] : null;
        },
        getSelections: function (jq) {
            return getSelectedRows(jq[0]);
        },
        clearSelections: function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var selectedRows = state.selectedRows;
                selectedRows.splice(0, selectedRows.length);
                unselectAll(this, undefined, state);
            });
        },
        selectAll: function (jq) {
            return jq.each(function () {
                selectAll(this);
            });
        },
        unselectAll: function (jq,notCheck) {
            return jq.each(function () {
                unselectAll(this,notCheck);
            });
        },
        selectRow: function (jq, index) {
            return jq.each(function () {
                selectRow(this, index);
            });
        },
        selectRecord: function (jq, id) {
            return jq.each(function () {
                selectRecord(this, id);
            });
        },
        unselectRow: function (jq, index) {
            return jq.each(function () {
                unselectRow(this, index);
            });
        },
        checkRow: function (jq, index) {
            return jq.each(function () {
                checkRow(this, index);
            });
        },
        uncheckRow: function (jq, index) {
            return jq.each(function () {
                uncheckRow(this, index);
            });
        },
        checkAll: function (jq) {
            return jq.each(function () {
                checkAll(this);
            });
        },
        uncheckAll: function (jq) {
            return jq.each(function () {
                uncheckAll(this);
            });
        },
        beginEdit: function (jq, index) {
            return jq.each(function () {
                beginEdit(this, index);
            });
        },
        endEdit: function (jq) {
            return jq.each(function () {
                endEdit(this, false);
            });
        },
        cancelEdit: function (jq) {
            return jq.each(function () {
                endEdit(this, true);
            });
        },
        getEditors: function (jq) {
            return getEditors(jq[0]);
        },
        getEditor: function (jq, field) {    // param: {index:0, field:'name'}
            return getEditor(jq[0], field);
        },
        refreshRow: function (jq, index) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = state.options;
                opts.view.refreshRow.call(opts.view, this, index, state);
            });
        },
        validateRow: function (jq) {
            return validateRow(jq[0]);
        },
        updateRow: function (jq, param) {    // param: {index:1,row:{code:'code1',name:'name1'}}
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = state.options;
                opts.view.updateRow.call(opts.view, this, param.index, param.row, state);
            });
        },
        updateCell: function (jq, param) {    // param: {index:1,row:{code:'code1',name:'name1'}}
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = state.options;
                opts.view.updateCell.call(opts.view, this, param.index, param.field, state);
            });
        },
        appendRow: function (jq, row) {
            return jq.each(function () {
                appendRow(this, row);
            });
        },
        hideEditorTool: function(jq){
            return jq.each(function () {
                hideEditorTool(this);
            });
        },
        insertRow: function (jq, param) {
            return jq.each(function () {
                insertRow(this, param);
            });
        },
        deleteRow: function (jq, index) {
            return jq.each(function () {
                deleteRow(this, index);
            });
        },
        getChanges: function (jq, state) {
            return getChanges(jq[0], state);	// state: inserted,deleted,updated
        },
        acceptChanges: function (jq) {
            return jq.each(function () {
                acceptChanges(this);
            });
        },
        rejectChanges: function (jq) {
            return jq.each(function () {
                rejectChanges(this);
            });
        },
        mergeCells: function (jq, param) {
            return jq.each(function () {
                mergeCells(this, param);
            });
        },
        showColumn: function (jq, field) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var panel = state.panel;
                panel.find('td[field="' + field + '"]').show();
                var col = getColumnOption(this, field, state);
                if (col) {
                    col.hidden = false;
                    fitColumns(this, state);
                }
            });
        },
        hideColumn: function (jq, field) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var panel = state.panel;

                panel.find('td[field="' + field + '"]').hide();
                var col = getColumnOption(this, field, state);
                if (col) {
                    col.hidden = true;
                    fitColumns(this, state);
                }
            });
        },
        fixColumnTitle: function (jq, params) {
            return fixColumnTitle(jq[0], params);
        },
        //获取列宽，返回json对象，格式： {field1: 80, field2:120}
        getColsWidth: function (jq) {
            return getColsWidth(jq[0]);
        },
        //获取列隐藏信息
        getColsHide: function (jq) {
            return getColsHide(jq[0]);
        },

        //获取总页数
        getPageCount: function (jq) {
            var pager = getPager(jq[0]);
            if (pager.length) return pager.pagination('getPageCount');
            return 1;
        },
        //获取总记录数
        getTotalCount: function (jq) {
            return $.data(jq[0], 'datagrid').options.total;
        },
        //动态设置Editor
        setEditor: function (jq, param) {
            setColEditor(jq[0], param)
        },
        isEditing: function (jq) {
            return isEditing(jq[0]);
        },
        search: function (jq, param) {
            return doSearch(jq[0], param);
        },
        refreshGrid: function (jq) {
            return jq.each(function () {
                refreshGrid(this);
            });
        }
    };

    $.fn.datagrid.parseOptions = function (target) {
        var t = $(target);
        var css = t.attr("class") + "";
        if (css.indexOf("easyui-") < 0) return {id: t.attr('id')};
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [
            'url', 'toolbar', 'idField', 'sortName', 'sortOrder', 'pagePosition',
            {fitColumns: 'boolean', autoRowHeight: 'boolean', striped: 'boolean', nowrap: 'boolean'},
            {rownumbers: 'boolean', singleSelect: 'boolean', checkOnSelect: 'boolean', selectOnCheck: 'boolean'},
            {pagination: 'boolean', pageSize: 'number', pageNumber: 'number'},
            {remoteSort: 'boolean', showHeader: 'boolean', showFooter: 'boolean'},
            {scrollbarSize: 'number'}
        ]), {
            pageList: (t.attr('pageList') ? eval(t.attr('pageList')) : undefined),
            loadMsg: (t.attr('loadMsg')),
            rowStyler: (t.attr('rowStyler') ? eval(t.attr('rowStyler')) : undefined)
        });
    };

    var defaultView = {
        render: function (target, container, frozen, state) {
            if (container.length == 0) return;
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var rows = state.data.rows;
            var fields = getColumnFields(target, frozen, state);

            if (frozen) {//固定列，没定义固定列，且也不显示行号，则88
                if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                    return;
                }
            }
            container.children('.datagrid-btable,.datagrid-emptybody').remove();
            if (rows.length > 0) {
                var table = ['<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
                for (var i = 0, len = rows.length; i < len; i++) {
                    // get the class and style attributes for this row
                    //增加不能select的class，因为后面事件进行判断
                    var cls
                    if(opts.canNotSelectRow&&opts.canNotSelectRow.call(target,i,rows[i])){
                        cls = (i % 2 && opts.striped) ? 'class="datagrid-row datagrid-row-alt cannot-select"' : 'class="datagrid-row cannot-select"';
                    }else{
                       cls = (i % 2 && opts.striped) ? 'class="datagrid-row datagrid-row-alt"' : 'class="datagrid-row"';
                    }
                    var styleValue = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
                    var style = styleValue ? 'style="' + styleValue + '"' : '';
//                    var rowId = state.rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + i;
                    table.push('<tr datagrid-row-index="' + i + '" ' + cls + ' ' + style + '>');
                    table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i], state));
                    table.push('</tr>');
                }
                table.push('</tbody></table>');
                container.prepend(table.join(''));
            } else container.prepend('<div class="datagrid-emptybody"/>');
        },

        renderFooter: function (target, container, frozen, state) {
            if (container.length == 0) return;
            if (!state) state = $.data(target, 'datagrid');
            var rows = state.footer || [];
            var fields = getColumnFields(target, frozen, state);
            var table = ['<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>'];

            for (var i = 0, len = rows.length; i < len; i++) {
                table.push('<tr class="datagrid-row" datagrid-row-index="' + i + '">');
                table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i], state));
                table.push('</tr>');
            }

            table.push('</tbody></table>');
            container.html(table.join(''));
        },

        renderEditor: function (target, container, frozen, state) {
            if (container.length == 0) return;
            if (!state) state = $.data(target, 'datagrid');
            var fields = getColumnFields(target, frozen, state);
            var table = ['<table class="datagrid-etable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
            table.push('<tr class="datagrid-row datagrid-row-editing datagrid-row-selected" datagrid-row-index="0">');
            table.push(this.renderRow.call(this, target, fields, frozen, 0, {}, state));
            table.push('</tr></tbody></table>');
            $(table.join('')).appendTo(container);
        },
        attrRowIndex: function (tr, index) {
            tr.attr('datagrid-row-index', index);
        },
        acceptChanges: function (target) {
            acceptChanges(target);
        },
        rejectChanges: function (target) {
            rejectChanges(target);
        },
        renderRow: function (target, fields, frozen, rowIndex, rowData, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var cc = [];
            if (frozen && opts.rownumbers) {
                var rownumber = rowIndex + 1;
                if (opts.pagination) {
                    rownumber += (opts.pageNumber - 1) * opts.pageSize;
                }
                cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + rownumber + '</div></td>');
            }
            for (var i = 0, len = fields.length; i < len; i++) {
                var field = fields[i];
                var col = getColumnOption(target, field, state);
                if (col) {
                    // get the cell style attribute
                    var styleValue = col.styler ? (col.styler(rowData[field], rowData, rowIndex) || '') : '';
                    var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');

                    cc.push('<td field="' + field + '" ' + style + '>');
                    style = '';
                    if (!col.checkbox) {
//						var style = 'width:' + (col.boxWidth) + 'px;';
                        style += 'text-align:' + (col.align || 'left') + ';';

                        if (!opts.nowrap) {
                            style += 'white-space:normal;height:auto;';
                        } else if (opts.autoRowHeight) {
                            style += 'height:auto;';
                        }
                    }
                    cc.push('<div style="' + style + '" ');
                    if (col.checkbox) {
                        cc.push('class="datagrid-cell-check ');
                    } else {
                        cc.push('class="datagrid-cell ' + col.cellClass);
                    }
                    cc.push('">');

                    if (col.checkbox) {
                        if (!col.checkFormatter)
                            cc.push('<input type="checkbox" name="' + field + '" value="' + (rowData[field] != undefined ? rowData[field] : '') + '"/>');
                        else {
                            var custom =  col.checkFormatter.call(col, rowData[field], rowData, rowIndex);
                            if(typeof custom == 'string'){
                                cc.push(custom);
                            }else {
                                var r = $.extend({
                                    visible: true,
                                    checked: false,
                                    enabled: true
                                },custom);

                                if (r.visible) {
                                    var s = '<input type="checkbox" name="' + field + '" value="' + (rowData[field] != undefined ? rowData[field] : '') + '"';
                                    if (r.checked) s += " checked";
                                    if (!r.enabled) s += " disabled";
                                    s += '/>';
                                    cc.push(s);
                                }
                            }
                        }
                    } else if (col.formatter) {
                        cc.push(col.formatter.call(col, rowData[field], rowData, rowIndex));
                    } else {
                        cc.push(rowData[field]);
                    }

                    cc.push('</div>');
                    cc.push('</td>');
                }
            }
            return cc.join('');
        },

        refreshRow: function (target, rowIndex, state) {
            if (!state) state = $.data(target, 'datagrid');
            var row = {};

            var fields = getColumnFields(target, true, state).concat(getColumnFields(target, false, state));
            for (var i = 0, len = fields.length; i < len; i++) {
                row[fields[i]] = undefined;
            }
            var rows = state.data.rows;
            $.extend(row, rows[rowIndex]);
            this.updateRow.call(this, target, rowIndex, row, state);
            var dc = state.dc;
            if(dc) dc.editor2.add(dc.editor1).add(dc.editorTool).hide();
        },

        updateRow: function (target, rowIndex, row, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var styleValue;
            var rows = state.data.rows;

            var tr = opts.finder.getTr(target, rowIndex, rowIndex == state.editing.index ? 'editor' : undefined, undefined, state);
            for (var field in row) {
                rows[rowIndex][field] = row[field];
                var col = getColumnOption(target, field, state);
                if (col) {
                    var td = tr.children('td[field="' + field + '"]');
                    var cell = td.find('div.datagrid-cell');

                    styleValue = col.styler ? col.styler(rows[rowIndex][field], rows[rowIndex], rowIndex) : '';
                    td.attr('style', styleValue || '');
                    if (col.hidden) {
                        td.hide();
                    }

                    if (col.formatter) {
                        cell.html(col.formatter.call(col, rows[rowIndex][field], rows[rowIndex], rowIndex));
                    } else {
                        cell.html(rows[rowIndex][field]);
                    }
                }
            }
            styleValue = opts.rowStyler ? opts.rowStyler.call(target, rowIndex, rows[rowIndex]) : '';
            tr.attr('style', styleValue || '');
            fixRowHeight(target, rowIndex, undefined, state);
        },

        updateCell: function (target, rowIndex, field, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var styleValue;
            var rows = state.data.rows;
            var row = rows[rowIndex];
            var tr = opts.finder.getTr(target, rowIndex, rowIndex == state.editing.index ? 'editor' : undefined, undefined, state);
            var col = getColumnOption(target, field, state);
            if (col) {
                var td = tr.children('td[field="' + field + '"]');
                var cell = td.find('div.datagrid-cell');
                var colVal = row[field];
                styleValue = col.styler ? col.styler(colVal, colVal, rowIndex) : '';
                td.attr('style', styleValue || '');
                if (col.hidden) {
                    td.hide();
                }

                if (col.formatter) {
                    cell.html(col.formatter.call(col, colVal, row, rowIndex));
                } else {
                    cell.html(colVal);
                }
            }

            styleValue = opts.rowStyler ? opts.rowStyler.call(target, rowIndex, row) : '';
            tr.attr('style', styleValue || '');
            fixRowHeight(target, rowIndex, undefined, state);
        },

        insertRow: function (target, index, row, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var dc = state.dc;
            var data = state.data;

            if (index == undefined || index == null || index > data.rows.length) index = data.rows.length;

            for (var i = data.rows.length - 1; i >= index; i--) {
                opts.finder.getTr(target, i, 'body', 2, state).attr('datagrid-row-index', i + 1);
                var tr = opts.finder.getTr(target, i, 'body', 1, state).attr('datagrid-row-index', i + 1);
                if (opts.rownumbers) {
                    tr.find('div.datagrid-cell-rownumber').html(i + 2);
                }
            }

            var fields1 = getColumnFields(target, true, state);
            var fields2 = getColumnFields(target, false, state);
            var tr1 = '<tr class="datagrid-row" datagrid-row-index="' + index + '">' + this.renderRow.call(this, target, fields1, true, index, row, state) + '</tr>';
            var tr2 = '<tr class="datagrid-row" datagrid-row-index="' + index + '">' + this.renderRow.call(this, target, fields2, false, index, row, state) + '</tr>';
            if (index >= data.rows.length) {    // append new row
                if (data.rows.length) {    // not empty
                    opts.finder.getTr(target, '', 'last', 1, state).after(tr1);
                    opts.finder.getTr(target, '', 'last', 2, state).after(tr2);
                } else {
                    dc.body1.add(dc.body2).children('.datagrid-btable,.datagrid-emptybody').remove();
                    dc.body1.prepend('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' + tr1 + '</tbody></table>');
                    dc.body2.prepend('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' + tr2 + '</tbody></table>');
                }
            } else {    // insert new row
                opts.finder.getTr(target, index + 1, 'body', 1, state).before(tr1);
                opts.finder.getTr(target, index + 1, 'body', 2, state).before(tr2);
            }

            data.total += 1;
            data.rows.splice(index, 0, row);
            this.refreshRow.call(this, target, index, state);
            state.editing.insertedIndex = index;
        },

        deleteRow: function (target, index, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            var data = state.data;
            if (data.rows.length > 1) {
                opts.finder.getTr(target, index, undefined, undefined, state).remove();
                for (var i = index + 1, len = data.rows.length; i < len; i++) {
                    opts.finder.getTr(target, i, 'body', 2, state).attr('datagrid-row-index', i - 1);
                    var tr1 = opts.finder.getTr(target, i, 'body', 1, state).attr('datagrid-row-index', i - 1);
                    if (opts.rownumbers) {
                        tr1.find('div.datagrid-cell-rownumber').html(i);
                    }
                }
            } else {
                $('<div class="datagrid-emptybody"/>').width(state.dc.body2.find('table').width()).height(1).appendTo(state.dc.body2);
                opts.finder.getTr(target, index, undefined, undefined, state).remove();
            }
            data.total -= 1;
            data.rows.splice(index, 1);
        },

        onBeforeRender: function (target, rows, state) {
        },
        onAfterRender: function (target, state) {
            if (!state) state = $.data(target, 'datagrid');
            var opts = state.options;
            if (opts.showFooter) {
                var footer = state.panel.find('div.datagrid-footer');
                footer.find('div.datagrid-cell-rownumber,div.datagrid-cell-check').css('visibility', 'hidden');
            }
        }
    };

    $.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
        frozenColumns: undefined,
        columns: undefined,
        fitColumns: false,
        autoRowHeight: true,
        toolbar: null,
        striped: false,
        method: 'post',
        nowrap: true,
        idField: null,
        url: null,
        loadMsg: 'Processing, please wait ...',
        rownumbers: false,
        singleSelect: false,
        selectOnCheck: true,
        checkOnSelect: true,
        pagination: false,
        pagePosition: 'bottom', // top,bottom,both
        pageNumber: 1,
        pageSize: 20,
        pageList: [20, 50, 100],
        queryParams: {},
        sortName: [],
        sortOrder: [],
        sortNumber: new Array("①", "②", "③", "④", "⑤", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"),
        remoteSort: true,
        showHeader: true,
        showFooter: false,
        scrollbarSize: 18,
        canSearch: false, //是否允许搜索
        showSearch: false,
        canHideColumn: false,
        readonly: false, //是否允许编辑,
        showEditorTool: false,
        autoEndEdit: true,//最后一列回车，自动结束编辑
        total: 0,
        searchFields: undefined, //搜索字段，取值：none：不需要区分字段 || auto：显示列 || [{field:'',title:''}]
        onSearch: undefined, //搜索实现，function(grid, fields, value)
        onLastColEnter: undefined,//最后一列回车事件
        hideColComboWidth: 120,
        appendCopyLastRow:false,
        initNotQuery : false, //初始化之后不发送数据查询请求
        rowStyler: function (rowIndex, rowData) {
        }, // return style such as 'background:red'
        loader: function (param, success, error) {
            var opts = getOptions(this);
            if (!opts.url) return false;
            $.ajax({
                type: opts.method,
                url: opts.url,
                data: param,
                dataType: 'json',
                success: function (data) {
                    success(data);
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        loadFilter: function (data) {
            if (typeof data.length == 'number' && typeof data.splice == 'function') {    // is array
                return {
                    total: data.length,
                    rows: data
                };
            } else {
                return data;
            }
        },
        canNotSelectRow: function (rowIndex, rowData) {} ,//function(rowIndex, rowData),用来判断row是否可以select,返回true不可以

        editors: editors,
        finder: {
            getTr: function (target, index, type, serno, state) {
                if (!state) state = $.data(target, 'datagrid');
                type = type || 'body';
                serno = serno || 0;
                var dc = state.dc;	// data container
                var opts = state.options;
                if (serno == 0) {
                    var tr1 = opts.finder.getTr(target, index, type, 1, state);
                    var tr2 = opts.finder.getTr(target, index, type, 2, state);
                    return tr1.add(tr2);
                } else {
                    if (type == 'body') {
//                        var tr = $('#' + state.rowIdPrefix + '-' + serno + '-' + index);
//                        if (!tr.length) {
//                            tr = (serno == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr[datagrid-row-index=' + index + ']');
//                        }
                        return (serno == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr[datagrid-row-index=' + index + ']');
                    } else if (type == 'footer') {
                        return (serno == 1 ? dc.footer1 : dc.footer2).find('>table>tbody>tr[datagrid-row-index=' + index + ']');
                    } else if (type == 'selected') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr.datagrid-row-selected');
                    } else if (type == 'last') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr:last[datagrid-row-index]');
                    } else if (type == 'allbody') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr[datagrid-row-index]');
                    } else if (type == 'allfooter') {
                        return (serno == 1 ? dc.footer1 : dc.footer2).find('>table>tbody>tr[datagrid-row-index]');
                    } else if (type == 'editor') {
                        return (serno == 1 ? dc.editor1 : dc.editor2).find('>table>tbody>tr[datagrid-row-index]');
                    }
                }
            },
            getRow: function (target, index, state) {
                if (!state) state = $.data(target, 'datagrid');
                return state.data.rows[index];
            }
        },
        view: defaultView,

        onBeforeLoad: function (param) {
        },
        onLoadSuccess: function () {
        },
        onLoadError: function () {
        },
        onClickRow: function (rowIndex, rowData) {
        },
        onDblClickRow: function (rowIndex, rowData) {
        },
        onClickCell: function (rowIndex, field, value) {
        },
        onDblClickCell: function (rowIndex, field, value) {
        },
        /*onSortColumn: function (sort, order) {
         },*/
        onResizeColumn: function (field, width) {
        },
        onSelect: function (rowIndex, rowData) {
        },
        onUnselect: function (rowIndex, rowData) {
        },
        onSelectAll: function (rows) {
        },
        onUnselectAll: function (rows) {
        },
        onCheck: function (rowIndex, rowData) {
        },
        onUncheck: function (rowIndex, rowData) {
        },
        onCheckAll: function (rows) {
        },
        onUncheckAll: function (rows) {
        },
        onBeforeEdit: function (rowIndex, rowData) {
        },
        onAfterEdit: function (rowIndex, rowData, changes) {
        },
        onCancelEdit: function (rowIndex, rowData) {
        },
        onEndEdit: function (rowIndex, rowData) {
        },
        onHeaderContextMenu: function (e, field) {
        },
        onRowContextMenu: function (e, rowIndex, rowData) {
        },
        onEditorBtnClick: function (ok) {
            if (ok) endEdit(this, false);
            else endEdit(this, true);
        }
    });
})
    (jQuery);