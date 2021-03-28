/*使用时直接调用：jQuery.hotkeys.bindHotkey('k',function (evt){　　　　　　　　　//此处写按快捷键执行的函数代码　　　　　　　});
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
            //fix by luoch 2013.09.06
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
