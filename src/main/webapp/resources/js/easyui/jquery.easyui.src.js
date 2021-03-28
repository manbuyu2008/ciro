/**
 * Created with IntelliJ IDEA.
 * User: 
 * Date: 13-04-23
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */

(function($){
    /**
     * Get函数
     *
     * @param container
     * @return {*}
     */
    function getNavs(container){
        return $(container).data('navs');
    }

    /**
     * Set函数
     *
     * @param container
     * @param data
     */
    function setNavs(container, data){
        $(container).data('navs', data);
    }

    function init(container, options){
        var panels = $(options.panelSelector);

        $(container).find('li').each(function(i){
            var guid = getGuid();
            var panel = $(panels).eq(i);

            $(panel).attr('targetid', guid);

            var nav = {
                id: guid,
                title: $(this).children('a').text(),
                nav: $(this),
                panel: panel,
                crumb: [{
                    text: document.title
                }, {
                    text: '主页'
                }],
                closable: false
            };

            options.navs.push(nav);

            $(this).attr('id', guid);
        });

        setNavs(container, options);
        setCrumb(options.navs[0]);
        navBindEvent(container);
    }

    function getGuid(){
        var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

        var guid = '';

        for(var i = 0; i < 9; i++){
            var n = Math.ceil(Math.random() * 35);

            guid += chars[n];
        }

        return guid;
    }

    /**
     * 获取单个导航项
     *
     * @param container
     * @param title
     * @return {{}}
     */
    function getNav(container, title){
        var navData = getNavs(container);
        var nav = {};

        $(navData.navs).each(function(i, obj){
            if(obj.title == title){
                nav = obj; return;
            }
        });

        return nav;
    }

    /**
     * 导航项绑定事件
     *
     * @param container
     */
    function navBindEvent(container){
        var navData = getNavs(container);

        $(navData.navs).each(function(i){
            var nav = this;

            $(nav.nav).unbind('click').bind('click', function(){
                selectNav(container, navData.navs[i]);
            }).bind('contextmenu', { container: container }, function(e){
                    var self = $(this);
                    var container = e.data.container;

                    navData.onContextMenu.call(container, e, getNav(container, $(self).children('a').text()));
                }).unbind('dblclick').bind('dblclick', function(){ // 双击
                    var obj = {
                        closeType: $.fn.navs.defaults.closeType.close,
                        nav: getNav(container, nav.title)
                    };

                    closeNav(container, obj);
                }).find('p > a').unbind('click').bind('click', function(){
                    if($(this).prop('class') == 'refresh'){ // 刷新
                        var href = nav.panel.prop('src');

                        nav.panel.prop('src', href);
                    }
                    else{ // 关闭
                        var obj = {
                            closeType: $.fn.navs.defaults.closeType.close,
                            nav: getNav(container, nav.title)
                        };

                        closeNav(container, obj);
                    }

                    return false;
                });
        });
    }

    /**
     * 选择某个导航项
     *
     * @param container
     * @param nav
     */
    function selectNav(container, nav){
        var navData = getNavs(container);

        $(navData.navs).each(function(){
            if(this.id == nav.id){
                this.nav.removeClass().addClass('selected');

                if(this.nav.children('p').size() == 0)
                    this.nav.children('a').after('<p><a class="refresh" href="#">刷新</a><a class="close" href="#">关闭</a></p>');

                this.panel.show();
            }
            else{
                this.nav.removeClass().children('p').remove();
                this.panel.hide();
            }
        });

        navBindEvent(container);
        setCrumb(nav);
    }

    /**
     * 设置面包屑
     *
     * @param nav
     */
    function setCrumb(nav){
        var str = '';

        if(!nav.crumb){
            $.extend(nav, {crumb:[]});

            nav.crumb.push({text: document.title});
            nav.crumb.push({text: nav.title});
        }

        var len = nav.crumb.length;

        $(nav.crumb).each(function(i){
            if(!this.attributes){
                if(i < len - 1)
                    str += '<a href="#">' + this.text + '</a><span>&gt;</span>';
                else
                    str += '<a href="#">' + this.text + '</a>';
            }
            else{
                str += '<a href="#">' + this.text + '</a>';
            }
        });

        $($.fn.navs.defaults.crumbSelector).html(str);
    }

    /**
     * 判断导航项是否存在
     *
     * @param container
     * @param title
     * @return {boolean}
     */
    function isExist(container, title){
        var sign = false;
        var navData = getNavs(container);

        $(navData.navs).each(function(i, nav){
            if(nav.title == title){
                sign = true; return;
            }
        });

        return sign;
    }

    /**
     * 新增导航项
     *
     * @param container
     * @param nav
     */
    function addNav(container, nav){
        if(!isExist(container, nav.title)){
            var navData = getNavs(container);
            var guid = getGuid();

            $(container).find('li').eq(navData.navs.length - 1).after('<li id="' + guid + '" class="selected"><a href="#">' + nav.title + '</a></li>');

            var panels = $(navData.panelSelector);
            $(panels).hide().eq(navData.navs.length - 1).after(nav.panel);
            var panel = $(navData.panelSelector).eq(navData.navs.length);
            panel.attr('targetid', guid);

            $.extend(nav, {
                id: guid,
                nav: $('#' + guid),
                panel: panel,
                closable: true
            });

            navData.navs.push(nav);

            setNavs(container, navData);
            selectNav(container, nav);
        }
        else{
            var data = getNav(container, nav.title);

            selectNav(container, data);
        }
    }

    /**
     * 关闭导航项
     *
     * @param container
     * @param obj
     */
    function closeNav(container, obj){
        var navData = getNavs(container);

        switch(obj.closeType){
            case $.fn.navs.defaults.closeType.close: // 关闭
                $(navData.navs).each(function(i){
                    if(this.closable && this == obj.nav){
                        this.nav.remove();
                        this.panel.remove();
                        navData.navs.splice(i, 1);

                    }
                });
                break;
            case $.fn.navs.defaults.closeType.closeAll: // 所有关闭
                for(var i = 0; i < navData.navs.length; i++){
                    var k = navData.navs[i];

                    if(k.closable){
                        k.nav.remove();
                        k.panel.remove();
                        navData.navs.splice(i, 1);

                        i--;
                    }
                }
                break;
            case $.fn.navs.defaults.closeType.closeAllOther: // 除此之外所有关闭
                for(var j = 0; j < navData.navs.length; j++){
                    var n = navData.navs[j];

                    if(n.closable && n != obj.nav){
                        n.nav.remove();
                        n.panel.remove();
                        navData.navs.splice(j, 1);

                        j--;
                    }
                }
                break;
        }

        setNavs(container, navData);
        selectNav(container, navData.navs[navData.navs.length - 1]);
    }

    $.fn.navs = function (options, param) {
        if (typeof options == 'string'){
            return $.fn.navs.methods[options](this, param);
        }

        var navData = getNavs(this);

        if (!navData){
            navData = $.extend($.fn.navs.defaults, options);

            init(this, navData);
        }
    };

    $.fn.navs.methods = {
        add:function (jq, options){
            return jq.each(function(){
                addNav(this, options);
            });
        },
        close:function (jq, nav){
            return jq.each(function(){
                closeNav(this, nav);
            });
        },
        getNavs:function(jq){
            /*return jq.each(function(){
             getNavs(this);
             });*/
            return getNavs(jq[0]);

        }
    };

    $.fn.navs.defaults = {
        navs:[],
        closeType:{
            close: 'close',
            closeAll: 'closeAll',
            closeAllOther: 'closeAllOther'
        },
        onLoad: function (panel) {
        },
        onSelect: function (title, which) {
        },
        onBeforeClose: function (title, which) {
        },
        onClose: function (title, which) {
        },
        onAdd: function (title, which) {
        },
        onUpdate: function (title, which) {
        },
        onContextMenu: function (e, title) {

        },
        onSelectedNavResize: function(width, height) {
        }
    };
})(jQuery);/*使用时直接调用：jQuery.hotkeys.bindHotkey('k',function (evt){　　　　　　　　　//此处写按快捷键执行的函数代码　　　　　　　});
 基于原jquery.hotkeys 0.8 改造
 主要修改内容：
 1、多热键时，不要多次执行keyHandler
 2、集成回车和退格键事件
 3、支持回车换行
 */

(function (jQuery) {
    jQuery.hotkeys = {
        specialKeys: {
            8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
        },
        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">", "/": "?", "\\": "|"
        },
        options: {
            firedText: true,
            enter2Tab: true
        },
        focusFirst: function (parent) {//将焦点放到第一个tabindex上
            focusContainer(parent);
        },
        focusNext: function (el) {//将焦点转移到下一个tabindex
            focusNext(el);
        },
        parseElements: function () {//分析页面上所有有tabindex的控件，并按tabindex排序，形成的数组保存在elements中
            parseElements();
        },
        parseContainElements: function (parent) {
            parseContainElements(parent);
        },
        bindCallback: function (key, listener) {//绑定键盘事件回调
            if (!jQuery.hotkeys.keyCallBackListener[key]) jQuery.hotkeys.keyCallBackListener[key] = [];
            jQuery.hotkeys.keyCallBackListener[key].push(listener);
        },
        bindHotkey: function (key, listener) {//绑定键盘事件
            if (!jQuery.hotkeys.keyListener[key]) jQuery.hotkeys.keyListener[key] = [];
            jQuery.hotkeys.keyListener[key].push(listener);
        },
        elements: {},
        keyCallBackListener: {},
        keyListener: {}
    };

    function keyHandler(event) {
        // Don't fire in text-accepting inputs that we didn't directly bind to
        if (!jQuery.hotkeys.options.firedText && this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||
            event.target.type === "text")) {
            return;
        }

        // Keypress represents characters, not special keys
        var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
            character = String.fromCharCode(event.which).toLowerCase(),
            modif = "", possible = {};

        // check combinations (alt|ctrl|shift+anything)
        if (event.altKey && special !== "alt") {
            modif += "alt+";
        }

        if (event.ctrlKey && special !== "ctrl") {
            modif += "ctrl+";
        }

        // TODO: Need to make sure this works consistently across platforms
        if (event.metaKey && !event.ctrlKey && special !== "meta") {
            modif += "meta+";
        }

        if (event.shiftKey && special !== "shift") {
            modif += "shift+";
        }

        if (special) {
            possible[ modif + special ] = true;

        } else {
            possible[ modif + character ] = true;
            possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

            // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
            if (modif === "shift+") {
                possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
            }
        }
        var listeners = jQuery.hotkeys.keyListener;
        for (var key in listeners) {
            if (!key) continue;
            if (possible[ key ]) {
                var list = listeners[key];
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].call(this, event) == false) return false;
                }
            }
        }
    }

    //聚焦下一焦点
    function focusNext(el) {
        var $el = $(el);
        var p = $el.parents(".eap-container"), pid;
        if (p.length) pid = p[0].id; else pid = 'body';
        $el.blur();
        var els = $.hotkeys.elements[pid];
        if (!els) return;
        var index = els.indexOf(el.id);
        if (index < 0) return;
        index++;
        if (!focusElementEx(els, index, pid)) el.focus();
        return false;
    }

    //聚焦指定容器
    function focusContainer(parent) {
        var pid;
        if (typeof parent == "string") pid = parent;
        else if (parent && parent.nodeName.equalsIgnoreCase('body')) pid = 'body';
        else pid = parent.id;

        var els = $.hotkeys.elements[pid];
        if (!els) return;

        for (var i = 0, len = els.length; i < len; i++) {
            var id = els[i], el = $('#' + id);
            if (el.is(':visible') && !el.prop("disabled") && (!el.prop("readonly") || el.is(".combo-text"))) {
                el.focus().select();
                callback('enter.' + pid, {id: id});
                break;
            }
        }
    }

    function focusElementEx(els, index, parentId) {
        if (index >= els.length) {
            //if (callback('enterLast.' + parentId) == false) return;
            var eapc=$(".eap-container");
            for (var i = 0, len = eapc.length; i < len; i++) {
                if(eapc[i].id == parentId){
                    for (var j = i, len = eapc.length; j < len; j++) {
                        if($(eapc[j]).is(':visible')){
                            $.hotkeys.focusFirst(eapc[j].id);
                        }
                    }
                }
            }
            callback('enterLast.' + parentId);
            return true;
            //index = 0;
        }
        var id = els[index], el = $('#' + id);
        if (el.is(':visible') && !el.prop("disabled") && (!el.prop("readonly") || el.is(".combo-text"))) {
            el.focus().select();
            callback('enter.' + parentId, {id: id});
            return true;
        }

        return focusElementEx(els, ++index, parentId);
    }

    function parseElements() {
        var container = $(".eap-container");
        if (container.length) {
            container.each(function () {
                parseContainElements(this);
            });
        } else {
            parseContainElements(document.body);
        }
    }

    //解析出需要切换焦点的控件
    function parseContainElements(parent) {
        var $parent = $(parent);
        var els = [];
        $parent.find("input[tabIndex!=0], textarea[tabIndex!=0]").each(function () {
            var $this = $(this);
            var id = $this.attr('id');
            if (!id) {
                id = $.parser.getObjGUID();
                $this.attr('id', id);
            }
            els.push(id);
        });
        els.sort(function (r1, r2) {
            return $('#' + r1).attr('tabIndex') - $('#' + r2).attr('tabIndex');
        });
        if (els.length) {
            var pid;
            if (parent.nodeName.equalsIgnoreCase('body')) pid = 'body';
            else {
                pid = $parent.attr('id');
                if (!pid) {
                    pid = $.parser.getObjGUID();
                    $parent.attr('id', pid);
                }
            }
            $.hotkeys.elements[pid] = els;
        }
    }

    function callback(key, event) {
        var listener = $.hotkeys.keyCallBackListener[key];
        if (!listener || !listener.length) return;
        for (var i = 0, len = listener.length; i < len; i++) {
            var ret = listener[i](event);
            if (ret == false) return false;
        }
    }

//    jQuery.each(["keydown", "keyup", "keypress" ], function () {
//        jQuery.event.special[ this ] = { add: keyHandler };
//    });
    $(document).bind('keydown.hotkeys', keyHandler);
    jQuery.hotkeys.bindHotkey('enter', function (event) {
        var t = event.target.type || event.target.getAttribute('type');
        if (jQuery.hotkeys.options.enter2Tab && t != "textarea") {
            if (callback('enter', event) != false)
                return focusNext(event.target);
            return false;
        }
    });
    jQuery.hotkeys.bindHotkey('backspace', function (event) {
        var t = event.target.type || event.target.getAttribute('type');
        if (t != "password" && t != "text" && t != "textarea") return false;
        //获取作为判断条件的事件类型
        var o = $(event.target);
        var vReadOnly = o.prop('readonly') || o.prop('disabled');
        if (vReadOnly) return false;
    });
})(jQuery);
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
})(jQuery);/**
 * droppable - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function($){
    function init(target){
        var $target = $(target);
        $target.addClass('droppable');
        $target.bind('_dragenter', {target: target}, function(e, source){
            var target = e.data.target;
            $.data(target, 'droppable').options.onDragEnter.apply(target, [e, source]);
        });
        $target.bind('_dragleave', {target: target}, function(e, source){
            var target = e.data.target;
            $.data(target, 'droppable').options.onDragLeave.apply(target, [e, source]);
        });
        $target.bind('_dragover', {target: target}, function(e, source){
            var target = e.data.target;
            $.data(target, 'droppable').options.onDragOver.apply(target, [e, source]);
        });
        $target.bind('_drop', {target: target}, function(e, source){
            var target = e.data.target;
            $.data(target, 'droppable').options.onDrop.apply(target, [e, source]);
        });
    }

    $.fn.droppable = function(options, param){
        if (typeof options == 'string'){
            return $.fn.droppable.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'droppable');
            if (state){
                $.extend(state.options, options);
            } else {
                init(this);
                $.data(this, 'droppable', {
                    options:$.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), options)
//                    options: $.extend({}, $.fn.droppable.defaults, options)
                });
            }
        }, [options]);
    };

    $.fn.droppable.methods = {
    };

    $.fn.droppable.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ['accept']));
    };

    $.fn.droppable.defaults = {
        accept:null,
        onDragEnter:function(e, source){},
        onDragOver:function(e, source){},
        onDragLeave:function(e, source){},
        onDrop:function(e, source){}
    };
})(jQuery);/**
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

})(jQuery);/**
 * linkbutton - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function ($) {

    function createButton(target, state) {
        if (!state) state = $.data(target, 'linkbutton');
        var opts = state.options, $target = $(target);

        $target.empty();
        $target.addClass('l-btn');
        if (opts.id) {
            $target.attr('id', opts.id);
        } else {
            $(target).attr('id', '');
//            $target.removeAttr('id');
        }
        if (opts.plain) {
            $target.addClass('l-btn-plain');
        } else {
            $target.removeClass('l-btn-plain');
        }

        if (opts.text) {
            $target.html(opts.text).wrapInner(
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                    '</span>' +
                    '</span>'
            );
            if (opts.iconCls) {
                $target.find('.l-btn-text').addClass(opts.iconCls).css('padding-left', '20px');
            }
        } else {
            $target.html('&nbsp;').wrapInner(
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                    '<span class="l-btn-empty"></span>' +
                    '</span>' +
                    '</span>'
            );
            if (opts.iconCls) {
                $target.find('.l-btn-empty').addClass(opts.iconCls);
            }
        }
        $target.unbind('.linkbutton').bind('focus.linkbutton',function () {
            var opts = $.data(this, 'linkbutton').options;
            if (!opts.disabled) {
                $(this).find('span.l-btn-text').addClass('l-btn-focus');
            }
        }).bind('blur.linkbutton', function () {
                $(this).find('span.l-btn-text').removeClass('l-btn-focus');
            });

        setDisabled(target, opts.disabled, state);
    }

    function setDisabled(target, disabled, state) {
        if (!state) state = $.data(target, 'linkbutton');
        var $target = $(target);
        if (disabled) {
            state.options.disabled = true;
            var href = $(target).attr('href');
            if (href) {
                state.href = href;
                $target.attr('href', 'javascript:void(0)');
            }
            if (target.onclick) {
                state.onclick = target.onclick;
                target.onclick = null;
            }
//			var onclick = $(target).attr('onclick');
//			if (onclick) {
//				state.onclick = onclick;
//				$(target).attr('onclick', '');
//			}
            $target.addClass('l-btn-disabled');
        } else {
            state.options.disabled = false;
            if (state.href) {
                $target.attr('href', state.href);
            }
            if (state.onclick) {
                target.onclick = state.onclick;
            }
            $target.removeClass('l-btn-disabled');
        }
    }

    function changeIcon(target, iconCls) {
        var state = $.data(target, 'linkbutton');
        var opts = state.options, $target = $(target);
        var btn;
        if (opts.text) {
            btn = $target.find('.l-btn-text');

        } else {
            btn = $target.find('.l-btn-empty');

        }
        if (opts.iconCls) btn.removeClass(opts.iconCls);
        btn.addClass(iconCls);
        opts.iconCls = iconCls;
    }

    $.fn.linkbutton = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.linkbutton.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'linkbutton');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'linkbutton', {
                    options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
                });
                $(this).prop('disabled', false);
            }

            createButton(this, state);
        }, [options]);
    };

    $.fn.linkbutton.methods = {
        options: function (jq) {
            return $.data(jq[0], 'linkbutton').options;
        },
        changeIcon: function (jq, icon) {
            return jq.each(function () {
                changeIcon(this, icon);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
            });
        }
    };

    $.fn.linkbutton.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ['id', 'iconCls', {plain: 'boolean'}]), {
            disabled: (t.prop('disabled') ? true : undefined),
            text: $.trim(t.html()),
            iconCls: (t.attr('icon') || t.attr('iconCls'))
        });
    };

    $.fn.linkbutton.defaults = {
        id: undefined,
        disabled: false,
        plain: false,
        text: '',
        iconCls: undefined
    };

})(jQuery);
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
        /*：增加切换页事件*/
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
})(jQuery);/**
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
                /*** 根据业务部门要求若是多选,也可以通过节点选中 ***/
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
/*                        $('<span class="tree-icon tree-file"></span>').addClass(item.iconCls).prependTo(node);
                         $('<span class="tree-indent"></span>').prependTo(node);*/
                        sa.splice(0, 0, '<span class="tree-indent"></span><span class="tree-icon tree-file ' + item.iconCls + '"></span>');
                    }
                    $(sa.join('')).appendTo(node);
                }
                sa = [];
                for (var j = 0, lj = depth; j < lj; j++) {
                 sa.push('<span class="tree-indent"></span>');
                 }
                if (sa.length > 0) $(sa.join('')).prependTo(node);
            }
        }
    }

    /**
     * draw tree lines
     */
    function showLines(target, ul, called, state) {
        //：动态创建树时，前次未渲染完，立即删除会报错
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

    function getCheckedNode2(target) {
        var nodes = [];
        $(target).find('.tree-checkbox2').each(function () {
            var node = $(this).parent();
            nodes.push(getNode(target, node[0]));
        });
        return nodes;
    }

    function getCheckedNodeEx(target) {
        var nodes = [];
        $(target).find('.tree-checkbox1').each(function () {
            var node = $(this).parent();
            nodes.push(getNode(target, node[0]));
        });
        $(target).find('.tree-checkbox2').each(function () {
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
        getCheckedEx: function (jq) {
            return getCheckedNodeEx(jq[0]);
        },
        getChecked2: function (jq) {
            return getCheckedNode2(jq[0]);
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
/**
 * parser - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 */

(function ($) {
    var OBJ_SERNO = 0;
    $.parser = {
        auto: true,
        onComplete: function (context) {
        },
        plugins: ['draggable', 'droppable', 'resizable', 'pagination',
            'linkbutton', 'menu', 'menubutton', 'splitbutton', 'progressbar',
            'tree', 'combobox', 'combotree', 'combogrid', 'numberbox', 'validatebox', 'searchbox',
            'numberspinner', 'timespinner', 'calendar', 'datebox', 'datetimebox', 'slider',
            'layout', 'panel', 'datagrid', 'propertygrid', 'treegrid', 'tabs', 'accordion', 'window', 'dialog'
        ],
        parse: function (context) {
            var aa = [], pa = $.parser.plugins;
            var i, len;
            for (i = 0, len = pa.length; i < len; i++) {
                var name = pa[i];
                var r = $('.easyui-' + name, context);
                if (r.length) {
                    if (r[name]) {
                        r[name]();
                    } else {
                        aa.push({name: name, jq: r});
                    }
                }
            }
            if (aa.length && window.easyloader) {
                var names = [];
                for (i = 0, len = aa.length; i < len; i++) {
                    names.push(aa[i].name);
                }
                easyloader.load(names, function () {
                    for (var i = 0, len = aa.length; i < len; i++) {
                        var name = aa[i].name;
                        var jq = aa[i].jq;
                        jq[name]();
                    }
                    $.parser.onComplete.call($.parser, context);
                });
            } else {
                $.parser.onComplete.call($.parser, context);
            }
        },
        getObjGUID: function () {
            return "OBJ_" + (++OBJ_SERNO);
        },
        /**
         * parse options, including standard 'data-options' attribute.
         *
         * calling examples:
         * $.parser.parseOptions(target);
         * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
         */
        parseOptions: function (target, properties) {
            var t = $(target);
            var options = {};

            var s = $.trim(t.attr('data-options'));
            if (s) {
                var first = s.substring(0, 1);
                var last = s.substring(s.length - 1, 1);
                if (first != '{') s = '{' + s;
                if (last != '}') s = s + '}';
                options = (new Function('return ' + s))();
            }

            if (properties) {
                var opts = {};
                for (var i = 0; i < properties.length; i++) {
                    var pp = properties[i];
                    if (typeof pp == 'string') {
                        if (pp == 'width' || pp == 'height' || pp == 'left' || pp == 'top') {
                            opts[pp] = parseInt(target.style[pp]) || undefined;
                        } else {
                            opts[pp] = t.attr(pp);
                        }
                    } else {
                        for (var name in pp) {
                            var type = pp[name];
                            if (type == 'boolean') {
                                opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
                            } else if (type == 'number') {
                                opts[name] = t.attr(name) == '0' ? 0 : parseFloat(t.attr(name)) || undefined;
                            }
                        }
                    }
                }
                $.extend(options, opts);
            }
            return options;
        }

    };
    $(function () {
        if (!window.easyloader && $.parser.auto) {
            $.parser.parse();
        }
    });

    /**
     * extend plugin to set box model width
     */
    $.fn._outerWidth = function (width) {
        if (width == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this.each(function () {
            var $this = $(this);
            if (!$.support.boxModel && $.browser.msie) {
                $this.width(width);
            } else {
                //某些情况下$this.outerWidth()返回0，奇怪
                var w = $this.outerWidth() - $this.width();
                if (w < 0) w = 0;
                $this.width(width - w);
            }
        });
    };

    /**
     * extend plugin to set box model height
     */
    $.fn._outerHeight = function (height) {
        if (height == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this.each(function () {
            var $this = $(this);
            if (!$.support.boxModel && $.browser.msie) {
                $this.height(height);
            } else {
                //某些情况下$this.outerHeight()返回0，奇怪
                var h = ($this.outerHeight() - $this.height());
                if (h < 0) h = 0;
                $this.height(height - h);
            }
        });
    };

    $.fn._scrollLeft = function (left) {
        if (left == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function () {
                $(this).scrollLeft(left)
            });
        }
    };

    $.fn._propAttr = $.fn.prop || $.fn.attr;

    /**
     * set or unset the fit property of parent container, return the width and height of parent container
     */
    $.fn._fit = function (fit) {
        fit = fit == undefined ? true : fit;
        var p = this.parent()[0];
        var t = this[0];
        var fcount = p.fcount || 0;
        if (fit) {
            if (!t.fitted) {
                t.fitted = true;
                p.fcount = fcount + 1;
                $(p).addClass('panel-noscroll');
                if (p.tagName == 'BODY') {
                    $('html').addClass('panel-fit');
                }
            }
        } else {
            if (t.fitted) {
                t.fitted = false;
                p.fcount = fcount - 1;
                if (p.fcount == 0) {
                    $(p).removeClass('panel-noscroll');
                    if (p.tagName == 'BODY') {
                        $('html').removeClass('panel-fit');
                    }
                }
            }
        }
        return {
            width: $(p).width(),
            height: $(p).height()
        }
    }
})(jQuery);

/**
 * Get the index of array item, return -1 when the item is not found.
 */
function indexOfArray(a, o) {
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == o) return i;
    }
    return -1;
}

/**
 * Remove array item, 'o' parameter can be item object or id field name.
 * When 'o' parameter is the id field name, the 'id' parameter is valid.
 */
function removeArrayItem(a, o, id) {
    if (typeof o == 'string') {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i][o] == id) {
                a.splice(i, 1);
                return;
            }
        }
    } else {
        var index = indexOfArray(a, o);
        if (index != -1) {
            a.splice(index, 1);
        }
    }
}

function indexOfRowId(rows, idField, id) {
    for (var i = 0, len = rows.length; i < len; i++) {
        if (rows[i][idField] == id) {
            return i;
        }
    }
    return -1;
}

function getCssIntValue($target, p) {
    var v = $target.css(p);
    if(v){
        if (v.endsWith("px")) v = v.substr(0, v.length - 2);
    }
    return "0" + v;
}

function getInputSelection(id) {
    var myArea = document.getElementById(id);
    var selection;
    if (!$.browser.msie) {
        if (myArea.selectionStart != undefined) {
            selection = myArea.value.substr(myArea.selectionStart, myArea.selectionEnd - myArea.selectionStart);
        }
    } else {
        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.getSelection) {
            selection = document.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange().text;
        }
    }
    return selection;
}
/*

 {
 // Use of jQuery.browser is frowned upon.
 // More details: http://api.jquery.com/jQuery.browser
 // jQuery.uaMatch maintained for back-compat
 function uaMatch(ua) {
 ua = ua.toLowerCase();

 var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
 /(webkit)[ \/]([\w.]+)/.exec(ua) ||
 /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
 /(msie) ([\w.]+)/.exec(ua) ||
 ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
 [];

 return {
 browser: match[ 1 ] || "",
 version: match[ 2 ] || "0"
 };
 }

 var matched = uaMatch(navigator.userAgent);
 var browser = {};

 if (matched.browser) {
 browser[ matched.browser ] = true;
 browser.version = matched.version;
 }

 // Deprecated, use jQuery.browser.webkit instead
 // Maintained for back-compat only
 if (browser.webkit) browser.safari = true;

 $.browser = browser;
 }*/
/**
 * progressbar - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      none
 *
 */
