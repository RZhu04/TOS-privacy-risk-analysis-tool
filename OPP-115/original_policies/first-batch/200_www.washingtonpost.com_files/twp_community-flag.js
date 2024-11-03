(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("CommunityFlag","Echo.StreamServer.Controls.Stream.Item");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){this.extendTemplate("insertAsLastChild","data",plugin.templates.main);plugin.config.proxyURL=wp_e2.metaUrl};plugin.config={"showUserList":false,"markUnreliableFlaggers":{"enabled":true,"markerValue":"unreliable_flagger"}};plugin.labels={"flagged":"Reported","flaggedThis":" reported this.","flagControl":"Report","unflagControl":"Reported",
"flagProcessing":"Reporting...","unflagProcessing":"Unreporting..."};Echo.Labels.set(plugin.labels,"Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI");plugin.templates.main='\x3cdiv class\x3d"{plugin.class:flaggedBy}"\x3e\x3c/div\x3e';plugin.component.renderers.buttons=function(element){var item=this.component;this.parentRenderer("buttons",arguments);element.find(".echo-streamserver-controls-stream-item-button-Flag, .echo-streamserver-controls-stream-item-button-Unflag").unbind("click");
element.find(".echo-streamserver-controls-stream-item-button-Flag").on("mouseenter",this,function(event){event.stopPropagation();var flagControl=$("#comment-flag-container").clone();flagControl.find("li").on("click",event.data,function(event){event.stopPropagation();var markerValue=$(this).attr("id");var name="Flag";var item=event.data.component;var plugin=event.data;if(plugin.config.get("markUnreliableFlaggers").enabled==true){var userMarkers=wp_e2.echo_user.get("markers");$.each(userMarkers||[],
function(index,value){if(value.indexOf(plugin.config.get("markUnreliableFlaggers").markerValue)>-1)markerValue=markerValue+"-"+plugin.config.get("markUnreliableFlaggers").markerValue})}item.view.get("buttons").find(".echo-streamserver-controls-stream-item-button-Flag .echo-streamserver-controls-stream-item-buttonCaption").empty().append(plugin.labels.get(name.toLowerCase()+"Processing"));var activity={"verbs":["http://activitystrea.ms/schema/1.0/"+name.toLowerCase()],"targets":[{"id":item.get("data.object.id")}]};
var request=Echo.StreamServer.API.request({"endpoint":"submit","secure":plugin.config.get("useSecureAPI",false,true),"submissionProxyURL":plugin.config.get("submissionProxyURL","",true),"data":{"content":activity,"appkey":item.config.get("appkey"),"sessionID":item.user.get("sessionID"),"target-query":item.config.get("parent.query")},"onData":function(response){var data='{"verb": "mark","target": "'+item.get("data.object.id")+'","markers": "'+markerValue+'"}';$.get(plugin.config.get("proxyURL"),{"appkey":item.config.get("appkey"),
"content":data,"sessionID":item.user.get("sessionID","")},function(){response.markers=markerValue;plugin._publishEventComplete({"name":name,"state":"Complete","response":response});if(name==="Flag"&&!item.config.get("parent.showFlags")){plugin.set("flagged",true);item.view.render({"name":"buttons"})}plugin.requestDataRefresh()},"jsonp")},"onError":function(response){plugin._publishEventComplete({"name":name,"state":"Error","response":response});item.render()}});request.send()});flagControl.appendTo($(this)).show()});
element.find(".echo-streamserver-controls-stream-item-button-Flag").on("mouseleave",function(event){event.stopPropagation();$(this).find("#comment-flag-container").remove()});return element};plugin.methods._publishEventComplete=function(args){var item=this.component;this.events.publish({"topic":"on"+args.name+args.state,"data":{"item":{"data":item.get("data"),"target":item.config.get("target")},"response":args.response}})};plugin.methods._myFlags=function(flags){var item=this.component;return $.map(flags,
function(entry){if(item.user.has("identity",entry.actor.id))return entry})};plugin.css=".{plugin.class:flaggedBy} { background: url({config:cdnBaseURL.sdk-assets}/images/curation/status/communityflagged.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }";Echo.Plugin.create(plugin)})(Echo.jQuery);