/**
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
})(jQuery);