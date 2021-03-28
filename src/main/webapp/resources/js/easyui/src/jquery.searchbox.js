/**
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
})(jQuery);