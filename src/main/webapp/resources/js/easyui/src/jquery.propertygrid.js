/**
 * propertygrid - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 * 	 datagrid
 * 
 */
(function($){
	function buildGrid(target){
		var opts = $.data(target, 'propertygrid').options;
		$(target).datagrid($.extend({}, opts, {
            cls:'propertygrid',
            view:(opts.showGroup ? groupview : undefined),
			onClickRow:function(index, row){
				if (opts.editIndex != index){
					var col = $(this).datagrid('getColumnOption', "value");
					col.editor = row.editor;
					leaveRow(opts.editIndex);
					$(this).datagrid('beginEdit', index);
					$(this).datagrid('getEditors', index)[0].target.focus();
					opts.editIndex = index;
				}
				opts.onClickRow.call(target, index, row);
            },
            onLoadSuccess:function (data) {
                $(target).datagrid('getPanel').find('div.datagrid-group').css('border', '0');
                opts.onLoadSuccess.call(target, data);
            }
		}));
		$(target).datagrid('getPanel').panel('panel').addClass('propertygrid');
		$(target).datagrid('getPanel').find('div.datagrid-body').unbind('.propertygrid').bind('mousedown.propertygrid', function(e){
			e.stopPropagation();
		});
		$(document).unbind('.propertygrid').bind('mousedown.propertygrid', function(){
			leaveRow(opts.editIndex);
			opts.editIndex = undefined;
		});
		
		function leaveRow(index){
			if (index == undefined) return;
			var t = $(target);
            t.datagrid('getEditors', index)[0].target.blur();
            if (t.datagrid('validateRow', index)){
				t.datagrid('endEdit', index);
			} else {
				t.datagrid('cancelEdit', index);
			}
		}
	}
	
	$.fn.propertygrid = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.propertygrid.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.datagrid(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'propertygrid');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'propertygrid', {
					options: $.extend({}, $.fn.propertygrid.defaults, $.fn.propertygrid.parseOptions(this), options)
				});
			}
			buildGrid(this);
		});
	};
	
	$.fn.propertygrid.methods = {
	};
	
	$.fn.propertygrid.parseOptions = function(target){
        return $.extend({}, $.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, [
            {showGroup:'boolean'}
        ]));
	};
	
	// the group view definition
	var groupview = $.extend({}, $.fn.datagrid.defaults.view, {
		render: function(target, container, frozen){
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var rows = state.data.rows;
            var fields = $(target).datagrid('getColumnFields', frozen);

			var table = [];
			var index = 0;
			var groups = this.groups;
			for(var i=0; i<groups.length; i++){
				var group = groups[i];

                table.push('<div class="datagrid-group" group-index=' + i + ' style="height:25px;overflow:hidden;border-bottom:1px solid #ccc;">');
				table.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>');
				table.push('<tr>');
				table.push('<td style="border:0;">');
				if (!frozen){
					table.push('<span style="color:#666;font-weight:bold;">');
					table.push(opts.groupFormatter.call(target, group.fvalue, group.rows));
					table.push('</span>');
				}
				table.push('</td>');
				table.push('</tr>');
				table.push('</tbody></table>');
				table.push('</div>');

                table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
				for(var j=0; j<group.rows.length; j++) {
					// get the class and style attributes for this row
                    var cls = (index % 2 && opts.striped) ? 'class="datagrid-row datagrid-row-alt"' : 'class="datagrid-row"';
					var styleValue = opts.rowStyler ? opts.rowStyler.call(target, index, group.rows[j]) : '';
					var style = styleValue ? 'style="' + styleValue + '"' : '';

                    var rowId = state.rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + index;
                    table.push('<tr id="' + rowId + '" datagrid-row-index="' + index + '" ' + cls + ' ' + style + '>');
					table.push(this.renderRow.call(this, target, fields, frozen, index, group.rows[j]));
					table.push('</tr>');
					index++;
				}
				table.push('</tbody></table>');
			}
			
			$(container).html(table.join(''));
		},
		
		onAfterRender: function(target){
			var opts = $.data(target, 'datagrid').options;
			var dc = $.data(target, 'datagrid').dc;
			var view = dc.view;
			var view1 = dc.view1;
			var view2 = dc.view2;
			
			$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
			var group;
			if (opts.rownumbers || opts.frozenColumns.length){
				group = view1.find('div.datagrid-group');
			} else {
				group = view2.find('div.datagrid-group');
			}
			$('<td style="border:0"><div class="datagrid-row-expander datagrid-row-collapse" style="width:25px;height:16px;cursor:pointer"></div></td>').insertBefore(group.find('td'));
			
			view.find('div.datagrid-group').each(function(){
				var groupIndex = $(this).attr('group-index');
				$(this).find('div.datagrid-row-expander').bind('click', {groupIndex:groupIndex}, function(e){
					if ($(this).hasClass('datagrid-row-collapse')){
						$(target).datagrid('collapseGroup', e.data.groupIndex);
					} else {
						$(target).datagrid('expandGroup', e.data.groupIndex);
					}
				});
			});
		},
		
		onBeforeRender: function(target, rows){
			var opts = $.data(target, 'datagrid').options;
			var groups = [];
            var i, len;
			for(i= 0,len = rows.length; i<len; i++){
				var row = rows[i];
				var group = getGroup(row[opts.groupField]);
				if (!group){
					group = {
						fvalue: row[opts.groupField],
						rows: [row],
						startRow: i
					};
					groups.push(group);
				} else {
					group.rows.push(row);
				}
			}
			
			function getGroup(fvalue){
				for(var i=0; i<groups.length; i++){
					var group = groups[i];
					if (group.fvalue == fvalue){
						return group;
					}
				}
				return null;
			}
			
			this.groups = groups;
			
			var newRows = [];
			for(i= 0, len = groups.length; i<len; i++){
				group = groups[i];
				for(var j=0; j<group.rows.length; j++){
					newRows.push(group.rows[j]);
				}
			}
			$.data(target, 'datagrid').data.rows = newRows;
		}
	});

	$.extend($.fn.datagrid.methods, {
	    expandGroup:function(jq, groupIndex){
	        return jq.each(function(){
	            var view = $.data(this, 'datagrid').dc.view;
                var group;
	            if (groupIndex!=undefined){
	                group = view.find('div.datagrid-group[group-index="'+groupIndex+'"]');
	            } else {
	                group = view.find('div.datagrid-group');
	            }
	            var expander = group.find('div.datagrid-row-expander');
	            if (expander.hasClass('datagrid-row-expand')){
	                expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
	                group.next('table').show();
	            }
	            $(this).datagrid('fixRowHeight');
	        });
	    },
	    collapseGroup:function(jq, groupIndex){
	        return jq.each(function(){
	            var view = $.data(this, 'datagrid').dc.view;
                var group;
	            if (groupIndex!=undefined){
	                group = view.find('div.datagrid-group[group-index="'+groupIndex+'"]');
	            } else {
	                group = view.find('div.datagrid-group');
	            }
	            var expander = group.find('div.datagrid-row-expander');
	            if (expander.hasClass('datagrid-row-collapse')){
	                expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
	                group.next('table').hide();
	            }
	            $(this).datagrid('fixRowHeight');
	        });
	    }
	});
	// end of group view definition
	
	$.fn.propertygrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		singleSelect:true,
		remoteSort:false,
		fitColumns:true,
		loadMsg:'',
		frozenColumns:[[
		    {field:'f',width:16,resizable:false}
		]],
		columns:[[
		    {field:'name',title:'Name',width:100,sortable:true},
		    {field:'value',title:'Value',width:100,resizable:false}
		]],
		
		showGroup:false,
		groupField:'group',
        groupFormatter:function (fvalue, rows) {
            return fvalue
        }
	});
})(jQuery);