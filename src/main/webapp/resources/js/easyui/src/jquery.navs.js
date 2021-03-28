/**
 * Created with IntelliJ IDEA.
 * User: Liuh
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
})(jQuery);