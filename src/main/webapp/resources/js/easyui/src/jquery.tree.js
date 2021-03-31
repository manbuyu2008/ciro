/**
 * tree - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      draggable
 *   droppable
 *
 * Node is a javascript object which contains following properties:
 * 1 id: An identity value bind to the node.
 * 2 text: Text to be showed.
 * 3 checked: Indicate whether the node is checked selected.
 * 3 attributes: Custom attributes bind to the node.
 * 4 target: Target DOM object.
 */
(function ($) {
    /**
     * wrap the <ul> tag as a tree and then return it.
     */
    function wrapTree(target) {
        var tree = $(target);
        tree.addClass('tree');
        return tree;
    }

    function parseTreeData(target) {
        var data = [];

        getData(data, $(target));

        function getData(aa, tree) {
            tree.children('li').each(function () {
                var node = $(this);
                var item = $.extend({}, $.parser.parseOptions(this, ['id', 'iconCls', 'state']), {
                    checked: (node.prop('checked') ? true : undefined)
                });

                item.text = node.children('span').html();
                if (!item.text) {
                    item.text = node.html();
                }

                var subTree = node.children('ul');
                if (subTree.length) {
                    item.children = [];
                    getData(item.children, subTree);
                }
                aa.push(item);
            });
        }

        return data;
    }

    function bindTreeEvents(target, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;
        var tree = state.tree;

        $('div.tree-node', tree).unbind('.tree').bind('dblclick.tree', {target: target},function (e) {
            var target = e.data.target;
            selectNode(target, this);
            opts.onDblClick.call(target, getSelectedNode(target));
        }).bind('click.tree', {target: target},function (e) {
                var target = e.data.target;
                selectNode(target, this);
                opts.onClick.call(target, getSelectedNode(target));
                /*** Liuh fix 2013/12/13 根据业务部门要求若是多选,也可以通过节点选中 ***/
                if (state.options.multiple) {
                    var ck = $(this).find('.tree-checkbox');
                    if (ck.length) {
                        checkNode(target, this, !ck.hasClass('tree-checkbox1'));
                    }
                }
                /*** END ***/
            }).bind('mouseenter.tree',function () {
                $(this).addClass('tree-node-hover');
                return false;
            }).bind('mouseleave.tree',function () {
                $(this).removeClass('tree-node-hover');
                return false;
            }).bind('contextmenu.tree', {target: target}, function (e) {
                var target = e.data.target;
                var opts = $.data(target, 'tree').options;
                opts.onContextMenu.call(target, e, getNode(target, this));
            });

        $('span.tree-hit', tree).unbind('.tree').bind('click.tree', {target: target},function (e) {
            var node = $(this).parent();
            toggleNode(e.data.target, node[0]);
            return false;
        }).bind('mouseenter.tree',function () {
                var t = $(this);
                if (t.hasClass('tree-expanded')) {
                    t.addClass('tree-expanded-hover');
                } else {
                    t.addClass('tree-collapsed-hover');
                }
            }).bind('mouseleave.tree',function () {
                var t = $(this);
                if (t.hasClass('tree-expanded')) {
                    t.removeClass('tree-expanded-hover');
                } else {
                    t.removeClass('tree-collapsed-hover');
                }
            }).bind('mousedown.tree', function () {
                return false;
            });

        $('span.tree-checkbox', tree).unbind('.tree').bind('click.tree', {target: target},function (e) {
            var t = $(this);
            var node = t.parent();
            checkNode(e.data.target, node[0], !t.hasClass('tree-checkbox1'));
            return false;
        }).bind('mousedown.tree', function () {
                return false;
            });
    }

    function disableDnd(target) {
        var nodes = $(target).find('div.tree-node');
        nodes.draggable('disable');
        nodes.css('cursor', 'pointer');
    }

    function enableDnd(target, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;
        var tree = state.tree;

        tree.find('div.tree-node').draggable({
            disabled: false,
            revert: true,
            cursor: 'pointer',
            proxy: function (source) {
                var p = $('<div class="tree-node-proxy tree-dnd-no"></div>').appendTo('body');
                p.html($(source).find('.tree-title').html());
                p.hide();
                return p;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function (e) {
                if (e.which != 1) return false;
                $(this).next('ul').find('div.tree-node').droppable({accept: 'no-accept'});	// the child node can't be dropped
                var indent = $(this).find('span.tree-indent');
                if (indent.length) {
                    e.data.startLeft += indent.length * indent.width();
                }
            },
            onStartDrag: function () {
                $(this).draggable('proxy').css({
                    left: -10000,
                    top: -10000
                });
            },
            onDrag: function (e) {
                var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 3) {	// when drag a little distance, show the proxy object
                    $(this).draggable('proxy').show();
                }
                this.pageY = e.pageY;
            },
            onStopDrag: function () {
                $(this).next('ul').find('div.tree-node').droppable({accept: 'div.tree-node'}); // restore the accept property of child nodes
            }
        }).droppable({
                accept: 'div.tree-node',
                onDragOver: function (e, source) {
                    var t = $(this);
                    var pageY = source.pageY;
                    var top = t.offset().top;
                    var bottom = top + t.outerHeight();

                    $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');
                    t.removeClass('tree-node-append tree-node-top tree-node-bottom');
                    if (pageY > top + (bottom - top) / 2) {
                        if (bottom - pageY < 5) {
                            t.addClass('tree-node-bottom');
                        } else {
                            t.addClass('tree-node-append');
                        }
                    } else {
                        if (pageY - top < 5) {
                            t.addClass('tree-node-top');
                        } else {
                            t.addClass('tree-node-append');
                        }
                    }
                },
                onDragLeave: function (e, source) {
                    $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');
                    $(this).removeClass('tree-node-append tree-node-top tree-node-bottom');
                },
                onDrop: function (e, source) {
                    var dest = this, t = $(this);
                    var action, point;
                    if (t.hasClass('tree-node-append')) {
                        action = append;
                    } else {
                        action = insert;
                        point = t.hasClass('tree-node-top') ? 'top' : 'bottom';
                    }

                    setTimeout(function () {
                        action(source, dest, point);
                    }, 0);

                    t.removeClass('tree-node-append tree-node-top tree-node-bottom');
                }
            });

        function append(source, dest, state) {
            if (getNode(target, dest).state == 'closed') {
                expandNode(target, dest, function () {
                    doAppend();
                }, state);
            } else {
                doAppend();
            }

            function doAppend() {
                var t = $(target);
                var node = t.tree('pop', source);
                t.tree('append', {
                    parent: dest,
                    data: [node]
                });
                opts.onDrop.call(target, dest, node, 'append');
            }
        }

        function insert(source, dest, point) {
            var param = {}, t = $(target);
            if (point == 'top') {
                param.before = dest;
            } else {
                param.after = dest;
            }

            var node = t.tree('pop', source);
            param.data = node;
            t.tree('insert', param);
            opts.onDrop.call(target, dest, node, point);
        }
    }

    function checkNode(target, nodeEl, checked, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;
        if (!opts.checkbox) return;
        var node = $(nodeEl);
        var ck = node.find('.tree-checkbox');
        ck.removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2');
        if (checked) {
            ck.addClass('tree-checkbox1');
        } else {
            ck.addClass('tree-checkbox0');
        }
        if (opts.cascadeCheck) {
            setParentCheckbox(node);
            setChildCheckbox(node);
        }

        var nodedata = getNode(target, nodeEl);
        opts.onCheck.call(target, nodedata, checked);

        function setChildCheckbox(node) {
            var childck = node.next().find('.tree-checkbox');
            childck.removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2');
            if (node.find('.tree-checkbox').hasClass('tree-checkbox1')) {
                childck.addClass('tree-checkbox1');
            } else {
                childck.addClass('tree-checkbox0');
            }
        }

        function setParentCheckbox(node) {
            var pnode = getParentNode(target, node[0]);
            if (pnode) {
                var ck = $(pnode.target).find('.tree-checkbox');
                ck.removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2');
                if (isAllSelected(node)) {
                    ck.addClass('tree-checkbox1');
                } else if (isAllNull(node)) {
                    ck.addClass('tree-checkbox0');
                } else {
                    ck.addClass('tree-checkbox2');
                }
                setParentCheckbox($(pnode.target));
            }

            function isAllSelected(n) {
                var ck = n.find('.tree-checkbox');
                if (ck.hasClass('tree-checkbox0') || ck.hasClass('tree-checkbox2')) return false;
                var b = true;
                n.parent().siblings().each(function () {
                    if (!$(this).children('div.tree-node').children('.tree-checkbox').hasClass('tree-checkbox1')) {
                        b = false;
                    }
                });
                return b;
            }

            function isAllNull(n) {
                var ck = n.find('.tree-checkbox');
                if (ck.hasClass('tree-checkbox1') || ck.hasClass('tree-checkbox2')) return false;
                var b = true;
                n.parent().siblings().each(function () {
                    if (!$(this).children('div.tree-node').children('.tree-checkbox').hasClass('tree-checkbox0')) {
                        b = false;
                    }
                });
                return b;
            }
        }
    }

    /**
     * when append or remove node, adjust its parent node check status.
     */
    function adjustCheck(target, nodeEl, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;
        var node = $(nodeEl);
        if (isLeaf(target, nodeEl)) {
            var ck = node.find('.tree-checkbox');
            if (ck.length) {
                if (ck.hasClass('tree-checkbox1')) {
                    checkNode(target, nodeEl, true, state);
                } else {
                    checkNode(target, nodeEl, false, state);
                }
            } else if (opts.onlyLeafCheck) {
                $('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(node.find('.tree-title'));
                bindTreeEvents(target, state);
            }
        } else {
            var ck = node.find('.tree-checkbox');
            if (opts.onlyLeafCheck) {
                ck.remove();
            } else {
                if (ck.hasClass('tree-checkbox1')) {
                    checkNode(target, nodeEl, true, state);
                } else if (ck.hasClass('tree-checkbox2')) {
                    var allchecked = true;
                    var allunchecked = true;
                    var children = getChildren(target, nodeEl);
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children[i].checked) {
                            allunchecked = false;
                        } else {
                            allchecked = false;
                        }
                    }
                    if (allchecked) {
                        checkNode(target, nodeEl, true, state);
                    }
                    if (allunchecked) {
                        checkNode(target, nodeEl, false, state);
                    }
                }
            }
        }
    }

    /**
     * load tree data to <ul> tag
     * ul: the <ul> dom element
     * data: array, the tree node data
     * append: defines if to append data
     */
    function loadData(target, ul, data, append, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;
        var $ul = $(ul);
        data = opts.loadFilter.call(target, data, $ul.prev('div.tree-node')[0]);

        if (!append) {
            $ul.empty();
        }

        var checkedNodes = [];
        var depth = $ul.prev('div.tree-node').find('span.tree-indent, span.tree-hit').length;
        myappendNodes(ul, data, depth);
        bindTreeEvents(target, state);
        if (opts.dnd) {
            enableDnd(target, state);
        } else {
            disableDnd(target);
        }
//		makeDnD(target);

        for (var i = 0, len = checkedNodes.length; i < len; i++) {
            checkNode(target, checkedNodes[i], true, state);
        }

        setTimeout(function () {
            showLines(target, target);
        }, 0);

        var nodedata = null;
        if (target != ul) {
            var node = $ul.prev();
            nodedata = getNode(target, node[0]);
        }
        opts.onLoadSuccess.call(target, nodedata, data);

        function myappendNodes(ul, children, depth) {
            for (var i = 0, len = children.length; i < len; i++) {
                var li = $('<li></li>').appendTo(ul);
                var item = children[i];

                // the node state has only 'open' or 'closed' attribute
                if (item.state != 'open' && item.state != 'closed') {
                    item.state = 'open';
                }
                var s;
                if (item.id && item.id != '') s = '<div class="tree-node" node-id="' + item.id + '"></div>';
                else s = '<div class="tree-node"></div>';
                var node = $(s).appendTo(li);

                // store node attributes
                $.data(node[0], 'tree-node', {
                    id: item.id,
                    text: item.text,
                    iconCls: item.iconCls,
                    attributes: item.attributes
                });

                var sa = [];
                sa.push('<span class="tree-title">' + item.text + '</span>');

                if (opts.checkbox) {
                    if (opts.onlyLeafCheck) {
                        if (item.state == 'open' && (!item.children || !item.children.length)) {
                            if (item.checked) {
                                sa.splice(0, 0, '<span class="tree-checkbox tree-checkbox1"></span>');
                            } else {
                                sa.splice(0, 0, '<span class="tree-checkbox tree-checkbox0"></span>');
                            }
                        }
                    } else {
                        if (item.checked) {
                            sa.splice(0, 0, '<span class="tree-checkbox tree-checkbox1"></span>');
                            checkedNodes.push(node[0]);
                        } else {
                            sa.splice(0, 0, '<span class="tree-checkbox tree-checkbox0"></span>');
                        }
                    }
                }

                if (item.children && item.children.length) {
                    var subul = $('<ul></ul>').appendTo(li);
                    if (item.iconCls == undefined) item.iconCls = '';
                    if (item.state == 'open') {
                        /*$('<span class="tree-icon tree-folder tree-folder-open"></span>').addClass(item.iconCls).prependTo(node);
                         $('<span class="tree-hit tree-expanded"></span>').prependTo(node);*/
                        sa.splice(0, 0, '<span class="tree-hit tree-expanded"></span><span class="tree-icon tree-folder tree-folder-open ' + item.iconCls + '"></span>');
                    } else {
                        /*$('<span class="tree-icon tree-folder"></span>').addClass(item.iconCls).prependTo(node);
                         $('<span class="tree-hit tree-collapsed"></span>').prependTo(node);*/
                        sa.splice(0, 0, '<span class="tree-hit tree-collapsed"></span><span class="tree-icon tree-folder ' + item.iconCls + '"></span>');
                        subul.css('display', 'none');
                    }
                    $(sa.join('')).appendTo(node);
                    myappendNodes(subul, item.children, depth + 1);
                } else {
                    if (item.state == 'closed') {
                        /*$('<span class="tree-icon tree-folder"></span>').addClass(item.iconCls).prependTo(node);
                         $('<span class="tree-hit tree-collapsed"></span>').prependTo(node);*/
                        sa.splice(0, 0, '<span class="tree-hit tree-collapsed"></span><span class="tree-icon tree-folder ' + item.iconCls + '"></span>');
                    } else {
                        /*$('<span class="tree-icon tree-file"></span>').addClass(item.iconCls).prependTo(node);
                         $('<span class="tree-indent"></span>').prependTo(node);*/
                        sa.splice(0, 0, '<span class="tree-indent"></span><span class="tree-icon tree-file ' + item.iconCls + '"></span>');
                    }
                    $(sa.join('')).appendTo(node);
                }
                sa = [];
                /*for (var j = 0, lj = depth; j < lj; j++) {
                    sa.push('<span class="tree-indent"></span>');
                }*/
                if (sa.length > 0) $(sa.join('')).prependTo(node);
            }
        }
    }

    /**
     * draw tree lines
     */
    function showLines(target, ul, called, state) {
        //huangxl：动态创建树时，前次未渲染完，立即删除会报错
        if (!state) state = $.data(target, 'tree');
        if (!state) return;
        var opts = state.options;
        if (!opts.lines) return;

        if (!called) {
            called = true;
            var $target = $(target);
            $target.find('span.tree-indent').removeClass('tree-line tree-join tree-joinbottom');
            $target.find('div.tree-node').removeClass('tree-node-last tree-root-first tree-root-one');
            var roots = $target.tree('getRoots');
            if (roots.length > 1) {
                $(roots[0].target).addClass('tree-root-first');
            } else {
                $(roots[0].target).addClass('tree-root-one');
            }
        }
        var $ul = $(ul);
        $ul.children('li').each(function () {
            var $this = $(this);
            var node = $this.children('div.tree-node');
            var ul = node.next('ul');
            if (ul.length) {
                if ($this.next().length) {
                    _line(node);
                }
                showLines(target, ul, called, state);
            } else {
                _join(node);
            }
        });
        var lastNode = $ul.children('li:last').children('div.tree-node').addClass('tree-node-last');
        lastNode.children('span.tree-join').removeClass('tree-join').addClass('tree-joinbottom');

        function _join(node, hasNext) {
            var icon = node.find('span.tree-icon');
            icon.prev('span.tree-indent').addClass('tree-join');
        }

        function _line(node) {
            var depth = node.find('span.tree-indent, span.tree-hit').length;
            node.next().find('div.tree-node').each(function () {
                $(this).children('span:eq(' + (depth - 1) + ')').addClass('tree-line');
            });
        }
    }

    /**
     * request remote data and then load nodes in the <ul> tag.
     * ul: the <ul> dom element
     * param: request parameter
     */
    function request(target, ul, param, callback, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options;

        param = param || {};

        var nodedata = null, $ul = $(ul);
        if (target != ul) {
            var node = $ul.prev();
            nodedata = getNode(target, node[0]);
        }

        if (opts.onBeforeLoad.call(target, nodedata, param) == false) return;

        var folder = $ul.prev().children('span.tree-folder');
        folder.addClass('tree-loading');
        var result = opts.loader.call(target, param, function (data) {
            folder.removeClass('tree-loading');
            loadData(target, ul, data, undefined, state);
            if (callback) {
                callback();
            }
        }, function () {
            folder.removeClass('tree-loading');
            opts.onLoadError.apply(target, arguments);
            if (callback) {
                callback();
            }
        });
        if (result == false) {
            folder.removeClass('tree-loading');
        }
    }

    function expandNode(target, nodeEl, callback, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options, $nodeEl = $(nodeEl);

        var hit = $nodeEl.children('span.tree-hit');
        if (hit.length == 0) return;	// is a leaf node
        if (hit.hasClass('tree-expanded')) return;	// has expanded

        var node = getNode(target, nodeEl);
        if (opts.onBeforeExpand.call(target, node) == false) return;

        hit.removeClass('tree-collapsed tree-collapsed-hover').addClass('tree-expanded');
        hit.next().addClass('tree-folder-open');
        var ul = $nodeEl.next();
        if (ul.length) {
            if (opts.animate) {
                ul.slideDown('normal', function () {
                    opts.onExpand.call(target, node);
                    if (callback) callback();
                });
            } else {
                ul.css('display', 'block');
                opts.onExpand.call(target, node);
                if (callback) callback();
            }
        } else {
            var subul = $('<ul style="display:none"></ul>').insertAfter(nodeEl);
            // request children nodes data
            request(target, subul[0], {id: node.id}, function () {
                if (subul.is(':empty')) {
                    subul.remove();	// if load children data fail, remove the children node container
                }
                if (opts.animate) {
                    subul.slideDown('normal', function () {
                        opts.onExpand.call(target, node);
                        if (callback) callback();
                    });
                } else {
                    subul.css('display', 'block');
                    opts.onExpand.call(target, node);
                    if (callback) callback();
                }
            }, state);
        }
    }

    function collapseNode(target, nodeEl, state) {
        if (!state) state = $.data(target, 'tree');
        var opts = state.options, $nodeEl = $(nodeEl);

        var hit = $nodeEl.children('span.tree-hit');
        if (hit.length == 0) return;	// is a leaf node
        if (hit.hasClass('tree-collapsed')) return;	// has collapsed

        var node = getNode(target, nodeEl);
        if (opts.onBeforeCollapse.call(target, node) == false) return;

        hit.removeClass('tree-expanded tree-expanded-hover').addClass('tree-collapsed');
        hit.next().removeClass('tree-folder-open');
        var ul = $nodeEl.next();
        if (opts.animate) {
            ul.slideUp('normal', function () {
                opts.onCollapse.call(target, node);
            });
        } else {
            ul.css('display', 'none');
            opts.onCollapse.call(target, node);
        }
    }

    function toggleNode(target, nodeEl) {
        var hit = $(nodeEl).children('span.tree-hit');
        if (hit.length == 0) return;	// is a leaf node

        if (hit.hasClass('tree-expanded')) {
            collapseNode(target, nodeEl);
        } else {
            expandNode(target, nodeEl);
        }
    }

    function expandAllNode(target, nodeEl) {
        var state = $.data(target, 'tree');
        var nodes = getChildren(target, nodeEl);
        if (nodeEl) {
            nodes.unshift(getNode(target, nodeEl));
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            expandNode(target, nodes[i].target, undefined, state);
        }
    }

    function expandToNode(target, nodeEl) {
        var state = $.data(target, 'tree');
        var nodes = [];
        var p = getParentNode(target, nodeEl);
        while (p) {
            nodes.unshift(p);
            p = getParentNode(target, p.target);
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            expandNode(target, nodes[i].target, undefined, state);
        }
    }

    function collapseAllNode(target, nodeEl) {
        var state = $.data(target, 'tree');
        var nodes = getChildren(target, nodeEl);
        if (nodeEl) {
            nodes.unshift(getNode(target, nodeEl));
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            collapseNode(target, nodes[i].target, state);
        }
    }

    /**
     * get the first root node, if no root node exists, return null.
     */
    function getRootNode(target) {
        var roots = getRootNodes(target);
        if (roots.length) {
            return roots[0];
        } else {
            return null;
        }
    }

    /**
     * get the root nodes.
     */
    function getRootNodes(target) {
        var roots = [];
        $(target).children('li').each(function () {
            var node = $(this).children('div.tree-node');
            roots.push(getNode(target, node[0]));
        });
        return roots;
    }

    /**
     * get all child nodes corresponding to specified node
     * nodeEl: the node DOM element
     */
    function getChildren(target, nodeEl) {
        var nodes = [];
        if (nodeEl) {
            getNodes($(nodeEl));
        } else {
            var roots = getRootNodes(target);
            for (var i = 0, len = roots.length; i < len; i++) {
                nodes.push(roots[i]);
                getNodes($(roots[i].target));
            }
        }
        function getNodes(node) {
            node.next().find('div.tree-node').each(function () {
                nodes.push(getNode(target, this));
            });
        }

        return nodes;
    }

    /**
     * get the parent node
     * nodeEl: DOM object, from which to search it's parent node
     */
    function getParentNode(target, nodeEl) {
        var ul = $(nodeEl).parent().parent();
        if (ul[0] == target) {
            return null;
        } else {
            return getNode(target, ul.prev()[0]);
        }
    }

    //获取执行节点的前一个兄弟节点
    function getPrevSibling(target, nodeEl) {
        var li = $(nodeEl).parent().prev();
        if (li.length) return getNode(target, li.children('div.tree-node')[0]);
        return null;
    }

    //获取执行节点的前一个节点
    function getPrev(target, nodeEl) {
        var node = getPrevSibling(target, nodeEl);
        if (node != null) {
            //前一个兄弟已展开，则找前一个兄弟的最后一个儿子
            while (node.state == 'open') {
                var ne = $(node.target).next().find('div.tree-node').last();
                if (!ne.length) return node;
                node = getNode(target, ne[0]);
            }
            return node;
        }//有兄弟，返回前一个兄弟
        //没有兄弟，返回parent
        return getParentNode(target, nodeEl);
    }

    //获取执行节点的前一个兄弟节点
    function getNextSibling(target, nodeEl) {
        var li = $(nodeEl).parent().next();
        if (li.length) return getNode(target, li.children('div.tree-node')[0]);
        return null;
    }

    //获取执行节点的下一个节点
    function getNext(target, nodeEl) {
        var node = getNode(target, nodeEl);
        if (node.state == 'open') {//已展开，找第一个儿子
            var ne = $(nodeEl).next().find('div.tree-node').first();
            if (ne) return getNode(target, ne);
        }

        node = getNextSibling(target, nodeEl);
        if (node != null) return node;//有兄弟，返回前一个兄弟

        //没有兄弟，返回parent的下一个兄弟
        while (node == null) {
            nodeEl = getParentNodeEl(target, nodeEl);
            if (!nodeEl) return null;
            node = getNextSibling(target, nodeEl);
        }
        return node;

        function getParentNodeEl(target, nodeEl) {
            var ul = $(nodeEl).parent().parent();
            if (ul[0] == target) {
                return null;
            } else {
                return ul.prev()[0];
            }
        }
    }

    function getCheckedNode(target) {
        var nodes = [];
        $(target).find('.tree-checkbox1').each(function () {
            var node = $(this).parent();
            nodes.push(getNode(target, node[0]));
        });
        return nodes;
    }

    /**
     * Get the selected node data which contains following properties: id,text,attributes,target
     */
    function getSelectedNode(target) {
        var node = $(target).find('div.tree-node-selected');
        if (node.length) {
            return getNode(target, node[0]);
        } else {
            return null;
        }
    }

    /**
     * Append nodes to tree.
     * The param parameter has two properties:
     * 1 parent: DOM object, the parent node to append to.
     * 2 data: array, the nodes data.
     */
    function appendNodes(target, param, state) {
        if (!state) state = $.data(target, 'tree');
        var node = $(param.parent);

        var ul;
        if (node.length == 0) {
            ul = $(target);
        } else {
            ul = node.next();
            if (ul.length == 0) {
                ul = $('<ul></ul>').insertAfter(node);
            }
        }

        // ensure the node is a folder node
        if (param.data && param.data.length) {
            var nodeIcon = node.find('span.tree-icon');
            if (nodeIcon.hasClass('tree-file')) {
                nodeIcon.removeClass('tree-file').addClass('tree-folder');
                var hit = $('<span class="tree-hit tree-expanded"></span>').insertBefore(nodeIcon);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
        }

        loadData(target, ul[0], param.data, true, state);

        adjustCheck(target, ul.prev(), state);
    }

    /**
     * insert node to before or after specified node
     * param has the following properties:
     * before: DOM object, the node to insert before
     * after: DOM object, the node to insert after
     * data: object, the node data
     */
    function insertNode(target, param) {
        var ref = param.before || param.after;
        var pnode = getParentNode(target, ref);
        var li;
        if (pnode) {
            appendNodes(target, {
                parent: pnode.target,
                data: [param.data]
            });
            li = $(pnode.target).next().children('li:last');
        } else {
            appendNodes(target, {
                parent: null,
                data: [param.data]
            });
            li = $(target).children('li:last');
        }
        if (param.before) {
            li.insertBefore($(ref).parent());
        } else {
            li.insertAfter($(ref).parent());
        }
    }

    /**
     * Remove node from tree.
     * param: DOM object, indicate the node to be removed.
     */
    function removeNode(target, nodeEl) {
        var state = $.data(target, 'tree');
        var parent = getParentNode(target, nodeEl);
        var node = $(nodeEl);
        var li = node.parent();
        var ul = li.parent();
        li.remove();
        if (ul.children('li').length == 0) {
            node = ul.prev();

            node.find('.tree-icon').removeClass('tree-folder').addClass('tree-file');
            node.find('.tree-hit').remove();
            $('<span class="tree-indent"></span>').prependTo(node);
            if (ul[0] != target) {
                ul.remove();
            }
        }
        if (parent) {
            adjustCheck(target, parent.target, state);
        }

        showLines(target, target, undefined, state);
    }

    /**
     * get specified node data, include its children data
     */
    function getData(target, nodeEl) {
        /**
         * retrieve all children data which is stored in specified array
         */
        function retrieveChildData(aa, ul) {
            ul.children('li').each(function () {
                var node = $(this).children('div.tree-node');
                var nodedata = getNode(target, node[0]);
                var sub = $(this).children('ul');
                if (sub.length) {
                    nodedata.children = [];
                    retrieveChildData(nodedata.children, sub);
//                    getData(nodedata.children, sub);
                }
                aa.push(nodedata);
            });
        }

        if (nodeEl) {
            var nodedata = getNode(target, nodeEl);
            nodedata.children = [];
            retrieveChildData(nodedata.children, $(nodeEl).next());
            return nodedata;
        } else {
            return null;
        }
    }

    function updateNode(target, param, state) {
        var node = $(param.target);
        var oldData = getNode(target, param.target);
        if (oldData.iconCls) {
            node.find('.tree-icon').removeClass(oldData.iconCls);
        }
        var data = $.extend({}, oldData, param);

        $.data(param.target, 'tree-node', data);

        node.attr('node-id', data.id);
        node.find('.tree-title').html(data.text);
        if (data.iconCls) {
            node.find('.tree-icon').addClass(data.iconCls);
        }
        if (oldData.checked != data.checked) {
            checkNode(target, param.target, data.checked);
        }
    }

    /**
     * get the specified node
     */
    function getNode(target, nodeEl) {
        var $nodeEl = $(nodeEl);
        var node = $.extend({}, $.data(nodeEl, 'tree-node'), {
            target: nodeEl,
            checked: $nodeEl.find('.tree-checkbox').hasClass('tree-checkbox1')
        });
        if (!isLeaf(target, nodeEl)) {
            node.state = $nodeEl.find('.tree-hit').hasClass('tree-expanded') ? 'open' : 'closed';
        }
        return node;
    }

    function findNode(target, id) {
        var node = $(target).find('div.tree-node[node-id="' + id + '"]');
        if (node.length) {
            return getNode(target, node[0]);
        } else {
            return null;
        }
    }

    /**
     * select the specified node.
     * nodeEl: DOM object, indicate the node to be selected.
     */
    function selectNode(target, nodeEl) {
        var state = $.data(target, 'tree');
        var opts = state.options;
        var node = getNode(target, nodeEl);

        if (opts.onBeforeSelect.call(target, node) == false) return;

        $('div.tree-node-selected', target).removeClass('tree-node-selected');
        var $node = $(nodeEl);
        $node.addClass('tree-node-selected');
        opts.onSelect.call(target, node);
        //移动滚动条到选中的节点
        var parent = state.tree.parent();
        if (!parent.length) return;

        var top = $node.position().top;// - headerHeight;

        if (top <= 0) {
            parent.scrollTop(parent.scrollTop() + top);
        } else {
            var th = $node._outerHeight(), bh = parent[0].clientHeight;
            if (top + th > bh) {
                parent.scrollTop(parent.scrollTop() + top + th - bh);// - bh + 18
            }
        }

    }

    function selectNextNode(target) {
        var node = getSelectedNode(target);
        if (node) node = getNext(target, node.target);
        if (!node) node = getRootNode(target);
        if (node) selectNode(target, node.target);
    }

    function selectPrevNode(target) {
        var node = getSelectedNode(target);
        if (node) {
            node = getPrev(target, node.target);
            if (!node) {
                var nodeEl = $(target).find('div.tree-node:visible').last();
                if (nodeEl.length) node = getNode(target, nodeEl);
            }
        } else {
            node = getRootNode(target);
        }

        if (node) selectNode(target, node.target);
    }

    /**
     * Check if the specified node is leaf.
     * nodeEl: DOM object, indicate the node to be checked.
     */
    function isLeaf(target, nodeEl) {
        var node = $(nodeEl);
        var hit = node.children('span.tree-hit');
        return hit.length == 0;
    }

    function beginEdit(target, nodeEl) {
        var state = $.data(target, 'tree');
        var opts = state.options;
        var node = getNode(target, nodeEl);

        if (opts.onBeforeEdit.call(target, node) == false) return;
        var $nodeEl = $(nodeEl);
        $nodeEl.css('position', 'relative');
        var nt = $nodeEl.find('.tree-title');
        var width = nt.outerWidth();
        nt.empty();
        var editor = $('<input class="tree-editor">').appendTo(nt);
        editor.val(node.text).focus();
        editor.width(width + 20);
        editor.height(document.compatMode == 'CSS1Compat' ? (18 - (editor.outerHeight() - editor.height())) : 18);
        editor.bind('click',function (e) {
            return false;
        }).bind('mousedown',function (e) {
                e.stopPropagation();
            }).bind('mousemove',function (e) {
                e.stopPropagation();
            }).bind('keydown', {target: target, nodeEl: nodeEl},function (e) {
                if (e.keyCode == 13) {	// enter
                    endEdit(e.data.target, e.data.nodeEl);
                    return false;
                } else if (e.keyCode == 27) {	// esc
                    cancelEdit(e.data.target, e.data.nodeEl);
                    return false;
                }
            }).bind('blur', {target: target, nodeEl: nodeEl}, function (e) {
                e.stopPropagation();
                endEdit(e.data.target, e.data.nodeEl);
            });
    }

    function endEdit(target, nodeEl) {
        var state = $.data(target, 'tree');
        var opts = state.options, $nodeEl = $(nodeEl);
        $nodeEl.css('position', '');
        var editor = $nodeEl.find('input.tree-editor');
        var val = editor.val();
        editor.remove();
        var node = getNode(target, nodeEl);
        node.text = val;
        updateNode(target, node, state);
        opts.onAfterEdit.call(target, node);
    }

    function cancelEdit(target, nodeEl) {
        var state = $.data(target, 'tree');
        var opts = state.options, $nodeEl = $(nodeEl);
        $nodeEl.css('position', '');
        $nodeEl.find('input.tree-editor').remove();
        var node = getNode(target, nodeEl);
        updateNode(target, node, state);
        opts.onCancelEdit.call(target, node);
    }

    $.fn.tree = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.tree.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'tree');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), options);
                state = $.data(this, 'tree', {
                    options: opts,
                    tree: wrapTree(this)
                });
                var data = parseTreeData(this);
                if (data.length && !opts.data) {
                    opts.data = data
                }
