/**
 * treegrid - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *     datagrid
 *
 */
(function ($) {
    function buildGrid(target, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        $(target).datagrid($.extend({}, opts, {
            url: null,
            loader: function () {
                return false;
            },
            onLoadSuccess: function () {
            },
            onResizeColumn: function (field, width) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                setRowHeight(this);
                opts.onResizeColumn.call(this, field, width);
            },
            doSortColumn: function (sort, order) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.sortName = sort;
                opts.sortOrder = order;
                if (opts.remoteSort) {
                    request(this);
                } else {
                    var data = $(this).treegrid('getData');
                    loadData(this, 0, data);
                }
                opts.onSortColumn.call(this, sort, order);
            },
            onBeforeEdit: function (index, row) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                if (opts.onBeforeEdit.call(this, row) == false) return false;
            },
            onAfterEdit: function (index, row, changes) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onAfterEdit.call(this, row, changes);
            },
            onCancelEdit: function (index, row) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onCancelEdit.call(this, row);
            },
            onSelect: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onSelect.call(this, find(this, index));
            },
            onUnselect: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onUnselect.call(this, find(this, index));
            },
            onSelectAll: function () {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onSelectAll.call(this, state.data);
            },
            onUnselectAll: function () {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onUnselectAll.call(this, state.data);
            },
            onCheck: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onCheck.call(this, find(this, index));
            },
            onUncheck: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onUncheck.call(this, find(this, index));
            },
            onCheckAll: function () {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onCheckAll.call(this, state.data);
            },
            onUncheckAll: function () {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onUncheckAll.call(this, state.data);
            },
            onClickRow: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onClickRow.call(this, find(this, index));
            },
            onDblClickRow: function (index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onDblClickRow.call(this, find(this, index));
            },
            onClickCell: function (index, field) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onClickCell.call(this, field, find(this, index));
            },
            onDblClickCell: function (index, field) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onDblClickCell.call(this, field, find(this, index));
            },
            onRowContextMenu: function (e, index) {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                opts.onContextMenu.call(this, e, find(this, index));
            }
        }));
        if (opts.pagination) {
            var pager = $(target).datagrid('getPager');
            pager.pagination({
                pageNumber: opts.pageNumber,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                onSelectPage: function (pageNum, pageSize) {
                    var target = $('#' + $(this).attr('parentId'))[0];
                    var state = $.data(target, 'treegrid');
                    var opts = state.options;
                    // save the page state
                    opts.pageNumber = pageNum;
                    opts.pageSize = pageSize;

                    request(target);	// request new page data
                }
            });
            opts.pageSize = pager.pagination('options').pageSize;	// repare the pageSize value
        }
    }

    function setRowHeight(target, idValue, dgstate) {
        if (!dgstate) dgstate = $.data(target, 'datagrid');
        var opts = dgstate.options;
        var dc = dgstate.dc;
        if (!dc.body1.is(':empty') && (!opts.nowrap || opts.autoRowHeight)) {
            if (idValue != undefined) {
                var children = getChildren(target, idValue);
                for (var i = 0, len = children.length; i < len; i++) {
                    setHeight(children[i][opts.idField], target, opts);
                }
            }
        }
        $(target).datagrid('fixRowHeight', idValue);

        function setHeight(idValue, target, opts) {
            var tr1 = opts.finder.getTr(target, idValue, 'body', 1);
            var tr2 = opts.finder.getTr(target, idValue, 'body', 2);
            tr1.css('height', '');
            tr2.css('height', '');
            var height = Math.max(tr1.height(), tr2.height());
            tr1.css('height', height);
            tr2.css('height', height);
        }
    }

    function setRowNumbers(target, dgstate, state) {
        if (!dgstate) dgstate = $.data(target, 'datagrid');
        var dc = dgstate.dc;
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        if (!opts.rownumbers) return;
        dc.body1.find('div.datagrid-cell-rownumber').each(function (i) {
            $(this).html(i + 1);
        });
    }

    function bindEvents(target, dgstate) {
        if (!dgstate) dgstate = $.data(target, 'datagrid');
        var dc = dgstate.dc;
        dgstate.clickHandler = $._data(dc.body1.add(dc.body2)[0], 'events').click[0].handler;

        dc.body1.add(dc.body2).bind('mouseover',function (e) {
            var tt = $(e.target);
            var tr = tt.closest('tr.datagrid-row');
            if (!tr.length) {
                return;
            }
            if (tt.hasClass('tree-hit')) {
                tt.hasClass('tree-expanded') ? tt.addClass('tree-expanded-hover') : tt.addClass('tree-collapsed-hover');
            }
            e.stopPropagation();
        }).bind('mouseout',function (e) {
                var tt = $(e.target);
                var tr = tt.closest('tr.datagrid-row');
                if (!tr.length) {
                    return;
                }
                if (tt.hasClass('tree-hit')) {
                    tt.hasClass('tree-expanded') ? tt.removeClass('tree-expanded-hover') : tt.removeClass('tree-collapsed-hover');
                }
                e.stopPropagation();
            }).unbind('click').bind('click', {target: target}, function (e) {
                var tt = $(e.target);
                var tr = tt.closest('tr.datagrid-row');
                if (!tr.length) {
                    return;
                }
                if (tt.hasClass('tree-hit')) {
                    toggle(e.data.target, tr.attr('node-id'));
                } else {
                    var dgstate = $.data(e.data.target, 'datagrid');
                    dgstate.clickHandler(e);
                }
                e.stopPropagation();
            });

    }

    /**
     * create sub tree
     * parentId: the node id value
     */
    function createSubTree(target, parentId, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var tr1 = opts.finder.getTr(target, parentId, 'body', 1);
        var tr2 = opts.finder.getTr(target, parentId, 'body', 2);
        var $target = $(target);
        var colspan1 = $target.datagrid('getColumnFields', true).length + (opts.rownumbers ? 1 : 0);
        var colspan2 = $target.datagrid('getColumnFields', false).length;

        _create(tr1, colspan1);
        _create(tr2, colspan2);

        function _create(tr, colspan) {
            $('<tr class="treegrid-tr-tree">' +
                '<td style="border:0px" colspan="' + colspan + '">' +
                '<div></div>' +
                '</td>' +
                '</tr>').insertAfter(tr);
        }
    }

    /**
     * load data to specified node.
     */
    function loadData(target, parentId, data, append, dgstate, state) {
        if (!state) state = $.data(target, 'treegrid');
        if (!dgstate) dgstate = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = dgstate.dc;
        data = opts.loadFilter.call(target, data, parentId);

        var wrap = dgstate.panel;
        var view = wrap.children('div.datagrid-view');
        var view1 = view.children('div.datagrid-view1');
        var view2 = view.children('div.datagrid-view2');

        var node = find(target, parentId), cc1, cc2;
        if (node) {
            var node1 = opts.finder.getTr(target, parentId, 'body', 1);
            var node2 = opts.finder.getTr(target, parentId, 'body', 2);
            cc1 = node1.next('tr.treegrid-tr-tree').children('td').children('div');
            cc2 = node2.next('tr.treegrid-tr-tree').children('td').children('div');
        } else {
            cc1 = dc.body1;
            cc2 = dc.body2;
        }
        if (!append) {
            state.data = [];
            cc1.add(cc2).children('.datagrid-btable,.datagrid-emptybody').remove();
        }

        if (opts.view.onBeforeRender) {
            opts.view.onBeforeRender.call(opts.view, target, parentId, data);
        }
        opts.view.render.call(opts.view, target, cc1, true);
        opts.view.render.call(opts.view, target, cc2, false);
        if (opts.showFooter) {
            opts.view.renderFooter.call(opts.view, target, dc.footer1, true);
            opts.view.renderFooter.call(opts.view, target, dc.footer2, false);
        }
        if (opts.view.onAfterRender) {
            opts.view.onAfterRender.call(opts.view, target);
        }

        opts.onLoadSuccess.call(target, node, data);

        // reset the pagination
        if (!parentId && opts.pagination) {
            var total = state.total;
            var pager = $(target).datagrid('getPager');
            if (pager.pagination('options').total != total) {
                pager.pagination({total: total});
            }
        }
        setRowHeight(target, undefined, dgstate);
        setRowNumbers(target, dgstate, state);
        $(target).treegrid('autoSizeColumn');
    }

    function request(target, parentId, params, append, callback, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var $target = $(target);
        var body = $target.datagrid('getPanel').find('div.datagrid-body');

        if (params) opts.queryParams = params;
        var param = $.extend({}, opts.queryParams);
        if (opts.pagination) {
            $.extend(param, {
                page: opts.pageNumber,
                rows: opts.pageSize
            });
        }
        if (opts.sortName) {
            $.extend(param, {
                sort: opts.sortName,
                order: opts.sortOrder
            });
        }

        var row = find(target, parentId);

        if (opts.onBeforeLoad.call(target, row, param) == false) return;
//		if (!opts.url) return;

        var folder = body.find('tr[node-id=' + parentId + '] span.tree-folder');
        folder.addClass('tree-loading');
        $target.treegrid('loading');
        var gridId = $target.attr('id');
        var result = opts.loader.call(target, param, function (data) {
            var $target = $('#' + gridId), target = $target[0];
            folder.removeClass('tree-loading');
            $target.treegrid('loaded');
            loadData(target, parentId, data, append);
            if (callback) {
                callback();
            }
        }, function () {
            var $target = $('#' + gridId), target = $target[0];
            folder.removeClass('tree-loading');
            $(target).treegrid('loaded');
            opts.onLoadError.apply(target, arguments);
            if (callback) {
                callback();
            }
        });
        if (result == false) {
            folder.removeClass('tree-loading');
            $target.treegrid('loaded');
        }
    }

    function getRoot(target) {
        var rows = getRoots(target);
        if (rows.length) {
            return rows[0];
        } else {
            return null;
        }
    }

    function getRoots(target, state) {
        if (!state) state = $.data(target, 'treegrid');
        return state.data;
    }

    function getParent(target, idValue) {
        var row = find(target, idValue);
        if (row._parentId) {
            return find(target, row._parentId);
        } else {
            return null;
        }
    }

    function getChildren(target, parentId, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var body = $(target).datagrid('getPanel').find('div.datagrid-view2 div.datagrid-body');
        var nodes = [];
        if (parentId) {
            getNodes(parentId, target, opts, nodes);
        } else {
            var roots = getRoots(target);
            for (var i = 0, len = roots.length; i < len; i++) {
                nodes.push(roots[i]);
                getNodes(roots[i][opts.idField], target, opts, nodes);
            }
        }

        function getNodes(parentId, target, opts, nodes) {
            var pnode = find(target, parentId);
            if (pnode && pnode.children) {
                for (var i = 0, len = pnode.children.length; i < len; i++) {
                    var cnode = pnode.children[i];
                    nodes.push(cnode);
                    getNodes(cnode[opts.idField], target, opts, nodes);
                }
            }
        }

        return nodes;
    }

    function getSelected(target) {
        var rows = getSelections(target);
        if (rows.length) {
            return rows[0];
        } else {
            return null;
        }
    }

    function getSelections(target) {
        var rows = [];
        var panel = $(target).datagrid('getPanel');
        panel.find('div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected').each(function (target) {
            var id = $(this).attr('node-id');
            rows.push(find(target, id));
        }, [target]);
        return rows;
    }

    function getLevel(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        if (!idValue) return 0;
        var opts = state.options;
        var view = $(target).datagrid('getPanel').children('div.datagrid-view');
        var node = view.find('div.datagrid-body tr[node-id=' + idValue + ']').children('td[field=' + opts.treeField + ']');
        return node.find('span.tree-indent,span.tree-hit').length;
    }

    function find(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var data = state.data;
        var cc = [data];
        while (cc.length) {
            var c = cc.shift();
            for (var i = 0, len = c.length; i < len; i++) {
                var node = c[i];
                if (node[opts.idField] == idValue) {
                    return node;
                } else if (node['children']) {
                    cc.push(node['children']);
                }
            }
        }
        return null;
    }

    function collapse(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var row = find(target, idValue);
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find('span.tree-hit');

        if (hit.length == 0) return;	// is leaf
        if (hit.hasClass('tree-collapsed')) return;	// has collapsed
        if (opts.onBeforeCollapse.call(target, row) == false) return;

        hit.removeClass('tree-expanded tree-expanded-hover').addClass('tree-collapsed');
        hit.next().removeClass('tree-folder-open');
        row.state = 'closed';
        tr = tr.next('tr.treegrid-tr-tree');
        var cc = tr.children('td').children('div');
        var $target = $(target);
        if (opts.animate) {
            var gridId = $target.attr('id');
            cc.slideUp('normal', function () {
                var $target = $('#' + gridId), target = $target[0];
                $target.treegrid('autoSizeColumn');
                setRowHeight(target, idValue);
                opts.onCollapse.call(target, row);
            });
        } else {
            cc.hide();
            $target.treegrid('autoSizeColumn');
            setRowHeight(target, idValue);
            opts.onCollapse.call(target, row);
        }
    }

    function expand(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find('span.tree-hit');
        var row = find(target, idValue);

        if (hit.length == 0) return;	// is leaf
        if (hit.hasClass('tree-expanded')) return;	// has expanded
        if (opts.onBeforeExpand.call(target, row) == false) return;

        hit.removeClass('tree-collapsed tree-collapsed-hover').addClass('tree-expanded');
        hit.next().addClass('tree-folder-open');
        var subtree = tr.next('tr.treegrid-tr-tree'), cc;
        if (subtree.length) {
            cc = subtree.children('td').children('div');
            _expand(cc);
        } else {
            createSubTree(target, row[opts.idField]);
            subtree = tr.next('tr.treegrid-tr-tree');
            cc = subtree.children('td').children('div');
            cc.hide();
            request(target, row[opts.idField], {id: row[opts.idField]}, true, function () {
                if (cc.is(':empty')) {
                    subtree.remove();
                } else {
                    _expand(cc);
                }
                subtree = null;
                cc = null;
                opts = null;
            });
        }

        function _expand(cc) {
            row.state = 'open';
            if (opts.animate) {
                cc.slideDown('normal', function () {
                    $(target).treegrid('autoSizeColumn');
                    setRowHeight(target, idValue);
                    opts.onExpand.call(target, row);
                });
            } else {
                cc.show();
                $(target).treegrid('autoSizeColumn');
                setRowHeight(target, idValue);
                opts.onExpand.call(target, row);
            }
        }
    }

    function toggle(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find('span.tree-hit');
        if (hit.hasClass('tree-expanded')) {
            collapse(target, idValue);
        } else {
            expand(target, idValue);
        }
    }

    function collapseAll(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var nodes = getChildren(target, idValue);
        if (idValue) {
            nodes.unshift(find(target, idValue));
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            collapse(target, nodes[i][opts.idField]);
        }
    }

    function expandAll(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var nodes = getChildren(target, idValue);
        if (idValue) {
            nodes.unshift(find(target, idValue));
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            expand(target, nodes[i][opts.idField]);
        }
    }

    function expandTo(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var ids = [];
        var p = getParent(target, idValue);
        while (p) {
            var id = p[opts.idField];
            ids.unshift(id);
            p = getParent(target, id);
        }
        for (var i = 0, len = ids.length; i < len; i++) {
            expand(target, ids[i]);
        }
    }

    function append(target, param, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        if (param.parent) {
            var body = $(target).datagrid('getPanel').find('div.datagrid-body');
            var tr = body.find('tr[node-id=' + param.parent + ']');
            if (tr.next('tr.treegrid-tr-tree').length == 0) {
                createSubTree(target, param.parent);
            }
            var cell = tr.children('td[field=' + opts.treeField + ']').children('div.datagrid-cell');
            var nodeIcon = cell.children('span.tree-icon');
            if (nodeIcon.hasClass('tree-file')) {
                nodeIcon.removeClass('tree-file').addClass('tree-folder');
                var hit = $('<span class="tree-hit tree-expanded"></span>').insertBefore(nodeIcon);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
        }
        loadData(target, param.parent, param.data, true);
    }

    /**
     * remove the specified node
     */
    function remove(target, idValue, state) {
        if (!state) state = $.data(target, 'treegrid');
        var opts = state.options;
        var tr = opts.finder.getTr(target, idValue);
        tr.next('tr.treegrid-tr-tree').remove();
        tr.remove();

        var pnode = del(idValue, target);
        if (pnode) {
            if (pnode.children.length == 0) {
                tr = opts.finder.getTr(target, pnode[opts.idField]);
                tr.next('tr.treegrid-tr-tree').remove();
                var cell = tr.children('td[field=' + opts.treeField + ']').children('div.datagrid-cell');
                cell.find('.tree-icon').removeClass('tree-folder').addClass('tree-file');
                cell.find('.tree-hit').remove();
                $('<span class="tree-indent"></span>').prependTo(cell);
            }
        }

        setRowNumbers(target);

        /**
         * delete the specified node, return its parent node
         */
        function del(id, target) {
            var cc;
            var pnode = getParent(target, idValue);
            if (pnode) {
                cc = pnode.children;
            } else {
                cc = $(target).treegrid('getData');
            }
            for (var i = 0, len = cc.length; i < len; i++) {
                if (cc[i][opts.idField] == id) {
                    cc.splice(i, 1);
                    break;
                }
            }
            return pnode;
        }
    }


    $.fn.treegrid = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.treegrid.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.datagrid(options, param);
            }
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'treegrid');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'treegrid', {
                    options: $.extend({}, $.fn.treegrid.defaults, $.fn.treegrid.parseOptions(this), options),
                    data: []
                });
            }

            buildGrid(this, state);
            request(this);
            bindEvents(this);
        });
    };

    $.fn.treegrid.methods = {
        options: function (jq) {
            return $.data(jq[0], 'treegrid').options;
        },
        resize: function (jq, param) {
            return jq.each(function () {
                $(this).datagrid('resize', param);
            });
        },
        fixRowHeight: function (jq, idValue) {
            return jq.each(function () {
                setRowHeight(this, idValue);
            });
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                loadData(this, null, data);
            });
        },
        reload: function (jq, id) {
            return jq.each(function () {
                if (id) {
                    var node = $(this).treegrid('find', id);
                    if (node.children) {
                        node.children.splice(0, node.children.length);
                    }
                    var body = $(this).datagrid('getPanel').find('div.datagrid-body');
                    var tr = body.find('tr[node-id=' + id + ']');
                    tr.next('tr.treegrid-tr-tree').remove();
                    var hit = tr.find('span.tree-hit');
                    hit.removeClass('tree-expanded tree-expanded-hover').addClass('tree-collapsed');
                    expand(this, id);
                } else {
                    request(this, null, {});
//					request(this);
                }
            });
        },
        reloadFooter: function (jq, footer) {
            return jq.each(function () {
                var state = $.data(this, 'treegrid');
                var opts = state.options;
                var dc = $.data(this, 'datagrid').dc;
                if (footer) {
                    state.footer = footer;
                }
                if (opts.showFooter) {
                    opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
                    opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
                    if (opts.view.onAfterRender) {
                        opts.view.onAfterRender.call(opts.view, this);
                    }
                    $(this).treegrid('fixRowHeight');
                }
            });
        },
        loading: function (jq) {
            return jq.each(function () {
                $(this).datagrid('loading');
            });
        },
        loaded: function (jq) {
            return jq.each(function () {
                $(this).datagrid('loaded');
            });
        },
        getData: function (jq) {
            return $.data(jq[0], 'treegrid').data;
        },
        getFooterRows: function (jq) {
            return $.data(jq[0], 'treegrid').footer;
        },
        getRoot: function (jq) {
            return getRoot(jq[0]);
        },
        getRoots: function (jq) {
            return getRoots(jq[0]);
        },
        getParent: function (jq, id) {
            return getParent(jq[0], id);
        },
        getChildren: function (jq, id) {
            return getChildren(jq[0], id);
        },
        getSelected: function (jq) {
            return getSelected(jq[0]);
        },
        getSelections: function (jq) {
            return getSelections(jq[0]);
        },
        getLevel: function (jq, id) {
            return getLevel(jq[0], id);
        },
        find: function (jq, id) {
            return find(jq[0], id);
        },
        isLeaf: function (jq, id) {
            var opts = $.data(jq[0], 'treegrid').options;
            var tr = opts.finder.getTr(jq[0], id);
            var hit = tr.find('span.tree-hit');
            return hit.length == 0;
        },
        select: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid('selectRow', id);
            });
        },
        unselect: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid('unselectRow', id);
            });
        },
        collapse: function (jq, id) {
            return jq.each(function () {
                collapse(this, id);
            });
        },
        expand: function (jq, id) {
            return jq.each(function () {
                expand(this, id);
            });
        },
        toggle: function (jq, id) {
            return jq.each(function () {
                toggle(this, id);
            });
        },
        collapseAll: function (jq, id) {
            return jq.each(function () {
                collapseAll(this, id);
            });
        },
        expandAll: function (jq, id) {
            return jq.each(function () {
                expandAll(this, id);
            });
        },
        expandTo: function (jq, id) {
            return jq.each(function () {
                expandTo(this, id);
            });
        },
        append: function (jq, param) {
            return jq.each(function () {
                append(this, param);
            });
        },
        remove: function (jq, id) {
            return jq.each(function () {
                remove(this, id);
            });
        },
        refresh: function (jq, id) {
            return jq.each(function () {
                var opts = $.data(this, 'treegrid').options;
                opts.view.refreshRow.call(opts.view, this, id);
            });
        },
        beginEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid('beginEdit', id);
                $(this).treegrid('fixRowHeight', id);
            });
        },
        endEdit: function (jq) {
            return jq.each(function () {
                $(this).datagrid('endEdit');
            });
        },
        cancelEdit: function (jq) {
            return jq.each(function () {
                $(this).datagrid('cancelEdit');
            });
        }
    };

    $.fn.treegrid.parseOptions = function (target) {
        return $.extend({}, $.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, ['treeField', {animate: 'boolean'}]));
    };

    var defaultView = $.extend({}, $.fn.datagrid.defaults.view, {
        render: function (target, container, frozen) {
            var opts = $.data(target, 'treegrid').options;
            var fields = $(target).datagrid('getColumnFields', frozen);
            var rowIdPrefix = $.data(target, 'datagrid').rowIdPrefix;

            if (frozen) {
                if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                    return;
                }
            }

            var view = this;
            var table = getTreeData(target, frozen, this.treeLevel, this.treeNodes);
            $(container).append(table.join(''));

            function getTreeData(target, frozen, depth, children) {
                var table = ['<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
                for (var i = 0; i < children.length; i++) {
                    var row = children[i];
                    if (row.state != 'open' && row.state != 'closed') {
                        row.state = 'open';
                    }

                    var styleValue = opts.rowStyler ? opts.rowStyler.call(target, row) : '';
                    var style = styleValue ? 'style="' + styleValue + '"' : '';
                    var rowId = rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + row[opts.idField];
                    table.push('<tr id="' + rowId + '" class="datagrid-row" node-id=' + row[opts.idField] + ' ' + style + '>');
                    table = table.concat(view.renderRow.call(view, target, fields, frozen, depth, row));
                    table.push('</tr>');

                    if (row.children && row.children.length) {
                        var tt = getTreeData(target, frozen, depth + 1, row.children);
                        var v = row.state == 'closed' ? 'none' : 'block';

                        table.push('<tr class="treegrid-tr-tree"><td style="border:0px" colspan=' + (fields.length + (opts.rownumbers ? 1 : 0)) + '><div style="display:' + v + '">');
                        table = table.concat(tt);
                        table.push('</div></td></tr>');
                    }
                }
                table.push('</tbody></table>');
                return table;
            }
        },
        renderEditor: function (target, container, frozen) {
            if (container.length == 0) return;
            var fields = $(target).datagrid('getColumnFields', frozen);
            var table = ['<table class="datagrid-etable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
            table.push('<tr class="datagrid-row datagrid-row-editing" node-id="">');
            table.push(this.renderRow.call(this, target, fields, frozen, 0, {}));
            table.push('</tr></tbody></table>');
            $(table.join('')).appendTo(container);
        },
        attrRowIndex: function (tr, index) {
            tr.attr('node-id', index);
        },
        acceptChanges: function (target) {
            $(target).treegrid('endEdit');
        },
        rejectChanges: function (target) {
            $(target).treegrid('cancelEdit');
        },

        renderFooter: function (target, container, frozen) {
            var state = $.data(target, 'treegrid');
            var opts = state.options;
            var rows = state.footer || [];
            var fields = $(target).datagrid('getColumnFields', frozen);

            var table = ['<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>'];

            for (var i = 0, len = rows.length; i < len; i++) {
                var row = rows[i];
                row[opts.idField] = row[opts.idField] || ('foot-row-id' + i);

                table.push('<tr class="datagrid-row" node-id=' + row[opts.idField] + '>');
                table.push(this.renderRow.call(this, target, fields, frozen, 0, row));
                table.push('</tr>');
            }

            table.push('</tbody></table>');
            $(container).html(table.join(''));
        },

        renderRow: function (target, fields, frozen, depth, row) {
            var opts = $.data(target, 'treegrid').options;

            var cc = [];
            if (frozen && opts.rownumbers) {
                cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">0</div></td>');
            }
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var col = $(target).datagrid('getColumnOption', field);
                if (col) {
                    // get the cell style attribute
                    var styleValue = col.styler ? (col.styler(row[field], row) || '') : '';
                    var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');

                    cc.push('<td field="' + field + '" ' + style + '>');

                    if (col.checkbox) {
                        style = '';
                    } else {
                        style = '';
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
                        if (row.checked) {
                            cc.push('<input type="checkbox" checked="checked"');
                        } else {
                            cc.push('<input type="checkbox"');
                        }
                        cc.push(' name="' + field + '" value="' + (row[field] != undefined ? row[field] : '') + '"/>');
                    } else {
                        var val = null;
                        if (col.formatter) {
                            val = col.formatter(row[field], row);
                        } else {
                            val = row[field];
//							val = row[field] || '&nbsp;';
                        }
                        if (field == opts.treeField) {
                            for (var j = 0; j < depth; j++) {
                                cc.push('<span class="tree-indent"></span>');
                            }
                            if (row.state == 'closed') {
                                cc.push('<span class="tree-hit tree-collapsed"></span>');
                                cc.push('<span class="tree-icon tree-folder ' + (row.iconCls ? row.iconCls : '') + '"></span>');
                            } else {
                                if (row.children && row.children.length) {
                                    cc.push('<span class="tree-hit tree-expanded"></span>');
                                    cc.push('<span class="tree-icon tree-folder tree-folder-open ' + (row.iconCls ? row.iconCls : '') + '"></span>');
                                } else {
                                    cc.push('<span class="tree-indent"></span>');
                                    cc.push('<span class="tree-icon tree-file ' + (row.iconCls ? row.iconCls : '') + '"></span>');
                                }
                            }
                            cc.push('<span class="tree-title">' + val + '</span>');
                        } else {
                            cc.push(val);
                        }
                    }

                    cc.push('</div>');
                    cc.push('</td>');
                }
            }
            return cc.join('');
        },

        refreshRow: function (target, id) {
            var row = $(target).treegrid('find', id);
            var opts = $.data(target, 'treegrid').options;

            var styleValue = opts.rowStyler ? opts.rowStyler.call(target, row) : '';
            var style = styleValue ? styleValue : '';
            var tr = opts.finder.getTr(target, id);
            tr.attr('style', style);
            tr.children('td').each(function () {
                var cell = $(this).find('div.datagrid-cell');
                var field = $(this).attr('field');
                var col = $(target).datagrid('getColumnOption', field);
                if (col) {
                    var styleValue = col.styler ? (col.styler(row[field], row) || '') : '';
                    var style = col.hidden ? 'display:none;' + styleValue : (styleValue ? styleValue : '');
                    $(this).attr('style', style);

                    var val = null;
                    if (col.formatter) {
                        val = col.formatter(row[field], row);
                    } else {
                        val = row[field];
//						val = row[field] || '&nbsp;';
                    }
                    if (field == opts.treeField) {
                        cell.children('span.tree-title').html(val);
                        var cls = 'tree-icon';
                        var icon = cell.children('span.tree-icon');
                        if (icon.hasClass('tree-folder')) cls += ' tree-folder';
                        if (icon.hasClass('tree-folder-open')) cls += ' tree-folder-open';
                        if (icon.hasClass('tree-file')) cls += ' tree-file';
                        if (row.iconCls) cls += ' ' + row.iconCls;
                        icon.attr('class', cls);
                    } else {
                        cell.html(val);
                    }
                }
            });
            $(target).treegrid('fixRowHeight', id);
        },

        onBeforeRender: function (target, parentId, data) {
            if (!data) return false;
            var state = $.data(target, 'treegrid');
            var opts = state.options;
            if (data.length == undefined) {
                if (data.footer) {
                    state.footer = data.footer;
                }
                if (data.total) {
                    state.total = data.total;
                }
                data = this.transfer(target, parentId, data.rows);
            } else {
                function setParent(children, parentId) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var row = children[i];
                        row._parentId = parentId;
                        if (row.children && row.children.length) {
                            setParent(row.children, row[opts.idField]);
                        }
                    }
                }

                setParent(data, parentId);
            }

            var node = find(target, parentId);
            if (node) {
                if (node.children) {
                    node.children = node.children.concat(data);
                } else {
                    node.children = data;
                }
            } else {
                state.data = state.data.concat(data);
            }
            if (!opts.remoteSort) {
                this.sort(target, data);
            }

            this.treeNodes = data;
            this.treeLevel = $(target).treegrid('getLevel', parentId);
        },

        sort: function (target, data) {
            var opts = $.data(target, 'treegrid').options;
            var opt = $(target).treegrid('getColumnOption', opts.sortName);
            if (opt) {
                var sortFunc = opt.sorter || function (a, b) {
                    return (a > b ? 1 : -1);
                };
                _sort(data, opts);
            }
            function _sort(rows, opts) {
                rows.sort(function (r1, r2) {
                    return sortFunc(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == 'asc' ? 1 : -1);
                });
                for (var i = 0, len = rows.length; i < len; i++) {
                    var children = rows[i].children;
                    if (children && children.length) {
                        _sort(children, opts);
                    }
                }
            }
        },

        transfer: function (target, parentId, data) {
            var opts = $.data(target, 'treegrid').options;

            // clone the original data rows
            var rows = [], i, len;
            for (i = 0, len = data.length; i < len; i++) {
                rows.push(data[i]);
            }

            var nodes = [], row;
            // get the top level nodes
            for (i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                if (!parentId) {
                    if (!row._parentId) {
                        nodes.push(row);
//						rows.remove(row);
                        removeArrayItem(rows, row);
                        len--;
                        i--;
                    }
                } else {
                    if (row._parentId == parentId) {
                        nodes.push(row);
//						rows.remove(row);
                        removeArrayItem(rows, row);
                        len--;
                        i--;
                    }
                }
            }

            var toDo = [];
            for (i = 0, len = nodes.length; i < len; i++) {
                toDo.push(nodes[i]);
            }
            while (toDo.length) {
                var node = toDo.shift();	// the parent node
                // get the children nodes
                for (i = 0, len = rows.length; i < len; i++) {
                    row = rows[i];
                    if (row._parentId == node[opts.idField]) {
                        if (node.children) {
                            node.children.push(row);
                        } else {
                            node.children = [row];
                        }
                        toDo.push(row);
//						rows.remove(row);
                        removeArrayItem(rows, row);
                        i--;
                        len--;
                    }
                }
            }
            return nodes;
        }
    });

    $.fn.treegrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        treeField: null,
        animate: false,
        singleSelect: true,
        view: defaultView,
        loader: function (param, success, error) {
            var opts = $(this).treegrid('options');
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
        loadFilter: function (data, parentId) {
            return data;
        },
        finder: {
            getTr: function (target, id, type, serno) {
                type = type || 'body';
                serno = serno || 0;
                var dc = $.data(target, 'datagrid').dc;	// data container
                if (serno == 0) {
                    var opts = $.data(target, 'treegrid').options;
                    var tr1 = opts.finder.getTr(target, id, type, 1);
                    var tr2 = opts.finder.getTr(target, id, type, 2);
                    return tr1.add(tr2);
                } else {
                    if (type == 'body') {
                        var tr = $('#' + $.data(target, 'datagrid').rowIdPrefix + '-' + serno + '-' + id);
                        if (!tr.length) {
                            tr = (serno == 1 ? dc.body1 : dc.body2).find('tr[node-id=' + id + ']');
                        }
                        return tr;
                    } else if (type == 'footer') {
                        return (serno == 1 ? dc.footer1 : dc.footer2).find('tr[node-id=' + id + ']');
                    } else if (type == 'selected') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('tr.datagrid-row-selected');
                    } else if (type == 'last') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('tr:last[node-id]');
                    } else if (type == 'allbody') {
                        return (serno == 1 ? dc.body1 : dc.body2).find('tr[node-id]');
                    } else if (type == 'allfooter') {
                        return (serno == 1 ? dc.footer1 : dc.footer2).find('tr[node-id]');
                    } else if (type == 'editor') {
                        return (serno == 1 ? dc.editor1 : dc.editor2).find('>table>tbody>tr[node-id]');
                    }
                }
            },
            getRow: function (target, id) {
                return $(target).treegrid('find', id);
            }
        },

        onBeforeLoad: function (row, param) {
        },
        onLoadSuccess: function (row, data) {
        },
        onLoadError: function () {
        },
        onBeforeCollapse: function (row) {
        },
        onCollapse: function (row) {
        },
        onBeforeExpand: function (row) {
        },
        onExpand: function (row) {
        },
        onClickRow: function (row) {
        },
        onDblClickRow: function (row) {
        },
        onClickCell: function (field, row) {
        },
        onDblClickCell: function (field, row) {
        },
        onContextMenu: function (e, row) {
        },
        onBeforeEdit: function (row) {
        },
        onAfterEdit: function (row, changes) {
        },
        onCancelEdit: function (row) {
        }
    });
})(jQuery);