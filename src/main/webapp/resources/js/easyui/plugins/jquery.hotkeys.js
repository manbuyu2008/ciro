(function(f){f.hotkeys={specialKeys:{8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"},options:{firedText:true,enter2Tab:true},focusFirst:function(i){c(i)},focusNext:function(i){d(i)},parseElements:function(){b()},parseContainElements:function(i){g(i)},bindCallback:function(i,j){if(!f.hotkeys.keyCallBackListener[i]){f.hotkeys.keyCallBackListener[i]=[]}f.hotkeys.keyCallBackListener[i].push(j)},bindHotkey:function(i,j){if(!f.hotkeys.keyListener[i]){f.hotkeys.keyListener[i]=[]}f.hotkeys.keyListener[i].push(j)},elements:{},keyCallBackListener:{},keyListener:{}};function e(j){if(!f.hotkeys.options.firedText&&this!==j.target&&(/textarea|select/i.test(j.target.nodeName)||j.target.type==="text")){return}var q=j.type!=="keypress"&&f.hotkeys.specialKeys[j.which],o=String.fromCharCode(j.which).toLowerCase(),k="",l={};if(j.altKey&&q!=="alt"){k+="alt+"}if(j.ctrlKey&&q!=="ctrl"){k+="ctrl+"}if(j.metaKey&&!j.ctrlKey&&q!=="meta"){k+="meta+"}if(j.shiftKey&&q!=="shift"){k+="shift+"}if(q){l[k+q]=true}else{l[k+o]=true;l[k+f.hotkeys.shiftNums[o]]=true;if(k==="shift+"){l[f.hotkeys.shiftNums[o]]=true}}var r=f.hotkeys.keyListener;for(var s in r){if(!s){continue}if(l[s]){var p=r[s];for(var m=0,n=p.length;m<n;m++){if(p[m].call(this,j)==false){return false}}}}}function d(m){var l=$(m);var n=l.parents(".eap-container"),i;if(n.length){i=n[0].id}else{i="body"}l.blur();var k=$.hotkeys.elements[i];if(!k){return}var j=k.indexOf(m.id);if(j<0){return}j++;if(!a(k,j,i)){m.focus()}return false}function c(o){var k;if(typeof o=="string"){k=o}else{if(o&&o.nodeName.equalsIgnoreCase("body")){k="body"}else{k=o.id}}var m=$.hotkeys.elements[k];if(!m){return}for(var l=0,j=m.length;l<j;l++){var p=m[l],n=$("#"+p);if(n.is(":visible")&&!n.prop("disabled")&&(!n.prop("readonly")||n.is(".combo-text"))){n.focus().select();h("enter."+k,{id:p});break}}}function a(m,r,p){if(r>=m.length){var q=$(".eap-container");for(var o=0,s=q.length;o<s;o++){if(q[o].id==p){for(var n=o,s=q.length;n<s;n++){if($(q[n]).is(":visible")){$.hotkeys.focusFirst(q[n].id)}}}}h("enterLast."+p);return true}var k=m[r],l=$("#"+k);if(l.is(":visible")&&!l.prop("disabled")&&(!l.prop("readonly")||l.is(".combo-text"))){l.focus().select();h("enter."+p,{id:k});return true}return a(m,++r,p)}function b(){var i=$(".eap-container");if(i.length){i.each(function(){g(this)})}else{g(document.body)}}function g(k){var l=$(k);var j=[];l.find("input[tabIndex!=0], textarea[tabIndex!=0]").each(function(){var m=$(this);var n=m.attr("id");if(!n){n=$.parser.getObjGUID();m.attr("id",n)}j.push(n)});j.sort(function(n,m){return $("#"+n).attr("tabIndex")-$("#"+m).attr("tabIndex")});if(j.length){var i;if(k.nodeName.equalsIgnoreCase("body")){i="body"}else{i=l.attr("id");if(!i){i=$.parser.getObjGUID();l.attr("id",i)}}$.hotkeys.elements[i]=j}}function h(m,n){var o=$.hotkeys.keyCallBackListener[m];if(!o||!o.length){return}for(var l=0,j=o.length;l<j;l++){var k=o[l](n);if(k==false){return false}}}$(document).bind("keydown.hotkeys",e);f.hotkeys.bindHotkey("enter",function(j){var i=j.target.type||j.target.getAttribute("type");if(f.hotkeys.options.enter2Tab&&i!="textarea"){if(h("enter",j)!=false){return d(j.target)}return false}});f.hotkeys.bindHotkey("backspace",function(j){var i=j.target.type||j.target.getAttribute("type");if(i!="password"&&i!="text"&&i!="textarea"){return false}var l=$(j.target);var k=l.prop("readonly")||l.prop("disabled");if(k){return false}})})(jQuery);