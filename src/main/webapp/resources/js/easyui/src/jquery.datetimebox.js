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
