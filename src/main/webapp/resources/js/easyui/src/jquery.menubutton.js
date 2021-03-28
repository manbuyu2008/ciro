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