//				loadData(this, this, data);
            }

            if (opts.lines) {
                $(this).addClass('tree-lines');
            }

            if (opts.data) {
                loadData(this, this, opts.data, undefined, state);
            } else {
                if (opts.dnd) {
                    enableDnd(this, state);
                } else {
                    disableDnd(this);
                }
            }
//			if (opts.url){
//			}
            request(this, this, undefined, undefined, state);
        }, [options]);
    };

    $.fn.tree.methods = {
        options: function (jq) {
            return $.data(jq[0], 'tree').options;
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                loadData(this, this, data);
            });
        },
        getNode: function (jq, nodeEl) {	// get the single node
            return getNode(jq[0], nodeEl);
        },
        getData: function (jq, nodeEl) {	// get the specified node data, include its children
            return getData(jq[0], nodeEl);
        },
        reload: function (jq, nodeEl) {
            return jq.each(function () {
                if (nodeEl) {
                    var node = $(nodeEl);
                    var hit = node.children('span.tree-hit');
                    hit.removeClass('tree-expanded tree-expanded-hover').addClass('tree-collapsed');
                    node.next().remove();
                    expandNode(this, nodeEl);
                } else {
                    $(this).empty();
                    request(this, this);
                }
            });
        },
        getRoot: function (jq) {
            return getRootNode(jq[0]);
        },
        getRoots: function (jq) {
            return getRootNodes(jq[0]);
        },
        getParent: function (jq, nodeEl) {
            return getParentNode(jq[0], nodeEl);
        },
        getPrevNode: function (jq, nodeEl) {
            return getPrev(jq[0], nodeEl);
        },
        getPrevSiblingNode: function (jq, nodeEl) {
            return getPrevSibling(jq[0], nodeEl);
        },
        getNextNode: function (jq, nodeEl) {
            return getNext(jq[0], nodeEl);
        },
        getNextSiblingNode: function (jq, nodeEl) {
            return getNextSibling(jq[0], nodeEl);
        },
        getChildren: function (jq, nodeEl) {
            return getChildren(jq[0], nodeEl);
        },
        getChecked: function (jq) {
            return getCheckedNode(jq[0]);
        },
        getSelected: function (jq) {
            return getSelectedNode(jq[0]);
        },
        isLeaf: function (jq, nodeEl) {
            return isLeaf(jq[0], nodeEl);
        },
        find: function (jq, id) {
            return findNode(jq[0], id);
        },
        select: function (jq, nodeEl) {
            return jq.each(function () {
                selectNode(this, nodeEl);
            });
        },
        selectNext: function (jq) {
            return jq.each(function () {
                selectNextNode(this);
            });
        },
        selectPrev: function (jq) {
            return jq.each(function () {
                selectPrevNode(this);
            });
        },
        check: function (jq, nodeEl) {
            return jq.each(function () {
                checkNode(this, nodeEl, true);
            });
        },
        uncheck: function (jq, nodeEl) {
            return jq.each(function () {
                checkNode(this, nodeEl, false);
            });
        },
        collapse: function (jq, nodeEl) {
            return jq.each(function () {
                collapseNode(this, nodeEl);
            });
        },
        expand: function (jq, nodeEl) {
            return jq.each(function () {
                expandNode(this, nodeEl);
            });
        },
        collapseAll: function (jq, nodeEl) {
            return jq.each(function () {
                collapseAllNode(this, nodeEl);
            });
        },
        expandAll: function (jq, nodeEl) {
            return jq.each(function () {
                expandAllNode(this, nodeEl);
            });
        },
        expandTo: function (jq, nodeEl) {
            return jq.each(function () {
                expandToNode(this, nodeEl);
            });
        },
        toggle: function (jq, nodeEl) {
            return jq.each(function () {
                toggleNode(this, nodeEl);
            });
        },
        append: function (jq, param) {
            return jq.each(function () {
                appendNodes(this, param);
            });
        },
        insert: function (jq, param) {
            return jq.each(function () {
                insertNode(this, param);
            });
        },
        remove: function (jq, nodeEl) {
            return jq.each(function () {
                removeNode(this, nodeEl);
            });
        },
        pop: function (jq, nodeEl) {
            var node = jq.tree('getData', nodeEl);
            jq.tree('remove', nodeEl);
            return node;
        },
        update: function (jq, param) {
            return jq.each(function () {
                updateNode(this, param);
            });
        },
        enableDnd: function (jq) {
            return jq.each(function () {
                enableDnd(this);
            });
        },
        disableDnd: function (jq) {
            return jq.each(function () {
                disableDnd(this);
            });
        },
        beginEdit: function (jq, nodeEl) {
            return jq.each(function () {
                beginEdit(this, nodeEl);
            });
        },
        endEdit: function (jq, nodeEl) {
            return jq.each(function () {
                endEdit(this, nodeEl);
            });
        },
        cancelEdit: function (jq, nodeEl) {
            return jq.each(function () {
                cancelEdit(this, nodeEl);
            });
        }
    };

    $.fn.tree.parseOptions = function (target) {
        var t = $(target);
        var css = t.attr("class") + "";
        if (css.indexOf("easyui-") < 0) return {};
        return $.extend({}, $.parser.parseOptions(target, [
            'url', 'method',
            {checkbox: 'boolean', cascadeCheck: 'boolean', onlyLeafCheck: 'boolean'},
            {animate: 'boolean', lines: 'boolean', dnd: 'boolean'}
        ]));
    };

    $.fn.tree.defaults = {
        url: null,
        method: 'post',
        animate: false,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        dnd: false,
        data: null,
        loader: function (param, success, error) {
            var opts = $(this).tree('options');
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
        loadFilter: function (data, parent) {
            return data;
        },

        onBeforeLoad: function (node, param) {
        },
        onLoadSuccess: function (node, data) {
        },
        onLoadError: function () {
        },
        onClick: function (node) {
        },	// node: id,text,checked,attributes,target
        onDblClick: function (node) {
        },	// node: id,text,checked,attributes,target
        onBeforeExpand: function (node) {
        },
        onExpand: function (node) {
        },
        onBeforeCollapse: function (node) {
        },
        onCollapse: function (node) {
        },
        onCheck: function (node, checked) {
        },
        onBeforeSelect: function (node) {
        },
        onSelect: function (node) {
        },
        onContextMenu: function (e, node) {
        },
        onDrop: function (target, source, point) {
        },	// point:'append','top','bottom'
        onBeforeEdit: function (node) {
        },
        onAfterEdit: function (node) {
        },
        onCancelEdit: function (node) {
        }
    };
})(jQuery);
