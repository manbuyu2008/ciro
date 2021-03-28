var coco = {};
coco.plugin = {};
String.prototype.equals = function (o) {
    if (o == undefined || o == null) {
        return false;
    }
    return this == o;
};
// 忽略大小写比较
String.prototype.equalsIgnoreCase = function (target) {
    if (target == undefined || target == null) {
        return false;
    }
    return this.toUpperCase() == target.toUpperCase();
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.startsWith = function (prefix, toffset) {
    if (toffset == undefined) {
        toffset = 0;
    }
    if (prefix == undefined) {
        return false;
    }
    return this.indexOf(prefix) == toffset;
};
String.prototype.endsWith = function (suffix) {
    if (suffix == undefined) {
        return false;
    }
    return this.lastIndexOf(suffix) == this.length - suffix.length;

};
String.prototype.concat = function (str) {
    if (str == undefined) {
        str = "";
    }
    return this + str;
};
String.prototype.toCharArray = function (str) {
    if (str == undefined) {
        return null;
    }
    var length = this.length;
    var chars = new Array(length);
    for (var i = 0; i < length; i++) {
        chars[i] = this.charAt(i);
    }
    return chars;
};
String.prototype.compareTo = function (o) {
    if (o == undefined || !(o instanceof String)) {
        return false;
    }
    if (this == o) {
        return 0;
    }
    if (this > o) {
        return 1;
    }
    if (this < o) {
        return -1;
    }
};
String.prototype.toDouble = function () {
    var s = this.replace(/,/g, "");
    if (s == "") s = "0";
    var v = parseFloat(s);
    if (isNaN(v)) v = 0;
    return v;
};
String.prototype.toInt = function () {
    var s = this.replace(/,/g, "");
    if (s == "") s = "0";
    var v = parseInt(s);
    if (isNaN(v)) v = 0;
    return v;
};
String.prototype.indexOfIgnoreCase = function (f) {
    var re = eval("/" + f + "/" + "i")
    var rt = this.match(re);
    return (rt == null) ? -1 :rt.index;
};
Number.prototype.format = function (precision) {
    var val;
    if (!isNaN(this)) val = this.toFixed(precision);
    else {
        val = 0;
        val = val.toFixed(precision);
    }
    if (val == "") return val;
    var strS = ",";
    var plen;
    if (precision > 0) plen = precision + 1;
    else plen = 0;
    var strR = coco.utils.str.rightStr(val, plen);
    var strL = coco.utils.str.leftStr(val, val.length - plen);

    //在整数部分插入分隔符
    var result = "";
    var j = 0;
    for (var i = strL.length; i >= 0; i--) {
        result = strL.charAt(i) + result;
        if ((j != 0) && ((j % 3) == 0)) result = strS + result;
        j++;
    }
    //加上小数点部分
    result = result + strR;
    if (result.substr(0, 1) == ",") result = result.substring(1);
    result = result.replace(/^-,*/g, "-");
    return result;
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (o) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] == o) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (o) {
        var _383 = this.indexOf(o);
        if (_383 != -1) {
            this.splice(_383, 1);
        }
        return this;
    };
}
if (!Array.prototype.removeById) {
    Array.prototype.removeById = function (_384, id) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][_384] == id) {
                this.splice(i, 1);
                return this;
            }
        }
        return this;
    };
}
//键盘处理
{
    if (!$.browser.msie) {
        HTMLElement.prototype.__defineGetter__("innerText",
            function () {
                var anyString = "";
                var childS = this.childNodes;
                for (var i = 0; i < childS.length; i++) {
                    if (childS[i].nodeType == 1)
                        anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
                    else if (childS[i].nodeType == 3)
                        anyString += childS[i].nodeValue;
                }
                return  anyString;
            });
        HTMLElement.prototype.__defineSetter__("innerText",
            function (sText) {
                this.textContent = sText;
            });
    }
}

//StringBuffer；
function StringBuffer() {
    var __str = [];
    this.append = function (s) {
        __str.push(s);
        return this;
    };
    this.toString = function () {
        return __str.join("");
    }
}
//HashMap对象；
function HashMap() {
    var size = 0;
    var entry = {};
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    };
    this.get = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    };
    this.remove = function (key) {
        if (this.containsKey(key) && ( delete entry[key] )) {
            size--;
        }
    };
    this.containsKey = function (key) {
        return (key in entry);
    };
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    };
    this.values = function () {
        var values = [];
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    };
    this.keys = function () {
        var keys = [];
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    };
    this.size = function () {
        return size;
    };
    this.clear = function () {
        size = 0;
        entry = new Object();
    };
}

