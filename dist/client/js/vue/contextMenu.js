"use strict";var clonedeep=require("lodash.clonedeep"),rigModel=require("../../lib/rig.model.js"),config=require("../../../../lib/config.js"),utils=require("../../../../lib/utils.js"),vector=require("../../../../lib/vector.js"),contextMenuApp=new Vue({el:"#contextMenuApp",data:{selectedKeyframe:null,hidden:!0,position:{x:0,y:0},width:document.getElementById("contextMenuApp").offsetWidth,height:document.getElementById("contextMenuApp").offsetHeight},methods:{show:function(e,t){var i=this;this.hidden=!1,this.$nextTick(function(){i.width=i.$el.offsetWidth,i.height=i.$el.offsetHeight,i.position.x=e,i.position.y=t,i.$el.style.left="".concat(i.position.x,"px"),i.$el.style.top="".concat(i.position.y,"px")})},hide:function(){this.hidden=!0},copy:function(){rigModel.copiedKeyframe=clonedeep(rigModel.getKeyframe("selected",!0))},paste:function(){var e=require("./timeline.js"),t=rigModel.copiedKeyframe;t&&rigModel.setKeyframe(e.graph.state.currentMark,{position:vector(e.graph.state.currentMark*e.graph.hatchMark.spacing+e.graph.hatchMark.spacing/2,config.render.keyframe.y),locked:0==e.graph.state.currentMark,id:utils.uid(),joints:t.joints})}}});window.contextMenuApp=contextMenuApp,module.exports=contextMenuApp;