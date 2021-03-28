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
})(jQuery);