(function ($) {
    function init(target) {
        var $target = $(target);
        $target.addClass('progressbar');
        $target.html('<div class="progressbar-text"></div><div class="progressbar-value">&nbsp;</div>');
        return $target;
    }

    function setSize(target, width, state) {
        if (!state) state = $.data(target, 'progressbar');
        var opts = state.options;
        var bar = state.bar;
        if (width) opts.width = width;
        bar._outerWidth(opts.width);
        bar.find('div.progressbar-text').width(bar.width());
    }

    $.fn.progressbar = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.progressbar.methods[options];
            if (method) {
                return method(this, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'progressbar');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'progressbar', {
                    options:$.extend({}, $.fn.progressbar.defaults, $.fn.progressbar.parseOptions(this), options),
                    bar:init(this)
                });
            }
            $(this).progressbar('setValue', state.options.value);
            setSize(this, state);
        }, [options]);
    };


    $.fn.progressbar.methods = {
        options:function (jq) {
            return $.data(jq[0], 'progressbar').options;
        },
        resize:function (jq, width) {
            return jq.each(function () {
                setSize(this, width);
            });
        },
        getValue:function (jq) {
            return $.data(jq[0], 'progressbar').options.value;
        },
        setValue:function (jq, value) {
            if (value < 0) value = 0;
            if (value > 100) value = 100;
            return jq.each(function () {
                var opts = $.data(this, 'progressbar').options;
                var text = opts.text.replace(/{value}/, value);
                var oldValue = opts.value;
                opts.value = value;
                $(this).find('div.progressbar-value').width(value + '%');
                $(this).find('div.progressbar-text').html(text);
                if (oldValue != value) {
                    opts.onChange.call(this, value, oldValue);
                }
            });
        }
    };

    $.fn.progressbar.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ['width', 'text', {value:'number'}]));
    };

    $.fn.progressbar.defaults = {
        width:'auto',
        value:0, // percentage value
        text:'{value}%',
        onChange:function (newValue, oldValue) {
        }
    };
})(jQuery);/**
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
/**
 * window - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	 panel
 *   draggable
 *   resizable
 *
 */
(function($){
    function setSize(target, param, state){
        if (!state) state = $.data(target, 'window');
        var opts = state.options;
        if (param){
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }
        $(target).panel('resize', opts);
    }

    function moveWindow(target, param, state){
        if (!state) state = $.data(target, 'window');
        if (param){
            if (param.left != null) state.options.left = param.left;
            if (param.top != null) state.options.top = param.top;
        }
        $(target).panel('move', state.options);
        if (state.shadow){
            state.shadow.css({
                left: state.options.left,
                top: state.options.top
            });
        }
    }

    function create(target, state){
        if (!state) state = $.data(target, 'window');
        var $target = $(target);
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var win = $target.panel($.extend({}, state.options, {
            border: false,
            doSize: true,	// size the panel, the property undefined in window component
            closed: true,	// close the panel
            cls: 'window',
            headerCls: 'window-header',
            bodyCls: 'window-body ' + (state.options.noheader ? 'window-body-noheader' : ''),

            onBeforeDestroy: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.options.onBeforeDestroy.call(target) == false) return false;
                if (state.shadow) state.shadow.remove();
                if (state.mask) state.mask.remove();
            },
            onClose: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.shadow) state.shadow.hide();
                if (state.mask) state.mask.hide();

                state.options.onClose.call(target);
            },
            onOpen: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.mask){
                    state.mask.css({
                        display:'block',
                        zIndex: $.fn.window.defaults.zIndex++
                    });
                }
                if (state.shadow){
                    state.shadow.css({
                        display:'block',
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: state.options.left,
                        top: state.options.top,
                        width: state.window.outerWidth(),
                        height: state.window.outerHeight()
                    });
                }
                state.window.css('z-index', $.fn.window.defaults.zIndex++);

                state.options.onOpen.call(target);
            },
            onResize: function(width, height){
                var target = this;
                var state = $.data(target, 'window');
                var opts = $(target).panel('options');
                state.options.width = opts.width;
                state.options.height = opts.height;
                state.options.left = opts.left;
                state.options.top = opts.top;
                if (state.shadow){
                    state.shadow.css({
                        left: state.options.left,
                        top: state.options.top,
                        width: state.window.outerWidth(),
                        height: state.window.outerHeight()
                    });
                }

                state.options.onResize.call(target, width, height);
            },
            onMinimize: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.shadow) state.shadow.hide();
                if (state.mask) state.mask.hide();

                state.options.onMinimize.call(target);
            },
            onBeforeCollapse: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.options.onBeforeCollapse.call(target) == false) return false;
                if (state.shadow) state.shadow.hide();
            },
            onExpand: function(){
                var target = this;
                var state = $.data(target, 'window');
                if (state.shadow) state.shadow.show();
                state.options.onExpand.call(target);
            }
        }));

        state.window = win.panel('panel');

        // create mask
        if (state.mask) state.mask.remove();
        if (state.options.modal == true){
            state.mask = $('<div class="window-mask"></div>').insertAfter(state.window);
            state.mask.css({
                width: (state.options.inline ? state.mask.parent().width() : getPageArea().width),
                height: (state.options.inline ? state.mask.parent().height() : getPageArea().height),
                display: 'none'
            });
        }

        // create shadow
        if (state.shadow) state.shadow.remove();
        if (state.options.shadow == true){
            state.shadow = $('<div class="window-shadow"></div>').insertAfter(state.window);
            state.shadow.css({
                display: 'none'
            });
        }

        var parent;
        // if require center the window
        if (state.options.left == null){
            var width = state.options.width;
            if (isNaN(width)){
                width = state.window.outerWidth();
            }
            if (state.options.inline){
                parent = state.window.parent();
                state.options.left = (parent.width() - width) / 2 + parent.scrollLeft();
            } else {
                state.options.left = (document.body.clientWidth/*$(window).width()*/ - width) / 2 + $(document).scrollLeft();
            }
        }
        if (state.options.top == null){
            var height = state.window.height;
            if (isNaN(height)){
                height = state.window.outerHeight();
            }
            if (state.options.inline){
                parent = state.window.parent();
                state.options.top = (parent.height() - height) / 2 + parent.scrollTop();
            } else {
                state.options.top = (document.body.clientHeight/*$(window).height()*/ - height) / 2 + $(document).scrollTop();
            }
        }
        moveWindow(target, undefined, state);

        if (state.options.closed == false){
            win.window('open');	// open the window
        }
    }


    /**
     * set window drag and resize property
     */
    function setProperties(target, state){
        if (!state) state = $.data(target, 'window');

        state.window.draggable({
            handle: '>div.panel-header>div.panel-title',
            disabled: state.options.draggable == false,
            onStartDrag: function(e){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'window');

                if (state.mask) state.mask.css('z-index', $.fn.window.defaults.zIndex++);
                if (state.shadow) state.shadow.css('z-index', $.fn.window.defaults.zIndex++);
                state.window.css('z-index', $.fn.window.defaults.zIndex++);

                if (!state.proxy){
                    state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
                }
                state.proxy.css({
                    display:'none',
                    zIndex: $.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top
                });
                state.proxy._outerWidth(state.window.outerWidth());
                state.proxy._outerHeight(state.window.outerHeight());
                setTimeout(function(){
                    if (state.proxy) state.proxy.show();
                }, 500);
            },
            onDrag: function(e){
                var target = $('#' + $(this).attr('targetid'))[0], state = $.data(target, 'window');
                state.proxy.css({
                    display:'block',
                    left: e.data.left,
                    top: e.data.top
                });
                return false;
            },
            onStopDrag: function(e){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'window');
                state.options.left = e.data.left;
                state.options.top = e.data.top;
                $target.window('move');
                state.proxy.remove();
                state.proxy = null;
            }
        });

        state.window.resizable({
            disabled: state.options.resizable == false,
            onStartResize:function(e){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'window');
                state.pmask = $('<div class="window-proxy-mask"></div>').insertAfter(state.window);
                state.pmask.css({
                    zIndex: $.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top,
                    width: state.window.outerWidth(),
                    height: state.window.outerHeight()
                });
                if (!state.proxy){
                    state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
                }
                state.proxy.css({
                    zIndex: $.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
            },
            onResize: function(e){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'window');
                state.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize: function(e){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'window');
                state.options.left = e.data.left;
                state.options.top = e.data.top;
                state.options.width = e.data.width;
                state.options.height = e.data.height;
                setSize(target, undefined, state);
                state.pmask.remove();
                state.pmask = null;
                state.proxy.remove();
                state.proxy = null;
            }
        });
    }

    function getPageArea() {
        if (document.compatMode == 'BackCompat') {
            return {
                width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                height: Math.max(document.body.scrollHeight, document.body.clientHeight)
            }
        } else {
            return {
                width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
            }
        }
    }

    // when window resize, reset the width and height of the window's mask
    $(window).resize(function(){
        $('body>div.window-mask').css({
            width:document.body.clientWidth/*$(window).width()*/,
            height:document.body.clientHeight/*$(window).height()*/
        });
        setTimeout(function(){
            var pos = getPageArea();
            $('body>div.window-mask').css({
                width: pos.width,
                height: pos.height
            });
        }, 50);
    });

    $.fn.window = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.window.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.panel(options, param);
            }
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'window');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'window', {
                    options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), options)
                });
                if (!state.options.inline){
                    $(this).appendTo('body');
                }
            }
            create(this, state);
            setProperties(this, state);
        }, [options]);
    };

    $.fn.window.methods = {
        options: function(jq){
            var popts = jq.panel('options');
            var wopts = $.data(jq[0], 'window').options;
            return $.extend(wopts, {
                closed: popts.closed,
                collapsed: popts.collapsed,
                minimized: popts.minimized,
                maximized: popts.maximized
            });
        },
        window: function(jq){
            return $.data(jq[0], 'window').window;
        },
        resize: function(jq, param){
            return jq.each(function(){
                setSize(this, param);
            });
        },
        move: function(jq, param){
            return jq.each(function(){
                moveWindow(this, param);
            });
        }
    };

    $.fn.window.parseOptions = function(target){
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [
            {draggable:'boolean', resizable:'boolean', shadow:'boolean', modal:'boolean', inline:'boolean'}
        ]));
    };

    // Inherited from $.fn.panel.defaults
    $.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {
        zIndex: 9000,
        draggable: true,
        resizable: true,
        shadow: true,
        modal: false,
        inline: false,	// true to stay inside its parent, false to go on top of all elements

        // window's property which difference from panel
        title: 'New Window',
        collapsible: true,
        minimizable: true,
        maximizable: true,
        closable: true,
        closed: false
    });
})(jQuery);/**
 * dialog - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	 window
 *   linkbutton
 *
 */
(function($){
    /**
     * wrap dialog and return content panel.
     */
    function wrapDialog(target){
        var t = $(target);
        if (!t.attr('id')) t.attr('id', $.parser.getObjGUID());
        t.wrapInner('<div class="dialog-content" targetid="' + t.attr('id') + '"></div>');
        var contentPanel = t.children('div.dialog-content');

        contentPanel.attr('style', t.attr('style'));
        t.removeAttr('style').css('overflow','hidden');

        contentPanel.panel({
            border:false,
            doSize:false
        });

        return contentPanel;
    }

    /**
     * build the dialog
     */
    function buildDialog(target, state){
        if (!state) state = $.data(target, 'dialog');
        var opts = state.options;
        var contentPanel = state.contentPanel;
        var toolbar, $target = $(target), i, len, p;
//		$(target).find('div.dialog-toolbar').remove();
//		$(target).find('div.dialog-button').remove();
        if (opts.toolbar){
            if (typeof opts.toolbar == 'string'){
                toolbar = $(opts.toolbar).addClass('dialog-toolbar').prependTo(target);
                toolbar.show();
            } else {
                $target.find('div.dialog-toolbar').remove();
                toolbar = $('<div class="dialog-toolbar"></div>').prependTo(target);
                for(i=0, len = opts.toolbar.length; i<len; i++){
                    p = opts.toolbar[i];
                    if (p == '-'){
                        toolbar.append('<div class="dialog-tool-separator"></div>');
                    } else {
                        var tool = $('<a href="javascript:void(0)"></a>').appendTo(toolbar);
                        tool.css('float','left');
                        tool[0].onclick = eval(p.handler || function(){});
                        tool.linkbutton($.extend({}, p, {
                            plain: true
                        }));
                    }
                }
                toolbar.append('<div style="clear:both"></div>');
            }
        } else {
            $target.find('div.dialog-toolbar').remove();
        }

        if (opts.buttons){
            if (typeof opts.buttons == 'string'){
                toolbar = $(opts.buttons).addClass('dialog-button').appendTo(target);
                toolbar.show();
            } else {
                $target.find('div.dialog-button').remove();
                var buttons = $('<div class="dialog-button"></div>').appendTo(target);
                for(i=0, len = opts.buttons.length; i<len; i++){
                    p = opts.buttons[i];
                    var button = $('<a href="javascript:void(0)"></a>').appendTo(buttons);
                    if (p.handler) button[0].onclick = p.handler;
                    button.linkbutton(p);
                }
            }
        } else {
            $target.find('div.dialog-button').remove();
        }

        var tmpHref = opts.href;
        var tmpContent = opts.content;
        opts.href = null;
        opts.content = null;
        opts.maxWhenExceed = true;

        contentPanel.panel({
            closed: opts.closed,
            cache:opts.cache,
            href: tmpHref,
            content: tmpContent,
            onLoad: function(){
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0];
                var opts = $.data(target, 'dialog').options;
                if (opts.height == 'auto'){
                    $target.window('resize');
                }
                opts.onLoad.apply(target, arguments);
            }
        });

        $target.window($.extend({}, opts, {
            onOpen:function(){
                var target = this;
                var state = $.data(target, 'dialog');
                var opts = state.options;
                var contentPanel = state.contentPanel;
                contentPanel.panel('open');
                if (opts.onOpen) opts.onOpen.call(target);
            },
            onResize:function(width, height){
                var target = this;
                var state = $.data(target, 'dialog');
                var opts = state.options;
                var contentPanel = state.contentPanel;

                var wbody = $(target).panel('panel').find('>div.panel-body');
                contentPanel.panel('panel').show();
                contentPanel.panel('resize', {
                    width: wbody.width(),
                    height: (height=='auto') ? 'auto' :
                        wbody.height()
                            - wbody.find('>div.dialog-toolbar').outerHeight()
                            - wbody.find('>div.dialog-button').outerHeight()
                });

                if (opts.onResize) opts.onResize.call(target, width, height);
            }
        }));

        opts.href = tmpHref;
        opts.content = tmpContent;
    }

    function refresh(target, href){
        var contentPanel = $.data(target, 'dialog').contentPanel;
        contentPanel.panel('refresh', href);
    }

    $.fn.dialog = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.dialog.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.window(options, param);
            }
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'dialog');
            if (state){
                $.extend(state.options, options);
            } else {
                $.data(this, 'dialog', {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), options),
                    contentPanel: wrapDialog(this)
                });
            }
            buildDialog(this);
        }, [options]);
    };

    $.fn.dialog.methods = {
        options: function(jq){
            var dopts = $.data(jq[0], 'dialog').options;
            var popts = jq.panel('options');
            $.extend(dopts, {
                closed: popts.closed,
                collapsed: popts.collapsed,
                minimized: popts.minimized,
                maximized: popts.maximized
            });
//			var contentPanel = $.data(jq[0], 'dialog').contentPanel;

            return dopts;
        },
        dialog: function(jq){
            return jq.window('window');
        },
        refresh: function(jq, href){
            return jq.each(function(){
                refresh(this, href);
            });
        }
    };

    $.fn.dialog.parseOptions = function(target){
        return $.extend({}, $.fn.window.parseOptions(target), $.parser.parseOptions(target, ['toolbar', 'buttons']));
    };

    // Inherited from $.fn.window.defaults.
    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: 'New Dialog',
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,

        toolbar:null,
        buttons:null
    });
})(jQuery);/**
 * messager - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *     linkbutton
 *  window
 *  progressbar
 */
(function ($) {

    /**
     * show window with animate, after sometime close the window
     */
    function show(el, type, speed, timeout) {
        var win = $(el).window('window');
        if (!win) return;

        switch (type) {
            case null:
                win.show();
                break;
            case 'slide':
                win.slideDown(speed);
                break;
            case 'fade':
                win.fadeIn(speed);
                break;
            case 'show':
                win.show(speed);
                break;
        }

        var timer = null;
        if (timeout > 0) {
            timer = setTimeout(function () {
                hide(el, type, speed);
            }, timeout);
        }
        win.hover(
            function () {
                if (timer) {
                    clearTimeout(timer);
                }
            },
            function () {
                if (timeout > 0) {
                    timer = setTimeout(function () {
                        hide(el, type, speed);
                    }, timeout);
                }
            }
        )

    }

    /**
     * hide window with animate
     */
    function hide(el, type, speed) {
        if (el.locked == true) return;
        el.locked = true;

        var win = $(el).window('window');
        if (!win) return;

        switch (type) {
            case null:
                win.hide();
                break;
            case 'slide':
                win.slideUp(speed);
                break;
            case 'fade':
                win.fadeOut(speed);
                break;
            case 'show':
                win.hide(speed);
                break;
        }

        setTimeout(function () {
            $(el).window('destroy');
            el = null;
        }, speed);
    }

    /**
     * create a dialog, when dialog is closed destroy it
     */
    function createDialog(title, content, buttons) {
        var id = $.parser.getObjGUID();
        var win = $('<div id="' + id + '" class="messager-body"></div>').appendTo('body');
        win.append(content);
        if (buttons) {
            var tb = $('<div class="messager-button"></div>').appendTo(win);
            for (var label in buttons) {
                $('<a></a>').attr('href', 'javascript:void(0)').text(label)
                    .css('margin-left', 10)
                    .bind('click', eval(buttons[label]))
                    .appendTo(tb).linkbutton();
            }
        }
        win.window({
            title: title,
            noheader: (title ? false : true),
            width: 300,
            height: 'auto',
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function () {
                setTimeout(function () {
                    $('#' + id).window('destroy');
                }, 100);
            }
        });
        win.window('window').addClass('messager-window');
        win.children('div.messager-button').children('a:first').focus();
        return win;
    }

    $.messager = {
        show: function (options) {
            var opts = $.extend({
                showType: 'slide',
                showSpeed: 600,
                width: 250,
                height: 100,
                msg: '',
                title: '',
                timeout: 4000
            }, options || {});

            var win = $('<div class="messager-body"></div>').html(opts.msg).appendTo('body');
            var showType = opts.showType, showSpeed = opts.showSpeed, timeout = opts.timeout;
            win.window({
                title: opts.title,
                width: opts.width,
                height: opts.height,
                collapsible: false,
                minimizable: false,
                maximizable: false,
                shadow: false,
                draggable: false,
                resizable: false,
                closed: true,
                onBeforeOpen: function () {
                    show(this, showType, showSpeed, timeout);
                    return false;
                },
                onBeforeClose: function () {
                    hide(this);
                    /*：去掉效果, opts.showType, opts.showSpeed*/
                    return false;
                },
                onResize: function () {
                    var id = this.id;
                    setTimeout(function () {
                        $('#' + id).window('window').css({
                            left: '',
                            top: '',
                            right: 0,
                            bottom: -document.body.scrollTop - document.documentElement.scrollTop
                        });
                    }, 50);
                }
            });

            // set the message window to the right bottom position
            win.window('window').css({
                left: '',
                top: '',
                right: 0,
                zIndex: $.fn.window.defaults.zIndex++,
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            });
            win.window('open');
        },

        alert: function (title, msg, icon, fn) {
            var content = '<div>' + msg + '</div>';
            switch (icon) {
                case 'error':
                    content = '<div class="messager-icon messager-error"></div>' + content;
                    break;
                case 'info':
                    content = '<div class="messager-icon messager-info"></div>' + content;
                    break;
                case 'question':
                    content = '<div class="messager-icon messager-question"></div>' + content;
                    break;
                case 'warning':
                    content = '<div class="messager-icon messager-warning"></div>' + content;
                    break;
            }
            content += '<div style="clear:both;"/>';

            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).dialog({closed: true});
                if (fn) {
                    fn();
                    return false;
                }
            };
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
        },

        confirm: function (title, msg, fn) {
            var content = '<div class="messager-icon messager-question"></div>'
                + '<div>' + msg + '</div>'
                + '<div style="clear:both;"/>';
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn(true);
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn(false);
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
        },

        prompt: function (title, msg, fn) {
            var content = '<div class="messager-icon messager-question"></div>'
                + '<div>' + msg + '</div>'
                + '<br/>'
                + '<input class="messager-input" type="text"/>'
                + '<div style="clear:both;"/>';
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn($('.messager-input', win).val());
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
            win.children('input.messager-input').focus();
        },

        promptEx: function (title, msg, fn) {
            var content = msg;
            var buttons = {};
            buttons[$.messager.defaults.ok] = function () {
                var win = $('#' + id);
                if (!win.form('validate')) return;
                win.window('close');
                if (fn) {
                    fn($('.messager-input', win).val());
                    return false;
                }
            };
            buttons[$.messager.defaults.cancel] = function () {
                $('#' + id).window('close');
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = createDialog(title, content, buttons);
            var id = win.attr('id');
            $.parser.parse(win);
            win.children('input.messager-input').focus();
        },

        progress: function (options) {
            var opts = $.extend({
                title: '',
                msg: '',	// The message box body text
                text: undefined,	// The text to display in the progress bar
                interval: 300	// The length of time in milliseconds between each progress update
            }, options || {});

            var methods = {
                bar: function () {	// get the progress bar object
                    return $('body>div.messager-window').find('div.messager-p-bar');
                },
                close: function () {	// close the progress window
                    var win = $('#' + id);
                    if (win.length) {
                        if (win[0].timer) {
                            clearInterval(win[0].timer);
                        }
                        win.window('close');
                    }
                }
            };

            if (typeof options == 'string') {
                var method = methods[options];
                return method();
            }

            var content = '<div class="messager-progress"><div class="messager-p-msg"></div><div class="messager-p-bar"></div></div>';
            var win = createDialog(opts.title, content, null);
            var id = win.attr('id');
            win.find('div.messager-p-msg').html(opts.msg);
            var bar = win.find('div.messager-p-bar');
            bar.progressbar({
                text: opts.text
            });
            win.window({
                closable: false
            });

            if (opts.interval) {
                win[0].timer = setInterval(function () {
                    var bar = $('#' + id).find('div.messager-p-bar');
                    var v = bar.progressbar('getValue');
                    v += 10;
                    if (v > 100) v = 0;
                    bar.progressbar('setValue', v);
                }, opts.interval);
            }
        }
    };

    $.messager.defaults = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

})(jQuery);
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
})(jQuery);/**
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
})(jQuery);/**
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

        /*** 新UI要求预设边框***/
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
        // 当panell不允许收缩时，去掉收缩按钮
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
                        width: panels.center.panel('options').width + panels['east'].panel('options').width - 0
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
        marginLeft: 0,
        marginRight: 0,
        hideWhenCollapse: false,
        onRegionExpanded: undefined,//function(region)
        onRegionCollapsed: undefined//function(region)
    };

})(jQuery);
/**
 * menu - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function($){

    /**
     * initialize the target menu, the function can be invoked only once
     */
    function init(target){
        var $target = $(target);
        $target.appendTo('body');
        $target.addClass('menu-top');	// the top menu

        var menus = [];
        adjust($target);

        var time = null;
        for(var i= 0, len = menus.length; i<len; i++){
            var menu = menus[i];
            wrapMenu(menu);
            menu.children('div.menu-item').each(function(){
                bindMenuItemEvent(target, $(this));
            });

            menu.bind('mouseenter', function(){
                if (time){
                    clearTimeout(time);
                    time = null;
                }
            }).bind('mouseleave', function(){
                    time = setTimeout(function(){
                        hideAll(target);
                    }, 100);
                });
        }


        function adjust(menu){
            menus.push(menu);
            menu.find('>div').each(function(){
                var item = $(this);
                var submenu = item.find('>div');
                if (submenu.length){
                    submenu.insertAfter(target);
                    item[0].submenu = submenu;
                    adjust(submenu);
                }
            });
        }


        /**
         * wrap a menu and set it's status to hidden
         * the menu not include sub menus
         */
        function wrapMenu(menu){
            menu.addClass('menu').find('>div').each(function(){
                var item = $(this);
                if (item.hasClass('menu-sep')){
                    item.html('&nbsp;');
                } else {
                    // the menu item options
                    var itemOpts = $.extend({}, $.parser.parseOptions(this, ['name', 'iconCls', 'href']), {
                        disabled:(item.prop('disabled') ? true : undefined)
                    });
                    item.attr('name', itemOpts.name || '').attr('href', itemOpts.href || '');

                    var text = item.addClass('menu-item').html();
                    item.empty().append($('<div class="menu-text"></div>').html(text));

                    if (itemOpts.iconCls) {
                        $('<div class="menu-icon"></div>').addClass(itemOpts.iconCls).appendTo(item);
                    }
                    if (itemOpts.disabled) {
                        setDisabled(target, item[0], true);
                    }

                    if (item[0].submenu){
                        $('<div class="menu-rightarrow"></div>').appendTo(item);	// has sub menu
                    }

                    item._outerHeight(22);
                }
            });
            menu.hide();
        }
    }

    /**
     * bind menu item event
     */
    function bindMenuItemEvent(target, item){
        item.unbind('.menu');
        item.bind('mousedown.menu', function(){
            return false;	// skip the mousedown event that has been used for document to hide the menu
        }).bind('click.menu', {target: target}, function(e){
                var target = e.data.target;
                if ($(this).hasClass('menu-item-disabled')){
                    return;
                }
                // only the sub menu clicked can hide all menus
                if (!this.submenu){
                    hideAll(target);
                    var href = $(this).attr('href');
                    if (href){
                        location.href = href;
                    }
                }
                var item = $(target).menu('getItem', this);
                $.data(target, 'menu').options.onClick.call(target, item);
            }).bind('mouseenter.menu', function(e){
                // hide other menu
                var item = $(this);
                item.siblings().each(function(){
                    if (this.submenu){
                        hideMenu(this.submenu);
                    }
                    $(this).removeClass('menu-active');
                });
                // show this menu
                item.addClass('menu-active');

                if (item.hasClass('menu-item-disabled')){
                    item.addClass('menu-active-disabled');
                    return;
                }

                var submenu = item[0].submenu;
                if (submenu){
                    var left = item.offset().left + item.outerWidth() - 2;
                    if (left + submenu.outerWidth() + 5 > document.body.clientWidth/*$(window).width()*/ + $(document).scrollLeft()){
                        left = item.offset().left - submenu.outerWidth() + 2;
                    }
                    var top = item.offset().top - 3;
                    if (top + submenu.outerHeight() > document.body.clientHeight/*$(window).height()*/ + $(document).scrollTop()){
                        top = document.body.clientHeight/*$(window).height()*/ + $(document).scrollTop() - submenu.outerHeight() - 5;
                    }
                    showMenu(submenu, {
                        left: left,
                        top: top
                    });
                }
            }).bind('mouseleave.menu', function(e){
                var item = $(this);
                item.removeClass('menu-active menu-active-disabled');
                var submenu = item[0].submenu;
                if (submenu){
                    if (e.pageX>=parseInt(submenu.css('left'))){
                        item.addClass('menu-active');
                    } else {
                        hideMenu(submenu);
                    }

                } else {
                    item.removeClass('menu-active');
                }
            });
    }

    /**
     * hide top menu and it's all sub menus
     */
    function hideAll(target){
        var opts = $.data(target, 'menu').options;
        hideMenu($(target));
        $(document).unbind('.menu');
        opts.onHide.call(target);
        return false;
    }

    /**
     * show the top menu
     */
    function showTopMenu(target, pos){
        var opts = $.data(target, 'menu').options;
        if (pos){
            opts.left = pos.left;
            opts.top = pos.top;
            if (opts.left + $(target).outerWidth() > document.body.clientWidth/*$(window).width()*/ + $(document).scrollLeft()){
                opts.left = document.body.clientWidth/*$(window).width()*/ + $(document).scrollLeft() - $(target).outerWidth() - 5;
            }
            if (opts.top + $(target).outerHeight() > document.body.clientHeight/*$(window).height()*/ + $(document).scrollTop()){
                opts.top -= $(target).outerHeight();
            }
        }
        showMenu($(target), {left:opts.left,top:opts.top}, function(){
            $(document).unbind('.menu').bind('mousedown.menu', function(){
                hideAll(target);
                $(document).unbind('.menu');
                return false;
            });
            opts.onShow.call(target);
        });
    }

    function showMenu(menu, pos, callback){
        if (!menu) return;

        if (pos){
            menu.css(pos);
        }
        menu.show(0, function(){
            if (!menu[0].shadow){
                menu[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(menu);
            }
            menu[0].shadow.css({
                display:'block',
                zIndex:$.fn.menu.defaults.zIndex++,
                left:menu.css('left'),
                top:menu.css('top'),
                width:menu.outerWidth(),
                height:menu.outerHeight()
            });
            menu.css('z-index', $.fn.menu.defaults.zIndex++);

            if (callback){
                callback();
            }
        });
    }

    function hideMenu(menu){
        if (!menu) return;

        hideit(menu);
        menu.find('div.menu-item').each(function(){
            if (this.submenu){
                hideMenu(this.submenu);
            }
            $(this).removeClass('menu-active');
        });

        function hideit(m){
            m.stop(true,true);
            if (m[0].shadow){
                m[0].shadow.hide();
            }
            m.hide();
        }
    }

    function findItem(target, text){
        var result = null;
        var tmp = $('<div></div>');
        function find(menu){
            menu.children('div.menu-item').each(function(){
                var item = $(target).menu('getItem', this);
                var s = tmp.empty().html(item.text).text();
                if (text == $.trim(s)) {
                    result = item;
                } else if (this.submenu && !result){
                    find(this.submenu);
                }
            });
        }
        find($(target));
        tmp.remove();
        return result;
    }

    function setDisabled(target, itemEl, disabled){
        var t = $(itemEl);

        if (disabled){
            t.addClass('menu-item-disabled');
            if (itemEl.onclick){
                itemEl.onclick1 = itemEl.onclick;
                itemEl.onclick = null;
            }
        } else {
            t.removeClass('menu-item-disabled');
            if (itemEl.onclick1){
                itemEl.onclick = itemEl.onclick1;
                itemEl.onclick1 = null;
            }
        }
    }

    function appendItem(target, param){
        var menu = $(target);
        if (param.parent){
            menu = param.parent.submenu;
        }
        var item = $('<div class="menu-item"></div>').appendTo(menu);
        $('<div class="menu-text"></div>').html(param.text).appendTo(item);
        if (param.iconCls) $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item);
        if (param.id) item.attr('id', param.id);
        if (param.href) item.attr('href', param.href);
        if (param.name) item.attr('name', param.name);
        if (param.onclick){
            if (typeof param.onclick == 'string'){
                item.attr('onclick', param.onclick);
            } else {
                item[0].onclick = eval(param.onclick);
            }
        }
        if (param.handler) item[0].onclick = eval(param.handler);

        bindMenuItemEvent(target, item);
        if (param.disabled) {
            setDisabled(target, item[0], true);
        }
    }

    function removeItem(target, itemEl){
        function removeit(el){
            if (el.submenu){
                el.submenu.children('div.menu-item').each(function(){
                    removeit(this);
                });
                var shadow = el.submenu[0].shadow;
                if (shadow) shadow.remove();
                el.submenu.remove();
            }
            $(el).remove();
        }
        removeit(itemEl);
    }

    function destroyMenu(target){
        $(target).children('div.menu-item').each(function(){
            removeItem(target, this);
        });
        if (target.shadow) target.shadow.remove();
        $(target).remove();
    }

    $.fn.menu = function(options, param){
        if (typeof options == 'string'){
            return $.fn.menu.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'menu');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'menu', {
                    options:$.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), options)
