"use strict";var activeSliderDrag,events=require("../../../lib/events.js"),mouse=require("../../../lib/mouse.js"),config=require("../../../lib/config.js"),utils=require("../../../lib/utils.js"),dom=require("../../../lib/dom.js"),timeline=require("./timeline.js"),minOpacity=0,maxOpacity=1,minScale=0,maxScale=6,minAngle=-Math.PI,maxAngle=Math.PI,overlayFrames=[],overlayConfigApp=new Vue({el:"#overlayConfigApp",data:{hidden:!0,closeMsg:"Close",opacity:maxOpacity,scale:1,angle:0,trimStart:1,trimEnd:timeline.app.totalFrames,start:1},methods:{fixData:function(){var e=document.getElementById("overlayConfigTrimStart"),t=document.getElementById("overlayConfigTrimEnd"),a=document.getElementById("overlayConfigStart"),e=parseInt(e.value),t=parseInt(t.value),a=parseInt(a.value);this.trimStart=e||1,this.trimEnd=t||overlayFrames.length,this.start=a||1},validateFormat:function(e){e.target.value=e.target.value.replace(/[^0-9.-]/g,"").replace(/(\..*)\./g,"$1").replace(/^0+/g,"").replace(/(?<!^)-/g,""),this.validateMax(e),this.fixData()},validateAmount:function(e){this.validateMin(e),this.validateMax(e)},validateMax:function(e){var t=e.target.value,a=e.target.dataset.max;"overlayConfigTrimStart"==e.target.id&&(a=this.trimEnd),"overlayConfigTrimEnd"==e.target.id&&(a=overlayFrames.length),"overlayConfigStart"==e.target.id&&(a=timeline.app.totalFrames),parseInt(t)>a&&(e.target.value=a.toString()),this.fixData()},validateMin:function(e){var t=e.target.value,a=e.target.dataset.min;"overlayConfigTrimEnd"==e.target.id&&(a=this.trimStart),parseInt(t)<a&&(e.target.value=a.toString()),this.fixData()},toggleAmount:function(e){var t,a;e.target==document.activeElement&&(e.target.value.length||(e.target.value=1),t=e.wheelDeltaY<0,a=parseInt(e.target.value),t?a--:a++,e.target.value=a.toString(),this.validateAmount(e),this.fixData())},updateSliders:function(){for(var n=this,o=document.querySelectorAll(".slider-wrapper"),s=0;s<o.length;s++)!function(){var e=o[s],t=e.querySelector(".handle"),a=t.getBoundingClientRect(),i=e.querySelector(".track").getBoundingClientRect().width-a.width,l=void 0,r=void 0,a=void 0;"opacity"==e.dataset.label?(l=minOpacity,r=maxOpacity,a=n.opacity):"scale"==e.dataset.label?(l=minScale,r=maxScale,a=n.scale):"rotate"==e.dataset.label&&(l=minAngle,r=maxAngle,a=n.angle),t.style.left="".concat(utils.map(a,l,r,0,i),"px"),e.onmousemove=function(){mouse.dragged&&!activeSliderDrag&&(activeSliderDrag=e)},e.onmousedown=function(){activeSliderDrag=e}}();var e={opacity:this.opacity,scale:this.scale,angle:this.angle};localStorage.setItem(config.autosave.label+".overlay.config",JSON.stringify(e))},show:function(){var i=this;this.hidden=!1,this.$nextTick(function(){i.$el.style.opacity="1",dom.query("#overlayConfigApp .drag").draggable({restrict:!0,root:i.$el}),events.emit("renderSleep");var e=document.getElementById("overlayConfigTrimStart"),t=document.getElementById("overlayConfigTrimEnd"),a=document.getElementById("overlayConfigStart");e.value=i.trimStart,t.value=i.trimEnd,a.value=i.start,i.updateSliders(),i.fixData()})},hide:function(){events.emit("renderFocus"),this.hidden=!0},reset:function(){this.opacity=maxOpacity,this.scale=1,this.angle=0;var e=document.getElementById("overlayConfigTrimStart"),t=document.getElementById("overlayConfigTrimEnd"),a=document.getElementById("overlayConfigStart");e.value=1,t.value=overlayFrames.length,a.value=1,this.fixData(),this.updateSliders()},removeOverlay:function(){confirm("Are you sure you want to remove the overlay?")&&(events.emit("removeOverlay"),this.hide())}}});function handleSliders(){var e,t,a,i,l,r,n;activeSliderDrag&&(r=(e=activeSliderDrag.querySelector(".handle")).getBoundingClientRect(),a=(t=activeSliderDrag.querySelector(".track").getBoundingClientRect()).width-r.width,r=mouse.x-t.x-r.width/2,r=utils.clamp(r,0,a),e.style.left="".concat(r,"px"),"opacity"==activeSliderDrag.dataset.label?(i=minOpacity,n=maxOpacity,l="opacity"):"scale"==activeSliderDrag.dataset.label?(i=minScale,n=maxScale,l="scale"):"rotate"==activeSliderDrag.dataset.label&&(i=minAngle,n=maxAngle,l="angle"),n=utils.map(r,0,a,i,n),overlayConfigApp[l]=n,n={opacity:overlayConfigApp.opacity,scale:overlayConfigApp.scale,angle:overlayConfigApp.angle},localStorage.setItem(config.autosave.label+".overlay.config",JSON.stringify(n)))}events.on("overlayFrames",function(e){overlayFrames=e,overlayConfigApp.trimEnd=overlayFrames.length}),utils.loadJSONData(config.autosave.label+".overlay.config",function(e){"number"==typeof e.opacity&&(overlayConfigApp.opacity=e.opacity),"number"==typeof e.scale&&(overlayConfigApp.scale=e.scale),"number"==typeof e.angle&&(overlayConfigApp.angle=e.angle),overlayConfigApp.updateSliders()}),mouse.on("mouseup",function(e){activeSliderDrag=null}),mouse.on("mousedown",function(e){handleSliders()}),mouse.on("mousemove",function(e){mouse.dragged&&handleSliders()}),module.exports=overlayConfigApp;