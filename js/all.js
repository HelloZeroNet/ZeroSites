

/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/lib/Promise.coffee ---- */


(function() {
  var Promise,
    slice = [].slice;

  Promise = (function() {
    Promise.when = function() {
      var args, fn, i, len, num_uncompleted, promise, task, task_id, tasks;
      tasks = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      num_uncompleted = tasks.length;
      args = new Array(num_uncompleted);
      promise = new Promise();
      fn = function(task_id) {
        return task.then(function() {
          args[task_id] = Array.prototype.slice.call(arguments);
          num_uncompleted--;
          if (num_uncompleted === 0) {
            return promise.complete.apply(promise, args);
          }
        });
      };
      for (task_id = i = 0, len = tasks.length; i < len; task_id = ++i) {
        task = tasks[task_id];
        fn(task_id);
      }
      return promise;
    };

    function Promise() {
      this.resolved = false;
      this.end_promise = null;
      this.result = null;
      this.callbacks = [];
    }

    Promise.prototype.resolve = function() {
      var back, callback, i, len, ref;
      if (this.resolved) {
        return false;
      }
      this.resolved = true;
      this.data = arguments;
      if (!arguments.length) {
        this.data = [true];
      }
      this.result = this.data[0];
      ref = this.callbacks;
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        back = callback.apply(callback, this.data);
      }
      if (this.end_promise) {
        return this.end_promise.resolve(back);
      }
    };

    Promise.prototype.fail = function() {
      return this.resolve(false);
    };

    Promise.prototype.then = function(callback) {
      if (this.resolved === true) {
        callback.apply(callback, this.data);
        return;
      }
      this.callbacks.push(callback);
      return this.end_promise = new Promise();
    };

    return Promise;

  })();

  window.Promise = Promise;


  /*
  s = Date.now()
  log = (text) ->
  	console.log Date.now()-s, Array.prototype.slice.call(arguments).join(", ")
  
  log "Started"
  
  cmd = (query) ->
  	p = new Promise()
  	setTimeout ( ->
  		p.resolve query+" Result"
  	), 100
  	return p
  
  back = cmd("SELECT * FROM message").then (res) ->
  	log res
  	return "Return from query"
  .then (res) ->
  	log "Back then", res
  
  log "Query started", back */

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/lib/Property.coffee ---- */


(function() {
  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/lib/anime.min.js ---- */


/*
 * Anime v1.0.0
 * http://anime-js.com
 * JavaScript animation engine
 * Copyright (c) 2016 Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */
(function(r,n){"function"===typeof define&&define.amd?define([],n):"object"===typeof module&&module.exports?module.exports=n():r.anime=n()})(this,function(){var r={duration:1E3,delay:0,loop:!1,autoplay:!0,direction:"normal",easing:"easeOutElastic",elasticity:400,round:!1,begin:void 0,update:void 0,complete:void 0},n="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),e=function(){return{array:function(a){return Array.isArray(a)},object:function(a){return-1<
Object.prototype.toString.call(a).indexOf("Object")},html:function(a){return a instanceof NodeList||a instanceof HTMLCollection},node:function(a){return a.nodeType},svg:function(a){return a instanceof SVGElement},number:function(a){return!isNaN(parseInt(a))},string:function(a){return"string"===typeof a},func:function(a){return"function"===typeof a},undef:function(a){return"undefined"===typeof a},"null":function(a){return"null"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},
rgb:function(a){return/^rgb/.test(a)},rgba:function(a){return/^rgba/.test(a)},hsl:function(a){return/^hsl/.test(a)},color:function(a){return e.hex(a)||e.rgb(a)||e.rgba(a)||e.hsl(a)}}}(),z=function(){var a={},b={Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a,b){if(0===a||1===a)return a;var f=1-Math.min(b,998)/1E3,h=a/1-1;return-(Math.pow(2,10*h)*Math.sin(2*(h-f/(2*Math.PI)*Math.asin(1))*Math.PI/f))},Back:function(a){return a*a*(3*a-2)},
Bounce:function(a){for(var b,f=4;a<((b=Math.pow(2,--f))-1)/11;);return 1/Math.pow(4,3-f)-7.5625*Math.pow((3*b-2)/22-a,2)}};["Quad","Cubic","Quart","Quint","Expo"].forEach(function(a,d){b[a]=function(a){return Math.pow(a,d+2)}});Object.keys(b).forEach(function(c){var d=b[c];a["easeIn"+c]=d;a["easeOut"+c]=function(a,b){return 1-d(1-a,b)};a["easeInOut"+c]=function(a,b){return.5>a?d(2*a,b)/2:1-d(-2*a+2,b)/2}});a.linear=function(a){return a};return a}(),u=function(a){return e.string(a)?a:a+""},A=function(a){return a.replace(/([a-z])([A-Z])/g,
"$1-$2").toLowerCase()},B=function(a){if(e.color(a))return!1;try{return document.querySelectorAll(a)}catch(b){return!1}},v=function(a){return a.reduce(function(a,c){return a.concat(e.array(c)?v(c):c)},[])},p=function(a){if(e.array(a))return a;e.string(a)&&(a=B(a)||a);return e.html(a)?[].slice.call(a):[a]},C=function(a,b){return a.some(function(a){return a===b})},N=function(a,b){var c={};a.forEach(function(a){var f=JSON.stringify(b.map(function(b){return a[b]}));c[f]=c[f]||[];c[f].push(a)});return Object.keys(c).map(function(a){return c[a]})},
D=function(a){return a.filter(function(a,c,d){return d.indexOf(a)===c})},w=function(a){var b={},c;for(c in a)b[c]=a[c];return b},t=function(a,b){for(var c in b)a[c]=e.undef(a[c])?b[c]:a[c];return a},O=function(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,e){return b+b+c+c+e+e});var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a=parseInt(b[1],16);var c=parseInt(b[2],16),b=parseInt(b[3],16);return"rgb("+a+","+c+","+b+")"},P=function(a){a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);
var b=parseInt(a[1])/360,c=parseInt(a[2])/100,d=parseInt(a[3])/100;a=function(a,b,c){0>c&&(c+=1);1<c&&--c;return c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a};if(0==c)c=d=b=d;else var f=.5>d?d*(1+c):d+c-d*c,h=2*d-f,c=a(h,f,b+1/3),d=a(h,f,b),b=a(h,f,b-1/3);return"rgb("+255*c+","+255*d+","+255*b+")"},k=function(a){return/([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(a)[2]},E=function(a,b,c){return k(b)?b:-1<a.indexOf("translate")?k(c)?b+k(c):b+"px":-1<a.indexOf("rotate")||
-1<a.indexOf("skew")?b+"deg":b},F=function(a,b){if((e.node(a)||e.svg(a))&&C(n,b))return"transform";if((e.node(a)||e.svg(a))&&"transform"!==b&&x(a,b))return"css";if((e.node(a)||e.svg(a))&&(a.getAttribute(b)||e.svg(a)&&a[b]))return"attribute";if(!e["null"](a[b])&&!e.undef(a[b]))return"object"},x=function(a,b){if(b in a.style)return getComputedStyle(a).getPropertyValue(A(b))||"0"},Q=function(a,b){var c=-1<b.indexOf("scale")?1:0,d=a.style.transform;if(!d)return c;for(var f=/(\w+)\((.+?)\)/g,h=[],e=[],
q=[];h=f.exec(d);)e.push(h[1]),q.push(h[2]);d=q.filter(function(a,c){return e[c]===b});return d.length?d[0]:c},G=function(a,b){switch(F(a,b)){case "transform":return Q(a,b);case "css":return x(a,b);case "attribute":return a.getAttribute(b)}return a[b]||0},H=function(a,b,c){if(e.color(b))return b=e.rgb(b)||e.rgba(b)?b:e.hex(b)?O(b):e.hsl(b)?P(b):void 0,b;if(k(b))return b;a=k(a.to)?k(a.to):k(a.from);!a&&c&&(a=k(c));return a?b+a:b},I=function(a){var b=/-?\d*\.?\d+/g;return{original:a,numbers:u(a).match(b)?
u(a).match(b).map(Number):[0],strings:u(a).split(b)}},R=function(a,b,c){return b.reduce(function(b,f,e){f=f?f:c[e-1];return b+a[e-1]+f})},S=function(a){a=a?v(e.array(a)?a.map(p):p(a)):[];return a.map(function(a,c){return{target:a,id:c}})},T=function(a,b){var c=[],d;for(d in a)if(!r.hasOwnProperty(d)&&"targets"!==d){var f=e.object(a[d])?w(a[d]):{value:a[d]};f.name=d;c.push(t(f,b))}return c},J=function(a,b,c,d){"transform"===c?(c=a+"("+E(a,b.from,b.to)+")",b=a+"("+E(a,b.to)+")"):(a="css"===c?x(d,a):
void 0,c=H(b,b.from,a),b=H(b,b.to,a));return{from:I(c),to:I(b)}},U=function(a,b){var c=[];a.forEach(function(d,f){var h=d.target;return b.forEach(function(b){var q=F(h,b.name);if(q){var k;k=b.name;var g=b.value,g=p(e.func(g)?g(h,f):g);k={from:1<g.length?g[0]:G(h,k),to:1<g.length?g[1]:g[0]};g=w(b);g.animatables=d;g.type=q;g.from=J(b.name,k,g.type,h).from;g.to=J(b.name,k,g.type,h).to;g.round=e.color(k.from)||g.round?1:0;g.delay=(e.func(g.delay)?g.delay(h,f,a.length):g.delay)/l.speed;g.duration=(e.func(g.duration)?
g.duration(h,f,a.length):g.duration)/l.speed;c.push(g)}})});return c},V=function(a,b){var c=U(a,b);return N(c,["name","from","to","delay","duration"]).map(function(a){var b=w(a[0]);b.animatables=a.map(function(a){return a.animatables});b.totalDuration=b.delay+b.duration;return b})},y=function(a,b){a.tweens.forEach(function(c){var d=c.from,f=a.duration-(c.delay+c.duration);c.from=c.to;c.to=d;b&&(c.delay=f)});a.reversed=a.reversed?!1:!0},K=function(a){var b=[],c=[];a.tweens.forEach(function(a){if("css"===
a.type||"transform"===a.type)b.push("css"===a.type?A(a.name):"transform"),a.animatables.forEach(function(a){c.push(a.target)})});return{properties:D(b).join(", "),elements:D(c)}},W=function(a){var b=K(a);b.elements.forEach(function(a){a.style.willChange=b.properties})},X=function(a){K(a).elements.forEach(function(a){a.style.removeProperty("will-change")})},Y=function(a,b){var c=a.path,d=a.value*b,f=function(f){f=f||0;return c.getPointAtLength(1<b?a.value+f:d+f)},e=f(),k=f(-1),f=f(1);switch(a.name){case "translateX":return e.x;
case "translateY":return e.y;case "rotate":return 180*Math.atan2(f.y-k.y,f.x-k.x)/Math.PI}},Z=function(a,b){var c=Math.min(Math.max(b-a.delay,0),a.duration)/a.duration,d=a.to.numbers.map(function(b,d){var e=a.from.numbers[d],k=z[a.easing](c,a.elasticity),e=a.path?Y(a,k):e+k*(b-e);return e=a.round?Math.round(e*a.round)/a.round:e});return R(d,a.to.strings,a.from.strings)},L=function(a,b){var c=void 0;a.time=Math.min(b,a.duration);a.progress=a.time/a.duration*100;a.tweens.forEach(function(a){a.currentValue=
Z(a,b);var d=a.currentValue;a.animatables.forEach(function(b){var e=b.id;switch(a.type){case "css":b.target.style[a.name]=d;break;case "attribute":b.target.setAttribute(a.name,d);break;case "object":b.target[a.name]=d;break;case "transform":c||(c={}),c[e]||(c[e]=[]),c[e].push(d)}})});if(c)for(var d in c)a.animatables[d].target.style.transform=c[d].join(" ");a.settings.update&&a.settings.update(a)},M=function(a){var b={};b.animatables=S(a.targets);b.settings=t(a,r);b.properties=T(a,b.settings);b.tweens=
V(b.animatables,b.properties);b.duration=b.tweens.length?Math.max.apply(Math,b.tweens.map(function(a){return a.totalDuration})):a.duration/l.speed;b.time=0;b.progress=0;b.running=!1;b.ended=!1;return b},m=[],l=function(a){var b=M(a),c={tick:function(){if(b.running){b.ended=!1;c.now=+new Date;c.current=c.last+c.now-c.start;L(b,c.current);var a=b.settings;a.begin&&c.current>=a.delay&&(a.begin(b),a.begin=void 0);c.current>=b.duration?(a.loop?(c.start=+new Date,"alternate"===a.direction&&y(b,!0),e.number(a.loop)&&
a.loop--,c.raf=requestAnimationFrame(c.tick)):(b.ended=!0,a.complete&&a.complete(b),b.pause()),c.last=0):c.raf=requestAnimationFrame(c.tick)}}};b.seek=function(a){L(b,a/100*b.duration)};b.pause=function(){b.running=!1;cancelAnimationFrame(c.raf);X(b);var a=m.indexOf(b);-1<a&&m.splice(a,1)};b.play=function(a){a&&(b=t(M(t(a,b.settings)),b));b.pause();b.running=!0;c.start=+new Date;c.last=b.ended?0:b.time;a=b.settings;"reverse"===a.direction&&y(b);"alternate"!==a.direction||a.loop||(a.loop=1);W(b);m.push(b);
c.raf=requestAnimationFrame(c.tick)};b.restart=function(){b.reversed&&y(b);b.pause();b.seek(0);b.play()};b.settings.autoplay&&b.play();return b};l.speed=1;l.list=m;l.remove=function(a){a=v(e.array(a)?a.map(p):p(a));for(var b=m.length-1;0<=b;b--)for(var c=m[b],d=c.tweens.length-1;0<=d;d--)for(var f=c.tweens[d],h=f.animatables.length-1;0<=h;h--)C(a,f.animatables[h].target)&&(f.animatables.splice(h,1),f.animatables.length||c.tweens.splice(d,1),c.tweens.length||c.pause())};l.easings=z;l.getValue=G;l.path=
function(a){a=e.string(a)?B(a)[0]:a;return{path:a,value:a.getTotalLength()}};l.random=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};return l});


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/lib/maquette.js ---- */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory(root.maquette = {});
    }
}(this, function (exports) {
    'use strict';
    ;
    ;
    ;
    ;
    var NAMESPACE_W3 = 'http://www.w3.org/';
    var NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
    var NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
    // Utilities
    var emptyArray = [];
    var extend = function (base, overrides) {
        var result = {};
        Object.keys(base).forEach(function (key) {
            result[key] = base[key];
        });
        if (overrides) {
            Object.keys(overrides).forEach(function (key) {
                result[key] = overrides[key];
            });
        }
        return result;
    };
    // Hyperscript helper functions
    var same = function (vnode1, vnode2) {
        if (vnode1.vnodeSelector !== vnode2.vnodeSelector) {
            return false;
        }
        if (vnode1.properties && vnode2.properties) {
            if (vnode1.properties.key !== vnode2.properties.key) {
                return false;
            }
            return vnode1.properties.bind === vnode2.properties.bind;
        }
        return !vnode1.properties && !vnode2.properties;
    };
    var toTextVNode = function (data) {
        return {
            vnodeSelector: '',
            properties: undefined,
            children: undefined,
            text: data.toString(),
            domNode: null
        };
    };
    var appendChildren = function (parentSelector, insertions, main) {
        for (var i = 0; i < insertions.length; i++) {
            var item = insertions[i];
            if (Array.isArray(item)) {
                appendChildren(parentSelector, item, main);
            } else {
                if (item !== null && item !== undefined) {
                    if (!item.hasOwnProperty('vnodeSelector')) {
                        item = toTextVNode(item);
                    }
                    main.push(item);
                }
            }
        }
    };
    // Render helper functions
    var missingTransition = function () {
        throw new Error('Provide a transitions object to the projectionOptions to do animations');
    };
    var DEFAULT_PROJECTION_OPTIONS = {
        namespace: undefined,
        eventHandlerInterceptor: undefined,
        styleApplyer: function (domNode, styleName, value) {
            // Provides a hook to add vendor prefixes for browsers that still need it.
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        }
    };
    var applyDefaultProjectionOptions = function (projectorOptions) {
        return extend(DEFAULT_PROJECTION_OPTIONS, projectorOptions);
    };
    var checkStyleValue = function (styleValue) {
        if (typeof styleValue !== 'string') {
            throw new Error('Style values must be strings');
        }
    };
    var setProperties = function (domNode, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        for (var i = 0; i < propCount; i++) {
            var propName = propNames[i];
            /* tslint:disable:no-var-keyword: edge case */
            var propValue = properties[propName];
            /* tslint:enable:no-var-keyword */
            if (propName === 'className') {
                throw new Error('Property "className" is not supported, use "class".');
            } else if (propName === 'class') {
                if (domNode.className) {
                    // May happen if classes is specified before class
                    domNode.className += ' ' + propValue;
                } else {
                    domNode.className = propValue;
                }
            } else if (propName === 'classes') {
                // object with string keys and boolean values
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    if (propValue[className]) {
                        domNode.classList.add(className);
                    }
                }
            } else if (propName === 'styles') {
                // object with string keys and string (!) values
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var styleValue = propValue[styleName];
                    if (styleValue) {
                        checkStyleValue(styleValue);
                        projectionOptions.styleApplyer(domNode, styleName, styleValue);
                    }
                }
            } else if (propName === 'key') {
                continue;
            } else if (propValue === null || propValue === undefined) {
                continue;
            } else {
                var type = typeof propValue;
                if (type === 'function') {
                    if (propName.lastIndexOf('on', 0) === 0) {
                        if (eventHandlerInterceptor) {
                            propValue = eventHandlerInterceptor(propName, propValue, domNode, properties);    // intercept eventhandlers
                        }
                        if (propName === 'oninput') {
                            (function () {
                                // record the evt.target.value, because IE and Edge sometimes do a requestAnimationFrame between changing value and running oninput
                                var oldPropValue = propValue;
                                propValue = function (evt) {
                                    evt.target['oninput-value'] = evt.target.value;
                                    // may be HTMLTextAreaElement as well
                                    oldPropValue.apply(this, [evt]);
                                };
                            }());
                        }
                        domNode[propName] = propValue;
                    }
                } else if (type === 'string' && propName !== 'value' && propName !== 'innerHTML') {
                    if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                        domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                    } else {
                        domNode.setAttribute(propName, propValue);
                    }
                } else {
                    domNode[propName] = propValue;
                }
            }
        }
    };
    var updateProperties = function (domNode, previousProperties, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var propertiesUpdated = false;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        for (var i = 0; i < propCount; i++) {
            var propName = propNames[i];
            // assuming that properties will be nullified instead of missing is by design
            var propValue = properties[propName];
            var previousValue = previousProperties[propName];
            if (propName === 'class') {
                if (previousValue !== propValue) {
                    throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.');
                }
            } else if (propName === 'classes') {
                var classList = domNode.classList;
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    var on = !!propValue[className];
                    var previousOn = !!previousValue[className];
                    if (on === previousOn) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (on) {
                        classList.add(className);
                    } else {
                        classList.remove(className);
                    }
                }
            } else if (propName === 'styles') {
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var newStyleValue = propValue[styleName];
                    var oldStyleValue = previousValue[styleName];
                    if (newStyleValue === oldStyleValue) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (newStyleValue) {
                        checkStyleValue(newStyleValue);
                        projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                    } else {
                        projectionOptions.styleApplyer(domNode, styleName, '');
                    }
                }
            } else {
                if (!propValue && typeof previousValue === 'string') {
                    propValue = '';
                }
                if (propName === 'value') {
                    if (domNode[propName] !== propValue && domNode['oninput-value'] !== propValue) {
                        domNode[propName] = propValue;
                        // Reset the value, even if the virtual DOM did not change
                        domNode['oninput-value'] = undefined;
                    }
                    // else do not update the domNode, otherwise the cursor position would be changed
                    if (propValue !== previousValue) {
                        propertiesUpdated = true;
                    }
                } else if (propValue !== previousValue) {
                    var type = typeof propValue;
                    if (type === 'function') {
                        throw new Error('Functions may not be updated on subsequent renders (property: ' + propName + '). Hint: declare event handler functions outside the render() function.');
                    }
                    if (type === 'string' && propName !== 'innerHTML') {
                        if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                            domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                        } else {
                            domNode.setAttribute(propName, propValue);
                        }
                    } else {
                        if (domNode[propName] !== propValue) {
                            domNode[propName] = propValue;
                        }
                    }
                    propertiesUpdated = true;
                }
            }
        }
        return propertiesUpdated;
    };
    var findIndexOfChild = function (children, sameAs, start) {
        if (sameAs.vnodeSelector !== '') {
            // Never scan for text-nodes
            for (var i = start; i < children.length; i++) {
                if (same(children[i], sameAs)) {
                    return i;
                }
            }
        }
        return -1;
    };
    var nodeAdded = function (vNode, transitions) {
        if (vNode.properties) {
            var enterAnimation = vNode.properties.enterAnimation;
            if (enterAnimation) {
                if (typeof enterAnimation === 'function') {
                    enterAnimation(vNode.domNode, vNode.properties);
                } else {
                    transitions.enter(vNode.domNode, vNode.properties, enterAnimation);
                }
            }
        }
    };
    var nodeToRemove = function (vNode, transitions) {
        var domNode = vNode.domNode;
        if (vNode.properties) {
            var exitAnimation = vNode.properties.exitAnimation;
            if (exitAnimation) {
                domNode.style.pointerEvents = 'none';
                var removeDomNode = function () {
                    if (domNode.parentNode) {
                        domNode.parentNode.removeChild(domNode);
                    }
                };
                if (typeof exitAnimation === 'function') {
                    exitAnimation(domNode, removeDomNode, vNode.properties);
                    return;
                } else {
                    transitions.exit(vNode.domNode, vNode.properties, exitAnimation, removeDomNode);
                    return;
                }
            }
        }
        if (domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
        }
    };
    var checkDistinguishable = function (childNodes, indexToCheck, parentVNode, operation) {
        var childNode = childNodes[indexToCheck];
        if (childNode.vnodeSelector === '') {
            return;    // Text nodes need not be distinguishable
        }
        var properties = childNode.properties;
        var key = properties ? properties.key === undefined ? properties.bind : properties.key : undefined;
        if (!key) {
            for (var i = 0; i < childNodes.length; i++) {
                if (i !== indexToCheck) {
                    var node = childNodes[i];
                    if (same(node, childNode)) {
                        if (operation === 'added') {
                            throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' + 'added, but there is now more than one. You must add unique key properties to make them distinguishable.');
                        } else {
                            throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' + 'removed, but there were more than one. You must add unique key properties to make them distinguishable.');
                        }
                    }
                }
            }
        }
    };
    var createDom;
    var updateDom;
    var updateChildren = function (vnode, domNode, oldChildren, newChildren, projectionOptions) {
        if (oldChildren === newChildren) {
            return false;
        }
        oldChildren = oldChildren || emptyArray;
        newChildren = newChildren || emptyArray;
        var oldChildrenLength = oldChildren.length;
        var newChildrenLength = newChildren.length;
        var transitions = projectionOptions.transitions;
        var oldIndex = 0;
        var newIndex = 0;
        var i;
        var textUpdated = false;
        while (newIndex < newChildrenLength) {
            var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
            var newChild = newChildren[newIndex];
            if (oldChild !== undefined && same(oldChild, newChild)) {
                textUpdated = updateDom(oldChild, newChild, projectionOptions) || textUpdated;
                oldIndex++;
            } else {
                var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
                if (findOldIndex >= 0) {
                    // Remove preceding missing children
                    for (i = oldIndex; i < findOldIndex; i++) {
                        nodeToRemove(oldChildren[i], transitions);
                        checkDistinguishable(oldChildren, i, vnode, 'removed');
                    }
                    textUpdated = updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
                    oldIndex = findOldIndex + 1;
                } else {
                    // New child
                    createDom(newChild, domNode, oldIndex < oldChildrenLength ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
                    nodeAdded(newChild, transitions);
                    checkDistinguishable(newChildren, newIndex, vnode, 'added');
                }
            }
            newIndex++;
        }
        if (oldChildrenLength > oldIndex) {
            // Remove child fragments
            for (i = oldIndex; i < oldChildrenLength; i++) {
                nodeToRemove(oldChildren[i], transitions);
                checkDistinguishable(oldChildren, i, vnode, 'removed');
            }
        }
        return textUpdated;
    };
    var addChildren = function (domNode, children, projectionOptions) {
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            createDom(children[i], domNode, undefined, projectionOptions);
        }
    };
    var initPropertiesAndChildren = function (domNode, vnode, projectionOptions) {
        addChildren(domNode, vnode.children, projectionOptions);
        // children before properties, needed for value property of <select>.
        if (vnode.text) {
            domNode.textContent = vnode.text;
        }
        setProperties(domNode, vnode.properties, projectionOptions);
        if (vnode.properties && vnode.properties.afterCreate) {
            vnode.properties.afterCreate(domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children);
        }
    };
    createDom = function (vnode, parentNode, insertBefore, projectionOptions) {
        var domNode, i, c, start = 0, type, found;
        var vnodeSelector = vnode.vnodeSelector;
        if (vnodeSelector === '') {
            domNode = vnode.domNode = document.createTextNode(vnode.text);
            if (insertBefore !== undefined) {
                parentNode.insertBefore(domNode, insertBefore);
            } else {
                parentNode.appendChild(domNode);
            }
        } else {
            for (i = 0; i <= vnodeSelector.length; ++i) {
                c = vnodeSelector.charAt(i);
                if (i === vnodeSelector.length || c === '.' || c === '#') {
                    type = vnodeSelector.charAt(start - 1);
                    found = vnodeSelector.slice(start, i);
                    if (type === '.') {
                        domNode.classList.add(found);
                    } else if (type === '#') {
                        domNode.id = found;
                    } else {
                        if (found === 'svg') {
                            projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
                        }
                        if (projectionOptions.namespace !== undefined) {
                            domNode = vnode.domNode = document.createElementNS(projectionOptions.namespace, found);
                        } else {
                            domNode = vnode.domNode = document.createElement(found);
                        }
                        if (insertBefore !== undefined) {
                            parentNode.insertBefore(domNode, insertBefore);
                        } else {
                            parentNode.appendChild(domNode);
                        }
                    }
                    start = i + 1;
                }
            }
            initPropertiesAndChildren(domNode, vnode, projectionOptions);
        }
    };
    updateDom = function (previous, vnode, projectionOptions) {
        var domNode = previous.domNode;
        var textUpdated = false;
        if (previous === vnode) {
            return false;    // By contract, VNode objects may not be modified anymore after passing them to maquette
        }
        var updated = false;
        if (vnode.vnodeSelector === '') {
            if (vnode.text !== previous.text) {
                var newVNode = document.createTextNode(vnode.text);
                domNode.parentNode.replaceChild(newVNode, domNode);
                vnode.domNode = newVNode;
                textUpdated = true;
                return textUpdated;
            }
        } else {
            if (vnode.vnodeSelector.lastIndexOf('svg', 0) === 0) {
                projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.text !== vnode.text) {
                updated = true;
                if (vnode.text === undefined) {
                    domNode.removeChild(domNode.firstChild);    // the only textnode presumably
                } else {
                    domNode.textContent = vnode.text;
                }
            }
            updated = updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
            updated = updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
            if (vnode.properties && vnode.properties.afterUpdate) {
                vnode.properties.afterUpdate(domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children);
            }
        }
        if (updated && vnode.properties && vnode.properties.updateAnimation) {
            vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
        }
        vnode.domNode = previous.domNode;
        return textUpdated;
    };
    var createProjection = function (vnode, projectionOptions) {
        return {
            update: function (updatedVnode) {
                if (vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
                    throw new Error('The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)');
                }
                updateDom(vnode, updatedVnode, projectionOptions);
                vnode = updatedVnode;
            },
            domNode: vnode.domNode
        };
    };
    ;
    // The other two parameters are not added here, because the Typescript compiler creates surrogate code for desctructuring 'children'.
    exports.h = function (selector) {
        var properties = arguments[1];
        if (typeof selector !== 'string') {
            throw new Error();
        }
        var childIndex = 1;
        if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
            childIndex = 2;
        } else {
            // Optional properties argument was omitted
            properties = undefined;
        }
        var text = undefined;
        var children = undefined;
        var argsLength = arguments.length;
        // Recognize a common special case where there is only a single text node
        if (argsLength === childIndex + 1) {
            var onlyChild = arguments[childIndex];
            if (typeof onlyChild === 'string') {
                text = onlyChild;
            } else if (onlyChild !== undefined && onlyChild !== null && onlyChild.length === 1 && typeof onlyChild[0] === 'string') {
                text = onlyChild[0];
            }
        }
        if (text === undefined) {
            children = [];
            for (; childIndex < arguments.length; childIndex++) {
                var child = arguments[childIndex];
                if (child === null || child === undefined) {
                    continue;
                } else if (Array.isArray(child)) {
                    appendChildren(selector, child, children);
                } else if (child.hasOwnProperty('vnodeSelector')) {
                    children.push(child);
                } else {
                    children.push(toTextVNode(child));
                }
            }
        }
        return {
            vnodeSelector: selector,
            properties: properties,
            children: children,
            text: text === '' ? undefined : text,
            domNode: null
        };
    };
    /**
 * Contains simple low-level utility functions to manipulate the real DOM.
 */
    exports.dom = {
        /**
     * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
     * its [[Projection.domNode|domNode]] property.
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection.
     * @returns The [[Projection]] which also contains the DOM Node that was created.
     */
        create: function (vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, document.createElement('div'), undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Appends a new childnode to the DOM which is generated from a [[VNode]].
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param parentNode - The parent node for the new childNode.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
        append: function (parentNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, parentNode, undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Inserts a new DOM node which is generated from a [[VNode]].
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param beforeNode - The node that the DOM Node is inserted before.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
     * NOTE: [[VNode]] objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
        insertBefore: function (beforeNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Merges a new DOM node which is generated from a [[VNode]] with an existing DOM Node.
     * This means that the virtual DOM and the real DOM will have one overlapping element.
     * Therefore the selector for the root [[VNode]] will be ignored, but its properties and children will be applied to the Element provided.
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param domNode - The existing element to adopt as the root of the new virtual DOM. Existing attributes and childnodes are preserved.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]] objects
     * may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
        merge: function (element, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            vnode.domNode = element;
            initPropertiesAndChildren(element, vnode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        }
    };
    /**
 * Creates a [[CalculationCache]] object, useful for caching [[VNode]] trees.
 * In practice, caching of [[VNode]] trees is not needed, because achieving 60 frames per second is almost never a problem.
 * For more information, see [[CalculationCache]].
 *
 * @param <Result> The type of the value that is cached.
 */
    exports.createCache = function () {
        var cachedInputs = undefined;
        var cachedOutcome = undefined;
        var result = {
            invalidate: function () {
                cachedOutcome = undefined;
                cachedInputs = undefined;
            },
            result: function (inputs, calculation) {
                if (cachedInputs) {
                    for (var i = 0; i < inputs.length; i++) {
                        if (cachedInputs[i] !== inputs[i]) {
                            cachedOutcome = undefined;
                        }
                    }
                }
                if (!cachedOutcome) {
                    cachedOutcome = calculation();
                    cachedInputs = inputs;
                }
                return cachedOutcome;
            }
        };
        return result;
    };
    /**
 * Creates a {@link Mapping} instance that keeps an array of result objects synchronized with an array of source objects.
 * See {@link http://maquettejs.org/docs/arrays.html|Working with arrays}.
 *
 * @param <Source>       The type of source items. A database-record for instance.
 * @param <Target>       The type of target items. A [[Component]] for instance.
 * @param getSourceKey   `function(source)` that must return a key to identify each source object. The result must either be a string or a number.
 * @param createResult   `function(source, index)` that must create a new result object from a given source. This function is identical
 *                       to the `callback` argument in `Array.map(callback)`.
 * @param updateResult   `function(source, target, index)` that updates a result to an updated source.
 */
    exports.createMapping = function (getSourceKey, createResult, updateResult) {
        var keys = [];
        var results = [];
        return {
            results: results,
            map: function (newSources) {
                var newKeys = newSources.map(getSourceKey);
                var oldTargets = results.slice();
                var oldIndex = 0;
                for (var i = 0; i < newSources.length; i++) {
                    var source = newSources[i];
                    var sourceKey = newKeys[i];
                    if (sourceKey === keys[oldIndex]) {
                        results[i] = oldTargets[oldIndex];
                        updateResult(source, oldTargets[oldIndex], i);
                        oldIndex++;
                    } else {
                        var found = false;
                        for (var j = 1; j < keys.length; j++) {
                            var searchIndex = (oldIndex + j) % keys.length;
                            if (keys[searchIndex] === sourceKey) {
                                results[i] = oldTargets[searchIndex];
                                updateResult(newSources[i], oldTargets[searchIndex], i);
                                oldIndex = searchIndex + 1;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            results[i] = createResult(source, i);
                        }
                    }
                }
                results.length = newSources.length;
                keys = newKeys;
            }
        };
    };
    /**
 * Creates a [[Projector]] instance using the provided projectionOptions.
 *
 * For more information, see [[Projector]].
 *
 * @param projectionOptions   Options that influence how the DOM is rendered and updated.
 */
    exports.createProjector = function (projectorOptions) {
        var projector;
        var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
        projectionOptions.eventHandlerInterceptor = function (propertyName, eventHandler, domNode, properties) {
            return function () {
                // intercept function calls (event handlers) to do a render afterwards.
                projector.scheduleRender();
                return eventHandler.apply(properties.bind || this, arguments);
            };
        };
        var renderCompleted = true;
        var scheduled;
        var stopped = false;
        var projections = [];
        var renderFunctions = [];
        // matches the projections array
        var doRender = function () {
            scheduled = undefined;
            if (!renderCompleted) {
                return;    // The last render threw an error, it should be logged in the browser console.
            }
            var s = Date.now()
            renderCompleted = false;
            for (var i = 0; i < projections.length; i++) {
                var updatedVnode = renderFunctions[i]();
                projections[i].update(updatedVnode);
            }
            if (Date.now()-s > 15)
                console.log("Render time:", Date.now()-s, "ms")
            renderCompleted = true;
        };
        projector = {
            scheduleRender: function () {
                if (!scheduled && !stopped) {
                    scheduled = requestAnimationFrame(doRender);
                }
            },
            stop: function () {
                if (scheduled) {
                    cancelAnimationFrame(scheduled);
                    scheduled = undefined;
                }
                stopped = true;
            },
            resume: function () {
                stopped = false;
                renderCompleted = true;
                projector.scheduleRender();
            },
            append: function (parentNode, renderMaquetteFunction) {
                projections.push(exports.dom.append(parentNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            insertBefore: function (beforeNode, renderMaquetteFunction) {
                projections.push(exports.dom.insertBefore(beforeNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            merge: function (domNode, renderMaquetteFunction) {
                projections.push(exports.dom.merge(domNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            replace: function (domNode, renderMaquetteFunction) {
                var vnode = renderMaquetteFunction();
                createDom(vnode, domNode.parentNode, domNode, projectionOptions);
                domNode.parentNode.removeChild(domNode);
                projections.push(createProjection(vnode, projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            detach: function (renderMaquetteFunction) {
                for (var i = 0; i < renderFunctions.length; i++) {
                    if (renderFunctions[i] === renderMaquetteFunction) {
                        renderFunctions.splice(i, 1);
                        return projections.splice(i, 1)[0];
                    }
                }
                throw new Error('renderMaquetteFunction was not found');
            }
        };
        return projector;
    };
}));



/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Animation.coffee ---- */


(function() {
  var Animation,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Animation = (function() {
    function Animation() {
      this.height = bind(this.height, this);
    }

    Animation.prototype.slideDown = function(elem, props) {
      var cstyle, h, margin_bottom, margin_top, padding_bottom, padding_top, transition;
      h = elem.offsetHeight;
      cstyle = window.getComputedStyle(elem);
      margin_top = cstyle.marginTop;
      margin_bottom = cstyle.marginBottom;
      padding_top = cstyle.paddingTop;
      padding_bottom = cstyle.paddingBottom;
      transition = cstyle.transition;
      if (elem.getBoundingClientRect().top > 1600) {
        return;
      }
      elem.style.boxSizing = "border-box";
      elem.style.overflow = "hidden";
      elem.style.transform = "scale(0.6)";
      elem.style.opacity = "0";
      elem.style.height = "0px";
      elem.style.marginTop = "0px";
      elem.style.marginBottom = "0px";
      elem.style.paddingTop = "0px";
      elem.style.paddingBottom = "0px";
      elem.style.transition = "none";
      setTimeout((function() {
        elem.className += " animate-inout";
        elem.style.height = h + "px";
        elem.style.transform = "scale(1)";
        elem.style.opacity = "1";
        elem.style.marginTop = margin_top;
        elem.style.marginBottom = margin_bottom;
        elem.style.paddingTop = padding_top;
        return elem.style.paddingBottom = padding_bottom;
      }), 50);
      return elem.addEventListener("transitionend", function() {
        if (elem.style.pointerEvents === "none") {
          return;
        }
        elem.classList.remove("animate-inout");
        elem.style.transition = elem.style.transform = elem.style.opacity = elem.style.height = null;
        elem.style.boxSizing = elem.style.marginTop = elem.style.marginBottom = null;
        elem.style.paddingTop = elem.style.paddingBottom = elem.style.overflow = null;
        return elem.removeEventListener("transitionend", arguments.callee, false);
      });
    };

    Animation.prototype.slideUp = function(elem, remove_func, props) {
      if (elem.getBoundingClientRect().top > 1600) {
        remove_func();
        return;
      }
      elem.className += " animate-back";
      elem.style.boxSizing = "border-box";
      elem.style.height = elem.offsetHeight + "px";
      elem.style.overflow = "hidden";
      elem.style.transform = "scale(1)";
      elem.style.opacity = "1";
      elem.style.pointerEvents = "none";
      setTimeout((function() {
        elem.style.height = "0px";
        elem.style.marginTop = "0px";
        elem.style.marginBottom = "0px";
        elem.style.paddingTop = "0px";
        elem.style.paddingBottom = "0px";
        elem.style.transform = "scale(0.8)";
        elem.style.borderTopWidth = "0px";
        elem.style.borderBottomWidth = "0px";
        return elem.style.opacity = "0";
      }), 1);
      return elem.addEventListener("transitionend", function(e) {
        if (e.propertyName === "opacity" || e.elapsedTime >= 0.6) {
          elem.removeEventListener("transitionend", arguments.callee, false);
          return setTimeout((function() {
            return typeof remove_func === "function" ? remove_func() : void 0;
          }), 2000);
        }
      });
    };

    Animation.prototype.showRight = function(elem, props) {
      elem.className += " animate";
      elem.style.opacity = 0;
      elem.style.transform = "TranslateX(-20px) Scale(1.01)";
      setTimeout((function() {
        elem.style.opacity = 1;
        return elem.style.transform = "TranslateX(0px) Scale(1)";
      }), 1);
      return elem.addEventListener("transitionend", function() {
        elem.classList.remove("animate");
        return elem.style.transform = elem.style.opacity = null;
      });
    };

    Animation.prototype.show = function(elem, props) {
      var delay, ref;
      delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
      elem.style.transition = "none";
      elem.style.opacity = 0;
      setTimeout((function() {
        elem.className += " animate";
        return elem.style.opacity = 1;
      }), 50);
      return elem.addEventListener("transitionend", function(e) {
        if (e.propertyName === "opacity" || e.elapsedTime >= 0.3) {
          elem.classList.remove("animate");
          elem.style.opacity = null;
          elem.style.transition = null;
          return elem.removeEventListener("transitionend", arguments.callee, false);
        }
      });
    };

    Animation.prototype.hide = function(elem, remove_func, props) {
      var delay, ref;
      delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
      elem.className += " animate";
      setTimeout((function() {
        return elem.style.opacity = 0;
      }), delay);
      return elem.addEventListener("transitionend", function(e) {
        if (e.propertyName === "opacity") {
          remove_func();
          return elem.removeEventListener("transitionend", arguments.callee, false);
        }
      });
    };

    Animation.prototype.addVisibleClass = function(elem, props) {
      return setTimeout(function() {
        return elem.classList.add("visible");
      });
    };

    Animation.prototype.shake = function(elem) {
      elem.classList.remove("shake");
      return setTimeout((function() {
        return elem.classList.add("shake");
      }), 50);
    };

    Animation.prototype.height = function(elem, props_old, props_new) {
      var h;
      if (props_old.classes.hidden === props_new.classes.hidden) {
        return;
      }
      if (elem.className.indexOf("hidden") === -1) {
        elem.style.height = "auto";
        elem.style.transition = "none";
        elem.style.paddingTop = elem.style.paddingBottom = null;
        h = elem.offsetHeight;
        elem.style.paddingTop = elem.style.paddingBottom = "0px";
        elem.style.height = "0px";
        setTimeout((function() {
          return elem.style.transition = null;
        }), 1);
        return setTimeout((function() {
          elem.style.height = h + "px";
          elem.style.paddingTop = elem.style.paddingBottom = null;
          return elem.addEventListener("transitionend", function(e) {
            if (e.propertyName === "height" || e.elapsedTime >= 0.6) {
              elem.removeEventListener("transitionend", arguments.callee, false);
            }
            if (elem.style.height === h + "px") {
              return elem.style.height = "auto";
            }
          });
        }), 10);
      } else {
        elem.style.height = elem.offsetHeight + "px";
        return setTimeout((function() {
          elem.style.height = "0px";
          return elem.style.paddingTop = elem.style.paddingBottom = "0px";
        }));
      }
    };

    return Animation;

  })();

  window.Animation = new Animation();

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Class.coffee ---- */


(function() {
  var Class,
    slice = [].slice;

  Class = (function() {
    function Class() {}

    Class.prototype.trace = true;

    Class.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!this.trace) {
        return;
      }
      if (typeof console === 'undefined') {
        return;
      }
      args.unshift("[" + this.constructor.name + "]");
      console.log.apply(console, args);
      return this;
    };

    Class.prototype.logStart = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(slice.call(args), ["(started)"]));
      }
      return this;
    };

    Class.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Class;

  })();

  window.Class = Class;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Dollar.coffee ---- */


(function() {
  window.$ = function(selector) {
    if (selector.startsWith("#")) {
      return document.getElementById(selector.replace("#", ""));
    }
  };

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Form.coffee ---- */


(function() {
  var Form,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Form = (function(superClass) {
    extend(Form, superClass);

    function Form() {
      this.render = bind(this.render, this);
      this.renderField = bind(this.renderField, this);
      this.handleRadioClick = bind(this.handleRadioClick, this);
      this.handleDeleteClick = bind(this.handleDeleteClick, this);
      this.handleSubmitClick = bind(this.handleSubmitClick, this);
      this.handleCancelClick = bind(this.handleCancelClick, this);
      this.validate = bind(this.validate, this);
      this.shouldBeZite = bind(this.shouldBeZite, this);
      this.h = bind(this.h, this);
      this.addField = bind(this.addField, this);
      this.storeNode = bind(this.storeNode, this);
      this.handleInput = bind(this.handleInput, this);
      this.setData = bind(this.setData, this);
      this.reset = bind(this.reset, this);
      this.hidden = false;
      this.attached = false;
      this.reset();
      return this;
    }

    Form.prototype.reset = function() {
      this.data = {};
      this.data_original = {};
      this.inputs = {};
      this.invalid = {};
      this.nodes = {};
      return this.fields = [];
    };

    Form.prototype.setData = function(data) {
      this.data = data;
      return this.data_original = JSON.parse(JSON.stringify(data));
    };

    Form.prototype.handleInput = function(e) {
      this.data[e.target.name] = e.target.value;
      this.invalid[e.target.name] = false;
      return false;
    };

    Form.prototype.storeNode = function(node) {
      var ref;
      if ((ref = node.attributes["for"]) != null ? ref.value : void 0) {
        return this.nodes[node.attributes["for"].value + "-label"] = node;
      } else {
        return this.nodes[node.attributes.name.value] = node;
      }
    };

    Form.prototype.addField = function(type, id, title, props) {
      var key, val;
      if (props.values && props.values.constructor === Array) {
        if (props.values.length && props.values[0].constructor !== Array) {
          props.values = (function() {
            var i, len, ref, results;
            ref = props.values;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              key = ref[i];
              results.push([key, key]);
            }
            return results;
          })();
        }
      }
      if (props.values && props.values.constructor === Object) {
        props.values = (function() {
          var ref, results;
          ref = props.values;
          results = [];
          for (key in ref) {
            val = ref[key];
            results.push([key, val]);
          }
          return results;
        })();
      }
      return this.fields.push({
        type: type,
        id: id,
        title: title,
        props: props
      });
    };

    Form.prototype.h = function(tag, props, childs) {
      var ref, ref1, ref2, ref3;
      this.inputs[props.name] = [tag, props, childs];
            if ((ref = props.value) != null) {
        ref;
      } else {
        props.value = this.data[props.name];
      };
            if ((ref1 = props.id) != null) {
        ref1;
      } else {
        props.id = props.name;
      };
            if ((ref2 = props.oninput) != null) {
        ref2;
      } else {
        props.oninput = this.handleInput;
      };
      props.afterCreate = this.storeNode;
            if ((ref3 = props.classes) != null) {
        ref3;
      } else {
        props.classes = {};
      };
      if (this.invalid[props.name] || this.invalid[props["for"]]) {
        props.classes.invalid = true;
      } else {
        props.classes.invalid = false;
      }
      if (this.invalid[props.name]) {
        return [
          h(tag, props, childs), h("div.invalid-reason", {
            key: "reason-" + props.name,
            enterAnimation: Animation.slideDown,
            exitAnimation: Animation.slideUp
          }, this.invalid[props.name])
        ];
      } else {
        return h(tag, props, childs);
      }
    };

    Form.prototype.shouldBeZite = function(value) {
      if (!value.match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)/)) {
        return "Invalid site address: only ZeroNet addresses supported";
      }
    };

    Form.prototype.validate = function() {
      var childs, field_error, i, len, name, props, ref, ref1, ref2, tag, valid, validate;
      valid = true;
      this.invalid = {};
      ref = this.inputs;
      for (name in ref) {
        ref1 = ref[name], tag = ref1[0], props = ref1[1], childs = ref1[2];
        if (props.required && !props.value) {
          this.invalid[name] = "This field is required";
          Animation.shake(this.nodes[props.name]);
          valid = false;
        } else if (props.validate) {
          if (props.validate.constructor === Array) {
            ref2 = props.validate;
            for (i = 0, len = ref2.length; i < len; i++) {
              validate = ref2[i];
              field_error = validate(props.value);
              if (field_error) {
                break;
              }
            }
          } else {
            field_error = props.validate(props.value);
          }
          if (field_error) {
            valid = false;
            this.invalid[name] = field_error;
          }
        } else {
          this.invalid[name] = false;
        }
      }
      Page.projector.scheduleRender();
      return valid;
    };

    Form.prototype.handleCancelClick = function() {
      var key, ref, val;
      this.hidden = true;
      ref = this.data_original;
      for (key in ref) {
        val = ref[key];
        this.data[key] = val;
      }
      Page.projector.scheduleRender();
      return false;
    };

    Form.prototype.handleSubmitClick = function() {
      if (!this.validate()) {
        return false;
      }
      this.saveRow((function(_this) {
        return function(res) {
          if (res === "ok") {
            _this.hidden = true;
            return Page.projector.scheduleRender();
          }
        };
      })(this));
      return false;
    };

    Form.prototype.handleDeleteClick = function() {
      Page.cmd("wrapperConfirm", ["Are you sure you want to delete this item?", "Delete"], (function(_this) {
        return function() {
          return _this.deleteRow(function(res) {
            if (res === "ok") {
              _this.hidden = true;
              return Page.projector.scheduleRender();
            }
          });
        };
      })(this));
      return false;
    };

    Form.prototype.handleRadioClick = function(e) {
      var id;
      id = e.currentTarget.attributes["for"].value;
      this.data[id] = e.currentTarget.value;
      this.invalid[id] = false;
      Page.projector.scheduleRender();
      return false;
    };

    Form.prototype.renderField = function(field) {
      var props, values;
      props = field.props;
      props.value = this.data[field.id];
      props.name = field.id;
      values = props.values;
      if (field.type === "radio") {
        return h("div.formfield", this.h("label.title", {
          "for": field.id
        }, field.title), this.h("div.radiogroup", props, [
          values.map((function(_this) {
            return function(arg) {
              var key, value;
              key = arg[0], value = arg[1];
              return [
                h("a.radio", {
                  "for": props.id,
                  key: key,
                  href: "#" + key,
                  onclick: _this.handleRadioClick,
                  value: key,
                  classes: {
                    active: _this.data[field.id] === key
                  }
                }, value), " "
              ];
            };
          })(this))
        ]));
      } else {
        return h("div.formfield", this.h("label.title", {
          "for": field.id
        }, field.title), this.h("input.text", props));
      }
    };

    Form.prototype.render = function(classname) {
      if (classname == null) {
        classname = "";
      }
      return h("div.form-takeover-container#FormEdit", {
        afterCreate: Animation.show,
        classes: {
          hidden: this.hidden
        }
      }, [
        h("div.form.form-takeover" + classname, {
          afterCreate: Animation.slideDown,
          exitAnimation: Animation.slideUp
        }, this.fields.map(this.renderField), h("a.cancel.link", {
          href: "#Cancel",
          onclick: this.handleCancelClick
        }, "Cancel"), this.deleteRow ? h("a.button.button-submit.button-outline", {
          href: "#Delete",
          onclick: this.handleDeleteClick
        }, "Delete") : void 0, h("a.button.button-submit", {
          href: "#Modify",
          onclick: this.handleSubmitClick
        }, "Modify"))
      ]);
    };

    return Form;

  })(Class);

  window.Form = Form;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/ItemList.coffee ---- */


(function() {
  var ItemList;

  ItemList = (function() {
    function ItemList(item_class1, key1) {
      this.item_class = item_class1;
      this.key = key1;
      this.items = [];
      this.items_bykey = {};
    }

    ItemList.prototype.sync = function(rows, item_class, key) {
      var current_obj, i, item, len, results, row;
      this.items.splice(0, this.items.length);
      results = [];
      for (i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        current_obj = this.items_bykey[row[this.key]];
        if (current_obj) {
          current_obj.row = row;
          results.push(this.items.push(current_obj));
        } else {
          item = new this.item_class(row, this);
          this.items_bykey[row[this.key]] = item;
          results.push(this.items.push(item));
        }
      }
      return results;
    };

    ItemList.prototype.deleteItem = function(item) {
      var index;
      index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        console.log("Can't delete item", item);
      }
      return delete this.items_bykey[item.row[this.key]];
    };

    return ItemList;

  })();

  window.ItemList = ItemList;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Menu.coffee ---- */


(function() {
  var Menu,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Menu = (function() {
    function Menu() {
      this.render = bind(this.render, this);
      this.renderItem = bind(this.renderItem, this);
      this.handleClick = bind(this.handleClick, this);
      this.storeNode = bind(this.storeNode, this);
      this.toggle = bind(this.toggle, this);
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.visible = false;
      this.items = [];
      this.node = null;
    }

    Menu.prototype.show = function() {
      var ref;
      if ((ref = window.visible_menu) != null) {
        ref.hide();
      }
      this.visible = true;
      return window.visible_menu = this;
    };

    Menu.prototype.hide = function() {
      return this.visible = false;
    };

    Menu.prototype.toggle = function() {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
      return Page.projector.scheduleRender();
    };

    Menu.prototype.addItem = function(title, cb, selected) {
      if (selected == null) {
        selected = false;
      }
      return this.items.push([title, cb, selected]);
    };

    Menu.prototype.storeNode = function(node) {
      this.node = node;
      if (this.visible) {
        node.className = node.className.replace("visible", "");
        return setTimeout((function() {
          return node.className += " visible";
        }), 20);
      }
    };

    Menu.prototype.handleClick = function(e) {
      var cb, i, item, keep_menu, len, ref, selected, title;
      keep_menu = true;
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        title = item[0], cb = item[1], selected = item[2];
        if (title === e.target.textContent || e.target["data-title"] === title) {
          keep_menu = cb(item);
          break;
        }
      }
      if (keep_menu !== true) {
        this.hide();
      }
      return false;
    };

    Menu.prototype.renderItem = function(item) {
      var cb, href, key, onclick, selected, title;
      title = item[0], cb = item[1], selected = item[2];
      if (typeof selected === "function") {
        selected = selected();
      }
      if (title === "---") {
        return h("div.menu-item-separator");
      } else {
        if (typeof cb === "string") {
          href = cb;
          onclick = true;
        } else {
          href = "#" + title;
          onclick = this.handleClick;
        }
        if (typeof title === "function") {
          title = title();
          key = "#";
        } else {
          key = title;
        }
        return h("a.menu-item", {
          href: href,
          onclick: onclick,
          "data-title": title,
          key: key,
          classes: {
            "selected": selected,
            "noaction": cb === null
          }
        }, title);
      }
    };

    Menu.prototype.render = function(class_name) {
      if (class_name == null) {
        class_name = "";
      }
      if (this.visible || this.node) {
        return h("div.menu" + class_name, {
          classes: {
            "visible": this.visible
          },
          afterCreate: this.storeNode
        }, this.items.map(this.renderItem));
      }
    };

    return Menu;

  })();

  window.Menu = Menu;

  document.body.addEventListener("mouseup", function(e) {
    var isChildOf;
    if (!window.visible_menu || !window.visible_menu.node) {
      return false;
    }
    isChildOf = function(child, parent) {
      var node;
      node = child.parentNode;
      while (node !== null) {
        if (node === parent) {
          return true;
        } else {
          node = node.parentNode;
        }
      }
      return false;
    };
    if (!isChildOf(e.target, window.visible_menu.node.parentNode) && !isChildOf(e.target, window.visible_menu.node)) {
      window.visible_menu.hide();
      return Page.projector.scheduleRender();
    }
  });

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Prototypes.coffee ---- */


(function() {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) === s;
  };

  String.prototype.endsWith = function(s) {
    return s === '' || this.slice(-s.length) === s;
  };

  String.prototype.repeat = function(count) {
    return new Array(count + 1).join(this);
  };

  window.isEmpty = function(obj) {
    var key;
    for (key in obj) {
      return false;
    }
    return true;
  };

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/RateLimit.coffee ---- */


(function() {
  var call_after_interval, limits;

  limits = {};

  call_after_interval = {};

  window.RateLimit = function(interval, fn) {
    if (!limits[fn]) {
      call_after_interval[fn] = false;
      fn();
      return limits[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete limits[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Text.coffee ---- */


(function() {
  var Text,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Text = (function() {
    function Text() {}

    Text.prototype.toColor = function(text, saturation, lightness) {
      var hash, i, j, ref;
      if (saturation == null) {
        saturation = 30;
      }
      if (lightness == null) {
        lightness = 50;
      }
      hash = 0;
      for (i = j = 0, ref = text.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }
      return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
    };

    Text.prototype.renderMarked = function(text, options) {
      if (options == null) {
        options = {};
      }
      options["gfm"] = true;
      options["breaks"] = true;
      options["renderer"] = marked_renderer;
      text = this.fixReply(text);
      text = marked(text, options);
      text = this.emailLinks(text);
      return this.fixHtmlLinks(text);
    };

    Text.prototype.emailLinks = function(text) {
      return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
    };

    Text.prototype.fixHtmlLinks = function(text) {
      if (window.is_proxy) {
        return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="http://zero');
      } else {
        return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
      }
    };

    Text.prototype.fixLink = function(link) {
      var back;
      if (window.is_proxy) {
        back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
        return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
      } else {
        return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
      }
    };

    Text.prototype.toUrl = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
    };

    Text.prototype.getSiteUrl = function(address) {
      if (window.is_proxy) {
        if (indexOf.call(address, ".") >= 0) {
          return "http://" + address;
        } else {
          return "http://zero/" + address;
        }
      } else {
        return "/" + address;
      }
    };

    Text.prototype.fixReply = function(text) {
      return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
    };

    Text.prototype.toBitcoinAddress = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "");
    };

    Text.prototype.jsonEncode = function(obj) {
      return unescape(encodeURIComponent(JSON.stringify(obj)));
    };

    Text.prototype.jsonDecode = function(obj) {
      return JSON.parse(decodeURIComponent(escape(obj)));
    };

    Text.prototype.fileEncode = function(obj) {
      if (typeof obj === "string") {
        return btoa(unescape(encodeURIComponent(obj)));
      } else {
        return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
      }
    };

    Text.prototype.utf8Encode = function(s) {
      return unescape(encodeURIComponent(s));
    };

    Text.prototype.utf8Decode = function(s) {
      return decodeURIComponent(escape(s));
    };

    Text.prototype.distance = function(s1, s2) {
      var char, extra_parts, j, key, len, match, next_find, next_find_i, val;
      s1 = s1.toLocaleLowerCase();
      s2 = s2.toLocaleLowerCase();
      next_find_i = 0;
      next_find = s2[0];
      match = true;
      extra_parts = {};
      for (j = 0, len = s1.length; j < len; j++) {
        char = s1[j];
        if (char !== next_find) {
          if (extra_parts[next_find_i]) {
            extra_parts[next_find_i] += char;
          } else {
            extra_parts[next_find_i] = char;
          }
        } else {
          next_find_i++;
          next_find = s2[next_find_i];
        }
      }
      if (extra_parts[next_find_i]) {
        extra_parts[next_find_i] = "";
      }
      extra_parts = (function() {
        var results;
        results = [];
        for (key in extra_parts) {
          val = extra_parts[key];
          results.push(val);
        }
        return results;
      })();
      if (next_find_i >= s2.length) {
        return extra_parts.length + extra_parts.join("").length;
      } else {
        return false;
      }
    };

    Text.prototype.parseQuery = function(query) {
      var j, key, len, params, part, parts, ref, val;
      params = {};
      parts = query.split('&');
      for (j = 0, len = parts.length; j < len; j++) {
        part = parts[j];
        ref = part.split("="), key = ref[0], val = ref[1];
        if (val) {
          params[decodeURIComponent(key)] = decodeURIComponent(val);
        } else {
          params["url"] = decodeURIComponent(key);
        }
      }
      return params;
    };

    Text.prototype.encodeQuery = function(params) {
      var back, key, val;
      back = [];
      if (params.url) {
        back.push(params.url);
      }
      for (key in params) {
        val = params[key];
        if (!val || key === "url") {
          continue;
        }
        back.push((encodeURIComponent(key)) + "=" + (encodeURIComponent(val)));
      }
      return back.join("&");
    };

    Text.prototype.sqlIn = function(values) {
      var value;
      return "(" + ((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = values.length; j < len; j++) {
          value = values[j];
          results.push("'" + value + "'");
        }
        return results;
      })()).join(',') + ")";
    };

    return Text;

  })();

  window.is_proxy = document.location.host === "zero" || window.location.pathname === "/";

  window.Text = new Text();

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/Time.coffee ---- */


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(timestamp) {
      var back, now, secs;
      now = +(new Date) / 1000;
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
      }
      secs = now - timestamp;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(timestamp);
      }
      back = back.replace(/1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
      }
      parts = (new Date(timestamp * 1000)).toString().split(" ");
      if (format === "short") {
        display = parts.slice(1, 4);
      } else {
        display = parts.slice(1, 5);
      }
      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    };

    Time.prototype.timestamp = function(date) {
      if (date == null) {
        date = "";
      }
      if (date === "now" || date === "") {
        return parseInt(+(new Date) / 1000);
      } else {
        return parseInt(Date.parse(date) / 1000);
      }
    };

    return Time;

  })();

  window.Time = new Time;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/utils/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroFrame = (function(superClass) {
    extend(ZeroFrame, superClass);

    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.onRequest = bind(this.onRequest, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.history_state = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      this.cmd("innerReady");
      window.addEventListener("beforeunload", (function(_this) {
        return function(e) {
          _this.log("Save scrollTop", window.pageYOffset);
          _this.history_state["scrollTop"] = window.pageYOffset;
          return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
        };
      })(this));
      return this.cmd("wrapperGetState", [], (function(_this) {
        return function(state) {
          return _this.handleState(state);
        };
      })(this));
    };

    ZeroFrame.prototype.handleState = function(state) {
      if (state != null) {
        this.history_state = state;
      }
      this.log("Restore scrollTop", state, window.pageYOffset);
      if (window.pageYOffset === 0 && state) {
        return window.scroll(window.pageXOffset, state.scrollTop);
      }
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else if (cmd === "wrapperPopState") {
        this.handleState(message.params.state);
        return this.onRequest(cmd, message.params);
      } else {
        return this.onRequest(cmd, message.params);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return this.log("Unknown request", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.cmdp = function(cmd, params) {
      var p;
      if (params == null) {
        params = {};
      }
      p = new Promise();
      this.send({
        "cmd": cmd,
        "params": params
      }, function(res) {
        return p.resolve(res);
      });
      return p;
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })(Class);

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/Head.coffee ---- */


(function() {
  var Head,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Head = (function() {
    function Head() {
      this.render = bind(this.render, this);
      this.handleMenuClick = bind(this.handleMenuClick, this);
      this.active = "popular";
    }

    Head.prototype.handleMenuClick = function(e) {
      this.active = e.currentTarget.attributes.name.value;
      Page.site_lists.update();
      return false;
    };

    Head.prototype.render = function() {
      return h("div#Head", [
        h("a.logo", {
          href: "?Home",
          onclick: Page.handleLinkClick
        }, [
          h("img", {
            "src": "img/logo.png",
            "width": 58,
            "height": 64
          }), h("h1", "ZeroSites")
        ]), h("div.order", [
          h("a.order-item.popular", {
            href: "#",
            name: "popular",
            classes: {
              active: this.active === "popular"
            },
            onclick: this.handleMenuClick
          }, "Popular"), h("a.order-item.new", {
            href: "#",
            name: "new",
            classes: {
              active: this.active === "new"
            },
            onclick: this.handleMenuClick
          }, "New")
        ])
      ]);
    };

    return Head;

  })();

  window.Head = Head;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/Site.coffee ---- */


(function() {
  var Site,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Site = (function() {
    function Site(row1) {
      this.row = row1;
      this.render = bind(this.render, this);
      this.handleEditClick = bind(this.handleEditClick, this);
      this.deleteRow = bind(this.deleteRow, this);
      this.saveRow = bind(this.saveRow, this);
      this.getClasses = bind(this.getClasses, this);
      this.handleStarClick = bind(this.handleStarClick, this);
      this.isNew = bind(this.isNew, this);
      this.getUri = bind(this.getUri, this);
      this.form_edit = null;
      this;
    }

    Site.prototype.getUri = function() {
      return this.row.directory + "_" + this.row.site_id;
    };

    Site.prototype.isNew = function() {
      return Time.timestamp() - this.row.date_added < 60 * 60 * 24;
    };

    Site.prototype.handleStarClick = function() {
      var action;
      if (!Page.site_info.cert_user_id) {
        Page.user.certSelect((function(_this) {
          return function() {
            return _this.handleStarClick();
          };
        })(this));
        return false;
      }
      if (Page.user.starred[this.getUri()]) {
        action = "removing";
      } else {
        action = "adding";
      }
      Page.user.starred[this.getUri()] = !Page.user.starred[this.getUri()];
      Page.projector.scheduleRender();
      Page.user.getData((function(_this) {
        return function(data) {
          if (action === "adding") {
            data.site_star[_this.getUri()] = 1;
          } else {
            delete data.site_star[_this.getUri()];
          }
          return Page.user.save(data, function(res) {
            return Page.site_lists.update();
          });
        };
      })(this));
      return false;
    };

    Site.prototype.getClasses = function() {
      return {
        my: this.row.cert_user_id === Page.site_info.cert_user_id || Page.site_info.settings.own,
        starred: Page.user.starred[this.getUri()]
      };
    };

    Site.prototype.saveRow = function(cb) {
      var user;
      user = new User(this.row.directory);
      return user.getData((function(_this) {
        return function(data) {
          var data_row, j, key, len, ref, ref1, row, val;
          ref = data.site;
          for (j = 0, len = ref.length; j < len; j++) {
            row = ref[j];
            if (row.site_id === _this.row.site_id) {
              data_row = row;
            }
          }
          ref1 = _this.row;
          for (key in ref1) {
            val = ref1[key];
            if (data_row[key]) {
              data_row[key] = val;
            }
          }
          return user.save(data, function(res) {
            Page.site_lists.update();
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    Site.prototype.deleteRow = function(cb) {
      return Page.user.getData((function(_this) {
        return function(data) {
          var data_row_i, i, j, len, ref, row;
          ref = data.site;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            row = ref[i];
            if (row.site_id === _this.row.site_id) {
              data_row_i = i;
            }
          }
          data.site.splice(data_row_i, 1);
          return Page.user.save(data, function(res) {
            Page.site_lists.update();
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    Site.prototype.handleEditClick = function() {
      if (!this.form_edit) {
        this.form_edit = new Form();
        this.form_edit.addField("text", "address", "Address", {
          placeholder: "e.g. http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8",
          required: true,
          validate: this.form_edit.shouldBeZite
        });
        this.form_edit.addField("text", "title", "Title", {
          placeholder: "e.g. ZeroBlog",
          required: true
        });
        this.form_edit.addField("radio", "language", "Language", {
          required: true,
          values: Page.languages,
          classes: {
            "radiogroup-lang": true
          }
        });
        this.form_edit.addField("radio", "category", "Category", {
          required: true,
          values: Page.categories
        });
        this.form_edit.addField("text", "description", "Description", {
          placeholder: "e.g. ZeroNet changelog and related informations",
          required: true
        });
      }
      this.form_edit.setData(this.row);
      this.form_edit.saveRow = this.saveRow;
      this.form_edit.deleteRow = this.deleteRow;
      Page.setFormEdit(this.form_edit);
      return false;
    };

    Site.prototype.render = function() {
      var my, ref;
      my = this.row.cert_user_id === Page.site_info.cert_user_id || Page.site_info.settings.own;
      return h("a.site.nocomment", {
        href: Text.fixLink("http://127.0.0.1:43110/" + this.row.address),
        key: this.row.site_id,
        enterAnimation: Animation.slideDown,
        exitAnimation: Animation.slideUp,
        classes: this.getClasses()
      }, [
        h("div.right", [
          h("a.star", {
            href: "#Star",
            onclick: this.handleStarClick
          }, h("span.num", this.row.star || ""), h("span.icon.icon-star", "")), h("a.comments", {
            href: "#"
          }, h("span.num", "soon"), h("span.icon.icon-comment", "")), this.row.peers ? h("div.peers", h("span.num", this.row.peers), h("span.icon.icon-profile", "")) : void 0
        ]), h("div.title", this.row.title), this.isNew() ? h("div.tag.tag-new", "New") : void 0, ((ref = this.row.tags) != null ? ref.indexOf("popular") : void 0) >= 0 ? h("div.tag.tag-popular", "Popular") : void 0, my ? h("a.tag.tag-my", {
          href: "#Edit:" + this.row.site_uri,
          onclick: this.handleEditClick
        }, "Edit") : void 0, h("div.description", this.row.description)
      ]);
    };

    return Site;

  })();

  window.Site = Site;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/SiteAdd.coffee ---- */


(function() {
  var SiteAdd,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SiteAdd = (function(superClass) {
    extend(SiteAdd, superClass);

    function SiteAdd() {
      this.close = bind(this.close, this);
      this.shouldBeUniqueSite = bind(this.shouldBeUniqueSite, this);
      this.updateDb = bind(this.updateDb, this);
      this.handleSubmit = bind(this.handleSubmit, this);
      this.handleRadioCategoryClick = bind(this.handleRadioCategoryClick, this);
      this.handleRadioLangClick = bind(this.handleRadioLangClick, this);
      this.form = new Form();
      this.db = {};
      this.submitting = false;
      return this;
    }

    SiteAdd.prototype.handleRadioLangClick = function(e) {
      this.form.data["language"] = e.currentTarget.value;
      this.form.invalid["language"] = false;
      Page.projector.scheduleRender();
      return false;
    };

    SiteAdd.prototype.handleRadioCategoryClick = function(e) {
      this.form.data["category"] = e.currentTarget.value;
      this.form.invalid["category"] = false;
      Page.projector.scheduleRender();
      return false;
    };

    SiteAdd.prototype.handleSubmit = function() {
      if (!Page.site_info.cert_user_id) {
        Page.user.certSelect((function(_this) {
          return function() {
            return _this.handleSubmit();
          };
        })(this));
        return false;
      }
      if (!this.form.validate()) {
        return false;
      }
      this.form.data["address"] = this.form.data["address"].match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)(.*)/)[0];
      this.submitting = true;
      Page.user.getData((function(_this) {
        return function(data) {
          var row_site;
          row_site = _this.form.data;
          row_site.date_added = Time.timestamp();
          row_site.site_id = row_site.date_added;
          data.site.push(row_site);
          return Page.user.save(data, function(res) {
            if (res === "ok") {
              _this.close();
              Page.head.active = "new";
              Page.setUrl("?Category:" + row_site.category);
              return setTimeout((function() {
                _this.submitting = false;
                _this.form.reset();
                return Page.site_lists.update();
              }), 1000);
            } else {
              return _this.submitting = false;
            }
          });
        };
      })(this));
      return false;
    };

    SiteAdd.prototype.updateDb = function() {
      this.site_db = {};
      return Page.cmd("dbQuery", "SELECT * FROM site", (function(_this) {
        return function(res) {
          var address, i, len, ref, results, row;
          results = [];
          for (i = 0, len = res.length; i < len; i++) {
            row = res[i];
            address = (ref = row.address.match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)(.*)/)) != null ? ref[0] : void 0;
            address = address.replace(/\/.*/, "");
            results.push(_this.site_db[address.toLowerCase()] = row);
          }
          return results;
        };
      })(this));
    };

    SiteAdd.prototype.shouldBeUniqueSite = function(value) {
      var address, site;
      address = value.match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)(.*)/)[0];
      address = address.replace(/\/.*/, "");
      site = this.site_db[address.toLowerCase()];
      this.log(address, this.site_db);
      if (site) {
        return "This site is already submitted as " + site.title + "!";
      } else {
        return null;
      }
    };

    SiteAdd.prototype.close = function() {
      Page.site_lists.state = null;
      return Page.projector.scheduleRender();
    };

    SiteAdd.prototype.render = function() {
      return h("div.form.form-siteadd", {
        updateAnimation: Animation.height,
        classes: {
          hidden: Page.site_lists.state !== "siteadd"
        }
      }, [
        h("div.formfield", this.form.h("label.title", {
          "for": "address"
        }, "Address"), this.form.h("input.text", {
          type: "text",
          name: "address",
          placeholder: "e.g. http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8",
          required: true,
          validate: [this.form.shouldBeZite, this.shouldBeUniqueSite]
        })), h("div.formfield", this.form.h("label.title", {
          "for": "title"
        }, "Title"), this.form.h("input.text", {
          type: "text",
          name: "title",
          placeholder: "e.g. ZeroBlog",
          required: true
        })), h("div.formfield", this.form.h("label.title", {
          "for": "language"
        }, "Language"), this.form.h("div.radiogroup.radiogroup-lang", {
          name: "language",
          value: this.form.data.language,
          required: true
        }, [
          Page.languages.map((function(_this) {
            return function(lang) {
              return [
                h("a.radio", {
                  key: lang,
                  href: "#" + lang,
                  onclick: _this.handleRadioLangClick,
                  value: lang,
                  classes: {
                    active: _this.form.data.language === lang
                  }
                }, lang), " "
              ];
            };
          })(this))
        ])), h("div.formfield", this.form.h("label.title", {
          "for": "category"
        }, "Category"), this.form.h("div.radiogroup", {
          name: "category",
          value: this.form.data.category,
          required: true
        }, Page.categories.map((function(_this) {
          return function(arg) {
            var category, id;
            id = arg[0], category = arg[1];
            return [
              h("a.radio", {
                key: id,
                href: "#" + id,
                onclick: _this.handleRadioCategoryClick,
                value: id,
                classes: {
                  active: _this.form.data.category === id
                }
              }, category), " "
            ];
          };
        })(this)))), h("div.formfield", this.form.h("label.title", {
          "for": "description"
        }, "Description"), this.form.h("input.text", {
          type: "text",
          name: "description",
          placeholder: "e.g. ZeroNet changelog and related informations",
          required: true
        })), h("a.button.button-submit", {
          href: "#Submit",
          onclick: this.handleSubmit
        }, "Submit")
      ]);
    };

    return SiteAdd;

  })(Class);

  window.SiteAdd = SiteAdd;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/SiteList.coffee ---- */


(function() {
  var SiteList,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SiteList = (function(superClass) {
    extend(SiteList, superClass);

    function SiteList(row) {
      this.row = row;
      this.handleMoreClick = bind(this.handleMoreClick, this);
      this.item_list = new ItemList(Site, "site_id");
      this.sites = this.item_list.items;
      this.item_list.sync(this.row.sites);
      this.limit = 10;
    }

    SiteList.prototype.isHidden = function() {
      if (Page.site_lists.filter_category === null) {
        return false;
      } else {
        return Page.site_lists.filter_category !== this.row.id;
      }
    };

    SiteList.prototype.handleMoreClick = function() {
      this.limit += 20;
      this.nolimit = true;
      return false;
    };

    SiteList.prototype.render = function(i) {
      var clear, limit;
      if (this.row.title === "Other" && Page.site_lists.filter_category !== this.row.id && Page.site_lists.cols === 3) {
        return this.renderWide(i);
      }
      if (Page.site_lists.filter_category === this.row.id) {
        limit = 100;
      } else {
        limit = this.limit;
      }
      if (this.sites.length === 0) {
        clear = false;
      } else {
        clear = i % Page.site_lists.cols === 1;
      }
      return h("div.sitelist", {
        key: this.row.id,
        classes: {
          empty: this.sites.length === 0,
          hidden: this.isHidden(),
          selected: Page.site_lists.filter_category === this.row.id,
          nolimit: this.nolimit,
          clear: clear
        }
      }, [
        h("a.categoryname", {
          href: "?Category:" + this.row.id + ":" + (Text.toUrl(this.row.title)),
          onclick: Page.handleLinkClick
        }, this.row.title), h("div.sites", [
          this.sites.slice(0, +(limit - 1) + 1 || 9e9).map(function(item) {
            return item.render();
          }), this.sites.length > limit ? h("a.more", {
            href: "?Category:" + this.row.id + ":" + (Text.toUrl(this.row.title)),
            onclick: this.handleMoreClick,
            enterAnimation: Animation.slideDown,
            exitAnimation: Animation.slideUp
          }, "Show more...") : void 0
        ])
      ]);
    };

    SiteList.prototype.renderWide = function(i) {
      var clear, cols, limit;
      cols = [0, 1, 2];
      clear = false;
      limit = this.limit;
      if (this.sites.length < limit * 3) {
        limit = Math.ceil(this.sites.length / 3);
      }
      return h("div.sitelist-wide", [
        cols.map((function(_this) {
          return function(col) {
            return h("div.sitelist.col-" + col, {
              key: _this.row.id,
              classes: {
                empty: _this.sites.length === 0,
                hidden: _this.isHidden(),
                selected: Page.site_lists.filter_category === _this.row.id,
                clear: clear
              }
            }, [
              h("a.categoryname", {
                href: "?Category:" + _this.row.id + ":" + (Text.toUrl(_this.row.title)),
                onclick: Page.handleLinkClick
              }, _this.row.title), h("div.sites", [
                _this.sites.slice(0 + col * limit, +(col * limit + limit - 1) + 1 || 9e9).map(function(item) {
                  return item.render();
                })
              ])
            ]);
          };
        })(this)), this.sites.length > limit * cols.length ? h("a.more", {
          href: "?Category:" + this.row.id + ":" + (Text.toUrl(this.row.title)),
          onclick: this.handleMoreClick,
          enterAnimation: Animation.slideDown
        }, "Show more...") : void 0
      ]);
    };

    return SiteList;

  })(Class);

  window.SiteList = SiteList;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/SiteLists.coffee ---- */


(function() {
  var SiteLists,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SiteLists = (function(superClass) {
    extend(SiteLists, superClass);

    function SiteLists() {
      this.render = bind(this.render, this);
      this.getVisibleSiteLists = bind(this.getVisibleSiteLists, this);
      this.setFilterCategory = bind(this.setFilterCategory, this);
      this.formatFilterTitle = bind(this.formatFilterTitle, this);
      this.handleSiteAddClick = bind(this.handleSiteAddClick, this);
      this.handleFiltersClick = bind(this.handleFiltersClick, this);
      this.renderFilterLanguage = bind(this.renderFilterLanguage, this);
      this.handleFilterLanguageClick = bind(this.handleFilterLanguageClick, this);
      this.menu_filters = new Menu();
      this.state = null;
      this.filter_lang = {};
      this.site_add = new SiteAdd();
      this.site_lists = [];
      this.site_lists_db = {};
      this.need_update = false;
      this.loaded = false;
      this.num_total = null;
      Page.on_site_info.then((function(_this) {
        return function() {
          return Page.on_local_storage.then(function() {
            var id, j, len, ref, ref1, site_list, title;
            _this.filter_lang = Page.local_storage.filter_lang;
            ref = Page.site_info.content.settings.categories;
            for (j = 0, len = ref.length; j < len; j++) {
              ref1 = ref[j], id = ref1[0], title = ref1[1];
              site_list = new SiteList({
                id: id,
                title: title,
                sites: []
              });
              _this.site_lists_db[id] = site_list;
              _this.site_lists.push(site_list);
            }
            return _this.update();
          });
        };
      })(this));
      window.onresize = (function(_this) {
        return function() {
          if (window.innerWidth < 720) {
            _this.cols = 1;
          } else if (window.innerWidth < 1200) {
            _this.cols = 2;
          } else {
            _this.cols = 3;
          }
          _this.log("Cols: " + _this.cols);
          return Page.projector.scheduleRender();
        };
      })(this);
      window.onresize();
    }

    SiteLists.prototype.update = function() {
      var filters, lang, order, query;
      if (Page.head.active === "new") {
        order = "date_added DESC";
      } else {
        order = "MIN(200, peers) + star * 20 DESC, title";
      }
      filters = [];
      if (!isEmpty(this.filter_lang)) {
        filters.push("language IN " + Text.sqlIn((function() {
          var results;
          results = [];
          for (lang in this.filter_lang) {
            results.push(lang);
          }
          return results;
        }).call(this)));
      }
      query = "SELECT site.*, json.*, COUNT(site_star.site_uri) AS star, site_stat.*\nFROM site\nLEFT JOIN json USING (json_id)\nLEFT JOIN site_star ON (site_star.site_uri = json.directory || \"_\" || site.site_id)\nLEFT JOIN site_stat ON (site_stat.site_uri = json.directory || \"_\" || site.site_id)\n" + (filters.length ? "WHERE " + filters.join(" AND ") : "") + "\nGROUP BY site.json_id, site_id\nORDER BY " + order;
      this.logStart("Sites");
      return Page.cmd("dbQuery", query, (function(_this) {
        return function(rows) {
          var category, j, len, name, ref, row, site_list, sites_db;
          sites_db = {};
          for (j = 0, len = rows.length; j < len; j++) {
            row = rows[j];
            if (sites_db[name = row["category"]] == null) {
              sites_db[name] = [];
            }
            sites_db[row["category"]].push(row);
          }
          ref = _this.site_lists_db;
          for (category in ref) {
            site_list = ref[category];
            site_list.item_list.sync(sites_db[category] || []);
          }
          _this.loaded = true;
          _this.num_total = rows.length;
          _this.logEnd("Sites", "found: " + _this.num_total);
          Page.on_loaded.resolve();
          return Page.projector.scheduleRender();
        };
      })(this));
    };

    SiteLists.prototype.handleFilterLanguageClick = function(e) {
      var key, value;
      value = e.currentTarget.value;
      if (value === "all") {
        for (key in this.filter_lang) {
          delete this.filter_lang[key];
        }
      } else if (this.filter_lang[value]) {
        delete this.filter_lang[value];
      } else {
        this.filter_lang[value] = true;
      }
      Page.saveLocalStorage();
      Page.projector.scheduleRender();
      this.update();
      return false;
    };

    SiteLists.prototype.renderFilterLanguage = function() {
      var lang;
      return h("div.menu-radio", h("div", "Site languages: "), h("a.all", {
        href: "#all",
        onclick: this.handleFilterLanguageClick,
        value: "all",
        classes: {
          selected: isEmpty(this.filter_lang)
        }
      }, "Show all"), (function() {
        var j, len, ref, results;
        ref = Page.languages;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          lang = ref[j];
          results.push([
            h("a", {
              href: "#" + lang,
              onclick: this.handleFilterLanguageClick,
              value: lang,
              classes: {
                selected: this.filter_lang[lang],
                long: lang.length > 2
              }
            }, lang), " "
          ]);
        }
        return results;
      }).call(this));
    };

    SiteLists.prototype.handleFiltersClick = function() {
      this.menu_filters.items = [];
      this.menu_filters.items.push([this.renderFilterLanguage, null]);
      if (this.menu_filters.visible) {
        this.menu_filters.hide();
      } else {
        this.menu_filters.show();
      }
      return false;
    };

    SiteLists.prototype.handleSiteAddClick = function() {
      if (this.state === "siteadd") {
        this.state = null;
      } else {
        this.state = "siteadd";
      }
      this.site_add.updateDb();
      return false;
    };

    SiteLists.prototype.formatFilterTitle = function() {
      var _, lang;
      if (isEmpty(this.filter_lang)) {
        return "None";
      } else {
        return ((function() {
          var ref, results;
          ref = this.filter_lang;
          results = [];
          for (lang in ref) {
            _ = ref[lang];
            results.push(lang);
          }
          return results;
        }).call(this)).join(", ");
      }
    };

    SiteLists.prototype.setFilterCategory = function(filter_category) {
      this.filter_category = filter_category;
      if (this.loaded) {
        return setTimeout(((function(_this) {
          return function() {
            return Page.on_loaded.resolve();
          };
        })(this)), 600);
      }
    };

    SiteLists.prototype.getVisibleSiteLists = function() {
      if (this.filter_category) {
        return [this.site_lists_db[this.filter_category]];
      } else {
        return this.site_lists;
      }
    };

    SiteLists.prototype.render = function() {
      var i, j, lang, len, num_found, ref, ref1, site_list;
      if (this.need_update) {
        this.need_update = false;
        this.update();
      }
      i = 0;
      num_found = 0;
      ref = this.site_lists;
      for (j = 0, len = ref.length; j < len; j++) {
        site_list = ref[j];
        if (!site_list.isHidden()) {
          num_found += site_list.sites.length;
        }
      }
      return h("div#SiteLists", {
        classes: {
          "state-siteadd": this.state === "siteadd"
        }
      }, this.loaded ? h("div.sitelists-right", [
        ((ref1 = Page.site_info) != null ? ref1.cert_user_id : void 0) ? h("a.certselect.right-link", {
          href: "#Select",
          onclick: Page.user.certSelect
        }, [h("span.symbol", "⎔"), h("span.title", "User: " + Page.site_info.cert_user_id)]) : void 0, h("a.filter.right-link", {
          href: "#Filters",
          onmousedown: this.handleFiltersClick,
          onclick: Page.returnFalse
        }, [h("span.symbol", "◇"), h("span.title", "Filter: " + this.formatFilterTitle())]), this.menu_filters.render(".filter"), h("a.siteadd.right-link", {
          href: "#",
          onclick: this.handleSiteAddClick
        }, [h("span.symbol", "＋"), h("span.title", "Submit new site")])
      ]) : void 0, this.site_add.render(), num_found === 0 && !isEmpty(this.filter_lang) ? h("h1.empty", {
        enterAnimation: Animation.slideDown,
        exitAnimation: Animation.slideUp
      }, "No sites found for languages: " + (((function() {
        var results;
        results = [];
        for (lang in this.filter_lang) {
          results.push(lang);
        }
        return results;
      }).call(this)).join(', '))) : void 0, this.loaded ? h("div.sitelists", this.site_lists.map(function(site_list) {
        if (site_list.sites.length) {
          i++;
          num_found += site_list.sites.length;
        }
        return site_list.render(i);
      })) : void 0, h("div.clear", " "));
    };

    SiteLists.prototype.onSiteInfo = function(site_info) {
      var action, inner_path, ref;
      if (site_info.event) {
        ref = site_info.event, action = ref[0], inner_path = ref[1];
        if (action === "file_done" && inner_path.endsWith("json")) {
          return RateLimit(1000, (function(_this) {
            return function() {
              _this.need_update = true;
              return Page.projector.scheduleRender();
            };
          })(this));
        }
      }
    };

    return SiteLists;

  })(Class);

  window.SiteLists = SiteLists;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/User.coffee ---- */


(function() {
  var User,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  User = (function(superClass) {
    extend(User, superClass);

    function User(auth_address) {
      this.onSiteInfo = bind(this.onSiteInfo, this);
      this.certSelect = bind(this.certSelect, this);
      this.starred = {};
      if (auth_address) {
        this.setAuthAddress(auth_address);
      }
    }

    User.prototype.setAuthAddress = function(auth_address) {
      this.auth_address = auth_address;
      if (Page.site_info.auth_address === auth_address) {
        return this.updateStarred();
      }
    };

    User.prototype.updateStarred = function(cb) {
      this.starred = {};
      return Page.cmd("dbQuery", [
        "SELECT site_star.* FROM json LEFT JOIN site_star USING (json_id) WHERE ?", {
          directory: "" + this.auth_address
        }
      ], (function(_this) {
        return function(res) {
          var i, len, row;
          for (i = 0, len = res.length; i < len; i++) {
            row = res[i];
            _this.starred[row["site_uri"]] = true;
          }
          if (typeof cb === "function") {
            cb();
          }
          return Page.projector.scheduleRender();
        };
      })(this));
    };

    User.prototype.getPath = function() {
      return "data/users/" + this.auth_address;
    };

    User.prototype.getDefaultData = function() {
      return {
        "site": [],
        "site_star": {},
        "site_comment": []
      };
    };

    User.prototype.getData = function(cb) {
      return Page.cmd("fileGet", [this.getPath() + "/data.json", false], (function(_this) {
        return function(data) {
          data = JSON.parse(data);
          if (data == null) {
            data = _this.getDefaultData();
          }
          return cb(data);
        };
      })(this));
    };

    User.prototype.certSelect = function(cb) {
      return Page.cmd("certSelect", {
        "accepted_domains": ["zeroid.bit"]
      }, (function(_this) {
        return function(res) {
          _this.log("certSelected");
          return typeof cb === "function" ? cb(res) : void 0;
        };
      })(this));
    };

    User.prototype.onSiteInfo = function(site_info) {
      var ref;
      if (((ref = site_info.event) != null ? ref[0] : void 0) === "cert_changed") {
        this.setAuthAddress(site_info.auth_address);
        return Page.projector.scheduleRender();
      }
    };

    User.prototype.save = function(data, cb) {
      return Page.cmd("fileWrite", [this.getPath() + "/data.json", Text.fileEncode(data)], (function(_this) {
        return function(res_write) {
          return Page.cmd("siteSign", {
            "inner_path": _this.getPath() + "/data.json"
          }, function(res_sign) {
            if (typeof cb === "function") {
              cb(res_sign);
            }
            return Page.cmd("sitePublish", {
              "inner_path": _this.getPath() + "/content.json",
              sign: false
            }, function(res_publish) {
              return _this.log("Save result", res_write, res_sign, res_publish);
            });
          });
        };
      })(this));
    };

    return User;

  })(Class);

  window.User = User;

}).call(this);


/* ---- /1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwB/js/ZeroSites.coffee ---- */


(function() {
  var ZeroSites,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.h = maquette.h;

  ZeroSites = (function(superClass) {
    extend(ZeroSites, superClass);

    function ZeroSites() {
      this.reloadServerInfo = bind(this.reloadServerInfo, this);
      this.reloadSiteInfo = bind(this.reloadSiteInfo, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.handleLinkClick = bind(this.handleLinkClick, this);
      return ZeroSites.__super__.constructor.apply(this, arguments);
    }

    ZeroSites.prototype.init = function() {
      this.params = {};
      this.site_info = null;
      this.server_info = null;
      this.history_state = {};
      this.on_site_info = new Promise();
      this.on_local_storage = new Promise();
      this.on_loaded = new Promise();
      this.user = new User();
      this.on_site_info.then((function(_this) {
        return function() {
          return _this.user.setAuthAddress(_this.site_info.auth_address);
        };
      })(this));
      this.local_storage = null;
      this.languages = [];
      this.categories = [];
      return this.on_site_info.then((function(_this) {
        return function() {
          _this.languages = _this.site_info.content.settings.languages;
          return _this.categories = _this.site_info.content.settings.categories;
        };
      })(this));
    };

    ZeroSites.prototype.createProjector = function() {
      var url;
      this.projector = maquette.createProjector();
      this.head = new Head();
      this.site_lists = new SiteLists();
      if (base.href.indexOf("?") === -1) {
        this.route("");
      } else {
        url = base.href.replace(/.*?\?/, "");
        this.route(url);
        this.history_state["url"] = url;
      }
      this.on_loaded.then((function(_this) {
        return function() {
          _this.log("onloaded");
          return window.requestAnimationFrame(function() {
            return document.body.className = "loaded";
          });
        };
      })(this));
      this.projector.replace($("#Head"), this.head.render);
      this.projector.replace($("#SiteLists"), this.site_lists.render);
      this.loadLocalStorage();
      return setInterval((function() {
        return Page.projector.scheduleRender();
      }), 60 * 1000);
    };

    ZeroSites.prototype.setFormEdit = function(form_edit) {
      form_edit.hidden = false;
      return this.projector.replace($("#FormEdit"), form_edit.render);
    };

    ZeroSites.prototype.route = function(query) {
      var page, param, ref;
      this.params = Text.parseQuery(query);
      ref = this.params.url.split(":"), page = ref[0], param = ref[1];
      this.content = this.site_lists;
      if (page === "Category") {
        this.site_lists.setFilterCategory(parseInt(param));
      } else {
        this.site_lists.setFilterCategory(null);
      }
      Page.projector.scheduleRender();
      return this.log("Route", page, param);
    };

    ZeroSites.prototype.setUrl = function(url, mode) {
      if (mode == null) {
        mode = "push";
      }
      url = url.replace(/.*?\?/, "");
      this.log("setUrl", this.history_state["url"], "->", url);
      if (this.history_state["url"] === url) {
        this.content.update();
        return false;
      }
      this.history_state["url"] = url;
      if (mode === "replace") {
        this.cmd("wrapperReplaceState", [this.history_state, "", url]);
      } else {
        this.cmd("wrapperPushState", [this.history_state, "", url]);
      }
      this.route(url);
      return false;
    };

    ZeroSites.prototype.handleLinkClick = function(e) {
      if (e.which === 2) {
        return true;
      } else {
        this.log("save scrollTop", window.pageYOffset);
        this.history_state["scrollTop"] = window.pageYOffset;
        this.cmd("wrapperReplaceState", [this.history_state, null]);
        if (document.body.scrollTop > 100) {
          anime({
            targets: document.body,
            scrollTop: 0,
            easing: "easeOutCubic",
            duration: 300
          });
        }
        this.history_state["scrollTop"] = 0;
        this.on_loaded.resolved = false;
        document.body.className = "";
        this.setUrl(e.currentTarget.search);
        return false;
      }
    };

    ZeroSites.prototype.createUrl = function(key, val) {
      var params, vals;
      params = JSON.parse(JSON.stringify(this.params));
      if (typeof key === "Object") {
        vals = key;
        for (key in keys) {
          val = keys[key];
          params[key] = val;
        }
      } else {
        params[key] = val;
      }
      return "?" + Text.queryEncode(params);
    };

    ZeroSites.prototype.loadLocalStorage = function() {
      return this.on_site_info.then((function(_this) {
        return function() {
          _this.log("Loading localstorage");
          return _this.cmd("wrapperGetLocalStorage", [], function(local_storage) {
            var base1;
            _this.local_storage = local_storage;
            _this.log("Loaded localstorage");
            if (_this.local_storage == null) {
              _this.local_storage = {};
            }
            if ((base1 = _this.local_storage).filter_lang == null) {
              base1.filter_lang = {};
            }
            return _this.on_local_storage.resolve();
          });
        };
      })(this));
    };

    ZeroSites.prototype.saveLocalStorage = function(cb) {
      if (this.local_storage) {
        return this.cmd("wrapperSetLocalStorage", this.local_storage, (function(_this) {
          return function(res) {
            if (cb) {
              return cb(res);
            }
          };
        })(this));
      }
    };

    ZeroSites.prototype.onOpenWebsocket = function(e) {
      this.reloadSiteInfo();
      return this.reloadServerInfo();
    };

    ZeroSites.prototype.reloadSiteInfo = function() {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          return _this.setSiteInfo(site_info);
        };
      })(this));
    };

    ZeroSites.prototype.reloadServerInfo = function() {
      return this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          return _this.setServerInfo(server_info);
        };
      })(this));
    };

    ZeroSites.prototype.onRequest = function(cmd, params) {
      if (cmd === "setSiteInfo") {
        return this.setSiteInfo(params);
      } else if (cmd === "wrapperPopState") {
        this.log("wrapperPopState", params);
        if (params.state) {
          if (!params.state.url) {
            params.state.url = params.href.replace(/.*\?/, "");
          }
          this.on_loaded.resolved = false;
          document.body.className = "";
          window.scroll(window.pageXOffset, params.state.scrollTop || 0);
          return this.route(params.state.url || "");
        }
      } else {
        return this.log("Unknown command", cmd, params);
      }
    };

    ZeroSites.prototype.setSiteInfo = function(site_info) {
      this.site_info = site_info;
      this.on_site_info.resolve();
      this.site_lists.onSiteInfo(site_info);
      this.user.onSiteInfo(site_info);
      return this.projector.scheduleRender();
    };

    ZeroSites.prototype.setServerInfo = function(server_info) {
      this.server_info = server_info;
      return this.projector.scheduleRender();
    };

    ZeroSites.prototype.returnFalse = function() {
      return false;
    };

    return ZeroSites;

  })(ZeroFrame);

  window.Page = new ZeroSites();

  window.Page.createProjector();

}).call(this);
