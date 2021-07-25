"use strict";var events=require("../../../../lib/events.js"),utils=require("../../../../lib/utils.js"),dom=require("../../../../lib/dom.js"),timeline=require("./timeline.js"),randomTitle=require("../../lib/random.title.js"),framesExportApp=new Vue({el:"#framesExportApp",data:{hidden:!0},methods:{show:function(){var o=this;this.hidden=!1,this.$nextTick(function(){o.$el.style.opacity="1",dom.query("#framesExportApp .drag").draggable({restrict:!0,root:o.$el}),dom.query("#framesExportApp .custom-checkbox",!0).on("click",function(e){dom.query(e.target).query(".checkbox").toggleClass("checked")}),dom.query("#framesExportName").value(randomTitle.generate());var e=timeline.graph.playbackHandle.start.mark+1,t=timeline.graph.playbackHandle.end.mark+1,a=rigModel.bounds,r=a.max.x-a.min.x,a=a.max.y-a.min.y;dom.query("#framesExportStart").value(e),dom.query("#framesExportEnd").value(t),dom.query("#framesExportWidth").value(r.toFixed(2)),dom.query("#framesExportHeight").value(a.toFixed(2)),setTimeout(function(){document.getElementById("framesExportName").focus()},100),events.emit("renderSleep")})},hide:function(){this.hidden=!0,events.emit("renderFocus")},validateFormat:function(e){e.target.value=e.target.value.replace(/[^0-9.-]/g,"").replace(/(\..*)\./g,"$1").replace(/^0+/g,"").replace(/(?<!^)-/g,""),this.validateMax(e)},validateAmount:function(e){this.validateMin(e),this.validateMax(e)},validateMax:function(e){var t=e.target.value,a=e.target.dataset.max;"framesExportStart"==e.target.id&&(a=parseInt(dom.query("#framesExportEnd").value())),"framesExportEnd"==e.target.id&&(a=timeline.app.totalFrames),parseInt(t)>a&&(e.target.value=a.toString())},validateMin:function(e){var t=e.target.value,a=e.target.dataset.min;"framesExportEnd"==e.target.id&&(a=parseInt(dom.query("#framesExportStart").value())),parseInt(t)<a&&(e.target.value=a.toString())},toggleAmount:function(e){var t,a;e.target==document.activeElement&&(e.target.value.length||(e.target.value=1),t=e.wheelDeltaY<0,a=parseFloat(e.target.value),t?a--:a++,"framesExportWidth"!=e.target.id&&"framesExportHeight"!=e.target.id||(a=a.toFixed(2)),e.target.value=a.toString(),this.validateAmount(e))},validate:function(){var e=dom.query("#framesExportName").value(),t=parseInt(dom.query("#framesExportStart").value()),a=parseInt(dom.query("#framesExportEnd").value()),r=a-t+1,o=parseFloat(dom.query("#framesExportWidth").value()),i=parseFloat(dom.query("#framesExportHeight").value()),s=dom.query("#framesExportShowSkin").query(".checkbox").hasClass("checked"),m=dom.query("#framesExportShowBones").query(".checkbox").hasClass("checked");events.emit("exportFrames",{name:e.length?e:utils.uid(),start:t,end:a,totalFrames:r,frameWidth:o,frameHeight:i,showSkin:s,showBones:m})}}});module.exports=framesExportApp;