//ArrayList对象；
function ArrayList() {
    var args = ArrayList.arguments;
    var initialCapacity = 10;

    if (args != null && args.length > 0) {
        initialCapacity = args[0];
    }
    var elementData = new Array(initialCapacity);
    var elementCount = 0;
    this.size = function () {
        return elementCount;
    };
    this.getSize = function () {
        return elementCount;
    };
    this.add = function (element) {
        ensureCapacity(elementCount + 1);
        elementData[elementCount++] = element;
        return true;
    };
    this.addElementAt = function (index, element) {
        //alert("addElementAt");
        if (index > elementCount || index < 0) {
            alert("IndexOutOfBoundsException, Index: " + index + ", Size: " + elementCount);
            return;
            //throw (new Error(-1,"IndexOutOfBoundsException, Index: "+index+", Size: " + elementCount));
        }
        ensureCapacity(elementCount + 1);
        for (var i = elementCount + 1; i > index; i--) {
            elementData[i] = elementData[i - 1];
        }
        elementData[index] = element;
        elementCount++;
    };
    this.setElementAt = function (index, element) {
        //alert("setElementAt");
        if (index > elementCount || index < 0) {
            alert("IndexOutOfBoundsException, Index: " + index + ", Size: " + elementCount);
            return;
            //throw (new Error(-1,"IndexOutOfBoundsException, Index: "+index+", Size: " + elementCount));
        }
        elementData[index] = element;
    };
    this.toString = function () {
        //alert("toString()");
        var str = "{";
        for (var i = 0; i < elementCount; i++) {
            if (i > 0) {
                str += ",";
            }
            str += elementData[i];
        }
        str += "}";
        return str;
    };
    this.get = function (index) {
        //alert("elementAt");
        if (index >= elementCount) {
            alert("ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount);
            return;
            //throw ( new Error( -1,"ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount ) );
        }
        return elementData[index];
    };
    this.remove = function (index) {
        if (index >= elementCount) {
            alert("ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount);
            //return;
            throw ( new Error(-1, "ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount) );
        }
        var oldData = elementData[index];
        for (var i = index; i < elementCount - 1; i++) {
            elementData[i] = elementData[i + 1];
        }
        elementData[elementCount - 1] = null;
        elementCount--;
        return oldData;
    };
    this.clear = function () {
        initialCapacity = 10;
        elementData = new Array(initialCapacity);
        elementCount = 0;
    };
    this.isEmpty = function () {
        return elementCount == 0;
    };
    this.indexOf = function (elem) {
        //alert("indexOf");
        for (var i = 0; i < elementCount; i++) {
            if (elementData[i] == elem) {
                return i;
            }
        }
        return -1;
    };
    this.lastIndexOf = function (elem) {
        for (var i = elementCount - 1; i >= 0; i--) {
            if (elementData[i] == elem) {
                return i;
            }
        }
        return -1;
    };
    this.contains = function (elem) {
        return this.indexOf(elem) >= 0;
    };
    function ensureCapacity(minCapacity) {
        var oldCapacity = elementData.length;
        if (minCapacity > oldCapacity) {
            var oldData = elementData;
            var newCapacity = parseInt((oldCapacity * 3) / 2 + 1);
            if (newCapacity < minCapacity) {
                newCapacity = minCapacity;
            }
            elementData = new Array(newCapacity);
            for (var i = 0; i < oldCapacity; i++) {
                elementData[i] = oldData[i];
            }
        }
    }
}/**
 * 页面处理类
 */
coco.page = {
    init: function () {
//        $(":text,:password,textarea").each(function () {
//            var t = $(this);
//            if (t.parent("span").length == 0)
//                t.addClass("coco_text");
//            if (t.prop("required") == true) {
//                t.addClass("required");
//            }
//        }).focus(function () {
//                var t = $(this);
//                t.removeClass("blur");
//                t.removeClass("must");
//                t.addClass("focus");
//                t.select();
//            }).blur(function () {
//                var t = $(this);
//                t.removeClass("focus");
//                if (t.prop("required") == true) {
//                    t.addClass("required");
//                } else {
//                    t.addClass("blur");
//                }
//            });

//        $(":text,:password,textarea,input").each(function () {
//            var t = $(this);
//            if (t.prop("required") == true) {
//                $("<font class='required'>*</font>").appendTo(t.parent());
//            }
//        })
    },
    checkBrowser: function () {
        if ($.browser.msie && $.browser.version < "7.0")
            return "您当前使用的浏览器是：Internet Explorer " + $.browser.version +
                "。此版本过低，<br>为了能有更好的体验，建议升级为Internet Explorer 7.0或以上版本。";
        return undefined;
    }
};
$(function () {
//    setTimeout(coco.page.init, 500);
    document.ondragstart = function () {
        return false;
    };
    coco.page.init();
});

/**
 * dom控件相关的工具方法
 */
coco.page.dom = {
    /**
     * 控件获得焦点，并全选
     * @param id 控件id
     */
    focusSel: function (id) {
        var t = $("#" + id);
        t.focus();
        t.select();
    },
    //在页面创建一个Div形式化的dialog,内容以iframe方式显示其src,参数：option:{height:number,width:number,divId:'',title:'',src:'',autorefresh:true/false, draggable:true/false}
    openIframeDialog: function (options) {
        //默认设置参数：scrollbarWidth 某些页面显示时滚动条宽度显示有问题，需要比默认35多一些，例如45.
        var option_default = {
            height: 300, width: 700, divId: 'div_iframe_dialog_id', title: '数据查看', src: '',
            autorefresh: false, //在一个页面上，打开后关闭不会删除对象，那么当再次显示时，iframe中的内容是否重新刷新呢？
            disable_close: false, //不允许关闭弹出框(关闭按钮和右上角的叉叉)
            disable_close_button: false, //不显示关闭按钮；
            hide_submit_button: true,// 默认隐藏
            submit_text : "确定",
            call_back_func: function () {
            },//关闭按钮时的回调函数；
            call_submit_func: function () {
            }// 确定时的回调函数
        };
        var op = $.extend(option_default, options);
        op.ifmId = op.divId + "_ifm";
        var divId = op.divId;

        var buttons = [];
        if(!op.hide_submit_button) buttons.push({text: op.submit_text,
            iconCls: 'icon-submit',
            handler: function () {
                op.call_submit_func();
            }
        });
        if(!op.disable_close_button) buttons.push({text: '关闭',
            iconCls: 'icon-ok',
            handler: function () {
                $("#" + divId).dialog('close');
            }
        });

        var dialogOpts = {
            title: op.title,
            modal: true,
            autoOpen: false,
            height: op.height,
            width: op.width,
            minimizable: op.minimizable,
            maximizable: op.maximizable,
            maximized: op.maximized,
            resizable: op.resizable,
            draggable:op.draggable,
            iconCls: 'icon-file',
            buttons: buttons,
            onClose: op.call_back_func
        };
        //判断是否已经弹出过了，判断是否需要自动刷新
        var $showdiv = $("#" + op.divId);
        if ($showdiv.length > 0) {
            if (op.autorefresh) $showdiv.find("iframe").eq(0).attr("src", "").attr("src", op.src);
            $showdiv.dialog(dialogOpts);
            $showdiv.dialog('open');
            return;
        }
        //由于越来越多的浏览器不允许使用弹出窗口，因此采用弹出div方式；
        var $div = $("<div id='" + op.divId + "'><iframe style='width:100%;height:100%' frameborder='0' id='" + op.ifmId + "'></iframe></div>").appendTo('body');
        $div.dialog(dialogOpts);
        //强制当前对话框不能关闭：隐藏关闭×，置灰关闭按钮
        if (op.disable_close) {
            $div.parent().find('.ui-dialog-titlebar-close').hide();
            $div.parent().find('.ui-dialog-buttonset > button').prop('disabled', true);
        }
        $div.dialog('open');
        $("#" + op.ifmId).attr("src", "").attr("src", op.src);
    },
    //coco弹窗，在主框架中将新建tab，非主框架，弹出div对话框 refresh-如窗口已打开，是否刷新
    /*opts:参数
     {url:链接地址,
     title：标题,
     width：如打开对话框 宽度,
     height：          高度,
     autorefresh：如已打开过，是否自动刷新}
     */
    cocoOpenWindow: function (opts) {
        opts = $.extend({
            title: "数据查看",
            autorefresh: true
        }, opts || {});
        var p = coco.utils.topWin();
        if (p.addTab) p.addTab(opts.title, opts.url, false, opts.autorefresh);
        else coco.page.dom.openIframeDialog({
            width: opts.width,
            height: opts.height,
            title: opts.title,
            maximizable: true,
            maximized: opts.maximized,
            autorefresh: opts.autorefresh,
            src: coco.utils.getFullUrl(opts.url)
        });
    },
    interOpenWindow: function (url, target, width, height) {
        var winWidth = 800;
        var winHeight = 600;
        if (width != null) winWidth = width;
        if (height != null) winHeight = height;
        var winLeft = Math.floor((window.screen.availWidth - winWidth) / 2);
        var winTop = Math.floor((window.screen.availHeight - winHeight) / 3);
        var setting = "height=" + winHeight + ",width=" + winWidth + ",left=" + winLeft + ",top=" + winTop + "," +
            " toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=yes";

        window.open(url, target, setting);
    }
};
//数据校验
coco.page.validate = {
    NUMBERS: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    LOWER_CHARS: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    UPPER_CHARS: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    UNDERLINE: ['_'],
    CODE_OTHER_CHAR: ['.', '-', '*'],
    SPECIAL_CHARS: [34, 36, 39, 47, 92, 60, 62, 63], //" $ ' / \ < > ?
    SPECIAL_CHARS2: [33 , 34, 35, 36, 39, 92, 60, 62, 63, 126], // ! " $ '  \ < > ? ~ !
    SPECIAL_CHARS3: [34, 39], //" '
    /* =================================================================================================================================
     函数功能： 判断srcStr中是否仅仅包括checkDomain中指定的字符
     入口参数： checkDomain 可包括的字符集(数组)
     srcStr      判断的源串
     函数返回： 如果srcStr中仅包括checkDomain中的字符，则返回true,否则返回false;
     */
    onlyContains: function (arrcheckDomain, srcStr) {
        var strin = arrcheckDomain.join();
        strin = strin.replace(/\,/g, ""); //去掉逗号；
        for (var i = 0, len = srcStr.length; i < len; i++) {
            if (strin.indexOf(srcStr.charAt(i)) < 0) {
                return false;
            }
        }
        return true;
    },
    /* =================================================================================================================================
     函数功能: 判断srcStr中是否包含checkDomain中的字符串
     入口参数: srcStr 要判断的字符串
     checkDomain 校验的特殊串
     返 回 值: 包含返回True,否则返回false
     */
    isContains: function (checkDomain, srcStr) {
        for (var i = 0, len = srcStr.length; i < len; i++) {
            for (var j = 0, lj = checkDomain.length; j < lj; j++) {
                if (srcStr.charAt(i) == checkDomain[j] || srcStr.charCodeAt(i) == checkDomain[j]) {
                    return true;
                }
            }
        }
        return false;
    },

    alertInfo: function (msg, isAlert) {
        if (isAlert != false) {
            $$msg.alert(msg);
        }
        return msg;
    },
    /* =================================================================================================================================
     Func:提示名称输入的错误
     Parm:biz 业务描述，如"编码"
     Retu:无
     */
    alertValidateName: function () {
        var biz;
        if (arguments.length > 0) {
            biz = arguments[0];
        } else {
            biz = "名称";
        }
        this.alertInfo("\" $ ' / \\ < > ? 等字符不是合法的[" + biz + "]输入，请重新输入!", true);
    },
    /* =================================================================================================================================
     函数功能: 校验编码和Id类型的串，校验时教养仅仅包含支付，数字，下划线，减号和点号
     入口参数: srcStr 校验的id或编码值
     appendChars 附加的允许使用的字符,用逗号格开
     返 回 值: 通过返回true,否则返回false
     */
    validateCode: function (srcStr, alertkey, allowempty, isAlert) {
        if (allowempty == undefined) allowempty = false;
        if (srcStr == null || srcStr.length == 0) {
            if (allowempty) {
                return true;
            } else {
                return this.alertInfo("请选择或录入有效的" + alertkey, isAlert);
            }
        }
        if (!this.onlyContains(this.NUMBERS.concat(this.LOWER_CHARS, this.UPPER_CHARS, this.UNDERLINE, this.CODE_OTHER_CHAR), srcStr)) {
            return this.alertInfo("字符, 数字, 下划线,减号，点号才是合法的" + alertkey + "输入!", isAlert);
        }
        return true;
    },
    /* =================================================================================================================================
     函数功能:  校验常规的名称等字符串,教养不包含 特殊字符如： \?/,'%$".
     入口参数:  srcStr 要校验的数据
     返 回 值:  通过返回true,否则返回false
     */
    __validateName: function (srcStr, alertkey, allowempty, maxlen, spec_chars, isAlert) {
        if (allowempty == undefined) allowempty = false;

        if (srcStr == null || $$str.trim(srcStr).length == 0) {
            if (allowempty) return true;
            return this.alertInfo("请输入有效的" + alertkey, isAlert);
        }
        if (this.isContains(spec_chars, srcStr)) {
            var biz;
            if (alertkey) {
                biz = alertkey;
            } else {
                biz = "名称";
            }
            return this.alertInfo("\" $ ' / \\ < > ? 等字符不是合法的[" + biz + "]输入，请重新输入!", isAlert);
        }
        if (maxlen == undefined) {
            maxlen = 0;
        }
        //验证长度
        if (maxlen > 0) {
            var le = this.getlengthB(srcStr);
            if (maxlen > 0 && le > maxlen) {
                return this.alertInfo("您录入的" + alertkey + "信息过长，最大长度为：" + maxlen + "，目前录入内容的长度为：" + le, isAlert);
            }
        }
        return true;
    },

    validateName: function (srcStr, alertkey, allowempty, maxlen, other, isAlert) {
        if (other == undefined)other = false;
        if (isAlert == undefined)isAlert = false;
        if (other) {
            return this.__validateName(srcStr, alertkey, allowempty, maxlen, this.SPECIAL_CHARS2, isAlert);
        }
        return this.__validateName(srcStr, alertkey, allowempty, maxlen, this.SPECIAL_CHARS, isAlert);
    },

    validateName2: function (srcStr, alertkey, allowempty, maxlen) {
        return this.__validateName(srcStr, alertkey, allowempty, maxlen, this.SPECIAL_CHARS3, isAlert);
    },

    /* =================================================================================================================================
     函数功能:  校验常规的名称等字符串
     入口参数:  srcStr 要校验的数据
     返 回 值:  通过返回true,否则返回false
     */
    validateDesc: function (srcStr, alertkey, allowempty, maxlen, isAlert) {
        if (allowempty == undefined)allowempty = false;
        if (srcStr == null || $$str.trim(srcStr).length == 0) {
            if (allowempty) {
                return true;
            } else {
                return this.alertInfo("请输入有效的" + alertkey, isAlert);
            }
        }
        if (maxlen == undefined) {
            maxlen = 0;
        }
        //验证长度
        if (maxlen > 0) {
            var le = this.getlengthB(srcStr);
            if (maxlen > 0 && le > maxlen) {
                return this.alertInfo("您录入的" + alertkey + "信息过长，最大长度为" + maxlen + " 目前录入内容的长度为：" + le, isAlert);
            }
        }
        return true;
    },

    //日期格式验证，srcDate:日期串;alertKey:关键描述；allowempty:是否允许为空；format:日期格式；
    validateDate: function (srcDate, alertkey, allowempty, format, isAlert) {
        if (alertkey == undefined) alertkey = "日期";
        if (allowempty == undefined) allowempty = false;
        if (srcDate == null || srcDate.length == 0) {
            if (allowempty) {
                return true;
            } else {
                return this.alertInfo("请选择或录入有效的" + alertkey, isAlert);
            }
        }
        if (format == undefined || $$str.isEmpty(format)) {
            format = "YYYY-MM-DD";
        }
        if (!$$date.isDateFormat(srcDate, format, false)) {
            return this.alertInfo("请选择或录入正确格式[" + format + "]的" + alertkey, isAlert);
        }
        return true;
    },

    //日期时间格式验证，srcDate:日期串;alertKey:关键描述；allowempty:是否允许为空；type：D-日期 T-时间 M-日期时间
    validateDateTime: function (srcDate, alertkey, allowempty, type, isAlert) {
        if (allowempty == undefined)allowempty = false;
        if (srcDate == null || srcDate.length == 0) {
            if (allowempty) return true;
            return this.alertInfo("请选择或录入有效的" + alertkey, isAlert);
        }
        var format, result;
        if (type == 'T') {
            format = 'HH:MM:SS';
            result = $$date.isTimeFormat(srcDate);
        } else if (type == 'M') {
            format = 'YYYY-MM-DD HH:MM:SS';
            result = $$date.isDateTime(srcDate);
        } else {
            format = 'YYYY-MM-DD';
            result = $$date.isDateFormat(srcDate, format, false);
        }
        if (!result) {
            return this.alertInfo("请选择或录入正确格式[" + format + "]的" + alertkey, isAlert);
        }
        return true;
    },
    //校验录入金额,大于等于零.param:Tip 提示信息,""不提示; TagId 控件Id; blnCanEqualsZero 是否可以=0; 返回:通过=true;否则=false;
    validatePlusNumber: function (Tip, TagId, blnCanEqualsZero, isAlert) {
        return this.validateNumber(Tip, coco.page.dom.TagDblValue(TagId), true, blnCanEqualsZero, isAlert);
    },
    //校验录入金额,可正，可负，可通过参数决定是否可为0. parm: Tip 提示信息
    validateSignNumber: function (Tip, TagId, blnCanEqualsZero, isAlert) {
        return this.validateNumber(Tip, coco.page.dom.TagDblValue(TagId), false, blnCanEqualsZero, isAlert);
    },
    /* =============================================================================
     函数功能: 校验数据(正数)
     入口参数: Tip 提示信息
     dblvalue 判断的数值。
     blnOnlyPlus  是否不校验负数
     blnCanEqualsZero 是否可以=0;
     函数返回: boolean 校验通过=true;否则=false;
     */
    validateNumber: function (Tip, dblvalue, blnOnlyPlus, blnCanEqualsZero, isAlert) {
        if (blnOnlyPlus == null) blnOnlyPlus = false;
        if (blnCanEqualsZero == null) blnCanEqualsZero = false;

        if ($$math.isZero(dblvalue)) {
            if (blnCanEqualsZero) {
                return true;
            } else {
                if (Tip != "") {
                    return this.alertInfo("[" + Tip + "]" + "不能等于0！", isAlert);
                }
                return this.alertInfo("数值不能等于0！", isAlert);
            }
        } else if (dblvalue < 0) {
            if (blnOnlyPlus) {
                if (Tip != "") {
                    return this.alertInfo("[" + Tip + "]" + "不能小于0！", isAlert);
                }
                return this.alertInfo("数值不能小于0！", isAlert);
            }
        }
        //判断是否超过数据库存储范围。
        if ($$math.isTooMaxValue("", dblvalue)) {
            if (Tip != "") {
                return this.alertInfo("[" + Tip + "]" + "过大或过小，超过正常处理的数据范围！！", isAlert);
            }
            return this.alertInfo("过大或过小，超过正常处理的数据范围！！", isAlert);
        }
        return true;
    },
    //含中文字符长度（一个中文两个字符长度）
    getlengthB: function (str) {
        str = str + "";
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    validateId: function (elementId, caption, canEmpty, isAlert) {
        var t = $("#" + elementId);
        var value = t.val();
        if (canEmpty == undefined) canEmpty = false;
        if (value == "") {
            if (canEmpty) return true;
            t.focus();
            return this.alertInfo(caption + "不能为空!", isAlert);
        }
        if (!value.match(/^[A-Za-z_\u4e00-\u9fa5)]+/)) {
            t.focus();
            return this.alertInfo(caption + "只能以字母、下划线或汉字开头!", isAlert);
        }

        if (value.match(/[^A-Za-z0-9_\u4e00-\u9fa5)]+/g)) {
            t.focus();
            return this.alertInfo(caption + "只能以字母、数字、下划线及汉字组成!", isAlert);
        }

        return true;
    },
    //校验屏幕分辨率,是否小于1280
    validateScreenW: function () {
        if (window.screen.width < 1280) {
            document.write("提醒您：你的屏幕分辨率较低，为良好使用各项功能，建议屏幕分辨率为1280 * 768及以上")
        }
    }
};
//模块管理
window.$$pmodel = coco.page.model = {
    checkValid: function (formId) {
        if (!coco.page.model.data.endEdit()) return false;
        if (!$("#" + formId).form('validate')) return false;
        if (window.checkValid) return window.checkValid() != false;
        return true;
    },
    //得到模板的提交数据，返回json对象
    getCardDataJson: function (formId) {
        var data = {};
        $("#" + formId + " *[name]").each(function () {
            var t = $(this);
            if (!t.closest('.datagrid').length) {
                var val;
                if ((t.attr("type") == "checkbox" || t.attr("type") == "radio") && (!t.prop("checked"))&&val=="") val = "0";//未选的checkbox置0
                else val = t.val();
                if (!data[this.name]) data[this.name] = val;
                else {
                    data[this.name] = data[this.name] + "," + val;
                }
            }
        });
        return data;
    },
    // 方法name相同的不重复传递
    getCardDataJsonNoRepeat: function (formId) {
        var data = {};
        $("#" + formId + " *[name]").each(function () {
            var t = $(this);
            if (!t.closest('.datagrid').length) {
                var val;
                if ((t.attr("type") == "checkbox" || t.attr("type") == "radio") && (!t.prop("checked"))) val = "0";//未选的checkbox置0
                else val = t.val();
                data[this.name] = val;
//                if (!data[this.name]) data[this.name] = val;
//                else {
//                    data[this.name] = data[this.name] + "," + val;
//                }
            }
        });
        return data;
    },
    /**
     * 登录系统
     * opts: {
     * userCode 用户帐号
     * pwd 密码（明文）
     * verifyCode 验证码，不需验证码可为空
     * mustSys 用户是否必须有角色
     * corpId: 登录机构, 默认为顶级机构
     * workDate：登录日期，默认为当前日期
     * data: 登录扩展参数，json对象
     * }
     * @param fn  function (success-是否成功, errCode-错误码：[user::用户号错误，pwd::密码错误，verifyCode::验证码错误], msg-错误信息)
     */
    login: function (options, fn) {
        var rtdata = coco.utils.ajaxPost("userLogin.vm", {
            userCode: $$str.encode64(options.userCode),
            pwd: $$str.encode64(options.pwd),
            verifyCode: options.verifyCode,
            data: $$json.stringify(options.data)
        });
        if (fn) fn(rtdata.state, rtdata.result, rtdata.message);
    },
    logout: function () {
        coco.utils.ajaxPost("logout.vm");
    },
    //得到模板的提交数据，返回json字符串
    getCardDataStr: function (formId) {
        var data = this.getCardDataJson(formId);
        return $$json.stringify(data);
    },
    //得到模板的提交数据，返回json对象
    getSaveDataJson: function (formId) {
        var data = this.getCardDataJson(formId);
        return {main: data, list: coco.page.model.data.getChanged()}
    },
    // 此方法获取的数据name相同时不重复传递
    getSaveDataJsonNoRepeat: function (formId) {
        var data = this.getCardDataJsonNoRepeat(formId);
        return {main: data, list: coco.page.model.data.getChanged()}
    },
    //得到模板的提交数据，返回json字符串
    getSaveDataStr: function (formId) {
        var data = this.getSaveDataJson(formId);
        return $$json.stringify(data);
    },
    //明细列表是否有更新
    isListChanged: function (list) {
        if (!list) return false;
        for (var key in list) {
            var d = list[key];
            if (d.inserted.length > 0 || d.updated.length > 0 || d.deleted.length > 0)
                return true;
        }
        return false;
    },
    //以下是列表、卡片页面标准操作方法
    //新增
    card: function (id,data) {
        var s = "card.vm?id=" + id + "&t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },

    //新增
    cardEx: function (url,id,data) {
        var s = url+"?id=" + id + "&t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },
    //列表
    list: function (data) {
        if (typeof data != 'string') data = $$json.stringify(data);
        var s = "list.vm?t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },

    //列表
    listEx: function (url,data) {
        if (typeof data != 'string') data = $$json.stringify(data);
        var s = url+"?t=" + Math.random();
        if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
        location.href = s;
    },
    //删除
    del: function (id, fn) {
        $$msg.confirm("确实要删除该记录吗？", function (isOk) {
            if (!isOk) return;
            var param = {
                id: id
            };
            $$msg.showWait("正在处理，请稍候...");
            $.post("del.vm", param, function (data) {
                if (data.state) {
                    $$msg.slideMsg("删除成功！");
                }
                else {
                    $$msg.slideError(data.message);
                }
                if (fn) fn(data.state);
                $$msg.closeWait();
            }, "json");
        });
    },
    //删除
    delEx: function (url,id, fn) {
        $$msg.confirm("确实要删除该记录吗？", function (isOk) {
            if (!isOk) return;
            var param = {
                id: id
            };
            $$msg.showWait("正在处理，请稍候...");
            $.post(url, param, function (data) {
                if (data.state) {
                    $$msg.slideMsg("删除成功！");
                }
                else {
                    $$msg.slideError(data.message);
                }
                $$msg.closeWait();
                if (fn) fn(data.state);
            }, "json");
        });
    },
    //卡片保存
    save: function (formId, fn, ver) {
        if (!this.checkValid(formId)) {
            return
        }
        $$msg.showWait("正在保存，请稍候...");
        var data;
        if (ver == undefined || ver == 0) data = this.getCardDataStr(formId);
        else data = this.getSaveDataStr(formId);
        $.ajax({
            type: "POST",
            async: false,
            url: "save.vm",
            data: {data: data},
            success: function (data) {
                if (data.state) $$msg.slideMsg("保存成功！");
                else $$msg.slideError(data.message);
                if (fn) fn(data.state, data);
                $$msg.closeWait();
            },
            dataType: "json"});
        $$msg.closeWait();
    },

    //卡片保存
    saveEx: function (url,formId, fn, ver) {
        if (!this.checkValid(formId)) {
            return
        }
        $$msg.showWait("正在保存，请稍候...");
        var data;
        if (ver == undefined || ver == 0) data = this.getCardDataStr(formId);
        else data = this.getSaveDataStr(formId);
        $.ajax({
            type: "POST",
            async: false,
            url: url,
            data: {data: encodeURI(data)},
            success: function (data) {
                if (data.state) $$msg.slideMsg(data.message);
                else $$msg.slideError(data.message);
                if (fn) fn(data.state, data);
                $$msg.closeWait();
            },
            dataType: "json"});
        $$msg.closeWait();
    },
    bill: {//以下是单据、列表方法
        //新增
        add: function (billType, data) {
            var s = "../bill/create?billType=" + billType + "&t=" + Math.random();
            if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
            location.href = coco.utils.getFullUrl(s);
        },
        //编辑
        edit: function (id, data) {
            this.editEx(id, "..",data);
        },
        //删除
        del: function (id, fn) {
            this.delEx(id, "..", fn);
        },
        //编辑
        editEx: function (id, prefix, data) {
            var s = prefix + "/bill/view?bid=" + id + "&t=" + Math.random();
            if ($$str.isNotEmpty(data)) s += "&data=" + encodeURI(data);
            location.href = coco.utils.getFullUrl(s);
        },
        //删除
        delEx: function (id, prefix, fn) {
            $$msg.confirm("确实要删除该记录吗？", function (isOk) {
                if (!isOk) return;
                var param = {
                    bid: id
                };
                $$msg.showWait("正在处理，请稍候...");
                $.post(coco.utils.getFullUrl(prefix + "/bill/del"), param, function (data) {
                    if (data.state) {
                        $$msg.slideMsg("删除成功！");
                    }
                    else {
                        $$msg.slideError(data.msg);
                    }
                    if (fn) fn(data.state);
                    $$msg.closeWait();
                }, "json");
            });
        },
        queryDetail: function (data) {
            if (data.pageNumber || data.pageSize) {
                data.page = data.pageNumber;
                data.rows = data.pageSize;
                data.pageNumber = undefined;
                data.pageSize = undefined;
            }
            var rtdata = coco.utils.ajaxPost("./detail", {data: $$json.stringify(data)});
            if (coco.utils.checkReturn(rtdata)) return rtdata;
            return [];
        }
    },
    /**
     *单据打印
     *
     *@param 模板文件名
     *@param printModel 0-直接打印 1-预览 2-保存
     *@param data 打印单据值
     *data={文本名：文本值：图片名img:图片路径}
     *如果是图片则名称必须为img后缀
     **/
    printReceipt: function (pluginName, fileName, printModel, data) {
        coco.utils.download(coco.utils.getFullUrl("exportPdf"), {plugin: pluginName, fileName: fileName, isPrint: printModel, data: data});
    }
};

coco.page.model.data = {
    attr: {},
    attr_ds: {},
    //初始化，增加ds数据源的概念，可能一个数据源对应多个grid，多个grid的更新缓存要指向同一个对象
    initData: function (id, ds) {
        if (ds && this.attr_ds[ds]) {
            this.attr[id] = this.attr_ds[ds];
            return;
        }
        this.attr[id] = {
            changed: {
                inserted: [],
                updated: new HashMap(),
                deleted: []
            }
        };
        if (ds) this.attr_ds[ds] = this.attr[id];
    },
    //获取指定id的修改数据, id为空，获取所有数据
    getData: function (id) {
        var data = this.attr[id];
        if (!data) data = this.attr_ds[id];
        if (data) data = data.changed;
        if (!data) data = {inserted: [], updated: new HashMap(), deleted: []};
        return data;
    },
    getChanged: function (id) {
        if ($$str.isNotEmpty(id)) {//得到某一个grid的修改的数据
            var data = this.getData(id);
            return {inserted: data.inserted, updated: data.updated.values(), deleted: data.deleted};
        } else {
            var r = {}, attr;
            if ($$obj.isEmpty(this.attr_ds)) attr = this.attr; else attr = this.attr_ds;
            for (var gridId in attr) {
                //noinspection JSUnfilteredForInLoop
                r[gridId] = this.getChanged(gridId);
            }
            return r;
        }
    },
    //增加修改的数据，obj：grid或id，row：行数据 flag 1-insert 2-update 3-deleted
    putChanged: function (gridId, idField, row, flag) {
        var data = this.getData(gridId);
        if (flag == 1) {//新增
            row.es = 1;
            if (data.inserted.indexOf(row) < 0)
                data.inserted.push(row);
        }
        else {
            if (flag == 2) {//修改
                if (row.es == 1 || row.es == 3) return;//修改的行为新增或删除的，不用理
                data.updated.put(row[idField], row);//否则记录到修改项中
                row.es = 2;
            }
            else {//删除
                if (row.es == 1) {
                    data.inserted.remove(row);
                }//删除的行是新增的，直接删除新增即可
                else {//否则，先去掉修改中的该行
                    data.updated.remove(row[idField]);
                    data.deleted.push(row[idField]);
                    row.es = 3;
                }
            }
        }
    },
    empty: function (gridId, deleted) {
        var data = this.getData(gridId);
        data.inserted = [];
        data.updated.clear();
        var sExists = "_" + data.deleted.join("_") + "_";
        for (var i = 0; i < deleted.length; i++) {
            var s = deleted[i];
            if (sExists.indexOf("_" + s + "_") < 0) data.deleted.push(s);
        }
    },
    //忽略所有修改
    ignoreChanged: function (gridId) {
        var data = this.getData(gridId);
        data.inserted = [];
        data.updated.clear();
        data.deleted = [];
    },
    //忽略所有修改
    ignoreAll: function () {
        for (var gridId in this.attr) {
            $$pgrid.refresh(gridId, 1);
        }
    },
    endEdit: function () {
        for (var gridId in this.attr) {
            if (!$$pgrid.endEdit(gridId)) return false;
        }
        return true;
    }
};
//模板中的子列表
/**
 * getPageData: function(pageNumber, pageSize) 获取分页数据
 * onBeforeDelete: function(row) 删除前执行，返回false将不删除
 * onAfterDelete： function(row) 删除后执行
 * onCustomAfterEdit： function(rowIndex, rowData, changes) 编辑后执行
 * onCustomBeforeEdit： function(row, rowIndex) 编辑前执行
 * onEdit： function(row, rowIndex) 编辑前执行
 * onBeforeAdd: function() 新增前执行，返回null将不新增
 */
window.$$pgrid = coco.page.model.grid = {
    getGrid: function (obj) {
        return $$egrid.getGrid(obj);
    },
    init: function (gridId, opt) {
        coco.page.model.data.initData(gridId, opt.datasource);
        var options = $.extend({
            fit: true,
            idField: "id",
            maxRows: 0,
            fitColumns: true,
            nowrap: true,
            striped: true,
            collapsible: false,
            remoteSort: false,
            pagination: false,
            rownumbers: true,
            singleSelect: true,
            readOnly: false,
            canAddDel: true,
            canAdd: true,
            canDel: true,
            loadDefault: true,
            pageSize: 10,
            pageList: [10,20,50,100]
        }, opt || {});
        var $target = $('#' + gridId);
        if (!options.readOnly) {
            options.readonly = false;
            if (options.canAddDel) {
                var toolbar = [];
                if (options.canAdd) toolbar.push(//新增按钮
                    {id: gridId + 'btnadd',
                        text: '新增',
                        iconCls: 'icon-add',
                        handler: function () {
                            $$pgrid.appendHandler(gridId);
                        }});

                if (options.canDel) toolbar.push(//删除按钮
                    {id: gridId + 'btndel',
                        text: '删除',
                        iconCls: 'icon-remove',
                        handler: function () {
                            $$pgrid.delSelRow(gridId);
                        }});
                if (options.toolbar) options.toolbar = toolbar.concat(options.toolbar || []);
                else options.toolbar = toolbar;
            }
            //单击行编辑
            options.onClickRow = function (rowIndex) {
                $$pgrid.beginEdit(gridId, rowIndex);
            };
            //编辑后
            options.onAfterEdit = function (rowIndex, rowData, changes) {
                var $target = $('#' + gridId);
                var options = $target.datagrid("options");
//                alert($$json.stringify(changes));
                if (options.onCustomAfterEdit) {
                    options.onCustomAfterEdit(rowIndex, rowData, changes);
                }
                if (!$$obj.isEmpty(changes.oldValue) && rowData.es != 1 && rowData.es != 3) {
                    rowData.es = 2;
                    $$pgrid.putChanged(gridId, rowData, 2);
                }
            };
            options.onEndEdit = function (rowIndex) {
                var grid = $$pgrid.getGrid(gridId);
                grid.attr("lastIndex", "");
            };

            //最后一列回车
            options.onLastColEnter = function (index, isLastRow) {
                var grid = $(this);
                if (!isLastRow)
                    $$pgrid.beginEdit(grid, ++index);
                else {
                    var options = grid.datagrid("options");
                    if (options.canAddDel && options.canAdd) $$pgrid.appendHandler(grid);
                }
            };

            options.customRowStyle = options.rowStyler;
            //样式
            options.rowStyler = function (index, row) {
                var rs;
                var grid = $(this);
                if (row.es == 1) {// 新增
                    rs = 'background-color:#ffeeee;';
                } else if (row.es == 2) {// 修改
                    rs= 'background-color:#DDFFDD;';
                } else if (row.es == 3) {// 删除
                    rs = 'background-color:#e9f1fe;color:gray;font-style:italic;text-decoration:line-through';
                }
                var options = grid.datagrid("options");
                if (options.customRowStyle) rs = options.customRowStyle.call(this, index, row);
                return rs;
            };
        }
        if (options.title && coco.options.key) {
            var guid = coco.options.key + '-' + gridId;
            options.title += " <a id='__sys_col_setting__' href='#' onclick='$$egrid.saveColsWidth(\"" + guid + "\", \"" + gridId + "\", true)' class='coco_txt'>[保存列宽设置]</a>";
            var s;
            if (coco.options.colWidths) s = coco.options.colWidths[guid];
            if (s) {
                $$egrid.setColsWidth(options.frozenColumns, s);
                $$egrid.setColsWidth(options.columns, s);
            }
        }
        $target.datagrid(options);
        if (options.toolbar) {
            var t = $target.datagrid("getToolbar");
            if (options.pagination)
                t.append("<div class='coco_txt' style='margin-top:5px; float: right;'>\
                                    图例：<b style='background-color:#ffeeee;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 新增&nbsp;&nbsp;\
                                    <b style='background-color:#DDFFDD;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 修改&nbsp;&nbsp;\
                                    <b style='background-color:#e9f1fe;color:gray;font-style:italic;text-decoration:line-through;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 删除&nbsp;&nbsp;</div>");
            else t.append("<div class='coco_txt' style='margin-top:5px; float: right;'>\
                                    图例：<b style='background-color:#ffeeee;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 新增&nbsp;&nbsp;\
                                    <b style='background-color:#DDFFDD;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 修改&nbsp;&nbsp;</div>");
        }

        if (options.pagination) {
            var pager = $target.datagrid('getPager');
            pager.pagination({
                showRefresh: false,
                displayMsg: "",
                onSelectPage: function (pageNumber, pageSize) {
                    var $target = $('#' + gridId);
                    var options = $target.datagrid("options");
                    $$pgrid.doGetGridPageData(gridId, pageNumber, pageSize, options.getPageData);
                },
                onBeforeSelectPage: options.onBeforeSelectPage
            });
        }
        if (options.loadDefault)
            $$pgrid.doGetGridPageData(gridId, 1, options.pageSize, opt.getPageData);
    },
    //将某一行设为编辑状态
    beginEdit: function (obj, rowIndex) {
        var grid = this.getGrid(obj);
        var row = $$egrid.getRowByIndex(obj, rowIndex);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex) && lastIndex == rowIndex) return;
        if (!this.endEdit(grid)) {
            grid.datagrid('unselectAll');
            grid.datagrid('selectRow', lastIndex);
            grid.datagrid('beginEdit', lastIndex);
            return;
        }
        if (row.es == 3) return;//标记删除的行，不允许编辑
        var opt = grid.datagrid("options");
        if (opt.onCustomBeforeEdit && opt.onCustomBeforeEdit(row, rowIndex) == false) return;
        grid.datagrid('unselectAll',true);
        grid.datagrid('selectRow', rowIndex);
        grid.datagrid('beginEdit', rowIndex);
        grid.attr("lastIndex", rowIndex);
        if (opt.onEdit) opt.onEdit(row, rowIndex);

    },
    //提交编辑状态
    endEdit: function (obj, cancel) {
        var grid = this.getGrid(obj);
        if (!grid.length) return;
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex)) {
//            if (!grid.datagrid('validateRow', lastIndex)) return false;
            if (!cancel) grid.datagrid('endEdit');
            else grid.datagrid('cancelEdit');
            if (grid.datagrid('isEditing')) return false;
            var opt = grid.datagrid("options");
            grid.attr("lastIndex", "");
        }
        return true;
    },
    //新增按钮事件
    appendHandler: function (obj) {
        var $target = this.getGrid(obj);
        var options = $target.datagrid("options");
        if (options.maxRows > 0) {
            var rows = $target.datagrid("getRows");
            if (rows.length >= options.maxRows) {
                $$msg.slideMsg("最多只允许-" + options.maxRows + "-数据。");
                return;
            }
        }
        var row = {};
        var copyFlag;
        if (options.onBeforeAdd) {
            row = options.onBeforeAdd();
            if (!row) return;
            if (row == true) row = {};
        }if(options.appendCopyLastRow){
            copyFlag=true;
        }
        $$pgrid.addRow(obj, row,copyFlag);
    },
    //增加行
    addRow: function (obj, row,isCopyLast) {
        var grid = this.getGrid(obj);
        if (!this.endEdit(obj)) return;
        row = row || {};
        if(isCopyLast){
            var rows=grid.datagrid('getRows');
            $.extend(row,rows[rows.length-1]);
            if(grid.datagrid("options").afterCopy){
                grid.datagrid("options").afterCopy(row);
            };
        }
        row.es = 1;
        this.putChanged(grid, row, 1);
        grid.datagrid("appendRow", row);
        var rows = grid.datagrid("getRows") || [];
        var rowIndex = rows.length - 1;
        this.beginEdit(grid, rowIndex);
    },
    //增加行但不编辑
    addRows: function (obj, rows) {
        var grid = this.getGrid(obj);
        var oldRows = grid.datagrid("getRows") || [];
        var id = grid[0].id, idField = grid.datagrid("options").idField;
        $.each(rows, function (i, row) {
            row.es = 1;
            coco.page.model.data.putChanged(id, idField, row, 1);
        });
        rows = oldRows.concat(rows);
        grid.datagrid("loadData", rows);
        //var rows = grid.datagrid("getRows") || [];
        //var rowIndex = rows.length - 1;
    },
    //插入行
    insertRow: function (obj, param) {
        var grid = this.getGrid(obj);
        if (!this.endEdit(obj)) return;
        var row = param.row || {};
//        row = row || {};
        row.es = 1;
        this.putChanged(grid, row, 1);
        grid.datagrid("insertRow", param); // param = {index: index , row: row}
        this.beginEdit(grid, param.index);
    },
    //删除选中行
    delSelRow: function (obj) {
        var grid = this.getGrid(obj);
        $$pgrid.endEdit(grid);
        var options = grid.datagrid("options");
        var row = grid.datagrid('getSelected');
        if (!row) {
            $$msg.slideMsg("请选择要删除的行！");
            return;
        }
//        var rowIndex = grid.datagrid("getRowIndex", row);
        if (options.singleSelect) delSingle(grid, options);
        else delMulti(grid, options);

        function setSelect(grid, rowIndex) {
            var rows = grid.datagrid("getRows"), i, len;
            for (i = rowIndex, len = rows.length; i < len; i++) {
                row = rows[i];
                if (row.es != 3) {
                    grid.datagrid("selectRow", i);
                    break;
                }
            }

            if(rowIndex<=rows.length){
                for (i = rowIndex - 1; i >= 0; i--) {
                    row = rows[i];
                    if (row.es != 3) {
                        grid.datagrid("selectRow", i);
                        break;
                    }
                }
            }
        }

        function delSingle(grid, options) {
            var gridId = grid.attr('id');

            function delRow(index) {
                var grid = $('#' + gridId);
                var options = grid.datagrid("options");
                var row = grid.datagrid('getSelected');
                $$pgrid.putChanged(grid, row, 3);
                if (row.es == 1 || !options.pagination) {//新增的行 或不分页 直接删除
                    grid.datagrid('deleteRow', index);
                    //重置选中行
                    grid.datagrid('unselectAll');
                    var rows = grid.datagrid('getRows');
                    if (rows.length > index) {
                        grid.datagrid('selectRow', index);
                    } else if (rows.length > 0) {
                        grid.datagrid('selectRow', rows.length - 1);
                    }
                    //重置gird中的数据，主要是让重新刷新一下format中方法的index
                    $$egrid.reload(grid); //不reload，后面的format方法中的index不会变
                } else {
                    row.es = 3; //删除标记
                    grid.datagrid('refreshRow', index);
                }
                if (options.onAfterDelete) options.onAfterDelete(row);
                setSelect(grid, index);
            }

            var row = grid.datagrid('getSelected');
            if (row && row.es != 3) {
                var index = grid.datagrid('getRowIndex', row);
                if (options.onBeforeDelete && options.onBeforeDelete(row) == false) return;
                $$msg.confirm('确定要删除该行数据吗？', function (ok) {
                    if (ok) delRow(index);
                    else grid.datagrid('hideEditorTool');
                });
            } else {
                $$msg.alert('请选择要删除的数据行！');
            }
        }

        function delMulti(grid, options) {
            var gridId = grid.attr('id');

            function delRows() {
                var grid = $('#' + gridId);
                var options = grid.datagrid("options");
                var rows = grid.datagrid('getSelections'), rowIndex = undefined;
                for (var i = rows.length - 1; i >= 0; i--) {
                    var row = rows[i];
                    if (options.onBeforeDelete && options.onBeforeDelete(row) == false) return;
                    var index = grid.datagrid('getRowIndex', row);
                    if (rowIndex == undefined) rowIndex = index;
                    $$pgrid.putChanged(grid, row, 3);
                    if (row.es == 1 || !options.pagination) {//新增的行 或不分页 直接删除
                        grid.datagrid('deleteRow', index);
                        //重置gird中的数据，主要是让重新刷新一下format中方法的index
                    } else {
                        row.es = 3; //删除标记
                        grid.datagrid('refreshRow', index);
                    }
                    if (options.onAfterDelete) options.onAfterDelete(row);
                }
                $$egrid.reload(grid);
                setSelect(grid, rowIndex);
            }

            var rows = grid.datagrid('getSelections');
            if (rows && rows.length > 0) {
                $$msg.confirm('确定要删除该行数据吗？', function (ok) {
                    if (ok) delRows();
                });
            } else {
                $$msg.alert('请选择要删除的数据行！');
            }
        }
    },
    delSingleRow:function(obj) {
        var options = obj.datagrid("options");
        delSingle(obj, options);
        function setSelect(grid, rowIndex) {
            var rows = grid.datagrid("getRows"), i, len;
            for (i = rowIndex, len = rows.length; i < len; i++) {
                row = rows[i];
                if (row.es != 3) {
                    grid.datagrid("selectRow", i);
                    break;
                }
            }

            for (i = rowIndex - 1; i >= 0; i--) {
                row = rows[i];
                if (row.es != 3) {
                    grid.datagrid("selectRow", i);
                    break;
                }
            }
        }
        function delSingle(grid, options) {
            var gridId = grid.attr('id');

            function delRow(index) {
                var grid = $('#' + gridId);
                var options = grid.datagrid("options");
                var row = grid.datagrid('getSelected');
                $$pgrid.putChanged(grid, row, 3);
                if (row.es == 1 || !options.pagination) {//新增的行 或不分页 直接删除
                    grid.datagrid('deleteRow', index);
                    //重置选中行
                    grid.datagrid('unselectAll');
                    var rows = grid.datagrid('getRows');
                    if (rows.length > index) {
                        grid.datagrid('selectRow', index);
                    } else if (rows.length > 0) {
                        grid.datagrid('selectRow', rows.length - 1);
                    }
                    //重置gird中的数据，主要是让重新刷新一下format中方法的index
                    $$egrid.reload(grid); //不reload，后面的format方法中的index不会变
                } else {
                    row.es = 3; //删除标记
                    grid.datagrid('refreshRow', index);
                }
                if (options.onAfterDelete) options.onAfterDelete(row);
                setSelect(grid, index);
            }

            var row = grid.datagrid('getSelected');
            if (row && row.es != 3) {
                var index = grid.datagrid('getRowIndex', row);
                if (options.onBeforeDelete && options.onBeforeDelete(row) == false) return;
                delRow(index);
            } else {
                $$msg.alert('请选择要删除的数据行！');
            }
        }
    },

    //清空行
    empty: function (obj) {
        var grid = this.getGrid(obj);
        this.endEdit(grid, true);
        var rows = grid.datagrid("getRows") || [];
        var deleted = [];
        var idField = grid.datagrid("options").idField;
        for (var i = 0, len = rows.length; i < len; i++) {
            var r = rows[i];
            if (r.es != 1) {
                r.es = 3;
                deleted.push(r[idField]);
            }
        }
        coco.page.model.data.empty(grid[0].id, deleted);
        grid.datagrid("loadData", []);
    },
    //清空行
    ignoreChanged: function (obj) {
        var grid = this.getGrid(obj);
        this.endEdit(grid);
        coco.page.model.data.ignoreChanged(grid[0].id);
        grid.datagrid("loadData", []);
    },
    //增加修改的数据，obj：grid或id，row：行数据 flag 1-insert 2-update 3-deleted
    putChanged: function (obj, row, flag) {
        var grid = this.getGrid(obj);
        if (arguments.length == 2) {//支持{row:,flag:}的方式
            var opts = row;
            flag = opts.flag;
            row = opts.row;
        }
        coco.page.model.data.putChanged(grid[0].id, grid.datagrid("options").idField, row, flag);
    },
    refresh: function (obj, page) {
        var grid = this.getGrid(obj);
        if (!grid.length) return;
        grid.attr("lastIndex", "");
        coco.page.model.data.ignoreChanged(grid[0].id);
        var opt = grid.datagrid("options");
        if (!page) page = opt.pageNumber;
        else $$egrid.setGridPageNumber(grid, page);
        this.doGetGridPageData(grid[0].id, page, opt.pageSize, opt.getPageData);
    },
    doGetGridPageData: function (gridId, pageNumber, pageSize, fnGetPageData) {
        if (!fnGetPageData) return;
        var grid = this.getGrid(gridId);
        grid.datagrid('loading');
        gridId = grid.attr('id');
        setTimeout(function () {
            var data = fnGetPageData(pageNumber, pageSize);
            var grid = $('#' + gridId);
            $$pgrid.loadData(grid, data);
            grid.datagrid('loaded');
        }, 10);
    },
    //获取编辑状态下，指定列的值
    getEditorValue: function (obj, field) {
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex)) {
            return $$egrid.getEditorValue(grid, lastIndex, field);
        }
        return undefined;
    },
    //获取编辑状态下，指定列的值
    getColValue: function (obj, field) {
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex)) {
            var row = $$egrid.getRowByIndex(grid, lastIndex);
            return {
                newValue: $$egrid.getEditorValue(grid, lastIndex, field),
                oldValue: row[field]
            };
        }
        return undefined;
    },
    //编辑状态下，设置指定列的值
    setColValue: function (obj, field, value) {
        if (arguments.length == 2) {//支持对象的方式
            var opts = field;
            field = opts.field;
            value = opts.value;
        }
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex)) {
            $$egrid.setEditorValue(grid, lastIndex, field, value);
            var row = $$egrid.getRowByIndex(grid, lastIndex);
            this.setEdit(obj, row);
        }
    },
    setEditorEnabled: function (obj, field, enabled) {
        if (arguments.length == 2) {//支持对象的方式
            var opts = field;
            field = opts.field;
            enabled = opts.enabled;
        }
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex)) {
            $$egrid.setEditorEnabled(grid, lastIndex, field, enabled);
        }
    },
    //获取指定行列的值
    getCellValue: function (obj, rowIndex, field) {
        if (arguments.length == 2) {//支持对象的方式
            var opts = rowIndex;
            rowIndex = opts.rowIndex;
            field = opts.field;
        }
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isNotEmpty(lastIndex) && rowIndex == lastIndex) {
            return $$egrid.getEditorValue(grid, lastIndex, field);
        } else {
            var row = $$egrid.getRowByIndex(grid, rowIndex);
            return row[field];
        }
    },
    //编辑状态下，设置指定列的值
    setCellValue: function (obj, rowIndex, field, value) {
        if (arguments.length == 2) {//支持对象的方式
            var opts = rowIndex;
            rowIndex = opts.rowIndex;
            field = opts.field;
            value = opts.value;
        }
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");

        if ($$str.isNotEmpty(lastIndex) && rowIndex == lastIndex) {
            $$egrid.setEditorValue(grid, lastIndex, field, value);
            var row = $$egrid.getRowByIndex(grid, lastIndex);
            this.setEdit(obj, row);
        } else {
            var row = $$egrid.getRowByIndex(grid, rowIndex);
            row[field] = value;
            grid.datagrid("updateCell", {index: rowIndex, field: field});
            this.setEdit(obj, row);
        }
    },
    //获取指定列的合计值
    getColSumValue: function (obj, field) {
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if ($$str.isEmpty(lastIndex)) lastIndex = -1;
        var rows = grid.datagrid("getRows");
        var t = 0;
        for (var i = 0, len = rows.length; i < len; i++) {
            if (rows[i].es == 3) continue;
            var v;
            if (i == lastIndex) v = this.getEditorValue(grid, field);
            else v = rows[i][field];
            if (!v) v = "0";
            v = "" + v;
            t += v.toDouble();
        }
        return t;
    },
    //设置修改标记
    setEdit: function (gridId, row) {
        if (row.es == 0 || row.es == undefined) {
            row.es = 2;
            this.putChanged(gridId, row, 2);
        }
    },
    loadData: function (obj, data) {
        var grid = this.getGrid(obj);
        var rows;
        if ($$obj.isArray(data)) rows = data; else rows = data.rows;
        this.endEdit(grid);
        var changed = coco.page.model.data.getData(grid[0].id);
        var idField = grid.datagrid("options").idField;
        var curInserted = [];
        var r, i, len;
        for (i = 0, len = rows.length; i < len; i++) {
            r = rows[i];
            if (changed.updated.containsKey(r[idField])) rows[i] = changed.updated.get(r[idField]);
            else if (changed.deleted.indexOf(r[idField]) >= 0) r.es = 3;
            else if (r.es > 0) {
                this.putChanged(grid, r, r.es);
                if (r.es == 1) curInserted.push(r[idField]);
            }
        }

        for (i = 0, len = changed.inserted.length; i < len; i++) {
            r = changed.inserted[i];
            if (curInserted.indexOf(r[idField]) < 0)
                rows.push(r);
        }
        grid.datagrid("loadData", data);
    },
    buildPrintData: function (obj, prefix, header) {
        if (arguments.length == 2) {//支持对象的方式
            var opts = prefix;
            prefix = opts.prefix;
            header = opts.header;
            value = opts.value;
        }
        var grid = this.getGrid(obj);
        var rows = grid.datagrid("getRows");
        $.each(rows, function (index, row) {
            index = index + 1;
            header[prefix + ".index." + index] = index;
            for (var key in row) {
                header[prefix + "." + key + "." + index] = row[key];
            }
        });
    },
    // 获取此grid的有效记录数的方法
    getAvailabCount: function (obj) {
        var grid = this.getGrid(obj);
        var allCount = grid.datagrid("getTotalCount");
        var changed = coco.page.model.data.getChanged(grid.attr("id"));
        var insertCount = 0;
        var deleteCount = 0;
        if (changed) {
            insertCount = changed.inserted.length;
            deleteCount = changed.deleted.length;
        }
        return allCount + insertCount - deleteCount;
    }
};
//模板中的子列表
/**
 * getPageData: function(rowId) 获取下级数据
 * canEdit: function(row) 能否编辑数据
 * rootId   默认的父亲节点ID
 */
