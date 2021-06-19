"use strict";function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,t=function(){};return{s:t,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){o=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(o)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var camera=require("../../../lib/camera.js"),engine=require("./engine.js"),Renderer=function(){function e(){_classCallCheck(this,e),this.canvas=document.getElementById("gameCanvas"),this.width=this.canvas.width,this.height=this.canvas.height,this.context=this.canvas.getContext("2d"),this.camera=camera.create(this.context),this.engine=engine.create(),this.offscreen=0,this.context.offscreens=[],this._customOptions=["fill","stroke","align","close","curve"],this._currentContext=this.context}return _createClass(e,[{key:"render",value:function(e){var t=this;"function"==typeof e&&this.engine.run(function(){t.clear(),e(),t.context.offscreens.length&&t.drawOffscreens()})}},{key:"getFrameCount",value:function(){return this.engine.frameCount}},{key:"getFrameRate",value:function(){return this.engine.frameRate}},{key:"setSize",value:function(e,t){this.width=e,this.height=t,this.canvas.width=this.width,this.canvas.height=this.height;var n,r=_createForOfIteratorHelper(this.context.offscreens);try{for(r.s();!(n=r.n()).done;){var i=n.value;i.canvas.width=this.canvas.width,i.canvas.height=this.canvas.height}}catch(e){r.e(e)}finally{r.f()}}},{key:"fullscreen",value:function(){var e=this;this.setSize(innerWidth,innerHeight),addEventListener("resize",function(){e.setSize(innerWidth,innerHeight)})}},{key:"createLayer",value:function(){var e=document.createElement("canvas");e.width=this.canvas.width,e.height=this.canvas.height;var t=e.getContext("2d"),e={camera:this.camera};return t.rendererData=e,this.context.offscreens.push(t),t}},{key:"drawOffscreens",value:function(){for(var t=this,n=0;n<this.context.offscreens.length;n++)!function(){var e=t.context.offscreens[n];e.rendererData.camera.begin(function(){t.context.drawImage(e.canvas,0,0,e.canvas.width,e.canvas.height)}),e.clearRect(0,0,e.canvas.width,e.canvas.height)}()}},{key:"circle",value:function(e,t,n,r,i){var a=i||this.context;a.beginPath(),a.arc(e,t,n,0,2*Math.PI),this._hasProperty(r,"close",function(){a.closePath()}),this._evaluateOptions(r,a)}},{key:"rect",value:function(t,n,r,i,e,a){var o=a||this.context;this._hasProperty(e,"align",function(e){e=e.split(" ");e[0]&&("center"==e[0]||"middle"==e[0]?t-=.5*r:"right"==e[0]&&(t-=r)),e[1]&&("center"==e[1]||"middle"==e[0]?n-=.5*i:"bottom"==e[1]&&(n-=i))}),o.beginPath(),o.rect(t,n,r,i),this._hasProperty(e,"close",function(){o.closePath()}),this._evaluateOptions(e,o)}},{key:"fromVertices",value:function(s,e,t){var c=t||this.context;if(s.length){if(c.beginPath(),!this._hasProperty(e,"curve")){c.moveTo(s[0].x,s[0].y);for(var n=0;n<s.length;n++){var r=s[n];c.lineTo(r.x,r.y)}}this._hasProperty(e,"curve",function(){c.beginPath();var e=s[0],t=s[1],n=.5*(e.x+t.x),t=.5*(e.y+t.y);c.moveTo(n,t);for(var r=1;r<s.length;r++){var i=s[r],a=s[r+1==s.length?0:r+1],o=.5*(a.x+i.x),a=.5*(a.y+i.y);c.quadraticCurveTo(i.x,i.y,o,a)}c.quadraticCurveTo(e.x,e.y,n,t),c.lineJoin="round"}),this._hasProperty(e,"close",function(){c.closePath()}),this._evaluateOptions(e,c)}}},{key:"text",value:function(e,t,n,r,i){var a=i||this.context;this._hasProperty(r,"align",function(e){e=e.split(" ");e[0]&&("left"==e[0]?a.textAlign="start":"center"==e[0]||"middle"==e[0]?a.textAlign="center":"right"==e[0]&&(a.textAlign="right")),e[1]&&("top"==e[1]?a.textBaseline="start":"center"==e[1]||"middle"==e[0]?a.textBaseline="middle":"bottom"==e[1]&&(a.textBaseline="bottom"))}),a.beginPath(),this._evaluateOptions(r,a),this._hasProperty(r,"stroke",function(){a.strokeText(e,t,n)}),this._hasProperty(r,"fill",function(){a.fillText(e,t,n)}),this._hasProperty(r,"close",function(){a.closePath()})}},{key:"clear",value:function(e){(e||this.context).clearRect(0,0,this.width,this.height)}},{key:"save",value:function(e){(e||this.context).save()}},{key:"restore",value:function(e){(e||this.context).restore()}},{key:"clip",value:function(e){(e||this.context).clip()}},{key:"fill",value:function(e,t){t=t||this.context;t.fillStyle=e,t.fill()}},{key:"stroke",value:function(e,t){t=t||this.context;t.strokeStyle=e,t.stroke()}},{key:"_evaluateOptions",value:function(e,t){var n=t||this.context;if(e){for(var r=Object.keys(e),i=0;i<r.length;i++){var a=r[i];"stroke"==a&&(n.strokeStyle=e[a]),"fill"==a&&(n.fillStyle=e[a]),this._customOptions.includes(a)||(n[a]=e[a])}e.stroke&&this.stroke(e.stroke,n),e.fill&&this.fill(e.fill,n)}}},{key:"_hasProperty",value:function(e,t,n){if(e)return!!e[t]&&("function"==typeof n&&n(e[t]),e[t])}}]),e}();module.exports=new Renderer;