//                    options: $.extend({}, $.fn.menu.defaults, options)
                });
                init(this);
            }
            $(this).css({
                left: state.options.left,
                top: state.options.top
            });
        }, [options]);
    };

    $.fn.menu.methods = {
        show: function(jq, pos){
            return jq.each(function(){
                showTopMenu(this, pos);
            });
        },
        hide: function(jq){
            return jq.each(function(){
                hideAll(this);
            });
        },
        destroy: function(jq){
            return jq.each(function(){
                destroyMenu(this);
            });
        },
        /**
         * set the menu item text
         * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	text: string, the new text
		 * }
         */
        setText: function(jq, param){
            return jq.each(function(){
                $(param.target).children('div.menu-text').html(param.text);
            });
        },
        /**
         * set the menu icon class
         * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	iconCls: the menu item icon class
		 * }
         */
        setIcon: function(jq, param){
            return jq.each(function(){
                var item = $(this).menu('getItem', param.target);
                if (item.iconCls){
                    $(item.target).children('div.menu-icon').removeClass(item.iconCls).addClass(param.iconCls);
                } else {
                    $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(param.target);
                }
            });
        },
        /**
         * get the menu item data that contains the following property:
         * {
		 * 	target: DOM object, the menu item
		 *  id: the menu id
		 * 	text: the menu item text
		 * 	iconCls: the icon class
		 *  href: a remote address to redirect to
		 *  onclick: a function to be called when the item is clicked
		 * }
         */
        getItem: function(jq, itemEl){
            var t = $(itemEl);
            var item = {
                target:itemEl,
                id:t.attr('id'),
                text:$.trim(t.children('div.menu-text').html()),
                disabled:t.hasClass('menu-item-disabled'),
                href:t.attr('href'),
                name:t.attr('name'),
                onclick:itemEl.onclick
            };
            var icon = t.children('div.menu-icon');
            if (icon.length){
                var cc = [];
                var aa = icon.attr('class').split(' ');
                for(var i= 0, len = aa.length; i<len; i++){
                    if (aa[i] != 'menu-icon'){
                        cc.push(aa[i]);
                    }
                }
                item.iconCls = cc.join(' ');
            }
            return item;
        },
        findItem: function(jq, text){
            return findItem(jq[0], text);
        },
        /**
         * append menu item, the param contains following properties:
         * parent,id,text,iconCls,href,onclick
         * when parent property is assigned, append menu item to it
         */
        appendItem: function(jq, param){
            return jq.each(function(){
                appendItem(this, param);
            });
        },
        removeItem: function(jq, itemEl){
            return jq.each(function(){
                removeItem(this, itemEl);
            });
        },
        enableItem: function(jq, itemEl){
            return jq.each(function(){
                setDisabled(this, itemEl, false);
            });
        },
        disableItem: function(jq, itemEl){
            return jq.each(function(){
                setDisabled(this, itemEl, true);
            });
        }
    };

    $.fn.menu.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ['left', 'top']));
    };

    $.fn.menu.defaults = {
        zIndex:110000,
        left: 0,
        top: 0,
        onShow: function(){},
        onHide: function(){},
        onClick: function(item){}
    };
})(jQuery);
/**
 * menubutton - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   linkbutton
 *   menu
 */
(function($){

    function init(target){
        var opts = $.data(target, 'menubutton').options;
        var btn = $(target);
        if (!btn.attr('id')) btn.attr('id', $.parser.getObjGUID());
        btn.removeClass('m-btn-active m-btn-plain-active').addClass('m-btn');
        btn.linkbutton($.extend({}, opts, {
            text: opts.text + '<span class="m-btn-downarrow">&nbsp;</span>'
        }));

        if (opts.menu){
            var $menu = $(opts.menu);
            $menu.attr("parentbtnid", btn.attr('id'));
            $menu.menu({
                onShow: function(){
                    var btn = $('#' + $(this).attr('parentbtnid'));
                    var opts = $.data(btn[0], 'menubutton').options;
                    btn.addClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
                },
                onHide: function(){
                    var btn = $('#' + $(this).attr('parentbtnid'));
                    var opts = $.data(btn[0], 'menubutton').options;
                    btn.removeClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
                }
            });
        }
        setDisabled(target, opts.disabled);
    }

    function setDisabled(target, disabled){
        var opts = $.data(target, 'menubutton').options;
        opts.disabled = disabled;

        var btn = $(target);
        if (disabled){
            btn.linkbutton('disable');
            btn.unbind('.menubutton');
        } else {
            btn.linkbutton('enable');
            btn.unbind('.menubutton');
            btn.bind('click.menubutton', function(){
                var opts = $.data(this, 'menubutton').options;
                showMenu(opts, this);
                return false;
            });
            var timeout = null;
            btn.bind('mouseenter.menubutton', function(){
                var opts = $.data(this, 'menubutton').options;
                var btn = this;
                timeout = setTimeout(function(){
                    showMenu(opts, btn);
                }, opts.duration);
                return false;
            }).bind('mouseleave.menubutton', function(){
                    if (timeout){
                        clearTimeout(timeout);
                    }
                });
        }

        function showMenu(opts, target){
            if (!opts.menu) return;
            var btn = $(target);

            var left = btn.offset().left;
            if (left + $(opts.menu).outerWidth() + 5 > document.body.clientWidth/*$(window).width()*/){
                left = document.body.clientWidth - $(opts.menu).outerWidth() - 5;
            }

            $('body>div.menu-top').menu('hide');
            $(opts.menu).menu('show', {
                left: left,
                top: btn.offset().top + btn.outerHeight()
            });
            btn.blur();
        }
    }

    $.fn.menubutton = function(options, param){
        if (typeof options == 'string'){
            return $.fn.menubutton.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'menubutton');
            if (state){
                $.extend(state.options, options);
            } else {
//				$(this).append('<span class="m-btn-downarrow">&nbsp;</span>');
                $.data(this, 'menubutton', {
                    options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), options)
                });
                $(this).prop('disabled', false);
            }

            init(this);
        }, [options]);
    };

    $.fn.menubutton.methods = {
        options: function(jq){
            return $.data(jq[0], 'menubutton').options;
        },
        enable: function(jq){
            return jq.each(function(){
                setDisabled(this, false);
            });
        },
        disable: function(jq){
            return jq.each(function(){
                setDisabled(this, true);
            });
        },
        destroy: function(jq){
            return jq.each(function(){
                var opts = $(this).menubutton('options');
                if (opts.menu){
                    $(opts.menu).menu('destroy');
                }
                $(this).remove();
            });
        }
    };

    $.fn.menubutton.parseOptions = function(target){
        return $.extend({}, $.fn.linkbutton.parseOptions(target),
            $.parser.parseOptions(target, ['menu', {plain:'boolean', duration:'number'}]));
    };

    $.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
        plain: true,
        menu: null,
        duration: 100
    });
})(jQuery);
/**
 * splitbutton - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   linkbutton
 *   menu
 */
(function($){

    function init(target, state){
        if (!state) state = $.data(target, 'splitbutton');
        var opts = state.options;

        var btn = $(target);
        if (!btn.attr('id')) btn.attr('id', $.parser.getObjGUID());
        btn.removeClass('s-btn-active s-btn-plain-active').addClass('s-btn');
        btn.linkbutton($.extend({}, opts, {
            text: opts.text + '<span class="s-btn-downarrow">&nbsp;</span>'
        }));

        if (opts.menu){
            var $menu = $(opts.menu);
            $menu.attr("parentbtnid", btn.attr('id'));
            $menu.menu({
                onShow: function(){
                    var btn = $('#' + $(this).attr('parentbtnid'));
                    var opts = $.data(btn[0], 'menubutton').options;
                    btn.addClass((opts.plain==true) ? 's-btn-plain-active' : 's-btn-active');
                },
                onHide: function(){
                    var btn = $('#' + $(this).attr('parentbtnid'));
                    var opts = $.data(btn[0], 'menubutton').options;
                    btn.removeClass((opts.plain==true) ? 's-btn-plain-active' : 's-btn-active');
                }
            });
        }

        setDisabled(target, opts.disabled, state);
    }

    function setDisabled(target, disabled, state){
        if (!state) state = $.data(target, 'splitbutton');
        var opts = state.options;
        opts.disabled = disabled;

        var btn = $(target);
        var menubtn = btn.find('.s-btn-downarrow');
        if (disabled){
            btn.linkbutton('disable');
            menubtn.unbind('.splitbutton');
        } else {
            btn.linkbutton('enable');
            menubtn.unbind('.splitbutton');
            menubtn.bind('click.splitbutton', function(){
                var target = $(this).parents('.s-btn')[0];
                showMenu(target);
                return false;
            });
            var timeout = null;
            menubtn.bind('mouseenter.splitbutton', function(){
                timeout = setTimeout(function(){
                    var target = $(this).parents('.s-btn')[0];
                    showMenu(target);
                    target = null;
                }, opts.duration);
                return false;
            }).bind('mouseleave.splitbutton', function(){
                    if (timeout){
                        clearTimeout(timeout);
                    }
                });
        }

        function showMenu(target){
            var opts = $.data(target, 'menubutton').options;
            if (!opts.menu) return;
            var btn = $(target);
            var left = btn.offset().left;
            if (left + $(opts.menu).outerWidth() + 5 > $(window).width()){
                left = $(window).width() - $(opts.menu).outerWidth() - 5;
            }

            $('body>div.menu-top').menu('hide');
            $(opts.menu).menu('show', {
                left: left,
                top: btn.offset().top + btn.outerHeight()
            });
            btn.blur();
        }
    }

    $.fn.splitbutton = function(options, param){
        if (typeof options == 'string'){
            return $.fn.splitbutton.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'splitbutton');
            if (state){
                $.extend(state.options, options);
            } else {
//				$(this).append('<span class="s-btn-downarrow">&nbsp;</span>');
                $.data(this, 'splitbutton', {
                    options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), options)
                });
                $(this).prop('disabled', false);
            }
            init(this, state);
        }, [options]);
    };

    $.fn.splitbutton.methods = {
        options: function(jq){
            return $.data(jq[0], 'splitbutton').options;
        },
        enable: function(jq){
            return jq.each(function(){
                setDisabled(this, false);
            });
        },
        disable: function(jq){
            return jq.each(function(){
                setDisabled(this, true);
            });
        },
        destroy: function(jq){
            return jq.each(function(){
                var opts = $(this).splitbutton('options');
                if (opts.menu){
                    $(opts.menu).menu('destroy');
                }
                $(this).remove();
            });
        }
    };

    $.fn.splitbutton.parseOptions = function(target){
        var t = $(target);
        return $.extend({}, $.fn.linkbutton.parseOptions(target),
            $.parser.parseOptions(target, ['menu', {plain:'boolean', duration:'number'}]));

    };

    $.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
        plain: true,
        menu: undefined,
        duration: 100
    });
})(jQuery);/**
 * searchbox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	menubutton
 *
 */
(function($){
    function init(target){
        var $target = $(target);
        $target.hide();
        var span = $('<span class="searchbox"></span>').insertAfter(target);
        var input = $('<input type="text" class="searchbox-text">').appendTo(span);
        $('<span><span class="searchbox-button"></span></span>').appendTo(span);

        var name = $target.attr('name');
        if (name){
            input.attr('name', name);
            $target.removeAttr('name').attr('searchboxName', name);
        }

        return span;
    }

    function setSize(target, width, state){
        if (!state) state = $.data(target, 'searchbox');
        var opts = state.options;
        var sb = state.searchbox;
        if (width) opts.width = width;
        sb.appendTo('body');

        if (isNaN(opts.width)){
            opts.width = sb.outerWidth();
        }
        sb._outerWidth(opts.width);
        sb.find('input.searchbox-text')._outerWidth(sb.width() - sb.find('a.searchbox-menu').outerWidth() - sb.find('span.searchbox-button').outerWidth());

        sb.insertAfter(target);
    }

    function buildMenu(target, state){
        if (!state) state = $.data(target, 'searchbox');
        var opts = state.options, btnId;
        var btn = $(target);
        if (opts.menu){
            if (!btn.attr('id')) btn.attr('id', $.parser.getObjGUID());
            var $menu;
            //menu是数组，表示为具体明细项，需要再次构建menu
            if (typeof opts.menu == 'object' && opts.menu.length) {
//                <div data-options="name:'sports'">Sports News</div>
                var sMenu = "";
                for (var i = 0, len = opts.menu.length; i < len; i++) {
                    var m = opts.menu[i];
                    sMenu += "<div data-options=\"name:'" + m.field + "'\">" + m.title + "</div>";

                }
                $menu = $('<div style="width:' + opts.menuWidth + 'px">' + sMenu + '</div>').appendTo('body');
            } else $menu = $(opts.menu);

            $menu.attr("searchboxId", btn.attr('id'));
            state.menu = $menu.menu({
                onClick:function(item){
                    var target = $('#' + $(this).attr('searchboxId'))[0];
                    attachMenu(item, target);
                }
            });
            var item = state.menu.children('div.menu-item:first');
            var data = {item:item};
            state.menu.children('div.menu-item').each(function (data) {
                var itemOpts = $.extend({}, $.parser.parseOptions(this), {
                    selected:($(this).prop('selected') ? true : undefined)
                });
                if (itemOpts.selected) {
                    data.item = $(this);
                    return false;
                }
            }, [data]);
            item = data.item;
            data = null;
            item.triggerHandler('click');
        } else {
            state.searchbox.find('a.searchbox-menu').remove();
            state.menu = null;
        }

        function attachMenu(item, target){
            var state = $.data(target, 'searchbox');
            state.searchbox.find('a.searchbox-menu').remove();
            /*"parentbtnid", btn.attr('id')*/
            var mb = $('<a class="searchbox-menu" href="javascript:void(0)"></a>').html(item.text);
            mb.prependTo(state.searchbox).menubutton({
                menu:state.menu,
                iconCls:item.iconCls
            });
            state.searchbox.find('input.searchbox-text').attr('name', $(item.target).attr('name') || item.text);
            setSize(target, undefined, state);
        }
    }

    function bindEvents(target, state){
        if (!state) state = $.data(target, 'searchbox');
        var input = state.searchbox.find('input.searchbox-text');
        input.unbind('.searchbox').bind('blur.searchbox', {target:target}, function(e){
            var state = $.data(e.data.target, 'searchbox');
            var opts = state.options;
            opts.value = $(this).val();
            if (opts.value == ''){
                $(this).val(opts.prompt);
                $(this).addClass('searchbox-prompt');
            } else {
                $(this).removeClass('searchbox-prompt');
            }
        }).bind('focus.searchbox', {target:target},function(e){
                var state = $.data(e.data.target, 'searchbox');
                var opts = state.options;
                if ($(this).val() != opts.value){
                    $(this).val(opts.value);
                }
                $(this).removeClass('searchbox-prompt');
            }).bind('keydown.searchbox', {target: target}, function(e){
                if (e.keyCode == 13){
                    var state = $.data(e.data.target, 'searchbox');
                    var opts = state.options;
                    var input = state.searchbox.find('input.searchbox-text');

                    e.preventDefault();
                    var name = $.fn.prop ? input.prop('name') : input.attr('name');
                    opts.value = $(this).val();
                    opts.searcher.call(e.data.target, opts.value, name);
                    return false;
                }
            });

        state.searchbox.find('.searchbox-button').unbind('.searchbox').bind('click.searchbox', {target:target},function (e) {
            var state = $.data(e.data.target, 'searchbox');
            var opts = state.options;
            var input = state.searchbox.find('input.searchbox-text');
            var name = $.fn.prop ? input.prop('name') : input.attr('name');
            opts.searcher.call(target, opts.value, name);
        }).bind('mouseenter.searchbox', function(){
                $(this).addClass('searchbox-button-hover');
            }).bind('mouseleave.searchbox', function(){
                $(this).removeClass('searchbox-button-hover');
            });
    }

    function initValue(target, state){
        if (!state) state = $.data(target, 'searchbox');
        var opts = state.options;
        var input = state.searchbox.find('input.searchbox-text');
        if (opts.value == ''){
            input.val(opts.prompt);
            input.addClass('searchbox-prompt');
        } else {
            input.val(opts.value);
            input.removeClass('searchbox-prompt');
        }
    }

    $.fn.searchbox = function(options, param){
        if (typeof options == 'string'){
            return $.fn.searchbox.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'searchbox');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'searchbox', {
                    options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), options),
                    searchbox: init(this)
                });
            }
            buildMenu(this, state);
            initValue(this, state);
            bindEvents(this, state);
            setSize(this, undefined, state);
        });
    };

    $.fn.searchbox.methods = {
        options: function(jq){
            return $.data(jq[0], 'searchbox').options;
        },
        menu: function(jq){
            return $.data(jq[0], 'searchbox').menu;
        },
        textbox: function(jq){
            return $.data(jq[0], 'searchbox').searchbox.find('input.searchbox-text');
        },
        getValue: function(jq){
            return $.data(jq[0], 'searchbox').options.value;
        },
        setValue: function(jq, value){
            return jq.each(function(){
                $(this).searchbox('options').value = value;
                $(this).searchbox('textbox').val(value);
                $(this).searchbox('textbox').blur();
            });
        },
        getName: function(jq){
            return $.data(jq[0], 'searchbox').searchbox.find('input.searchbox-text').attr('name');
        },
        selectName: function(jq, name){
            return jq.each(function(){
                var menu = $.data(this, 'searchbox').menu;
                if (menu){
                    menu.children('div.menu-item[name="'+name+'"]').triggerHandler('click');
                }
            });
        },
        destroy: function(jq){
            return jq.each(function(){
                var menu = $(this).searchbox('menu');
                if (menu){
                    menu.menu('destroy');
                }
                $.data(this, 'searchbox').searchbox.remove();
                $(this).remove();
            });
        },
        resize: function(jq, width){
            return jq.each(function(){
                setSize(this, width);
            });
        }
    };

    $.fn.searchbox.parseOptions = function(target){
        var t = $(target), s = t.attr('searcher');
        return $.extend({},
            $.parser.parseOptions(target, ['width', 'prompt', 'menu']), {
                value:t.val(),
                searcher:(s ? eval(s) : undefined)
            });
    };

    $.fn.searchbox.defaults = {
        width:'auto',
        prompt:'',
        value:'',
        menu:undefined,//增加一种格式，数组[{field:'',title:''}]
        menuWidth: 150,
        searcher:function(value,name){}
    };
})(jQuery);/**
 * validatebox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 */
(function ($) {

    function init(target) {
        $(target).addClass('validatebox-text');
    }

    /**
     * destroy the box, including it's tip object.
     */
    function destroyBox(target) {
        var state = $.data(target, 'validatebox');
        state.validating = false;
        var tip = state.tip;
        if (tip) {
            tip.remove();
        }
        var $target = $(target);
        $target.unbind();
        $target.remove();
    }

    /**
     * 取消验证
     *
     * @param target
     * @param options
     */
    function cancelValidate(target, options) {
        var state = $.data(target, 'validatebox');
        state.validating = false;
        options.rules = state.options.rules;
        state.options = options;
        var tip = state.tip;
        if (tip) {
            tip.remove();
        }
        var $target = $(target);
        //$target.unbind();
        $target.removeClass('validatebox-text validatebox-invalid');
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var box = $(target);

        state.validating = false;
        //输入监听
        var en = $.browser.msie ? "propertychange.validatebox" : "input.validatebox";
        box.unbind('.validatebox').bind('focus.validatebox',function () {
            var target = this;
            var state = $.data(target, 'validatebox');
            state.validating = true;
            state.value = undefined;
            _validate(target, state);
        }).bind('blur.validatebox',function () {
                var target = this;
                var state = $.data(target, 'validatebox');
                state.validating = false;
                hideTip(target);
            }).bind(en,function () {
                var target = this;
                var state = $.data(target, 'validatebox');
                _validate(target, state);
            }).bind('mouseenter.validatebox',function () {
                var target = this;
                if ($(target).hasClass('validatebox-invalid')) {
                    showTip(target);
                }
            }).bind('mouseleave.validatebox', function () {
                hideTip(this);
            });

        function _validate(target, state) {
            var box = $(target);
            if (state.validating) {
                if (state.value != box.val()) {    // when box value changed, validate it
                    state.value = box.val();
                    validate(target);
                }
            }
        }
    }

    /**
     * show tip message.
     */
    function showTip(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var box = $(target);
        var msg = state.message;
        var tip = state.tip;
        if (!tip) {
            tip = $(
                '<div class="validatebox-tip">' +
                    '<span class="validatebox-tip-content">' +
                    '</span>' +
                    '<span class="validatebox-tip-pointer">' +
                    '</span>' +
                    '</div>'
            ).appendTo('body');
            state.tip = tip;
        }
        tip.find('.validatebox-tip-content').html(msg);
        /*：提示超出屏幕，处理下位置*/
        /*tip.css({
         display:'block',
         left:box.offset().left + box.outerWidth(),
         top:box.offset().top
         })*/
        var bw = box.outerWidth(), bh = box.outerHeight(), bs = box.offset();
        var x = bs.left + bw, y = bs.top;
        if (x + tip.outerWidth() > document.body.offsetWidth) {
            x = bs.left;
            y = bs.top + bh;
            if (y + tip.outerHeight() > document.body.offsetHeight - 20) y = bs.top - bh;
        }

        //  若提示文字为空则不显示
        if (msg == '' || msg == null) {
            tip.css({display: 'none', left: x, top: y});
        }
        else {
            tip.css({display: "block", left: x, top: y});
        }
    }

    /**
     * hide tip message.
     */
    function hideTip(target, state) {
        if (!state) state = $.data(target, 'validatebox');
        var tip = state.tip;
        if (tip) {
            tip.remove();
            state.tip = null;
        }
    }

    /**
     * 动态验证  add 2014/01/06
     *
     * @param target
     * @param state
     */
    function activateValidate(target, state) {
        $(target).data('validatebox', state);

        validate(target);
    }

    /**
     * do validate action
     */
    function validate(target) {
        var state = $.data(target, 'validatebox');
        var opts = state.options;
        var box = $(target);
        var value = box.val();

        function setTipMessage(msg) {
            state.message = msg;
        }

        // if the box is disabled, skip validate action.
        var disabled = box.prop('disabled');
        if (disabled == true || disabled == 'true') {
            return true;
        }

        if (opts.required) {
            if (value == '') {
                box.addClass('validatebox-invalid');
                setTipMessage(opts.missingMessage);
                showTip(target, state);
                return false;
            }
        }
        if (opts.customValid) {
            var s = opts.customValid.call(target, value);
            if (typeof s == 'string' && s.length > 0) {
                box.addClass('validatebox-invalid');
                setTipMessage(s);
                showTip(target, state);
                return false;
            }
        } else if (opts.validType) {
            var result = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
            var rule = opts.rules[result[1]];
            if (value && rule) {
                var param = eval(result[2]);
                if (!rule['validator'](value, param)) {
                    box.addClass('validatebox-invalid');

                    var message = rule['message'];
                    if (param) {
                        for (var i = 0; i < param.length; i++) {
                            message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
                        }
                    }
                    setTipMessage(opts.invalidMessage || message);
                    showTip(target, state);
                    return false;
                }
            }
        }

        box.removeClass('validatebox-invalid');
        hideTip(target, state);
        return true;
    }

    $.fn.validatebox = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.validatebox.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'validatebox');
            if (state) {
                $.extend(state.options, options);
            } else {
                init(this);
                state = $.data(this, 'validatebox', {
                    options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), options)
                });
            }

            bindEvents(this, state);
        }, [options]);
    };

    $.fn.validatebox.methods = {
        destroy: function (jq) {
            return jq.each(function () {
                destroyBox(this);
            });
        },
        validate: function (jq) {
            return jq.each(function () {
                validate(this);
            });
        },
        isValid: function (jq) {
            return validate(jq[0]);
        },
        activate: function (jq, state) {
            activateValidate(jq[0], state);
        },
        cancel: function (jq, options) {
            cancelValidate(jq[0], options);
        }
    };

    $.fn.validatebox.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ['validType', 'missingMessage', 'invalidMessage']), {
            required: (t.attr('required') ? true : undefined)
        });
    };

    $.fn.validatebox.defaults = {
        required: false,
        validType: null,
        missingMessage: 'This field is required.',
        invalidMessage: null,
        customValid: undefined,
        rules: {
            email: {
                validator: function (value) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
                },
                message: 'Please enter a valid email address.'
            },
            url: {
                validator: function (value) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
                },
                message: 'Please enter a valid URL.'
            },
            length: {
                validator: function (value, param) {
                    var len = $.trim(value).length;
                    return len >= param[0] && len <= param[1]
                },
                message: 'Please enter a value between {0} and {1}.'
            },
            remote: {
                validator: function (value, param) {
                    var data = {};
                    data[param[1]] = value;
                    var response = $.ajax({
                        url: param[0],
                        dataType: 'json',
                        data: data,
                        async: false,
                        cache: false,
                        type: 'post'
                    }).responseText;
                    return response == 'true';
                },
                message: 'Please fix this field.'
            }
        }
    };
})(jQuery);/**
 * form - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 */