$$pmodel.treegrid = {
    getGrid: function (obj) {
        return $$egrid.getGrid(obj);
    },
    init: function (gridId, opt) {
        $$pmodel.data.initData(gridId);
        var options = $.extend({
            fit: true,
            idField: "id",
            fitColumns: true,
            nowrap: false,
            striped: true,
            collapsible: false,
            remoteSort: false,
            pagination: false,
            rownumbers: true,
            singleSelect: true,
//                    onEndEdit:function(rowId, oldNode, newNode) {
//                    },
            onBeforeExpand: function (node) {
                var $grid = $(this);
                var options = $grid.treegrid('options');
                $grid.treegrid("endEdit");
                $$pmodel.treegrid.doGetGridPageData(gridId, node[options.idField], options.getPageData);
            },
            onBeforeCollapse: function (row) {
                $(this).treegrid("endEdit");
                return true;
            }
        }, opt || {});

        if (!options.readOnly) {
            //单击行编辑
            options.onClickRow = function (row) {
                var options = $('#' + gridId).treegrid('options');
                $$pmodel.treegrid.beginEdit(gridId, row[options.idField]);
            };
            //编辑后
            options.onAfterEdit = function (rowData, changes) {
//                prompt('', $$json.stringify(changes));
                if (!$$obj.isEmpty(changes) && rowData.es != 1) {
                    rowData.es = 2;
                    var grid = $('#' + gridId);
                    var options = grid.treegrid('options');
                    grid.treegrid("refresh", rowData[options.idField]);
                    $$pmodel.treegrid.putChanged(gridId, rowData, 2);
                }
            }
        } else {
            options.onClickRow = function (row) {
                var grid = $('#' + gridId);
                var options = grid.treegrid('options');
                if (row && row[options.idField]) {
                    grid.treegrid('toggle', row[options.idField]);
                }
            };
        }
        $("#" + gridId).treegrid(options);
        $("#" + gridId + 'btndel').after("<div class='coco_txt' style='margin-top:5px; float: right;'>\
                图例：<b style='background-color:#ffeeee;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 新增&nbsp;&nbsp;\
                <b style='background-color:#DDFFDD;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 修改&nbsp;&nbsp;\
                <b style='background-color:#e9f1fe;color:gray;font-style:italic;text-decoration:line-through;border:1px solid #000000'>&nbsp;&nbsp;&nbsp;&nbsp;</b> 删除&nbsp;&nbsp;</div>");
        //增加默认父节点ID设置
        if (options.rootId)
            this.doGetGridPageData(gridId, options.rootId, options.getPageData);
    },
    getNode: function (obj, rowId) {
        var grid = this.getGrid(obj);
        return grid.treegrid("find", rowId);
    },
    //将某一行设为编辑状态
    beginEdit: function (obj, rowId) {
        var grid = this.getGrid(obj);
        var row = this.getNode(grid, rowId);
        var lastId = grid.attr("lastId");
        if (lastId == rowId) return;
        this.endEdit(grid, lastId);
        if (row.es == 3) return;//标记删除的行，不允许编辑
        if (grid.treegrid("options").canEdit && !grid.treegrid("options").canEdit(row)) {
            grid.treegrid('toggle', rowId);
            return;
        }
        grid.treegrid('beginEdit', rowId);
        grid.attr("lastId", rowId);
        grid.treegrid('unselectAll');
        grid.treegrid('select', rowId);
    },
    //结束编辑状态
    endEdit: function (obj) {
        var grid = this.getGrid(obj);
        var rowId = grid.attr("lastId");
        if ($$str.isNotEmpty(rowId)) {
            var temp = grid.treegrid("find", rowId);
            var oldNode = {};
            for (var key in temp) {
                oldNode[key] = temp[key];
            }
            grid.datagrid('endEdit', rowId);
            var newNode = grid.treegrid("find", rowId);
            var opt = grid.treegrid("options");
            if (opt.onCustEndEdit) opt.onCustEndEdit.call(grid[0], rowId, oldNode, newNode);
        }
        grid.attr("lastId", "");
    },
    //增加修改的数据，obj：grid或id，row：行数据 flag 1-insert 2-update 3-deleted
    putChanged: function (obj, row, flag) {
        var grid = this.getGrid(obj);
        $$pmodel.data.putChanged(grid[0].id, grid.treegrid("options").idField, row, flag);
    },
    doGetGridPageData: function (obj, rowId, fnGetPageData) {
        if (!fnGetPageData) return;
        var grid = this.getGrid(obj);
        var node = this.getNode(grid, rowId);
        //已经加载过,就不再加载了
        if (node && node.attributes && node.attributes.hasLoaded) {
            return;
        }

        var data = fnGetPageData(rowId);
        var rows;
        if ($$obj.isArray(data)) rows = data; else rows = data.rows;

        this.endEdit(grid);

        if (node) { //存在此结点
            grid.treegrid('append', {
                parent: node[grid.datagrid("options").idField],
                data: rows});
            this.setNodeLoaded(node, true);
        } else {
            grid.treegrid('append', {
                data: data});
        }
    },
    //给节点置是否已加载数据的标记
    setNodeLoaded: function (node, hasLoaded) {
        var n = node.attributes || {};

        n.hasLoaded = hasLoaded;
        node.attributes = n;
    },
    /**
     * 从新加载数据
     * @param obj
     * @param data
     */
    loadData: function (obj, data) {
        var grid = this.getGrid(obj);
        grid.treegrid("loadData", data);
    }
};//easyui的组件及方法进行了一些扩展
coco.eui = {};
window.$$egrid = coco.eui.grid = {
    getGrid:function (obj) {
        if (typeof obj == "string") return $("#" + obj);
        return obj;
    },
    //删除选中行
    deleteSelectedRow:function (obj, showConfirm) {
        var grid = this.getGrid(obj);
        var row = grid.datagrid('getSelected');

        function delRow(index) {
            grid.datagrid('deleteRow', index);

            //重置gird中的数据，主要是让刷新一下format中方法的index
            coco.eui.grid.reload(grid);

            //重置选中行
            grid.datagrid('unselectAll');
            var rows = grid.datagrid('getRows');
            if (rows.length > index) {
                grid.datagrid('selectRow', index);
            } else if (rows.length > 0) {
                grid.datagrid('selectRow', rows.length - 1);
            }
            //删除了之后，lastIndex 也得同步
            var lastIndex = grid.attr("lastIndex");
            if (lastIndex == index) {
                lastIndex = -1;
            } else if (lastIndex > index) {
                lastIndex--;
            }
            grid.attr("lastIndex", lastIndex);
        }

        if (row) {
            var index = grid.datagrid('getRowIndex', row);
            if (showConfirm) {
                coco.utils.msg.confirm('确定要删除该行数据吗？', function (ok) {
                    if (ok) delRow(index);
                });
            } else {
                delRow(index);
            }
        } else {
            coco.utils.msg.alert('请选择要删除的数据行！');
        }
    },
    //上移行
    selectRowMoveUp:function (obj) {
        var grid = this.getGrid(obj);
        this.endEdit(grid);
        var rows = grid.datagrid("getSelections");
        if (rows.length == 0) {
            coco.utils.msg.alert('请选择要移动的行！');
            return;
        }
        var data = grid.datagrid("getRows"), index, temp;
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            index = grid.datagrid('getRowIndex', row);
            if (index > i) {
                temp = data[index - 1];
                data[index - 1] = row;
                data[index] = temp;
                grid.datagrid('refreshRow', index);
                grid.datagrid('refreshRow', index - 1);
                grid.datagrid('unselectRow', index);
                grid.datagrid('selectRow', index - 1);
            }
        }
    },
    //下移行
    selectRowMoveDown:function (obj) {
        var grid = this.getGrid(obj);
        this.endEdit(grid);
        var rows = grid.datagrid("getSelections");
        if (rows.length == 0) {
            coco.utils.msg.alert('请选择要移动的行！');
            return;
        }
        var data = grid.datagrid("getRows"), index, temp;
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[rows.length - i - 1];
            index = grid.datagrid('getRowIndex', row);
            if (index < data.length - 1 - i) {
                temp = data[index + 1];
                data[index + 1] = row;
                data[index] = temp;
                grid.datagrid('refreshRow', index);
                grid.datagrid('refreshRow', index + 1);
                grid.datagrid('unselectRow', index);
                grid.datagrid('selectRow', index + 1);
            }
        }
    },
    //取得指定index的行
    getRowByIndex:function (obj, index) {
        var grid = this.getGrid(obj);
        var rows = grid.datagrid("getRows");
        return rows[index];
    },
    //设置指定index的行
    setRowByIndex:function (obj, index, row) {
        var grid = this.getGrid(obj);
        var rows = grid.datagrid("getRows");
        rows[index] = row;
        grid.datagrid("refreshRow", index);
    },
    getSelectdIndex:function (obj) {
        var grid = this.getGrid(obj);
        var row = grid.datagrid('getSelected');
        return grid.datagrid('getRowIndex', row);
    },
    //删除指定index的行
    deleteRowByIndex:function (obj, index, showConfirm) {
        var grid = this.getGrid(obj);
        if (showConfirm) {
            coco.utils.msg.confirm('确定要删除么？', function (ok) {
                if (ok) delRow(index);
            });
        } else {
            delRow(index);
        }
        function delRow(index) {
            grid.datagrid('deleteRow', index);
            //删除了之后，lastIndex 也得同步
            var lastIndex = grid.attr("lastIndex");
            if (lastIndex == index) {
                lastIndex = -1;
            } else if (lastIndex > index) {
                lastIndex--;
            }
            grid.attr("lastIndex", lastIndex);
            //重置gird中的数据，主要是让重新刷新一下format中方法的index
            coco.eui.grid.reload(grid); //不reload，后面的format方法中的index不会变
        }
    },
    //将某一行设为编辑状态
    beginEdit:function (obj, rowIndex) {
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if (coco.utils.str.isNotEmpty(lastIndex) && lastIndex == rowIndex) return;
        if (lastIndex != rowIndex && coco.utils.str.isNotEmpty(lastIndex)) {
            grid.datagrid('endEdit', lastIndex);
        }
        grid.attr("lastIndex", rowIndex);
        grid.datagrid('unselectAll');
        grid.datagrid('selectRow', rowIndex);
        grid.datagrid('beginEdit', rowIndex);
    },
    //提交编辑状态
    endEdit:function (obj) {
        var grid = this.getGrid(obj);
        var lastIndex = grid.attr("lastIndex");
        if (coco.utils.str.isNotEmpty(lastIndex)) {
            grid.datagrid('endEdit', lastIndex);
            if (grid.datagrid('isEditing')) return false;
        }
        grid.attr("lastIndex", "");
        return true;
    },
    reload:function (obj) {
        var grid = this.getGrid(obj);
        /*var data = grid.datagrid("getData");
        grid.datagrid("loadData", {rows:[]});
        grid.datagrid("loadData", data);*/
        grid.datagrid('refreshGrid');
    },
    addRow:function (obj, row) {
        var grid = this.getGrid(obj);
        grid.datagrid("appendRow", row || {});
        var rows = grid.datagrid("getRows") || [];
        var rowIndex = rows.length - 1;
        this.beginEdit(grid, rowIndex);
    },
    editAll:function (obj) {
        var grid = this.getGrid(obj);
        var rows = grid.datagrid("getRows");
        for (var i = 0; i < rows.length; i++) {
            grid.datagrid("beginEdit", i);
        }
    },
    //获取编辑状态下，指定列的值
    getEditorValue:function (obj, rowIndex, field) {
        var grid = this.getGrid(obj);
        var editor = grid.datagrid("getEditor", field);
        if (editor)
            return editor.actions.getValue(editor.target);
        else {
            var row = coco.eui.grid.getRowByIndex(grid, rowIndex);
            return row[field];
        }
    },
    //编辑状态下，设置指定列的值
    setEditorValue:function (obj, rowIndex, field, value) {
        var grid = this.getGrid(obj);
        var editor = grid.datagrid("getEditor", field);
        if (editor)
            editor.actions.setValue(editor.target, value);
        else {
            var row = this.getRowByIndex(grid, rowIndex);
            if (row) {
                row[field] = value;
                grid.datagrid("updateCell", {index:rowIndex, field:field});
            }
        }
    },
    //编辑状态下，设置指定列的值
    setEditorEnabled:function (obj, rowIndex, field, enabled) {
        var grid = this.getGrid(obj);
        var editor = grid.datagrid("getEditor", field);
        if (editor) {
            editor.actions.setEnabled(editor.target, enabled);
        }
    },
    //获取当前行编辑状态下，指定列的值
    getCurEditorValue:function (obj, field) {
        var grid = this.getGrid(obj);
        return this.getEditorValue(grid, this.getSelectdIndex(grid), field);
    },
    setGridPageNumber:function (obj, pageNumber) {
        var grid = this.getGrid(obj);
        grid.datagrid('options').pageNumber = pageNumber;
        var pager = grid.datagrid('getPager');
        if (pager) pager.pagination({pageNumber:pageNumber});
    },
    //将自定义的一维数组形式的列定义转换成easyui多位数组格式的columns定义
    formatColumns:function (columns) {
        var i, j, len, col, cols = [], colsObj = {}, levelCount = 1, title, sa, c, cps = [], curCps;
        //循环列定义，根据表头层级将列定义构造成树结构
        for (i = 0, len = columns.length; i < len; i++) {
            col = columns[i];
            title = col.title + "";
            sa = title.split("\|");
            if (sa.length <= 1) {//注意，不要修改原有的column
                cols.push($.extend({}, col));
                cps = [];
            } else {
                var l = sa.length;
                if (l > levelCount) levelCount = l;

                curCps = [];
                var p = cols;
                for (j = 0; j < l - 1; j++) {
                    if (cps.length > j && cps[j].title == sa[j]) c = cps[j];
                    else {
                        c = {title:sa[j], children:[]};
                        p.push(c);
                    }
                    curCps.push(c);
                    p = c.children;
                }
                c = $.extend({}, col, {title:sa[l - 1]});
                p.push(c);
                cps = curCps;
            }
        }
        //如果没有多级表头，直接返回
        if (levelCount <= 1) return [columns];

        var result = [];
        for (i = 0; i < levelCount; i++) result.push([]);
        //分析树，构造多维数组。递归调用，返回叶子节点个数作为上级的colspan
        function parse(cols, level) {
            var i, len, col, c, cc, childCount = 0, rslt = result[level];
            for (i = 0, len = cols.length; i < len; i++) {
                col = cols[i];
                if (col.children && col.children.length > 0) {
                    cc = parse(col.children, level + 1);
                    childCount += cc;
                    rslt.push({title:col.title, colspan:cc});
                } else {
                    childCount++;
                    cc = levelCount - level;
                    //叶子列才需要rowspan
                    if (cc > 1) col.rowspan = cc;
                    rslt.push(col);
                }
            }
            return childCount;
        }

        parse(cols, 0);
        return result;
    },
    //设置列宽度
    setColsWidth:function (columns, colsWidth) {
        if (!columns || columns.length == 0 || !columns[0].length) return;
        for (var i = 0, len = columns.length; i < len; i++) {
            for (var j = 0, lenj = columns[i].length; j < lenj; j++) {
                var col = columns[i][j];
                if (col.field && colsWidth[col.field] != undefined) col.width = colsWidth[col.field];
            }
        }
    },

    setColsHide:function (columns, colsHide) {
        if (!columns || columns.length == 0 || !columns[0].length) return;
        for (var i = 0, len = columns.length; i < len; i++) {
            for (var j = 0, lenj = columns[i].length; j < lenj; j++) {
                var col = columns[i][j];
                if (col.field && colsHide[col.field] != undefined) col.hidden = colsHide[col.field];
            }
        }
    },
    saveColsWidth:function (key, gridId, isAlert) {
        coco.utils.ajaxPostData("userParam/saveColWidth", {key:key, value:coco.utils.json.stringify($("#" + gridId).datagrid("getColsWidth"))}, function () {
            if (isAlert) coco.utils.msg.slideMsg("列宽设置保存成功");
        });
    } ,
    //保存列方案
    saveColsScheme:function (owner,name,id,version,gridId, isAlert) {
        var value  ={
            width:$("#" + gridId).datagrid("getColsWidth"),
            hide :$("#" + gridId).datagrid("getColsHide")
        }
        coco.utils.ajaxPostData("userParam/saveColScheme", {owner:owner,name:name,id:id,version:version, value:coco.utils.json.stringify(value)}, function () {
            if (isAlert) coco.utils.msg.slideMsg("列宽设置保存成功");
        });
    }
};
//easyui tabs相关方法
coco.eui.tabs = {
    //显示某一tab
    showTab:function (tagId, tabTitle) {
        $('#' + tagId + ' li:has(a span:contains("' + tabTitle + '"))').show();
    },
    //隐藏某一tab
    hideTab:function (tagId, tabTitle) {
        $('#' + tagId + ' li:has(a span:contains("' + tabTitle + '"))').hide();
    }
};
//easyui tabs相关方法
coco.eui.accordion = {
    //显示某一tab
    showTab:function (tagId, tabTitle) {
        $('#' + tagId + ' div:has(div div:contains("' + tabTitle + '"))').show();
    },
    //隐藏某一tab
    hideTab:function (tagId, tabTitle) {
        $('#' + tagId + ' div:has(div div:contains("' + tabTitle + '"))').hide();
    }
};
//easyui的本地化
coco.eui.locale = function () {
    if ($.fn.pagination) {
        $.fn.pagination.defaults.beforePageText = '';
        $.fn.pagination.defaults.afterPageText = '/{pages}';
        $.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}条记录';
    }
    if ($.fn.datagrid) {
        $.fn.datagrid.defaults.loadMsg = '正在处理，请稍候...';
    }
    if ($.messager) {
        $.messager.defaults.ok = '确定';
        $.messager.defaults.cancel = '取消';
    }
    if ($.fn.validatebox) {
        $.fn.validatebox.defaults.missingMessage = '该项为必填项';
        $.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
        $.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
        $.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
        $.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
    }
    if ($.fn.numberbox) {
        $.fn.numberbox.defaults.missingMessage = '该项为必填项';
    }
    if ($.fn.combobox) {
        $.fn.combobox.defaults.missingMessage = '该项为必填项';
    }
    if ($.fn.combotree) {
        $.fn.combotree.defaults.missingMessage = '该项为必填项';
    }
    if ($.fn.combogrid) {
        $.fn.combogrid.defaults.missingMessage = '该项为必填项';
    }
    if ($.fn.calendar) {
        $.fn.calendar.defaults.weeks = ['日', '一', '二', '三', '四', '五', '六'];
        $.fn.calendar.defaults.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    }
    if ($.fn.datebox) {
        $.fn.datebox.defaults.currentText = '今天';
        $.fn.datebox.defaults.closeText = '关闭';
        $.fn.datebox.defaults.okText = '确定';
        $.fn.datebox.defaults.missingMessage = '该项为必填项';
        $.fn.datebox.defaults.formatter = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
        };
        $.fn.datebox.defaults.parser = function (s) {
            if (!s) return new Date();
            var ss = s.split('-');
            var y = parseInt(ss[0], 10);
            var m = parseInt(ss[1], 10);
            var d = parseInt(ss[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                return new Date(y, m - 1, d);
            } else {
                return new Date();
            }
        };
    }
    if ($.fn.datetimebox && $.fn.datebox) {
        $.extend($.fn.datetimebox.defaults, {
            currentText:$.fn.datebox.defaults.currentText,
            closeText:$.fn.datebox.defaults.closeText,
            okText:$.fn.datebox.defaults.okText,
            missingMessage:$.fn.datebox.defaults.missingMessage
        });
    }
    if ($.fn.panel) {
        $.fn.panel.defaults.loadingMessage = '正在加载，请稍候...'
    }
};
coco.eui.locale();
$(function () {
    //validType扩展
    $.extend($.fn.validatebox.defaults.rules, {
        codeName:{
            validator:function (value) {
                return /^[a-zA-Z][\w]*$/.test(value);
            }, message:'只能为数字、字母或下划线,并且只能是由字母开头!'
        },
        number:{
            validator:function (value) {
                return  coco.utils.str.trim(value) != "" && !isNaN(value);
            }, message:'只能为数字!'
        },
        numberlength:{
            validator:function (value, param) {
                var len = $.trim(value).length;
                return len == param[0]
            },
            message:'只能为{0}位数字!'
        },
        isPureNumber:{
            validator:function (value) {
                return  coco.utils.math.isPureNumber(value);
            }, message:'只能为正整数!'
        },
        isDate:{
            validator:function (value, param) {
                var valid, alertkey;
                if (param && param.length >= 1) {
                    alertkey = param[0];
                }
                valid = coco.utils.date.isDateFormat(value);
                if (valid == true) {
                    return true;
                } else if (alertkey) {
                    this.message = alertkey + '格式错误 [YYYY-MM-DD]!';
                }
                return false;
            }, message:'[日期] 格式错误 [YYYY-MM-DD]!'
        },
        isDatetime:{
            validator:function (value, param) {
                var valid, alertkey;
                if (param && param.length >= 1) {
                    alertkey = param[0];
                }
                valid = coco.utils.date.isDateTime(value);
                if (valid == true) {
                    return true;
                } else if (alertkey) {
                    this.message = alertkey + '格式错误 [YYYY-MM-DD HH:MM:SS]!';
                }
                return false;
            }, message:'[日期时间] 格式错误 [YYYY-MM-DD HH:MM:SS]!'
        },
        isTime:{
            validator:function (value, param) {
                var valid, alertkey;
                if (param && param.length >= 1) {
                    alertkey = param[0];
                }
                valid = coco.utils.date.isTimeFormat(value);
                if (valid == true) {
                    return true;
                } else if (coco.utils.str.isNotEmpty(alertkey)) {
                    this.message = alertkey + '格式错误 [HH:MM:SS]!';
                }
                return false;
            }, message:'[时间] 格式错误 [HH:MM:SS]!'
        },
        validDateTime:{
            //validType="validDateTime"      [日期]  [YYYY-MM-DD]
            //validType="validDateTime['T']" [时间]  [HH:MM:SS]
            //validType="validDateTime['M']" [日期时间] [YYYY-MM-DD HH:MM:SS]!'
            validator:function (value, param) {
                if (coco.utils.str.isEmpty(value)) {
                    return true;
                }
                var validMsg, type, alertkey;
                if (param && param.length >= 1) {
                    type = param[0];
                } else {
                    type = "D";
                    alertkey = "[日期]";  //默认为校验日期
                }
                if (param && param.length >= 2) {
                    alertkey = param[1];
                }
                if (!(alertkey)) {
                    if (type == 'T') {
                        alertkey = "[时间]";
                    } else if (type == 'M') {
                        alertkey = "[日期时间]";
                    }
                }
                //日期时间格式验证，srcDate:日期串;alertKey:关键描述；allowempty:是否允许为空；type：D-日期 T-时间 M-日期时间
                validMsg = coco.page.validate.validateDateTime(value, alertkey, true, type, false);
                if (validMsg == true) {
                    return true;
                } else {
                    this.message = validMsg;
                }
                return false;
            }, message:'校验类型有错：D-日期 T-时间 M-日期时间!'
        },
        validName:{
            //validType="validateName['显示名称',false,30]"
            validator:function (value, param) {
                var validMsg;
                if (!(param)) {
                    validMsg = coco.page.validate.validateName(value);
                } else if (param.length >= 4) {
                    validMsg = coco.page.validate.validateName(value, param[0], param[1], param[2], param[3])
                } else if (param.length == 3) {
                    validMsg = coco.page.validate.validateName(value, param[0], param[1], param[2])
                } else if (param.length == 2) {
                    validMsg = coco.page.validate.validateName(value, param[0], param[1])
                } else if (param.length == 1) {
                    validMsg = coco.page.validate.validateName(value, param[0])
                } else {
                    validMsg = coco.page.validate.validateName(value)
                }
                if (validMsg == true) {
                    return true;
                } else {
                    //$.fn.validatebox.defaults.rules.validateName.message = validMsg;
                    this.message = validMsg;
                }
                return false;
            }, message:'输入不合法!'
        },
        validCodeEx:{
            //validType="validateName['显示名称',false,30]"
            validator:function (value) {
                var validMsg = coco.page.validate.validateName(value, "编码", false, 20);
                if (validMsg == true) {
                    return true;
                } else {
                    //$.fn.validatebox.defaults.rules.validateName.message = validMsg;
                    this.message = validMsg;
                }
                return false;
            }, message:'输入不合法!'
        },
        validNameEx:{
            validator:function (value) {
                var validMsg = coco.page.validate.validateName(value, "名称", false, 100);
                if (validMsg == true) {
                    return true;
                } else {
                    //$.fn.validatebox.defaults.rules.validateName.message = validMsg;
                    this.message = validMsg;
                }
                return false;
            }, message:'输入不合法!'
        },
        validDesc:{
            //validType="validateName['显示名称',false,30]"
            validator:function (value, param) {
                var validMsg, alertkey = "", allowempty = true, maxlen = 255;
                var len = param ? param.length : 0;
                if (len > 0) {
                    alertkey = param[0];
                    if (len > 1) allowempty = param[1];
                    if (len > 2) maxlen = param[2];
                }
                validMsg = coco.page.validate.validateDesc(value, alertkey, allowempty, maxlen, false);
                if (validMsg == true) {
                    return true;
                } else {
                    this.message = validMsg;
                }
                return false;
            }, message:'输入不合法！'
        },
        validNum:{
            //validType="validateName['显示名称',false,30]"
            validator:function (value, param) {
                var validMsg = true, alertkey = "", allowempty = true, maxlen = 255;
                var len = param ? param.length : 0;
                if (len > 0) {
                    alertkey = param[0];
                    if (len > 1) allowempty = param[1];
                    if (len > 2) maxlen = param[2];
                }
                if (coco.utils.str.isEmpty(value)) {
                    if (!allowempty) validMsg = alertkey + "不能为空！";
                    else validMsg = true;
                } else if (!/^\d+$/.test(value)) validMsg = alertkey + "只能为数字！";
                else if (value.length > maxlen) validMsg = "您录入的" + alertkey + "信息过长，最大长度为" + maxlen + " 目前录入内容的长度为：" + value.length;
                if (validMsg == true) {
                    return true;
                } else {
                    this.message = validMsg;
                }
                return false;
            }, message:'输入不合法！'
        }
    });
    //datagird编辑器扩展
    $.extend($.fn.datagrid.defaults.editors, {
        //下拉多选
        mulcombobox:{
            /*
             注: 如果已经处理编辑状态, 不要重复beginEdit,或者endEdit/acceptChanges之后马上再beginEdit,不然easyui初始化的时候会出错
             if (page.lastEditIndex == rowIndex) {    //这里不返回,mulcombobox会报错
             return;
             }
             * */
            init:function (container, options) {
                var input = $('<input type="text">').appendTo(container);
                if (options) {
                    options.multiple = true;
                } else {
                    options = {
                        multiple:true
                    }
                }
                input.combobox(options);
                return input;
            },
            getValue:function (target) {
                return $(target).combobox("getValues");
            },
            setValue:function (target, value) {
                $(target).combobox("setValues", value);
            },
            resize:function (target, width) {
                $(target).combobox("resize", width);
            }
        }
    });
    if ($.fn.portlet)
        $.extend($.fn.portlet.defaults, {
            openMoreUrl:function (title, url) {
                coco.page.dom.cocoOpenWindow({
                    url:url,
                    title:title
                })
            }
        });
});
/**
 * 常用工具类
 */
