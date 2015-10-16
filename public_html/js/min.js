function waitFor ( c, v ) { !c() && setTimeout( waitFor.bind( window, c, v ), 1 ) || v() }!function(b,c){b.GoogleAnalyticsObject=c;b[c]=function(){b[c].q.push(arguments)};b[c].q=[];b[c].l=1*new Date}(window,"ga");ga("create","UA-49938410-3","auto");ga("send","pageview");
waitFor(function(){return document.body},function(){var d=500;function c(h){var r=[],p=h.children.length,g=0,q=[],j=document.createElement("div"),w=0,f=h.dataset.timeout||3000,v=f/2;for(var l=0;l<p;++l){r[l]=h.children[l];q[l]=document.createElement("span");q[l].innerHTML="●";q[l].className="pip";q[l].onclick=m.bind(this,l);j.appendChild(q[l]);if(l>0){o(l)}else{u(l)}}h.insertBefore(j,r[0]);function o(n){r[n].style.display="none";q[n].style.cursor="pointer";q[n].style.opacity=0.25}function u(n){r[n].style.display="";q[n].style.cursor="default";q[n].style.opacity=1}function m(n){o(g);w=0;g=n;u(g)}function s(){var n=h.getBoundingClientRect(),i=n.bottom>=0&&n.top<=window.innerHeight;return i}var k=0;this.update=function(n){var i=n-k;k=n;w+=i;if(s()){if(w>=f){m((g+1)%p)}r[g].style.opacity=Math.min(1,(v-Math.abs(w-v))/d)}}}var a=Array.prototype.slice.call(document.querySelectorAll(".rotator"));for(var b=0;b<a.length;++b){a[b]=new c(a[b])}function e(g){requestAnimationFrame(e);for(var f=0;f<a.length;++f){a[f].update(g)}}requestAnimationFrame(e)});
waitFor(function(){return document&&document.querySelectorAll("img")},function(){function b(e,k){var g=[],l=new Image();for(var h=0;h<k.areas.length;++h){var j=k.areas[h].coords;g.push(j.split(",").map(parseFloat))}function f(){var n=e.width/l.width;for(var m=0;m<k.areas.length;++m){k.areas[m].coords=g[m].map(function(i){return n*i}).join(",")}}l.addEventListener("load",function(){window.addEventListener("resize",f,false);f()},false);l.src=e.src}var d=document.querySelectorAll("img");for(var a=0;a<d.length;++a){if(d[a].useMap){var c=document.querySelector("map[name="+d[a].useMap.substring(1)+"]");b(d[a],c)}}});
if(!HTMLFormElement.prototype.reportValidity){HTMLFormElement.prototype.reportValidity=function(){var f=this.querySelectorAll("input, textarea"),d=true,h=null;for(var a=0;a<f.length;++a){var c=f[a],g=true,e=c.pattern;if(!e){switch(c.type){case"email":e="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}"}}c.style.backgroundColor="";if(c.required&&c.value.length===0){g=false}else{if(c.value.length>0&&e){var b=new RegExp("^"+e+"$");g=b.test(c.value)}}if(!g){c.style.backgroundColor="#ffc0c0";if(!h){h=c}}d=d&&g}if(h){h.scrollIntoView()}return d}}waitFor(function(){return document.forms.contactForm},function(){function a(){this.value=this.value.trim()}Array.prototype.slice.call(document.forms.contactForm.querySelectorAll("input, textarea")).forEach(function(b){b.addEventListener("blur",a.bind(b),false)})});function sendContact(g,f,b){var e=document.getElementById("submitContact");var a=e.className;var d=e.href;e.className+=" disabled";e.href="javascript:return false";function c(){e.className=a;e.href=d}if(g.reportValidity()){var h={name:g.contact_name.value,email:g.contact_email.value,phone:g.contact_phone.value,company:g.contact_company.value,description:g.contact_description.value};Object.keys(h).forEach(function(i){h[i]=h[i].trim();if(h[i].length===0){h[i]=null}});send("contacts",h,function(j){g.style.display="none";f.style.display="block";f.scrollIntoView();var i=document.querySelector("#callbackName");i.innerHTML="";i.appendChild(document.createTextNode(h.name));c();ga("send","event","contactlist","success")},function(i){g.style.display="none";b.style.display="block";b.scrollIntoView();c();ga("send","event","contactlist","fail")})}}function makeURL(h,e,b,g,f){if(!h){h="http:"}else{if(h[h.length-1]!==":"){h+=":"}}if(!e){e="localhost"}else{if(e[e.length-1]==="/"){e=e.substring(0,e.length-1)}}var c=h+"//"+e;if(b&&b!==80){c+=":"+b}if(g){if(g[g.length-1]==="/"){g=g.substring(0,g.length-1)}c+="/"+g}if(f){var a=[];for(var d in f){if(f.hasOwnProperty(d)&&typeof f[d]!=="function"){a.push(encodeURIComponent(d)+"="+encodeURIComponent(f[d]))}}return c+"?"+a.join("&")}else{return c}}function send(e,d,h,a,c){try{var g=new XMLHttpRequest();g.onerror=a;g.onabort=a;g.onprogress=c;g.onload=function(){if(g.status<400){if(h){h(g.response)}}else{if(a){a(g.status)}}};var b=makeURL(document.location.protocol,document.location.hostname,8083,e);g.open("POST",b);g.responseType="json";g.setRequestHeader("Content-Type","application/json;charset=UTF-8");g.send(JSON.stringify(d))}catch(f){a(f)}};
!function(){function a(a,b){return a.href=b}function b(a){ga.set(a)}function c(a){if(100!=a.get(Ec)&&u(Wa(a,sc))%1e4>=100*Xa(a,Ec))throw"abort"}function d(a){if(Ca(Wa(a,uc)))throw"abort"}function e(){var a=Aa[G][K];if("http:"!=a&&"https:"!=a)throw"abort"}function f(a){try{za[ca][X]?b(42):za.XMLHttpRequest&&"withCredentials"in new za.XMLHttpRequest&&b(40)}catch(c){}a.set(_b,ia(a),!0),a.set(pb,Xa(a,pb)+1);var d=[];Ua.map(function(b,c){if(c.p){var e=a.get(b);void 0!=e&&e!=c[U]&&("boolean"==typeof e&&(e*=1),d[O](c.p+"="+ra(""+e)))}}),d[O]("z="+Ra()),a.set(mb,d[da]("&"),!0)}function g(a){var b=Wa(a,Hc)||Ia()+"/collect",c=Wa(a,ob);if(!c&&a.get(nb)&&(c="beacon"),c){var d=Wa(a,mb),e=a.get(lb),e=e||qa;"image"==c?La(b,d,e):"xhr"==c&&Ma(b,d,e)||"beacon"==c&&Na(b,d,e)||Ka(b,d,e)}else Ka(b,Wa(a,mb),a.get(lb));a.set(lb,qa,!0)}function h(a){var b=za.gaData;b&&(b.expId&&a.set(Tb,b.expId),b.expVar&&a.set(Ub,b.expVar))}function i(){if(za[ca]&&"preview"==za[ca].loadPurpose)throw"abort"}function j(a){var b=za.gaDevIds;la(b)&&0!=b[W]&&a.set("&did",b[da](","),!0)}function k(a){if(!a.get(uc))throw"abort"}function l(a){var c=Xa(a,Yb);c>=500&&b(15);var d=Wa(a,kb);if("transaction"!=d&&"item"!=d){var d=Xa(a,$b),e=(new Date)[E](),f=Xa(a,Zb);if(0==f&&a.set(Zb,e),f=x.round(2*(e-f)/1e3),f>0&&(d=x.min(d+f,20),a.set(Zb,e)),0>=d)throw"abort";a.set($b,--d)}a.set(Yb,++c)}function m(a,c,d,e){c[a]=function(){try{return e&&b(e),d[N](this,arguments)}catch(c){throw Oa("exc",a,c&&c[V]),c}}}function n(){var a,b,c;if((c=(c=za[ca])?c.plugins:null)&&c[W])for(var d=0;d<c[W]&&!b;d++){var e=c[d];-1<e[V][T]("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(f){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.AllowScriptAccess="always",b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(h){}return b&&(a=b[A](/[\d]+/g))&&3<=a[W]&&(b=a[0]+"."+a[1]+" r"+a[2]),b||void 0}function o(a,b,c){"none"==b&&(b="");var d=[],e=Da(a);a="__utma"==a?6:2;for(var f=0;f<e[W];f++){var g=(""+e[f])[F](".");g[W]>=a&&d[O]({hash:g[0],R:e[f],O:g})}return 0==d[W]?void 0:1==d[W]?d[0]:p(b,d)||p(c,d)||p(null,d)||d[0]}function p(a,b){var c,d;null==a?c=d=1:(c=u(a),d=u(na(a,".")?a[ba](1):"."+a));for(var e=0;e<b[W];e++)if(b[e][P]==c||b[e][P]==d)return b[e]}function q(a){a=a.get(sc);var b=r(a,0);return"_ga=1."+ra(b+"."+a)}function r(a,b){for(var c=new Date,d=za[ca],e=d.plugins||[],c=[a,d.userAgent,c.getTimezoneOffset(),c.getYear(),c.getDate(),c.getHours(),c.getMinutes()+b],d=0;d<e[W];++d)c[O](e[d].description);return u(c[da]("."))}function s(a,b){if(b==Aa[G][I])return!1;for(var c=0;c<a[W];c++)if(a[c]instanceof RegExp){if(a[c][Q](b))return!0}else if(0<=b[T](a[c]))return!0;return!1}function t(a){return 0<=a[T](".")||0<=a[T](":")}function u(a){var b,c=1,d=0;if(a)for(c=0,b=a[W]-1;b>=0;b--)d=a.charCodeAt(b),c=(c<<6&268435455)+d+(d<<14),d=266338304&c,c=0!=d?c^d>>21:c;return c}var v=encodeURIComponent,w=window,x=Math,y="replace",z="data",A="match",B="port",C="createElement",D="setAttribute",E="getTime",F="split",G="location",H="hasOwnProperty",I="hostname",J="search",K="protocol",L="href",M="action",N="apply",O="push",P="hash",Q="test",R="slice",S="cookie",T="indexOf",U="defaultValue",V="name",W="length",X="sendBeacon",Y="prototype",Z="clientWidth",$="target",_="call",aa="clientHeight",ba="substring",ca="navigator",da="join",ea="toLowerCase",fa=function(a){this.w=a||[]};fa[Y].set=function(a){this.w[a]=!0},fa[Y].encode=function(){for(var a=[],b=0;b<this.w[W];b++)this.w[b]&&(a[x.floor(b/6)]=a[x.floor(b/6)]^1<<b%6);for(b=0;b<a[W];b++)a[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b]||0);return a[da]("")+"~"};var ga=new fa,ha=function(a,b){var c=new fa(ja(a));c.set(b),a.set(ac,c.w)},ia=function(a){a=ja(a),a=new fa(a);for(var b=ga.w[R](),c=0;c<a.w[W];c++)b[c]=b[c]||a.w[c];return new fa(b).encode()},ja=function(a){return a=a.get(ac),la(a)||(a=[]),a},ka=function(a){return"function"==typeof a},la=function(a){return"[object Array]"==Object[Y].toString[_](Object(a))},ma=function(a){return void 0!=a&&-1<(a.constructor+"")[T]("String")},na=function(a,b){return 0==a[T](b)},oa=function(a){return a?a[y](/^[\s\xa0]+|[\s\xa0]+$/g,""):""},pa=function(a){var b=Aa[C]("img");return b.width=1,b.height=1,b.src=a,b},qa=function(){},ra=function(a){return v instanceof Function?v(a):(b(28),a)},sa=function(a,c,d,e){try{a.addEventListener?a.addEventListener(c,d,!!e):a.attachEvent&&a.attachEvent("on"+c,d)}catch(f){b(27)}},ta=function(a,b){if(a){var c=Aa[C]("script");c.type="text/javascript",c.async=!0,c.src=a,b&&(c.id=b);var d=Aa.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}},ua=function(){return"https:"==Aa[G][K]},va=function(){var a=""+Aa[G][I];return 0==a[T]("www.")?a[ba](4):a},wa=function(a){var b=Aa.referrer;if(/^https?:\/\//i[Q](b)){if(a)return b;a="//"+Aa[G][I];var c=b[T](a);if((5==c||6==c)&&(a=b.charAt(c+a[W]),"/"==a||"?"==a||""==a||":"==a))return;return b}},xa=function(a,b){if(1==b[W]&&null!=b[0]&&"object"==typeof b[0])return b[0];for(var c={},d=x.min(a[W]+1,b[W]),e=0;d>e;e++){if("object"==typeof b[e]){for(var f in b[e])b[e][H](f)&&(c[f]=b[e][f]);break}e<a[W]&&(c[a[e]]=b[e])}return c},ya=function(){this.keys=[],this.values={},this.m={}};ya[Y].set=function(a,b,c){this.keys[O](a),c?this.m[":"+a]=b:this.values[":"+a]=b},ya[Y].get=function(a){return this.m[H](":"+a)?this.m[":"+a]:this.values[":"+a]},ya[Y].map=function(a){for(var b=0;b<this.keys[W];b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var za=w,Aa=document,Ba=function(){for(var a=za[ca].userAgent+(Aa[S]?Aa[S]:"")+(Aa.referrer?Aa.referrer:""),b=a[W],c=za.history[W];c>0;)a+=c--^b++;return u(a)},Ca=function(a){var b=za._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===za["ga-disable-"+a])return!0;try{var c=za.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1},Da=function(a){var b=[],c=Aa[S][F](";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[W];d++){var e=c[d][A](a);e&&b[O](e[1])}return b},Ea=function(a,c,d,e,f,g){if(f=Ca(f)?!1:Ha[Q](Aa[G][I])||"/"==d&&Ga[Q](e)?!1:!0,!f)return!1;if(c&&1200<c[W]&&(c=c[ba](0,1200),b(24)),d=a+"="+c+"; path="+d+"; ",g&&(d+="expires="+new Date((new Date)[E]()+g).toGMTString()+"; "),e&&"none"!=e&&(d+="domain="+e+";"),e=Aa[S],Aa.cookie=d,!(e=e!=Aa[S]))a:{for(a=Da(a),e=0;e<a[W];e++)if(c==a[e]){e=!0;break a}e=!1}return e},Fa=function(a){return ra(a)[y](/\(/g,"%28")[y](/\)/g,"%29")},Ga=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ha=/(^|\.)doubleclick\.net$/i,Ia=function(){return(fb||ua()?"https:":"http:")+"//www.google-analytics.com"},Ja=function(a){this.name="len",this.message=a+"-8192"},Ka=function(a,b,c){if(c=c||qa,2036>=b[W])La(a,b,c);else{if(!(8192>=b[W]))throw Oa("len",b[W]),new Ja(b[W]);Na(a,b,c)||Ma(a,b,c)||La(a,b,c)}},La=function(a,b,c){var d=pa(a+"?"+b);d.onload=d.onerror=function(){d.onload=null,d.onerror=null,c()}},Ma=function(a,b,c){var d=za.XMLHttpRequest;if(!d)return!1;var e=new d;return"withCredentials"in e?(e.open("POST",a,!0),e.withCredentials=!0,e.setRequestHeader("Content-Type","text/plain"),e.onreadystatechange=function(){4==e.readyState&&(c(),e=null)},e.send(b),!0):!1},Na=function(a,b,c){return za[ca][X]?(2036>=b[W]&&(a+="?"+b,b=""),za[ca][X](a,b)?(c(),!0):!1):!1},Oa=function(a,b,c){1<=100*x.random()||Ca("?")||(a=["t=error","_e="+a,"_v=j35","sr=1"],b&&a[O]("_f="+b),c&&a[O]("_m="+ra(c[ba](0,100))),a[O]("aip=1"),a[O]("z="+Sa()),La(Ia()+"/collect",a[da]("&"),qa))},Pa=function(){this.t=[]};Pa[Y].add=function(a){this.t[O](a)},Pa[Y].D=function(a){try{for(var b=0;b<this.t[W];b++){var c=a.get(this.t[b]);c&&ka(c)&&c[_](za,a)}}catch(d){}b=a.get(lb),b!=qa&&ka(b)&&(a.set(lb,qa,!0),setTimeout(b,10))};var Qa=function(){return x.round(2147483647*x.random())},Ra=function(){try{var a=new Uint32Array(1);return za.crypto.getRandomValues(a),2147483647&a[0]}catch(b){return Qa()}},Sa=Qa,Ta=function(){this.data=new ya},Ua=new ya,Va=[];Ta[Y].get=function(a){var b=$a(a),c=this[z].get(a);return b&&void 0==c&&(c=ka(b[U])?b[U]():b[U]),b&&b.n?b.n(this,a,c):c};var Wa=function(a,b){var c=a.get(b);return void 0==c?"":""+c},Xa=function(a,b){var c=a.get(b);return void 0==c||""===c?0:1*c};Ta[Y].set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a[H](d)&&Ya(this,d,a[d],c);else Ya(this,a,b,c)};var Ya=function(a,b,c,d){if(void 0!=c)switch(b){case uc:rd[Q](c)}var e=$a(b);e&&e.o?e.o(a,b,c,d):a[z].set(b,c,d)},Za=function(a,b,c,d,e){this.name=a,this.p=b,this.n=d,this.o=e,this.defaultValue=c},$a=function(a){var b=Ua.get(a);if(!b)for(var c=0;c<Va[W];c++){var d=Va[c],e=d[0].exec(a);if(e){b=d[1](e),Ua.set(b[V],b);break}}return b},_a=function(a){var b;return Ua.map(function(c,d){d.p==a&&(b=d)}),b&&b[V]},ab=function(a,b,c,d,e){return a=new Za(a,b,c,d,e),Ua.set(a[V],a),a[V]},bb=function(a,b){Va[O]([new RegExp("^"+a+"$"),b])},cb=function(a,b,c){return ab(a,b,c,void 0,db)},db=function(){},eb=ma(w.GoogleAnalyticsObject)&&oa(w.GoogleAnalyticsObject)||"ga",fb=!1,gb=ab("_br"),hb=cb("apiVersion","v"),ib=cb("clientVersion","_v");ab("anonymizeIp","aip");var jb=ab("adSenseId","a"),kb=ab("hitType","t"),lb=ab("hitCallback"),mb=ab("hitPayload");ab("nonInteraction","ni"),ab("currencyCode","cu"),ab("dataSource","ds");var nb=ab("useBeacon",void 0,!1),ob=ab("transport");ab("sessionControl","sc",""),ab("sessionGroup","sg"),ab("queueTime","qt");var pb=ab("_s","_s");ab("screenName","cd");var qb=ab("location","dl",""),rb=ab("referrer","dr"),sb=ab("page","dp","");ab("hostname","dh");var tb=ab("language","ul"),ub=ab("encoding","de");ab("title","dt",function(){return Aa.title||void 0}),bb("contentGroup([0-9]+)",function(a){return new Za(a[0],"cg"+a[1])});var vb=ab("screenColors","sd"),wb=ab("screenResolution","sr"),xb=ab("viewportSize","vp"),yb=ab("javaEnabled","je"),zb=ab("flashVersion","fl");ab("campaignId","ci"),ab("campaignName","cn"),ab("campaignSource","cs"),ab("campaignMedium","cm"),ab("campaignKeyword","ck"),ab("campaignContent","cc");var Ab=ab("eventCategory","ec"),Bb=ab("eventAction","ea"),Cb=ab("eventLabel","el"),Db=ab("eventValue","ev"),Eb=ab("socialNetwork","sn"),Fb=ab("socialAction","sa"),Gb=ab("socialTarget","st"),Hb=ab("l1","plt"),Ib=ab("l2","pdt"),Jb=ab("l3","dns"),Kb=ab("l4","rrt"),Lb=ab("l5","srt"),Mb=ab("l6","tcp"),Nb=ab("l7","dit"),Ob=ab("l8","clt"),Pb=ab("timingCategory","utc"),Qb=ab("timingVar","utv"),Rb=ab("timingLabel","utl"),Sb=ab("timingValue","utt");ab("appName","an"),ab("appVersion","av",""),ab("appId","aid",""),ab("appInstallerId","aiid",""),ab("exDescription","exd"),ab("exFatal","exf");var Tb=ab("expId","xid"),Ub=ab("expVar","xvar"),Vb=ab("_utma","_utma"),Wb=ab("_utmz","_utmz"),Xb=ab("_utmht","_utmht"),Yb=ab("_hc",void 0,0),Zb=ab("_ti",void 0,0),$b=ab("_to",void 0,20);bb("dimension([0-9]+)",function(a){return new Za(a[0],"cd"+a[1])}),bb("metric([0-9]+)",function(a){return new Za(a[0],"cm"+a[1])}),ab("linkerParam",void 0,void 0,q,db);var _b=ab("usage","_u"),ac=ab("_um");ab("forceSSL",void 0,void 0,function(){return fb},function(a,c,d){b(34),fb=!!d});var bc=ab("_j1","jid"),cc=ab("_j2");bb("\\&(.*)",function(a){var b=new Za(a[0],a[1]),c=_a(a[0][ba](1));return c&&(b.n=function(a){return a.get(c)},b.o=function(a,b,d,e){a.set(c,d,e)},b.p=void 0),b});var dc=cb("_oot"),ec=ab("previewTask"),fc=ab("checkProtocolTask"),gc=ab("validationTask"),hc=ab("checkStorageTask"),ic=ab("historyImportTask"),jc=ab("samplerTask"),kc=ab("_rlt"),lc=ab("buildHitTask"),mc=ab("sendHitTask"),nc=ab("ceTask"),oc=ab("devIdTask"),pc=ab("timingTask"),qc=ab("displayFeaturesTask"),rc=cb("name"),sc=cb("clientId","cid"),tc=ab("userId","uid"),uc=cb("trackingId","tid"),vc=cb("cookieName",void 0,"_ga"),wc=cb("cookieDomain"),xc=cb("cookiePath",void 0,"/"),yc=cb("cookieExpires",void 0,63072e3),zc=cb("legacyCookieDomain"),Ac=cb("legacyHistoryImport",void 0,!0),Bc=cb("storage",void 0,"cookie"),Cc=cb("allowLinker",void 0,!1),Dc=cb("allowAnchor",void 0,!0),Ec=cb("sampleRate","sf",100),Fc=cb("siteSpeedSampleRate",void 0,1),Gc=cb("alwaysSendReferrer",void 0,!1),Hc=ab("transportUrl"),Ic=ab("_r","_r"),Jc=function(a,b,c){this.V=1e4,this.fa=a,this.$=!1,this.B=b,this.ea=c||1},Kc=function(a,b){var c;if(a.fa&&a.$)return 0;if(a.$=!0,b){if(a.B&&Xa(b,a.B))return Xa(b,a.B);if(0==b.get(Fc))return 0}return 0==a.V?0:(void 0===c&&(c=Ra()),0==c%a.V?x.floor(c/a.V)%a.ea+1:0)},Lc=new Jc(!0,gb,7),Mc=function(a){if(!ua()&&!fb){var b=Kc(Lc,a);if(b&&!(!za[ca][X]&&b>=4&&6>=b)){var c=(new Date).getHours(),d=[Ra(),Ra(),Ra()][da](".");a=(3==b||5==b?"https:":"http:")+"//www.google-analytics.com/collect?z=br.",a+=[b,"A",c,d][da](".");var e=1!=b%3?"https:":"http:",e=e+"//www.google-analytics.com/collect?z=br.",e=e+[b,"B",c,d][da](".");7==b&&(e=e[y]("//www.","//ssl.")),c=function(){b>=4&&6>=b?za[ca][X](e,""):pa(e)},Ra()%2?(pa(a),c()):(c(),pa(a))}}},Nc=function(a,b){var c=x.min(Xa(a,Fc),100);if(!(u(Wa(a,sc))%100>=c)&&(c={},Oc(c)||Pc(c))){var d=c[Hb];void 0==d||1/0==d||isNaN(d)||(d>0?(Qc(c,Jb),Qc(c,Mb),Qc(c,Lb),Qc(c,Ib),Qc(c,Kb),Qc(c,Nb),Qc(c,Ob),b(c)):sa(za,"load",function(){Nc(a,b)},!1))}},Oc=function(a){var b=za.performance||za.webkitPerformance,b=b&&b.timing;if(!b)return!1;var c=b.navigationStart;return 0==c?!1:(a[Hb]=b.loadEventStart-c,a[Jb]=b.domainLookupEnd-b.domainLookupStart,a[Mb]=b.connectEnd-b.connectStart,a[Lb]=b.responseStart-b.requestStart,a[Ib]=b.responseEnd-b.responseStart,a[Kb]=b.fetchStart-c,a[Nb]=b.domInteractive-c,a[Ob]=b.domContentLoadedEventStart-c,!0)},Pc=function(a){if(za.top!=za)return!1;var b=za.external,c=b&&b.onloadT;return b&&!b.isValidLoadTime&&(c=void 0),c>2147483648&&(c=void 0),c>0&&b.setPageReadyTime(),void 0==c?!1:(a[Hb]=c,!0)},Qc=function(a,b){var c=a[b];(isNaN(c)||1/0==c||0>c)&&(a[b]=void 0)},Rc=function(a){return function(b){"pageview"!=b.get(kb)||a.I||(a.I=!0,Nc(b,function(b){a.send("timing",b)}))}},Sc=!1,Tc=function(a){if("cookie"==Wa(a,Bc)){var c=Wa(a,vc),d=Wc(a),e=$c(Wa(a,xc)),f=Yc(Wa(a,wc)),g=1e3*Xa(a,yc),h=Wa(a,uc);if("auto"!=f)Ea(c,d,e,f,h,g)&&(Sc=!0);else{b(32);var i;if(d=[],f=va()[F]("."),4!=f[W]||(i=f[f[W]-1],parseInt(i,10)!=i)){for(i=f[W]-2;i>=0;i--)d[O](f[R](i)[da]("."));d[O]("none"),i=d}else i=["none"];for(var j=0;j<i[W];j++)if(f=i[j],a[z].set(wc,f),d=Wc(a),Ea(c,d,e,f,h,g))return void(Sc=!0);a[z].set(wc,"auto")}}},Uc=function(a){if("cookie"==Wa(a,Bc)&&!Sc&&(Tc(a),!Sc))throw"abort"},Vc=function(a){if(a.get(Ac)){var c=Wa(a,wc),d=Wa(a,zc)||va(),e=o("__utma",d,c);e&&(b(19),a.set(Xb,(new Date)[E](),!0),a.set(Vb,e.R),(c=o("__utmz",d,c))&&e[P]==c[P]&&a.set(Wb,c.R))}},Wc=function(a){var b=Fa(Wa(a,sc)),c=Zc(Wa(a,wc));return a=_c(Wa(a,xc)),a>1&&(c+="-"+a),["GA1",c,b][da](".")},Xc=function(a,b,c){for(var d,e=[],f=[],g=0;g<a[W];g++){var h=a[g];h.r[c]==b?e[O](h):void 0==d||h.r[c]<d?(f=[h],d=h.r[c]):h.r[c]==d&&f[O](h)}return 0<e[W]?e:f},Yc=function(a){return 0==a[T](".")?a.substr(1):a},Zc=function(a){return Yc(a)[F](".")[W]},$c=function(a){return a?(1<a[W]&&a.lastIndexOf("/")==a[W]-1&&(a=a.substr(0,a[W]-1)),0!=a[T]("/")&&(a="/"+a),a):"/"},_c=function(a){return a=$c(a),"/"==a?1:a[F]("/")[W]},ad=new RegExp(/^https?:\/\/([^\/:]+)/),bd=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,cd=function(a){b(48),this.target=a,this.T=!1};cd[Y].Q=function(b,c){if(b.tagName){if("a"==b.tagName[ea]())return void(b[L]&&a(b,dd(this,b[L],c)));if("form"==b.tagName[ea]())return ed(this,b)}return"string"==typeof b?dd(this,b,c):void 0};var dd=function(a,b,c){var d=bd.exec(b);d&&3<=d[W]&&(b=d[1]+(d[3]?d[2]+d[3]:"")),a=a[$].get("linkerParam");var e=b[T]("?"),d=b[T]("#");return c?b+=(-1==d?"#":"&")+a:(c=-1==e?"?":"&",b=-1==d?b+(c+a):b[ba](0,d)+c+a+b[ba](d)),b},ed=function(a,b){if(b&&b[M]){var c=a[$].get("linkerParam")[F]("=")[1];if("get"==b.method[ea]()){for(var d=b.childNodes||[],e=0;e<d[W];e++)if("_ga"==d[e][V])return void d[e][D]("value",c);d=Aa[C]("input"),d[D]("type","hidden"),d[D]("name","_ga"),d[D]("value",c),b.appendChild(d)}else"post"==b.method[ea]()&&(b.action=dd(a,b[M]))}};cd[Y].S=function(c,d,e){function f(e){try{e=e||za.event;var f;a:{var h=e[$]||e.srcElement;for(e=100;h&&e>0;){if(h[L]&&h.nodeName[A](/^a(?:rea)?$/i)){f=h;break a}h=h.parentNode,e--}f={}}("http:"==f[K]||"https:"==f[K])&&s(c,f[I]||"")&&f[L]&&a(f,dd(g,f[L],d))}catch(i){b(26)}}var g=this;if(this.T||(this.T=!0,sa(Aa,"mousedown",f,!1),sa(Aa,"touchstart",f,!1),sa(Aa,"keyup",f,!1)),e){e=function(a){if(a=a||za.event,(a=a[$]||a.srcElement)&&a[M]){var b=a[M][A](ad);b&&s(c,b[1])&&ed(g,a)}};for(var h=0;h<Aa.forms[W];h++)sa(Aa.forms[h],"submit",e)}};var fd,gd=function(a,b,c,d){this.U=b,this.aa=c,(b=d)||(b=(b=Wa(a,rc))&&"t0"!=b?ld[Q](b)?"_gat_"+Fa(Wa(a,uc)):"_gat_"+Fa(b):"_gat"),this.Y=b},hd=function(a,b){var c=b.get(lc);b.set(lc,function(b){id(a,b);var d=c(b);return jd(a,b),d});var d=b.get(mc);b.set(mc,function(b){var c=d(b);return kd(a,b),c})},id=function(a,b){b.get(a.U)||("1"==Da(a.Y)[0]?b.set(a.U,"",!0):b.set(a.U,""+Sa(),!0))},jd=function(a,b){b.get(a.U)&&Ea(a.Y,"1",b.get(xc),b.get(wc),b.get(uc),6e5)},kd=function(a,b){if(b.get(a.U)){var c=new ya,d=function(a){$a(a).p&&c.set($a(a).p,b.get(a))};d(hb),d(ib),d(uc),d(sc),d(a.U),c.set($a(_b).p,ia(b));var e=a.aa;c.map(function(a,b){e+=ra(a)+"=",e+=ra(""+b)+"&"}),e+="z="+Sa(),pa(e),b.set(a.U,"",!0)}},ld=/^gtm\d+$/,md=function(a,b){var c=a.b;if(!c.get("dcLoaded")){ha(c,29),b=b||{};var d;b[vc]&&(d=Fa(b[vc])),d=new gd(c,bc,"https://stats.g.doubleclick.net/collect?t=dc&aip=1&",d),hd(d,c),c.set("dcLoaded",!0)}},nd=function(a){var b;b=a.get("dcLoaded")?!1:"cookie"!=a.get(Bc)?!1:!0,b&&(ha(a,51),b=new gd(a,bc),id(b,a),jd(b,a),a.get(b.U)&&(a.set(Ic,1,!0),a.set(Hc,Ia()+"/r/collect",!0)))},od=function(a,b){var c=a.b;if(!c.get("_rlsaLoaded")){if(ha(c,38),b=b||{},b[vc])var d=Fa(b[vc]);d=new gd(c,cc,"https://www.google.com/ads/ga-audiences?t=sr&aip=1&",d),hd(d,c),c.set("_rlsaLoaded",!0),Cd("displayfeatures",a,b)}},pd=function(){var a=za.gaGlobal=za.gaGlobal||{};return a.hid=a.hid||Sa()},qd=function(a,b,c){if(!fd){var d;d=Aa[G][P];var e=za[V],f=/^#?gaso=([^&]*)/;(e=(d=(d=d&&d[A](f)||e&&e[A](f))?d[1]:Da("GASO")[0]||"")&&d[A](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))&&(Ea("GASO",""+d,c,b,a,0),w._udo||(w._udo=b),w._utcp||(w._utcp=c),a=e[1],ta("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Sa(),"_gasojs")),fd=!0}},rd=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,sd=function(a){function b(a,b){n.b[z].set(a,b)}function m(a,c){b(a,c),n.filters.add(a)}var n=this;this.b=new Ta,this.filters=new Pa,b(rc,a[rc]),b(uc,oa(a[uc])),b(vc,a[vc]),b(wc,a[wc]||va()),b(xc,a[xc]),b(yc,a[yc]),b(zc,a[zc]),b(Ac,a[Ac]),b(Cc,a[Cc]),b(Dc,a[Dc]),b(Ec,a[Ec]),b(Fc,a[Fc]),b(Gc,a[Gc]),b(Bc,a[Bc]),b(tc,a[tc]),b(hb,1),b(ib,"j35"),m(dc,d),m(ec,i),m(fc,e),m(gc,k),m(hc,Uc),m(ic,Vc),m(jc,c),m(kc,l),m(nc,h),m(oc,j),m(qc,nd),m(lc,f),m(mc,g),m(pc,Rc(this)),td(this.b,a[sc]),ud(this.b),this.b.set(jb,pd()),qd(this.b.get(uc),this.b.get(wc),this.b.get(xc))},td=function(a,c){if("cookie"==Wa(a,Bc)){Sc=!1;var d;a:{var e=Da(Wa(a,vc));if(e&&!(1>e[W])){d=[];for(var f=0;f<e[W];f++){var g;g=e[f][F](".");var h=g.shift();("GA1"==h||"1"==h)&&1<g[W]?(h=g.shift()[F]("-"),1==h[W]&&(h[1]="1"),h[0]*=1,h[1]*=1,g={r:h,s:g[da](".")}):g=void 0,g&&d[O](g)}if(1==d[W]){b(13),d=d[0].s;break a}if(0!=d[W]){if(b(14),e=Zc(Wa(a,wc)),d=Xc(d,e,0),1==d[W]){d=d[0].s;break a}e=_c(Wa(a,xc)),d=Xc(d,e,1),d=d[0]&&d[0].s;break a}b(12)}d=void 0}d||(d=Wa(a,wc),e=Wa(a,zc)||va(),d=o("__utma",e,d),void 0!=d?(b(10),d=d.O[1]+"."+d.O[2]):d=void 0),d&&(a[z].set(sc,d),Sc=!0)}d=a.get(Dc),(f=(d=Aa[G][d?"href":"search"][A]("(?:&|#|\\?)"+ra("_ga")[y](/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)"))&&2==d[W]?d[1]:"")&&(a.get(Cc)?(d=f[T]("."),-1==d?b(22):(e=f[ba](d+1),"1"!=f[ba](0,d)?b(22):(d=e[T]("."),-1==d?b(22):(f=e[ba](0,d),d=e[ba](d+1),f!=r(d,0)&&f!=r(d,-1)&&f!=r(d,-2)?b(23):(b(11),a[z].set(sc,d)))))):b(21)),c&&(b(9),a[z].set(sc,ra(c))),a.get(sc)||((d=(d=za.gaGlobal&&za.gaGlobal.vid)&&-1!=d[J](/^(?:utma\.)?\d+\.\d+$/)?d:void 0)?(b(17),a[z].set(sc,d)):(b(8),a[z].set(sc,[Sa()^2147483647&Ba(),x.round((new Date)[E]()/1e3)][da](".")))),Tc(a)},ud=function(a){var c=za[ca],d=za.screen,e=Aa[G];if(a.set(rb,wa(a.get(Gc))),e){var f=e.pathname||"";"/"!=f.charAt(0)&&(b(31),f="/"+f),a.set(qb,e[K]+"//"+e[I]+f+e[J])}d&&a.set(wb,d.width+"x"+d.height),d&&a.set(vb,d.colorDepth+"-bit");var d=Aa.documentElement,g=(f=Aa.body)&&f[Z]&&f[aa],h=[];if(d&&d[Z]&&d[aa]&&("CSS1Compat"===Aa.compatMode||!g)?h=[d[Z],d[aa]]:g&&(h=[f[Z],f[aa]]),d=0>=h[0]||0>=h[1]?"":h[da]("x"),a.set(xb,d),a.set(zb,n()),a.set(ub,Aa.characterSet||Aa.charset),a.set(yb,c&&"function"==typeof c.javaEnabled&&c.javaEnabled()||!1),a.set(tb,(c&&(c.language||c.browserLanguage)||"")[ea]()),e&&a.get(Dc)&&(c=Aa[G][P])){for(c=c[F](/[?&#]+/),e=[],d=0;d<c[W];++d)(na(c[d],"utm_id")||na(c[d],"utm_campaign")||na(c[d],"utm_source")||na(c[d],"utm_medium")||na(c[d],"utm_term")||na(c[d],"utm_content")||na(c[d],"gclid")||na(c[d],"dclid")||na(c[d],"gclsrc"))&&e[O](c[d]);0<e[W]&&(c="#"+e[da]("&"),a.set(qb,a.get(qb)+c))}};sd[Y].get=function(a){return this.b.get(a)},sd[Y].set=function(a,b){this.b.set(a,b)};var vd={pageview:[sb],event:[Ab,Bb,Cb,Db],social:[Eb,Fb,Gb],timing:[Pb,Qb,Sb,Rb]};sd[Y].send=function(a){if(!(1>arguments[W])){var b,c;"string"==typeof arguments[0]?(b=arguments[0],c=[][R][_](arguments,1)):(b=arguments[0]&&arguments[0][kb],c=arguments),b&&(c=xa(vd[b]||[],c),c[kb]=b,this.b.set(c,void 0,!0),this.filters.D(this.b),this.b[z].m={},Mc(this.b))}};var wd,xd,yd,zd=function(a){return"prerender"==Aa.visibilityState?!1:(a(),!0)},Ad=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,Bd=function(a){if(ka(a[0]))this.u=a[0];else{var b=Ad.exec(a[0]);if(null!=b&&4==b[W]&&(this.c=b[1]||"t0",this.e=b[2]||"",this.d=b[3],this.a=[][R][_](a,1),this.e||(this.A="create"==this.d,this.i="require"==this.d,this.g="provide"==this.d,this.ba="remove"==this.d),this.i&&(3<=this.a[W]?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(ma(this.a[1])?this.X=this.a[1]:this.W=this.a[1]))),b=a[1],a=a[2],!this.d)throw"abort";if(this.i&&(!ma(b)||""==b))throw"abort";if(this.g&&(!ma(b)||""==b||!ka(a)))throw"abort";if(t(this.c)||t(this.e))throw"abort";if(this.g&&"t0"!=this.c)throw"abort"}};wd=new ya,yd=new ya,xd={ec:45,ecommerce:46,linkid:47};var Cd=function(a,b,c){b==Fd||b.get(rc);var d=wd.get(a);return ka(d)?(b.plugins_=b.plugins_||new ya,b.plugins_.get(a)?!0:(b.plugins_.set(a,new d(b,c||{})),!0)):!1},Dd=function(b){function c(a){var b=(a[I]||"")[F](":")[0][ea](),c=(a[K]||"")[ea](),c=1*a[B]||("http:"==c?80:"https:"==c?443:"");return a=a.pathname||"",na(a,"/")||(a="/"+a),[b,""+c,a]}var d=Aa[C]("a");a(d,Aa[G][L]);var e=(d[K]||"")[ea](),f=c(d),g=d[J]||"",h=e+"//"+f[0]+(f[1]?":"+f[1]:"");return na(b,"//")?b=e+b:na(b,"/")?b=h+b:!b||na(b,"?")?b=h+f[2]+(b||g):0>b[F]("/")[0][T](":")&&(b=h+f[2][ba](0,f[2].lastIndexOf("/"))+"/"+b),a(d,b),e=c(d),{protocol:(d[K]||"")[ea](),host:e[0],port:e[1],path:e[2],G:d[J]||"",url:b||""}},Ed={ga:function(){Ed.f=[]}};Ed.ga(),Ed.D=function(a){var b=Ed.J[N](Ed,arguments),b=Ed.f.concat(b);for(Ed.f=[];0<b[W]&&!Ed.v(b[0])&&(b.shift(),!(0<Ed.f[W])););Ed.f=Ed.f.concat(b)},Ed.J=function(a){for(var c=[],d=0;d<arguments[W];d++)try{var e=new Bd(arguments[d]);if(e.g)wd.set(e.a[0],e.a[1]);else{if(e.i){var f=e,g=f.a[0];if(!ka(wd.get(g))&&!yd.get(g)){xd[H](g)&&b(xd[g]);var h=f.X;if(!h&&xd[H](g)?(b(39),h=g+".js"):b(43),h){h&&0<=h[T]("/")||(h=(fb||ua()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+h);var i,j=Dd(h),f=void 0,k=j[K],l=Aa[G][K],f="https:"==k||k==l?!0:"http:"!=k?!1:"http:"==l;if(i=f){var f=j,m=Dd(Aa[G][L]);if(f.G||0<=f.url[T]("?")||0<=f.path[T]("://"))i=!1;else if(f.host==m.host&&f[B]==m[B])i=!0;else{var n="http:"==f[K]?80:443;i="www.google-analytics.com"==f.host&&(f[B]||n)==n&&na(f.path,"/plugins/")?!0:!1}}i&&(ta(j.url),yd.set(g,!0))}}}c[O](e)}}catch(o){}return c},Ed.v=function(a){try{if(a.u)a.u[_](za,Fd.j("t0"));else{var b=a.c==eb?Fd:Fd.j(a.c);if(a.A)"t0"==a.c&&Fd.create[N](Fd,a.a);else if(a.ba)Fd.remove(a.c);else if(b)if(a.i){if(!Cd(a.a[0],b,a.W))return!0}else if(a.e){var c=a.d,d=a.a,e=b.plugins_.get(a.e);e[c][N](e,d)}else b[a.d][N](b,a.a)}}catch(f){}};var Fd=function(a){b(1),Ed.D[N](Ed,[arguments])};Fd.h={},Fd.P=[],Fd.L=0,Fd.answer=42;var Gd=[uc,wc,rc];Fd.create=function(a){var b=xa(Gd,[][R][_](arguments));b[rc]||(b[rc]="t0");var c=""+b[rc];return Fd.h[c]?Fd.h[c]:(b=new sd(b),Fd.h[c]=b,Fd.P[O](b),b)},Fd.remove=function(a){for(var b=0;b<Fd.P[W];b++)if(Fd.P[b].get(rc)==a){Fd.P.splice(b,1),Fd.h[a]=null;break}},Fd.j=function(a){return Fd.h[a]},Fd.getAll=function(){return Fd.P[R](0)},Fd.N=function(){"ga"!=eb&&b(49);var a=za[eb];if(!a||42!=a.answer){Fd.L=a&&a.l,Fd.loaded=!0;var c=za[eb]=Fd;if(m("create",c,c.create),m("remove",c,c.remove),m("getByName",c,c.j,5),m("getAll",c,c.getAll,6),c=sd[Y],m("get",c,c.get,7),m("set",c,c.set,4),m("send",c,c.send),c=Ta[Y],m("get",c,c.get),m("set",c,c.set),!ua()&&!fb){a:{for(var c=Aa.getElementsByTagName("script"),d=0;d<c[W]&&100>d;d++){var e=c[d].src;if(e&&0==e[T]("https://www.google-analytics.com/analytics")){b(33),c=!0;break a}}c=!1}c&&(fb=!0)}ua()||fb||!Kc(new Jc)||(b(36),fb=!0),(za.gaplugins=za.gaplugins||{}).Linker=cd,c=cd[Y],wd.set("linker",cd),m("decorate",c,c.Q,20),m("autoLink",c,c.S,25),wd.set("displayfeatures",md),wd.set("adfeatures",od),a=a&&a.q,la(a)?Ed.D[N](Fd,a):b(50)}},Fd.k=function(){for(var a=Fd.getAll(),b=0;b<a[W];b++)a[b].get(rc)},function(){var a=Fd.N;if(!zd(a)){b(16);var c=!1,d=function(){if(!c&&zd(a)){c=!0;var b=d,e=Aa;e.removeEventListener?e.removeEventListener("visibilitychange",b,!1):e.detachEvent&&e.detachEvent("onvisibilitychange",b)}};sa(Aa,"visibilitychange",d)}}()}(window);