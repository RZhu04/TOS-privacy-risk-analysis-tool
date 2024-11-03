amznJQ.available("jQuery",function(){(function($){window.Microfiche=function(options){this.initialize(options);
return this;
};
Microfiche.VERSION="1.8.0";
$.extend(Microfiche.prototype,{options:{autoplay:false,autopause:false,buttons:true,bullets:true,cyclic:false,keyboard:false,swipe:true,clickToAdvance:false,minDuration:250,duration:500,maxDuration:500,dragThreshold:25,elasticity:0.5,swipeThreshold:0.125,refreshOnResize:false,prevButtonLabel:"&larr;",nextButtonLabel:"&rarr;",noScrollAlign:"left"},x:0,initialize:function(options){this.options=$.extend({},this.options,options);
this.el=$(options.el);
this.initialContents=this.el.contents();
this.el.data("microfiche",this);
this.createFilm();
this.createScreen();
this.calibrate();
if(this.film.width()<=this.screen.width()){this.noScrollAlign(this.options.noScrollAlign);
this.refreshOnResize(this.options.refreshOnResize);
return;
}this.createControls();
this.enableTouch();
this.enableKeyboard();
this.enableClick();
this.prepareCyclic();
this.run(this.options);
},createFilm:function(){this.film=$('<div class="microfiche-film">').css({position:"absolute"});
this.el.children().appendTo(this.film).css({"float":"left"});
this.prepareFilm&&this.prepareFilm();
},createScreen:function(){this.screen=$('<div class="microfiche-screen">').css({position:"relative",overflow:"hidden"}).appendTo(this.el).append(this.film);
},prepareCyclic:function(){if(!this.options.cyclic){return;
}var cloneL=this.film.clone(),cloneR=this.film.clone(),w=this.film.width();
cloneL.prependTo(this.film).css({position:"absolute",left:-w+"px"});
cloneR.appendTo(this.film).css({position:"absolute",left:w+"px"});
},calibrate:function(){this.screen.width(100000);
var w=this.film.width(),h=this.film.height();
this.film.width(w).height(h);
this.screen.width("auto").height(h);
},createControls:function(){var self=this;
this.controls=$('<span class="microfiche-controls" />').appendTo(this.el);
this.controls.on("click","a, button",function(e){self.didClickControl(e);
});
if(this.options.bullets){this.createBullets();
}if(this.options.buttons){this.createButtons();
}this.updateControls();
},createBullets:function(){var container=$('<span class="microfiche-bullets" />').appendTo(this.controls);
for(var i=0;
i<this.totalPageCount();
i++){$("<button>").addClass("microfiche-bullet").attr("data-microfiche-page",i).data("action","slideToPage").data("arguments",[i]).html(i+1).appendTo(container);
}},createButtons:function(){$("<button>").addClass("microfiche-button microfiche-prev-button").attr("rel","prev").data("action","prev").data("arguments",[]).html(this.options.prevButtonLabel).prependTo(this.controls);
$("<button>").addClass("microfiche-button microfiche-next-button").attr("rel","next").data("action","next").data("arguments",[]).html(this.options.nextButtonLabel).appendTo(this.controls);
},enableTouch:function(){if(!this.options.swipe){return;
}var self=this;
var thisTouchstart=this.touchstart,thisTouchmove=this.touchmove,thisTouchend=this.touchend;
this.touchstart=function(){thisTouchstart.apply(self,arguments);
};
this.touchmove=function(){thisTouchmove.apply(self,arguments);
};
this.touchend=function(){thisTouchend.apply(self,arguments);
};
this.film.on("touchstart",this.touchstart);
},enableKeyboard:function(){if(!this.options.keyboard){return;
}var self=this;
this.screen.attr("data-microfiche-keyboard",true);
var thisOnkeydown=this.onkeydown;
this.onkeydown=function(){thisOnkeydown.apply(self,arguments);
};
$(document).on("keydown",this.onkeydown);
},enableClick:function(){if(!this.options.clickToAdvance){return;
}var self=this;
var thisOnmousedown=this.onmousedown;
this.onmousedown=function(){thisOnmousedown.apply(self,arguments);
};
this.film.on("mousedown",this.onmousedown);
},didClickControl:function(e){e.preventDefault();
var control=$(e.target),action=control.data("action"),args=control.data("arguments");
this[action].apply(this,args);
},touchstart:function(e){var touches=e.originalEvent.targetTouches;
if(!touches||touches.length>1){return;
}this.touchState={then:new Date(),ox:touches[0].pageX,oy:touches[0].pageY,isDrag:false};
$(document).on("touchmove",this.touchmove).on("touchend",this.touchend);
},touchmove:function(e){var t=e.originalEvent.targetTouches[0],dx=t.pageX-this.touchState.ox,dy=t.pageY-this.touchState.oy;
if(!this.touchState.isDrag){if(Math.abs(dy)>=this.options.dragThreshold){this.touchend();
return;
}else{if(Math.abs(dx)>=this.options.dragThreshold){this.touchState.isDrag=true;
}}}if(this.touchState.isDrag){e.preventDefault();
var now=new Date(),t=now-this.touchState.then;
this.touchState.vx=(dx-this.touchState.dx)/t;
this.touchState.vy=(dy-this.touchState.dy)/t;
this.touchState.dx=dx;
this.touchState.dy=dy;
this.touchState.then=now;
this.touchState.cx=this.x-dx;
if(!this.options.cyclic){if(this.touchState.cx<this.min()){var bx=this.min()-this.touchState.cx;
bx=bx*this.options.elasticity;
this.touchState.cx=this.min()-bx;
}if(this.touchState.cx>this.max()){var bx=this.touchState.cx-this.max();
bx=bx*this.options.elasticity;
this.touchState.cx=this.max()+bx;
}}this.film.css({WebkitTransition:"none",WebkitTransform:"translate3d("+-this.touchState.cx+"px, 0px, 0px)"});
}},touchend:function(e){$(document).off("touchmove",this.touchmove).off("touchend",this.touchend);
if(this.touchState.isDrag){var dx=this.touchState.dx,w=this.screenWidth(),vx=this.touchState.vx,th=this.options.swipeThreshold;
if(dx<=-w*th){this.slideByPages(1,vx);
}else{if(dx>=w*th){this.slideByPages(-1,vx);
}else{this.slideByPages(0);
}}}},onkeydown:function(e){if(e.keyCode!==37&&e.keyCode!==39||!this.isCentral("[data-microfiche-keyboard]")){return;
}if(e.keyCode===37){this.slideByPages(-1);
}else{if(e.keyCode===39){this.slideByPages(1);
}}},onmousedown:function(e){this.slideByPages(1);
},updateControls:function(){if(this.options.bullets){this.updateBullets();
}if(this.options.buttons){this.updateButtons();
}},updateBullets:function(){this.controls.find(".microfiche-bullet").removeClass("selected");
this.controls.find('[data-microfiche-page="'+this.currentPageIndex()+'"]').addClass("selected");
},updateButtons:function(){if(this.options.cyclic){return;
}this.controls.find('[rel="prev"]').attr("disabled",this.x<=this.min());
this.controls.find('[rel="next"]').attr("disabled",this.x>=this.max());
},round:function(x){var w=this.screenWidth();
return Math.round(x/w)*w;
},constrain:function(x,min,max){if(min===undefined){min=this.min();
}if(max===undefined){max=this.max();
}return Math.max(min,Math.min(x,max));
},roundAndConstrain:function(x,min,max){return this.constrain(this.round(x),min,max);
},withinBounds:function(x){return this.min()<=x&&x<=this.max();
},min:function(){return 0;
},max:function(){return this.film.width()-this.screenWidth();
},currentPageIndex:function(){return Math.round(this.x/this.screenWidth());
},totalPageCount:function(){return Math.ceil(this.film.width()/this.screenWidth());
},screenWidth:function(){return this.el.width();
},isCentral:function(selector){var closest=$($(selector||".microfiche-screen").sort(function(a,b){return Math.abs(1-(($(window).scrollTop()+$(window).height()/2-$(a).height()/2)/$(a).offset().top))-Math.abs(1-(($(window).scrollTop()+$(window).height()/2-$(b).height()/2)/$(b).offset().top));
})[0]).parent().data("microfiche");
return(closest===this);
},jump:function(){this.el.trigger("microfiche:willMove");
this.performJump();
this.updateControls();
this.el.trigger("microfiche:didMove");
},performJump:function(){this.film.css({left:-this.x});
},transition:function(duration){var self=this;
if(this.options.cyclic){this.handleWrappingTransition();
}if(duration==null){duration=this.options.duration;
}var callback=function(){self.afterTransition();
};
this.el.trigger("microfiche:willMove");
setTimeout(function(){self.performTransition(duration,callback);
});
},handleWrappingTransition:function(){if(this.x>this.max()){this.x=this.min()-this.screenWidth();
if(this.touchState&&this.touchState.dx){this.x-=this.touchState.dx;
}this.jump();
this.x=this.min();
this.updateControls();
}else{if(this.x<this.min()){this.x=this.max()+this.screenWidth();
if(this.touchState&&this.touchState.dx){this.x-=this.touchState.dx;
}this.jump();
this.x=this.max();
this.updateControls();
}}},performTransition:function(duration,callback){this.film.stop().animate({left:-this.x+"px"},duration,callback);
},afterTransition:function(){delete this.touchState;
this.el.trigger("microfiche:didMove");
},slideByPages:function(n,vx){var ox=this.x,w=this.screenWidth();
this.x=this.constrain((Math.round(this.x/w)+n)*w);
if(this.options.cyclic&&this.x==ox){this.x+=n*w;
}if(vx){var duration=this.constrain(Math.abs((this.x-ox)/vx),this.options.minDuration,this.options.maxDuration);
}else{var duration=this.options.duration;
}this.updateControls();
this.transition(duration);
},slideToPage:function(page){this.x=this.constrain(page*this.screenWidth());
this.updateControls();
this.transition();
},slideToPoint:function(x){this.x=this.roundAndConstrain(x);
this.updateControls();
this.transition();
},jumpToPage:function(page){this.x=this.constrain(page*this.screenWidth());
this.updateControls();
this.jump();
},jumpToPoint:function(x){this.x=this.roundAndConstrain(x);
this.updateControls();
this.jump();
},prev:function(){this.slideByPages(-1);
},next:function(){this.slideByPages(1);
},autoplay:function(n){if(this.autoplayTimeout){clearInterval(this.autoplayTimeout);
delete this.autoplayTimeout;
}n=+n;
if(isNaN(n)||n<=0){return;
}var self=this;
this.autoplayTimeout=setInterval(function(){if(!self.pause){self.next();
}},n*1000);
},autopause:function(){var self=this;
this.el.hover(function(){self.pause=true;
},function(){self.pause=false;
});
},destroy:function(){this.el.empty();
this.el.off();
this.clearResizeHandler();
this.el.removeData("microfiche");
},refresh:function(){var options=this.el.data("microfiche").options,contents=this.getContents();
this.destroy();
this.el.append(contents);
new Microfiche($.extend({el:this.el},options));
return this.el;
},getContents:function(){if(this.contentsChanged()){return this.el.html();
}else{return this.el.data("microfiche").initialContents;
}},contentsChanged:function(){return this.el.find(".microfiche-screen").length===0;
},refreshOnResize:function(delay){this.options.refreshOnResize=delay;
if(this.resizeHandler){this.clearResizeHandler();
}if(delay===false){return;
}if(delay===true){delay=250;
}var self=this,timeout;
self.resizeHandler=function(){if(timeout){clearTimeout(timeout);
}timeout=setTimeout(function(){self.refresh();
},delay);
};
$(window).on("resize",self.resizeHandler);
},clearResizeHandler:function(){$(window).off("resize",this.resizeHandler);
},noScrollAlign:function(alignment){if(this.film.width()>this.screen.width()){return;
}switch(alignment){case"center":this.film.css({left:"50%",marginLeft:(this.film.width()/2*-1)+"px",right:"auto"});
break;
case"right":this.film.css({left:"auto",marginLeft:"auto",right:0});
break;
default:this.film.css({left:0,marginLeft:"auto",right:"auto"});
}},run:function(options){for(var key in options){var property=this[key];
if($.isFunction(property)){property.call(this,options[key]);
}}}});
if(("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix())){$.extend(Microfiche.prototype,{prepareFilm:function(){this.film.css({WebkitTransform:"translate3d(0px, 0px, 0px)"});
},performTransition:function(duration,callback){this.film.one("webkitTransitionEnd",callback).css({WebkitTransition:"-webkit-transform "+duration+"ms",WebkitTransform:"translate3d("+-this.x+"px, 0px, 0px)"});
},performJump:function(){this.film.css({WebkitTransition:"-webkit-transform 0ms",WebkitTransform:"translate3d("+-this.x+"px, 0px, 0px)"});
}});
}jQuery.fn.microfiche=function(options){return this.each(function(){var microfiche=$(this).data("microfiche");
if(microfiche){microfiche.run(options);
}else{new Microfiche($.extend({el:this},options));
}});
};
})(jQuery);
amznJQ.declareAvailable("microfiche");
});
amznJQ.available("microfiche",function(){(function($){var apiKey="1jdn52tb3h1d9bjub21a";
var apiEndpoint="//api.viddler.com/api/v2/";
function retrievePlaylist(playlistId,callback){return $.ajax({url:apiEndpoint+"viddler.playlists.getDetails.jsonp",data:{key:apiKey,playlist_id:playlistId,per_page:100},dataType:"jsonp",success:callback});
}function videoHtml(videoId,options){if(!options){options={};
}var src="//www.viddler.com/embed/"+videoId+"/";
if(options.autoplay){src+="?autoplay=1";
}return $("<iframe>",{src:src,height:"372",frameborder:"0",allowfullscreen:true,id:"video-iframe"});
}function thumbsHtml(videos){var thumbsContainer=$("<div>",{"class":"thumbs-container"});
var ul=$("<ul>");
$.each(videos,function(index,video){var link=$("<a>",{"data-video-id":video.id});
var thumb=$("<img>",{src:video.thumbnail_url.replace("http:",""),alt:video.title});
link.append(thumb);
link.append($("<span>").text(video.title));
var li=$("<li>").append(link);
ul.append(li);
});
thumbsContainer.append(ul);
return thumbsContainer;
}function setupLinks(){$(document).on("click",".thumbs-container a",function(){$("html,body").animate({scrollTop:$("body").offset().top},"slow");
var newHtml=videoHtml($(this).data("video-id"),{autoplay:true});
$("#video-iframe").replaceWith(newHtml);
});
}$.fn.playlistEmbed=function(){setupLinks();
this.each(function(){var allVideoIds=[];
var playlistLoaders=[];
var container=$(this);
var playlistIds=container.data("playlist-ids").split(" ");
$.each(playlistIds,function(index,playlistId){playlistLoaders.push(retrievePlaylist(playlistId,function(data){var videos=data["list_result"]["video_list"];
var title=data.list_result.playlist.name+" ("+videos.length+" videos)";
container.append($("<h2>").html(title));
var thumbs=thumbsHtml(videos);
container.append(thumbs);
var setSize=function(){if(container.width()>=768){var thumbnailsPerRow=6;
}else{if(container.width()>=480){var thumbnailsPerRow=4;
}else{var thumbnailsPerRow=2;
}}var thumbnailWidth=(container.width()/thumbnailsPerRow)-14;
thumbnailWidth=parseInt(thumbnailWidth);
thumbs.find("li, img").css({width:thumbnailWidth});
var thumbnailHeight=parseInt(0.5625*thumbnailWidth);
thumbs.find("img").css({height:thumbnailHeight});
container.find(".thumbs-container").css("height",thumbnailHeight+54+"px");
};
setSize();
thumbs.microfiche({bullets:false,prevButtonLabel:"&lt;",nextButtonLabel:"&gt;",refreshOnResize:true});
$(window).resize(setSize);
$.each(videos,function(index,video){allVideoIds.push(video.id);
});
}));
});
$.when.apply($,playlistLoaders).then(function(){if(container.data("initial-video-id")&&$.inArray(container.data("initial-video-id"),allVideoIds)>=0){var initialVideoId=container.data("initial-video-id");
}else{var initialVideoId=allVideoIds[0];
}var video=videoHtml(initialVideoId,{autoplay:container.data("autoplay")});
container.prepend(video);
});
});
};
})(jQuery);
amznJQ.declareAvailable("viddler-video-playlist");
});
amznJQ.onReady("viddler-video-playlist",function(){(function($){var initialVideo=jQuery(".playlist-initial-video");
var playlistElement=jQuery(".playlist-video-embed");
if(initialVideo.length){var videoId=initialVideo.first().data("initial-video-id");
if(videoId){playlistElement.data("initial-video-id",videoId);
}var autoplay=initialVideo.first().data("autoplay");
if(autoplay){playlistElement.data("autoplay",autoplay);
}}playlistElement.playlistEmbed();
}(jQuery));
});
if("undefined"!==typeof(amznJQ)){amznJQ.declareAvailable("cs-retail-help-video-player-js");
}