(function($){
    /**
     * submit the form
     */
    function ajaxSubmit(target, options){
        options = options || {};

        if (options.onSubmit){
            if (options.onSubmit.call(target) == false) {
                return;
            }
        }

        var form = $(target);
        if (options.url){
            form.attr('action', options.url);
        }
        var frameId = 'easyui_frame_' + (new Date().getTime());
        var frame = $('<iframe id='+frameId+' name='+frameId+'></iframe>')
            .attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
            .css({
                position:'absolute',
                top:-1000,
                left:-1000
            });
        var t = form.attr('target'), a = form.attr('action');
        form.attr('target', frameId);
        try {
            frame.appendTo('body');
            frame.bind('load', cb);
            form[0].submit();
        } finally {
            form.attr('action', a);
            t ? form.attr('target', t) : form.removeAttr('target');
        }

        var checkCount = 10;
        function cb(){
            frame.unbind();
            var body = $('#'+frameId).contents().find('body');
            var data = body.html();
            if (data == ''){
                if (--checkCount){
                    setTimeout(cb, 100);
                    return;
                }
                return;
            }
            var ta = body.find('>textarea');
            if (ta.length){
                data = ta.val();
            } else {
                var pre = body.find('>pre');
                if (pre.length){
                    data = pre.html();
                }
            }
            if (options.success){
                options.success(data);
            }
//			try{
//				eval('data='+data);
//				if (options.success){
//					options.success(data);
//				}
//			} catch(e) {
//				if (options.failure){
//					options.failure(data);
//				}
//			}
            setTimeout(function(){
                frame.unbind();
                frame.remove();
            }, 100);
        }
    }

    /**
     * load form data
     * if data is a URL string type load from remote site,
     * otherwise load from local data object.
     */
    function load(target, data){
        var state = $.data(target, 'form');
        if (!state){
            state = $.data(target, 'form', {
                options: $.extend({}, $.fn.form.defaults)
            });
        }
        var opts = state.options;

        if (typeof data == 'string'){
            var param = {};
            if (opts.onBeforeLoad.call(target, param) == false) return;

            $.ajax({
                url: data,
                data: param,
                dataType: 'json',
                success: function(data){
                    _load(data);
                },
                error: function(){
                    opts.onLoadError.apply(target, arguments);
                }
            });
        } else {
            _load(data);
        }

        function _load(data){
            var form = $(target);
            for(var name in data){
                var val = data[name];
                var rr = _checkField(name, val);
                if (!rr.length){
                    var f = form.find('input[numberboxName="'+name+'"]');
                    if (f.length){
                        f.numberbox('setValue', val);	// set numberbox value
                    } else {
                        $('input[name="'+name+'"]', form).val(val);
                        $('textarea[name="'+name+'"]', form).val(val);
                        $('select[name="'+name+'"]', form).val(val);
                    }
                }
                _loadCombo(name, val);
            }
            opts.onLoadSuccess.call(target, data);
            validate(target);
        }

        /**
         * check the checkbox and radio fields
         */
        function _checkField(name, val){
            var form = $(target);
            var rr = $('input[name="'+name+'"][type=radio], input[name="'+name+'"][type=checkbox]', form);
            $.fn.prop ? rr.prop('checked',false) : rr.attr('checked',false);
            rr.each(function(){
                var f = $(this);
//				console.log(name+":"+f.val()+","+val)
                if (f.val() == String(val)){
                    $.fn.prop ? f.prop('checked',true) : f.attr('checked',true);
                }
            });
            return rr;
        }

        function _loadCombo(name, val){
            var form = $(target);
            var cc = ['combobox','combotree','combogrid','datetimebox','datebox','combo'];
            var c = form.find('[comboName="' + name + '"]');
            if (c.length){
                for(var i=0; i<cc.length; i++){
                    var type = cc[i];
                    if (c.hasClass(type+'-f')){
                        if (c[type]('options').multiple){
                            c[type]('setValues', val);
                        } else {
                            c[type]('setValue', val);
                        }
                        return;
                    }
                }
            }
        }
    }

    /**
     * clear the form fields
     */
    function clear(target){
        $('input,select,textarea', target).each(function(){
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == 'text' || t == 'hidden' || t == 'password' || tag == 'textarea'){
                this.value = '';
            } else if (t == 'file'){
                var file = $(this);
                file.after(file.clone().val(''));
                file.remove();
            } else if (t == 'checkbox' || t == 'radio'){
                this.checked = false;
            } else if (tag == 'select'){
                this.selectedIndex = -1;
            }

        });
        if ($.fn.combo) $('.combo-f', target).combo('clear');
        if ($.fn.combobox) $('.combobox-f', target).combobox('clear');
        if ($.fn.combotree) $('.combotree-f', target).combotree('clear');
        if ($.fn.combogrid) $('.combogrid-f', target).combogrid('clear');
        validate(target);
    }

    /**
     * set the form to make it can submit with ajax.
     */
    function setForm(target){
        var form = $(target), targetId = form.attr('id');
        if (!targetId) {
            targetId = $.parser.getObjGUID();
            form.attr('id', targetId);
        }
        form.unbind('.form').bind('submit.form', function(){
            setTimeout(function(){
                var target = $('#targetId')[0];
                ajaxSubmit(target, $.data(target, 'form').options);
            }, 0);
            return false;
        });
    }

    function validate(target){
        if ($.fn.validatebox){
            $('.validatebox-invalid', target).removeClass('validatebox-invalid');
            var box = $('.validatebox-text:enabled:visible', target);
            if (box.length){
                box.validatebox('validate');
                box.trigger('focus');
                box.trigger('blur');
                var invalidbox = $('.validatebox-invalid:first', target).focus();
                return invalidbox.length == 0;
            }
        }
        return true;
    }

    $.fn.form = function(options, param){
        if (typeof options == 'string'){
            return $.fn.form.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'form');
            if (!state){
                state = $.data(this, 'form', {
                    options: $.extend({}, $.fn.form.defaults, options)
                });
            }
            setForm(this, state);
        });
    };

    $.fn.form.methods = {
        submit: function(jq, options){
            return jq.each(function(){
                ajaxSubmit(this, $.extend({}, $.fn.form.defaults, options||{}));
            });
        },
        load: function(jq, data){
            return jq.each(function(){
                load(this, data);
            });
        },
        clear: function(jq){
            return jq.each(function(){
                clear(this);
            });
        },
        validate: function(jq){
            return validate(jq[0]);
        }
    };

    $.fn.form.defaults = {
        url: null,
        onSubmit: function(){return $(this).form('validate');},
        success: function(data){},
        onBeforeLoad: function(param){},
        onLoadSuccess: function(data){},
        onLoadError: function(){}
    };
})(jQuery);/**
 * numberbox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      validatebox
 *
 */
(function ($) {
    /**
     * init the component and return its value field object;
     */
    function init(target) {
        var v = $('<input type="hidden">').insertAfter(target);
        if (!this.id) this.id = $.parser.getObjGUID();
        var name = $(target).attr('name');
        if (name) {
            v.attr('name', name);
            $(target).removeAttr('name').attr('numberboxName', name);
        }
        return v;
    }
    /* 获得焦点时，转为*/
    function focus(target) {
        var state = $.data(target, "numberbox"), $target = $(target);
        var opts = state.options;
        var val = $target.val() + "";
        if (opts.onGetValue)  val = opts.onGetValue(val, opts.precision);
        else {
            val = val.toDouble(opts.precision);
        }
        $target.val(val);
        state.field.val(val);
        $target.select();
    }
    //set the initialized value
    function initValue(target) {
        var opts = $.data(target, 'numberbox').options;
        var fn = opts.onChange;
        opts.onChange = function () {
        };
        setValue(target, opts.parser.call(target, opts.value));
        opts.onChange = fn;
    }

    function getValue(target) {
        return $.data(target, 'numberbox').field.val();
    }

    function setValue(target, value) {
        var state = $.data(target, 'numberbox');
        var opts = state.options;
        var oldValue = getValue(target);
        value = opts.parser.call(target, value);
        opts.value = value;
        state.field.val(value);
        $(target).val(opts.formatter.call(target, value));

        $(target).numberbox('validate');
        if (oldValue != value) {
            opts.onChange.call(target, value, oldValue);
        }
    }

    function bindEvents(target) {
        $(target).unbind('.numberbox').bind('keypress.numberbox',
            function (e) {
                if (e.which == 45) {    //-
                    var sel = getInputSelection(this.id) + '';
                    return sel.indexOf("-") >= 0 || $(this).val().indexOf('-') < 0;
                }
                if (e.which == 46) {    //.
                    var sel = getInputSelection(this.id) + '';
                    return sel.indexOf(".") >= 0 || $(this).val().indexOf('.') < 0;
//                        return $(this).val().indexOf('.') == -1;
                }
                else if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                    return true;
                } else return e.ctrlKey == true && (e.which == 99 || e.which == 118);
            }).bind('paste.numberbox', function () {
                if (window.clipboardData) {
                    var s = clipboardData.getData('text');
                    return !/\D/.test(s);
                } else {
                    return false;
                }
            }).bind('dragenter.numberbox', function () {
                return false;
            }).bind('blur.numberbox', function () {
                setValue(this, $(this).val());
                var opts = $.data(this, 'numberbox').options;
                $(this).val(opts.formatter.call(this, getValue(this)));
                $(this).trigger("change");
            }).bind('focus.numberbox', function () {
                //
                focus(this);
                var vv = getValue(this);
                if ($(this).val() != vv) {
                    $(this).val(vv);
                }
            });
    }

    /**do the validate if necessary. */
    function validate(target) {
        if ($.fn.validatebox) {
            var opts = $.data(target, 'numberbox').options;
            $(target).validatebox(opts);
        }
    }

    function setDisabled(target, disabled) {
        var opts = $.data(target, 'numberbox').options;
        if (disabled) {
            opts.disabled = true;
            $(target).prop('disabled', true);
        } else {
            opts.disabled = false;
            $(target).prop('disabled', false);
        }
    }

    $.fn.numberbox = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.numberbox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.validatebox(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'numberbox');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'numberbox', {
                    options:$.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), options),
                    field:init(this)
                });
                $(this).prop('disabled', false);
                $(this).css({imeMode:"disabled"});
            }

            setDisabled(this, state.options.disabled);
            bindEvents(this);
            validate(this);
            initValue(this);
        }, [options]);
    };

    $.fn.numberbox.methods = {
        options:function (jq) {
            return $.data(jq[0], 'numberbox').options;
        },
        destroy:function (jq) {
            return jq.each(function () {
                $.data(this, 'numberbox').field.remove();
                $(this).validatebox('destroy');
                $(this).remove();
            });
        },
        disable:function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
            });
        },
        enable:function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
            });
        },
        fix:function (jq) {
            return jq.each(function () {
                setValue(this, $(this).val());
            });
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        },
        getValue:function (jq) {
            return getValue(jq[0]);
        },
        clear:function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'numberbox');
                state.field.val('');
                $(this).val('');
//				$(this).numberbox('validate');
            });
        }
    };

    $.fn.numberbox.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, [
            'decimalSeparator', 'groupSeparator', 'prefix', 'suffix',
            {min:'number', max:'number', precision:'number'}
        ]), {
            disabled:(t.prop('disabled') ? true : undefined),
            value:(t.val() || undefined)
        });
//        return $.extend({}, $.fn.validatebox.parseOptions(target), {
//            disabled:(t.prop('disabled') ? true : undefined),
//            value:(t.val() || undefined),
//            min:(t.attr('min') == '0' ? 0 : parseFloat(t.attr('min')) || undefined),
//            max:(t.attr('max') == '0' ? 0 : parseFloat(t.attr('max')) || undefined),
//            precision:(parseInt(t.attr('precision')) || undefined),
//            decimalSeparator:(t.attr('decimalSeparator') ? t.attr('decimalSeparator') : undefined),
//            groupSeparator:(t.attr('groupSeparator') ? t.attr('groupSeparator') : ','),
//            prefix:(t.attr('prefix') ? t.attr('prefix') : undefined),
//            suffix:(t.attr('suffix') ? t.attr('suffix') : undefined)
//        });
    };
    // Inherited from $.fn.validatebox.defaults
    $.fn.numberbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
        disabled:false,
        value:'',
        min:null,
        max:null,
        precision:0,
        decimalSeparator:'.',
        groupSeparator:',',
        prefix:'',
        suffix:'',
        zeroEmpty: true,
        canNull:false,

        formatter:function (value) {
            if (!value) return value;
            value = value + '';
            var opts = $(this).numberbox('options');
            if (opts.zeroEmpty && value == 0) return '';
            var s1 = value, s2 = '';
            var dpos = value.indexOf('.');
            if (dpos >= 0) {
                s1 = value.substring(0, dpos);
                s2 = value.substring(dpos + 1, value.length);
            }
            if (opts.groupSeparator) {
                var p = /(\d+)(\d{3})/;
                while (p.test(s1)) {
                    s1 = s1.replace(p, '$1' + opts.groupSeparator + '$2');
                }
            }
            if (s2) {
                return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
            } else {
                return opts.prefix + s1 + opts.suffix;
            }
        },
        parser:function (s) {
            s = s + '';
            var opts = $(this).numberbox('options');
            if (opts.groupSeparator) s = s.replace(new RegExp('\\' + opts.groupSeparator, 'g'), '');
            if (opts.decimalSeparator) s = s.replace(new RegExp('\\' + opts.decimalSeparator, 'g'), '.');
            if (opts.prefix) s = s.replace(new RegExp('\\' + $.trim(opts.prefix), 'g'), '');
            if (opts.suffix) s = s.replace(new RegExp('\\' + $.trim(opts.suffix), 'g'), '');
            s = s.replace(/\s/g, '');

            var val = parseFloat(s).toFixed(opts.precision);
            if (isNaN(val)) {
                if(!s&&opts.canNull){
                    val='';
                }else{
                    val = '0';
                }
            } else if (typeof(opts.min) == 'number' && val < opts.min) {
                val = opts.min.toFixed(opts.precision);
            } else if (typeof(opts.max) == 'number' && val > opts.max) {
                val = opts.max.toFixed(opts.precision);
            }
            if (opts.onFormatter)  val = opts.onFormatter(val, opts.precision);
            else {
                // modify by huangchun
                // val = parseFloat(val).format(opts.precision);
            }
            return val;
        },
        onChange:function (newValue, oldValue) {
        }
    });
})(jQuery);/**
 * calendar - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 */
(function ($) {

    function setSize(target, state) {
        if (!state) state = $.data(target, 'calendar');
        var opts = state.options;
        var t = $(target);
        if (opts.fit == true) {
            var p = t.parent();
            opts.width = p.width();
            opts.height = p.height();
        }
        var header = t.find('.calendar-header');
        t._outerWidth(opts.width);
        t._outerHeight(opts.height);
        t.find('.calendar-body')._outerHeight(t.height() - header.outerHeight());
    }

    function init(target) {
        var $target = $(target);
        $target.addClass('calendar').wrapInner(
            '<div class="calendar-header">' +
                '<div class="calendar-prevmonth"></div>' +
                '<div class="calendar-nextmonth"></div>' +
                '<div class="calendar-prevyear"></div>' +
                '<div class="calendar-nextyear"></div>' +
                '<div class="calendar-title">' +
                '<span>Aprial 2010</span>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-body">' +
                '<div class="calendar-menu">' +
                '<div class="calendar-menu-year-inner">' +
                '<span class="calendar-menu-prev"></span>' +
                '<span><input class="calendar-menu-year" type="text"/></span>' +
                '<span class="calendar-menu-next"></span>' +
                '</div>' +
                '<div class="calendar-menu-month-inner">' +
                '</div>' +
                '</div>' +
                '</div>'
        );

        $target.find('.calendar-title span').hover(
            function () {
                $(this).addClass('calendar-menu-hover');
            },
            function () {
                $(this).removeClass('calendar-menu-hover');
            }
        ).click(function () {
                var $this = $(this);
                var menu = $this.find('.calendar-menu');
                if (menu.is(':visible')) {
                    menu.hide();
                } else {
                    showSelectMenus($this.parents('.calendar')[0]);
                }
            });

        $('.calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear', target).hover(
            function () {
                $(this).addClass('calendar-nav-hover');
            },
            function () {
                $(this).removeClass('calendar-nav-hover');
            }
        );
        $target.find('.calendar-nextmonth').bind('click', {target: target}, function (e) {
            showMonth(e.data.target, 1);
        });
        $target.find('.calendar-prevmonth').bind('click', {target:target}, function (e) {
            showMonth(e.data.target, -1);
        });
        $target.find('.calendar-nextyear').bind('click', {target:target}, function (e) {
            showYear(e.data.target, 1);
        });
        $target.find('.calendar-prevyear').bind('click', {target:target}, function (e) {
            showYear(e.data.target, -1);
        });

        $target.bind('_resize', function () {
            var st = $.data(this, 'calendar');
            var opts = st.options;
            if (opts.fit == true) {
                setSize(this, st);
            }
            return false;
        });
    }

    /**
     * show the calendar corresponding to the current month.
     */
    function showMonth(target, delta) {
        var state = $.data(target, 'calendar');
        var opts = state.options;
        opts.month += delta;
        if (opts.month > 12) {
            opts.year++;
            opts.month = 1;
        } else if (opts.month < 1) {
            opts.year--;
            opts.month = 12;
        }
        show(target, state);

        var menu = $(target).find('.calendar-menu-month-inner');
        menu.find('td.calendar-selected').removeClass('calendar-selected');
        menu.find('td:eq(' + (opts.month - 1) + ')').addClass('calendar-selected');
    }

    /**
     * show the calendar corresponding to the current year.
     */
    function showYear(target, delta) {
        var state = $.data(target, 'calendar');
        var opts = state.options;
        opts.year += delta;
        show(target, state);

        var menu = $(target).find('.calendar-menu-year');
        menu.val(opts.year);
    }

    /**
     * show the select menu that can change year or month, if the menu is not be created then create it.
     */
    function showSelectMenus(target) {
        var state = $.data(target, 'calendar');
        var opts = state.options, $target = $(target);
        $target.find('.calendar-menu').show();

        var menuMonthInner = $target.find('.calendar-menu-month-inner');
        if (menuMonthInner.is(':empty')) {
            menuMonthInner.empty();
            var t = $('<table></table>').appendTo(menuMonthInner);
            var idx = 0;
            for (var i = 0; i < 3; i++) {
                var tr = $('<tr></tr>').appendTo(t);
                for (var j = 0; j < 4; j++) {
                    $('<td class="calendar-menu-month"></td>').html(opts.months[idx++]).attr('abbr', idx).appendTo(tr);
                }
            }

            $target.find('.calendar-menu-prev,.calendar-menu-next').hover(
                function () {
                    $(this).addClass('calendar-menu-hover');
                },
                function () {
                    $(this).removeClass('calendar-menu-hover');
                }
            );
            $target.find('.calendar-menu-next').bind('click', {target: target}, function (e) {
                var y = $(e.data.target).find('.calendar-menu-year');
                if (!isNaN(y.val())) {
                    y.val(parseInt(y.val()) + 1);
                }
            });
            $target.find('.calendar-menu-prev').bind('click', {target:target}, function (e) {
                var y = $(e.data.target).find('.calendar-menu-year');
                if (!isNaN(y.val())) {
                    y.val(parseInt(y.val() - 1));
                }
            });

            $target.find('.calendar-menu-year').bind('keypress', {target:target}, function (e) {
                if (e.keyCode == 13) {
                    setDate(e.data.target);
                }
            });

            $target.find('.calendar-menu-month').hover(
                function () {
                    $(this).addClass('calendar-menu-hover');
                },
                function () {
                    $(this).removeClass('calendar-menu-hover');
                }
            ).bind('click', {target:target}, function (e) {
                    var menu = $(e.data.target).find('.calendar-menu');
                    menu.find('.calendar-selected').removeClass('calendar-selected');
                    $(this).addClass('calendar-selected');
                    setDate(e.data.target);
                });
        }

        function setDate(target) {
            var state = $.data(target, 'calendar');
            var opts = state.options;
            var menu = $(target).find('.calendar-menu');
            var year = menu.find('.calendar-menu-year').val();
            var month = menu.find('.calendar-selected').attr('abbr');
            if (!isNaN(year)) {
                opts.year = parseInt(year);
                opts.month = parseInt(month);
                show(target, state);
            }
            menu.hide();
        }

        var body = $target.find('.calendar-body');
        var sele = $target.find('.calendar-menu');
        var seleYear = sele.find('.calendar-menu-year-inner');
        var seleMonth = sele.find('.calendar-menu-month-inner');

        seleYear.find('input').val(opts.year).focus();
        seleMonth.find('td.calendar-selected').removeClass('calendar-selected');
        seleMonth.find('td:eq(' + (opts.month - 1) + ')').addClass('calendar-selected');

        sele._outerWidth(body.outerWidth());
        sele._outerHeight(body.outerHeight());
        seleMonth._outerHeight(sele.height() - seleYear.outerHeight());
    }

    /**
     * get weeks data.
     */
    function getWeeks(target, year, month, state) {
        if (!state) state = $.data(target, 'calendar');
        var opts = state.options;
        var dates = [];
        var lastDay = new Date(year, month, 0).getDate(), i;
        for (i = 1; i <= lastDay; i++) dates.push([year, month, i]);

        // group date by week
        var weeks = [], week = [], date, firstDate, lastDate;
        while (dates.length > 0) {
            date = dates.shift();
            week.push(date);
            var day = new Date(date[0], date[1] - 1, date[2]).getDay();
            if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
                weeks.push(week);
                week = [];
            }
        }
        if (week.length) {
            weeks.push(week);
        }

        var firstWeek = weeks[0];
        if (firstWeek.length < 7) {
            while (firstWeek.length < 7) {
                firstDate = firstWeek[0];
                date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - 1)
                firstWeek.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
        } else {
            firstDate = firstWeek[0];
            week = [];
            for (i = 1; i <= 7; i++) {
                date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - i);
                week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.unshift(week);
        }

        var lastWeek = weeks[weeks.length - 1];
        while (lastWeek.length < 7) {
            lastDate = lastWeek[lastWeek.length - 1];
            date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + 1);
            lastWeek.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
        if (weeks.length < 6) {
            lastDate = lastWeek[lastWeek.length - 1];
            week = [];
            for (i = 1; i <= 7; i++) {
                date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + i);
                week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.push(week);
        }

        return weeks;
    }

    /**
     * show the calendar day.
     */
    function show(target, state) {
        if (!state) state = $.data(target, 'calendar');
        var opts = state.options;
        $(target).find('.calendar-title span').html(opts.months[opts.month - 1] + ' ' + opts.year);

        var body = $(target).find('div.calendar-body');
        body.find('>table').remove();

        var t = $('<table cellspacing="0" cellpadding="0" border="0"><thead></thead><tbody></tbody></table>').prependTo(body);
        var tr = $('<tr></tr>').appendTo(t.find('thead')), i, len;
        for (i = opts.firstDay, len = opts.weeks.length; i < len; i++) {
            tr.append('<th>' + opts.weeks[i] + '</th>');
        }
        for (i = 0; i < opts.firstDay; i++) {
            tr.append('<th>' + opts.weeks[i] + '</th>');
        }

        var weeks = getWeeks(target, opts.year, opts.month, state);
        var tbody = t.find('tbody');
        for (i = 0, len = weeks.length; i < len; i++) {
            var week = weeks[i];
            tr = $('<tr></tr>').appendTo(tbody);
            for (var j = 0, lj = week.length; j < lj; j++) {
                var day = week[j];
                $('<td class="calendar-day calendar-other-month"></td>').attr('abbr', day[0] + ',' + day[1] + ',' + day[2]).html(day[2]).appendTo(tr);
            }
        }
        t.find('td[abbr^="' + opts.year + ',' + opts.month + '"]').removeClass('calendar-other-month');

        var now = new Date();
        var today = now.getFullYear() + ',' + (now.getMonth() + 1) + ',' + now.getDate();
        t.find('td[abbr="' + today + '"]').addClass('calendar-today');

        if (opts.current) {
            t.find('.calendar-selected').removeClass('calendar-selected');
            var current = opts.current.getFullYear() + ',' + (opts.current.getMonth() + 1) + ',' + opts.current.getDate();
            t.find('td[abbr="' + current + '"]').addClass('calendar-selected');
        }

        // calulate the saturday and sunday index
        var saIndex = 6 - opts.firstDay;
        var suIndex = saIndex + 1;
        if (saIndex >= 7) saIndex -= 7;
        if (suIndex >= 7) suIndex -= 7;
        var ttr = t.find('tr');
        ttr.find('td:eq(' + saIndex + ')').addClass('calendar-saturday');
        ttr.find('td:eq(' + suIndex + ')').addClass('calendar-sunday');

        t.find('td').hover(
            function () {
                $(this).addClass('calendar-hover');
            },
            function () {
                $(this).removeClass('calendar-hover');
            }
        ).bind('click', {target: target, table: t[0]}, function (e) {
                var state = $.data(e.data.target, 'calendar');
                var opts = state.options, $this = $(this);
                $(e.data.table).find('.calendar-selected').removeClass('calendar-selected');
                $this.addClass('calendar-selected');
                var parts = $this.attr('abbr').split(',');
                opts.current = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
                opts.onSelect.call(e.data.target, opts.current);
            });
    }

    $.fn.calendar = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.calendar.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'calendar'), $this = $(this);
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'calendar', {
                    options:$.extend({}, $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), options)
                });
                init(this);
            }
            if (state.options.border == false) {
                $this.addClass('calendar-noborder');
            }
            setSize(this, state);
            show(this, state);
            $this.find('div.calendar-menu').hide();	// hide the calendar menu
        }, [options]);
    };

    $.fn.calendar.methods = {
        options:function (jq) {
            return $.data(jq[0], 'calendar').options;
        },
        resize:function (jq) {
            return jq.each(function () {
                setSize(this);
            });
        },
        moveTo:function (jq, date) {
            return jq.each(function () {
                $(this).calendar({
                    year:date.getFullYear(),
                    month:date.getMonth() + 1,
                    current:date
                });
            });
        }
    };

    $.fn.calendar.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, [
            'width', 'height', {firstDay:'number', fit:'boolean', border:'boolean'}
        ]));
    };

    $.fn.calendar.defaults = {
        width:180,
        height:180,
        fit:false,
        border:true,
        firstDay:0,
        weeks:['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        year:new Date().getFullYear(),
        month:new Date().getMonth() + 1,
        current:new Date(),

        onSelect:function (date) {
        }
    };
})(jQuery);/**
 * spinner - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   validatebox
 *
 */
(function($){
    /**
     * initialize the spinner.
     */
    function init(target){
        var spinner = $(
            '<span class="spinner">' +
                '<span class="spinner-arrow">' +
                '<span class="spinner-arrow-up"></span>' +
                '<span class="spinner-arrow-down"></span>' +
                '</span>' +
                '</span>'
        ).insertAfter(target);
        $(target).addClass('spinner-text').prependTo(spinner);
        return spinner;
    }

    function setSize(target, width){
        var opts = $.data(target, 'spinner').options;
        var spinner = $.data(target, 'spinner').spinner;
        if (width) opts.width = width;

        var spacer = $('<div style="display:none"></div>').insertBefore(spinner);
        spinner.appendTo('body');

        if (isNaN(opts.width)){
            opts.width = $(target).outerWidth();
        }
        spinner._outerWidth(opts.width);
        $(target)._outerWidth(spinner.width() - spinner.find('.spinner-arrow').outerWidth());

        spinner.insertAfter(spacer);
        spacer.remove();
    }

    function bindEvents(target){
        var opts = $.data(target, 'spinner').options;
        var spinner = $.data(target, 'spinner').spinner;

        spinner.find('.spinner-arrow-up,.spinner-arrow-down').unbind('.spinner');
        if (!opts.disabled){
            spinner.find('.spinner-arrow-up').bind('mouseenter.spinner', function(){
                $(this).addClass('spinner-arrow-hover');
            }).bind('mouseleave.spinner', function(){
                    $(this).removeClass('spinner-arrow-hover');
                }).bind('click.spinner', function(){
                    opts.spin.call(target, false);
                    opts.onSpinUp.call(target);
                    $(target).validatebox('validate');
                });

            spinner.find('.spinner-arrow-down').bind('mouseenter.spinner', function(){
                $(this).addClass('spinner-arrow-hover');
            }).bind('mouseleave.spinner', function(){
                    $(this).removeClass('spinner-arrow-hover');
                }).bind('click.spinner', function(){
                    opts.spin.call(target, true);
                    opts.onSpinDown.call(target);
                    $(target).validatebox('validate');
                });
        }
    }

    /**
     * enable or disable the spinner.
     */
    function setDisabled(target, disabled){
        var opts = $.data(target, 'spinner').options;
        if (disabled){
            opts.disabled = true;
            $(target).prop('disabled', true);
        } else {
            opts.disabled = false;
            $(target).prop('disabled', false);
        }
    }

    $.fn.spinner = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.spinner.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.validatebox(options, param);
            }
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'spinner');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'spinner', {
                    options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), options),
                    spinner: init(this)
                });
                $(this).prop('disabled', false);
            }
            $(this).val(state.options.value);
            $(this).attr('readonly', !state.options.editable);
            setDisabled(this, state.options.disabled);
            setSize(this);
            $(this).validatebox(state.options);
            bindEvents(this);
        });
    };

    $.fn.spinner.methods = {
        options: function(jq){
            var opts = $.data(jq[0], 'spinner').options;
            return $.extend(opts, {
                value: jq.val()
            });
        },
        destroy: function(jq){
            return jq.each(function(){
                var spinner = $.data(this, 'spinner').spinner;
                $(this).validatebox('destroy');
                spinner.remove();
            });
        },
        resize: function(jq, width){
            return jq.each(function(){
                setSize(this, width);
            });
        },
        enable: function(jq){
            return jq.each(function(){
                setDisabled(this, false);
                bindEvents(this);
            });
        },
        disable: function(jq){
            return jq.each(function(){
                setDisabled(this, true);
                bindEvents(this);
            });
        },
        getValue: function(jq){
            return jq.val();
        },
        setValue: function(jq, value){
            return jq.each(function(){
                var opts = $.data(this, 'spinner').options;
                opts.value = value;
                $(this).val(value);
            });
        },
        clear: function(jq){
            return jq.each(function(){
                var opts = $.data(this, 'spinner').options;
                opts.value = '';
                $(this).val('');
            });
        }
    };

    $.fn.spinner.parseOptions = function(target){
        var t = $(target);
        return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, [
            'width', 'min', 'max', {increment:'number', editable:'boolean'}
        ]), {
            value:(t.val() || undefined),
            disabled:(t.prop('disabled') ? true : undefined)
        });

    };

    $.fn.spinner.defaults = $.extend({}, $.fn.validatebox.defaults, {
        width: 'auto',
        value: '',
        min: null,
        max: null,
        increment: 1,
        editable: true,
        disabled: false,

        spin: function(down){},	// the function to implement the spin button click

        onSpinUp: function(){},
        onSpinDown: function(){}
    });
})(jQuery);/**
 * numberspinner - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	 spinner
 * 	 numberbox
 */
