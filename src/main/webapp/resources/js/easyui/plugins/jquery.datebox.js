(function(c){function b(k,i){if(!i){i=c.data(k,"datebox")}var h=i.options,g=c(k);g.addClass("datebox-f");if(!g.attr("id")){g.attr("id",c.parser.getObjGUID())}h.afterPanelInited=f;g.combo(c.extend({},h,{onShowPanel:function(){var n=this;var m=c.data(n,"datebox");var l=m.options;m.calendar.calendar("resize");l.onShowPanel.call(n);m=null;l=null}}));var j=g.combo("textbox").parent();j.addClass("datebox");g.combo("setValueText",{value:h.value,text:h.value})}function f(l,h){var k=c.data(l,"datebox");var j=k.options;var g=c(l);k.calendar=c('<div comboid="'+g.attr("id")+'"></div>').appendTo(h).wrap('<div class="datebox-calendar-inner"></div>');k.calendar.calendar({fit:true,border:false,onSelect:function(n){var r=c("#"+c(this).attr("comboid"))[0];var q=c.data(r,"datebox");var o=q.options,m=c(r);var p=o.formatter(n);d(r,p,q);m.combo("hidePanel");m.combo("textbox").focus().select();o.onSelect.call(r,n)}});d(l,g.combo("getValue"),k);var i=c('<div class="datebox-button"></div>').appendTo(h);c('<a href="javascript:void(0)" class="datebox-current">'+j.currentText+'</a><a href="javascript:void(0)" class="datebox-close">'+j.closeText+"</a>").appendTo(i);i.find(".datebox-current,.datebox-close").hover(function(){c(this).addClass("datebox-button-hover")},function(){c(this).removeClass("datebox-button-hover")});i.find(".datebox-current").bind("click",{target:l},function(n){var m=c.data(n.data.target,"datebox");m.calendar.calendar({year:new Date().getFullYear(),month:new Date().getMonth()+1,current:new Date()})});i.find(".datebox-close").bind("click",{target:l},function(n){var m=c(n.data.target);m.combo("hidePanel");m.combo("textbox").focus().select()})}function e(h,g){d(h,g)}function a(j){var i=c.data(j,"datebox");var g=i.options;var k=i.calendar;var h=g.formatter(k.calendar("options").current);d(j,h,i);c(j).combo("hidePanel")}function d(j,i,h){if(!h){h=c.data(j,"datebox")}var g=h.options;c(j).combo("setValue",i).combo("setText",i);if(h.calendar&&i&&i!=""){h.calendar.calendar("moveTo",g.parser(i))}}c.fn.datebox=function(g,h){if(typeof g=="string"){var i=c.fn.datebox.methods[g];if(i){return i(this,h)}else{return this.combo(g,h)}}g=c.extend({validType:"isDate"},g);return this.each(function(j){var k=c.data(this,"datebox");if(k){c.extend(k.options,j)}else{k=c.data(this,"datebox",{options:c.extend({},c.fn.datebox.defaults,c.fn.datebox.parseOptions(this),j)})}b(this,k)},[g])};c.fn.datebox.methods={options:function(g){return c.data(g[0],"datebox").options},calendar:function(g){return c.data(g[0],"datebox").calendar},setValue:function(h,g){return h.each(function(){d(this,g)})}};c.fn.datebox.parseOptions=function(g){return c.extend({},c.fn.combo.parseOptions(g),{})};c.fn.datebox.defaults=c.extend({},c.fn.combo.defaults,{panelWidth:180,panelHeight:"auto",keyHandler:{up:function(){},down:function(){},enter:function(){a(this)},query:function(g){e(this,g)}},doQuery:function(g){e(this,g)},currentText:"Today",closeText:"Close",okText:"Ok",formatter:function(h){var j=h.getFullYear();var g=h.getMonth()+1;var i=h.getDate();return g+"/"+i+"/"+j},parser:function(h){var g=Date.parse(h);if(!isNaN(g)){return new Date(g)}else{return new Date()}},onSelect:function(g){}})})(jQuery);