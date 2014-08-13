var TiltUtils = function(win, nav, doc) {
    function _handleEvents(object, method, type, callback) {
        for (var types = _events[type], i = types.length; i--; ) object[method](types[i], callback, !1);
    }
    if (!win.addEventListener || !doc.querySelectorAll) return null;
    var _events = function() {
        var events = {
            down: [ "mousedown" ],
            up: [ "mouseup", "dragend" ]
        };
        return nav.msPointerEnabled && (events.down.push("MSPointerDown"), events.up.push("MSPointerUp"), 
        events.up.push("MSPointerCancel")), "ontouchstart" in win && (events.down.push("touchstart"), 
        events.up.push("touchend"), events.up.push("touchcancel")), events;
    }(), _uid = 1, _tps = [ "perspective", "rotateX", "rotateY", "rotateZ", "translateX", "translateY", "translateZ" ], _tpl = _tps.length, _t = {};
    return {
        prefix: function() {
            for (var transform, vendors = [ "webkit", "Moz", "ms", "O" ], i = 0, l = vendors.length, elementStyle = doc.createElement("div").style; l > i; i++) if (transform = vendors[i] + "Transform", 
            transform in elementStyle) return vendors[i];
            return null;
        }(),
        getCSSRuleBySelector: function(selector) {
            for (var stylesheet, stylesheets = document.styleSheets; stylesheet = stylesheets.pop(); ) for (var rules = stylesheet.rules || stylesheet.cssRules, i = 0, l = rules.length; l > i; i++) if (rules[i].selectorText == selector) return rules[i].cssText ? rules[i].cssText : rules[i].style.cssText;
            return null;
        },
        initArray: function(value, length) {
            for (var arr = [], i = length; i--; ) arr[i] = value;
            return arr;
        },
        setTransforms: function(element, transforms) {
            element.__tiltId || (element.__tiltId = _uid++);
            var current = _t[element.__tiltId] || null;
            current || (current = transforms);
            for (var prop, i = 0, val = ""; _tpl > i; i++) prop = _tps[i], "undefined" != typeof transforms[prop] && (current[prop] = transforms[prop]), 
            current[prop] && (val += prop + "(" + current[prop] + ") ");
            _t[element.__tiltId] = current, this.setStyle(element, "-transform", val);
        },
        getTransforms: function(element) {
            return element.__tiltId ? _t[element.__tiltId] : null;
        },
        getStyle: function(element, prop) {
            return "-" === prop.charAt(0) && this.prefix ? (prop = prop.substring(1), element.style[this.prefix + prop.charAt(0).toUpperCase() + prop.slice(1)]) : element.style[prop];
        },
        addStyle: function(element, prop, value) {
            var current = this.getStyle(element, prop);
            this.setStyle(element, prop, current + value);
        },
        setStyle: function(element, prop, value) {
            "-" === prop.charAt(0) && this.prefix && (prop = prop.substring(1), element.style[this.prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = value), 
            element.style[prop] = value;
        },
        setStyles: function(element, styles) {
            var prop;
            for (prop in styles) styles.hasOwnProperty(prop) && this.setStyle(element, prop, styles[prop]);
        },
        getOriginForValue: function(value, modifier) {
            return "opposite" === modifier ? Math.round(100 * (1 - value)) : 50;
        },
        getSpecs: function(element) {
            var rect = element.getBoundingClientRect(), doc = element && element.ownerDocument, docElem = doc.documentElement;
            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft,
                width: rect.width,
                height: rect.height
            };
        },
        listen: function(object, type, callback) {
            _handleEvents(object, "addEventListener", type, callback);
        },
        unlisten: function(object, type, callback) {
            _handleEvents(object, "removeEventListener", type, callback);
        }
    };
}(window, navigator, document), TiltNode = function(win, doc, utils) {
    if (!utils) return null;
    var WOBBLE_PERSPECTIVE = function() {
        var styles, value, test = document.createElement("div");
        return test.style.display = "none", document.documentElement.appendChild(test), 
        test.className = "tilt", styles = win.getComputedStyle(test, null), value = styles[utils.prefix + "Perspective"], 
        test.parentNode.removeChild(test), parseInt(value, 10);
    }(), WOBBLE_TILT = 2, WOBBLE_DEPTH = -(WOBBLE_PERSPECTIVE / 40), WOBBLE_ORIGIN = "opposite", HOVER_X = 0, HOVER_Y = .125, HOVER_BLUR = .5, HOVER_OPACITY = .375, exports = function(element) {
        if (this._element = element, this._styles = {}, -1 !== this._element.className.indexOf("tilt-img")) {
            var img = this._element.querySelector("img");
            this._element.style.backgroundImage = "url(" + img.src + ")";
        }
        utils.listen(this._element, "down", this._onPush.bind(this));
    };
    return exports.prototype = {
        _hovers: function() {
            return -1 !== this._element.className.indexOf("hover");
        },
        _getCSS: function(property) {
            return this._styles[property] || "";
        },
        _onPush: function(e) {
            var rect, x, y, tiltX, tiltY, moveZ, originX, originY, computedStyles, transforms, self = this;
            computedStyles = win.getComputedStyle(this._element, null), this._styles.boxShadow = computedStyles.getPropertyValue("box-shadow"), 
            utils.listen(document, "up", function handleUp() {
                utils.unlisten(document, "up", handleUp), self._onLift();
            }), rect = utils.getSpecs(this._element), x = (e.pageX - rect.left) / rect.width, 
            y = (e.pageY - rect.top) / rect.height, originX = utils.getOriginForValue(x, WOBBLE_ORIGIN), 
            originY = utils.getOriginForValue(y, WOBBLE_ORIGIN), tiltX = WOBBLE_PERSPECTIVE / rect.height * WOBBLE_TILT, 
            tiltY = WOBBLE_PERSPECTIVE / rect.width * WOBBLE_TILT, moveZ = 1 - (Math.abs(-.5 + x) + Math.abs(-.5 + y)), 
            transforms = {
                perspective: WOBBLE_PERSPECTIVE + "px",
                rotateX: (-.5 + y) * -tiltX + "deg",
                rotateY: (-.5 + x) * tiltY + "deg",
                translateZ: Math.round(moveZ * WOBBLE_DEPTH) + "px"
            };
            var styles = {
                "-transformOrigin": originX + "% " + originY + "% 0"
            };
            if (this._hovers()) {
                var sx, sy, sb, so;
                sx = HOVER_X + .333 * -(-.5 + x), sy = HOVER_Y + .333 * -(-.5 + y), sb = HOVER_BLUR - .3125 * moveZ, 
                so = HOVER_OPACITY - .125 * moveZ;
                var css = this._getCSS("box-shadow");
                styles.boxShadow = (css ? css + "," : css) + sx + "rem " + sy + "rem " + sb + "rem rgba(0,0,0," + so + ")";
            }
            utils.setStyles(this._element.parentNode, {
                "-transform-style": "preserve-3d",
                "-transition": "none",
                "-transform": "none"
            }), utils.setTransforms(this._element.parentNode, {
                translateZ: -WOBBLE_DEPTH + "px"
            }), utils.setStyles(this._element, styles), utils.setTransforms(this._element, transforms);
        },
        _onLift: function() {
            if (this._hovers()) {
                var css = this._getCSS("box-shadow");
                utils.setStyles(this._element, {
                    boxShadow: (css ? css + "," : css) + HOVER_X + "rem " + HOVER_Y + "rem " + HOVER_BLUR + "rem rgba(0,0,0," + HOVER_OPACITY + ")"
                });
            }
            utils.setTransforms(this._element, {
                perspective: WOBBLE_PERSPECTIVE + "px",
                translateZ: null,
                rotateX: null,
                rotateY: null
            });
        }
    }, exports;
}(window, document, window.TiltUtils), TiltGrid = function(win, utils) {
    if (!utils) return null;
    var exports = function(element) {
        this._element = element, this._maxTileSize = element.getAttribute("data-tile-size") || "m", 
        this._element.setAttribute("data-tile-size", this._maxTileSize), this._maxTileActualWidth = this._getMaxTileWidthByTileSize(this._maxTileSize), 
        this._grid = {
            slots: null,
            occupants: 0,
            wasted: 0,
            space: 0,
            width: 0,
            height: 0
        }, this._currentWidth = null, this._items = this._getItems(this._element), this._minHorizontalTileSlots = 4;
        var self = this, timer = null;
        win.addEventListener("resize", function() {
            clearTimeout(timer), self._isShrinking() ? (self._element.className += " tilt-static", 
            setTimeout(function() {
                self._organize();
            }, 1)) : timer = setTimeout(function() {
                self._organize();
            }, 50);
        }, !1), this._organize();
        for (var wrapper, i = 0, l = this._items.length; l > i; i++) wrapper = this._items[i].node.children[0], 
        utils.setStyle(wrapper, "-transitionDelay", .1 * i + "s");
        setTimeout(function() {
            self._element.setAttribute("data-ready", "true");
        }, 1);
    };
    return exports.prototype = {
        _isShrinking: function() {
            return this._element.offsetWidth < this._currentWidth;
        },
        _getItems: function(element) {
            for (var children = element.children, items = [], i = 0, l = children.length; l > i; i++) items.push({
                node: children[i],
                offset: null,
                size: null
            });
            return items;
        },
        _getTileSize: function(tile, cells) {
            var offset, type = tile.getAttribute("data-tile-type") || "m", types = type.split(","), l = types.length, size = types[0], i = 1;
            if (l > 1) for (;l > i; i++) type = types[i], offset = parseInt(type.charAt(0), 10), 
            isNaN(offset) ? size = type.substring(1) : cells >= offset && (size = type.substring(1));
            return this._getObjectByTileSize(size);
        },
        _setTileSize: function(item, size) {
            item.size = size, item.node.setAttribute("data-tile-size", this._getTileSizeByObject(size));
        },
        _getHorizontalGridCellCount: function(width) {
            var slots = 0, scaled = Math.round(width / 100);
            return "s" == this._maxTileSize && (slots = 4 + scaled), "m" == this._maxTileSize && (slots = 3 + scaled), 
            "l" == this._maxTileSize && (slots = 2 + scaled), Math.max(this._minHorizontalTileSlots, slots);
        },
        _getMaxTileHeightByHorizontalCellCount: function(count) {
            for (var node, size, i = 0, l = this._items.length, max = 1; l > i; i++) node = this._items[i].node, 
            size = this._getTileSize(node, count), size.y > max && (max = size.y);
            return max;
        },
        _organize: function() {
            this._currentWidth = this._element.offsetWidth;
            var item, xCells = Math.max(this._minHorizontalTileSlots, Math.floor(this._currentWidth / this._maxTileActualWidth)), yCells = 0, tileScale = Math.floor(this._currentWidth / xCells), i = 0, l = this._items.length;
            if (this._grid.slots && xCells !== this._grid.slots[0].length) {
                for (;l > i; i++) item = this._items[i], item.offset = null, item.size = null;
                this._grid = {
                    slots: null,
                    occupants: 0,
                    wasted: 0,
                    space: 0,
                    width: 0,
                    height: 0
                };
            }
            for (this._grid.slots || (this._grid.slots = [ utils.initArray(0, xCells) ]), i = 0; l > i; i++) {
                if (item = this._items[i], item.size || this._setTileSize(item, this._getTileSize(item.node, xCells)), 
                !item.offset) {
                    if (item.offset = this._findSlot(this._grid.slots, item.size), !item.offset) continue;
                    this._reserveSlot(this._grid.slots, item);
                }
                this._setItemPosition(item, tileScale), item.offset.y + item.size.y > yCells && (yCells = item.offset.y + item.size.y);
            }
            this._element.style.height = yCells * tileScale + "px", this._element.className = this._element.className.replace(" tilt-static", "");
        },
        _setItemPosition: function(item, scale) {
            utils.setTransforms(item.node, {
                translateX: Math.round(scale * item.offset.x) + "px",
                translateY: Math.round(scale * item.offset.y) + "px"
            }), utils.setStyles(item.node, {
                width: scale * item.size.x + "px",
                height: scale * item.size.y + "px"
            });
        },
        _findSlot: function(grid, size) {
            var x, y, rowCap = grid[0].length, required = size.x * size.y;
            for (required <= this._grid.wasted && (rowCap = this._grid.width), required > this._grid.vacant && this._extendGrid(grid), 
            y = 0; y < grid.length; y++) for (x = 0; rowCap > x; x++) if (this._isSlotAvailable(x, y, grid, size)) return {
                x: x,
                y: y
            };
            return this._extendGrid(grid), this._findSlot(grid, size);
        },
        _reserveSlot: function(grid, item) {
            for (var x = item.offset.x, y = item.offset.y, w = item.size.x, h = item.size.y, yo = y; y + h > yo; yo++) for (var xo = x; x + w > xo; xo++) grid[yo][xo] = 1;
            for (var offset = 0, i = 0; i < grid[0].length && 1 === grid[0][i]; i++) offset = i;
            this._grid.width = offset + 1, this._grid.height = grid.length, this._grid.ySlots = this._grid.height, 
            this._grid.xSlots = this._grid.slots[0].length, this._grid.occupants += w * h, this._grid.space = this._grid.width * this._grid.height, 
            this._grid.wasted = this._grid.space - this._grid.occupants, this._grid.vacant = this._grid.ySlots * this._grid.xSlots - this._grid.occupants;
        },
        _isSlotAvailable: function(x, y, grid, size) {
            var w = size.x - 1, h = size.y - 1;
            if (this._isSlotTaken(grid, x, y)) return !1;
            if ("undefined" == typeof grid[y + h] || "undefined" == typeof grid[y + h]) for (var i = 0, l = grid.length - y; l > i; i++) this._extendGrid(grid);
            if ("undefined" == typeof grid[y][x + w] && (grid[y + 1] || this._extendGrid(grid)), 
            0 === w && 0 === h) return !0;
            for (var yo = y; y + h >= yo; yo++) for (var xo = x; x + w >= xo; xo++) if (this._isSlotTaken(grid, xo, yo)) return !1;
            return !0;
        },
        _isSlotTaken: function(grid, x, y) {
            return grid[y] ? 0 !== grid[y][x] : !1;
        },
        _extendGrid: function(grid) {
            grid.push(utils.initArray(0, grid[0].length));
        },
        _getMaxTileWidthByTileSize: function(size) {
            return "m" == size ? 60 : "l" == size ? 75 : "s" == size ? 45 : 60;
        },
        _getObjectByTileSize: function(size) {
            if ("s" == size) return {
                x: 1,
                y: 1
            };
            if ("m" == size) return {
                x: 2,
                y: 2
            };
            if ("l" == size) return {
                x: 4,
                y: 4
            };
            if ("_s" == size) return {
                x: 2,
                y: 1
            };
            if ("_l" == size) return {
                x: 4,
                y: 2
            };
            if ("|s" == size) return {
                x: 1,
                y: 2
            };
            if ("|l" == size) return {
                x: 2,
                y: 4
            };
            throw new Error('unknown tile size: "' + size + '"');
        },
        _getTileSizeByObject: function(obj) {
            if (obj.x == obj.y) {
                if (1 == obj.x) return "s";
                if (2 == obj.x) return "m";
                if (4 == obj.x) return "l";
            }
            if (obj.x > obj.y) {
                if (2 == obj.x) return "_s";
                if (4 == obj.x) return "_l";
            }
            if (obj.x < obj.y) {
                if (2 == obj.y) return "|s";
                if (4 == obj.y) return "|l";
            }
            return null;
        }
    }, exports;
}(window, window.TiltUtils);

!function(win, doc, WNode, WGrid) {
    function setup() {
        var elements, i;
        if (WNode) for (elements = doc.getElementsByClassName("tilt"), i = elements.length; i--; ) new WNode(elements[i]);
        if (WGrid) for (elements = doc.getElementsByClassName("tilt-grid"), i = elements.length; i--; ) new WGrid(elements[i]);
    }
    win.addEventListener && doc.querySelectorAll && ("complete" === doc.readyState ? setup() : doc.addEventListener("DOMContentLoaded", setup));
}(window, document, window.TiltNode, window.TiltGrid);