(function($){
    function create(target){
        var opts = $.data(target, 'numberspinner').options;
        $(target).spinner(opts).numberbox(opts);
    }

    function doSpin(target, down){
        var opts = $.data(target, 'numberspinner').options;

        var v = parseFloat($(target).numberbox('getValue') || opts.value) || 0;
//		var v = parseFloat($(target).val() || opts.value) || 0;
        if (down == true){
            v -= opts.increment;
        } else {
            v += opts.increment;
        }
//		$(target).val(v).numberbox('fix');
        $(target).numberbox('setValue', v);
    }

    $.fn.numberspinner = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.numberspinner.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.spinner(options, param);
            }
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'numberspinner');
            if (state){
                $.extend(state.options, options);
            } else {
                $.data(this, 'numberspinner', {
                    options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), options)
                });
            }
            create(this);
        });
    };

    $.fn.numberspinner.methods = {
        options: function(jq){
            var opts = $.data(jq[0], 'numberspinner').options;
            return $.extend(opts, {
                value: jq.numberbox('getValue')
            });
        },
        setValue: function(jq, value){
            return jq.each(function(){
                $(this).numberbox('setValue', value);
            });
        },
        getValue: function(jq){
            return jq.numberbox('getValue');
        },
        clear: function(jq){
            return jq.each(function(){
                $(this).spinner('clear');
                $(this).numberbox('clear');
            });
        }
    };

    $.fn.numberspinner.parseOptions = function(target){
        return $.extend({}, $.fn.spinner.parseOptions(target), $.fn.numberbox.parseOptions(target), {
        });
    };

    $.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
        spin: function(down){doSpin(this, down);}
    });
})(jQuery);/**
 * timespinner - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   spinner
 *
 */
(function($){
    function create(target){
        var opts = $.data(target, 'timespinner').options;
        $(target).spinner(opts);

        $(target).unbind('.timespinner');
        $(target).bind('click.timespinner', function(){
            var start = 0;
            if (this.selectionStart != null){
                start = this.selectionStart;
            } else if (this.createTextRange){
                var range = target.createTextRange();
                var s = document.selection.createRange();
                s.setEndPoint("StartToStart", range);
                start = s.text.length;
            }
            if (start >= 0 && start <= 2){
                opts.highlight = 0;
            } else if (start >= 3 && start <= 5){
                opts.highlight = 1;
            } else if (start >= 6 && start <= 8){
                opts.highlight = 2;
            }
            highlight(target);
        }).bind('blur.timespinner', function(){
                fixValue(target);
            });
    }

    /**
     * highlight the hours or minutes or seconds.
     */
    function highlight(target){
        var opts = $.data(target, 'timespinner').options;
        var start = 0, end = 0;
        if (opts.highlight == 0){
            start = 0;
            end = 2;
        } else if (opts.highlight == 1){
            start = 3;
            end = 5;
        } else if (opts.highlight == 2){
            start = 6;
            end = 8;
        }
        if (target.selectionStart != null){
            target.setSelectionRange(start, end);
        } else if (target.createTextRange){
            var range = target.createTextRange();
            range.collapse();
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
        $(target).focus();
    }

    /**
     * parse the time and return it or return null if the format is invalid
     */
    function parseTime(target, value){
        var opts = $.data(target, 'timespinner').options;
        if (!value) return null;
        var vv = value.split(opts.separator);
        for(var i=0; i<vv.length; i++){
            if (isNaN(vv[i])) return null;
        }
        while(vv.length < 3){
            vv.push(0);
        }
        return new Date(1900, 0, 0, vv[0], vv[1], vv[2]);
    }

    function fixValue(target){
        var opts = $.data(target, 'timespinner').options;
        var value = $(target).val();
        var time = parseTime(target, value);
        if (!time){
            time = parseTime(target, opts.value);
        }
        if (!time){
            opts.value = '';
            $(target).val('');
            return;
        }

        var minTime = parseTime(target, opts.min);
        var maxTime = parseTime(target, opts.max);
        if (minTime && minTime > time) time = minTime;
        if (maxTime && maxTime < time) time = maxTime;

        var tt = [formatNumber(time.getHours()), formatNumber(time.getMinutes())];
        if (opts.showSeconds){
            tt.push(formatNumber(time.getSeconds()));
        }
        var val = tt.join(opts.separator);
        opts.value = val;
        $(target).val(val);

//		highlight(target);

        function formatNumber(value){
            return (value < 10 ? '0' : '') + value;
        }
    }

    function doSpin(target, down){
        var opts = $.data(target, 'timespinner').options;
        var val = $(target).val();
        if (val == ''){
            val = [0,0,0].join(opts.separator);
        }
        var vv = val.split(opts.separator);
        for(var i=0; i<vv.length; i++){
            vv[i] = parseInt(vv[i], 10);
        }
        if (down == true){
            vv[opts.highlight] -= opts.increment;
        } else {
            vv[opts.highlight] += opts.increment;
        }
        $(target).val(vv.join(opts.separator));
        fixValue(target);
        highlight(target);
    }


    $.fn.timespinner = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.timespinner.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.spinner(options, param);
            }
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'timespinner');
            if (state){
                $.extend(state.options, options);
            } else {
                $.data(this, 'timespinner', {
                    options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), options)
                });
                create(this);
            }
        });
    };

    $.fn.timespinner.methods = {
        options: function(jq){
            var opts = $.data(jq[0], 'timespinner').options;
            return $.extend(opts, {
                value: jq.val()
            });
        },
        setValue: function(jq, value){
            return jq.each(function(){
                $(this).val(value);
                fixValue(this);
            });
        },
        getHours: function(jq){
            var opts = $.data(jq[0], 'timespinner').options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[0], 10);
        },
        getMinutes: function(jq){
            var opts = $.data(jq[0], 'timespinner').options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[1], 10);
        },
        getSeconds: function(jq){
            var opts = $.data(jq[0], 'timespinner').options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[2], 10) || 0;
        }
    };

    $.fn.timespinner.parseOptions = function(target){
        return $.extend({}, $.fn.spinner.parseOptions(target), $.parser.parseOptions(target, [
            'separator', {showSeconds:'boolean', highlight:'number'}
        ]));
    };

    $.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
        separator: ':',
        showSeconds: false,
        highlight: 0,	// The field to highlight initially, 0 = hours, 1 = minutes, ...
        spin: function(down){doSpin(this, down);}
    });
})(jQuery);/**
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
                columnHtml.push("<input type='checkbox' value='" + col.field + "'" + checked + " />&nbsp;&nbsp;" + title);
                columnHtml.push("<br>");
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
                    /*：增加切换页事件*/
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
                        /*：标题默认居中 (col.align || 'left')*/

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
                        if (opts.finder.getTr(target, index, undefined, undefined, state).hasClass('datagrid-row-selected')) {
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
        /*：排序字段为空时，直接返回*/
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
        // 增加onBeforeBind方法，数据加载成功后绑定前
        if (opts.onBeforeBind) opts.onBeforeBind.call(target, data);

        if (!opts.remoteSort) {
            var opt = getColumnOption(target, opts.sortName, state);
            if (opt) {
                //：col.option增加number属性，确定是否数字
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
     * 同步设置浮动编辑层checkbox状态  fix
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
            ///*:endEdit时不再校验，外部自行校验*/
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
                // 需减少padding-left与padding-right
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

    /* editor的input绑定click和change事件，方便前端自动计算列的计算*/
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
        getToolbar: function (jq) {// 增加返回toolbar的方法
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
    (jQuery);/**
 * propertygrid - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	 datagrid
 *
 */
(function($){
    function buildGrid(target){
        var opts = $.data(target, 'propertygrid').options;
        $(target).datagrid($.extend({}, opts, {
            cls:'propertygrid',
            view:(opts.showGroup ? groupview : undefined),
            onClickRow:function(index, row){
                if (opts.editIndex != index){
                    var col = $(this).datagrid('getColumnOption', "value");
                    col.editor = row.editor;
                    leaveRow(opts.editIndex);
                    $(this).datagrid('beginEdit', index);
                    $(this).datagrid('getEditors', index)[0].target.focus();
                    opts.editIndex = index;
                }
                opts.onClickRow.call(target, index, row);
            },
            onLoadSuccess:function (data) {
                $(target).datagrid('getPanel').find('div.datagrid-group').css('border', '0');
                opts.onLoadSuccess.call(target, data);
            }
        }));
        $(target).datagrid('getPanel').panel('panel').addClass('propertygrid');
        $(target).datagrid('getPanel').find('div.datagrid-body').unbind('.propertygrid').bind('mousedown.propertygrid', function(e){
            e.stopPropagation();
        });
        $(document).unbind('.propertygrid').bind('mousedown.propertygrid', function(){
            leaveRow(opts.editIndex);
            opts.editIndex = undefined;
        });

        function leaveRow(index){
            if (index == undefined) return;
            var t = $(target);
            t.datagrid('getEditors', index)[0].target.blur();
            if (t.datagrid('validateRow', index)){
                t.datagrid('endEdit', index);
            } else {
                t.datagrid('cancelEdit', index);
            }
        }
    }

    $.fn.propertygrid = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.propertygrid.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.datagrid(options, param);
            }
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'propertygrid');
            if (state){
                $.extend(state.options, options);
            } else {
                $.data(this, 'propertygrid', {
                    options: $.extend({}, $.fn.propertygrid.defaults, $.fn.propertygrid.parseOptions(this), options)
                });
            }
            buildGrid(this);
        });
    };

    $.fn.propertygrid.methods = {
    };

    $.fn.propertygrid.parseOptions = function(target){
        return $.extend({}, $.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, [
            {showGroup:'boolean'}
        ]));
    };

    // the group view definition
    var groupview = $.extend({}, $.fn.datagrid.defaults.view, {
        render: function(target, container, frozen){
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var rows = state.data.rows;
            var fields = $(target).datagrid('getColumnFields', frozen);

            var table = [];
            var index = 0;
            var groups = this.groups;
            for(var i=0; i<groups.length; i++){
                var group = groups[i];

                table.push('<div class="datagrid-group" group-index=' + i + ' style="height:25px;overflow:hidden;border-bottom:1px solid #ccc;">');
                table.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>');
                table.push('<tr>');
                table.push('<td style="border:0;">');
                if (!frozen){
                    table.push('<span style="color:#666;font-weight:bold;">');
                    table.push(opts.groupFormatter.call(target, group.fvalue, group.rows));
                    table.push('</span>');
                }
                table.push('</td>');
                table.push('</tr>');
                table.push('</tbody></table>');
                table.push('</div>');

                table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
                for(var j=0; j<group.rows.length; j++) {
                    // get the class and style attributes for this row
                    var cls = (index % 2 && opts.striped) ? 'class="datagrid-row datagrid-row-alt"' : 'class="datagrid-row"';
                    var styleValue = opts.rowStyler ? opts.rowStyler.call(target, index, group.rows[j]) : '';
                    var style = styleValue ? 'style="' + styleValue + '"' : '';

                    var rowId = state.rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + index;
                    table.push('<tr id="' + rowId + '" datagrid-row-index="' + index + '" ' + cls + ' ' + style + '>');
                    table.push(this.renderRow.call(this, target, fields, frozen, index, group.rows[j]));
                    table.push('</tr>');
                    index++;
                }
                table.push('</tbody></table>');
            }

            $(container).html(table.join(''));
        },

        onAfterRender: function(target){
            var opts = $.data(target, 'datagrid').options;
            var dc = $.data(target, 'datagrid').dc;
            var view = dc.view;
            var view1 = dc.view1;
            var view2 = dc.view2;

            $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
            var group;
            if (opts.rownumbers || opts.frozenColumns.length){
                group = view1.find('div.datagrid-group');
            } else {
                group = view2.find('div.datagrid-group');
            }
            $('<td style="border:0"><div class="datagrid-row-expander datagrid-row-collapse" style="width:25px;height:16px;cursor:pointer"></div></td>').insertBefore(group.find('td'));

            view.find('div.datagrid-group').each(function(){
                var groupIndex = $(this).attr('group-index');
                $(this).find('div.datagrid-row-expander').bind('click', {groupIndex:groupIndex}, function(e){
                    if ($(this).hasClass('datagrid-row-collapse')){
                        $(target).datagrid('collapseGroup', e.data.groupIndex);
                    } else {
                        $(target).datagrid('expandGroup', e.data.groupIndex);
                    }
                });
            });
        },

        onBeforeRender: function(target, rows){
            var opts = $.data(target, 'datagrid').options;
            var groups = [];
            var i, len;
            for(i= 0,len = rows.length; i<len; i++){
                var row = rows[i];
                var group = getGroup(row[opts.groupField]);
                if (!group){
                    group = {
                        fvalue: row[opts.groupField],
                        rows: [row],
                        startRow: i
                    };
                    groups.push(group);
                } else {
                    group.rows.push(row);
                }
            }

            function getGroup(fvalue){
                for(var i=0; i<groups.length; i++){
                    var group = groups[i];
                    if (group.fvalue == fvalue){
                        return group;
                    }
                }
                return null;
            }

            this.groups = groups;

            var newRows = [];
            for(i= 0, len = groups.length; i<len; i++){
                group = groups[i];
                for(var j=0; j<group.rows.length; j++){
                    newRows.push(group.rows[j]);
                }
            }
            $.data(target, 'datagrid').data.rows = newRows;
        }
    });

    $.extend($.fn.datagrid.methods, {
        expandGroup:function(jq, groupIndex){
            return jq.each(function(){
                var view = $.data(this, 'datagrid').dc.view;
                var group;
                if (groupIndex!=undefined){
                    group = view.find('div.datagrid-group[group-index="'+groupIndex+'"]');
                } else {
                    group = view.find('div.datagrid-group');
                }
                var expander = group.find('div.datagrid-row-expander');
                if (expander.hasClass('datagrid-row-expand')){
                    expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
                    group.next('table').show();
                }
                $(this).datagrid('fixRowHeight');
            });
        },
        collapseGroup:function(jq, groupIndex){
            return jq.each(function(){
                var view = $.data(this, 'datagrid').dc.view;
                var group;
                if (groupIndex!=undefined){
                    group = view.find('div.datagrid-group[group-index="'+groupIndex+'"]');
                } else {
                    group = view.find('div.datagrid-group');
                }
                var expander = group.find('div.datagrid-row-expander');
                if (expander.hasClass('datagrid-row-collapse')){
                    expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
                    group.next('table').hide();
                }
                $(this).datagrid('fixRowHeight');
            });
        }
    });
    // end of group view definition

    $.fn.propertygrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        singleSelect:true,
        remoteSort:false,
        fitColumns:true,
        loadMsg:'',
        frozenColumns:[[
            {field:'f',width:16,resizable:false}
        ]],
        columns:[[
            {field:'name',title:'Name',width:100,sortable:true},
            {field:'value',title:'Value',width:100,resizable:false}
        ]],

        showGroup:false,
        groupField:'group',
        groupFormatter:function (fvalue, rows) {
            return fvalue
        }
    });
})(jQuery);/**
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
})(jQuery);/**
 * combo - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   panel
 *   validatebox
 *
 */
(function ($) {
    function getCssIntValue($target, p) {
        var v = $target.css(p);
        if (v) {
            if (v.endsWith("px")) v = v.substr(0, v.length - 2);
        }
        return "0" + v;
    }

    function setSize(target, width, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;

        if (width) opts.width = width;
//        opts.width = opts.width - getCssIntValue($(target), "padding-left") - getCssIntValue($(target), "padding-right");

        combo.appendTo('body');
        if (isNaN(opts.width)) {
            opts.width = combo.find('input.combo-text').outerWidth();
        }
        var w = opts.width;
        if ($.browser.msie) w += opts.eapborder;
        var arrowWidth = 0;
        if (opts.hasDownArrow) {
            arrowWidth = combo.find('.combo-arrow').outerWidth()+2;    //多加了2,css是18,图片是20
        }
        //:修正IE下的bug，子宽度超长，下一句父宽度会设置无效
        var ct = combo.find('input.combo-text');
        combo.width(w);
        ct.width(combo.width() - arrowWidth);
        /*强制定制宽度 黄兴良*/
        ct.width(w - 20);


        // 修正IE下子元素超过父元素宽度
        if (ct.width() > w)
            ct.width(w - arrowWidth);

        //将panel延迟加载
        var panel = state.panel;
        if (panel) setPanelSize(panel, state);

        combo.insertAfter(target);
    }

    //设置panel尺寸
    function setPanelSize(panel, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;

        // 因input控件宽度修改变小,DataGrid默认最小宽度为250
        var w = opts.panelWidth ? opts.panelWidth : state.combo.outerWidth();
        if (opts.columns && w < 250)  w = 250;

        panel.panel('resize', {
            width: w,
            height: opts.panelHeight
        });
    }

    function setDownArrow(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        if (opts.hasDownArrow) {
            combo.find('.combo-arrow').show();
        } else {
            combo.find('.combo-arrow').hide();
        }
    }

    /**
     * create the combo component.
     */
    function init(target, opts) {
        var $target = $(target);
        var tabIndex = $target.attr("tabIndex");
        $target.addClass('combo-f').removeAttr("tabIndex").hide();
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var span = $('<span class="combo"></span>').insertAfter(target);
        var input = $('<input type="text" class="combo-text">').appendTo(span);
        if (tabIndex) {
            $target.attr("tabIndex", "");
            input.attr("tabIndex", tabIndex);
        }
        $('<span><span class="combo-arrow"></span></span><input type="hidden" class="combo-value">').appendTo(span);
        //panel加载延迟，createPanel

        var name = $target.attr('name');
        if (name) {
            span.find('input.combo-value').attr('name', name);
            $target.removeAttr('name').attr('comboName', name);
        }
        input.attr('autocomplete', 'off');
        return {
            combo: span,
            panel: opts.afterPanelInited ? undefined : createPanel(target)
        };
    }

    function createPanel(target) {
        var panel = $('<div class="combo-panel" targetid="' + $(target).attr('id') + '"></div>').appendTo('body');
        panel.panel({
            doSize: false,
            closed: true,
            cls: 'combo-p',
            style: {
                position: 'absolute',
                zIndex: 10
            },
            onOpen: function () {
                $(this).panel('resize');
            },
            onClose: function () {
                var target = $('#' + $(this).attr('targetid'))[0];
                var state = $.data(target, 'combo');
                state.options.onHidePanel.call(target);
            }
        });
        return panel;
    }

    /**
     * panel延迟加载
     */
    function initPanel(target, state) {
        var panel = createPanel(target);

        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        state.panel = panel;
        setPanelSize(panel, state);
        //buildEvents
        buildPanelEvents(panel, opts.disabled);
        if (opts.afterPanelInited) opts.afterPanelInited(target, panel);
        return panel;
    }

    function buildPanelEvents(panel, disabled) {
        panel.unbind('.combo');
//        if (!disabled) {
//            panel.bind('mousedown.combo', function (e) {
//                return false;
//            });
//        }
    }

    function destroy(target) {
        var state = $.data(target, 'combo');
        var input = state.combo.find('input.combo-text');
        input.validatebox('destroy');
        if (state.panel) state.panel.panel('destroy');
        state.combo.remove();
        $(target).remove();
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        var input = combo.find('.combo-text');
        var arrow = combo.find('.combo-arrow');
        /*$(target).unbind(".combo").bind("_resize", function() {
         setSize(this);
         });*/
        $(document).unbind('.combo').bind('mousedown.combo', function (e) {
            var allPanel = $('body>div.combo-p>div.combo-panel');
            var p = $(e.target).closest('div.combo-panel', allPanel);
            if (p.length) {
                return;
            }
            allPanel.panel('close');
        });

        combo.unbind('.combo');
        var panel = state.panel;
        if (panel) buildPanelEvents(panel, opts.disabled);
        input.unbind('.combo');
        arrow.unbind('.combo');

        if (!opts.disabled) {
            input.bind('mousedown.combo',function (e) {
                e.stopPropagation();
            }).bind('keydown.combo', {target: target},function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'combo');
                    var opts = state.options;
                    var input = $(this);
                    switch (e.keyCode) {
                        case 38:    // up
                            if (opts.keyHandler.up) opts.keyHandler.up.call(target, input.val());
                            break;
                        case 40:    // down
                            if (!isPanelVisible(target, state)) {
                                var comboId = $(target).attr('id');
                                setTimeout(function () {
                                    var target = $('#' + comboId)[0];
                                    var state = $.data(target, 'combo');
                                    showPanel(target, state);
                                    validate(target, true, state);
                                }, 0);
                            }
                            else if (opts.keyHandler.down) opts.keyHandler.down.call(target, input.val());
                            break;
                        case 13:    // enter
                            if (isPanelVisible(target, state)) {
                                e.preventDefault();
                                if (opts.keyHandler.enter) opts.keyHandler.enter.call(target, input.val());
                                return false;
                            }
                        case 9:        // tab
                        case 27:    // esc
                            hidePanel(target, state);
                            break;
                        case 37:
                            if (e.ctrlKey && opts.keyHandler.ctrlLeft) {
                                opts.keyHandler.ctrlLeft.call(target, input.val());
                                return false;
                            }
                            break;
                        case 39:
                            if (e.ctrlKey && opts.keyHandler.ctrlRight) {
                                opts.keyHandler.ctrlRight.call(target, input.val());
                                return false;
                            }
                            break;
//                        default:

                    }
                }).bind('input.combo propertychange.combo', {target: target}, function (e) {
                    var target = e.data.target;
                    var state = $.data(target, 'combo');
                    var opts = state.options;
                    var q = $(this).val();
                    if (state.isInput && opts.editable && opts.doQuery != null && state.previousValue != q) {
                        if (getValues(target, state).length) setValue(target, '', state);
                        if (state.timer) {
                            clearTimeout(state.timer);
                        }
                        var comboId = $(target).attr('id');
                        state.timer = setTimeout(function () {
                            var target = $('#' + comboId)[0];
                            var state = $.data(target, 'combo');
                            var opts = state.options;
                            var input = state.combo.find('input.combo-text');
                            if (state.previousValue != q) {
                                state.previousValue = q;
                                opts.doBeforeQuery.call(target, q);
                                showPanel(target, state, true);
                                opts.doQuery.call(target, q);
                                validate(target, true, state);
                            }
                        }, opts.delay);
                    }
                });

            arrow.bind('click.combo', {target: target},function (e) {
                var target = e.data.target;
                var state = $.data(target, 'combo');
                var input = $(this);
                if (!state.panel) panel = initPanel(target, state);
                else panel = state.panel;
                if (panel.is(':visible')) {
                    hidePanel(target, state);
                } else {
                    $('div.combo-panel').panel('close');
                    showPanel(target, state);
                }
                input.focus();
            }).bind('mouseenter.combo',function () {
                    $(this).addClass('combo-arrow-hover');
                }).bind('mouseleave.combo',function () {
                    $(this).removeClass('combo-arrow-hover');
                }).bind('mousedown.combo', function () {
                    return false;
                });
        }
    }

    // when window resize, reset the width and height of the window's mask
    $(window).resize(function () {
        $('.combo-f').each(function () {
            hidePanel(this);
        });
    });

    /**
     * show the drop down panel.
     */
    function showPanel(target, state, isQuery) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        var panel = state.panel;
        if (!panel) panel = initPanel(target, state);
        if ($.fn.window) {
            panel.panel('panel').css('z-index', $.fn.window.defaults.zIndex++);
        }

        if (!panel.is(':visible')) {
            //没搞懂，有些时候，panel在hidden的情况下，获取的width会有问题。
            panel.panel('move', {
                left: -9999,
                top: 0
            });
            panel.panel('open');
            opts.onShowPanel.call(target, isQuery);
        }

        function getLeft() {
            var left = combo.offset().left
            var winWidth = document.body.clientWidth + $(document).scrollLeft();//$(window).width() + $(document).scrollLeft();
            var pnlWidth = panel.outerWidth();
            if (left + pnlWidth > winWidth) {
                left = winWidth - pnlWidth;
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        }

        function getTop() {
            var ctop = combo.offset().top, cheight = combo.outerHeight(), wheight = document.body.clientHeight, /*$(window).height(), */scrTop = $(document).scrollTop(), pheight = panel.outerHeight();
            var top = ctop + cheight;
            if (top + pheight > wheight + scrTop) {
                top = ctop - pheight;
            }
            if (top < scrTop) {
                top = ctop + cheight;
            }
            return top;
        }


        (function(){
            if (panel.is(':visible')){
                panel.panel('move', {
                    left:getLeft(),
                    top:getTop()
                });
                setTimeout(arguments.callee, 200);
            }
        })();
    }

    /**
     * hide the drop down panel.
     */
    function hidePanel(target, state) {
        if (!state) state = $.data(target, 'combo');
        var panel = state.panel;
        if (!panel) return;
        panel.panel('close');
//        state.options.onHidePanel.call(target);
    }

    function isPanelVisible(target, state) {
        if (!state) state = $.data(target, 'combo');
        var panel = state.panel;
        return (panel && panel.is(':visible'));
    }

    function validate(target, doit, state) {
        if (!state) state = $.data(target, 'combo');
        var input = state.combo.find('input.combo-text');
        /*********  fix 2014/01/06 兼容动态验证 *********/
        var opts = {};
        if ($(input).data('validatebox')) {
            opts = $(input).data('validatebox').options;
            if (opts.required == undefined) {
                opts.required = false;
            }
        }
        input.validatebox($.extend(opts,state.options));
        //input.validatebox(state.options);
        if (doit) {
            input.validatebox('validate');
            input.trigger('mouseleave');
        }
    }

    function setDisabled(target, disabled, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var combo = state.combo;
        if (disabled) {
            opts.disabled = true;
            $(target).prop('disabled', true);
            combo.find('.combo-value').prop('disabled', true);
            combo.find('.combo-text').prop('disabled', true);
        } else {
            opts.disabled = false;
            $(target).prop('disabled', false);
            combo.find('.combo-value').prop('disabled', false);
            combo.find('.combo-text').prop('disabled', false);
        }
    }

    function clear(target, state) {
        setValueText(target, {value: '', text: ''}, state);
    }

    function getText(target, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        return combo.find('input.combo-text').val();
    }

    function setText(target, text, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        state.isInput = false;
        combo.find('input.combo-text').val(text);
        validate(target, true, state);
        if (text) state.previousValue = text; else state.previousValue = '';
        state.isInput = true;
    }

    function getValues(target, state) {
        if (!state) state = $.data(target, 'combo');
        var combo = state.combo;
        return combo.find('input.combo-value').val().split(',');
    }

    function setValues(target, values, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var oldValues = getValues(target, state);

        var combo = state.combo;
        combo.find('input.combo-value').val(values.join(','));

        if (values.join(',') != oldValues.join(',')) {
            if (opts.multiple) {
                opts.onChange.call(target, values.join(','), oldValues.join(','));
            } else {
                opts.onChange.call(target, values[0], oldValues[0]);
            }
        }
    }

    /**
     * 设置文本和值
     * @param target
     * @param values
     * @param state
     */
    function setValueTexts(target, values, state) {
        if (!state) state = $.data(target, 'combo');
        var i, len, texts = [], vals = [];
        for (i = 0, len = values.length; i < len; i++) {
            vals.push(values[i].value);
            texts.push(values[i].text);
        }
        setText(target, texts.join(','), state);
        setValues(target, vals, state);
    }

    function setValueText(target, value, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var i, len, values = [];
        if (opts.multiple) {
            var vs = (value.value + '').split(',');
            len = vs.length;
            if (len > 1) {
                var txts = (value.text + '').split(',');
                for (i = 0; i < len; i++) {
                    values.push({value: vs[i], text: txts[i]});
                }
            } else {
                values.push(value);
            }
        } else values.push(value);
        setValueTexts(target, values, state);
    }

    function getValue(target, state) {
        var values = getValues(target, state);
        return values[0];
    }

    function setValue(target, value, state) {
        var values;
        if (value != undefined) values = (value + '').split(',');
        else values = [value];
        setValues(target, values, state);
    }

    /**
     * set the initialized value
     */
    function initValue(target, state) {
        if (!state) state = $.data(target, 'combo');
        var opts = state.options;
        var fn = opts.onChange;
        opts.onChange = function () {
        };
        if (opts.multiple) {
            if (opts.value) {
                if (typeof opts.value == 'object') {
                    setValues(target, opts.value, state);
                } else {
                    setValue(target, opts.value, state);
                }
            } else {
                setValues(target, [], state);
            }
        } else {
            setValue(target, opts.value, state);	// set initialize value
        }
        opts.onChange = fn;
    }

    function getPanel(target) {
        var state = $.data(target, 'combo');
        var panel = state.panel;
        if (panel) return panel;
        return initPanel(target, state);
    }

    function moveTo(target, expr) {
        var state = $.data(target, 'combo');
        $(target).appendTo(expr);
        state.combo.insertAfter(target);
    }

    $.fn.combo = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.combo.methods[options](this, param);
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combo');
            var $this = $(this);
            /* 默认宽度为input的宽度*/
            if (!options.width || options.width == 'auto') {
                if ($this.is(":visible")) options.width = $this.width();
                else options.width = $this.width() - options.eapborder;
            }

            if (state) {
                $.extend(state.options, options);
                state.isInput = false;
            } else {
                var opts = $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), options);
                var r = init(this, opts);
                state = $.data(this, 'combo', {
                    options: opts,
                    combo: r.combo,
                    panel: r.panel,
                    previousValue: '',
                    isInput: true
                });
                $this.prop('disabled', false);
            }
            $('input.combo-text', state.combo).attr('readonly', !state.options.editable);
            setDownArrow(this, state);
            setDisabled(this, state.options.disabled, state);
            setSize(this, undefined, state);
            bindEvents(this, state);
            validate(this, false, state);
            initValue(this, state);
            state.isInput = true;
        }, [options]);
    };

    $.fn.combo.methods = {
        state: function (jq) {
            return $.data(jq[0], 'combo');
        },
        options: function (jq) {
            return $.data(jq[0], 'combo').options;
        },
        panel: function (jq) {
            return getPanel(jq[0]);
        },
        textbox: function (jq) {
            return $.data(jq[0], 'combo').combo.find('input.combo-text');
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        },
        resize: function (jq, width) {
            return jq.each(function () {
                setSize(this, width);
            });
        },
        showPanel: function (jq) {
            return jq.each(function () {
                showPanel(this);
            });
        },
        hidePanel: function (jq) {
            return jq.each(function () {
                hidePanel(this);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
                bindEvents(this);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
                bindEvents(this);
            });
        },
        validate: function (jq) {
            return jq.each(function () {
                validate(this, true);
            });
        },
        isValid: function (jq) {
            var input = $.data(jq[0], 'combo').combo.find('input.combo-text');
            return input.validatebox('isValid');
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        getText: function (jq) {
            return getText(jq[0]);
        },
        setText: function (jq, text) {
            return jq.each(function () {
                setText(this, text);
            });
        },
        getValues: function (jq) {
            return getValues(jq[0]);
        },
        setValues: function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        getValue: function (jq) {
            return getValue(jq[0]);
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        },
        setValueText: function (jq, value) {
            return jq.each(function (value) {
                setValueText(this, value);
            }, [value]);
        },
        setValueTexts: function (jq, values) {
            return jq.each(function (values) {
                setValueTexts(this, values);
            }, [values]);
        },
        panelCreated: function (jq) {
            var state = $.data(jq[0], 'combo');
            return state.panel != undefined;
        },
        moveTo: function (jq, expr) {
            return jq.each(function (expr) {
                moveTo(this, expr);
            }, [expr]);
        }
    };

    $.fn.combo.parseOptions = function (target) {
        var t = $(target);
        var css = t.attr("class") + "";
        if (css.indexOf("easyui-") < 0)
            return $.extend({}, $.fn.validatebox.parseOptions(target), {
                width: (parseInt(target.style.width) || undefined),
                disabled: (t.prop('disabled') ? true : undefined),
                value: (t.val() || undefined)
            });
        var th = t.attr('panelHeight');
        return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, [
            'width', 'separator', {panelWidth: 'number', editable: 'boolean', hasDownArrow: 'boolean', delay: 'number'}
        ]), {
            panelHeight: (th == 'auto' ? 'auto' : parseInt(th) || undefined),
            multiple: (t.attr('multiple') ? true : undefined),
            disabled: (t.prop('disabled') ? true : undefined),
            value: (t.val() || undefined)
        });
    };

    // Inherited from $.fn.validatebox.defaults
    $.fn.combo.defaults = $.extend({}, $.fn.validatebox.defaults, {
        width: 'auto',
        panelWidth: null,
        panelHeight: 200,
        multiple: false,
        separator: ',',
        editable: true,
        disabled: false,
        hasDownArrow: true,
        value: '',
        delay: 200, // delay to do searching from the last key input event.
        eapborder: 6,

        keyHandler: {
            up: function () {
            },
            down: function () {
            },
            enter: function () {
            }
        },
        doBeforeQuery: function (q) {
        },
        doQuery: undefined,
        onShowPanel: function () {
        },
        onHidePanel: function () {
        },
        onChange: function (newValue, oldValue) {
        }
    });
})(jQuery);
/**
 * combobox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *
 */
