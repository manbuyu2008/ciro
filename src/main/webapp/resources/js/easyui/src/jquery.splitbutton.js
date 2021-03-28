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
})(jQuery);