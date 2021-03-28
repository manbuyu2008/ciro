/**
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
})(jQuery);