(function ($) {
    /**
     * scroll panel to display the specified item
     */
    function scrollTo(target, value) {
        var panel = $(target).combo('panel');
        var item = panel.find('div.combobox-item[value="' + value + '"]'), h;
        if (item.length) {
            var itop = item.position().top, scrtop = panel.scrollTop();
            if (itop <= 0) {
                h = scrtop + itop;
                panel.scrollTop(h);
            } else {
                var iheight = item.outerHeight(), pnlHeight = panel.height();
                if (itop + iheight > pnlHeight) {
                    h = scrtop + itop + iheight - pnlHeight;
                    panel.scrollTop(h);
                }
            }
        }
    }

    /**
     * select previous item
     */
    function selectPrev(target) {
        var t = $(target);
        var panel = t.combo('panel');
        var values = t.combo('getValues');
        var item = panel.find('div.combobox-item[value="' + values.pop() + '"]');
        if (item.length) {
            var prev = item.prev(':visible');
            if (prev.length) {
                item = prev;
            }
        } else {
            item = panel.find('div.combobox-item:visible:last');
        }
        var value = item.attr('value');
        select(target, value);
//		setValues(target, [value]);
        scrollTo(target, value);
    }

    /**
     * select next item
     */
    function selectNext(target) {
        var t = $(target);
        var panel = t.combo('panel');
        var values = t.combo('getValues');
        var item = panel.find('div.combobox-item[value="' + values.pop() + '"]');

        if (item.length) {
            var next = item.next(':visible');
            if (next.length) {
                item = next;
            }
        } else {
            item = panel.find('div.combobox-item:visible:first');
        }
        var value = item.attr('value');
        select(target, value);
//		setValues(target, [value]);
        scrollTo(target, value);
    }

    /**
     * select the specified value
     */
    function select(target, value, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var i, len;
        if (opts.multiple) {
            var values = $(target).combo('getValues');
            for (i = 0, len = values.length; i < len; i++) {
                if (values[i] == value) return;
            }
            values.push(value);
            setValues(target, values, false, state);
        } else {
            setValues(target, [value], false, state);
        }

        for (i = 0, len = data.length; i < len; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onSelect.call(target, data[i]);
                return;
            }
        }
    }

    /**
     * unselect the specified value
     */
    function unselect(target, value, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var values = $(target).combo('getValues');
        var i, len;
        for (i = 0, len = values.length; i < len; i++) {
            if (values[i] == value) {
                values.splice(i, 1);
                setValues(target, values, false, state);
                break;
            }
        }
        for (i = 0, len = data.length; i < len; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onUnselect.call(target, data[i]);
                return;
            }
        }
    }

    /**
     * set values
     */
    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        var t = $(target);
        var panel = t.combo('panel');

        panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
        var vv = [], ss = [];
        for (var i = 0, len = values.length; i < len; i++) {
            var v = values[i];
            var s = v;
            for (var j = 0, lj = data.length; j < lj; j++) {
                if (data[j][opts.valueField] == v) {
                    s = data[j][opts.textField];
                    break;
                }
            }
            if(v||s) {
                vv.push(v);
                ss.push(s);
            }
            panel.find('div.combobox-item[value="' + v + '"]').addClass('combobox-item-selected');
        }

        if (!remainText) {
            t.combo('setText', ss.join(opts.separator));
        }
        t.combo('setValues', vv);
        if (opts.onAfterChange) opts.onAfterChange.call(target);
    }

    function transformData(target, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var data = [];
        $('>option', target).each(function (opts, data) {
            var item = {};
            var t = $(this);
            var val = t.attr('value'), text = t.html();
            item[opts.valueField] = val != undefined ? val : text;
            item[opts.textField] = text;
            item['selected'] = t.prop('selected');
            data.push(item);
        }, [opts, data]);
        return data;
    }

    /**
     * load data, the old list items will be removed.
     */
    function loadData(target, data, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var t = $(target);
        var panel = t.combo('panel');

        state.data = data;

        var selected = t.combobox('getValues');
        panel.empty();	// clear old data
        for (var i = 0, len = data.length; i < len; i++) {
            var row = data[i];
            var v = row[opts.valueField];
            var s = row[opts.textField];
            var item = $('<div class="combobox-item"></div>').appendTo(panel);
            item.attr('value', v);
            if (opts.formatter) {
                item.html(opts.formatter.call(target, row, opts));
            } else {
                item.html(s);
            }
            if (row['selected']) {
                if (selected.indexOf(v) < 0) selected.push(v);
            }
        }
        if (opts.multiple) {
            setValues(target, selected, remainText, state);
        } else {
            if (selected.length) {
                setValues(target, [selected[selected.length - 1]], remainText, state);
            } else {
                setValues(target, [], remainText, state);
            }
        }

        opts.onLoadSuccess.call(target, data);

        $('.combobox-item', panel).hover(
            function () {
                $(this).addClass('combobox-item-hover');
            },
            function () {
                $(this).removeClass('combobox-item-hover');
            }
        ).bind('click', {target: target}, function (e) {
                var target = e.data.target;
                var state = $.data(target, 'combobox');
                var opts = state.options;
                var item = $(this);
                if (opts.multiple) {
                    if (item.hasClass('combobox-item-selected')) {
                        unselect(target, item.attr('value'), state);
                    } else {
                        select(target, item.attr('value'), state);
                    }
                } else {
                    select(target, item.attr('value'), state);
                    t.combo('hidePanel');
                }
            });
    }

    /**
     * request remote data if the url property is setted.
     */
    function request(target, url, param, remainText, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        if (url) opts.url = url;
//		if (!opts.url) return;
        param = param || {};

        if (opts.onBeforeLoad.call(target, param) == false) return;

        var targetId = $(target).attr('id');
        opts.loader.call(target, param, function (data) {
            var target = $('#' + targetId)[0];
            loadData(target, data, remainText);
        }, function () {
            opts.onLoadError.apply(this, arguments);
        }, opts);
    }

    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;

        if (opts.multiple && !q) {
            setValues(target, [], true, state);
        } else {
            setValues(target, [q], true, state);
        }

        if (opts.mode == 'remote') {
            request(target, null, {q:q}, true, state);
        } else {
            var panel = $(target).combo('panel');
            panel.find('div.combobox-item').hide();
            var data = state.data;
            for (var i = 0, len = data.length; i < len; i++) {
                var row = data[i];
                if (opts.filter.call(target, q, row, opts)) {
                    var v = row[opts.valueField];
                    var s = row[opts.textField];
                    var item = panel.find('div.combobox-item[value="' + v + '"]');
                    item.show();
                    if (s == q) {
                        setValues(target, [v], true, state);
                        item.addClass('combobox-item-selected');
                    }
                }
            }
        }
    }

    /**
     * create the component
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combobox');
        var opts = state.options;
        var t = $(target);
        t.addClass('combobox-f');
        t.combo($.extend({}, opts, {
            onShowPanel:function () {
                var t = $(this);
                t.combo('panel').find('div.combobox-item').show();
                scrollTo(this, t.combobox('getValue'));
                opts.onShowPanel.call(this);
            }
        }));
    }

    $.fn.combobox = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combobox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combobox');
            if (state) {
                $.extend(state.options, options);
                create(this, state);
            } else {
                state = $.data(this, 'combobox', {
                    options:$.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options)
                });
                create(this, state);
                if (!state.options.data) loadData(this, transformData(this, state), false, state);
            }
            if (state.options.data) {
                loadData(this, state.options.data, false, state);
            }
            request(this, undefined, undefined, false, state);
        }, [options]);
    };


    $.fn.combobox.methods = {
        options:function (jq) {
            return $.data(jq[0], 'combobox').options;
        },
        getData:function (jq) {
            return $.data(jq[0], 'combobox').data;
        },
        setValues:function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        },
        clear:function (jq) {
            return jq.each(function () {
                $(this).combo('clear');
                var panel = $(this).combo('panel');
                panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
            });
        },
        loadData:function (jq, data) {
            return jq.each(function () {
                loadData(this, data);
            });
        },
        reload:function (jq, url) {
            return jq.each(function () {
                request(this, url);
            });
        },
        select:function (jq, value) {
            return jq.each(function () {
                select(this, value);
            });
        },
        unselect:function (jq, value) {
            return jq.each(function () {
                unselect(this, value);
            });
        }
    };

    $.fn.combobox.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, [
            'valueField', 'textField', 'mode', 'method', 'url'
        ]));
    };

    $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
        valueField:'value',
        textField:'text',
        mode:'local', // or 'remote'
        method:'post',
        url:null,
        data:null,

        keyHandler:{
            up:function () {
                selectPrev(this);
            },
            down:function () {
                selectNext(this);
            },
            enter:function () {
                var t = $(this);
                var values = t.combobox('getValues');
                t.combobox('setValues', values);
                t.combobox('hidePanel');
            },
            query:function (q) {
                doQuery(this, q);
            }
        },
        filter:function (q, row, opts) {
            if (!opts) opts = $(this).combobox('options');
            return row[opts.textField].indexOf(q) == 0;
        },
        formatter:function (row, opts) {
            if (!opts) opts = $(this).combobox('options');
            return row[opts.textField];
        },
        loader:function (param, success, error, opts) {
            if (!opts) opts = $(this).combobox('options');
            if (!opts.url) return false;
            $.ajax({
                type:opts.method,
                url:opts.url,
                data:param,
                dataType:'json',
                success:function (data) {
                    success(data);
                },
                error:function () {
                    error.apply(this, arguments);
                }
            });
        },

        onBeforeLoad:function (param) {
        },
        onLoadSuccess:function () {
        },
        onLoadError:function () {
        },
        onSelect:function (record) {
        },
        onUnselect:function (record) {
        }
    });
})(jQuery);/**
 * combotree - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *      tree
 *
 */
(function ($) {
    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        if (!state.tree) $(target).combo("panel");
        state.remainText = true;

        if (opts.onQuery) opts.onQuery.call(target, q);
        state.remainText = false;
    }

    function doBeforeQuery(target, q, state) {
        if (!state) state = $.data(target, 'combotree');
        state.remainText = true;
    }

    function createTree(target, panel) {
        var state = $.data(target, 'combotree');
        var opts = state.options;
        var tree = state.tree;
        var $target = $(target);
        if (!tree) {
            tree = $('<ul comboid="' + $target.attr('id') + '"></ul>').appendTo(panel);
            state.tree = tree;
        }

        tree.tree($.extend({}, opts, {
            checkbox: opts.multiple,
            onLoadSuccess: function (node, data) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                var $target = $(target);
                var values = $target.combotree('getValues');
                if (opts.multiple) {
                    var nodes = state.tree.tree('getChecked');
                    for (var i = 0, len = nodes.length; i < len; i++) {
                        var id = nodes[i].id;
                        if (indexOfArray(values, id) < 0)
                            values.push(id);
                    }
                }
                setValues(target, values, state.remainText, state);
                opts.onLoadSuccess.call(this, node, data);
            },
            onClick: function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                state.remainText = false;
                var opts = state.options;
                /* 增加beforeclick事件*/
                if (opts.onBeforeClick && !opts.onBeforeClick.call(target, node)) return;
                retrieveValues(target);
                var $target = $(target);
                if (!opts.multiple) //   因支持通过文本选择节点,则多选状态不关闭
                    $target.combo('hidePanel');
                $target.combo('textbox').focus().select();
                opts.onClick.call(target, node);
            },
            onSelect:function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelect.call(this, node);
            },
            onUnselect:function (node) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onUnselect.call(this, node);
            },
            onCheck: function (node, checked) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combotree');
                if (state.donotFired) return;
                state.remainText = false;
                retrieveValues(target, state);
                var opts = state.options;
                opts.onCheck.call(target, node, checked);
            }
        }));

        /**
         * retrieve values from tree panel.
         */
        function retrieveValues(target, state) {
            if (!state) state = $.data(target, 'combotree');
            var opts = state.options;
            var tree = state.tree;
            var $target = $(target);
            var vv = [], ss = [];
            if (opts.multiple) {
                var nodes = tree.tree('getChecked');
                for (var i = 0, len = nodes.length; i < len; i++) {
                    vv.push(nodes[i].id);
                    ss.push(nodes[i].text);
                }
            } else {
                var node = tree.tree('getSelected');
                if (node) {
                    vv.push(node.id);
                    ss.push(node.text);
                }
            }
            if (!state.remainText) $target.combo('setText', ss.join(opts.separator)).combo('setValues', vv);
        }
    }

    /**
     * create the combotree component.
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        var $target = $(target);
        $target.addClass('combotree-f');
        if (!$target.attr("id")) $target.attr("id", $.parser.getObjGUID());
        //创建panel之后，再创建grid
        opts.afterPanelInited = createTree;
        $target.combo(opts);
    }

    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combotree');
        var opts = state.options;
        var tree = state.tree;
        var t = $(target);
        if (!tree) {
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        } else {
            tree.find('span.tree-checkbox').addClass('tree-checkbox0').removeClass('tree-checkbox1 tree-checkbox2');
            var vv = [], ss = [];
            state.donotFired = true;
            for (var i = 0, len = values.length; i < len; i++) {
                var v = values[i];
                var s = v;
                var node = tree.tree('find', v);
                if (node) {
                    s = node.text;
                    tree.tree('check', node.target);
                    tree.tree('select', node.target);
                }
                vv.push(v);
                ss.push(s);
            }
            state.donotFired = false;
            if (!remainText) t.combo('setText', ss.join(opts.separator));
            t.combo('setValues', vv);
        }
    }

    /**
     * select the specified row via step value,
     */
    function selectRow(target, step, state) {
        if (!state) state = $.data(target, 'combotree');
        if (!state.tree) $(target).combo("panel");
        var tree = state.tree;
        state.remainText = false;
        if (step < 0) tree.tree("selectPrev");
        else tree.tree("selectNext");
    }

    function getTree(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (tree) return tree;
        $(target).combo("panel");
        return state.tree;
    }

    function expandSelected(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (!tree) return tree;
        var node = tree.tree("getSelected");
        if (node) tree.tree("expand", node.target);
    }

    function collapseSelected(target) {
        var state = $.data(target, 'combotree');
        var tree = state.tree;
        if (!tree) return tree;
        var node = tree.tree("getSelected");
        if (node) tree.tree("collapse", node.target);
    }

    $.fn.combotree = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combotree.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combotree');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'combotree', {
                    options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), options)
                });
            }
            create(this, state);
        }, [options]);
    };


    $.fn.combotree.methods = {
        options: function (jq) {
            return $.data(jq[0], 'combotree').options;
        },
        tree: function (jq) {
            return getTree(jq[0]);
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                var opts = state.options;
                opts.data = data;
                if (!state.tree) $(this).combo("panel");
                var tree = state.tree;

                tree.tree('loadData', data);
            });
        },
        reload: function (jq, url) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                var opts = state.options;
                if (!state.tree) $(this).combo("panel");
                var tree = state.tree;
                if (url) opts.url = url;
                tree.tree({url: opts.url});
            });
        },
        setValues: function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        },
        clear: function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'combotree');
                if (state.tree) {
                    $(this).combo("panel");
                    var tree = state.tree;
                    tree.find('div.tree-node-selected').removeClass('tree-node-selected');
                    var cc = tree.tree('getChecked');
                    for (var i = 0, len = cc.length; i < len; i++) {
                        tree.tree('uncheck', cc[i].target);
                    }
                }
                $(this).combo('clear');
            });
        }
    };

    $.fn.combotree.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.tree.parseOptions(target));
    };

    $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {
        editable: false,
        keyHandler:{
            up:function () {
                selectRow(this, -1);
            },
            down:function () {
                selectRow(this, 1);
            },
            enter:function () {
//                selectRow(this, 0);
                var state = $.data(this, 'combotree');
                var opts = state.options;
                var node = state.tree.tree('getSelected');
                opts.onClick.call(this, node);
                $(this).combo('hidePanel');
            },
            ctrlLeft: function() {
                collapseSelected(this);
            },
            ctrlRight: function() {
                expandSelected(this);
            }
        },
        doBeforeQuery: function(q) {
            doBeforeQuery(this, q);
        },
        doQuery: function(q) {
            doQuery(this, q);
        }
    });
})(jQuery);/**
 * combogrid - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   combo
 *   datagrid
 *
 */
(function ($) {
    /**
     * 创建grid
     * @param target
     * @param panel
     */
    function createGrid(target, panel) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;
        var t = $(target);

        if (!grid) {
            grid = $('<table comboid="' + t.attr('id') + '"></table>').appendTo(panel);
            state.grid = grid;
        }
        grid.datagrid($.extend({}, opts, {
            border:false,
            fit:true,
            singleSelect:(!opts.multiple),
            onLoadSuccess:function (data) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                var remainText = state.remainText;
                var values = $(target).combo('getValues');
                setValues(target, values, remainText, state);
                opts.onLoadSuccess.apply(target, arguments);
            },
            onClickRow:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                state.remainText = false;
                retrieveValues(target, state);
                var $target = $(target);
                if (!opts.multiple) {
                    $target.combo('hidePanel');
                }
                $target.combo('textbox').focus().select();
                opts.onClickRow.call(this, index, row);
            },
            onSelect:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelect.call(this, index, row);
            },
            onUnselect:function (index, row) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onUnselect.call(this, index, row);
            },
            onSelectAll:function (rows) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                retrieveValues(target, state);
                opts.onSelectAll.call(this, rows);
            },
            onUnselectAll:function (rows) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'combogrid');
                if (state.donotFired) return;
                var opts = state.options;
                if (opts.multiple) retrieveValues(target, state);
                opts.onUnselectAll.call(this, rows);
            }
        }));

        /**
         * retrieve values from datagrid panel.
         */
        function retrieveValues(target, state) {
            if (!state) state = $.data(target, 'combogrid');
            var grid = state.grid;
            var t = $(target);
            var remainText = state.remainText;
            var rows = grid.datagrid('getSelections');
            var vv = [], ss = [];
            if(opts.multiple && opts.canSearch && t.combo('getText') != ""){
                //add by lizhentao 20141008 添加处理多选搜索设值处理
                var cv = {}, //当前选中值
                    gv = {}, //表格中的值
                    gr = grid.datagrid('getData').rows, //表格所有数据
                    ov = t.combo('getValues'), //原选中值
                    ot = t.combo('getText').split(opts.separator); //原值文本
                for(var i = 0; i < rows.length; i++){
                    cv[rows[i][opts.idField]] = rows[i];
                }
                for(var i = 0; i < gr.length; i++){
                    if(!cv[gr[i][opts.idField]]){
                        gv[gr[i][opts.idField]] = gr[i];
                    }
                }
                for(var i = 0; i < ov.length; i++){
                    if(cv[ov[i]]){//原值处于选中状态
                        vv.push(ov[i]);
                        ss.push(cv[ov[i]][opts.textField]);
                        cv[ov[i]] = false; //选中值已处理，移除
                    }else if(!gv[ov[i]]){//原值不在表格中，保留原值
                        vv.push(ov[i]);
                        ss.push(ot[i]);
                    }
                }
                //处理未处理的选中值
                for(var id in cv){
                    if(cv[id]){
                        vv.push(id);
                        ss.push(cv[id][opts.textField]);
                    }
                }
            }else{
                for (var i = 0, len = rows.length; i < len; i++) {
                    var row = rows[i];
                    vv.push(row[opts.idField]);
                    ss.push(row[opts.textField]);
                }
            }
            if (!remainText) {
                t.combo('setText', ss.join(opts.separator));
            }
            if (!opts.multiple) {
                t.combo('setValues', (vv.length ? vv : ['']));
            } else {
                t.combo('setValues', vv);
            }
        }
    }

    /**
     * create this component.
     */
    function create(target, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        var t = $(target);
        if (!t.attr("id")) t.attr("id", $.parser.getObjGUID());
        t.addClass('combogrid-f');
        //创建panel之后，再创建grid
        opts.afterPanelInited = createGrid;
        t.combo(opts);
    }


    /**
     * select the specified row via step value,
     */
    function selectRow(target, step, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        var rowCount = grid.datagrid('getRows').length;
        state.remainText = false;

        var index;
        var selections = grid.datagrid('getSelections');
        if (selections.length) {
            index = grid.datagrid('getRowIndex', selections[selections.length - 1][opts.idField]);
            index += step;
            if (index < 0) index = 0;
            if (index >= rowCount) index = rowCount - 1;
        } else if (step > 0) {
            index = 0;
        } else if (step < 0) {
            index = rowCount - 1;
        } else {
            index = -1;
        }
        if (index >= 0) {
            grid.datagrid('clearSelections');
            grid.datagrid('selectRow', index);
            if (step == 0) {//触发onclickrow事件
                opts.onClickRow.call(this, index, grid.datagrid('getRowByIndex', index));
            }
        }
    }

    /**
     * select the specified row via step value,
     */
    function selectPage(target, step) {
        var state = $.data(target, 'combogrid');
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        var gridopts = grid.datagrid("options");
        if (!gridopts.pagination) return;
        var pagenum = gridopts.pageNumber;
        var pager;
        if (step < 0 && pagenum > 1) {
            pager = grid.datagrid("getPager");
            pager.pagination("select", pagenum - 1);
        } else if (step > 0) {
            pager = grid.datagrid("getPager");
            var page = pager.pagination("getPageCount");
            if (pagenum < page) pager.pagination("select", pagenum + 1);
        }
    }

    function setValues(target, values, remainText, state) {
        if (!state) state = $.data(target, 'combogrid');
        var t = $(target);
        var opts = state.options;
        var grid = state.grid;

        if (!grid) {
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        } else {
            var rows = grid.datagrid('getRows');
            var ss = [];
            state.donotFired = true;
            grid.datagrid('clearSelections');
            for (var i = 0, len = values.length; i < len; i++) {
                var value = values[i];
                if (value == "") continue;
                var index = grid.datagrid('getRowIndex', value);
                if (index >= 0) {
                    grid.datagrid('selectRow', index);
                    ss.push(rows[index][opts.textField]);
                } else {
                    /*** 若在数据中未找到相对应的值,则给予原文本值 ***/
                    var _text = t.combo('getText');
                    //解决多选文本显示问题
                    ss.push(_text.split(opts.separator)[i]);
                }
            }
            state.donotFired = false;
            if (!remainText) {
                t.combo('setText', ss.join(opts.separator));
            }
            if (t.combo('getValues').join(',') == values.join(',')) {
                return;
            }
            t.combo('setValues', values);
        }
        if (opts.onAfterChange) opts.onAfterChange.call(target);
    }

    /**
     * do the query action
     */
    function doQuery(target, q, state) {
        if (!state) state = $.data(target, 'combogrid');
        var opts = state.options;
        if (!state.grid) $(target).combo("panel");
        var grid = state.grid;
        state.remainText = true;

        /*if (opts.multiple && !q) {
         setValues(target, [], true, state);
         } else {
         setValues(target, [q], true, state);
         }*/
        try {
            if (opts.onQuery) opts.onQuery.call(target, q);
            else if (opts.mode == 'remote') {
                grid.datagrid('clearSelections');
                grid.datagrid('load', $.extend({}, opts.queryParams, {q: q}));
            } else {
                if (!q) return;
                var rows = grid.datagrid('getRows');
                for (var i = 0, len = rows.length; i < len; i++) {
                    if (opts.filter.call(target, q, rows[i], opts)) {
                        grid.datagrid('clearSelections');
                        grid.datagrid('selectRow', i);
                        return;
                    }
                }
            }
        } finally {
            // state.remainText = false;
        }
    }

    function getGrid(target) {
        var state = $.data(target, 'combogrid');
        var grid = state.grid;
        if (grid) return grid;
        $(target).combo("panel");
        return state.grid;
    }

    $.fn.combogrid = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combogrid.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return $.fn.combo.methods[options](this, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'combogrid');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'combogrid', {
                    options:$.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), options)
                });
            }

            create(this, state);
        }, [options]);
    };

    $.fn.combogrid.methods = {
        options:function (jq) {
            return $.data(jq[0], 'combogrid').options;
        },
        // get the datagrid object.
        grid:function (jq) {
            return getGrid(jq[0]);
        },
        setValues:function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        },
        clear:function (jq) {
            return jq.each(function () {
                var state = $.data(this, 'combogrid');
                var grid = state.grid;
                if (grid) grid.datagrid('clearSelections');
                $(this).combo('clear');
            });
        }
    };

    $.fn.combogrid.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.datagrid.parseOptions(target),
            $.parser.parseOptions(target, ['idField', 'textField', 'mode']));
    };

    $.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
        loadMsg:null,
        idField:null,
        textField:null, // the text field to display.
        mode:'local', // or 'remote'

        keyHandler:{
            up:function () {
                selectRow(this, -1);
            },
            down:function () {
                selectRow(this, 1);
            },
            enter:function () {
                selectRow(this, 0);
                $(this).combo('hidePanel');
            },
            ctrlLeft: function() {
                selectPage(this, -1);
            },
            ctrlRight: function() {
                selectPage(this, 1);
            }
        },
        doQuery: function(q) {
            doQuery(this, q);
        },
        filter:function (q, row, opts) {
            if (!opts) opts = $(this).combogrid('options');
            return row[opts.textField].indexOf(q) == 0;
        }
    });
})(jQuery);
/**
 * datebox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      calendar
 *   combo
 *
 */
