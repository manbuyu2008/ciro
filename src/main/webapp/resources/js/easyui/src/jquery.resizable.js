/**
 * resizable - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function ($) {
    var isResizing = false;
    $.fn.resizable = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.resizable.methods[options](this, param);
        }

        function resize(e, state) {
            var resizeData = e.data;
            if (!state) state = $.data(resizeData.target, 'resizable');
            var options = state.options;
            if (resizeData.dir.indexOf('e') != -1) {
                var width = resizeData.startWidth + e.pageX - resizeData.startX;
                width = Math.min(
                    Math.max(width, options.minWidth),
                    options.maxWidth
                );
                resizeData.width = width;
            }
            if (resizeData.dir.indexOf('s') != -1) {
                var height = resizeData.startHeight + e.pageY - resizeData.startY;
                height = Math.min(
                    Math.max(height, options.minHeight),
                    options.maxHeight
                );
                resizeData.height = height;
            }
            if (resizeData.dir.indexOf('w') != -1) {
                resizeData.width = resizeData.startWidth - e.pageX + resizeData.startX;
                if (resizeData.width >= options.minWidth && resizeData.width <= options.maxWidth) {
                    resizeData.left = resizeData.startLeft + e.pageX - resizeData.startX;
                }
            }
            if (resizeData.dir.indexOf('n') != -1) {
                resizeData.height = resizeData.startHeight - e.pageY + resizeData.startY;
                if (resizeData.height >= options.minHeight && resizeData.height <= options.maxHeight) {
                    resizeData.top = resizeData.startTop + e.pageY - resizeData.startY;
                }
            }
        }

        function applySize(e) {
            var resizeData = e.data;
            var target = resizeData.target;
            if (!$.boxModel && $.browser.msie) {
                $(target).css({
                    width:resizeData.width,
                    height:resizeData.height,
                    left:resizeData.left,
                    top:resizeData.top
                });
            } else {
                $(target).css({
                    width:resizeData.width - resizeData.deltaWidth,
                    height:resizeData.height - resizeData.deltaHeight,
                    left:resizeData.left,
                    top:resizeData.top
                });
            }
        }

        function doDown(e) {
            isResizing = true;
            $.data(e.data.target, 'resizable').options.onStartResize.call(e.data.target, e);
            return false;
        }

        function doMove(e) {
            var state = $.data(e.data.target, 'resizable');
            resize(e, state);
            if (state.options.onResize.call(e.data.target, e) != false) {
                applySize(e)
            }
            return false;
        }

        function doUp(e) {
            isResizing = false;
            var state = $.data(e.data.target, 'resizable');
            resize(e, state);
            applySize(e);
            state.options.onStopResize.call(e.data.target, e);
            $(document).unbind('.resizable');
            $('body').css('cursor', '');
//            $('body').css('cursor', 'auto');
            return false;
        }

        return this.each(function (options) {
            var opts = null;
            var state = $.data(this, 'resizable'), $this = $(this);
            if (state) {
                $this.unbind('.resizable');
                opts = $.extend(state.options, options || {});
            } else {
                opts = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), options || {});
//                opts = $.extend({}, $.fn.resizable.defaults, options || {});
                $.data(this, 'resizable', {
                    options:opts
                });
            }

            if (opts.disabled == true) {
                return;
            }

            // bind mouse event using namespace resizable
            $this.bind('mousemove.resizable', {target:this}, function (e) {
                    if (isResizing) return;
                    var dir = getDirection(e);
                    if (dir == '') {
                        $(this).css('cursor', '');
                    } else {
                        $(this).css('cursor', dir + '-resize');
                    }
                }).bind('mouseleave.resizable', function (e) {
                    $(this).css('cursor', '');
                }).bind('mousedown.resizable', {target:this}, function (e) {
                    var dir = getDirection(e);
                    if (dir == '') return;

                    var $target = $(this);
                    var ow = $target.outerWidth(), oh = $target.outerHeight();
                    var position = $target.position();
                    var data = {
                        target:this,
                        dir:dir,
                        startLeft:position.left,
                        startTop:position.top,
                        left:position.left,
                        top:position.top,
                        startX:e.pageX,
                        startY:e.pageY,
                        startWidth:ow,
                        startHeight:oh,
                        width:ow,
                        height:oh,
                        deltaWidth:ow - $target.width(),
                        deltaHeight:oh - $target.height()
                    };
                    $.extend(e.data, data);
                    var state = $.data(e.data.target, 'resizable');
                    var opts = state.options;
                    if (opts.onBeforeResize.call(e.data.target, e) == false) return;

                    var $doc = $(document);
                    $doc.bind('mousedown.resizable', e.data, doDown);
                    $doc.bind('mousemove.resizable', e.data, doMove);
                    $doc.bind('mouseup.resizable', e.data, doUp);
                    $('body').css('cursor', dir + '-resize');
                });

            // get the resize direction
            function getDirection(e) {
                var tt = $(e.data.target);
                var dir = '';
                var offset = tt.offset();
                var width = tt.outerWidth();
                var height = tt.outerHeight();
                var edge = opts.edge;
                if (e.pageY > offset.top && e.pageY < offset.top + edge) {
                    dir += 'n';
                } else if (e.pageY < offset.top + height && e.pageY > offset.top + height - edge) {
                    dir += 's';
                }
                if (e.pageX > offset.left && e.pageX < offset.left + edge) {
                    dir += 'w';
                } else if (e.pageX < offset.left + width && e.pageX > offset.left + width - edge) {
                    dir += 'e';
                }

                var handles = opts.handles.split(',');
                for (var i = 0, len = handles.length; i < len; i++) {
                    var handle = handles[i].replace(/(^\s*)|(\s*$)/g, '');
                    if (handle == 'all' || handle == dir) {
                        return dir;
                    }
                }
                return '';
            }
        }, [options]);
    };

    $.fn.resizable.methods = {
        options:function (jq) {
            return $.data(jq[0], 'resizable').options;
        },
        enable:function (jq) {
            return jq.each(function () {
                $(this).resizable({disabled:false});
            });
        },
        disable:function (jq) {
            return jq.each(function () {
                $(this).resizable({disabled:true});
            });
        }
    };

    $.fn.resizable.parseOptions = function (target) {
        var t = $(target);
        return $.extend({},
            $.parser.parseOptions(target, [
                'handles', {minWidth:'number', minHeight:'number', maxWidth:'number', maxHeight:'number', edge:'number'}
            ]), {
                disabled:(t.prop('disabled') ? true : undefined)
            })
    };

    $.fn.resizable.defaults = {
        disabled:false,
        handles:'n, e, s, w, ne, se, sw, nw, all',
        minWidth:10,
        minHeight:10,
        maxWidth:10000, //$(document).width(),
        maxHeight:10000, //$(document).height(),
        edge:5,
        onBeforeResize:function (e) {
        },
        onStartResize:function (e) {
        },
        onResize:function (e) {
        },
        onStopResize:function (e) {
        }
    };

})(jQuery);