"use strict";module.exports={lerp:function(r,t,n){return n*(t-r)+r},dist:function(r,t,n,f){return Math.sqrt((n-r)*(n-r)+(f-t)*(f-t))},map:function(r,t,n,f,e){return(r-t)/(n-t)*(e-f)+f},random:function(){if(2==arguments.length&&"number"==typeof arguments[0]&&"number"==typeof arguments[1])return Math.random()*(arguments[1]-arguments[0])+arguments[0];if(1==arguments.length&&"number"==typeof arguments[0])return Math.random()*arguments[0];if(Array.isArray(arguments[0]))return arguments[0][Math.floor(Math.random()*arguments[0].length)];if(2<arguments.length){var r=Array.prototype.slice.call(arguments);return r[Math.floor(Math.random()*r.length)]}},constrain:function(r,t,n){return Math.max(Math.min(r,n),t)},getRandomColor:function(){return this.random(["#ff3b3b","#ff763b","#ffdb3b","#c4ff3b","#76ff3b","#3bff8d","#3bc1ff","#3b48ff","#963bff","#de3bff","#ff3b96"])}};