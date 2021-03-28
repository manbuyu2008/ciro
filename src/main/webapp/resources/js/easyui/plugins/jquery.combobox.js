(function(e){function i(q,t){var m=e(q).combo("panel");var u=m.find('div.combobox-item[value="'+t+'"]'),p;if(u.length){var o=u.position().top,r=m.scrollTop();if(o<=0){p=r+o;m.scrollTop(p)}else{var s=u.outerHeight(),n=m.height();if(o+s>n){p=r+o+s-n;m.scrollTop(p)}}}}function b(s){var o=e(s);var m=o.combo("panel");var n=o.combo("getValues");var q=m.find('div.combobox-item[value="'+n.pop()+'"]');if(q.length){var p=q.prev(":visible");if(p.length){q=p}}else{q=m.find("div.combobox-item:visible:last")}var r=q.attr("value");l(s,r);i(s,r)}function g(s){var o=e(s);var m=o.combo("panel");var n=o.combo("getValues");var q=m.find('div.combobox-item[value="'+n.pop()+'"]');if(q.length){var p=q.next(":visible");if(p.length){q=p}}else{q=m.find("div.combobox-item:visible:first")}var r=q.attr("value");l(s,r);i(s,r)}function l(t,s,r){if(!r){r=e.data(t,"combobox")}var p=r.options;var q=r.data;var o,m;if(p.multiple){var n=e(t).combo("getValues");for(o=0,m=n.length;o<m;o++){if(n[o]==s){return}}n.push(s);j(t,n,false,r)}else{j(t,[s],false,r)}for(o=0,m=q.length;o<m;o++){if(q[o][p.valueField]==s){p.onSelect.call(t,q[o]);return}}}function c(t,s,r){if(!r){r=e.data(t,"combobox")}var p=r.options;var q=r.data;var n=e(t).combo("getValues");var o,m;for(o=0,m=n.length;o<m;o++){if(n[o]==s){n.splice(o,1);j(t,n,false,r);break}}for(o=0,m=q.length;o<m;o++){if(q[o][p.valueField]==s){p.onUnselect.call(t,q[o]);return}}}function j(x,B,u,o){if(!o){o=e.data(x,"combobox")}var m=o.options;var r=o.data;var C=e(x);var n=C.combo("panel");n.find("div.combobox-item-selected").removeClass("combobox-item-selected");var z=[],E=[];for(var q=0,w=B.length;q<w;q++){var A=B[q];var D=A;for(var p=0,y=r.length;p<y;p++){if(r[p][m.valueField]==A){D=r[p][m.textField];break}}if(A||D){z.push(A);E.push(D)}n.find('div.combobox-item[value="'+A+'"]').addClass("combobox-item-selected")}if(!u){C.combo("setText",E.join(m.separator))}C.combo("setValues",z);if(m.onAfterChange){m.onAfterChange.call(x)}}function a(p,o){if(!o){o=e.data(p,"combobox")}var m=o.options;var n=[];e(">option",p).each(function(s,u){var r={};var q=e(this);var w=q.attr("value"),v=q.html();r[s.valueField]=w!=undefined?w:v;r[s.textField]=v;r.selected=q.prop("selected");u.push(r)},[m,n]);return n}function h(x,r,u,o){if(!o){o=e.data(x,"combobox")}var m=o.options;var A=e(x);var n=A.combo("panel");o.data=r;var p=A.combobox("getValues");n.empty();for(var q=0,w=r.length;q<w;q++){var C=r[q];var y=C[m.valueField];var B=C[m.textField];var z=e('<div class="combobox-item"></div>').appendTo(n);z.attr("value",y);if(m.formatter){z.html(m.formatter.call(x,C,m))}else{z.html(B)}if(C.selected){if(p.indexOf(y)<0){p.push(y)}}}if(m.multiple){j(x,p,u,o)}else{if(p.length){j(x,[p[p.length-1]],u,o)}else{j(x,[],u,o)}}m.onLoadSuccess.call(x,r);e(".combobox-item",n).hover(function(){e(this).addClass("combobox-item-hover")},function(){e(this).removeClass("combobox-item-hover")}).bind("click",{target:x},function(E){var D=E.data.target;var v=e.data(D,"combobox");var t=v.options;var s=e(this);if(t.multiple){if(s.hasClass("combobox-item-selected")){c(D,s.attr("value"),v)}else{l(D,s.attr("value"),v)}}else{l(D,s.attr("value"),v);A.combo("hidePanel")}})}function d(r,n,s,p,q){if(!q){q=e.data(r,"combobox")}var o=q.options;if(n){o.url=n}s=s||{};if(o.onBeforeLoad.call(r,s)==false){return}var m=e(r).attr("id");o.loader.call(r,s,function(t){var u=e("#"+m)[0];h(u,t,p)},function(){o.onLoadError.apply(this,arguments)},o)}function k(w,o,p){if(!p){p=e.data(w,"combobox")}var m=p.options;if(m.multiple&&!o){j(w,[],true,p)}else{j(w,[o],true,p)}if(m.mode=="remote"){d(w,null,{q:o},true,p)}else{var n=e(w).combo("panel");n.find("div.combobox-item").hide();var r=p.data;for(var t=0,u=r.length;t<u;t++){var A=r[t];if(m.filter.call(w,o,A,m)){var x=A[m.valueField];var z=A[m.textField];var y=n.find('div.combobox-item[value="'+x+'"]');y.show();if(z==o){j(w,[x],true,p);y.addClass("combobox-item-selected")}}}}}function f(p,o){if(!o){o=e.data(p,"combobox")}var n=o.options;var m=e(p);m.addClass("combobox-f");m.combo(e.extend({},n,{onShowPanel:function(){var q=e(this);q.combo("panel").find("div.combobox-item").show();i(this,q.combobox("getValue"));n.onShowPanel.call(this)}}))}e.fn.combobox=function(m,n){if(typeof m=="string"){var o=e.fn.combobox.methods[m];if(o){return o(this,n)}else{return this.combo(m,n)}}m=m||{};return this.each(function(p){var q=e.data(this,"combobox");if(q){e.extend(q.options,p);f(this,q)}else{q=e.data(this,"combobox",{options:e.extend({},e.fn.combobox.defaults,e.fn.combobox.parseOptions(this),p)});f(this,q);if(!q.options.data){h(this,a(this,q),false,q)}}if(q.options.data){h(this,q.options.data,false,q)}d(this,undefined,undefined,false,q)},[m])};e.fn.combobox.methods={options:function(m){return e.data(m[0],"combobox").options},getData:function(m){return e.data(m[0],"combobox").data},setValues:function(n,m){return n.each(function(){j(this,m)})},setValue:function(n,m){return n.each(function(){j(this,[m])})},clear:function(m){return m.each(function(){e(this).combo("clear");var n=e(this).combo("panel");n.find("div.combobox-item-selected").removeClass("combobox-item-selected")})},loadData:function(n,m){return n.each(function(){h(this,m)})},reload:function(n,m){return n.each(function(){d(this,m)})},select:function(n,m){return n.each(function(){l(this,m)})},unselect:function(n,m){return n.each(function(){c(this,m)})}};e.fn.combobox.parseOptions=function(m){return e.extend({},e.fn.combo.parseOptions(m),e.parser.parseOptions(m,["valueField","textField","mode","method","url"]))};e.fn.combobox.defaults=e.extend({},e.fn.combo.defaults,{valueField:"value",textField:"text",mode:"local",method:"post",url:null,data:null,keyHandler:{up:function(){b(this)},down:function(){g(this)},enter:function(){var n=e(this);var m=n.combobox("getValues");n.combobox("setValues",m);n.combobox("hidePanel")},query:function(m){k(this,m)}},filter:function(n,o,m){if(!m){m=e(this).combobox("options")}return o[m.textField].indexOf(n)==0},formatter:function(n,m){if(!m){m=e(this).combobox("options")}return n[m.textField]},loader:function(p,o,m,n){if(!n){n=e(this).combobox("options")}if(!n.url){return false}e.ajax({type:n.method,url:n.url,data:p,dataType:"json",success:function(q){o(q)},error:function(){m.apply(this,arguments)}})},onBeforeLoad:function(m){},onLoadSuccess:function(){},onLoadError:function(){},onSelect:function(m){},onUnselect:function(m){}})})(jQuery);