!function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){"use strict";var r=$,o=r.extend,i={language:null,editor:null,matchings:null,code:""};e.exports=function(){var t=this;this.panel=[o(!0,{},i),o(!0,{},i)],this.exam_mode=!1,this.setLanguage=function(e,n){t.panel[e].language=n},this.setEditor=function(e,n){t.panel[e].editor=n},this.setMatchings=function(e,n){t.panel[e].matchings=n},this.setCode=function(e,n){t.panel[e].code=n},this.enterExamMode=function(){t.exam_mode=!0},this.exitExamMode=function(){t.exam_mode=!1},this.getLanguage=function(e){return t.panel[e].language},this.getEditor=function(e){return t.panel[e].editor},this.getMatchings=function(e){return t.panel[e].matchings},this.getCode=function(e,n){var r=t.panel[e].code;return n?r.replace(/#(\d+)\{\[(((?!\]\}).)*)\]\}/g,"$2"):r},this.isExamMode=function(){return t.exam_mode}}},{}],2:[function(t,e,n){"use strict";e.exports={}},{}],3:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.exports=function(){function t(e,n){var o=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];r(this,t),this.parent=null,this.name=e,this.dir=n,this.children=i,this.element=null,this.next=null,i.forEach(function(t){t.parent=o})}return o(t,[{key:"sub",value:function(t){return this.children[t]}}]),t}()},{}],4:[function(t,e,n){"use strict";var r=t("./language"),o=t("./category");e.exports={Language:r,Category:o}},{"./category":3,"./language":5}],5:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.exports=function(){function e(t,n,o){r(this,e),this.name=t,this.ace=n,this.ext=o}return o(e,null,[{key:"getWithExt",value:function(e){var n=t("../server"),r=n.getLanguages(),o=!0,i=!1,a=void 0;try{for(var s,u=r[Symbol.iterator]();!(o=(s=u.next()).done);o=!0){var c=s.value;if(c.ext==e)return c}}catch(t){i=!0,a=t}finally{try{!o&&u.return&&u.return()}finally{if(i)throw a}}}}]),e}()},{"../server":26}],6:[function(t,e,n){"use strict";var r=t("../app"),o=t("./view_code"),i=1;e.exports={enter:function(){r.enterExamMode(),$("#next").addClass("selected"),$(".desc-container .blur").css("display","block");var t=r.getEditor(i);t.setReadOnly(!1),t.setValue("")},exit:function(t){r.exitExamMode(),$("#next").removeClass("selected next"),$(".desc-container .blur").css("display","");var e=r.getEditor(i);e.setReadOnly(!0),t||o(i,r.getCode(i))}}},{"../app":2,"./view_code":18}],7:[function(t,e,n){"use strict";var r=t("./setup_main"),o=t("./init_editor"),i=t("./init_categories"),a=t("./setup_layout"),s=t("./setup_matching"),u=t("./setup_exam"),c=t("./set_language"),l=t("./view_code"),f=t("./view_desc"),p=t("./view_comparison"),d=t("./exam");e.exports={setupMain:r,initEditor:o,initCategories:i,setupLayout:a,setupMatching:s,setupExam:u,setLanguage:c,viewCode:l,viewDesc:f,viewComparison:p,exam:d}},{"./exam":6,"./init_categories":8,"./init_editor":9,"./set_language":10,"./setup_exam":11,"./setup_layout":12,"./setup_main":13,"./setup_matching":17,"./view_code":18,"./view_comparison":19,"./view_desc":20}],8:[function(t,e,n){"use strict";var r=t("../server"),o=t("../storage"),i=t("../app"),a=t("./view_code"),s=t("./view_desc"),u=t("./exam"),c=0,l=1,f=function(t,e,n){r.loadCode(e,n).then(function(e){u.exit(),i.setCode(t,e),a(t,e)}),t==l&&r.loadDesc(e,n).then(s)};e.exports=function(t){var e=$("#index");t.forEach(function(t,n){t.element=$("<li>"+(n+1)+"| "+t.name+"</li>"),e.append(t.element);var r=$('<ul class="sub" data-category="'+n+'"></ul>');e.append(r),t.children.forEach(function(t,e){t.element=$('<li data-subcategory="'+e+'">'+t.name+"</li>"),r.append(t.element)})}),$("#index > li").click(function(){$("#index > li.active").removeClass("active"),$(this).addClass("active")}),$("ul.sub > li").click(function(){$("ul.sub > li.active").removeClass("active"),$(this).addClass("active");var e=$(this),n=$(this).parent(),r=t[n.data("category")].sub(e.data("subcategory"));o.category.set(r),f(c,r,i.getLanguage(c)),f(l,r,i.getLanguage(l)),u.exit()});var n=o.category.get();do n.element.click(),n=n.parent;while(n)}},{"../app":2,"../server":26,"../storage":30,"./exam":6,"./view_code":18,"./view_desc":20}],9:[function(t,e,n){"use strict";var r=t("../app");e.exports=function(t,e,n){var o=$(".panel:eq("+t+")"),i=o.find(".code"),a=ace.edit(i.attr("id"));return a.setTheme("ace/theme/monokai"),0==t&&o.find(".desc").addClass("ace-monokai"),a.getSession().setMode("ace/mode/"+e.ace),a.getSession().setUseWrapMode(!0),a.setShowFoldWidgets(!1),a.setReadOnly(!0),a.renderer.on("afterRender",function(){r.isExamMode()||n&&n()}),a}},{"../app":2}],10:[function(t,e,n){"use strict";e.exports=function(t,e){var n=$(".panel:eq("+t+")"),r=n.find(".title");r.text(e.name)}},{}],11:[function(t,e,n){"use strict";var r=t("../app"),o=t("./exam"),i=t("../util"),a=1,s=function(t,e){return u(i.zip(t),i.zip(e))};e.exports=function(){var t=r.getEditor(a);t.on("change",function(e){if(r.isExamMode()){var n=s(r.getCode(a,!0),t.getValue());$(".progress").css("width",100*n+"%"),1==n&&(o.exit(!0),$("#next").addClass("next"),$(".progress").css("width",""))}})};var u=function(t,e){var n=t,r=e;t.length<e.length&&(n=e,r=t);var o=n.length;return 0==o?1:(o-c(n,r))/parseFloat(o)},c=function(t,e){for(var n=[],r=0;r<=t.length;r++){for(var o=r,i=0;i<=e.length;i++)if(0==r)n[i]=i;else if(i>0){var a=n[i-1];t.charAt(r-1)!=e.charAt(i-1)&&(a=Math.min(Math.min(a,o),n[i])+1),n[i-1]=o,o=a}r>0&&(n[e.length]=o)}return n[e.length]}},{"../app":2,"../util":33,"./exam":6}],12:[function(t,e,n){"use strict";var r=t("../app"),o=t("./exam");e.exports=function(){$("#next").click(function(){var t=$(this);if(t.hasClass("next")){var e=$(".sub > li.active");if(e.is(":last-child")){var n=$("#index > li.active");n.is(":nth-last-child(2)")?alert("Congrats!"):(n.next().next().click(),$("#index > li.active + .sub > li:first-child").click())}else e.next().click();t.removeClass("next")}else r.isExamMode()?o.exit():o.enter()})}},{"../app":2,"./exam":6}],13:[function(t,e,n){"use strict";var r=t("./setup_languages"),o=t("./setup_stick_to_bottom"),i=t("./setup_smooth_scroll");e.exports=function(){r(),o(),i()}},{"./setup_languages":14,"./setup_smooth_scroll":15,"./setup_stick_to_bottom":16}],14:[function(t,e,n){"use strict";var r=t("../../server"),o=r.getLanguages();e.exports=function(){for(var t=["#lang-from","#lang-to"],e=function(){var e=t[n],r=$(e),i=!0,a=!1,s=void 0;try{for(var u,c=o[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var l=u.value,f=$('<a class="lang" href="'+("#lang-from"==e?"#dots":"#top")+'"></a>');r.append(f);var p=$('<div class="logo" style="background-image: url(\'./images/lang_'+l.ext+".png')\"></div>");f.append(p),p.append('<div class="logo mono" style="background-image: url(\'./images/lang_'+l.ext+"_mono.png')\"></div>"),f.append('<div class="name">'+l.name+"</div>")}}catch(t){a=!0,s=t}finally{try{!i&&c.return&&c.return()}finally{if(a)throw s}}r.find(".lang").click(function(){r.find(".lang.selected").removeClass("selected"),$(this).addClass("selected")})},n=0;n<t.length;n++)e();$(".lang").click(function(){var t=$("#lang-to"),e=$("#lang-from .lang.selected"),n=$("#lang-to .lang.selected");if(e.length&&n.length){var r=e.index(),i=n.index()-2;t.find('[name="lang_from"]').val(o[r].ext),t.find('[name="lang_to"]').val(o[i].ext),t.submit()}})}},{"../../server":26}],15:[function(t,e,n){"use strict";e.exports=function(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html, body").animate({scrollTop:t.offset().top},500),!1}});var t=$(".focused"),e=function(){t.toggleClass("unfocused",$(document).scrollTop()<=168)};e(),$(window).scroll(e)}},{}],16:[function(t,e,n){"use strict";e.exports=function(){var t=$(".stick-to-bottom.fake"),e=$(".stick-to-bottom.real"),n=$("#lang-from"),r=$(".fullscreen"),o=function(){var o=n.offset().top+n.height(),i=t.offset().top;r.toggleClass("full",o<i),e.toggleClass("stick",o<i)};o(),$(window).resize(o)}},{}],17:[function(t,e,n){"use strict";e.exports=function(){$(".code, #comparison").mousemove(function(t){$(".match").removeClass("selected");var e=$(this),n=t.pageX,r=t.pageY;e.find(".match").each(function(){var t=$(this),e=t.offset(),o=e.top,i=e.left,a=o+t.height(),s=i+t.width();o<r&&r<a&&i<n&&n<s&&!function(){var e=t.data("match");$(".match").filter(function(){return $(this).data("match")==e}).addClass("selected")}()})})}},{}],18:[function(t,e,n){"use strict";var r=t("../app");e.exports=function(t,e){var n=[];r.setMatchings(t,n);for(var o=e.split(/\r?\n/),i=99999,a=function(t){o[t]=o[t].replace(/(^|\]\})(((?!#\d+\{\[).)+)/gm,"$1#"+i+"{[$2]}"),o[t]=o[t].replace(/#(\d+)\{\[(((?!\]\}).)*)\]\}/g,function(e,r,o){return r=parseInt(r),r==i&&(r=-1),n.push([o,r,t]),o})},s=0;s<o.length;s++)a(s);e=o.join("\n"),r.getEditor(t).setValue(e,-1)}},{"../app":2}],19:[function(t,e,n){"use strict";var r=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=t("../app"),i=0,a=1;e.exports=function(){var t=$("#comparison"),e=[o.getMatchings(i),o.getMatchings(a)],n=-1,s=!0,u=!1,c=void 0;try{for(var l,f=e[Symbol.iterator]();!(s=(l=f.next()).done);s=!0){var p=l.value;if(null==p)return;var d=!0,h=!1,v=void 0;try{for(var g,m=p[Symbol.iterator]();!(d=(g=m.next()).done);d=!0){var y=g.value;n=Math.max(n,y[1])}}catch(t){h=!0,v=t}finally{try{!d&&m.return&&m.return()}finally{if(h)throw v}}}}catch(t){u=!0,c=t}finally{try{!s&&f.return&&f.return()}finally{if(u)throw c}}for(var w=[],_=0;_<=n;_++)w.push([[],[],-1]);for(var b=[i,a],x=function(){var t=b[E];$(".panel:eq("+t+") .code .match").each(function(){var e=$(this),n=e.data("match");w[n][t].push(e),0==t&&w[n][2]==-1&&(w[n][2]=e.parent().parent().index())})},E=0;E<b.length;E++)x();for(var C=function(t){if(w[t][2]==-1){var n=e[0];n.every(function(e){return e[1]!=t||(w[t][2]=e[2],!1)})}},k=0;k<=n;k++)C(k);t.empty(),t.append("<h2>Key Changes</h2>"),t.append("<h6>Not all changes are shown.</h6>");var S=-1,T=!0,j=!1,M=void 0;try{for(var A,O=function(){var e=A.value,n=r(e,2),o=n[0],i=n[1],a=o.length==i.length&&o.every(function(t,e){return t.text()==i[e].text()});if(a)return"continue";var s=e[2];S!=s&&(S=s,t.append('<div class="line line-number">Line '+(s+1)+"</div>"));var u=$('<div class="line"></div>');t.append(u);for(var c=[o,i],l=0;l<c.length;l++){var f=c[l],p=$('<span class="group"></span>');u.append(p),f.length||p.append('<span class="empty"></span>');var d=!0,h=!1,v=void 0;try{for(var g,m=f[Symbol.iterator]();!(d=(g=m.next()).done);d=!0){var y=g.value,w=y.clone();w.data("match",y.data("match")),p.append(w)}}catch(t){h=!0,v=t}finally{try{!d&&m.return&&m.return()}finally{if(h)throw v}}}},L=w[Symbol.iterator]();!(T=(A=L.next()).done);T=!0){O()}}catch(t){j=!0,M=t}finally{try{!T&&L.return&&L.return()}finally{if(j)throw M}}}},{"../app":2}],20:[function(t,e,n){"use strict";e.exports=function(t){var e=new showdown.Converter,n=$("#description");n.html(e.makeHtml(t))}},{}],21:[function(t,e,n){"use strict";var r=t("rsvp"),o=t("./dom"),i=t("./server"),a=t("./storage"),s=t("./app"),u=t("./app/constructor"),c=t("./bean"),l=c.Language,f=$,p=f.extend,d=i.getCategories(),h=0,v=1;r.on("error",function(t){console.assert(!1,t)}),p(!0,window,{main:o.setupMain,learn:function(){p(!0,s,new u),p(!0,window,{app:s});var t=g("lang_from"),e=g("lang_to");if(t&&e){var n=a.language.set(h,t)||a.language.set(v,e);n&&a.category.set(d[0].sub(0))}else t=a.language.get(h),e=a.language.get(v);var r=l.getWithExt(t),i=l.getWithExt(e);s.setLanguage(h,r),s.setLanguage(v,i),s.setEditor(h,o.initEditor(h,r,o.viewComparison)),s.setEditor(v,o.initEditor(v,i,o.viewComparison)),o.initCategories(d),o.setupLayout(),o.setupMatching(),o.setupExam(),o.setLanguage(h,r),o.setLanguage(v,i)}});var g=function(t){for(var e=decodeURIComponent(window.location.search.substring(1)).split("&"),n=0;n<e.length;n++){var r=e[n].split("=");if(r[0]===t)return void 0===r[1]||r[1]}return null}},{"./app":2,"./app/constructor":1,"./bean":4,"./dom":7,"./server":26,"./storage":30,rsvp:35}],22:[function(t,e,n){"use strict";var r=t("./request");e.exports=function(t){return r(t,{type:"GET"})}},{"./request":23}],23:[function(t,e,n){"use strict";var r=t("rsvp"),o=$,i=o.ajax,a=o.extend,s={};e.exports=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new r.Promise(function(n,r){var o={success:function(t){n(t)},error:function(t){r(t)}},u=a({},s,e,o,{url:t});i(u)})}},{rsvp:35}],24:[function(t,e,n){"use strict";var r=t("../bean"),o=r.Category;e.exports=function(){return i};var i=[new o("Comments","comment",[new o("Single Line Comments","single"),new o("Multiple Lines Comments","multi")]),new o("Variables","var",[new o("Definition","def"),new o("Boolean Type","bool"),new o("Numeric Types","num"),new o("Strings","str"),new o("Data Structures","data_structure"),new o("Constants","const")]),new o("Operators","operator",[new o("Boolean Operations","bool"),new o("Comparisons","compare"),new o("Bitwise Operations","bitwise")]),new o("Conditionals","conditional",[new o("If / Else Statement","if_else"),new o("Switch / Case Statement","switch_case"),new o("Ternary Operator","ternary")]),new o("Loops","loop",[new o("For Statement","for"),new o("While Statement","while"),new o("Continue Statement","continue"),new o("Break Statement","break")]),new o("Functions","func",[new o("Definition","def"),new o("Parameters","param"),new o("Return Statement","return")]),new o("Classes","class",[new o("Definition","def"),new o("Class Variables","cls_var"),new o("Class Functions","cls_func"),new o("Instances","obj"),new o("Instance Variables","obj_var"),new o("Instance Functions","obj_func"),new o("Inheritance","inherit")]),new o("Built-In","built_in",[new o("Math Functions","math"),new o("String Functions","str"),new o("Data Structure Operations","data_structure"),new o("Others","etc")])]},{"../bean":4}],25:[function(t,e,n){"use strict";var r=t("../bean"),o=r.Language;e.exports=function(){return i};var i=[new o("C++","c_cpp","cpp"),new o("Python","python","py"),new o("Java","java","java"),new o("EMCAScript","javascript","js"),new o("Nada.",null,"idk")]},{"../bean":4}],26:[function(t,e,n){"use strict";var r=t("./load_code"),o=t("./load_desc"),i=t("./get_categories"),a=t("./get_languages");e.exports={loadCode:r,loadDesc:o,getCategories:i,getLanguages:a}},{"./get_categories":24,"./get_languages":25,"./load_code":27,"./load_desc":28}],27:[function(t,e,n){"use strict";var r=t("./ajax/get");e.exports=function(t,e){var n=e.ext+"/code."+e.ext;do n=t.dir+"/"+n,t=t.parent;while(t);return r("./data/"+n)}},{"./ajax/get":22}],28:[function(t,e,n){"use strict";var r=t("./ajax/get");e.exports=function(t,e){var n=e.ext+"/desc.md";do n=t.dir+"/"+n,t=t.parent;while(t);return r("./data/"+n)}},{"./ajax/get":22}],29:[function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=t("./manager"),i=o.set,a=o.get,s=t("../server"),u=function(){return"category"};e.exports={set:function(t){var e="";do e=t.dir+"/"+e,t=t.parent;while(t);return e.substr(0,e.length-1),i(u(),e)},get:function(){var t=s.getCategories(),e=a(u()).split("/"),n=!0,o=!1,i=void 0;try{for(var c,l=function(){var e=c.value,n=$.grep(t,function(t){return t.dir==e})[0];if(t=n.children,!t.length)return{v:n}},f=e[Symbol.iterator]();!(n=(c=f.next()).done);n=!0){var p=l();if("object"===("undefined"==typeof p?"undefined":r(p)))return p.v}}catch(t){o=!0,i=t}finally{try{!n&&f.return&&f.return()}finally{if(o)throw i}}return null}}},{"../server":26,"./manager":32}],30:[function(t,e,n){"use strict";var r=t("./language"),o=t("./category");e.exports={language:r,category:o}},{"./category":29,"./language":31}],31:[function(t,e,n){"use strict";var r=t("./manager"),o=r.set,i=r.get,a=function(t){return"lang_"+t};e.exports={set:function(t,e){return o(a(t),e)},get:function(t){return i(a(t))}}},{"./manager":32}],32:[function(t,e,n){"use strict";e.exports={set:function(t,e){return Cookies.get(t)!=e&&(Cookies.set(t,e),!0)},get:function(t){return Cookies.get(t)},remove:function(t){return Cookies.remove(t),!0}}},{}],33:[function(t,e,n){"use strict";e.exports={zip:function(t){return t.trim().replace(/^\s*[\r\n]/gm,"").replace(/\b\s+\B/g,"").replace(/\B\s+\b/g,"").replace(/\B\s+\B/g,"")}}},{}],34:[function(t,e,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function a(t){if(p===clearTimeout)return clearTimeout(t);if((p===o||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function s(){g&&h&&(g=!1,h.length?v=h.concat(v):m=-1,v.length&&u())}function u(){if(!g){var t=i(s);g=!0;for(var e=v.length;e;){for(h=v,v=[];++m<e;)h&&h[m].run();m=-1,e=v.length}h=null,g=!1,a(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var f,p,d=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{p="function"==typeof clearTimeout?clearTimeout:o}catch(t){p=o}}();var h,v=[],g=!1,m=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];v.push(new c(t,e)),1!==v.length||g||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},{}],35:[function(t,e,n){(function(r,o){!function(t,r){"object"==typeof n&&"undefined"!=typeof e?r(n):"function"==typeof define&&define.amd?define(["exports"],r):r(t.RSVP=t.RSVP||{})}(this,function(e){"use strict";function n(t,e){for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1}function i(t){var e=t._promiseCallbacks;return e||(e=t._promiseCallbacks={}),e}function a(t,e){return"onerror"===t?void Ct.on("error",e):2!==arguments.length?Ct[t]:void(Ct[t]=e)}function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function u(t){return"function"==typeof t}function c(t){return"object"==typeof t&&null!==t}function l(){}function f(){setTimeout(function(){for(var t=0;t<jt.length;t++){var e=jt[t],n=e.payload;n.guid=n.key+n.id,n.childGuid=n.key+n.childId,n.error&&(n.stack=n.error.stack),Ct.trigger(e.name,e.payload)}jt.length=0},50)}function p(t,e,n){1===jt.push({name:t,payload:{key:e._guidKey,id:e._id,eventName:t,detail:e._result,childId:n&&n._id,label:e._label,timeStamp:St(),error:Ct["instrument-with-stack"]?new Error(e._label):null}})&&f()}function d(t,e){var n=this;if(t&&"object"==typeof t&&t.constructor===n)return t;var r=new n(v,e);return b(r,t),r}function h(){return new TypeError("A promises callback cannot return that same promise.")}function v(){}function g(t){try{return t.then}catch(t){return Lt.error=t,Lt}}function m(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function y(t,e,n){Ct.async(function(t){var r=!1,o=m(n,e,function(n){r||(r=!0,e!==n?b(t,n,void 0):E(t,n))},function(e){r||(r=!0,C(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,C(t,o))},t)}function w(t,e){e._state===At?E(t,e._result):e._state===Ot?(e._onError=null,C(t,e._result)):$(e,void 0,function(n){e!==n?b(t,n,void 0):E(t,n)},function(e){return C(t,e)})}function _(t,e,n){e.constructor===t.constructor&&n===A&&t.constructor.resolve===d?w(t,e):n===Lt?C(t,Lt.error):void 0===n?E(t,e):u(n)?y(t,e,n):E(t,e)}function b(t,e){t===e?E(t,e):s(e)?_(t,e,g(e)):E(t,e)}function x(t){t._onError&&t._onError(t._result),k(t)}function E(t,e){t._state===Mt&&(t._result=e,t._state=At,0===t._subscribers.length?Ct.instrument&&p("fulfilled",t):Ct.async(k,t))}function C(t,e){t._state===Mt&&(t._state=Ot,t._result=e,Ct.async(x,t))}function $(t,e,n,r){var o=t._subscribers,i=o.length;t._onError=null,o[i]=e,o[i+At]=n,o[i+Ot]=r,0===i&&t._state&&Ct.async(k,t)}function k(t){var e=t._subscribers,n=t._state;if(Ct.instrument&&p(n===At?"fulfilled":"rejected",t),0!==e.length){for(var r=void 0,o=void 0,i=t._result,a=0;a<e.length;a+=3)r=e[a],o=e[a+n],r?j(n,r,o,i):o(i);t._subscribers.length=0}}function S(){this.error=null}function T(t,e){try{return t(e)}catch(t){return It.error=t,It}}function j(t,e,n,r){var o=u(n),i=void 0,a=void 0,s=void 0,c=void 0;if(o){if(i=T(n,r),i===It?(c=!0,a=i.error,i=null):s=!0,e===i)return void C(e,h())}else i=r,s=!0;e._state!==Mt||(o&&s?b(e,i):c?C(e,a):t===At?E(e,i):t===Ot&&C(e,i))}function M(t,e){var n=!1;try{e(function(e){n||(n=!0,b(t,e))},function(e){n||(n=!0,C(t,e))})}catch(e){C(t,e)}}function A(t,e,n){var r=arguments,o=this,i=o._state;if(i===At&&!t||i===Ot&&!e)return Ct.instrument&&p("chained",o,o),o;o._onError=null;var a=new o.constructor(v,n),s=o._result;return Ct.instrument&&p("chained",o,a),i?!function(){var t=r[i-1];Ct.async(function(){return j(i,a,t,s)})}():$(o,a,t,e),a}function O(t,e,n){return t===At?{state:"fulfilled",value:n}:{state:"rejected",reason:n}}function L(t,e,n,r){this._instanceConstructor=t,this.promise=new t(v,r),this._abortOnReject=n,this._validateInput(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._init(),0===this.length?E(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&E(this.promise,this._result))):C(this.promise,this._validationError())}function I(t,e){return new L(this,t,(!0),e).promise}function R(t,e){var n=this,r=new n(v,e);if(!kt(t))return C(r,new TypeError("You must pass an array to race.")),r;for(var o=0;r._state===Mt&&o<t.length;o++)$(n.resolve(t[o]),void 0,function(t){return b(r,t)},function(t){return C(r,t)});return r}function P(t,e){var n=this,r=new n(v,e);return C(r,t),r}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function F(t,e){this._id=Pt++,this._label=e,this._state=void 0,this._result=void 0,this._subscribers=[],Ct.instrument&&p("created",this),v!==t&&("function"!=typeof t&&D(),this instanceof F?M(this,t):N())}function q(){this.value=void 0}function B(t){try{return t.then}catch(t){return Dt.value=t,Dt}}function V(t,e,n){try{t.apply(e,n)}catch(t){return Dt.value=t,Dt}}function U(t,e){for(var n={},r=t.length,o=new Array(r),i=0;i<r;i++)o[i]=t[i];for(var a=0;a<e.length;a++){var s=e[a];n[s]=o[a+1]}return n}function W(t){for(var e=t.length,n=new Array(e-1),r=1;r<e;r++)n[r-1]=t[r];return n}function Y(t,e){return{then:function(n,r){return t.call(e,n,r)}}}function z(t,e){var n=function(){for(var n=this,r=arguments.length,o=new Array(r+1),i=!1,a=0;a<r;++a){var s=arguments[a];if(!i){if(i=H(s),i===Nt){var u=new F(v);return C(u,Nt.value),u}i&&i!==!0&&(s=Y(i,s))}o[a]=s}var c=new F(v);return o[r]=function(t,n){t?C(c,t):void 0===e?b(c,n):e===!0?b(c,W(arguments)):kt(e)?b(c,U(arguments,e)):b(c,n)},i?G(c,o,t,n):K(c,o,t,n)};return n.__proto__=t,n}function K(t,e,n,r){var o=V(n,r,e);return o===Dt&&C(t,o.value),t}function G(t,e,n,r){return F.all(e).then(function(e){var o=V(n,r,e);return o===Dt&&C(t,o.value),t})}function H(t){return!(!t||"object"!=typeof t)&&(t.constructor===F||B(t))}function J(t,e){return F.all(t,e)}function X(t,e,n){this._superConstructor(t,e,!1,n)}function Q(t,e){return new X(F,t,e).promise}function Z(t,e){return F.race(t,e)}function tt(t,e,n){this._superConstructor(t,e,!0,n)}function et(t,e){return new tt(F,t,e).promise}function nt(t,e,n){this._superConstructor(t,e,!1,n)}function rt(t,e){return new nt(F,t,e).promise}function ot(t){throw setTimeout(function(){throw t}),t}function it(t){var e={resolve:void 0,reject:void 0};return e.promise=new F(function(t,n){e.resolve=t,e.reject=n},t),e}function at(t,e,n){return F.all(t,n).then(function(t){if(!u(e))throw new TypeError("You must pass a function as map's second argument.");for(var r=t.length,o=new Array(r),i=0;i<r;i++)o[i]=e(t[i]);return F.all(o,n)})}function st(t,e){return F.resolve(t,e)}function ut(t,e){return F.reject(t,e)}function ct(t,e){return F.all(t,e)}function lt(t,e){return F.resolve(t,e).then(function(t){return ct(t,e)})}function ft(t,e,n){var r=kt(t)?ct(t,n):lt(t,n);return r.then(function(t){if(!u(e))throw new TypeError("You must pass a function as filter's second argument.");for(var r=t.length,o=new Array(r),i=0;i<r;i++)o[i]=e(t[i]);return ct(o,n).then(function(e){for(var n=new Array(r),o=0,i=0;i<r;i++)e[i]&&(n[o]=t[i],o++);return n.length=o,n})})}function pt(t,e){zt[Ft]=t,zt[Ft+1]=e,Ft+=2,2===Ft&&Kt()}function dt(){var t=r.nextTick,e=r.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(e)&&"0"===e[1]&&"10"===e[2]&&(t=setImmediate),function(){return t(yt)}}function ht(){return"undefined"!=typeof qt?function(){qt(yt)}:mt()}function vt(){var t=0,e=new Ut(yt),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){return n.data=t=++t%2}}function gt(){var t=new MessageChannel;return t.port1.onmessage=yt,function(){return t.port2.postMessage(0)}}function mt(){return function(){return setTimeout(yt,1)}}function yt(){for(var t=0;t<Ft;t+=2){var e=zt[t],n=zt[t+1];e(n),zt[t]=void 0,zt[t+1]=void 0}Ft=0}function wt(){try{var e=t,n=e("vertx");return qt=n.runOnLoop||n.runOnContext,ht()}catch(t){return mt()}}function _t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function bt(){Ct.on.apply(Ct,arguments)}function xt(){Ct.off.apply(Ct,arguments)}var Et={mixin:function(t){return t.on=this.on,t.off=this.off,t.trigger=this.trigger,t._promiseCallbacks=void 0,t},on:function(t,e){if("function"!=typeof e)throw new TypeError("Callback must be a function");var r=i(this),o=void 0;o=r[t],o||(o=r[t]=[]),n(o,e)===-1&&o.push(e)},off:function(t,e){var r=i(this),o=void 0,a=void 0;return e?(o=r[t],a=n(o,e),void(a!==-1&&o.splice(a,1))):void(r[t]=[])},trigger:function(t,e,n){var r=i(this),o=void 0,a=void 0;if(o=r[t])for(var s=0;s<o.length;s++)(a=o[s])(e,n)}},Ct={instrument:!1};Et.mixin(Ct);var $t=void 0;$t=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var kt=$t,St=Date.now||function(){return(new Date).getTime()},Tt=Object.create||function(t){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof t)throw new TypeError("Argument must be an object");return l.prototype=t,new l},jt=[],Mt=void 0,At=1,Ot=2,Lt=new S,It=new S;L.prototype._validateInput=function(t){return kt(t)},L.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},L.prototype._init=function(){this._result=new Array(this.length)},L.prototype._enumerate=function(){for(var t=this.length,e=this.promise,n=this._input,r=0;e._state===Mt&&r<t;r++)this._eachEntry(n[r],r)},L.prototype._settleMaybeThenable=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===d){var o=g(t);if(o===A&&t._state!==Mt)t._onError=null,this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=this._makeResult(At,e,t);else if(n===F){var i=new n(v);_(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},L.prototype._eachEntry=function(t,e){c(t)?this._settleMaybeThenable(t,e):(this._remaining--,this._result[e]=this._makeResult(At,e,t))},L.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===Mt&&(this._remaining--,this._abortOnReject&&t===Ot?C(r,n):this._result[e]=this._makeResult(t,e,n)),0===this._remaining&&E(r,this._result)},L.prototype._makeResult=function(t,e,n){return n},L.prototype._willSettleAt=function(t,e){var n=this;$(t,void 0,function(t){return n._settledAt(At,e,t)},function(t){return n._settledAt(Ot,e,t)})};var Rt="rsvp_"+St()+"-",Pt=0;F.cast=d,F.all=I,F.race=R,F.resolve=d,F.reject=P,F.prototype={constructor:F,_guidKey:Rt,_onError:function(t){var e=this;Ct.after(function(){e._onError&&Ct.trigger("error",t,e._label)})},then:A,catch:function(t,e){return this.then(void 0,t,e)},finally:function(t,e){var n=this,r=n.constructor;return n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})},e)}};var Dt=new q,Nt=new q;X.prototype=Tt(L.prototype),X.prototype._superConstructor=L,X.prototype._makeResult=O,X.prototype._validationError=function(){return new Error("allSettled must be called with an array")},tt.prototype=Tt(L.prototype),tt.prototype._superConstructor=L,tt.prototype._init=function(){this._result={}},tt.prototype._validateInput=function(t){return t&&"object"==typeof t},tt.prototype._validationError=function(){return new Error("Promise.hash must be called with an object")},tt.prototype._enumerate=function(){var t=this,e=t.promise,n=t._input,r=[];for(var o in n)e._state===Mt&&Object.prototype.hasOwnProperty.call(n,o)&&r.push({position:o,entry:n[o]});var i=r.length;t._remaining=i;for(var a=void 0,s=0;e._state===Mt&&s<i;s++)a=r[s],t._eachEntry(a.entry,a.position)},nt.prototype=Tt(tt.prototype),nt.prototype._superConstructor=L,nt.prototype._makeResult=O,nt.prototype._validationError=function(){return new Error("hashSettled must be called with an object")};var Ft=0,qt=void 0,Bt="undefined"!=typeof window?window:void 0,Vt=Bt||{},Ut=Vt.MutationObserver||Vt.WebKitMutationObserver,Wt="undefined"==typeof self&&"undefined"!=typeof r&&"[object process]"==={}.toString.call(r),Yt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,zt=new Array(1e3),Kt=void 0;Kt=Wt?dt():Ut?vt():Yt?gt():void 0===Bt&&"function"==typeof t?wt():mt();var Gt=void 0;if("object"==typeof self)Gt=self;else{if("object"!=typeof o)throw new Error("no global: `self` or `global` found");Gt=o}var Ht;Ct.async=pt,Ct.after=function(t){return setTimeout(t,0)};var Jt=st,Xt=function(t,e){return Ct.async(t,e)};if("undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var Qt=window.__PROMISE_INSTRUMENTATION__;a("instrument",!0);for(var Zt in Qt)Qt.hasOwnProperty(Zt)&&bt(Zt,Qt[Zt])}var te=(Ht={cast:Jt,
Promise:F,EventTarget:Et,all:J,allSettled:Q,race:Z,hash:et,hashSettled:rt,rethrow:ot,defer:it,denodeify:z,configure:a,on:bt,off:xt,resolve:st,reject:ut,map:at},_t(Ht,"async",Xt),_t(Ht,"filter",ft),Ht);e.default=te,e.cast=Jt,e.Promise=F,e.EventTarget=Et,e.all=J,e.allSettled=Q,e.race=Z,e.hash=et,e.hashSettled=rt,e.rethrow=ot,e.defer=it,e.denodeify=z,e.configure=a,e.on=bt,e.off=xt,e.resolve=st,e.reject=ut,e.map=at,e.async=Xt,e.filter=ft,Object.defineProperty(e,"__esModule",{value:!0})})}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:34}]},{},[21]);
//# sourceMappingURL=duocoder.js.map
