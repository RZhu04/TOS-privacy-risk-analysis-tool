//tealium universal tag - utag.loader ut4.0.201507021558, Copyright 2015 Tealium.com Inc. All Rights Reserved.
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_random_rhcorp-prh=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/")===-1){ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/random/rhcorp-prh/prod/';}}})();}catch(e){};if(typeof utag=="undefined"&&!utag_condload){var utag={id:"random.rhcorp-prh",o:{},sender:{},send:{},rpt:{ts:{a:new Date()}},dbi:[],loader:{q:[],lc:0,f:{},p:0,ol:0,wq:[],lq:[],bq:{},bk:{},rf:0,ri:0,rp:0,rq:[],ready_q:[],sendq:{"pending":0},run_ready_q:function(){for(var i=0;i<utag.loader.ready_q.length;i++){utag.DB("READY_Q:"+i);try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};}},lh:function(a,b,c){a=""+location.hostname;b=a.split(".");c=(/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a))?3:2;return b.splice(b.length-c,c).join(".");},WQ:function(a,b,c,d,g){utag.DB('WQ:'+utag.loader.wq.length);try{if(utag.udoname&&utag.udoname.indexOf(".")<0){utag.ut.merge(utag.data,window[utag.udoname],0);}
utag.handler.RE('view',utag.data,"bwq");if(utag.cfg.load_rules_at_wait){utag.handler.LR();}}catch(e){utag.DB(e)};d=0;g=[];for(a=0;a<utag.loader.wq.length;a++){b=utag.loader.wq[a];b.load=utag.loader.cfg[b.id].load;if(b.load==4){this.f[b.id]=0;utag.loader.LOAD(b.id)}else if(b.load>0){g.push(b);d++;}else{this.f[b.id]=1;}}
for(a=0;a<g.length;a++){utag.loader.AS(g[a]);}
if(d==0){utag.loader.END();}},AS:function(a,b,c,d){utag.send[a.id]=a;if(typeof a.src=='undefined'){a.src=utag.cfg.path+((typeof a.name!='undefined')?a.name:'utag.'+a.id+'.js')}
a.src+=(a.src.indexOf('?')>0?'&':'?')+'utv='+(a.v?a.v:utag.cfg.v);utag.rpt['l_'+a.id]=a.src;b=document;this.f[a.id]=0;if(a.load==2){utag.DB("Attach sync: "+a.src);a.uid=a.id;b.write('<script id="utag_'+a.id+'" src="'+a.src+'"></scr'+'ipt>')
if(typeof a.cb!='undefined')a.cb();}else if(a.load==1||a.load==3){if(b.createElement){c='utag_random.rhcorp-prh_'+a.id;if(!b.getElementById(c)){d={src:a.src,id:c,uid:a.id,loc:a.loc}
if(a.load==3){d.type="iframe"};if(typeof a.cb!='undefined')d.cb=a.cb;utag.ut.loader(d);}}}},GV:function(a,b,c){b={};for(c in a){if(a.hasOwnProperty(c)&&typeof a[c]!="function")b[c]=a[c];}
return b},OU:function(a,b,c,d,f){try{if(typeof utag.data['cp.OPTOUTMULTI']!='undefined'){c=utag.loader.cfg;a=utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');for(d=0;d<a.length;d++){b=a[d].split(':');if(b[1]*1!==0){if(b[0].indexOf('c')==0){for(f in utag.loader.GV(c)){if(c[f].tcat==b[0].substring(1))c[f].load=0}}else if(b[0]*1==0){utag.cfg.nocookie=true}else{for(f in utag.loader.GV(c)){if(c[f].tid==b[0])c[f].load=0}}}}}}catch(e){utag.DB(e)}},RDdom:function(o){var d=document||{},l=location||{};o["dom.referrer"]=eval("document."+"referrer");o["dom.title"]=""+d.title;o["dom.domain"]=""+l.hostname;o["dom.query_string"]=(""+l.search).substring(1);o["dom.hash"]=(""+l.hash).substring(1);o["dom.url"]=""+d.URL;o["dom.pathname"]=""+l.pathname;o["dom.viewport_height"]=window.innerHeight||(d.documentElement?d.documentElement.clientHeight:960);o["dom.viewport_width"]=window.innerWidth||(d.documentElement?d.documentElement.clientWidth:960);},RDcp:function(o,b,c,d){b=b||utag.loader.RC();for(d in b){if(d.match(/utag_(.*)/)){for(c in utag.loader.GV(b[d])){o["cp.utag_"+RegExp.$1+"_"+c]=b[d][c];}}}
for(c in utag.loader.GV((utag.cl&&!utag.cl['_all_'])?utag.cl:b)){if(c.indexOf("utag_")<0&&typeof b[c]!="undefined")o["cp."+c]=b[c];}},RDqp:function(o,a,b,c){a=location.search+(location.hash+'').replace("#","&");if(utag.cfg.lowerqp){a=a.toLowerCase()};if(a.length>1){b=a.substring(1).split('&');for(a=0;a<b.length;a++){c=b[a].split("=");if(c.length>1){o["qp."+c[0]]=utag.ut.decode(c[1])}}}},RDmeta:function(o,a,b,h){a=document.getElementsByTagName("meta");for(b=0;b<a.length;b++){try{h=a[b].name||a[b].getAttribute("property")||"";}catch(e){h="";utag.DB(e)};if(utag.cfg.lowermeta){h=h.toLowerCase()};if(h!=""){o["meta."+h]=a[b].content}}},RDva:function(o,a,b){a="";try{a=localStorage.getItem("tealium_va");if(!a||a=="{}")return;b=utag.ut.flatten({va:JSON.parse(a)});utag.ut.merge(o,b,1);}catch(e){utag.DB("localStorage not supported");}
},RDut:function(o,a){o["ut.domain"]=utag.cfg.domain;o["ut.version"]=utag.cfg.v;o["ut.event"]=a||"view";try{o["ut.account"]=utag.cfg.utid.split("/")[0];o["ut.profile"]=utag.cfg.utid.split("/")[1];o["ut.env"]=utag.cfg.path.split("/")[6];}catch(e){utag.DB(e)}},RD:function(o,a,b,c,d){utag.DB("utag.loader.RD");if(typeof o["_t_session_id"]!="undefined"){return};a=(new Date()).getTime();b=utag.loader.RC();c=a+parseInt(utag.cfg.session_timeout);d=a;if(!b.utag_main){b.utag_main={};}else if(b.utag_main.ses_id&&typeof b.utag_main._st!="undefined"&&parseInt(b.utag_main._st)<a){delete b.utag_main.ses_id;}
if(!b.utag_main.v_id){b.utag_main.v_id=utag.ut.vi(a);}
if(!b.utag_main.ses_id){b.utag_main.ses_id=d+'';b.utag_main._ss=b.utag_main._pn=1;b.utag_main._sn=1+parseInt(b.utag_main._sn||0);}else{d=b.utag_main.ses_id;b.utag_main._ss=0;b.utag_main._pn=1+parseInt(b.utag_main._pn);b.utag_main._sn=parseInt(b.utag_main._sn);}
if(isNaN(b.utag_main._sn)||b.utag_main._sn<1){b.utag_main._sn=b.utag_main._pn=1}
b.utag_main._st=c+'';utag.loader.SC("utag_main",{"v_id":b.utag_main.v_id,"_sn":b.utag_main._sn,"_ss":b.utag_main._ss,"_pn":b.utag_main._pn+";exp-session","_st":c,"ses_id":d+";exp-session"});o["_t_visitor_id"]=b.utag_main.v_id;o["_t_session_id"]=d;this.RDqp(o);this.RDmeta(o);this.RDcp(o,b);this.RDdom(o);this.RDva(o);this.RDut(o);},RC:function(a,x,b,c,d,e,f,g,h,i,j,k,l,m,n,o,v,ck,cv,r,s,t){o={};b=(""+document.cookie!="")?(document.cookie).split("; "):[];r=/^(.*?)=(.*)$/;s=/^(.*);exp-(.*)$/;t=(new Date()).getTime();for(c=0;c<b.length;c++){if(b[c].match(r)){ck=RegExp.$1;cv=RegExp.$2;}
e=utag.ut.decode(cv);if(typeof ck!="undefined"){if(ck.indexOf("ulog")==0||ck.indexOf("utag_")==0){e=e.split("$");g=[];j={};for(f=0;f<e.length;f++){try{g=e[f].split(":");if(g.length>2){g[1]=g.slice(1).join(":");}
v="";if((""+g[1]).indexOf("~")==0){h=g[1].substring(1).split("|");for(i=0;i<h.length;i++)h[i]=utag.ut.decode(h[i]);v=h}else v=utag.ut.decode(g[1]);j[g[0]]=v;}catch(er){utag.DB(er)};}
o[ck]={};for(f in utag.loader.GV(j)){if(j[f]instanceof Array){n=[];for(m=0;m<j[f].length;m++){if(j[f][m].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);if(k>t)n[m]=(x==0)?j[f][m]:RegExp.$1;}}
j[f]=n.join("|");}else{j[f]=""+j[f];if(j[f].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);j[f]=(k<t)?null:(x==0?j[f]:RegExp.$1);}}
if(j[f])o[ck][f]=j[f];}}else if(utag.cl[ck]||utag.cl['_all_']){o[ck]=e}}}
return(a)?(o[a]?o[a]:{}):o;},SC:function(a,b,c,d,e,f,g,h,i,j,k,x,v){if(!a)return 0;if(a=="utag_main"&&utag.cfg.nocookie)return 0;v="";var date=new Date();var exp=new Date();exp.setTime(date.getTime()+(365*24*60*60*1000));x=exp.toGMTString();if(c&&c=="da"){x="Thu, 31 Dec 2009 00:00:00 GMT";}else if(a.indexOf("utag_")!=0&&a.indexOf("ulog")!=0){if(typeof b!="object"){v=b}}else{d=utag.loader.RC(a,0);for(e in utag.loader.GV(b)){f=""+b[e];if(f.match(/^(.*);exp-(\d+)(\w)$/)){g=date.getTime()+parseInt(RegExp.$2)*((RegExp.$3=="h")?3600000:86400000);if(RegExp.$3=="u")g=parseInt(RegExp.$2);f=RegExp.$1+";exp-"+g;}
if(c=="i"){if(d[e]==null)d[e]=f;}else if(c=="d")delete d[e];else if(c=="a")d[e]=(d[e]!=null)?(f-0)+(d[e]-0):f;else if(c=="ap"||c=="au"){if(d[e]==null)d[e]=f;else{if(d[e].indexOf("|")>0){d[e]=d[e].split("|")}
g=(d[e]instanceof Array)?d[e]:[d[e]];g.push(f);if(c=="au"){h={};k={};for(i=0;i<g.length;i++){if(g[i].match(/^(.*);exp-(.*)$/)){j=RegExp.$1;}
if(typeof k[j]=="undefined"){k[j]=1;h[g[i]]=1;}}
g=[];for(i in utag.loader.GV(h)){g.push(i);}}
d[e]=g}}else d[e]=f;}
h=new Array();for(g in utag.loader.GV(d)){if(d[g]instanceof Array){for(c=0;c<d[g].length;c++){d[g][c]=encodeURIComponent(d[g][c])}
h.push(g+":~"+d[g].join("|"))}else h.push(g+":"+encodeURIComponent(d[g]))};if(h.length==0){h.push("");x=""}
v=(h.join("$"));}
document.cookie=a+"="+v+";path=/;domain="+utag.cfg.domain+";expires="+x;return 1},LOAD:function(a,b,c,d){if(!utag.loader.cfg){return}
if(this.ol==0){if(utag.loader.cfg[a].block&&utag.loader.cfg[a].cbf){this.f[a]=1;delete utag.loader.bq[a];}
for(b in utag.loader.GV(utag.loader.bq)){if(utag.loader.cfg[a].load==4&&utag.loader.cfg[a].wait==0){utag.loader.bk[a]=1;utag.DB("blocked: "+a);}
utag.DB("blocking: "+b);return;}
utag.loader.INIT();return;}
utag.DB('utag.loader.LOAD:'+a);if(this.f[a]==0){this.f[a]=1;if(utag.cfg.noview!=true){if(utag.loader.cfg[a].send){utag.DB("SENDING: "+a);try{if(utag.loader.sendq.pending>0&&utag.loader.sendq[a]){utag.DB("utag.loader.LOAD:sendq: "+a);while(d=utag.loader.sendq[a].shift()){utag.DB(d);utag.sender[a].send(d.event,utag.handler.C(d.data));utag.loader.sendq.pending--;}}else{utag.sender[a].send('view',utag.handler.C(utag.data));}
utag.rpt['s_'+a]=0;}catch(e){utag.DB(e);utag.rpt['s_'+a]=1;}}}
if(utag.loader.rf==0)return;for(b in utag.loader.GV(this.f)){if(this.f[b]==0||this.f[b]==2)return}
utag.loader.END();}},EV:function(a,b,c,d){if(b=="ready"){if(!utag.data){try{utag.cl={'_all_':1};utag.loader.initdata();utag.loader.RD(utag.data);}catch(e){utag.DB(e)};}
if((document.attachEvent||utag.cfg.dom_complete)?document.readyState==="complete":document.readyState!=="loading")setTimeout(c,1);else{utag.loader.ready_q.push(c);var RH;if(utag.loader.ready_q.length<=1){if(document.addEventListener){RH=function(){document.removeEventListener("DOMContentLoaded",RH,false);utag.loader.run_ready_q()};if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded",RH,false);window.addEventListener("load",utag.loader.run_ready_q,false);}else if(document.attachEvent){RH=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",RH);utag.loader.run_ready_q()}};document.attachEvent("onreadystatechange",RH);window.attachEvent("onload",utag.loader.run_ready_q);}}}}else{if(a.addEventListener){a.addEventListener(b,c,false)}else if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c)}}},END:function(b,c,d,e,v,w){if(this.ended){return};this.ended=1;utag.DB("loader.END");b=utag.data;if(utag.handler.base&&utag.handler.base!='*'){e=utag.handler.base.split(",");for(d=0;d<e.length;d++){if(typeof b[e[d]]!="undefined")utag.handler.df[e[d]]=b[e[d]]}}else if(utag.handler.base=='*'){utag.ut.merge(utag.handler.df,b,1);}
utag.rpt['r_0']="t";for(var r in utag.loader.GV(utag.cond)){utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";}
utag.rpt.ts['s']=new Date();v=".tiqcdn.com";w=utag.cfg.path.indexOf(v);if(w>0&&b["cp.utag_main__ss"]==1)utag.ut.loader({src:utag.cfg.path.substring(0,w)+v+"/utag/tiqapp/utag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
utag.handler.RE('view',b,"end");utag.handler.INIT();}},DB:function(a,b){if(utag.cfg.utagdb===false){return;}else if(typeof utag.cfg.utagdb=="undefined"){utag.db_log=[];b=document.cookie+'';utag.cfg.utagdb=((b.indexOf('utagdb=true')>=0)?true:false);}
if(utag.cfg.utagdb===true){var t;if(utag.ut.typeOf(a)=="object"){t=utag.handler.C(a)}else{t=a}
utag.db_log.push(t);try{console.log(t)}catch(e){}}},RP:function(a,b,c){if(typeof a!='undefined'&&typeof a.src!='undefined'&&a.src!=''){b=[];for(c in utag.loader.GV(a)){if(c!='src')b.push(c+'='+escape(a[c]))}
this.dbi.push((new Image()).src=a.src+'?utv='+utag.cfg.v+'&utid='+utag.cfg.utid+'&'+(b.join('&')))}},view:function(a,c,d){return this.track({event:'view',data:a,cfg:{cb:c,uids:d}})},link:function(a,c){return this.track({event:'link',data:a,cfg:{cb:c}})},track:function(a,b,c,d){if(typeof a=="string")a={event:a,data:b,cfg:{cb:c}};for(d in utag.loader.GV(utag.o)){try{utag.o[d].handler.trigger(a.event||"view",a.data||a,a.cfg)}catch(e){utag.DB(e)};}
if(a.cfg&&a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};return true},handler:{base:"",df:{},o:{},send:{},iflag:0,INIT:function(a,b,c){utag.DB('utag.handler.INIT');if(utag.initcatch){utag.initcatch=0;return}
this.iflag=1;a=utag.loader.q.length;if(a>0){for(b=0;b<a;b++){c=utag.loader.q[b];utag.handler.trigger(c.a,c.b)}}
},test:function(){return 1},LR:function(){utag.DB("Load Rules");for(var d in utag.loader.GV(utag.cond)){utag.cond[d]=false;}
utag.DB(utag.data);utag.loader.loadrules();utag.DB(utag.cond);utag.loader.initcfg();utag.loader.OU();},RE:function(a,b,c,d,e,f,g){if(c&&!this.cfg_extend){return 0;}
utag.DB('All Tags EXTENSIONS');utag.DB(b);if(typeof this.extend!="undefined"){g=0;for(d=0;d<this.extend.length;d++){try{e=0;if(typeof this.cfg_extend!="undefined"){f=this.cfg_extend[d];if(typeof f.count=="undefined")f.count=0;if(f[a]==0||(f.once==1&&f.count>0)||(typeof c!="undefined"&&f[c]==0)){e=1}else{if(typeof c!="undefined"&&f[c]==1){g=1};f.count++}}
if(e!=1){this.extend[d](a,b);utag.rpt['ex_'+d]=0}}catch(er){utag.rpt['ex_'+d]=1;utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});}}
utag.DB(b);return g;}},trigger:function(a,b,c,d,e,f){utag.DB('trigger:'+a);b=b||{};utag.DB(b);if(!this.iflag){for(d in utag.loader.f){if(!(utag.loader.f[d]===1))utag.DB('Tag '+d+' did not LOAD')}
utag.loader.q.push({a:a,b:b});return;}
utag.cfg.noview=false;utag.ut.merge(b,this.df,0);utag.loader.RDqp(b);utag.loader.RDcp(b);utag.loader.RDdom(b);utag.loader.RDmeta(b);utag.loader.RDva(b);utag.loader.RDut(b,a);function sendTag(a,b,d){try{if(typeof utag.sender[d]!="undefined"){utag.DB("SENDING: "+d);utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}else if(utag.loader.cfg[d].load!=2&&utag.loader.cfg[d].s2s!=1){utag.loader.sendq[d]=utag.loader.sendq[d]||[];utag.loader.sendq[d].push({"event":a,"data":b});utag.loader.sendq.pending++;utag.loader.AS({id:d,load:1});}}catch(e){utag.DB(e)}}
if(c&&c.uids){this.RE(a,b);for(f=0;f<c.uids.length;f++){d=c.uids[f];sendTag(a,b,d);}}else if(utag.cfg.load_rules_ajax){this.RE(a,b,"blr");utag.ut.merge(utag.data,b,1);this.LR();this.RE(a,b);for(f=0;f<utag.loader.cfgsort.length;f++){d=utag.loader.cfgsort[f];if(utag.loader.cfg[d].load&&utag.loader.cfg[d].send){sendTag(a,b,d);}}}else{this.RE(a,b);for(d in utag.loader.GV(utag.sender)){sendTag(a,b,d);}}
utag.loader.SC("utag_main",{"_st":((new Date()).getTime()+parseInt(utag.cfg.session_timeout))});},C:function(a,b,c){b={};for(c in utag.loader.GV(a)){if(a[c]instanceof Array){b[c]=a[c].slice(0)}else{b[c]=a[c]}}
return b}},ut:{pad:function(a,b,c,d){a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return""+d+a},vi:function(t,a,b){if(!utag.v_id){a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;}
return utag.v_id},isEmptyObject:function(o,a){for(a in o){return false;}
return true;},typeOf:function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();},flatten:function(o){var a={};function r(c,p){if(Object(c)!==c||c instanceof Array){a[p]=c;}else{if(utag.ut.isEmptyObject(c)){}else{for(var d in c){r(c[d],p?p+"."+d:d);}}}}
r(o,"");return a;},merge:function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d]}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined")a[d]=b[d]}}},decode:function(a,b){b="";try{b=decodeURIComponent(a)}catch(e){utag.DB(e)};if(b==""){b=unescape(a)};return b},error:function(a,b,c){if(typeof utag_err!="undefined"){utag_err.push(a)}
c="";for(b in a){c+=b+":"+a[b]+" , "};utag.DB(c)},loader:function(o,a,b,c,l){a=document;if(o.type=="iframe"){b=a.createElement("iframe");o.attrs=o.attrs||{"height":"1","width":"1","style":"display:none"};for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l])}
b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";for(l in utag.loader.GV(o.attrs)){b[l]=o.attrs[l]}
b.src=o.src;}
if(o.id){b.id=o.id};if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}
l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}};utag.o['random.rhcorp-prh']=utag;utag.cfg={v:"ut4.36.201507021558",load_rules_ajax:true,load_rules_at_wait:false,lowerqp:false,session_timeout:1800000,readywait:0,noload:0,domain:utag.loader.lh(),path:"//tags.tiqcdn.com/utag/random/rhcorp-prh/prod/",utid:"random/rhcorp-prh/201507021548"};utag.cond={2:0};utag.loader.initdata=function(){try{utag.data=(typeof utag_data!='undefined')?utag_data:{};utag.udoname='utag_data';}catch(e){utag.data={};utag.DB('idf:'+e);}};utag.loader.loadrules=function(){try{utag.cond[2]|=(typeof utag.data['dom.url']=='undefined')}catch(e){utag.DB(e)};};utag.pre=function(){utag.loader.initdata();try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};utag.loader.loadrules();};utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();utag.handler.extend=[function(a,b,c,d){b._ccity='';b._ccountry='';b._ccurrency='';b._ccustid='';b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';b._cpromo='';b._cship='';b._cstate='';b._cstore='';b._csubtotal='';b._ctax='';b._ctotal='';b._ctype='';b._czip='';b._cprod=(typeof b['product_isbn']!='undefined'&&b['product_isbn'].length>0)?b['product_isbn']:[];b._cprodname=[];b._cbrand=[];b._ccat=[];b._ccat2=[];b._cquan=[];b._cprice=[];b._csku=[];b._cpdisc=[];if(b._cprod.length==0){b._cprod=b._csku.slice()};if(b._cprodname.length==0){b._cprodname=b._csku.slice()};function tf(a){if(a==''||isNaN(parseFloat(a))){return a}else{return(parseFloat(a)).toFixed(2)}};b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};},function(a,b){if(b.newsletter_name&&b.newsletter_name!=='undefined'&&b.newsletter_view_flag!="yes"){utag.view({newsletter_name:b.newsletter_name,newsletter_view_flag:"yes"},null,[11,13])}},function(a,b){if(b.event_type&&b.event_type=="affiliate_click"){utag.view({event_type:b.event_type,affiliate_name:b.affiliate_name,single_product_isbn:b.product_isbn[0]},null,[8])}},function(a,b){if(b.event_type&&b.event_type=="product_share"){utag.view({social_platform:b.social_platform,single_product_isbn:b.product_isbn[0]},null,[10])}},function(a,b){if(b.sweeps_and_promo&&b.sweeps_and_promo!=='undefined'&&b.sweeps_and_promo_view_flag!="yes"){utag.view({sweeps_and_promo:b.sweeps_and_promo,sweeps_and_promo_view_flag:"yes"},null,[12])}},function(a,b){if(b.event_type&&b.event_type=="read_excerpt"){utag.view({single_product_isbn:b.product_isbn[0]},null,[7])}},function(a,b){try{if((b['page_name'].toString().toLowerCase()=='Checkout Page - Cart'.toLowerCase()&&b['page_type'].toString().toLowerCase()=='Cart'.toLowerCase())){b['event_type']='cart_open'}}catch(e){utag.DB(e)}}];utag.loader.initcfg=function(){utag.loader.cfg={"1":{load:1,send:1,wait:1,tid:19063},"2":{load:1,send:1,wait:1,tid:7115},"3":{load:1,send:1,wait:1,tid:17001},"4":{load:1,send:1,wait:1,tid:7110},"5":{load:1,send:1,wait:1,tid:3005},"6":{load:utag.cond[2],send:1,wait:1,tid:4001},"7":{load:utag.cond[2],send:1,wait:1,tid:4001},"8":{load:utag.cond[2],send:1,wait:1,tid:4001},"9":{load:utag.cond[2],send:1,wait:1,tid:4001},"10":{load:utag.cond[2],send:1,wait:1,tid:4001},"11":{load:utag.cond[2],send:1,wait:1,tid:4001},"12":{load:utag.cond[2],send:1,wait:1,tid:4001},"13":{load:utag.cond[2],send:1,wait:1,tid:6020}};utag.loader.cfgsort=["1","2","3","4","5","6","7","8","9","10","11","12","13"];}
utag.loader.initcfg();}
if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i]};utag.loader.PINIT=function(a,b,c){utag.DB("Pre-INIT");if(utag.cfg.noload){return;}
try{this.GET();if(utag.handler.RE('view',utag.data,"blr")){utag.handler.LR();}}catch(e){utag.DB(e)};a=this.cfg;c=0;for(b in this.GV(a)){if(a[b].block==1||(a[b].load>0&&(typeof a[b].src!='undefined'&&a[b].src!=''))){a[b].block=1;c=1;this.bq[b]=1;}}
if(c==1){for(b in this.GV(a)){if(a[b].block){a[b].id=b;if(a[b].load==4)a[b].load=1;a[b].cb=function(){var d=this.uid;utag.loader.cfg[d].cbf=1;utag.loader.LOAD(d)};this.AS(a[b]);}}}
if(c==0)this.INIT();};utag.loader.INIT=function(a,b,c,d,e){utag.DB('utag.loader.INIT');if(this.ol==1)return-1;else this.ol=1;utag.handler.RE('view',utag.data);utag.rpt.ts['i']=new Date();d=this.cfgsort;for(a=0;a<d.length;a++){e=d[a];b=this.cfg[e];b.id=e;if(b.block!=1&&b.s2s!=1){if(utag.loader.bk[b.id]||(utag.cfg.readywait&&b.load==4)){this.f[b.id]=0;utag.loader.LOAD(b.id)
}else if(b.wait==1&&utag.loader.rf==0&&!(b.load==4&&utag.cfg.noview)){utag.DB('utag.loader.INIT: waiting '+b.id);this.wq.push(b)
this.f[b.id]=2;}else if(b.load>0){utag.DB('utag.loader.INIT: loading '+b.id);this.lq.push(b);this.AS(b);}}}
if(this.wq.length>0)utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.DB('READY:utag.loader.wq');utag.loader.rf=1;utag.loader.WQ();}});else if(this.lq.length>0)utag.loader.rf=1;else if(this.lq.length==0)utag.loader.END();return 1};utag.loader.EV('','ready',function(a){if(utag.loader.efr!=1){utag.loader.efr=1;try{if(typeof utag.runonce=='undefined')utag.runonce={};utag.jdh=function(h,i,j,k){h=utag.jdhc.length;if(h==0)window.clearInterval(utag.jdhi);else{for(i=0;i<h;i++){j=utag.jdhc[i];k=jQuery(j.i).is(":visible")?1:0;if(k!=j.s){if(j.e==(j.s=k))jQuery(j.i).trigger(j.e?"afterShow":"afterHide")}}}};utag.jdhi=window.setInterval(utag.jdh,250);utag.jdhc=[];if(typeof utag.runonce[7]=='undefined'){utag.runonce[7]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.facebook',function(e){utag.link({module_variation:'Facebook',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[8]=='undefined'){utag.runonce[8]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.twitter',function(e){utag.link({module_variation:'Twitter',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[9]=='undefined'){utag.runonce[9]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.google-plus',function(e){utag.link({module_variation:'Google plus',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[10]=='undefined'){utag.runonce[10]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.pinterest',function(e){utag.link({module_variation:'Pinterest',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[11]=='undefined'){utag.runonce[11]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.instagram',function(e){utag.link({module_variation:'Instagram',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[12]=='undefined'){utag.runonce[12]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social.tumblr',function(e){utag.link({module_variation:'Tumblr',module_type:'Header Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[13]=='undefined'){utag.runonce[13]=1;jQuery(document.body).on('mousedown','.enlarge',function(e){utag.link({module_type:'Enlarge Cover'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[14]=='undefined'){utag.runonce[14]=1;jQuery(document.body).on('mousedown','.fa-rss',function(e){utag.link({event_type:'rss'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[19]=='undefined'){utag.runonce[19]=1;jQuery(document.body).on('mousedown','.footer-links a',function(e){utag.link({module_type_variation:'Footer | '+$(this).text().trim()})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[21]=='undefined'){utag.runonce[21]=1;jQuery(document.body).on('mousedown','.products-promo.button a',function(e){utag.link({module_type:'Call to Action',module_variation:'Call to Action Button'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[29]=='undefined'){utag.runonce[29]=1;jQuery(document.body).on('mousedown','#main-nav li a:not(.result)',function(e){utag.link({module_type_variation:'Header | '+$(this).text().trim()})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[30]=='undefined'){utag.runonce[30]=1;jQuery(document.body).on('mousedown','.footer-bttm-links a img',function(e){utag.link({module_type_variation:"Footer | "+$(this).attr("alt")})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[32]=='undefined'){utag.runonce[32]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.facebook',function(e){utag.link({module_variation:'Facebook',module_type:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[33]=='undefined'){utag.runonce[33]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.twitter',function(e){utag.link({module_variation:'Twitter',module_type:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[34]=='undefined'){utag.runonce[34]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.google-plus',function(e){utag.link({module_variation:'Google Plus',module_type:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[35]=='undefined'){utag.runonce[35]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.pinterest',function(e){utag.link({module_type:'Pinterest',module_variation:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[36]=='undefined'){utag.runonce[36]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.instagram',function(e){utag.link({module_variation:'Instagram',module_type:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[37]=='undefined'){utag.runonce[37]=1;jQuery(document.body).on('mousedown','.desktop-wrap .sprite.social.tumblr',function(e){utag.link({module_type:'Tumblr',module_variation:'Stay in Touch Social Links'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[39]=='undefined'){utag.runonce[39]=1;jQuery(document.body).on('mousedown','.fa-envelope',function(e){utag.view({},null,[6])});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[43]=='undefined'){utag.runonce[43]=1;jQuery(document.body).on('mousedown','#social-nav .sprite.social',function(e){utag.view({},null,[9])});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[47]=='undefined'){utag.runonce[47]=1;jQuery(document.body).on('mousedown','.logo a img',function(e){utag.link({module_type_variation:'Header | Logo'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[48]=='undefined'){utag.runonce[48]=1;jQuery(document.body).on('mousedown','.products-promo .button a',function(e){utag.link({module_type_variation:'Call to Action | Call to Action Button'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[50]=='undefined'){utag.runonce[50]=1;jQuery(document.body).on('mousedown','#authorsearchform button',function(e){utag.link({module_type:'Author Find Event'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[51]=='undefined'){utag.runonce[51]=1;jQuery(document.body).on('mousedown','.all-authors',function(e){utag.link({module_type:'See All Authors Button'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[52]=='undefined'){utag.runonce[52]=1;jQuery(document.body).on('mousedown','.contributor-series a',function(e){utag.link({module_type:'Author Series'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[53]=='undefined'){utag.runonce[53]=1;jQuery(document.body).on('mousedown','.map-it',function(e){utag.link({module_type:'Author Map Button'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[56]=='undefined'){utag.runonce[56]=1;jQuery(document.body).on('mousedown','.photo-wrapper.author a img',function(e){utag.link({module_type:'Author Event Image or Link'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[57]=='undefined'){utag.runonce[57]=1;jQuery(document.body).on('mousedown','.discovery-unit .btn-box a',function(e){utag.link({module_type:'Discover More Button'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[58]=='undefined'){utag.runonce[58]=1;jQuery(document.body).on('mousedown','.browse .deploy a',function(e){utag.link({module_type:'Browse',module_variation:$(this).text()})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[59]=='undefined'){utag.runonce[59]=1;jQuery(document.body).on('mousedown','#main-nav li .result a',function(e){utag.link({event_type:'internal_quick_search'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[60]=='undefined'){utag.runonce[60]=1;jQuery(document.body).on('mousedown','.author.img-responsive',function(e){utag.link({module_type:'Author Event Image'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[61]=='undefined'){utag.runonce[61]=1;jQuery(document.body).on('mousedown','.carousel h4 a',function(e){utag.link({module_type:'Explore',module_variation:$(this).text()})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[62]=='undefined'){utag.runonce[62]=1;jQuery(document.body).on('mousedown','.author-name',function(e){utag.link({module_type:'Author Event Link Name'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[63]=='undefined'){utag.runonce[63]=1;jQuery(document.body).on('mousedown','.author-of',function(e){utag.link({module_type:'Author Event Book Title'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[67]=='undefined'){utag.runonce[67]=1;jQuery(document.body).on('mousedown','.product-author-also-by .slot-header a',function(e){utag.link({module_type:'Also By | Author Link Name'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[69]=='undefined'){utag.runonce[69]=1;jQuery(document.body).on('mousedown','.variant-theme-image',function(e){utag.link({module_type_variation:'Call to Action | Call to Action Image'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[70]=='undefined'){utag.runonce[70]=1;jQuery(document.body).on('mousedown','.promo-text.media',function(e){utag.link({module_type_variation:'Call to Action | Call to Action Link'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[72]=='undefined'){utag.runonce[72]=1;jQuery(document.body).on('mousedown','.also-by-author .slider .item .img',function(e){var myIndex=$(this).parent().prevAll().length;myIndex="P"+parseInt(myIndex)+1;modname="Also In";var ec="Cover"
var tb=$("a img",this).attr("alt");var mod_t_v="Cover | "+myIndex;utag.link({module_variation:mod_t_v,module_index:myIndex,module_type:modname,slider_element:ec,slider_book:tb});});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[74]=='undefined'){utag.runonce[74]=1;jQuery(document.body).on('mousedown','.also-by-author .slider .item .title',function(e){var myIndex=$(this).parent().prevAll().length;myIndex="P"+parseInt(myIndex)+1;var modname=$(this).closest(":has(h4)").find('h4').text();modname=$.trim(modname);if(modname.indexOf("Also")==0){modname="Also In"}
var ec="Title"
var tbt=$("a",this).text();var mod_t_v="Title | "+myIndex;utag.link({module_variation:mod_t_v,module_index:myIndex,module_type:modname,slider_element:ec,slider_book:tbt});});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[78]=='undefined'){utag.runonce[78]=1;jQuery(document.body).on('mousedown','.icalendar_list li a',function(e){utag.link({module_type_variation:'Calendar | Add to Calendar'})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[79]=='undefined'){utag.runonce[79]=1;jQuery(document.body).on('mousedown','.contributor-books .slider .item .img',function(e){var myIndex=$(this).parent().prevAll().length;myIndex="P"+parseInt(myIndex)+1;modname="Author Page Tiles";var ec="Cover"
var tb=$("a img",this).attr("alt");var mod_t_v="Cover | "+myIndex;utag.link({module_variation:mod_t_v,module_index:myIndex,module_type:modname,slider_element:ec,slider_book:tb});});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[80]=='undefined'){utag.runonce[80]=1;jQuery(document.body).on('mousedown','.contributor-books .slider .item .title',function(e){var myIndex=$(this).parent().prevAll().length;myIndex="P"+parseInt(myIndex)+1;modname="Author Page Titles"
var ec="title"
var tbt=$("a",this).text();var mod_t_v="Title | "+myIndex;utag.link({module_variation:mod_t_v,module_index:myIndex,module_type:modname,slider_element:ec,slider_book:tbt});});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[81]=='undefined'){utag.runonce[81]=1;jQuery(document.body).on('mousedown','.also-by-author h4',function(e){if($(this).closest(":has(h4)").find('h4').text().indexOf("Also in")>-1){tmv="Also in"}
else{tmv="Also by"}
utag.link({module_type:tmv,module_variation:"Title"})});}}catch(e){utag.DB(e)};try{if(typeof utag.runonce[82]=='undefined'){utag.runonce[82]=1;jQuery(document.body).on('mousedown','.add-to-calendar .btn',function(e){utag.link({module_type_variation:'Calendar | Open Modal'})});}}catch(e){utag.DB(e)};}})
if(utag.cfg.readywait||utag.cfg.waittimer){utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.loader.rf=1;utag.cfg.readywait=1;utag.DB('READY:utag.cfg.readywait');setTimeout(function(){utag.loader.PINIT()},utag.cfg.waittimer||1);}})}else{utag.loader.PINIT()}}