(function ($) {
    /**
     * create date box
     */
    function createBox(target, state) {
        if (!state) state = $.data(target, 'datebox');
        var opts = state.options, $target = $(target);

        $target.addClass('datebox-f');

        if (!$target.attr("id")) $target.attr("id", $.parser.getObjGUID());
        opts.afterPanelInited = createCalendar;
        $target.combo($.extend({}, opts, {
            onShowPanel:function () {
                var target = this;
                var state = $.data(target, 'datebox');
                var opts = state.options;
                state.calendar.calendar('resize');
                opts.onShowPanel.call(target);
                state = null;
                opts = null;
            }
        }));

        var $parent = $target.combo('textbox').parent();
        $parent.addClass('datebox');
        $target.combo('setValueText', {value: opts.value, text:opts.value});
    }

    function createCalendar(target, panel) {
        var state = $.data(target, 'datebox');
        var opts = state.options;
        var $target = $(target);

        state.calendar = $('<div comboid="' + $target.attr('id') + '"></div>').appendTo(panel).wrap('<div class="datebox-calendar-inner"></div>');
        state.calendar.calendar({
            fit:true,
            border:false,
            onSelect:function (date) {
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'datebox');
                var opts = state.options, $target = $(target);

                var value = opts.formatter(date);
                setValue(target, value, state);
                $target.combo('hidePanel');
                $target.combo('textbox').focus().select();
                opts.onSelect.call(target, date);
            }
        });
        setValue(target, $target.combo('getValue'), state);

        var button = $('<div class="datebox-button"></div>').appendTo(panel);
        $('<a href="javascript:void(0)" class="datebox-current">' + opts.currentText + '</a><a href="javascript:void(0)" class="datebox-close">' + opts.closeText + '</a>').appendTo(button);
        button.find('.datebox-current,.datebox-close').hover(
            function () {
                $(this).addClass('datebox-button-hover');
            },
            function () {
                $(this).removeClass('datebox-button-hover');
            }
        );
        button.find('.datebox-current').bind('click', {target: target}, function (e) {
            var state = $.data(e.data.target, 'datebox');
            state.calendar.calendar({
                year:new Date().getFullYear(),
                month:new Date().getMonth() + 1,
                current:new Date()
            });
        });
        button.find('.datebox-close').bind('click', {target: target}, function (e) {
            var $target = $(e.data.target);
            $target.combo('hidePanel');
            $target.combo('textbox').focus().select();
        });
    }

    /**
     * called when user inputs some value in text box
     */
    function doQuery(target, q) {
        setValue(target, q);
    }

    /**
     * called when user press enter key
     */
    function doEnter(target) {
        var state = $.data(target, 'datebox');
        var opts = state.options;
        var c = state.calendar;
        var value = opts.formatter(c.calendar('options').current);
        setValue(target, value, state);
        $(target).combo('hidePanel');
    }

    function setValue(target, value, state) {
        if (!state) state = $.data(target, 'datebox');
        var opts = state.options;
        $(target).combo('setValue', value).combo('setText', value);
        if (state.calendar && value && value != '') state.calendar.calendar('moveTo', opts.parser(value));
    }

    $.fn.datebox = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.datebox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = $.extend({validType: "isDate"}, options);
        return this.each(function (options) {
            var state = $.data(this, 'datebox');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'datebox', {
                    options:$.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options)
                });
            }
            createBox(this, state);
        }, [options]);
    };

    $.fn.datebox.methods = {
        options:function (jq) {
            return $.data(jq[0], 'datebox').options;
        },
        calendar:function (jq) {    // get the calendar object
            return $.data(jq[0], 'datebox').calendar;
        },
        setValue:function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        }
    };

    $.fn.datebox.parseOptions = function (target) {
        return $.extend({}, $.fn.combo.parseOptions(target), {
        });
    };

    $.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
        panelWidth:180,
        panelHeight:'auto',
        keyHandler:{
            up:function () {
            },
            down:function () {
            },
            enter:function () {
                doEnter(this);
            },
            query:function (q) {
                doQuery(this, q);
            }
        },
        doQuery: function(q) {
            doQuery(this, q);
        },
        currentText:'Today',
        closeText:'Close',
        okText:'Ok',

        formatter:function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return m + '/' + d + '/' + y;
        },
        parser:function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        },

        onSelect:function (date) {
        }
    });
})(jQuery);
/**
 * datetimebox - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 * 	 datebox
 *   timespinner
 *
 */
(function($){
    function createBox(target, state){
        if (!state) state = $.data(target, 'datetimebox');
        var opts = state.options;

        var $target = $(target);
        $target.datebox($.extend({}, opts, {
            onShowPanel:function(){
                var value = $(this).datetimebox('getValue');
                var state = $.data(target, 'datetimebox');
                var opts = state.options;
                setValue(this, value, true, state);
                opts.onShowPanel.call(this);
            },
            formatter:$.fn.datebox.defaults.formatter,
            parser:$.fn.datebox.defaults.parser
        }));
        $target.removeClass('datebox-f').addClass('datetimebox-f');
        $target.combo("panel");
        // override the calendar onSelect event, don't close panel when selected
        $target.datebox('calendar').calendar({
            onSelect:function(date){
                var target = $('#' + $(this).attr('comboid'))[0];
                var state = $.data(target, 'datetimebox');
                var opts = state.options;
                opts.onSelect.call(target, date);
            }
        });

        var panel = $target.datebox('panel');
        if (!state.spinner){
            var p = $('<div style="padding:2px"><input style="width:80px"></div>').insertAfter(panel.children('div.datebox-calendar-inner'));
            state.spinner = p.children('input');

            var button = panel.children('div.datebox-button');
            var ok = $('<a href="javascript:void(0)" class="datebox-ok"></a>').html(opts.okText).appendTo(button);
            ok.hover(
                function(){$(this).addClass('datebox-button-hover');},
                function(){$(this).removeClass('datebox-button-hover');}
            ).bind('click', {target: target}, function(e){
                    doEnter(e.data.target);
                });
        }
        state.spinner.timespinner({
            showSeconds:opts.showSeconds,
            separator:opts.timeSeparator
        }).unbind('.datetimebox').bind('mousedown.datetimebox', function (e) {
                e.stopPropagation();
            });
        setValue(target, opts.value, state);
    }

    /**
     * get current date, including time
     */
    function getCurrentDate(target){
        var $target = $(target);
        var c = $target.datetimebox('calendar');
        var t = $target.datetimebox('spinner');
        var date = c.calendar('options').current;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.timespinner('getHours'), t.timespinner('getMinutes'), t.timespinner('getSeconds'));
    }

    /**
     * called when user inputs some value in text box
     */
    function doQuery(target, q){
        setValue(target, q, true);
    }

    /**
     * called when user press enter key
     */
    function doEnter(target){
        var state = $.data(target, 'datetimebox');
        var opts = state.options;
        var date = getCurrentDate(target);
        setValue(target, opts.formatter.call(target, date), undefined, state);
        $(target).combo('hidePanel');
    }

    /**
     * set value, if remainText is assigned, don't change the text value
     */
    function setValue(target, value, remainText, state){
        if (!state) state = $.data(target, 'datetimebox');
        var opts = state.options;
        var date, $target = $(target);
        $target.combo('setValue', value);
        if (!remainText){
            if (value){
                date = opts.parser.call(target, value);
                $target.combo('setValueText', {value: opts.formatter.call(target, date), text: opts.formatter.call(target, date)});
            } else {
                $target.combo('setText', value);
            }
        }
        date = opts.parser.call(target, value);
        $target.datetimebox('calendar').calendar('moveTo', date);
        $target.datetimebox('spinner').timespinner('setValue', getTimeS(date, $target.datetimebox('spinner').timespinner('options').separator));

        /**
         * get the time formatted string such as '03:48:02'
         */
        function getTimeS(date, separator){
            function formatNumber(value){
                return (value < 10 ? '0' : '') + value;
            }

            var tt = [formatNumber(date.getHours()), formatNumber(date.getMinutes())];
            if (opts.showSeconds){
                tt.push(formatNumber(date.getSeconds()));
            }
            return tt.join(separator);
        }
    }

    $.fn.datetimebox = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.datetimebox.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.datebox(options, param);
            }
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'datetimebox');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'datetimebox', {
                    options: $.extend({}, $.fn.datetimebox.defaults, $.fn.datetimebox.parseOptions(this), options)
                });
            }
            createBox(this, state);
        }, [options]);
    };

    $.fn.datetimebox.methods = {
        options: function(jq){
            return $.data(jq[0], 'datetimebox').options;
        },
        spinner: function(jq){
            return $.data(jq[0], 'datetimebox').spinner;
        },
        setValue: function(jq, value){
            return jq.each(function(){
                setValue(this, value);
            });
        }
    };

    $.fn.datetimebox.parseOptions = function(target){
        var t = $(target);
        return $.extend({}, $.fn.datebox.parseOptions(target), $.parser.parseOptions(target, [
            'timeSeparator', {showSeconds:'boolean'}
        ]));
    };

    $.fn.datetimebox.defaults = $.extend({}, $.fn.datebox.defaults, {
        showSeconds:true,
        timeSeparator:':',

        keyHandler: {
            up:function(){},
            down:function(){},
            enter:function(){doEnter(this);},
            query:function(q){doQuery(this, q);}
        },

        formatter:function(date){
            var h = date.getHours();
            var M = date.getMinutes();
            var s = date.getSeconds();
            function formatNumber(value){
                return (value < 10 ? '0' : '') + value;
            }

            var separator = $(this).datetimebox('spinner').timespinner('options').separator;
            var r = $.fn.datebox.defaults.formatter(date) + ' ' + formatNumber(h) + separator + formatNumber(M);
            if ($(this).datetimebox('options').showSeconds) {
                r += separator + formatNumber(s);
            }
            return r;
        },
        parser:function(s){
            if ($.trim(s) == ''){
                return new Date();
            }
            var dt = s.split(' ');
            var d = $.fn.datebox.defaults.parser(dt[0]);
            if (dt.length < 2) {
                return d;
            }
            var separator = $(this).datetimebox('spinner').timespinner('options').separator;
            var tt = dt[1].split(separator);
            var hour = parseInt(tt[0], 10) || 0;
            var minute = parseInt(tt[1], 10) || 0;
            var second = parseInt(tt[2], 10) || 0;

            return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, second);
        }
    });
})(jQuery);
/**
 * slider - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *  draggable
 *
 */
(function($){
    function init(target){
        var $target = $(target);
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var slider = $('<div class="slider" targetid="' + $target.attr('id') + '">' +
            '<div class="slider-inner">' +
            '<a href="javascript:void(0)" class="slider-handle"></a>' +
            '<span class="slider-tip"></span>' +
            '</div>' +
            '<div class="slider-rule"></div>' +
            '<div class="slider-rulelabel"></div>' +
            '<div style="clear:both"></div>' +
            '<input type="hidden" class="slider-value">' +
            '</div>').insertAfter(target);
        var name = $target.hide().attr('name');
        if (name){
            slider.find('input.slider-value').attr('name', name);
            $target.removeAttr('name').attr('sliderName', name);
        }
        return slider;
    }

    /**
     * set the slider size, for vertical slider, the height property is required
     */
    function setSize(target, param, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider;

        if (param){
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
        }
        if (opts.mode == 'h'){
            slider.css('height', '');
            slider.children('div').css('height', '');
            if (!isNaN(opts.width)){
                slider.width(opts.width);
            }
        } else {
            slider.css('width', '');
            slider.children('div').css('width', '');
            if (!isNaN(opts.height)){
                slider.height(opts.height);
                slider.find('div.slider-rule').height(opts.height);
                slider.find('div.slider-rulelabel').height(opts.height);
                slider.find('div.slider-inner')._outerHeight(opts.height);
            }
        }
        initValue(target, state);
    }

    /**
     * show slider rule if needed
     */
    function showRule(target, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider;

        if (opts.mode == 'h'){
            _build(opts.rule, opts.mode);
        } else {
            _build(opts.rule.slice(0).reverse(), opts.mode);
        }

        function _build(aa, mode){
            var rule = slider.find('div.slider-rule');
            var label = slider.find('div.slider-rulelabel');
            rule.empty();
            label.empty();
            for(var i= 0, len = aa.length; i<len; i++){
                var distance = i*100/(aa.length-1)+'%';
                var span = $('<span></span>').appendTo(rule);
                span.css((mode=='h'?'left':'top'), distance);

                // show the labels
                if (aa[i] != '|'){
                    span = $('<span></span>').appendTo(label);
                    span.html(aa[i]);
                    if (mode == 'h'){
                        span.css({
                            left: distance,
                            marginLeft: -Math.round(span.outerWidth()/2)
                        });
                    } else {
                        span.css({
                            top: distance,
                            marginTop: -Math.round(span.outerHeight()/2)
                        });
                    }
                }
            }
        }
    }

    /**
     * build the slider and set some properties
     */
    function buildSlider(target, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider;

        slider.removeClass('slider-h slider-v slider-disabled');
        slider.addClass(opts.mode == 'h' ? 'slider-h' : 'slider-v');
        slider.addClass(opts.disabled ? 'slider-disabled' : '');

        slider.find('a.slider-handle').draggable({
            axis:opts.mode,
            cursor:'pointer',
            disabled: opts.disabled,
            onDrag:function(e){
                var sl = getSlider(this);
                var opts = sl.state.options;
                var left = e.data.left;
                var width = sl.slider.width();
                if (opts.mode!='h'){
                    left = e.data.top;
                    width = sl.slider.height();
                }
                if (left < 0 || left > width) {
                    return false;
                } else {
                    var value = pos2value(sl.target, left, sl.state);
                    adjustValue(value, sl.target, opts);
                    return false;
                }
            },
            onStartDrag:function(){
                var sl = getSlider(this);
                var opts = sl.state.options;
                opts.onSlideStart.call(sl.target, opts.value);
            },
            onStopDrag:function(e){
                var sl = getSlider(this);
                var opts = sl.state.options;

                var value = pos2value(sl.target, (opts.mode=='h'?e.data.left:e.data.top), sl.state);
                adjustValue(value, sl.target, opts);
                sl.opts.onSlideEnd.call(sl.target, opts.value);
            }
        });

        function getSlider(self) {
            var slider = $($(self).parents('.slider')[0]);
            var target = $('#' + slider.attr('targetid'));
            var state = $.data(target, 'menubutton');
            return {
                slider: slider,
                target: target,
                state: state
            }
        }

        function adjustValue(value, target, opts){
            var s = Math.abs(value % opts.step);
            if (s < opts.step/2){
                value -= s;
            } else {
                value = value - s + opts.step;
            }
            setValue(target, value);
        }
    }

    /**
     * set a specified value to slider
     */
    function setValue(target, value, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider;
        var oldValue = opts.value;
        if (value < opts.min) value = opts.min;
        if (value > opts.max) value = opts.max;

        opts.value = value;
        $(target).val(value);
        slider.find('input.slider-value').val(value);

        var pos = value2pos(target, value, state);
        var tip = slider.find('.slider-tip');
        if (opts.showTip){
            tip.show();
            tip.html(opts.tipFormatter.call(target, opts.value));
        } else {
            tip.hide();
        }
        var style;
        if (opts.mode == 'h'){
            style = 'left:'+pos+'px;';
            slider.find('.slider-handle').attr('style', style);
            tip.attr('style', style +  'margin-left:' + (-Math.round(tip.outerWidth()/2)) + 'px');
        } else {
            style = 'top:' + pos + 'px;';
            slider.find('.slider-handle').attr('style', style);
            tip.attr('style', style + 'margin-left:' + (-Math.round(tip.outerWidth())) + 'px');
        }

        if (oldValue != value){
            opts.onChange.call(target, value, oldValue);
        }
    }

    function initValue(target, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var fn = opts.onChange;
        opts.onChange = function(){};
        setValue(target, opts.value, state);
        opts.onChange = fn;
    }

    /**
     * translate value to slider position
     */
    function value2pos(target, value, state){
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider, pos;
        if (opts.mode == 'h'){
            pos = (value-opts.min)/(opts.max-opts.min)*slider.width();
        } else {
            pos = slider.height() - (value-opts.min)/(opts.max-opts.min)*slider.height();
        }
        return pos.toFixed(0);
    }

    /**
     * translate slider position to value
     */
    function pos2value(target, pos, state) {
        if (!state) state = $.data(target, 'slider');
        var opts = state.options;
        var slider = state.slider, value;
        if (opts.mode == 'h'){
            value = opts.min + (opts.max-opts.min)*(pos/slider.width());
        } else {
            value = opts.min + (opts.max-opts.min)*((slider.height()-pos)/slider.height());
        }
        return value.toFixed(0);
    }

    $.fn.slider = function(options, param){
        if (typeof options == 'string'){
            return $.fn.slider.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(options){
            var state = $.data(this, 'slider');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'slider', {
                    options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), options),
                    slider: init(this)
                });
                $(this).prop('disabled', false);
            }
            buildSlider(this, state);
            showRule(this, state);
            setSize(this, undefined, state);
        }, [options]);
    };

    $.fn.slider.methods = {
        options: function(jq){
            return $.data(jq[0], 'slider').options;
        },
        destroy: function(jq){
            return jq.each(function(){
                $.data(this, 'slider').slider.remove();
                $(this).remove();
            });
        },
        resize: function(jq, param){
            return jq.each(function(){
                setSize(this, param);
            });
        },
        getValue: function(jq){
            return jq.slider('options').value;
        },
        setValue: function(jq, value){
            return jq.each(function(){
                setValue(this, value);
            });
        },
        enable: function(jq){
            return jq.each(function(){
                var state = $.data(this, 'slider');
                state.options.disabled = false;
                buildSlider(this, state);
            });
        },
        disable: function(jq){
            return jq.each(function(){
                var state = $.data(this, 'slider');
                state.options.disabled = true;
                buildSlider(this, state);
            });
        }
    };

    $.fn.slider.parseOptions = function(target){
        var t = $(target);
        var ta = t.attr('rule');
        return $.extend({}, $.parser.parseOptions(target, [
            'width', 'height', 'mode', {showTip:'boolean', min:'number', max:'number', step:'number'}
        ]), {
            value:(t.val() || undefined),
            disabled:(t.prop('disabled') ? true : undefined),
            rule:(ta ? eval(ta) : undefined)
        });

    };

    $.fn.slider.defaults = {
        width: 'auto',
        height: 'auto',
        mode: 'h',	// 'h'(horizontal) or 'v'(vertical)
        showTip: false,
        disabled: false,
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        rule: [],	// [0,'|',100]
        tipFormatter: function(value){return value},
        onChange: function(value, oldValue){},
        onSlideStart: function(value){},
        onSlideEnd: function(value){}
    };
})(jQuery);
/**
 * portal - jQuery EasyUI
 *
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *   draggable
 *   panel
 *
 */
(function ($) {
    /**
     * 绘制网格
     * @param portal
     */
    function drawGrid(portal, show) {
        if (show) {
            //增加样式，绘制横线，间隔20像素
            portal.addClass('portal-grid');
            $('#' + portal.attr('id') + '__g' + ' > tbody > tr > td').addClass("portal-grid-td");
        } else {
            portal.removeClass('portal-grid');
            $('#' + portal.attr('id') + '__g' + ' > tbody > tr > td').removeClass("portal-grid-td");
        }
    }

    /**
     * 增加网格线的table
     * @param portal
     * @param gridColCount
     */
    function addGrid(portal, gridColCount) {
        //加table，绘制竖线，按设置的列数绘制
        var st = ['<table id="' + portal.attr('id') + '__g" style="position:relative;border-collapse: collapse"><tr>'];
        for (var j = 0; j < gridColCount; j++) {
            st.push('<td></td>');
        }
        st.push("</tr></table>");
        $(st.join("")).prependTo(portal);
//        var table = document.createElement('table');
//        table.id = portal.attr('id') + '__g';
//        table.style.position = 'relative';
//
//        table.style.borderCollapse = "collapse";
//        var tr = document.createElement("tr");
//
//        for (var j = 0; j < gridColCount; j++) {
//            var td = document.createElement("td");
////            td.innerText = "aaa";
//            tr.appendChild(td);
//        }
//        table.appendChild(tr);
//        portal.prepend(table);
    }

    /**
     * initialize the portal
     */
    function init(target, state) {
        var $target = $(target);
        $target.addClass('portal-wrap');
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        var portalId = $target.attr('id');
        if (!state) state = $.data(target, 'portal');
        var opts = state.options;
        //门户区
        state.portal = $('<div class="portal" id="' + portalId + '__p"></div>').prependTo($target);
        state.portal.css("margin-left", opts.margine.left + 'px');
        state.portal.css("margin-top", opts.margine.top + 'px');
        state.portal.css("margin-right", opts.margine.right + 'px');
        state.portal.css("margin-bottom", opts.margine.bottom + 'px');
        //添加网格线控件
        addGrid(state.portal, opts.gridColCount);
        if (!opts.readonly) drawGrid(state.portal, true);

        calcCellWidths(opts);

        $target.bind('_resize', {target:target}, function (e) {
            setSize(e.data.target);
        });
        setSize($('#' + portalId)[0]);

//        setInterval(function () {
//            setPortalSize($('#' + portalId)[0]);
//        }, 500);
    }

    function setSize(target) {
        var $target = $(target);
        var state = $.data(target, 'portal');
        var opts = state.options, p;
        if (opts.fit) {
            p = $target.parent();
            opts.width = p.width() - getCssIntValue(p, "padding-left") - getCssIntValue(p, "padding-right");
            opts.height = p.height() - getCssIntValue(p, "padding-bottom") - getCssIntValue(p, "padding-top");
        }
        if (!isNaN(opts.width)) {
            var w = opts.width - getCssIntValue($target, "margin-left") - getCssIntValue($target, "margin-right");
            if ($.boxModel == true) {
                $target.width(w - ($target.outerWidth() - $target.width()));
            } else {
                $target.width(w - 2);
            }
        } else {
            $target.width('auto');
        }
        if (!isNaN(opts.height)) {
            var h = opts.height  - getCssIntValue($target, "margin-top") - getCssIntValue($target, "margin-bottom");
            if ($.boxModel == true) {
                $target.height(h - ($target.outerHeight() - $target.height()));
            } else {
                $target.height(h - 2);
            }
        } else {
            $target.height('auto');
        }
        setPortalSize(target, state);
    }

    function setPortalSize(target, state) {
        var $target = $(target), isInterval = !state;
        if (!state) state = $.data(target, 'portal');
        var h = getScrollHeight(target);
        //没有变化
        if (isInterval && $target.attr('lastscrollheight') == h) return;

        $target.attr('lastscrollheight', h);
        var opts = state.options;
        var width = $target.width();
        state.portal.height($target.height() - opts.margine.top - opts.margine.bottom);
        var w = width - opts.margine.left - opts.margine.right;
        state.portal.width(w);
        //IE8下 没有滚动条的时候，scrollHeight很小
        var p = state.portal[0];
        if (h > p.clientHeight) w -= opts.scrollbarSize;
        else h = p.clientHeight;

        opts.gridColWidth = Math.floor(w / opts.gridColCount);

        $('#' + state.portal.attr('id') + '__g').width(opts.gridColCount * opts.gridColWidth)
            .height(h).show();

        //重新计算portlet大小
        var portalOpts = {
            gridColWidth:opts.gridColWidth,
            gridRowHeight:opts.gridRowHeight,
            gridColCount:opts.gridColCount,
            margine:opts.portletMargine
        };
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet("portalOptions", portalOpts);
        });
        opts.onResize.call(target, opts.width, opts.height);
    }

    function getScrollHeight(target) {
        var h = 0;
        enumPortlets(target, function (portletId) {
            var opts = $('#' + portletId).portlet("options");
            var b = opts.top + opts.height;
            if (h < b) h = b;
        });
        return h;
    }

    //param: id, title, url, bounds
    function addPortlets(target, param) {
        var state = $.data(target, 'portal');
        if (!param.length) param = [param];
        var top = 0, p, portlets = [];
        for (var i = 0, len = param.length; i < len; i++) {
            p = param[i];
            if (p.bounds.left == undefined || !p.bounds.width) {
                p.bounds.left = -999;
                p.bounds.top = 0;
                p.bounds.width = 1;
                p.bounds.height = 15;
                portlets.push(p);
            } else {
                top = Math.max(top, p.bounds.top + p.bounds.height);
            }
            addPortlet(target, p, state);
        }
        resetPortlets(target, state, portlets, top);
    }

    function addPortlet(target, portlet, state) {
        if (!state) state = $.data(target, 'portal');
        var opts = state.options;
        var p = $('<div id="' + portlet.id + '"></div>').appendTo(state.portal);
        p.portlet($.extend({
            portalId:$(target).attr("id"),
            readonly:opts.readonly,
            portalOptions:{
                gridColWidth:opts.gridColWidth,
                gridRowHeight:opts.gridRowHeight,
                gridColCount:opts.gridColCount,
                margine:opts.portletMargine
            },
            getCellBounds:getCellBounds,
            getActualBounds:getActualBounds,
            onPortletResize:function (portlet, param) {
                var portalId = $(portlet).attr('portalId');
                checkBoundsResize($('#' + portalId)[0], param);
            },
            onPortletDrag:function (portlet, param) {
                var portalId = $(portlet).attr('portalId');
                checkBoundsDrag($('#' + portalId)[0], param);
            }
        }, portlet));
    }

    /**
     * 获取所有的门户组件
     * @param target
     */
    function getPortlets(target) {
        var portlets = [];
        enumPortlets(target, function (portletId) {
            var opts = $('#' + portletId).portlet("options");
            portlets.push({
                id:portletId,
                key:opts.key,
                bounds:opts.bounds
            });
        });
        return portlets.sort(function (r1, r2) {
            var n = r1.bounds.top - r2.bounds.top;
            if (n != 0) return n;
            return r1.bounds.left - r2.bounds.left;
        });
    }

    function enumPortlets(target, fn) {
        var $target = $(target);
        var portlets = [];
        $('#' + $target.attr('id') + '__p > div.portlet').each(function () {
            var id = $(this).attr('targetid');
            if (fn(id) == false) return false;
        });
        return portlets;
    }

    function clear(target) {
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet('close');
        });
    }

    //判断矩形是否相交
    function isRectIntersect(r1, r2) {
        return (Math.abs(2 * r1.left + r1.width - 2 * r2.left - r2.width) < r1.width + r2.width &&
            Math.abs(2 * r1.top + r1.height - 2 * r2.top - r2.height) < r1.height + r2.height);
    }

    /**
     * 获取所有的门户组件
     * @param target
     * @param param:{bounds:, excludePortletIds:}
     */
    function checkBoundsResize(target, param) {
        var bounds = param.bounds;
        enumPortlets(target, function (portletId) {
            if (param.excludePortletIds.indexOf(portletId) >= 0) return;
            var opts = $('#' + portletId).portlet("options");
            var b = opts.bounds;
            var dir = param.dir;
            //没有相交，则不用管，规则：中心点之间的距离小于边长和的一半
            if (!isRectIntersect(b, bounds)) return;
            if (dir.indexOf('e') >= 0) {
                bounds.width = b.left - bounds.left;
            }

            if (dir.indexOf('w') >= 0) {
                bounds.width = bounds.width + bounds.left - b.left - b.width;
                bounds.left = b.left + b.width;
            }

            if (!isRectIntersect(b, bounds)) return;
            if (dir.indexOf('s') >= 0) {//dir.indexOf('e') < 0 &&
                bounds.height = b.top - bounds.top;
            }

            if (dir.indexOf('n') >= 0) {//dir.indexOf('w') < 0 &&
                bounds.height = bounds.height + bounds.top - b.top - b.height;
                bounds.top = b.top + b.height;
            }
        });
    }

    /**
     * 获取所有的门户组件
     * @param target
     * @param param:{bounds:, excludePortletIds: pageX,pageY}
     */
    function checkBoundsDrag(target, param) {
        var state = $.data(target, 'portal');
        var portalOpts = {
            gridColWidth:state.options.gridColWidth,
            gridRowHeight:state.options.gridRowHeight,
            gridColCount:state.options.gridColCount,
            margine:state.options.portletMargine
        };
        var bounds = getActualBounds(param.bounds, portalOpts);
        var oldBounds = $.extend({}, bounds);
        var lastBounds = getActualBounds(param.lastBounds, portalOpts);
        //修正不能超出边界
        var mw = portalOpts.gridColWidth * portalOpts.gridColCount;
        //找出鼠标周围最大空白区域
        var blank = {
            left: 0,
            top: 0,
            right: mw,
            bottom:99999
        };
        var px = param.pageX, py = param.pageY + state.portal.scrollTop();
        enumPortlets(target, function (portletId) {
            if (param.excludePortletIds.indexOf(portletId) >= 0) return;
            var opts = $('#' + portletId).portlet("options");
//            var b = opts.bounds;
//            //当前鼠标位置有东东，不准
//            if (px >= b.left && px <= b.left + b.width &&
//                py >= b.top && py <= b.top + b.height) {
//                param.accept = false;
//                return false;
//            }

            var b = getActualBounds(opts.bounds, portalOpts);

            //当前鼠标位置有东东，不准
            if (px >= b.left && px <= b.left + b.width &&
                py >= b.top && py <= b.top + b.height) {
                param.accept = false;
                return false;
            }
            if (px < b.left)
                blank.right = Math.min(blank.right, b.left);
            else if (px > b.left + b.width)
                blank.left = Math.max(blank.left, b.left + b.width);
            if (py < b.top)
                blank.bottom = Math.min(blank.bottom, b.top);
            else if (py > b.top + b.height)
                blank.top = Math.max(blank.top, b.top + b.height);

            //没有相交，则不用管，规则：中心点之间的距离小于边长和的一半
            if (!isRectIntersect(b, bounds)) return;

            if (px < b.left) {
                bounds.width = b.left - bounds.left;
            } /*else {
             bounds.left = b.left + b.width;
             }*/
            if (!isRectIntersect(b, bounds)) return;

            if (py < b.top) {
                bounds.height = b.top - bounds.top;
            } /*else {
             bounds.top = b.top + b.height;
             }*/
            if (!isRectIntersect(b, bounds)) return;
            if (px > b.left) {
                bounds.left = b.left + b.width;
            }
            if (!isRectIntersect(b, bounds)) return;
            if (py > b.top) {
                bounds.top = b.top + b.height;
            }
        });
        //不准就不准了，直接返回
        if (!param.accept) return;

        if (bounds.left + bounds.width > mw) bounds.width = mw - bounds.left;

        //变小了，按最大区域来
        if (bounds.width < oldBounds.width || bounds.height < oldBounds.height) {
            bounds.width = Math.min(oldBounds.width, blank.right - blank.left);
            bounds.left = blank.right - bounds.width;

            blank.bottom = Math.min(blank.bottom, Math.max(bounds.top + bounds.height, oldBounds.top + oldBounds.height, lastBounds.top + lastBounds.height));
            bounds.height = Math.min(oldBounds.height, blank.bottom - blank.top);
            bounds.top = blank.bottom - bounds.height;
        }

        bounds = getCellBounds(bounds, portalOpts);
        param.bounds.left = bounds.left;
        param.bounds.top = bounds.top;
        param.bounds.width = bounds.width;
        param.bounds.height = bounds.height;
    }

    //将区域从像素换算成单元格
    function getCellBounds(bounds, opts) {
        return {
            left:Math.floor(bounds.left / opts.gridColWidth),
            top:Math.floor(bounds.top / opts.gridRowHeight),
            width:Math.floor(bounds.width / opts.gridColWidth),
            height:Math.floor(bounds.height / opts.gridRowHeight)
        };
    }

    //将区域从单元格换算成像素
    function getActualBounds(bounds, opts) {
        return {
            left:bounds.left * opts.gridColWidth,
            top:bounds.top * opts.gridRowHeight,
            width:bounds.width * opts.gridColWidth,
            height:bounds.height * opts.gridRowHeight
        };
    }

    function setReadOnly(target, readonly) {
        var state = $.data(target, 'portal');
        state.options.readonly = readonly;
        drawGrid(state.portal, !readonly);
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet('setReadOnly', readonly);
        });
    }

    function calcCellWidths(options) {
        var colCellWidths = [];
        for (i = 0, len = options.columnWidths.length; i < len; i++) {
            colCellWidths.push(Math.round(options.columnWidths[i] * options.gridColCount / 100));
        }
        options.colCellWidths = colCellWidths;
    }

    function layout(target, param) {
        var state = $.data(target, 'portal');
        var opts = state.options;
        opts.columnWidths = param;
        calcCellWidths(opts);
        var portlets = getPortlets(target);
        resetPortlets(target, state, portlets, 0);
    }

    function resetPortlets(target, state, portlets, top) {
        var opts = state.options;
        var colCellWidths = opts.colCellWidths;
        if (!top) top = 0;
        var col = 0, left = 0, width = colCellWidths[0];
        //重新计算portlet大小
        var portalOpts = {
            gridColWidth:opts.gridColWidth,
            gridRowHeight:opts.gridRowHeight,
            gridColCount:opts.gridColCount,
            margine:opts.portletMargine
        };
        var i, len;
        for (i = 0, len = portlets.length; i < len; i++) {
            var p = portlets[i];
            $('#' + p.id).portlet('portletResize', {
                bounds:{
                    left:left,
                    top:top,
                    width:width,
                    height:15
                },
                portalOptions:portalOpts
            });
            col++;
            if (col < opts.columnWidths.length) {
                left += width;
                width = colCellWidths[col];
            } else {
                top += 15;
                left = 0;
                width = colCellWidths[0];
                col = 0;
            }
        }
    }

    function maximizePortlet(target) {
        $('#' + $(target).attr('id') + '__p').css("overflow-y", "hidden");
        enumPortlets(target, function (portletId) {
            $('#' + portletId).portlet("maximize");
        });
    }

    $.fn.portal = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.portal.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'portal');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'portal', {
                    options:$.extend({}, $.fn.portal.defaults, options)
                });
                init(this, state);
            }
            if (state.options.border) {
                $(this).removeClass('portal-noborder');
            } else {
                $(this).addClass('portal-noborder');
            }
            setSize(this);
        });
    };

    $.fn.portal.methods = {
        options:function (jq) {
            return $.data(jq[0], 'portal').options;
        },
        resize:function (jq, param) {
            return jq.each(function () {
                if (param) {
                    var opts = $.data(this, 'portal').options;
                    if (param.width) opts.width = param.width;
                    if (param.height) opts.height = param.height;
                }
                setSize(this);
            });
        },
        getPortlets:function (jq) {
            return getPortlets(jq[0]);
        },
        add:function (jq, param) {    // param: {panel,columnIndex}
            return addPortlets(jq[0], param);
        },
        clear:function (jq) {    // param: {panel,columnIndex}
            return clear(jq[0]);
        },
        remove:function (jq, portletId) {
            return $('#' + portletId).portlet('close');
        },
        setReadOnly:function (jq, param) {
            setReadOnly(jq[0], param);
        },
        layout:function (jq, param) {
            layout(jq[0], param);
        },
        maximizePortlet: function(jq) {
            maximizePortlet(jq[0]);
        }
    };

    $.fn.portal.defaults = {
        width:'auto',
        height:'auto',
        border:true,
        fit:true,
        columnWidths:[50, 50], //列布局，数组,记录各列列宽，和=100；默认2列
        readonly:true,
        gridColCount:16, //网格列数
        gridRowHeight:20, //网格行高
        scrollbarSize:18,
        margine:{//边距
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        portletMargine:{//组件边距
            left:10,
            top:10,
            right:0,
            bottom:0
        },
        autoArrange:{//自动排列
            afterDrag:true, //拖动后自动调位置
            afterResize:false, //改变大小后自动调位置
            left:true, //自动左移
            top:true, //自动上移
            leftPrior:true//优先左移
        },
        onResize:function (width, height) {
        },
        onStateChange:function () {
        }
    };
})(jQuery);/**
 /**
 * portlet - jQuery EasyUI
 *
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ]
 *
 * Dependencies:
 *      panel
 *   draggable
 *   resizable
 *
 */