window.$$utils = coco.utils = {
    gotoUrl:function (url) {
        window.location.href = this.getFullUrl(url);
    },
     /*ajax同步查询*/
    ajaxPost:function (url, param) {
        var rtdata = null;
        $.ajax({
            type:"POST",
            url:$$utils.getFullUrl(url),
            data:param,
            dataType:"json",
            async:false,
            success:function (data) {
                rtdata = data;
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.responseText.indexOf('jsp/sys/main/login.js') >= 0) {
                    location.href = coco.options.contextPath + "/login/login.vm";
                }
            }
        });
        return rtdata;
    },
        /*ajax异步查询*/
    ajaxPostAsnc:function (url, param, callback,requestCount) {
        var rtdata = null;
        $.ajax({
            type:"POST",
            url:$$utils.getFullUrl(url),
            data:param,
            dataType:"json",
            async:true,
            success:function (data) {
                rtdata = data;
                callback.call(this, data,requestCount);
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.responseText.indexOf('jsp/sys/main/login.js') >= 0) {
                    location.href = coco.options.contextPath + "/login/login.vm";
                }
            }
        });
        return requestCount;
    },
    ajaxPostData:function (url, data, fn) {
        var rtdata = this.ajaxPost(url, {data:$$json.stringify(data)});
        if (this.checkReturn(rtdata) && fn) fn(rtdata.data != undefined ? rtdata.data : rtdata);
    },
    getFullUrl:function (url) {
        if ($$str.isEmpty(url)) return "about:blank";
        if (url.indexOf("://") >= 0) return url;
        if (url.startsWith("/") || url.startsWith(".")) return coco.options.contextPath +  url;
        return url;
    },
    download:function (url, param) {
        //产生一个隐藏帧用于提交
        var iFrameName = "dynamicExp_iFrame";
        var iframeObj = document.getElementById(iFrameName);
        if (iframeObj == null || iframeObj == undefined) {
            iframeObj = document.createElement("iframe");
            iframeObj.id = iFrameName;
            iframeObj.name = iFrameName;
            iframeObj.visibility = "hidden";
            iframeObj.width = 0;
            iframeObj.height = 0;
            iframeObj.frameborder = 0;
            document.body.appendChild(iframeObj);
        }
        var target = iframeObj.id;

        //create a form
        var formName = "dynamicExp_Form";
        var tempForm = document.getElementById(formName);
        if (tempForm == null || tempForm == undefined) {
            tempForm = document.createElement("form");
            tempForm.id = formName;
            tempForm.name = formName;
            document.body.appendChild(tempForm);
            tempForm.method = "post";
        }
        tempForm.target = target;
        tempForm.action = url;

        var otherClientData_Name = "dynamicExp_otherClientData";
        var otherClientDataInput = document.getElementById(otherClientData_Name);
        if (otherClientDataInput == null || otherClientDataInput == undefined) {
            otherClientDataInput = document.createElement("input");
            otherClientDataInput.id = otherClientData_Name;
            otherClientDataInput.name = "data";
            otherClientDataInput.type = "hidden";
            tempForm.appendChild(otherClientDataInput);
        }
        otherClientDataInput.value = $$json.stringify(param);
        //submit the form
        tempForm.submit();
    },
    exportExcel:function (datagrid, headerStr, title) {
        $$msg.showWait("正在处理数据，请稍候...");
        setTimeout(function () {
            try {
                $$utils.exportExcelEx(datagrid, headerStr, title);
            } finally {
                $$msg.closeWait();
            }
        }, 1);
    },
    getExcelModel:function (datagrid, headerStr, title,isExpExcel) {
        //格式化colspan或rowspan值
        function getSpanValue(span) {
            if (span && span > 0) return span;
            return 1;
        }

        //解析datagrid的columns
        function anazyCols(cols, model) {
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

            //从列生成header
            function col2Header(col, rowIndex, colIndex) {
                return {
                    title:getExpText(col.title), //标题
                    colspan:getSpanValue(col.colspan),
                    rowspan:getSpanValue(col.rowspan),
                    row:rowIndex, //开始行，从0开始
                    col:colIndex, //开始列，从1开始，0列是序号列
                    isLeaf:$$str.isNotEmpty(col.field)
                };
            }

            //解析跨单元格的列
            function anazySub(h, index) {
                var subcols = cols[index];
                var rowIndex = h.row + 1, colIndex = h.col;
                var i = 0, len = h.colspan;
                while (i < len) {
                    var col = subcols[0];
                    subcols.splice(0, 1);
                    //有checkbox的列或操作列或没有列标题，忽略
                    if (col.checkbox || col.opt || !col.title) {
                        h.colspan--;
                        i++;
                        continue;
                    }
                    var t = col2Header(col, rowIndex, colIndex);
                    model.header.push(t);
                    if (col.field) model.columns.push(col);
                    else anazySub(t, index + 1);
                    colIndex = colIndex + t.colspan;
                    i += t.colspan;
                }
            }

            if (!cols || cols.length == 0) return;
            var temp = cols, col;
            //将列完全复制一份出来，稍后有删除操作，不要影响grid原生的列定义
            cols = [];
            var i, len;
            for (i = 0, len = temp.length; i < len; i++) cols.push(temp[i].concat());

            var rowIndex = 0, colIndex = model.header.length;
            for (i = 0, len = cols[0].length; i < len; i++) {
                col = cols[0][i];
                //有checkbox的列或操作列或没有列标题，忽略
                if (col.checkbox || col.opt || !col.title || col.notprint) continue;
                var t = col2Header(col, rowIndex, colIndex);
                model.header.push(t);
                if (col.field) model.columns.push(col);
                else anazySub(t, 1);
                colIndex = colIndex + t.colspan;
            }
        }

        //分析grid，解析出header，有效字段列等信息
        var grid = $("#" + datagrid);
        var model = {
            header:[], //列头
            columns:[]//有效列
        };
        var opts = grid.datagrid("options");
        if ($$str.isEmpty(title)) title = opts.title;
        //解析列头及有效列名
        model.headerRowCount = Math.max(opts.frozenColumns?opts.frozenColumns.length:0, opts.columns.length);
        //序号开始值
        model.rownum = (opts.pageNumber - 1) * opts.pageSize;
        if(!isExpExcel)
        model.header.push({
            title:"序号", //标题
            colspan:1,
            rowspan:model.headerRowCount,
            row:0,
            col:0,
            isLeaf:true
        });
        anazyCols(opts.frozenColumns, model);
        anazyCols(opts.columns, model);
        model.headerStr = headerStr;
        model.title = title;
        //pdf导出
        var tmp1=[],tmp2=[];
        $.each(model.header, function(i, n){
            if(n.rowspan>1 || n.colspan>1){
                tmp1.push(n);
            }else{
                tmp2.push(n);
            }
        });
        model.header=tmp1.concat(tmp2);
        return model;
    },
    //前端js导出
    exportExcelEx:function (datagrid, headerStr, title) {
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

        //写合并单元格数据
        function writeMergeCell(opt) {
            opt = $.extend({
                horzAlign:-4108, //居中
                fontSize:9
            }, opt || {});
            oSheet.Cells(opt.fromRow, opt.fromCol).value = getExpText(opt.str);
            oSheet.Cells(opt.fromRow, opt.fromCol).HorizontalAlignment = opt.horzAlign;
            //有合并单元格
            if (opt.endRow > opt.fromRow || opt.endCol > opt.fromCol) {
                oSheet.Range(oSheet.Cells(opt.fromRow, opt.fromCol), oSheet.Cells(opt.endRow, opt.endCol)).Merge();
                oSheet.Range(oSheet.Cells(opt.fromRow, opt.fromCol), oSheet.Cells(opt.endRow, opt.endCol)).Font.Size = opt.fontSize;
                oSheet.Range(oSheet.Cells(opt.fromRow, opt.fromCol), oSheet.Cells(opt.endRow, opt.endCol)).Font.Bold = opt.fontBold == true;
            }
        }

        var grid = $("#" + datagrid);
        if (grid.length == 0) {
            $$msg.slideError("没有可处理的表格！");
            return;
        }

        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var oSheet = oWB.Worksheets(1);

        var model = $$utils.getExcelModel(datagrid, headerStr, title);
        model.data = grid.datagrid("getRows");
        title = model.title;
        //行数
        var rowCount = model.data.length + model.headerRowCount;
        if ($$str.isNotEmpty(title)) rowCount++;
        if ($$str.isNotEmpty(headerStr)) rowCount++;
        //总列数，加上序号列
        var colCount = model.columns.length + 1;
        oSheet.Range(oSheet.Cells(1, 1), oSheet.Cells(rowCount, colCount)).NumberFormat = "@";
        oSheet.Range(oSheet.Cells(1, 1), oSheet.Cells(rowCount, colCount)).Font.Size = 9;

        //导出表头
        var rowIndex = 1, colIndex = 1;
        //写入标题行
        if (!$$str.isEmpty(title)) {
            writeMergeCell({
                str:title,
                fromRow:rowIndex,
                fromCol:colIndex,
                endRow:rowIndex,
                endCol:colIndex + colCount - 1,
                horzAlign:-4108, //居中
                fontSize:16,
                fontBold:true
            });
            rowIndex++;
        }
        //写入表头上方说明文字,一般为查询条件等
        if (!$$str.isEmpty(headerStr)) {
            writeMergeCell({
                str:headerStr,
                fromRow:rowIndex,
                fromCol:colIndex,
                endRow:rowIndex,
                endCol:colIndex + colCount - 1,
                horzAlign:-4131, //居左
                fontSize:9
            });
            rowIndex++;
        }
        //写列标题
        var i, len;
        for (i = 0, len = model.header.length; i < len; i++) {
            var h = model.header[i];
            writeMergeCell({
                str:h.title,
                fromRow:h.row + rowIndex,
                fromCol:h.col + colIndex,
                endRow:h.isLeaf ? model.headerRowCount - 1 + rowIndex : h.row + h.rowspan - 1 + rowIndex,
                endCol:h.col + h.colspan - 1 + colIndex
            });
        }
        rowIndex += model.headerRowCount;
        var collen = model.columns.length, isAmountStr;
        //写数据
        for (i = 0, datalen = model.data.length; i < datalen; i++) {
            var curRowIndex = rowIndex + i, curRow = model.data[i];
            oSheet.Cells(curRowIndex, 1).value = model.rownum + i + 1;
            colIndex = 2;
            for (var j = 0; j < collen; j++) {
                var col = model.columns[j];
                var tCell = oSheet.Cells(curRowIndex, j + colIndex);
                var value = curRow[col.field];
                if (col.formatter) value = col.formatter(value, curRow, i);
                value = getExpText(value);
                if (col.align == "right") tCell.HorizontalAlignment = -4152;
                else if (col.align == "center") tCell.HorizontalAlignment = -4108;
                else tCell.HorizontalAlignment = -4131;
                tCell.value = value;
            }
        }

        oSheet.Rows.AutoFit;
        oSheet.Columns.AutoFit;
        oSheet.Range(oSheet.Cells(rowIndex - model.headerRowCount, 1), oSheet.Cells(rowCount, colCount)).Borders.LineStyle = 1;
        oXL.ScreenUpdating = true;
        oXL.Visible = true;

    },
    //后台java导出
    exportDataExA:function (datagrid, headerStr, title,formId) {
        function __expData(isAll) {
            $$msg.showWait("正在导出数据，请稍候...");
            var param = {model:$$utils.getExcelModel("tbList", headerStr, title)};
            var queryParams = coco.page.model.getCardDataJson(formId);
            $.extend(param, queryParams);
            var opts = $("#tbList").datagrid("options");

            if (!isAll) {
                $.extend(param, {
                    page:opts.pageNumber,
                    rows:opts.pageSize
                });
            } else {
                $.extend(param, {
                    page:0,
                    rows:0
                });
            }

            if (opts.sortName&&opts.sortName.length >0) {
                $.extend(param, {
                    sort:opts.sortName,
                    order:opts.sortOrder
                });
            }
            $$utils.download("export.vm", param);
            $$msg.closeWait();
        }

        if ($("#tbList").datagrid("options").pagination) {
            if (!coco.options.expDialogInited) {
                var t = $("#__dlgExp");
                if (t.length == 0) {
                    $('<div style="display: none;"><div id="__dlgExp" style="width:100px;">\
        <span><br>&nbsp;&nbsp;&nbsp;&nbsp;即将开始导出列表数据到Excel。<br>&nbsp;&nbsp;&nbsp;&nbsp;根据数据量的大小，此操作将花费您几分钟或更长的时间，请耐心等待...</span><br><br>\
        <input type="radio" id="__exp_cur" name="__exp_xls" checked><label for="__exp_cur">导出当前页</label><br>\
        <input type="radio" id="__exp_All" name="__exp_xls"><label for="__exp_All">导出所有页</label>\
    </div></div>').appendTo('body');
                    t = $("#__dlgExp");
                }
                t.dialog({
                    width:300,
                    height:200,
                    title:"导出Excel",
                    modal:true,
                    draggable:true,
                    closable:true,
                    buttons:[
                        {
                            text:'确定',
                            handler:function () {
//                                $("#exportChoose").dialog("close");
                                $("#__dlgExp").dialog("close");
                                __expData($("#__exp_All").prop("checked"));
                            }
                        },
                        {
                            text:'取消',
                            handler:function () {
                                $("#__dlgExp").dialog("close");
                            }
                        }
                    ]
                });
                coco.options.expDialogInited = true;
            }
            $("#__dlgExp").dialog("open");
        } else __expData(true);
    },

    //后台java导出
    exportExcelExA:function (datagrid, headerStr, title,queryParams) {
        function __exp(isAll) {
            $$msg.showWait("正在处理导出数据，请稍候...");
            var param =  $.extend(queryParams,{model:$$utils.getExcelModel(datagrid, headerStr, title)});
            var opts = $("#" + datagrid).datagrid("options");

            if (!isAll) {
                $.extend(param, {
                    page:opts.pageNumber,
                    rows:opts.pageSize
                });
            } else {
                $.extend(param, {
                    page:0,
                    rows:0
                });
            }

            if (opts.sortName&&opts.sortName.length >0) {
                $.extend(param, {
                    sort:opts.sortName,
                    order:opts.sortOrder
                });
            }
            $$utils.download("export.vm", param);
            $$msg.closeWait();
        }

        if ($("#" + datagrid).datagrid("options").pagination) {
            if (!coco.options.expDialogInited) {
                var t = $("#__dlgExp");
                if (t.length == 0) {
                    $('<div style="display: none;"><div id="__dlgExp" style="width:100px;">\
        <span><br>&nbsp;&nbsp;&nbsp;&nbsp;即将开始导出列表数据到Excel。<br>&nbsp;&nbsp;&nbsp;&nbsp;根据数据量的大小，此操作将花费您几分钟或更长的时间，请耐心等待...</span><br><br>\
        <input type="radio" id="__exp_cur" name="__exp_xls" checked><label for="__exp_cur">导出当前页</label><br>\
        <input type="radio" id="__exp_All" name="__exp_xls"><label for="__exp_All">导出所有页</label>\
    </div></div>').appendTo('body');
                    t = $("#__dlgExp");
                }
                t.dialog({
                    width:300,
                    height:200,
                    title:"导出Excel",
                    modal:true,
                    draggable:true,
                    closable:true,
                    buttons:[
                        {
                            text:'确定',
                            handler:function () {
                                $("#__dlgExp").dialog("close");
                                __exp($("#__exp_All").prop("checked"));
                            }
                        },
                        {
                            text:'取消',
                            handler:function () {
                                $("#__dlgExp").dialog("close");
                            }
                        }
                    ]
                });
                coco.options.expDialogInited = true;
            }
            $("#__dlgExp").dialog("open");
        } else __exp(true);
    },
    topWin:function () {
        return (function (p, c) {
            while (p != c) {
                c = p;
                p = p.parent;
            }
            return c
        })(window.parent, window);
    },
    checkReturn:function (rt) {
        if (!rt) {
            $$msg.slideMsg("请求失效。请刷新页面再试。");
            return false;
        }
        if (rt.state == false) {
            $$msg.slideMsg(rt.msg);
            return false;
        }
        return true;
    },
    unionObject:function (o1, o2) {
        return $.extend(o1, o2 || {});
    } ,
    //深度克隆，适合所有js对象
    clone:function(target){
        var objClone;
        if(target.constructor==Object){
            objClone=new target.constructor
        }else{
            objClone=new target.constructor(target.valueOf());
        }
        for(var key in target){
            if(objClone[key]!=target[key]){
                if(typeof(target[key]) =='object'){
                    objClone[key]=arguments.callee(target[key]);
                }else{
                    objClone[key]=target[key];
                }
            }
        }
        return objClone;
    }
};
window.$$msg = coco.utils.msg = {
    formatStr:function (str) {
        return str.replace("\n", "<br>");
    },
    alert:function (str, fn, type) {
        $.messager.alert($("TITLE").html(), this.formatStr(str), type, fn);
    },

    confirm:function (str, fn) {
        $.messager.confirm($("TITLE").html(), this.formatStr(str), fn);
    },

    alertFocus:function (str, id) {
        this.alert(str, "info", function () {
            coco.page.dom.focusSel(id);
        })
    },

    error:function (str, fn) {
        $.messager.alert($("TITLE").html(), this.formatStr(str), "error", fn);
    },

    show:function (str, options) {
        if (options) {
            $.messager.show(options);
        } else {
            $.messager.show({title:$("TITLE").html(), msg:this.formatStr(str)});
        }
    },
    showWait:function (msg, fn) {
        var win = $("#__coco_sys_waiter");
        if (win.length == 0) {
            $("<div id='__coco_sys_waiter' style='position:absolute;left:0;width:100%;height:100%;top:0;background:#E0ECFF;z-index:9999;opacity:0.8;filter:alpha(opacity=80)'>\
            <div id='___coco_sys_waiter_txt' class='coco_loading'>" + msg + "</div></div>").appendTo('body');
        } else {
            $("#___coco_sys_waiter_txt").html(msg);
            win.show();
        }
        if (fn) setTimeout(function() {
            fn();
            $$msg.closeWait();
        }, 0);
    },
    closeWait:function () {
//        $("#__coco_sys_waiter").window("close");
        $("#__coco_sys_waiter").hide();
    },
    slideClose:function () {
        var t = /*$$utils.topWin().*/$("#sys__slide");
        if (t.length == 0) return;
        var win = t.parent();
        win.window("close");
    },
    slideMsg:function (msg) {
        this.slideClose();
       /* $$utils.topWin().*/$.messager.show({
            msg:"<span id='sys__slide'>" + msg + "</span>",
            title:"提示",
            width:300,
            height:150,
            showSpeed:0,
            timeout:3000
        });
    },
    slideError:function (msg) {
        this.slideClose();
       /* $$utils.topWin().*/$.messager.show({
            msg:"<span id='sys__slide' style='color: red;'>" + msg + "</span",
            title:"警告",
            width:300,
            height:150,
            showSpeed:0,
            timeout:0
        });
    }
};
/**
 * 字符串相关工具方法
 */
window.$$str = coco.utils.str = {
    //去掉前后空格
    trim:function (strInput) {
        strInput = strInput + "";
        return strInput.replace(/(^\s*)|(\s*$)/g, "");
    },
    //函数功能: 检查输入字符串是否是null或"",strInput 判断的数据
    isEmpty:function (strInput) {
        return strInput == null || (strInput + "") == "";
    },
    //函数功能: 检查输入字符串是否是null或"",strInput 判断的数据
    isNotEmpty:function (strInput) {
        return !(strInput == null || (strInput + "") == "");
    },
    isEmptyStr:function (str) {
        return this.isEmpty(str) || str == "-" || str == "null";
    },
    //函数功能: 将字符串转为Double
    to_double:function (inputString) {
        if (inputString == null || (inputString + "").length == 0) {
            return 0.0;
        }
        var tmpvar = parseFloat((inputString + "").replace(/\,/g, ""));
        if (isNaN(tmpvar)) {
            return 0.0;
        } else {
            return tmpvar;
        }
    },
    to_integer:function (inputString) {
        if (inputString == null) {
            return 0;
        }
        inputString = this.removeLeadingChar(inputString + "", "0");
        var tmpvar = parseInt(inputString);
        if (isNaN(tmpvar)) {
            return 0;
        } else {
            return tmpvar;
        }
    },
    //函数功能: 删除前导字符,inputString 判断的字符,removeChar 要删除的前导字符
    removeLeadingChar:function (inputString, removeChar) {
        if (this.isEmpty(inputString)) return "";
        if (this.isEmpty(removeChar)) return inputString;
        var returnString = inputString;
        if (removeChar.length > 0) {
            while (returnString.charAt(0) == removeChar) {
                returnString = returnString.substring(1, returnString.length);
            }
        }
        return returnString;
    },
    //替换字符串[]包含的部分
    replaceField:function (express, transFunc) {
        var keyBegin = 0, keyEnd = 0, fn;
        while (true) {
            keyBegin = express.indexOf("[", keyBegin);
            if (keyBegin < 0) break;
            keyEnd = express.indexOf("]", keyBegin);
            if (keyEnd <= keyBegin) break;
            keyBegin++;
            fn = express.substring(keyBegin, keyEnd);
            fn = transFunc(fn);

            express = express.substring(0, keyBegin - 1) + fn + express.substring(keyEnd + 1);
        }
        return express;
    },
    //返回连续的串,str 连续的串， length 连续次数
    string:function (str, length) {
        var result = "";
        for (var i = 1; i <= length; i++) {
            result += str;
        }
        return result;
    },
    checkNull:function (str) {
        if (str == null) return "";
        return str;
    },
    checkEmpty:function (str, def) {
        if (this.isEmpty(str)) return def;
        return str + '';
    },
    leftStr:function (str, lngL) {
        if (lngL > str.length) lngL = str.length;
        return str.substr(0, lngL);
    },
    rightStr:function (str, lngL) {
        return str.substr(str.length - lngL, lngL);
    },
    toCAPSAmount:function (inputString) {//函数功能: 将小写金额转换为大写,inputString 要转换的数字
        //函数功能: 将小写数字字符转换为大写,inputString 要转换的数字;返回值: 转换后的字符串
        function CAPSCHAR(inputString) {
            var r;
            switch (inputString) {
                case "0":
                    r = "零";
                    break;
                case "1":
                    r = "壹";
                    break;
                case "2":
                    r = "贰";
                    break;
                case "3":
                    r = "叁";
                    break;
                case "4":
                    r = "肆";
                    break;
                case "5":
                    r = "伍";
                    break;
                case "6":
                    r = "陆";
                    break;
                case "7":
                    r = "柒";
                    break;
                case "8":
                    r = "捌";
                    break;
                case "9":
                    r = "玖";
                    break;
                default:
                    r = "";
            }
            return r;
        }

        //函数功能: 得到金额单位，最后一位元需要自动加入,iLength 当前数字是第几位,从个位开始
        function AmountUnit(iLength) {
            var r;
            var mod = iLength % 4;
            switch (mod) {
                case 0:
                    r = "仟";
                    break;
                case 2:
                    r = "拾";
                    break;
                case 3:
                    r = "佰";
                    break;
                default:
                    switch (iLength) {
                        case  1:
                            r = "元";
                            break;
                        case  9:
                            r = "亿";
                            break;
                        case 17:
                            r = "兆";
                            break;
                        default:
                            r = "万";
                    }
            }
            return r;
        }

        if (inputString == undefined) return "";
        inputString = (inputString + "").replace(/\,/g, "");
        var instring = "" + inputString;
        if (this.isEmpty(instring)) return "";

        var j = instring.indexOf(".");
        var strDot = "";
        //小数部分
        var strInt = instring;
        //整数部分
        var strDotCAPS = "";
        //小数部分(返回)
        var strIntCAPS = "";
        //整数部分(返回)
        var strResult = "";
        if (j > 0) {
            strDot = instring.slice(j + 1);
            //得到小数部分(设置为两位)
            strInt = instring.substring(0, j);
            //得到整数部分
            //两位小数
            if (strDot.length > 2) {
                strDot = strDot.substring(0, 2);
            }
            if (strDot.substring(1, 2) == "0") {
                strDot = strDot.substring(0, 1);
                if (strDot.substring(0, 1) == "0") strDot = "";
            }
        }
        //角,分
        if (strDot.length == 2) {
            strDotCAPS = CAPSCHAR(strDot.substring(0, 1)) + "角" +
                CAPSCHAR(strDot.substring(1, 2)) + "分";
        } else if (strDot.length == 1) {
            strDotCAPS = CAPSCHAR(strDot.substring(0, 1)) + "角";
        } else {
            strDotCAPS = "整";
        }
        //整数部分
        for (var i = 0; i < strInt.length; i++) {
            var strTemp = strInt.substring(i, i + 1);
            var iLen = strInt.length - i;
            if (strTemp == "-" && i == 0) {
                strIntCAPS = "负";
            } else {
                strIntCAPS = strIntCAPS + CAPSCHAR(strTemp) + AmountUnit(iLen);
            }
        }
        //整数末尾如果没有元则加上
        if (this.trim(strIntCAPS) != "") {
            if (strIntCAPS.lastIndexOf("元") == -1) strIntCAPS = strIntCAPS + "元";
        }
        if (strDot != "") {
            if (strInt.substring((strInt.length - 2), strInt.length) == "00") strIntCAPS = strIntCAPS + "零";
        }
        //返回值
        strResult = strIntCAPS + strDotCAPS
        //对返回值作处理
        if (strInt != "0") {
            strResult = strResult.replace(/零仟|零佰|零拾|零角|零分/g, "零");
        } else {
            strResult = strResult.replace(/零仟|零佰|零拾|零角|零分/g, "");
        }
        //去掉连续的零
        while (strResult.indexOf("零零") != -1) {
            strResult = strResult.replace(/零零/g, "零");
        }
        strResult = strResult.replace(/零元/g, "元");
        //去掉首尾的零
        strResult = strResult.replace(/(^零*)|(零*$)/g, "");
        strResult = strResult.replace(/零兆零亿零万/g, "兆");
        strResult = strResult.replace(/零兆零亿/g, "兆");
        strResult = strResult.replace(/零兆零万/g, "兆");
        strResult = strResult.replace(/零亿零万/g, "亿");
        strResult = strResult.replace(/零兆/g, "兆");
        strResult = strResult.replace(/零亿/g, "亿");
        strResult = strResult.replace(/零万/g, "万");
        strResult = strResult.replace(/负元/g, "负");
        strResult = strResult.replace(/亿万/g, "亿");
        strResult = strResult.replace(/^元*/g, "");
        //OK
        if (strResult == "整") {
            return "";
        } else {
            return  strResult;
        }
    },
    //检查输入字符串是否仅包含"0123456789.-," return: 如果是返回小数位长度的0串，返回"N"代表不是数字
    isAmountStr:function (s) {
        if ($$str.isEmpty(s))return "N";
        // 字符串中仅有下列字符，则字符串为数字
        var allNumber = "0123456789.-,";
        var count = "", haveXS = false;
        for (var i = 0, len = s.length; i < len; i++) {
            var ch = s.charAt(i);
            var j = allNumber.indexOf(ch);
            if (j < 0) {
                return "N";
            }
            if (ch == ".") {
                haveXS = true;
            } else if (ch == "-" && i > 0) {
                return "N";
            } else {
                if (haveXS)count += "0";
            }
        }
        return count;
    },
    /*字符串加密*/
    encrypt:function (txt) {
        if (!txt) return txt;
        var rt = [];
        var i, s, l = txt.length;
        s = (l + 10).toString(36);
        rt.push((s.length + 10).toString(21) + s);
        for (i = 0; i < l; i++) {
            s = (txt.charCodeAt(i) + (i + 1) * 10 + l).toString(36);
            rt.push((s.length + 10).toString(21) + s);
        }
        return rt.join('');
    },
    encode64: function (input) {
        var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
            + "wxyz0123456789+/" + "=";
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    },
// base64加密结束
    /*解密*/
    decrypt:function (txt) {
        var rt = [];
        var i, l, l1, s, n = 1, srclen = 0;
        for (i = 0, l = txt.length; i < l;) {
            l1 = parseInt(txt.charAt(i), 21) - 10;
            s = txt.substr(++i, l1);
            if (i > 1) {
                rt.push(String.fromCharCode(parseInt(s, 36) - n * 10 - srclen));
                n++;
            } else {
                srclen = parseInt(s, 36) - 10;
            }
            i += l1;
        }
        return rt.join('');
    },
    //小数处理
    fnmber:function (num, pattern) {
        var strarr = num ? num.toString().split('.') : ['0'];
        var fmtarr = pattern ? pattern.split('.') : [''];
        var retstr = '';

        // 整数部分
        var str = strarr[0];
        var fmt = fmtarr[0];
        var i = str.length - 1;
        var comma = false;
        for (var f = fmt.length - 1; f >= 0; f--) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    break;
                case '0':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    else retstr = '0' + retstr;
                    break;
                case ',':
                    comma = true;
                    retstr = ',' + retstr;
                    break;
            }
        }
        if (i >= 0) {
            if (comma) {
                var l = str.length;
                for (; i >= 0; i--) {
                    retstr = str.substr(i, 1) + retstr;
                    if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
                }
            }
            else retstr = str.substr(0, i + 1) + retstr;
        }

        retstr = retstr + '.';
        // 处理小数部分
        str = strarr.length > 1 ? strarr[1] : '';
        fmt = fmtarr.length > 1 ? fmtarr[1] : '';
        i = 0;
        for (var f = 0; f < fmt.length; f++) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    break;
                case '0':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    else retstr += '0';
                    break;
            }
        }
        return retstr.replace(/^,+/, '').replace(/\.$/, '');
    },
    formatNumber2Dig:function (number, ignoreZero) {//返回数字型显示，保留2位小数
        if (undefined == ignoreZero) ignoreZero = false;
        if (undefined == number || null == number) return 0.00;
        var p = '#######0.00';
        var n = this.replaceAll("" + number, ",", "");
        if ($$math.isNumber(n)) { //四舍五入,保留两位小数
            var tv = this.fnmber(Math.round(n * 100) / 100, p);
            if (0 == tv) {
                return ignoreZero == true ? "" : 0.00;
            } else {
                return tv;
            }
        } else {
            return ignoreZero == true ? "" : 0.00;
        }
    },
    formatNumberByDig:function (number, bytdigit) {//返回数字型显示，保留指定位数小数
        if (undefined == number || null == number) {
            return this.rytdigitReplace(number, bytdigit);
        } else {
            return this.rytdigitReplace(number, bytdigit);
        }
    },
    rytdigitReplace:function (number, bytdigit) {
        var p, n;
        if (bytdigit == 0) {
            p = '#######0';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n), p);
            } else {
                return 0;
            }
        } else if (bytdigit == 1) {
            p = '#######0.0';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 10) / 10, p);
            } else {
                return 0.0;
            }
        } else if (bytdigit == 2) {
            p = '#######0.00';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 100) / 100, p);
            } else {
                return 0.00;
            }
        } else if (bytdigit == 3) {
            p = '#######0.000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 1000) / 1000, p);
            } else {
                return 0.000;
            }
        } else if (bytdigit == 4) {
            p = '#######0.0000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 10000) / 10000, p);
            } else {
                return 0.0000;
            }
        } else if (bytdigit == 5) {
            p = '#######0.00000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 100000) / 100000, p);
            } else {
                return 0.00000;
            }
        } else if (bytdigit == 6) {
            p = '#######0.000000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 1000000) / 1000000, p);
            } else {
                return 0.000000;
            }
        } else if (bytdigit == 7) {
            p = '#######0.0000000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 10000000) / 10000000, p);
            } else {
                return 0.0000000;
            }
        } else if (bytdigit == 8) {
            p = '#######0.00000000';
            n = this.replaceAll("" + number, ",", "");
            if ($$math.isNumber(n)) { //四舍五入,保留两位小数
                return this.fnmber(Math.round(n * 100000000) / 100000000, p);
            } else {
                return 0.00000000;
            }
        }
        return n;
    },
    replaceAll:function (s1, s2, s3) {
        var r = new RegExp(s2.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
        return s1.replace(r, s3);
    }
};

/**
 * 日期时间方法，对应coco6.utildatetime.js
 */
window.$$date = coco.utils.date = {

    //函数功能: 检查年月日是否有效,inputYear, inputMonth, inputDay 年月日串;showTip  是否显示提示
    isDateValue:function (inputYear, inputMonth, inputDay, isAlert) {
        if (isAlert == null) {
            isAlert = true;
        }
        // 有日期无月份或者有月份无年份，则日期格式错误
        if (inputYear.length == 0 && inputMonth.length == 0 && inputDay.length == 0) {
            return true;
        }
        if ((inputYear.length == 0 && inputMonth.length != 0) || (inputMonth.length == 0 && inputDay.length != 0)) {
            return false;
        }
        inputYear = inputYear.replace(/^0+/, '');
        inputMonth = inputMonth.replace(/^0+/, '');
        inputDay = inputDay.replace(/^0+/, '');
        // 年月日不是整数，则日期格式错误
        if (!$$math.isPureNumber(inputYear)) {
            return false;
        }
        if (!$$math.isPureNumber(inputMonth)) {
            return false;
        }
        if (!$$math.isPureNumber(inputDay)) {
            return false;
        }
        // 年份不是4位，则日期格式错误
        if (inputYear.length != 4) {
            return false;
        }
        // 无月份则不进行月份判断
        if (inputMonth.length == 0) {
            return true;
        }
        // 月份不是在1-12之间，则日期格式错误
        if ($$str.to_integer(inputMonth) < 1 || $$str.to_integer(inputMonth) > 12) {
            if (isAlert)  $$msg.alert("月份不在1-12之间，请重新输入！");
            return false;
        }
        // 逐月判断日期数值，出现非法值则日期格式错误
        // 无日期则不进行日期判断
        if (inputDay.length == 0) {
            return true;
        }
        if (inputDay == '00') {
            if (isAlert) $$msg.alert("日期不能小于1,请重新输入！");
            return false;
        }
        // 日期最大值为31日的月份判断
        var intMonth = $$str.to_integer(inputMonth);
        if (intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 ||
            intMonth == 8 || intMonth == 10 || intMonth == 12) {
            if ($$str.to_integer(inputDay) > 31) {
                if (isAlert) $$msg.alert("本月份日期不应大于31日，请重新输入！");
                return false;
            }
        }
        // 日期最大值为30日的月份判断
        if (intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) {
            if ($$str.to_integer(inputDay) > 30) {
                if (isAlert) $$msg.alert("本月份日期不应大于30日，请重新输入！");
                return false;
            }
        }
        // 润年的日期处理
        if (intMonth == 2) {
            if ($$str.to_integer(inputDay) > 28) {
                if (($$str.to_integer(inputYear) % 4) == 0 && $$str.to_integer(inputDay) == 29) {
                    return true;
                } else {
                    if (isAlert) $$msg.alert("2月份无此日期，请重新输入！");
                    return false;
                }
            }
        }
        return true;
    },
    /* 函数功能: 检查输入的日期的格式是否为指定的格式(YYYYMMDD,YYYYMM, YYYY-MM, YYYY-MM-DD, YYYY-MM-DD:HH)
     入口参数: inputString:源,   subString 子串, showTip 是否显示提示
     函数返回：是日期格式返回true;
     */
    //alert处理, validate有调用
    isDateFormat:function (inputString, format, isAlert) {
        //子函数，提示日期格式不正确
        function showAlert(format, isAlert) {
            if (isAlert) $$msg.alert("日期格式错误！正确格式为:" + format);
        }

        inputString = inputString + "";
        if (isAlert == undefined || isAlert == null) {
            isAlert = false;
        }
        if (format == undefined || isAlert == null) {
            format = "YYYY-MM-DD";
        }
        if ($$str.isEmpty(inputString)) {
            showAlert(format, isAlert);
            return false;
        }
        if (format == "YYYY-MM-DD") {
            var x = inputString.match(/\d{4}-\d{2}-\d{2}/);
            if (x == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5, 7), inputString.substring(8), isAlert);
        } else if (format == "YYYYMMDD") {
            if (inputString.match(/\d{8}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(4, 6), inputString.substring(6), isAlert);
        } else if (format == "YYYY-MM") {
            if (inputString.match(/\d{4}-\d{2}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5), "01", isAlert);
        } else if (format == "YYYYMM") {
            if (inputString.match(/\d{6}/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(4), "01", isAlert);
        } else if (format == "YYYY-MM-DD:HH") {
            if (inputString.match(/\d{4}-\d{2}-\d{2}:[0-5][0-9]/) == null) {
                showAlert(format, isAlert);
                return false;
            }
            return this.isDateValue(inputString.substring(0, 4), inputString.substring(5, 7), inputString.substring(8, 10), isAlert);
        } else {
            if (isAlert) $$msg.alert("传入的验证格式[" + format + "]未定义");
            return false;
        }
    },
    //函数功能: 检查输入的时间的格式是否为指定的格式(HH:MM:SS):inputString:源,showTip 是否显示提示;函数返回：是时间格式返回true;
    isTimeFormat:function (inputString) {
        if ($$str.isEmpty(inputString) || inputString.length != 8) {
            return false;
        }
        return inputString.match(/[0-2][0-3]:[0-5][0-9]:[0-5][0-9]/) != null;
    },
    //函数功能: 日期和时间格式检查 YYYY-MM-DD HH:MM:SS
    isDateTime:function (str) {
        var a = str.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
        if (a == null) return false;
        return !(a[2] >= 13 || a[3] >= 32 || a[4] >= 24 || a[5] >= 60 || a[6] >= 60);

    },
    dateToStr:function (date) {
        var m = date.getMonth() + 1, d = date.getDate();
        var strMyDate = m < 10 ? ("0" + m) : ("" + m);
        var strDate = d < 10 ? ("0" + d) : ("" + d);
        return date.getFullYear() + "-" + strMyDate + "-" + strDate;
    },
    strToDate:function (str) {
        var _date = new Date();
        _date.setFullYear(str.substr(0, 4));
        _date.setMonth(str.substr(5, 2) - 1, 1);
        _date.setDate(str.substr(8, 2));
        return _date;
    },
    getAddDays:function (str, days) {//得到指定日期,指定天数后的日期
        var uom = this.strToDate(str);
        var newtimems = uom.getTime() + (days * 24 * 60 * 60 * 1000);
        uom.setTime(newtimems);
        return this.dateToStr(uom);
    },
    getAddMonths:function (str, monthNum) {//计算给定的日期增加一定的月数后的新日期
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        return this.dateToStr(myDate);
    }, //计算给定的日期增加一定的月数后的新日期 - 1。如 2010-09-01，4 返回2010-12-31
    getAddMonthsDec1:function (str, monthNum) {
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        myDate.setDate(myDate.getDate() - 1);
        return this.dateToStr(myDate);
    },

//计算给定的日期增加一定的月数后的新日期
//返回日期没有开始日这一天(比如31日或者2月份),则返回日期为当月最后一天。
//如
//2011-01-30, 1 -> 2011-02-28
//2011-11-30, 1 -> 2011-12-30   //不用最后一天对应最后一天.
    getAddMonths_CareLastDate:function (str, monthNum) {
        if (monthNum == undefined || monthNum == '') return str;
        var myDate = this.strToDate(str);
        var intMonthNum = parseInt(monthNum);
        var myDayOfMonth = myDate.getDate();
        myDate.setMonth(myDate.getMonth() + intMonthNum, 1);
        var curMonth = myDate.getMonth();
        if (myDayOfMonth != myDate.getDate()) {  //特殊情况, 如2011-01-30 + 1个月 -> 2011-03-02
            // 把月份减1, 再将"天"赋值为 当月最后一天
            //2011-01-30, 1 = 2011-03-02  -> 2011-02-28
            //2010-01-31, 3 = 2010-05-01  -> 2011-04-30
            curMonth = curMonth - 1;
            var actualMaximumDay = getMonthDays(curMonth) //取得当月最大天数
            myDate.setMonth(curMonth, 1);
            myDate.setDate(actualMaximumDay);
        }
        return this.dateToStr(myDate);
    },
//取下一年份
    getNextYear:function () {
        return this.getNowYear() + 1
    },
//取前一年份
    getPerYear:function () {
        return this.getNowYear() - 1
    },
//有本周,本月,本季度,本年
    getNow:function () {
        var d = new Date();
        if (coco.options && coco.options.workDate) {
            var str = coco.options.workDate;
            d.setFullYear(str.substr(0, 4));
            d.setMonth(str.substr(5, 2) - 1, 1);
            d.setDate(str.substr(8, 2));
        }
        return d;
    },

    getNowYear:function () {
        return this.getNow().getFullYear();
    },
    getNowMonth:function () {
        return this.getNow().getMonth();
    },
    getNowDay:function () {
        return this.getNow().getDate();
    },

    getNowDayOfWeek:function () {
        return this.getNow().getDay();
    },
//获得某月的天数
    getMonthDays:function (myMonth) {
        var nowYear = this.getNowYear();
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    },
//获得本季度的开始月份
    getQuarterStartMonth:function () {
        var nowMonth = this.getNowMonth();
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    },
//获得当前日期
    getNowDateStr:function () {
        return this.dateToStr(this.getNow());
    },

    getNowDateTimeStr:function () {
        var now = this.getNow();
        var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
        var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
        return this.getNowDateStr() + " " + hour + ":" + minutes + ":" + second;
    },

//获得本周的开始日期
    getWeekStartDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth(), nowDay = d.getDate(), nowDayOfWeek = d.getDay();
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        return this.dateToStr(weekStartDate);
    },

//获得本周的结束日期
    getWeekEndDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth(), nowDay = d.getDate(), nowDayOfWeek = d.getDay();
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
        return this.dateToStr(weekEndDate);
    },

