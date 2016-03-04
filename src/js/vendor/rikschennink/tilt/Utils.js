(function(win,undefined){

    // is old browser?
    var _old = !(document.addEventListener);

    // bind browser / environment specific events to up/down properties
    var _events = (function(){

        // set default events
        var events = {
            'down':['mousedown'],
            'up':['mouseup','dragend'],
            'resize':['resize']
        };

        // has pointer events
        if (navigator.msPointerEnabled) {
            events.down.push('MSPointerDown');
            events.up.push('MSPointerUp');
            events.up.push('MSPointerCancel');
        }

        // has touch events
        if ('ontouchstart' in win) {
            events.down.push('touchstart');
            events.up.push('touchend');
            events.up.push('touchcancel');
        }

        return events;

    }());

    function _handleEvents(object,method,type,callback) {
        var types=_events[type],i=types.length;
        while (i--) {
            if (!_old) {
                object[method](types[i],callback,false);
            }
            else {
                object.attachEvent('on' + types[i],callback);
            }
        }
    }

    // transforms hash
    var _uid = 1;
    var _tps = ['perspective','rotateX','rotateY','rotateZ','translateX','translateY','translateZ'];
    var _tpl = _tps.length;
    var _t = {};

    // mustard cut
    if (!document.querySelectorAll) {
        return null;
    }

    var exports = !document.querySelectorAll ? null : {

        hasTransforms:function() {
            return !_old;
        },

        /**
         * Fetch vendor CSS prefix
         */
        prefix:(function(){
            var vendors = ['webkit', 'Moz', 'ms', 'O'],i = 0,l = vendors.length,transform,elementStyle = document.createElement('div').style;
            for (;i<l;i++) {
                transform = vendors[i] + 'Transform';
                if (transform in elementStyle ) { return vendors[i]; }
            }
            return null;
        })(),

        /**
         * Get Class
         * @param value
         * @param length
         * @returns {Array}
         */
        getCSSRuleBySelector:function getCSSRuleBySelector(selector) {
            var stylesheet,stylesheets = document.styleSheets;
            while(stylesheet = stylesheets.pop()) {
                var rules = stylesheet.rules || stylesheet.cssRules,i= 0,l=rules.length;
                for(;i<l;i++) {
                    if (rules[i].selectorText == selector) {
                        return rules[i].cssText ?  rules[i].cssText : rules[i].style.cssText;
                    }
                }
            }
            return null;
        },

        /**
         * Create value filled array
         */
        initArray:function initArray(value,length) {
            var arr = [], i = length;
            while (i--) {
                arr[i] = value;
            }
            return arr;
        },


        /**
         * CSS transform methods
         */
        setTransforms:function setTransforms(element,transforms) {

            if (!element.__tiltId) {
                element.__tiltId = _uid++;
            }

            // get current transforms (if any)
            var current = _t[element.__tiltId] || null;

            // if no current transforms overwrite
            if (!current) {
                current = transforms;
            }

            // if current transforms have been set, update values
            var i=0,val='',prop;
            for (;i<_tpl;i++) {
                prop = _tps[i];

                if (typeof transforms[prop] !== 'undefined') {
                    current[prop] = transforms[prop];
                }

                if (current[prop]) {
                    val += prop + '(' + current[prop] + ') ';
                }
            }

            // remember new transforms
            _t[element.__tiltId] = current;

            // write new style
            this.setStyle(element,'-transform',val);
        },

        getTransforms:function(element) {

            if (!element.__tiltId) {
                return null;
            }

            return _t[element.__tiltId];
        },

        /**
         * CSS inline style methods
         */
        getStyle:function getStyle(element,prop) {
            if (prop.charAt(0) === '-' && this.prefix) {
                prop = prop.substring(1);
                return element.style[this.prefix + prop.charAt(0).toUpperCase() + prop.slice(1)];
            }
            return element.style[prop];
        },

        addStyle:function(element,prop,value) {
            var current = this.getStyle(element,prop);
            this.setStyle(element,prop,current + value);
        },

        setStyle:function setStyle(element,prop,value) {
            if (prop.charAt(0) === '-' && this.prefix) {
                prop = prop.substring(1);
                element.style[this.prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = value;
            }
            element.style[prop] = value;
        },

        setStyles:function setStyles(element,styles) {
            var prop;
            for (prop in styles) {
                if (!styles.hasOwnProperty(prop)){continue;}
                this.setStyle(element,prop,styles[prop]);
            }
        },

        getOriginForValue:function getOriginForValue(value,modifier) {
            return modifier === 'opposite' ? Math.round((1-value) * 100) : 50;
        },

        getSpecs:function getSpecs(element) {

            var rect = element.getBoundingClientRect(),
                doc = element && element.ownerDocument,
                docElem = doc.documentElement;

            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft,
                width: rect.width,
                height: rect.height
            };
        },

        /**
         * Event handling
         */
        listen:function listen(object,type,callback) {
            _handleEvents(object,'addEventListener',type,callback);
        },

        unlisten:function unlisten(object,type,callback) {
            _handleEvents(object,'removeEventListener',type,callback);
        }

    };

    // CommonJS
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports;
    }
    // AMD
    else if (typeof define === 'function' && define.amd) {
        define(function() {return exports;});
    }
    // Browser globals
    else {
        win.mergeObjects = exports;
    }

}(this,undefined));