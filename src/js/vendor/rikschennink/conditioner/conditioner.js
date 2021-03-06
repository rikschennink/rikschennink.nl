!function (t) {
    "use strict";
    var e = function (e, n, i, o, s, r) {
        var l, u, a, h = function (t, e) {
            this._path = t, this._expected = e, this._watches = [], this._count = 0, this._monitor = null
        };
        h.prototype = {getPath: function () {
            return this._path
        }, getExpected: function () {
            return this._expected
        }, isTrue: function () {
            for (var t = 0, e = this._count; e > t; t++)if (!this._watches[t].valid)return!1;
            return!0
        }, assignMonitor: function (t) {
            this._monitor = t
        }, assignWatches: function (t) {
            this._watches = t, this._count = t.length
        }, getMonitor: function () {
            return this._monitor
        }, getWatches: function () {
            return this._watches
        }, toString: function () {
            return this._path + ":{" + this._expected + "}"
        }};
        var d = function (t, e) {
            this._expression = t, this._change = e, this._currentState = null
        };
        d.prototype = {evaluate: function () {
            var t = this._expression.isTrue();
            t != this._currentState && (this._currentState = t, this._change(t))
        }};
        var c = function () {
            this._uid = 1, this._db = [], this._expressions = []
        };
        c.prototype = {_parse: function (t, e) {
            if (this._expressions[t])return this._expressions[t];
            for (var n, i, o, s = 0, r = t.split(","), l = r.length, u = []; l > s; s++)n = r[s].split(":"), i = 0 === n[0].indexOf("was "), o = i ? n[0].substr(4) : n[0], u.push({retain: i, test: o, value: e ? o : "undefined" == typeof n[1] ? !0 : n[1]});
            return this._expressions[t] = u, u
        }, _mergeData: function (t, e, n) {
            return r({element: n, expected: e}, t)
        }, create: function (t, e) {
            var n = new i, o = t.getPath(), s = t.getExpected(), r = this;
            return l.loader.require([l.paths.monitors + o], function (i) {
                var l, u, a, h, d, c, _, f, g = 0, p = r._db[o], m = i.unload ? r._uid++ : o;
                if (!p) {
                    if (p = {watches: [], change: function (t) {
                        for (g = 0, l = p.watches.length; l > g; g++)p.watches[g].test(t)
                    }}, _ = i.unload ? r._mergeData(i.data, s, e) : i.data, "function" == typeof i.unload && (p.unload = function (t) {
                        return function () {
                            i.unload(t)
                        }
                    }(_)), "function" == typeof i.trigger)i.trigger(p.change, _); else for (d in i.trigger)i.trigger.hasOwnProperty(d) && i.trigger[d].addEventListener(d, p.change, !1);
                    r._db[m] = p
                }
                for (t.assignMonitor(m), a = [], f = "function" == typeof i.test, h = i.parse ? i.parse(s, f) : r._parse(s, f), l = h.length; l > g; g++)c = h[g], u = {changed: null, retain: c.retain, retained: null, valid: null, data: i.unload ? _ : r._mergeData(i.data, c.value, e), test: function (t) {
                    return function (e) {
                        if (!this.retained) {
                            var n = t(this.data, e);
                            this.valid != n && (this.valid = n, this.changed && this.changed()), this.valid && this.retain && (this.retained = !0)
                        }
                    }
                }(f ? i.test : i.test[c.test])}, u.test(), a.push(u);
                p.watches = p.watches.concat(a), n.resolve(a)
            }), n
        }, destroy: function (t) {
            var e, n = t.getMonitor(), i = this._db[n], o = i.watches, s = o.length;
            t.getWatches().forEach(function (t) {
                for (e = 0; s > e; e++)o[e] === t && o.splice(e, 1)
            }), i.unload && (i.unload(), this._db[n] = null)
        }};
        var _ = function (t, e, n) {
            var i = m.parse(t);
            this._element = e, this._tests = i.getTests(), this._condition = new d(i, n), this._conditionChangeBind = this._condition.evaluate.bind(this._condition), this._load()
        };
        _.prototype = {_load: function () {
            for (var t = 0, e = this._tests.length; e > t; t++)this._setupMonitorForTest(this._tests[t])
        }, _setupMonitorForTest: function (t) {
            var e, n = this, i = 0;
            u.create(t, this._element).then(function (o) {
                for (t.assignWatches(o), e = o.length; e > i; i++)o[i].changed = n._conditionChangeBind;
                n._condition.evaluate()
            })
        }, destroy: function () {
            for (var t = 0, e = this._tests.length; e > t; t++)u.destroy(this._tests[t]);
            this._conditionChangeBind = null
        }};
        var f = {_uid: 0, _db: [], clearTest: function (t) {
            var e = this._db[t];
            return e ? (this._db[t] = null, void e.destroy()) : !1
        }, setTest: function (t, e, n) {
            var i = this._uid++;
            return this._db[i] = new _(t, e, n), i
        }}, g = function (t, e) {
            this._expression = t, this._negate = "undefined" == typeof e ? !1 : e
        };
        g.prototype = {isTrue: function () {
            return this._expression.isTrue() !== this._negate
        }, getTests: function () {
            return this._expression instanceof h ? [this._expression] : this._expression.getTests()
        }, toString: function () {
            return(this._negate ? "not " : "") + this._expression.toString()
        }};
        var p = function (t, e, n) {
            this._a = t, this._operator = e, this._b = n
        };
        p.prototype = {isTrue: function () {
            return"and" === this._operator ? this._a.isTrue() && this._b.isTrue() : this._a.isTrue() || this._b.isTrue()
        }, getTests: function () {
            return this._a.getTests().concat(this._b.getTests())
        }, toString: function () {
            return"(" + this._a.toString() + " " + this._operator + " " + this._b.toString() + ")"
        }};
        var m = {parse: function (t) {
            var e, n, i, o, s, r, l, u, a, d, c, _ = 0, f = "", m = [], v = "", b = !1, y = !1, A = null, M = null, C = [], w = t.length;
            for (A || (A = m); w > _; _++)if (r = t.charCodeAt(_), 123 !== r)if (125 === r && (e = A.length - 1, n = e + 1, b = "not" === A[e], n = b ? e : e + 1, o = new h(f, v), A[n] = new g(o, b), f = "", v = "", b = !1, y = !1), y)v += t.charAt(_); else {
                if (40 === r && (A.push([]), C.push(A), A = A[A.length - 1]), 32 === r || 0 === _ || 40 === r) {
                    if (i = t.substr(_, 5).match(/and |or |not /g), !i)continue;
                    a = i[0], d = a.length - 1, A.push(a.substring(0, d)), _ += d
                }
                if (41 === r || _ === w - 1)do if (M = C.pop(), 0 !== A.length) {
                    for (s = 0, c = A.length; c > s; s++)"string" == typeof A[s] && ("not" === A[s] ? (A.splice(s, 2, new g(A[s + 1], !0)), s = -1, c = A.length) : "not" !== A[s + 1] && (A.splice(s - 1, 3, new p(A[s - 1], A[s], A[s + 1])), s = -1, c = A.length));
                    1 === A.length && M && (M[M.length - 1] = A[0], A = M)
                } else A = M; while (_ === w - 1 && M)
            } else for (y = !0, f = "", l = _ - 2; l >= 0 && (u = t.charCodeAt(l), 32 !== u && 40 !== u);)f = t.charAt(l) + f, l--;
            return 1 === m.length ? m[0] : m
        }}, v = {init: function (t) {
            t()
        }, allowsActivation: function () {
            return!0
        }, destroy: function () {
        }}, b = function (t, e) {
            "string" == typeof t && t.length && (this._conditions = t, this._element = e, this._state = !1, this._test = null)
        };
        b.prototype = {init: function (t) {
            var e = this, i = !1;
            this._test = f.setTest(this._conditions, this._element, function (o) {
                e._state = o, n.publish(e, "change"), i || (i = !0, t())
            })
        }, allowsActivation: function () {
            return this._state
        }, destroy: function () {
            f.clearTest(this._test)
        }};
        var y = {_options: {}, _redirects: {}, registerModule: function (t, e, n) {
            this._options[l.loader.toUrl(t)] = e, n && (this._redirects[n] = t), l.loader.config(t, e)
        }, getRedirect: function (t) {
            return this._redirects[t] || t
        }, getModule: function (t) {
            return this._options[t] || this._options[l.loader.toUrl(t)]
        }}, A = function (t, e, n, i) {
            this._path = y.getRedirect(t), this._alias = t, this._element = e, this._options = n, this._agent = i || v, this._Module = null, this._module = null, this._initialized = !1, this._onAgentStateChangeBind = this._onAgentStateChange.bind(this);
            var o = this;
            this._agent.init(function () {
                o._initialize()
            })
        };
        A.prototype = {hasInitialized: function () {
            return this._initialized
        }, getModulePath: function () {
            return this._path
        }, isModuleAvailable: function () {
            return this._agent.allowsActivation() && !this._module
        }, isModuleActive: function () {
            return null !== this._module
        }, wrapsModuleWithPath: function (t) {
            return this._path === t || this._alias === t
        }, _initialize: function () {
            this._initialized = !0, n.subscribe(this._agent, "change", this._onAgentStateChangeBind), n.publishAsync(this, "init", this), this._agent.allowsActivation() && this._onBecameAvailable()
        }, _onBecameAvailable: function () {
            n.publishAsync(this, "available", this), this._load()
        }, _onAgentStateChange: function () {
            var t = this._agent.allowsActivation();
            this._module && !t ? this._unload() : !this._module && t && this._onBecameAvailable()
        }, _load: function () {
            if (this._Module)return void this._onLoad();
            var t = this;
            l.loader.require([this._path], function (e) {
                t._agent && (t._Module = e, t._onLoad())
            })
        }, _applyOverrides: function (t, e) {
            if ("string" == typeof e) {
                if (123 != e.charCodeAt(0)) {
                    for (var n = 0, i = e.split(", "), o = i.length; o > n; n++)this._overrideObjectWithUri(t, i[n]);
                    return t
                }
                e = JSON.parse(e)
            }
            return r(t, e)
        }, _overrideObjectWithUri: function (t, e) {
            for (var n, i = t, o = "", s = 0, r = e.length; r > s;) {
                if (n = e.charCodeAt(s), 46 != n && 58 != n)o += e.charAt(s); else {
                    if (58 == n) {
                        i[o] = this._castValueToType(e.substr(s + 1));
                        break
                    }
                    i = i[o], o = ""
                }
                s++
            }
        }, _castValueToType: function (t) {
            return 39 == t.charCodeAt(0) ? t.substring(1, t.length - 1) : isNaN(t) ? "true" == t || "false" == t ? "true" === t : -1 !== t.indexOf(",") ? t.split(",").map(this._castValueToType) : t : parseFloat(t)
        }, _parseOptions: function (t, e, n) {
            var i, o, s = [], l = {}, u = {};
            do i = y.getModule(t), s.push({page: i, module: e.options}), t = e.__superUrl; while (e = e.__super);
            for (o = s.length; o--;)l = r(l, s[o].page), u = r(u, s[o].module);
            return i = r(u, l), n && (i = this._applyOverrides(i, n)), i
        }, _onLoad: function () {
            if (this._agent.allowsActivation()) {
                var t = this._parseOptions(this._path, this._Module, this._options);
                "function" == typeof this._Module ? this._module = new this._Module(this._element, t) : (this._module = this._Module.load ? this._Module.load(this._element, t) : null, this._module || (this._module = this._Module)), n.inform(this._module, this), n.publishAsync(this, "load", this)
            }
        }, _unload: function () {
            return this._module ? (n.conceal(this._module, this), this._module.unload && this._module.unload(), this._module = null, n.publish(this, "unload", this), !0) : !1
        }, destroy: function () {
            n.unsubscribe(this._agent, "change", this._onAgentStateChangeBind), this._unload(), this._agent.destroy(), this._onAgentStateChangeBind = null
        }, execute: function (t, e) {
            if (!this._module)return{status: 404, response: null};
            var n = this._module[t];
            return e = e || [], {status: 200, response: n.apply(this._module, e)}
        }};
        var M = function () {
            var t = function (t) {
                return t.isModuleActive()
            }, e = function (t) {
                return t.isModuleAvailable()
            }, i = function (t) {
                return t.getModulePath()
            }, r = function (t, e) {
                this._element = t, this._element.setAttribute(l.attr.processed, "true"), this._priority = e ? parseInt(e, 10) : 0, this._moduleControllers = [], this._moduleAvailableBind = this._onModuleAvailable.bind(this), this._moduleLoadBind = this._onModuleLoad.bind(this), this._moduleUnloadBind = this._onModuleUnload.bind(this)
            };
            return r.hasProcessed = function (t) {
                return"true" === t.getAttribute(l.attr.processed)
            }, r.prototype = {load: function (t) {
                this._moduleControllers = t;
                for (var e, i = 0, o = this._moduleControllers.length; o > i; i++)e = this._moduleControllers[i], n.subscribe(e, "available", this._moduleAvailableBind), n.subscribe(e, "load", this._moduleLoadBind)
            }, destroy: function () {
                for (var t = 0, e = this._moduleControllers.length; e > t; t++)this._destroyModule(this._moduleControllers[t]);
                this._moduleAvailableBind = null, this._moduleLoadBind = null, this._moduleUnloadBind = null, this._updateAttribute(l.attr.initialized, this._moduleControllers), this._moduleControllers = null, this._element.removeAttribute(l.attr.processed)
            }, _destroyModule: function (t) {
                n.unsubscribe(t, "available", this._moduleAvailableBind), n.unsubscribe(t, "load", this._moduleLoadBind), n.unsubscribe(t, "unload", this._moduleUnloadBind), n.conceal(t, this), t.destroy()
            }, getPriority: function () {
                return this._priority
            }, getElement: function () {
                return this._element
            }, matchesSelector: function (t, e) {
                return e && !o(e, this._element) ? !1 : s(this._element, t, e)
            }, areAllModulesActive: function () {
                return this.getActiveModules().length === this._moduleControllers.length
            }, getActiveModules: function () {
                return this._moduleControllers.filter(t)
            }, getModule: function (t) {
                return this._getModules(t, !0)
            }, getModules: function (t) {
                return this._getModules(t)
            }, _getModules: function (t, e) {
                if ("undefined" == typeof t)return e ? this._moduleControllers[0] : this._moduleControllers.concat();
                for (var n, i = 0, o = this._moduleControllers.length, s = []; o > i; i++)if (n = this._moduleControllers[i], n.wrapsModuleWithPath(t)) {
                    if (e)return n;
                    s.push(n)
                }
                return e ? null : s
            }, execute: function (t, e) {
                return this._moduleControllers.map(function (n) {
                    return{controller: n, result: n.execute(t, e)}
                })
            }, _onModuleAvailable: function (t) {
                n.inform(t, this), this._updateAttribute(l.attr.loading, this._moduleControllers.filter(e))
            }, _onModuleLoad: function (t) {
                n.unsubscribe(t, "load", this._moduleLoadBind), n.subscribe(t, "unload", this._moduleUnloadBind), this._updateAttribute(l.attr.loading, this._moduleControllers.filter(e)), this._updateAttribute(l.attr.initialized, this.getActiveModules())
            }, _onModuleUnload: function (t) {
                n.subscribe(t, "load", this._moduleLoadBind), n.unsubscribe(t, "unload", this._moduleUnloadBind), n.conceal(t, this), this._updateAttribute(l.attr.initialized, this.getActiveModules())
            }, _updateAttribute: function (t, e) {
                var n = e.map(i);
                n.length ? this._element.setAttribute(t, n.join(",")) : this._element.removeAttribute(t)
            }}, r
        }(), C = function (t) {
            this._inSync = !1, this._controllers = t, this._controllerLoadedBind = this._onLoad.bind(this), this._controllerUnloadedBind = this._onUnload.bind(this);
            for (var e, i = 0, o = this._controllers.length; o > i; i++)e = this._controllers[i], n.subscribe(e, "load", this._controllerLoadedBind), n.subscribe(e, "unload", this._controllerUnloadedBind);
            this._test()
        };
        C.prototype = {destroy: function () {
            for (var t, e = 0, i = this._controllers.length; i > e; e++)t = this._controllers[e], n.unsubscribe(t, "load", this._controllerLoadedBind), n.unsubscribe(t, "unload", this._controllerUnloadedBind);
            this._controllerLoadedBind = null, this._controllerUnloadedBind = null, this._controllers = null
        }, areAllModulesActive: function () {
            for (var t, e = 0, n = this._controllers.length; n > e; e++)if (t = this._controllers[e], !this._isActiveController(t))return!1;
            return!0
        }, _onLoad: function () {
            this._test()
        }, _onUnload: function () {
            this._unload()
        }, _isActiveController: function (t) {
            return t.isModuleActive && t.isModuleActive() || t.areAllModulesActive && t.areAllModulesActive()
        }, _test: function () {
            this.areAllModulesActive() && this._load()
        }, _load: function () {
            this._inSync || (this._inSync = !0, n.publishAsync(this, "load", this._controllers))
        }, _unload: function () {
            this._inSync && (this._inSync = !1, n.publish(this, "unload", this._controllers))
        }};
        var w = function () {
            this._nodes = []
        };
        return w.prototype = {parse: function (t) {
            var e, n, i = t.querySelectorAll("[data-module]"), o = i.length, s = 0, r = [];
            if (!i)return[];
            for (; o > s; s++)n = i[s], M.hasProcessed(n) || r.push(new M(n, n.getAttribute(l.attr.priority)));
            for (r.sort(function (t, e) {
                return t.getPriority() - e.getPriority()
            }), s = r.length; --s >= 0;)e = r[s], e.load.call(e, this._getModuleControllersByElement(e.getElement()));
            return this._nodes = this._nodes.concat(r), r
        }, load: function (t, e) {
            e = e.length ? e : [e];
            var n, i, o = 0, s = e.length, r = [];
            for (i = new M(t); s > o; o++)n = e[o], r.push(this._getModuleController(n.path, t, n.options, n.conditions));
            return i.load(r), this._nodes.push(i), i
        }, getNodes: function (t, e, n) {
            if ("undefined" == typeof t && "undefined" == typeof e)return n ? this._nodes[0] : this._nodes.concat();
            for (var i, o = 0, s = this._nodes.length, r = []; s > o; o++)if (i = this._nodes[o], i.matchesSelector(t, e)) {
                if (n)return i;
                r.push(i)
            }
            return n ? null : r
        }, destroy: function (t) {
            for (var e, n = t.length, i = 0; n--;)e = this._nodes.indexOf(t[n]), -1 !== e && (this._nodes.splice(e, 1), t[n].destroy(), i++);
            return t.length === i
        }, _getModuleControllersByElement: function (t) {
            var e = t.getAttribute(l.attr.module) || "";
            if (91 == e.charCodeAt(0)) {
                var n, i, o, s = [], r = 0;
                try {
                    i = JSON.parse(e)
                } catch (u) {
                }
                if (!i)return[];
                if (n = i.length, 123 == e.charCodeAt(1)) {
                    for (; n > r; r++)o = i[r], s[r] = this._getModuleController(o.path, t, o.options, o.conditions);
                    return s
                }
                for (; n > r; r++)o = i[r], s[r] = "string" == typeof o ? this._getModuleController(o, t) : this._getModuleController(o[0], t, "string" == typeof o[1] ? o[2] : o[1], "string" == typeof o[1] ? o[1] : o[2]);
                return s
            }
            return[this._getModuleController(e, t, t.getAttribute(l.attr.options), t.getAttribute(l.attr.conditions))]
        }, _getModuleController: function (t, e, n, i) {
            return new A(t, e, n, i ? new b(i, e) : v)
        }}, l = {paths: {monitors: "./monitors/"}, attr: {options: "data-options", module: "data-module", conditions: "data-conditions", priority: "data-priority", initialized: "data-initialized", processed: "data-processed", loading: "data-loading"}, loader: {require: function (t, n) {
            e(t, n)
        }, config: function (t, e) {
            var n = {};
            n[t] = e, requirejs.config({config: n})
        }, toUrl: function (t) {
            return requirejs.toUrl(t)
        }}, modules: {}}, u = new c, a = new w, {init: function (e) {
            return e && this.setOptions(e), a.parse(t.document)
        }, setOptions: function (t) {
            var e, n, i, o;
            l = r(l, t);
            for (n in l.paths)l.paths.hasOwnProperty(n) && (l.paths[n] += "/" !== l.paths[n].slice(-1) ? "/" : "");
            for (n in l.modules)l.modules.hasOwnProperty(n) && (i = l.modules[n], o = "string" == typeof i ? i : i.alias, e = "string" == typeof i ? null : i.options || {}, y.registerModule(n, e, o))
        }, parse: function (t) {
            return a.parse(t)
        }, load: function (t, e) {
            return a.load(t, e)
        }, sync: function () {
            var t = Object.create(C.prototype);
            return C.apply(t, [arguments[0].slice ? arguments[0] : Array.prototype.slice.call(arguments, 0)]), t
        }, getNode: function (t, e) {
            return a.getNodes(t, e, !0)
        }, getNodes: function (t, e) {
            return a.getNodes(t, e, !1)
        }, destroy: function () {
            var t = [], e = arguments[0];
            return Array.isArray(e) && (t = e), "string" == typeof e ? t = a.getNodes(e, arguments[1]) : e instanceof M ? t.push(e) : e.nodeName && (t = a.getNodes().filter(function (t) {
                return o(e, t.getElement())
            })), 0 === t.length ? !1 : a.destroy(t)
        }, getModule: function (t, e, n) {
            for (var i, o = 0, s = this.getNodes(e, n), r = s.length; r > o; o++)if (i = s[o].getModule(t))return i;
            return null
        }, getModules: function (t, e, n) {
            for (var i, o = 0, s = this.getNodes(e, n), r = s.length, l = []; r > o; o++)i = s[o].getModules(t), i.length && (l = l.concat(i));
            return l
        }, is: function (t, e) {
            var n = new i;
            return f.setTest(t, e, function (t) {
                n.resolve(t)
            }), n
        }, on: function (t, e, n) {
            n = "function" == typeof e ? e : n, f.setTest(t, e, function (t) {
                n(t)
            })
        }}
    };
    "undefined" != typeof module && module.exports ? module.exports = e(require, require("./utils/Observer"), require("./utils/Promise"), require("./utils/contains"), require("./utils/matchesSelector"), require("./utils/mergeObjects")) : "function" == typeof define && define.amd && define(["require", "./utils/Observer", "./utils/Promise", "./utils/contains", "./utils/matchesSelector", "./utils/mergeObjects"], e)
}(this);