(function ($) {
    function setSize(target, param) {
        var opts = $.data(target, 'portlet').options;
        if (param) {
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }
        $(target).panel('resize', opts);
    }

    function moveportlet(target, param) {
        var state = $.data(target, 'portlet');
        if (param) {
            if (param.left != null) state.options.left = param.left;
            if (param.top != null) state.options.top = param.top;
        }
        $(target).panel('move', state.options);
        if (state.shadow) {
            state.shadow.css({
                left:state.options.left,
                top:state.options.top
            });
        }
    }

    function create(target) {
        var state = $.data(target, 'portlet'), $target = $(target);
        var options = state.options;
        if (!$target.attr('id')) $target.attr('id', $.parser.getObjGUID());
        if (state.options.portalId) $target.attr('portalId', state.options.portalId);
        if (!options.frameCreated) {
            $('<iframe style="width:100%;height:100%;" ' +
                'scrolling="' + options.framescrolling + '" ' +
                'frameborder="' + options.frameborder + '"></iframe>').appendTo($target).attr("src", options.url);
            options.frameCreated = true;
        }
        var tools = state.options.tools || [];
        var id = $target.attr('id');

        if (state.options.refresh) {
            tools.push({
                iconCls:'panel-tool-reload',
                handler:function () {
                    var frm = $('#' + id + '>iframe');
                    var url = frm.attr('src');
                    frm.attr('src', '').attr('src', url);
                }
            });
        }
        if (options.moreurl && options.moreurl != '') {
            tools.push({
                iconCls:'panel-tool-more',
                handler:function () {
                    var target = $('#' + id)[0];
                    var opts = $.data(target, 'portlet').options;
                    var title = opts.title;
                    if (opts.moretitle) title = opts.moretitle;
                    opts.openMoreUrl.call(target, title, opts.moreurl);
                }
            });
        }

        var win = $(target).panel($.extend({}, state.options, {
            border:false,
            doSize:true, // size the panel, the property undefined in portlet component
            closed:true, // close the panel
            cls:'portlet',
            headerCls:'portlet-header',
            bodyCls:'portlet-body',
            tools:tools,
            boundOffset: 6, //圆弧边框高度计算偏差 added by lizhentao 20140917
            closable:state.options.closable && !state.options.readonly,
            onBeforeDestroy:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                if (state.options.onBeforeDestroy.call(target) == false) return false;
                if (state.shadow) state.shadow.remove();
            },
            onClose:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                state.options.onClose.call(target);
                $(this).portlet("destroy");
            },
            onOpen:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                if (state.shadow) {
                    state.shadow.css({
                        display:'block',
                        zIndex:$.fn.portlet.defaults.zIndex++,
                        left:state.options.left,
                        top:state.options.top,
                        width:state.portlet.outerWidth(),
                        height:state.portlet.outerHeight()
                    });
                }
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                state.options.onOpen.call(target);
            },
            onResize:function (width, height) {
                var target = this;
                var state = $.data(target, 'portlet');
                var opts = $(target).panel('options');
                state.options.width = opts.width;
                state.options.height = opts.height;
                state.options.left = opts.left;
                state.options.top = opts.top;
                if (state.shadow) {
                    state.shadow.css({
                        left:state.options.left,
                        top:state.options.top,
                        width:state.portlet.outerWidth(),
                        height:state.portlet.outerHeight()
                    });
                }

                state.options.onResize.call(target, width, height);
            },
            onMaximize:function () {
                var target = this;
                var state = $.data(target, 'portlet');
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);
            }
        }));

        state.portlet = win.panel('panel');

        // create shadow
        if (state.shadow) state.shadow.remove();
        if (state.options.shadow == true) {
            state.shadow = $('<div class="portlet-shadow"></div>').insertAfter(state.portlet);
            state.shadow.css({
                display:'none'
            });
        }

        var parent;
        // if require center the portlet
        if (state.options.left == null) {
            var width = state.options.width;
            if (isNaN(width)) {
                width = state.portlet.outerWidth();
            }

            parent = state.portlet.parent();
            state.options.left = (parent.width() - width) / 2 + parent.scrollLeft();

        }
        if (state.options.top == null) {
            var height = state.portlet.height;
            if (isNaN(height)) {
                height = state.portlet.outerHeight();
            }

            parent = state.portlet.parent();
            state.options.top = (parent.height() - height) / 2 + parent.scrollTop();

        }
        moveportlet(target);

        if (state.options.closed == false) {
            win.portlet('open');	// open the portlet
        }
        resizePortlet(target, state);
    }

    /**
     * set portlet drag and resize property
     */
    function setProperties(target) {
        var state = $.data(target, 'portlet');
        state.portlet.draggable({
            handle:'>div.panel-header>div.panel-title',
            disabled:state.options.readonly,
            proxy:function () {
                var target = $('#' + $(this).attr('targetid'))[0], state = $.data(target, 'portlet');

                return state.proxy;
            },
            onBeforeDrag:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                var param = getActualBounds(target, state);
                var ep = $(e.data.parent);
                param.left -= ep.scrollLeft();
                param.top -= ep.scrollTop();
                e.data.startLeft = param.left;
                e.data.startTop = param.top;
                e.data.left = param.left;
                e.data.top = param.top;
                e.data.width = param.width;
                e.data.height = param.height;

                e.data.lastLeft = state.options.bounds.left;
                e.data.lastTop = state.options.bounds.top;
                e.data.lastWidth = state.options.bounds.width;
                e.data.lastHeight = state.options.bounds.height;

                if (state.shadow) state.shadow.css('z-index', $.fn.portlet.defaults.zIndex++);
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                if (!state.proxy) {
                    state.proxy = $('<div class="portlet-proxy"></div>').insertAfter(state.portlet);
                }
//                var param = getActualBounds(target, state);
                state.proxy.css({
                    display:'none',
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);

                state.proxy.show();
            },
            onDrag:function (e) {
                var target = $('#' + $(this).attr('targetid'))[0];
                var state = $.data(target, 'portlet');
                doDragParam(target, state, e);
                state.proxy.css({
                    display:'block',
                    left:e.data.left,
                    top:e.data.top,
                    width:e.data.width,
                    height:e.data.height
                });
                return false;
            },
            onStopDrag:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');

                //doDragParam(target, state, e);
//                //位置换算成单元格单位
//                var bounds = getCellBounds(target, e.data, state);
                state.options.bounds.left = e.data.lastLeft;
                state.options.bounds.top = e.data.lastTop;
                state.options.bounds.width = e.data.lastWidth;
                state.options.bounds.height = e.data.lastHeight;
                var bounds = getActualBounds(target, state);

                state.options.left = bounds.left + state.options.portalOptions.margine.left;
                state.options.top = bounds.top + state.options.portalOptions.margine.top;
                state.options.width = bounds.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
                state.options.height = bounds.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
//                $target.portlet('move');
                setSize(target);
//                state.proxy.remove();
                state.proxy = null;
            }
        });

        state.portlet.resizable({
            disabled:state.options.readonly,
            onBeforeResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                var param = getActualBounds(target, state);
                e.data.startLeft = param.left;
                e.data.startTop = param.top;
                e.data.left = param.left;
                e.data.top = param.top;
                e.data.width = param.width;
                e.data.height = param.height;

                if (state.shadow) state.shadow.css('z-index', $.fn.portlet.defaults.zIndex++);
                state.portlet.css('z-index', $.fn.portlet.defaults.zIndex++);

                //这玩意不能去掉，否则在变小时document的mouseup不能触发
                state.pmask = $('<div class="portlet-proxy-mask" style="width:100%;height:100%"></div>').insertAfter(state.portlet);
                state.pmask.css({
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:0, //e.data.left,
                    top:0//e.data.top,
//                    width:state.portlet.outerWidth(),
//                    height:state.portlet.outerHeight()
                });

                if (!state.proxy) {
                    state.proxy = $('<div class="portlet-proxy"></div>').insertAfter(state.portlet);
                }

                state.proxy.css({
                    display:'none',
                    zIndex:$.fn.portlet.defaults.zIndex++,
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);

                state.proxy.show();
            },
            onResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                doResizeParam(target, state, e);
                state.proxy.css({
                    left:e.data.left,
                    top:e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize:function (e) {
                var $target = $('#' + $(this).attr('targetid'));
                var target = $target[0], state = $.data(target, 'portlet');
                doResizeParam(target, state, e);
                //位置换算成单元格单位
                var bounds = getCellBounds(target, e.data, state);
                state.options.bounds.left = bounds.left;
                state.options.bounds.top = bounds.top;
                state.options.bounds.width = bounds.width;
                state.options.bounds.height = bounds.height;

                state.options.left = e.data.left + state.options.portalOptions.margine.left;
                state.options.top = e.data.top + state.options.portalOptions.margine.top;
                state.options.width = e.data.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
                state.options.height = e.data.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
                setSize(target);

                state.pmask.remove();
                state.pmask = null;
                state.proxy.remove();
                state.proxy = null;
            }
        });
    }

    //重新计算尺寸
    function resizePortlet(target, state) {
        var param = getActualBounds(target, state);
        state.options.left = param.left + state.options.portalOptions.margine.left;
        state.options.top = param.top + state.options.portalOptions.margine.top;
        state.options.width = param.width - state.options.portalOptions.margine.left - state.options.portalOptions.margine.right;
        state.options.height = param.height - state.options.portalOptions.margine.top - state.options.portalOptions.margine.bottom;
        setSize(target);
    }

    function doResizeParam(target, state, e) {
        var opts = state.options.portalOptions;
        var gc = opts.gridColWidth, gw = opts.gridColCount * opts.gridColWidth, gr = opts.gridRowHeight;

        var l = e.data.left, t = e.data.top, w = e.data.width, h = e.data.height;
        if (l < 0) l = 0;
        if (t < 0) t = 0;

        t = getNearValue(t, gr);
        l = getNearValue(l, gc);
        h = getNearValue(e.data.top + h, gr) - t;
        if (h < 1) h = 1;
        w = getNearValue(e.data.left + w, gc) - l;
        if (w < 1) w = 1;
        if (l + w > gw) l = gw - w;

        e.data.left = l;
        e.data.top = t;
        e.data.width = w;
        e.data.height = h;
        var bounds = getCellBounds(target, e.data, state);
        if (state.options.onPortletResize) state.options.onPortletResize.call(target, target, {
            dir:e.data.dir,
            last:{
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            },
            bounds:bounds,
            excludePortletIds:[$(target).attr('id')]
        });

        bounds = getActualBoundsEx(target, bounds, state);
        e.data.left = bounds.left;
        e.data.top = bounds.top;
        e.data.width = bounds.width;
        e.data.height = bounds.height;
    }

    function doDragParam(target, state, e) {
        var opts = state.options.portalOptions;
        var gc = opts.gridColWidth, gw = opts.gridColCount * opts.gridColWidth, gr = opts.gridRowHeight;

        var l = e.data.left, t = e.data.top;
        if (l < 0) l = 0;
        if (t < 0) t = 0;

        t = getNearValue(t, gr);

        var ww = e.data.width;
        if (l + ww > gw) l = gw - ww;
        l = getNearValue(l, gc);

        e.data.left = l;
        e.data.top = t;

        var bounds = getCellBounds(target, e.data, state);
        bounds.width = state.options.bounds.width;
        bounds.height = state.options.bounds.height;
        var param = {
            pageX:e.pageX,
            pageY:e.pageY,
            accept:true,
            bounds:bounds,
            lastBounds: {
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            },
            excludePortletIds:[$(target).attr('id')]
        };
        if (state.options.onPortletDrag) state.options.onPortletDrag.call(target, target, param);
        if (param.accept && bounds.width > 0 && bounds.height > 0) {
            e.data.lastLeft = bounds.left;
            e.data.lastTop = bounds.top;
            e.data.lastWidth = bounds.width;
            e.data.lastHeight = bounds.height;
        } else {
            bounds = {
                left:e.data.lastLeft,
                top:e.data.lastTop,
                width:e.data.lastWidth,
                height:e.data.lastHeight
            };
        }
        bounds = getActualBoundsEx(target, bounds, state);
        e.data.left = bounds.left;
        e.data.top = bounds.top;
        e.data.width = bounds.width;
        e.data.height = bounds.height;
    }

    function getNearValue(val, sep) {
        var n = val % sep;
        if (n < Math.floor(sep / 2)) val -= n;
        else val += sep - n;
        return val;
    }

    function getCellBounds(target, bounds, state) {
        return state.options.getCellBounds(bounds, state.options.portalOptions);
    }

    function getActualBounds(target, state) {
        if (!state) state = $.data(target, 'portlet');
        return getActualBoundsEx(target, state.options.bounds, state);
    }

    function getActualBoundsEx(target, bounds, state) {
        if (!state) state = $.data(target, 'portlet');
        var opts = state.options;
        return state.options.getActualBounds(bounds, opts.portalOptions);
    }

    $.fn.portlet = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.portlet.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.panel(options, param);
            }
        }

        options = options || {};
        return this.each(function (options) {
            var state = $.data(this, 'portlet');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'portlet', {
                    options:$.extend({}, $.fn.portlet.defaults, $.fn.portlet.parseOptions(this), options)
                });
            }
            create(this);
            setProperties(this);
        }, [options]);
    };

    $.fn.portlet.methods = {
        options:function (jq) {
            return $.data(jq[0], 'portlet').options;
        },
        portlet:function (jq) {
            return $.data(jq[0], 'portlet').portlet;
        },
        resize:function (jq, param) {
            return jq.each(function () {
                setSize(this, param);
            });
        },
        move:function (jq, param) {
            return jq.each(function () {
                moveportlet(this, param);
            });
        },
        portletResize: function (jq, param){
            var state = $.data(jq[0], 'portlet');
            var opts = state.options;
            opts = $.extend(opts, param);
            resizePortlet(jq[0], state);
        },
        portalOptions:function (jq, param) {
            var state = $.data(jq[0], 'portlet');
            var opts = state.options;
            if (!param) return opts.portalOptions;
            else {
                opts.portalOptions = $.extend(opts.portalOptions || {}, param);
                resizePortlet(jq[0], state);
            }
        },
        setReadOnly:function (jq, param) {
            jq.portlet({readonly:param});
        }
    };

    $.fn.portlet.parseOptions = function (target) {
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [
            {shadow:'boolean'}
        ]));
    };

    // Inherited from $.fn.panel.defaults
    $.fn.portlet.defaults = $.extend({}, $.fn.panel.defaults, {
        zIndex:1000,
        shadow:true,
        refresh:true,
        readonly:false,
        bounds:{
            left:0,
            top:0,
            width:0,
            height:0
        },
        margine:{
            left:10,
            top:10,
            right:0,
            bottom:0
        },
        // portlet's property which difference from panel
        title:'New portlet',
        collapsible:false,
        minimizable:false,
        maximizable:false,
        showrefresh:true, //显示刷新按钮
        showmore:true, //显示更多链接按钮
        closable:true,
        closed:false,
        framescrolling:'no',
        frameborder:0,
        openMoreUrl:function (title, url) {
        }
    });
})(jQuery);
(function ($) {
    function init(target) {
        var $target = $(target);
        if (!target.id) $target.attr('id', $.parser.getObjGUID());
        $target.addClass("tooltip-f");
    }

    function bindEvents(target, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        if (!opts.autoShow) return;
        var $target = $(target);

        $target.unbind(".tooltip").bind("mousemove.tooltip", {target: target},function (e) {
            var target = e.data.target;
            var state = $.data(target, "tooltip");
            var opts = state.options;
            if (opts.trackMouse) {
                opts.trackMouseX = e.pageX;
                opts.trackMouseY = e.pageY;
                reposition(target, undefined, state);
            }
        }).bind(opts.showEvent + ".tooltip", {target: target},function (e) {
                show(e.data.target, e);
            }).bind(opts.hideEvent + ".tooltip", {target: target}, function (e) {
                hide(e.data.target, e);
            })
    }

    function bindTipTarget(target, param) {
        var state = $.data(target, "tooltip");
        var opts = state.options;
        var tiptarget = param.tiptarget;
        var $tiptarget = $(tiptarget);
        if (opts.trackMouse) {
            $tiptarget.unbind(".tooltip").bind("mousemove.tooltip", {target: target, tipTarget: tiptarget}, function (e) {
                var target = e.data.target;
                var state = $.data(target, "tooltip");
                var opts = state.options;
                opts.trackMouseX = e.pageX;
                opts.trackMouseY = e.pageY;
                reposition(target, e.data.tiptarget, state);
            });
        }
        if (opts.showEvent)
            $tiptarget.bind(opts.showEvent + ".tooltip", {target: target, param: param}, function (e) {
                show(e.data.target, param);
                return false;
            });
        if (opts.hideEvent)
            $tiptarget.bind(opts.hideEvent + ".tooltip", {target: target}, function (e) {
                function posInDomArray(x, y, dom) {
                    var set = dom.offset();
                    return (x >= set.left && x <= set.left + dom._outerWidth() &&
                        y >= set.top && y <= set.top + dom._outerHeight());
                }

                var target = e.data.target;
                var state = $.data(target, "tooltip");

                if (posInDomArray(e.clientX, e.clientY, state.tip)) return;
                if (posInDomArray(e.clientX, e.clientY, state.tip.children(".tooltip-arrow-outer"))) return;
                hide(e.data.target, e);
                return false;
            })
    }

    function clear(target, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state.showTimer) {
            clearTimeout(state.showTimer);
            state.showTimer = null;
        }
        if (state.hideTimer) {
            clearTimeout(state.hideTimer);
            state.hideTimer = null;
        }
    }

    function reposition(target, tiptarget, state) {
        if (!state) state = $.data(target, "tooltip");
        if (!state || !state.tip) {
            return;
        }
        if (!tiptarget) tiptarget = target;
        var opts = state.options;
        var tip = state.tip, left, top, $target;
        if (opts.trackMouse) {
            $target = $();
            left = opts.trackMouseX + opts.deltaX;
            top = opts.trackMouseY + opts.deltaY;
        } else {
            $target = $(tiptarget);
            left = $target.offset().left + opts.deltaX;
            top = $target.offset().top + opts.deltaY;
        }
        switch (opts.position) {
            case "right":
                left += $target._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - $target._outerHeight()) / 2;
                break;
            case "left":
                left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - $target._outerHeight()) / 2;
                break;
            case "top":
                left -= (tip._outerWidth() - $target._outerWidth()) / 2;
                top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
            case "bottom":
                left -= (tip._outerWidth() - $target._outerWidth()) / 2;
                top += $target._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
        }
        tip.css({left: left, top: top, zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))});
        opts.onPosition.call(target, tiptarget, left, top);
    }

    function show(target, param, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        var tip = state.tip;

        if (!tip) {
            tip = $("<div class=\"tooltip\">" +
                "<div class=\"tooltip-content\"></div>" +
                "<div class=\"tooltip-arrow-outer\"></div>" +
                "<div class=\"tooltip-arrow\"></div>" +
                "</div>").appendTo("body");
            state.tip = tip;
            update(target, undefined, state);
        } else if (param.content) {
            update(target, param.content, state);
        }
        tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + opts.position);
        clear(target, state);
        var id = target.id;
        state.showTimer = setTimeout(function () {
            var target = $('#' + id)[0];
            var state = $.data(target, "tooltip");
            var opts = state.options;
            var tip = state.tip;
            var tiptarget =  param.tiptarget ? param.tiptarget : target;
            var postarget = param.postarget? param.postarget : tiptarget;
            reposition(target, postarget, state);

            tip.show();
            opts.onShow.call(target, param);
            var arrowOuter = tip.children(".tooltip-arrow-outer");
            var arrow = tip.children(".tooltip-arrow");
            var bc = "border-" + opts.position + "-color";
            arrowOuter.add(arrow).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            });
            arrowOuter.css(bc, tip.css(bc));
            arrow.css(bc, tip.css("backgroundColor"));
            param = null;
        }, opts.showDelay);
    }

    function hide(target, param, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state && state.tip) {
            clear(target, state);
            var id = target.id;
            state.hideTimer = setTimeout(function () {
                var target = $('#' + id)[0];
                var state = $.data(target, "tooltip");
                state.tip.hide();
                state.options.onHide.call(target, param);
            }, state.options.hideDelay);
        }
    }

    function update(target, content, state) {
        if (!state) state = $.data(target, "tooltip");
        var opts = state.options;
        if (content) {
            opts.content = content;
        }
        if (!state.tip) return;
        var cc = typeof opts.content == "function" ? opts.content.call(target) : opts.content;
        state.tip.children(".tooltip-content").html(cc);
        opts.onUpdate.call(target, cc);
    }

    function destroy(target, state) {
        if (!state) state = $.data(target, "tooltip");
        if (state) {
            clear(target, state);
            var opts = state.options;
            if (state.tip) {
                state.tip.remove();
            }
            var $target = $(target);
            if (opts.title) {
                $target.attr("title", opts.title);
            }
            $.removeData(target, "tooltip");
            $target.unbind(".tooltip").removeClass("tooltip-f");
            opts.onDestroy.call(target);
        }
    }

    $.fn.tooltip = function (options, param) {
        if (typeof options == "string") {
            return $.fn.tooltip.methods[options](this, param);
        }
        options = options || {};
        return this.each(function (_options) {
            var state = $.data(this, "tooltip");
            if (state) {
                $.extend(state.options, _options);
            } else {
                state = $.data(this, "tooltip", {options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _options)});
                init(this);
            }
            bindEvents(this, state);
            update(this, undefined, state);
        }, [options]);
    };

    $.fn.tooltip.methods = {
        options: function (jq) {
            return $.data(jq[0], "tooltip").options;
        },
        tip: function (jq) {
            return $.data(jq[0], "tooltip").tip;
        },
        arrow: function (jq) {
            return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function (jq, param) {
            return jq.each(function () {
                show(this, param);
            });
        },
        hide: function (jq, param) {
            return jq.each(function () {
                hide(this, param);
            });
        },
        update: function (jq, content) {
            return jq.each(function () {
                update(this, content);
            });
        },
        reposition: function (jq) {
            return jq.each(function () {
                reposition(this);
            });
        },
        bindTipTarget: function (jq, param) {
            return jq.each(function () {
                bindTipTarget(this, param);
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        }
    };
    $.fn.tooltip.parseOptions = function (target) {
        var t = $(target);
        var opts = $.extend({}, $.parser.parseOptions(target,
            ["position", "showEvent", "hideEvent", "content", {deltaX: "number", deltaY: "number", showDelay: "number", hideDelay: "number"}]),
            {title: t.attr("title")});
        t.attr("title", "");
        if (!opts.content) {
            opts.content = opts.title;
        }
        return opts;
    };

    $.fn.tooltip.defaults = {
        position: "bottom",
        content: null,
        trackMouse: false,
        deltaX: 0,
        deltaY: 0,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        showDelay: 200,
        hideDelay: 0,
        autoShow: true,
        onShow: function (e) {
        },
        onHide: function (e) {
        },
        onUpdate: function (content) {
        },
        onPosition: function (left, top) {
        },
        onDestroy: function () {
        }
    }
})(jQuery);