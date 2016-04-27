/*
  hfrs v4.0.0 2016-04-27
  
  Copyright (C) 2012 - 2016 Sean T. McBeth
  http://www.highlandfrs.com/
  
*/
(function(){var aa=encodeURIComponent,f=window,n=Math;function Pc(a,b){return a.href=b}
var Qc="replace",q="data",m="match",ja="port",u="createElement",id="setAttribute",da="getTime",A="split",B="location",ra="hasOwnProperty",ma="hostname",ga="search",E="protocol",Ab="href",kd="action",G="apply",p="push",h="hash",pa="test",ha="slice",r="cookie",t="indexOf",ia="defaultValue",v="name",y="length",Ga="sendBeacon",z="prototype",la="clientWidth",jd="target",C="call",na="clientHeight",F="substring",oa="navigator",H="join",I="toLowerCase";var $c=function(a){this.w=a||[]};$c[z].set=function(a){this.w[a]=!0};$c[z].encode=function(){for(var a=[],b=0;b<this.w[y];b++)this.w[b]&&(a[n.floor(b/6)]=a[n.floor(b/6)]^1<<b%6);for(b=0;b<a[y];b++)a[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b]||0);return a[H]("")+"~"};var vd=new $c;function J(a){vd.set(a)}var Nd=function(a,b){var c=new $c(Dd(a));c.set(b);a.set(Gd,c.w)},Td=function(a){a=Dd(a);a=new $c(a);for(var b=vd.w[ha](),c=0;c<a.w[y];c++)b[c]=b[c]||a.w[c];return(new $c(b)).encode()},Dd=function(a){a=a.get(Gd);ka(a)||(a=[]);return a};var ea=function(a){return"function"==typeof a},ka=function(a){return"[object Array]"==Object[z].toString[C](Object(a))},qa=function(a){return void 0!=a&&-1<(a.constructor+"")[t]("String")},D=function(a,b){return 0==a[t](b)},sa=function(a){return a?a[Qc](/^[\s\xa0]+|[\s\xa0]+$/g,""):""},ta=function(a){var b=M[u]("img");b.width=1;b.height=1;b.src=a;return b},ua=function(){},K=function(a){if(aa instanceof Function)return aa(a);J(28);return a},L=function(a,b,c,d){try{a.addEventListener?a.addEventListener(b,
c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)}catch(e){J(27)}},wa=function(a,b){if(a){var c=M[u]("script");c.type="text/javascript";c.async=!0;c.src=a;b&&(c.id=b);var d=M.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}},Ud=function(){return"https:"==M[B][E]},xa=function(){var a=""+M[B][ma];return 0==a[t]("www.")?a[F](4):a},ya=function(a){var b=M.referrer;if(/^https?:\/\//i[pa](b)){if(a)return b;a="//"+M[B][ma];var c=b[t](a);if(5==c||6==c)if(a=b.charAt(c+a[y]),"/"==a||"?"==a||""==
a||":"==a)return;return b}},za=function(a,b){if(1==b[y]&&null!=b[0]&&"object"===typeof b[0])return b[0];for(var c={},d=n.min(a[y]+1,b[y]),e=0;e<d;e++)if("object"===typeof b[e]){for(var g in b[e])b[e][ra](g)&&(c[g]=b[e][g]);break}else e<a[y]&&(c[a[e]]=b[e]);return c};var ee=function(){this.keys=[];this.values={};this.m={}};ee[z].set=function(a,b,c){this.keys[p](a);c?this.m[":"+a]=b:this.values[":"+a]=b};ee[z].get=function(a){return this.m[ra](":"+a)?this.m[":"+a]:this.values[":"+a]};ee[z].map=function(a){for(var b=0;b<this.keys[y];b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var O=f,M=document,Mc=function(){for(var a=O[oa].userAgent+(M[r]?M[r]:"")+(M.referrer?M.referrer:""),b=a[y],c=O.history[y];0<c;)a+=c--^b++;return La(a)};var Aa=function(a){var b=O._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===O["ga-disable-"+a])return!0;try{var c=O.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1};var Ca=function(a){var b=[],c=M[r][A](";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[y];d++){var e=c[d][m](a);e&&b[p](e[1])}return b},zc=function(a,b,c,d,e,g){e=Aa(e)?!1:eb[pa](M[B][ma])||"/"==c&&vc[pa](d)?!1:!0;if(!e)return!1;b&&1200<b[y]&&(b=b[F](0,1200),J(24));c=a+"="+b+"; path="+c+"; ";g&&(c+="expires="+(new Date((new Date)[da]()+g)).toGMTString()+"; ");d&&"none"!=d&&(c+="domain="+d+";");d=M[r];M.cookie=c;if(!(d=d!=M[r]))a:{a=Ca(a);for(d=0;d<a[y];d++)if(b==a[d]){d=!0;break a}d=
!1}return d},Cc=function(a){return K(a)[Qc](/\(/g,"%28")[Qc](/\)/g,"%29")},vc=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,eb=/(^|\.)doubleclick\.net$/i;var oc=function(){return(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com"},Da=function(a){this.name="len";this.message=a+"-8192"},ba=function(a,b,c){c=c||ua;if(2036>=b[y])wc(a,b,c);else if(8192>=b[y])x(a,b,c)||wd(a,b,c)||wc(a,b,c);else throw ge("len",b[y]),new Da(b[y]);},wc=function(a,b,c){var d=ta(a+"?"+b);d.onload=d.onerror=function(){d.onload=null;d.onerror=null;c()}},wd=function(a,b,c){var d=O.XMLHttpRequest;if(!d)return!1;var e=new d;if(!("withCredentials"in e))return!1;e.open("POST",
a,!0);e.withCredentials=!0;e.setRequestHeader("Content-Type","text/plain");e.onreadystatechange=function(){4==e.readyState&&(c(),e=null)};e.send(b);return!0},x=function(a,b,c){if(!O[oa][Ga])return!1;2036>=b[y]&&(a+="?"+b,b="");return O[oa][Ga](a,b)?(c(),!0):!1},ge=function(a,b,c){1<=100*n.random()||Aa("?")||(a=["t=error","_e="+a,"_v=j35","sr=1"],b&&a[p]("_f="+b),c&&a[p]("_m="+K(c[F](0,100))),a[p]("aip=1"),a[p]("z="+fe()),wc(oc()+"/collect",a[H]("&"),ua))};var Ha=function(){this.t=[]};Ha[z].add=function(a){this.t[p](a)};Ha[z].D=function(a){try{for(var b=0;b<this.t[y];b++){var c=a.get(this.t[b]);c&&ea(c)&&c[C](O,a)}}catch(d){}b=a.get(Ia);b!=ua&&ea(b)&&(a.set(Ia,ua,!0),setTimeout(b,10))};function Ja(a){if(100!=a.get(Ka)&&La(P(a,Q))%1E4>=100*R(a,Ka))throw"abort";}function Ma(a){if(Aa(P(a,Na)))throw"abort";}function Oa(){var a=M[B][E];if("http:"!=a&&"https:"!=a)throw"abort";}
function Pa(a){try{O[oa][Ga]?J(42):O.XMLHttpRequest&&"withCredentials"in new O.XMLHttpRequest&&J(40)}catch(b){}a.set(ld,Td(a),!0);a.set(Ac,R(a,Ac)+1);var c=[];Qa.map(function(b,e){if(e.p){var g=a.get(b);void 0!=g&&g!=e[ia]&&("boolean"==typeof g&&(g*=1),c[p](e.p+"="+K(""+g)))}});c[p]("z="+Bd());a.set(Ra,c[H]("&"),!0)}
function Sa(a){var b=P(a,gd)||oc()+"/collect",c=P(a,fa);!c&&a.get(Vd)&&(c="beacon");if(c){var d=P(a,Ra),e=a.get(Ia),e=e||ua;"image"==c?wc(b,d,e):"xhr"==c&&wd(b,d,e)||"beacon"==c&&x(b,d,e)||ba(b,d,e)}else ba(b,P(a,Ra),a.get(Ia));a.set(Ia,ua,!0)}function Hc(a){var b=O.gaData;b&&(b.expId&&a.set(Nc,b.expId),b.expVar&&a.set(Oc,b.expVar))}function cd(){if(O[oa]&&"preview"==O[oa].loadPurpose)throw"abort";}function yd(a){var b=O.gaDevIds;ka(b)&&0!=b[y]&&a.set("&did",b[H](","),!0)}
function vb(a){if(!a.get(Na))throw"abort";};var hd=function(){return n.round(2147483647*n.random())},Bd=function(){try{var a=new Uint32Array(1);O.crypto.getRandomValues(a);return a[0]&2147483647}catch(b){return hd()}},fe=hd;function Ta(a){var b=R(a,Ua);500<=b&&J(15);var c=P(a,Va);if("transaction"!=c&&"item"!=c){var c=R(a,Wa),d=(new Date)[da](),e=R(a,Xa);0==e&&a.set(Xa,d);e=n.round(2*(d-e)/1E3);0<e&&(c=n.min(c+e,20),a.set(Xa,d));if(0>=c)throw"abort";a.set(Wa,--c)}a.set(Ua,++b)};var Ya=function(){this.data=new ee},Qa=new ee,Za=[];Ya[z].get=function(a){var b=$a(a),c=this[q].get(a);b&&void 0==c&&(c=ea(b[ia])?b[ia]():b[ia]);return b&&b.n?b.n(this,a,c):c};var P=function(a,b){var c=a.get(b);return void 0==c?"":""+c},R=function(a,b){var c=a.get(b);return void 0==c||""===c?0:1*c};Ya[z].set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a[ra](d)&&ab(this,d,a[d],c);else ab(this,a,b,c)};
var ab=function(a,b,c,d){if(void 0!=c)switch(b){case Na:wb[pa](c)}var e=$a(b);e&&e.o?e.o(a,b,c,d):a[q].set(b,c,d)},bb=function(a,b,c,d,e){this.name=a;this.p=b;this.n=d;this.o=e;this.defaultValue=c},$a=function(a){var b=Qa.get(a);if(!b)for(var c=0;c<Za[y];c++){var d=Za[c],e=d[0].exec(a);if(e){b=d[1](e);Qa.set(b[v],b);break}}return b},yc=function(a){var b;Qa.map(function(c,d){d.p==a&&(b=d)});return b&&b[v]},S=function(a,b,c,d,e){a=new bb(a,b,c,d,e);Qa.set(a[v],a);return a[v]},cb=function(a,b){Za[p]([new RegExp("^"+
a+"$"),b])},T=function(a,b,c){return S(a,b,c,void 0,db)},db=function(){};var gb=qa(f.GoogleAnalyticsObject)&&sa(f.GoogleAnalyticsObject)||"ga",Ba=!1,he=S("_br"),hb=T("apiVersion","v"),ib=T("clientVersion","_v");S("anonymizeIp","aip");var jb=S("adSenseId","a"),Va=S("hitType","t"),Ia=S("hitCallback"),Ra=S("hitPayload");S("nonInteraction","ni");S("currencyCode","cu");S("dataSource","ds");var Vd=S("useBeacon",void 0,!1),fa=S("transport");S("sessionControl","sc","");S("sessionGroup","sg");S("queueTime","qt");var Ac=S("_s","_s");S("screenName","cd");
var kb=S("location","dl",""),lb=S("referrer","dr"),mb=S("page","dp","");S("hostname","dh");var nb=S("language","ul"),ob=S("encoding","de");S("title","dt",function(){return M.title||void 0});cb("contentGroup([0-9]+)",function(a){return new bb(a[0],"cg"+a[1])});var pb=S("screenColors","sd"),qb=S("screenResolution","sr"),rb=S("viewportSize","vp"),sb=S("javaEnabled","je"),tb=S("flashVersion","fl");S("campaignId","ci");S("campaignName","cn");S("campaignSource","cs");S("campaignMedium","cm");
S("campaignKeyword","ck");S("campaignContent","cc");var ub=S("eventCategory","ec"),xb=S("eventAction","ea"),yb=S("eventLabel","el"),zb=S("eventValue","ev"),Bb=S("socialNetwork","sn"),Cb=S("socialAction","sa"),Db=S("socialTarget","st"),Eb=S("l1","plt"),Fb=S("l2","pdt"),Gb=S("l3","dns"),Hb=S("l4","rrt"),Ib=S("l5","srt"),Jb=S("l6","tcp"),Kb=S("l7","dit"),Lb=S("l8","clt"),Mb=S("timingCategory","utc"),Nb=S("timingVar","utv"),Ob=S("timingLabel","utl"),Pb=S("timingValue","utt");S("appName","an");
S("appVersion","av","");S("appId","aid","");S("appInstallerId","aiid","");S("exDescription","exd");S("exFatal","exf");var Nc=S("expId","xid"),Oc=S("expVar","xvar"),Rc=S("_utma","_utma"),Sc=S("_utmz","_utmz"),Tc=S("_utmht","_utmht"),Ua=S("_hc",void 0,0),Xa=S("_ti",void 0,0),Wa=S("_to",void 0,20);cb("dimension([0-9]+)",function(a){return new bb(a[0],"cd"+a[1])});cb("metric([0-9]+)",function(a){return new bb(a[0],"cm"+a[1])});S("linkerParam",void 0,void 0,Bc,db);var ld=S("usage","_u"),Gd=S("_um");
S("forceSSL",void 0,void 0,function(){return Ba},function(a,b,c){J(34);Ba=!!c});var ed=S("_j1","jid"),Hd=S("_j2");cb("\\&(.*)",function(a){var b=new bb(a[0],a[1]),c=yc(a[0][F](1));c&&(b.n=function(a){return a.get(c)},b.o=function(a,b,g,ca){a.set(c,g,ca)},b.p=void 0);return b});
var Qb=T("_oot"),dd=S("previewTask"),Rb=S("checkProtocolTask"),md=S("validationTask"),Sb=S("checkStorageTask"),Uc=S("historyImportTask"),Tb=S("samplerTask"),Vb=S("_rlt"),Wb=S("buildHitTask"),Xb=S("sendHitTask"),Vc=S("ceTask"),zd=S("devIdTask"),Cd=S("timingTask"),Ld=S("displayFeaturesTask"),V=T("name"),Q=T("clientId","cid"),Ad=S("userId","uid"),Na=T("trackingId","tid"),U=T("cookieName",void 0,"_ga"),W=T("cookieDomain"),Yb=T("cookiePath",void 0,"/"),Zb=T("cookieExpires",void 0,63072E3),$b=T("legacyCookieDomain"),
Wc=T("legacyHistoryImport",void 0,!0),ac=T("storage",void 0,"cookie"),bc=T("allowLinker",void 0,!1),cc=T("allowAnchor",void 0,!0),Ka=T("sampleRate","sf",100),dc=T("siteSpeedSampleRate",void 0,1),ec=T("alwaysSendReferrer",void 0,!1),gd=S("transportUrl"),Md=S("_r","_r");function X(a,b,c,d){b[a]=function(){try{return d&&J(d),c[G](this,arguments)}catch(b){throw ge("exc",a,b&&b[v]),b;}}};var Od=function(a,b,c){this.V=1E4;this.fa=a;this.$=!1;this.B=b;this.ea=c||1},Ed=function(a,b){var c;if(a.fa&&a.$)return 0;a.$=!0;if(b){if(a.B&&R(b,a.B))return R(b,a.B);if(0==b.get(dc))return 0}if(0==a.V)return 0;void 0===c&&(c=Bd());return 0==c%a.V?n.floor(c/a.V)%a.ea+1:0};var ie=new Od(!0,he,7),je=function(a){if(!Ud()&&!Ba){var b=Ed(ie,a);if(b&&!(!O[oa][Ga]&&4<=b&&6>=b)){var c=(new Date).getHours(),d=[Bd(),Bd(),Bd()][H](".");a=(3==b||5==b?"https:":"http:")+"//www.google-analytics.com/collect?z=br.";a+=[b,"A",c,d][H](".");var e=1!=b%3?"https:":"http:",e=e+"//www.google-analytics.com/collect?z=br.",e=e+[b,"B",c,d][H](".");7==b&&(e=e[Qc]("//www.","//ssl."));c=function(){4<=b&&6>=b?O[oa][Ga](e,""):ta(e)};Bd()%2?(ta(a),c()):(c(),ta(a))}}};function fc(){var a,b,c;if((c=(c=O[oa])?c.plugins:null)&&c[y])for(var d=0;d<c[y]&&!b;d++){var e=c[d];-1<e[v][t]("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.AllowScriptAccess="always",b=a.GetVariable("$version")}catch(ca){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(l){}b&&
(a=b[m](/[\d]+/g))&&3<=a[y]&&(b=a[0]+"."+a[1]+" r"+a[2]);return b||void 0};var gc=function(a,b){var c=n.min(R(a,dc),100);if(!(La(P(a,Q))%100>=c)&&(c={},Ec(c)||Fc(c))){var d=c[Eb];void 0==d||Infinity==d||isNaN(d)||(0<d?(Y(c,Gb),Y(c,Jb),Y(c,Ib),Y(c,Fb),Y(c,Hb),Y(c,Kb),Y(c,Lb),b(c)):L(O,"load",function(){gc(a,b)},!1))}},Ec=function(a){var b=O.performance||O.webkitPerformance,b=b&&b.timing;if(!b)return!1;var c=b.navigationStart;if(0==c)return!1;a[Eb]=b.loadEventStart-c;a[Gb]=b.domainLookupEnd-b.domainLookupStart;a[Jb]=b.connectEnd-b.connectStart;a[Ib]=b.responseStart-b.requestStart;
a[Fb]=b.responseEnd-b.responseStart;a[Hb]=b.fetchStart-c;a[Kb]=b.domInteractive-c;a[Lb]=b.domContentLoadedEventStart-c;return!0},Fc=function(a){if(O.top!=O)return!1;var b=O.external,c=b&&b.onloadT;b&&!b.isValidLoadTime&&(c=void 0);2147483648<c&&(c=void 0);0<c&&b.setPageReadyTime();if(void 0==c)return!1;a[Eb]=c;return!0},Y=function(a,b){var c=a[b];if(isNaN(c)||Infinity==c||0>c)a[b]=void 0},Fd=function(a){return function(b){"pageview"!=b.get(Va)||a.I||(a.I=!0,gc(b,function(b){a.send("timing",b)}))}};var hc=!1,mc=function(a){if("cookie"==P(a,ac)){var b=P(a,U),c=nd(a),d=kc(P(a,Yb)),e=lc(P(a,W)),g=1E3*R(a,Zb),ca=P(a,Na);if("auto"!=e)zc(b,c,d,e,ca,g)&&(hc=!0);else{J(32);var l;a:{c=[];e=xa()[A](".");if(4==e[y]&&(l=e[e[y]-1],parseInt(l,10)==l)){l=["none"];break a}for(l=e[y]-2;0<=l;l--)c[p](e[ha](l)[H]("."));c[p]("none");l=c}for(var k=0;k<l[y];k++)if(e=l[k],a[q].set(W,e),c=nd(a),zc(b,c,d,e,ca,g)){hc=!0;return}a[q].set(W,"auto")}}},nc=function(a){if("cookie"==P(a,ac)&&!hc&&(mc(a),!hc))throw"abort";},
Yc=function(a){if(a.get(Wc)){var b=P(a,W),c=P(a,$b)||xa(),d=Xc("__utma",c,b);d&&(J(19),a.set(Tc,(new Date)[da](),!0),a.set(Rc,d.R),(b=Xc("__utmz",c,b))&&d[h]==b[h]&&a.set(Sc,b.R))}},nd=function(a){var b=Cc(P(a,Q)),c=ic(P(a,W));a=jc(P(a,Yb));1<a&&(c+="-"+a);return["GA1",c,b][H](".")},Gc=function(a,b,c){for(var d=[],e=[],g,ca=0;ca<a[y];ca++){var l=a[ca];if(l.r[c]==b)d[p](l);else void 0==g||l.r[c]<g?(e=[l],g=l.r[c]):l.r[c]==g&&e[p](l)}return 0<d[y]?d:e},lc=function(a){return 0==a[t](".")?a.substr(1):
a},ic=function(a){return lc(a)[A](".")[y]},kc=function(a){if(!a)return"/";1<a[y]&&a.lastIndexOf("/")==a[y]-1&&(a=a.substr(0,a[y]-1));0!=a[t]("/")&&(a="/"+a);return a},jc=function(a){a=kc(a);return"/"==a?1:a[A]("/")[y]};function Xc(a,b,c){"none"==b&&(b="");var d=[],e=Ca(a);a="__utma"==a?6:2;for(var g=0;g<e[y];g++){var ca=(""+e[g])[A](".");ca[y]>=a&&d[p]({hash:ca[0],R:e[g],O:ca})}return 0==d[y]?void 0:1==d[y]?d[0]:Zc(b,d)||Zc(c,d)||Zc(null,d)||d[0]}function Zc(a,b){var c,d;null==a?c=d=1:(c=La(a),d=La(D(a,".")?a[F](1):"."+a));for(var e=0;e<b[y];e++)if(b[e][h]==c||b[e][h]==d)return b[e]};var od=new RegExp(/^https?:\/\/([^\/:]+)/),pd=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;function Bc(a){a=a.get(Q);var b=Ic(a,0);return"_ga=1."+K(b+"."+a)}function Ic(a,b){for(var c=new Date,d=O[oa],e=d.plugins||[],c=[a,d.userAgent,c.getTimezoneOffset(),c.getYear(),c.getDate(),c.getHours(),c.getMinutes()+b],d=0;d<e[y];++d)c[p](e[d].description);return La(c[H]("."))}var Dc=function(a){J(48);this.target=a;this.T=!1};
Dc[z].Q=function(a,b){if(a.tagName){if("a"==a.tagName[I]()){a[Ab]&&Pc(a,qd(this,a[Ab],b));return}if("form"==a.tagName[I]())return rd(this,a)}if("string"==typeof a)return qd(this,a,b)};
var qd=function(a,b,c){var d=pd.exec(b);d&&3<=d[y]&&(b=d[1]+(d[3]?d[2]+d[3]:""));a=a[jd].get("linkerParam");var e=b[t]("?"),d=b[t]("#");c?b+=(-1==d?"#":"&")+a:(c=-1==e?"?":"&",b=-1==d?b+(c+a):b[F](0,d)+c+a+b[F](d));return b},rd=function(a,b){if(b&&b[kd]){var c=a[jd].get("linkerParam")[A]("=")[1];if("get"==b.method[I]()){for(var d=b.childNodes||[],e=0;e<d[y];e++)if("_ga"==d[e][v]){d[e][id]("value",c);return}d=M[u]("input");d[id]("type","hidden");d[id]("name","_ga");d[id]("value",c);b.appendChild(d)}else"post"==
b.method[I]()&&(b.action=qd(a,b[kd]))}};
Dc[z].S=function(a,b,c){function d(c){try{c=c||O.event;var d;a:{var g=c[jd]||c.srcElement;for(c=100;g&&0<c;){if(g[Ab]&&g.nodeName[m](/^a(?:rea)?$/i)){d=g;break a}g=g.parentNode;c--}d={}}("http:"==d[E]||"https:"==d[E])&&sd(a,d[ma]||"")&&d[Ab]&&Pc(d,qd(e,d[Ab],b))}catch(w){J(26)}}var e=this;this.T||(this.T=!0,L(M,"mousedown",d,!1),L(M,"touchstart",d,!1),L(M,"keyup",d,!1));if(c){c=function(b){b=b||O.event;if((b=b[jd]||b.srcElement)&&b[kd]){var c=b[kd][m](od);c&&sd(a,c[1])&&rd(e,b)}};for(var g=0;g<M.forms[y];g++)L(M.forms[g],
"submit",c)}};function sd(a,b){if(b==M[B][ma])return!1;for(var c=0;c<a[y];c++)if(a[c]instanceof RegExp){if(a[c][pa](b))return!0}else if(0<=b[t](a[c]))return!0;return!1};var Jd=function(a,b,c,d){this.U=b;this.aa=c;(b=d)||(b=(b=P(a,V))&&"t0"!=b?Wd[pa](b)?"_gat_"+Cc(P(a,Na)):"_gat_"+Cc(b):"_gat");this.Y=b},Rd=function(a,b){var c=b.get(Wb);b.set(Wb,function(b){Pd(a,b);var d=c(b);Qd(a,b);return d});var d=b.get(Xb);b.set(Xb,function(b){var c=d(b);Id(a,b);return c})},Pd=function(a,b){b.get(a.U)||("1"==Ca(a.Y)[0]?b.set(a.U,"",!0):b.set(a.U,""+fe(),!0))},Qd=function(a,b){b.get(a.U)&&zc(a.Y,"1",b.get(Yb),b.get(W),b.get(Na),6E5)},Id=function(a,b){if(b.get(a.U)){var c=new ee,
d=function(a){$a(a).p&&c.set($a(a).p,b.get(a))};d(hb);d(ib);d(Na);d(Q);d(a.U);c.set($a(ld).p,Td(b));var e=a.aa;c.map(function(a,b){e+=K(a)+"=";e+=K(""+b)+"&"});e+="z="+fe();ta(e);b.set(a.U,"",!0)}},Wd=/^gtm\d+$/;var fd=function(a,b){var c=a.b;if(!c.get("dcLoaded")){Nd(c,29);b=b||{};var d;b[U]&&(d=Cc(b[U]));d=new Jd(c,ed,"https://stats.g.doubleclick.net/collect?t=dc&aip=1&",d);Rd(d,c);c.set("dcLoaded",!0)}};var Sd=function(a){var b;b=a.get("dcLoaded")?!1:"cookie"!=a.get(ac)?!1:!0;b&&(Nd(a,51),b=new Jd(a,ed),Pd(b,a),Qd(b,a),a.get(b.U)&&(a.set(Md,1,!0),a.set(gd,oc()+"/r/collect",!0)))};var Kd=function(a,b){var c=a.b;if(!c.get("_rlsaLoaded")){Nd(c,38);b=b||{};if(b[U])var d=Cc(b[U]);d=new Jd(c,Hd,"https://www.google.com/ads/ga-audiences?t=sr&aip=1&",d);Rd(d,c);c.set("_rlsaLoaded",!0);tc("displayfeatures",a,b)}};var Lc=function(){var a=O.gaGlobal=O.gaGlobal||{};return a.hid=a.hid||fe()};var ad,bd=function(a,b,c){if(!ad){var d;d=M[B][h];var e=O[v],g=/^#?gaso=([^&]*)/;if(e=(d=(d=d&&d[m](g)||e&&e[m](g))?d[1]:Ca("GASO")[0]||"")&&d[m](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc("GASO",""+d,c,b,a,0),f._udo||(f._udo=b),f._utcp||(f._utcp=c),a=e[1],wa("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+fe(),"_gasojs");ad=!0}};var wb=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,pc=function(a){function b(a,b){d.b[q].set(a,b)}function c(a,c){b(a,c);d.filters.add(a)}var d=this;this.b=new Ya;this.filters=new Ha;b(V,a[V]);b(Na,sa(a[Na]));b(U,a[U]);b(W,a[W]||xa());b(Yb,a[Yb]);b(Zb,a[Zb]);b($b,a[$b]);b(Wc,a[Wc]);b(bc,a[bc]);b(cc,a[cc]);b(Ka,a[Ka]);b(dc,a[dc]);b(ec,a[ec]);b(ac,a[ac]);b(Ad,a[Ad]);b(hb,1);b(ib,"j35");c(Qb,Ma);c(dd,cd);c(Rb,Oa);c(md,vb);c(Sb,nc);c(Uc,Yc);c(Tb,Ja);c(Vb,Ta);c(Vc,Hc);c(zd,yd);c(Ld,Sd);c(Wb,Pa);c(Xb,Sa);c(Cd,Fd(this));
Jc(this.b,a[Q]);Kc(this.b);this.b.set(jb,Lc());bd(this.b.get(Na),this.b.get(W),this.b.get(Yb))},Jc=function(a,b){if("cookie"==P(a,ac)){hc=!1;var c;b:{var d=Ca(P(a,U));if(d&&!(1>d[y])){c=[];for(var e=0;e<d[y];e++){var g;g=d[e][A](".");var ca=g.shift();("GA1"==ca||"1"==ca)&&1<g[y]?(ca=g.shift()[A]("-"),1==ca[y]&&(ca[1]="1"),ca[0]*=1,ca[1]*=1,g={r:ca,s:g[H](".")}):g=void 0;g&&c[p](g)}if(1==c[y]){J(13);c=c[0].s;break b}if(0==c[y])J(12);else{J(14);d=ic(P(a,W));c=Gc(c,d,0);if(1==c[y]){c=c[0].s;break b}d=
jc(P(a,Yb));c=Gc(c,d,1);c=c[0]&&c[0].s;break b}}c=void 0}c||(c=P(a,W),d=P(a,$b)||xa(),c=Xc("__utma",d,c),void 0!=c?(J(10),c=c.O[1]+"."+c.O[2]):c=void 0);c&&(a[q].set(Q,c),hc=!0)}c=a.get(cc);if(e=(c=M[B][c?"href":"search"][m]("(?:&|#|\\?)"+K("_ga")[Qc](/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)"))&&2==c[y]?c[1]:"")a.get(bc)?(c=e[t]("."),-1==c?J(22):(d=e[F](c+1),"1"!=e[F](0,c)?J(22):(c=d[t]("."),-1==c?J(22):(e=d[F](0,c),c=d[F](c+1),e!=Ic(c,0)&&e!=Ic(c,-1)&&e!=Ic(c,-2)?J(23):(J(11),a[q].set(Q,
c)))))):J(21);b&&(J(9),a[q].set(Q,K(b)));a.get(Q)||((c=(c=O.gaGlobal&&O.gaGlobal.vid)&&-1!=c[ga](/^(?:utma\.)?\d+\.\d+$/)?c:void 0)?(J(17),a[q].set(Q,c)):(J(8),a[q].set(Q,[fe()^Mc()&2147483647,n.round((new Date)[da]()/1E3)][H]("."))));mc(a)},Kc=function(a){var b=O[oa],c=O.screen,d=M[B];a.set(lb,ya(a.get(ec)));if(d){var e=d.pathname||"";"/"!=e.charAt(0)&&(J(31),e="/"+e);a.set(kb,d[E]+"//"+d[ma]+e+d[ga])}c&&a.set(qb,c.width+"x"+c.height);c&&a.set(pb,c.colorDepth+"-bit");var c=M.documentElement,g=(e=
M.body)&&e[la]&&e[na],ca=[];c&&c[la]&&c[na]&&("CSS1Compat"===M.compatMode||!g)?ca=[c[la],c[na]]:g&&(ca=[e[la],e[na]]);c=0>=ca[0]||0>=ca[1]?"":ca[H]("x");a.set(rb,c);a.set(tb,fc());a.set(ob,M.characterSet||M.charset);a.set(sb,b&&"function"===typeof b.javaEnabled&&b.javaEnabled()||!1);a.set(nb,(b&&(b.language||b.browserLanguage)||"")[I]());if(d&&a.get(cc)&&(b=M[B][h])){b=b[A](/[?&#]+/);d=[];for(c=0;c<b[y];++c)(D(b[c],"utm_id")||D(b[c],"utm_campaign")||D(b[c],"utm_source")||D(b[c],"utm_medium")||D(b[c],
"utm_term")||D(b[c],"utm_content")||D(b[c],"gclid")||D(b[c],"dclid")||D(b[c],"gclsrc"))&&d[p](b[c]);0<d[y]&&(b="#"+d[H]("&"),a.set(kb,a.get(kb)+b))}};pc[z].get=function(a){return this.b.get(a)};pc[z].set=function(a,b){this.b.set(a,b)};var qc={pageview:[mb],event:[ub,xb,yb,zb],social:[Bb,Cb,Db],timing:[Mb,Nb,Pb,Ob]};
pc[z].send=function(a){if(!(1>arguments[y])){var b,c;"string"===typeof arguments[0]?(b=arguments[0],c=[][ha][C](arguments,1)):(b=arguments[0]&&arguments[0][Va],c=arguments);b&&(c=za(qc[b]||[],c),c[Va]=b,this.b.set(c,void 0,!0),this.filters.D(this.b),this.b[q].m={},je(this.b))}};var rc=function(a){if("prerender"==M.visibilityState)return!1;a();return!0};var td=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,sc=function(a){if(ea(a[0]))this.u=a[0];else{var b=td.exec(a[0]);null!=b&&4==b[y]&&(this.c=b[1]||"t0",this.e=b[2]||"",this.d=b[3],this.a=[][ha][C](a,1),this.e||(this.A="create"==this.d,this.i="require"==this.d,this.g="provide"==this.d,this.ba="remove"==this.d),this.i&&(3<=this.a[y]?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(qa(this.a[1])?this.X=this.a[1]:this.W=this.a[1])));b=a[1];a=a[2];if(!this.d)throw"abort";if(this.i&&(!qa(b)||""==b))throw"abort";if(this.g&&
(!qa(b)||""==b||!ea(a)))throw"abort";if(ud(this.c)||ud(this.e))throw"abort";if(this.g&&"t0"!=this.c)throw"abort";}};function ud(a){return 0<=a[t](".")||0<=a[t](":")};var Yd,Zd,$d;Yd=new ee;$d=new ee;Zd={ec:45,ecommerce:46,linkid:47};
var tc=function(a,b,c){b==N||b.get(V);var d=Yd.get(a);if(!ea(d))return!1;b.plugins_=b.plugins_||new ee;if(b.plugins_.get(a))return!0;b.plugins_.set(a,new d(b,c||{}));return!0},ae=function(a){function b(a){var b=(a[ma]||"")[A](":")[0][I](),c=(a[E]||"")[I](),c=1*a[ja]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";D(a,"/")||(a="/"+a);return[b,""+c,a]}var c=M[u]("a");Pc(c,M[B][Ab]);var d=(c[E]||"")[I](),e=b(c),g=c[ga]||"",ca=d+"//"+e[0]+(e[1]?":"+e[1]:"");D(a,"//")?a=d+a:D(a,"/")?a=ca+a:!a||D(a,
"?")?a=ca+e[2]+(a||g):0>a[A]("/")[0][t](":")&&(a=ca+e[2][F](0,e[2].lastIndexOf("/"))+"/"+a);Pc(c,a);d=b(c);return{protocol:(c[E]||"")[I](),host:d[0],port:d[1],path:d[2],G:c[ga]||"",url:a||""}};var Z={ga:function(){Z.f=[]}};Z.ga();Z.D=function(a){var b=Z.J[G](Z,arguments),b=Z.f.concat(b);for(Z.f=[];0<b[y]&&!Z.v(b[0])&&!(b.shift(),0<Z.f[y]););Z.f=Z.f.concat(b)};
Z.J=function(a){for(var b=[],c=0;c<arguments[y];c++)try{var d=new sc(arguments[c]);if(d.g)Yd.set(d.a[0],d.a[1]);else{if(d.i){var e=d,g=e.a[0];if(!ea(Yd.get(g))&&!$d.get(g)){Zd[ra](g)&&J(Zd[g]);var ca=e.X;!ca&&Zd[ra](g)?(J(39),ca=g+".js"):J(43);if(ca){ca&&0<=ca[t]("/")||(ca=(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+ca);var l=ae(ca),e=void 0;var k=l[E],w=M[B][E],e="https:"==k||k==w?!0:"http:"!=k?!1:"http:"==w;var Xd;if(Xd=e){var e=l,be=ae(M[B][Ab]);if(e.G||0<=e.url[t]("?")||
0<=e.path[t]("://"))Xd=!1;else if(e.host==be.host&&e[ja]==be[ja])Xd=!0;else{var ce="http:"==e[E]?80:443;Xd="www.google-analytics.com"==e.host&&(e[ja]||ce)==ce&&D(e.path,"/plugins/")?!0:!1}}Xd&&(wa(l.url),$d.set(g,!0))}}}b[p](d)}}catch(de){}return b};
Z.v=function(a){try{if(a.u)a.u[C](O,N.j("t0"));else{var b=a.c==gb?N:N.j(a.c);if(a.A)"t0"==a.c&&N.create[G](N,a.a);else if(a.ba)N.remove(a.c);else if(b)if(a.i){if(!tc(a.a[0],b,a.W))return!0}else if(a.e){var c=a.d,d=a.a,e=b.plugins_.get(a.e);e[c][G](e,d)}else b[a.d][G](b,a.a)}}catch(g){}};var N=function(a){J(1);Z.D[G](Z,[arguments])};N.h={};N.P=[];N.L=0;N.answer=42;var uc=[Na,W,V];N.create=function(a){var b=za(uc,[][ha][C](arguments));b[V]||(b[V]="t0");var c=""+b[V];if(N.h[c])return N.h[c];b=new pc(b);N.h[c]=b;N.P[p](b);return b};N.remove=function(a){for(var b=0;b<N.P[y];b++)if(N.P[b].get(V)==a){N.P.splice(b,1);N.h[a]=null;break}};N.j=function(a){return N.h[a]};N.getAll=function(){return N.P[ha](0)};
N.N=function(){"ga"!=gb&&J(49);var a=O[gb];if(!a||42!=a.answer){N.L=a&&a.l;N.loaded=!0;var b=O[gb]=N;X("create",b,b.create);X("remove",b,b.remove);X("getByName",b,b.j,5);X("getAll",b,b.getAll,6);b=pc[z];X("get",b,b.get,7);X("set",b,b.set,4);X("send",b,b.send);b=Ya[z];X("get",b,b.get);X("set",b,b.set);if(!Ud()&&!Ba){a:{for(var b=M.getElementsByTagName("script"),c=0;c<b[y]&&100>c;c++){var d=b[c].src;if(d&&0==d[t]("https://www.google-analytics.com/analytics")){J(33);b=!0;break a}}b=!1}b&&(Ba=!0)}Ud()||
Ba||!Ed(new Od)||(J(36),Ba=!0);(O.gaplugins=O.gaplugins||{}).Linker=Dc;b=Dc[z];Yd.set("linker",Dc);X("decorate",b,b.Q,20);X("autoLink",b,b.S,25);Yd.set("displayfeatures",fd);Yd.set("adfeatures",Kd);a=a&&a.q;ka(a)?Z.D[G](N,a):J(50)}};N.k=function(){for(var a=N.getAll(),b=0;b<a[y];b++)a[b].get(V)};
(function(){var a=N.N;if(!rc(a)){J(16);var b=!1,c=function(){if(!b&&rc(a)){b=!0;var d=c,e=M;e.removeEventListener?e.removeEventListener("visibilitychange",d,!1):e.detachEvent&&e.detachEvent("onvisibilitychange",d)}};L(M,"visibilitychange",c)}})();function La(a){var b=1,c=0,d;if(a)for(b=0,d=a[y]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};})(window);
;
!function ( a, b, e, f, g ) {
  try {
    a.GoogleAnalyticsObject = e, a[e] =
        a[e] || function ( ) {
      ( a[e].q = a[e].q || [ ] ).push( arguments )
    }, a[e].l = 1 * new Date
  } catch ( h ) {
    a.hasOwnProperty( d ) ||
        ( a[d] =
            function ( ) {
            } )
  }
}( window, document, "ga" ), ga( "create", "UA-51171551-1", "auto" );
ga( "send", "pageview" );
;
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})({
  1: [ function(require, module, exports) {
    "use strict";
    var asap = require("asap/raw");
    function noop() {}
    var LAST_ERROR = null;
    var IS_ERROR = {};
    function getThen(obj) {
      try {
        return obj.then;
      } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
      }
    }
    function tryCallOne(fn, a) {
      try {
        return fn(a);
      } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
      }
    }
    function tryCallTwo(fn, a, b) {
      try {
        fn(a, b);
      } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
      }
    }
    module.exports = Promise;
    function Promise(fn) {
      if (typeof this !== "object") {
        throw new TypeError("Promises must be constructed via new");
      }
      if (typeof fn !== "function") {
        throw new TypeError("not a function");
      }
      this._37 = 0;
      this._12 = null;
      this._59 = [];
      if (fn === noop) return;
      doResolve(fn, this);
    }
    Promise._99 = noop;
    Promise.prototype.then = function(onFulfilled, onRejected) {
      if (this.constructor !== Promise) {
        return safeThen(this, onFulfilled, onRejected);
      }
      var res = new Promise(noop);
      handle(this, new Handler(onFulfilled, onRejected, res));
      return res;
    };
    function safeThen(self, onFulfilled, onRejected) {
      return new self.constructor(function(resolve, reject) {
        var res = new Promise(noop);
        res.then(resolve, reject);
        handle(self, new Handler(onFulfilled, onRejected, res));
      });
    }
    function handle(self, deferred) {
      while (self._37 === 3) {
        self = self._12;
      }
      if (self._37 === 0) {
        self._59.push(deferred);
        return;
      }
      asap(function() {
        var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          if (self._37 === 1) {
            resolve(deferred.promise, self._12);
          } else {
            reject(deferred.promise, self._12);
          }
          return;
        }
        var ret = tryCallOne(cb, self._12);
        if (ret === IS_ERROR) {
          reject(deferred.promise, LAST_ERROR);
        } else {
          resolve(deferred.promise, ret);
        }
      });
    }
    function resolve(self, newValue) {
      if (newValue === self) {
        return reject(self, new TypeError("A promise cannot be resolved with itself."));
      }
      if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
        var then = getThen(newValue);
        if (then === IS_ERROR) {
          return reject(self, LAST_ERROR);
        }
        if (then === self.then && newValue instanceof Promise) {
          self._37 = 3;
          self._12 = newValue;
          finale(self);
          return;
        } else if (typeof then === "function") {
          doResolve(then.bind(newValue), self);
          return;
        }
      }
      self._37 = 1;
      self._12 = newValue;
      finale(self);
    }
    function reject(self, newValue) {
      self._37 = 2;
      self._12 = newValue;
      finale(self);
    }
    function finale(self) {
      for (var i = 0; i < self._59.length; i++) {
        handle(self, self._59[i]);
      }
      self._59 = null;
    }
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
      this.onRejected = typeof onRejected === "function" ? onRejected : null;
      this.promise = promise;
    }
    function doResolve(fn, promise) {
      var done = false;
      var res = tryCallTwo(fn, function(value) {
        if (done) return;
        done = true;
        resolve(promise, value);
      }, function(reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
      });
      if (!done && res === IS_ERROR) {
        done = true;
        reject(promise, LAST_ERROR);
      }
    }
  }, {
    "asap/raw": 4
  } ],
  2: [ function(require, module, exports) {
    "use strict";
    var Promise = require("./core.js");
    module.exports = Promise;
    var TRUE = valuePromise(true);
    var FALSE = valuePromise(false);
    var NULL = valuePromise(null);
    var UNDEFINED = valuePromise(undefined);
    var ZERO = valuePromise(0);
    var EMPTYSTRING = valuePromise("");
    function valuePromise(value) {
      var p = new Promise(Promise._99);
      p._37 = 1;
      p._12 = value;
      return p;
    }
    Promise.resolve = function(value) {
      if (value instanceof Promise) return value;
      if (value === null) return NULL;
      if (value === undefined) return UNDEFINED;
      if (value === true) return TRUE;
      if (value === false) return FALSE;
      if (value === 0) return ZERO;
      if (value === "") return EMPTYSTRING;
      if (typeof value === "object" || typeof value === "function") {
        try {
          var then = value.then;
          if (typeof then === "function") {
            return new Promise(then.bind(value));
          }
        } catch (ex) {
          return new Promise(function(resolve, reject) {
            reject(ex);
          });
        }
      }
      return valuePromise(value);
    };
    Promise.all = function(arr) {
      var args = Array.prototype.slice.call(arr);
      return new Promise(function(resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          if (val && (typeof val === "object" || typeof val === "function")) {
            if (val instanceof Promise && val.then === Promise.prototype.then) {
              while (val._37 === 3) {
                val = val._12;
              }
              if (val._37 === 1) return res(i, val._12);
              if (val._37 === 2) reject(val._12);
              val.then(function(val) {
                res(i, val);
              }, reject);
              return;
            } else {
              var then = val.then;
              if (typeof then === "function") {
                var p = new Promise(then.bind(val));
                p.then(function(val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.reject = function(value) {
      return new Promise(function(resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function(values) {
      return new Promise(function(resolve, reject) {
        values.forEach(function(value) {
          Promise.resolve(value).then(resolve, reject);
        });
      });
    };
    Promise.prototype["catch"] = function(onRejected) {
      return this.then(null, onRejected);
    };
  }, {
    "./core.js": 1
  } ],
  3: [ function(require, module, exports) {
    "use strict";
    var rawAsap = require("./raw");
    var freeTasks = [];
    var pendingErrors = [];
    var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
    function throwFirstError() {
      if (pendingErrors.length) {
        throw pendingErrors.shift();
      }
    }
    module.exports = asap;
    function asap(task) {
      var rawTask;
      if (freeTasks.length) {
        rawTask = freeTasks.pop();
      } else {
        rawTask = new RawTask();
      }
      rawTask.task = task;
      rawAsap(rawTask);
    }
    function RawTask() {
      this.task = null;
    }
    RawTask.prototype.call = function() {
      try {
        this.task.call();
      } catch (error) {
        if (asap.onerror) {
          asap.onerror(error);
        } else {
          pendingErrors.push(error);
          requestErrorThrow();
        }
      } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
      }
    };
  }, {
    "./raw": 4
  } ],
  4: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      module.exports = rawAsap;
      function rawAsap(task) {
        if (!queue.length) {
          requestFlush();
          flushing = true;
        }
        queue[queue.length] = task;
      }
      var queue = [];
      var flushing = false;
      var requestFlush;
      var index = 0;
      var capacity = 1024;
      function flush() {
        while (index < queue.length) {
          var currentIndex = index;
          index = index + 1;
          queue[currentIndex].call();
          if (index > capacity) {
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
              queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
          }
        }
        queue.length = 0;
        index = 0;
        flushing = false;
      }
      var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
      if (typeof BrowserMutationObserver === "function") {
        requestFlush = makeRequestCallFromMutationObserver(flush);
      } else {
        requestFlush = makeRequestCallFromTimer(flush);
      }
      rawAsap.requestFlush = requestFlush;
      function makeRequestCallFromMutationObserver(callback) {
        var toggle = 1;
        var observer = new BrowserMutationObserver(callback);
        var node = document.createTextNode("");
        observer.observe(node, {
          characterData: true
        });
        return function requestCall() {
          toggle = -toggle;
          node.data = toggle;
        };
      }
      function makeRequestCallFromTimer(callback) {
        return function requestCall() {
          var timeoutHandle = setTimeout(handleTimer, 0);
          var intervalHandle = setInterval(handleTimer, 50);
          function handleTimer() {
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
          }
        };
      }
      rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {} ],
  5: [ function(require, module, exports) {
    if (typeof Promise.prototype.done !== "function") {
      Promise.prototype.done = function(onFulfilled, onRejected) {
        var self = arguments.length ? this.then.apply(this, arguments) : this;
        self.then(null, function(err) {
          setTimeout(function() {
            throw err;
          }, 0);
        });
      };
    }
  }, {} ],
  6: [ function(require, module, exports) {
    var asap = require("asap");
    if (typeof Promise === "undefined") {
      Promise = require("./lib/core.js");
      require("./lib/es6-extensions.js");
    }
    require("./polyfill-done.js");
  }, {
    "./lib/core.js": 1,
    "./lib/es6-extensions.js": 2,
    "./polyfill-done.js": 5,
    asap: 3
  } ]
}, {}, [ 6 ]);;
var typeMappings = {
  "document": "text/html",
  "json": "application/json",
  "text": "text/plain"
};
function XHR(method, responseType, url, options) {
  return new Promise(function (resolve, reject) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || typeMappings[responseType] || responseType;
    var req = new XMLHttpRequest();
    req.onerror = function (evt) { reject(new Error("Request error: " + evt.message)) };
    req.onabort = function (evt) { reject(new Error("Request abort: " + evt.message)) };
    req.onload = function () {
      // The other error events are client-errors. If there was a server error,
      // we'd find out about it during this event. We need to only respond to
      // successful requests, i.e. those with HTTP status code in the 200 or 300
      // range.
      if (req.status < 400) {
        var value = req.response;
        if (responseType === "json" && typeof value === "string") {
          value = JSON.parse(value);
        }
        resolve(value);
      }
      else {
        reject(req);
      }
    };

    // The order of these operations is very explicit. You have to call open
    // first. It seems counter intuitive, but think of it more like you're opening
    // an HTTP document to be able to write to it, and then you finish by sending
    // the document. The "open" method does not refer to a network connection.
    req.open(method, url);
    if (responseType) {
      req.responseType = responseType;
    }

    req.onprogress = options.progress;

    for (var key in options.headers) {
      req.setRequestHeader(key, options.headers[key]);
    }

    req.withCredentials = !!options.withCredentials;

    if (options.data) {
      req.send(options.data);
    }
    else {
      req.send();
    }
  });
}

function del(type, url, options) {
  return XHR("DELETE", type, url, options);
}

function delObject(url, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers["content-type"] = options.headers["content-type"] || "application/json;charset=UTF-8";
  if (typeof options.data !== "string") {
    options.data = JSON.stringify(options.data);
  }
  return del(null, url, options);
}

function post(type, url, options) {
  return XHR("POST", type, url, options);
}

function sendObject(type, url, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers["content-type"] = options.headers["content-type"] || "application/json;charset=UTF-8";
  if (typeof options.data !== "string") {
    options.data = JSON.stringify(options.data);
  }
  return post(type, url, options);
}

function sendObjectGetText(url, options) {
  return sendObject("text", url, options);
}

function sendObjectGetObject(url, options) {
  return sendObject("json", url, options);
}

function get(type, url, options) {
  return XHR("GET", type || "text", url, options);
}

function getText(url, options) {
  return get("text", url, options);
}

function getHTML(url, options) {
  return get("document", url, options);
}

function getObject(url, options) {
  return get("json", url, options);
}

function getBuffer(url, options) {
  return get("arraybuffer", url, options);
};
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(a,m){var r={},f=r.lib={},g=function(){},l=f.Base={extend:function(a){g.prototype=this;var b=new g;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
p=f.WordArray=l.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=m?b:4*a.length},toString:function(a){return(a||q).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var j=0;j<a;j++)b[c+j>>>2]|=(d[j>>>2]>>>24-8*(j%4)&255)<<24-8*((c+j)%4);else if(65535<d.length)for(j=0;j<a;j+=4)b[c+j>>>2]=d[j>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var n=this.words,b=this.sigBytes;n[b>>>2]&=4294967295<<
32-8*(b%4);n.length=a.ceil(b/4)},clone:function(){var a=l.clone.call(this);a.words=this.words.slice(0);return a},random:function(n){for(var b=[],d=0;d<n;d+=4)b.push(4294967296*a.random()|0);return new p.init(b,n)}}),y=r.enc={},q=y.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++){var j=b[c>>>2]>>>24-8*(c%4)&255;d.push((j>>>4).toString(16));d.push((j&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,
2),16)<<24-4*(c%8);return new p.init(d,b/2)}},G=y.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new p.init(d,b)}},fa=y.Utf8={stringify:function(a){try{return decodeURIComponent(escape(G.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return G.parse(unescape(encodeURIComponent(a)))}},
h=f.BufferedBlockAlgorithm=l.extend({reset:function(){this._data=new p.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=fa.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(n){var b=this._data,d=b.words,c=b.sigBytes,j=this.blockSize,l=c/(4*j),l=n?a.ceil(l):a.max((l|0)-this._minBufferSize,0);n=l*j;c=a.min(4*n,c);if(n){for(var h=0;h<n;h+=j)this._doProcessBlock(d,h);h=d.splice(0,n);b.sigBytes-=c}return new p.init(h,c)},clone:function(){var a=l.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});f.Hasher=h.extend({cfg:l.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new ga.HMAC.init(a,
d)).finalize(b)}}});var ga=r.algo={};return r}(Math);
(function(a){var m=CryptoJS,r=m.lib,f=r.Base,g=r.WordArray,m=m.x64={};m.Word=f.extend({init:function(a,p){this.high=a;this.low=p}});m.WordArray=f.extend({init:function(l,p){l=this.words=l||[];this.sigBytes=p!=a?p:8*l.length},toX32:function(){for(var a=this.words,p=a.length,f=[],q=0;q<p;q++){var G=a[q];f.push(G.high);f.push(G.low)}return g.create(f,this.sigBytes)},clone:function(){for(var a=f.clone.call(this),p=a.words=this.words.slice(0),g=p.length,q=0;q<g;q++)p[q]=p[q].clone();return a}})})();
(function(){function a(){return g.create.apply(g,arguments)}for(var m=CryptoJS,r=m.lib.Hasher,f=m.x64,g=f.Word,l=f.WordArray,f=m.algo,p=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],y=[],q=0;80>q;q++)y[q]=a();f=f.SHA512=r.extend({_doReset:function(){this._hash=new l.init([new g.init(1779033703,4089235720),new g.init(3144134277,2227873595),new g.init(1013904242,4271175723),new g.init(2773480762,1595750129),new g.init(1359893119,2917565137),new g.init(2600822924,725511199),new g.init(528734635,4215389547),new g.init(1541459225,327033209)])},_doProcessBlock:function(a,f){for(var h=this._hash.words,
g=h[0],n=h[1],b=h[2],d=h[3],c=h[4],j=h[5],l=h[6],h=h[7],q=g.high,m=g.low,r=n.high,N=n.low,Z=b.high,O=b.low,$=d.high,P=d.low,aa=c.high,Q=c.low,ba=j.high,R=j.low,ca=l.high,S=l.low,da=h.high,T=h.low,v=q,s=m,H=r,E=N,I=Z,F=O,W=$,J=P,w=aa,t=Q,U=ba,K=R,V=ca,L=S,X=da,M=T,x=0;80>x;x++){var B=y[x];if(16>x)var u=B.high=a[f+2*x]|0,e=B.low=a[f+2*x+1]|0;else{var u=y[x-15],e=u.high,z=u.low,u=(e>>>1|z<<31)^(e>>>8|z<<24)^e>>>7,z=(z>>>1|e<<31)^(z>>>8|e<<24)^(z>>>7|e<<25),D=y[x-2],e=D.high,k=D.low,D=(e>>>19|k<<13)^
(e<<3|k>>>29)^e>>>6,k=(k>>>19|e<<13)^(k<<3|e>>>29)^(k>>>6|e<<26),e=y[x-7],Y=e.high,C=y[x-16],A=C.high,C=C.low,e=z+e.low,u=u+Y+(e>>>0<z>>>0?1:0),e=e+k,u=u+D+(e>>>0<k>>>0?1:0),e=e+C,u=u+A+(e>>>0<C>>>0?1:0);B.high=u;B.low=e}var Y=w&U^~w&V,C=t&K^~t&L,B=v&H^v&I^H&I,ha=s&E^s&F^E&F,z=(v>>>28|s<<4)^(v<<30|s>>>2)^(v<<25|s>>>7),D=(s>>>28|v<<4)^(s<<30|v>>>2)^(s<<25|v>>>7),k=p[x],ia=k.high,ea=k.low,k=M+((t>>>14|w<<18)^(t>>>18|w<<14)^(t<<23|w>>>9)),A=X+((w>>>14|t<<18)^(w>>>18|t<<14)^(w<<23|t>>>9))+(k>>>0<M>>>
0?1:0),k=k+C,A=A+Y+(k>>>0<C>>>0?1:0),k=k+ea,A=A+ia+(k>>>0<ea>>>0?1:0),k=k+e,A=A+u+(k>>>0<e>>>0?1:0),e=D+ha,B=z+B+(e>>>0<D>>>0?1:0),X=V,M=L,V=U,L=K,U=w,K=t,t=J+k|0,w=W+A+(t>>>0<J>>>0?1:0)|0,W=I,J=F,I=H,F=E,H=v,E=s,s=k+e|0,v=A+B+(s>>>0<k>>>0?1:0)|0}m=g.low=m+s;g.high=q+v+(m>>>0<s>>>0?1:0);N=n.low=N+E;n.high=r+H+(N>>>0<E>>>0?1:0);O=b.low=O+F;b.high=Z+I+(O>>>0<F>>>0?1:0);P=d.low=P+J;d.high=$+W+(P>>>0<J>>>0?1:0);Q=c.low=Q+t;c.high=aa+w+(Q>>>0<t>>>0?1:0);R=j.low=R+K;j.high=ba+U+(R>>>0<K>>>0?1:0);S=l.low=
S+L;l.high=ca+V+(S>>>0<L>>>0?1:0);T=h.low=T+M;h.high=da+X+(T>>>0<M>>>0?1:0)},_doFinalize:function(){var a=this._data,f=a.words,h=8*this._nDataBytes,g=8*a.sigBytes;f[g>>>5]|=128<<24-g%32;f[(g+128>>>10<<5)+30]=Math.floor(h/4294967296);f[(g+128>>>10<<5)+31]=h;a.sigBytes=4*f.length;this._process();return this._hash.toX32()},clone:function(){var a=r.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});m.SHA512=r._createHelper(f);m.HmacSHA512=r._createHmacHelper(f)})();
;
(function () {
  "use strict";

  if (!HTMLFormElement.prototype.reportValidity) {
    HTMLFormElement.prototype.reportValidity = function () {
      var elements = this.querySelectorAll("input, textarea"),
        areAllValid = true,
        firstInvalid = null;
      for (var i = 0; i < elements.length; ++i) {
        var elem = elements[i],
          isValid = true,
          pattern = elem.pattern;

        if (!pattern) {
          switch (elem.type) {
            case "email":
              pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
          }
        }

        elem.style.backgroundColor = "";
        if (elem.required && elem.value.length === 0) {
          isValid = false;
        }
        else if (elem.value.length > 0 && pattern) {
          var regex = new RegExp("^" + pattern + "$");
          isValid = regex.test(elem.value);
        }

        if (!isValid) {
          elem.style.backgroundColor = "#ffc0c0";
          if (!firstInvalid) {
            firstInvalid = elem;
          }
        }

        areAllValid = areAllValid && isValid;
      }

      if (firstInvalid) {
        firstInvalid.scrollIntoView();
      }
      return areAllValid;
    };
  }

  var fields = ["name", "email", "phone", "company", "description"],
    btn = null;

  function trimField() {
    this.value = this.value.trim();
  }

  window.addEventListener("load", function () {
    Array.prototype.slice.call(document.forms.contactForm.querySelectorAll(
      "input, textarea"))
      .forEach(function (elem) {
        elem.addEventListener("blur", trimField.bind(elem), false);
      });

    btn = document.getElementById("submitContact");
    btn.addEventListener("click", sendContact);
  }, false);

  function sendContact() {
    var form = document.querySelector('#contactForm'),
      successMessage = document.querySelector('#submissionSuccess'),
      errorMessage = document.querySelector('#submissionError'),
      oldClass = btn.className,
      oldHref = btn.href;
    if (form.reportValidity()) {
      form.parentElement.style.backgroundColor = "#c0c0c0";
      btn.className += " disabled";
      btn.innerHTML = "Submitting...";
      var interval = setInterval(function () {
        btn.innerHTML += ".";
      }, 1000);
      btn.removeEventListener("click", sendContact);
      btn.style.cursor = "wait";
      var data = fields.reduce(function (obj, k) {
        var elem = form["contact_" + k],
          value = elem.value;
        value = value.trim();
        if (value.length > 0) {
          obj[k] = value;
        }
        elem.disabled = true;
        return obj;
      }, {});

      function clear(box, msg) {
        clearInterval(interval);
        form.parentElement.style.backgroundColor = "";
        form.style.display = "none";
        box.style.display = "block";
        box.scrollIntoView();
        if (window.ga) {
          ga("send", "event", "contactlist", msg);
        }
      }

      sendObjectGetObject("/contacts/", { data: data })
        .then(function (msg) {
          clear(successMessage, "success");
          var b = document.querySelector("#callbackName");
          b.innerHTML = "";
          b.appendChild(document.createTextNode(data.name));
        })
        .catch(clear.bind(null, errorMessage, "fail"));
    }
  }
})();;
( function () {
  var imgs = document.querySelectorAll( "#news > blockquote > img" ),
      box = document.createElement( "div" ),
      disp = document.createElement( "img" );
  box.id = "shadowbox";
  box.className = "hide";
  box.appendChild( disp );
  document.body.appendChild( box );
  for ( var i = 0; i < imgs.length; ++i ) {
    if(imgs[i].src.indexOf("thumb") >= 0){
      imgs[i].className = "thumbnail";
      imgs[i].addEventListener( "click", function ( box, disp ) {
        box.className = "show";
        disp.src = this.src.replace("thumb", "full");
      }.bind( imgs[i], box, disp ), false );
    }
  }

  box.addEventListener( "click", function () {
    this.className = "hide";
  }, false );
} )();;
( function () {
  function MapResizer ( img, map ) {
    var originalCoords = [ ],
        test = new Image();

    for ( var i = 0; i < map.areas.length; ++i ) {
      var coords = map.areas[i].coords;
      originalCoords.push( coords.split( "," ).map( parseFloat ) );
    }

    function resize () {
      var ratio = img.width / test.width;
      for ( var i = 0; i < map.areas.length; ++i ) {
        map.areas[i].coords = originalCoords[i].map( function ( n ) {
          return ratio * n;
        } ).join( "," );
      }
    }

    test.addEventListener( "load", function () {
      window.addEventListener( "resize", resize, false );
      resize();
    }, false );

    test.src = img.src;
  }

  window.addEventListener( "load", function () {
    var imgs = document.querySelectorAll( "img[usemap]" );
    for ( var i = 0; i < imgs.length; ++i ) {
      var map = document.querySelector( "map[name=" + imgs[i].useMap.substring( 1 ) + "]" );
      MapResizer( imgs[i], map );
    }
  }, false );
} )();;
(function () {
  var FADE_LEN = 500;
  function Rotator(elem) {
    var c = [],
      len = elem.children.length,
      n = 0,
      pips = [],
      pager = document.createElement("div"),
      t = 0,
      ttl = elem.dataset.timeout || 3000,
      mid = ttl / 2;

    for (var i = 0; i < len; ++i) {
      c[i] = elem.children[i];
      c[i].style.position = "absolute";
      c[i].style.marginTop = 0;
      c[i].style.marginBottom = 0;
      pips[i] = document.createElement("span");
      pips[i].innerHTML = "●";
      pips[i].className = "pip";
      pips[i].onclick = tick.bind(this, i);
      pager.appendChild(pips[i]);

      if (i > 0) {
        hide(i);
      }
      else {
        show(i);
      }
    }

    pager.style.margin = 0;
    pager.style.padding = 0;
    elem.insertBefore(pager, c[0]);

    function resize() {
      var maxHeight = 0;
      for (var i = 0; i < c.length; ++i) {
        maxHeight = Math.max(maxHeight, c[i].clientHeight);
      }
      elem.style.position = "relative";
      elem.style.height = (maxHeight + pager.clientHeight) + "px";
    }
    resize();
    window.addEventListener("resize", resize, false);

    function hide(i) {
      c[i].style.opacity = 0;
      pips[i].style.cursor = "pointer";
      pips[i].style.opacity = 0.25;
    }

    function show(i) {
      c[i].style.opacity = 1;
      pips[i].style.cursor = "default";
      pips[i].style.opacity = 1;
    }

    function tick(i) {
      hide(n);
      t = 0;
      n = i;
      show(n);
    }

    function isInViewport() {
      var rect = elem.getBoundingClientRect(),
        inBounds = rect.bottom >= 0
          && rect.top <= window.innerHeight;

      return inBounds;
    }

    var lt = 0;
    this.update = function (ft) {
      var dt = ft - lt;
      lt = ft;
      t += dt;
      if (isInViewport()) {
        if (t >= ttl) {
          tick((n + 1) % len);
        }
        c[n].style.opacity = Math.min(1, (mid - Math.abs(t - mid)) / FADE_LEN);
      }
    };
  }

  window.addEventListener("load", function () {
    var rotators = [],
      elems = document.querySelectorAll(".rotator");
    for (var i = 0; i < elems.length; ++i) {
      rotators.push(new Rotator(elems[i]));
    }

    function updateAll(dt) {
      requestAnimationFrame(updateAll);
      for (var i = 0; i < rotators.length; ++i) {
        rotators[i].update(dt);
      }
    }

    requestAnimationFrame(updateAll);
  }, false);
})();