//获得本月的开始日期
    getMonthStartDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth();
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return this.dateToStr(monthStartDate);
    },

//获得本月的结束日期
    getMonthEndDate:function () {
        var d = this.getNow();
        var nowYear = d.getFullYear(), nowMonth = d.getMonth() + 1;
        d = new Date(nowYear, nowMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

    //根据指定日期 得到月的结束日期
    getMonthEndDateByDate:function (str) {
        var d = this.strToDate(str);
        var nowYear = d.getFullYear(), nowMonth = d.getMonth() + 1;
        d = new Date(nowYear, nowMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

//获得本季度的开始日期
    getQuarterStartDate:function () {
        var quarterStartDate = new Date(this.getNowYear(), this.getQuarterStartMonth(), 1);
        return this.dateToStr(quarterStartDate);
    },

//或的本季度的结束日期
    getQuarterEndDate:function () {
        var nowYear = this.getNowYear();
        var quarterEndMonth = this.getQuarterStartMonth() + 3;
        var d = new Date(nowYear, quarterEndMonth, 1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return this.dateToStr(d);
    },

//获得本年的开始日期
    getYearStartDate:function () {
        return this.getNowYear() + "-" + '01' + "-" + '01';
    },

//或的本年的结束日期
    getYearEndDate:function () {
        return this.getNowYear() + "-" + '12' + "-" + '31';
    }
};

window.$$math = coco.utils.math = {
    //函数功能: 考虑业务上的数据，判断一个double数据是否为0;
    isZero:function (dovalue) {
        return Math.abs($$str.to_double(dovalue)) <= 0.00001;
    },
    //是否>0
    isPlus:function (dovalue) {
        return Math.abs($$str.to_double(dovalue)) > 0.00001;
    },
    //是否<0
    isNegtive:function (dovalue) {
        var d = $$str.to_double(dovalue);
        return Math.abs(d) > 0.00001 && d < 0.00001;
    },
    // 比较double大小 @author:zuodp
    compare:function (firstNum, secondNum) {
        var db_diff = firstNum - secondNum;
        // 在可接受0范围内,就认为相等
        if (Math.abs(db_diff) < 0.00001)
            return 0;
        else if (db_diff < 0.00001)
            return -1;
        else
            return 1;
    },
    //函数功能: 判断当前页面的金额等数据是否大于数据库所能保存的数据
    isTooMaxValue:function (tip, value) {
        if (Math.abs(Number(value)) > 1000000000000.000000) {
            if (tip != "") {
                $$msg.alert(tip + "数值应当在 -1000000000000.00 至 1000000000000.00 之间!");
            }
            return true;
        }
        return false;
    },
    //函数功能: 正整数
    isPureNumber:function (inputString) {
        return inputString.match(/^[1-9]\d*$/) != null;
    },
    //函数功能: 非负整数, 自然数
    isNaturalNumber:function (inputString) {
        return inputString.match(/^[0-9]\d*$/) != null;
    },
    //函数功能: 浮点数；
    isNumber:function (inputString) {
        return inputString.match(/^-?([1-9]\d*\.\d*|[1-9]\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/) != null;
    },
    //函数功能: 检查输入字符串是否不是数字
    isNotNumber:function (param) {
        return !this.isNumber(param);
    },
    //函数功能: 正浮点数
    isPlusNumber:function (inputString) {
        return inputString.match(/^[1-9]\d*\.\d*|[1-9]\d*|0\.\d*[1-9]\d*$/) != null;
    },
    //函数功能: 非负浮点数
    isNoMinusNumber:function (inputString) {
        return inputString.match(/^\d*\.\d*$/) != null;
    },
    //函数功能: 负浮点数
    isNegativeNumber:function (inputString) {
        return inputString.match(/^-([1-9]\d*\.\d*|[1-9]\d*|0\.\d*[1-9]\d*)$/) != null;
    },
    //函数功能：整数
    isIntegerNumber:function (inputString) {
        return inputString.match(/^([0-9]|(-[1-9]))\d*$/) != null;
    },
    /* =====================================================================================
     函数功能: 转换为金额显示，要求录入的一定为数字
     入口参数: inputString 要转换的数字, k 小数位数(缺省=2)
     返 回 值: 转换后的字符串
     */
    toAmountString:function (inputString, k, blnZeroToEmpty) {
        if (blnZeroToEmpty == null) blnZeroToEmpty = true;
        if (k == null) k = 2;
        if (blnZeroToEmpty && this.isZero(inputString)) return "";
        return this.FormatNumber(inputString, k);
    },
    /* ====================================================================================
     函数功能: 格式化字符串
     入口参数: strSrc 源;  lngDotLength 小数点位数
     */
    FormatNumber:function (strSrc, lngDotLength) {
        lngDotLength = parseInt(lngDotLength);
        if (isNaN(lngDotLength)) dotLen = 2;

        strSrc = $$str.to_double(strSrc) + "";
        var nTen;
        var lngSrcLength = strSrc.length;
        var dotPos = strSrc.indexOf(".", 0);
        var result = "";
        if (dotPos == -1) {//参数没有小数
            if (lngDotLength > 0)
                result = strSrc + "." + $$str.string("0", lngDotLength);
            else result = strSrc;
        } else if ((lngSrcLength - dotPos - 1) < lngDotLength) {
            //参数本身有小数,但是小数比要求的短
            result = strSrc + $$str.string("0", lngDotLength - lngSrcLength + dotPos + 1);
        } else {
            //小数比要求的长
            nTen = Math.pow(10, lngDotLength);
            result = Math.round(parseFloat(strSrc) * nTen) / nTen + "";
            //可能由于四舍五入导致小数位数不够
            var dotPos1 = result.indexOf(".", 0);
            var lngSrcLength1 = result.length;
            if (lngSrcLength1 - dotPos1 - 1 != lngDotLength) {
                if (dotPos1 == -1) {
                    if (lngDotLength > 0)
                        result += "." + $$str.string("0", lngDotLength);
                } else {
                    result += String("0", lngDotLength - lngSrcLength1 + dotPos1 + 1);
                }
            }
        }
        return result;
    },
    AmountToNumber:function (amountString) {
        if (!amountString) amountString = "";
        amountString = amountString + "";
        if (amountString == "") amountString = "0.00";

        amountString = amountString.replace(/,/g, "");
        return $$str.to_double(amountString);
    },
    toAmountFormat:function (amountNumber, blnZeroToEmpty, dotLen) {
        dotLen = parseInt(dotLen);
        if (isNaN(dotLen)) dotLen = 2;
        amountNumber = this.FormatNumber(this.AmountToNumber(amountNumber), dotLen);

        var strS = ",";
        var plen;
        if (dotLen > 0) plen = dotLen + 1;
        else plen = 0;
        var strR = $$str.rightStr(amountNumber, plen);
        var strL = $$str.leftStr(amountNumber, amountNumber.length - plen);

        //在整数部分插入分隔符
        var result = "";
        var j = 0;
        for (var i = strL.length; i >= 0; i--) {
            result = strL.charAt(i) + result;
            if ((j != 0) && ((j % 3) == 0)) result = strS + result;
            j++;
        }
        //加上小数点部分
        result = result + strR;
        if ($$str.leftStr(result, 1) == strS) result = $$str.rightStr(result, result.length - 1);
        result = result.replace(/^-,*/g, "-");


        if (blnZeroToEmpty == null) blnZeroToEmpty = true;
        if (blnZeroToEmpty && result == "0.00") {
            return "";
        } else {
            return result;
        }
    }
};

window.$$obj = coco.utils.obj = {
    isArray:function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    },
    isEmpty:function (obj) {
        if (!obj) return true;
        for (var k in obj) return false;
        return true;
    }
};

/*
 json处理相关，从JSON2复制
 var s={};
 s.a="aaa";
 s.b="\"b\"=bbb";
 //保存到字符串
 s = coco.utils.json.stringify(s);
 alert(s);
 //从字符串解析对象
 s = coco.utils.json.parse(s);
 alert(s.b)*/
window.$$json = coco.utils.json = function () {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function (key) {
        return this.getUTCFullYear() + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate()) + 'T' +
            f(this.getUTCHours()) + ':' +
            f(this.getUTCMinutes()) + ':' +
            f(this.getUTCSeconds()) + 'Z';
    };
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {'\b':'\\b', '\t':'\\t', '\n':'\\n', '\f':'\\f', '\r':'\\r', '"':'\\"', '\\':'\\\\'}, rep;

    function quote(string) {
        return '"' + quotex(string) + '"';
    }

    function quotex(string) {
        escapeable.lastIndex = 0;
        return escapeable.test(string) ? string.replace(escapeable, function (a) {
            var c = meta[a];
            if (typeof c === 'string') {
                return c;
            }
            return'\\u' + ('0000' +
                (+(a.charCodeAt(0))).toString(16)).slice(-4);
        }) : string;
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case'string':
                return quote(value);
            case'number':
                return isFinite(value) ? String(value) : 'null';
            case'boolean':
            case'null':
                return String(value);
            case'object':
                if (!value) {
                    return'null';
                }
                gap += indent;
                partial = [];
                if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap +
                        partial.join(',\n' + gap) + '\n' +
                        mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                    mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    return{stringify:function (value, replacer, space) {
        var i;
        gap = '';
        indent = '';
        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }
        } else if (typeof space === 'string') {
            indent = space;
        }
        rep = replacer;
        if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }
        return str('', {'':value});
    }, parse:function (text, reviver) {
        var j;

        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }

        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return'\\u' + ('0000' +
                    (+(a.charCodeAt(0))).toString(16)).slice(-4);
            });
        }
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            j = eval('(' + text + ')');
            return typeof reviver === 'function' ? walk({'':j}, '') : j;
        }
        throw new SyntaxError('JSON.parse');
    }, getQuotedStr:function (s) {
        return quotex(s);
    }};
}();
/**
 * Base64编码解码
 */
