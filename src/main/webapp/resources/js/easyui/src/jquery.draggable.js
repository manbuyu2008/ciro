/**
 * draggable - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function ($) {
    var isDragging = false;

    function drag(e, state) {
        if (!state) state = $.data(e.data.target, 'draggable');
        var opts = state.options;

        var dragData = e.data;
        var left = dragData.startLeft + e.pageX - dragData.startX;
        var top = dragData.startTop + e.pageY - dragData.startY;

        if (opts.deltaX != null && opts.deltaX != undefined) {
            left = e.pageX + opts.deltaX;
        }
        if (opts.deltaY != null && opts.deltaY != undefined) {
            top = e.pageY + opts.deltaY;
        }

        if (e.data.parent != document.body) {
            var ep = $(e.data.parent);
            left += ep.scrollLeft();
            top += ep.scrollTop();
        }

        if (opts.axis == 'h') {
            dragData.left = left;
        } else if (opts.axis == 'v') {
            dragData.top = top;
        } else {
            dragData.left = left;
            dragData.top = top;
        }
    }

    function applyDrag(e, state) {
        var target = e.data.target;
        if (!state) state = $.data(target, 'draggable');
        var opts = state.options;
        var proxy = state.proxy;
        if (!proxy) {
            proxy = $(e.data.target);
        }
        proxy.css({
            left: e.data.left,
            top: e.data.top
        });
        $('body').css('cursor', opts.cursor);
    }

    function doDown(e) {
        var target = e.data.target;
        var state = $.data(target, 'draggable');
        isDragging = true;
        var opts = state.options;
        var id = target.id, accept = state.options.accept;
        state.droppables = $('.droppable').filter(
            function () {
                return id != this.id;
            }).filter(function () {
                if (accept) {
                    return $(accept).filter(
                        function () {
                            return this.id == id;
                        }).length > 0;
                } else {
                    return true;
                }
            });

        var proxy = state.proxy, $target = $(target);
        if (!proxy) {
            if (opts.proxy) {
                if (opts.proxy == 'clone') {
                    proxy = $target.clone().insertAfter(target);
                } else {
                    proxy = opts.proxy.call(target, target);
                }
                state.proxy = proxy;
            } else {
                proxy = $target;
            }
        }

        proxy.css('position', 'absolute');
        drag(e, state);
        applyDrag(e, state);

        opts.onStartDrag.call(target, e);
        return false;
    }

    function doMove(e) {
        var target = e.data.target;
        var state = $.data(target, 'draggable');
        drag(e, state);
        if (state.options.onDrag.call(target, e) != false) {
            applyDrag(e, state);
        }

        state.droppables.each(function (e, target) {
            var dropObj = $(this);
            var p2 = dropObj.offset();
            if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth()
                && e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()) {
                if (!this.entered) {
                    dropObj.trigger('_dragenter', [target]);
                    this.entered = true;
                }
                dropObj.trigger('_dragover', [target]);
            } else {
                if (this.entered) {
                    dropObj.trigger('_dragleave', [target]);
                    this.entered = false;
                }
            }
        }, [e, target]);

        return false;
    }

    function doUp(e) {
        var target = e.data.target;
        var state = $.data(target, 'draggable');

        isDragging = false;
        drag(e, state);

        var proxy = state.proxy;
        var opts = state.options, $target = $(target);
        if (opts.revert) {
            if (checkDrop(e, target, state) == true) {
                removeProxy(state, proxy);
                $target.css({
                    position: e.data.startPosition,
                    left: e.data.startLeft,
                    top: e.data.startTop
                });
            } else {
                var id = target.id;
                if (proxy) {
                    proxy.animate({
                        left: e.data.startLeft,
                        top: e.data.startTop
                    }, function () {
                        var target = $('#' + id)[0];
                        var state = $.data(target, 'draggable');
                        removeProxy(state, state.proxy);
                    });
                } else {
                    var startPosition = e.data.startPosition;

                    $target.animate({
                        left: e.data.startLeft,
                        top: e.data.startTop
                    }, function () {
                        $('#' + id).css('position', startPosition);
                    });
                }
            }
        } else {
            $target.css({
                position: 'absolute',
                left: e.data.left,
                top: e.data.top
            });
            removeProxy(state, proxy);
            checkDrop(e, target, state);
        }

        opts.onStopDrag.call(e.data.target, e);

        $(document).unbind('.draggable');
        setTimeout(function () {
            $('body').css('cursor', '');
//            $('body').css('cursor', 'auto');
        }, 100);

        function removeProxy(state, proxy) {
            if (proxy) {
                proxy.remove();
            }
            state.proxy = null;
        }

        function checkDrop(e, target, state) {
            var dropped = false;
            state.droppables.each(function (e, target, state) {
                var dropObj = $(this), $target = $(target);
                var p2 = dropObj.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth()
                    && e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()) {
                    if (state.options.revert) {
                        $target.css({
                            position: e.data.startPosition,
                            left: e.data.startLeft,
                            top: e.data.startTop
                        });
                    }
                    dropObj.trigger('_drop', [target]);
                    dropped = true;
                    this.entered = false;
                }
            }, [e, target, state]);
            return dropped;
        }

//		$(document).unbind('.draggable');
        return false;
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'draggable');
        state.handle.unbind('.draggable').bind('mousemove.draggable', {target: target},
            function (e) {
                if (isDragging) return;
                var state = $.data(e.data.target, 'draggable');
                var opts = state.options;
                if (checkArea(e, state)) {
                    $(this).css('cursor', opts.cursor);
                } else {
                    $(this).css('cursor', '');
                }
            }).bind('mouseleave.draggable', {target: target},
            function (e) {
                $(this).css('cursor', '');
            }).bind('mousedown.draggable', {target: target}, function (e) {
                var state = $.data(e.data.target, 'draggable');
                if (checkArea(e, state) == false) return;
                $(this).css('cursor', '');

                var $target = $(e.data.target);
                var position = $target.position();
                var data = {
                    startPosition: $(e.data.target).css('position'),
                    startLeft: position.left,
                    startTop: position.top,
                    left: position.left,
                    top: position.top,
                    startX: e.pageX,
                    startY: e.pageY,
                    target: e.data.target,
                    parent: $target.parent()[0]
                };

                $.extend(e.data, data);
                var opts = state.options;
                if (opts.onBeforeDrag.call(e.data.target, e) == false) return;
                var $doc = $(document);
                $doc.bind('mousedown.draggable', e.data, doDown);
                $doc.bind('mousemove.draggable', e.data, doMove);
                $doc.bind('mouseup.draggable', e.data, doUp);
//                    $('body').css('cursor', opts.cursor);
            });

        // check if the handle can be dragged
        function checkArea(e, state) {
            var $handle = $(state.handle);
            var offset = $handle.offset();
            var width = $handle.outerWidth();
            var height = $handle.outerHeight();
            var t = e.pageY - offset.top;
            var r = offset.left + width - e.pageX;
            var b = offset.top + height - e.pageY;
            var l = e.pageX - offset.left;

            return Math.min(t, r, b, l) > state.options.edge;
        }
    }

    $.fn.draggable = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.draggable.methods[options](this, param);
        }

        return this.each(function (options) {
            var opts;
            var state = $.data(this, 'draggable');
            var $this = $(this);
            if (state) {
                state.handle.unbind('.draggable');
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), options || {});
//                opts = $.extend({}, $.fn.draggable.defaults, options || {});
                if (!this.id) this.id = $.parser.getObjGUID();
            }


            if (opts.disabled == true) {
                $this.css('cursor', '');
//                $(this).css('cursor', 'default');
                return;
            }

            var handle = null;
            if (typeof opts.handle == 'undefined' || opts.handle == null) {
                handle = $this;
            } else {
                handle = (typeof opts.handle == 'string' ? $(opts.handle, this) : opts.handle);
            }
            state = $.data(this, 'draggable', {
                options: opts,
                handle: handle
            });

            bindEvents(this, state);
        }, [options]);
    };

    $.fn.draggable.methods = {
        options: function (jq) {
            return $.data(jq[0], 'draggable').options;
        },
        proxy: function (jq) {
            return $.data(jq[0], 'draggable').proxy;
        },
        enable: function (jq) {
            return jq.each(function () {
                $(this).draggable({disabled: false});
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                $(this).draggable({disabled: true});
            });
        }
    };

    $.fn.draggable.parseOptions = function (target) {
        var t = $(target);
        return $.extend({},
            $.parser.parseOptions(target, ['cursor', 'handle', 'axis',
                {'revert': 'boolean', 'deltaX': 'number', 'deltaY': 'number', 'edge': 'number'}]), {
                disabled: (t.prop('disabled') ? true : undefined)
            });
    };

    $.fn.draggable.defaults = {
        proxy: null, // 'clone' or a function that will create the proxy object,
        // the function has the source parameter that indicate the source object dragged.
        revert: false,
        cursor: 'move',
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: false,
        edge: 0,
        axis: null, // v or h

        onBeforeDrag: function (e) {
        },
        onStartDrag: function (e) {
        },
        onDrag: function (e) {
        },
        onStopDrag: function (e) {
        }
    };
})(jQuery);