window.$$base64 = coco.utils.base64 = {
    BASE64_KEY_STR:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode:function (input, baseKeyStr) {
        if (!baseKeyStr) baseKeyStr = this.BASE64_KEY_STR;
        input = encodeURIComponent(input);
        var output = new StringBuffer();
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output.append(baseKeyStr.charAt(enc1));
            output.append(baseKeyStr.charAt(enc2));
            output.append(baseKeyStr.charAt(enc3));
            output.append(baseKeyStr.charAt(enc4));
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output.toString();
    },

    decode:function (input, baseKeyStr) {
        if (input == null || input == '') return '';
        if (!baseKeyStr) baseKeyStr = this.BASE64_KEY_STR;
        var output = new StringBuffer();
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0, n = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            alert("不是有效的Base64编码字符。");
            return "";
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = baseKeyStr.indexOf(input.charAt(i++));
            enc2 = baseKeyStr.indexOf(input.charAt(i++));
            enc3 = baseKeyStr.indexOf(input.charAt(i++));
            enc4 = baseKeyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output.append(String.fromCharCode(chr1));

            if (enc3 != 64) {
                output.append(String.fromCharCode(chr2));
            }
            if (enc4 != 64) {
                output.append(String.fromCharCode(chr3));
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return decodeURIComponent(output.toString());
    }
}
coco.ctrl = {
    getParam: function (o1, options) {
        var param = o1 || {};
        if (options.paramEx != undefined) {
            if (typeof options.paramEx == 'object') param = $$utils.unionObject(param, options.paramEx);
            else param.paramEx = options.paramEx;
        }
        if (options.search) {
            param.searchValue = options.search.value;
            param.searchNames = options.search.name;
            param.firstNames= options.search.firstName;
        }
        if (options.getParam) param = $$utils.unionObject(param, options.getParam());
        return {data: $$json.stringify(param)};
    }
};
/**
 * 下拉列表
 * @param options {
 * listId: 控件的Id
 * canPage: 是否支持分页，默认true
 * canEmpty: 是否允许为空
 * emptyValue: 为空时的值，默认为“-”
 * emptyText: 为空时名称显示文本,默认"(无)"
 * columns: 列信息
 * onBeforeSelect: function(index,row) 选择节点前的校验
 * onSelect: function(index,row) 选择节点后触发的事件
 * value: 值
 * getPageDataByPageNum: function(pageNum, pageSize) 返回grid的指定页行数组 格式：[row1, row2]
 * getPageDataById: function(value, pageSize) 返回指定id所在页的数据，格式：{pageNum:页码, data:[row1,row2]}
 * findRowIdByContent: function(txt) 根据编号或名称返回id
 * 其它 combogrid属性
 * }
 */
coco.ctrl.list = function (options) {
    var instance = {
        options: initOptions(),
        clearAndRefresh: function () {//清空现有值，且重新刷新下拉数据，跳转到第一页
            clearAndRefresh();
        },
        selectValue: function (value) {//选择指定ID的结点
            setSelectValue(value)
        },
        setValue: function (value, text) {//选择指定ID的结点
            setSelectValue(value, text)
        },
        getValue: function () {
            return getValue();
        },
        combogrid: function (func, param) {
            return executeFunc(func, param);
        },
        setEnabled: function (enable) {
            if (enable) executeFunc("enable");
            else executeFunc("disable");
        },
        getCurRow: function () {
            var grid = $('#' + this.options.listId).combogrid("grid");
            return grid.datagrid("getSelected");
        },
        //刷新
        refresh: function () {
            clearAndRefresh();
        },
        //获取params
        getParams: function(paramsName){
            if(paramsName)return params.paramsName;
            else return params;
        }
    };
    var params = {pageSize:options.pageSize&&!isNaN(options.pageSize)?options.pageSize:10, isLoaded: false};

    function initOptions() {
        options.customShowPanel = options.onShowPanel;
        options.customHidePanel = options.onHidePanel;
        options.onShowPanel = undefined;
        options.onHidePanel = undefined;

        options = $.extend({
            canEmpty: true,
            emptyValue: coco.options.emptyValue,
            emptyText: "(空)",
            canPage: true,
            editable: true,
            paramEx: undefined, //扩展参数，自定义 js对象，可以为空
            fitColumns: true,
            onQuery: function (q) {
                var c = $('#' + options.listId);
                var grid = c.combogrid('grid');
                grid.datagrid('search', q);
            },
            onShowPanel: function (isQuery) {
                if (!params.isLoaded || (options.search && options.search.value != '' && !isQuery)) {
                    if (!params.isGridLoaded) initGrid();
                    if (!isQuery) {
                        options.search = undefined;
                        doGetGridPageDataEx(getValue(), params.pageSize);
                    }
                }
                if (options.customShowPanel) options.customShowPanel.call(this);
            },
            onHidePanel: function () {
                setSelectValue(getValue());
                if (options.customHidePanel) options.customHidePanel.call(this);
            },
            findPageDataByPageNum: function (pageNum, pageSize) {
                var rtdata = $$utils.ajaxPost(options.urlCombo + "comboData.json", getParam({page: pageNum, rows: pageSize}));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata;
            },
            findPageDataByPageNumAsnc: function (pageNum, pageSize,callback,requestCount) {
                var requestCount=$$utils.ajaxPostAsnc(options.urlCombo + "comboData.json", getParam({page: pageNum, rows: pageSize}),callback,requestCount);
                return     requestCount;
            },
            findRowIdByContent: function (txt) {
                var rtdata = $$utils.ajaxPost(options.urlCombo + "findIdByContent.json", getParam({txt: txt}));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata.data;
            },
            findPageDataById: function (id, pageSize) {
                var rtdata = $$utils.ajaxPost(options.urlCombo + "comboData.json", getParam({id: id, rows: pageSize}));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata;
            },
            findTextsById: function (id) {
                var rtdata = $$utils.ajaxPost(options.urlCombo + "findTextsById.json", getParam({id: id, textField: options.textField}));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata;
            }
        }, options || {});
//        if (!options.width) options.width = $("#" + options.listId).outerWidth();
        if (options.multiple) {
            options.editable = false;
            options.canPage = false;
            options.canEmpty = false;
        }
        if ($$str.isEmpty(options.value)) options.value = $("#" + options.listId).val();
        return options;
    }

    function getParam(o1) {
        return coco.ctrl.getParam(o1, instance.options);
    }

    function initList() {
        var c = $('#' + options.listId);
        c.combogrid(options);

        setSelectValue(options.value, options.text);
    }

    function initGrid() {
        var c = $('#' + options.listId);
        var grid = c.combogrid('grid');
        if (options.canPage) {
            grid.datagrid({
                fitColumns: options.fitColumns,
                pagination: true,
                pageSize: params.pageSize,
                pageList: [params.pageSize],
                canSearch: true,
                searchFields: options.searchFields || 'auto',
                onSearch: function (value, name,firstName) {
                    instance.options.search = {
                        value: value,
                        name: name,
                        firstName:firstName
                    };
                    doGetGridPageDataAsnc(1, params.pageSize);
                }
            });
            var pager = grid.datagrid('getPager');
            pager.pagination({
                displayMsg: '',
                showPageList: false,
                showRefresh: true,
                onSelectPage: function (pageNumber, pageSize) {
                    doGetGridPageData(pageNumber, pageSize);
                }});
        } else if(options.canSearch) {//多选搜索功能
            grid.datagrid({
                fitColumns: options.fitColumns,
                pagination: true,
                pageSize: params.pageSize,
                pageList: [params.pageSize],
                canSearch: true,
                showSearch: true,
                searchFields: options.searchFields || 'auto',
                onSearch: function (value, name,firstName) {
                    instance.options.search = {
                        value: value,
                        name: name,
                        firstName:firstName
                    };
                    doGetGridPageDataAsnc(1, params.pageSize);
                }
            });
            var pager = grid.datagrid('getPager');
            pager.pagination({
                displayMsg: '',
                showPageList: false,
                showRefresh: true,
                onSelectPage: function (pageNumber, pageSize) {
                    doGetGridPageData(pageNumber, pageSize);
                }});
        } else {
            grid.datagrid({fitColumns: true});
            params.pageSize = 0;
        }
        c.combogrid("textbox").blur(
            function () {
                var pan = $('#' + instance.options.listId).combogrid("panel");
                pan = $($(pan).parent());
                if (pan.css("display") == "none" && !instance.options.multiple) {
                    instance.selectValue(instance.getValue());
                }
            });
        params.isGridLoaded = true;
    }

    //当前选择的值
    function setSelectValue(value, text) {
        var list = $('#' + options.listId);
        value = $$str.checkEmpty(value, '');
        if (!params.isGridLoaded) { //没有加载grid
            var val;
            if (coco.options.isEmpty(value) || value == instance.options.emptyValue) {
                if (instance.options.canEmpty) {
                    val = {value: instance.options.emptyValue, text: instance.options.emptyText};
                } else {
                    val = {value: "", text: ""};
                }
            } else if (!text) {
                var data = instance.options.findTextsById(value);
                if (data) val = {value: data.value, text: data.text};
            } else val = {value: value, text: text};
            if (val) list.combogrid('setValueText', val);
            return;
        }
        //值为空，则清空选择项
        if (coco.options.isEmpty(value) || value == instance.options.emptyValue) {
            if (instance.options.canEmpty) {
                list.combogrid('setValue', instance.options.emptyValue);
                /*if (!params.isLoaded) {
                 var row = {};
                 row[instance.options.idField] = "-";
                 row[instance.options.textField] = instance.options.emptyText;
                 list.combogrid('grid').datagrid("loadData", [row]);
                 }*/
            }
            else list.combogrid('clear');
            return;
        }

        var grid = list.combogrid('grid');
        var needReload = true;
        //grid有无加载数据？
        if (params.isLoaded) {
            var rows = grid.datagrid("getRows");
            var idField = options.idField;
            for (var i = 0; i < rows.length; i++) {
                //选中的值在当前页，不用管
                if (rows[i][idField] == value) {
                    needReload = false
                }
            }
        }
        //需要加载当前页数据
        if (needReload) {
            params.isLoaded = false;
            var val;
            if (!text) {
                var data = instance.options.findTextsById(value);
                if (data) val = {value: data.value, text: data.text};
            } else val = {value: value, text: text};
            if (val) list.combogrid('setValueText', val);
        }//doGetGridPageDataEx(value, params.pageSize);
        else {
            if (!instance.options.multiple) list.combogrid('setValue', value);
            else {
                list.combogrid('setValues', value.split(","));
            }
        }
        list.combogrid('hidePanel');
    }

    //得到指定页数据
    function doGetGridPageData(pageNum, pageSize) {
        params.isLoaded = true;
        //var data = undefined;
        var data = options.findPageDataByPageNum(pageNum, pageSize);
        if (data) doLoadData(data, pageNum);
    }
    var requestCount=0;
    function doGetGridPageDataAsnc(pageNum, pageSize)
    {
        requestCount++;
        params.isLoaded = true;
        requestCount= options.findPageDataByPageNumAsnc(pageNum, pageSize,doCallback,requestCount);
    }
    function doCallback(data,count){
        if (data&&(requestCount==count)) {
            doLoadData(data, 1);
        }
    }
    //根据输入的值定位
    function doGetGridPageDataEx(value, pageSize) {
        params.isLoaded = true;
        if (coco.options.isEmpty(value) || value == instance.options.emptyValue) doGetGridPageData(1, pageSize);
        else {
            //var data = undefined;
            var data = options.findPageDataById(value, pageSize);
            if (data) doLoadData(data, data.pageNum);
        }
    }

    function doLoadData(data, pageNum) {
        if (!params.isGridLoaded) initGrid();
        var grid = $('#' + options.listId).combogrid('grid');
        if (instance.options.canEmpty) {
            if (instance.options.emptyRow) {
                data.rows.splice(0, 0, instance.options.emptyRow);
            } else {
                var row = {};
                row[instance.options.idField] = instance.options.emptyValue;
                row[instance.options.textField] = instance.options.emptyText;
                data.rows.splice(0, 0, row);
            }
        }
        grid.datagrid("loadData", data);
        var pager = grid.datagrid('getPager');
        pager.pagination({pageNumber: pageNum});
    }

    function getValue() {
        if (!options.multiple)
            return $('#' + options.listId).combogrid("getValue");
        return $('#' + options.listId).combogrid("getValues").join(",");
    }

    //清空现有值，且重新刷新下拉数据，跳转到第一页
    function clearAndRefresh() {
        var grid = $('#' + options.listId);
        if (!params.isGridLoaded) grid.combo('clear');
        else grid.combogrid('clear');
        params.isLoaded = false;
        doGetGridPageData(1, params.pageSize);
    }

    function executeFunc(func, param) {
        return $('#' + options.listId).combogrid(func, param);
    }

    initList();
    return instance;
};
/**
 * 树
 * @param options：{
 * treeId: comboTree的Id
 * combotree: 是否下拉树
 * hasDefRoot: 是否指定根节点，默认有
 * defRoot:{} 如未undefined，且hasDefRoot为true，则默认为 {"id": '-', "text": '系统', 'state': 'closed'}
 * canEmpty:能否为空
 * emptyValue:空节点的值，默认-
 * emptyText:空节点显示文本
 * onBeforeSelect: function(node) 选择节点前的校验
 * onSelect: function(node) 选择节点后触发的事件
 * getChildrenNode: function(id) 取得子结点数据的方法
 * findRowIdByContent: fundtion(txt) 根据输入的内容查找对应的节点id
 * findParentNodeIds: function(nodeId) 取得父结点的ID数组　[pid, ..., topid]
 * isOnlySelectLeaf: true/false 只能选择叶子结点，默认为true
 * onChange: function(newValue,oldValue) 改变事件
 * onClick : function(node) 单击节点后触发的事件
 * value: 值
 * 其它子类的属性
 * }
 */
coco.ctrl.treeMethod = {
    //取得结点的详细信息
    getNodeDetailData: function (node) {
        if (node && node.attributes && node.attributes.obj) {
            return node.attributes.obj;
        }
        return undefined;
    }
};
coco.ctrl.tree = function (options) {
    var instance = {
        options: initOptions(),
        paramEx: undefined, //扩展参数，自定义 js对象，可以为空
        selectChildNode: function (nodeId) {
            //选择指定ID的结点
            selectChildNode(nodeId);
        },
        checkNodes: function (nodes) {
            //check指定ID的结点
            checkNodes(nodes);
        },
        //取得结点的详细信息
        getNodeDetailData: function (node) {
            if (node && node.attributes && node.attributes.obj) {
                return node.attributes.obj;
            }
            return false;
        },
        //指向easyui本身的tree,如$("#id").tree(), $("#id").combotree("tree").tree()
        tree: function (func, param) {
            if (options.combotree) return $('#' + options.treeId).combotree("tree").tree(func, param);
            return $('#' + options.treeId).tree(func, param);
        },
        //如果是combotree，在initTree时重写 指向easyui本身的combotree
        combotree: function (func, param) {
        },
        //不触发事件
        doNotFired: function (func) {
            doNotFired(func);
        },
        //设值
        setValue: function (value, text) {
            setValue(value, text);
        },
        //设值
        getValue: function () {
            return getValue();
        },
        //刷新树
        refresh: function (nodeId) {
            refresh(nodeId);
        },
        setEnabled: function (enable) {
            if (enable) executeFunc("enable");
            else executeFunc("disable");
        },
        //获取选择的行
        getSelectRows: function () {
            return getSelectRows();
        }
    }, sysFired = 0;//不触发标记
    var params = {canSel: true, isLoaded: false};

    function initOptions() {
        options.customShowPanel = options.onShowPanel;
        options.customHidePanel = options.onHidePanel;
        options.onShowPanel = undefined;
        options.onHidePanel = undefined;
        options = $.extend({
            editable: true,
            combotree: true,
            hasDefRoot: false,
            defRoot: {"id": '', "text": '系统', 'state': 'closed'},
            canEmpty: false,
            emptyValue: coco.options.emptyValue,
            emptyText: "(空)",
            isOnlySelectLeaf: true,
            getChildrenNode: function (nodeId) {
                var param= {id:nodeId};
                var rtdata = $$utils.ajaxPost(options.urlCombo + "comboData.json",getParam(param));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata.data;
            },
            findRowIdByContent: function (txt) {
                var param= {txt: txt};
                var rtdata = $$utils.ajaxPost(options.urlCombo + "findIdByContent.json", getParam(param));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata.data;
            },
            findParentNodeIds: function (nodeId) {
                var param= {id: nodeId};
                var rtdata = $$utils.ajaxPost(options.urlCombo + "findParentNodeIdArray.json",getParam(param));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata.data;
            },
            findTextsById: function (nodeId) {
                if(!options.urlCombo) return undefined;
                var param= {id: nodeId};
                var rtdata = $$utils.ajaxPost(options.urlCombo + "findTextsById.json", getParam(param));
                if (!$$utils.checkReturn(rtdata)) return undefined;
                return rtdata;
            }
        }, options || {});
        if (options.rootId) options.hasDefRoot = false;
        var $target = $("#" + options.treeId);
        if ($$str.isEmpty(options.value)) options.value = $target.val();
        if ($$str.isEmpty(options.text)) options.text = $target.attr("text");
        return options;
    }
    function getParam(o1) {
        if (!o1) o1 = {};
        if (options.rootId) {
            o1.rootId = options.rootId;
        }
        if (options.multiple) o1.multiple = true;
        if (options.loadall) o1.loadall = true;
        return coco.ctrl.getParam(o1, options);
    }

    function initTree() {
        var opts = $.extend({
            cascadeCheck: false,
            onBeforeSelect: function (node) {
                params.canSel = true;
                //是否只能选择叶子结点
                if (instance.options.isOnlySelectLeaf) {
                    var isLeaf = instance.tree("isLeaf", node.target);
                    if (!isLeaf) {
//                        coco.utils.msg.alert("请选择明细节点。");
                        if (node.state == "open") {
                            instance.tree('collapse', node.target);
                        } else {
                            instance.tree('expand', node.target);
                        }
                        params.canSel = false;
                        return params.canSel;
                    }
                }
                if (isFiredEvent() && instance.options.onBeforeSelect != undefined) {
                    params.canSel = instance.options.onBeforeSelect(node);
                }
                return params.canSel;
            },
            onSelect: function (node) {     //用于selectChildNode时,显示grid数据, selectChildNode不会触发onClick
                if (isFiredEvent() && instance.options.onSelect) {
                    instance.options.onSelect(node);
                }
            },
            onBeforeClick: function (node) {
                return params.canSel;
            },
            onClick: function (node) {
                if (isFiredEvent() && instance.options.onClick) instance.options.onClick(node);

            },
            onChange: function (newValue, oldValue) {
                if (isFiredEvent() && instance.options.onChange) {
                    instance.options.onChange.call($('#' + instance.options.treeId)[0], newValue, oldValue);
                }
            },
            onBeforeExpand: function (node) {
                displayChildNode(node);
            },
            onQuery: function (q) {
                searchAndSetValue(q);
            },
            onShowPanel: function (isQuery) {
                if (!params.isLoaded) {
                    selectChildNode(getValue(), isQuery);
                }
                if (options.customShowPanel) options.customShowPanel.call(this);
            },
            onHidePanel: function () {
                setValue(instance.getValue());
                if (options.customHidePanel) options.customHidePanel.call(this);
            }
        }, instance.options);
        var t = $('#' + instance.options.treeId);
        if (instance.options.combotree) {
            t.combotree(opts);
            //指向easyui本身的combotree
            instance.combotree = function (func, param) {
                return $('#' + options.treeId).combotree(func, param);
            };
            /*t.combotree("textbox").blur(
                function () {
                    var pan = $('#' + instance.options.treeId).combotree("panel");
                    pan = $($(pan).parent());
                    if (pan.css("display") == "none" && !instance.options.multiple)
                        selectChildNode(instance.getValue());
                }).focus(function () {
                    $(this).select();
                });*/
            if (instance.options.getEnabled && !instance.options.getEnabled()) $('#' + options.treeId).combotree("disable");
        } else {
            t.tree(opts);
        }

        refresh(instance.options.value, instance.options.text);
        if (instance.options.onChange) instance.options.onChange.call(t[0], instance.options.value);
    }

    //根据文本搜索code或name字段
    function searchAndSetValue(txt) {
        txt = txt.trim();
        if (coco.options.isEmpty(txt) || txt == instance.options.emptyText) {
            if (instance.options.canEmpty) setValue(instance.options.emptyValue, undefined, true);
            else instance.combotree("setValue", "");
            return;
        }
        var id = instance.options.findRowIdByContent(txt);
        if (id) {
            setValue(id, undefined, true);
        }
        /* else {
         coco.utils.msg.alert("未找到指定节点数据。");
         }*/
    }

    /**
     * 显示指定树的顶层
     */
    function displayTop() {
        if (params.isLoaded) return;
        params.isLoaded = true;
        var defRoot = [];
        //需要默认节点 或 允许为空，则需要添加默认节点
        if (options.hasDefRoot || options.canEmpty) {
            if (options.canEmpty) {
                defRoot.push({"id": instance.options.emptyValue, "text": options.emptyText, 'iconCls': 'icon-blank'});
            }
            if (options.hasDefRoot) {
                defRoot.push(options.defRoot);
            }
        }
        instance.tree("loadData", defRoot);

        var root;
        if (options.canEmpty) {
            var roots = instance.tree('getRoots');
            root = roots[1];
        } else root = instance.tree('getRoot');

        if (!root) {
            var s = '';
            var $target = $('#' + instance.options.treeId);
            if (options.combotree) s = $target.combotree("getText");
            displayChildNode({});
            if (s != '') $target.combotree("setText", s);
        } else if (options.hasDefRoot) {
            instance.tree('expand', root.target);
        }
    }

    //显示子结点
    function displayChildNode(node) {
        if (!(node)) {
            return;
        }

        //已经加载过,就不再加载了
        if (node.attributes && node.attributes.hasLoaded) {
            return;
        }

        //加载子结点
        var childrenData = getChildrenNode(node.id);
        if (!(childrenData)) {
            return;
        }
        //把各自的信息，再缓存到自己的一个属性中，方便读取自己的全部信息
        for (var i = 0; i < childrenData.length; i++) {
            childrenData[i].attributes = {};
            childrenData[i].attributes.obj = childrenData[i];
        }

        setNodeLoaded(node, true);
        //追加子结点
        instance.tree('append', {
            parent: node.target,
            data: childrenData});

        for (var i = 0; i < childrenData.length; i++) {
            recurisionNode(childrenData[i]);
        }

        if(node.target){
            var parent = instance.tree().parent();
            var $node = $(node.target);
            var top = $node.position().top;// - headerHeight;

            if (top <= 0) {
                parent.scrollTop(parent.scrollTop() + top);
            } else {
                var th = $node._outerHeight(), bh = parent[0].clientHeight;
                if (top + th > bh) {
                    parent.scrollTop(parent.scrollTop() + top + th * 2 - bh);// - bh + 18
                }
            }
        }
    }

    function recurisionNode(nodeData) {
        if (!nodeData.children || !nodeData.children.length) return;
        for (var i = 0, len = nodeData.children.length; i < len; i++) {
            var child = nodeData.children[i];
            child.attributes = {};
            child.attributes.obj = child;
            recurisionNode(child);
        }
        var node = instance.tree("find", nodeData.id);
        setNodeLoaded(node, true);
    }

    //给节点置是否已加载数据的标记
    function setNodeLoaded(node, hasLoaded) {
        if (node.target) { //存在此结点
            var n = node.attributes || {};

            n.hasLoaded = hasLoaded;
            instance.tree('update', {
                    target: node.target,
                    attributes: n
                }
            )
        }
    }

//加载指定节点的下级
    function getChildrenNode(id) {
        if (!id) id = "";
        return instance.options.getChildrenNode(id);
    }

//得到某一节点的各级父Id
    function findParentNodeIds(nodeId) {
        //调用外部的方法
        var s = instance.options.findParentNodeIds(nodeId);
        if (!s) $$msg.alert("未找到指定节点数据。");
        return s;
    }

    /**
     * 移出指定结点的子结点
     * @param node            easyui-tree结点,加载此node的子结点
     */
    function removeChildrenNodes(node) {
        var childrenNodes = instance.tree("getChildren", node.target);
        if (childrenNodes) {
            for (var i = 0; i < childrenNodes.length; i++) {
                instance.tree("remove", childrenNodes[i].target)
            }
        }
        setNodeLoaded(node, false);
    }

    /**
     * 定位选中某个元素
     * @param selectId        id
     */
    function selectChildNode(selectId, isQuery) {
        displayTop();
        if (options.multiple) {
            if (options.combotree) instance.combotree("setValues", selectId.split(","));
            return;
        }
        if (coco.options.isEmpty(selectId) || selectId == instance.options.emptyValue) {
            return;
        }

        var node = instance.tree('find', selectId);
        if (node) {
            if (instance.options.combotree) {
                if (!isQuery) {
                    instance.combotree("setValue", selectId);
                } else {
                    var ct = $('#' + instance.options.treeId);
                    ct.combo("setValue", selectId);
                    ct.combotree("tree").tree('select', node.target);
                }
            }
            else instance.tree('select', node.target);
            return;
        }
        //加载子结点
        var parentIds = findParentNodeIds(selectId);

        if (!parentIds) {
            return;
        }

        for (var i = parentIds.length - 1; i >= 0; i--) {
            node = instance.tree('find', parentIds[i]);
            if (node) instance.tree('expand', node.target);
        }
        node = instance.tree('find', selectId);
        if (node) instance.tree('select', node.target);
    }

    function checkNodes(nodes) {
        if (!nodes || !nodes.length) return;
        for (var i = 0, len = nodes.length; i < len; i++) {
            checkNode(nodes[i]);
        }
    }

    function checkNode(nodeId) {
        displayTop();
        if (coco.options.isEmpty(nodeId) || nodeId == instance.options.emptyValue) {
            return;
        }

        var node = instance.tree('find', nodeId);
        if (node) {
            instance.tree('check', node.target);
            return;
        }
        //加载子结点
        var parentIds = findParentNodeIds(nodeId);

        if (!parentIds) {
            return;
        }

        for (var i = 0; i <= parentIds.length - 1; i++) {
            node = instance.tree('find', parentIds[i]);
            if (node) instance.tree('expand', node.target);
        }

//        for (var i = parentIds.length - 1; i >= 0; i--) {
//            node = instance.tree('find', parentIds[i]);
//            if (node) instance.tree('expand', node.target);
//        }
        node = instance.tree('find', nodeId);
        if (node) instance.tree('check', node.target);
    }

    function setValue(value, text, isQuery) {
        var $tree = $('#' + instance.options.treeId);
        //if (coco.options.isEmpty(value) || value == instance.options.emptyText) value = instance.options.emptyValue;
        //下拉树，且panel未创建
        if (instance.options.combotree && !params.isLoaded) {
            var val;
            if (coco.options.isEmpty(value) || value == instance.options.emptyValue) {
                if (instance.options.canEmpty) {
                    val = {value: instance.options.emptyValue, text: instance.options.emptyText};
                } else {
                    val = {value: "", text: ""};
                }
            } else if (!text) {
                var data = instance.options.findTextsById(value);
                if (data) val = {value: data.value, text: data.text};
            } else val = {value: value, text: text};
            if (val) {
                $tree.combotree('setValueText', val);
            }
            return;
        }
        var s = '';
        if (options.combotree) s = $tree.combotree("getText");
        if (!options.multiple) {
            selectChildNode(value, isQuery);
            if (!isQuery) {
                if (params.canSel) {
                    if (instance.options.combotree) instance.combotree("setValue", value);
                    instance.combotree('hidePanel');
                } else if (s != '') {
                    $tree.combotree("setText", s);
                }
            }
        }
        else if (options.combotree) instance.combotree("setValues", value);
    }

    function getValue() {
        if (instance.options.combotree) {
            if (!instance.options.multiple) return instance.combotree("getValue");
            return instance.combotree("getValues").join(",");
        }
        return "";
    }

    /**
     * 刷新
     */
    function refresh(nodeId, text) {
        params.isLoaded = false;
        if (instance.options.combotree) {
            doNotFired(function () {
                setValue(nodeId, text);
            });
        } else {
            displayTop();
            doNotFired(function () {
                setValue(nodeId, text);
            });
        }
    }

//是否需触发相应事件
    function isFiredEvent() {
        return sysFired == 0;
    }

//不需触发相应事件的操作
    function doNotFired(fn) {
        sysFired++;
        try {
            fn();
        } finally {
            sysFired--;
        }
    }

    function executeFunc(func, param) {
        if (instance.options.combotree) return instance.combotree(func, param);
        return instance.tree(func, param);
    }

    function getSelectRows() {
        if (!instance.options.combotree) return undefined;
        var vals = instance.combotree("getValues");
        if (!vals || vals.length == 0) return [];
        var rows = [];
        for (var i = 0; i < vals.length; i++) {
            var node = instance.tree('find', vals[i]), data = null;
            if (node != null) data = instance.getNodeDetailData(node);
            if (data != null) rows.push(data);
        }
        return rows;
    }

    initTree();
    return instance;
};
coco.ctrl.combobox = function (options) {
    var instance = {
        options: initOptions(),
        setValue: function (value) {
            setValue(value);
        },
        getValue: function () {
            return getValue();
        },
        combobox: function (func, param) {
            return $('#' + options.comboId).combobox(func, param);
        },
        setEnabled: function (enable) {
            var $target = $('#' + options.comboId);
            if (enable) $target.combobox("enable");
            else $target.combobox("disable");
        }
    };

    function initOptions() {
        options = $.extend({
            valueField: "id",
            textField: "text",
            editable: false,
            canEmpty: true,
            emptyValue: coco.options.emptyValue,
            emptyText : "(无)",
            data: []
        }, options || {});
        if ($$str.isEmpty(options.value)) {
            options.value = $("#" + options.comboId).val();
        }
        // Liuh fix 2013/12/16
        //if (!options.width) options.width = $("#" + options.comboId).width();
        if (options.canEmpty) {
            var r = {};
            r[options.valueField] = options.emptyValue;
            r[options.textField] = options.emptyText;
            options.data.splice(0, 0, r);

//            options.data.splice(0, 0, {id: options.emptyValue, text: options.emptyText});
        }
        return options;
    }

    function setValue(value) {
        if (instance.options.multiple) {
            $('#' + options.comboId).combobox("setValues", ($$str.isEmpty(value) ? "" : value.split(",")));
        } else {
            $('#' + options.comboId).combobox("setValue", ($$str.isEmpty(value) ? "" : value));
        }
    }

    function getValue() {
        if (instance.options.multiple) {
            return $('#' + options.comboId).combobox("getValues").join(",");
        } else {
            return $('#' + options.comboId).combobox("getValue");
        }

    }

    function initComboBox() {
        var _combobox = $('#' + options.comboId);
        _combobox.combobox(options);
    }

    initComboBox();
    return instance;
};
/**
 * 日期查询控件
 * @param options{
 *   valueTagId: "",  值控件id 当此控件不存在时，将创建之并加入到父控件中。如果此控件存在，相关控件将插入到此控件后面
 *   parentTagId: "", 父控件id
 *   notParse: false 是否需要分析easyui,
 *   onchange: function(value)
 }*/
coco.ctrl.dateQuery = function (options) {
    var instance = {
        options: undefined,
        setValue: function (val) {
            setValue(val);
        },
        getValue: function () {
            return $("#" + instance.options.valueTagId).val();
        },
        show: function () {
            $("#span_" + instance.options.valueTagId).show();
        },
        hide: function () {
            $("#span_" + instance.options.valueTagId).hide();
        }
    };
   var valueRange=options.valueRange; //自定义取值范围[本月,本年]
    function getBuilderHtml() {
        var html;
        var $target = $("#" + instance.options.valueTagId);
        if ($target.length > 0) {
            html = "";
        } else {
            html = "<input type='hidden' id='" + instance.options.valueTagId + "' name='" + instance.options.valueTagId + "'>";
        }
        var tabIndex = $target.attr("tabIndex");
        if(valueRange==undefined){
          return  html +
            "<span id='span_" + instance.options.valueTagId + "'><select id='" + instance.options.valueTagId + "_dateType' class='easyui-combobox' tabIndex='" + tabIndex + "' style='width:60px'>" +
            "<option value='A'>(全部)</option><option value='D'>当天</option>" +
            "<option value='W'>本周</option><option value='M'>本月</option>" +
            "<option value='Q'>本季</option><option value='Y'>本年</option>" +
            "<option value='C'>自定义</option></select>" +
            "<span id='" + instance.options.valueTagId + "_dateEdit' style='display:none;'>" +
            "<input id='" + instance.options.valueTagId + "_dateFrom' class='easyui-datebox' style='width:90px' tabIndex='" + (++tabIndex) + "'/>-<input id='" + instance.options.valueTagId + "_dateTo' class='easyui-datebox'  style='width:90px'  tabIndex='" + (++tabIndex) + "'/></span></span>";// +
        }else{
           var pre=html +"<span id='span_" + instance.options.valueTagId + "'><select id='" + instance.options.valueTagId + "_dateType' class='easyui-combobox' tabIndex='" + tabIndex + "' style='width:60px'>" ;
            var range="";
            for(var i=0;i<valueRange.length;i++){
               var value=valueRange[i];
               if(value=='全部'){
                  range+="<option value='A'>(全部)</option>";
               }else if(value=='当天'){
                 range+=" <option value='D'>当天</option>";
               }else if(value=='本周'){
                  range+=  "<option value='W'>本周</option> ";
               }else if(value=='本月'){
                 range+=   "<option value='M'>本月</option>";
               }else if(value=='本季'){
                 range+=   "<option value='Q'>本季</option>";
               }else if(value=='本年'){
                 range+= "<option value='Y'>本年</option>";
               } else if(value=='自定义'){
               range+= " <option value='C'>自定义</option>";
               }
          }
          return pre+range+"</select><span id='" + instance.options.valueTagId + "_dateEdit' style='display:none;'>" +
                "<input id='" + instance.options.valueTagId + "_dateFrom' class='easyui-datebox' style='width:90px' tabIndex='" + (++tabIndex) + "'/>-<input id='" + instance.options.valueTagId + "_dateTo' class='easyui-datebox'  style='width:90px'  tabIndex='" + (++tabIndex) + "'/></span></span>";
        }
    }

    function init() {
        instance.options = $.extend({
            valueTagId: "",
            parentTagId: "",
            notParse: false
        }, options || {});
        var $target = $("#" + instance.options.valueTagId);
        if ($target.length == 0)
            $(getBuilderHtml()).appendTo("#" + instance.options.parentTagId);
        else $target.after(getBuilderHtml());
        if (!instance.options.notParse) $.parser.parse($("#span_" + instance.options.valueTagId));

        $("#" + instance.options.valueTagId + "_dateFrom,#" + instance.options.valueTagId + "_dateTo").datebox({
            editable:false,
            onSelect: function (ov, nv) {
                _setValue($("#" + instance.options.valueTagId + "_dateType").combobox("getValue") + "," +
                    $("#" + instance.options.valueTagId + "_dateFrom").datebox("getValue") + "," +
                    $("#" + instance.options.valueTagId + "_dateTo").datebox("getValue"));
            },
            formatter: function (d) {
                return $$date.dateToStr(d);
            },
            parser: function (d) {
                return $$date.strToDate(d);
            }
        });
        $("#" + instance.options.valueTagId + "_dateType").combobox({
            onSelect: function (row) {
                if (row.value == "A") {
                    $("#" + instance.options.valueTagId + "_dateEdit").hide();
                    _setValue("A");
                } else if (row.value == "C") {
                    $("#" + instance.options.valueTagId + "_dateEdit").show();
                    var $dateFrom = $("#" + instance.options.valueTagId + "_dateFrom");
                    var $dateTo = $("#" + instance.options.valueTagId + "_dateTo");
                    $dateFrom.datebox("enable");
                    $dateTo.datebox("enable");
                    _setValue($("#" + instance.options.valueTagId + "_dateType").combobox("getValue") + "," +
                        $dateFrom.datebox("getValue") + "," +
                        $dateTo.datebox("getValue"));
                } else {
                    var s1, s2;
                    $("#" + instance.options.valueTagId + "_dateEdit").show();
                    var $dateFrom = $("#" + instance.options.valueTagId + "_dateFrom");
                    var $dateTo = $("#" + instance.options.valueTagId + "_dateTo");
                    $dateFrom.datebox("disable");
                    $dateTo.datebox("disable");
                    if (row.value == "D") {
                        s1 = $$date.getNowDateStr();
                        s2 = s1;
                    } else if (row.value == "W") {
                        s1 = $$date.getWeekStartDate();
                        s2 = $$date.getWeekEndDate();
                    } else if (row.value == "M") {
                        s1 = $$date.getMonthStartDate();
                        s2 = $$date.getMonthEndDate();
                    } else if (row.value == "Q") {
                        s1 = $$date.getQuarterStartDate();
                        s2 = $$date.getQuarterEndDate();
                    } else if (row.value == "Y") {
                        s1 = $$date.getYearStartDate();
                        s2 = $$date.getYearEndDate();
                    }
                    $dateFrom.datebox("setValue", s1);
                    $dateTo.datebox("setValue", s2);
                    _setValue(row.value);
                }
            }
        });
    }
    function setValue(val, force) {
        if (!force && val == $("#" + instance.options.valueTagId).val()) return;
        var type, df, dt;
        if ($$str.isEmpty(val)) {
            type = "A";
            df = $$date.getNowDateStr();
            dt = df;
        } else {
            val = $$str.checkEmpty(val, '');
            var sa = val.split(",");
            if (sa.length > 0 && "CDWMQY".indexOf(sa[0]) >= 0) type = sa[0]; else type = "A";
            if (sa.length > 1) df = sa[1]; else df = $$date.getNowDateStr();
            if (sa.length > 2) dt = sa[2]; else dt = $$date.getNowDateStr();
        }
        $("#" + instance.options.valueTagId + "_dateType").combobox("select", type);
        if (type == "C") {
            $("#" + instance.options.valueTagId + "_dateFrom").datebox("setValue", df);
            $("#" + instance.options.valueTagId + "_dateTo").datebox("setValue", dt);
        }
    }

    function _setValue(val) {
        $("#" + instance.options.valueTagId).val(val);
        if (options.onChange) options.onChange.call(instance, val);
    }

    init();
    if(valueRange!=undefined){
        var _M="";
        for(var i=0;i<valueRange.length;i++){
           if(valueRange[i]=="本月"){
               _M="M";
               break;
           }
        }
        if($("#" + instance.options.valueTagId).val()==_M){
           setValue($("#" + instance.options.valueTagId).val(), true);
        }
    }else{
         setValue($("#" + instance.options.valueTagId).val(), true);
    }
    return instance;
};
//附件
coco.ctrl.attach = {
    /**
     * 上传控件
     * options参数：
     *
     */
    upload: function (options) {
        var instance = {
            options: undefined,
            showEditor: showEditor,
            //设置参数
            setOptions: function (op) {
                this.options = $.extend(this.options, op);

                setCtrlValue();
            },
            doAfterUpload: doAfterUpload
        };

        var params = {dialog_inited: false};

        function getHtml() {
            return "<div style='display: none;'>\
        <div id='" + instance.options.prefix + "div_upload_file'>\
        <form action='" + $$utils.getFullUrl("attach/up") + "' id='" + instance.options.prefix + "uf_editAttachForm' name='uf_editAttachForm' enctype='multipart/form-data'\
              method='post' target='hidden_frame'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_objId' name='objId'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_attachId' name='attachId'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_attachOwnerId' name='ownerId'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_attachPath' name='path'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_attachType' name='type'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_savePath' name='savePath'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_afterDoClass' name='afterDoClass'>\
            <input type='hidden' id='" + instance.options.prefix + "uf_data' name='data'>\
            <br>&nbsp;&nbsp;文件：<input type='file' id='" + instance.options.prefix + "uf_attachLocalPath' name='upload' style='width:230px'>\
            <br><br>\
        </form></div></div>";
        }

        function setCtrlValue() {
            if ($$str.isEmpty(instance.options.attachPath))
                instance.options.attachPath = instance.options.attachType;
            $("#" + instance.options.prefix + "uf_objId").val(instance.options.varobjname);
            $("#" + instance.options.prefix + "uf_attachId").val(instance.options.attachId);
            $("#" + instance.options.prefix + "uf_attachType").val(instance.options.attachType);
            $("#" + instance.options.prefix + "uf_attachPath").val(instance.options.attachPath);
            $("#" + instance.options.prefix + "uf_attachOwnerId").val(instance.options.attachOwnerId);
            $("#" + instance.options.prefix + "uf_savePath").val(instance.options.savePath);
            $("#" + instance.options.prefix + "uf_afterDoClass").val(instance.options.afterDoClass);
            $("#" + instance.options.prefix + "uf_attachLocalPath").val(instance.options.param);
        }

        function initCreate() {
            instance.options = $.extend({
                varobjname: '', //上传控件名
                prefix: undefined, //前缀
                title: "文件上传", //弹出对话框标题
                caption: "上传", //按钮显示名
                attachType: "", //附件类别
                attachOwnerId: "", //附件拥有者id
                attachPath: "", //附件路径
                attachId: "", //附件Id
                param: "", //额外的参数
                savePath: "", //文件将会在服务器上保存的位置，为空，则按附件处理，否则将copy到指定目录   -号模式使用Struts指定位置
                afterDoClass: undefined, //上传后要处理的java类名，通过反射方式，仅savePath不为空有效,需要实现IDoAfterUpload接口
                btnUploadId: undefined, //上传按钮id，为空则创建一个
                onBeforeUpload: undefined, //上传文件前事件
                onAfterUpload: undefined  //上传完成后事件
            }, options || {});
            if ($$str.isEmpty(instance.options.prefix)) instance.options.prefix = instance.options.varobjname.replace('.', '_');
            var sHtml = getHtml();
            $(sHtml).appendTo('body');
            if ($("#hidden_frame").length == 0) {
                $("<iframe name='hidden_frame' id='hidden_frame' style='display:none;'></iframe>").appendTo('body');
            }
            setCtrlValue();
        }

        function showEditor() {
            var $dialog = $("#" + instance.options.prefix + "div_upload_file");
            if (!params.dialog_inited) {
                $dialog.dialog({
                    width: 300,
                    title: instance.options.title,
                    closed: true,
                    closable: true,
                    modal: true,
                    resizable: false,
                    collapsible: true,
                    buttons: [
                        {
                            text: instance.options.caption,
                            iconCls: 'icon-ok',
                            handler: function () {
                                if (doBeforeUpload()) {
                                    $("#" + instance.options.prefix + "div_upload_file").dialog('close');
                                    interUploadFile();
                                }
                            }
                        },
                        {
                            text: '取消',
                            iconCls: 'icon-cancel',
                            handler: function () {
                                $("#" + instance.options.prefix + "div_upload_file").dialog('close');
                            }
                        }
                    ]
                });
                params.dialog_inited = true;
            }
            $("#" + instance.options.prefix + "uf_attachLocalPath").val("");
            $dialog.dialog("open");
        }

        //上传前要做的事情，返回false，则不上传
        function doBeforeUpload() {
            var path = $("#" + instance.options.prefix + "uf_attachLocalPath").val();
            if (path == "") {
                alert("请选择要上传的文件!");
                return false;
            }
            if (instance.options.onBeforeUpload) return instance.options.onBeforeUpload(path);
            return true;
        }

        function interUploadFile() {
            $$msg.showWait("正在上传文件...");
            $("#" + instance.options.prefix + "uf_editAttachForm").submit();
        }

        /*rtdata: {
         attachId, attachName, remoteAttachName, attachSizeStr, errmsg, data
         }*/
        function doAfterUpload(rtdata) {
            $$msg.closeWait();
            if ($$str.isNotEmpty(rtdata.errmsg)) $$msg.alert(rtdata.errmsg);
            else if (instance.options.onAfterUpload != undefined)
                instance.options.onAfterUpload(rtdata.attachId, rtdata.attachName, rtdata.remoteAttachName, rtdata.attachSizeStr, rtdata.data);
        }

        initCreate();
        return instance;
    },

    utils: {
        //删除附件
        delAttach: function (attachId, fn) {
            var rtdata = $$utils.ajaxPost("attach/del", {attachId: attachId});
            if ($$utils.checkReturn(rtdata)) {
                if (fn) fn();
            }
        },
        // 修改附件备注
        updateAttach:function (attachId, memo, fn) {
            var rtdata = $$utils.ajaxPost("attach/updateMemo", {attachId: attachId, memo: memo});
            if ($$utils.checkReturn(rtdata)) {
                if (fn) fn();
            }
        },
        //构造文件下载Url
        buildAttachDownUrl: function (attachId) {
            return $$utils.getFullUrl("attach/down?attachId=" + attachId);
        }
    }
};
/*
 双选控件
 options={
 objvarname: ,
 prefix: ,
 parentId:
 leftTitle: ,
 rightTitle: ,
 columns: []
 notParse: false,
 onSelect: function(row) row为单行记录对象，若不允许选择，则返回false
 onDelete: function(row) row为单行记录对象，若不允许删除，则返回false
 }
 */
coco.ctrl.dualSelect = function (options) {
    var instance = {
        options: undefined,
        setLeftData: function (data) {
            setLeftData(data);
        },
        setRightData: function (data) {
            setRightData(data);
        },
        isRowInRight: function (rowId) {
            return isRowInRight(rowId);
        },
        getSelectedRowIds: function (sepChar) {
            return getSelectedRowIds(sepChar);
        },
        getSelectedRows: function () {
            var t = $("#" + options.prefix + "_right");
            $$egrid.endEdit(t);
            return t.datagrid("getRows");
        }
    };

    function getBuildHtml() {
        var build_html = "<div id='__" + instance.options.prefix + "_root' class='easyui-layout' fit='true'>\
                <div region='west' style='width:300px;' border='false' split='true'>\
                <table id='" + instance.options.prefix + "_left'>\
                </table>\
                </div>\
                <div region='center' border='false'>\
                <div class='easyui-layout' fit='true' border='false'>\
                <div region='west' style='width:40px;text-align:center;vertical-align:middle;'>\
                <br>\
                <a id='" + instance.options.prefix + "_btnSel' href='###' class='easyui-linkbutton coco_txt' plain='true'><b>&gt;</b></a><br><br>\
                <a id='" + instance.options.prefix + "_btnDel' href='###' class='easyui-linkbutton coco_txt' plain='true'><b>&lt;</b></a><br><br>\
                <a id='" + instance.options.prefix + "_btnSelAll' href='###' class='easyui-linkbutton coco_txt' plain='true'><b>\
                &gt;&gt;</b></a><br><br>\
                <a id='" + instance.options.prefix + "_btnDelAll' href='###' class='easyui-linkbutton coco_txt' plain='true'><b>\
                &lt;&lt;</b></a><br><br>\
                </div>\
                <div region='center' border='false'>\
                <table id='" + instance.options.prefix + "_right'>\
                </table>\
                </div>\
                </div>\
                </div>\
                </div>";
        return build_html;
    }

    function init() {
        options = $.extend({
            leftTitle: "备选字段",
            rightTitle: "已选字段"
        }, options || {});
        if ($$str.isEmpty(options.prefix)) {
            options.prefix = (options.objvarname + "").replace(/\./g, "_");
        }
        instance.options = options;
        $(getBuildHtml()).appendTo("#" + options.parentId);
        $("#" + options.prefix + "_left").datagrid({
            title: options.leftTitle,
            fit: true,
            fitColumns: true,
            nowrap: false,
            striped: true,
            collapsible: false,
            remoteSort: false,
            pagination: false,
            rownumbers: false,
            singleSelect: false,
            idField: options.idField,
            columns: [options.leftCols],
            onDblClickRow: function (rowIndex) {
                if (rowIndex < 0) return;
                $(this).datagrid("unselectAll");
                $(this).datagrid("selectRow", rowIndex);
                doSelOne();
            }
        });
        var s = options.rightTitle;
        if (options.canMove) {
            s = s + "&nbsp;&nbsp;<a href='###' class='easyui-linkbutton coco_txt' id='" + instance.options.prefix + "_btnUp' plain='true'>上移</a>" +
                "<a href='###' class='easyui-linkbutton coco_txt' id='" + instance.options.prefix + "_btnDown' plain='true'>下移</a>";
        }
        $("#" + options.prefix + "_right").datagrid({
            title: s,
            fit: true,
            fitColumns: true,
            nowrap: false,
            striped: true,
            collapsible: false,
            remoteSort: false,
            pagination: false,
            rownumbers: false,
            singleSelect: false,
            readonly: false,
            idField: options.idField,
            columns: [options.rightCols],
            onClickRow: function (rowIndex) {
                $$egrid.beginEdit($(this), rowIndex);
            },
            onDblClickRow: function (rowIndex) {
                if (rowIndex < 0) return;
                $(this).datagrid("unselectAll");
                $(this).datagrid("selectRow", rowIndex);
                doDelOne();
            }
        });
        if (!options.notParse) $.parser.parse($("#" + options.parentId));
        $("#" + instance.options.prefix + "_btnSel").click(function () {
            doSelOne();
        });
        $("#" + instance.options.prefix + "_btnDel").click(function () {
            doDelOne();
        });
        $("#" + instance.options.prefix + "_btnSelAll").click(function () {
            doSelAll();
        });
        $("#" + instance.options.prefix + "_btnDelAll").click(function () {
            doDelAll();
        });
        if (options.canMove) {
            $("#" + instance.options.prefix + "_btnUp").click(function () {
                $$egrid.selectRowMoveUp(instance.options.prefix + "_right");
            });

            $("#" + instance.options.prefix + "_btnDown").click(function () {
                $$egrid.selectRowMoveDown(instance.options.prefix + "_right");
            });
        }
    }

    function setLeftData(data) {
        $("#" + options.prefix + "_left").datagrid("loadData", data);
    }

    function setRightData(data) {
        $("#" + options.prefix + "_right").datagrid("loadData", data);
    }

    //某行数据是不是在已选中
    function isRowInRight(rowId) {
        var rows = $("#" + options.prefix + "_right").datagrid("getRows"), row;
        for (var i = 0; i < rows.length; i++) {
            row = rows[i];
            if (rowId == row[options.idField]) return true;
        }
        return false;
    }

    function getSelectedRowIds(sepChar) {
        var rows = $("#" + options.prefix + "_right").datagrid("getRows");
        var r = [], row;
        for (var i = 0; i < rows.length; i++) {
            row = rows[i];
            r.push(row[options.idField]);
        }
        return r.join(sepChar);
    }

    function doMoveSel(src, dst, event) {
        $$egrid.endEdit(src);
        $$egrid.endEdit(dst);
        var rows = src.datagrid("getSelections"), index;
        var rr = src.datagrid("getRows").concat();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (event && event.call(instance, row) == false) continue;
            index = src.datagrid('getRowIndex', row);
            dst.datagrid("appendRow", row);
            removeArrayItem(rr, row);
        }
        src.datagrid('loadData', rr);
    }

    function doMoveAll(src, dst, event) {
        $$egrid.endEdit(src);
        $$egrid.endEdit(dst);
        var rows = src.datagrid("getRows"), index, row, i;
        if (!event) {
            src.datagrid('loadData', []);
            for (i = 0; i < rows.length; i++) {
                row = rows[i];
                if (event && event.call(instance, row) == false) continue;
                dst.datagrid("appendRow", row);
            }
        } else {
            var rr = [];
            for (i = 0; i < rows.length; i++) {
                row = rows[i];
                if (event && event.call(instance, row) == false) {
                    rr.push(row);
                    continue;
                }
                index = src.datagrid('getRowIndex', row);
                dst.datagrid("appendRow", row);
            }
            src.datagrid('loadData', rr);
        }
    }

    function doSelOne() {
        doMoveSel($("#" + options.prefix + "_left"), $("#" + options.prefix + "_right"), instance.options.onSelect);
    }

    function doDelOne() {
        doMoveSel($("#" + options.prefix + "_right"), $("#" + options.prefix + "_left"), instance.options.onDelete);
    }

    function doSelAll() {
        doMoveAll($("#" + options.prefix + "_left"), $("#" + options.prefix + "_right"), instance.options.onSelect);
    }

    function doDelAll() {
        doMoveAll($("#" + options.prefix + "_right"), $("#" + options.prefix + "_left"), instance.options.onDelete);
    }

    init();
    return instance;
};

/**
 * options{
 *  tagId: 控件Id
 *  valueField：控件值
 *  textField： 控件显示值
 *  canEmpty:能否为空
 *  queryHeight:查询条件的高度
 *  queryConditions:查询条件数组[{id:"",name:""}]
 *  initQueryConditions 初始化查询条件函数
 *  dataGridOptions：datagrid的option {title:"",columns[[{}] ]}
 *  dialogOptions:dialog的option   {title:""}
 *  urlCombo:地址,继承comboService
 *  }
 */

coco.ctrl.dialogCtrl = function (options) {
    var instance = {
        options: undefined
    };

    //构造显示控件的标签
    function getBulidTagHtml() {
        var required = ""
        if (!instance.options.canEmpty) {
            required = "class = 'easyui-validatebox'  required ='true'"
        }
        return "<input type='text' style='width:234px;' id='_" + instance.options.tagId + "_text' " + required +
            "name='_" + instance.options.tagId + "_text'>" +
            "<span id='_" + instance.options.tagId + "_span' class='combo-arrow'></span>";
    }

    //构造对话框html
    function getBuildDialogHtml() {
        var isQuery = false;
        var build_html = "";
        var queryHtml = "";
        var queryConditions = instance.options.queryConditions;
        if (queryConditions) {
            var isFirst = true;
            var length = instance.options.queryConditions.length;
            if (length > 0) {
                if (isFirst) {
                    queryHtml = "<div region='north' border='true'  title='查询条件' style='height:" + instance.options.queryHeight + "px;'> " +
                        "<table id='_" + instance.options.tagId + "_form'  cellspacing='1'" +
                        " cellpadding='0' ><tbody> <tr>"
                }
                for (var i = 0; i < length; i++) {
                    if (i != 0 && i % 2 == 0)
                        queryHtml = queryHtml + "</tr><tr>";
                    var query = queryConditions[i];
                    queryHtml = queryHtml + "<td nowrap  align='right' style='width:15%;' ><span>" + query["name"] + "</span>:</td>" +
                        " <td nowrap style='width:35%;' align='right'> <input type='text' id='" + query["id"] + "' name='"
                        + query["id"] + "' >" +
                        " </td>";
                }

                isFirst = false;
            }
            queryHtml = queryHtml + "</tr></tbody></table> </div>"
        }
        queryHtml = "<div class='easyui-layout' fit='true'>" + queryHtml +
            "<div region='center' border='false' ><table id='_" + instance.options.tagId + "_tbmain'></table></div></div>";

        build_html = "<div id='_" + instance.options.tagId + "_dialog' " +
            "name='_" + instance.options.tagId + "_diaglog'><div class='easyui-layout' fit='true'>" +
            "<div region='north' border='true' style='height: 30px;'><div><a id='_" + instance.options.tagId + "_query' href='###' " +
            " class='easyui-linkbutton' iconCls='icon-search'>查询</a></div></div>" +
            " <div region='center' >" + queryHtml + "</div></div></div>"

        return build_html;
    }

    function init() {
        options = $.extend({
            queryHeight: 100
        }, options || {});

        instance.options = options;

        var $target = $("#" + instance.options.tagId);
        $target.after(getBulidTagHtml()).hide();
        $(getBuildDialogHtml()).appendTo("body");

        $.parser.parse($("body"));

        //初始化查询条件
        if (instance.options.initQueryConditions) {
            instance.options.initQueryConditions();
        }

        //初始化text
        setTextsById($target.val());

        //初始化datagrid
        var $tbmain = $("#_" + instance.options.tagId + "_tbmain");
        $tbmain.datagrid($.extend({
            fit: true,
            fitColumns: true,
            pagination: true,
            singleSelect: true,
            idField: instance.options.valueField,
            pageSize: 10,
            pageList: [10],
            onDblClickRow: function () {
                doClickOk();
            }
        }, instance.options.dataGridOptions || {}));

        var pager = $tbmain.datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNumber, pageSize) {
                loadData(pageNumber, pageSize, "");
            },
            onRefresh: function (pageNumber, pageSize) {
                loadData(pageNumber, pageSize, "");

            }
        });

        //初始化对话框
        $("#_" + instance.options.tagId + "_dialog").dialog($.extend({
            width: 500,
            height: 500,
            closed: true,
            modal: true,
            maximizable: false,
            buttons: [
                {
                    text: "确定",
                    iconCls: 'icon-ok',
                    handler: function () {
                        doClickOk();
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $("#_" + instance.options.tagId + "_dialog").dialog("close");
                    }
                }
            ]
        }, instance.options.dialogOptions || {}));


        $("#_" + instance.options.tagId + "_span").click(function () {
            loadData(1, 10, $("#" + instance.options.tagId).val());
            $("#_" + instance.options.tagId + "_dialog").dialog("open");
        });

        $("#_" + instance.options.tagId + "_query").click(function () {
            loadData(1, 10);
        });
    }

    //点击确定或双击
    function doClickOk() {
        var row = $("#_" + instance.options.tagId + "_tbmain").datagrid('getSelected');
        $("#_" + instance.options.tagId + "_text").val(row[instance.options.textField]);
        $("#" + instance.options.tagId).val(row[instance.options.valueField]);
        $("#_" + instance.options.tagId + "_dialog").dialog("close");

    }

    //加载数据
    function loadData(pageNum, pageSize, valueId) {
        var queryParams = coco.page.model.getCardDataJson("_" + instance.options.tagId + "_form");
        queryParams.page = pageNum;
        queryParams.rows = pageSize;
        if ($$str.isNotEmpty(valueId)) {
            queryParams.id = valueId;
        }
        var rtdata = $$utils.ajaxPost(instance.options.urlCombo + "data", {data: $$json.stringify(queryParams)});
        $("#_" + instance.options.tagId + "_tbmain").datagrid("loadData", rtdata);
        $("#_" + instance.options.tagId + "_tbmain").datagrid("selectRecord", $("#" + instance.options.tagId).val());
    }

    //根据id,设置text
    function setTextsById(id) {
        var params = {id: id, textField: options.textField};
        var rtdata = $$utils.ajaxPost(instance.options.urlCombo + "findTextsById", {data: $$json.stringify(params)});
        $("#_" + instance.options.tagId + "_text").val(rtdata["text"]);
    }

    init();
    return instance;
}/**
 * 回调标准html的change事件
 * @param e
 * @return {*}
 */
coco.comp = {};
function invokeChange(e) {
    var name = e.data.name;
    var event = e.data.eventName;
    var controlObj = $$data.getControlModelByKey(name);
    var oldValue = controlObj.val();
    // 如何获取当前DOM控件的值, 修改当前控件模型的值为当前DOM控件的值
    controlObj.val(this.value);

    if (controlObj.state.options.events[event]) controlObj.state.options.events[event](this.value, oldValue);
    //grid字段控件值发生变化，通知grid
    if (!controlObj.state.options.inGrid) {
        var ds = $$data.getDatasource(controlObj.state.options.dsName);
        if (!ds || !ds.isList) return;
        var cm = $$data.getControlModel(controlObj.state.options.dsName);
        if (cm) cm.setFieldValue({field: controlObj.state.options.code, value: controlObj.state.data.value});
    }
}

function __isRepeat(targetObj, propName) {
    var result = false;

    $.each(targetObj, function (p, v) {
        if (p == propName) {
            result = true;
        }
    });

    return result;
}

window.$$model = coco.comp.model = {
    anchorModel: function (options) {
        var instance = {
            state: {
                options: options,
                doms: [], //对应的页面控件级参数
                data: {}
            },
            //js参数设置
            setOptions: function (opts) {
                $.extend(this.state.options, opts.modelOption || {});// 控件模型的属性
                $.extend(this.state.options.compOption, opts.ctrlOption || {});// 构建控件本身的属性
            },
            //绑定事件，param:{eventName, function}，可能是个数组
            bind: function (param) {
                $.extend(this.state.options.events, param || {});
            },
            resize: function (param) {
                if (param.dom) this.resizeCtrl(param.dom, param.width);
                else {
                    for (var i = 0, len = this.state.doms.length; i < len; i++) {
                        var dom = this.state.doms[i];
                        this.resizeCtrl(dom, param.width);
                    }
                }
            },
            setEnabled: function (param) {
                this.state.options.enabled = param;
                if (this.state.doms) {
                    for (var i = 0, len = this.state.doms.length; i < len; i++) {
                        var dom = this.state.doms[i];
                        this.setDomEnabled(dom, param);
                    }
                }
            },
            resizeCtrl: function (dom, width) {
                dom.ctrl.width(width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    if (!param) dom.ctrl.prop("readonly", true).addClass("coco_readonly");
                    else dom.ctrl.prop("readonly", false).removeClass("coco_readonly");
                }
            },
            // 判断控件是否是只读
            isReadOnly: function (cmReadOnly, templateReadOnly) {
                return cmReadOnly || templateReadOnly == 1;
            },
            // 显示控件 param==undefined显示指定的HTML控件
            show: function (param) {
                var isList = this.state.options.isList;
                if (!isList) {
                    if (param) $("[key=" + param + "]").show();
                    else {
                        for (var i = 0, len = this.state.doms.length; i < len; i++) {
                            var dom = this.state.doms[i];
                            var controlKey = dom.param.field.controlKey;
                            $("[key=" + controlKey + "]").show();
                        }
                    }
                }
                else {// 隐藏grid中的列
                    var ds = this.state.options.dsName;
                    var field = this.state.options.code;
                    $$data.cm(ds).call("showColumn", field);
                }
            },
            // 隐藏控件 param==undefined隐藏指定的HTML控件
            hide: function (param) {
                var isList = this.state.options.isList;
                if (!isList) {
                    // 卡片模式
                    if (param) $("[key=" + param + "]").hide();
                    else {
                        for (var i = 0, len = this.state.doms.length; i < len; i++) {
                            var dom = this.state.doms[i];
                            var controlKey = dom.param.field.controlKey;
                            $("[key=" + controlKey + "]").hide();
                        }
                    }
                }
                else {
                    var ds = this.state.options.dsName;
                    var field = this.state.options.code;
                    $$data.cm(ds).call("hideColumn", field);
                }
            },
            __getEnabled: function (param) {
                return this.state.options.enabled && !this.isReadOnly(instance.state.options.readonly, param.field.readonly) && page.isEdit
            },
            /**
             * 激活验证 Liuh since 2013/12/24
             */
            activateValidate: function () {
                if (this.state.doms) {
                    for (var i = 0, j = this.state.doms.length; i < j; i++) {
                        var dom = this.state.doms[i], opts = this.state.options.compOption, type = this.state.options.type;

                        var ctrlObj = $('#' + dom.ctrlId);

                        if (!(type == 'input' || type == 'number' || type == 'textarea' || type == 'date' || type == 'datetime')) {
                            var easyuiData = $.data(ctrlObj[0])
                            for(var ctrlType in easyuiData){
                                $.extend(easyuiData[ctrlType].options,opts);
                            }

                            ctrlObj = ctrlObj.next('span').children(':input').eq(0);
                        }

                        ctrlObj.validatebox('activate', {options: opts});
                    }
                }
            },
            /**
             * 取消验证
             * @param params
             */
            cancelValidate: function (params) {
                if (this.state.doms) {
                    for (var i = 0, j = this.state.doms.length; i < j; i++) {
                        var dom = this.state.doms[i], opts = this.state.options.compOption, options = {rules: {}}, type = this.state.options.type;

                        var ctrlObj = $('#' + dom.ctrlId);

                        if (!(type == 'input' || type == 'number' || type == 'textarea' || type == 'date' || type == 'datetime')) {
                            ctrlObj = ctrlObj.next('span').children(':input').eq(0);
                        }

                        $.each(opts, function (p, v) {
                            if (!__isRepeat(params, p)) {
                                options[p] = v;
                            }
                        });

                        this.state.options.compOption = options;

                        ctrlObj.validatebox('cancel', options);
                    }
                }
            }
        };
//        if (!options.isList) {
        instance.state.data.value = $$data.getFieldValue(options.dsName, options.code);
        var dm = $$dm(options.dsName, options.code);
        if (dm != null) {
            var textField = dm.textField;
            if (textField)
                instance.state.data.text = $$data.getFieldValue(options.dsName, textField);// 根据控件模型的配置获取text数据
        }
//        }
        instance.state.options.enabled = true;
        return instance;
    },

    /**
     * 标准input控件的控件模型封装
     * @param options
     * @return {Object}
     */
    input: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID(), ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {// 加入控件模型是只读的话,就直接是只读。此时不参考模板配置的readonly属性
                    ctrl = $('<input type="text" readonly id="' + id + '" class="coco_input coco_readonly" value="' + (this.state.data.value) + '">').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    ctrl = $('<input id="' + id + '" name="' + param.field.field + '" class="coco_input" type="text" value="' + this.state.data.value + '">').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    if (!page.isEdit) ctrl.attr("readonly", true);

                    if (instance.state.options) {
                        var validate = {}, consts = instance.state.options.compOption;
                        if (param.field.isRequired == 1) // liuh fix 2013/11/08
                            consts.required = true;
                        if (consts.required) {
                            validate.required = consts.required;
                        }
                        if (consts.validType)  validate.validType = consts.validType;
                        if (consts.customValid) validate.customValid = consts.customValid;
                        ctrl.validatebox(validate);
                    }
//                    var events = instance.state.options.events;
//                    var eventName = "change", eventFunc, ev;
//                    for (var n in events) {
//                        if (n.toLowerCase().startsWith("on")) {
//                            ev = n.substring(2, n.length).toLowerCase();
//                        } else ev = n.toLowerCase();
//                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
//                        else {
//                            // 如果是onchange事件需要绑定到平台事件中
//                            eventName = n;
//                            eventFunc = events[n];
//                        }
//                    }
//                    $(ctrl).bind(ev, { name:param.name, eventName:eventName, event:eventFunc}, invokeChange);// 始终需要绑定change事件
                    var events = instance.state.options.events;
                    $(ctrl).bind("change", { name: param.name, eventName: "change"}, invokeChange);// 始终需要绑定change事件
                    for (var n in events) {
                        var ev;
                        if (n.toLowerCase().startsWith("on")) {
                            ev = n.substring(2, n.length).toLowerCase();
                        } else ev = n.toLowerCase();
                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
                        else {
                            // 如果是onchange事件需要绑定到平台事件中
                            $(ctrl).unbind(ev).bind(ev, { name: param.name, eventName: n, event: events[n]}, invokeChange);
                        }
                    }
                }
                if (param.coco_input) ctrl.addClass(param.coco_input);
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            val: function (value, text) {
                if (value == undefined) return this.state.data.value;

                this.state.data.value = value;
                if (text) {
                    this.state.data.text = text;
                    $$data.__modifyTextFieldValue(options, text);
                }
                for (var i = 0, len = instance.state.doms.length; i < len; i++) {
                    var dom = instance.state.doms[i];
                    dom.ctrl.val(value);
                }
            },
            text: function (param) {
                return this.val(this.state.data.value, param);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {

            }
        });

        return instance;
    },
    /**
     * 数字控件模型
     * @param options
     * @return {Object}
     */
    number: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID(), ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $('<input type="text" readonly id="' + id + '" class="coco_input coco_readonly" value="' + (this.state.data.value) + '">').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    ctrl = $('<input id="' + id + '" name="' + param.field.field + '" class="coco_input" type="text" value="' + this.state.data.value + '">').appendTo(param.parent);
                    if (!page.isEdit) ctrl.attr("readonly", true);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    ctrl.numberbox(instance.state.options.compOption || {});

                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;

//                    var events = instance.state.options.events;
//                    // $(ctrl).bind("change", { name: param.name, eventName: "change"}, invokeChange);// 始终需要绑定change事件
//                    var eventName = "change" , eventFunc, ev;
//                    for (var n in events) {
//                        if (n.toLowerCase().startsWith("on")) {
//                            ev = n.substring(2, n.length).toLowerCase();
//                        } else ev = n.toLowerCase();
//                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
//                        else {
//                            // 如果是onchange事件需要绑定到平台事件中
//                            eventName = n;
//                            eventFunc = events[n];
//                        }
//                    }
//                    $(ctrl).bind(ev, { name:param.name, eventName:eventName, event:eventFunc}, invokeChange);// 始终需要绑定change事件
                    var events = instance.state.options.events;
                    $(ctrl).bind("change", { name: param.name, eventName: "change"}, invokeChange);// 始终需要绑定change事件
                    for (var n in events) {
                        var ev;
                        if (n.toLowerCase().startsWith("on")) {
                            ev = n.substring(2, n.length).toLowerCase();
                        } else ev = n.toLowerCase();
                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
                        else {
                            // 如果是onchange事件需要绑定到平台事件中
                            $(ctrl).unbind(ev).bind(ev, { name: param.name, eventName: n, event: events[n]}, invokeChange);
                        }
                    }
                }
                if (param.coco_input) ctrl.addClass(param.coco_input);
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            val: function (value, text) {
                if (value == undefined) return this.state.data.value;

                this.state.data.value = value;
                if (text) {
                    this.state.data.text = text;
                    $$data.__modifyTextFieldValue(options, text);
                }

                for (var i = 0, len = instance.state.doms.length; i < len; i++) {
                    var dom = instance.state.doms[i];
                    dom.ctrl.val(value);
                }
            },
            text: function (text) {
                return this.val(this.state.data.value, text);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    var ret;
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (method == "setOptions") ret = dom.ctrl.numberbox(param);
                        else ret = dom.ctrl.numberbox(method, param);
                    }
                }
                return ret;
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    if (param) dom.ctrl.attr("readonly", false).removeClass("coco_readonly");
                    else dom.ctrl.attr("readonly", true).addClass("coco_readonly");
                }
            }
        });

        return instance;
    },
    /**
     * 文本域控件的封装
     * @param options
     * @return {Object}
     */
    textarea: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID(), ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $('<textarea readonly id="' + id + '" class="coco_input coco_text coco_readonly" style="width: 80%;height: 90%">' + this.state.data.value + '</textarea>').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    ctrl = $('<textarea id="' + id + '" name="' + param.field.field + '" class="coco_input coco_text" style="width: 80%;height: 90%" value="' + this.state.data.value + '">' + this.state.data.value + '</textarea>').appendTo(param.parent);
                    if (!page.isEdit) ctrl.attr("readonly", true);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    if (instance.state.options) {
                        var validate = {}, consts = instance.state.options.compOption;
                        if (param.field.isRequired == 1) // liuh fix 2013/11/08
                            consts.required = true;
                        if (consts.required) {
                            validate.required = consts.required;
                        }
                        if (consts.validType)  validate.validType = consts.validType;
                        if (consts.customValid) validate.customValid = consts.customValid;
                        ctrl.validatebox(validate);
                    }
//                    var events = instance.state.options.events;
//                    var eventName = "change" , eventFunc, ev;
//                    for (var n in events) {
//                        if (n.toLowerCase().startsWith("on")) {
//                            ev = n.substring(2, n.length).toLowerCase();
//                        } else ev = n.toLowerCase();
//                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
//                        else {
//                            // 如果是onchange事件需要绑定到平台事件中
//                            eventName = n;
//                            eventFunc = events[n];
//                        }
//                    }
//                    $(ctrl).bind(ev, { name:param.name, eventName:eventName, event:eventFunc}, invokeChange);// 始终需要绑定change事件
                    var events = instance.state.options.events;
                    $(ctrl).bind("change", { name: param.name, eventName: "change"}, invokeChange);// 始终需要绑定change事件
                    for (var n in events) {
                        var ev;
                        if (n.toLowerCase().startsWith("on")) {
                            ev = n.substring(2, n.length).toLowerCase();
                        } else ev = n.toLowerCase();
                        if (!'change'.equalsIgnoreCase(ev))   $(ctrl).bind(ev, events[n]);
                        else {
                            // 如果是onchange事件需要绑定到平台事件中
                            $(ctrl).unbind(ev).bind(ev, { name: param.name, eventName: n, event: events[n]}, invokeChange);
                        }
                    }
                }
                if (param.coco_input) ctrl.addClass(param.coco_input);
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            val: function (param) {
                if (param == undefined) return this.state.data.value;

                this.state.data.value = param;

                for (var i = 0, len = instance.state.doms.length; i < len; i++) {
                    var dom = instance.state.doms[i];
                    dom.ctrl.val(param);
                }
            },
            text: function (param) {
                return this.val(param);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {

            }
        });

        return instance;
    },
    /**
     * AP中日期控件的封装
     * @param options
     * @return {Object}
     */
    date: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID(), ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $('<input type="text" readonly id="' + id + '" class="coco_input coco_readonly" value="' + this.state.data.value + '">').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    var p = $('<span/>').appendTo(param.parent);
                    ctrl = $('<input id="' + id + '" name="' + param.field.field + '" class="coco_input" value="' + this.state.data.value + '">').appendTo(p);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;
                    var change = this.state.options.events["onChange"];
                    this.state.options.events["onChange"] = undefined;
                    ctrl.datebox($.extend({
                        onChange: function (newValue, oldValue) {
                            instance.state.targetId = $(this).attr('id');
                            instance.val(newValue);
                            instance.state.targetId = undefined;
                            instance.state.data.text = $(this).datebox('getText');

                            if (instance.state.options.events.onChange)
                                instance.state.options.events.onChange(newValue, oldValue);
                        }
                    }, this.state.options.events || {}, this.state.options.compOption || {}));
                    this.state.options.events["onChange"] = change;
                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (param) {
                if (param == undefined) return this.state.data.value;

                this.state.data.value = param;

                for (var i = 0, len = instance.state.doms.length; i < len; i++) {
                    var dom = instance.state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (dom.ctrlId != this.state.targetId) {
                            dom.ctrl.datebox('setValue', param);
                            $('#disable_' + dom.ctrlId).val(param);
                        }
                    } else {//只读,需要修改text
                        dom.ctrl.val(param);//text
                    }
                }
            },
            text: function (param) {
                return this.val(param);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                var ret;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (method == "setOptions") ret = dom.ctrl.datebox(param);
                        else ret = dom.ctrl.datebox(method, param);
                    }
                }
                return ret;
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.datebox("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    var p = $('#' + dom.ctrlId).parent();
                    if (param) {
                        $('#disable_' + dom.ctrlId).remove();
                        p.show();
                    } else if ($('#disable_' + dom.ctrlId).length == 0) {
                        p.hide();
                        var text = dom.ctrl.datebox('getText');
                        text = text ? text : "";
                        $('<input type="text" readonly id="disable_' + dom.ctrlId + '" class="coco_input coco_readonly" tabIndex="' + dom.param.tabIndex + '" value="' + text + '">').appendTo(p.parent());

                    }
                }
            }
        });

        return instance;
    },
    datetime: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID(), ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $('<input type="text" readonly id="' + id + '" class="coco_input coco_readonly" value="' + this.state.data.value + '">').appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    var p = $('<span/>').appendTo(param.parent);
                    ctrl = $('<input id="' + id + '" name="' + param.field.field + '" class="coco_input" value="' + this.state.data.value + '">').appendTo(p);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;
                    var change = this.state.options.events["onChange"];
                    this.state.options.events["onChange"] = undefined;
                    ctrl.datetimebox($.extend({
                        onChange: function (newValue, oldValue) {
                            instance.state.targetId = $(this).attr('id');
                            instance.val(newValue);
                            instance.state.targetId = undefined;
                            instance.state.data.text = $(this).datebox('getText');

                            if (instance.state.options.events.onChange)
                                instance.state.options.events.onChange(newValue, oldValue);
                        }
                    }, this.state.options.events || {}, this.state.options.compOption || {}));
                    this.state.options.events["onChange"] = change;
                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (param) {
                if (param == undefined) return this.state.data.value;

                this.state.data.value = param;

                for (var i = 0, len = instance.state.doms.length; i < len; i++) {
                    var dom = instance.state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (dom.ctrlId != this.state.targetId) {
                            dom.ctrl.datebox('setValue', param);
                            $('#disable_' + dom.ctrlId).val(param);
                        }
                    } else {//只读,需要修改text
                        dom.ctrl.val(param);//text
                    }
                }
            },
            text: function (param) {
                return this.val(param);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                var ret;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (method == "setOptions") ret = dom.ctrl.datebox(param);
                        else ret = dom.ctrl.datebox(method, param);
                    }
                }
                return ret;
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.datebox("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    var p = $('#' + dom.ctrlId).parent();
                    if (param) {
                        $('#disable_' + dom.ctrlId).remove();
                        p.show();
                    } else if ($('#disable_' + dom.ctrlId).length == 0) {
                        p.hide();
                        var text = dom.ctrl.datebox('getText');
                        text = text ? text : "";
                        $('<input type="text" readonly id="disable_' + dom.ctrlId + '" class="coco_input coco_readonly" tabIndex="' + dom.param.tabIndex + '" value="' + text + '">').appendTo(p.parent());

                    }
                }
            }
        });

        return instance;
    },
    /**
     * tree控件的封装
     * @param options
     * @return {*}
     */
    tree: function (options) {
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数 notval:不设置value
            render: function (param, notval) {
                var id = $.parser.getObjGUID();
                var ctrl, coco_input = param.coco_input || "coco_input";
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $("<input type='text' readonly class='coco_readonly " + coco_input + "' id='" + id + "' value='" + (instance.state.data.text ? instance.state.data.text : "") + "'>").appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                    if(!notval){
                        ctrl = $$ctrl.tree[options.typeInstance]($.extend({
                            treeId: id,
                            value: notval ? undefined : instance.state.data.value,
                            text: instance.state.data.text
                        }, this.state.options.events || {}, this.state.options.compOption || {}));
                        ctrl.setEnabled(false);
                    }
                } else {
                    var p = $('<span/>').appendTo(param.parent);
                    ctrl = $("<input name='" + param.field.field + "' class='" + coco_input + "' id='" + id + "'>").appendTo(p);

                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    var change = this.state.options.events["onChange"];
                    this.state.options.events["onChange"] = undefined;
                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;
                    ctrl = $$ctrl.tree[options.typeInstance]($.extend({
                        treeId: id,
                        value: notval ? undefined : instance.state.data.value,
                        text: instance.state.data.text,
                        onChange: function (newValue, oldValue) {
                            //其他控件的change引发 或val过来的
                            if (instance.state.targetId || instance.state.isFromCode) return;

                            var $target = $(this);
                            instance.state.targetId = $target.attr('id');
                            instance.val(newValue, $target.combotree('getText'));
                            instance.state.targetId = undefined;
                        }
                    }, this.state.options.events || {}, this.state.options.compOption || {}));
                    this.state.options.events["onChange"] = change;
                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (value, text) {
                var state = instance.state;
                // 取值
                if (value == undefined) return state.data.value;

                if (value == "") text = ""; // 如果值为空,则文本也置为空

                var valChanged = state.data.value != value;
                instance.state.isFromCode = true;

                $$data.__modifyTextFieldValue(options, text);
                // 设值
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (dom.ctrlId != state.targetId) {
                            dom.ctrl.setValue(value, text);
                            $('#disable_' + dom.ctrlId).val(text);
                        }
                    } else {
                        dom.ctrl.val(text);
                    }
                }
                instance.state.isFromCode = false;
                state.data.value = value;
                state.data.text = text;
                if (valChanged && instance.state.options.events.onChange) instance.state.options.events.onChange(value, state.data.value);
            },
            text: function (param) {
                var state = instance.state;
                if (param == undefined) return state.data.text;

                state.data.text = param;
                this.val(state.data.value, state.data.text);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                var ret;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        ret = dom.ctrl[method](param);
                    }
                }
                return ret;
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.combotree("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    var p = $('#' + dom.ctrlId).parent();
                    if (param) {
                        $('#disable_' + dom.ctrlId).remove();
                        p.show();
                    } else if ($('#disable_' + dom.ctrlId).length == 0) {
                        p.hide();
                        var text = dom.ctrl.combotree('getText');
                        text = text ? text : "";
                        $('<input type="text" readonly id="disable_' + dom.ctrlId + '" class="coco_input coco_readonly" tabIndex="' + dom.param.tabIndex + '" value="' + text + '">').appendTo(p.parent());
                    }
                }
            }
        });

        return instance;
    },
    /**
     * combo控件的封装
     * @param options
     * @return {*}
     */
    combo: function (options) {
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID();
                var ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $("<input type='text' readonly class='coco_input coco_readonly' value='" + (instance.state.data.text ? instance.state.data.text : "") + "' id='" + id + "'>").appendTo(param.parent);
					 //region 虽然是readonly但还是有默认值的情况，需要把参照的key和value保存在ctrl里，以便有值的时候取text
                     ctrl.options={data:$$ctrl.combo[options.typeInstance]().options.data};
                     //endregion
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                } else {
                    var p = $('<span/>').appendTo(param.parent);
                    ctrl = $("<input name='" + param.field.field + "' class='coco_input' id='" + id + "'>").appendTo(p);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    var change = this.state.options.events["onChange"];
                    this.state.options.events["onChange"] = undefined;
                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;
                    ctrl = $$ctrl.combo[options.typeInstance]($.extend({
                        comboId: id,
                        canEmpty: false,
                        value: instance.state.data.value,
                        text: instance.state.data.text,
                        onChange: function (newValue, oldValue) {
                            instance.state.data.value = newValue;
                            instance.state.data.text = $(this).combobox('getText');

                            instance.val(instance.state.data.value, instance.state.data.text);

                            if (instance.state.options.events.onChange)
                                instance.state.options.events.onChange(newValue, oldValue);
                        }
                    }, this.state.options.events || {}, this.state.options.compOption || {}));
                    this.state.options.events["onChange"] = change;
                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (value, text) {
                if (this.state.doms[0]== undefined) return;
                //region  特殊处理combo被禁用显示选择了值的情况
                if (value!=undefined && text==undefined) {
                    if (this.isReadOnly(this.state.options.readonly, this.state.doms[0].param.field.readonly)) {
                        var data = this.state.doms[0].ctrl.options.data;
                        for (var i = 0, j = data.length; i < j; i++) {
                            if (value == data[i].id) {
                                text = data[i].text
                                break;
                            }
                        }
                    }
                }
                var state = instance.state;
                // 取值
                if (value == undefined) return state.data.value;

                if (value == "") text = "";// 如果值为空,则文本也置为空

                state.data.value = value;
                state.data.text = text;

                $$data.__modifyTextFieldValue(options, text);

                // 设值
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl.setValue(value, text);
                        $('#disable_' + dom.ctrlId).val(text);
                    } else {
                        dom.ctrl.val(text);
                    }
                }
            },
            text: function (param) {
                var state = instance.state;
                if (param == undefined) return state.data.text;

                state.data.text = param;
                this.val(state.data.value, state.data.text);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                var ret;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        //ret = dom.ctrl[method](param);
                        // Liuh fix 2014/01/20
                        ret = dom.ctrl.combobox(method, param);
                    }
                }
                return ret;
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.combobox("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    var p = $('#' + dom.ctrlId).parent();
                    if (param) {
                        $('#disable_' + dom.ctrlId).remove();
                        p.show();
                    } else if ($('#disable_' + dom.ctrlId).length == 0) {
                        p.hide();
                        var text = dom.ctrl.combobox('getText');
                        text = text ? text : "";
                        $('<input type="text" readonly id="disable_' + dom.ctrlId + '" class="coco_input coco_readonly" tabIndex="' + dom.param.tabIndex + '" value="' + text + '">').appendTo(p.parent());
                    }
                }
            }
        });

        return instance;
    },
    /**
     * list控件的封装
     * @param options
     * @return {*}
     */
    list: function (options) {
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数 notval:不设置value
            render: function (param, notval) {
                var id = $.parser.getObjGUID();
                var ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $("<input type='text' readonly class='coco_input coco_readonly' id='" + id + "' value='" + (instance.state.data.text ? instance.state.data.text : "") + "'>").appendTo(param.parent);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                    if(!notval){
                        ctrl = $$ctrl.list[options.typeInstance]($.extend({
                            listId: id,
                            canEmpty: false,
                            value: notval ? undefined : instance.state.data.value,
                            text: instance.state.data.text
                        }, this.state.options.events || {}, this.state.options.compOption || {}));
                        ctrl.setEnabled(false);
                    }
                } else {
                    var p = $('<span/>').appendTo(param.parent);
                    ctrl = $("<input name='" + param.field.field + "' class='coco_input' id='" + id + "'>").appendTo(p);
                    if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);

                    var change = this.state.options.events["onChange"];
                    this.state.options.events["onChange"] = undefined;
                    if (param.field.isRequired == 1) // liuh fix 2013/11/08
                        instance.state.options.compOption.required = true;
                    ctrl = $$ctrl.list[options.typeInstance]($.extend({
                        listId: id,
                        canEmpty: false,
                        value: notval ? undefined : instance.state.data.value,
                        text: instance.state.data.text,
                        onChange: function (newValue, oldValue) {
                            //其他控件的change引发 或val过来的
                            if (instance.state.targetId || instance.state.isFromCode) return;

                            var $target = $(this);
                            instance.state.targetId = $target.attr('id');
                            instance.val(newValue, $target.combogrid('getText'));
                            instance.state.targetId = undefined;
                        }
                    }, this.state.options.events || {}, this.state.options.compOption || {}));
                    this.state.options.events["onChange"] = change;
                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (value, text) {
                var state = instance.state;
                // 取值
                if (value == undefined) return state.data.value;

                if (value == "") text = "";// 如果值为空,则文本也置为空

                // Liuh fix 2014/01/08 记录旧值
                var oldValue = state.data.value;
                var valChanged = state.data.value != value;
                instance.state.isFromCode = true;

                $$data.__modifyTextFieldValue(options, text);
                // 设值
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        if (dom.ctrlId != state.targetId) {
                            dom.ctrl.setValue(value, text);
                            $('#disable_' + dom.ctrlId).val(text);
                        }
                    } else {
                        dom.ctrl.val(text);
                    }
                }
                instance.state.isFromCode = false;
                state.data.value = value;
                state.data.text = text;
                if (valChanged && instance.state.options.events.onChange) instance.state.options.events.onChange(value, oldValue);
            },
            text: function (param) {
                var state = instance.state;
                if (param == undefined) return state.data.text;

                state.data.text = param;
                this.val(state.data.value, state.data.text);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                var ret;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        ret = dom.ctrl[method](param);
                    }
                }
                return ret;
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.combogrid("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    var p = $('#' + dom.ctrlId).parent();
                    if (param) {
                        $('#disable_' + dom.ctrlId).remove();
                        p.show();
                    } else if ($('#disable_' + dom.ctrlId).length == 0) {
                        p.hide();
                        var text = dom.ctrl.combogrid('getText');
                        text = text ? text : "";
                        $('<input type="text" readonly id="disable_' + dom.ctrlId + '" class="coco_input coco_readonly" tabIndex="' + dom.param.tabIndex + '" value="' + text + '">').appendTo(p.parent());
                    }
                }
            }
        });

        return instance;
    },
    /**
     * grid控件的封装
     * @param options
     * @return {*}
     */
    grid: function (options) {//options:数据模型中配置的
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = param.field.controlKey ? param.field.controlKey : $.parser.getObjGUID();
                var ctrl = $('<table id="' + id + '" class="eap-datagrid"/>').appendTo(param.parent);
                var opts = param.field;//表单配置属性
                var i, len, frozenCol = [], cols = [], colDef, colField, col;
                for (i = 0, len = opts.detail.length; i < len; i++) {
                     colDef = opts.detail[i];
                    colDef.inGrid = true;

                    colField = $$data.getField(options.name, colDef.field);
                    var compOption = colField.compOption;
                    if (!colField) continue;

                    var textField = $$textField(colField.dsName, colField.code);
                    col = {field: colField.code, title: colDef.fieldCustomName, width: colDef.width || 100,
                        hidden: compOption.hidden,
                        sortable: compOption.sortable,
                        align: compOption.align,
                        resizable: compOption.resizable,
                        checkbox: compOption.checkbox,
                        formatter: compOption.formatter,
                        styler: compOption.styler,
                        sorter: compOption.sorter,
                        textField: textField,
                        isColEdit:compOption.isColEdit,
                        aTitle:compOption.aTitle
                    };
                    if (!col.formatter && coco.utils.str.isNotEmpty(textField)) {
                        col.formatter = function (value, row, index) {
                            return row[this.textField];
                        }
                    }
                    if (page.isEdit&&col.isColEdit==undefined){
                        col.editor = {type: 'model', options: colDef};
                    } else{
                        //当controlModel设置isColEdit为false的时候,返回自定义a标签,此时需要在业务js的page对象重写openBDialog方法
                        if(!col.isColEdit&&col.isColEdit!=undefined){
                            var aTitle=col.aTitle;
                            col.formatter = function (value, row, index) {
                               if(!page.openBDialog){page.openBDialog= function(index,tableId){
                               };}
                                return  "<a href='#'  onclick=page.openBDialog('" + index + "','" + id + "')>"+aTitle+"</a>";
                            }
                        }
                    }
                    if (colDef.freezing == 1) frozenCol.push(col);
                    else cols.push(col);
                }

                var gridopts = $.extend({
                    title: opts.title,
                    nowrap: true,
                    fit: true,
                    readOnly: opts.readonly == 1 || !page.isEdit,
                    fitColumns: true,
                    canAddDel: page.isEdit == true,
                    rownumbers: true,
                    loadDefault: true,
                    singleSelect: true, //仅单选否
                    checkOnSelect: false,
                    selectOnCheck: false,
                    multiple: false, // 是否多选
                    idField: options.pk,
                    pagination: opts.splitpage == 1,
                    datasource: options.name,
                    showEditorTool: true,
                    frozenColumns: coco.eui.grid.formatColumns(frozenCol),
                    columns: coco.eui.grid.formatColumns(cols),
                    getPageData: function (pageNumber, pageSize) {
                        var param;
                        if (opts.splitpage == 1) {// 分页
                            var param = {
                                detailType: options.name,
                                page: pageNumber,
                                rows: pageSize,
                                id: $$data.getFieldValue(options.relDs, options.relField)
                            };
                        } else {
                            var param = {
                                detailType: options.name,
                                id: $$data.getFieldValue(options.relDs, options.relField)
                            };
                        }
                        return coco.page.model.bill.queryDetail(param);
                    }
                }, instance.state.options.compOption || {}, instance.state.options.events || {});

                // 为grid添加frozenColumns 多选的时候
                if (gridopts.multiple) {// 多选的情况
                    gridopts.frozenColumns = coco.eui.grid.formatColumns($.extend([
                        {field: 'eap_grid_checkbox_name', checkbox: true, width: 40}
                    ], frozenCol));
                }

                gridopts.onSelect = function (rowIndex, rowData) {
                    //让外部数据源统一管理数据
                    var cm = $$data.getControlModel(options.name);
                    cm.select.call(cm, rowIndex, rowData);
                    if (cm.state.options.events && cm.state.options.events.onSelect)
                        cm.state.options.events.onSelect(rowIndex, rowData);
                };
                coco.page.model.grid.init(id, gridopts);

                instance.state.doms.push({
                    param: param,
                    ctrl: $('#' + id)
                });
                return ctrl;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (param) {
                throw new Error("grid不支持此类操作");
            },
            text: function (param) {
                throw new Error("grid不支持此类操作");
            },
            // 选中索引值，从0开始,如果gird没有被选中的行，则返回undefined
            getIndex: function () {
                return instance.state.index;
            },
            select: function (rowIndex) {
                if (!this.state.doms.length) return;
                if (this.state.index == rowIndex) return;
                this.state.index = rowIndex;

                coco.page.model.grid.endEdit(this.state.doms[0].ctrl);

                var i, len;
                var grid = this.state.doms[0].ctrl;
                var row = coco.eui.grid.getRowByIndex(grid, rowIndex);
                for (i = 0, len = this.state.options.list.length; i < len; i++) {
                    var field = this.state.options.list[i];
                    var cm = $$data.getControlModel(options.name, field.code);
                    if (cm) { //todo 如果在grid中无需赋值
                        if (!cm.state.options.inGrid) {
                            continue;
                        }
                        var v = row[field.code];
                        if (v) {
                            var dm = $$dm(options.name, field.code), text;
                            var textField = dm.textField;
                            if (textField) text = row[textField];
                            cm.val(v, text);
                        } else cm.val("");
                    }
                }
            },
            getFieldOldValue: function (field) {
                return this.getFieldValue(field);
            },
            getFieldValue: function (field) {
                if (!this.state.doms.length) return;
                var grid = this.state.doms[0].ctrl;
                var row = coco.eui.grid.getRowByIndex(grid, this.state.index);
                if (row) return row[field];
            },
            setFieldValue: function (param) {
                if (!this.state.doms.length) return;
                var grid = this.state.doms[0].ctrl;
                var rowIndex;
                if (param.rowIndex == undefined) rowIndex = this.state.index;
                else rowIndex = param.rowIndex;
                coco.page.model.grid.setCellValue(grid, rowIndex, param.field, param.value);
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                if (!this.state.doms.length) return;
                var grid = this.state.doms[0].ctrl;

                if (coco.page.model.grid[method]) {
                    return coco.page.model.grid[method](grid, param);
                } else {
                    return grid.datagrid(method, param);
                }
            },
            show: function (param) {
                this.call("showColumn", param);
            },
            // 隐藏控件 param==undefined隐藏指定的HTML控件
            hide: function (param) {
                this.call("hideColumn", param);
            },
            // 修改grid中所有field中的数据位value,callback:回调当返回true的时候才更新
            modifyData: function (param, callback) {
                var data = this.call("getData");
                var rows = data.rows;
                for (var i = 0, len = rows.length; i < len; i++) {
                    if (!callback || callback(rows[i])) {
                        for (var field in param) {
                            rows[i][field] = param[field];
                        }
                        if (!rows[i].es || rows[i].es == 0) {
                            this.call("setEdit", rows[i]);
                        }
                    }
                }
                this.call("loadData", data);
            },
            modifyCellValue: function (param) { //rowIndex, field, value
                var grid = this.state.doms[0].ctrl;
                coco.page.model.grid.setCellValue(grid, param);

                var row = $$egrid.getRowByIndex(grid, param.rowIndex);
                if (!row.es || row.es == 0) {
                    this.call("setEdit", row);
                }
            }
        });

        return instance;
    },

    /**
     * 单据权限组控件模型的封装
     * @param options
     * @return {Object}
     */
    privilegeGroupCtrl: function (options) {
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID();
                var ctrl;
                if (this.isReadOnly(instance.state.options.readonly, param.field.readonly)) {
                    ctrl = $("<input type='text' readonly class='coco_input' id='" + id + "' value='" + (instance.state.data.text ? instance.state.data.text : "") + "'>").appendTo(param.parent);
                } else {
                    $("<input class='coco_input' type='hidden' id='" + id + "'>").appendTo(param.parent);

                    ctrl = coco.ctrl.system.privilegeGroupCtrl($.extend({
                        listId: id
                    }, instance.state.options.compOption || {}));

                }
                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                this.setEnabled(this.__getEnabled(param));
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (value, text) {
                var state = instance.state;
                // 取值
                if (value == undefined) return state.data.value;

                // 设值
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl.setValue(value, text);
                    } else {
                        dom.ctrl.val(text);
                    }
                }
            },
            text: function (param) {
                var state = instance.state;
                if (param == undefined) return state.data.text;

                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        $('#' + dom.ctrl.options.listId).combogrid('setText', param);
                    } else {
                        dom.ctrl.val(param);
                    }
                }
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl[method](param);
                    }
                }
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    $('#' + dom.ctrl.options.listId).combogrid("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    if (!param) $('#' + dom.ctrl.options.listId).combogrid('disable');
                    else $('#' + dom.ctrl.options.listId).combogrid('enable');
                }
            }
        });

        return instance;
    },
    datequery: function (options) {
        var instance = $.extend($$model.anchorModel(options), {
            //页面渲染 param是表单参数
            render: function (param) {
                var id = $.parser.getObjGUID();
                var ctrl = $("<input name='" + param.field.field + "' class='coco_input' type='hidden' id='" + id + "'>").appendTo(param.parent).val(instance.state.data.value);
                if (param.tabIndex) ctrl.attr("tabIndex", param.tabIndex);
                var change = this.state.options.events["onChange"];
                this.state.options.events["onChange"] = undefined;
                ctrl = coco.ctrl.dateQuery($.extend({
                    valueTagId: id,
                    onChange: function (value) {
                        instance.state.data.value = value;

                        for (var i = 0; i < instance.state.doms; i++) {
                            instance.state.doms[i].ctrl.setValue(value);
                        }

                        if (instance.state.options.events.onChange)
                            instance.state.options.events.onChange(value);
                    }
                }, this.state.options.events || {}, this.state.options.compOption || {}));
                this.state.options.events["onChange"] = change;

                var dom = {
                    param: param,
                    ctrl: ctrl,
                    ctrlId: id
                };
                instance.state.doms.push(dom);
                return dom;
            },
            //如paran为空，则getValue，否则为setValue
            val: function (value) {
                var state = instance.state;
                // 取值
                if (value == undefined) return state.data.value;
                state.data.value = value;
                // 设值
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl.setValue(value);
                    }
                }
            },
            text: function (param) {
                var state = instance.state;
                if (param == undefined) return state.data.text;

                state.data.text = param;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl.setValue(state.data.value, param);
                    }
                }
            },
            //调用方法，method为方法名，param是一个对象
            call: function (method, param) {
                var state = instance.state;
                for (var i = 0, len = state.doms.length; i < len; i++) {
                    var dom = state.doms[i];
                    if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                        dom.ctrl[method](param);
                    }
                }
            },
            resizeCtrl: function (dom, width) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly))
                    dom.ctrl.combotree("resize", width);
            },
            setDomEnabled: function (dom, param) {
                if (!this.isReadOnly(instance.state.options.readonly, dom.param.field.readonly)) {
                    dom.ctrl.setEnabled(param);
                }
            }
        });

        return instance;
    }
};

window.$$ctrl = coco.comp.ctrl = {
    tree: {},
    combo: {},
    list: {}
};

$(function () {
    $.extend($.fn.datagrid.defaults.editors, {
        model: {
            init: function (container, options, tabIndex) {
                var model = $$data.getControlModelByKey(options.fieldCode);
                var dom = model.render({
                    parent: container,
                    name: options.fieldCode,
                    field: options,
                    tabIndex: tabIndex
                }, true);
                return {
                    model: model,
                    dom: dom
                };
            },
            getValue: function (target) {
                return target.model.val();
            },
            setValue: function (target, value, text) {
                value = value || "";
                target.model.val(value, text);
            },
            resize: function (target, width) {
                // 需减少padding-left与padding-right liuh 2013/06/09
                target.model.resize({com: target.com, width: width});
            },
            setEnabled: function (target, e) {
                target.model.setEnabled({com: target.dom, enabled: e});
            }
        }
    });
});


window.$$control = coco.comp.control = {
    inited: {},
    renderPage: function () {
        var gridTypeTab = [];// 存放grid类型的tab数据

        // 获取业务page中的数据
        var htmlTemplate = page.formTemplate;
        if (coco.utils.str.isEmptyStr(htmlTemplate)) {
            coco.utils.msg.slideError("没有找到配置的表单数据。");
            return;
        }
        var container = $("#formContent");
        var tabs, tab, block, cregion = null;
        var i, ilen = htmlTemplate.length;
        //准备布局
        for (i = 0; i < ilen; i++) {
            block = htmlTemplate[i];
            block.id = $.parser.getObjGUID();
            if (!block.blockHeight || block.blockHeight <= 300) block.blockHeight = 300;
            tabs = block.tabs;
            for (var k = 0, len = tabs.length; k < len; k++) {
                tab = tabs[k];
                tab.id = $.parser.getObjGUID();
                tab.key = block.id + "_" + tab.name; // 块name+标签Name
                tab.blockIndex = i;
            }

            var firstTab = tabs[0], firstName = firstTab.key;
            var blockHeight = block.blockHeight;
            /*if (tabs.length == 1) {
             //表示只有一个tab,不用tab的显示方式
             var div = $("<div id='" + firstTab.id + "' style='width:100%;height:" + blockHeight + "px' class='eap-container'/>").appendTo(container);
             $($$control.render(firstTab)).appendTo(div);
             } else {*/
            var blockHtml = [];
            blockHtml.push("<div id='" + block.id + "' class='eap-tabs'>");
            // 最开始只渲染第一个tab的控件,选中其他控件的时候才去初始化此tab的控件
            for (var j = 0; j < tabs.length; j++) {
                tab = tabs[j];
                var tabName = tab.name;
                var id = tab.id;
                if (!tab.fields || tab.fields.length > 0) {
                    blockHtml.push("<div title='" + tabName + "'><div id='" + id + "' class='eap-tabcontent eap-container' style='width:99%' gap_tab='1'/></div>");
                }

                gridTypeTab.push(block.id + "_" + tabName);// 所有页签都延迟加载
            }
            blockHtml.push("</div>");
            var dt2 = new Date();
            var blocks = $(blockHtml.join('')).appendTo(container)
                .tabs({
                    width: "auto",
                    height: blockHeight,
                    tools: [
                        {
                            iconCls: 'icon-view',
                            handler: function () {
                                // 隐藏当前的tab对应block下所有的tab
                                var block = $(this).parent().parent().parent();
                                var tab = block.find(".tabs-panels");
                                var blockStatus = block.attr("status");// 关闭,打开状态
                                var blockHeight = block.attr("blockHeight");// 块高度
                                if (tab) {
                                    if (blockStatus == 'close') {
                                        // 需要打开,还原高度
                                        $(tab).show();
                                        block.attr("status", "open");
                                        block.attr("blockHeight", 0);
                                        block.css("height", blockHeight);
                                    } else {
                                        // 需要关闭,同时记录住高度,把高度变成默认值
                                        $(tab).hide();
                                        block.attr("status", "close");
                                        block.attr("blockHeight", block.css("height"));
                                        block.css("height", "33px");
                                    }
                                }
                            }
                        }
                    ],
                    onSelect: function (title, index) {
                        if (!$$control.inited.pageLoaded) return;
                        var key = $(this).attr("id") + "_" + title;
                        var tab = $$control.getTab(key);
                        if (tab) $$control.render(tab);
                    }
                });
            $$control.render(firstTab);// 初始化每个块的第一个tab
            /*}*/
        }
        $$control.inited.pageLoaded = true;// 表示页面加载完成

        setTimeout(function () {
            $$control.__layzInit(gridTypeTab);
        }, 500);// 延迟加载每一个块中的grid类型的控件
    },
    // 延迟加载
    __layzInit: function (gridTypeTab) {
        if (gridTypeTab) {
            for (var i = 0, len = gridTypeTab.length; i < len; i++) {
                var tab = $$control.getTab(gridTypeTab[i]);
                $$control.render(tab, true);
            }
        }
    },
    getTab: function (key) {
        var htmlTemplate = page.formTemplate;
        var i, ilen = htmlTemplate.length, block, tabs, tab;
        //准备布局
        for (i = 0; i < ilen; i++) {
            block = htmlTemplate[i];
            tabs = block.tabs;
            for (var k = 0, len = tabs.length; k < len; k++) {
                tab = tabs[k];
                if (tab.key == key) return tab;
            }
        }
        return null;
    },
    render: function (tab, flag) {// flag 是否计算高度
        var $tab = $("#" + tab.id);
        var type = tab.type;
        if (!$$control.inited[tab.key]) {// 没渲染过
            $$control.inited[tab.key] = true;
            var type = tab.type;
            if (type == 'table') {
                $$control.renderCardByDiv(tab);
            } else if (type == 'grid') {
                var grid = tab.grid;
                var cm = $$data.getControlModel(grid.dsName);
                if (cm) {// 根据不同的控件渲染界面
                    var p = $tab;
                    p = p.attr("gap_tab") == '1' ? p.parent() : p;
                    cm.render({"parent": p, "name": grid.name, "field": grid});
                }
            } else if (type == 'custom') {
                var custom = tab.customs[0];
                // 直接渲染成一个iframe
                $('<iframe width="100%" requrl="' + coco.options.contextPath + '/' + custom.url + '">').appendTo($tab);
            }
        }
        var h = $$control.getBlockHeight(tab);
        var block = page.formTemplate[tab.blockIndex];
        if (!flag && (type == 'table' || type == 'custom'|| type == 'grid')) {
            //tab性能优化及iframe高度
            if (type == 'custom') {
                $('#' + block.id).tabs('resize', {height: 420});
                var url = $tab.find("iframe").attr("requrl");
                $tab.find("iframe").attr("src", url);
                $tab.find("iframe").load(function () {
                    $(this).height(385);
                });
            } else if(type == 'grid'){   //wujun fix 2014/3/6
                $('#' + block.id).tabs('resize', {height: h + 35});
            }else {
                $('#' + block.id).tabs('resize', {height: h + 40});
            }
        }

        if (type == 'table') {
            var tabId = tab.id;
            setTimeout(function () {
                $.hotkeys.focusFirst(tabId);
            }, 0);
        }
    },
    getBlockHeight: function (tab) {
        var h;
        var block = page.formTemplate[tab.blockIndex];
        if (tab.type == 'table') {
            h = $('#' + tab.id).height() + 5;
        }else if(tab.type == 'grid'){  //wujun fix 2014/3/6
            h = $('#' + tab.id).next('div.datagrid').height();
        }else if (tab.type == 'custom') { // liuh fix 2013/10/30
            h = $('#' + tab.id).find('iframe').contents().find('body').height() + block.blockHeight;
        }
        else h = block.blockHeight;
        return h;
    },
    // 通过div方式渲染单据头信息
    renderCardByDiv: function (tab) {
        var model = tab.layoutTable;
        var fields = tab.fields;

        var ulclass = "div-table-2", colWidth = 49;
        switch (model) {
            case 1:
                ulclass = "div-table-1";
                colWidth = 95;
                break;
            case 2:
                ulclass = "div-table-2";
                colWidth = 47;
                break;
            case 3:
                ulclass = "div-table-3";
                colWidth = 32;
                break;
        }
        var $tab = $("#" + tab.id);
        var ul = $('<ul class="' + ulclass + '" style="width:100%;overflow:hidden;">').appendTo($tab);
        // tr数目
        var contentCount = fields.length, tabIndex = 1;
        for (var index = 0; index < contentCount; index++) {
            var field = fields[index];
            // 表单模板数据
            var fieldCode = field.fieldCode;
            var cm = $$data.getControlModelByKey(fieldCode);
            if (!cm) continue;
            var li = $('<li class="div-table-cell" key="' + field.controlKey + '"/>').appendTo(ul);
            var td = $('<label>' + field.fieldCustomName + '</label>').appendTo(li);

            if (cm.state.options.type == "textarea") {
                field.mergerColumn = model;
                li.css('height', '55px');
            }
            var coco_input = "";
            if (field.mergerColumn > 1) {
                li.css("width", field.mergerColumn * colWidth + "%");
                coco_input = "coco_input_merge";
            }

            if (field.mergerColumn > 2) {
                coco_input = "coco_input_100";
            }

            cm.render({
                parent: li,
                name: fieldCode,
                field: field,
                tabIndex: tabIndex++,
                coco_input: coco_input
            });// 根据不同的控件渲染界面
        }
        tab.height = ul.height();
        $.hotkeys.parseElements($tab[0]);
    }
};

/**
 * 数据访问层
 * @type {Object}
 */
window.$$data = coco.comp.data = {
    // 控件模型集合,存放所有的控件模型
    controlModelList: {},
    // 模板数据map集合
    templateDataMap: new HashMap(),
    // 控件数据map集合
    controlDataMap: new HashMap(),
    getDatasource: function (ds) {
        return page.control[ds];
    },
    getField: function (ds, field) {
        var datasource = $$data.getDatasource(ds);
        if (!datasource || !datasource.list || !datasource.list.length) return;
        for (var j = 0; j < datasource.list.length; j++) {
            var control = datasource.list[j];
            if (control.code == field) return control
        }
    },
    // 根据业务提供的数据模型生成控件模型集合
    generatorControlModelList: function () {
        for (var ds in page.control) {// 循环属性
            var datasource = page.control[ds];
            if (datasource.isList) $$data.controlModelList["ds_" + ds] = $$model.grid(datasource);
            for (var j = 0; j < datasource.list.length; j++) {
                var control = datasource.list[j];
                $$data.controlModelList[ds + "_" + control.code] = $$model[control.type](control);
            }
        }
    },
    generatorTemplateMap: function () {
        // 把数据模板数据转换成map格式
        $$data.templateDataMap = $$data.__buildTemplateToMap();
        $$data.controlDataMap = $$data.__buildControlToMap();
    },
    getDataModel: function (ds, field) {
        return $$data.controlDataMap.get(ds + "_" + field);
    },
    /**
     * 从controlModelList中获取控件模型
     * @param ds
     * @param field
     */
    getControlModel: function (ds, field) {
        var key;
        if (field) key = ds + "_" + field;
        else key = "ds_" + ds;
        return $$data.getControlModelByKey(key);
    },
    getControlModelByKey: function (key) {
        return $$data.controlModelList[key];
    },
    /**
     * 提供访问业务数据模型的接口方法
     */
    getFieldOldValue: function (ds, field) {
        var datasource = $$data.getDatasource(ds);
        if (!datasource) return;
        if (!datasource.isList) {
            if (page.jsonData) {
                var dsValues = page.jsonData[ds].value;
                return dsValues[field] != undefined ? dsValues[field] : "";
            }
        } else {
            var cm = $$data.getControlModel(ds);
            if (cm) return cm.getFieldOldValue(field) != undefined ? cm.getFieldOldValue(field) : "";
        }
    },

    setFieldValue: function (ds, field, value) {
        var datasource = $$data.getDatasource(ds);
        if (!datasource) return;
        if (!datasource.isList) {
            if (page.jsonData) {
                var dsValues = page.jsonData[ds].value;
                dsValues[field] = value;
            }
        } else {
            var cm = $$data.getControlModel(ds);
            if (cm) cm.setFieldValue({field: field, value: value});
        }
    },
    /**
     * 提供访问空间值的方法
     * @param ds
     * @param field
     */
    getFieldValue: function (ds, field) {
        var datasource = $$data.getDatasource(ds);
        if (!datasource) return;
        if (!datasource.isList) {
            var cm = $$data.getControlModel(ds, field);
            return cm && (cm.val() != undefined) ? cm.val() : $$data.getFieldOldValue(ds, field);
        } else {
            var cm = $$data.getControlModel(ds);
            if (cm) return cm.getFieldValue(field);
        }
    },
    /**
     * 获取模板数据中的label信息
     * @param ds
     * @param field
     */
    getLabel: function (ds, field) {
        var value;
        var map = $$data.__getTemplateData(ds, field);
        if (map != null)
            value = map.fieldCustomName;
        else {
            var dm = $$dm(ds, field);
            if (dm) value = dm.label;
        }
        return value;
    },
    __getTemplateData: function (ds, field) {
        return $$data.templateDataMap.get(ds + "_" + field);
    },
    getRequired: function (ds, field) {
        var map = $$data.__getTemplateData(ds, field);
        return map.isRequired == 1;
    },
    /**
     * 把模板数据转换成map结构
     */
    __buildTemplateToMap: function () {
        var map = new HashMap();
        var htmlTemplate = page.formTemplate;
        if (coco.utils.str.isEmptyStr(htmlTemplate)) {
            coco.utils.msg.slideError("没有找到配置的表单数据。");
            return;
        }
        for (var i = 0, len = page.formTemplate.length; i < len; i++) {// 循环属性
            var block = page.formTemplate[i];
            var tabs = block.tabs;
            for (var j = 0, tablen = tabs.length; j < tablen; j++) {
                var tab = tabs[j];
                var tabtype = tab.type;
                if (tabtype == 'table') {
                    var fields = tab.fields;
                    for (var k = 0, fieldslen = fields.length; k < fieldslen; k++) {
                        var field = fields[k];
                        var dsName = field.dsName;
                        var fieldCode = field.field;
                        map.put(dsName + "_" + fieldCode, field);
                    }
                } else if (tabtype == 'grid') { // grid
                    var details = tab.grid.detail;
                    for (var k = 0, detaillen = details.length; k < detaillen; k++) {
                        var detail = details[k];
                        var dsName = detail.dsName;
                        var fieldCode = detail.field;
                        map.put(dsName + "_" + fieldCode, detail);
                    }
                }
            }
        }
        return map;
    },
    /**
     * 把模板数据转换成map结构
     */
    __buildControlToMap: function () {
        var map = new HashMap();
        for (var ds in page.control) {// 循环属性
            var datasource = page.control[ds];
            for (var j = 0; j < datasource.list.length; j++) {
                var control = datasource.list[j];
                var dsName = control.dsName;
                var fieldCode = control.code;
                map.put(dsName + "_" + fieldCode, control);
            }
        }
        return map;
    },
    /**
     * 修改textField的值
     * @param options
     * @param param
     * @private
     */
    __modifyTextFieldValue: function (options, param) {
        var textField = $$textField(options.dsName, options.code);
        if (coco.utils.str.isNotEmpty(textField)) {
            $$data.setFieldValue(options.dsName, textField, param);
        }
    }
};

window.$$cm = window.$$data.cm = window.$$data.getControlModel;
window.$$dm = window.$$data.dm = window.$$data.getDataModel;
window.$$textField = function (ds, field) {
    var dm = $$dm(ds, field);
    if (dm) return dm.textField;
    return undefined;
}