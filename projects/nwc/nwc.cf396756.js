
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireed78"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireed78"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("5bZMq", function(module, exports) {

$parcel$export(module.exports, "nwc", () => Ee);

var $jNQSf = parcelRequire("jNQSf");

var $jOQqz = parcelRequire("jOQqz");
function h(e, t) {
    for(var n = 0; n < t.length; n++){
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
}
function f(e, t, n) {
    return t && h(e.prototype, t), n && h(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function d() {
    return d = Object.assign ? Object.assign.bind() : function(e) {
        for(var t = 1; t < arguments.length; t++){
            var n = arguments[t];
            for(var r in n)Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }, d.apply(this, arguments);
}
function v(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, m(e, t);
}
function p(e) {
    return p = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
    }, p(e);
}
function m(e, t) {
    return m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e;
    }, m(e, t);
}
function y() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
    } catch (e) {
        return !1;
    }
}
function P(e, t, n) {
    return P = y() ? Reflect.construct.bind() : function(e, t, n) {
        var r = [
            null
        ];
        r.push.apply(r, t);
        var o = new (Function.bind.apply(e, r));
        return n && m(o, n.prototype), o;
    }, P.apply(null, arguments);
}
function w(e) {
    var t = "function" == typeof Map ? new Map : void 0;
    return w = function(e) {
        if (null === e || -1 === Function.toString.call(e).indexOf("[native code]")) return e;
        if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== t) {
            if (t.has(e)) return t.get(e);
            t.set(e, n);
        }
        function n() {
            return P(e, arguments, p(this).constructor);
        }
        return n.prototype = Object.create(e.prototype, {
            constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), m(n, e);
    }, w(e);
}
function g(e, t) {
    if (null == e) return {};
    var n, r, o = {}, i = Object.keys(e);
    for(r = 0; r < i.length; r++)t.indexOf(n = i[r]) >= 0 || (o[n] = e[n]);
    return o;
}
var b = /*#__PURE__*/ function() {
    function e() {
        this.events = {};
    }
    var t = e.prototype;
    return t.on = function(e, t) {
        this.events[e] || (this.events[e] = []), this.events[e].push(t);
    }, t.off = function(e, t) {
        this.events[e] && (this.events[e] = this.events[e].filter(function(e) {
            return e !== t;
        }));
    }, t.emit = function(e, t) {
        this.events[e] && this.events[e].forEach(function(e) {
            return e(t);
        });
    }, e;
}();
function _(e) {
    return Object.entries(e).map(function(e) {
        var t = e[0], n = e[1];
        return t && n ? t + "=" + n : "";
    }).filter(function(e) {
        return e;
    }).join("&");
}
function k(e, t) {
    return "Basic " + btoa(e + ":" + t);
}
var E = {
    __proto__: null,
    buildQueryString: _,
    basicAuthHeader: k
}, T = /*#__PURE__*/ function(e) {
    function t(t, n, r, o) {
        var i, s = t.toString();
        return n && (s += " " + n), s += ": ", s += o.message ? o.message : JSON.stringify(o), (i = e.call(this, s) || this).status = void 0, i.statusText = void 0, i.headers = void 0, i.error = void 0, i.status = t, i.statusText = n, i.headers = r, i.error = o, i;
    }
    return v(t, e), t;
}(/*#__PURE__*/ w(Error)), N = {
    __proto__: null,
    OAuthClient: function() {},
    AuthClient: function() {},
    AlbyResponseError: T
}, j = [
    "auth",
    "endpoint",
    "params",
    "request_body",
    "method",
    "max_retries",
    "base_url",
    "user_agent",
    "headers"
], q = function(e) {
    return Promise.resolve(R(e)).then(function(e) {
        return e.json();
    });
}, R = function(e) {
    var t = e.auth, n = e.endpoint, r = e.params, o = void 0 === r ? {} : r, i = e.request_body, s = e.method, u = e.max_retries, c = e.base_url, a = void 0 === c ? O : c, l = e.user_agent, h = e.headers, f = g(e, j);
    try {
        var v = function(e) {
            return Promise.resolve(S(p.toString(), d({
                headers: d({}, m ? {
                    "Content-Type": "application/json; charset=utf-8"
                } : void 0, e, h, {
                    "User-Agent": null != l ? l : "@getalby/sdk",
                    "X-User-Agent": null != l ? l : "@getalby/sdk"
                }),
                method: s,
                body: m ? JSON.stringify(i) : void 0
            }, f), u)).then(function(e) {
                var t = function() {
                    if (!e.ok) return Promise.resolve(e.json()).then(function(t) {
                        throw new T(e.status, e.statusText, e.headers, t);
                    });
                }();
                return t && t.then ? t.then(function(t) {
                    return e;
                }) : e;
            });
        }, p = new URL(a + n);
        p.search = _(o);
        var m = "POST" === s && !!i;
        return Promise.resolve(t ? Promise.resolve(t.getAuthHeader(p.href, s)).then(v) : v(void 0));
    } catch (e) {
        return Promise.reject(e);
    }
}, S = function e(t, n, r) {
    void 0 === r && (r = 0);
    try {
        return Promise.resolve(fetch(t, n)).then(function(o) {
            var i, s = function() {
                if (429 === o.status && r > 0) {
                    var s = Number(o.headers.get("x-rate-limit-reset")), u = Number(o.headers.get("x-rate-limit-remaining")), c = 1e3 * s - Date.now(), a = 1e3;
                    return 0 === u && (a = c), Promise.resolve(new Promise(function(e) {
                        return setTimeout(e, a);
                    })).then(function() {
                        var o = e(t, n, r - 1);
                        return i = 1, o;
                    });
                }
            }();
            return s && s.then ? s.then(function(e) {
                return i ? e : o;
            }) : i ? s : o;
        });
    } catch (e) {
        return Promise.reject(e);
    }
}, O = "https://api.getalby.com", I = function(e) {
    return e.reduce(function(e, t) {
        return e + t.toString(16).padStart(2, "0");
    }, "");
}, x = [
    "expires_in"
], A = [
    "token"
];
function U(e) {
    var t = e.expires_in;
    return d({}, g(e, x), !!t && {
        expires_at: Date.now() + 1e3 * t
    });
}
var C = /*#__PURE__*/ function() {
    function e(e) {
        this.token = void 0, this.options = void 0, this.code_verifier = void 0, this.code_challenge = void 0, this._refreshAccessTokenPromise = void 0, this._tokenEvents = void 0, this._tokenEvents = new b;
        var t = e.token, n = g(e, A);
        this.options = d({
            client_secret: ""
        }, n), this.token = t, this._refreshAccessTokenPromise = null;
    }
    var t = e.prototype;
    return t.on = function(e, t) {
        this._tokenEvents.on(e, t);
    }, t.refreshAccessToken = function() {
        try {
            var e = this;
            return e._refreshAccessTokenPromise || (e._refreshAccessTokenPromise = new Promise(function(t, n) {
                try {
                    return Promise.resolve(function(r, o) {
                        try {
                            var i = function(n, r) {
                                try {
                                    var o = function() {
                                        var n, r = null == (n = e.token) ? void 0 : n.refresh_token, o = e.options, i = o.client_id, s = o.client_secret, u = o.request_options, c = o.user_agent;
                                        if (!i) throw new Error("client_id is required");
                                        if (!r) throw new Error("refresh_token is required");
                                        return Promise.resolve(q(d({}, u, {
                                            endpoint: "/oauth/token",
                                            params: {
                                                client_id: i,
                                                grant_type: "refresh_token",
                                                refresh_token: r
                                            },
                                            user_agent: c,
                                            method: "POST",
                                            headers: d({}, null == u ? void 0 : u.headers, {
                                                "Content-type": "application/x-www-form-urlencoded"
                                            }, {
                                                Authorization: k(i, s)
                                            })
                                        }))).then(function(n) {
                                            var r = U(n);
                                            e.token = r, t({
                                                token: r
                                            }), e._tokenEvents.emit("tokenRefreshed", e.token);
                                        });
                                    }();
                                } catch (e) {
                                    return r(e);
                                }
                                return o && o.then ? o.then(void 0, r) : o;
                            }(0, function(t) {
                                console.error(t), n(t), e._tokenEvents.emit("tokenRefreshFailed", t);
                            });
                        } catch (e) {
                            return o(!0, e);
                        }
                        return i && i.then ? i.then(o.bind(null, !1), o.bind(null, !0)) : o(!1, i);
                    }(0, function(t, n) {
                        if (e._refreshAccessTokenPromise = null, t) throw n;
                        return n;
                    }));
                } catch (e) {
                    return Promise.reject(e);
                }
            })), Promise.resolve(e._refreshAccessTokenPromise);
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.isAccessTokenExpired = function() {
        var e, t, n = null == (e = this.token) ? void 0 : e.refresh_token, r = null == (t = this.token) ? void 0 : t.expires_at;
        return !r || !!n && r <= Date.now() + 1e3;
    }, t.requestAccessToken = function(e) {
        try {
            var t = this, n = t.options, r = n.client_id, o = n.client_secret, i = n.callback, s = n.request_options, u = n.user_agent, c = t.code_verifier;
            if (!r) throw new Error("client_id is required");
            if (!o && !c) throw new Error("either client_secret is required, or code should be generated using a challenge");
            if (!i) throw new Error("callback is required");
            return Promise.resolve(q(d({}, s, {
                endpoint: "/oauth/token",
                params: {
                    code: e,
                    grant_type: "authorization_code",
                    code_verifier: c,
                    client_id: r,
                    redirect_uri: i
                },
                user_agent: u,
                method: "POST",
                headers: d({}, null == s ? void 0 : s.headers, {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, {
                    Authorization: k(r, o)
                })
            }))).then(function(e) {
                var n = U(e);
                return t.token = n, {
                    token: n
                };
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.generateAuthURL = function(e) {
        try {
            var t = function() {
                var t = n.code_challenge, o = new URL(e.authorizeUrl || "https://getalby.com/oauth");
                return o.search = _(d({}, e, {
                    client_id: i,
                    scope: u.join(" "),
                    response_type: "code",
                    redirect_uri: s,
                    code_challenge_method: r,
                    code_challenge: t
                })), o.toString();
            }, n = this;
            e || (e = {});
            var r, o = n.options, i = o.client_id, s = o.callback, u = o.scopes;
            if (!s) throw new Error("callback required");
            if (!u) throw new Error("scopes required");
            var c = function() {
                if ("S256" === e.code_challenge_method) return Promise.resolve(n._generateS256Challenge()).then(function() {
                    r = "S256";
                });
                "plain" === e.code_challenge_method && e.code_challenge && (n.code_challenge = e.code_challenge, n.code_verifier = e.code_challenge, r = "plain");
            }();
            return Promise.resolve(c && c.then ? c.then(t) : t());
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.getAuthHeader = function() {
        try {
            var e, t = function() {
                return {
                    Authorization: "Bearer " + n.token.access_token
                };
            }, n = this;
            if (null == (e = n.token) || !e.access_token) throw new Error("access_token is required");
            var r = function() {
                if (n.isAccessTokenExpired()) return Promise.resolve(n.refreshAccessToken()).then(function() {});
            }();
            return Promise.resolve(r && r.then ? r.then(t) : t());
        } catch (e) {
            return Promise.reject(e);
        }
    }, t._generateS256Challenge = function() {
        try {
            var e = this, t = crypto.getRandomValues(new Uint8Array(64));
            return e.code_verifier = I(t), Promise.resolve(crypto.subtle.digest("SHA-256", (new TextEncoder).encode(e.code_verifier))).then(function(t) {
                var n = new Uint8Array(t);
                e.code_challenge = btoa(String.fromCharCode.apply(String, n)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, e;
}(), M = /*#__PURE__*/ function() {
    function e(e) {
        this.bearer_token = void 0, this.bearer_token = e;
    }
    return e.prototype.getAuthHeader = function() {
        return {
            Authorization: "Bearer " + this.bearer_token
        };
    }, e;
}(), F = {
    __proto__: null,
    OAuth2User: C,
    OAuth2Bearer: M
};
function W(e) {
    var t = {};
    return e.recipient.customKey && e.recipient.customValue && (t[e.recipient.customKey] = e.recipient.customValue), t[7629169] = JSON.stringify(e.boostagram), {
        destination: e.recipient.address,
        amount: e.amount,
        custom_records: t
    };
}
var L = /*#__PURE__*/ function() {
    function e(e, t) {
        this.auth = void 0, this.defaultRequestOptions = void 0, this.auth = "string" == typeof e ? new M(e) : e, this.defaultRequestOptions = d({}, t, {
            user_agent: null == t ? void 0 : t.user_agent
        });
    }
    var t = e.prototype;
    return t.accountBalance = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/balance",
            params: e,
            method: "GET"
        }));
    }, t.signMessage = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/signatures",
            request_body: e,
            method: "POST"
        }));
    }, t.accountSummary = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/user/summary",
            params: e,
            method: "GET"
        }));
    }, t.accountInformation = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/user/me",
            params: e,
            method: "GET"
        }));
    }, t.accountValue4Value = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/user/value4value",
            params: e,
            method: "GET"
        }));
    }, t.incomingInvoices = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/invoices/incoming",
            params: e,
            method: "GET"
        }));
    }, t.outgoingInvoices = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/invoices/outgoing",
            params: e,
            method: "GET"
        }));
    }, t.invoices = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/invoices",
            params: e,
            method: "GET"
        }));
    }, t.getInvoice = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/invoices/" + e,
            method: "GET"
        }));
    }, t.decodeInvoice = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/decode/bolt11/" + e,
            method: "GET"
        }));
    }, t.createInvoice = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/invoices",
            request_body: e,
            method: "POST"
        }));
    }, t.keysend = function(e, t) {
        var n, r;
        return Array.isArray(e) ? (n = "/payments/keysend/multi", r = {
            keysends: e.map(function(e) {
                return d({}, e, {
                    custom_records: e.customRecords
                });
            })
        }) : (n = "/payments/keysend", r = d({}, e, {
            custom_records: e.customRecords
        })), q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: n,
            request_body: r,
            method: "POST"
        }));
    }, t.sendPayment = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/payments/bolt11",
            request_body: e,
            method: "POST"
        }));
    }, t.sendBoostagram = function(e, t) {
        var n, r;
        return Array.isArray(e) ? (n = "/payments/keysend/multi", r = {
            keysends: e.map(function(e) {
                return W(e);
            })
        }) : (n = "/payments/keysend", r = W(e)), q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: n,
            request_body: r,
            method: "POST"
        }));
    }, t.sendBoostagramToAlbyAccount = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/payments/keysend",
            request_body: {
                destination: "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3",
                custom_records: {
                    696969: e.account
                },
                amount: e.amount,
                memo: e.memo
            },
            method: "POST"
        }));
    }, t.createWebhookEndpoint = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/webhook_endpoints",
            request_body: e,
            method: "POST"
        }));
    }, t.deleteWebhookEndpoint = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/webhook_endpoints/" + e,
            method: "DELETE"
        }));
    }, t.getSwapInfo = function(e) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, e, {
            endpoint: "/swaps/info",
            method: "GET"
        }));
    }, t.createSwap = function(e, t) {
        return q(d({
            auth: this.auth
        }, this.defaultRequestOptions, t, {
            endpoint: "/swaps",
            method: "POST",
            request_body: e
        }));
    }, e;
}(), K = {
    __proto__: null,
    auth: F,
    types: N,
    utils: E,
    Client: L
};
if (68 !== new Uint8Array(new Uint32Array([
    287454020
]).buffer)[0]) throw new Error("Non little-endian hardware is not supported");
const B = /* @__PURE__ */ Array.from({
    length: 256
}, (e, t)=>t.toString(16).padStart(2, "0"));
function J(e) {
    if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
    let t = "";
    for(let n = 0; n < e.length; n++)t += B[e[n]];
    return t;
}
function H(e) {
    if ("string" != typeof e) throw new Error("hex string expected, got " + typeof e);
    const t = e.length;
    if (t % 2) throw new Error("padded hex string expected, got unpadded hex of length " + t);
    const n = new Uint8Array(t / 2);
    for(let t = 0; t < n.length; t++){
        const r = 2 * t, o = e.slice(r, r + 2), i = Number.parseInt(o, 16);
        if (Number.isNaN(i) || i < 0) throw new Error("Invalid byte sequence");
        n[t] = i;
    }
    return n;
}
var z = /*#__PURE__*/ function(e) {
    function t(t, n) {
        var r;
        return (r = e.call(this, t) || this).code = void 0, r.code = n, r;
    }
    return v(t, e), t;
}(/*#__PURE__*/ w(Error)), D = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), G = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), V = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), Y = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(V), X = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(V), Q = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), $ = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), Z = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), ee = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z), te = /*#__PURE__*/ function(e) {
    function t() {
        return e.apply(this, arguments) || this;
    }
    return v(t, e), t;
}(z);
function ne(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(e);
    }
    return n && n.then ? n.then(void 0, t) : n;
}
function re(e, t, n) {
    if (!e.s) {
        if (n instanceof oe) {
            if (!n.s) return void (n.o = re.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(re.bind(null, e, t), re.bind(null, e, 2));
        e.s = t, e.v = n;
        var r = e.o;
        r && r(e);
    }
}
var oe = /*#__PURE__*/ function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    re(r, 1, i(this.v));
                } catch (e) {
                    re(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? re(r, 1, t ? t(o) : o) : n ? re(r, 1, n(o)) : re(r, 2, o);
            } catch (e) {
                re(r, 2, e);
            }
        }, r;
    }, e;
}();
function ie(e) {
    return e instanceof oe && 1 & e.s;
}
var se = /*#__PURE__*/ function() {
    function c(n) {
        this.relay = void 0, this.relayUrl = void 0, this.secret = void 0, this.lud16 = void 0, this.walletPubkey = void 0, this.options = void 0, this._encryptionType = void 0, n && n.nostrWalletConnectUrl && (n = d({}, c.parseWalletConnectUrl(n.nostrWalletConnectUrl), n)), this.options = d({}, n || {}), this.relayUrl = this.options.relayUrl, this.relay = new (0, $jNQSf.Relay)(this.relayUrl), this.options.secret && (this.secret = this.options.secret.toLowerCase().startsWith("nsec") ? (0, $jNQSf.nip19).decode(this.options.secret).data : this.options.secret), this.lud16 = this.options.lud16, this.walletPubkey = this.options.walletPubkey.toLowerCase().startsWith("npub") ? (0, $jNQSf.nip19).decode(this.options.walletPubkey).data : this.options.walletPubkey, void 0 === globalThis.WebSocket && console.error("WebSocket is undefined. Make sure to `import websocket-polyfill` for nodejs environments");
    }
    c.parseWalletConnectUrl = function(e) {
        e = e.replace("nostrwalletconnect://", "http://").replace("nostr+walletconnect://", "http://").replace("nostrwalletconnect:", "http://").replace("nostr+walletconnect:", "http://");
        var t = new URL(e), n = t.searchParams.get("relay");
        if (!n) throw new Error("No relay URL found in connection string");
        var r = {
            walletPubkey: t.host,
            relayUrl: n
        }, o = t.searchParams.get("secret");
        o && (r.secret = o);
        var i = t.searchParams.get("lud16");
        return i && (r.lud16 = i), r;
    };
    var a = c.prototype;
    return a.getNostrWalletConnectUrl = function(e) {
        void 0 === e && (e = !0);
        var t = "nostr+walletconnect://" + this.walletPubkey + "?relay=" + this.relayUrl + "&pubkey=" + this.publicKey;
        return e && (t = t + "&secret=" + this.secret), this.lud16 && (t = t + "&lud16=" + this.lud16), t;
    }, a.getPublicKey = function() {
        return Promise.resolve(this.publicKey);
    }, a.signEvent = function(e) {
        if (!this.secret) throw new Error("Missing secret key");
        return Promise.resolve((0, $jNQSf.finalizeEvent)(e, H(this.secret)));
    }, a.getEventHash = function(e) {
        return (0, $jNQSf.getEventHash)(e);
    }, a.close = function() {
        return this.relay.close();
    }, a.encrypt = function(e, t) {
        try {
            var n, r = this;
            if (!r.secret) throw new Error("Missing secret");
            var s = function() {
                if ("nip04" === r.encryptionType) return Promise.resolve((0, $jNQSf.nip04).encrypt(r.secret, e, t)).then(function(e) {
                    n = e;
                });
                var s = (0, $jNQSf.nip44).getConversationKey(H(r.secret), e);
                n = (0, $jNQSf.nip44).encrypt(t, s);
            }();
            return Promise.resolve(s && s.then ? s.then(function() {
                return n;
            }) : n);
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.decrypt = function(e, t) {
        try {
            var n, r = this;
            if (!r.secret) throw new Error("Missing secret");
            var s = function() {
                if ("nip04" === r.encryptionType) return Promise.resolve((0, $jNQSf.nip04).decrypt(r.secret, e, t)).then(function(e) {
                    n = e;
                });
                var s = (0, $jNQSf.nip44).getConversationKey(H(r.secret), e);
                n = (0, $jNQSf.nip44).decrypt(t, s);
            }();
            return Promise.resolve(s && s.then ? s.then(function() {
                return n;
            }) : n);
        } catch (e) {
            return Promise.reject(e);
        }
    }, c.getAuthorizationUrl = function(e, t, n) {
        if (void 0 === t && (t = {}), e.indexOf("/#/") > -1) throw new Error("hash router paths not supported");
        var r = new URL(e);
        return t.name && r.searchParams.set("name", t.name), r.searchParams.set("pubkey", n), t.returnTo && r.searchParams.set("return_to", t.returnTo), t.budgetRenewal && r.searchParams.set("budget_renewal", t.budgetRenewal), t.expiresAt && r.searchParams.set("expires_at", Math.floor(t.expiresAt.getTime() / 1e3).toString()), t.maxAmount && r.searchParams.set("max_amount", t.maxAmount.toString()), t.requestMethods && r.searchParams.set("request_methods", t.requestMethods.join(" ")), t.notificationTypes && r.searchParams.set("notification_types", t.notificationTypes.join(" ")), t.isolated && r.searchParams.set("isolated", "true"), t.metadata && r.searchParams.set("metadata", JSON.stringify(t.metadata)), r;
    }, c.fromAuthorizationUrl = function(e, t, n) {
        void 0 === t && (t = {}), n = n || J((0, $jNQSf.generateSecretKey)()), t.name || (t.name = document.location.host);
        var r = this.getAuthorizationUrl(e, t, (0, $jNQSf.getPublicKey)(H(n))), o = window.outerHeight / 2 + window.screenY - 300, i = window.outerWidth / 2 + window.screenX - 200;
        return new Promise(function(e, t) {
            var s = window.open(r.toString(), document.title + " - Wallet Connect", "height=600,width=400,top=" + o + ",left=" + i);
            if (s) {
                var u = function o(i) {
                    var u = i.data;
                    u && "nwc:success" === u.type && i.origin === r.protocol + "//" + r.host && (u.relayUrl || t(new Error("no relayUrl in response")), u.walletPubkey || t(new Error("no walletPubkey in response")), e(new c({
                        relayUrl: u.relayUrl,
                        walletPubkey: u.walletPubkey,
                        secret: n,
                        lud16: u.lud16
                    })), clearInterval(a), window.removeEventListener("message", o), s && s.close());
                }, a = setInterval(function() {
                    s && s.closed && (clearInterval(a), window.removeEventListener("message", u), t(new Error("Popup closed")));
                }, 500);
                window.addEventListener("message", u);
            } else t(new Error("failed to execute window.open"));
        });
    }, a.getWalletServiceInfo = function() {
        try {
            var e = this;
            return Promise.resolve(e._checkConnected()).then(function() {
                return Promise.resolve(new Promise(function(t, n) {
                    var r = [], o = e.relay.subscribe([
                        {
                            kinds: [
                                13194
                            ],
                            limit: 1,
                            authors: [
                                e.walletPubkey
                            ]
                        }
                    ], {
                        eoseTimeout: 1e4
                    });
                    o.onevent = function(e) {
                        r.push(e);
                    }, o.oneose = function() {
                        o.close(), t(r);
                    };
                })).then(function(e) {
                    var t;
                    if (!e.length) throw new Error("no info event (kind 13194) returned from relay");
                    var n = e[0].content, r = e[0].tags.find(function(e) {
                        return "notifications" === e[0];
                    }), o = e[0].tags.find(function(e) {
                        return "v" === e[0];
                    }), i = e[0].tags.find(function(e) {
                        return "encryption" === e[0];
                    }), s = [
                        "nip04"
                    ];
                    return o && o[1].includes("1.0") && s.push("nip44_v2"), i && (s = i[1].split(" ")), {
                        encryptions: s,
                        capabilities: n.split(/[ |,]/g),
                        notifications: (null == r || null == (t = r[1]) ? void 0 : t.split(" ")) || []
                    };
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.getInfo = function() {
        try {
            var e = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(e.executeNip47Request("get_info", {}, function(e) {
                    return !!e.methods;
                }, {
                    replyTimeout: 1e4
                }));
            }, function(e) {
                throw console.error("Failed to request get_info", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.getBudget = function() {
        try {
            var e = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(e.executeNip47Request("get_budget", {}, function(e) {
                    return void 0 !== e;
                }, {
                    replyTimeout: 1e4
                }));
            }, function(e) {
                throw console.error("Failed to request get_budget", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.getBalance = function() {
        try {
            var e = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(e.executeNip47Request("get_balance", {}, function(e) {
                    return void 0 !== e.balance;
                }, {
                    replyTimeout: 1e4
                }));
            }, function(e) {
                throw console.error("Failed to request get_balance", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.payInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("pay_invoice", e, function(e) {
                    return !!e;
                }));
            }, function(e) {
                throw console.error("Failed to request pay_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.payKeysend = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("pay_keysend", e, function(e) {
                    return !!e.preimage;
                }));
            }, function(e) {
                throw console.error("Failed to request pay_keysend", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.signMessage = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("sign_message", e, function(t) {
                    return t.message === e.message && !!t.signature;
                }));
            }, function(e) {
                throw console.error("Failed to request sign_message", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.createConnection = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("create_connection", e, function(e) {
                    return !!e.wallet_pubkey;
                }));
            }, function(e) {
                throw console.error("Failed to request create_connection", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.multiPayInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeMultiNip47Request("multi_pay_invoice", e, e.invoices.length, function(e) {
                    return !!e.preimage;
                })).then(function(e) {
                    return {
                        invoices: e,
                        errors: []
                    };
                });
            }, function(e) {
                throw console.error("Failed to request multi_pay_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.multiPayKeysend = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeMultiNip47Request("multi_pay_keysend", e, e.keysends.length, function(e) {
                    return !!e.preimage;
                })).then(function(e) {
                    return {
                        keysends: e,
                        errors: []
                    };
                });
            }, function(e) {
                throw console.error("Failed to request multi_pay_keysend", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.makeInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                if (!e.amount) throw new Error("No amount specified");
                return Promise.resolve(t.executeNip47Request("make_invoice", e, function(e) {
                    return !!e.invoice;
                }));
            }, function(e) {
                throw console.error("Failed to request make_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.makeHoldInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                if (!e.amount) throw new Error("No amount specified");
                if (!e.payment_hash) throw new Error("No payment hash specified");
                return Promise.resolve(t.executeNip47Request("make_hold_invoice", e, function(e) {
                    return !!e.invoice;
                }));
            }, function(e) {
                throw console.error("Failed to request make_hold_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.settleHoldInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("settle_hold_invoice", e, function(e) {
                    return !!e;
                }));
            }, function(e) {
                throw console.error("Failed to request settle_hold_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.cancelHoldInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("cancel_hold_invoice", e, function(e) {
                    return !!e;
                }));
            }, function(e) {
                throw console.error("Failed to request cancel_hold_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.lookupInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("lookup_invoice", e, function(e) {
                    return !!e.invoice;
                }));
            }, function(e) {
                throw console.error("Failed to request lookup_invoice", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.listTransactions = function(e) {
        try {
            var t = this;
            return Promise.resolve(ne(function() {
                return Promise.resolve(t.executeNip47Request("list_transactions", e, function(e) {
                    return !!e.transactions;
                }, {
                    replyTimeout: 1e4
                }));
            }, function(e) {
                throw console.error("Failed to request list_transactions", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.subscribeNotifications = function(e, t) {
        try {
            var n, r, o, i = this, s = !0;
            return function() {
                try {
                    var u = function(e, t, n) {
                        for(var r;;){
                            var o = e();
                            if (ie(o) && (o = o.v), !o) return i;
                            if (o.then) {
                                r = 0;
                                break;
                            }
                            var i = n();
                            if (i && i.then) {
                                if (!ie(i)) {
                                    r = 1;
                                    break;
                                }
                                i = i.s;
                            }
                        }
                        var s = new oe, u = re.bind(null, s, 2);
                        return (0 === r ? o.then(a) : 1 === r ? i.then(c) : (void 0).then(function() {
                            (o = e()) ? o.then ? o.then(a).then(void 0, u) : a(o) : re(s, 1, i);
                        })).then(void 0, u), s;
                        function c(t) {
                            i = t;
                            do {
                                if (!(o = e()) || ie(o) && !o.v) return void re(s, 1, i);
                                if (o.then) return void o.then(a).then(void 0, u);
                                ie(i = n()) && (i = i.v);
                            }while (!i || !i.then);
                            i.then(c).then(void 0, u);
                        }
                        function a(e) {
                            e ? (i = n()) && i.then ? i.then(c).then(void 0, u) : c(i) : re(s, 1, i);
                        }
                    }(function() {
                        return !!s;
                    }, 0, function() {
                        function u() {
                            var e = function() {
                                if (s) return Promise.resolve(new Promise(function(e) {
                                    return setTimeout(e, 1e3);
                                })).then(function() {});
                            }();
                            if (e && e.then) return e.then(function() {});
                        }
                        var c = ne(function() {
                            return Promise.resolve(i._checkConnected()).then(function() {
                                return Promise.resolve(i._selectEncryptionType()).then(function() {
                                    return o = i.relay.subscribe([
                                        {
                                            kinds: [].concat("nip04" === i.encryptionType ? [
                                                23196
                                            ] : [
                                                23197
                                            ]),
                                            authors: [
                                                i.walletPubkey
                                            ],
                                            "#p": [
                                                i.publicKey
                                            ]
                                        }
                                    ], {}), console.info("subscribed to relay"), o.onevent = function(n) {
                                        try {
                                            return Promise.resolve(i.decrypt(i.walletPubkey, n.content)).then(function(n) {
                                                var r;
                                                try {
                                                    r = JSON.parse(n);
                                                } catch (e) {
                                                    return void console.error("Failed to parse decrypted event content", e);
                                                }
                                                r.notification ? (!t || t.indexOf(r.notification_type) > -1) && e(r) : console.error("No notification in response", r);
                                            });
                                        } catch (e) {
                                            return Promise.reject(e);
                                        }
                                    }, Promise.resolve(new Promise(function(e) {
                                        n = function() {
                                            e();
                                        }, i.relay.onclose = r = function() {
                                            console.info("relay disconnected"), null == n || n();
                                        };
                                    })).then(function() {
                                        void 0 !== r && (i.relay.onclose = null);
                                    });
                                });
                            });
                        }, function(e) {
                            console.error("error subscribing to notifications", e || "unknown relay error");
                        });
                        return c && c.then ? c.then(u) : u();
                    });
                    u && u.then && u.then(function() {});
                } catch (e) {
                    Promise.reject(e);
                }
            }(), Promise.resolve(function() {
                var e;
                s = !1, null == n || n(), null == (e = o) || e.close();
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.executeNip47Request = function(e, t, n, r) {
        try {
            var o = this;
            return Promise.resolve(o._checkConnected()).then(function() {
                return Promise.resolve(o._selectEncryptionType()).then(function() {
                    return new Promise(function(i, s) {
                        try {
                            return Promise.resolve(o.encrypt(o.walletPubkey, JSON.stringify({
                                method: e,
                                params: t
                            }))).then(function(e) {
                                var t = {
                                    kind: 23194,
                                    created_at: Math.floor(Date.now() / 1e3),
                                    tags: [
                                        [
                                            "p",
                                            o.walletPubkey
                                        ],
                                        [
                                            "v",
                                            "nip44_v2" === o.encryptionType ? "1.0" : "0.0"
                                        ],
                                        [
                                            "encryption",
                                            o.encryptionType
                                        ]
                                    ],
                                    content: e
                                };
                                return Promise.resolve(o.signEvent(t)).then(function(e) {
                                    var t = o.relay.subscribe([
                                        {
                                            kinds: [
                                                23195
                                            ],
                                            authors: [
                                                o.walletPubkey
                                            ],
                                            "#e": [
                                                e.id
                                            ]
                                        }
                                    ], {}), u = setTimeout(function() {
                                        t.close(), s(new X("reply timeout: event " + e.id, "INTERNAL"));
                                    }, (null == r ? void 0 : r.replyTimeout) || 6e4);
                                    t.onevent = function(e) {
                                        try {
                                            return clearTimeout(u), t.close(), Promise.resolve(o.decrypt(o.walletPubkey, e.content)).then(function(e) {
                                                var r, o, c;
                                                try {
                                                    r = JSON.parse(e);
                                                } catch (e) {
                                                    return clearTimeout(u), t.close(), void s(new $("failed to deserialize response", "INTERNAL"));
                                                }
                                                r.result ? n(r.result) ? i(r.result) : (clearTimeout(u), t.close(), s(new Z("response from NWC failed validation: " + JSON.stringify(r.result), "INTERNAL"))) : (clearTimeout(u), t.close(), s(new G((null == (o = r.error) ? void 0 : o.message) || "unknown Error", (null == (c = r.error) ? void 0 : c.code) || "INTERNAL")));
                                            });
                                        } catch (e) {
                                            return Promise.reject(e);
                                        }
                                    };
                                    var c = setTimeout(function() {
                                        t.close(), s(new Y("publish timeout: " + e.id, "INTERNAL"));
                                    }, (null == r ? void 0 : r.publishTimeout) || 5e3), a = ne(function() {
                                        return Promise.resolve(o.relay.publish(e)).then(function() {
                                            clearTimeout(c);
                                        });
                                    }, function(e) {
                                        clearTimeout(c), s(new Q("failed to publish: " + e, "INTERNAL"));
                                    });
                                    if (a && a.then) return a.then(function() {});
                                });
                            });
                        } catch (e) {
                            Promise.reject(e);
                        }
                    });
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, a.executeMultiNip47Request = function(e, t, n, r, o) {
        try {
            var i = this;
            return Promise.resolve(i._checkConnected()).then(function() {
                return Promise.resolve(i._selectEncryptionType()).then(function() {
                    var s = [];
                    return new Promise(function(u, c) {
                        try {
                            return Promise.resolve(i.encrypt(i.walletPubkey, JSON.stringify({
                                method: e,
                                params: t
                            }))).then(function(e) {
                                var t = {
                                    kind: 23194,
                                    created_at: Math.floor(Date.now() / 1e3),
                                    tags: [
                                        [
                                            "p",
                                            i.walletPubkey
                                        ],
                                        [
                                            "v",
                                            "nip44_v2" === i.encryptionType ? "1.0" : "0.0"
                                        ],
                                        [
                                            "encryption",
                                            i.encryptionType
                                        ]
                                    ],
                                    content: e
                                };
                                return Promise.resolve(i.signEvent(t)).then(function(e) {
                                    var t = i.relay.subscribe([
                                        {
                                            kinds: [
                                                23195
                                            ],
                                            authors: [
                                                i.walletPubkey
                                            ],
                                            "#e": [
                                                e.id
                                            ]
                                        }
                                    ], {}), a = setTimeout(function() {
                                        t.close(), c(new X("reply timeout: event " + e.id, "INTERNAL"));
                                    }, (null == o ? void 0 : o.replyTimeout) || 6e4);
                                    t.onevent = function(e) {
                                        try {
                                            return Promise.resolve(i.decrypt(i.walletPubkey, e.content)).then(function(o) {
                                                var i;
                                                try {
                                                    i = JSON.parse(o);
                                                } catch (e) {
                                                    clearTimeout(a), t.close(), c(new $("failed to deserialize response", "INTERNAL"));
                                                }
                                                if (i.result) {
                                                    var l;
                                                    if (!r(i.result)) return clearTimeout(a), t.close(), void c(new Z("Response from NWC failed validation: " + JSON.stringify(i.result), "INTERNAL"));
                                                    var h = null == (l = e.tags.find(function(e) {
                                                        return "d" === e[0];
                                                    })) ? void 0 : l[1];
                                                    if (void 0 === h) return clearTimeout(a), t.close(), void c(new Z("No d tag found in response event", "INTERNAL"));
                                                    s.push(d({}, i.result, {
                                                        dTag: h
                                                    })), s.length === n && (clearTimeout(a), t.close(), u(s));
                                                } else {
                                                    var f, v;
                                                    clearTimeout(a), t.close(), c(new ee(null == (f = i.error) ? void 0 : f.message, null == (v = i.error) ? void 0 : v.code));
                                                }
                                            });
                                        } catch (e) {
                                            return Promise.reject(e);
                                        }
                                    };
                                    var l = setTimeout(function() {
                                        t.close(), c(new Y("Publish timeout: " + e.id, "INTERNAL"));
                                    }, (null == o ? void 0 : o.publishTimeout) || 5e3), h = ne(function() {
                                        return Promise.resolve(i.relay.publish(e)).then(function() {
                                            clearTimeout(l);
                                        });
                                    }, function(e) {
                                        clearTimeout(l), c(new Q("Failed to publish: " + e, "INTERNAL"));
                                    });
                                    if (h && h.then) return h.then(function() {});
                                });
                            });
                        } catch (e) {
                            Promise.reject(e);
                        }
                    });
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, a._checkConnected = function() {
        try {
            var e = this;
            if (!e.secret) throw new Error("Missing secret key");
            if (!e.relayUrl) throw new Error("Missing relay url");
            return Promise.resolve(ne(function() {
                var t = function() {
                    if (!e.relay.connected) return Promise.resolve(e.relay.connect()).then(function() {});
                }();
                if (t && t.then) return t.then(function() {});
            }, function() {
                throw console.error("failed to connect to relay", e.relayUrl), new D("Failed to connect to " + e.relayUrl, "OTHER");
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, a._selectEncryptionType = function() {
        try {
            var e = this;
            return Promise.resolve(function() {
                if (!e._encryptionType) return Promise.resolve(e.getWalletServiceInfo()).then(function(t) {
                    var n = e._findPreferredEncryptionType(t.encryptions);
                    if (!n) throw new te("no compatible encryption or version found between wallet and client", "UNSUPPORTED_ENCRYPTION");
                    "nip04" === n && console.warn("NIP-04 encryption is about to be deprecated. Please upgrade your wallet service to use NIP-44 instead."), e._encryptionType = n;
                });
            }());
        } catch (e) {
            return Promise.reject(e);
        }
    }, a._findPreferredEncryptionType = function(e) {
        return e.includes("nip44_v2") ? "nip44_v2" : e.includes("nip04") ? "nip04" : null;
    }, f(c, [
        {
            key: "nostrWalletConnectUrl",
            get: function() {
                return this.getNostrWalletConnectUrl();
            }
        },
        {
            key: "connected",
            get: function() {
                return this.relay.connected;
            }
        },
        {
            key: "publicKey",
            get: function() {
                if (!this.secret) throw new Error("Missing secret key");
                return (0, $jNQSf.getPublicKey)(H(this.secret));
            }
        },
        {
            key: "encryptionType",
            get: function() {
                if (!this._encryptionType) throw new Error("Missing encryption or version");
                return this._encryptionType;
            }
        }
    ]), c;
}(), ue = {
    get_info: "getInfo",
    get_balance: "getBalance",
    make_invoice: "makeInvoice",
    pay_invoice: "sendPayment",
    pay_keysend: "payKeysend",
    lookup_invoice: "lookupInvoice",
    list_transactions: "listTransactions",
    multi_pay_invoice: "sendMultiPayment",
    multi_pay_keysend: "multiKeysend",
    sign_message: "signMessage"
}, ce = /*#__PURE__*/ function() {
    function e(e) {
        this._enabled = !1, this.client = void 0, this.subscribers = void 0, this.client = (null == e ? void 0 : e.client) || new se(e), this.subscribers = {};
    }
    e.fromAuthorizationUrl = function(t, n, r) {
        void 0 === n && (n = {});
        try {
            return Promise.resolve(se.fromAuthorizationUrl(t, n, r)).then(function(t) {
                return new e({
                    client: t
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };
    var t = e.prototype;
    return t.on = function(e, t) {
        this.subscribers[e] = t;
    }, t.notify = function(e, t) {
        var n = this.subscribers[e];
        n && n(t);
    }, t.getPublicKey = function() {
        return this.client.getPublicKey();
    }, t.signEvent = function(e) {
        return this.client.signEvent(e);
    }, t.enable = function() {
        try {
            return this._enabled = !0, Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.close = function() {
        return this.client.close();
    }, t.getInfo = function() {
        try {
            var e = this;
            return Promise.resolve(e.checkEnabled()).then(function() {
                var t = [
                    "lightning",
                    "nostr"
                ], n = "Alby JS SDK";
                return function(r, o) {
                    try {
                        var i = Promise.resolve(e.client.getInfo()).then(function(r) {
                            var o = {
                                methods: r.methods.map(function(e) {
                                    return ue[e];
                                }),
                                node: {
                                    alias: r.alias,
                                    pubkey: r.pubkey,
                                    color: r.color
                                },
                                supports: t,
                                version: n
                            };
                            return e.notify("getInfo", o), o;
                        });
                    } catch (e) {
                        return o(e);
                    }
                    return i && i.then ? i.then(void 0, o) : i;
                }(0, function(e) {
                    return console.error("Using minimal getInfo", e), {
                        methods: [
                            "sendPayment"
                        ],
                        node: {},
                        supports: t,
                        version: n
                    };
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.getBalance = function() {
        try {
            var e = this;
            return Promise.resolve(e.checkEnabled()).then(function() {
                return Promise.resolve(e.client.getBalance()).then(function(t) {
                    var n = {
                        balance: Math.floor(t.balance / 1e3),
                        currency: "sats"
                    };
                    return e.notify("getBalance", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.sendPayment = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.payInvoice({
                    invoice: e
                })).then(function(e) {
                    var n = {
                        preimage: e.preimage
                    };
                    return t.notify("sendPayment", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.sendPaymentAsync = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return t.client.payInvoice({
                    invoice: e
                }), t.notify("sendPaymentAsync", {}), {};
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.keysend = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.payKeysend(le(e))).then(function(e) {
                    var n = {
                        preimage: e.preimage
                    };
                    return t.notify("keysend", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.signMessage = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.signMessage({
                    message: e
                })).then(function(e) {
                    var n = {
                        message: e.message,
                        signature: e.signature
                    };
                    return t.notify("keysend", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.makeInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                var n, r = "object" == typeof e ? e : void 0, o = +(null != (n = null == r ? void 0 : r.amount) ? n : e);
                if (!o) throw new Error("No amount specified");
                return Promise.resolve(t.client.makeInvoice({
                    amount: 1e3 * o,
                    description: null == r ? void 0 : r.defaultMemo
                })).then(function(e) {
                    var n = {
                        paymentRequest: e.invoice
                    };
                    return t.notify("makeInvoice", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.lookupInvoice = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.lookupInvoice({
                    invoice: e.paymentRequest,
                    payment_hash: e.paymentHash
                })).then(function(e) {
                    var n = {
                        preimage: e.preimage,
                        paymentRequest: e.invoice,
                        paid: !!e.settled_at
                    };
                    return t.notify("lookupInvoice", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.listTransactions = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.listTransactions(e)).then(function(e) {
                    var n = {
                        transactions: e.transactions.map(ae)
                    };
                    return t.notify("listTransactions", n), n;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.sendMultiPayment = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.multiPayInvoice({
                    invoices: e.map(function(e, t) {
                        return {
                            invoice: e,
                            id: t.toString()
                        };
                    })
                })).then(function(n) {
                    var r = {
                        payments: n.invoices.map(function(t) {
                            var n = e[parseInt(t.dTag)];
                            if (!n) throw new Error("Could not find paymentRequest matching response d tag");
                            return {
                                paymentRequest: n,
                                preimage: t.preimage
                            };
                        }),
                        errors: []
                    };
                    return t.notify("sendMultiPayment", r), r;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.multiKeysend = function(e) {
        try {
            var t = this;
            return Promise.resolve(t.checkEnabled()).then(function() {
                return Promise.resolve(t.client.multiPayKeysend({
                    keysends: e.map(function(e, t) {
                        return d({}, le(e), {
                            id: t.toString()
                        });
                    })
                })).then(function(n) {
                    var r = {
                        keysends: n.keysends.map(function(t) {
                            var n = e[parseInt(t.dTag)];
                            if (!n) throw new Error("Could not find keysend matching response d tag");
                            return {
                                keysend: n,
                                preimage: t.preimage
                            };
                        }),
                        errors: []
                    };
                    return t.notify("multiKeysend", r), r;
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.lnurl = function(e) {
        throw new Error("Method not implemented.");
    }, t.request = function(e, t) {
        throw new Error("Method not implemented.");
    }, t.verifyMessage = function(e, t) {
        throw new Error("Method not implemented.");
    }, t.checkEnabled = function() {
        try {
            if (!this._enabled) throw new Error("please call enable() and await the promise before calling this function");
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }, f(e, [
        {
            key: "options",
            get: function() {
                return this.client.options;
            }
        }
    ]), e;
}();
function ae(e) {
    return d({}, e, {
        amount: Math.floor(e.amount / 1e3),
        fees_paid: e.fees_paid ? Math.floor(e.fees_paid / 1e3) : 0
    });
}
function le(e) {
    return {
        amount: 1e3 * +e.amount,
        pubkey: e.destination,
        tlv_records: e.customRecords ? Object.entries(e.customRecords).map(function(e) {
            return {
                type: parseInt(e[0]),
                value: I((new TextEncoder).encode(e[1]))
            };
        }) : []
    };
}
function he(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(!0, e);
    }
    return n && n.then ? n.then(t.bind(null, !1), t.bind(null, !0)) : t(!1, n);
}
function fe(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(e);
    }
    return n && n.then ? n.then(void 0, t) : n;
}
var de = {
    __proto__: null,
    NostrWebLNProvider: ce,
    NWC: ce,
    OauthWeblnProvider: /*#__PURE__*/ function() {
        function e(e) {
            this.client = void 0, this.auth = void 0, this.oauth = void 0, this.subscribers = void 0, this.isExecuting = void 0, this.auth = e.auth, this.client = new L(e.auth), this.oauth = !0, this.subscribers = {}, this.isExecuting = !1;
        }
        var t = e.prototype;
        return t.on = function(e, t) {
            this.subscribers[e] = t;
        }, t.notify = function(e, t) {
            var n = this.subscribers[e];
            n && n(t);
        }, t.enable = function() {
            try {
                var e, t = this;
                return t.isExecuting ? Promise.resolve() : null != (e = t.auth.token) && e.access_token ? Promise.resolve({
                    enabled: !0
                }) : Promise.resolve(function() {
                    if ("undefined" == typeof window || void 0 === window.document) throw new Error("Missing access token");
                    var e = he(function() {
                        return t.isExecuting = !0, Promise.resolve(t.openAuthorization()).then(function() {});
                    }, function(e, n) {
                        if (t.isExecuting = !1, e) throw n;
                        return n;
                    });
                    if (e && e.then) return e.then(function() {});
                }());
            } catch (e) {
                return Promise.reject(e);
            }
        }, t.sendPayment = function(e) {
            try {
                var t = this;
                return t.isExecuting ? Promise.resolve() : Promise.resolve(he(function() {
                    return fe(function() {
                        return t.isExecuting = !0, Promise.resolve(t.client.sendPayment({
                            invoice: e
                        })).then(function(e) {
                            return t.notify("sendPayment", e), {
                                preimage: e.payment_preimage
                            };
                        });
                    }, function(e) {
                        var t = "Unknown Error";
                        throw e instanceof Error && (t = e.message), new Error(t);
                    });
                }, function(e, n) {
                    if (t.isExecuting = !1, e) throw n;
                    return n;
                }));
            } catch (e) {
                return Promise.reject(e);
            }
        }, t.keysend = function(e) {
            try {
                var t = this;
                return t.isExecuting ? Promise.resolve() : Promise.resolve(he(function() {
                    return fe(function() {
                        return t.isExecuting = !0, Promise.resolve(t.client.keysend(e)).then(function(e) {
                            return t.notify("keysend", e), {
                                preimage: e.payment_preimage
                            };
                        });
                    }, function(e) {
                        var t = "Unknown Error";
                        throw e instanceof Error && (t = e.message), new Error(t);
                    });
                }, function(e, n) {
                    if (t.isExecuting = !1, e) throw n;
                    return n;
                }));
            } catch (e) {
                return Promise.reject(e);
            }
        }, t.getInfo = function() {
            try {
                return Promise.resolve({
                    alias: "Alby"
                });
            } catch (e) {
                return Promise.reject(e);
            }
        }, t.makeInvoice = function(e) {
            try {
                var t = this;
                return t.isExecuting ? Promise.resolve() : Promise.resolve(he(function() {
                    return fe(function() {
                        return t.isExecuting = !0, Promise.resolve(t.client.createInvoice({
                            amount: parseInt(e.amount.toString()),
                            description: e.defaultMemo
                        })).then(function(e) {
                            return t.notify("makeInvoice", e), {
                                paymentRequest: e.payment_request
                            };
                        });
                    }, function(e) {
                        var t = "Unknown Error";
                        throw e instanceof Error && (t = e.message), new Error(t);
                    });
                }, function(e, n) {
                    if (t.isExecuting = !1, e) throw n;
                    return n;
                }));
            } catch (e) {
                return Promise.reject(e);
            }
        }, t.openAuthorization = function() {
            try {
                var e = this, t = window.outerHeight / 2 + window.screenY - 350, n = window.outerWidth / 2 + window.screenX - 300;
                return Promise.resolve(e.auth.generateAuthURL({
                    code_challenge_method: "S256"
                })).then(function(r) {
                    return new Promise(function(o, i) {
                        var s = window.open(r, document.title + " - WebLN enable", "height=700,width=600,top=" + t + ",left=" + n), u = !1;
                        window.addEventListener("message", function(t) {
                            try {
                                var n = t.data, r = function() {
                                    if (n && "alby:oauth:success" === n.type && t.origin === document.location.protocol + "//" + document.location.host && !u) {
                                        u = !0, console.info("Processing OAuth code response");
                                        var r = n.payload.code, c = fe(function() {
                                            return Promise.resolve(e.auth.requestAccessToken(r)).then(function() {
                                                e.client = new L(e.auth), s && s.close(), e.notify("enable"), o({
                                                    enabled: !0
                                                });
                                            });
                                        }, function(e) {
                                            console.error(e), i({
                                                enabled: !1
                                            });
                                        });
                                        if (c && c.then) return c.then(function() {});
                                    }
                                }();
                                return Promise.resolve(r && r.then ? r.then(function() {}) : void 0);
                            } catch (e) {
                                return Promise.reject(e);
                            }
                        });
                    });
                });
            } catch (e) {
                return Promise.reject(e);
            }
        }, e;
    }()
};
function ve(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(e);
    }
    return n && n.then ? n.then(void 0, t) : n;
}
function pe(e, t, n) {
    if (!e.s) {
        if (n instanceof me) {
            if (!n.s) return void (n.o = pe.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(pe.bind(null, e, t), pe.bind(null, e, 2));
        e.s = t, e.v = n;
        var r = e.o;
        r && r(e);
    }
}
var me = /*#__PURE__*/ function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    pe(r, 1, i(this.v));
                } catch (e) {
                    pe(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? pe(r, 1, t ? t(o) : o) : n ? pe(r, 1, n(o)) : pe(r, 2, o);
            } catch (e) {
                pe(r, 2, e);
            }
        }, r;
    }, e;
}();
function ye(e) {
    return e instanceof me && 1 & e.s;
}
var Pe = /*#__PURE__*/ function() {
    function t(t) {
        if (this.options = void 0, this.appSecretKey = void 0, this.relay = void 0, this.appSecretKey = t.appSecretKey || J((0, $jNQSf.generateSecretKey)()), this.options = d({}, t, {
            appPubkey: (0, $jNQSf.getPublicKey)(H(this.appSecretKey))
        }), !this.options.relayUrl) throw new Error("Missing relay url");
        if (!this.options.requestMethods) throw new Error("Missing request methods");
        this.relay = new (0, $jNQSf.Relay)(this.options.relayUrl), void 0 === globalThis.WebSocket && console.error("WebSocket is undefined. Make sure to `import websocket-polyfill` for nodejs environments");
    }
    var n = t.prototype;
    return n.getConnectionUri = function(e) {
        void 0 === e && (e = "");
        var t = new URLSearchParams(d({
            relay: this.options.relayUrl,
            request_methods: this.options.requestMethods.join(" ")
        }, this.options.name ? {
            name: this.options.name
        } : {}, this.options.icon ? {
            icon: this.options.icon
        } : {}, this.options.returnTo ? {
            return_to: this.options.returnTo
        } : {}, this.options.notificationTypes ? {
            notification_types: this.options.notificationTypes.join(" ")
        } : {}, this.options.maxAmount ? {
            max_amount: this.options.maxAmount.toString()
        } : {}, this.options.budgetRenewal ? {
            budget_renewal: this.options.budgetRenewal
        } : {}, this.options.expiresAt ? {
            expires_at: this.options.expiresAt.toString()
        } : {}, this.options.isolated ? {
            isolated: this.options.isolated.toString()
        } : {}, this.options.metadata ? {
            metadata: JSON.stringify(this.options.metadata)
        } : {}));
        return "nostr+walletauth" + (e ? "+" + e : "") + "://" + this.options.appPubkey + "?" + t.toString().replace(/\+/g, "%20");
    }, t.parseWalletAuthUrl = function(e) {
        var t, n;
        if (!e.startsWith("nostr+walletauth")) throw new Error("Unexpected scheme. Should be nostr+walletauth:// or nostr+walletauth+specificapp://");
        var r = e.indexOf(":");
        (e = e.substring(r + 1)).startsWith("//") && (e = e.substring(2)), e = "http://" + e;
        var o = new URL(e), i = o.host;
        if (64 !== (null == i ? void 0 : i.length)) throw new Error("Incorrect app pubkey found in auth string");
        var s = o.searchParams.get("relay");
        if (!s) throw new Error("No relay URL found in auth string");
        var u = null == (t = o.searchParams.get("request_methods")) ? void 0 : t.split(" ");
        if (null == u || !u.length) throw new Error("No request methods found in auth string");
        var c = null == (n = o.searchParams.get("notification_types")) ? void 0 : n.split(" "), a = o.searchParams.get("max_amount"), l = o.searchParams.get("expires_at"), h = o.searchParams.get("metadata");
        return {
            name: o.searchParams.get("name") || void 0,
            icon: o.searchParams.get("icon") || void 0,
            returnTo: o.searchParams.get("return_to") || void 0,
            relayUrl: s,
            appPubkey: i,
            requestMethods: u,
            notificationTypes: c,
            budgetRenewal: o.searchParams.get("budget_renewal"),
            expiresAt: l ? parseInt(l) : void 0,
            maxAmount: a ? parseInt(a) : void 0,
            isolated: "true" === o.searchParams.get("isolated"),
            metadata: h ? JSON.parse(h) : void 0
        };
    }, n.subscribe = function(e) {
        try {
            var t, n, r = this, o = !0;
            return function() {
                try {
                    var i = function(e, t, n) {
                        for(var r;;){
                            var o = e();
                            if (ye(o) && (o = o.v), !o) return i;
                            if (o.then) {
                                r = 0;
                                break;
                            }
                            var i = n();
                            if (i && i.then) {
                                if (!ye(i)) {
                                    r = 1;
                                    break;
                                }
                                i = i.s;
                            }
                        }
                        var s = new me, u = pe.bind(null, s, 2);
                        return (0 === r ? o.then(a) : 1 === r ? i.then(c) : (void 0).then(function() {
                            (o = e()) ? o.then ? o.then(a).then(void 0, u) : a(o) : pe(s, 1, i);
                        })).then(void 0, u), s;
                        function c(t) {
                            i = t;
                            do {
                                if (!(o = e()) || ye(o) && !o.v) return void pe(s, 1, i);
                                if (o.then) return void o.then(a).then(void 0, u);
                                ye(i = n()) && (i = i.v);
                            }while (!i || !i.then);
                            i.then(c).then(void 0, u);
                        }
                        function a(e) {
                            e ? (i = n()) && i.then ? i.then(c).then(void 0, u) : c(i) : pe(s, 1, i);
                        }
                    }(function() {
                        return !!o;
                    }, 0, function() {
                        function i() {
                            var e = function() {
                                if (o) return Promise.resolve(new Promise(function(e) {
                                    return setTimeout(e, 1e3);
                                })).then(function() {});
                            }();
                            if (e && e.then) return e.then(function() {});
                        }
                        var s = ve(function() {
                            return Promise.resolve(r._checkConnected()).then(function() {
                                var o = r.relay.subscribe([
                                    {
                                        kinds: [
                                            13194
                                        ],
                                        "#p": [
                                            r.options.appPubkey
                                        ]
                                    }
                                ], {});
                                return console.info("subscribed to relay"), o.onevent = function(t) {
                                    try {
                                        var n = function() {
                                            e.onSuccess(i), o.close(), r.relay.close();
                                        }, i = new se({
                                            relayUrl: r.options.relayUrl,
                                            secret: r.appSecretKey,
                                            walletPubkey: t.pubkey
                                        }), s = ve(function() {
                                            return Promise.resolve(i.getInfo()).then(function(e) {
                                                i.options.lud16 = e.lud16, i.lud16 = e.lud16;
                                            });
                                        }, function(e) {
                                            console.error("failed to fetch get_info", e);
                                        });
                                        return Promise.resolve(s && s.then ? s.then(n) : n());
                                    } catch (e) {
                                        return Promise.reject(e);
                                    }
                                }, Promise.resolve(new Promise(function(e) {
                                    t = function() {
                                        e();
                                    }, r.relay.onclose = n = function() {
                                        console.info("relay disconnected"), null == t || t();
                                    };
                                })).then(function() {
                                    void 0 !== n && (r.relay.onclose = null);
                                });
                            });
                        }, function(e) {
                            console.error("error subscribing to info event", e || "unknown relay error");
                        });
                        return s && s.then ? s.then(i) : i();
                    });
                    i && i.then && i.then(function() {});
                } catch (e) {
                    Promise.reject(e);
                }
            }(), Promise.resolve({
                unsub: function() {
                    o = !1, null == t || t();
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, n._checkConnected = function() {
        try {
            var e = this;
            if (!e.appSecretKey) throw new Error("Missing secret key");
            if (!e.options.relayUrl) throw new Error("Missing relay url");
            return Promise.resolve(ve(function() {
                var t = function() {
                    if (!e.relay.connected) return Promise.resolve(e.relay.connect()).then(function() {});
                }();
                if (t && t.then) return t.then(function() {});
            }, function() {
                throw console.error("failed to connect to relay", e.options.relayUrl), new D("Failed to connect to " + e.options.relayUrl, "OTHER");
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, f(t, [
        {
            key: "connectionUri",
            get: function() {
                return this.getConnectionUri();
            }
        }
    ]), t;
}();
function we(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(e);
    }
    return n && n.then ? n.then(void 0, t) : n;
}
function ge(e, t, n) {
    if (!e.s) {
        if (n instanceof be) {
            if (!n.s) return void (n.o = ge.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(ge.bind(null, e, t), ge.bind(null, e, 2));
        e.s = t, e.v = n;
        var r = e.o;
        r && r(e);
    }
}
var be = /*#__PURE__*/ function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    ge(r, 1, i(this.v));
                } catch (e) {
                    ge(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? ge(r, 1, t ? t(o) : o) : n ? ge(r, 1, n(o)) : ge(r, 2, o);
            } catch (e) {
                ge(r, 2, e);
            }
        }, r;
    }, e;
}();
function _e(e) {
    return e instanceof be && 1 & e.s;
}
var ke = /*#__PURE__*/ function() {
    function t(t) {
        this.relay = void 0, this.relayUrl = void 0, this.relayUrl = t.relayUrl, this.relay = new (0, $jNQSf.Relay)(this.relayUrl), void 0 === globalThis.WebSocket && console.error("WebSocket is undefined. Make sure to `import websocket-polyfill` for nodejs environments");
    }
    var r = t.prototype;
    return r.publishWalletServiceInfoEvent = function(e, t, n) {
        try {
            var r = this;
            return Promise.resolve(we(function() {
                return Promise.resolve(r._checkConnected()).then(function() {
                    var o = {
                        kind: 13194,
                        created_at: Math.floor(Date.now() / 1e3),
                        tags: [
                            [
                                "encryption",
                                "nip04 nip44_v2"
                            ],
                            [
                                "notifications",
                                n.join(" ")
                            ]
                        ],
                        content: t.join(" ")
                    };
                    return Promise.resolve(r.signEvent(o, e)).then(function(e) {
                        return Promise.resolve(r.relay.publish(e)).then(function() {});
                    });
                });
            }, function(e) {
                throw console.error("failed to publish wallet service info event", e), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, r.subscribe = function(e, t) {
        try {
            var n, r, o, i = this, s = !0;
            return function() {
                try {
                    var u = function(e, t, n) {
                        for(var r;;){
                            var o = e();
                            if (_e(o) && (o = o.v), !o) return i;
                            if (o.then) {
                                r = 0;
                                break;
                            }
                            var i = n();
                            if (i && i.then) {
                                if (!_e(i)) {
                                    r = 1;
                                    break;
                                }
                                i = i.s;
                            }
                        }
                        var s = new be, u = ge.bind(null, s, 2);
                        return (0 === r ? o.then(a) : 1 === r ? i.then(c) : (void 0).then(function() {
                            (o = e()) ? o.then ? o.then(a).then(void 0, u) : a(o) : ge(s, 1, i);
                        })).then(void 0, u), s;
                        function c(t) {
                            i = t;
                            do {
                                if (!(o = e()) || _e(o) && !o.v) return void ge(s, 1, i);
                                if (o.then) return void o.then(a).then(void 0, u);
                                _e(i = n()) && (i = i.v);
                            }while (!i || !i.then);
                            i.then(c).then(void 0, u);
                        }
                        function a(e) {
                            e ? (i = n()) && i.then ? i.then(c).then(void 0, u) : c(i) : ge(s, 1, i);
                        }
                    }(function() {
                        return !!s;
                    }, 0, function() {
                        function u() {
                            var e = function() {
                                if (s) return Promise.resolve(new Promise(function(e) {
                                    return setTimeout(e, 1e3);
                                })).then(function() {});
                            }();
                            if (e && e.then) return e.then(function() {});
                        }
                        var c = we(function() {
                            return console.info("checking connection to relay"), Promise.resolve(i._checkConnected()).then(function() {
                                return console.info("subscribing to relay"), o = i.relay.subscribe([
                                    {
                                        kinds: [
                                            23194
                                        ],
                                        authors: [
                                            e.clientPubkey
                                        ],
                                        "#p": [
                                            e.walletPubkey
                                        ]
                                    }
                                ], {}), console.info("subscribed to relay"), o.onevent = function(n) {
                                    try {
                                        var r = we(function() {
                                            var r, o = (null == (r = n.tags.find(function(e) {
                                                return "encryption" === e[0];
                                            })) ? void 0 : r[1]) || "nip04";
                                            return Promise.resolve(i.decrypt(e, n.content, o)).then(function(r) {
                                                var s, u = JSON.parse(r);
                                                switch(u.method){
                                                    case "get_info":
                                                        s = null == t.getInfo ? void 0 : t.getInfo();
                                                        break;
                                                    case "make_invoice":
                                                        s = null == t.makeInvoice ? void 0 : t.makeInvoice(u.params);
                                                        break;
                                                    case "pay_invoice":
                                                        s = null == t.payInvoice ? void 0 : t.payInvoice(u.params);
                                                        break;
                                                    case "pay_keysend":
                                                        s = null == t.payKeysend ? void 0 : t.payKeysend(u.params);
                                                        break;
                                                    case "get_balance":
                                                        s = null == t.getBalance ? void 0 : t.getBalance();
                                                        break;
                                                    case "lookup_invoice":
                                                        s = null == t.lookupInvoice ? void 0 : t.lookupInvoice(u.params);
                                                        break;
                                                    case "list_transactions":
                                                        s = null == t.listTransactions ? void 0 : t.listTransactions(u.params);
                                                        break;
                                                    case "sign_message":
                                                        s = null == t.signMessage ? void 0 : t.signMessage(u.params);
                                                }
                                                return Promise.resolve(s).then(function(t) {
                                                    t || (console.warn("received unsupported method", u.method), t = {
                                                        error: {
                                                            code: "NOT_IMPLEMENTED",
                                                            message: "This method is not supported by the wallet service"
                                                        },
                                                        result: void 0
                                                    });
                                                    var r = [
                                                        [
                                                            "e",
                                                            n.id
                                                        ]
                                                    ], s = Math.floor(Date.now() / 1e3);
                                                    return Promise.resolve(i.encrypt(e, JSON.stringify(d({
                                                        result_type: u.method
                                                    }, t)), o)).then(function(t) {
                                                        return Promise.resolve(i.signEvent({
                                                            kind: 23195,
                                                            created_at: s,
                                                            tags: r,
                                                            content: t
                                                        }, e.walletSecret)).then(function(e) {
                                                            return Promise.resolve(i.relay.publish(e)).then(function() {});
                                                        });
                                                    });
                                                });
                                            });
                                        }, function(e) {
                                            console.error("Failed to parse decrypted event content", e);
                                        });
                                        return Promise.resolve(r && r.then ? r.then(function() {}) : void 0);
                                    } catch (e) {
                                        return Promise.reject(e);
                                    }
                                }, Promise.resolve(new Promise(function(e) {
                                    n = function() {
                                        e();
                                    }, i.relay.onclose = r = function() {
                                        console.error("relay disconnected"), null == n || n();
                                    };
                                })).then(function() {
                                    void 0 !== r && (i.relay.onclose = null);
                                });
                            });
                        }, function(e) {
                            console.error("error subscribing to requests", e || "unknown relay error");
                        });
                        return c && c.then ? c.then(u) : u();
                    });
                    u && u.then && u.then(function() {});
                } catch (e) {
                    Promise.reject(e);
                }
            }(), Promise.resolve(function() {
                var e;
                s = !1, null == n || n(), null == (e = o) || e.close();
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, r.signEvent = function(e, t) {
        return Promise.resolve((0, $jNQSf.finalizeEvent)(e, H(t)));
    }, r.close = function() {
        return this.relay.close();
    }, r.encrypt = function(e, t, n) {
        try {
            var r, s = function() {
                if ("nip04" === n) return Promise.resolve((0, $jNQSf.nip04).encrypt(e.walletSecret, e.clientPubkey, t)).then(function(e) {
                    r = e;
                });
                var s = (0, $jNQSf.nip44).getConversationKey(H(e.walletSecret), e.clientPubkey);
                r = (0, $jNQSf.nip44).encrypt(t, s);
            }();
            return Promise.resolve(s && s.then ? s.then(function() {
                return r;
            }) : r);
        } catch (e) {
            return Promise.reject(e);
        }
    }, r.decrypt = function(e, t, n) {
        try {
            var r, s = function() {
                if ("nip04" === n) return Promise.resolve((0, $jNQSf.nip04).decrypt(e.walletSecret, e.clientPubkey, t)).then(function(e) {
                    r = e;
                });
                var s = (0, $jNQSf.nip44).getConversationKey(H(e.walletSecret), e.clientPubkey);
                r = (0, $jNQSf.nip44).decrypt(t, s);
            }();
            return Promise.resolve(s && s.then ? s.then(function() {
                return r;
            }) : r);
        } catch (e) {
            return Promise.reject(e);
        }
    }, r._checkConnected = function() {
        try {
            var e = this;
            if (!e.relayUrl) throw new Error("Missing relay url");
            return Promise.resolve(we(function() {
                var t = function() {
                    if (!e.relay.connected) return Promise.resolve(e.relay.connect()).then(function() {});
                }();
                if (t && t.then) return t.then(function() {});
            }, function() {
                throw console.error("failed to connect to relay", e.relayUrl), new D("Failed to connect to " + e.relayUrl, "OTHER");
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, f(t, [
        {
            key: "connected",
            get: function() {
                return this.relay.connected;
            }
        }
    ]), t;
}(), Ee = {
    __proto__: null,
    Nip47Error: z,
    Nip47NetworkError: D,
    Nip47WalletError: G,
    Nip47TimeoutError: V,
    Nip47PublishTimeoutError: Y,
    Nip47ReplyTimeoutError: X,
    Nip47PublishError: Q,
    Nip47ResponseDecodingError: $,
    Nip47ResponseValidationError: Z,
    Nip47UnexpectedResponseError: ee,
    Nip47UnsupportedEncryptionError: te,
    NWCClient: se,
    NWAClient: Pe,
    NWCWalletServiceKeyPair: function(e, t) {
        if (this.walletSecret = void 0, this.walletPubkey = void 0, this.clientPubkey = void 0, this.walletSecret = e, this.clientPubkey = t, !this.walletSecret) throw new Error("Missing wallet secret key");
        if (!this.clientPubkey) throw new Error("Missing client pubkey");
        this.walletPubkey = (0, $jNQSf.getPublicKey)(H(this.walletSecret));
    },
    NWCWalletService: ke
};
function Te(e, t, n) {
    if (!e.s) {
        if (n instanceof Ne) {
            if (!n.s) return void (n.o = Te.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(Te.bind(null, e, t), Te.bind(null, e, 2));
        e.s = t, e.v = n;
        var r = e.o;
        r && r(e);
    }
}
var Ne = /*#__PURE__*/ function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    Te(r, 1, i(this.v));
                } catch (e) {
                    Te(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? Te(r, 1, t ? t(o) : o) : n ? Te(r, 1, n(o)) : Te(r, 2, o);
            } catch (e) {
                Te(r, 2, e);
            }
        }, r;
    }, e;
}();
function je(e) {
    return e instanceof Ne && 1 & e.s;
}
var qe = /*#__PURE__*/ function() {
    function e(e, t) {
        this.transaction = void 0, this.invoice = void 0, this._nwcClient = void 0, this._unsubscribeFunc = void 0, this._timeoutFunc = void 0, this._timeoutId = void 0, this.transaction = t, this.invoice = new (0, $jOQqz.Invoice)({
            pr: t.invoice
        }), this._nwcClient = e;
    }
    var t = e.prototype;
    return t.onPaid = function(e) {
        var t = this;
        return function() {
            try {
                var n, r = function() {
                    var r = function(n) {
                        null == t._unsubscribeFunc || t._unsubscribeFunc(), e(n);
                    }, o = function(e) {
                        return function() {
                            t._timeoutFunc = void 0, clearTimeout(t._timeoutId), e();
                        };
                    }, i = function() {
                        if (n) return Promise.resolve(t._nwcClient.subscribeNotifications(function(e) {
                            e.notification.payment_hash === t.transaction.payment_hash && r(e.notification);
                        }, [
                            "payment_received"
                        ])).then(function(e) {
                            t._unsubscribeFunc = o(e);
                        });
                        console.warn("current connection does not support notifications, falling back to polling"), t._unsubscribeFunc = o(t._onPaidPollingFallback(r));
                    }();
                    if (i && i.then) return i.then(function() {});
                }, o = function(e, r) {
                    try {
                        var o = Promise.resolve(t._nwcClient.getInfo()).then(function(e) {
                            var t;
                            n = null == (t = e.notifications) ? void 0 : t.includes("payment_received");
                        });
                    } catch (e) {
                        return r();
                    }
                    return o && o.then ? o.then(void 0, r) : o;
                }(0, function() {
                    console.error("failed to fetch info, falling back to polling");
                });
                o && o.then ? o.then(r) : r();
            } catch (e) {
                Promise.reject(e);
            }
        }(), this;
    }, t.onTimeout = function(e, t) {
        var n = this;
        return this._timeoutFunc = function() {
            null == n._unsubscribeFunc || n._unsubscribeFunc(), t();
        }, this._timeoutId = setTimeout(function() {
            null == n._timeoutFunc || n._timeoutFunc();
        }, 1e3 * e), this;
    }, t.unsubscribe = function() {
        var e;
        null == (e = this._unsubscribeFunc) || e.call(this);
    }, t._onPaidPollingFallback = function(e) {
        var t = this, n = !0;
        return function(r) {
            try {
                var o = function(e, t, n) {
                    for(var r;;){
                        var o = e();
                        if (je(o) && (o = o.v), !o) return i;
                        if (o.then) {
                            r = 0;
                            break;
                        }
                        var i = n();
                        if (i && i.then) {
                            if (!je(i)) {
                                r = 1;
                                break;
                            }
                            i = i.s;
                        }
                    }
                    var s = new Ne, u = Te.bind(null, s, 2);
                    return (0 === r ? o.then(a) : 1 === r ? i.then(c) : (void 0).then(function() {
                        (o = e()) ? o.then ? o.then(a).then(void 0, u) : a(o) : Te(s, 1, i);
                    })).then(void 0, u), s;
                    function c(t) {
                        i = t;
                        do {
                            if (!(o = e()) || je(o) && !o.v) return void Te(s, 1, i);
                            if (o.then) return void o.then(a).then(void 0, u);
                            je(i = n()) && (i = i.v);
                        }while (!i || !i.then);
                        i.then(c).then(void 0, u);
                    }
                    function a(e) {
                        e ? (i = n()) && i.then ? i.then(c).then(void 0, u) : c(i) : Te(s, 1, i);
                    }
                }(function() {
                    return !r && !!n;
                }, 0, function() {
                    return Promise.resolve(t._nwcClient.lookupInvoice({
                        payment_hash: t.transaction.payment_hash
                    })).then(function(t) {
                        return t.settled_at && t.preimage ? (e(t), n = !1, void (r = 1)) : Promise.resolve(new Promise(function(e) {
                            return setTimeout(e, 3e3);
                        })).then(function() {});
                    });
                });
                o && o.then && o.then(function() {});
            } catch (e) {
                Promise.reject(e);
            }
        }(), function() {
            n = !1;
        };
    }, e;
}(), Re = function(e) {
    try {
        return "number" == typeof e ? Promise.resolve({
            satoshi: e,
            millisat: 1e3 * e
        }) : Promise.resolve(Promise.resolve(e.satoshi)).then(function(e) {
            return {
                satoshi: e,
                millisat: 1e3 * e
            };
        });
    } catch (e) {
        return Promise.reject(e);
    }
}, Se = function(e) {
    return {
        satoshi: e
    };
}, Oe = /*#__PURE__*/ function() {
    function e(e) {
        this.nwcClient = void 0, this.nwcClient = "string" == typeof e ? new se({
            nostrWalletConnectUrl: e
        }) : e instanceof se ? e : new se(e);
    }
    var t = e.prototype;
    return t.pay = function(e, t, n) {
        try {
            var r = function(t) {
                function r(e) {
                    return Promise.resolve(o.nwcClient.payInvoice(d({}, n || {}, {
                        invoice: i,
                        amount: null == t ? void 0 : t.millisat
                    }))).then(function(e) {
                        return d({}, e, {
                            invoice: new (0, $jOQqz.Invoice)({
                                pr: i
                            })
                        });
                    });
                }
                var s = function() {
                    if (i.indexOf("@") > -1) {
                        if (!t) throw new Error("Amount must be provided when paying to a lightning address");
                        var r = new (0, $jOQqz.LightningAddress)(e);
                        return Promise.resolve(r.fetch()).then(function() {
                            var e, o;
                            return Promise.resolve(r.requestInvoice({
                                satoshi: t.satoshi,
                                comment: null == n || null == (e = n.metadata) ? void 0 : e.comment,
                                payerdata: null == n || null == (o = n.metadata) ? void 0 : o.payer_data
                            })).then(function(e) {
                                i = e.paymentRequest;
                            });
                        });
                    }
                }();
                return s && s.then ? s.then(r) : r();
            }, o = this, i = e;
            return Promise.resolve(t ? Promise.resolve(Re(t)).then(r) : r(void 0));
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.requestPayment = function(e, t) {
        try {
            var n = this;
            return Promise.resolve(Re(e)).then(function(e) {
                return Promise.resolve(n.nwcClient.makeInvoice(d({}, t || {}, {
                    amount: e.millisat
                }))).then(function(e) {
                    return new qe(n.nwcClient, e);
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.close = function() {
        this.nwcClient.close();
    }, e;
}(), Ie = function(e, t) {
    this.satoshi = void 0, this.satoshi = (0, $jOQqz.fiat).getSatoshiValue({
        amount: e,
        currency: t
    });
}, xe = function(e) {
    return new Ie(e, "USD");
}, Ae = function(e) {
    return new Ie(e, "EUR");
}, Ue = function(e) {
    return new Ie(e, "JPY");
}, Ce = function(e) {
    return new Ie(e, "GBP");
}, Me = function(e) {
    return new Ie(e, "CHF");
};

});
parcelRegister("jNQSf", function(module, exports) {

$parcel$export(module.exports, "getEventHash", () => $e6ab9b966de1f36a$export$11a838ad4e557e0e);
$parcel$export(module.exports, "generateSecretKey", () => $e6ab9b966de1f36a$export$16ca411381fc81c8);
$parcel$export(module.exports, "getPublicKey", () => $e6ab9b966de1f36a$export$889def73691f9837);
$parcel$export(module.exports, "finalizeEvent", () => $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20);
$parcel$export(module.exports, "Relay", () => $e6ab9b966de1f36a$export$325be0d991c73dc2);
$parcel$export(module.exports, "nip19", () => $e6ab9b966de1f36a$export$10660ae21dbef115);
$parcel$export(module.exports, "nip04", () => $e6ab9b966de1f36a$export$4793e42c2cc9b120);
$parcel$export(module.exports, "nip44", () => $e6ab9b966de1f36a$export$7f3384dd63301b54);

var $kCY3A = parcelRequire("kCY3A");

var $jxo4c = parcelRequire("jxo4c");

var $YRaTA = parcelRequire("YRaTA");

var $25Yxt = parcelRequire("25Yxt");

var $71Bn2 = parcelRequire("71Bn2");

var $iBX14 = parcelRequire("iBX14");

var $8Wj9n = parcelRequire("8Wj9n");

var $dnDHV = parcelRequire("dnDHV");

var $cgbWU = parcelRequire("cgbWU");
var $e6ab9b966de1f36a$var$__defProp = Object.defineProperty;
var $e6ab9b966de1f36a$var$__export = (target, all)=>{
    for(var name in all)$e6ab9b966de1f36a$var$__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// core.ts
var $e6ab9b966de1f36a$export$31a1b605a7b8e0bf = Symbol("verified");
var $e6ab9b966de1f36a$var$isRecord = (obj)=>obj instanceof Object;
function $e6ab9b966de1f36a$export$d08d852dd562b1ce(event) {
    if (!$e6ab9b966de1f36a$var$isRecord(event)) return false;
    if (typeof event.kind !== "number") return false;
    if (typeof event.content !== "string") return false;
    if (typeof event.created_at !== "number") return false;
    if (typeof event.pubkey !== "string") return false;
    if (!event.pubkey.match(/^[a-f0-9]{64}$/)) return false;
    if (!Array.isArray(event.tags)) return false;
    for(let i2 = 0; i2 < event.tags.length; i2++){
        let tag = event.tags[i2];
        if (!Array.isArray(tag)) return false;
        for(let j = 0; j < tag.length; j++){
            if (typeof tag[j] !== "string") return false;
        }
    }
    return true;
}
function $e6ab9b966de1f36a$export$d425309ca6befbaf(events) {
    return events.sort((a, b)=>{
        if (a.created_at !== b.created_at) return b.created_at - a.created_at;
        return a.id.localeCompare(b.id);
    });
}
// utils.ts
var $e6ab9b966de1f36a$export$eab97d15b1788b8d = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$eab97d15b1788b8d, {
    Queue: ()=>$e6ab9b966de1f36a$var$Queue,
    QueueNode: ()=>$e6ab9b966de1f36a$var$QueueNode,
    binarySearch: ()=>$e6ab9b966de1f36a$var$binarySearch,
    bytesToHex: ()=>(0, $jxo4c.bytesToHex),
    hexToBytes: ()=>(0, $jxo4c.hexToBytes),
    insertEventIntoAscendingList: ()=>$e6ab9b966de1f36a$var$insertEventIntoAscendingList,
    insertEventIntoDescendingList: ()=>$e6ab9b966de1f36a$var$insertEventIntoDescendingList,
    normalizeURL: ()=>$e6ab9b966de1f36a$var$normalizeURL,
    utf8Decoder: ()=>$e6ab9b966de1f36a$var$utf8Decoder,
    utf8Encoder: ()=>$e6ab9b966de1f36a$var$utf8Encoder
});
var $e6ab9b966de1f36a$var$utf8Decoder = new TextDecoder("utf-8");
var $e6ab9b966de1f36a$var$utf8Encoder = new TextEncoder();
function $e6ab9b966de1f36a$var$normalizeURL(url) {
    try {
        if (url.indexOf("://") === -1) url = "wss://" + url;
        let p = new URL(url);
        p.pathname = p.pathname.replace(/\/+/g, "/");
        if (p.pathname.endsWith("/")) p.pathname = p.pathname.slice(0, -1);
        if (p.port === "80" && p.protocol === "ws:" || p.port === "443" && p.protocol === "wss:") p.port = "";
        p.searchParams.sort();
        p.hash = "";
        return p.toString();
    } catch (e) {
        throw new Error(`Invalid URL: ${url}`);
    }
}
function $e6ab9b966de1f36a$var$insertEventIntoDescendingList(sortedArray, event) {
    const [idx, found] = $e6ab9b966de1f36a$var$binarySearch(sortedArray, (b)=>{
        if (event.id === b.id) return 0;
        if (event.created_at === b.created_at) return -1;
        return b.created_at - event.created_at;
    });
    if (!found) sortedArray.splice(idx, 0, event);
    return sortedArray;
}
function $e6ab9b966de1f36a$var$insertEventIntoAscendingList(sortedArray, event) {
    const [idx, found] = $e6ab9b966de1f36a$var$binarySearch(sortedArray, (b)=>{
        if (event.id === b.id) return 0;
        if (event.created_at === b.created_at) return -1;
        return event.created_at - b.created_at;
    });
    if (!found) sortedArray.splice(idx, 0, event);
    return sortedArray;
}
function $e6ab9b966de1f36a$var$binarySearch(arr, compare) {
    let start = 0;
    let end = arr.length - 1;
    while(start <= end){
        const mid = Math.floor((start + end) / 2);
        const cmp = compare(arr[mid]);
        if (cmp === 0) return [
            mid,
            true
        ];
        if (cmp < 0) end = mid - 1;
        else start = mid + 1;
    }
    return [
        start,
        false
    ];
}
var $e6ab9b966de1f36a$var$QueueNode = class {
    value;
    next = null;
    prev = null;
    constructor(message){
        this.value = message;
    }
};
var $e6ab9b966de1f36a$var$Queue = class {
    first;
    last;
    constructor(){
        this.first = null;
        this.last = null;
    }
    enqueue(value) {
        const newNode = new $e6ab9b966de1f36a$var$QueueNode(value);
        if (!this.last) {
            this.first = newNode;
            this.last = newNode;
        } else if (this.last === this.first) {
            this.last = newNode;
            this.last.prev = this.first;
            this.first.next = newNode;
        } else {
            newNode.prev = this.last;
            this.last.next = newNode;
            this.last = newNode;
        }
        return true;
    }
    dequeue() {
        if (!this.first) return null;
        if (this.first === this.last) {
            const target2 = this.first;
            this.first = null;
            this.last = null;
            return target2.value;
        }
        const target = this.first;
        this.first = target.next;
        if (this.first) this.first.prev = null;
        return target.value;
    }
};
// pure.ts
var $e6ab9b966de1f36a$var$JS = class {
    generateSecretKey() {
        return (0, $kCY3A.schnorr).utils.randomPrivateKey();
    }
    getPublicKey(secretKey) {
        return (0, $jxo4c.bytesToHex)((0, $kCY3A.schnorr).getPublicKey(secretKey));
    }
    finalizeEvent(t, secretKey) {
        const event = t;
        event.pubkey = (0, $jxo4c.bytesToHex)((0, $kCY3A.schnorr).getPublicKey(secretKey));
        event.id = $e6ab9b966de1f36a$export$11a838ad4e557e0e(event);
        event.sig = (0, $jxo4c.bytesToHex)((0, $kCY3A.schnorr).sign($e6ab9b966de1f36a$export$11a838ad4e557e0e(event), secretKey));
        event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] = true;
        return event;
    }
    verifyEvent(event) {
        if (typeof event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] === "boolean") return event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf];
        const hash = $e6ab9b966de1f36a$export$11a838ad4e557e0e(event);
        if (hash !== event.id) {
            event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] = false;
            return false;
        }
        try {
            const valid = (0, $kCY3A.schnorr).verify(event.sig, hash, event.pubkey);
            event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] = valid;
            return valid;
        } catch (err) {
            event[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] = false;
            return false;
        }
    }
};
function $e6ab9b966de1f36a$export$d32d86987f616a9e(evt) {
    if (!$e6ab9b966de1f36a$export$d08d852dd562b1ce(evt)) throw new Error("can't serialize event with wrong or missing properties");
    return JSON.stringify([
        0,
        evt.pubkey,
        evt.created_at,
        evt.kind,
        evt.tags,
        evt.content
    ]);
}
function $e6ab9b966de1f36a$export$11a838ad4e557e0e(event) {
    let eventHash = (0, $YRaTA.sha256)($e6ab9b966de1f36a$var$utf8Encoder.encode($e6ab9b966de1f36a$export$d32d86987f616a9e(event)));
    return (0, $jxo4c.bytesToHex)(eventHash);
}
var $e6ab9b966de1f36a$var$i = new $e6ab9b966de1f36a$var$JS();
var $e6ab9b966de1f36a$export$16ca411381fc81c8 = $e6ab9b966de1f36a$var$i.generateSecretKey;
var $e6ab9b966de1f36a$export$889def73691f9837 = $e6ab9b966de1f36a$var$i.getPublicKey;
var $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20 = $e6ab9b966de1f36a$var$i.finalizeEvent;
var $e6ab9b966de1f36a$export$909d658b5069e986 = $e6ab9b966de1f36a$var$i.verifyEvent;
// kinds.ts
var $e6ab9b966de1f36a$export$9ef7793a01f1f377 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$9ef7793a01f1f377, {
    Application: ()=>$e6ab9b966de1f36a$var$Application,
    BadgeAward: ()=>$e6ab9b966de1f36a$var$BadgeAward,
    BadgeDefinition: ()=>$e6ab9b966de1f36a$var$BadgeDefinition,
    BlockedRelaysList: ()=>$e6ab9b966de1f36a$var$BlockedRelaysList,
    BookmarkList: ()=>$e6ab9b966de1f36a$var$BookmarkList,
    Bookmarksets: ()=>$e6ab9b966de1f36a$var$Bookmarksets,
    Calendar: ()=>$e6ab9b966de1f36a$var$Calendar,
    CalendarEventRSVP: ()=>$e6ab9b966de1f36a$var$CalendarEventRSVP,
    ChannelCreation: ()=>$e6ab9b966de1f36a$var$ChannelCreation,
    ChannelHideMessage: ()=>$e6ab9b966de1f36a$var$ChannelHideMessage,
    ChannelMessage: ()=>$e6ab9b966de1f36a$var$ChannelMessage,
    ChannelMetadata: ()=>$e6ab9b966de1f36a$var$ChannelMetadata,
    ChannelMuteUser: ()=>$e6ab9b966de1f36a$var$ChannelMuteUser,
    ClassifiedListing: ()=>$e6ab9b966de1f36a$var$ClassifiedListing,
    ClientAuth: ()=>$e6ab9b966de1f36a$var$ClientAuth,
    CommunitiesList: ()=>$e6ab9b966de1f36a$var$CommunitiesList,
    CommunityDefinition: ()=>$e6ab9b966de1f36a$var$CommunityDefinition,
    CommunityPostApproval: ()=>$e6ab9b966de1f36a$var$CommunityPostApproval,
    Contacts: ()=>$e6ab9b966de1f36a$var$Contacts,
    CreateOrUpdateProduct: ()=>$e6ab9b966de1f36a$var$CreateOrUpdateProduct,
    CreateOrUpdateStall: ()=>$e6ab9b966de1f36a$var$CreateOrUpdateStall,
    Curationsets: ()=>$e6ab9b966de1f36a$var$Curationsets,
    Date: ()=>$e6ab9b966de1f36a$var$Date2,
    DirectMessageRelaysList: ()=>$e6ab9b966de1f36a$var$DirectMessageRelaysList,
    DraftClassifiedListing: ()=>$e6ab9b966de1f36a$var$DraftClassifiedListing,
    DraftLong: ()=>$e6ab9b966de1f36a$var$DraftLong,
    Emojisets: ()=>$e6ab9b966de1f36a$var$Emojisets,
    EncryptedDirectMessage: ()=>$e6ab9b966de1f36a$var$EncryptedDirectMessage,
    EventDeletion: ()=>$e6ab9b966de1f36a$var$EventDeletion,
    FileMetadata: ()=>$e6ab9b966de1f36a$var$FileMetadata,
    FileServerPreference: ()=>$e6ab9b966de1f36a$var$FileServerPreference,
    Followsets: ()=>$e6ab9b966de1f36a$var$Followsets,
    GenericRepost: ()=>$e6ab9b966de1f36a$var$GenericRepost,
    Genericlists: ()=>$e6ab9b966de1f36a$var$Genericlists,
    GiftWrap: ()=>$e6ab9b966de1f36a$var$GiftWrap,
    HTTPAuth: ()=>$e6ab9b966de1f36a$var$HTTPAuth,
    Handlerinformation: ()=>$e6ab9b966de1f36a$var$Handlerinformation,
    Handlerrecommendation: ()=>$e6ab9b966de1f36a$var$Handlerrecommendation,
    Highlights: ()=>$e6ab9b966de1f36a$var$Highlights,
    InterestsList: ()=>$e6ab9b966de1f36a$var$InterestsList,
    Interestsets: ()=>$e6ab9b966de1f36a$var$Interestsets,
    JobFeedback: ()=>$e6ab9b966de1f36a$var$JobFeedback,
    JobRequest: ()=>$e6ab9b966de1f36a$var$JobRequest,
    JobResult: ()=>$e6ab9b966de1f36a$var$JobResult,
    Label: ()=>$e6ab9b966de1f36a$var$Label,
    LightningPubRPC: ()=>$e6ab9b966de1f36a$var$LightningPubRPC,
    LiveChatMessage: ()=>$e6ab9b966de1f36a$var$LiveChatMessage,
    LiveEvent: ()=>$e6ab9b966de1f36a$var$LiveEvent,
    LongFormArticle: ()=>$e6ab9b966de1f36a$var$LongFormArticle,
    Metadata: ()=>$e6ab9b966de1f36a$var$Metadata,
    Mutelist: ()=>$e6ab9b966de1f36a$var$Mutelist,
    NWCWalletInfo: ()=>$e6ab9b966de1f36a$var$NWCWalletInfo,
    NWCWalletRequest: ()=>$e6ab9b966de1f36a$var$NWCWalletRequest,
    NWCWalletResponse: ()=>$e6ab9b966de1f36a$var$NWCWalletResponse,
    NostrConnect: ()=>$e6ab9b966de1f36a$var$NostrConnect,
    OpenTimestamps: ()=>$e6ab9b966de1f36a$var$OpenTimestamps,
    Pinlist: ()=>$e6ab9b966de1f36a$var$Pinlist,
    PrivateDirectMessage: ()=>$e6ab9b966de1f36a$var$PrivateDirectMessage,
    ProblemTracker: ()=>$e6ab9b966de1f36a$var$ProblemTracker,
    ProfileBadges: ()=>$e6ab9b966de1f36a$var$ProfileBadges,
    PublicChatsList: ()=>$e6ab9b966de1f36a$var$PublicChatsList,
    Reaction: ()=>$e6ab9b966de1f36a$var$Reaction,
    RecommendRelay: ()=>$e6ab9b966de1f36a$var$RecommendRelay,
    RelayList: ()=>$e6ab9b966de1f36a$var$RelayList,
    Relaysets: ()=>$e6ab9b966de1f36a$var$Relaysets,
    Report: ()=>$e6ab9b966de1f36a$var$Report,
    Reporting: ()=>$e6ab9b966de1f36a$var$Reporting,
    Repost: ()=>$e6ab9b966de1f36a$var$Repost,
    Seal: ()=>$e6ab9b966de1f36a$var$Seal,
    SearchRelaysList: ()=>$e6ab9b966de1f36a$var$SearchRelaysList,
    ShortTextNote: ()=>$e6ab9b966de1f36a$var$ShortTextNote,
    Time: ()=>$e6ab9b966de1f36a$var$Time,
    UserEmojiList: ()=>$e6ab9b966de1f36a$var$UserEmojiList,
    UserStatuses: ()=>$e6ab9b966de1f36a$var$UserStatuses,
    Zap: ()=>$e6ab9b966de1f36a$var$Zap,
    ZapGoal: ()=>$e6ab9b966de1f36a$var$ZapGoal,
    ZapRequest: ()=>$e6ab9b966de1f36a$var$ZapRequest,
    classifyKind: ()=>$e6ab9b966de1f36a$var$classifyKind,
    isAddressableKind: ()=>$e6ab9b966de1f36a$var$isAddressableKind,
    isEphemeralKind: ()=>$e6ab9b966de1f36a$var$isEphemeralKind,
    isKind: ()=>$e6ab9b966de1f36a$var$isKind,
    isRegularKind: ()=>$e6ab9b966de1f36a$var$isRegularKind,
    isReplaceableKind: ()=>$e6ab9b966de1f36a$var$isReplaceableKind
});
function $e6ab9b966de1f36a$var$isRegularKind(kind) {
    return 1e3 <= kind && kind < 1e4 || [
        1,
        2,
        4,
        5,
        6,
        7,
        8,
        16,
        40,
        41,
        42,
        43,
        44
    ].includes(kind);
}
function $e6ab9b966de1f36a$var$isReplaceableKind(kind) {
    return [
        0,
        3
    ].includes(kind) || 1e4 <= kind && kind < 2e4;
}
function $e6ab9b966de1f36a$var$isEphemeralKind(kind) {
    return 2e4 <= kind && kind < 3e4;
}
function $e6ab9b966de1f36a$var$isAddressableKind(kind) {
    return 3e4 <= kind && kind < 4e4;
}
function $e6ab9b966de1f36a$var$classifyKind(kind) {
    if ($e6ab9b966de1f36a$var$isRegularKind(kind)) return "regular";
    if ($e6ab9b966de1f36a$var$isReplaceableKind(kind)) return "replaceable";
    if ($e6ab9b966de1f36a$var$isEphemeralKind(kind)) return "ephemeral";
    if ($e6ab9b966de1f36a$var$isAddressableKind(kind)) return "parameterized";
    return "unknown";
}
function $e6ab9b966de1f36a$var$isKind(event, kind) {
    const kindAsArray = kind instanceof Array ? kind : [
        kind
    ];
    return $e6ab9b966de1f36a$export$d08d852dd562b1ce(event) && kindAsArray.includes(event.kind) || false;
}
var $e6ab9b966de1f36a$var$Metadata = 0;
var $e6ab9b966de1f36a$var$ShortTextNote = 1;
var $e6ab9b966de1f36a$var$RecommendRelay = 2;
var $e6ab9b966de1f36a$var$Contacts = 3;
var $e6ab9b966de1f36a$var$EncryptedDirectMessage = 4;
var $e6ab9b966de1f36a$var$EventDeletion = 5;
var $e6ab9b966de1f36a$var$Repost = 6;
var $e6ab9b966de1f36a$var$Reaction = 7;
var $e6ab9b966de1f36a$var$BadgeAward = 8;
var $e6ab9b966de1f36a$var$Seal = 13;
var $e6ab9b966de1f36a$var$PrivateDirectMessage = 14;
var $e6ab9b966de1f36a$var$GenericRepost = 16;
var $e6ab9b966de1f36a$var$ChannelCreation = 40;
var $e6ab9b966de1f36a$var$ChannelMetadata = 41;
var $e6ab9b966de1f36a$var$ChannelMessage = 42;
var $e6ab9b966de1f36a$var$ChannelHideMessage = 43;
var $e6ab9b966de1f36a$var$ChannelMuteUser = 44;
var $e6ab9b966de1f36a$var$OpenTimestamps = 1040;
var $e6ab9b966de1f36a$var$GiftWrap = 1059;
var $e6ab9b966de1f36a$var$FileMetadata = 1063;
var $e6ab9b966de1f36a$var$LiveChatMessage = 1311;
var $e6ab9b966de1f36a$var$ProblemTracker = 1971;
var $e6ab9b966de1f36a$var$Report = 1984;
var $e6ab9b966de1f36a$var$Reporting = 1984;
var $e6ab9b966de1f36a$var$Label = 1985;
var $e6ab9b966de1f36a$var$CommunityPostApproval = 4550;
var $e6ab9b966de1f36a$var$JobRequest = 5999;
var $e6ab9b966de1f36a$var$JobResult = 6999;
var $e6ab9b966de1f36a$var$JobFeedback = 7e3;
var $e6ab9b966de1f36a$var$ZapGoal = 9041;
var $e6ab9b966de1f36a$var$ZapRequest = 9734;
var $e6ab9b966de1f36a$var$Zap = 9735;
var $e6ab9b966de1f36a$var$Highlights = 9802;
var $e6ab9b966de1f36a$var$Mutelist = 1e4;
var $e6ab9b966de1f36a$var$Pinlist = 10001;
var $e6ab9b966de1f36a$var$RelayList = 10002;
var $e6ab9b966de1f36a$var$BookmarkList = 10003;
var $e6ab9b966de1f36a$var$CommunitiesList = 10004;
var $e6ab9b966de1f36a$var$PublicChatsList = 10005;
var $e6ab9b966de1f36a$var$BlockedRelaysList = 10006;
var $e6ab9b966de1f36a$var$SearchRelaysList = 10007;
var $e6ab9b966de1f36a$var$InterestsList = 10015;
var $e6ab9b966de1f36a$var$UserEmojiList = 10030;
var $e6ab9b966de1f36a$var$DirectMessageRelaysList = 10050;
var $e6ab9b966de1f36a$var$FileServerPreference = 10096;
var $e6ab9b966de1f36a$var$NWCWalletInfo = 13194;
var $e6ab9b966de1f36a$var$LightningPubRPC = 21e3;
var $e6ab9b966de1f36a$var$ClientAuth = 22242;
var $e6ab9b966de1f36a$var$NWCWalletRequest = 23194;
var $e6ab9b966de1f36a$var$NWCWalletResponse = 23195;
var $e6ab9b966de1f36a$var$NostrConnect = 24133;
var $e6ab9b966de1f36a$var$HTTPAuth = 27235;
var $e6ab9b966de1f36a$var$Followsets = 3e4;
var $e6ab9b966de1f36a$var$Genericlists = 30001;
var $e6ab9b966de1f36a$var$Relaysets = 30002;
var $e6ab9b966de1f36a$var$Bookmarksets = 30003;
var $e6ab9b966de1f36a$var$Curationsets = 30004;
var $e6ab9b966de1f36a$var$ProfileBadges = 30008;
var $e6ab9b966de1f36a$var$BadgeDefinition = 30009;
var $e6ab9b966de1f36a$var$Interestsets = 30015;
var $e6ab9b966de1f36a$var$CreateOrUpdateStall = 30017;
var $e6ab9b966de1f36a$var$CreateOrUpdateProduct = 30018;
var $e6ab9b966de1f36a$var$LongFormArticle = 30023;
var $e6ab9b966de1f36a$var$DraftLong = 30024;
var $e6ab9b966de1f36a$var$Emojisets = 30030;
var $e6ab9b966de1f36a$var$Application = 30078;
var $e6ab9b966de1f36a$var$LiveEvent = 30311;
var $e6ab9b966de1f36a$var$UserStatuses = 30315;
var $e6ab9b966de1f36a$var$ClassifiedListing = 30402;
var $e6ab9b966de1f36a$var$DraftClassifiedListing = 30403;
var $e6ab9b966de1f36a$var$Date2 = 31922;
var $e6ab9b966de1f36a$var$Time = 31923;
var $e6ab9b966de1f36a$var$Calendar = 31924;
var $e6ab9b966de1f36a$var$CalendarEventRSVP = 31925;
var $e6ab9b966de1f36a$var$Handlerrecommendation = 31989;
var $e6ab9b966de1f36a$var$Handlerinformation = 31990;
var $e6ab9b966de1f36a$var$CommunityDefinition = 34550;
// filter.ts
function $e6ab9b966de1f36a$export$c6f8482e724e56c5(filter, event) {
    if (filter.ids && filter.ids.indexOf(event.id) === -1) return false;
    if (filter.kinds && filter.kinds.indexOf(event.kind) === -1) return false;
    if (filter.authors && filter.authors.indexOf(event.pubkey) === -1) return false;
    for(let f in filter)if (f[0] === "#") {
        let tagName = f.slice(1);
        let values = filter[`#${tagName}`];
        if (values && !event.tags.find(([t, v])=>t === f.slice(1) && values.indexOf(v) !== -1)) return false;
    }
    if (filter.since && event.created_at < filter.since) return false;
    if (filter.until && event.created_at > filter.until) return false;
    return true;
}
function $e6ab9b966de1f36a$export$4bbf3f173cb9a4eb(filters, event) {
    for(let i2 = 0; i2 < filters.length; i2++){
        if ($e6ab9b966de1f36a$export$c6f8482e724e56c5(filters[i2], event)) return true;
    }
    return false;
}
function $e6ab9b966de1f36a$export$aa787302ec03bf2a(...filters) {
    let result = {};
    for(let i2 = 0; i2 < filters.length; i2++){
        let filter = filters[i2];
        Object.entries(filter).forEach(([property, values])=>{
            if (property === "kinds" || property === "ids" || property === "authors" || property[0] === "#") {
                result[property] = result[property] || [];
                for(let v = 0; v < values.length; v++){
                    let value = values[v];
                    if (!result[property].includes(value)) result[property].push(value);
                }
            }
        });
        if (filter.limit && (!result.limit || filter.limit > result.limit)) result.limit = filter.limit;
        if (filter.until && (!result.until || filter.until > result.until)) result.until = filter.until;
        if (filter.since && (!result.since || filter.since < result.since)) result.since = filter.since;
    }
    return result;
}
function $e6ab9b966de1f36a$export$74b8728d117779ba(filter) {
    if (filter.ids && !filter.ids.length) return 0;
    if (filter.kinds && !filter.kinds.length) return 0;
    if (filter.authors && !filter.authors.length) return 0;
    for (const [key, value] of Object.entries(filter)){
        if (key[0] === "#" && Array.isArray(value) && !value.length) return 0;
    }
    return Math.min(Math.max(0, filter.limit ?? Infinity), filter.ids?.length ?? Infinity, filter.authors?.length && filter.kinds?.every((kind)=>$e6ab9b966de1f36a$var$isReplaceableKind(kind)) ? filter.authors.length * filter.kinds.length : Infinity, filter.authors?.length && filter.kinds?.every((kind)=>$e6ab9b966de1f36a$var$isAddressableKind(kind)) && filter["#d"]?.length ? filter.authors.length * filter.kinds.length * filter["#d"].length : Infinity);
}
// fakejson.ts
var $e6ab9b966de1f36a$export$7712baafc4f0e06e = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$7712baafc4f0e06e, {
    getHex64: ()=>$e6ab9b966de1f36a$var$getHex64,
    getInt: ()=>$e6ab9b966de1f36a$var$getInt,
    getSubscriptionId: ()=>$e6ab9b966de1f36a$var$getSubscriptionId,
    matchEventId: ()=>$e6ab9b966de1f36a$var$matchEventId,
    matchEventKind: ()=>$e6ab9b966de1f36a$var$matchEventKind,
    matchEventPubkey: ()=>$e6ab9b966de1f36a$var$matchEventPubkey
});
function $e6ab9b966de1f36a$var$getHex64(json, field) {
    let len = field.length + 3;
    let idx = json.indexOf(`"${field}":`) + len;
    let s = json.slice(idx).indexOf(`"`) + idx + 1;
    return json.slice(s, s + 64);
}
function $e6ab9b966de1f36a$var$getInt(json, field) {
    let len = field.length;
    let idx = json.indexOf(`"${field}":`) + len + 3;
    let sliced = json.slice(idx);
    let end = Math.min(sliced.indexOf(","), sliced.indexOf("}"));
    return parseInt(sliced.slice(0, end), 10);
}
function $e6ab9b966de1f36a$var$getSubscriptionId(json) {
    let idx = json.slice(0, 22).indexOf(`"EVENT"`);
    if (idx === -1) return null;
    let pstart = json.slice(idx + 7 + 1).indexOf(`"`);
    if (pstart === -1) return null;
    let start = idx + 7 + 1 + pstart;
    let pend = json.slice(start + 1, 80).indexOf(`"`);
    if (pend === -1) return null;
    let end = start + 1 + pend;
    return json.slice(start + 1, end);
}
function $e6ab9b966de1f36a$var$matchEventId(json, id) {
    return id === $e6ab9b966de1f36a$var$getHex64(json, "id");
}
function $e6ab9b966de1f36a$var$matchEventPubkey(json, pubkey) {
    return pubkey === $e6ab9b966de1f36a$var$getHex64(json, "pubkey");
}
function $e6ab9b966de1f36a$var$matchEventKind(json, kind) {
    return kind === $e6ab9b966de1f36a$var$getInt(json, "kind");
}
// nip42.ts
var $e6ab9b966de1f36a$export$900cb248cdec72b = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$900cb248cdec72b, {
    makeAuthEvent: ()=>$e6ab9b966de1f36a$var$makeAuthEvent
});
function $e6ab9b966de1f36a$var$makeAuthEvent(relayURL, challenge) {
    return {
        kind: $e6ab9b966de1f36a$var$ClientAuth,
        created_at: Math.floor(Date.now() / 1e3),
        tags: [
            [
                "relay",
                relayURL
            ],
            [
                "challenge",
                challenge
            ]
        ],
        content: ""
    };
}
// helpers.ts
async function $e6ab9b966de1f36a$var$yieldThread() {
    return new Promise((resolve)=>{
        const ch = new MessageChannel();
        const handler = ()=>{
            ch.port1.removeEventListener("message", handler);
            resolve();
        };
        ch.port1.addEventListener("message", handler);
        ch.port2.postMessage(0);
        ch.port1.start();
    });
}
var $e6ab9b966de1f36a$var$alwaysTrue = (t)=>{
    t[$e6ab9b966de1f36a$export$31a1b605a7b8e0bf] = true;
    return true;
};
// abstract-relay.ts
var $e6ab9b966de1f36a$var$SendingOnClosedConnection = class extends Error {
    constructor(message, relay){
        super(`Tried to send message '${message} on a closed connection to ${relay}.`);
        this.name = "SendingOnClosedConnection";
    }
};
var $e6ab9b966de1f36a$var$AbstractRelay = class {
    url;
    _connected = false;
    onclose = null;
    onnotice = (msg)=>console.debug(`NOTICE from ${this.url}: ${msg}`);
    baseEoseTimeout = 4400;
    connectionTimeout = 4400;
    publishTimeout = 4400;
    openSubs = /* @__PURE__ */ new Map();
    connectionTimeoutHandle;
    connectionPromise;
    openCountRequests = /* @__PURE__ */ new Map();
    openEventPublishes = /* @__PURE__ */ new Map();
    ws;
    incomingMessageQueue = new $e6ab9b966de1f36a$var$Queue();
    queueRunning = false;
    challenge;
    authPromise;
    serial = 0;
    verifyEvent;
    _WebSocket;
    constructor(url, opts){
        this.url = $e6ab9b966de1f36a$var$normalizeURL(url);
        this.verifyEvent = opts.verifyEvent;
        this._WebSocket = opts.websocketImplementation || WebSocket;
    }
    static async connect(url, opts) {
        const relay = new $e6ab9b966de1f36a$var$AbstractRelay(url, opts);
        await relay.connect();
        return relay;
    }
    closeAllSubscriptions(reason) {
        for (let [_, sub] of this.openSubs)sub.close(reason);
        this.openSubs.clear();
        for (let [_, ep] of this.openEventPublishes)ep.reject(new Error(reason));
        this.openEventPublishes.clear();
        for (let [_, cr] of this.openCountRequests)cr.reject(new Error(reason));
        this.openCountRequests.clear();
    }
    get connected() {
        return this._connected;
    }
    async connect() {
        if (this.connectionPromise) return this.connectionPromise;
        this.challenge = void 0;
        this.authPromise = void 0;
        this.connectionPromise = new Promise((resolve, reject)=>{
            this.connectionTimeoutHandle = setTimeout(()=>{
                reject("connection timed out");
                this.connectionPromise = void 0;
                this.onclose?.();
                this.closeAllSubscriptions("relay connection timed out");
            }, this.connectionTimeout);
            try {
                this.ws = new this._WebSocket(this.url);
            } catch (err) {
                clearTimeout(this.connectionTimeoutHandle);
                reject(err);
                return;
            }
            this.ws.onopen = ()=>{
                clearTimeout(this.connectionTimeoutHandle);
                this._connected = true;
                resolve();
            };
            this.ws.onerror = (ev)=>{
                clearTimeout(this.connectionTimeoutHandle);
                reject(ev.message || "websocket error");
                if (this._connected) {
                    this._connected = false;
                    this.connectionPromise = void 0;
                    this.onclose?.();
                    this.closeAllSubscriptions("relay connection errored");
                }
            };
            this.ws.onclose = (ev)=>{
                clearTimeout(this.connectionTimeoutHandle);
                reject(ev.message || "websocket closed");
                if (this._connected) {
                    this._connected = false;
                    this.connectionPromise = void 0;
                    this.onclose?.();
                    this.closeAllSubscriptions("relay connection closed");
                }
            };
            this.ws.onmessage = this._onmessage.bind(this);
        });
        return this.connectionPromise;
    }
    async runQueue() {
        this.queueRunning = true;
        while(true){
            if (false === this.handleNext()) break;
            await $e6ab9b966de1f36a$var$yieldThread();
        }
        this.queueRunning = false;
    }
    handleNext() {
        const json = this.incomingMessageQueue.dequeue();
        if (!json) return false;
        const subid = $e6ab9b966de1f36a$var$getSubscriptionId(json);
        if (subid) {
            const so = this.openSubs.get(subid);
            if (!so) return;
            const id = $e6ab9b966de1f36a$var$getHex64(json, "id");
            const alreadyHave = so.alreadyHaveEvent?.(id);
            so.receivedEvent?.(this, id);
            if (alreadyHave) return;
        }
        try {
            let data = JSON.parse(json);
            switch(data[0]){
                case "EVENT":
                    {
                        const so = this.openSubs.get(data[1]);
                        const event = data[2];
                        if (this.verifyEvent(event) && $e6ab9b966de1f36a$export$4bbf3f173cb9a4eb(so.filters, event)) so.onevent(event);
                        return;
                    }
                case "COUNT":
                    {
                        const id = data[1];
                        const payload = data[2];
                        const cr = this.openCountRequests.get(id);
                        if (cr) {
                            cr.resolve(payload.count);
                            this.openCountRequests.delete(id);
                        }
                        return;
                    }
                case "EOSE":
                    {
                        const so = this.openSubs.get(data[1]);
                        if (!so) return;
                        so.receivedEose();
                        return;
                    }
                case "OK":
                    {
                        const id = data[1];
                        const ok = data[2];
                        const reason = data[3];
                        const ep = this.openEventPublishes.get(id);
                        if (ep) {
                            clearTimeout(ep.timeout);
                            if (ok) ep.resolve(reason);
                            else ep.reject(new Error(reason));
                            this.openEventPublishes.delete(id);
                        }
                        return;
                    }
                case "CLOSED":
                    {
                        const id = data[1];
                        const so = this.openSubs.get(id);
                        if (!so) return;
                        so.closed = true;
                        so.close(data[2]);
                        return;
                    }
                case "NOTICE":
                    this.onnotice(data[1]);
                    return;
                case "AUTH":
                    this.challenge = data[1];
                    return;
            }
        } catch (err) {
            return;
        }
    }
    async send(message) {
        if (!this.connectionPromise) throw new $e6ab9b966de1f36a$var$SendingOnClosedConnection(message, this.url);
        this.connectionPromise.then(()=>{
            this.ws?.send(message);
        });
    }
    async auth(signAuthEvent) {
        const challenge = this.challenge;
        if (!challenge) throw new Error("can't perform auth, no challenge was received");
        if (this.authPromise) return this.authPromise;
        this.authPromise = new Promise(async (resolve, reject)=>{
            try {
                let evt = await signAuthEvent($e6ab9b966de1f36a$var$makeAuthEvent(this.url, challenge));
                let timeout = setTimeout(()=>{
                    let ep = this.openEventPublishes.get(evt.id);
                    if (ep) {
                        ep.reject(new Error("auth timed out"));
                        this.openEventPublishes.delete(evt.id);
                    }
                }, this.publishTimeout);
                this.openEventPublishes.set(evt.id, {
                    resolve: resolve,
                    reject: reject,
                    timeout: timeout
                });
                this.send('["AUTH",' + JSON.stringify(evt) + "]");
            } catch (err) {
                console.warn("subscribe auth function failed:", err);
            }
        });
        return this.authPromise;
    }
    async publish(event) {
        const ret = new Promise((resolve, reject)=>{
            const timeout = setTimeout(()=>{
                const ep = this.openEventPublishes.get(event.id);
                if (ep) {
                    ep.reject(new Error("publish timed out"));
                    this.openEventPublishes.delete(event.id);
                }
            }, this.publishTimeout);
            this.openEventPublishes.set(event.id, {
                resolve: resolve,
                reject: reject,
                timeout: timeout
            });
        });
        this.send('["EVENT",' + JSON.stringify(event) + "]");
        return ret;
    }
    async count(filters, params) {
        this.serial++;
        const id = params?.id || "count:" + this.serial;
        const ret = new Promise((resolve, reject)=>{
            this.openCountRequests.set(id, {
                resolve: resolve,
                reject: reject
            });
        });
        this.send('["COUNT","' + id + '",' + JSON.stringify(filters).substring(1));
        return ret;
    }
    subscribe(filters, params) {
        const subscription = this.prepareSubscription(filters, params);
        subscription.fire();
        return subscription;
    }
    prepareSubscription(filters, params) {
        this.serial++;
        const id = params.id || (params.label ? params.label + ":" : "sub:") + this.serial;
        const subscription = new $e6ab9b966de1f36a$var$Subscription(this, id, filters, params);
        this.openSubs.set(id, subscription);
        return subscription;
    }
    close() {
        this.closeAllSubscriptions("relay connection closed by us");
        this._connected = false;
        this.ws?.close();
    }
    _onmessage(ev) {
        this.incomingMessageQueue.enqueue(ev.data);
        if (!this.queueRunning) this.runQueue();
    }
};
var $e6ab9b966de1f36a$var$Subscription = class {
    relay;
    id;
    closed = false;
    eosed = false;
    filters;
    alreadyHaveEvent;
    receivedEvent;
    onevent;
    oneose;
    onclose;
    eoseTimeout;
    eoseTimeoutHandle;
    constructor(relay, id, filters, params){
        this.relay = relay;
        this.filters = filters;
        this.id = id;
        this.alreadyHaveEvent = params.alreadyHaveEvent;
        this.receivedEvent = params.receivedEvent;
        this.eoseTimeout = params.eoseTimeout || relay.baseEoseTimeout;
        this.oneose = params.oneose;
        this.onclose = params.onclose;
        this.onevent = params.onevent || ((event)=>{
            console.warn(`onevent() callback not defined for subscription '${this.id}' in relay ${this.relay.url}. event received:`, event);
        });
    }
    fire() {
        this.relay.send('["REQ","' + this.id + '",' + JSON.stringify(this.filters).substring(1));
        this.eoseTimeoutHandle = setTimeout(this.receivedEose.bind(this), this.eoseTimeout);
    }
    receivedEose() {
        if (this.eosed) return;
        clearTimeout(this.eoseTimeoutHandle);
        this.eosed = true;
        this.oneose?.();
    }
    close(reason = "closed by caller") {
        if (!this.closed && this.relay.connected) {
            try {
                this.relay.send('["CLOSE",' + JSON.stringify(this.id) + "]");
            } catch (err) {
                if (err instanceof $e6ab9b966de1f36a$var$SendingOnClosedConnection) ;
                else throw err;
            }
            this.closed = true;
        }
        this.relay.openSubs.delete(this.id);
        this.onclose?.(reason);
    }
};
// relay.ts
var $e6ab9b966de1f36a$var$_WebSocket;
try {
    $e6ab9b966de1f36a$var$_WebSocket = WebSocket;
} catch  {}
var $e6ab9b966de1f36a$export$325be0d991c73dc2 = class extends $e6ab9b966de1f36a$var$AbstractRelay {
    constructor(url){
        super(url, {
            verifyEvent: $e6ab9b966de1f36a$export$909d658b5069e986,
            websocketImplementation: $e6ab9b966de1f36a$var$_WebSocket
        });
    }
    static async connect(url) {
        const relay = new $e6ab9b966de1f36a$export$325be0d991c73dc2(url);
        await relay.connect();
        return relay;
    }
};
// abstract-pool.ts
var $e6ab9b966de1f36a$var$AbstractSimplePool = class {
    relays = /* @__PURE__ */ new Map();
    seenOn = /* @__PURE__ */ new Map();
    trackRelays = false;
    verifyEvent;
    trustedRelayURLs = /* @__PURE__ */ new Set();
    _WebSocket;
    constructor(opts){
        this.verifyEvent = opts.verifyEvent;
        this._WebSocket = opts.websocketImplementation;
    }
    async ensureRelay(url, params) {
        url = $e6ab9b966de1f36a$var$normalizeURL(url);
        let relay = this.relays.get(url);
        if (!relay) {
            relay = new $e6ab9b966de1f36a$var$AbstractRelay(url, {
                verifyEvent: this.trustedRelayURLs.has(url) ? $e6ab9b966de1f36a$var$alwaysTrue : this.verifyEvent,
                websocketImplementation: this._WebSocket
            });
            if (params?.connectionTimeout) relay.connectionTimeout = params.connectionTimeout;
            this.relays.set(url, relay);
        }
        await relay.connect();
        return relay;
    }
    close(relays) {
        relays.map($e6ab9b966de1f36a$var$normalizeURL).forEach((url)=>{
            this.relays.get(url)?.close();
        });
    }
    subscribe(relays, filter, params) {
        params.onauth = params.onauth || params.doauth;
        return this.subscribeMap(relays.map((url)=>({
                url: url,
                filter: filter
            })), params);
    }
    subscribeMany(relays, filters, params) {
        params.onauth = params.onauth || params.doauth;
        return this.subscribeMap(relays.flatMap((url)=>filters.map((filter)=>({
                    url: url,
                    filter: filter
                }))), params);
    }
    subscribeMap(requests, params) {
        params.onauth = params.onauth || params.doauth;
        if (this.trackRelays) params.receivedEvent = (relay, id)=>{
            let set = this.seenOn.get(id);
            if (!set) {
                set = /* @__PURE__ */ new Set();
                this.seenOn.set(id, set);
            }
            set.add(relay);
        };
        const _knownIds = /* @__PURE__ */ new Set();
        const subs = [];
        const eosesReceived = [];
        let handleEose = (i2)=>{
            if (eosesReceived[i2]) return;
            eosesReceived[i2] = true;
            if (eosesReceived.filter((a)=>a).length === requests.length) {
                params.oneose?.();
                handleEose = ()=>{};
            }
        };
        const closesReceived = [];
        let handleClose = (i2, reason)=>{
            if (closesReceived[i2]) return;
            handleEose(i2);
            closesReceived[i2] = reason;
            if (closesReceived.filter((a)=>a).length === requests.length) {
                params.onclose?.(closesReceived);
                handleClose = ()=>{};
            }
        };
        const localAlreadyHaveEventHandler = (id)=>{
            if (params.alreadyHaveEvent?.(id)) return true;
            const have = _knownIds.has(id);
            _knownIds.add(id);
            return have;
        };
        const allOpened = Promise.all(requests.map(async ({ url: url, filter: filter }, i2)=>{
            url = $e6ab9b966de1f36a$var$normalizeURL(url);
            let relay;
            try {
                relay = await this.ensureRelay(url, {
                    connectionTimeout: params.maxWait ? Math.max(params.maxWait * 0.8, params.maxWait - 1e3) : void 0
                });
            } catch (err) {
                handleClose(i2, err?.message || String(err));
                return;
            }
            let subscription = relay.subscribe([
                filter
            ], {
                ...params,
                oneose: ()=>handleEose(i2),
                onclose: (reason)=>{
                    if (reason.startsWith("auth-required: ") && params.onauth) relay.auth(params.onauth).then(()=>{
                        relay.subscribe([
                            filter
                        ], {
                            ...params,
                            oneose: ()=>handleEose(i2),
                            onclose: (reason2)=>{
                                handleClose(i2, reason2);
                            },
                            alreadyHaveEvent: localAlreadyHaveEventHandler,
                            eoseTimeout: params.maxWait
                        });
                    }).catch((err)=>{
                        handleClose(i2, `auth was required and attempted, but failed with: ${err}`);
                    });
                    else handleClose(i2, reason);
                },
                alreadyHaveEvent: localAlreadyHaveEventHandler,
                eoseTimeout: params.maxWait
            });
            subs.push(subscription);
        }));
        return {
            async close (reason) {
                await allOpened;
                subs.forEach((sub)=>{
                    sub.close(reason);
                });
            }
        };
    }
    subscribeEose(relays, filter, params) {
        params.onauth = params.onauth || params.doauth;
        const subcloser = this.subscribe(relays, filter, {
            ...params,
            oneose () {
                subcloser.close("closed automatically on eose");
            }
        });
        return subcloser;
    }
    subscribeManyEose(relays, filters, params) {
        params.onauth = params.onauth || params.doauth;
        const subcloser = this.subscribeMany(relays, filters, {
            ...params,
            oneose () {
                subcloser.close("closed automatically on eose");
            }
        });
        return subcloser;
    }
    async querySync(relays, filter, params) {
        return new Promise(async (resolve)=>{
            const events = [];
            this.subscribeEose(relays, filter, {
                ...params,
                onevent (event) {
                    events.push(event);
                },
                onclose (_) {
                    resolve(events);
                }
            });
        });
    }
    async get(relays, filter, params) {
        filter.limit = 1;
        const events = await this.querySync(relays, filter, params);
        events.sort((a, b)=>b.created_at - a.created_at);
        return events[0] || null;
    }
    publish(relays, event, options) {
        return relays.map($e6ab9b966de1f36a$var$normalizeURL).map(async (url, i2, arr)=>{
            if (arr.indexOf(url) !== i2) return Promise.reject("duplicate url");
            let r = await this.ensureRelay(url);
            return r.publish(event).catch(async (err)=>{
                if (err instanceof Error && err.message.startsWith("auth-required: ") && options?.onauth) {
                    await r.auth(options.onauth);
                    return r.publish(event);
                }
                throw err;
            }).then((reason)=>{
                if (this.trackRelays) {
                    let set = this.seenOn.get(event.id);
                    if (!set) {
                        set = /* @__PURE__ */ new Set();
                        this.seenOn.set(event.id, set);
                    }
                    set.add(r);
                }
                return reason;
            });
        });
    }
    listConnectionStatus() {
        const map = /* @__PURE__ */ new Map();
        this.relays.forEach((relay, url)=>map.set(url, relay.connected));
        return map;
    }
    destroy() {
        this.relays.forEach((conn)=>conn.close());
        this.relays = /* @__PURE__ */ new Map();
    }
};
// pool.ts
var $e6ab9b966de1f36a$var$_WebSocket2;
try {
    $e6ab9b966de1f36a$var$_WebSocket2 = WebSocket;
} catch  {}
var $e6ab9b966de1f36a$export$db45add7d1880f0c = class extends $e6ab9b966de1f36a$var$AbstractSimplePool {
    constructor(){
        super({
            verifyEvent: $e6ab9b966de1f36a$export$909d658b5069e986,
            websocketImplementation: $e6ab9b966de1f36a$var$_WebSocket2
        });
    }
};
// nip19.ts
var $e6ab9b966de1f36a$export$10660ae21dbef115 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$10660ae21dbef115, {
    BECH32_REGEX: ()=>$e6ab9b966de1f36a$var$BECH32_REGEX,
    Bech32MaxSize: ()=>$e6ab9b966de1f36a$var$Bech32MaxSize,
    NostrTypeGuard: ()=>$e6ab9b966de1f36a$var$NostrTypeGuard,
    decode: ()=>$e6ab9b966de1f36a$var$decode,
    decodeNostrURI: ()=>$e6ab9b966de1f36a$var$decodeNostrURI,
    encodeBytes: ()=>$e6ab9b966de1f36a$var$encodeBytes,
    naddrEncode: ()=>$e6ab9b966de1f36a$var$naddrEncode,
    neventEncode: ()=>$e6ab9b966de1f36a$var$neventEncode,
    noteEncode: ()=>$e6ab9b966de1f36a$var$noteEncode,
    nprofileEncode: ()=>$e6ab9b966de1f36a$var$nprofileEncode,
    npubEncode: ()=>$e6ab9b966de1f36a$var$npubEncode,
    nsecEncode: ()=>$e6ab9b966de1f36a$var$nsecEncode
});
var $e6ab9b966de1f36a$var$NostrTypeGuard = {
    isNProfile: (value)=>/^nprofile1[a-z\d]+$/.test(value || ""),
    isNEvent: (value)=>/^nevent1[a-z\d]+$/.test(value || ""),
    isNAddr: (value)=>/^naddr1[a-z\d]+$/.test(value || ""),
    isNSec: (value)=>/^nsec1[a-z\d]{58}$/.test(value || ""),
    isNPub: (value)=>/^npub1[a-z\d]{58}$/.test(value || ""),
    isNote: (value)=>/^note1[a-z\d]+$/.test(value || ""),
    isNcryptsec: (value)=>/^ncryptsec1[a-z\d]+$/.test(value || "")
};
var $e6ab9b966de1f36a$var$Bech32MaxSize = 5e3;
var $e6ab9b966de1f36a$var$BECH32_REGEX = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
function $e6ab9b966de1f36a$var$integerToUint8Array(number) {
    const uint8Array = new Uint8Array(4);
    uint8Array[0] = number >> 24 & 255;
    uint8Array[1] = number >> 16 & 255;
    uint8Array[2] = number >> 8 & 255;
    uint8Array[3] = number & 255;
    return uint8Array;
}
function $e6ab9b966de1f36a$var$decodeNostrURI(nip19code) {
    try {
        if (nip19code.startsWith("nostr:")) nip19code = nip19code.substring(6);
        return $e6ab9b966de1f36a$var$decode(nip19code);
    } catch (_err) {
        return {
            type: "invalid",
            data: null
        };
    }
}
function $e6ab9b966de1f36a$var$decode(code) {
    let { prefix: prefix, words: words } = (0, $25Yxt.bech32).decode(code, $e6ab9b966de1f36a$var$Bech32MaxSize);
    let data = new Uint8Array((0, $25Yxt.bech32).fromWords(words));
    switch(prefix){
        case "nprofile":
            {
                let tlv = $e6ab9b966de1f36a$var$parseTLV(data);
                if (!tlv[0]?.[0]) throw new Error("missing TLV 0 for nprofile");
                if (tlv[0][0].length !== 32) throw new Error("TLV 0 should be 32 bytes");
                return {
                    type: "nprofile",
                    data: {
                        pubkey: (0, $jxo4c.bytesToHex)(tlv[0][0]),
                        relays: tlv[1] ? tlv[1].map((d)=>$e6ab9b966de1f36a$var$utf8Decoder.decode(d)) : []
                    }
                };
            }
        case "nevent":
            {
                let tlv = $e6ab9b966de1f36a$var$parseTLV(data);
                if (!tlv[0]?.[0]) throw new Error("missing TLV 0 for nevent");
                if (tlv[0][0].length !== 32) throw new Error("TLV 0 should be 32 bytes");
                if (tlv[2] && tlv[2][0].length !== 32) throw new Error("TLV 2 should be 32 bytes");
                if (tlv[3] && tlv[3][0].length !== 4) throw new Error("TLV 3 should be 4 bytes");
                return {
                    type: "nevent",
                    data: {
                        id: (0, $jxo4c.bytesToHex)(tlv[0][0]),
                        relays: tlv[1] ? tlv[1].map((d)=>$e6ab9b966de1f36a$var$utf8Decoder.decode(d)) : [],
                        author: tlv[2]?.[0] ? (0, $jxo4c.bytesToHex)(tlv[2][0]) : void 0,
                        kind: tlv[3]?.[0] ? parseInt((0, $jxo4c.bytesToHex)(tlv[3][0]), 16) : void 0
                    }
                };
            }
        case "naddr":
            {
                let tlv = $e6ab9b966de1f36a$var$parseTLV(data);
                if (!tlv[0]?.[0]) throw new Error("missing TLV 0 for naddr");
                if (!tlv[2]?.[0]) throw new Error("missing TLV 2 for naddr");
                if (tlv[2][0].length !== 32) throw new Error("TLV 2 should be 32 bytes");
                if (!tlv[3]?.[0]) throw new Error("missing TLV 3 for naddr");
                if (tlv[3][0].length !== 4) throw new Error("TLV 3 should be 4 bytes");
                return {
                    type: "naddr",
                    data: {
                        identifier: $e6ab9b966de1f36a$var$utf8Decoder.decode(tlv[0][0]),
                        pubkey: (0, $jxo4c.bytesToHex)(tlv[2][0]),
                        kind: parseInt((0, $jxo4c.bytesToHex)(tlv[3][0]), 16),
                        relays: tlv[1] ? tlv[1].map((d)=>$e6ab9b966de1f36a$var$utf8Decoder.decode(d)) : []
                    }
                };
            }
        case "nsec":
            return {
                type: prefix,
                data: data
            };
        case "npub":
        case "note":
            return {
                type: prefix,
                data: (0, $jxo4c.bytesToHex)(data)
            };
        default:
            throw new Error(`unknown prefix ${prefix}`);
    }
}
function $e6ab9b966de1f36a$var$parseTLV(data) {
    let result = {};
    let rest = data;
    while(rest.length > 0){
        let t = rest[0];
        let l = rest[1];
        let v = rest.slice(2, 2 + l);
        rest = rest.slice(2 + l);
        if (v.length < l) throw new Error(`not enough data to read on TLV ${t}`);
        result[t] = result[t] || [];
        result[t].push(v);
    }
    return result;
}
function $e6ab9b966de1f36a$var$nsecEncode(key) {
    return $e6ab9b966de1f36a$var$encodeBytes("nsec", key);
}
function $e6ab9b966de1f36a$var$npubEncode(hex) {
    return $e6ab9b966de1f36a$var$encodeBytes("npub", (0, $jxo4c.hexToBytes)(hex));
}
function $e6ab9b966de1f36a$var$noteEncode(hex) {
    return $e6ab9b966de1f36a$var$encodeBytes("note", (0, $jxo4c.hexToBytes)(hex));
}
function $e6ab9b966de1f36a$var$encodeBech32(prefix, data) {
    let words = (0, $25Yxt.bech32).toWords(data);
    return (0, $25Yxt.bech32).encode(prefix, words, $e6ab9b966de1f36a$var$Bech32MaxSize);
}
function $e6ab9b966de1f36a$var$encodeBytes(prefix, bytes) {
    return $e6ab9b966de1f36a$var$encodeBech32(prefix, bytes);
}
function $e6ab9b966de1f36a$var$nprofileEncode(profile) {
    let data = $e6ab9b966de1f36a$var$encodeTLV({
        0: [
            (0, $jxo4c.hexToBytes)(profile.pubkey)
        ],
        1: (profile.relays || []).map((url)=>$e6ab9b966de1f36a$var$utf8Encoder.encode(url))
    });
    return $e6ab9b966de1f36a$var$encodeBech32("nprofile", data);
}
function $e6ab9b966de1f36a$var$neventEncode(event) {
    let kindArray;
    if (event.kind !== void 0) kindArray = $e6ab9b966de1f36a$var$integerToUint8Array(event.kind);
    let data = $e6ab9b966de1f36a$var$encodeTLV({
        0: [
            (0, $jxo4c.hexToBytes)(event.id)
        ],
        1: (event.relays || []).map((url)=>$e6ab9b966de1f36a$var$utf8Encoder.encode(url)),
        2: event.author ? [
            (0, $jxo4c.hexToBytes)(event.author)
        ] : [],
        3: kindArray ? [
            new Uint8Array(kindArray)
        ] : []
    });
    return $e6ab9b966de1f36a$var$encodeBech32("nevent", data);
}
function $e6ab9b966de1f36a$var$naddrEncode(addr) {
    let kind = new ArrayBuffer(4);
    new DataView(kind).setUint32(0, addr.kind, false);
    let data = $e6ab9b966de1f36a$var$encodeTLV({
        0: [
            $e6ab9b966de1f36a$var$utf8Encoder.encode(addr.identifier)
        ],
        1: (addr.relays || []).map((url)=>$e6ab9b966de1f36a$var$utf8Encoder.encode(url)),
        2: [
            (0, $jxo4c.hexToBytes)(addr.pubkey)
        ],
        3: [
            new Uint8Array(kind)
        ]
    });
    return $e6ab9b966de1f36a$var$encodeBech32("naddr", data);
}
function $e6ab9b966de1f36a$var$encodeTLV(tlv) {
    let entries = [];
    Object.entries(tlv).reverse().forEach(([t, vs])=>{
        vs.forEach((v)=>{
            let entry = new Uint8Array(v.length + 2);
            entry.set([
                parseInt(t)
            ], 0);
            entry.set([
                v.length
            ], 1);
            entry.set(v, 2);
            entries.push(entry);
        });
    });
    return (0, $jxo4c.concatBytes)(...entries);
}
// references.ts
var $e6ab9b966de1f36a$var$mentionRegex = /\bnostr:((note|npub|naddr|nevent|nprofile)1\w+)\b|#\[(\d+)\]/g;
function $e6ab9b966de1f36a$export$2b054a310b694903(evt) {
    let references = [];
    for (let ref of evt.content.matchAll($e6ab9b966de1f36a$var$mentionRegex)){
        if (ref[2]) try {
            let { type: type, data: data } = $e6ab9b966de1f36a$var$decode(ref[1]);
            switch(type){
                case "npub":
                    references.push({
                        text: ref[0],
                        profile: {
                            pubkey: data,
                            relays: []
                        }
                    });
                    break;
                case "nprofile":
                    references.push({
                        text: ref[0],
                        profile: data
                    });
                    break;
                case "note":
                    references.push({
                        text: ref[0],
                        event: {
                            id: data,
                            relays: []
                        }
                    });
                    break;
                case "nevent":
                    references.push({
                        text: ref[0],
                        event: data
                    });
                    break;
                case "naddr":
                    references.push({
                        text: ref[0],
                        address: data
                    });
                    break;
            }
        } catch (err) {}
        else if (ref[3]) {
            let idx = parseInt(ref[3], 10);
            let tag = evt.tags[idx];
            if (!tag) continue;
            switch(tag[0]){
                case "p":
                    references.push({
                        text: ref[0],
                        profile: {
                            pubkey: tag[1],
                            relays: tag[2] ? [
                                tag[2]
                            ] : []
                        }
                    });
                    break;
                case "e":
                    references.push({
                        text: ref[0],
                        event: {
                            id: tag[1],
                            relays: tag[2] ? [
                                tag[2]
                            ] : []
                        }
                    });
                    break;
                case "a":
                    try {
                        let [kind, pubkey, identifier] = tag[1].split(":");
                        references.push({
                            text: ref[0],
                            address: {
                                identifier: identifier,
                                pubkey: pubkey,
                                kind: parseInt(kind, 10),
                                relays: tag[2] ? [
                                    tag[2]
                                ] : []
                            }
                        });
                    } catch (err) {}
                    break;
            }
        }
    }
    return references;
}
// nip04.ts
var $e6ab9b966de1f36a$export$4793e42c2cc9b120 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$4793e42c2cc9b120, {
    decrypt: ()=>$e6ab9b966de1f36a$var$decrypt,
    encrypt: ()=>$e6ab9b966de1f36a$var$encrypt
});
function $e6ab9b966de1f36a$var$encrypt(secretKey, pubkey, text) {
    const privkey = secretKey instanceof Uint8Array ? (0, $jxo4c.bytesToHex)(secretKey) : secretKey;
    const key = (0, $kCY3A.secp256k1).getSharedSecret(privkey, "02" + pubkey);
    const normalizedKey = $e6ab9b966de1f36a$var$getNormalizedX(key);
    let iv = Uint8Array.from((0, $jxo4c.randomBytes)(16));
    let plaintext = $e6ab9b966de1f36a$var$utf8Encoder.encode(text);
    let ciphertext = (0, $71Bn2.cbc)(normalizedKey, iv).encrypt(plaintext);
    let ctb64 = (0, $25Yxt.base64).encode(new Uint8Array(ciphertext));
    let ivb64 = (0, $25Yxt.base64).encode(new Uint8Array(iv.buffer));
    return `${ctb64}?iv=${ivb64}`;
}
function $e6ab9b966de1f36a$var$decrypt(secretKey, pubkey, data) {
    const privkey = secretKey instanceof Uint8Array ? (0, $jxo4c.bytesToHex)(secretKey) : secretKey;
    let [ctb64, ivb64] = data.split("?iv=");
    let key = (0, $kCY3A.secp256k1).getSharedSecret(privkey, "02" + pubkey);
    let normalizedKey = $e6ab9b966de1f36a$var$getNormalizedX(key);
    let iv = (0, $25Yxt.base64).decode(ivb64);
    let ciphertext = (0, $25Yxt.base64).decode(ctb64);
    let plaintext = (0, $71Bn2.cbc)(normalizedKey, iv).decrypt(ciphertext);
    return $e6ab9b966de1f36a$var$utf8Decoder.decode(plaintext);
}
function $e6ab9b966de1f36a$var$getNormalizedX(key) {
    return key.slice(1, 33);
}
// nip05.ts
var $e6ab9b966de1f36a$export$a60e5b740ad8d13e = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$a60e5b740ad8d13e, {
    NIP05_REGEX: ()=>$e6ab9b966de1f36a$var$NIP05_REGEX,
    isNip05: ()=>$e6ab9b966de1f36a$var$isNip05,
    isValid: ()=>$e6ab9b966de1f36a$var$isValid,
    queryProfile: ()=>$e6ab9b966de1f36a$var$queryProfile,
    searchDomain: ()=>$e6ab9b966de1f36a$var$searchDomain,
    useFetchImplementation: ()=>$e6ab9b966de1f36a$var$useFetchImplementation
});
var $e6ab9b966de1f36a$var$NIP05_REGEX = /^(?:([\w.+-]+)@)?([\w_-]+(\.[\w_-]+)+)$/;
var $e6ab9b966de1f36a$var$isNip05 = (value)=>$e6ab9b966de1f36a$var$NIP05_REGEX.test(value || "");
var $e6ab9b966de1f36a$var$_fetch;
try {
    $e6ab9b966de1f36a$var$_fetch = fetch;
} catch (_) {}
function $e6ab9b966de1f36a$var$useFetchImplementation(fetchImplementation) {
    $e6ab9b966de1f36a$var$_fetch = fetchImplementation;
}
async function $e6ab9b966de1f36a$var$searchDomain(domain, query = "") {
    try {
        const url = `https://${domain}/.well-known/nostr.json?name=${query}`;
        const res = await $e6ab9b966de1f36a$var$_fetch(url, {
            redirect: "manual"
        });
        if (res.status !== 200) throw Error("Wrong response code");
        const json = await res.json();
        return json.names;
    } catch (_) {
        return {};
    }
}
async function $e6ab9b966de1f36a$var$queryProfile(fullname) {
    const match = fullname.match($e6ab9b966de1f36a$var$NIP05_REGEX);
    if (!match) return null;
    const [, name = "_", domain] = match;
    try {
        const url = `https://${domain}/.well-known/nostr.json?name=${name}`;
        const res = await $e6ab9b966de1f36a$var$_fetch(url, {
            redirect: "manual"
        });
        if (res.status !== 200) throw Error("Wrong response code");
        const json = await res.json();
        const pubkey = json.names[name];
        return pubkey ? {
            pubkey: pubkey,
            relays: json.relays?.[pubkey]
        } : null;
    } catch (_e) {
        return null;
    }
}
async function $e6ab9b966de1f36a$var$isValid(pubkey, nip05) {
    const res = await $e6ab9b966de1f36a$var$queryProfile(nip05);
    return res ? res.pubkey === pubkey : false;
}
// nip10.ts
var $e6ab9b966de1f36a$export$ce5090ce1281ef76 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$ce5090ce1281ef76, {
    parse: ()=>$e6ab9b966de1f36a$var$parse
});
function $e6ab9b966de1f36a$var$parse(event) {
    const result = {
        reply: void 0,
        root: void 0,
        mentions: [],
        profiles: [],
        quotes: []
    };
    let maybeParent;
    let maybeRoot;
    for(let i2 = event.tags.length - 1; i2 >= 0; i2--){
        const tag = event.tags[i2];
        if (tag[0] === "e" && tag[1]) {
            const [_, eTagEventId, eTagRelayUrl, eTagMarker, eTagAuthor] = tag;
            const eventPointer = {
                id: eTagEventId,
                relays: eTagRelayUrl ? [
                    eTagRelayUrl
                ] : [],
                author: eTagAuthor
            };
            if (eTagMarker === "root") {
                result.root = eventPointer;
                continue;
            }
            if (eTagMarker === "reply") {
                result.reply = eventPointer;
                continue;
            }
            if (eTagMarker === "mention") {
                result.mentions.push(eventPointer);
                continue;
            }
            if (!maybeParent) maybeParent = eventPointer;
            else maybeRoot = eventPointer;
            result.mentions.push(eventPointer);
            continue;
        }
        if (tag[0] === "q" && tag[1]) {
            const [_, eTagEventId, eTagRelayUrl] = tag;
            result.quotes.push({
                id: eTagEventId,
                relays: eTagRelayUrl ? [
                    eTagRelayUrl
                ] : []
            });
        }
        if (tag[0] === "p" && tag[1]) {
            result.profiles.push({
                pubkey: tag[1],
                relays: tag[2] ? [
                    tag[2]
                ] : []
            });
            continue;
        }
    }
    if (!result.root) result.root = maybeRoot || maybeParent || result.reply;
    if (!result.reply) result.reply = maybeParent || result.root;
    [
        result.reply,
        result.root
    ].forEach((ref)=>{
        if (!ref) return;
        let idx = result.mentions.indexOf(ref);
        if (idx !== -1) result.mentions.splice(idx, 1);
        if (ref.author) {
            let author = result.profiles.find((p)=>p.pubkey === ref.author);
            if (author && author.relays) {
                if (!ref.relays) ref.relays = [];
                author.relays.forEach((url)=>{
                    if (ref.relays?.indexOf(url) === -1) ref.relays.push(url);
                });
                author.relays = ref.relays;
            }
        }
    });
    result.mentions.forEach((ref)=>{
        if (ref.author) {
            let author = result.profiles.find((p)=>p.pubkey === ref.author);
            if (author && author.relays) {
                if (!ref.relays) ref.relays = [];
                author.relays.forEach((url)=>{
                    if (ref.relays.indexOf(url) === -1) ref.relays.push(url);
                });
                author.relays = ref.relays;
            }
        }
    });
    return result;
}
// nip11.ts
var $e6ab9b966de1f36a$export$86cbe01fda153e74 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$86cbe01fda153e74, {
    fetchRelayInformation: ()=>$e6ab9b966de1f36a$var$fetchRelayInformation,
    useFetchImplementation: ()=>$e6ab9b966de1f36a$var$useFetchImplementation2
});
var $e6ab9b966de1f36a$var$_fetch2;
try {
    $e6ab9b966de1f36a$var$_fetch2 = fetch;
} catch  {}
function $e6ab9b966de1f36a$var$useFetchImplementation2(fetchImplementation) {
    $e6ab9b966de1f36a$var$_fetch2 = fetchImplementation;
}
async function $e6ab9b966de1f36a$var$fetchRelayInformation(url) {
    return await (await fetch(url.replace("ws://", "http://").replace("wss://", "https://"), {
        headers: {
            Accept: "application/nostr+json"
        }
    })).json();
}
// nip13.ts
var $e6ab9b966de1f36a$export$215f75f26b6c95fe = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$215f75f26b6c95fe, {
    fastEventHash: ()=>$e6ab9b966de1f36a$var$fastEventHash,
    getPow: ()=>$e6ab9b966de1f36a$var$getPow,
    minePow: ()=>$e6ab9b966de1f36a$var$minePow
});
function $e6ab9b966de1f36a$var$getPow(hex) {
    let count = 0;
    for(let i2 = 0; i2 < 64; i2 += 8){
        const nibble = parseInt(hex.substring(i2, i2 + 8), 16);
        if (nibble === 0) count += 32;
        else {
            count += Math.clz32(nibble);
            break;
        }
    }
    return count;
}
function $e6ab9b966de1f36a$var$minePow(unsigned, difficulty) {
    let count = 0;
    const event = unsigned;
    const tag = [
        "nonce",
        count.toString(),
        difficulty.toString()
    ];
    event.tags.push(tag);
    while(true){
        const now2 = Math.floor(new Date().getTime() / 1e3);
        if (now2 !== event.created_at) {
            count = 0;
            event.created_at = now2;
        }
        tag[1] = (++count).toString();
        event.id = $e6ab9b966de1f36a$var$fastEventHash(event);
        if ($e6ab9b966de1f36a$var$getPow(event.id) >= difficulty) break;
    }
    return event;
}
function $e6ab9b966de1f36a$var$fastEventHash(evt) {
    return (0, $jxo4c.bytesToHex)((0, $YRaTA.sha256)($e6ab9b966de1f36a$var$utf8Encoder.encode(JSON.stringify([
        0,
        evt.pubkey,
        evt.created_at,
        evt.kind,
        evt.tags,
        evt.content
    ]))));
}
// nip17.ts
var $e6ab9b966de1f36a$export$b2365d93b6f57df6 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$b2365d93b6f57df6, {
    unwrapEvent: ()=>$e6ab9b966de1f36a$var$unwrapEvent2,
    unwrapManyEvents: ()=>$e6ab9b966de1f36a$var$unwrapManyEvents2,
    wrapEvent: ()=>$e6ab9b966de1f36a$var$wrapEvent2,
    wrapManyEvents: ()=>$e6ab9b966de1f36a$var$wrapManyEvents2
});
// nip59.ts
var $e6ab9b966de1f36a$export$c928dafb9718f202 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$c928dafb9718f202, {
    createRumor: ()=>$e6ab9b966de1f36a$var$createRumor,
    createSeal: ()=>$e6ab9b966de1f36a$var$createSeal,
    createWrap: ()=>$e6ab9b966de1f36a$var$createWrap,
    unwrapEvent: ()=>$e6ab9b966de1f36a$var$unwrapEvent,
    unwrapManyEvents: ()=>$e6ab9b966de1f36a$var$unwrapManyEvents,
    wrapEvent: ()=>$e6ab9b966de1f36a$var$wrapEvent,
    wrapManyEvents: ()=>$e6ab9b966de1f36a$var$wrapManyEvents
});
// nip44.ts
var $e6ab9b966de1f36a$export$7f3384dd63301b54 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$7f3384dd63301b54, {
    decrypt: ()=>$e6ab9b966de1f36a$var$decrypt2,
    encrypt: ()=>$e6ab9b966de1f36a$var$encrypt2,
    getConversationKey: ()=>$e6ab9b966de1f36a$var$getConversationKey,
    v2: ()=>$e6ab9b966de1f36a$var$v2
});
var $e6ab9b966de1f36a$var$minPlaintextSize = 1;
var $e6ab9b966de1f36a$var$maxPlaintextSize = 65535;
function $e6ab9b966de1f36a$var$getConversationKey(privkeyA, pubkeyB) {
    const sharedX = (0, $kCY3A.secp256k1).getSharedSecret(privkeyA, "02" + pubkeyB).subarray(1, 33);
    return (0, $dnDHV.extract)((0, $YRaTA.sha256), sharedX, "nip44-v2");
}
function $e6ab9b966de1f36a$var$getMessageKeys(conversationKey, nonce) {
    const keys = (0, $dnDHV.expand)((0, $YRaTA.sha256), conversationKey, nonce, 76);
    return {
        chacha_key: keys.subarray(0, 32),
        chacha_nonce: keys.subarray(32, 44),
        hmac_key: keys.subarray(44, 76)
    };
}
function $e6ab9b966de1f36a$var$calcPaddedLen(len) {
    if (!Number.isSafeInteger(len) || len < 1) throw new Error("expected positive integer");
    if (len <= 32) return 32;
    const nextPower = 1 << Math.floor(Math.log2(len - 1)) + 1;
    const chunk = nextPower <= 256 ? 32 : nextPower / 8;
    return chunk * (Math.floor((len - 1) / chunk) + 1);
}
function $e6ab9b966de1f36a$var$writeU16BE(num) {
    if (!Number.isSafeInteger(num) || num < $e6ab9b966de1f36a$var$minPlaintextSize || num > $e6ab9b966de1f36a$var$maxPlaintextSize) throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");
    const arr = new Uint8Array(2);
    new DataView(arr.buffer).setUint16(0, num, false);
    return arr;
}
function $e6ab9b966de1f36a$var$pad(plaintext) {
    const unpadded = $e6ab9b966de1f36a$var$utf8Encoder.encode(plaintext);
    const unpaddedLen = unpadded.length;
    const prefix = $e6ab9b966de1f36a$var$writeU16BE(unpaddedLen);
    const suffix = new Uint8Array($e6ab9b966de1f36a$var$calcPaddedLen(unpaddedLen) - unpaddedLen);
    return (0, $jxo4c.concatBytes)(prefix, unpadded, suffix);
}
function $e6ab9b966de1f36a$var$unpad(padded) {
    const unpaddedLen = new DataView(padded.buffer).getUint16(0);
    const unpadded = padded.subarray(2, 2 + unpaddedLen);
    if (unpaddedLen < $e6ab9b966de1f36a$var$minPlaintextSize || unpaddedLen > $e6ab9b966de1f36a$var$maxPlaintextSize || unpadded.length !== unpaddedLen || padded.length !== 2 + $e6ab9b966de1f36a$var$calcPaddedLen(unpaddedLen)) throw new Error("invalid padding");
    return $e6ab9b966de1f36a$var$utf8Decoder.decode(unpadded);
}
function $e6ab9b966de1f36a$var$hmacAad(key, message, aad) {
    if (aad.length !== 32) throw new Error("AAD associated data must be 32 bytes");
    const combined = (0, $jxo4c.concatBytes)(aad, message);
    return (0, $cgbWU.hmac)((0, $YRaTA.sha256), key, combined);
}
function $e6ab9b966de1f36a$var$decodePayload(payload) {
    if (typeof payload !== "string") throw new Error("payload must be a valid string");
    const plen = payload.length;
    if (plen < 132 || plen > 87472) throw new Error("invalid payload length: " + plen);
    if (payload[0] === "#") throw new Error("unknown encryption version");
    let data;
    try {
        data = (0, $25Yxt.base64).decode(payload);
    } catch (error) {
        throw new Error("invalid base64: " + error.message);
    }
    const dlen = data.length;
    if (dlen < 99 || dlen > 65603) throw new Error("invalid data length: " + dlen);
    const vers = data[0];
    if (vers !== 2) throw new Error("unknown encryption version " + vers);
    return {
        nonce: data.subarray(1, 33),
        ciphertext: data.subarray(33, -32),
        mac: data.subarray(-32)
    };
}
function $e6ab9b966de1f36a$var$encrypt2(plaintext, conversationKey, nonce = (0, $jxo4c.randomBytes)(32)) {
    const { chacha_key: chacha_key, chacha_nonce: chacha_nonce, hmac_key: hmac_key } = $e6ab9b966de1f36a$var$getMessageKeys(conversationKey, nonce);
    const padded = $e6ab9b966de1f36a$var$pad(plaintext);
    const ciphertext = (0, $iBX14.chacha20)(chacha_key, chacha_nonce, padded);
    const mac = $e6ab9b966de1f36a$var$hmacAad(hmac_key, ciphertext, nonce);
    return (0, $25Yxt.base64).encode((0, $jxo4c.concatBytes)(new Uint8Array([
        2
    ]), nonce, ciphertext, mac));
}
function $e6ab9b966de1f36a$var$decrypt2(payload, conversationKey) {
    const { nonce: nonce, ciphertext: ciphertext, mac: mac } = $e6ab9b966de1f36a$var$decodePayload(payload);
    const { chacha_key: chacha_key, chacha_nonce: chacha_nonce, hmac_key: hmac_key } = $e6ab9b966de1f36a$var$getMessageKeys(conversationKey, nonce);
    const calculatedMac = $e6ab9b966de1f36a$var$hmacAad(hmac_key, ciphertext, nonce);
    if (!(0, $8Wj9n.equalBytes)(calculatedMac, mac)) throw new Error("invalid MAC");
    const padded = (0, $iBX14.chacha20)(chacha_key, chacha_nonce, ciphertext);
    return $e6ab9b966de1f36a$var$unpad(padded);
}
var $e6ab9b966de1f36a$var$v2 = {
    utils: {
        getConversationKey: $e6ab9b966de1f36a$var$getConversationKey,
        calcPaddedLen: $e6ab9b966de1f36a$var$calcPaddedLen
    },
    encrypt: $e6ab9b966de1f36a$var$encrypt2,
    decrypt: $e6ab9b966de1f36a$var$decrypt2
};
// nip59.ts
var $e6ab9b966de1f36a$var$TWO_DAYS = 172800;
var $e6ab9b966de1f36a$var$now = ()=>Math.round(Date.now() / 1e3);
var $e6ab9b966de1f36a$var$randomNow = ()=>Math.round($e6ab9b966de1f36a$var$now() - Math.random() * $e6ab9b966de1f36a$var$TWO_DAYS);
var $e6ab9b966de1f36a$var$nip44ConversationKey = (privateKey, publicKey)=>$e6ab9b966de1f36a$var$getConversationKey(privateKey, publicKey);
var $e6ab9b966de1f36a$var$nip44Encrypt = (data, privateKey, publicKey)=>$e6ab9b966de1f36a$var$encrypt2(JSON.stringify(data), $e6ab9b966de1f36a$var$nip44ConversationKey(privateKey, publicKey));
var $e6ab9b966de1f36a$var$nip44Decrypt = (data, privateKey)=>JSON.parse($e6ab9b966de1f36a$var$decrypt2(data.content, $e6ab9b966de1f36a$var$nip44ConversationKey(privateKey, data.pubkey)));
function $e6ab9b966de1f36a$var$createRumor(event, privateKey) {
    const rumor = {
        created_at: $e6ab9b966de1f36a$var$now(),
        content: "",
        tags: [],
        ...event,
        pubkey: $e6ab9b966de1f36a$export$889def73691f9837(privateKey)
    };
    rumor.id = $e6ab9b966de1f36a$export$11a838ad4e557e0e(rumor);
    return rumor;
}
function $e6ab9b966de1f36a$var$createSeal(rumor, privateKey, recipientPublicKey) {
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$Seal,
        content: $e6ab9b966de1f36a$var$nip44Encrypt(rumor, privateKey, recipientPublicKey),
        created_at: $e6ab9b966de1f36a$var$randomNow(),
        tags: []
    }, privateKey);
}
function $e6ab9b966de1f36a$var$createWrap(seal, recipientPublicKey) {
    const randomKey = $e6ab9b966de1f36a$export$16ca411381fc81c8();
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$GiftWrap,
        content: $e6ab9b966de1f36a$var$nip44Encrypt(seal, randomKey, recipientPublicKey),
        created_at: $e6ab9b966de1f36a$var$randomNow(),
        tags: [
            [
                "p",
                recipientPublicKey
            ]
        ]
    }, randomKey);
}
function $e6ab9b966de1f36a$var$wrapEvent(event, senderPrivateKey, recipientPublicKey) {
    const rumor = $e6ab9b966de1f36a$var$createRumor(event, senderPrivateKey);
    const seal = $e6ab9b966de1f36a$var$createSeal(rumor, senderPrivateKey, recipientPublicKey);
    return $e6ab9b966de1f36a$var$createWrap(seal, recipientPublicKey);
}
function $e6ab9b966de1f36a$var$wrapManyEvents(event, senderPrivateKey, recipientsPublicKeys) {
    if (!recipientsPublicKeys || recipientsPublicKeys.length === 0) throw new Error("At least one recipient is required.");
    const senderPublicKey = $e6ab9b966de1f36a$export$889def73691f9837(senderPrivateKey);
    const wrappeds = [
        $e6ab9b966de1f36a$var$wrapEvent(event, senderPrivateKey, senderPublicKey)
    ];
    recipientsPublicKeys.forEach((recipientPublicKey)=>{
        wrappeds.push($e6ab9b966de1f36a$var$wrapEvent(event, senderPrivateKey, recipientPublicKey));
    });
    return wrappeds;
}
function $e6ab9b966de1f36a$var$unwrapEvent(wrap, recipientPrivateKey) {
    const unwrappedSeal = $e6ab9b966de1f36a$var$nip44Decrypt(wrap, recipientPrivateKey);
    return $e6ab9b966de1f36a$var$nip44Decrypt(unwrappedSeal, recipientPrivateKey);
}
function $e6ab9b966de1f36a$var$unwrapManyEvents(wrappedEvents, recipientPrivateKey) {
    let unwrappedEvents = [];
    wrappedEvents.forEach((e)=>{
        unwrappedEvents.push($e6ab9b966de1f36a$var$unwrapEvent(e, recipientPrivateKey));
    });
    unwrappedEvents.sort((a, b)=>a.created_at - b.created_at);
    return unwrappedEvents;
}
// nip17.ts
function $e6ab9b966de1f36a$var$createEvent(recipients, message, conversationTitle, replyTo) {
    const baseEvent = {
        created_at: Math.ceil(Date.now() / 1e3),
        kind: $e6ab9b966de1f36a$var$PrivateDirectMessage,
        tags: [],
        content: message
    };
    const recipientsArray = Array.isArray(recipients) ? recipients : [
        recipients
    ];
    recipientsArray.forEach(({ publicKey: publicKey, relayUrl: relayUrl })=>{
        baseEvent.tags.push(relayUrl ? [
            "p",
            publicKey,
            relayUrl
        ] : [
            "p",
            publicKey
        ]);
    });
    if (replyTo) baseEvent.tags.push([
        "e",
        replyTo.eventId,
        replyTo.relayUrl || "",
        "reply"
    ]);
    if (conversationTitle) baseEvent.tags.push([
        "subject",
        conversationTitle
    ]);
    return baseEvent;
}
function $e6ab9b966de1f36a$var$wrapEvent2(senderPrivateKey, recipient, message, conversationTitle, replyTo) {
    const event = $e6ab9b966de1f36a$var$createEvent(recipient, message, conversationTitle, replyTo);
    return $e6ab9b966de1f36a$var$wrapEvent(event, senderPrivateKey, recipient.publicKey);
}
function $e6ab9b966de1f36a$var$wrapManyEvents2(senderPrivateKey, recipients, message, conversationTitle, replyTo) {
    if (!recipients || recipients.length === 0) throw new Error("At least one recipient is required.");
    const senderPublicKey = $e6ab9b966de1f36a$export$889def73691f9837(senderPrivateKey);
    return [
        {
            publicKey: senderPublicKey
        },
        ...recipients
    ].map((recipient)=>$e6ab9b966de1f36a$var$wrapEvent2(senderPrivateKey, recipient, message, conversationTitle, replyTo));
}
var $e6ab9b966de1f36a$var$unwrapEvent2 = $e6ab9b966de1f36a$var$unwrapEvent;
var $e6ab9b966de1f36a$var$unwrapManyEvents2 = $e6ab9b966de1f36a$var$unwrapManyEvents;
// nip18.ts
var $e6ab9b966de1f36a$export$4ea8e35b5adc7369 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$4ea8e35b5adc7369, {
    finishRepostEvent: ()=>$e6ab9b966de1f36a$var$finishRepostEvent,
    getRepostedEvent: ()=>$e6ab9b966de1f36a$var$getRepostedEvent,
    getRepostedEventPointer: ()=>$e6ab9b966de1f36a$var$getRepostedEventPointer
});
function $e6ab9b966de1f36a$var$finishRepostEvent(t, reposted, relayUrl, privateKey) {
    let kind;
    const tags = [
        ...t.tags ?? [],
        [
            "e",
            reposted.id,
            relayUrl
        ],
        [
            "p",
            reposted.pubkey
        ]
    ];
    if (reposted.kind === $e6ab9b966de1f36a$var$ShortTextNote) kind = $e6ab9b966de1f36a$var$Repost;
    else {
        kind = $e6ab9b966de1f36a$var$GenericRepost;
        tags.push([
            "k",
            String(reposted.kind)
        ]);
    }
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: kind,
        tags: tags,
        content: t.content === "" || reposted.tags?.find((tag)=>tag[0] === "-") ? "" : JSON.stringify(reposted),
        created_at: t.created_at
    }, privateKey);
}
function $e6ab9b966de1f36a$var$getRepostedEventPointer(event) {
    if (![
        $e6ab9b966de1f36a$var$Repost,
        $e6ab9b966de1f36a$var$GenericRepost
    ].includes(event.kind)) return void 0;
    let lastETag;
    let lastPTag;
    for(let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--){
        const tag = event.tags[i2];
        if (tag.length >= 2) {
            if (tag[0] === "e" && lastETag === void 0) lastETag = tag;
            else if (tag[0] === "p" && lastPTag === void 0) lastPTag = tag;
        }
    }
    if (lastETag === void 0) return void 0;
    return {
        id: lastETag[1],
        relays: [
            lastETag[2],
            lastPTag?.[2]
        ].filter((x)=>typeof x === "string"),
        author: lastPTag?.[1]
    };
}
function $e6ab9b966de1f36a$var$getRepostedEvent(event, { skipVerification: skipVerification } = {}) {
    const pointer = $e6ab9b966de1f36a$var$getRepostedEventPointer(event);
    if (pointer === void 0 || event.content === "") return void 0;
    let repostedEvent;
    try {
        repostedEvent = JSON.parse(event.content);
    } catch (error) {
        return void 0;
    }
    if (repostedEvent.id !== pointer.id) return void 0;
    if (!skipVerification && !$e6ab9b966de1f36a$export$909d658b5069e986(repostedEvent)) return void 0;
    return repostedEvent;
}
// nip21.ts
var $e6ab9b966de1f36a$export$60e8a8091cb0f224 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$60e8a8091cb0f224, {
    NOSTR_URI_REGEX: ()=>$e6ab9b966de1f36a$var$NOSTR_URI_REGEX,
    parse: ()=>$e6ab9b966de1f36a$var$parse2,
    test: ()=>$e6ab9b966de1f36a$var$test
});
var $e6ab9b966de1f36a$var$NOSTR_URI_REGEX = new RegExp(`nostr:(${$e6ab9b966de1f36a$var$BECH32_REGEX.source})`);
function $e6ab9b966de1f36a$var$test(value) {
    return typeof value === "string" && new RegExp(`^${$e6ab9b966de1f36a$var$NOSTR_URI_REGEX.source}$`).test(value);
}
function $e6ab9b966de1f36a$var$parse2(uri) {
    const match = uri.match(new RegExp(`^${$e6ab9b966de1f36a$var$NOSTR_URI_REGEX.source}$`));
    if (!match) throw new Error(`Invalid Nostr URI: ${uri}`);
    return {
        uri: match[0],
        value: match[1],
        decoded: $e6ab9b966de1f36a$var$decode(match[1])
    };
}
// nip25.ts
var $e6ab9b966de1f36a$export$b1c1f2c9e30679b1 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$b1c1f2c9e30679b1, {
    finishReactionEvent: ()=>$e6ab9b966de1f36a$var$finishReactionEvent,
    getReactedEventPointer: ()=>$e6ab9b966de1f36a$var$getReactedEventPointer
});
function $e6ab9b966de1f36a$var$finishReactionEvent(t, reacted, privateKey) {
    const inheritedTags = reacted.tags.filter((tag)=>tag.length >= 2 && (tag[0] === "e" || tag[0] === "p"));
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        ...t,
        kind: $e6ab9b966de1f36a$var$Reaction,
        tags: [
            ...t.tags ?? [],
            ...inheritedTags,
            [
                "e",
                reacted.id
            ],
            [
                "p",
                reacted.pubkey
            ]
        ],
        content: t.content ?? "+"
    }, privateKey);
}
function $e6ab9b966de1f36a$var$getReactedEventPointer(event) {
    if (event.kind !== $e6ab9b966de1f36a$var$Reaction) return void 0;
    let lastETag;
    let lastPTag;
    for(let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--){
        const tag = event.tags[i2];
        if (tag.length >= 2) {
            if (tag[0] === "e" && lastETag === void 0) lastETag = tag;
            else if (tag[0] === "p" && lastPTag === void 0) lastPTag = tag;
        }
    }
    if (lastETag === void 0 || lastPTag === void 0) return void 0;
    return {
        id: lastETag[1],
        relays: [
            lastETag[2],
            lastPTag[2]
        ].filter((x)=>x !== void 0),
        author: lastPTag[1]
    };
}
// nip27.ts
var $e6ab9b966de1f36a$export$9ccc31c93a561269 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$9ccc31c93a561269, {
    parse: ()=>$e6ab9b966de1f36a$var$parse3
});
var $e6ab9b966de1f36a$var$noCharacter = /\W/m;
var $e6ab9b966de1f36a$var$noURLCharacter = /\W |\W$|$|,| /m;
function* $e6ab9b966de1f36a$var$parse3(content) {
    const max = content.length;
    let prevIndex = 0;
    let index = 0;
    while(index < max){
        let u = content.indexOf(":", index);
        if (u === -1) break;
        if (content.substring(u - 5, u) === "nostr") {
            const m = content.substring(u + 60).match($e6ab9b966de1f36a$var$noCharacter);
            const end = m ? u + 60 + m.index : max;
            try {
                let pointer;
                let { data: data, type: type } = $e6ab9b966de1f36a$var$decode(content.substring(u + 1, end));
                switch(type){
                    case "npub":
                        pointer = {
                            pubkey: data
                        };
                        break;
                    case "nsec":
                    case "note":
                        index = end + 1;
                        continue;
                    default:
                        pointer = data;
                }
                if (prevIndex !== u - 5) yield {
                    type: "text",
                    text: content.substring(prevIndex, u - 5)
                };
                yield {
                    type: "reference",
                    pointer: pointer
                };
                index = end;
                prevIndex = index;
                continue;
            } catch (_err) {
                index = u + 1;
                continue;
            }
        } else if (content.substring(u - 5, u) === "https" || content.substring(u - 4, u) === "http") {
            const m = content.substring(u + 4).match($e6ab9b966de1f36a$var$noURLCharacter);
            const end = m ? u + 4 + m.index : max;
            const prefixLen = content[u - 1] === "s" ? 5 : 4;
            try {
                let url = new URL(content.substring(u - prefixLen, end));
                if (url.hostname.indexOf(".") === -1) throw new Error("invalid url");
                if (prevIndex !== u - prefixLen) yield {
                    type: "text",
                    text: content.substring(prevIndex, u - prefixLen)
                };
                if (url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg") || url.pathname.endsWith(".gif") || url.pathname.endsWith(".webp")) {
                    yield {
                        type: "image",
                        url: url.toString()
                    };
                    index = end;
                    prevIndex = index;
                    continue;
                }
                if (url.pathname.endsWith(".mp4") || url.pathname.endsWith(".avi") || url.pathname.endsWith(".webm") || url.pathname.endsWith(".mkv")) {
                    yield {
                        type: "video",
                        url: url.toString()
                    };
                    index = end;
                    prevIndex = index;
                    continue;
                }
                if (url.pathname.endsWith(".mp3") || url.pathname.endsWith(".aac") || url.pathname.endsWith(".ogg") || url.pathname.endsWith(".opus")) {
                    yield {
                        type: "audio",
                        url: url.toString()
                    };
                    index = end;
                    prevIndex = index;
                    continue;
                }
                yield {
                    type: "url",
                    url: url.toString()
                };
                index = end;
                prevIndex = index;
                continue;
            } catch (_err) {
                index = end + 1;
                continue;
            }
        } else if (content.substring(u - 3, u) === "wss" || content.substring(u - 2, u) === "ws") {
            const m = content.substring(u + 4).match($e6ab9b966de1f36a$var$noURLCharacter);
            const end = m ? u + 4 + m.index : max;
            const prefixLen = content[u - 1] === "s" ? 3 : 2;
            try {
                let url = new URL(content.substring(u - prefixLen, end));
                if (url.hostname.indexOf(".") === -1) throw new Error("invalid ws url");
                if (prevIndex !== u - prefixLen) yield {
                    type: "text",
                    text: content.substring(prevIndex, u - prefixLen)
                };
                yield {
                    type: "relay",
                    url: url.toString()
                };
                index = end;
                prevIndex = index;
                continue;
            } catch (_err) {
                index = end + 1;
                continue;
            }
        } else {
            index = u + 1;
            continue;
        }
    }
    if (prevIndex !== max) yield {
        type: "text",
        text: content.substring(prevIndex)
    };
}
// nip28.ts
var $e6ab9b966de1f36a$export$7071f77a07a6a6f4 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$7071f77a07a6a6f4, {
    channelCreateEvent: ()=>$e6ab9b966de1f36a$var$channelCreateEvent,
    channelHideMessageEvent: ()=>$e6ab9b966de1f36a$var$channelHideMessageEvent,
    channelMessageEvent: ()=>$e6ab9b966de1f36a$var$channelMessageEvent,
    channelMetadataEvent: ()=>$e6ab9b966de1f36a$var$channelMetadataEvent,
    channelMuteUserEvent: ()=>$e6ab9b966de1f36a$var$channelMuteUserEvent
});
var $e6ab9b966de1f36a$var$channelCreateEvent = (t, privateKey)=>{
    let content;
    if (typeof t.content === "object") content = JSON.stringify(t.content);
    else if (typeof t.content === "string") content = t.content;
    else return void 0;
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$ChannelCreation,
        tags: [
            ...t.tags ?? []
        ],
        content: content,
        created_at: t.created_at
    }, privateKey);
};
var $e6ab9b966de1f36a$var$channelMetadataEvent = (t, privateKey)=>{
    let content;
    if (typeof t.content === "object") content = JSON.stringify(t.content);
    else if (typeof t.content === "string") content = t.content;
    else return void 0;
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$ChannelMetadata,
        tags: [
            [
                "e",
                t.channel_create_event_id
            ],
            ...t.tags ?? []
        ],
        content: content,
        created_at: t.created_at
    }, privateKey);
};
var $e6ab9b966de1f36a$var$channelMessageEvent = (t, privateKey)=>{
    const tags = [
        [
            "e",
            t.channel_create_event_id,
            t.relay_url,
            "root"
        ]
    ];
    if (t.reply_to_channel_message_event_id) tags.push([
        "e",
        t.reply_to_channel_message_event_id,
        t.relay_url,
        "reply"
    ]);
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$ChannelMessage,
        tags: [
            ...tags,
            ...t.tags ?? []
        ],
        content: t.content,
        created_at: t.created_at
    }, privateKey);
};
var $e6ab9b966de1f36a$var$channelHideMessageEvent = (t, privateKey)=>{
    let content;
    if (typeof t.content === "object") content = JSON.stringify(t.content);
    else if (typeof t.content === "string") content = t.content;
    else return void 0;
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$ChannelHideMessage,
        tags: [
            [
                "e",
                t.channel_message_event_id
            ],
            ...t.tags ?? []
        ],
        content: content,
        created_at: t.created_at
    }, privateKey);
};
var $e6ab9b966de1f36a$var$channelMuteUserEvent = (t, privateKey)=>{
    let content;
    if (typeof t.content === "object") content = JSON.stringify(t.content);
    else if (typeof t.content === "string") content = t.content;
    else return void 0;
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20({
        kind: $e6ab9b966de1f36a$var$ChannelMuteUser,
        tags: [
            [
                "p",
                t.pubkey_to_mute
            ],
            ...t.tags ?? []
        ],
        content: content,
        created_at: t.created_at
    }, privateKey);
};
// nip30.ts
var $e6ab9b966de1f36a$export$66c1afb78a5c4d11 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$66c1afb78a5c4d11, {
    EMOJI_SHORTCODE_REGEX: ()=>$e6ab9b966de1f36a$var$EMOJI_SHORTCODE_REGEX,
    matchAll: ()=>$e6ab9b966de1f36a$var$matchAll,
    regex: ()=>$e6ab9b966de1f36a$var$regex,
    replaceAll: ()=>$e6ab9b966de1f36a$var$replaceAll
});
var $e6ab9b966de1f36a$var$EMOJI_SHORTCODE_REGEX = /:(\w+):/;
var $e6ab9b966de1f36a$var$regex = ()=>new RegExp(`\\B${$e6ab9b966de1f36a$var$EMOJI_SHORTCODE_REGEX.source}\\B`, "g");
function* $e6ab9b966de1f36a$var$matchAll(content) {
    const matches = content.matchAll($e6ab9b966de1f36a$var$regex());
    for (const match of matches)try {
        const [shortcode, name] = match;
        yield {
            shortcode: shortcode,
            name: name,
            start: match.index,
            end: match.index + shortcode.length
        };
    } catch (_e) {}
}
function $e6ab9b966de1f36a$var$replaceAll(content, replacer) {
    return content.replaceAll($e6ab9b966de1f36a$var$regex(), (shortcode, name)=>{
        return replacer({
            shortcode: shortcode,
            name: name
        });
    });
}
// nip39.ts
var $e6ab9b966de1f36a$export$13ad325f8a2de8f7 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$13ad325f8a2de8f7, {
    useFetchImplementation: ()=>$e6ab9b966de1f36a$var$useFetchImplementation3,
    validateGithub: ()=>$e6ab9b966de1f36a$var$validateGithub
});
var $e6ab9b966de1f36a$var$_fetch3;
try {
    $e6ab9b966de1f36a$var$_fetch3 = fetch;
} catch  {}
function $e6ab9b966de1f36a$var$useFetchImplementation3(fetchImplementation) {
    $e6ab9b966de1f36a$var$_fetch3 = fetchImplementation;
}
async function $e6ab9b966de1f36a$var$validateGithub(pubkey, username, proof) {
    try {
        let res = await (await $e6ab9b966de1f36a$var$_fetch3(`https://gist.github.com/${username}/${proof}/raw`)).text();
        return res === `Verifying that I control the following Nostr public key: ${pubkey}`;
    } catch (_) {
        return false;
    }
}
// nip47.ts
var $e6ab9b966de1f36a$export$ae4a1ae308afd39c = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$ae4a1ae308afd39c, {
    makeNwcRequestEvent: ()=>$e6ab9b966de1f36a$var$makeNwcRequestEvent,
    parseConnectionString: ()=>$e6ab9b966de1f36a$var$parseConnectionString
});
function $e6ab9b966de1f36a$var$parseConnectionString(connectionString) {
    const { pathname: pathname, searchParams: searchParams } = new URL(connectionString);
    const pubkey = pathname;
    const relay = searchParams.get("relay");
    const secret = searchParams.get("secret");
    if (!pubkey || !relay || !secret) throw new Error("invalid connection string");
    return {
        pubkey: pubkey,
        relay: relay,
        secret: secret
    };
}
async function $e6ab9b966de1f36a$var$makeNwcRequestEvent(pubkey, secretKey, invoice) {
    const content = {
        method: "pay_invoice",
        params: {
            invoice: invoice
        }
    };
    const encryptedContent = $e6ab9b966de1f36a$var$encrypt(secretKey, pubkey, JSON.stringify(content));
    const eventTemplate = {
        kind: $e6ab9b966de1f36a$var$NWCWalletRequest,
        created_at: Math.round(Date.now() / 1e3),
        content: encryptedContent,
        tags: [
            [
                "p",
                pubkey
            ]
        ]
    };
    return $e6ab9b966de1f36a$export$bc33d3bdc1ddcd20(eventTemplate, secretKey);
}
// nip54.ts
var $e6ab9b966de1f36a$export$bfde88566f6f2a51 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$bfde88566f6f2a51, {
    normalizeIdentifier: ()=>$e6ab9b966de1f36a$var$normalizeIdentifier
});
function $e6ab9b966de1f36a$var$normalizeIdentifier(name) {
    name = name.trim().toLowerCase();
    name = name.normalize("NFKC");
    return Array.from(name).map((char)=>{
        if (/\p{Letter}/u.test(char) || /\p{Number}/u.test(char)) return char;
        return "-";
    }).join("");
}
// nip57.ts
var $e6ab9b966de1f36a$export$14e0982e3a536e29 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$14e0982e3a536e29, {
    getSatoshisAmountFromBolt11: ()=>$e6ab9b966de1f36a$var$getSatoshisAmountFromBolt11,
    getZapEndpoint: ()=>$e6ab9b966de1f36a$var$getZapEndpoint,
    makeZapReceipt: ()=>$e6ab9b966de1f36a$var$makeZapReceipt,
    makeZapRequest: ()=>$e6ab9b966de1f36a$var$makeZapRequest,
    useFetchImplementation: ()=>$e6ab9b966de1f36a$var$useFetchImplementation4,
    validateZapRequest: ()=>$e6ab9b966de1f36a$var$validateZapRequest
});
var $e6ab9b966de1f36a$var$_fetch4;
try {
    $e6ab9b966de1f36a$var$_fetch4 = fetch;
} catch  {}
function $e6ab9b966de1f36a$var$useFetchImplementation4(fetchImplementation) {
    $e6ab9b966de1f36a$var$_fetch4 = fetchImplementation;
}
async function $e6ab9b966de1f36a$var$getZapEndpoint(metadata) {
    try {
        let lnurl = "";
        let { lud06: lud06, lud16: lud16 } = JSON.parse(metadata.content);
        if (lud06) {
            let { words: words } = (0, $25Yxt.bech32).decode(lud06, 1e3);
            let data = (0, $25Yxt.bech32).fromWords(words);
            lnurl = $e6ab9b966de1f36a$var$utf8Decoder.decode(data);
        } else if (lud16) {
            let [name, domain] = lud16.split("@");
            lnurl = new URL(`/.well-known/lnurlp/${name}`, `https://${domain}`).toString();
        } else return null;
        let res = await $e6ab9b966de1f36a$var$_fetch4(lnurl);
        let body = await res.json();
        if (body.allowsNostr && body.nostrPubkey) return body.callback;
    } catch (err) {}
    return null;
}
function $e6ab9b966de1f36a$var$makeZapRequest({ profile: profile, event: event, amount: amount, relays: relays, comment: comment = "" }) {
    if (!amount) throw new Error("amount not given");
    if (!profile) throw new Error("profile not given");
    let zr = {
        kind: 9734,
        created_at: Math.round(Date.now() / 1e3),
        content: comment,
        tags: [
            [
                "p",
                profile
            ],
            [
                "amount",
                amount.toString()
            ],
            [
                "relays",
                ...relays
            ]
        ]
    };
    if (event && typeof event === "string") zr.tags.push([
        "e",
        event
    ]);
    if (event && typeof event === "object") {
        if ($e6ab9b966de1f36a$var$isReplaceableKind(event.kind)) {
            const a = [
                "a",
                `${event.kind}:${event.pubkey}:`
            ];
            zr.tags.push(a);
        } else if ($e6ab9b966de1f36a$var$isAddressableKind(event.kind)) {
            let d = event.tags.find(([t, v])=>t === "d" && v);
            if (!d) throw new Error("d tag not found or is empty");
            const a = [
                "a",
                `${event.kind}:${event.pubkey}:${d[1]}`
            ];
            zr.tags.push(a);
        }
    }
    return zr;
}
function $e6ab9b966de1f36a$var$validateZapRequest(zapRequestString) {
    let zapRequest;
    try {
        zapRequest = JSON.parse(zapRequestString);
    } catch (err) {
        return "Invalid zap request JSON.";
    }
    if (!$e6ab9b966de1f36a$export$d08d852dd562b1ce(zapRequest)) return "Zap request is not a valid Nostr event.";
    if (!$e6ab9b966de1f36a$export$909d658b5069e986(zapRequest)) return "Invalid signature on zap request.";
    let p = zapRequest.tags.find(([t, v])=>t === "p" && v);
    if (!p) return "Zap request doesn't have a 'p' tag.";
    if (!p[1].match(/^[a-f0-9]{64}$/)) return "Zap request 'p' tag is not valid hex.";
    let e = zapRequest.tags.find(([t, v])=>t === "e" && v);
    if (e && !e[1].match(/^[a-f0-9]{64}$/)) return "Zap request 'e' tag is not valid hex.";
    let relays = zapRequest.tags.find(([t, v])=>t === "relays" && v);
    if (!relays) return "Zap request doesn't have a 'relays' tag.";
    return null;
}
function $e6ab9b966de1f36a$var$makeZapReceipt({ zapRequest: zapRequest, preimage: preimage, bolt11: bolt11, paidAt: paidAt }) {
    let zr = JSON.parse(zapRequest);
    let tagsFromZapRequest = zr.tags.filter(([t])=>t === "e" || t === "p" || t === "a");
    let zap = {
        kind: 9735,
        created_at: Math.round(paidAt.getTime() / 1e3),
        content: "",
        tags: [
            ...tagsFromZapRequest,
            [
                "P",
                zr.pubkey
            ],
            [
                "bolt11",
                bolt11
            ],
            [
                "description",
                zapRequest
            ]
        ]
    };
    if (preimage) zap.tags.push([
        "preimage",
        preimage
    ]);
    return zap;
}
function $e6ab9b966de1f36a$var$getSatoshisAmountFromBolt11(bolt11) {
    if (bolt11.length < 50) return 0;
    bolt11 = bolt11.substring(0, 50);
    const idx = bolt11.lastIndexOf("1");
    if (idx === -1) return 0;
    const hrp = bolt11.substring(0, idx);
    if (!hrp.startsWith("lnbc")) return 0;
    const amount = hrp.substring(4);
    if (amount.length < 1) return 0;
    const char = amount[amount.length - 1];
    const digit = char.charCodeAt(0) - "0".charCodeAt(0);
    const isDigit = digit >= 0 && digit <= 9;
    let cutPoint = amount.length - 1;
    if (isDigit) cutPoint++;
    if (cutPoint < 1) return 0;
    const num = parseInt(amount.substring(0, cutPoint));
    switch(char){
        case "m":
            return num * 1e5;
        case "u":
            return num * 100;
        case "n":
            return num / 10;
        case "p":
            return num / 1e4;
        default:
            return num * 1e8;
    }
}
// nip98.ts
var $e6ab9b966de1f36a$export$dbfcdd2f6b6e41d9 = {};
$e6ab9b966de1f36a$var$__export($e6ab9b966de1f36a$export$dbfcdd2f6b6e41d9, {
    getToken: ()=>$e6ab9b966de1f36a$var$getToken,
    hashPayload: ()=>$e6ab9b966de1f36a$var$hashPayload,
    unpackEventFromToken: ()=>$e6ab9b966de1f36a$var$unpackEventFromToken,
    validateEvent: ()=>$e6ab9b966de1f36a$var$validateEvent2,
    validateEventKind: ()=>$e6ab9b966de1f36a$var$validateEventKind,
    validateEventMethodTag: ()=>$e6ab9b966de1f36a$var$validateEventMethodTag,
    validateEventPayloadTag: ()=>$e6ab9b966de1f36a$var$validateEventPayloadTag,
    validateEventTimestamp: ()=>$e6ab9b966de1f36a$var$validateEventTimestamp,
    validateEventUrlTag: ()=>$e6ab9b966de1f36a$var$validateEventUrlTag,
    validateToken: ()=>$e6ab9b966de1f36a$var$validateToken
});
var $e6ab9b966de1f36a$var$_authorizationScheme = "Nostr ";
async function $e6ab9b966de1f36a$var$getToken(loginUrl, httpMethod, sign, includeAuthorizationScheme = false, payload) {
    const event = {
        kind: $e6ab9b966de1f36a$var$HTTPAuth,
        tags: [
            [
                "u",
                loginUrl
            ],
            [
                "method",
                httpMethod
            ]
        ],
        created_at: Math.round(new Date().getTime() / 1e3),
        content: ""
    };
    if (payload) event.tags.push([
        "payload",
        $e6ab9b966de1f36a$var$hashPayload(payload)
    ]);
    const signedEvent = await sign(event);
    const authorizationScheme = includeAuthorizationScheme ? $e6ab9b966de1f36a$var$_authorizationScheme : "";
    return authorizationScheme + (0, $25Yxt.base64).encode($e6ab9b966de1f36a$var$utf8Encoder.encode(JSON.stringify(signedEvent)));
}
async function $e6ab9b966de1f36a$var$validateToken(token, url, method) {
    const event = await $e6ab9b966de1f36a$var$unpackEventFromToken(token).catch((error)=>{
        throw error;
    });
    const valid = await $e6ab9b966de1f36a$var$validateEvent2(event, url, method).catch((error)=>{
        throw error;
    });
    return valid;
}
async function $e6ab9b966de1f36a$var$unpackEventFromToken(token) {
    if (!token) throw new Error("Missing token");
    token = token.replace($e6ab9b966de1f36a$var$_authorizationScheme, "");
    const eventB64 = $e6ab9b966de1f36a$var$utf8Decoder.decode((0, $25Yxt.base64).decode(token));
    if (!eventB64 || eventB64.length === 0 || !eventB64.startsWith("{")) throw new Error("Invalid token");
    const event = JSON.parse(eventB64);
    return event;
}
function $e6ab9b966de1f36a$var$validateEventTimestamp(event) {
    if (!event.created_at) return false;
    return Math.round(new Date().getTime() / 1e3) - event.created_at < 60;
}
function $e6ab9b966de1f36a$var$validateEventKind(event) {
    return event.kind === $e6ab9b966de1f36a$var$HTTPAuth;
}
function $e6ab9b966de1f36a$var$validateEventUrlTag(event, url) {
    const urlTag = event.tags.find((t)=>t[0] === "u");
    if (!urlTag) return false;
    return urlTag.length > 0 && urlTag[1] === url;
}
function $e6ab9b966de1f36a$var$validateEventMethodTag(event, method) {
    const methodTag = event.tags.find((t)=>t[0] === "method");
    if (!methodTag) return false;
    return methodTag.length > 0 && methodTag[1].toLowerCase() === method.toLowerCase();
}
function $e6ab9b966de1f36a$var$hashPayload(payload) {
    const hash = (0, $YRaTA.sha256)($e6ab9b966de1f36a$var$utf8Encoder.encode(JSON.stringify(payload)));
    return (0, $jxo4c.bytesToHex)(hash);
}
function $e6ab9b966de1f36a$var$validateEventPayloadTag(event, payload) {
    const payloadTag = event.tags.find((t)=>t[0] === "payload");
    if (!payloadTag) return false;
    const payloadHash = $e6ab9b966de1f36a$var$hashPayload(payload);
    return payloadTag.length > 0 && payloadTag[1] === payloadHash;
}
async function $e6ab9b966de1f36a$var$validateEvent2(event, url, method, body) {
    if (!$e6ab9b966de1f36a$export$909d658b5069e986(event)) throw new Error("Invalid nostr event, signature invalid");
    if (!$e6ab9b966de1f36a$var$validateEventKind(event)) throw new Error("Invalid nostr event, kind invalid");
    if (!$e6ab9b966de1f36a$var$validateEventTimestamp(event)) throw new Error("Invalid nostr event, created_at timestamp invalid");
    if (!$e6ab9b966de1f36a$var$validateEventUrlTag(event, url)) throw new Error("Invalid nostr event, url tag invalid");
    if (!$e6ab9b966de1f36a$var$validateEventMethodTag(event, method)) throw new Error("Invalid nostr event, method tag invalid");
    if (Boolean(body) && typeof body === "object" && Object.keys(body).length > 0) {
        if (!$e6ab9b966de1f36a$var$validateEventPayloadTag(event, body)) throw new Error("Invalid nostr event, payload tag does not match request body hash");
    }
    return true;
}

});
parcelRegister("kCY3A", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.encodeToCurve = module.exports.hashToCurve = module.exports.schnorr = module.exports.secp256k1 = void 0;

var $c9Lqa = parcelRequire("c9Lqa");

var $5rGUq = parcelRequire("5rGUq");

var $7iX9N = parcelRequire("7iX9N");

var $NEiph = parcelRequire("NEiph");

var $8kac0 = parcelRequire("8kac0");

var $1BhJ7 = parcelRequire("1BhJ7");

var $ivT5M = parcelRequire("ivT5M");
const $f045f15002115c1f$var$secp256k1P = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
const $f045f15002115c1f$var$secp256k1N = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
const $f045f15002115c1f$var$_1n = BigInt(1);
const $f045f15002115c1f$var$_2n = BigInt(2);
const $f045f15002115c1f$var$divNearest = (a, b)=>(a + b / $f045f15002115c1f$var$_2n) / b;
/**
 * √n = n^((p+1)/4) for fields p = 3 mod 4. We unwrap the loop and multiply bit-by-bit.
 * (P+1n/4n).toString(2) would produce bits [223x 1, 0, 22x 1, 4x 0, 11, 00]
 */ function $f045f15002115c1f$var$sqrtMod(y) {
    const P = $f045f15002115c1f$var$secp256k1P;
    // prettier-ignore
    const _3n = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    // prettier-ignore
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P; // x^3, 11
    const b3 = b2 * b2 * y % P; // x^7
    const b6 = (0, $7iX9N.pow2)(b3, _3n, P) * b3 % P;
    const b9 = (0, $7iX9N.pow2)(b6, _3n, P) * b3 % P;
    const b11 = (0, $7iX9N.pow2)(b9, $f045f15002115c1f$var$_2n, P) * b2 % P;
    const b22 = (0, $7iX9N.pow2)(b11, _11n, P) * b11 % P;
    const b44 = (0, $7iX9N.pow2)(b22, _22n, P) * b22 % P;
    const b88 = (0, $7iX9N.pow2)(b44, _44n, P) * b44 % P;
    const b176 = (0, $7iX9N.pow2)(b88, _88n, P) * b88 % P;
    const b220 = (0, $7iX9N.pow2)(b176, _44n, P) * b44 % P;
    const b223 = (0, $7iX9N.pow2)(b220, _3n, P) * b3 % P;
    const t1 = (0, $7iX9N.pow2)(b223, _23n, P) * b22 % P;
    const t2 = (0, $7iX9N.pow2)(t1, _6n, P) * b2 % P;
    const root = (0, $7iX9N.pow2)(t2, $f045f15002115c1f$var$_2n, P);
    if (!$f045f15002115c1f$var$Fp.eql($f045f15002115c1f$var$Fp.sqr(root), y)) throw new Error('Cannot find square root');
    return root;
}
const $f045f15002115c1f$var$Fp = (0, $7iX9N.Field)($f045f15002115c1f$var$secp256k1P, undefined, undefined, {
    sqrt: $f045f15002115c1f$var$sqrtMod
});
module.exports.secp256k1 = (0, $ivT5M.createCurve)({
    a: BigInt(0),
    b: BigInt(7),
    Fp: $f045f15002115c1f$var$Fp,
    n: $f045f15002115c1f$var$secp256k1N,
    // Base point (x, y) aka generator point
    Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
    Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
    h: BigInt(1),
    lowS: true,
    /**
     * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
     * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
     * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
     * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
     */ endo: {
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee'),
        splitScalar: (k)=>{
            const n = $f045f15002115c1f$var$secp256k1N;
            const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
            const b1 = -$f045f15002115c1f$var$_1n * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
            const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
            const b2 = a1;
            const POW_2_128 = BigInt('0x100000000000000000000000000000000'); // (2n**128n).toString(16)
            const c1 = $f045f15002115c1f$var$divNearest(b2 * k, n);
            const c2 = $f045f15002115c1f$var$divNearest(-b1 * k, n);
            let k1 = (0, $7iX9N.mod)(k - c1 * a1 - c2 * a2, n);
            let k2 = (0, $7iX9N.mod)(-c1 * b1 - c2 * b2, n);
            const k1neg = k1 > POW_2_128;
            const k2neg = k2 > POW_2_128;
            if (k1neg) k1 = n - k1;
            if (k2neg) k2 = n - k2;
            if (k1 > POW_2_128 || k2 > POW_2_128) throw new Error('splitScalar: Endomorphism failed, k=' + k);
            return {
                k1neg: k1neg,
                k1: k1,
                k2neg: k2neg,
                k2: k2
            };
        }
    }
}, $c9Lqa.sha256);
// Schnorr signatures are superior to ECDSA from above. Below is Schnorr-specific BIP0340 code.
// https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
const $f045f15002115c1f$var$_0n = BigInt(0);
const $f045f15002115c1f$var$fe = (x)=>typeof x === 'bigint' && $f045f15002115c1f$var$_0n < x && x < $f045f15002115c1f$var$secp256k1P;
const $f045f15002115c1f$var$ge = (x)=>typeof x === 'bigint' && $f045f15002115c1f$var$_0n < x && x < $f045f15002115c1f$var$secp256k1N;
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */ const $f045f15002115c1f$var$TAGGED_HASH_PREFIXES = {};
function $f045f15002115c1f$var$taggedHash(tag, ...messages) {
    let tagP = $f045f15002115c1f$var$TAGGED_HASH_PREFIXES[tag];
    if (tagP === undefined) {
        const tagH = (0, $c9Lqa.sha256)(Uint8Array.from(tag, (c)=>c.charCodeAt(0)));
        tagP = (0, $8kac0.concatBytes)(tagH, tagH);
        $f045f15002115c1f$var$TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return (0, $c9Lqa.sha256)((0, $8kac0.concatBytes)(tagP, ...messages));
}
// ECDSA compact points are 33-byte. Schnorr is 32: we strip first byte 0x02 or 0x03
const $f045f15002115c1f$var$pointToBytes = (point)=>point.toRawBytes(true).slice(1);
const $f045f15002115c1f$var$numTo32b = (n)=>(0, $8kac0.numberToBytesBE)(n, 32);
const $f045f15002115c1f$var$modP = (x)=>(0, $7iX9N.mod)(x, $f045f15002115c1f$var$secp256k1P);
const $f045f15002115c1f$var$modN = (x)=>(0, $7iX9N.mod)(x, $f045f15002115c1f$var$secp256k1N);
const $f045f15002115c1f$var$Point = module.exports.secp256k1.ProjectivePoint;
const $f045f15002115c1f$var$GmulAdd = (Q, a, b)=>$f045f15002115c1f$var$Point.BASE.multiplyAndAddUnsafe(Q, a, b);
// Calculate point, scalar and bytes
function $f045f15002115c1f$var$schnorrGetExtPubKey(priv) {
    let d_ = module.exports.secp256k1.utils.normPrivateKeyToScalar(priv); // same method executed in fromPrivateKey
    let p = $f045f15002115c1f$var$Point.fromPrivateKey(d_); // P = d'⋅G; 0 < d' < n check is done inside
    const scalar = p.hasEvenY() ? d_ : $f045f15002115c1f$var$modN(-d_);
    return {
        scalar: scalar,
        bytes: $f045f15002115c1f$var$pointToBytes(p)
    };
}
/**
 * lift_x from BIP340. Convert 32-byte x coordinate to elliptic curve point.
 * @returns valid point checked for being on-curve
 */ function $f045f15002115c1f$var$lift_x(x) {
    if (!$f045f15002115c1f$var$fe(x)) throw new Error('bad x: need 0 < x < p'); // Fail if x ≥ p.
    const xx = $f045f15002115c1f$var$modP(x * x);
    const c = $f045f15002115c1f$var$modP(xx * x + BigInt(7)); // Let c = x³ + 7 mod p.
    let y = $f045f15002115c1f$var$sqrtMod(c); // Let y = c^(p+1)/4 mod p.
    if (y % $f045f15002115c1f$var$_2n !== $f045f15002115c1f$var$_0n) y = $f045f15002115c1f$var$modP(-y); // Return the unique point P such that x(P) = x and
    const p = new $f045f15002115c1f$var$Point(x, y, $f045f15002115c1f$var$_1n); // y(P) = y if y mod 2 = 0 or y(P) = p-y otherwise.
    p.assertValidity();
    return p;
}
/**
 * Create tagged hash, convert it to bigint, reduce modulo-n.
 */ function $f045f15002115c1f$var$challenge(...args) {
    return $f045f15002115c1f$var$modN((0, $8kac0.bytesToNumberBE)($f045f15002115c1f$var$taggedHash('BIP0340/challenge', ...args)));
}
/**
 * Schnorr public key is just `x` coordinate of Point as per BIP340.
 */ function $f045f15002115c1f$var$schnorrGetPublicKey(privateKey) {
    return $f045f15002115c1f$var$schnorrGetExtPubKey(privateKey).bytes; // d'=int(sk). Fail if d'=0 or d'≥n. Ret bytes(d'⋅G)
}
/**
 * Creates Schnorr signature as per BIP340. Verifies itself before returning anything.
 * auxRand is optional and is not the sole source of k generation: bad CSPRNG won't be dangerous.
 */ function $f045f15002115c1f$var$schnorrSign(message, privateKey, auxRand = (0, $5rGUq.randomBytes)(32)) {
    const m = (0, $8kac0.ensureBytes)('message', message);
    const { bytes: px, scalar: d } = $f045f15002115c1f$var$schnorrGetExtPubKey(privateKey); // checks for isWithinCurveOrder
    const a = (0, $8kac0.ensureBytes)('auxRand', auxRand, 32); // Auxiliary random data a: a 32-byte array
    const t = $f045f15002115c1f$var$numTo32b(d ^ (0, $8kac0.bytesToNumberBE)($f045f15002115c1f$var$taggedHash('BIP0340/aux', a))); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
    const rand = $f045f15002115c1f$var$taggedHash('BIP0340/nonce', t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
    const k_ = $f045f15002115c1f$var$modN((0, $8kac0.bytesToNumberBE)(rand)); // Let k' = int(rand) mod n
    if (k_ === $f045f15002115c1f$var$_0n) throw new Error('sign failed: k is zero'); // Fail if k' = 0.
    const { bytes: rx, scalar: k } = $f045f15002115c1f$var$schnorrGetExtPubKey(k_); // Let R = k'⋅G.
    const e = $f045f15002115c1f$var$challenge(rx, px, m); // Let e = int(hash/challenge(bytes(R) || bytes(P) || m)) mod n.
    const sig = new Uint8Array(64); // Let sig = bytes(R) || bytes((k + ed) mod n).
    sig.set(rx, 0);
    sig.set($f045f15002115c1f$var$numTo32b($f045f15002115c1f$var$modN(k + e * d)), 32);
    // If Verify(bytes(P), m, sig) (see below) returns failure, abort
    if (!$f045f15002115c1f$var$schnorrVerify(sig, m, px)) throw new Error('sign: Invalid signature produced');
    return sig;
}
/**
 * Verifies Schnorr signature.
 * Will swallow errors & return false except for initial type validation of arguments.
 */ function $f045f15002115c1f$var$schnorrVerify(signature, message, publicKey) {
    const sig = (0, $8kac0.ensureBytes)('signature', signature, 64);
    const m = (0, $8kac0.ensureBytes)('message', message);
    const pub = (0, $8kac0.ensureBytes)('publicKey', publicKey, 32);
    try {
        const P = $f045f15002115c1f$var$lift_x((0, $8kac0.bytesToNumberBE)(pub)); // P = lift_x(int(pk)); fail if that fails
        const r = (0, $8kac0.bytesToNumberBE)(sig.subarray(0, 32)); // Let r = int(sig[0:32]); fail if r ≥ p.
        if (!$f045f15002115c1f$var$fe(r)) return false;
        const s = (0, $8kac0.bytesToNumberBE)(sig.subarray(32, 64)); // Let s = int(sig[32:64]); fail if s ≥ n.
        if (!$f045f15002115c1f$var$ge(s)) return false;
        const e = $f045f15002115c1f$var$challenge($f045f15002115c1f$var$numTo32b(r), $f045f15002115c1f$var$pointToBytes(P), m); // int(challenge(bytes(r)||bytes(P)||m))%n
        const R = $f045f15002115c1f$var$GmulAdd(P, s, $f045f15002115c1f$var$modN(-e)); // R = s⋅G - e⋅P
        if (!R || !R.hasEvenY() || R.toAffine().x !== r) return false; // -eP == (n-e)P
        return true; // Fail if is_infinite(R) / not has_even_y(R) / x(R) ≠ r.
    } catch (error) {
        return false;
    }
}
module.exports.schnorr = (()=>({
        getPublicKey: $f045f15002115c1f$var$schnorrGetPublicKey,
        sign: $f045f15002115c1f$var$schnorrSign,
        verify: $f045f15002115c1f$var$schnorrVerify,
        utils: {
            randomPrivateKey: module.exports.secp256k1.utils.randomPrivateKey,
            lift_x: $f045f15002115c1f$var$lift_x,
            pointToBytes: $f045f15002115c1f$var$pointToBytes,
            numberToBytesBE: $8kac0.numberToBytesBE,
            bytesToNumberBE: $8kac0.bytesToNumberBE,
            taggedHash: $f045f15002115c1f$var$taggedHash,
            mod: $7iX9N.mod
        }
    }))();
const $f045f15002115c1f$var$isoMap = /* @__PURE__ */ (()=>(0, $1BhJ7.isogenyMap)($f045f15002115c1f$var$Fp, [
        // xNum
        [
            '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7',
            '0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581',
            '0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262',
            '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c'
        ],
        // xDen
        [
            '0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b',
            '0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14',
            '0x0000000000000000000000000000000000000000000000000000000000000001'
        ],
        // yNum
        [
            '0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c',
            '0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3',
            '0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931',
            '0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84'
        ],
        // yDen
        [
            '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b',
            '0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573',
            '0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f',
            '0x0000000000000000000000000000000000000000000000000000000000000001'
        ]
    ].map((i)=>i.map((j)=>BigInt(j)))))();
const $f045f15002115c1f$var$mapSWU = /* @__PURE__ */ (()=>(0, $NEiph.mapToCurveSimpleSWU)($f045f15002115c1f$var$Fp, {
        A: BigInt('0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533'),
        B: BigInt('1771'),
        Z: $f045f15002115c1f$var$Fp.create(BigInt('-11'))
    }))();
const $f045f15002115c1f$var$htf = /* @__PURE__ */ (()=>(0, $1BhJ7.createHasher)(module.exports.secp256k1.ProjectivePoint, (scalars)=>{
        const { x: x, y: y } = $f045f15002115c1f$var$mapSWU($f045f15002115c1f$var$Fp.create(scalars[0]));
        return $f045f15002115c1f$var$isoMap(x, y);
    }, {
        DST: 'secp256k1_XMD:SHA-256_SSWU_RO_',
        encodeDST: 'secp256k1_XMD:SHA-256_SSWU_NU_',
        p: $f045f15002115c1f$var$Fp.ORDER,
        m: 1,
        k: 128,
        expand: 'xmd',
        hash: $c9Lqa.sha256
    }))();
module.exports.hashToCurve = (()=>$f045f15002115c1f$var$htf.hashToCurve)();
module.exports.encodeToCurve = (()=>$f045f15002115c1f$var$htf.encodeToCurve)();

});
parcelRegister("c9Lqa", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.sha224 = module.exports.sha256 = void 0;

var $gaxlU = parcelRequire("gaxlU");

var $5rGUq = parcelRequire("5rGUq");
// SHA2-256 need to try 2^128 hashes to execute birthday attack.
// BTC network is doing 2^67 hashes/sec as per early 2023.
// Choice: a ? b : c
const $8d9b1c1d807a7d40$var$Chi = (a, b, c)=>a & b ^ ~a & c;
// Majority function, true if any two inpust is true
const $8d9b1c1d807a7d40$var$Maj = (a, b, c)=>a & b ^ a & c ^ b & c;
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const $8d9b1c1d807a7d40$var$SHA256_K = /* @__PURE__ */ new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const $8d9b1c1d807a7d40$var$IV = /* @__PURE__ */ new Uint32Array([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const $8d9b1c1d807a7d40$var$SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class $8d9b1c1d807a7d40$var$SHA256 extends $gaxlU.SHA2 {
    constructor(){
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = $8d9b1c1d807a7d40$var$IV[0] | 0;
        this.B = $8d9b1c1d807a7d40$var$IV[1] | 0;
        this.C = $8d9b1c1d807a7d40$var$IV[2] | 0;
        this.D = $8d9b1c1d807a7d40$var$IV[3] | 0;
        this.E = $8d9b1c1d807a7d40$var$IV[4] | 0;
        this.F = $8d9b1c1d807a7d40$var$IV[5] | 0;
        this.G = $8d9b1c1d807a7d40$var$IV[6] | 0;
        this.H = $8d9b1c1d807a7d40$var$IV[7] | 0;
    }
    get() {
        const { A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)$8d9b1c1d807a7d40$var$SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = $8d9b1c1d807a7d40$var$SHA256_W[i - 15];
            const W2 = $8d9b1c1d807a7d40$var$SHA256_W[i - 2];
            const s0 = (0, $5rGUq.rotr)(W15, 7) ^ (0, $5rGUq.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, $5rGUq.rotr)(W2, 17) ^ (0, $5rGUq.rotr)(W2, 19) ^ W2 >>> 10;
            $8d9b1c1d807a7d40$var$SHA256_W[i] = s1 + $8d9b1c1d807a7d40$var$SHA256_W[i - 7] + s0 + $8d9b1c1d807a7d40$var$SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, $5rGUq.rotr)(E, 6) ^ (0, $5rGUq.rotr)(E, 11) ^ (0, $5rGUq.rotr)(E, 25);
            const T1 = H + sigma1 + $8d9b1c1d807a7d40$var$Chi(E, F, G) + $8d9b1c1d807a7d40$var$SHA256_K[i] + $8d9b1c1d807a7d40$var$SHA256_W[i] | 0;
            const sigma0 = (0, $5rGUq.rotr)(A, 2) ^ (0, $5rGUq.rotr)(A, 13) ^ (0, $5rGUq.rotr)(A, 22);
            const T2 = sigma0 + $8d9b1c1d807a7d40$var$Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        $8d9b1c1d807a7d40$var$SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
// Constants from https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
class $8d9b1c1d807a7d40$var$SHA224 extends $8d9b1c1d807a7d40$var$SHA256 {
    constructor(){
        super();
        this.A = -1056596264;
        this.B = 914150663;
        this.C = 812702999;
        this.D = -150054599;
        this.E = -4191439;
        this.F = 1750603025;
        this.G = 1694076839;
        this.H = -1090891868;
        this.outputLen = 28;
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */ module.exports.sha256 = (0, $5rGUq.wrapConstructor)(()=>new $8d9b1c1d807a7d40$var$SHA256());
module.exports.sha224 = (0, $5rGUq.wrapConstructor)(()=>new $8d9b1c1d807a7d40$var$SHA224());

});
parcelRegister("gaxlU", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.SHA2 = void 0;

var $2dxsF = parcelRequire("2dxsF");

var $5rGUq = parcelRequire("5rGUq");
// Polyfill for Safari 14
function $bc5773954adebd6b$var$setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class $bc5773954adebd6b$var$SHA2 extends $5rGUq.Hash {
    constructor(blockLen, outputLen, padOffset, isLE){
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, $5rGUq.createView)(this.buffer);
    }
    update(data) {
        (0, $2dxsF.exists)(this);
        const { view: view, buffer: buffer, blockLen: blockLen } = this;
        data = (0, $5rGUq.toBytes)(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, $5rGUq.createView)(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, $2dxsF.exists)(this);
        (0, $2dxsF.output)(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer: buffer, view: view, blockLen: blockLen, isLE: isLE } = this;
        let { pos: pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        $bc5773954adebd6b$var$setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, $5rGUq.createView)(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer: buffer, outputLen: outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen: blockLen, buffer: buffer, length: length, finished: finished, destroyed: destroyed, pos: pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
}
module.exports.SHA2 = $bc5773954adebd6b$var$SHA2;

});
parcelRegister("2dxsF", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.output = module.exports.exists = module.exports.hash = module.exports.bytes = module.exports.bool = module.exports.number = void 0;
function $19d6c063055142e3$var$number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
module.exports.number = $19d6c063055142e3$var$number;
function $19d6c063055142e3$var$bool(b) {
    if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}
module.exports.bool = $19d6c063055142e3$var$bool;
function $19d6c063055142e3$var$bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array)) throw new Error('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
module.exports.bytes = $19d6c063055142e3$var$bytes;
function $19d6c063055142e3$var$hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    $19d6c063055142e3$var$number(hash.outputLen);
    $19d6c063055142e3$var$number(hash.blockLen);
}
module.exports.hash = $19d6c063055142e3$var$hash;
function $19d6c063055142e3$var$exists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
module.exports.exists = $19d6c063055142e3$var$exists;
function $19d6c063055142e3$var$output(out, instance) {
    $19d6c063055142e3$var$bytes(out);
    const min = instance.outputLen;
    if (out.length < min) throw new Error(`digestInto() expects output buffer of length at least ${min}`);
}
module.exports.output = $19d6c063055142e3$var$output;
const $19d6c063055142e3$var$assert = {
    number: $19d6c063055142e3$var$number,
    bool: $19d6c063055142e3$var$bool,
    bytes: $19d6c063055142e3$var$bytes,
    hash: $19d6c063055142e3$var$hash,
    exists: $19d6c063055142e3$var$exists,
    output: $19d6c063055142e3$var$output
};
module.exports.default = $19d6c063055142e3$var$assert;

});

parcelRegister("5rGUq", function(module, exports) {
"use strict";
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.randomBytes = module.exports.wrapXOFConstructorWithOpts = module.exports.wrapConstructorWithOpts = module.exports.wrapConstructor = module.exports.checkOpts = module.exports.Hash = module.exports.concatBytes = module.exports.toBytes = module.exports.utf8ToBytes = module.exports.asyncLoop = module.exports.nextTick = module.exports.hexToBytes = module.exports.bytesToHex = module.exports.isLE = module.exports.rotr = module.exports.createView = module.exports.u32 = module.exports.u8 = void 0;

var $gdqi0 = parcelRequire("gdqi0");
const $3f70c23ae7ca2d86$var$u8a = (a)=>a instanceof Uint8Array;
// Cast array to different type
const $3f70c23ae7ca2d86$var$u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.u8 = $3f70c23ae7ca2d86$var$u8;
const $3f70c23ae7ca2d86$var$u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
module.exports.u32 = $3f70c23ae7ca2d86$var$u32;
// Cast array to view
const $3f70c23ae7ca2d86$var$createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.createView = $3f70c23ae7ca2d86$var$createView;
// The rotate right (circular right shift) operation for uint32
const $3f70c23ae7ca2d86$var$rotr = (word, shift)=>word << 32 - shift | word >>> shift;
module.exports.rotr = $3f70c23ae7ca2d86$var$rotr;
// big-endian hardware is rare. Just in case someone still decides to run hashes:
// early-throw an error because we don't support BE yet.
module.exports.isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!module.exports.isLE) throw new Error('Non little-endian hardware is not supported');
const $3f70c23ae7ca2d86$var$hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function $3f70c23ae7ca2d86$var$bytesToHex(bytes) {
    if (!$3f70c23ae7ca2d86$var$u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++)hex += $3f70c23ae7ca2d86$var$hexes[bytes[i]];
    return hex;
}
module.exports.bytesToHex = $3f70c23ae7ca2d86$var$bytesToHex;
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function $3f70c23ae7ca2d86$var$hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
module.exports.hexToBytes = $3f70c23ae7ca2d86$var$hexToBytes;
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const $3f70c23ae7ca2d86$var$nextTick = async ()=>{};
module.exports.nextTick = $3f70c23ae7ca2d86$var$nextTick;
// Returns control to thread each 'tick' ms to avoid blocking
async function $3f70c23ae7ca2d86$var$asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await (0, module.exports.nextTick)();
        ts += diff;
    }
}
module.exports.asyncLoop = $3f70c23ae7ca2d86$var$asyncLoop;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function $3f70c23ae7ca2d86$var$utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
module.exports.utf8ToBytes = $3f70c23ae7ca2d86$var$utf8ToBytes;
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */ function $3f70c23ae7ca2d86$var$toBytes(data) {
    if (typeof data === 'string') data = $3f70c23ae7ca2d86$var$utf8ToBytes(data);
    if (!$3f70c23ae7ca2d86$var$u8a(data)) throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
}
module.exports.toBytes = $3f70c23ae7ca2d86$var$toBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function $3f70c23ae7ca2d86$var$concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!$3f70c23ae7ca2d86$var$u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
module.exports.concatBytes = $3f70c23ae7ca2d86$var$concatBytes;
// For runtime check if class implements interface
class $3f70c23ae7ca2d86$var$Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
module.exports.Hash = $3f70c23ae7ca2d86$var$Hash;
const $3f70c23ae7ca2d86$var$toStr = {}.toString;
function $3f70c23ae7ca2d86$var$checkOpts(defaults, opts) {
    if (opts !== undefined && $3f70c23ae7ca2d86$var$toStr.call(opts) !== '[object Object]') throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
module.exports.checkOpts = $3f70c23ae7ca2d86$var$checkOpts;
function $3f70c23ae7ca2d86$var$wrapConstructor(hashCons) {
    const hashC = (msg)=>hashCons().update($3f70c23ae7ca2d86$var$toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
module.exports.wrapConstructor = $3f70c23ae7ca2d86$var$wrapConstructor;
function $3f70c23ae7ca2d86$var$wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update($3f70c23ae7ca2d86$var$toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
module.exports.wrapConstructorWithOpts = $3f70c23ae7ca2d86$var$wrapConstructorWithOpts;
function $3f70c23ae7ca2d86$var$wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update($3f70c23ae7ca2d86$var$toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
module.exports.wrapXOFConstructorWithOpts = $3f70c23ae7ca2d86$var$wrapXOFConstructorWithOpts;
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */ function $3f70c23ae7ca2d86$var$randomBytes(bytesLength = 32) {
    if ($gdqi0.crypto && typeof $gdqi0.crypto.getRandomValues === 'function') return $gdqi0.crypto.getRandomValues(new Uint8Array(bytesLength));
    throw new Error('crypto.getRandomValues must be defined');
}
module.exports.randomBytes = $3f70c23ae7ca2d86$var$randomBytes;

});
parcelRegister("gdqi0", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.crypto = void 0;
module.exports.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

});




parcelRegister("7iX9N", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.mapHashToField = module.exports.getMinHashLength = module.exports.getFieldBytesLength = module.exports.hashToPrivateScalar = module.exports.FpSqrtEven = module.exports.FpSqrtOdd = module.exports.Field = module.exports.nLength = module.exports.FpIsSquare = module.exports.FpDiv = module.exports.FpInvertBatch = module.exports.FpPow = module.exports.validateField = module.exports.isNegativeLE = module.exports.FpSqrt = module.exports.tonelliShanks = module.exports.invert = module.exports.pow2 = module.exports.pow = module.exports.mod = void 0;

var $8kac0 = parcelRequire("8kac0");
// prettier-ignore
const $55181a2db8848286$var$_0n = BigInt(0), $55181a2db8848286$var$_1n = BigInt(1), $55181a2db8848286$var$_2n = BigInt(2), $55181a2db8848286$var$_3n = BigInt(3);
// prettier-ignore
const $55181a2db8848286$var$_4n = BigInt(4), $55181a2db8848286$var$_5n = BigInt(5), $55181a2db8848286$var$_8n = BigInt(8);
// prettier-ignore
const $55181a2db8848286$var$_9n = BigInt(9), $55181a2db8848286$var$_16n = BigInt(16);
// Calculates a modulo b
function $55181a2db8848286$var$mod(a, b) {
    const result = a % b;
    return result >= $55181a2db8848286$var$_0n ? result : b + result;
}
module.exports.mod = $55181a2db8848286$var$mod;
/**
 * Efficiently raise num to power and do modular division.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 * @example
 * pow(2n, 6n, 11n) // 64n % 11n == 9n
 */ // TODO: use field version && remove
function $55181a2db8848286$var$pow(num, power, modulo) {
    if (modulo <= $55181a2db8848286$var$_0n || power < $55181a2db8848286$var$_0n) throw new Error('Expected power/modulo > 0');
    if (modulo === $55181a2db8848286$var$_1n) return $55181a2db8848286$var$_0n;
    let res = $55181a2db8848286$var$_1n;
    while(power > $55181a2db8848286$var$_0n){
        if (power & $55181a2db8848286$var$_1n) res = res * num % modulo;
        num = num * num % modulo;
        power >>= $55181a2db8848286$var$_1n;
    }
    return res;
}
module.exports.pow = $55181a2db8848286$var$pow;
// Does x ^ (2 ^ power) mod p. pow2(30, 4) == 30 ^ (2 ^ 4)
function $55181a2db8848286$var$pow2(x, power, modulo) {
    let res = x;
    while(power-- > $55181a2db8848286$var$_0n){
        res *= res;
        res %= modulo;
    }
    return res;
}
module.exports.pow2 = $55181a2db8848286$var$pow2;
// Inverses number over modulo
function $55181a2db8848286$var$invert(number, modulo) {
    if (number === $55181a2db8848286$var$_0n || modulo <= $55181a2db8848286$var$_0n) throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    // Euclidean GCD https://brilliant.org/wiki/extended-euclidean-algorithm/
    // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
    let a = $55181a2db8848286$var$mod(number, modulo);
    let b = modulo;
    // prettier-ignore
    let x = $55181a2db8848286$var$_0n, y = $55181a2db8848286$var$_1n, u = $55181a2db8848286$var$_1n, v = $55181a2db8848286$var$_0n;
    while(a !== $55181a2db8848286$var$_0n){
        // JIT applies optimization if those two lines follow each other
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;
        // prettier-ignore
        b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== $55181a2db8848286$var$_1n) throw new Error('invert: does not exist');
    return $55181a2db8848286$var$mod(x, modulo);
}
module.exports.invert = $55181a2db8848286$var$invert;
/**
 * Tonelli-Shanks square root search algorithm.
 * 1. https://eprint.iacr.org/2012/685.pdf (page 12)
 * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
 * Will start an infinite loop if field order P is not prime.
 * @param P field order
 * @returns function that takes field Fp (created from P) and number n
 */ function $55181a2db8848286$var$tonelliShanks(P) {
    // Legendre constant: used to calculate Legendre symbol (a | p),
    // which denotes the value of a^((p-1)/2) (mod p).
    // (a | p) ≡ 1    if a is a square (mod p)
    // (a | p) ≡ -1   if a is not a square (mod p)
    // (a | p) ≡ 0    if a ≡ 0 (mod p)
    const legendreC = (P - $55181a2db8848286$var$_1n) / $55181a2db8848286$var$_2n;
    let Q, S, Z;
    // Step 1: By factoring out powers of 2 from p - 1,
    // find q and s such that p - 1 = q*(2^s) with q odd
    for(Q = P - $55181a2db8848286$var$_1n, S = 0; Q % $55181a2db8848286$var$_2n === $55181a2db8848286$var$_0n; Q /= $55181a2db8848286$var$_2n, S++);
    // Step 2: Select a non-square z such that (z | p) ≡ -1 and set c ≡ zq
    for(Z = $55181a2db8848286$var$_2n; Z < P && $55181a2db8848286$var$pow(Z, legendreC, P) !== P - $55181a2db8848286$var$_1n; Z++);
    // Fast-path
    if (S === 1) {
        const p1div4 = (P + $55181a2db8848286$var$_1n) / $55181a2db8848286$var$_4n;
        return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // Slow-path
    const Q1div2 = (Q + $55181a2db8848286$var$_1n) / $55181a2db8848286$var$_2n;
    return function tonelliSlow(Fp, n) {
        // Step 0: Check that n is indeed a square: (n | p) should not be ≡ -1
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE)) throw new Error('Cannot find square root');
        let r = S;
        // TODO: will fail at Fp2/etc
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q); // will update both x and b
        let x = Fp.pow(n, Q1div2); // first guess at the square root
        let b = Fp.pow(n, Q); // first guess at the fudge factor
        while(!Fp.eql(b, Fp.ONE)){
            if (Fp.eql(b, Fp.ZERO)) return Fp.ZERO; // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm (4. If t = 0, return r = 0)
            // Find m such b^(2^m)==1
            let m = 1;
            for(let t2 = Fp.sqr(b); m < r; m++){
                if (Fp.eql(t2, Fp.ONE)) break;
                t2 = Fp.sqr(t2); // t2 *= t2
            }
            // NOTE: r-m-1 can be bigger than 32, need to convert to bigint before shift, otherwise there will be overflow
            const ge = Fp.pow(g, $55181a2db8848286$var$_1n << BigInt(r - m - 1)); // ge = 2^(r-m-1)
            g = Fp.sqr(ge); // g = ge * ge
            x = Fp.mul(x, ge); // x *= ge
            b = Fp.mul(b, g); // b *= g
            r = m;
        }
        return x;
    };
}
module.exports.tonelliShanks = $55181a2db8848286$var$tonelliShanks;
function $55181a2db8848286$var$FpSqrt(P) {
    // NOTE: different algorithms can give different roots, it is up to user to decide which one they want.
    // For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
    // P ≡ 3 (mod 4)
    // √n = n^((P+1)/4)
    if (P % $55181a2db8848286$var$_4n === $55181a2db8848286$var$_3n) {
        // Not all roots possible!
        // const ORDER =
        //   0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
        // const NUM = 72057594037927816n;
        const p1div4 = (P + $55181a2db8848286$var$_1n) / $55181a2db8848286$var$_4n;
        return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            // Throw if root**2 != n
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // Atkin algorithm for q ≡ 5 (mod 8), https://eprint.iacr.org/2012/685.pdf (page 10)
    if (P % $55181a2db8848286$var$_8n === $55181a2db8848286$var$_5n) {
        const c1 = (P - $55181a2db8848286$var$_5n) / $55181a2db8848286$var$_8n;
        return function sqrt5mod8(Fp, n) {
            const n2 = Fp.mul(n, $55181a2db8848286$var$_2n);
            const v = Fp.pow(n2, c1);
            const nv = Fp.mul(n, v);
            const i = Fp.mul(Fp.mul(nv, $55181a2db8848286$var$_2n), v);
            const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // P ≡ 9 (mod 16)
    $55181a2db8848286$var$_9n;
    // Other cases: Tonelli-Shanks algorithm
    return $55181a2db8848286$var$tonelliShanks(P);
}
module.exports.FpSqrt = $55181a2db8848286$var$FpSqrt;
// Little-endian check for first LE bit (last BE bit);
const $55181a2db8848286$var$isNegativeLE = (num, modulo)=>($55181a2db8848286$var$mod(num, modulo) & $55181a2db8848286$var$_1n) === $55181a2db8848286$var$_1n;
module.exports.isNegativeLE = $55181a2db8848286$var$isNegativeLE;
// prettier-ignore
const $55181a2db8848286$var$FIELD_FIELDS = [
    'create',
    'isValid',
    'is0',
    'neg',
    'inv',
    'sqrt',
    'sqr',
    'eql',
    'add',
    'sub',
    'mul',
    'pow',
    'div',
    'addN',
    'subN',
    'mulN',
    'sqrN'
];
function $55181a2db8848286$var$validateField(field) {
    const initial = {
        ORDER: 'bigint',
        MASK: 'bigint',
        BYTES: 'isSafeInteger',
        BITS: 'isSafeInteger'
    };
    const opts = $55181a2db8848286$var$FIELD_FIELDS.reduce((map, val)=>{
        map[val] = 'function';
        return map;
    }, initial);
    return (0, $8kac0.validateObject)(field, opts);
}
module.exports.validateField = $55181a2db8848286$var$validateField;
// Generic field functions
/**
 * Same as `pow` but for Fp: non-constant-time.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 */ function $55181a2db8848286$var$FpPow(f, num, power) {
    // Should have same speed as pow for bigints
    // TODO: benchmark!
    if (power < $55181a2db8848286$var$_0n) throw new Error('Expected power > 0');
    if (power === $55181a2db8848286$var$_0n) return f.ONE;
    if (power === $55181a2db8848286$var$_1n) return num;
    let p = f.ONE;
    let d = num;
    while(power > $55181a2db8848286$var$_0n){
        if (power & $55181a2db8848286$var$_1n) p = f.mul(p, d);
        d = f.sqr(d);
        power >>= $55181a2db8848286$var$_1n;
    }
    return p;
}
module.exports.FpPow = $55181a2db8848286$var$FpPow;
/**
 * Efficiently invert an array of Field elements.
 * `inv(0)` will return `undefined` here: make sure to throw an error.
 */ function $55181a2db8848286$var$FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    // Walk from first to last, multiply them by each other MOD p
    const lastMultiplied = nums.reduce((acc, num, i)=>{
        if (f.is0(num)) return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
    }, f.ONE);
    // Invert last element
    const inverted = f.inv(lastMultiplied);
    // Walk from last to first, multiply them by inverted each other MOD p
    nums.reduceRight((acc, num, i)=>{
        if (f.is0(num)) return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
    }, inverted);
    return tmp;
}
module.exports.FpInvertBatch = $55181a2db8848286$var$FpInvertBatch;
function $55181a2db8848286$var$FpDiv(f, lhs, rhs) {
    return f.mul(lhs, typeof rhs === 'bigint' ? $55181a2db8848286$var$invert(rhs, f.ORDER) : f.inv(rhs));
}
module.exports.FpDiv = $55181a2db8848286$var$FpDiv;
// This function returns True whenever the value x is a square in the field F.
function $55181a2db8848286$var$FpIsSquare(f) {
    const legendreConst = (f.ORDER - $55181a2db8848286$var$_1n) / $55181a2db8848286$var$_2n; // Integer arithmetic
    return (x)=>{
        const p = f.pow(x, legendreConst);
        return f.eql(p, f.ZERO) || f.eql(p, f.ONE);
    };
}
module.exports.FpIsSquare = $55181a2db8848286$var$FpIsSquare;
// CURVE.n lengths
function $55181a2db8848286$var$nLength(n, nBitLength) {
    // Bit size, byte size of CURVE.n
    const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return {
        nBitLength: _nBitLength,
        nByteLength: nByteLength
    };
}
module.exports.nLength = $55181a2db8848286$var$nLength;
/**
 * Initializes a finite field over prime. **Non-primes are not supported.**
 * Do not init in loop: slow. Very fragile: always run a benchmark on a change.
 * Major performance optimizations:
 * * a) denormalized operations like mulN instead of mul
 * * b) same object shape: never add or remove keys
 * * c) Object.freeze
 * @param ORDER prime positive bigint
 * @param bitLen how many bits the field consumes
 * @param isLE (def: false) if encoding / decoding should be in little-endian
 * @param redef optional faster redefinitions of sqrt and other methods
 */ function $55181a2db8848286$var$Field(ORDER, bitLen, isLE = false, redef = {}) {
    if (ORDER <= $55181a2db8848286$var$_0n) throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = $55181a2db8848286$var$nLength(ORDER, bitLen);
    if (BYTES > 2048) throw new Error('Field lengths over 2048 bytes are not supported');
    const sqrtP = $55181a2db8848286$var$FpSqrt(ORDER);
    const f = Object.freeze({
        ORDER: ORDER,
        BITS: BITS,
        BYTES: BYTES,
        MASK: (0, $8kac0.bitMask)(BITS),
        ZERO: $55181a2db8848286$var$_0n,
        ONE: $55181a2db8848286$var$_1n,
        create: (num)=>$55181a2db8848286$var$mod(num, ORDER),
        isValid: (num)=>{
            if (typeof num !== 'bigint') throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
            return $55181a2db8848286$var$_0n <= num && num < ORDER; // 0 is valid element, but it's not invertible
        },
        is0: (num)=>num === $55181a2db8848286$var$_0n,
        isOdd: (num)=>(num & $55181a2db8848286$var$_1n) === $55181a2db8848286$var$_1n,
        neg: (num)=>$55181a2db8848286$var$mod(-num, ORDER),
        eql: (lhs, rhs)=>lhs === rhs,
        sqr: (num)=>$55181a2db8848286$var$mod(num * num, ORDER),
        add: (lhs, rhs)=>$55181a2db8848286$var$mod(lhs + rhs, ORDER),
        sub: (lhs, rhs)=>$55181a2db8848286$var$mod(lhs - rhs, ORDER),
        mul: (lhs, rhs)=>$55181a2db8848286$var$mod(lhs * rhs, ORDER),
        pow: (num, power)=>$55181a2db8848286$var$FpPow(f, num, power),
        div: (lhs, rhs)=>$55181a2db8848286$var$mod(lhs * $55181a2db8848286$var$invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num)=>num * num,
        addN: (lhs, rhs)=>lhs + rhs,
        subN: (lhs, rhs)=>lhs - rhs,
        mulN: (lhs, rhs)=>lhs * rhs,
        inv: (num)=>$55181a2db8848286$var$invert(num, ORDER),
        sqrt: redef.sqrt || ((n)=>sqrtP(f, n)),
        invertBatch: (lst)=>$55181a2db8848286$var$FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c)=>c ? b : a,
        toBytes: (num)=>isLE ? (0, $8kac0.numberToBytesLE)(num, BYTES) : (0, $8kac0.numberToBytesBE)(num, BYTES),
        fromBytes: (bytes)=>{
            if (bytes.length !== BYTES) throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes.length}`);
            return isLE ? (0, $8kac0.bytesToNumberLE)(bytes) : (0, $8kac0.bytesToNumberBE)(bytes);
        }
    });
    return Object.freeze(f);
}
module.exports.Field = $55181a2db8848286$var$Field;
function $55181a2db8848286$var$FpSqrtOdd(Fp, elm) {
    if (!Fp.isOdd) throw new Error(`Field doesn't have isOdd`);
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? root : Fp.neg(root);
}
module.exports.FpSqrtOdd = $55181a2db8848286$var$FpSqrtOdd;
function $55181a2db8848286$var$FpSqrtEven(Fp, elm) {
    if (!Fp.isOdd) throw new Error(`Field doesn't have isOdd`);
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? Fp.neg(root) : root;
}
module.exports.FpSqrtEven = $55181a2db8848286$var$FpSqrtEven;
/**
 * "Constant-time" private key generation utility.
 * Same as mapKeyToField, but accepts less bytes (40 instead of 48 for 32-byte field).
 * Which makes it slightly more biased, less secure.
 * @deprecated use mapKeyToField instead
 */ function $55181a2db8848286$var$hashToPrivateScalar(hash, groupOrder, isLE = false) {
    hash = (0, $8kac0.ensureBytes)('privateHash', hash);
    const hashLen = hash.length;
    const minLen = $55181a2db8848286$var$nLength(groupOrder).nByteLength + 8;
    if (minLen < 24 || hashLen < minLen || hashLen > 1024) throw new Error(`hashToPrivateScalar: expected ${minLen}-1024 bytes of input, got ${hashLen}`);
    const num = isLE ? (0, $8kac0.bytesToNumberLE)(hash) : (0, $8kac0.bytesToNumberBE)(hash);
    return $55181a2db8848286$var$mod(num, groupOrder - $55181a2db8848286$var$_1n) + $55181a2db8848286$var$_1n;
}
module.exports.hashToPrivateScalar = $55181a2db8848286$var$hashToPrivateScalar;
/**
 * Returns total number of bytes consumed by the field element.
 * For example, 32 bytes for usual 256-bit weierstrass curve.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of field
 */ function $55181a2db8848286$var$getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== 'bigint') throw new Error('field order must be bigint');
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
}
module.exports.getFieldBytesLength = $55181a2db8848286$var$getFieldBytesLength;
/**
 * Returns minimal amount of bytes that can be safely reduced
 * by field order.
 * Should be 2^-128 for 128-bit curve such as P256.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of target hash
 */ function $55181a2db8848286$var$getMinHashLength(fieldOrder) {
    const length = $55181a2db8848286$var$getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
}
module.exports.getMinHashLength = $55181a2db8848286$var$getMinHashLength;
/**
 * "Constant-time" private key generation utility.
 * Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
 * and convert them into private scalar, with the modulo bias being negligible.
 * Needs at least 48 bytes of input for 32-byte private key.
 * https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
 * FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
 * RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
 * @param hash hash output from SHA3 or a similar function
 * @param groupOrder size of subgroup - (e.g. secp256k1.CURVE.n)
 * @param isLE interpret hash bytes as LE num
 * @returns valid private scalar
 */ function $55181a2db8848286$var$mapHashToField(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = $55181a2db8848286$var$getFieldBytesLength(fieldOrder);
    const minLen = $55181a2db8848286$var$getMinHashLength(fieldOrder);
    // No small numbers: need to understand bias story. No huge numbers: easier to detect JS timings.
    if (len < 16 || len < minLen || len > 1024) throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE ? (0, $8kac0.bytesToNumberBE)(key) : (0, $8kac0.bytesToNumberLE)(key);
    // `mod(x, 11)` can sometimes produce 0. `mod(x, 10) + 1` is the same, but no 0
    const reduced = $55181a2db8848286$var$mod(num, fieldOrder - $55181a2db8848286$var$_1n) + $55181a2db8848286$var$_1n;
    return isLE ? (0, $8kac0.numberToBytesLE)(reduced, fieldLen) : (0, $8kac0.numberToBytesBE)(reduced, fieldLen);
}
module.exports.mapHashToField = $55181a2db8848286$var$mapHashToField;

});
parcelRegister("8kac0", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.validateObject = module.exports.createHmacDrbg = module.exports.bitMask = module.exports.bitSet = module.exports.bitGet = module.exports.bitLen = module.exports.utf8ToBytes = module.exports.equalBytes = module.exports.concatBytes = module.exports.ensureBytes = module.exports.numberToVarBytesBE = module.exports.numberToBytesLE = module.exports.numberToBytesBE = module.exports.bytesToNumberLE = module.exports.bytesToNumberBE = module.exports.hexToBytes = module.exports.hexToNumber = module.exports.numberToHexUnpadded = module.exports.bytesToHex = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // 100 lines of code in the file are duplicated from noble-hashes (utils).
// This is OK: `abstract` directory does not use noble-hashes.
// User may opt-in into using different hashing library. This way, noble-hashes
// won't be included into their bundle.
const $60f81907d9b3070d$var$_0n = BigInt(0);
const $60f81907d9b3070d$var$_1n = BigInt(1);
const $60f81907d9b3070d$var$_2n = BigInt(2);
const $60f81907d9b3070d$var$u8a = (a)=>a instanceof Uint8Array;
const $60f81907d9b3070d$var$hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function $60f81907d9b3070d$var$bytesToHex(bytes) {
    if (!$60f81907d9b3070d$var$u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++)hex += $60f81907d9b3070d$var$hexes[bytes[i]];
    return hex;
}
module.exports.bytesToHex = $60f81907d9b3070d$var$bytesToHex;
function $60f81907d9b3070d$var$numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
}
module.exports.numberToHexUnpadded = $60f81907d9b3070d$var$numberToHexUnpadded;
function $60f81907d9b3070d$var$hexToNumber(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
module.exports.hexToNumber = $60f81907d9b3070d$var$hexToNumber;
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function $60f81907d9b3070d$var$hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
module.exports.hexToBytes = $60f81907d9b3070d$var$hexToBytes;
// BE: Big Endian, LE: Little Endian
function $60f81907d9b3070d$var$bytesToNumberBE(bytes) {
    return $60f81907d9b3070d$var$hexToNumber($60f81907d9b3070d$var$bytesToHex(bytes));
}
module.exports.bytesToNumberBE = $60f81907d9b3070d$var$bytesToNumberBE;
function $60f81907d9b3070d$var$bytesToNumberLE(bytes) {
    if (!$60f81907d9b3070d$var$u8a(bytes)) throw new Error('Uint8Array expected');
    return $60f81907d9b3070d$var$hexToNumber($60f81907d9b3070d$var$bytesToHex(Uint8Array.from(bytes).reverse()));
}
module.exports.bytesToNumberLE = $60f81907d9b3070d$var$bytesToNumberLE;
function $60f81907d9b3070d$var$numberToBytesBE(n, len) {
    return $60f81907d9b3070d$var$hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
module.exports.numberToBytesBE = $60f81907d9b3070d$var$numberToBytesBE;
function $60f81907d9b3070d$var$numberToBytesLE(n, len) {
    return $60f81907d9b3070d$var$numberToBytesBE(n, len).reverse();
}
module.exports.numberToBytesLE = $60f81907d9b3070d$var$numberToBytesLE;
// Unpadded, rarely used
function $60f81907d9b3070d$var$numberToVarBytesBE(n) {
    return $60f81907d9b3070d$var$hexToBytes($60f81907d9b3070d$var$numberToHexUnpadded(n));
}
module.exports.numberToVarBytesBE = $60f81907d9b3070d$var$numberToVarBytesBE;
/**
 * Takes hex string or Uint8Array, converts to Uint8Array.
 * Validates output length.
 * Will throw error for other types.
 * @param title descriptive title for an error e.g. 'private key'
 * @param hex hex string or Uint8Array
 * @param expectedLength optional, will compare to result array's length
 * @returns
 */ function $60f81907d9b3070d$var$ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') try {
        res = $60f81907d9b3070d$var$hexToBytes(hex);
    } catch (e) {
        throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
    else if ($60f81907d9b3070d$var$u8a(hex)) // Uint8Array.from() instead of hash.slice() because node.js Buffer
    // is instance of Uint8Array, and its slice() creates **mutable** copy
    res = Uint8Array.from(hex);
    else throw new Error(`${title} must be hex string or Uint8Array`);
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength) throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
}
module.exports.ensureBytes = $60f81907d9b3070d$var$ensureBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function $60f81907d9b3070d$var$concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!$60f81907d9b3070d$var$u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
module.exports.concatBytes = $60f81907d9b3070d$var$concatBytes;
function $60f81907d9b3070d$var$equalBytes(b1, b2) {
    // We don't care about timing attacks here
    if (b1.length !== b2.length) return false;
    for(let i = 0; i < b1.length; i++)if (b1[i] !== b2[i]) return false;
    return true;
}
module.exports.equalBytes = $60f81907d9b3070d$var$equalBytes;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function $60f81907d9b3070d$var$utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
module.exports.utf8ToBytes = $60f81907d9b3070d$var$utf8ToBytes;
// Bit operations
/**
 * Calculates amount of bits in a bigint.
 * Same as `n.toString(2).length`
 */ function $60f81907d9b3070d$var$bitLen(n) {
    let len;
    for(len = 0; n > $60f81907d9b3070d$var$_0n; n >>= $60f81907d9b3070d$var$_1n, len += 1);
    return len;
}
module.exports.bitLen = $60f81907d9b3070d$var$bitLen;
/**
 * Gets single bit at position.
 * NOTE: first bit position is 0 (same as arrays)
 * Same as `!!+Array.from(n.toString(2)).reverse()[pos]`
 */ function $60f81907d9b3070d$var$bitGet(n, pos) {
    return n >> BigInt(pos) & $60f81907d9b3070d$var$_1n;
}
module.exports.bitGet = $60f81907d9b3070d$var$bitGet;
/**
 * Sets single bit at position.
 */ const $60f81907d9b3070d$var$bitSet = (n, pos, value)=>{
    return n | (value ? $60f81907d9b3070d$var$_1n : $60f81907d9b3070d$var$_0n) << BigInt(pos);
};
module.exports.bitSet = $60f81907d9b3070d$var$bitSet;
/**
 * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
 * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
 */ const $60f81907d9b3070d$var$bitMask = (n)=>($60f81907d9b3070d$var$_2n << BigInt(n - 1)) - $60f81907d9b3070d$var$_1n;
module.exports.bitMask = $60f81907d9b3070d$var$bitMask;
// DRBG
const $60f81907d9b3070d$var$u8n = (data)=>new Uint8Array(data); // creates Uint8Array
const $60f81907d9b3070d$var$u8fr = (arr)=>Uint8Array.from(arr); // another shortcut
/**
 * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
 * @returns function that will call DRBG until 2nd arg returns something meaningful
 * @example
 *   const drbg = createHmacDRBG<Key>(32, 32, hmac);
 *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined
 */ function $60f81907d9b3070d$var$createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== 'number' || hashLen < 2) throw new Error('hashLen must be a number');
    if (typeof qByteLen !== 'number' || qByteLen < 2) throw new Error('qByteLen must be a number');
    if (typeof hmacFn !== 'function') throw new Error('hmacFn must be a function');
    // Step B, Step C: set hashLen to 8*ceil(hlen/8)
    let v = $60f81907d9b3070d$var$u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
    let k = $60f81907d9b3070d$var$u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same
    let i = 0; // Iterations counter, will throw when over 1000
    const reset = ()=>{
        v.fill(1);
        k.fill(0);
        i = 0;
    };
    const h = (...b)=>hmacFn(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = (seed = $60f81907d9b3070d$var$u8n())=>{
        // HMAC-DRBG reseed() function. Steps D-G
        k = h($60f81907d9b3070d$var$u8fr([
            0x00
        ]), seed); // k = hmac(k || v || 0x00 || seed)
        v = h(); // v = hmac(k || v)
        if (seed.length === 0) return;
        k = h($60f81907d9b3070d$var$u8fr([
            0x01
        ]), seed); // k = hmac(k || v || 0x01 || seed)
        v = h(); // v = hmac(k || v)
    };
    const gen = ()=>{
        // HMAC-DRBG generate() function
        if (i++ >= 1000) throw new Error('drbg: tried 1000 values');
        let len = 0;
        const out = [];
        while(len < qByteLen){
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
        }
        return $60f81907d9b3070d$var$concatBytes(...out);
    };
    const genUntil = (seed, pred)=>{
        reset();
        reseed(seed); // Steps D-G
        let res = undefined; // Step H: grind until k is in [1..n-1]
        while(!(res = pred(gen())))reseed();
        reset();
        return res;
    };
    return genUntil;
}
module.exports.createHmacDrbg = $60f81907d9b3070d$var$createHmacDrbg;
// Validating curves and fields
const $60f81907d9b3070d$var$validatorFns = {
    bigint: (val)=>typeof val === 'bigint',
    function: (val)=>typeof val === 'function',
    boolean: (val)=>typeof val === 'boolean',
    string: (val)=>typeof val === 'string',
    stringOrUint8Array: (val)=>typeof val === 'string' || val instanceof Uint8Array,
    isSafeInteger: (val)=>Number.isSafeInteger(val),
    array: (val)=>Array.isArray(val),
    field: (val, object)=>object.Fp.isValid(val),
    hash: (val)=>typeof val === 'function' && Number.isSafeInteger(val.outputLen)
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function $60f81907d9b3070d$var$validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional)=>{
        const checkVal = $60f81907d9b3070d$var$validatorFns[type];
        if (typeof checkVal !== 'function') throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === undefined) return;
        if (!checkVal(val, object)) throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    };
    for (const [fieldName, type] of Object.entries(validators))checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))checkField(fieldName, type, true);
    return object;
}
module.exports.validateObject = $60f81907d9b3070d$var$validateObject; // validate type tests
 // const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };
 // const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!
 // // Should fail type-check
 // const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });
 // const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });
 // const z3 = validateObject(o, { test: 'boolean', z: 'bug' });
 // const z4 = validateObject(o, { a: 'boolean', z: 'bug' });

});


parcelRegister("NEiph", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.mapToCurveSimpleSWU = module.exports.SWUFpSqrtRatio = module.exports.weierstrass = module.exports.weierstrassPoints = module.exports.DER = void 0;

var $7iX9N = parcelRequire("7iX9N");

var $8kac0 = parcelRequire("8kac0");

var $8kac0 = parcelRequire("8kac0");

var $gMdUA = parcelRequire("gMdUA");
function $0953d5a421f06ba8$var$validatePointOpts(curve) {
    const opts = (0, $gMdUA.validateBasic)(curve);
    $8kac0.validateObject(opts, {
        a: 'field',
        b: 'field'
    }, {
        allowedPrivateKeyLengths: 'array',
        wrapPrivateKey: 'boolean',
        isTorsionFree: 'function',
        clearCofactor: 'function',
        allowInfinityPoint: 'boolean',
        fromBytes: 'function',
        toBytes: 'function'
    });
    const { endo: endo, Fp: Fp, a: a } = opts;
    if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) throw new Error('Endomorphism can only be defined for Koblitz curves that have a=0');
        if (typeof endo !== 'object' || typeof endo.beta !== 'bigint' || typeof endo.splitScalar !== 'function') throw new Error('Expected endomorphism with beta: bigint and splitScalar: function');
    }
    return Object.freeze({
        ...opts
    });
}
// ASN.1 DER encoding utilities
const { bytesToNumberBE: $0953d5a421f06ba8$var$b2n, hexToBytes: $0953d5a421f06ba8$var$h2b } = $8kac0;
module.exports.DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
        constructor(m = ''){
            super(m);
        }
    },
    _parseInt (data) {
        const { Err: E } = module.exports.DER;
        if (data.length < 2 || data[0] !== 0x02) throw new E('Invalid signature integer tag');
        const len = data[1];
        const res = data.subarray(2, len + 2);
        if (!len || res.length !== len) throw new E('Invalid signature integer: wrong length');
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        if (res[0] & 128) throw new E('Invalid signature integer: negative');
        if (res[0] === 0x00 && !(res[1] & 128)) throw new E('Invalid signature integer: unnecessary leading zero');
        return {
            d: $0953d5a421f06ba8$var$b2n(res),
            l: data.subarray(len + 2)
        }; // d is data, l is left
    },
    toSig (hex) {
        // parse DER signature
        const { Err: E } = module.exports.DER;
        const data = typeof hex === 'string' ? $0953d5a421f06ba8$var$h2b(hex) : hex;
        if (!(data instanceof Uint8Array)) throw new Error('ui8a expected');
        let l = data.length;
        if (l < 2 || data[0] != 0x30) throw new E('Invalid signature tag');
        if (data[1] !== l - 2) throw new E('Invalid signature: incorrect length');
        const { d: r, l: sBytes } = module.exports.DER._parseInt(data.subarray(2));
        const { d: s, l: rBytesLeft } = module.exports.DER._parseInt(sBytes);
        if (rBytesLeft.length) throw new E('Invalid signature: left bytes after parsing');
        return {
            r: r,
            s: s
        };
    },
    hexFromSig (sig) {
        // Add leading zero if first byte has negative bit enabled. More details in '_parseInt'
        const slice = (s)=>Number.parseInt(s[0], 16) & 8 ? '00' + s : s;
        const h = (num)=>{
            const hex = num.toString(16);
            return hex.length & 1 ? `0${hex}` : hex;
        };
        const s = slice(h(sig.s));
        const r = slice(h(sig.r));
        const shl = s.length / 2;
        const rhl = r.length / 2;
        const sl = h(shl);
        const rl = h(rhl);
        return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
};
// Be friendly to bad ECMAScript parsers by not using bigint literals
// prettier-ignore
const $0953d5a421f06ba8$var$_0n = BigInt(0), $0953d5a421f06ba8$var$_1n = BigInt(1), $0953d5a421f06ba8$var$_2n = BigInt(2), $0953d5a421f06ba8$var$_3n = BigInt(3), $0953d5a421f06ba8$var$_4n = BigInt(4);
function $0953d5a421f06ba8$var$weierstrassPoints(opts) {
    const CURVE = $0953d5a421f06ba8$var$validatePointOpts(opts);
    const { Fp: Fp } = CURVE; // All curves has same field / group length as for now, but they can differ
    const toBytes = CURVE.toBytes || ((_c, point, _isCompressed)=>{
        const a = point.toAffine();
        return $8kac0.concatBytes(Uint8Array.from([
            0x04
        ]), Fp.toBytes(a.x), Fp.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes)=>{
        // const head = bytes[0];
        const tail = bytes.subarray(1);
        // if (head !== 0x04) throw new Error('Only non-compressed encoding is supported');
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return {
            x: x,
            y: y
        };
    });
    /**
     * y² = x³ + ax + b: Short weierstrass curve formula
     * @returns y²
     */ function weierstrassEquation(x) {
        const { a: a, b: b } = CURVE;
        const x2 = Fp.sqr(x); // x * x
        const x3 = Fp.mul(x2, x); // x2 * x
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b); // x3 + a * x + b
    }
    // Validate whether the passed curve params are valid.
    // We check if curve equation works for generator point.
    // `assertValidity()` won't work: `isTorsionFree()` is not available at this point in bls12-381.
    // ProjectivePoint class has not been initialized yet.
    if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx))) throw new Error('bad generator point: equation left != right');
    // Valid group elements reside in range 1..n-1
    function isWithinCurveOrder(num) {
        return typeof num === 'bigint' && $0953d5a421f06ba8$var$_0n < num && num < CURVE.n;
    }
    function assertGE(num) {
        if (!isWithinCurveOrder(num)) throw new Error('Expected valid bigint: 0 < bigint < curve.n');
    }
    // Validates if priv key is valid and converts it to bigint.
    // Supports options allowedPrivateKeyLengths and wrapPrivateKey.
    function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength: nByteLength, wrapPrivateKey: wrapPrivateKey, n: n } = CURVE;
        if (lengths && typeof key !== 'bigint') {
            if (key instanceof Uint8Array) key = $8kac0.bytesToHex(key);
            // Normalize to hex string, pad. E.g. P521 would norm 130-132 char hex to 132-char bytes
            if (typeof key !== 'string' || !lengths.includes(key.length)) throw new Error('Invalid key');
            key = key.padStart(nByteLength * 2, '0');
        }
        let num;
        try {
            num = typeof key === 'bigint' ? key : $8kac0.bytesToNumberBE((0, $8kac0.ensureBytes)('private key', key, nByteLength));
        } catch (error) {
            throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
        }
        if (wrapPrivateKey) num = $7iX9N.mod(num, n); // disabled by default, enabled for BLS
        assertGE(num); // num in range [1..N-1]
        return num;
    }
    const pointPrecomputes = new Map();
    function assertPrjPoint(other) {
        if (!(other instanceof Point)) throw new Error('ProjectivePoint expected');
    }
    /**
     * Projective Point works in 3d / projective (homogeneous) coordinates: (x, y, z) ∋ (x=x/z, y=y/z)
     * Default Point works in 2d / affine coordinates: (x, y)
     * We're doing calculations in projective, because its operations don't require costly inversion.
     */ class Point {
        constructor(px, py, pz){
            this.px = px;
            this.py = py;
            this.pz = pz;
            if (px == null || !Fp.isValid(px)) throw new Error('x required');
            if (py == null || !Fp.isValid(py)) throw new Error('y required');
            if (pz == null || !Fp.isValid(pz)) throw new Error('z required');
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
            const { x: x, y: y } = p || {};
            if (!p || !Fp.isValid(x) || !Fp.isValid(y)) throw new Error('invalid affine point');
            if (p instanceof Point) throw new Error('projective point not allowed');
            const is0 = (i)=>Fp.eql(i, Fp.ZERO);
            // fromAffine(x:0, y:0) would produce (x:0, y:0, z:1), but we need (x:0, y:1, z:0)
            if (is0(x) && is0(y)) return Point.ZERO;
            return new Point(x, y, Fp.ONE);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */ static normalizeZ(points) {
            const toInv = Fp.invertBatch(points.map((p)=>p.pz));
            return points.map((p, i)=>p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */ static fromHex(hex) {
            const P = Point.fromAffine(fromBytes((0, $8kac0.ensureBytes)('pointHex', hex)));
            P.assertValidity();
            return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
            return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
            this._WINDOW_SIZE = windowSize;
            pointPrecomputes.delete(this);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
            if (this.is0()) {
                // (0, 1, 0) aka ZERO is invalid in most contexts.
                // In BLS, ZERO can be serialized, so we allow it.
                // (0, 0, 0) is wrong representation of ZERO and is always invalid.
                if (CURVE.allowInfinityPoint && !Fp.is0(this.py)) return;
                throw new Error('bad point: ZERO');
            }
            // Some 3rd-party test vectors require different wording between here & `fromCompressedHex`
            const { x: x, y: y } = this.toAffine();
            // Check if x, y are valid field elements
            if (!Fp.isValid(x) || !Fp.isValid(y)) throw new Error('bad point: x or y not FE');
            const left = Fp.sqr(y); // y²
            const right = weierstrassEquation(x); // x³ + ax + b
            if (!Fp.eql(left, right)) throw new Error('bad point: equation left != right');
            if (!this.isTorsionFree()) throw new Error('bad point: not in prime-order subgroup');
        }
        hasEvenY() {
            const { y: y } = this.toAffine();
            if (Fp.isOdd) return !Fp.isOdd(y);
            throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */ equals(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */ negate() {
            return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
            const { a: a, b: b } = CURVE;
            const b3 = Fp.mul(b, $0953d5a421f06ba8$var$_3n);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            let t0 = Fp.mul(X1, X1); // step 1
            let t1 = Fp.mul(Y1, Y1);
            let t2 = Fp.mul(Z1, Z1);
            let t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3); // step 5
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3); // step 10
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3); // step 15
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0); // step 20
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1); // step 25
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3); // step 30
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            const a = CURVE.a;
            const b3 = Fp.mul(CURVE.b, $0953d5a421f06ba8$var$_3n);
            let t0 = Fp.mul(X1, X2); // step 1
            let t1 = Fp.mul(Y1, Y2);
            let t2 = Fp.mul(Z1, Z2);
            let t3 = Fp.add(X1, Y1);
            let t4 = Fp.add(X2, Y2); // step 5
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            let t5 = Fp.add(X2, Z2); // step 10
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2); // step 15
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2); // step 20
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0); // step 25
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2); // step 30
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4); // step 35
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0); // step 40
            return new Point(X3, Y3, Z3);
        }
        subtract(other) {
            return this.add(other.negate());
        }
        is0() {
            return this.equals(Point.ZERO);
        }
        wNAF(n) {
            return wnaf.wNAFCached(this, pointPrecomputes, n, (comp)=>{
                const toInv = Fp.invertBatch(comp.map((p)=>p.pz));
                return comp.map((p, i)=>p.toAffine(toInv[i])).map(Point.fromAffine);
            });
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */ multiplyUnsafe(n) {
            const I = Point.ZERO;
            if (n === $0953d5a421f06ba8$var$_0n) return I;
            assertGE(n); // Will throw on 0
            if (n === $0953d5a421f06ba8$var$_1n) return this;
            const { endo: endo } = CURVE;
            if (!endo) return wnaf.unsafeLadder(this, n);
            // Apply endomorphism
            let { k1neg: k1neg, k1: k1, k2neg: k2neg, k2: k2 } = endo.splitScalar(n);
            let k1p = I;
            let k2p = I;
            let d = this;
            while(k1 > $0953d5a421f06ba8$var$_0n || k2 > $0953d5a421f06ba8$var$_0n){
                if (k1 & $0953d5a421f06ba8$var$_1n) k1p = k1p.add(d);
                if (k2 & $0953d5a421f06ba8$var$_1n) k2p = k2p.add(d);
                d = d.double();
                k1 >>= $0953d5a421f06ba8$var$_1n;
                k2 >>= $0953d5a421f06ba8$var$_1n;
            }
            if (k1neg) k1p = k1p.negate();
            if (k2neg) k2p = k2p.negate();
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */ multiply(scalar) {
            assertGE(scalar);
            let n = scalar;
            let point, fake; // Fake point is used to const-time mult
            const { endo: endo } = CURVE;
            if (endo) {
                const { k1neg: k1neg, k1: k1, k2neg: k2neg, k2: k2 } = endo.splitScalar(n);
                let { p: k1p, f: f1p } = this.wNAF(k1);
                let { p: k2p, f: f2p } = this.wNAF(k2);
                k1p = wnaf.constTimeNegate(k1neg, k1p);
                k2p = wnaf.constTimeNegate(k2neg, k2p);
                k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
                point = k1p.add(k2p);
                fake = f1p.add(f2p);
            } else {
                const { p: p, f: f } = this.wNAF(n);
                point = p;
                fake = f;
            }
            // Normalize `z` for both points, but return only real one
            return Point.normalizeZ([
                point,
                fake
            ])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */ multiplyAndAddUnsafe(Q, a, b) {
            const G = Point.BASE; // No Strauss-Shamir trick: we have 10% faster G precomputes
            const mul = (P, a // Select faster multiply() method
            )=>a === $0953d5a421f06ba8$var$_0n || a === $0953d5a421f06ba8$var$_1n || !P.equals(G) ? P.multiplyUnsafe(a) : P.multiply(a);
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? undefined : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
            const { px: x, py: y, pz: z } = this;
            const is0 = this.is0();
            // If invZ was 0, we return zero point. However we still want to execute
            // all operations, so we replace invZ with a random number, 1.
            if (iz == null) iz = is0 ? Fp.ONE : Fp.inv(z);
            const ax = Fp.mul(x, iz);
            const ay = Fp.mul(y, iz);
            const zz = Fp.mul(z, iz);
            if (is0) return {
                x: Fp.ZERO,
                y: Fp.ZERO
            };
            if (!Fp.eql(zz, Fp.ONE)) throw new Error('invZ was invalid');
            return {
                x: ax,
                y: ay
            };
        }
        isTorsionFree() {
            const { h: cofactor, isTorsionFree: isTorsionFree } = CURVE;
            if (cofactor === $0953d5a421f06ba8$var$_1n) return true; // No subgroups, always torsion-free
            if (isTorsionFree) return isTorsionFree(Point, this);
            throw new Error('isTorsionFree() has not been declared for the elliptic curve');
        }
        clearCofactor() {
            const { h: cofactor, clearCofactor: clearCofactor } = CURVE;
            if (cofactor === $0953d5a421f06ba8$var$_1n) return this; // Fast-path
            if (clearCofactor) return clearCofactor(Point, this);
            return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
            this.assertValidity();
            return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
            return $8kac0.bytesToHex(this.toRawBytes(isCompressed));
        }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
    Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = (0, $gMdUA.wNAF)(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    // Validate if generator point is on curve
    return {
        CURVE: CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar: normPrivateKeyToScalar,
        weierstrassEquation: weierstrassEquation,
        isWithinCurveOrder: isWithinCurveOrder
    };
}
module.exports.weierstrassPoints = $0953d5a421f06ba8$var$weierstrassPoints;
function $0953d5a421f06ba8$var$validateOpts(curve) {
    const opts = (0, $gMdUA.validateBasic)(curve);
    $8kac0.validateObject(opts, {
        hash: 'hash',
        hmac: 'function',
        randomBytes: 'function'
    }, {
        bits2int: 'function',
        bits2int_modN: 'function',
        lowS: 'boolean'
    });
    return Object.freeze({
        lowS: true,
        ...opts
    });
}
function $0953d5a421f06ba8$var$weierstrass(curveDef) {
    const CURVE = $0953d5a421f06ba8$var$validateOpts(curveDef);
    const { Fp: Fp, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp.BYTES + 1; // e.g. 33 for 32
    const uncompressedLen = 2 * Fp.BYTES + 1; // e.g. 65 for 32
    function isValidFieldElement(num) {
        return $0953d5a421f06ba8$var$_0n < num && num < Fp.ORDER; // 0 is banned since it's not invertible FE
    }
    function modN(a) {
        return $7iX9N.mod(a, CURVE_ORDER);
    }
    function invN(a) {
        return $7iX9N.invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point, normPrivateKeyToScalar: normPrivateKeyToScalar, weierstrassEquation: weierstrassEquation, isWithinCurveOrder: isWithinCurveOrder } = $0953d5a421f06ba8$var$weierstrassPoints({
        ...CURVE,
        toBytes (_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp.toBytes(a.x);
            const cat = $8kac0.concatBytes;
            if (isCompressed) return cat(Uint8Array.from([
                point.hasEvenY() ? 0x02 : 0x03
            ]), x);
            else return cat(Uint8Array.from([
                0x04
            ]), x, Fp.toBytes(a.y));
        },
        fromBytes (bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            // this.assertValidity() is done inside of fromHex
            if (len === compressedLen && (head === 0x02 || head === 0x03)) {
                const x = $8kac0.bytesToNumberBE(tail);
                if (!isValidFieldElement(x)) throw new Error('Point is not on curve');
                const y2 = weierstrassEquation(x); // y² = x³ + ax + b
                let y = Fp.sqrt(y2); // y = y² ^ (p+1)/4
                const isYOdd = (y & $0953d5a421f06ba8$var$_1n) === $0953d5a421f06ba8$var$_1n;
                // ECDSA
                const isHeadOdd = (head & 1) === 1;
                if (isHeadOdd !== isYOdd) y = Fp.neg(y);
                return {
                    x: x,
                    y: y
                };
            } else if (len === uncompressedLen && head === 0x04) {
                const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
                const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
                return {
                    x: x,
                    y: y
                };
            } else throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
        }
    });
    const numToNByteStr = (num)=>$8kac0.bytesToHex($8kac0.numberToBytesBE(num, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> $0953d5a421f06ba8$var$_1n;
        return number > HALF;
    }
    function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
    }
    // slice bytes num
    const slcNum = (b, from, to)=>$8kac0.bytesToNumberBE(b.slice(from, to));
    /**
     * ECDSA signature with its (r, s) properties. Supports DER & compact representations.
     */ class Signature {
        constructor(r, s, recovery){
            this.r = r;
            this.s = s;
            this.recovery = recovery;
            this.assertValidity();
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
            const l = CURVE.nByteLength;
            hex = (0, $8kac0.ensureBytes)('compactSignature', hex, l * 2);
            return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
            const { r: r, s: s } = module.exports.DER.toSig((0, $8kac0.ensureBytes)('DER', hex));
            return new Signature(r, s);
        }
        assertValidity() {
            // can use assertGE here
            if (!isWithinCurveOrder(this.r)) throw new Error('r must be 0 < r < CURVE.n');
            if (!isWithinCurveOrder(this.s)) throw new Error('s must be 0 < s < CURVE.n');
        }
        addRecoveryBit(recovery) {
            return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
            const { r: r, s: s, recovery: rec } = this;
            const h = bits2int_modN((0, $8kac0.ensureBytes)('msgHash', msgHash)); // Truncate hash
            if (rec == null || ![
                0,
                1,
                2,
                3
            ].includes(rec)) throw new Error('recovery id invalid');
            const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
            if (radj >= Fp.ORDER) throw new Error('recovery id 2 or 3 invalid');
            const prefix = (rec & 1) === 0 ? '02' : '03';
            const R = Point.fromHex(prefix + numToNByteStr(radj));
            const ir = invN(radj); // r^-1
            const u1 = modN(-h * ir); // -hr^-1
            const u2 = modN(s * ir); // sr^-1
            const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2); // (sr^-1)R-(hr^-1)G = -(hr^-1)G + (sr^-1)
            if (!Q) throw new Error('point at infinify'); // unsafe is fine: no priv data leaked
            Q.assertValidity();
            return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
            return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
            return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
            return $8kac0.hexToBytes(this.toDERHex());
        }
        toDERHex() {
            return module.exports.DER.hexFromSig({
                r: this.r,
                s: this.s
            });
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
            return $8kac0.hexToBytes(this.toCompactHex());
        }
        toCompactHex() {
            return numToNByteStr(this.r) + numToNByteStr(this.s);
        }
    }
    const utils = {
        isValidPrivateKey (privateKey) {
            try {
                normPrivateKeyToScalar(privateKey);
                return true;
            } catch (error) {
                return false;
            }
        },
        normPrivateKeyToScalar: normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */ randomPrivateKey: ()=>{
            const length = $7iX9N.getMinHashLength(CURVE.n);
            return $7iX9N.mapHashToField(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */ precompute (windowSize = 8, point = Point.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3)); // 3 is arbitrary, just need any number here
            return point;
        }
    };
    /**
     * Computes public key for a private key. Checks for validity of the private key.
     * @param privateKey private key
     * @param isCompressed whether to return compact (default), or full key
     * @returns Public key, full when isCompressed=false; short when isCompressed=true
     */ function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    /**
     * Quick and dirty check for item being public key. Does not validate hex, or being on-curve.
     */ function isProbPub(item) {
        const arr = item instanceof Uint8Array;
        const str = typeof item === 'string';
        const len = (arr || str) && item.length;
        if (arr) return len === compressedLen || len === uncompressedLen;
        if (str) return len === 2 * compressedLen || len === 2 * uncompressedLen;
        if (item instanceof Point) return true;
        return false;
    }
    /**
     * ECDH (Elliptic Curve Diffie Hellman).
     * Computes shared public key from private key and public key.
     * Checks: 1) private key validity 2) shared key is on-curve.
     * Does NOT hash the result.
     * @param privateA private key
     * @param publicB different public key
     * @param isCompressed whether to return compact (default), or full key
     * @returns shared public key
     */ function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA)) throw new Error('first arg must be private key');
        if (!isProbPub(publicB)) throw new Error('second arg must be public key');
        const b = Point.fromHex(publicB); // check for being on-curve
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    // RFC6979: ensure ECDSA msg is X bytes and < N. RFC suggests optional truncating via bits2octets.
    // FIPS 186-4 4.6 suggests the leftmost min(nBitLen, outLen) bits, which matches bits2int.
    // bits2int can produce res>N, we can do mod(res, N) since the bitLen is the same.
    // int2octets can't be used; pads small msgs with 0: unacceptatble for trunc as per RFC vectors
    const bits2int = CURVE.bits2int || function(bytes) {
        // For curves with nBitLength % 8 !== 0: bits2octets(bits2octets(m)) !== bits2octets(m)
        // for some cases, since bytes.length * 8 is not actual bitLength.
        const num = $8kac0.bytesToNumberBE(bytes); // check for == u8 done here
        const delta = bytes.length * 8 - CURVE.nBitLength; // truncate to nBitLength leftmost bits
        return delta > 0 ? num >> BigInt(delta) : num;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
        return modN(bits2int(bytes)); // can't use bytesToNumberBE here
    };
    // NOTE: pads output with zero as per spec
    const ORDER_MASK = $8kac0.bitMask(CURVE.nBitLength);
    /**
     * Converts to bytes. Checks if num in `[0..ORDER_MASK-1]` e.g.: `[0..2^256-1]`.
     */ function int2octets(num) {
        if (typeof num !== 'bigint') throw new Error('bigint expected');
        if (!($0953d5a421f06ba8$var$_0n <= num && num < ORDER_MASK)) throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
        // works with order, can have different size than numToField!
        return $8kac0.numberToBytesBE(num, CURVE.nByteLength);
    }
    // Steps A, D of RFC6979 3.2
    // Creates RFC6979 seed; converts msg/privKey to numbers.
    // Used only in sign, not in verify.
    // NOTE: we cannot assume here that msgHash has same amount of bytes as curve order, this will be wrong at least for P521.
    // Also it can be bigger for P224 + SHA256
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if ([
            'recovered',
            'canonical'
        ].some((k)=>k in opts)) throw new Error('sign() legacy options not supported');
        const { hash: hash, randomBytes: randomBytes } = CURVE;
        let { lowS: lowS, prehash: prehash, extraEntropy: ent } = opts; // generates low-s sigs by default
        if (lowS == null) lowS = true; // RFC6979 3.2: we skip step A, because we already provide hash
        msgHash = (0, $8kac0.ensureBytes)('msgHash', msgHash);
        if (prehash) msgHash = (0, $8kac0.ensureBytes)('prehashed msgHash', hash(msgHash));
        // We can't later call bits2octets, since nested bits2int is broken for curves
        // with nBitLength % 8 !== 0. Because of that, we unwrap it here as int2octets call.
        // const bits2octets = (bits) => int2octets(bits2int_modN(bits))
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey); // validate private key, convert to bigint
        const seedArgs = [
            int2octets(d),
            int2octets(h1int)
        ];
        // extraEntropy. RFC6979 3.6: additional k' (optional).
        if (ent != null) {
            // K = HMAC_K(V || 0x00 || int2octets(x) || bits2octets(h1) || k')
            const e = ent === true ? randomBytes(Fp.BYTES) : ent; // generate random bytes OR pass as-is
            seedArgs.push((0, $8kac0.ensureBytes)('extraEntropy', e)); // check for being bytes
        }
        const seed = $8kac0.concatBytes(...seedArgs); // Step D of RFC6979 3.2
        const m = h1int; // NOTE: no need to call bits2int second time here, it is inside truncateHash!
        // Converts signature params into point w r/s, checks result for validity.
        function k2sig(kBytes) {
            // RFC 6979 Section 3.2, step 3: k = bits2int(T)
            const k = bits2int(kBytes); // Cannot use fields methods, since it is group element
            if (!isWithinCurveOrder(k)) return; // Important: all mod() calls here must be done over N
            const ik = invN(k); // k^-1 mod n
            const q = Point.BASE.multiply(k).toAffine(); // q = Gk
            const r = modN(q.x); // r = q.x mod n
            if (r === $0953d5a421f06ba8$var$_0n) return;
            // Can use scalar blinding b^-1(bm + bdr) where b ∈ [1,q−1] according to
            // https://tches.iacr.org/index.php/TCHES/article/view/7337/6509. We've decided against it:
            // a) dependency on CSPRNG b) 15% slowdown c) doesn't really help since bigints are not CT
            const s = modN(ik * modN(m + r * d)); // Not using blinding here
            if (s === $0953d5a421f06ba8$var$_0n) return;
            let recovery = (q.x === r ? 0 : 2) | Number(q.y & $0953d5a421f06ba8$var$_1n); // recovery bit (2 or 3, when q.x > n)
            let normS = s;
            if (lowS && isBiggerThanHalfOrder(s)) {
                normS = normalizeS(s); // if lowS was passed, ensure s is always
                recovery ^= 1; // // in the bottom half of N
            }
            return new Signature(r, normS, recovery); // use normS, not s
        }
        return {
            seed: seed,
            k2sig: k2sig
        };
    }
    const defaultSigOpts = {
        lowS: CURVE.lowS,
        prehash: false
    };
    const defaultVerOpts = {
        lowS: CURVE.lowS,
        prehash: false
    };
    /**
     * Signs message hash with a private key.
     * ```
     * sign(m, d, k) where
     *   (x, y) = G × k
     *   r = x mod n
     *   s = (m + dr)/k mod n
     * ```
     * @param msgHash NOT message. msg needs to be hashed to `msgHash`, or use `prehash`.
     * @param privKey private key
     * @param opts lowS for non-malleable sigs. extraEntropy for mixing randomness into k. prehash will hash first arg.
     * @returns signature with recovery param
     */ function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed: seed, k2sig: k2sig } = prepSig(msgHash, privKey, opts); // Steps A, D of RFC6979 3.2.
        const C = CURVE;
        const drbg = $8kac0.createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig); // Steps B, C, D, E, F, G
    }
    // Enable precomputes. Slows down first publicKey computation by 20ms.
    Point.BASE._setWindowSize(8);
    // utils.precompute(8, ProjectivePoint.BASE)
    /**
     * Verifies a signature against message hash and public key.
     * Rejects lowS signatures by default: to override,
     * specify option `{lowS: false}`. Implements section 4.1.4 from https://www.secg.org/sec1-v2.pdf:
     *
     * ```
     * verify(r, s, h, P) where
     *   U1 = hs^-1 mod n
     *   U2 = rs^-1 mod n
     *   R = U1⋅G - U2⋅P
     *   mod(R.x, n) == r
     * ```
     */ function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, $8kac0.ensureBytes)('msgHash', msgHash);
        publicKey = (0, $8kac0.ensureBytes)('publicKey', publicKey);
        if ('strict' in opts) throw new Error('options.strict was renamed to lowS');
        const { lowS: lowS, prehash: prehash } = opts;
        let _sig = undefined;
        let P;
        try {
            if (typeof sg === 'string' || sg instanceof Uint8Array) // Signature can be represented in 2 ways: compact (2*nByteLength) & DER (variable-length).
            // Since DER can also be 2*nByteLength bytes, we check for it first.
            try {
                _sig = Signature.fromDER(sg);
            } catch (derError) {
                if (!(derError instanceof module.exports.DER.Err)) throw derError;
                _sig = Signature.fromCompact(sg);
            }
            else if (typeof sg === 'object' && typeof sg.r === 'bigint' && typeof sg.s === 'bigint') {
                const { r: r, s: s } = sg;
                _sig = new Signature(r, s);
            } else throw new Error('PARSE');
            P = Point.fromHex(publicKey);
        } catch (error) {
            if (error.message === 'PARSE') throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
            return false;
        }
        if (lowS && _sig.hasHighS()) return false;
        if (prehash) msgHash = CURVE.hash(msgHash);
        const { r: r, s: s } = _sig;
        const h = bits2int_modN(msgHash); // Cannot use fields methods, since it is group element
        const is = invN(s); // s^-1
        const u1 = modN(h * is); // u1 = hs^-1 mod n
        const u2 = modN(r * is); // u2 = rs^-1 mod n
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine(); // R = u1⋅G + u2⋅P
        if (!R) return false;
        const v = modN(R.x);
        return v === r;
    }
    return {
        CURVE: CURVE,
        getPublicKey: getPublicKey,
        getSharedSecret: getSharedSecret,
        sign: sign,
        verify: verify,
        ProjectivePoint: Point,
        Signature: Signature,
        utils: utils
    };
}
module.exports.weierstrass = $0953d5a421f06ba8$var$weierstrass;
/**
 * Implementation of the Shallue and van de Woestijne method for any weierstrass curve.
 * TODO: check if there is a way to merge this with uvRatio in Edwards; move to modular.
 * b = True and y = sqrt(u / v) if (u / v) is square in F, and
 * b = False and y = sqrt(Z * (u / v)) otherwise.
 * @param Fp
 * @param Z
 * @returns
 */ function $0953d5a421f06ba8$var$SWUFpSqrtRatio(Fp, Z) {
    // Generic implementation
    const q = Fp.ORDER;
    let l = $0953d5a421f06ba8$var$_0n;
    for(let o = q - $0953d5a421f06ba8$var$_1n; o % $0953d5a421f06ba8$var$_2n === $0953d5a421f06ba8$var$_0n; o /= $0953d5a421f06ba8$var$_2n)l += $0953d5a421f06ba8$var$_1n;
    const c1 = l; // 1. c1, the largest integer such that 2^c1 divides q - 1.
    // We need 2n ** c1 and 2n ** (c1-1). We can't use **; but we can use <<.
    // 2n ** c1 == 2n << (c1-1)
    const _2n_pow_c1_1 = $0953d5a421f06ba8$var$_2n << c1 - $0953d5a421f06ba8$var$_1n - $0953d5a421f06ba8$var$_1n;
    const _2n_pow_c1 = _2n_pow_c1_1 * $0953d5a421f06ba8$var$_2n;
    const c2 = (q - $0953d5a421f06ba8$var$_1n) / _2n_pow_c1; // 2. c2 = (q - 1) / (2^c1)  # Integer arithmetic
    const c3 = (c2 - $0953d5a421f06ba8$var$_1n) / $0953d5a421f06ba8$var$_2n; // 3. c3 = (c2 - 1) / 2            # Integer arithmetic
    const c4 = _2n_pow_c1 - $0953d5a421f06ba8$var$_1n; // 4. c4 = 2^c1 - 1                # Integer arithmetic
    const c5 = _2n_pow_c1_1; // 5. c5 = 2^(c1 - 1)                  # Integer arithmetic
    const c6 = Fp.pow(Z, c2); // 6. c6 = Z^c2
    const c7 = Fp.pow(Z, (c2 + $0953d5a421f06ba8$var$_1n) / $0953d5a421f06ba8$var$_2n); // 7. c7 = Z^((c2 + 1) / 2)
    let sqrtRatio = (u, v)=>{
        let tv1 = c6; // 1. tv1 = c6
        let tv2 = Fp.pow(v, c4); // 2. tv2 = v^c4
        let tv3 = Fp.sqr(tv2); // 3. tv3 = tv2^2
        tv3 = Fp.mul(tv3, v); // 4. tv3 = tv3 * v
        let tv5 = Fp.mul(u, tv3); // 5. tv5 = u * tv3
        tv5 = Fp.pow(tv5, c3); // 6. tv5 = tv5^c3
        tv5 = Fp.mul(tv5, tv2); // 7. tv5 = tv5 * tv2
        tv2 = Fp.mul(tv5, v); // 8. tv2 = tv5 * v
        tv3 = Fp.mul(tv5, u); // 9. tv3 = tv5 * u
        let tv4 = Fp.mul(tv3, tv2); // 10. tv4 = tv3 * tv2
        tv5 = Fp.pow(tv4, c5); // 11. tv5 = tv4^c5
        let isQR = Fp.eql(tv5, Fp.ONE); // 12. isQR = tv5 == 1
        tv2 = Fp.mul(tv3, c7); // 13. tv2 = tv3 * c7
        tv5 = Fp.mul(tv4, tv1); // 14. tv5 = tv4 * tv1
        tv3 = Fp.cmov(tv2, tv3, isQR); // 15. tv3 = CMOV(tv2, tv3, isQR)
        tv4 = Fp.cmov(tv5, tv4, isQR); // 16. tv4 = CMOV(tv5, tv4, isQR)
        // 17. for i in (c1, c1 - 1, ..., 2):
        for(let i = c1; i > $0953d5a421f06ba8$var$_1n; i--){
            let tv5 = i - $0953d5a421f06ba8$var$_2n; // 18.    tv5 = i - 2
            tv5 = $0953d5a421f06ba8$var$_2n << tv5 - $0953d5a421f06ba8$var$_1n; // 19.    tv5 = 2^tv5
            let tvv5 = Fp.pow(tv4, tv5); // 20.    tv5 = tv4^tv5
            const e1 = Fp.eql(tvv5, Fp.ONE); // 21.    e1 = tv5 == 1
            tv2 = Fp.mul(tv3, tv1); // 22.    tv2 = tv3 * tv1
            tv1 = Fp.mul(tv1, tv1); // 23.    tv1 = tv1 * tv1
            tvv5 = Fp.mul(tv4, tv1); // 24.    tv5 = tv4 * tv1
            tv3 = Fp.cmov(tv2, tv3, e1); // 25.    tv3 = CMOV(tv2, tv3, e1)
            tv4 = Fp.cmov(tvv5, tv4, e1); // 26.    tv4 = CMOV(tv5, tv4, e1)
        }
        return {
            isValid: isQR,
            value: tv3
        };
    };
    if (Fp.ORDER % $0953d5a421f06ba8$var$_4n === $0953d5a421f06ba8$var$_3n) {
        // sqrt_ratio_3mod4(u, v)
        const c1 = (Fp.ORDER - $0953d5a421f06ba8$var$_3n) / $0953d5a421f06ba8$var$_4n; // 1. c1 = (q - 3) / 4     # Integer arithmetic
        const c2 = Fp.sqrt(Fp.neg(Z)); // 2. c2 = sqrt(-Z)
        sqrtRatio = (u, v)=>{
            let tv1 = Fp.sqr(v); // 1. tv1 = v^2
            const tv2 = Fp.mul(u, v); // 2. tv2 = u * v
            tv1 = Fp.mul(tv1, tv2); // 3. tv1 = tv1 * tv2
            let y1 = Fp.pow(tv1, c1); // 4. y1 = tv1^c1
            y1 = Fp.mul(y1, tv2); // 5. y1 = y1 * tv2
            const y2 = Fp.mul(y1, c2); // 6. y2 = y1 * c2
            const tv3 = Fp.mul(Fp.sqr(y1), v); // 7. tv3 = y1^2; 8. tv3 = tv3 * v
            const isQR = Fp.eql(tv3, u); // 9. isQR = tv3 == u
            let y = Fp.cmov(y2, y1, isQR); // 10. y = CMOV(y2, y1, isQR)
            return {
                isValid: isQR,
                value: y
            }; // 11. return (isQR, y) isQR ? y : y*c2
        };
    }
    // No curves uses that
    // if (Fp.ORDER % _8n === _5n) // sqrt_ratio_5mod8
    return sqrtRatio;
}
module.exports.SWUFpSqrtRatio = $0953d5a421f06ba8$var$SWUFpSqrtRatio;
/**
 * Simplified Shallue-van de Woestijne-Ulas Method
 * https://www.rfc-editor.org/rfc/rfc9380#section-6.6.2
 */ function $0953d5a421f06ba8$var$mapToCurveSimpleSWU(Fp, opts) {
    $7iX9N.validateField(Fp);
    if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z)) throw new Error('mapToCurveSimpleSWU: invalid opts');
    const sqrtRatio = $0953d5a421f06ba8$var$SWUFpSqrtRatio(Fp, opts.Z);
    if (!Fp.isOdd) throw new Error('Fp.isOdd is not implemented!');
    // Input: u, an element of F.
    // Output: (x, y), a point on E.
    return (u)=>{
        // prettier-ignore
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u); // 1.  tv1 = u^2
        tv1 = Fp.mul(tv1, opts.Z); // 2.  tv1 = Z * tv1
        tv2 = Fp.sqr(tv1); // 3.  tv2 = tv1^2
        tv2 = Fp.add(tv2, tv1); // 4.  tv2 = tv2 + tv1
        tv3 = Fp.add(tv2, Fp.ONE); // 5.  tv3 = tv2 + 1
        tv3 = Fp.mul(tv3, opts.B); // 6.  tv3 = B * tv3
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO)); // 7.  tv4 = CMOV(Z, -tv2, tv2 != 0)
        tv4 = Fp.mul(tv4, opts.A); // 8.  tv4 = A * tv4
        tv2 = Fp.sqr(tv3); // 9.  tv2 = tv3^2
        tv6 = Fp.sqr(tv4); // 10. tv6 = tv4^2
        tv5 = Fp.mul(tv6, opts.A); // 11. tv5 = A * tv6
        tv2 = Fp.add(tv2, tv5); // 12. tv2 = tv2 + tv5
        tv2 = Fp.mul(tv2, tv3); // 13. tv2 = tv2 * tv3
        tv6 = Fp.mul(tv6, tv4); // 14. tv6 = tv6 * tv4
        tv5 = Fp.mul(tv6, opts.B); // 15. tv5 = B * tv6
        tv2 = Fp.add(tv2, tv5); // 16. tv2 = tv2 + tv5
        x = Fp.mul(tv1, tv3); // 17.   x = tv1 * tv3
        const { isValid: isValid, value: value } = sqrtRatio(tv2, tv6); // 18. (is_gx1_square, y1) = sqrt_ratio(tv2, tv6)
        y = Fp.mul(tv1, u); // 19.   y = tv1 * u  -> Z * u^3 * y1
        y = Fp.mul(y, value); // 20.   y = y * y1
        x = Fp.cmov(x, tv3, isValid); // 21.   x = CMOV(x, tv3, is_gx1_square)
        y = Fp.cmov(y, value, isValid); // 22.   y = CMOV(y, y1, is_gx1_square)
        const e1 = Fp.isOdd(u) === Fp.isOdd(y); // 23.  e1 = sgn0(u) == sgn0(y)
        y = Fp.cmov(Fp.neg(y), y, e1); // 24.   y = CMOV(-y, y, e1)
        x = Fp.div(x, tv4); // 25.   x = x / tv4
        return {
            x: x,
            y: y
        };
    };
}
module.exports.mapToCurveSimpleSWU = $0953d5a421f06ba8$var$mapToCurveSimpleSWU;

});
parcelRegister("gMdUA", function(module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateBasic = exports.wNAF = void 0;

var $7iX9N = parcelRequire("7iX9N");

var $8kac0 = parcelRequire("8kac0");
const _0n = BigInt(0);
const _1n = BigInt(1);
// Elliptic curve multiplication of Point by scalar. Fragile.
// Scalars should always be less than curve order: this should be checked inside of a curve itself.
// Creates precomputation tables for fast multiplication:
// - private scalar is split by fixed size windows of W bits
// - every window point is collected from window's table & added to accumulator
// - since windows are different, same point inside tables won't be accessed more than once per calc
// - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
// - +1 window is neccessary for wNAF
// - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
// TODO: Research returning 2d JS array of windows, instead of a single window. This would allow
// windows to be in different memory locations
function wNAF(c, bits) {
    const constTimeNegate = (condition, item)=>{
        const neg = item.negate();
        return condition ? neg : item;
    };
    const opts = (W)=>{
        const windows = Math.ceil(bits / W) + 1; // +1, because
        const windowSize = 2 ** (W - 1); // -1 because we skip zero
        return {
            windows: windows,
            windowSize: windowSize
        };
    };
    return {
        constTimeNegate: constTimeNegate,
        // non-const time multiplication ladder
        unsafeLadder (elm, n) {
            let p = c.ZERO;
            let d = elm;
            while(n > _0n){
                if (n & _1n) p = p.add(d);
                d = d.double();
                n >>= _1n;
            }
            return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @returns precomputed point tables flattened to a single array
         */ precomputeWindow (elm, W) {
            const { windows, windowSize } = opts(W);
            const points = [];
            let p = elm;
            let base = p;
            for(let window = 0; window < windows; window++){
                base = p;
                points.push(base);
                // =1, because we skip zero
                for(let i = 1; i < windowSize; i++){
                    base = base.add(p);
                    points.push(base);
                }
                p = base.double();
            }
            return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */ wNAF (W, precomputes, n) {
            // TODO: maybe check that scalar is less than group order? wNAF behavious is undefined otherwise
            // But need to carefully remove other checks before wNAF. ORDER == bits here
            const { windows, windowSize } = opts(W);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for(let window = 0; window < windows; window++){
                const offset = window * windowSize;
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n;
                }
                // This code was first written with assumption that 'f' and 'p' will never be infinity point:
                // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
                // there is negate now: it is possible that negated element from low value
                // would be the same as high element, which will create carry into next window.
                // It's not obvious how this can fail, but still worth investigating later.
                // Check if we're onto Zero point.
                // Add random point inside current window to f.
                const offset1 = offset;
                const offset2 = offset + Math.abs(wbits) - 1; // -1 because we skip zero
                const cond1 = window % 2 !== 0;
                const cond2 = wbits < 0;
                if (wbits === 0) // The most important part for const-time getPublicKey
                f = f.add(constTimeNegate(cond1, precomputes[offset1]));
                else p = p.add(constTimeNegate(cond2, precomputes[offset2]));
            }
            // JIT-compiler should not eliminate f here, since it will later be used in normalizeZ()
            // Even if the variable is still unused, there are some checks which will
            // throw an exception, so compiler needs to prove they won't happen, which is hard.
            // At this point there is a way to F be infinity-point even if p is not,
            // which makes it less const-time: around 1 bigint multiply.
            return {
                p: p,
                f: f
            };
        },
        wNAFCached (P, precomputesMap, n, transform) {
            // @ts-ignore
            const W = P._WINDOW_SIZE || 1;
            // Calculate precomputes on a first run, reuse them after
            let comp = precomputesMap.get(P);
            if (!comp) {
                comp = this.precomputeWindow(P, W);
                if (W !== 1) precomputesMap.set(P, transform(comp));
            }
            return this.wNAF(W, comp, n);
        }
    };
}
exports.wNAF = wNAF;
function validateBasic(curve) {
    (0, $7iX9N.validateField)(curve.Fp);
    (0, $8kac0.validateObject)(curve, {
        n: 'bigint',
        h: 'bigint',
        Gx: 'field',
        Gy: 'field'
    }, {
        nBitLength: 'isSafeInteger',
        nByteLength: 'isSafeInteger'
    });
    // Set defaults
    return Object.freeze({
        ...(0, $7iX9N.nLength)(curve.n, curve.nBitLength),
        ...curve,
        p: curve.Fp.ORDER
    });
}
exports.validateBasic = validateBasic;

});


parcelRegister("1BhJ7", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.createHasher = module.exports.isogenyMap = module.exports.hash_to_field = module.exports.expand_message_xof = module.exports.expand_message_xmd = void 0;

var $7iX9N = parcelRequire("7iX9N");

var $8kac0 = parcelRequire("8kac0");
function $12a6ff51096b44d2$var$validateDST(dst) {
    if (dst instanceof Uint8Array) return dst;
    if (typeof dst === 'string') return (0, $8kac0.utf8ToBytes)(dst);
    throw new Error('DST must be Uint8Array or string');
}
// Octet Stream to Integer. "spec" implementation of os2ip is 2.5x slower vs bytesToNumberBE.
const $12a6ff51096b44d2$var$os2ip = $8kac0.bytesToNumberBE;
// Integer to Octet Stream (numberToBytesBE)
function $12a6ff51096b44d2$var$i2osp(value, length) {
    if (value < 0 || value >= 1 << 8 * length) throw new Error(`bad I2OSP call: value=${value} length=${length}`);
    const res = Array.from({
        length: length
    }).fill(0);
    for(let i = length - 1; i >= 0; i--){
        res[i] = value & 0xff;
        value >>>= 8;
    }
    return new Uint8Array(res);
}
function $12a6ff51096b44d2$var$strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for(let i = 0; i < a.length; i++)arr[i] = a[i] ^ b[i];
    return arr;
}
function $12a6ff51096b44d2$var$isBytes(item) {
    if (!(item instanceof Uint8Array)) throw new Error('Uint8Array expected');
}
function $12a6ff51096b44d2$var$isNum(item) {
    if (!Number.isSafeInteger(item)) throw new Error('number expected');
}
// Produces a uniformly random byte string using a cryptographic hash function H that outputs b bits
// https://www.rfc-editor.org/rfc/rfc9380#section-5.3.1
function $12a6ff51096b44d2$var$expand_message_xmd(msg, DST, lenInBytes, H) {
    $12a6ff51096b44d2$var$isBytes(msg);
    $12a6ff51096b44d2$var$isBytes(DST);
    $12a6ff51096b44d2$var$isNum(lenInBytes);
    // https://www.rfc-editor.org/rfc/rfc9380#section-5.3.3
    if (DST.length > 255) DST = H((0, $8kac0.concatBytes)((0, $8kac0.utf8ToBytes)('H2C-OVERSIZE-DST-'), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (ell > 255) throw new Error('Invalid xmd length');
    const DST_prime = (0, $8kac0.concatBytes)(DST, $12a6ff51096b44d2$var$i2osp(DST.length, 1));
    const Z_pad = $12a6ff51096b44d2$var$i2osp(0, r_in_bytes);
    const l_i_b_str = $12a6ff51096b44d2$var$i2osp(lenInBytes, 2); // len_in_bytes_str
    const b = new Array(ell);
    const b_0 = H((0, $8kac0.concatBytes)(Z_pad, msg, l_i_b_str, $12a6ff51096b44d2$var$i2osp(0, 1), DST_prime));
    b[0] = H((0, $8kac0.concatBytes)(b_0, $12a6ff51096b44d2$var$i2osp(1, 1), DST_prime));
    for(let i = 1; i <= ell; i++){
        const args = [
            $12a6ff51096b44d2$var$strxor(b_0, b[i - 1]),
            $12a6ff51096b44d2$var$i2osp(i + 1, 1),
            DST_prime
        ];
        b[i] = H((0, $8kac0.concatBytes)(...args));
    }
    const pseudo_random_bytes = (0, $8kac0.concatBytes)(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
}
module.exports.expand_message_xmd = $12a6ff51096b44d2$var$expand_message_xmd;
// Produces a uniformly random byte string using an extendable-output function (XOF) H.
// 1. The collision resistance of H MUST be at least k bits.
// 2. H MUST be an XOF that has been proved indifferentiable from
//    a random oracle under a reasonable cryptographic assumption.
// https://www.rfc-editor.org/rfc/rfc9380#section-5.3.2
function $12a6ff51096b44d2$var$expand_message_xof(msg, DST, lenInBytes, k, H) {
    $12a6ff51096b44d2$var$isBytes(msg);
    $12a6ff51096b44d2$var$isBytes(DST);
    $12a6ff51096b44d2$var$isNum(lenInBytes);
    // https://www.rfc-editor.org/rfc/rfc9380#section-5.3.3
    // DST = H('H2C-OVERSIZE-DST-' || a_very_long_DST, Math.ceil((lenInBytes * k) / 8));
    if (DST.length > 255) {
        const dkLen = Math.ceil(2 * k / 8);
        DST = H.create({
            dkLen: dkLen
        }).update((0, $8kac0.utf8ToBytes)('H2C-OVERSIZE-DST-')).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255) throw new Error('expand_message_xof: invalid lenInBytes');
    return H.create({
        dkLen: lenInBytes
    }).update(msg).update($12a6ff51096b44d2$var$i2osp(lenInBytes, 2))// 2. DST_prime = DST || I2OSP(len(DST), 1)
    .update(DST).update($12a6ff51096b44d2$var$i2osp(DST.length, 1)).digest();
}
module.exports.expand_message_xof = $12a6ff51096b44d2$var$expand_message_xof;
/**
 * Hashes arbitrary-length byte strings to a list of one or more elements of a finite field F
 * https://www.rfc-editor.org/rfc/rfc9380#section-5.2
 * @param msg a byte string containing the message to hash
 * @param count the number of elements of F to output
 * @param options `{DST: string, p: bigint, m: number, k: number, expand: 'xmd' | 'xof', hash: H}`, see above
 * @returns [u_0, ..., u_(count - 1)], a list of field elements.
 */ function $12a6ff51096b44d2$var$hash_to_field(msg, count, options) {
    (0, $8kac0.validateObject)(options, {
        DST: 'stringOrUint8Array',
        p: 'bigint',
        m: 'isSafeInteger',
        k: 'isSafeInteger',
        hash: 'hash'
    });
    const { p: p, k: k, m: m, hash: hash, expand: expand, DST: _DST } = options;
    $12a6ff51096b44d2$var$isBytes(msg);
    $12a6ff51096b44d2$var$isNum(count);
    const DST = $12a6ff51096b44d2$var$validateDST(_DST);
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8); // section 5.1 of ietf draft link above
    const len_in_bytes = count * m * L;
    let prb; // pseudo_random_bytes
    if (expand === 'xmd') prb = $12a6ff51096b44d2$var$expand_message_xmd(msg, DST, len_in_bytes, hash);
    else if (expand === 'xof') prb = $12a6ff51096b44d2$var$expand_message_xof(msg, DST, len_in_bytes, k, hash);
    else if (expand === '_internal_pass') // for internal tests only
    prb = msg;
    else throw new Error('expand must be "xmd" or "xof"');
    const u = new Array(count);
    for(let i = 0; i < count; i++){
        const e = new Array(m);
        for(let j = 0; j < m; j++){
            const elm_offset = L * (j + i * m);
            const tv = prb.subarray(elm_offset, elm_offset + L);
            e[j] = (0, $7iX9N.mod)($12a6ff51096b44d2$var$os2ip(tv), p);
        }
        u[i] = e;
    }
    return u;
}
module.exports.hash_to_field = $12a6ff51096b44d2$var$hash_to_field;
function $12a6ff51096b44d2$var$isogenyMap(field, map) {
    // Make same order as in spec
    const COEFF = map.map((i)=>Array.from(i).reverse());
    return (x, y)=>{
        const [xNum, xDen, yNum, yDen] = COEFF.map((val)=>val.reduce((acc, i)=>field.add(field.mul(acc, x), i)));
        x = field.div(xNum, xDen); // xNum / xDen
        y = field.mul(y, field.div(yNum, yDen)); // y * (yNum / yDev)
        return {
            x: x,
            y: y
        };
    };
}
module.exports.isogenyMap = $12a6ff51096b44d2$var$isogenyMap;
function $12a6ff51096b44d2$var$createHasher(Point, mapToCurve, def) {
    if (typeof mapToCurve !== 'function') throw new Error('mapToCurve() must be defined');
    return {
        // Encodes byte string to elliptic curve.
        // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
        hashToCurve (msg, options) {
            const u = $12a6ff51096b44d2$var$hash_to_field(msg, 2, {
                ...def,
                DST: def.DST,
                ...options
            });
            const u0 = Point.fromAffine(mapToCurve(u[0]));
            const u1 = Point.fromAffine(mapToCurve(u[1]));
            const P = u0.add(u1).clearCofactor();
            P.assertValidity();
            return P;
        },
        // Encodes byte string to elliptic curve.
        // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
        encodeToCurve (msg, options) {
            const u = $12a6ff51096b44d2$var$hash_to_field(msg, 1, {
                ...def,
                DST: def.encodeDST,
                ...options
            });
            const P = Point.fromAffine(mapToCurve(u[0])).clearCofactor();
            P.assertValidity();
            return P;
        }
    };
}
module.exports.createHasher = $12a6ff51096b44d2$var$createHasher;

});

parcelRegister("ivT5M", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.createCurve = module.exports.getHash = void 0;

var $a9pNd = parcelRequire("a9pNd");

var $5rGUq = parcelRequire("5rGUq");

var $NEiph = parcelRequire("NEiph");
// connects noble-curves to noble-hashes
function $d7a5db699b4dcae0$var$getHash(hash) {
    return {
        hash: hash,
        hmac: (key, ...msgs)=>(0, $a9pNd.hmac)(hash, key, (0, $5rGUq.concatBytes)(...msgs)),
        randomBytes: $5rGUq.randomBytes
    };
}
module.exports.getHash = $d7a5db699b4dcae0$var$getHash;
function $d7a5db699b4dcae0$var$createCurve(curveDef, defHash) {
    const create = (hash)=>(0, $NEiph.weierstrass)({
            ...curveDef,
            ...$d7a5db699b4dcae0$var$getHash(hash)
        });
    return Object.freeze({
        ...create(defHash),
        create: create
    });
}
module.exports.createCurve = $d7a5db699b4dcae0$var$createCurve;

});
parcelRegister("a9pNd", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.hmac = module.exports.HMAC = void 0;

var $2dxsF = parcelRequire("2dxsF");

var $5rGUq = parcelRequire("5rGUq");
// HMAC (RFC 2104)
class $763ec08aa824fac3$var$HMAC extends $5rGUq.Hash {
    constructor(hash, _key){
        super();
        this.finished = false;
        this.destroyed = false;
        (0, $2dxsF.hash)(hash);
        const key = (0, $5rGUq.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 106;
        this.oHash.update(pad);
        pad.fill(0);
    }
    update(buf) {
        (0, $2dxsF.exists)(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        (0, $2dxsF.exists)(this);
        (0, $2dxsF.bytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash: oHash, iHash: iHash, finished: finished, destroyed: destroyed, blockLen: blockLen, outputLen: outputLen } = this;
        to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
module.exports.HMAC = $763ec08aa824fac3$var$HMAC;
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 */ const $763ec08aa824fac3$var$hmac = (hash, key, message)=>new $763ec08aa824fac3$var$HMAC(hash, key).update(message).digest();
module.exports.hmac = $763ec08aa824fac3$var$hmac;
module.exports.hmac.create = (hash, key)=>new $763ec08aa824fac3$var$HMAC(hash, key);

});



parcelRegister("jxo4c", function(module, exports) {
"use strict";
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.randomBytes = module.exports.wrapXOFConstructorWithOpts = module.exports.wrapConstructorWithOpts = module.exports.wrapConstructor = module.exports.checkOpts = module.exports.Hash = module.exports.concatBytes = module.exports.toBytes = module.exports.utf8ToBytes = module.exports.asyncLoop = module.exports.nextTick = module.exports.hexToBytes = module.exports.bytesToHex = module.exports.isLE = module.exports.rotr = module.exports.createView = module.exports.u32 = module.exports.u8 = void 0;

var $4D8QS = parcelRequire("4D8QS");
const $e393c48b34b94802$var$u8a = (a)=>a instanceof Uint8Array;
// Cast array to different type
const $e393c48b34b94802$var$u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.u8 = $e393c48b34b94802$var$u8;
const $e393c48b34b94802$var$u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
module.exports.u32 = $e393c48b34b94802$var$u32;
// Cast array to view
const $e393c48b34b94802$var$createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.createView = $e393c48b34b94802$var$createView;
// The rotate right (circular right shift) operation for uint32
const $e393c48b34b94802$var$rotr = (word, shift)=>word << 32 - shift | word >>> shift;
module.exports.rotr = $e393c48b34b94802$var$rotr;
// big-endian hardware is rare. Just in case someone still decides to run hashes:
// early-throw an error because we don't support BE yet.
module.exports.isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!module.exports.isLE) throw new Error('Non little-endian hardware is not supported');
const $e393c48b34b94802$var$hexes = Array.from({
    length: 256
}, (v, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function $e393c48b34b94802$var$bytesToHex(bytes) {
    if (!$e393c48b34b94802$var$u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++)hex += $e393c48b34b94802$var$hexes[bytes[i]];
    return hex;
}
module.exports.bytesToHex = $e393c48b34b94802$var$bytesToHex;
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function $e393c48b34b94802$var$hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
module.exports.hexToBytes = $e393c48b34b94802$var$hexToBytes;
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const $e393c48b34b94802$var$nextTick = async ()=>{};
module.exports.nextTick = $e393c48b34b94802$var$nextTick;
// Returns control to thread each 'tick' ms to avoid blocking
async function $e393c48b34b94802$var$asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await (0, module.exports.nextTick)();
        ts += diff;
    }
}
module.exports.asyncLoop = $e393c48b34b94802$var$asyncLoop;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function $e393c48b34b94802$var$utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
module.exports.utf8ToBytes = $e393c48b34b94802$var$utf8ToBytes;
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */ function $e393c48b34b94802$var$toBytes(data) {
    if (typeof data === 'string') data = $e393c48b34b94802$var$utf8ToBytes(data);
    if (!$e393c48b34b94802$var$u8a(data)) throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
}
module.exports.toBytes = $e393c48b34b94802$var$toBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function $e393c48b34b94802$var$concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!$e393c48b34b94802$var$u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
module.exports.concatBytes = $e393c48b34b94802$var$concatBytes;
// For runtime check if class implements interface
class $e393c48b34b94802$var$Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
module.exports.Hash = $e393c48b34b94802$var$Hash;
// Check if object doens't have custom constructor (like Uint8Array/Array)
const $e393c48b34b94802$var$isPlainObject = (obj)=>Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
function $e393c48b34b94802$var$checkOpts(defaults, opts) {
    if (opts !== undefined && (typeof opts !== 'object' || !$e393c48b34b94802$var$isPlainObject(opts))) throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
module.exports.checkOpts = $e393c48b34b94802$var$checkOpts;
function $e393c48b34b94802$var$wrapConstructor(hashCons) {
    const hashC = (msg)=>hashCons().update($e393c48b34b94802$var$toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
module.exports.wrapConstructor = $e393c48b34b94802$var$wrapConstructor;
function $e393c48b34b94802$var$wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update($e393c48b34b94802$var$toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
module.exports.wrapConstructorWithOpts = $e393c48b34b94802$var$wrapConstructorWithOpts;
function $e393c48b34b94802$var$wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update($e393c48b34b94802$var$toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
module.exports.wrapXOFConstructorWithOpts = $e393c48b34b94802$var$wrapXOFConstructorWithOpts;
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */ function $e393c48b34b94802$var$randomBytes(bytesLength = 32) {
    if ($4D8QS.crypto && typeof $4D8QS.crypto.getRandomValues === 'function') return $4D8QS.crypto.getRandomValues(new Uint8Array(bytesLength));
    throw new Error('crypto.getRandomValues must be defined');
}
module.exports.randomBytes = $e393c48b34b94802$var$randomBytes;

});
parcelRegister("4D8QS", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.crypto = void 0;
module.exports.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

});


parcelRegister("YRaTA", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.sha224 = module.exports.sha256 = void 0;

var $20kIy = parcelRequire("20kIy");

var $jxo4c = parcelRequire("jxo4c");
// Choice: a ? b : c
const $0b6eda1b1b0af154$var$Chi = (a, b, c)=>a & b ^ ~a & c;
// Majority function, true if any two inpust is true
const $0b6eda1b1b0af154$var$Maj = (a, b, c)=>a & b ^ a & c ^ b & c;
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const $0b6eda1b1b0af154$var$SHA256_K = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const $0b6eda1b1b0af154$var$IV = new Uint32Array([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const $0b6eda1b1b0af154$var$SHA256_W = new Uint32Array(64);
class $0b6eda1b1b0af154$var$SHA256 extends $20kIy.SHA2 {
    constructor(){
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = $0b6eda1b1b0af154$var$IV[0] | 0;
        this.B = $0b6eda1b1b0af154$var$IV[1] | 0;
        this.C = $0b6eda1b1b0af154$var$IV[2] | 0;
        this.D = $0b6eda1b1b0af154$var$IV[3] | 0;
        this.E = $0b6eda1b1b0af154$var$IV[4] | 0;
        this.F = $0b6eda1b1b0af154$var$IV[5] | 0;
        this.G = $0b6eda1b1b0af154$var$IV[6] | 0;
        this.H = $0b6eda1b1b0af154$var$IV[7] | 0;
    }
    get() {
        const { A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)$0b6eda1b1b0af154$var$SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = $0b6eda1b1b0af154$var$SHA256_W[i - 15];
            const W2 = $0b6eda1b1b0af154$var$SHA256_W[i - 2];
            const s0 = (0, $jxo4c.rotr)(W15, 7) ^ (0, $jxo4c.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, $jxo4c.rotr)(W2, 17) ^ (0, $jxo4c.rotr)(W2, 19) ^ W2 >>> 10;
            $0b6eda1b1b0af154$var$SHA256_W[i] = s1 + $0b6eda1b1b0af154$var$SHA256_W[i - 7] + s0 + $0b6eda1b1b0af154$var$SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, $jxo4c.rotr)(E, 6) ^ (0, $jxo4c.rotr)(E, 11) ^ (0, $jxo4c.rotr)(E, 25);
            const T1 = H + sigma1 + $0b6eda1b1b0af154$var$Chi(E, F, G) + $0b6eda1b1b0af154$var$SHA256_K[i] + $0b6eda1b1b0af154$var$SHA256_W[i] | 0;
            const sigma0 = (0, $jxo4c.rotr)(A, 2) ^ (0, $jxo4c.rotr)(A, 13) ^ (0, $jxo4c.rotr)(A, 22);
            const T2 = sigma0 + $0b6eda1b1b0af154$var$Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        $0b6eda1b1b0af154$var$SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
// Constants from https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
class $0b6eda1b1b0af154$var$SHA224 extends $0b6eda1b1b0af154$var$SHA256 {
    constructor(){
        super();
        this.A = -1056596264;
        this.B = 914150663;
        this.C = 812702999;
        this.D = -150054599;
        this.E = -4191439;
        this.F = 1750603025;
        this.G = 1694076839;
        this.H = -1090891868;
        this.outputLen = 28;
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */ module.exports.sha256 = (0, $jxo4c.wrapConstructor)(()=>new $0b6eda1b1b0af154$var$SHA256());
module.exports.sha224 = (0, $jxo4c.wrapConstructor)(()=>new $0b6eda1b1b0af154$var$SHA224());

});
parcelRegister("20kIy", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.SHA2 = void 0;

var $iiMso = parcelRequire("iiMso");

var $jxo4c = parcelRequire("jxo4c");
// Polyfill for Safari 14
function $175ba6ee97495198$var$setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class $175ba6ee97495198$var$SHA2 extends $jxo4c.Hash {
    constructor(blockLen, outputLen, padOffset, isLE){
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, $jxo4c.createView)(this.buffer);
    }
    update(data) {
        $iiMso.default.exists(this);
        const { view: view, buffer: buffer, blockLen: blockLen } = this;
        data = (0, $jxo4c.toBytes)(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, $jxo4c.createView)(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        $iiMso.default.exists(this);
        $iiMso.default.output(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer: buffer, view: view, blockLen: blockLen, isLE: isLE } = this;
        let { pos: pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        $175ba6ee97495198$var$setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, $jxo4c.createView)(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer: buffer, outputLen: outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen: blockLen, buffer: buffer, length: length, finished: finished, destroyed: destroyed, pos: pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
}
module.exports.SHA2 = $175ba6ee97495198$var$SHA2;

});
parcelRegister("iiMso", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.output = module.exports.exists = module.exports.hash = module.exports.bytes = module.exports.bool = module.exports.number = void 0;
function $d52f7efc0757b92b$var$number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
module.exports.number = $d52f7efc0757b92b$var$number;
function $d52f7efc0757b92b$var$bool(b) {
    if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}
module.exports.bool = $d52f7efc0757b92b$var$bool;
function $d52f7efc0757b92b$var$bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array)) throw new Error('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
module.exports.bytes = $d52f7efc0757b92b$var$bytes;
function $d52f7efc0757b92b$var$hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    $d52f7efc0757b92b$var$number(hash.outputLen);
    $d52f7efc0757b92b$var$number(hash.blockLen);
}
module.exports.hash = $d52f7efc0757b92b$var$hash;
function $d52f7efc0757b92b$var$exists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
module.exports.exists = $d52f7efc0757b92b$var$exists;
function $d52f7efc0757b92b$var$output(out, instance) {
    $d52f7efc0757b92b$var$bytes(out);
    const min = instance.outputLen;
    if (out.length < min) throw new Error(`digestInto() expects output buffer of length at least ${min}`);
}
module.exports.output = $d52f7efc0757b92b$var$output;
const $d52f7efc0757b92b$var$assert = {
    number: $d52f7efc0757b92b$var$number,
    bool: $d52f7efc0757b92b$var$bool,
    bytes: $d52f7efc0757b92b$var$bytes,
    hash: $d52f7efc0757b92b$var$hash,
    exists: $d52f7efc0757b92b$var$exists,
    output: $d52f7efc0757b92b$var$output
};
module.exports.default = $d52f7efc0757b92b$var$assert;

});



parcelRegister("25Yxt", function(module, exports) {

$parcel$export(module.exports, "base64", () => $186b022f4cf66e20$export$b3b2de96497acc47);
$parcel$export(module.exports, "bech32", () => $186b022f4cf66e20$export$27c42482533637da);
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function $186b022f4cf66e20$export$dfbcecb440255e4a(n) {
    if (!Number.isSafeInteger(n)) throw new Error(`Wrong integer: ${n}`);
}
function $186b022f4cf66e20$var$chain(...args) {
    const wrap = (a, b)=>(c)=>a(b(c));
    const encode = Array.from(args).reverse().reduce((acc, i)=>acc ? wrap(acc, i.encode) : i.encode, undefined);
    const decode = args.reduce((acc, i)=>acc ? wrap(acc, i.decode) : i.decode, undefined);
    return {
        encode: encode,
        decode: decode
    };
}
function $186b022f4cf66e20$var$alphabet(alphabet) {
    return {
        encode: (digits)=>{
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('alphabet.encode input should be an array of numbers');
            return digits.map((i)=>{
                $186b022f4cf66e20$export$dfbcecb440255e4a(i);
                if (i < 0 || i >= alphabet.length) throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet.length})`);
                return alphabet[i];
            });
        },
        decode: (input)=>{
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('alphabet.decode input should be array of strings');
            return input.map((letter)=>{
                if (typeof letter !== 'string') throw new Error(`alphabet.decode: not string element=${letter}`);
                const index = alphabet.indexOf(letter);
                if (index === -1) throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet}`);
                return index;
            });
        }
    };
}
function $186b022f4cf66e20$var$join(separator = '') {
    if (typeof separator !== 'string') throw new Error('join separator should be string');
    return {
        encode: (from)=>{
            if (!Array.isArray(from) || from.length && typeof from[0] !== 'string') throw new Error('join.encode input should be array of strings');
            for (let i of from)if (typeof i !== 'string') throw new Error(`join.encode: non-string input=${i}`);
            return from.join(separator);
        },
        decode: (to)=>{
            if (typeof to !== 'string') throw new Error('join.decode input should be string');
            return to.split(separator);
        }
    };
}
function $186b022f4cf66e20$var$padding(bits, chr = '=') {
    $186b022f4cf66e20$export$dfbcecb440255e4a(bits);
    if (typeof chr !== 'string') throw new Error('padding chr should be string');
    return {
        encode (data) {
            if (!Array.isArray(data) || data.length && typeof data[0] !== 'string') throw new Error('padding.encode input should be array of strings');
            for (let i of data)if (typeof i !== 'string') throw new Error(`padding.encode: non-string input=${i}`);
            while(data.length * bits % 8)data.push(chr);
            return data;
        },
        decode (input) {
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('padding.encode input should be array of strings');
            for (let i of input)if (typeof i !== 'string') throw new Error(`padding.decode: non-string input=${i}`);
            let end = input.length;
            if (end * bits % 8) throw new Error('Invalid padding: string should have whole number of bytes');
            for(; end > 0 && input[end - 1] === chr; end--){
                if (!((end - 1) * bits % 8)) throw new Error('Invalid padding: string has too much padding');
            }
            return input.slice(0, end);
        }
    };
}
function $186b022f4cf66e20$var$normalize(fn) {
    if (typeof fn !== 'function') throw new Error('normalize fn should be function');
    return {
        encode: (from)=>from,
        decode: (to)=>fn(to)
    };
}
function $186b022f4cf66e20$var$convertRadix(data, from, to) {
    if (from < 2) throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
    if (to < 2) throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
    if (!Array.isArray(data)) throw new Error('convertRadix: data should be array');
    if (!data.length) return [];
    let pos = 0;
    const res = [];
    const digits = Array.from(data);
    digits.forEach((d)=>{
        $186b022f4cf66e20$export$dfbcecb440255e4a(d);
        if (d < 0 || d >= from) throw new Error(`Wrong integer: ${d}`);
    });
    while(true){
        let carry = 0;
        let done = true;
        for(let i = pos; i < digits.length; i++){
            const digit = digits[i];
            const digitBase = from * carry + digit;
            if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) throw new Error('convertRadix: carry overflow');
            carry = digitBase % to;
            digits[i] = Math.floor(digitBase / to);
            if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase) throw new Error('convertRadix: carry overflow');
            if (!done) continue;
            else if (!digits[i]) pos = i;
            else done = false;
        }
        res.push(carry);
        if (done) break;
    }
    for(let i = 0; i < data.length - 1 && data[i] === 0; i++)res.push(0);
    return res.reverse();
}
const $186b022f4cf66e20$var$gcd = (a, b)=>!b ? a : $186b022f4cf66e20$var$gcd(b, a % b);
const $186b022f4cf66e20$var$radix2carry = (from, to)=>from + (to - $186b022f4cf66e20$var$gcd(from, to));
function $186b022f4cf66e20$var$convertRadix2(data, from, to, padding) {
    if (!Array.isArray(data)) throw new Error('convertRadix2: data should be array');
    if (from <= 0 || from > 32) throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32) throw new Error(`convertRadix2: wrong to=${to}`);
    if ($186b022f4cf66e20$var$radix2carry(from, to) > 32) throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${$186b022f4cf66e20$var$radix2carry(from, to)}`);
    let carry = 0;
    let pos = 0;
    const mask = 2 ** to - 1;
    const res = [];
    for (const n of data){
        $186b022f4cf66e20$export$dfbcecb440255e4a(n);
        if (n >= 2 ** from) throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
        carry = carry << from | n;
        if (pos + from > 32) throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
        pos += from;
        for(; pos >= to; pos -= to)res.push((carry >> pos - to & mask) >>> 0);
        carry &= 2 ** pos - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding && pos >= from) throw new Error('Excess padding');
    if (!padding && carry) throw new Error(`Non-zero padding: ${carry}`);
    if (padding && pos > 0) res.push(carry >>> 0);
    return res;
}
function $186b022f4cf66e20$var$radix(num) {
    $186b022f4cf66e20$export$dfbcecb440255e4a(num);
    return {
        encode: (bytes)=>{
            if (!(bytes instanceof Uint8Array)) throw new Error('radix.encode input should be Uint8Array');
            return $186b022f4cf66e20$var$convertRadix(Array.from(bytes), 256, num);
        },
        decode: (digits)=>{
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix.decode input should be array of strings');
            return Uint8Array.from($186b022f4cf66e20$var$convertRadix(digits, num, 256));
        }
    };
}
function $186b022f4cf66e20$var$radix2(bits, revPadding = false) {
    $186b022f4cf66e20$export$dfbcecb440255e4a(bits);
    if (bits <= 0 || bits > 32) throw new Error('radix2: bits should be in (0..32]');
    if ($186b022f4cf66e20$var$radix2carry(8, bits) > 32 || $186b022f4cf66e20$var$radix2carry(bits, 8) > 32) throw new Error('radix2: carry overflow');
    return {
        encode: (bytes)=>{
            if (!(bytes instanceof Uint8Array)) throw new Error('radix2.encode input should be Uint8Array');
            return $186b022f4cf66e20$var$convertRadix2(Array.from(bytes), 8, bits, !revPadding);
        },
        decode: (digits)=>{
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix2.decode input should be array of strings');
            return Uint8Array.from($186b022f4cf66e20$var$convertRadix2(digits, bits, 8, revPadding));
        }
    };
}
function $186b022f4cf66e20$var$unsafeWrapper(fn) {
    if (typeof fn !== 'function') throw new Error('unsafeWrapper fn should be function');
    return function(...args) {
        try {
            return fn.apply(null, args);
        } catch (e) {}
    };
}
function $186b022f4cf66e20$var$checksum(len, fn) {
    $186b022f4cf66e20$export$dfbcecb440255e4a(len);
    if (typeof fn !== 'function') throw new Error('checksum fn should be function');
    return {
        encode (data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.encode: input should be Uint8Array');
            const checksum = fn(data).slice(0, len);
            const res = new Uint8Array(data.length + len);
            res.set(data);
            res.set(checksum, data.length);
            return res;
        },
        decode (data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.decode: input should be Uint8Array');
            const payload = data.slice(0, -len);
            const newChecksum = fn(payload).slice(0, len);
            const oldChecksum = data.slice(-len);
            for(let i = 0; i < len; i++)if (newChecksum[i] !== oldChecksum[i]) throw new Error('Invalid checksum');
            return payload;
        }
    };
}
const $186b022f4cf66e20$export$eab97d15b1788b8d = {
    alphabet: $186b022f4cf66e20$var$alphabet,
    chain: $186b022f4cf66e20$var$chain,
    checksum: $186b022f4cf66e20$var$checksum,
    radix: $186b022f4cf66e20$var$radix,
    radix2: $186b022f4cf66e20$var$radix2,
    join: $186b022f4cf66e20$var$join,
    padding: $186b022f4cf66e20$var$padding
};
const $186b022f4cf66e20$export$586f61c71cb02fe4 = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(4), $186b022f4cf66e20$var$alphabet('0123456789ABCDEF'), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$export$4a4d5965e2738b2a = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(5), $186b022f4cf66e20$var$alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), $186b022f4cf66e20$var$padding(5), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$export$c57d6760d519c8ac = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(5), $186b022f4cf66e20$var$alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), $186b022f4cf66e20$var$padding(5), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$export$5fbcb08925249358 = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(5), $186b022f4cf66e20$var$alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), $186b022f4cf66e20$var$join(''), $186b022f4cf66e20$var$normalize((s)=>s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
const $186b022f4cf66e20$export$b3b2de96497acc47 = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(6), $186b022f4cf66e20$var$alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), $186b022f4cf66e20$var$padding(6), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$export$7d21597c7bc64465 = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(6), $186b022f4cf66e20$var$alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), $186b022f4cf66e20$var$padding(6), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$var$genBase58 = (abc)=>$186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix(58), $186b022f4cf66e20$var$alphabet(abc), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$export$61f53211c069eefb = $186b022f4cf66e20$var$genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const $186b022f4cf66e20$export$c6a7baed2941aad2 = $186b022f4cf66e20$var$genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
const $186b022f4cf66e20$export$cbd4c72942a9201d = $186b022f4cf66e20$var$genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
const $186b022f4cf66e20$var$XMR_BLOCK_LEN = [
    0,
    2,
    3,
    5,
    6,
    7,
    9,
    10,
    11
];
const $186b022f4cf66e20$export$e86cd8e7f8cff4a6 = {
    encode (data) {
        let res = '';
        for(let i = 0; i < data.length; i += 8){
            const block = data.subarray(i, i + 8);
            res += $186b022f4cf66e20$export$61f53211c069eefb.encode(block).padStart($186b022f4cf66e20$var$XMR_BLOCK_LEN[block.length], '1');
        }
        return res;
    },
    decode (str) {
        let res = [];
        for(let i = 0; i < str.length; i += 11){
            const slice = str.slice(i, i + 11);
            const blockLen = $186b022f4cf66e20$var$XMR_BLOCK_LEN.indexOf(slice.length);
            const block = $186b022f4cf66e20$export$61f53211c069eefb.decode(slice);
            for(let j = 0; j < block.length - blockLen; j++){
                if (block[j] !== 0) throw new Error('base58xmr: wrong padding');
            }
            res = res.concat(Array.from(block.slice(block.length - blockLen)));
        }
        return Uint8Array.from(res);
    }
};
const $186b022f4cf66e20$export$fff625c574161df6 = (sha256)=>$186b022f4cf66e20$var$chain($186b022f4cf66e20$var$checksum(4, (data)=>sha256(sha256(data))), $186b022f4cf66e20$export$61f53211c069eefb);
const $186b022f4cf66e20$var$BECH_ALPHABET = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), $186b022f4cf66e20$var$join(''));
const $186b022f4cf66e20$var$POLYMOD_GENERATORS = [
    0x3b6a57b2,
    0x26508e6d,
    0x1ea119fa,
    0x3d4233dd,
    0x2a1462b3
];
function $186b022f4cf66e20$var$bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 0x1ffffff) << 5;
    for(let i = 0; i < $186b022f4cf66e20$var$POLYMOD_GENERATORS.length; i++)if ((b >> i & 1) === 1) chk ^= $186b022f4cf66e20$var$POLYMOD_GENERATORS[i];
    return chk;
}
function $186b022f4cf66e20$var$bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for(let i = 0; i < len; i++){
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126) throw new Error(`Invalid prefix (${prefix})`);
        chk = $186b022f4cf66e20$var$bech32Polymod(chk) ^ c >> 5;
    }
    chk = $186b022f4cf66e20$var$bech32Polymod(chk);
    for(let i = 0; i < len; i++)chk = $186b022f4cf66e20$var$bech32Polymod(chk) ^ prefix.charCodeAt(i) & 0x1f;
    for (let v of words)chk = $186b022f4cf66e20$var$bech32Polymod(chk) ^ v;
    for(let i = 0; i < 6; i++)chk = $186b022f4cf66e20$var$bech32Polymod(chk);
    chk ^= encodingConst;
    return $186b022f4cf66e20$var$BECH_ALPHABET.encode($186b022f4cf66e20$var$convertRadix2([
        chk % 2 ** 30
    ], 30, 5, false));
}
function $186b022f4cf66e20$var$genBech32(encoding) {
    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
    const _words = $186b022f4cf66e20$var$radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = $186b022f4cf66e20$var$unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
        if (typeof prefix !== 'string') throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
        if (!Array.isArray(words) || words.length && typeof words[0] !== 'number') throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
        const actualLength = prefix.length + 7 + words.length;
        if (limit !== false && actualLength > limit) throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
        prefix = prefix.toLowerCase();
        return `${prefix}1${$186b022f4cf66e20$var$BECH_ALPHABET.encode(words)}${$186b022f4cf66e20$var$bechChecksum(prefix, words, ENCODING_CONST)}`;
    }
    function decode(str, limit = 90) {
        if (typeof str !== 'string') throw new Error(`bech32.decode input should be string, not ${typeof str}`);
        if (str.length < 8 || limit !== false && str.length > limit) throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
        const lowered = str.toLowerCase();
        if (str !== lowered && str !== str.toUpperCase()) throw new Error(`String must be lowercase or uppercase`);
        str = lowered;
        const sepIndex = str.lastIndexOf('1');
        if (sepIndex === 0 || sepIndex === -1) throw new Error(`Letter "1" must be present between prefix and data only`);
        const prefix = str.slice(0, sepIndex);
        const _words = str.slice(sepIndex + 1);
        if (_words.length < 6) throw new Error('Data must be at least 6 characters long');
        const words = $186b022f4cf66e20$var$BECH_ALPHABET.decode(_words).slice(0, -6);
        const sum = $186b022f4cf66e20$var$bechChecksum(prefix, words, ENCODING_CONST);
        if (!_words.endsWith(sum)) throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
        return {
            prefix: prefix,
            words: words
        };
    }
    const decodeUnsafe = $186b022f4cf66e20$var$unsafeWrapper(decode);
    function decodeToBytes(str) {
        const { prefix: prefix, words: words } = decode(str, false);
        return {
            prefix: prefix,
            words: words,
            bytes: fromWords(words)
        };
    }
    return {
        encode: encode,
        decode: decode,
        decodeToBytes: decodeToBytes,
        decodeUnsafe: decodeUnsafe,
        fromWords: fromWords,
        fromWordsUnsafe: fromWordsUnsafe,
        toWords: toWords
    };
}
const $186b022f4cf66e20$export$27c42482533637da = $186b022f4cf66e20$var$genBech32('bech32');
const $186b022f4cf66e20$export$4963f7e473ccf819 = $186b022f4cf66e20$var$genBech32('bech32m');
const $186b022f4cf66e20$export$74329b762b589566 = {
    encode: (data)=>new TextDecoder().decode(data),
    decode: (str)=>new TextEncoder().encode(str)
};
const $186b022f4cf66e20$export$834dfc94dde4b3d8 = $186b022f4cf66e20$var$chain($186b022f4cf66e20$var$radix2(4), $186b022f4cf66e20$var$alphabet('0123456789abcdef'), $186b022f4cf66e20$var$join(''), $186b022f4cf66e20$var$normalize((s)=>{
    if (typeof s !== 'string' || s.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    return s.toLowerCase();
}));
const $186b022f4cf66e20$var$CODERS = {
    utf8: $186b022f4cf66e20$export$74329b762b589566,
    hex: $186b022f4cf66e20$export$834dfc94dde4b3d8,
    base16: $186b022f4cf66e20$export$586f61c71cb02fe4,
    base32: $186b022f4cf66e20$export$4a4d5965e2738b2a,
    base64: $186b022f4cf66e20$export$b3b2de96497acc47,
    base64url: $186b022f4cf66e20$export$7d21597c7bc64465,
    base58: $186b022f4cf66e20$export$61f53211c069eefb,
    base58xmr: $186b022f4cf66e20$export$e86cd8e7f8cff4a6
};
const $186b022f4cf66e20$var$coderTypeError = `Invalid encoding type. Available types: ${Object.keys($186b022f4cf66e20$var$CODERS).join(', ')}`;
const $186b022f4cf66e20$export$7c746b75f47c9c7d = (type, bytes)=>{
    if (typeof type !== 'string' || !$186b022f4cf66e20$var$CODERS.hasOwnProperty(type)) throw new TypeError($186b022f4cf66e20$var$coderTypeError);
    if (!(bytes instanceof Uint8Array)) throw new TypeError('bytesToString() expects Uint8Array');
    return $186b022f4cf66e20$var$CODERS[type].encode(bytes);
};
const $186b022f4cf66e20$export$42d51816ce590c93 = $186b022f4cf66e20$export$7c746b75f47c9c7d;
const $186b022f4cf66e20$export$c8dd6bc66a63753c = (type, str)=>{
    if (!$186b022f4cf66e20$var$CODERS.hasOwnProperty(type)) throw new TypeError($186b022f4cf66e20$var$coderTypeError);
    if (typeof str !== 'string') throw new TypeError('stringToBytes() expects string');
    return $186b022f4cf66e20$var$CODERS[type].decode(str);
};
const $186b022f4cf66e20$export$b3317979f9250576 = $186b022f4cf66e20$export$c8dd6bc66a63753c;

});

parcelRegister("71Bn2", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.unsafe = module.exports.siv = module.exports.gcm = module.exports.cfb = module.exports.cbc = module.exports.ecb = module.exports.ctr = module.exports.expandKeyDecLE = module.exports.expandKeyLE = void 0;

var $8Wj9n = parcelRequire("8Wj9n");

var $8QiOG = parcelRequire("8QiOG");

var $562yI = parcelRequire("562yI");
/*
AES (Advanced Encryption Standard) aka Rijndael block cipher.

Data is split into 128-bit blocks. Encrypted in 10/12/14 rounds (128/192/256 bits). In every round:
1. **S-box**, table substitution
2. **Shift rows**, cyclic shift left of all rows of data array
3. **Mix columns**, multiplying every column by fixed polynomial
4. **Add round key**, round_key xor i-th column of array

Resources:
- FIPS-197 https://csrc.nist.gov/files/pubs/fips/197/final/docs/fips-197.pdf
- Original proposal: https://csrc.nist.gov/csrc/media/projects/cryptographic-standards-and-guidelines/documents/aes-development/rijndael-ammended.pdf
*/ const $51d59d6bf48a75ea$var$BLOCK_SIZE = 16;
const $51d59d6bf48a75ea$var$BLOCK_SIZE32 = 4;
const $51d59d6bf48a75ea$var$EMPTY_BLOCK = new Uint8Array($51d59d6bf48a75ea$var$BLOCK_SIZE);
const $51d59d6bf48a75ea$var$POLY = 0x11b; // 1 + x + x**3 + x**4 + x**8
// TODO: remove multiplication, binary ops only
function $51d59d6bf48a75ea$var$mul2(n) {
    return n << 1 ^ $51d59d6bf48a75ea$var$POLY & -(n >> 7);
}
function $51d59d6bf48a75ea$var$mul(a, b) {
    let res = 0;
    for(; b > 0; b >>= 1){
        // Montgomery ladder
        res ^= a & -(b & 1); // if (b&1) res ^=a (but const-time).
        a = $51d59d6bf48a75ea$var$mul2(a); // a = 2*a
    }
    return res;
}
// AES S-box is generated using finite field inversion,
// an affine transform, and xor of a constant 0x63.
const $51d59d6bf48a75ea$var$sbox = /* @__PURE__ */ (()=>{
    let t = new Uint8Array(256);
    for(let i = 0, x = 1; i < 256; i++, x ^= $51d59d6bf48a75ea$var$mul2(x))t[i] = x;
    const box = new Uint8Array(256);
    box[0] = 0x63; // first elm
    for(let i = 0; i < 255; i++){
        let x = t[255 - i];
        x |= x << 8;
        box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 0x63) & 0xff;
    }
    return box;
})();
// Inverted S-box
const $51d59d6bf48a75ea$var$invSbox = /* @__PURE__ */ $51d59d6bf48a75ea$var$sbox.map((_, j)=>$51d59d6bf48a75ea$var$sbox.indexOf(j));
// Rotate u32 by 8
const $51d59d6bf48a75ea$var$rotr32_8 = (n)=>n << 24 | n >>> 8;
const $51d59d6bf48a75ea$var$rotl32_8 = (n)=>n << 8 | n >>> 24;
// T-table is optimization suggested in 5.2 of original proposal (missed from FIPS-197). Changes:
// - LE instead of BE
// - bigger tables: T0 and T1 are merged into T01 table and T2 & T3 into T23;
//   so index is u16, instead of u8. This speeds up things, unexpectedly
function $51d59d6bf48a75ea$var$genTtable(sbox, fn) {
    if (sbox.length !== 256) throw new Error('Wrong sbox length');
    const T0 = new Uint32Array(256).map((_, j)=>fn(sbox[j]));
    const T1 = T0.map($51d59d6bf48a75ea$var$rotl32_8);
    const T2 = T1.map($51d59d6bf48a75ea$var$rotl32_8);
    const T3 = T2.map($51d59d6bf48a75ea$var$rotl32_8);
    const T01 = new Uint32Array(65536);
    const T23 = new Uint32Array(65536);
    const sbox2 = new Uint16Array(65536);
    for(let i = 0; i < 256; i++)for(let j = 0; j < 256; j++){
        const idx = i * 256 + j;
        T01[idx] = T0[i] ^ T1[j];
        T23[idx] = T2[i] ^ T3[j];
        sbox2[idx] = sbox[i] << 8 | sbox[j];
    }
    return {
        sbox: sbox,
        sbox2: sbox2,
        T0: T0,
        T1: T1,
        T2: T2,
        T3: T3,
        T01: T01,
        T23: T23
    };
}
const $51d59d6bf48a75ea$var$tableEncoding = /* @__PURE__ */ $51d59d6bf48a75ea$var$genTtable($51d59d6bf48a75ea$var$sbox, (s)=>$51d59d6bf48a75ea$var$mul(s, 3) << 24 | s << 16 | s << 8 | $51d59d6bf48a75ea$var$mul(s, 2));
const $51d59d6bf48a75ea$var$tableDecoding = /* @__PURE__ */ $51d59d6bf48a75ea$var$genTtable($51d59d6bf48a75ea$var$invSbox, (s)=>$51d59d6bf48a75ea$var$mul(s, 11) << 24 | $51d59d6bf48a75ea$var$mul(s, 13) << 16 | $51d59d6bf48a75ea$var$mul(s, 9) << 8 | $51d59d6bf48a75ea$var$mul(s, 14));
const $51d59d6bf48a75ea$var$xPowers = /* @__PURE__ */ (()=>{
    const p = new Uint8Array(16);
    for(let i = 0, x = 1; i < 16; i++, x = $51d59d6bf48a75ea$var$mul2(x))p[i] = x;
    return p;
})();
function $51d59d6bf48a75ea$var$expandKeyLE(key) {
    (0, $562yI.bytes)(key);
    const len = key.length;
    if (![
        16,
        24,
        32
    ].includes(len)) throw new Error(`aes: wrong key size: should be 16, 24 or 32, got: ${len}`);
    const { sbox2: sbox2 } = $51d59d6bf48a75ea$var$tableEncoding;
    const k32 = (0, $8Wj9n.u32)(key);
    const Nk = k32.length;
    const subByte = (n)=>$51d59d6bf48a75ea$var$applySbox(sbox2, n, n, n, n);
    const xk = new Uint32Array(len + 28); // expanded key
    xk.set(k32);
    // 4.3.1 Key expansion
    for(let i = Nk; i < xk.length; i++){
        let t = xk[i - 1];
        if (i % Nk === 0) t = subByte($51d59d6bf48a75ea$var$rotr32_8(t)) ^ $51d59d6bf48a75ea$var$xPowers[i / Nk - 1];
        else if (Nk > 6 && i % Nk === 4) t = subByte(t);
        xk[i] = xk[i - Nk] ^ t;
    }
    return xk;
}
module.exports.expandKeyLE = $51d59d6bf48a75ea$var$expandKeyLE;
function $51d59d6bf48a75ea$var$expandKeyDecLE(key) {
    const encKey = $51d59d6bf48a75ea$var$expandKeyLE(key);
    const xk = encKey.slice();
    const Nk = encKey.length;
    const { sbox2: sbox2 } = $51d59d6bf48a75ea$var$tableEncoding;
    const { T0: T0, T1: T1, T2: T2, T3: T3 } = $51d59d6bf48a75ea$var$tableDecoding;
    // Inverse key by chunks of 4 (rounds)
    for(let i = 0; i < Nk; i += 4)for(let j = 0; j < 4; j++)xk[i + j] = encKey[Nk - i - 4 + j];
    encKey.fill(0);
    // apply InvMixColumn except first & last round
    for(let i = 4; i < Nk - 4; i++){
        const x = xk[i];
        const w = $51d59d6bf48a75ea$var$applySbox(sbox2, x, x, x, x);
        xk[i] = T0[w & 0xff] ^ T1[w >>> 8 & 0xff] ^ T2[w >>> 16 & 0xff] ^ T3[w >>> 24];
    }
    return xk;
}
module.exports.expandKeyDecLE = $51d59d6bf48a75ea$var$expandKeyDecLE;
// Apply tables
function $51d59d6bf48a75ea$var$apply0123(T01, T23, s0, s1, s2, s3) {
    return T01[s0 << 8 & 0xff00 | s1 >>> 8 & 0xff] ^ T23[s2 >>> 8 & 0xff00 | s3 >>> 24 & 0xff];
}
function $51d59d6bf48a75ea$var$applySbox(sbox2, s0, s1, s2, s3) {
    return sbox2[s0 & 0xff | s1 & 0xff00] | sbox2[s2 >>> 16 & 0xff | s3 >>> 16 & 0xff00] << 16;
}
function $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3) {
    const { sbox2: sbox2, T01: T01, T23: T23 } = $51d59d6bf48a75ea$var$tableEncoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for(let i = 0; i < rounds; i++){
        const t0 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s0, s1, s2, s3);
        const t1 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s1, s2, s3, s0);
        const t2 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s2, s3, s0, s1);
        const t3 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s3, s0, s1, s2);
        s0 = t0, s1 = t1, s2 = t2, s3 = t3;
    }
    // last round (without mixcolumns, so using SBOX2 table)
    const t0 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s0, s1, s2, s3);
    const t1 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s1, s2, s3, s0);
    const t2 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s2, s3, s0, s1);
    const t3 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s3, s0, s1, s2);
    return {
        s0: t0,
        s1: t1,
        s2: t2,
        s3: t3
    };
}
function $51d59d6bf48a75ea$var$decrypt(xk, s0, s1, s2, s3) {
    const { sbox2: sbox2, T01: T01, T23: T23 } = $51d59d6bf48a75ea$var$tableDecoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for(let i = 0; i < rounds; i++){
        const t0 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s0, s3, s2, s1);
        const t1 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s1, s0, s3, s2);
        const t2 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s2, s1, s0, s3);
        const t3 = xk[k++] ^ $51d59d6bf48a75ea$var$apply0123(T01, T23, s3, s2, s1, s0);
        s0 = t0, s1 = t1, s2 = t2, s3 = t3;
    }
    // Last round
    const t0 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s0, s3, s2, s1);
    const t1 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s1, s0, s3, s2);
    const t2 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s2, s1, s0, s3);
    const t3 = xk[k++] ^ $51d59d6bf48a75ea$var$applySbox(sbox2, s3, s2, s1, s0);
    return {
        s0: t0,
        s1: t1,
        s2: t2,
        s3: t3
    };
}
function $51d59d6bf48a75ea$var$getDst(len, dst) {
    if (!dst) return new Uint8Array(len);
    (0, $562yI.bytes)(dst);
    if (dst.length < len) throw new Error(`aes: wrong destination length, expected at least ${len}, got: ${dst.length}`);
    return dst;
}
// TODO: investigate merging with ctr32
function $51d59d6bf48a75ea$var$ctrCounter(xk, nonce, src, dst) {
    (0, $562yI.bytes)(nonce, $51d59d6bf48a75ea$var$BLOCK_SIZE);
    (0, $562yI.bytes)(src);
    const srcLen = src.length;
    dst = $51d59d6bf48a75ea$var$getDst(srcLen, dst);
    const ctr = nonce;
    const c32 = (0, $8Wj9n.u32)(ctr);
    // Fill block (empty, ctr=0)
    let { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    const src32 = (0, $8Wj9n.u32)(src);
    const dst32 = (0, $8Wj9n.u32)(dst);
    // process blocks
    for(let i = 0; i + 4 <= src32.length; i += 4){
        dst32[i + 0] = src32[i + 0] ^ s0;
        dst32[i + 1] = src32[i + 1] ^ s1;
        dst32[i + 2] = src32[i + 2] ^ s2;
        dst32[i + 3] = src32[i + 3] ^ s3;
        // Full 128 bit counter with wrap around
        let carry = 1;
        for(let i = ctr.length - 1; i >= 0; i--){
            carry = carry + (ctr[i] & 0xff) | 0;
            ctr[i] = carry & 0xff;
            carry >>>= 8;
        }
        ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    // leftovers (less than block)
    // It's possible to handle > u32 fast, but is it worth it?
    const start = $51d59d6bf48a75ea$var$BLOCK_SIZE * Math.floor(src32.length / $51d59d6bf48a75ea$var$BLOCK_SIZE32);
    if (start < srcLen) {
        const b32 = new Uint32Array([
            s0,
            s1,
            s2,
            s3
        ]);
        const buf = (0, $8Wj9n.u8)(b32);
        for(let i = start, pos = 0; i < srcLen; i++, pos++)dst[i] = src[i] ^ buf[pos];
    }
    return dst;
}
// AES CTR with overflowing 32 bit counter
// It's possible to do 32le significantly simpler (and probably faster) by using u32.
// But, we need both, and perf bottleneck is in ghash anyway.
function $51d59d6bf48a75ea$var$ctr32(xk, isLE, nonce, src, dst) {
    (0, $562yI.bytes)(nonce, $51d59d6bf48a75ea$var$BLOCK_SIZE);
    (0, $562yI.bytes)(src);
    dst = $51d59d6bf48a75ea$var$getDst(src.length, dst);
    const ctr = nonce; // write new value to nonce, so it can be re-used
    const c32 = (0, $8Wj9n.u32)(ctr);
    const view = (0, $8Wj9n.createView)(ctr);
    const src32 = (0, $8Wj9n.u32)(src);
    const dst32 = (0, $8Wj9n.u32)(dst);
    const ctrPos = isLE ? 0 : 12;
    const srcLen = src.length;
    // Fill block (empty, ctr=0)
    let ctrNum = view.getUint32(ctrPos, isLE); // read current counter value
    let { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    // process blocks
    for(let i = 0; i + 4 <= src32.length; i += 4){
        dst32[i + 0] = src32[i + 0] ^ s0;
        dst32[i + 1] = src32[i + 1] ^ s1;
        dst32[i + 2] = src32[i + 2] ^ s2;
        dst32[i + 3] = src32[i + 3] ^ s3;
        ctrNum = ctrNum + 1 >>> 0; // u32 wrap
        view.setUint32(ctrPos, ctrNum, isLE);
        ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    // leftovers (less than a block)
    const start = $51d59d6bf48a75ea$var$BLOCK_SIZE * Math.floor(src32.length / $51d59d6bf48a75ea$var$BLOCK_SIZE32);
    if (start < srcLen) {
        const b32 = new Uint32Array([
            s0,
            s1,
            s2,
            s3
        ]);
        const buf = (0, $8Wj9n.u8)(b32);
        for(let i = start, pos = 0; i < srcLen; i++, pos++)dst[i] = src[i] ^ buf[pos];
    }
    return dst;
}
/**
 * CTR: counter mode. Creates stream cipher.
 * Requires good IV. Parallelizable. OK, but no MAC.
 */ module.exports.ctr = (0, $8Wj9n.wrapCipher)({
    blockSize: 16,
    nonceLength: 16
}, function ctr(key, nonce) {
    (0, $562yI.bytes)(key);
    (0, $562yI.bytes)(nonce, $51d59d6bf48a75ea$var$BLOCK_SIZE);
    function processCtr(buf, dst) {
        const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
        const n = nonce.slice();
        const out = $51d59d6bf48a75ea$var$ctrCounter(xk, n, buf, dst);
        xk.fill(0);
        n.fill(0);
        return out;
    }
    return {
        encrypt: (plaintext, dst)=>processCtr(plaintext, dst),
        decrypt: (ciphertext, dst)=>processCtr(ciphertext, dst)
    };
});
function $51d59d6bf48a75ea$var$validateBlockDecrypt(data) {
    (0, $562yI.bytes)(data);
    if (data.length % $51d59d6bf48a75ea$var$BLOCK_SIZE !== 0) throw new Error(`aes/(cbc-ecb).decrypt ciphertext should consist of blocks with size ${$51d59d6bf48a75ea$var$BLOCK_SIZE}`);
}
function $51d59d6bf48a75ea$var$validateBlockEncrypt(plaintext, pcks5, dst) {
    let outLen = plaintext.length;
    const remaining = outLen % $51d59d6bf48a75ea$var$BLOCK_SIZE;
    if (!pcks5 && remaining !== 0) throw new Error('aec/(cbc-ecb): unpadded plaintext with disabled padding');
    const b = (0, $8Wj9n.u32)(plaintext);
    if (pcks5) {
        let left = $51d59d6bf48a75ea$var$BLOCK_SIZE - remaining;
        if (!left) left = $51d59d6bf48a75ea$var$BLOCK_SIZE; // if no bytes left, create empty padding block
        outLen = outLen + left;
    }
    const out = $51d59d6bf48a75ea$var$getDst(outLen, dst);
    const o = (0, $8Wj9n.u32)(out);
    return {
        b: b,
        o: o,
        out: out
    };
}
function $51d59d6bf48a75ea$var$validatePCKS(data, pcks5) {
    if (!pcks5) return data;
    const len = data.length;
    if (!len) throw new Error(`aes/pcks5: empty ciphertext not allowed`);
    const lastByte = data[len - 1];
    if (lastByte <= 0 || lastByte > 16) throw new Error(`aes/pcks5: wrong padding byte: ${lastByte}`);
    const out = data.subarray(0, -lastByte);
    for(let i = 0; i < lastByte; i++)if (data[len - i - 1] !== lastByte) throw new Error(`aes/pcks5: wrong padding`);
    return out;
}
function $51d59d6bf48a75ea$var$padPCKS(left) {
    const tmp = new Uint8Array(16);
    const tmp32 = (0, $8Wj9n.u32)(tmp);
    tmp.set(left);
    const paddingByte = $51d59d6bf48a75ea$var$BLOCK_SIZE - left.length;
    for(let i = $51d59d6bf48a75ea$var$BLOCK_SIZE - paddingByte; i < $51d59d6bf48a75ea$var$BLOCK_SIZE; i++)tmp[i] = paddingByte;
    return tmp32;
}
/**
 * ECB: Electronic CodeBook. Simple deterministic replacement.
 * Dangerous: always map x to y. See [AES Penguin](https://words.filippo.io/the-ecb-penguin/).
 */ module.exports.ecb = (0, $8Wj9n.wrapCipher)({
    blockSize: 16
}, function ecb(key, opts = {}) {
    (0, $562yI.bytes)(key);
    const pcks5 = !opts.disablePadding;
    return {
        encrypt: (plaintext, dst)=>{
            (0, $562yI.bytes)(plaintext);
            const { b: b, o: o, out: _out } = $51d59d6bf48a75ea$var$validateBlockEncrypt(plaintext, pcks5, dst);
            const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
            let i = 0;
            for(; i + 4 <= b.length;){
                const { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
                o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            if (pcks5) {
                const tmp32 = $51d59d6bf48a75ea$var$padPCKS(plaintext.subarray(i * 4));
                const { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, tmp32[0], tmp32[1], tmp32[2], tmp32[3]);
                o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            xk.fill(0);
            return _out;
        },
        decrypt: (ciphertext, dst)=>{
            $51d59d6bf48a75ea$var$validateBlockDecrypt(ciphertext);
            const xk = $51d59d6bf48a75ea$var$expandKeyDecLE(key);
            const out = $51d59d6bf48a75ea$var$getDst(ciphertext.length, dst);
            const b = (0, $8Wj9n.u32)(ciphertext);
            const o = (0, $8Wj9n.u32)(out);
            for(let i = 0; i + 4 <= b.length;){
                const { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$decrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
                o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            xk.fill(0);
            return $51d59d6bf48a75ea$var$validatePCKS(out, pcks5);
        }
    };
});
/**
 * CBC: Cipher-Block-Chaining. Key is previous round’s block.
 * Fragile: needs proper padding. Unauthenticated: needs MAC.
 */ module.exports.cbc = (0, $8Wj9n.wrapCipher)({
    blockSize: 16,
    nonceLength: 16
}, function cbc(key, iv, opts = {}) {
    (0, $562yI.bytes)(key);
    (0, $562yI.bytes)(iv, 16);
    const pcks5 = !opts.disablePadding;
    return {
        encrypt: (plaintext, dst)=>{
            const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
            const { b: b, o: o, out: _out } = $51d59d6bf48a75ea$var$validateBlockEncrypt(plaintext, pcks5, dst);
            const n32 = (0, $8Wj9n.u32)(iv);
            // prettier-ignore
            let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
            let i = 0;
            for(; i + 4 <= b.length;){
                s0 ^= b[i + 0], s1 ^= b[i + 1], s2 ^= b[i + 2], s3 ^= b[i + 3];
                ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3));
                o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            if (pcks5) {
                const tmp32 = $51d59d6bf48a75ea$var$padPCKS(plaintext.subarray(i * 4));
                s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
                ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3));
                o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            xk.fill(0);
            return _out;
        },
        decrypt: (ciphertext, dst)=>{
            $51d59d6bf48a75ea$var$validateBlockDecrypt(ciphertext);
            const xk = $51d59d6bf48a75ea$var$expandKeyDecLE(key);
            const n32 = (0, $8Wj9n.u32)(iv);
            const out = $51d59d6bf48a75ea$var$getDst(ciphertext.length, dst);
            const b = (0, $8Wj9n.u32)(ciphertext);
            const o = (0, $8Wj9n.u32)(out);
            // prettier-ignore
            let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
            for(let i = 0; i + 4 <= b.length;){
                // prettier-ignore
                const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
                s0 = b[i + 0], s1 = b[i + 1], s2 = b[i + 2], s3 = b[i + 3];
                const { s0: o0, s1: o1, s2: o2, s3: o3 } = $51d59d6bf48a75ea$var$decrypt(xk, s0, s1, s2, s3);
                o[i++] = o0 ^ ps0, o[i++] = o1 ^ ps1, o[i++] = o2 ^ ps2, o[i++] = o3 ^ ps3;
            }
            xk.fill(0);
            return $51d59d6bf48a75ea$var$validatePCKS(out, pcks5);
        }
    };
});
/**
 * CFB: Cipher Feedback Mode. The input for the block cipher is the previous cipher output.
 * Unauthenticated: needs MAC.
 */ module.exports.cfb = (0, $8Wj9n.wrapCipher)({
    blockSize: 16,
    nonceLength: 16
}, function cfb(key, iv) {
    (0, $562yI.bytes)(key);
    (0, $562yI.bytes)(iv, 16);
    function processCfb(src, isEncrypt, dst) {
        const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
        const srcLen = src.length;
        dst = $51d59d6bf48a75ea$var$getDst(srcLen, dst);
        const src32 = (0, $8Wj9n.u32)(src);
        const dst32 = (0, $8Wj9n.u32)(dst);
        const next32 = isEncrypt ? dst32 : src32;
        const n32 = (0, $8Wj9n.u32)(iv);
        // prettier-ignore
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        for(let i = 0; i + 4 <= src32.length;){
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3);
            dst32[i + 0] = src32[i + 0] ^ e0;
            dst32[i + 1] = src32[i + 1] ^ e1;
            dst32[i + 2] = src32[i + 2] ^ e2;
            dst32[i + 3] = src32[i + 3] ^ e3;
            s0 = next32[i++], s1 = next32[i++], s2 = next32[i++], s3 = next32[i++];
        }
        // leftovers (less than block)
        const start = $51d59d6bf48a75ea$var$BLOCK_SIZE * Math.floor(src32.length / $51d59d6bf48a75ea$var$BLOCK_SIZE32);
        if (start < srcLen) {
            ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3));
            const buf = (0, $8Wj9n.u8)(new Uint32Array([
                s0,
                s1,
                s2,
                s3
            ]));
            for(let i = start, pos = 0; i < srcLen; i++, pos++)dst[i] = src[i] ^ buf[pos];
            buf.fill(0);
        }
        xk.fill(0);
        return dst;
    }
    return {
        encrypt: (plaintext, dst)=>processCfb(plaintext, true, dst),
        decrypt: (ciphertext, dst)=>processCfb(ciphertext, false, dst)
    };
});
// TODO: merge with chacha, however gcm has bitLen while chacha has byteLen
function $51d59d6bf48a75ea$var$computeTag(fn, isLE, key, data, AAD) {
    const h = fn.create(key, data.length + (AAD?.length || 0));
    if (AAD) h.update(AAD);
    h.update(data);
    const num = new Uint8Array(16);
    const view = (0, $8Wj9n.createView)(num);
    if (AAD) (0, $8Wj9n.setBigUint64)(view, 0, BigInt(AAD.length * 8), isLE);
    (0, $8Wj9n.setBigUint64)(view, 8, BigInt(data.length * 8), isLE);
    h.update(num);
    return h.digest();
}
/**
 * GCM: Galois/Counter Mode.
 * Good, modern version of CTR, parallel, with MAC.
 * Be careful: MACs can be forged.
 */ module.exports.gcm = (0, $8Wj9n.wrapCipher)({
    blockSize: 16,
    nonceLength: 12,
    tagLength: 16
}, function gcm(key, nonce, AAD) {
    (0, $562yI.bytes)(nonce);
    // Nonce can be pretty much anything (even 1 byte). But smaller nonces less secure.
    if (nonce.length === 0) throw new Error('aes/gcm: empty nonce');
    const tagLength = 16;
    function _computeTag(authKey, tagMask, data) {
        const tag = $51d59d6bf48a75ea$var$computeTag($8QiOG.ghash, false, authKey, data, AAD);
        for(let i = 0; i < tagMask.length; i++)tag[i] ^= tagMask[i];
        return tag;
    }
    function deriveKeys() {
        const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
        const authKey = $51d59d6bf48a75ea$var$EMPTY_BLOCK.slice();
        const counter = $51d59d6bf48a75ea$var$EMPTY_BLOCK.slice();
        $51d59d6bf48a75ea$var$ctr32(xk, false, counter, counter, authKey);
        if (nonce.length === 12) counter.set(nonce);
        else {
            // Spec (NIST 800-38d) supports variable size nonce.
            // Not supported for now, but can be useful.
            const nonceLen = $51d59d6bf48a75ea$var$EMPTY_BLOCK.slice();
            const view = (0, $8Wj9n.createView)(nonceLen);
            (0, $8Wj9n.setBigUint64)(view, 8, BigInt(nonce.length * 8), false);
            // ghash(nonce || u64be(0) || u64be(nonceLen*8))
            $8QiOG.ghash.create(authKey).update(nonce).update(nonceLen).digestInto(counter);
        }
        const tagMask = $51d59d6bf48a75ea$var$ctr32(xk, false, counter, $51d59d6bf48a75ea$var$EMPTY_BLOCK);
        return {
            xk: xk,
            authKey: authKey,
            counter: counter,
            tagMask: tagMask
        };
    }
    return {
        encrypt: (plaintext)=>{
            (0, $562yI.bytes)(plaintext);
            const { xk: xk, authKey: authKey, counter: counter, tagMask: tagMask } = deriveKeys();
            const out = new Uint8Array(plaintext.length + tagLength);
            $51d59d6bf48a75ea$var$ctr32(xk, false, counter, plaintext, out);
            const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
            out.set(tag, plaintext.length);
            xk.fill(0);
            return out;
        },
        decrypt: (ciphertext)=>{
            (0, $562yI.bytes)(ciphertext);
            if (ciphertext.length < tagLength) throw new Error(`aes/gcm: ciphertext less than tagLen (${tagLength})`);
            const { xk: xk, authKey: authKey, counter: counter, tagMask: tagMask } = deriveKeys();
            const data = ciphertext.subarray(0, -tagLength);
            const passedTag = ciphertext.subarray(-tagLength);
            const tag = _computeTag(authKey, tagMask, data);
            if (!(0, $8Wj9n.equalBytes)(tag, passedTag)) throw new Error('aes/gcm: invalid ghash tag');
            const out = $51d59d6bf48a75ea$var$ctr32(xk, false, counter, data);
            authKey.fill(0);
            tagMask.fill(0);
            xk.fill(0);
            return out;
        }
    };
});
const $51d59d6bf48a75ea$var$limit = (name, min, max)=>(value)=>{
        if (!Number.isSafeInteger(value) || min > value || value > max) throw new Error(`${name}: invalid value=${value}, must be [${min}..${max}]`);
    };
/**
 * AES-GCM-SIV: classic AES-GCM with nonce-misuse resistance.
 * Guarantees that, when a nonce is repeated, the only security loss is that identical
 * plaintexts will produce identical ciphertexts.
 * RFC 8452, https://datatracker.ietf.org/doc/html/rfc8452
 */ module.exports.siv = (0, $8Wj9n.wrapCipher)({
    blockSize: 16,
    nonceLength: 12,
    tagLength: 16
}, function siv(key, nonce, AAD) {
    const tagLength = 16;
    // From RFC 8452: Section 6
    const AAD_LIMIT = $51d59d6bf48a75ea$var$limit('AAD', 0, 2 ** 36);
    const PLAIN_LIMIT = $51d59d6bf48a75ea$var$limit('plaintext', 0, 2 ** 36);
    const NONCE_LIMIT = $51d59d6bf48a75ea$var$limit('nonce', 12, 12);
    const CIPHER_LIMIT = $51d59d6bf48a75ea$var$limit('ciphertext', 16, 2 ** 36 + 16);
    (0, $562yI.bytes)(nonce);
    NONCE_LIMIT(nonce.length);
    if (AAD) {
        (0, $562yI.bytes)(AAD);
        AAD_LIMIT(AAD.length);
    }
    function deriveKeys() {
        const len = key.length;
        if (len !== 16 && len !== 24 && len !== 32) throw new Error(`key length must be 16, 24 or 32 bytes, got: ${len} bytes`);
        const xk = $51d59d6bf48a75ea$var$expandKeyLE(key);
        const encKey = new Uint8Array(len);
        const authKey = new Uint8Array(16);
        const n32 = (0, $8Wj9n.u32)(nonce);
        // prettier-ignore
        let s0 = 0, s1 = n32[0], s2 = n32[1], s3 = n32[2];
        let counter = 0;
        for (const derivedKey of [
            authKey,
            encKey
        ].map($8Wj9n.u32)){
            const d32 = (0, $8Wj9n.u32)(derivedKey);
            for(let i = 0; i < d32.length; i += 2){
                // aes(u32le(0) || nonce)[:8] || aes(u32le(1) || nonce)[:8] ...
                const { s0: o0, s1: o1 } = $51d59d6bf48a75ea$var$encrypt(xk, s0, s1, s2, s3);
                d32[i + 0] = o0;
                d32[i + 1] = o1;
                s0 = ++counter; // increment counter inside state
            }
        }
        xk.fill(0);
        return {
            authKey: authKey,
            encKey: $51d59d6bf48a75ea$var$expandKeyLE(encKey)
        };
    }
    function _computeTag(encKey, authKey, data) {
        const tag = $51d59d6bf48a75ea$var$computeTag($8QiOG.polyval, true, authKey, data, AAD);
        // Compute the expected tag by XORing S_s and the nonce, clearing the
        // most significant bit of the last byte and encrypting with the
        // message-encryption key.
        for(let i = 0; i < 12; i++)tag[i] ^= nonce[i];
        tag[15] &= 0x7f; // Clear the highest bit
        // encrypt tag as block
        const t32 = (0, $8Wj9n.u32)(tag);
        // prettier-ignore
        let s0 = t32[0], s1 = t32[1], s2 = t32[2], s3 = t32[3];
        ({ s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(encKey, s0, s1, s2, s3));
        t32[0] = s0, t32[1] = s1, t32[2] = s2, t32[3] = s3;
        return tag;
    }
    // actual decrypt/encrypt of message.
    function processSiv(encKey, tag, input) {
        let block = tag.slice();
        block[15] |= 0x80; // Force highest bit
        return $51d59d6bf48a75ea$var$ctr32(encKey, true, block, input);
    }
    return {
        encrypt: (plaintext)=>{
            (0, $562yI.bytes)(plaintext);
            PLAIN_LIMIT(plaintext.length);
            const { encKey: encKey, authKey: authKey } = deriveKeys();
            const tag = _computeTag(encKey, authKey, plaintext);
            const out = new Uint8Array(plaintext.length + tagLength);
            out.set(tag, plaintext.length);
            out.set(processSiv(encKey, tag, plaintext));
            encKey.fill(0);
            authKey.fill(0);
            return out;
        },
        decrypt: (ciphertext)=>{
            (0, $562yI.bytes)(ciphertext);
            CIPHER_LIMIT(ciphertext.length);
            const tag = ciphertext.subarray(-tagLength);
            const { encKey: encKey, authKey: authKey } = deriveKeys();
            const plaintext = processSiv(encKey, tag, ciphertext.subarray(0, -tagLength));
            const expectedTag = _computeTag(encKey, authKey, plaintext);
            encKey.fill(0);
            authKey.fill(0);
            if (!(0, $8Wj9n.equalBytes)(tag, expectedTag)) throw new Error('invalid polyval tag');
            return plaintext;
        }
    };
});
function $51d59d6bf48a75ea$var$isBytes32(a) {
    return a != null && typeof a === 'object' && (a instanceof Uint32Array || a.constructor.name === 'Uint32Array');
}
function $51d59d6bf48a75ea$var$encryptBlock(xk, block) {
    (0, $562yI.bytes)(block, 16);
    if (!$51d59d6bf48a75ea$var$isBytes32(xk)) throw new Error('_encryptBlock accepts result of expandKeyLE');
    const b32 = (0, $8Wj9n.u32)(block);
    let { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$encrypt(xk, b32[0], b32[1], b32[2], b32[3]);
    b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
    return block;
}
function $51d59d6bf48a75ea$var$decryptBlock(xk, block) {
    (0, $562yI.bytes)(block, 16);
    if (!$51d59d6bf48a75ea$var$isBytes32(xk)) throw new Error('_decryptBlock accepts result of expandKeyLE');
    const b32 = (0, $8Wj9n.u32)(block);
    let { s0: s0, s1: s1, s2: s2, s3: s3 } = $51d59d6bf48a75ea$var$decrypt(xk, b32[0], b32[1], b32[2], b32[3]);
    b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
    return block;
}
// Highly unsafe private functions for implementing new modes or ciphers based on AES
// Can change at any time, no API guarantees
module.exports.unsafe = {
    expandKeyLE: $51d59d6bf48a75ea$var$expandKeyLE,
    expandKeyDecLE: $51d59d6bf48a75ea$var$expandKeyDecLE,
    encrypt: $51d59d6bf48a75ea$var$encrypt,
    decrypt: $51d59d6bf48a75ea$var$decrypt,
    encryptBlock: $51d59d6bf48a75ea$var$encryptBlock,
    decryptBlock: $51d59d6bf48a75ea$var$decryptBlock,
    ctrCounter: $51d59d6bf48a75ea$var$ctrCounter,
    ctr32: $51d59d6bf48a75ea$var$ctr32
};

});
parcelRegister("8Wj9n", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.u64Lengths = module.exports.setBigUint64 = module.exports.wrapCipher = module.exports.Hash = module.exports.equalBytes = module.exports.checkOpts = module.exports.concatBytes = module.exports.toBytes = module.exports.bytesToUtf8 = module.exports.utf8ToBytes = module.exports.asyncLoop = module.exports.nextTick = module.exports.numberToBytesBE = module.exports.bytesToNumberBE = module.exports.hexToNumber = module.exports.hexToBytes = module.exports.bytesToHex = module.exports.isLE = module.exports.createView = module.exports.u32 = module.exports.u16 = module.exports.u8 = void 0;

var $562yI = parcelRequire("562yI");
// Cast array to different type
const $6822985ae7904fa4$var$u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.u8 = $6822985ae7904fa4$var$u8;
const $6822985ae7904fa4$var$u16 = (arr)=>new Uint16Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 2));
module.exports.u16 = $6822985ae7904fa4$var$u16;
const $6822985ae7904fa4$var$u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
module.exports.u32 = $6822985ae7904fa4$var$u32;
// Cast array to view
const $6822985ae7904fa4$var$createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
module.exports.createView = $6822985ae7904fa4$var$createView;
// big-endian hardware is rare. Just in case someone still decides to run ciphers:
// early-throw an error because we don't support BE yet.
module.exports.isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!module.exports.isLE) throw new Error('Non little-endian hardware is not supported');
// Array where index 0xf0 (240) is mapped to string 'f0'
const $6822985ae7904fa4$var$hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function $6822985ae7904fa4$var$bytesToHex(bytes) {
    (0, $562yI.bytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++)hex += $6822985ae7904fa4$var$hexes[bytes[i]];
    return hex;
}
module.exports.bytesToHex = $6822985ae7904fa4$var$bytesToHex;
// We use optimized technique to convert hex string to byte array
const $6822985ae7904fa4$var$asciis = {
    _0: 48,
    _9: 57,
    _A: 65,
    _F: 70,
    _a: 97,
    _f: 102
};
function $6822985ae7904fa4$var$asciiToBase16(char) {
    if (char >= $6822985ae7904fa4$var$asciis._0 && char <= $6822985ae7904fa4$var$asciis._9) return char - $6822985ae7904fa4$var$asciis._0;
    if (char >= $6822985ae7904fa4$var$asciis._A && char <= $6822985ae7904fa4$var$asciis._F) return char - ($6822985ae7904fa4$var$asciis._A - 10);
    if (char >= $6822985ae7904fa4$var$asciis._a && char <= $6822985ae7904fa4$var$asciis._f) return char - ($6822985ae7904fa4$var$asciis._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function $6822985ae7904fa4$var$hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = $6822985ae7904fa4$var$asciiToBase16(hex.charCodeAt(hi));
        const n2 = $6822985ae7904fa4$var$asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
module.exports.hexToBytes = $6822985ae7904fa4$var$hexToBytes;
function $6822985ae7904fa4$var$hexToNumber(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
module.exports.hexToNumber = $6822985ae7904fa4$var$hexToNumber;
// BE: Big Endian, LE: Little Endian
function $6822985ae7904fa4$var$bytesToNumberBE(bytes) {
    return $6822985ae7904fa4$var$hexToNumber($6822985ae7904fa4$var$bytesToHex(bytes));
}
module.exports.bytesToNumberBE = $6822985ae7904fa4$var$bytesToNumberBE;
function $6822985ae7904fa4$var$numberToBytesBE(n, len) {
    return $6822985ae7904fa4$var$hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
module.exports.numberToBytesBE = $6822985ae7904fa4$var$numberToBytesBE;
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const $6822985ae7904fa4$var$nextTick = async ()=>{};
module.exports.nextTick = $6822985ae7904fa4$var$nextTick;
// Returns control to thread each 'tick' ms to avoid blocking
async function $6822985ae7904fa4$var$asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await (0, module.exports.nextTick)();
        ts += diff;
    }
}
module.exports.asyncLoop = $6822985ae7904fa4$var$asyncLoop;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function $6822985ae7904fa4$var$utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`string expected, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
module.exports.utf8ToBytes = $6822985ae7904fa4$var$utf8ToBytes;
/**
 * @example bytesToUtf8(new Uint8Array([97, 98, 99])) // 'abc'
 */ function $6822985ae7904fa4$var$bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
module.exports.bytesToUtf8 = $6822985ae7904fa4$var$bytesToUtf8;
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */ function $6822985ae7904fa4$var$toBytes(data) {
    if (typeof data === 'string') data = $6822985ae7904fa4$var$utf8ToBytes(data);
    else if ((0, $562yI.isBytes)(data)) data = data.slice();
    else throw new Error(`Uint8Array expected, got ${typeof data}`);
    return data;
}
module.exports.toBytes = $6822985ae7904fa4$var$toBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function $6822985ae7904fa4$var$concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        (0, $562yI.bytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
module.exports.concatBytes = $6822985ae7904fa4$var$concatBytes;
function $6822985ae7904fa4$var$checkOpts(defaults, opts) {
    if (opts == null || typeof opts !== 'object') throw new Error('options must be defined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
module.exports.checkOpts = $6822985ae7904fa4$var$checkOpts;
// Compares 2 u8a-s in kinda constant time
function $6822985ae7904fa4$var$equalBytes(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for(let i = 0; i < a.length; i++)diff |= a[i] ^ b[i];
    return diff === 0;
}
module.exports.equalBytes = $6822985ae7904fa4$var$equalBytes;
// For runtime check if class implements interface
class $6822985ae7904fa4$var$Hash {
}
module.exports.Hash = $6822985ae7904fa4$var$Hash;
/**
 * @__NO_SIDE_EFFECTS__
 */ const $6822985ae7904fa4$var$wrapCipher = (params, c)=>{
    Object.assign(c, params);
    return c;
};
module.exports.wrapCipher = $6822985ae7904fa4$var$wrapCipher;
// Polyfill for Safari 14
function $6822985ae7904fa4$var$setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
module.exports.setBigUint64 = $6822985ae7904fa4$var$setBigUint64;
function $6822985ae7904fa4$var$u64Lengths(ciphertext, AAD) {
    const num = new Uint8Array(16);
    const view = (0, module.exports.createView)(num);
    $6822985ae7904fa4$var$setBigUint64(view, 0, BigInt(AAD ? AAD.length : 0), true);
    $6822985ae7904fa4$var$setBigUint64(view, 8, BigInt(ciphertext.length), true);
    return num;
}
module.exports.u64Lengths = $6822985ae7904fa4$var$u64Lengths;

});
parcelRegister("562yI", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.output = module.exports.exists = module.exports.hash = module.exports.bytes = module.exports.bool = module.exports.number = module.exports.isBytes = void 0;
function $3b5f7f6eebd4fff7$var$number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`positive integer expected, not ${n}`);
}
module.exports.number = $3b5f7f6eebd4fff7$var$number;
function $3b5f7f6eebd4fff7$var$bool(b) {
    if (typeof b !== 'boolean') throw new Error(`boolean expected, not ${b}`);
}
module.exports.bool = $3b5f7f6eebd4fff7$var$bool;
function $3b5f7f6eebd4fff7$var$isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array';
}
module.exports.isBytes = $3b5f7f6eebd4fff7$var$isBytes;
function $3b5f7f6eebd4fff7$var$bytes(b, ...lengths) {
    if (!$3b5f7f6eebd4fff7$var$isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
module.exports.bytes = $3b5f7f6eebd4fff7$var$bytes;
function $3b5f7f6eebd4fff7$var$hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('hash must be wrapped by utils.wrapConstructor');
    $3b5f7f6eebd4fff7$var$number(hash.outputLen);
    $3b5f7f6eebd4fff7$var$number(hash.blockLen);
}
module.exports.hash = $3b5f7f6eebd4fff7$var$hash;
function $3b5f7f6eebd4fff7$var$exists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
module.exports.exists = $3b5f7f6eebd4fff7$var$exists;
function $3b5f7f6eebd4fff7$var$output(out, instance) {
    $3b5f7f6eebd4fff7$var$bytes(out);
    const min = instance.outputLen;
    if (out.length < min) throw new Error(`digestInto() expects output buffer of length at least ${min}`);
}
module.exports.output = $3b5f7f6eebd4fff7$var$output;
const $3b5f7f6eebd4fff7$var$assert = {
    number: $3b5f7f6eebd4fff7$var$number,
    bool: $3b5f7f6eebd4fff7$var$bool,
    bytes: $3b5f7f6eebd4fff7$var$bytes,
    hash: $3b5f7f6eebd4fff7$var$hash,
    exists: $3b5f7f6eebd4fff7$var$exists,
    output: $3b5f7f6eebd4fff7$var$output
};
module.exports.default = $3b5f7f6eebd4fff7$var$assert;

});


parcelRegister("8QiOG", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.polyval = module.exports.ghash = module.exports._toGHASHKey = void 0;

var $8Wj9n = parcelRequire("8Wj9n");

var $562yI = parcelRequire("562yI");
// GHash from AES-GCM and its little-endian "mirror image" Polyval from AES-SIV.
// Implemented in terms of GHash with conversion function for keys
// GCM GHASH from NIST SP800-38d, SIV from RFC 8452.
// https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
// GHASH   modulo: x^128 + x^7   + x^2   + x     + 1
// POLYVAL modulo: x^128 + x^127 + x^126 + x^121 + 1
const $6701c69bdb1c769d$var$BLOCK_SIZE = 16;
// TODO: rewrite
// temporary padding buffer
const $6701c69bdb1c769d$var$ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
const $6701c69bdb1c769d$var$ZEROS32 = (0, $8Wj9n.u32)($6701c69bdb1c769d$var$ZEROS16);
const $6701c69bdb1c769d$var$POLY = 0xe1; // v = 2*v % POLY
// v = 2*v % POLY
// NOTE: because x + x = 0 (add/sub is same), mul2(x) != x+x
// We can multiply any number using montgomery ladder and this function (works as double, add is simple xor)
const $6701c69bdb1c769d$var$mul2 = (s0, s1, s2, s3)=>{
    const hiBit = s3 & 1;
    return {
        s3: s2 << 31 | s3 >>> 1,
        s2: s1 << 31 | s2 >>> 1,
        s1: s0 << 31 | s1 >>> 1,
        s0: s0 >>> 1 ^ $6701c69bdb1c769d$var$POLY << 24 & -(hiBit & 1)
    };
};
const $6701c69bdb1c769d$var$swapLE = (n)=>(n >>> 0 & 0xff) << 24 | (n >>> 8 & 0xff) << 16 | (n >>> 16 & 0xff) << 8 | n >>> 24 & 0xff | 0;
/**
 * `mulX_POLYVAL(ByteReverse(H))` from spec
 * @param k mutated in place
 */ function $6701c69bdb1c769d$var$_toGHASHKey(k) {
    k.reverse();
    const hiBit = k[15] & 1;
    // k >>= 1
    let carry = 0;
    for(let i = 0; i < k.length; i++){
        const t = k[i];
        k[i] = t >>> 1 | carry;
        carry = (t & 1) << 7;
    }
    k[0] ^= -hiBit & 0xe1; // if (hiBit) n ^= 0xe1000000000000000000000000000000;
    return k;
}
module.exports._toGHASHKey = $6701c69bdb1c769d$var$_toGHASHKey;
const $6701c69bdb1c769d$var$estimateWindow = (bytes)=>{
    if (bytes > 65536) return 8;
    if (bytes > 1024) return 4;
    return 2;
};
class $6701c69bdb1c769d$var$GHASH {
    // We select bits per window adaptively based on expectedLength
    constructor(key, expectedLength){
        this.blockLen = $6701c69bdb1c769d$var$BLOCK_SIZE;
        this.outputLen = $6701c69bdb1c769d$var$BLOCK_SIZE;
        this.s0 = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.s3 = 0;
        this.finished = false;
        key = (0, $8Wj9n.toBytes)(key);
        (0, $562yI.bytes)(key, 16);
        const kView = (0, $8Wj9n.createView)(key);
        let k0 = kView.getUint32(0, false);
        let k1 = kView.getUint32(4, false);
        let k2 = kView.getUint32(8, false);
        let k3 = kView.getUint32(12, false);
        // generate table of doubled keys (half of montgomery ladder)
        const doubles = [];
        for(let i = 0; i < 128; i++){
            doubles.push({
                s0: $6701c69bdb1c769d$var$swapLE(k0),
                s1: $6701c69bdb1c769d$var$swapLE(k1),
                s2: $6701c69bdb1c769d$var$swapLE(k2),
                s3: $6701c69bdb1c769d$var$swapLE(k3)
            });
            ({ s0: k0, s1: k1, s2: k2, s3: k3 } = $6701c69bdb1c769d$var$mul2(k0, k1, k2, k3));
        }
        const W = $6701c69bdb1c769d$var$estimateWindow(expectedLength || 1024);
        if (![
            1,
            2,
            4,
            8
        ].includes(W)) throw new Error(`ghash: wrong window size=${W}, should be 2, 4 or 8`);
        this.W = W;
        const bits = 128; // always 128 bits;
        const windows = bits / W;
        const windowSize = this.windowSize = 2 ** W;
        const items = [];
        // Create precompute table for window of W bits
        for(let w = 0; w < windows; w++)// truth table: 00, 01, 10, 11
        for(let byte = 0; byte < windowSize; byte++){
            // prettier-ignore
            let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
            for(let j = 0; j < W; j++){
                const bit = byte >>> W - j - 1 & 1;
                if (!bit) continue;
                const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
                s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
            }
            items.push({
                s0: s0,
                s1: s1,
                s2: s2,
                s3: s3
            });
        }
        this.t = items;
    }
    _updateBlock(s0, s1, s2, s3) {
        s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
        const { W: W, t: t, windowSize: windowSize } = this;
        // prettier-ignore
        let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
        const mask = (1 << W) - 1; // 2**W will kill performance.
        let w = 0;
        for (const num of [
            s0,
            s1,
            s2,
            s3
        ])for(let bytePos = 0; bytePos < 4; bytePos++){
            const byte = num >>> 8 * bytePos & 0xff;
            for(let bitPos = 8 / W - 1; bitPos >= 0; bitPos--){
                const bit = byte >>> W * bitPos & mask;
                const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
                o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
                w += 1;
            }
        }
        this.s0 = o0;
        this.s1 = o1;
        this.s2 = o2;
        this.s3 = o3;
    }
    update(data) {
        data = (0, $8Wj9n.toBytes)(data);
        (0, $562yI.exists)(this);
        const b32 = (0, $8Wj9n.u32)(data);
        const blocks = Math.floor(data.length / $6701c69bdb1c769d$var$BLOCK_SIZE);
        const left = data.length % $6701c69bdb1c769d$var$BLOCK_SIZE;
        for(let i = 0; i < blocks; i++)this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
        if (left) {
            $6701c69bdb1c769d$var$ZEROS16.set(data.subarray(blocks * $6701c69bdb1c769d$var$BLOCK_SIZE));
            this._updateBlock($6701c69bdb1c769d$var$ZEROS32[0], $6701c69bdb1c769d$var$ZEROS32[1], $6701c69bdb1c769d$var$ZEROS32[2], $6701c69bdb1c769d$var$ZEROS32[3]);
            $6701c69bdb1c769d$var$ZEROS32.fill(0); // clean tmp buffer
        }
        return this;
    }
    destroy() {
        const { t: t } = this;
        // clean precompute table
        for (const elm of t)elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
    }
    digestInto(out) {
        (0, $562yI.exists)(this);
        (0, $562yI.output)(out, this);
        this.finished = true;
        const { s0: s0, s1: s1, s2: s2, s3: s3 } = this;
        const o32 = (0, $8Wj9n.u32)(out);
        o32[0] = s0;
        o32[1] = s1;
        o32[2] = s2;
        o32[3] = s3;
        return out;
    }
    digest() {
        const res = new Uint8Array($6701c69bdb1c769d$var$BLOCK_SIZE);
        this.digestInto(res);
        this.destroy();
        return res;
    }
}
class $6701c69bdb1c769d$var$Polyval extends $6701c69bdb1c769d$var$GHASH {
    constructor(key, expectedLength){
        key = (0, $8Wj9n.toBytes)(key);
        const ghKey = $6701c69bdb1c769d$var$_toGHASHKey(key.slice());
        super(ghKey, expectedLength);
        ghKey.fill(0);
    }
    update(data) {
        data = (0, $8Wj9n.toBytes)(data);
        (0, $562yI.exists)(this);
        const b32 = (0, $8Wj9n.u32)(data);
        const left = data.length % $6701c69bdb1c769d$var$BLOCK_SIZE;
        const blocks = Math.floor(data.length / $6701c69bdb1c769d$var$BLOCK_SIZE);
        for(let i = 0; i < blocks; i++)this._updateBlock($6701c69bdb1c769d$var$swapLE(b32[i * 4 + 3]), $6701c69bdb1c769d$var$swapLE(b32[i * 4 + 2]), $6701c69bdb1c769d$var$swapLE(b32[i * 4 + 1]), $6701c69bdb1c769d$var$swapLE(b32[i * 4 + 0]));
        if (left) {
            $6701c69bdb1c769d$var$ZEROS16.set(data.subarray(blocks * $6701c69bdb1c769d$var$BLOCK_SIZE));
            this._updateBlock($6701c69bdb1c769d$var$swapLE($6701c69bdb1c769d$var$ZEROS32[3]), $6701c69bdb1c769d$var$swapLE($6701c69bdb1c769d$var$ZEROS32[2]), $6701c69bdb1c769d$var$swapLE($6701c69bdb1c769d$var$ZEROS32[1]), $6701c69bdb1c769d$var$swapLE($6701c69bdb1c769d$var$ZEROS32[0]));
            $6701c69bdb1c769d$var$ZEROS32.fill(0); // clean tmp buffer
        }
        return this;
    }
    digestInto(out) {
        (0, $562yI.exists)(this);
        (0, $562yI.output)(out, this);
        this.finished = true;
        // tmp ugly hack
        const { s0: s0, s1: s1, s2: s2, s3: s3 } = this;
        const o32 = (0, $8Wj9n.u32)(out);
        o32[0] = s0;
        o32[1] = s1;
        o32[2] = s2;
        o32[3] = s3;
        return out.reverse();
    }
}
function $6701c69bdb1c769d$var$wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key)=>hashCons(key, msg.length).update((0, $8Wj9n.toBytes)(msg)).digest();
    const tmp = hashCons(new Uint8Array(16), 0);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key, expectedLength)=>hashCons(key, expectedLength);
    return hashC;
}
module.exports.ghash = $6701c69bdb1c769d$var$wrapConstructorWithKey((key, expectedLength)=>new $6701c69bdb1c769d$var$GHASH(key, expectedLength));
module.exports.polyval = $6701c69bdb1c769d$var$wrapConstructorWithKey((key, expectedLength)=>new $6701c69bdb1c769d$var$Polyval(key, expectedLength));

});


parcelRegister("iBX14", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.xchacha20poly1305 = module.exports.chacha20poly1305 = module.exports._poly1305_aead = module.exports.chacha12 = module.exports.chacha8 = module.exports.xchacha20 = module.exports.chacha20 = module.exports.chacha20orig = module.exports.hchacha = void 0;

var $8Wj9n = parcelRequire("8Wj9n");

var $2A3Ij = parcelRequire("2A3Ij");

var $kdO8k = parcelRequire("kdO8k");

var $562yI = parcelRequire("562yI");
// ChaCha20 stream cipher was released in 2008. ChaCha aims to increase
// the diffusion per round, but had slightly less cryptanalysis.
// https://cr.yp.to/chacha.html, http://cr.yp.to/chacha/chacha-20080128.pdf
/**
 * ChaCha core function.
 */ // prettier-ignore
function $d8c976195e2b19d2$var$chachaCore(s, k, n, out, cnt, rounds = 20) {
    let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2]; // Counter  Counter	Nonce   Nonce
    // Save state to temporary variables
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for(let r = 0; r < rounds; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x09, 7);
    }
    // Write output
    let oi = 0;
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
/**
 * hchacha helper method, used primarily in xchacha, to hash
 * key and nonce into key' and nonce'.
 * Same as chachaCore, but there doesn't seem to be a way to move the block
 * out without 25% performance hit.
 */ // prettier-ignore
function $d8c976195e2b19d2$var$hchacha(s, k, i, o32) {
    let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
    for(let r = 0; r < 20; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, $kdO8k.rotl)(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, $kdO8k.rotl)(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, $kdO8k.rotl)(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, $kdO8k.rotl)(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, $kdO8k.rotl)(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, $kdO8k.rotl)(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, $kdO8k.rotl)(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, $kdO8k.rotl)(x04 ^ x09, 7);
    }
    let oi = 0;
    o32[oi++] = x00;
    o32[oi++] = x01;
    o32[oi++] = x02;
    o32[oi++] = x03;
    o32[oi++] = x12;
    o32[oi++] = x13;
    o32[oi++] = x14;
    o32[oi++] = x15;
}
module.exports.hchacha = $d8c976195e2b19d2$var$hchacha;
/**
 * Original, non-RFC chacha20 from DJB. 8-byte nonce, 8-byte counter.
 */ module.exports.chacha20orig = (0, $kdO8k.createCipher)($d8c976195e2b19d2$var$chachaCore, {
    counterRight: false,
    counterLength: 8,
    allowShortKeys: true
});
/**
 * ChaCha stream cipher. Conforms to RFC 8439 (IETF, TLS). 12-byte nonce, 4-byte counter.
 * With 12-byte nonce, it's not safe to use fill it with random (CSPRNG), due to collision chance.
 */ module.exports.chacha20 = (0, $kdO8k.createCipher)($d8c976195e2b19d2$var$chachaCore, {
    counterRight: false,
    counterLength: 4,
    allowShortKeys: false
});
/**
 * XChaCha eXtended-nonce ChaCha. 24-byte nonce.
 * With 24-byte nonce, it's safe to use fill it with random (CSPRNG).
 * https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha
 */ module.exports.xchacha20 = (0, $kdO8k.createCipher)($d8c976195e2b19d2$var$chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: $d8c976195e2b19d2$var$hchacha,
    allowShortKeys: false
});
/**
 * Reduced 8-round chacha, described in original paper.
 */ module.exports.chacha8 = (0, $kdO8k.createCipher)($d8c976195e2b19d2$var$chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 8
});
/**
 * Reduced 12-round chacha, described in original paper.
 */ module.exports.chacha12 = (0, $kdO8k.createCipher)($d8c976195e2b19d2$var$chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 12
});
const $d8c976195e2b19d2$var$ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
// Pad to digest size with zeros
const $d8c976195e2b19d2$var$updatePadded = (h, msg)=>{
    h.update(msg);
    const left = msg.length % 16;
    if (left) h.update($d8c976195e2b19d2$var$ZEROS16.subarray(left));
};
const $d8c976195e2b19d2$var$ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function $d8c976195e2b19d2$var$computeTag(fn, key, nonce, data, AAD) {
    const authKey = fn(key, nonce, $d8c976195e2b19d2$var$ZEROS32);
    const h = $2A3Ij.poly1305.create(authKey);
    if (AAD) $d8c976195e2b19d2$var$updatePadded(h, AAD);
    $d8c976195e2b19d2$var$updatePadded(h, data);
    const num = new Uint8Array(16);
    const view = (0, $8Wj9n.createView)(num);
    (0, $8Wj9n.setBigUint64)(view, 0, BigInt(AAD ? AAD.length : 0), true);
    (0, $8Wj9n.setBigUint64)(view, 8, BigInt(data.length), true);
    h.update(num);
    const res = h.digest();
    authKey.fill(0);
    return res;
}
/**
 * AEAD algorithm from RFC 8439.
 * Salsa20 and chacha (RFC 8439) use poly1305 differently.
 * We could have composed them similar to:
 * https://github.com/paulmillr/scure-base/blob/b266c73dde977b1dd7ef40ef7a23cc15aab526b3/index.ts#L250
 * But it's hard because of authKey:
 * In salsa20, authKey changes position in salsa stream.
 * In chacha, authKey can't be computed inside computeTag, it modifies the counter.
 */ const $d8c976195e2b19d2$var$_poly1305_aead = (xorStream)=>(key, nonce, AAD)=>{
        const tagLength = 16;
        (0, $562yI.bytes)(key, 32);
        (0, $562yI.bytes)(nonce);
        return {
            encrypt: (plaintext, output)=>{
                const plength = plaintext.length;
                const clength = plength + tagLength;
                if (output) (0, $562yI.bytes)(output, clength);
                else output = new Uint8Array(clength);
                xorStream(key, nonce, plaintext, output, 1);
                const tag = $d8c976195e2b19d2$var$computeTag(xorStream, key, nonce, output.subarray(0, -tagLength), AAD);
                output.set(tag, plength); // append tag
                return output;
            },
            decrypt: (ciphertext, output)=>{
                const clength = ciphertext.length;
                const plength = clength - tagLength;
                if (clength < tagLength) throw new Error(`encrypted data must be at least ${tagLength} bytes`);
                if (output) (0, $562yI.bytes)(output, plength);
                else output = new Uint8Array(plength);
                const data = ciphertext.subarray(0, -tagLength);
                const passedTag = ciphertext.subarray(-tagLength);
                const tag = $d8c976195e2b19d2$var$computeTag(xorStream, key, nonce, data, AAD);
                if (!(0, $8Wj9n.equalBytes)(passedTag, tag)) throw new Error('invalid tag');
                xorStream(key, nonce, data, output, 1);
                return output;
            }
        };
    };
module.exports._poly1305_aead = $d8c976195e2b19d2$var$_poly1305_aead;
/**
 * ChaCha20-Poly1305 from RFC 8439.
 * With 12-byte nonce, it's not safe to use fill it with random (CSPRNG), due to collision chance.
 */ module.exports.chacha20poly1305 = (0, $8Wj9n.wrapCipher)({
    blockSize: 64,
    nonceLength: 12,
    tagLength: 16
}, (0, module.exports._poly1305_aead)(module.exports.chacha20));
/**
 * XChaCha20-Poly1305 extended-nonce chacha.
 * https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha
 * With 24-byte nonce, it's safe to use fill it with random (CSPRNG).
 */ module.exports.xchacha20poly1305 = (0, $8Wj9n.wrapCipher)({
    blockSize: 64,
    nonceLength: 24,
    tagLength: 16
}, (0, module.exports._poly1305_aead)(module.exports.xchacha20));

});
parcelRegister("2A3Ij", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.poly1305 = module.exports.wrapConstructorWithKey = void 0;

var $562yI = parcelRequire("562yI");

var $8Wj9n = parcelRequire("8Wj9n");
// Poly1305 is a fast and parallel secret-key message-authentication code.
// https://cr.yp.to/mac.html, https://cr.yp.to/mac/poly1305-20050329.pdf
// https://datatracker.ietf.org/doc/html/rfc8439
// Based on Public Domain poly1305-donna https://github.com/floodyberry/poly1305-donna
const $1e11d30bfd319ad3$var$u8to16 = (a, i)=>a[i++] & 0xff | (a[i++] & 0xff) << 8;
class $1e11d30bfd319ad3$var$Poly1305 {
    constructor(key){
        this.blockLen = 16;
        this.outputLen = 16;
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.pos = 0;
        this.finished = false;
        key = (0, $8Wj9n.toBytes)(key);
        (0, $562yI.bytes)(key, 32);
        const t0 = $1e11d30bfd319ad3$var$u8to16(key, 0);
        const t1 = $1e11d30bfd319ad3$var$u8to16(key, 2);
        const t2 = $1e11d30bfd319ad3$var$u8to16(key, 4);
        const t3 = $1e11d30bfd319ad3$var$u8to16(key, 6);
        const t4 = $1e11d30bfd319ad3$var$u8to16(key, 8);
        const t5 = $1e11d30bfd319ad3$var$u8to16(key, 10);
        const t6 = $1e11d30bfd319ad3$var$u8to16(key, 12);
        const t7 = $1e11d30bfd319ad3$var$u8to16(key, 14);
        // https://github.com/floodyberry/poly1305-donna/blob/e6ad6e091d30d7f4ec2d4f978be1fcfcbce72781/poly1305-donna-16.h#L47
        this.r[0] = t0 & 0x1fff;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
        this.r[5] = t4 >>> 1 & 0x1ffe;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
        this.r[9] = t7 >>> 5 & 0x007f;
        for(let i = 0; i < 8; i++)this.pad[i] = $1e11d30bfd319ad3$var$u8to16(key, 16 + 2 * i);
    }
    process(data, offset, isLast = false) {
        const hibit = isLast ? 0 : 2048;
        const { h: h, r: r } = this;
        const r0 = r[0];
        const r1 = r[1];
        const r2 = r[2];
        const r3 = r[3];
        const r4 = r[4];
        const r5 = r[5];
        const r6 = r[6];
        const r7 = r[7];
        const r8 = r[8];
        const r9 = r[9];
        const t0 = $1e11d30bfd319ad3$var$u8to16(data, offset + 0);
        const t1 = $1e11d30bfd319ad3$var$u8to16(data, offset + 2);
        const t2 = $1e11d30bfd319ad3$var$u8to16(data, offset + 4);
        const t3 = $1e11d30bfd319ad3$var$u8to16(data, offset + 6);
        const t4 = $1e11d30bfd319ad3$var$u8to16(data, offset + 8);
        const t5 = $1e11d30bfd319ad3$var$u8to16(data, offset + 10);
        const t6 = $1e11d30bfd319ad3$var$u8to16(data, offset + 12);
        const t7 = $1e11d30bfd319ad3$var$u8to16(data, offset + 14);
        let h0 = h[0] + (t0 & 0x1fff);
        let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 0x1fff);
        let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 0x1fff);
        let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 0x1fff);
        let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 0x1fff);
        let h5 = h[5] + (t4 >>> 1 & 0x1fff);
        let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 0x1fff);
        let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 0x1fff);
        let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 0x1fff);
        let h9 = h[9] + (t7 >>> 5 | hibit);
        let c = 0;
        let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 0x1fff;
        d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 0x1fff;
        let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 0x1fff;
        d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 0x1fff;
        let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 0x1fff;
        d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 0x1fff;
        let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 0x1fff;
        d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 0x1fff;
        let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
        c = d4 >>> 13;
        d4 &= 0x1fff;
        d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 0x1fff;
        let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
        c = d5 >>> 13;
        d5 &= 0x1fff;
        d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 0x1fff;
        let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
        c = d6 >>> 13;
        d6 &= 0x1fff;
        d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 0x1fff;
        let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
        c = d7 >>> 13;
        d7 &= 0x1fff;
        d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 0x1fff;
        let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
        c = d8 >>> 13;
        d8 &= 0x1fff;
        d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 0x1fff;
        let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
        c = d9 >>> 13;
        d9 &= 0x1fff;
        d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
        c += d9 >>> 13;
        d9 &= 0x1fff;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 0x1fff;
        c = c >>> 13;
        d1 += c;
        h[0] = d0;
        h[1] = d1;
        h[2] = d2;
        h[3] = d3;
        h[4] = d4;
        h[5] = d5;
        h[6] = d6;
        h[7] = d7;
        h[8] = d8;
        h[9] = d9;
    }
    finalize() {
        const { h: h, pad: pad } = this;
        const g = new Uint16Array(10);
        let c = h[1] >>> 13;
        h[1] &= 0x1fff;
        for(let i = 2; i < 10; i++){
            h[i] += c;
            c = h[i] >>> 13;
            h[i] &= 0x1fff;
        }
        h[0] += c * 5;
        c = h[0] >>> 13;
        h[0] &= 0x1fff;
        h[1] += c;
        c = h[1] >>> 13;
        h[1] &= 0x1fff;
        h[2] += c;
        g[0] = h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 0x1fff;
        for(let i = 1; i < 10; i++){
            g[i] = h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
        }
        g[9] -= 8192;
        let mask = (c ^ 1) - 1;
        for(let i = 0; i < 10; i++)g[i] &= mask;
        mask = ~mask;
        for(let i = 0; i < 10; i++)h[i] = h[i] & mask | g[i];
        h[0] = (h[0] | h[1] << 13) & 0xffff;
        h[1] = (h[1] >>> 3 | h[2] << 10) & 0xffff;
        h[2] = (h[2] >>> 6 | h[3] << 7) & 0xffff;
        h[3] = (h[3] >>> 9 | h[4] << 4) & 0xffff;
        h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 0xffff;
        h[5] = (h[6] >>> 2 | h[7] << 11) & 0xffff;
        h[6] = (h[7] >>> 5 | h[8] << 8) & 0xffff;
        h[7] = (h[8] >>> 8 | h[9] << 5) & 0xffff;
        let f = h[0] + pad[0];
        h[0] = f & 0xffff;
        for(let i = 1; i < 8; i++){
            f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
            h[i] = f & 0xffff;
        }
    }
    update(data) {
        (0, $562yI.exists)(this);
        const { buffer: buffer, blockLen: blockLen } = this;
        data = (0, $8Wj9n.toBytes)(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input
            if (take === blockLen) {
                for(; blockLen <= len - pos; pos += blockLen)this.process(data, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(buffer, 0, false);
                this.pos = 0;
            }
        }
        return this;
    }
    destroy() {
        this.h.fill(0);
        this.r.fill(0);
        this.buffer.fill(0);
        this.pad.fill(0);
    }
    digestInto(out) {
        (0, $562yI.exists)(this);
        (0, $562yI.output)(out, this);
        this.finished = true;
        const { buffer: buffer, h: h } = this;
        let { pos: pos } = this;
        if (pos) {
            buffer[pos++] = 1;
            // buffer.subarray(pos).fill(0);
            for(; pos < 16; pos++)buffer[pos] = 0;
            this.process(buffer, 0, true);
        }
        this.finalize();
        let opos = 0;
        for(let i = 0; i < 8; i++){
            out[opos++] = h[i] >>> 0;
            out[opos++] = h[i] >>> 8;
        }
        return out;
    }
    digest() {
        const { buffer: buffer, outputLen: outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
}
function $1e11d30bfd319ad3$var$wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key)=>hashCons(key).update((0, $8Wj9n.toBytes)(msg)).digest();
    const tmp = hashCons(new Uint8Array(32));
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key)=>hashCons(key);
    return hashC;
}
module.exports.wrapConstructorWithKey = $1e11d30bfd319ad3$var$wrapConstructorWithKey;
module.exports.poly1305 = $1e11d30bfd319ad3$var$wrapConstructorWithKey((key)=>new $1e11d30bfd319ad3$var$Poly1305(key));

});

parcelRegister("kdO8k", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.createCipher = module.exports.rotl = module.exports.sigma = void 0;

var $562yI = parcelRequire("562yI");

var $8Wj9n = parcelRequire("8Wj9n");
/*
RFC8439 requires multi-step cipher stream, where
authKey starts with counter: 0, actual msg with counter: 1.

For this, we need a way to re-use nonce / counter:

    const counter = new Uint8Array(4);
    chacha(..., counter, ...); // counter is now 1
    chacha(..., counter, ...); // counter is now 2

This is complicated:

- 32-bit counters are enough, no need for 64-bit: max ArrayBuffer size in JS is 4GB
- Original papers don't allow mutating counters
- Counter overflow is undefined [^1]
- Idea A: allow providing (nonce | counter) instead of just nonce, re-use it
- Caveat: Cannot be re-used through all cases:
- * chacha has (counter | nonce)
- * xchacha has (nonce16 | counter | nonce16)
- Idea B: separate nonce / counter and provide separate API for counter re-use
- Caveat: there are different counter sizes depending on an algorithm.
- salsa & chacha also differ in structures of key & sigma:
  salsa20:      s[0] | k(4) | s[1] | nonce(2) | ctr(2) | s[2] | k(4) | s[3]
  chacha:       s(4) | k(8) | ctr(1) | nonce(3)
  chacha20orig: s(4) | k(8) | ctr(2) | nonce(2)
- Idea C: helper method such as `setSalsaState(key, nonce, sigma, data)`
- Caveat: we can't re-use counter array

xchacha [^2] uses the subkey and remaining 8 byte nonce with ChaCha20 as normal
(prefixed by 4 NUL bytes, since [RFC8439] specifies a 12-byte nonce).

[^1]: https://mailarchive.ietf.org/arch/msg/cfrg/gsOnTJzcbgG6OqD8Sc0GO5aR_tU/
[^2]: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha#appendix-A.2
*/ // We can't make top-level var depend on utils.utf8ToBytes
// because it's not present in all envs. Creating a similar fn here
const $eb8be900a971913e$var$_utf8ToBytes = (str)=>Uint8Array.from(str.split('').map((c)=>c.charCodeAt(0)));
const $eb8be900a971913e$var$sigma16 = $eb8be900a971913e$var$_utf8ToBytes('expand 16-byte k');
const $eb8be900a971913e$var$sigma32 = $eb8be900a971913e$var$_utf8ToBytes('expand 32-byte k');
const $eb8be900a971913e$var$sigma16_32 = (0, $8Wj9n.u32)($eb8be900a971913e$var$sigma16);
const $eb8be900a971913e$var$sigma32_32 = (0, $8Wj9n.u32)($eb8be900a971913e$var$sigma32);
module.exports.sigma = $eb8be900a971913e$var$sigma32_32.slice();
function $eb8be900a971913e$var$rotl(a, b) {
    return a << b | a >>> 32 - b;
}
module.exports.rotl = $eb8be900a971913e$var$rotl;
// Is byte array aligned to 4 byte offset (u32)?
function $eb8be900a971913e$var$isAligned32(b) {
    return b.byteOffset % 4 === 0;
}
// Salsa and Chacha block length is always 512-bit
const $eb8be900a971913e$var$BLOCK_LEN = 64;
const $eb8be900a971913e$var$BLOCK_LEN32 = 16;
// new Uint32Array([2**32])   // => Uint32Array(1) [ 0 ]
// new Uint32Array([2**32-1]) // => Uint32Array(1) [ 4294967295 ]
const $eb8be900a971913e$var$MAX_COUNTER = 2 ** 32 - 1;
const $eb8be900a971913e$var$U32_EMPTY = new Uint32Array();
function $eb8be900a971913e$var$runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array($eb8be900a971913e$var$BLOCK_LEN);
    const b32 = (0, $8Wj9n.u32)(block);
    // Make sure that buffers aligned to 4 bytes
    const isAligned = $eb8be900a971913e$var$isAligned32(data) && $eb8be900a971913e$var$isAligned32(output);
    const d32 = isAligned ? (0, $8Wj9n.u32)(data) : $eb8be900a971913e$var$U32_EMPTY;
    const o32 = isAligned ? (0, $8Wj9n.u32)(output) : $eb8be900a971913e$var$U32_EMPTY;
    for(let pos = 0; pos < len; counter++){
        core(sigma, key, nonce, b32, counter, rounds);
        if (counter >= $eb8be900a971913e$var$MAX_COUNTER) throw new Error('arx: counter overflow');
        const take = Math.min($eb8be900a971913e$var$BLOCK_LEN, len - pos);
        // aligned to 4 bytes
        if (isAligned && take === $eb8be900a971913e$var$BLOCK_LEN) {
            const pos32 = pos / 4;
            if (pos % 4 !== 0) throw new Error('arx: invalid block position');
            for(let j = 0, posj; j < $eb8be900a971913e$var$BLOCK_LEN32; j++){
                posj = pos32 + j;
                o32[posj] = d32[posj] ^ b32[j];
            }
            pos += $eb8be900a971913e$var$BLOCK_LEN;
            continue;
        }
        for(let j = 0, posj; j < take; j++){
            posj = pos + j;
            output[posj] = data[posj] ^ block[j];
        }
        pos += take;
    }
}
function $eb8be900a971913e$var$createCipher(core, opts) {
    const { allowShortKeys: allowShortKeys, extendNonceFn: extendNonceFn, counterLength: counterLength, counterRight: counterRight, rounds: rounds } = (0, $8Wj9n.checkOpts)({
        allowShortKeys: false,
        counterLength: 8,
        counterRight: false,
        rounds: 20
    }, opts);
    if (typeof core !== 'function') throw new Error('core must be a function');
    (0, $562yI.number)(counterLength);
    (0, $562yI.number)(rounds);
    (0, $562yI.bool)(counterRight);
    (0, $562yI.bool)(allowShortKeys);
    return (key, nonce, data, output, counter = 0)=>{
        (0, $562yI.bytes)(key);
        (0, $562yI.bytes)(nonce);
        (0, $562yI.bytes)(data);
        const len = data.length;
        if (!output) output = new Uint8Array(len);
        (0, $562yI.bytes)(output);
        (0, $562yI.number)(counter);
        if (counter < 0 || counter >= $eb8be900a971913e$var$MAX_COUNTER) throw new Error('arx: counter overflow');
        if (output.length < len) throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
        const toClean = [];
        // Key & sigma
        // key=16 -> sigma16, k=key|key
        // key=32 -> sigma32, k=key
        let l = key.length, k, sigma;
        if (l === 32) {
            k = key.slice();
            toClean.push(k);
            sigma = $eb8be900a971913e$var$sigma32_32;
        } else if (l === 16 && allowShortKeys) {
            k = new Uint8Array(32);
            k.set(key);
            k.set(key, 16);
            sigma = $eb8be900a971913e$var$sigma16_32;
            toClean.push(k);
        } else throw new Error(`arx: invalid 32-byte key, got length=${l}`);
        // Nonce
        // salsa20:      8   (8-byte counter)
        // chacha20orig: 8   (8-byte counter)
        // chacha20:     12  (4-byte counter)
        // xsalsa20:     24  (16 -> hsalsa,  8 -> old nonce)
        // xchacha20:    24  (16 -> hchacha, 8 -> old nonce)
        // Align nonce to 4 bytes
        if (!$eb8be900a971913e$var$isAligned32(nonce)) {
            nonce = nonce.slice();
            toClean.push(nonce);
        }
        const k32 = (0, $8Wj9n.u32)(k);
        // hsalsa & hchacha: handle extended nonce
        if (extendNonceFn) {
            if (nonce.length !== 24) throw new Error(`arx: extended nonce must be 24 bytes`);
            extendNonceFn(sigma, k32, (0, $8Wj9n.u32)(nonce.subarray(0, 16)), k32);
            nonce = nonce.subarray(16);
        }
        // Handle nonce counter
        const nonceNcLen = 16 - counterLength;
        if (nonceNcLen !== nonce.length) throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
        // Pad counter when nonce is 64 bit
        if (nonceNcLen !== 12) {
            const nc = new Uint8Array(12);
            nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
            nonce = nc;
            toClean.push(nonce);
        }
        const n32 = (0, $8Wj9n.u32)(nonce);
        $eb8be900a971913e$var$runCipher(core, sigma, k32, n32, data, output, counter, rounds);
        while(toClean.length > 0)toClean.pop().fill(0);
        return output;
    };
}
module.exports.createCipher = $eb8be900a971913e$var$createCipher;

});


parcelRegister("dnDHV", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.hkdf = module.exports.expand = module.exports.extract = void 0;

var $iiMso = parcelRequire("iiMso");

var $jxo4c = parcelRequire("jxo4c");

var $cgbWU = parcelRequire("cgbWU");
// HKDF (RFC 5869)
// https://soatok.blog/2021/11/17/understanding-hkdf/
/**
 * HKDF-Extract(IKM, salt) -> PRK
 * Arguments position differs from spec (IKM is first one, since it is not optional)
 * @param hash
 * @param ikm
 * @param salt
 * @returns
 */ function $9bdc39715b7eafef$var$extract(hash, ikm, salt) {
    $iiMso.default.hash(hash);
    // NOTE: some libraries treat zero-length array as 'not provided';
    // we don't, since we have undefined as 'not provided'
    // https://github.com/RustCrypto/KDFs/issues/15
    if (salt === undefined) salt = new Uint8Array(hash.outputLen); // if not provided, it is set to a string of HashLen zeros
    return (0, $cgbWU.hmac)(hash, (0, $jxo4c.toBytes)(salt), (0, $jxo4c.toBytes)(ikm));
}
module.exports.extract = $9bdc39715b7eafef$var$extract;
// HKDF-Expand(PRK, info, L) -> OKM
const $9bdc39715b7eafef$var$HKDF_COUNTER = new Uint8Array([
    0
]);
const $9bdc39715b7eafef$var$EMPTY_BUFFER = new Uint8Array();
/**
 * HKDF-expand from the spec.
 * @param prk - a pseudorandom key of at least HashLen octets (usually, the output from the extract step)
 * @param info - optional context and application specific information (can be a zero-length string)
 * @param length - length of output keying material in octets
 */ function $9bdc39715b7eafef$var$expand(hash, prk, info, length = 32) {
    $iiMso.default.hash(hash);
    $iiMso.default.number(length);
    if (length > 255 * hash.outputLen) throw new Error('Length should be <= 255*HashLen');
    const blocks = Math.ceil(length / hash.outputLen);
    if (info === undefined) info = $9bdc39715b7eafef$var$EMPTY_BUFFER;
    // first L(ength) octets of T
    const okm = new Uint8Array(blocks * hash.outputLen);
    // Re-use HMAC instance between blocks
    const HMAC = $cgbWU.hmac.create(hash, prk);
    const HMACTmp = HMAC._cloneInto();
    const T = new Uint8Array(HMAC.outputLen);
    for(let counter = 0; counter < blocks; counter++){
        $9bdc39715b7eafef$var$HKDF_COUNTER[0] = counter + 1;
        // T(0) = empty string (zero length)
        // T(N) = HMAC-Hash(PRK, T(N-1) | info | N)
        HMACTmp.update(counter === 0 ? $9bdc39715b7eafef$var$EMPTY_BUFFER : T).update(info).update($9bdc39715b7eafef$var$HKDF_COUNTER).digestInto(T);
        okm.set(T, hash.outputLen * counter);
        HMAC._cloneInto(HMACTmp);
    }
    HMAC.destroy();
    HMACTmp.destroy();
    T.fill(0);
    $9bdc39715b7eafef$var$HKDF_COUNTER.fill(0);
    return okm.slice(0, length);
}
module.exports.expand = $9bdc39715b7eafef$var$expand;
/**
 * HKDF (RFC 5869): extract + expand in one step.
 * @param hash - hash function that would be used (e.g. sha256)
 * @param ikm - input keying material, the initial key
 * @param salt - optional salt value (a non-secret random value)
 * @param info - optional context and application specific information
 * @param length - length of output keying material in octets
 */ const $9bdc39715b7eafef$var$hkdf = (hash, ikm, salt, info, length)=>$9bdc39715b7eafef$var$expand(hash, $9bdc39715b7eafef$var$extract(hash, ikm, salt), info, length);
module.exports.hkdf = $9bdc39715b7eafef$var$hkdf;

});
parcelRegister("cgbWU", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.hmac = module.exports.HMAC = void 0;

var $iiMso = parcelRequire("iiMso");

var $jxo4c = parcelRequire("jxo4c");
// HMAC (RFC 2104)
class $8ed03f8335b0cc67$var$HMAC extends $jxo4c.Hash {
    constructor(hash, _key){
        super();
        this.finished = false;
        this.destroyed = false;
        $iiMso.default.hash(hash);
        const key = (0, $jxo4c.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 106;
        this.oHash.update(pad);
        pad.fill(0);
    }
    update(buf) {
        $iiMso.default.exists(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        $iiMso.default.exists(this);
        $iiMso.default.bytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash: oHash, iHash: iHash, finished: finished, destroyed: destroyed, blockLen: blockLen, outputLen: outputLen } = this;
        to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
module.exports.HMAC = $8ed03f8335b0cc67$var$HMAC;
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 */ const $8ed03f8335b0cc67$var$hmac = (hash, key, message)=>new $8ed03f8335b0cc67$var$HMAC(hash, key).update(message).digest();
module.exports.hmac = $8ed03f8335b0cc67$var$hmac;
module.exports.hmac.create = (hash, key)=>new $8ed03f8335b0cc67$var$HMAC(hash, key);

});



parcelRegister("jOQqz", function(module, exports) {

$parcel$export(module.exports, "Invoice", () => $e6db5ad59f233ce9$export$ba5f874f962e090e);
$parcel$export(module.exports, "LightningAddress", () => $e6db5ad59f233ce9$export$ebeb97171ba8142c);
$parcel$export(module.exports, "fiat", () => $e6db5ad59f233ce9$export$c32e8ef196152e59);
var $e6db5ad59f233ce9$var$e, $e6db5ad59f233ce9$var$t, $e6db5ad59f233ce9$var$r = ($e6db5ad59f233ce9$var$e = function(e, t) {
    function r(e) {
        if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
    }
    function n(...e) {
        const t = (e, t)=>(r)=>e(t(r));
        return {
            encode: Array.from(e).reverse().reduce((e, r)=>e ? t(e, r.encode) : r.encode, void 0),
            decode: e.reduce((e, r)=>e ? t(e, r.decode) : r.decode, void 0)
        };
    }
    function o(e) {
        return {
            encode: (t)=>{
                if (!Array.isArray(t) || t.length && "number" != typeof t[0]) throw new Error("alphabet.encode input should be an array of numbers");
                return t.map((t)=>{
                    if (r(t), t < 0 || t >= e.length) throw new Error(`Digit index outside alphabet: ${t} (alphabet: ${e.length})`);
                    return e[t];
                });
            },
            decode: (t)=>{
                if (!Array.isArray(t) || t.length && "string" != typeof t[0]) throw new Error("alphabet.decode input should be array of strings");
                return t.map((t)=>{
                    if ("string" != typeof t) throw new Error(`alphabet.decode: not string element=${t}`);
                    const r = e.indexOf(t);
                    if (-1 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                    return r;
                });
            }
        };
    }
    function i(e = "") {
        if ("string" != typeof e) throw new Error("join separator should be string");
        return {
            encode: (t)=>{
                if (!Array.isArray(t) || t.length && "string" != typeof t[0]) throw new Error("join.encode input should be array of strings");
                for (let e of t)if ("string" != typeof e) throw new Error(`join.encode: non-string input=${e}`);
                return t.join(e);
            },
            decode: (t)=>{
                if ("string" != typeof t) throw new Error("join.decode input should be string");
                return t.split(e);
            }
        };
    }
    function s(e, t = "=") {
        if (r(e), "string" != typeof t) throw new Error("padding chr should be string");
        return {
            encode (r) {
                if (!Array.isArray(r) || r.length && "string" != typeof r[0]) throw new Error("padding.encode input should be array of strings");
                for (let e of r)if ("string" != typeof e) throw new Error(`padding.encode: non-string input=${e}`);
                for(; r.length * e % 8;)r.push(t);
                return r;
            },
            decode (r) {
                if (!Array.isArray(r) || r.length && "string" != typeof r[0]) throw new Error("padding.encode input should be array of strings");
                for (let e of r)if ("string" != typeof e) throw new Error(`padding.decode: non-string input=${e}`);
                let n = r.length;
                if (n * e % 8) throw new Error("Invalid padding: string should have whole number of bytes");
                for(; n > 0 && r[n - 1] === t; n--)if (!((n - 1) * e % 8)) throw new Error("Invalid padding: string has too much padding");
                return r.slice(0, n);
            }
        };
    }
    function a(e) {
        if ("function" != typeof e) throw new Error("normalize fn should be function");
        return {
            encode: (e)=>e,
            decode: (t)=>e(t)
        };
    }
    function c(e, t, n) {
        if (t < 2) throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
        if (n < 2) throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
        if (!Array.isArray(e)) throw new Error("convertRadix: data should be array");
        if (!e.length) return [];
        let o = 0;
        const i = [], s = Array.from(e);
        for(s.forEach((e)=>{
            if (r(e), e < 0 || e >= t) throw new Error(`Wrong integer: ${e}`);
        });;){
            let e = 0, r = !0;
            for(let i = o; i < s.length; i++){
                const a = s[i], c = t * e + a;
                if (!Number.isSafeInteger(c) || t * e / t !== e || c - a != t * e) throw new Error("convertRadix: carry overflow");
                if (e = c % n, s[i] = Math.floor(c / n), !Number.isSafeInteger(s[i]) || s[i] * n + e !== c) throw new Error("convertRadix: carry overflow");
                r && (s[i] ? r = !1 : o = i);
            }
            if (i.push(e), r) break;
        }
        for(let t = 0; t < e.length - 1 && 0 === e[t]; t++)i.push(0);
        return i.reverse();
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.bytes = t.stringToBytes = t.str = t.bytesToString = t.hex = t.utf8 = t.bech32m = t.bech32 = t.base58check = t.base58xmr = t.base58xrp = t.base58flickr = t.base58 = t.base64url = t.base64 = t.base32crockford = t.base32hex = t.base32 = t.base16 = t.utils = t.assertNumber = void 0, t.assertNumber = r;
    const u = (e, t)=>t ? u(t, e % t) : e, h = (e, t)=>e + (t - u(e, t));
    function l(e, t, n, o) {
        if (!Array.isArray(e)) throw new Error("convertRadix2: data should be array");
        if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
        if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
        if (h(t, n) > 32) throw new Error(`convertRadix2: carry overflow from=${t} to=${n} carryBits=${h(t, n)}`);
        let i = 0, s = 0;
        const a = 2 ** n - 1, c = [];
        for (const o of e){
            if (r(o), o >= 2 ** t) throw new Error(`convertRadix2: invalid data word=${o} from=${t}`);
            if (i = i << t | o, s + t > 32) throw new Error(`convertRadix2: carry overflow pos=${s} from=${t}`);
            for(s += t; s >= n; s -= n)c.push((i >> s - n & a) >>> 0);
            i &= 2 ** s - 1;
        }
        if (i = i << n - s & a, !o && s >= t) throw new Error("Excess padding");
        if (!o && i) throw new Error(`Non-zero padding: ${i}`);
        return o && s > 0 && c.push(i >>> 0), c;
    }
    function f(e) {
        return r(e), {
            encode: (t)=>{
                if (!(t instanceof Uint8Array)) throw new Error("radix.encode input should be Uint8Array");
                return c(Array.from(t), 256, e);
            },
            decode: (t)=>{
                if (!Array.isArray(t) || t.length && "number" != typeof t[0]) throw new Error("radix.decode input should be array of strings");
                return Uint8Array.from(c(t, e, 256));
            }
        };
    }
    function d(e, t = !1) {
        if (r(e), e <= 0 || e > 32) throw new Error("radix2: bits should be in (0..32]");
        if (h(8, e) > 32 || h(e, 8) > 32) throw new Error("radix2: carry overflow");
        return {
            encode: (r)=>{
                if (!(r instanceof Uint8Array)) throw new Error("radix2.encode input should be Uint8Array");
                return l(Array.from(r), 8, e, !t);
            },
            decode: (r)=>{
                if (!Array.isArray(r) || r.length && "number" != typeof r[0]) throw new Error("radix2.decode input should be array of strings");
                return Uint8Array.from(l(r, e, 8, t));
            }
        };
    }
    function p(e) {
        if ("function" != typeof e) throw new Error("unsafeWrapper fn should be function");
        return function(...t) {
            try {
                return e.apply(null, t);
            } catch (e) {}
        };
    }
    function m(e, t) {
        if (r(e), "function" != typeof t) throw new Error("checksum fn should be function");
        return {
            encode (r) {
                if (!(r instanceof Uint8Array)) throw new Error("checksum.encode: input should be Uint8Array");
                const n = t(r).slice(0, e), o = new Uint8Array(r.length + e);
                return o.set(r), o.set(n, r.length), o;
            },
            decode (r) {
                if (!(r instanceof Uint8Array)) throw new Error("checksum.decode: input should be Uint8Array");
                const n = r.slice(0, -e), o = t(n).slice(0, e), i = r.slice(-e);
                for(let t = 0; t < e; t++)if (o[t] !== i[t]) throw new Error("Invalid checksum");
                return n;
            }
        };
    }
    t.utils = {
        alphabet: o,
        chain: n,
        checksum: m,
        radix: f,
        radix2: d,
        join: i,
        padding: s
    }, t.base16 = n(d(4), o("0123456789ABCDEF"), i("")), t.base32 = n(d(5), o("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), s(5), i("")), t.base32hex = n(d(5), o("0123456789ABCDEFGHIJKLMNOPQRSTUV"), s(5), i("")), t.base32crockford = n(d(5), o("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), i(""), a((e)=>e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))), t.base64 = n(d(6), o("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), s(6), i("")), t.base64url = n(d(6), o("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), s(6), i(""));
    const y = (e)=>n(f(58), o(e), i(""));
    t.base58 = y("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"), t.base58flickr = y("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), t.base58xrp = y("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
    const w = [
        0,
        2,
        3,
        5,
        6,
        7,
        9,
        10,
        11
    ];
    t.base58xmr = {
        encode (e) {
            let r = "";
            for(let n = 0; n < e.length; n += 8){
                const o = e.subarray(n, n + 8);
                r += t.base58.encode(o).padStart(w[o.length], "1");
            }
            return r;
        },
        decode (e) {
            let r = [];
            for(let n = 0; n < e.length; n += 11){
                const o = e.slice(n, n + 11), i = w.indexOf(o.length), s = t.base58.decode(o);
                for(let e = 0; e < s.length - i; e++)if (0 !== s[e]) throw new Error("base58xmr: wrong padding");
                r = r.concat(Array.from(s.slice(s.length - i)));
            }
            return Uint8Array.from(r);
        }
    }, t.base58check = (e)=>n(m(4, (t)=>e(e(t))), t.base58);
    const g = n(o("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), i("")), v = [
        996825010,
        642813549,
        513874426,
        1027748829,
        705979059
    ];
    function b(e) {
        const t = e >> 25;
        let r = (33554431 & e) << 5;
        for(let e = 0; e < v.length; e++)1 == (t >> e & 1) && (r ^= v[e]);
        return r;
    }
    function E(e, t, r = 1) {
        const n = e.length;
        let o = 1;
        for(let t = 0; t < n; t++){
            const r = e.charCodeAt(t);
            if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
            o = b(o) ^ r >> 5;
        }
        o = b(o);
        for(let t = 0; t < n; t++)o = b(o) ^ 31 & e.charCodeAt(t);
        for (let e of t)o = b(o) ^ e;
        for(let e = 0; e < 6; e++)o = b(o);
        return o ^= r, g.encode(l([
            o % 2 ** 30
        ], 30, 5, !1));
    }
    function x(e) {
        const t = "bech32" === e ? 1 : 734539939, r = d(5), n = r.decode, o = r.encode, i = p(n);
        function s(e, r = 90) {
            if ("string" != typeof e) throw new Error("bech32.decode input should be string, not " + typeof e);
            if (e.length < 8 || !1 !== r && e.length > r) throw new TypeError(`Wrong string length: ${e.length} (${e}). Expected (8..${r})`);
            const n = e.toLowerCase();
            if (e !== n && e !== e.toUpperCase()) throw new Error("String must be lowercase or uppercase");
            const o = (e = n).lastIndexOf("1");
            if (0 === o || -1 === o) throw new Error('Letter "1" must be present between prefix and data only');
            const i = e.slice(0, o), s1 = e.slice(o + 1);
            if (s1.length < 6) throw new Error("Data must be at least 6 characters long");
            const a = g.decode(s1).slice(0, -6), c = E(i, a, t);
            if (!s1.endsWith(c)) throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
            return {
                prefix: i,
                words: a
            };
        }
        return {
            encode: function(e, r, n = 90) {
                if ("string" != typeof e) throw new Error("bech32.encode prefix should be string, not " + typeof e);
                if (!Array.isArray(r) || r.length && "number" != typeof r[0]) throw new Error("bech32.encode words should be array of numbers, not " + typeof r);
                const o = e.length + 7 + r.length;
                if (!1 !== n && o > n) throw new TypeError(`Length ${o} exceeds limit ${n}`);
                return `${e = e.toLowerCase()}1${g.encode(r)}${E(e, r, t)}`;
            },
            decode: s,
            decodeToBytes: function(e) {
                const { prefix: t, words: r } = s(e, !1);
                return {
                    prefix: t,
                    words: r,
                    bytes: n(r)
                };
            },
            decodeUnsafe: p(s),
            fromWords: n,
            fromWordsUnsafe: i,
            toWords: o
        };
    }
    t.bech32 = x("bech32"), t.bech32m = x("bech32m"), t.utf8 = {
        encode: (e)=>(new TextDecoder).decode(e),
        decode: (e)=>(new TextEncoder).encode(e)
    }, t.hex = n(d(4), o("0123456789abcdef"), i(""), a((e)=>{
        if ("string" != typeof e || e.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
        return e.toLowerCase();
    }));
    const P = {
        utf8: t.utf8,
        hex: t.hex,
        base16: t.base16,
        base32: t.base32,
        base64: t.base64,
        base64url: t.base64url,
        base58: t.base58,
        base58xmr: t.base58xmr
    }, A = `Invalid encoding type. Available types: ${Object.keys(P).join(", ")}`;
    t.bytesToString = (e, t)=>{
        if ("string" != typeof e || !P.hasOwnProperty(e)) throw new TypeError(A);
        if (!(t instanceof Uint8Array)) throw new TypeError("bytesToString() expects Uint8Array");
        return P[e].encode(t);
    }, t.str = t.bytesToString, t.stringToBytes = (e, t)=>{
        if (!P.hasOwnProperty(e)) throw new TypeError(A);
        if ("string" != typeof t) throw new TypeError("stringToBytes() expects string");
        return P[e].decode(t);
    }, t.bytes = t.stringToBytes;
}, $e6db5ad59f233ce9$var$e($e6db5ad59f233ce9$var$t = {
    exports: {}
}, $e6db5ad59f233ce9$var$t.exports), $e6db5ad59f233ce9$var$t.exports);
const { bech32: $e6db5ad59f233ce9$var$n, hex: $e6db5ad59f233ce9$var$o, utf8: $e6db5ad59f233ce9$var$i } = $e6db5ad59f233ce9$var$r, $e6db5ad59f233ce9$var$s = {
    bech32: "bc",
    pubKeyHash: 0,
    scriptHash: 5,
    validWitnessVersions: [
        0
    ]
}, $e6db5ad59f233ce9$var$a = {
    bech32: "tb",
    pubKeyHash: 111,
    scriptHash: 196,
    validWitnessVersions: [
        0
    ]
}, $e6db5ad59f233ce9$var$c = {
    bech32: "tbs",
    pubKeyHash: 111,
    scriptHash: 196,
    validWitnessVersions: [
        0
    ]
}, $e6db5ad59f233ce9$var$u = {
    bech32: "bcrt",
    pubKeyHash: 111,
    scriptHash: 196,
    validWitnessVersions: [
        0
    ]
}, $e6db5ad59f233ce9$var$h = {
    bech32: "sb",
    pubKeyHash: 63,
    scriptHash: 123,
    validWitnessVersions: [
        0
    ]
}, $e6db5ad59f233ce9$var$l = [
    "option_data_loss_protect",
    "initial_routing_sync",
    "option_upfront_shutdown_script",
    "gossip_queries",
    "var_onion_optin",
    "gossip_queries_ex",
    "option_static_remotekey",
    "payment_secret",
    "basic_mpp",
    "option_support_large_channel"
], $e6db5ad59f233ce9$var$f = {
    m: BigInt(1e3),
    u: BigInt(1e6),
    n: BigInt(1e9),
    p: BigInt(1e12)
}, $e6db5ad59f233ce9$var$d = BigInt("2100000000000000000"), $e6db5ad59f233ce9$var$p = BigInt(1e11), $e6db5ad59f233ce9$var$m = {
    payment_hash: 1,
    payment_secret: 16,
    description: 13,
    payee: 19,
    description_hash: 23,
    expiry: 6,
    min_final_cltv_expiry: 24,
    fallback_address: 9,
    route_hint: 3,
    feature_bits: 5,
    metadata: 27
}, $e6db5ad59f233ce9$var$y = {};
for(let e = 0, t = Object.keys($e6db5ad59f233ce9$var$m); e < t.length; e++){
    const r = t[e], n = $e6db5ad59f233ce9$var$m[t[e]].toString();
    $e6db5ad59f233ce9$var$y[n] = r;
}
const $e6db5ad59f233ce9$var$w = {
    1: (e)=>$e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    16: (e)=>$e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    13: (e)=>$e6db5ad59f233ce9$var$i.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    19: (e)=>$e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    23: (e)=>$e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    27: (e)=>$e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(e)),
    6: $e6db5ad59f233ce9$var$v,
    24: $e6db5ad59f233ce9$var$v,
    3: function(e) {
        const t = [];
        let r, i, s, a, c, u = $e6db5ad59f233ce9$var$n.fromWordsUnsafe(e);
        for(; u.length > 0;)r = $e6db5ad59f233ce9$var$o.encode(u.slice(0, 33)), i = $e6db5ad59f233ce9$var$o.encode(u.slice(33, 41)), s = parseInt($e6db5ad59f233ce9$var$o.encode(u.slice(41, 45)), 16), a = parseInt($e6db5ad59f233ce9$var$o.encode(u.slice(45, 49)), 16), c = parseInt($e6db5ad59f233ce9$var$o.encode(u.slice(49, 51)), 16), u = u.slice(51), t.push({
            pubkey: r,
            short_channel_id: i,
            fee_base_msat: s,
            fee_proportional_millionths: a,
            cltv_expiry_delta: c
        });
        return t;
    },
    5: function(e) {
        const t = e.slice().reverse().map((e)=>[
                !!(1 & e),
                !!(2 & e),
                !!(4 & e),
                !!(8 & e),
                !!(16 & e)
            ]).reduce((e, t)=>e.concat(t), []);
        for(; t.length < 2 * $e6db5ad59f233ce9$var$l.length;)t.push(!1);
        const r = {};
        $e6db5ad59f233ce9$var$l.forEach((e, n)=>{
            let o;
            o = t[2 * n] ? "required" : t[2 * n + 1] ? "supported" : "unsupported", r[e] = o;
        });
        const n = t.slice(2 * $e6db5ad59f233ce9$var$l.length);
        return r.extra_bits = {
            start_bit: 2 * $e6db5ad59f233ce9$var$l.length,
            bits: n,
            has_required: n.reduce((e, t, r)=>r % 2 != 0 ? e || !1 : e || t, !1)
        }, r;
    }
};
function $e6db5ad59f233ce9$var$g(e) {
    return (t)=>({
            tagCode: parseInt(e),
            words: $e6db5ad59f233ce9$var$n.encode("unknown", t, Number.MAX_SAFE_INTEGER)
        });
}
function $e6db5ad59f233ce9$var$v(e) {
    return e.reverse().reduce((e, t, r)=>e + t * Math.pow(32, r), 0);
}
var $e6db5ad59f233ce9$export$99a70112ceb8327b = function(e) {
    return Uint8Array.from(e.match(/.{1,2}/g).map(function(e) {
        return parseInt(e, 16);
    }));
}, $e6db5ad59f233ce9$export$299d8670b6d2c8e = function(e) {
    if (!e) return null;
    try {
        var t = function(e, t) {
            if ("string" != typeof e) throw new Error("Lightning Payment Request must be string");
            if ("ln" !== e.slice(0, 2).toLowerCase()) throw new Error("Not a proper lightning payment request");
            const r = [], i = $e6db5ad59f233ce9$var$n.decode(e, Number.MAX_SAFE_INTEGER);
            e = e.toLowerCase();
            const l = i.prefix;
            let b = i.words, E = e.slice(l.length + 1), x = b.slice(-104);
            b = b.slice(0, -104);
            let P = l.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
            if (P && !P[2] && (P = l.match(/^ln(\S+)$/)), !P) throw new Error("Not a proper lightning payment request");
            r.push({
                name: "lightning_network",
                letters: "ln"
            });
            const A = P[1];
            let k;
            switch(A){
                case $e6db5ad59f233ce9$var$s.bech32:
                    k = $e6db5ad59f233ce9$var$s;
                    break;
                case $e6db5ad59f233ce9$var$a.bech32:
                    k = $e6db5ad59f233ce9$var$a;
                    break;
                case $e6db5ad59f233ce9$var$c.bech32:
                    k = $e6db5ad59f233ce9$var$c;
                    break;
                case $e6db5ad59f233ce9$var$u.bech32:
                    k = $e6db5ad59f233ce9$var$u;
                    break;
                case $e6db5ad59f233ce9$var$h.bech32:
                    k = $e6db5ad59f233ce9$var$h;
            }
            if (!k || k.bech32 !== A) throw new Error("Unknown coin bech32 prefix");
            r.push({
                name: "coin_network",
                letters: A,
                value: k
            });
            const _ = P[2];
            let U;
            _ ? (U = function(e, t) {
                let r, n;
                if (e.slice(-1).match(/^[munp]$/)) r = e.slice(-1), n = e.slice(0, -1);
                else {
                    if (e.slice(-1).match(/^[^munp0-9]$/)) throw new Error("Not a valid multiplier for the amount");
                    n = e;
                }
                if (!n.match(/^\d+$/)) throw new Error("Not a valid human readable amount");
                const o = BigInt(n), i = r ? o * $e6db5ad59f233ce9$var$p / $e6db5ad59f233ce9$var$f[r] : o * $e6db5ad59f233ce9$var$p;
                if ("p" === r && o % BigInt(10) !== BigInt(0) || i > $e6db5ad59f233ce9$var$d) throw new Error("Amount is outside of valid range");
                return i.toString();
            }(_ + P[3]), r.push({
                name: "amount",
                letters: P[2] + P[3],
                value: U
            })) : U = null, r.push({
                name: "separator",
                letters: "1"
            });
            const L = $e6db5ad59f233ce9$var$v(b.slice(0, 7));
            let D, N, I, j;
            for(b = b.slice(7), r.push({
                name: "timestamp",
                letters: E.slice(0, 7),
                value: L
            }), E = E.slice(7); b.length > 0;){
                const e = b[0].toString();
                D = $e6db5ad59f233ce9$var$y[e] || "unknown_tag", N = $e6db5ad59f233ce9$var$w[e] || $e6db5ad59f233ce9$var$g(e), b = b.slice(1), I = $e6db5ad59f233ce9$var$v(b.slice(0, 2)), b = b.slice(2), j = b.slice(0, I), b = b.slice(I), r.push({
                    name: D,
                    tag: E[0],
                    letters: E.slice(0, 3 + I),
                    value: N(j)
                }), E = E.slice(3 + I);
            }
            r.push({
                name: "signature",
                letters: E.slice(0, 104),
                value: $e6db5ad59f233ce9$var$o.encode($e6db5ad59f233ce9$var$n.fromWordsUnsafe(x))
            }), E = E.slice(104), r.push({
                name: "checksum",
                letters: E
            });
            let S = {
                paymentRequest: e,
                sections: r,
                get expiry () {
                    let e = r.find((e)=>"expiry" === e.name);
                    if (e) return R("timestamp") + e.value;
                },
                get route_hints () {
                    return r.filter((e)=>"route_hint" === e.name).map((e)=>e.value);
                }
            };
            for(let e in $e6db5ad59f233ce9$var$m)"route_hint" !== e && Object.defineProperty(S, e, {
                get: ()=>R(e)
            });
            return S;
            function R(e) {
                let t = r.find((t)=>t.name === e);
                return t ? t.value : void 0;
            }
        }(e);
        if (!t || !t.sections) return null;
        var r = t.sections.find(function(e) {
            return "payment_hash" === e.name;
        });
        if ("payment_hash" !== (null == r ? void 0 : r.name) || !r.value) return null;
        var i = r.value, l = 0, b = t.sections.find(function(e) {
            return "amount" === e.name;
        });
        "amount" === (null == b ? void 0 : b.name) && b.value && (l = parseInt(b.value) / 1e3);
        var E = t.sections.find(function(e) {
            return "timestamp" === e.name;
        });
        if ("timestamp" !== (null == E ? void 0 : E.name) || !E.value) return null;
        var x, P = E.value, A = t.sections.find(function(e) {
            return "expiry" === e.name;
        });
        "expiry" === (null == A ? void 0 : A.name) && (x = A.value);
        var k = t.sections.find(function(e) {
            return "description" === e.name;
        });
        return {
            paymentHash: i,
            satoshi: l,
            timestamp: P,
            expiry: x,
            description: "description" === (null == k ? void 0 : k.name) ? null == k ? void 0 : k.value : void 0
        };
    } catch (e) {
        return null;
    }
};
function $e6db5ad59f233ce9$var$x(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
const $e6db5ad59f233ce9$var$P = (e)=>e instanceof Uint8Array, $e6db5ad59f233ce9$var$A = (e)=>new DataView(e.buffer, e.byteOffset, e.byteLength), $e6db5ad59f233ce9$var$k = (e, t)=>e << 32 - t | e >>> t;
if (68 !== new Uint8Array(new Uint32Array([
    287454020
]).buffer)[0]) throw new Error("Non little-endian hardware is not supported");
const $e6db5ad59f233ce9$var$_ = /* @__PURE__ */ Array.from({
    length: 256
}, (e, t)=>t.toString(16).padStart(2, "0"));
function $e6db5ad59f233ce9$var$U(e) {
    if (!$e6db5ad59f233ce9$var$P(e)) throw new Error("Uint8Array expected");
    let t = "";
    for(let r = 0; r < e.length; r++)t += $e6db5ad59f233ce9$var$_[e[r]];
    return t;
}
function $e6db5ad59f233ce9$var$L(e) {
    if ("string" == typeof e && (e = function(e) {
        if ("string" != typeof e) throw new Error("utf8ToBytes expected string, got " + typeof e);
        return new Uint8Array((new TextEncoder).encode(e));
    }(e)), !$e6db5ad59f233ce9$var$P(e)) throw new Error("expected Uint8Array, got " + typeof e);
    return e;
}
class $e6db5ad59f233ce9$var$D {
    clone() {
        return this._cloneInto();
    }
}
function $e6db5ad59f233ce9$var$N(e) {
    const t = (t)=>e().update($e6db5ad59f233ce9$var$L(t)).digest(), r = e();
    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = ()=>e(), t;
}
class $e6db5ad59f233ce9$var$I extends $e6db5ad59f233ce9$var$D {
    constructor(e, t, r, n){
        super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = $e6db5ad59f233ce9$var$A(this.buffer);
    }
    update(e) {
        $e6db5ad59f233ce9$var$x(this);
        const { view: t, buffer: r, blockLen: n } = this, o = (e = $e6db5ad59f233ce9$var$L(e)).length;
        for(let i = 0; i < o;){
            const s = Math.min(n - this.pos, o - i);
            if (s !== n) r.set(e.subarray(i, i + s), this.pos), this.pos += s, i += s, this.pos === n && (this.process(t, 0), this.pos = 0);
            else {
                const t = $e6db5ad59f233ce9$var$A(e);
                for(; n <= o - i; i += n)this.process(t, i);
            }
        }
        return this.length += e.length, this.roundClean(), this;
    }
    digestInto(e) {
        $e6db5ad59f233ce9$var$x(this), function(e, t) {
            !function(e, ...t) {
                if (!(e instanceof Uint8Array)) throw new Error("Expected Uint8Array");
                if (t.length > 0 && !t.includes(e.length)) throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
            }(e);
            const r = t.outputLen;
            if (e.length < r) throw new Error(`digestInto() expects output buffer of length at least ${r}`);
        }(e, this), this.finished = !0;
        const { buffer: t, view: r, blockLen: n, isLE: o } = this;
        let { pos: i } = this;
        t[i++] = 128, this.buffer.subarray(i).fill(0), this.padOffset > n - i && (this.process(r, 0), i = 0);
        for(let e = i; e < n; e++)t[e] = 0;
        !function(e, t, r, n) {
            if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, n);
            const o = BigInt(32), i = BigInt(4294967295), s = Number(r >> o & i), a = Number(r & i), c = n ? 0 : 4;
            e.setUint32(t + (n ? 4 : 0), s, n), e.setUint32(t + c, a, n);
        }(r, n - 8, BigInt(8 * this.length), o), this.process(r, 0);
        const s = $e6db5ad59f233ce9$var$A(e), a = this.outputLen;
        if (a % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const c = a / 4, u = this.get();
        if (c > u.length) throw new Error("_sha2: outputLen bigger than state");
        for(let e = 0; e < c; e++)s.setUint32(4 * e, u[e], o);
    }
    digest() {
        const { buffer: e, outputLen: t } = this;
        this.digestInto(e);
        const r = e.slice(0, t);
        return this.destroy(), r;
    }
    _cloneInto(e) {
        e || (e = new this.constructor), e.set(...this.get());
        const { blockLen: t, buffer: r, length: n, finished: o, destroyed: i, pos: s } = this;
        return e.length = n, e.pos = s, e.finished = o, e.destroyed = i, n % t && e.buffer.set(r), e;
    }
}
const $e6db5ad59f233ce9$var$j = (e, t, r)=>e & t ^ e & r ^ t & r, $e6db5ad59f233ce9$var$S = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
]), $e6db5ad59f233ce9$var$R = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
]), $e6db5ad59f233ce9$var$$ = /* @__PURE__ */ new Uint32Array(64);
class $e6db5ad59f233ce9$var$T extends $e6db5ad59f233ce9$var$I {
    constructor(){
        super(64, 32, 8, !1), this.A = 0 | $e6db5ad59f233ce9$var$R[0], this.B = 0 | $e6db5ad59f233ce9$var$R[1], this.C = 0 | $e6db5ad59f233ce9$var$R[2], this.D = 0 | $e6db5ad59f233ce9$var$R[3], this.E = 0 | $e6db5ad59f233ce9$var$R[4], this.F = 0 | $e6db5ad59f233ce9$var$R[5], this.G = 0 | $e6db5ad59f233ce9$var$R[6], this.H = 0 | $e6db5ad59f233ce9$var$R[7];
    }
    get() {
        const { A: e, B: t, C: r, D: n, E: o, F: i, G: s, H: a } = this;
        return [
            e,
            t,
            r,
            n,
            o,
            i,
            s,
            a
        ];
    }
    set(e, t, r, n, o, i, s, a) {
        this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | n, this.E = 0 | o, this.F = 0 | i, this.G = 0 | s, this.H = 0 | a;
    }
    process(e, t) {
        for(let r = 0; r < 16; r++, t += 4)$e6db5ad59f233ce9$var$$[r] = e.getUint32(t, !1);
        for(let e = 16; e < 64; e++){
            const t = $e6db5ad59f233ce9$var$$[e - 15], r = $e6db5ad59f233ce9$var$$[e - 2], n = $e6db5ad59f233ce9$var$k(t, 7) ^ $e6db5ad59f233ce9$var$k(t, 18) ^ t >>> 3, o = $e6db5ad59f233ce9$var$k(r, 17) ^ $e6db5ad59f233ce9$var$k(r, 19) ^ r >>> 10;
            $e6db5ad59f233ce9$var$$[e] = o + $e6db5ad59f233ce9$var$$[e - 7] + n + $e6db5ad59f233ce9$var$$[e - 16] | 0;
        }
        let { A: r, B: n, C: o, D: i, E: s, F: a, G: c, H: u } = this;
        for(let e = 0; e < 64; e++){
            const t = u + ($e6db5ad59f233ce9$var$k(s, 6) ^ $e6db5ad59f233ce9$var$k(s, 11) ^ $e6db5ad59f233ce9$var$k(s, 25)) + ((h = s) & a ^ ~h & c) + $e6db5ad59f233ce9$var$S[e] + $e6db5ad59f233ce9$var$$[e] | 0, l = ($e6db5ad59f233ce9$var$k(r, 2) ^ $e6db5ad59f233ce9$var$k(r, 13) ^ $e6db5ad59f233ce9$var$k(r, 22)) + $e6db5ad59f233ce9$var$j(r, n, o) | 0;
            u = c, c = a, a = s, s = i + t | 0, i = o, o = n, n = r, r = t + l | 0;
        }
        var h;
        r = r + this.A | 0, n = n + this.B | 0, o = o + this.C | 0, i = i + this.D | 0, s = s + this.E | 0, a = a + this.F | 0, c = c + this.G | 0, u = u + this.H | 0, this.set(r, n, o, i, s, a, c, u);
    }
    roundClean() {
        $e6db5ad59f233ce9$var$$.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
    }
}
const $e6db5ad59f233ce9$var$W = /* @__PURE__ */ $e6db5ad59f233ce9$var$N(()=>new $e6db5ad59f233ce9$var$T);
var $e6db5ad59f233ce9$export$ba5f874f962e090e = /*#__PURE__*/ function() {
    function e(e) {
        var t, r, n, o;
        if (this.paymentRequest = void 0, this.paymentHash = void 0, this.preimage = void 0, this.verify = void 0, this.satoshi = void 0, this.expiry = void 0, this.timestamp = void 0, this.createdDate = void 0, this.expiryDate = void 0, this.description = void 0, this.successAction = void 0, this.paymentRequest = e.pr, !this.paymentRequest) throw new Error("Invalid payment request");
        var i = $e6db5ad59f233ce9$export$299d8670b6d2c8e(this.paymentRequest);
        if (!i) throw new Error("Failed to decode payment request");
        this.paymentHash = i.paymentHash, this.satoshi = i.satoshi, this.timestamp = i.timestamp, this.expiry = i.expiry, this.createdDate = new Date(1e3 * this.timestamp), this.expiryDate = this.expiry ? new Date(1e3 * (this.timestamp + this.expiry)) : void 0, this.description = null != (t = i.description) ? t : null, this.verify = null != (r = e.verify) ? r : null, this.preimage = null != (n = e.preimage) ? n : null, this.successAction = null != (o = e.successAction) ? o : null;
    }
    var t = e.prototype;
    return t.isPaid = function() {
        try {
            var e = this;
            if (e.preimage) return Promise.resolve(e.validatePreimage(e.preimage));
            if (e.verify) return Promise.resolve(e.verifyPayment());
            throw new Error("Could not verify payment");
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.validatePreimage = function(e) {
        if (!e || !this.paymentHash) return !1;
        try {
            var t = $e6db5ad59f233ce9$var$U($e6db5ad59f233ce9$var$W($e6db5ad59f233ce9$export$99a70112ceb8327b(e)));
            return this.paymentHash === t;
        } catch (e) {
            return !1;
        }
    }, t.verifyPayment = function() {
        try {
            var e = this;
            return Promise.resolve(function(t, r) {
                try {
                    var n = function() {
                        if (!e.verify) throw new Error("LNURL verify not available");
                        return Promise.resolve(fetch(e.verify)).then(function(t) {
                            if (!t.ok) throw new Error("Verification request failed: " + t.status + " " + t.statusText);
                            return Promise.resolve(t.json()).then(function(t) {
                                return t.preimage && (e.preimage = t.preimage), t.settled;
                            });
                        });
                    }();
                } catch (e) {
                    return r(e);
                }
                return n && n.then ? n.then(void 0, r) : n;
            }(0, function(e) {
                return console.error("Failed to check LNURL-verify", e), !1;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.hasExpired = function() {
        var e = this.expiryDate;
        return !!e && e.getTime() < Date.now();
    }, e;
}(), $e6db5ad59f233ce9$export$1890c02602d63c = function(e, t) {
    var r = e.satoshi, n = e.comment, o = e.p, i = e.e, s = e.relays;
    void 0 === t && (t = {});
    try {
        var a = t.nostr || globalThis.nostr;
        if (!a) throw new Error("nostr option or window.nostr is not available");
        var c = [
            [
                "relays"
            ].concat(s),
            [
                "amount",
                r.toString()
            ]
        ];
        return o && c.push([
            "p",
            o
        ]), i && c.push([
            "e",
            i
        ]), Promise.resolve(a.getPublicKey()).then(function(e) {
            var t = {
                pubkey: e,
                created_at: Math.floor(Date.now() / 1e3),
                kind: 9734,
                tags: c,
                content: null != n ? n : ""
            };
            return t.id = $e6db5ad59f233ce9$export$11a838ad4e557e0e(t), Promise.resolve(a.signEvent(t));
        });
    } catch (i) {
        return Promise.reject(i);
    }
}, $e6db5ad59f233ce9$export$3e6ee22e431c91ae = function(e) {
    if ("keysend" !== e.tag) throw new Error("Invalid keysend params");
    if ("OK" !== e.status) throw new Error("Keysend status not OK");
    if (!e.pubkey) throw new Error("Pubkey does not exist");
    var t, r;
    return e.customData && e.customData[0] && (t = e.customData[0].customKey, r = e.customData[0].customValue), {
        destination: e.pubkey,
        customKey: t,
        customValue: r
    };
};
function $e6db5ad59f233ce9$export$d08d852dd562b1ce(e) {
    if ("string" != typeof e.content) return !1;
    if ("number" != typeof e.created_at) return !1;
    if (!Array.isArray(e.tags)) return !1;
    for(var t = 0; t < e.tags.length; t++){
        var r = e.tags[t];
        if (!Array.isArray(r)) return !1;
        for(var n = 0; n < r.length; n++)if ("object" == typeof r[n]) return !1;
    }
    return !0;
}
function $e6db5ad59f233ce9$export$d32d86987f616a9e(e) {
    if (!$e6db5ad59f233ce9$export$d08d852dd562b1ce(e)) throw new Error("can't serialize event with wrong or missing properties");
    return JSON.stringify([
        0,
        e.pubkey,
        e.created_at,
        e.kind,
        e.tags,
        e.content
    ]);
}
function $e6db5ad59f233ce9$export$11a838ad4e557e0e(e) {
    return $e6db5ad59f233ce9$var$U($e6db5ad59f233ce9$var$W($e6db5ad59f233ce9$export$d32d86987f616a9e(e)));
}
function $e6db5ad59f233ce9$export$fe45bd6b19e4f4ba(e, t) {
    var r, n, o, i;
    return t && e && (n = (r = null == (o = e.names) ? void 0 : o[t]) ? null == (i = e.relays) ? void 0 : i[r] : void 0), [
        e,
        r,
        n
    ];
}
var $e6db5ad59f233ce9$var$q = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/, $e6db5ad59f233ce9$export$8304a22d431f958 = function(e) {
    return !!e && $e6db5ad59f233ce9$var$q.test(e);
}, $e6db5ad59f233ce9$export$3c93f2a0ff50284a = function(e) {
    var t = e.amount;
    return t > 0 && t >= e.min && t <= e.max;
}, $e6db5ad59f233ce9$export$178fe3191ba1e804 = function(e) {
    try {
        if ("payRequest" !== e.tag) throw new Error("Invalid pay service params");
        var t = (e.callback + "").trim();
        if (!$e6db5ad59f233ce9$export$8304a22d431f958(t)) throw new Error("Callback must be a valid url");
        var r, n, o = Math.ceil(Number(e.minSendable || 0)), i = Math.floor(Number(e.maxSendable));
        if (!o || !i || o > i) throw new Error("Invalid pay service params");
        try {
            r = JSON.parse(e.metadata + ""), n = $e6db5ad59f233ce9$var$U($e6db5ad59f233ce9$var$W(e.metadata + ""));
        } catch (e) {
            r = [], n = $e6db5ad59f233ce9$var$U($e6db5ad59f233ce9$var$W("[]"));
        }
        for(var s = "", a = "", c = "", u = "", h = 0; h < r.length; h++){
            var l = r[h], f = l[0], d = l[1];
            switch(f){
                case "text/plain":
                    c = d;
                    break;
                case "text/identifier":
                    u = d;
                    break;
                case "text/email":
                    s = d;
                    break;
                case "image/png;base64":
                case "image/jpeg;base64":
                    a = "data:" + f + "," + d;
            }
        }
        var p, m = e.payerData;
        try {
            p = new URL(t).hostname;
        } catch (e) {}
        return Promise.resolve({
            callback: t,
            fixed: o === i,
            min: o,
            max: i,
            domain: p,
            metadata: r,
            metadataHash: n,
            identifier: u,
            email: s,
            description: c,
            image: a,
            payerData: m,
            commentAllowed: Number(e.commentAllowed) || 0,
            rawData: e,
            allowsNostr: e.allowsNostr || !1
        });
    } catch (e) {
        return Promise.reject(e);
    }
};
function $e6db5ad59f233ce9$var$J() {
    return $e6db5ad59f233ce9$var$J = Object.assign ? Object.assign.bind() : function(e) {
        for(var t = 1; t < arguments.length; t++){
            var r = arguments[t];
            for(var n in r)Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
    }, $e6db5ad59f233ce9$var$J.apply(this, arguments);
}
var $e6db5ad59f233ce9$export$b35bd30dfac2a74b = function(e, t) {
    try {
        var r = e.boost;
        t || (t = {});
        var n = t.webln || globalThis.webln;
        if (!n) throw new Error("WebLN not available");
        if (!n.keysend) throw new Error("Keysend not available in current WebLN provider");
        var o = e.amount || Math.floor(r.value_msat / 1e3), i = {
            destination: e.destination,
            amount: o,
            customRecords: {
                7629169: JSON.stringify(r)
            }
        };
        return e.customKey && e.customValue && (i.customRecords[e.customKey] = e.customValue), Promise.resolve(n.enable()).then(function() {
            return Promise.resolve(n.keysend(i));
        });
    } catch (e) {
        return Promise.reject(e);
    }
}, $e6db5ad59f233ce9$export$9437aa3703bd4b0c = /^((?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@((?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, $e6db5ad59f233ce9$export$29fc564f5fdb8b5d = "https://api.getalby.com/lnurl", $e6db5ad59f233ce9$export$ebeb97171ba8142c = /*#__PURE__*/ function() {
    function e(e, t) {
        this.address = void 0, this.options = void 0, this.username = void 0, this.domain = void 0, this.pubkey = void 0, this.lnurlpData = void 0, this.keysendData = void 0, this.nostrData = void 0, this.nostrPubkey = void 0, this.nostrRelays = void 0, this.webln = void 0, this.address = e, this.options = {
            proxy: "https://api.getalby.com/lnurl"
        }, this.options = Object.assign(this.options, t), this.parse(), this.webln = this.options.webln;
    }
    var t = e.prototype;
    return t.parse = function() {
        var e = $e6db5ad59f233ce9$export$9437aa3703bd4b0c.exec(this.address.toLowerCase());
        e && (this.username = e[1], this.domain = e[2]);
    }, t.getWebLN = function() {
        return this.webln || globalThis.webln;
    }, t.fetch = function() {
        try {
            var e = this;
            return Promise.resolve(e.options.proxy ? e.fetchWithProxy() : e.fetchWithoutProxy());
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.fetchWithProxy = function() {
        try {
            var e = this;
            return Promise.resolve(fetch(e.options.proxy + "/lightning-address-details?" + new URLSearchParams({
                ln: e.address
            }).toString())).then(function(t) {
                if (!t.ok) throw new Error("Failed to fetch lnurl info: " + t.status + " " + t.statusText);
                return Promise.resolve(t.json()).then(function(t) {
                    return Promise.resolve(e.parseLnUrlPayResponse(t.lnurlp)).then(function() {
                        e.parseKeysendResponse(t.keysend), e.parseNostrResponse(t.nostr);
                    });
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.fetchWithoutProxy = function() {
        try {
            var e = this;
            return e.domain && e.username ? Promise.resolve(Promise.all([
                e.fetchLnurlData(),
                e.fetchKeysendData(),
                e.fetchNostrData()
            ])).then(function() {}) : Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.fetchLnurlData = function() {
        try {
            var e = this;
            return Promise.resolve(fetch(e.lnurlpUrl())).then(function(t) {
                var r = function() {
                    if (t.ok) return Promise.resolve(t.json()).then(function(t) {
                        return Promise.resolve(e.parseLnUrlPayResponse(t)).then(function() {});
                    });
                }();
                if (r && r.then) return r.then(function() {});
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.fetchKeysendData = function() {
        try {
            var e = this;
            return Promise.resolve(fetch(e.keysendUrl())).then(function(t) {
                var r = function() {
                    if (t.ok) return Promise.resolve(t.json()).then(function(t) {
                        e.parseKeysendResponse(t);
                    });
                }();
                if (r && r.then) return r.then(function() {});
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.fetchNostrData = function() {
        try {
            var e = this;
            return Promise.resolve(fetch(e.nostrUrl())).then(function(t) {
                var r = function() {
                    if (t.ok) return Promise.resolve(t.json()).then(function(t) {
                        e.parseNostrResponse(t);
                    });
                }();
                if (r && r.then) return r.then(function() {});
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.lnurlpUrl = function() {
        return "https://" + this.domain + "/.well-known/lnurlp/" + this.username;
    }, t.keysendUrl = function() {
        return "https://" + this.domain + "/.well-known/keysend/" + this.username;
    }, t.nostrUrl = function() {
        return "https://" + this.domain + "/.well-known/nostr.json?name=" + this.username;
    }, t.generateInvoice = function(e) {
        try {
            var t, r = function(e) {
                var r = t && t.pr && t.pr.toString();
                if (!r) throw new Error("Invalid pay service invoice");
                var n = {
                    pr: r
                };
                if (t && t.verify && (n.verify = t.verify.toString()), t && t.successAction && "object" == typeof t.successAction) {
                    var o = t.successAction, i = o.tag, s = o.description, a = o.url;
                    "message" === i ? n.successAction = {
                        tag: i,
                        message: o.message
                    } : "url" === i && (n.successAction = {
                        tag: i,
                        description: s,
                        url: a
                    });
                }
                return new $e6db5ad59f233ce9$export$ba5f874f962e090e(n);
            }, n = this, o = function() {
                if (n.options.proxy) return Promise.resolve(fetch(n.options.proxy + "/generate-invoice?" + new URLSearchParams($e6db5ad59f233ce9$var$J({
                    ln: n.address
                }, e)).toString())).then(function(e) {
                    if (!e.ok) throw new Error("Failed to generate invoice: " + e.status + " " + e.statusText);
                    return Promise.resolve(e.json()).then(function(e) {
                        t = e.invoice;
                    });
                });
                if (!n.lnurlpData) throw new Error("No lnurlpData available. Please call fetch() first.");
                if (!n.lnurlpData.callback || !$e6db5ad59f233ce9$export$8304a22d431f958(n.lnurlpData.callback)) throw new Error("Valid callback does not exist in lnurlpData");
                var r = new URL(n.lnurlpData.callback);
                return r.search = new URLSearchParams(e).toString(), Promise.resolve(fetch(r.toString())).then(function(e) {
                    if (!e.ok) throw new Error("Failed to generate invoice: " + e.status + " " + e.statusText);
                    return Promise.resolve(e.json()).then(function(e) {
                        t = e;
                    });
                });
            }();
            return Promise.resolve(o && o.then ? o.then(r) : r());
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.requestInvoice = function(e) {
        try {
            var t = this;
            if (!t.lnurlpData) throw new Error("No lnurlpData available. Please call fetch() first.");
            var r = 1e3 * e.satoshi, n = t.lnurlpData, o = n.commentAllowed;
            if (!$e6db5ad59f233ce9$export$3c93f2a0ff50284a({
                amount: r,
                min: n.min,
                max: n.max
            })) throw new Error("Invalid amount");
            if (e.comment && o && o > 0 && e.comment.length > o) throw new Error("The comment length must be " + o + " characters or fewer");
            var i = {
                amount: r.toString()
            };
            return e.comment && (i.comment = e.comment), e.payerdata && (i.payerdata = JSON.stringify(e.payerdata)), Promise.resolve(t.generateInvoice(i));
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.boost = function(e, t) {
        void 0 === t && (t = 0);
        try {
            var r = this;
            if (!r.keysendData) throw new Error("No keysendData available. Please call fetch() first.");
            var n = r.keysendData, o = n.destination, i = n.customKey, s = n.customValue, a = r.getWebLN();
            if (!a) throw new Error("WebLN not available");
            return Promise.resolve($e6db5ad59f233ce9$export$b35bd30dfac2a74b({
                destination: o,
                customKey: i,
                customValue: s,
                amount: t,
                boost: e
            }, {
                webln: a
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.zapInvoice = function(e, t) {
        var r = e.satoshi, n = e.comment, o = e.relays, i = e.e;
        void 0 === t && (t = {});
        try {
            var s = this;
            if (!s.lnurlpData) throw new Error("No lnurlpData available. Please call fetch() first.");
            if (!s.nostrPubkey) throw new Error("Nostr Pubkey is missing");
            var a = s.nostrPubkey, c = 1e3 * r, u = s.lnurlpData, h = u.allowsNostr;
            if (!$e6db5ad59f233ce9$export$3c93f2a0ff50284a({
                amount: c,
                min: u.min,
                max: u.max
            })) throw new Error("Invalid amount");
            if (!h) throw new Error("Your provider does not support zaps");
            return Promise.resolve($e6db5ad59f233ce9$export$1890c02602d63c({
                satoshi: c,
                comment: n,
                p: a,
                e: i,
                relays: o
            }, t)).then(function(e) {
                var t = {
                    amount: c.toString(),
                    nostr: JSON.stringify(e)
                };
                return Promise.resolve(s.generateInvoice(t));
            });
        } catch (i) {
            return Promise.reject(i);
        }
    }, t.zap = function(e, t) {
        void 0 === t && (t = {});
        try {
            var r = this.zapInvoice(e, t), n = this.getWebLN();
            if (!n) throw new Error("WebLN not available");
            return Promise.resolve(n.enable()).then(function() {
                var e = n.sendPayment;
                return Promise.resolve(r).then(function(t) {
                    return e.call(n, t.paymentRequest);
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.parseLnUrlPayResponse = function(e) {
        try {
            var t = this, r = function() {
                if (e) return Promise.resolve($e6db5ad59f233ce9$export$178fe3191ba1e804(e)).then(function(e) {
                    t.lnurlpData = e;
                });
            }();
            return Promise.resolve(r && r.then ? r.then(function() {}) : void 0);
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.parseKeysendResponse = function(e) {
        e && (this.keysendData = $e6db5ad59f233ce9$export$3e6ee22e431c91ae(e));
    }, t.parseNostrResponse = function(e) {
        if (e) {
            var t = $e6db5ad59f233ce9$export$fe45bd6b19e4f4ba(e, this.username);
            this.nostrData = t[0], this.nostrPubkey = t[1], this.nostrRelays = t[2];
        }
    }, e;
}(), $e6db5ad59f233ce9$export$d7392285c701ecf5 = /*#__PURE__*/ function() {
    function e(e) {
        this.storage = void 0, this.storage = e || {};
    }
    var t = e.prototype;
    return t.getItem = function(e) {
        return this.storage[e];
    }, t.setItem = function(e, t) {
        this.storage[e] = t;
    }, e;
}(), $e6db5ad59f233ce9$export$14737ae4d60f83b9 = /*#__PURE__*/ function() {
    function e(e) {}
    var t = e.prototype;
    return t.getItem = function(e) {
        return null;
    }, t.setItem = function(e, t) {}, e;
}(), $e6db5ad59f233ce9$export$cc852eaafd7b5a62 = function(e) {
    for(var t, r = e.replace("L402", "").replace("LSAT", "").trim(), n = {}, o = /(\w+)=("([^"]*)"|'([^']*)'|([^,]*))/g; null !== (t = o.exec(r));)n[t[1]] = t[3] || t[4] || t[5];
    return n;
}, $e6db5ad59f233ce9$var$ne = new $e6db5ad59f233ce9$export$d7392285c701ecf5, $e6db5ad59f233ce9$export$f7bad6ce3af02f7c = function(e, t, r) {
    try {
        var n, o = function(r) {
            return n ? r : (t.headers["Accept-Authenticate"] = i, Promise.resolve(fetch(e, t)).then(function(r) {
                var n = r.headers.get("www-authenticate");
                if (!n) return r;
                var o = $e6db5ad59f233ce9$export$cc852eaafd7b5a62(n), c = o.token || o.macaroon, u = o.invoice;
                return Promise.resolve(s.enable()).then(function() {
                    return Promise.resolve(s.sendPayment(u)).then(function(r) {
                        return a.setItem(e, JSON.stringify({
                            token: c,
                            preimage: r.preimage
                        })), t.headers.Authorization = i + " " + c + ":" + r.preimage, Promise.resolve(fetch(e, t));
                    });
                });
            }));
        };
        r || (r = {});
        var i = r.headerKey || "L402", s = r.webln || globalThis.webln;
        if (!s) throw new Error("WebLN is missing");
        var a = r.store || $e6db5ad59f233ce9$var$ne;
        t || (t = {}), t.cache = "no-store", t.mode = "cors", t.headers || (t.headers = {});
        var c = a.getItem(e), u = function() {
            if (c) {
                var r = JSON.parse(c);
                return t.headers.Authorization = i + " " + r.token + ":" + r.preimage, Promise.resolve(fetch(e, t)).then(function(e) {
                    return n = 1, e;
                });
            }
        }();
        return Promise.resolve(u && u.then ? u.then(o) : o(u));
    } catch (e) {
        return Promise.reject(e);
    }
}, $e6db5ad59f233ce9$export$c1a7a44af0d8825b = {
    __proto__: null,
    fetchWithL402: $e6db5ad59f233ce9$export$f7bad6ce3af02f7c,
    MemoryStorage: $e6db5ad59f233ce9$export$d7392285c701ecf5,
    NoStorage: $e6db5ad59f233ce9$export$14737ae4d60f83b9,
    parseL402: $e6db5ad59f233ce9$export$cc852eaafd7b5a62
}, $e6db5ad59f233ce9$export$dfa27062c7281cab = function(e) {
    try {
        var t = "https://getalby.com/api/rates/" + e.toLowerCase() + ".json";
        return Promise.resolve(fetch(t)).then(function(e) {
            if (!e.ok) throw new Error("Failed to fetch rate: " + e.status + " " + e.statusText);
            return Promise.resolve(e.json()).then(function(e) {
                return e.rate_float / 1e8;
            });
        });
    } catch (e) {
        return Promise.reject(e);
    }
}, $e6db5ad59f233ce9$export$cbdbadc5090a1f57 = function(e) {
    var t = e.satoshi;
    return Promise.resolve($e6db5ad59f233ce9$export$dfa27062c7281cab(e.currency)).then(function(e) {
        return Number(t) * e;
    });
}, $e6db5ad59f233ce9$export$2aeac1888f394001 = function(e) {
    var t = e.amount;
    return Promise.resolve($e6db5ad59f233ce9$export$dfa27062c7281cab(e.currency)).then(function(e) {
        return Math.floor(Number(t) / e);
    });
}, $e6db5ad59f233ce9$export$60fb9846ff371075 = function(e) {
    var t = e.currency, r = e.locale;
    return r || (r = "en"), Promise.resolve($e6db5ad59f233ce9$export$cbdbadc5090a1f57({
        satoshi: e.satoshi,
        currency: t
    })).then(function(e) {
        return e.toLocaleString(r, {
            style: "currency",
            currency: t
        });
    });
}, $e6db5ad59f233ce9$export$c32e8ef196152e59 = {
    __proto__: null,
    getFiatBtcRate: $e6db5ad59f233ce9$export$dfa27062c7281cab,
    getFiatValue: $e6db5ad59f233ce9$export$cbdbadc5090a1f57,
    getSatoshiValue: $e6db5ad59f233ce9$export$2aeac1888f394001,
    getFormattedFiatValue: $e6db5ad59f233ce9$export$60fb9846ff371075
};

});


parcelRequire("5bZMq");

var $5bZMq = parcelRequire("5bZMq");
class $1954c834f2083c9f$export$d9a919bae0329c9a {
    constructor(){
        this.wallets = {
            1: {
                isConnected: false,
                nwcClient: null,
                connectionData: null,
                transactionsSupported: null
            },
            2: {
                isConnected: false,
                nwcClient: null,
                connectionData: null,
                transactionsSupported: null
            }
        };
    }
    // Local Storage Functions
    saveNWCString(walletId, nwcUrl) {
        localStorage.setItem(`nwc-wallet-${walletId}`, nwcUrl);
        this.log(`Wallet ${walletId}: NWC string saved`);
    }
    loadNWCString(walletId) {
        return localStorage.getItem(`nwc-wallet-${walletId}`) || '';
    }
    clearNWCString(walletId) {
        localStorage.removeItem(`nwc-wallet-${walletId}`);
        this.log(`Wallet ${walletId}: Saved NWC string deleted`);
    }
    log(message) {
        const logElement = document.getElementById('debug-log');
        const timestamp = new Date().toLocaleTimeString();
        logElement.textContent += `[${timestamp}] ${message}\n`;
        logElement.scrollTop = logElement.scrollHeight;
    }
    updateConnectionStatus(walletId, status, message) {
        const statusElement = document.getElementById(`connection-status-${walletId}`);
        const badgeClass = status === 'connected' ? 'bg-success' : status === 'connecting' ? 'bg-warning' : 'bg-secondary';
        statusElement.className = `badge ${badgeClass} status-badge`;
        statusElement.textContent = message;
    }
    toggleConnectionVisibility(walletId) {
        const textarea = document.getElementById(`nwc-url-${walletId}`);
        const toggleBtn = document.getElementById(`toggle-visibility-${walletId}`);
        const isHidden = textarea.style.webkitTextSecurity === 'disc';
        if (isHidden) {
            // Show text
            textarea.style.webkitTextSecurity = 'none';
            toggleBtn.textContent = "\uD83D\uDE48";
            toggleBtn.title = 'Connection String verstecken';
        } else {
            // Hide text
            textarea.style.webkitTextSecurity = 'disc';
            toggleBtn.textContent = "\uD83D\uDC41\uFE0F";
            toggleBtn.title = 'Connection String anzeigen';
        }
    }
    async connectWallet(walletId) {
        const nwcUrl = document.getElementById(`nwc-url-${walletId}`).value;
        if (!nwcUrl) {
            alert('Please enter a valid NWC connection string');
            return;
        }
        if (!nwcUrl.startsWith('nostr+walletconnect://')) {
            alert('Invalid NWC connection string. Must start with "nostr+walletconnect://"');
            return;
        }
        this.log(`Wallet ${walletId}: Attempting to connect real wallet...`);
        this.updateConnectionStatus(walletId, 'connecting', 'Connecting...');
        try {
            // Create new NWC client with credentials
            this.wallets[walletId].nwcClient = new (0, $5bZMq.nwc).NWCClient({
                nostrWalletConnectUrl: nwcUrl
            });
            // Test connection by getting wallet info
            const info = await this.wallets[walletId].nwcClient.getInfo();
            this.wallets[walletId].isConnected = true;
            this.wallets[walletId].connectionData = {
                url: nwcUrl
            };
            this.updateConnectionStatus(walletId, 'connected', 'Connected');
            // Disable connection form when connected
            document.getElementById(`nwc-url-${walletId}`).disabled = true;
            document.getElementById(`toggle-visibility-${walletId}`).disabled = true;
            document.getElementById(`connect-btn-${walletId}`).disabled = true;
            document.getElementById(`disconnect-btn-${walletId}`).disabled = false;
            // Auto-save connection string
            this.saveNWCString(walletId, nwcUrl);
            this.log(`Wallet ${walletId}: Successfully connected!`);
            this.log(`Wallet ${walletId}: Alias: ${info.alias || 'N/A'}`);
            this.log(`Wallet ${walletId}: Pubkey: ${info.pubkey ? info.pubkey.substring(0, 20) + '...' : 'N/A'}`);
            this.log(`Wallet ${walletId}: Methods: ${info.methods ? info.methods.join(', ') : 'N/A'}`);
            // Display initial wallet info
            document.getElementById(`wallet-info-${walletId}`).textContent = JSON.stringify(info, null, 2);
            // Trigger stabilization UI update
            window.dispatchEvent(new CustomEvent('walletConnectionChanged'));
        } catch (error) {
            this.updateConnectionStatus(walletId, 'disconnected', 'Connection failed');
            this.log(`Wallet ${walletId}: Error connecting: ${error.message}`);
            console.error(`Wallet ${walletId} NWC Connection Error:`, error);
        }
    }
    disconnectWallet(walletId) {
        this.log(`Wallet ${walletId}: Disconnecting...`);
        this.wallets[walletId].isConnected = false;
        this.wallets[walletId].nwcClient = null;
        this.wallets[walletId].connectionData = null;
        this.wallets[walletId].transactionsSupported = null;
        this.updateConnectionStatus(walletId, 'disconnected', 'Not connected');
        // Re-enable connection form when disconnected
        document.getElementById(`nwc-url-${walletId}`).disabled = false;
        document.getElementById(`toggle-visibility-${walletId}`).disabled = false;
        document.getElementById(`connect-btn-${walletId}`).disabled = false;
        document.getElementById(`disconnect-btn-${walletId}`).disabled = true;
        document.getElementById(`wallet-info-${walletId}`).textContent = '';
        document.getElementById(`payment-result-${walletId}`).textContent = '';
        this.log(`Wallet ${walletId}: Successfully disconnected`);
        // Trigger stabilization UI update
        window.dispatchEvent(new CustomEvent('walletConnectionChanged'));
    }
    async getWalletInfo(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        try {
            this.log(`Wallet ${walletId}: get_info request sent...`);
            const info = await this.wallets[walletId].nwcClient.getInfo();
            document.getElementById(`wallet-info-${walletId}`).textContent = JSON.stringify(info, null, 2);
            this.log(`Wallet ${walletId}: get_info response received`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error in get_info: ${error.message}`);
            document.getElementById(`wallet-info-${walletId}`).textContent = `Error: ${error.message}`;
        }
    }
    async getBalance(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        try {
            this.log(`Wallet ${walletId}: get_balance request sent...`);
            const balance = await this.wallets[walletId].nwcClient.getBalance();
            // Convert balance display to show correct sats
            const displayBalance = {
                ...balance,
                balance_sats: Math.round(balance.balance / 1000),
                balance_millisats: balance.balance
            };
            document.getElementById(`wallet-info-${walletId}`).textContent = JSON.stringify(displayBalance, null, 2);
            this.log(`Wallet ${walletId}: Balance: ${Math.round(balance.balance / 1000)} sats (${balance.balance} millisats)`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error in get_balance: ${error.message}`);
            document.getElementById(`wallet-info-${walletId}`).textContent = `Error: ${error.message}`;
        }
    }
    async createInvoice(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        const amount = prompt('Enter amount in Satoshis:', '1000');
        if (!amount) return;
        const description = prompt('Description (optional):', `NWC Demo Invoice - Wallet ${walletId}`);
        try {
            this.log(`Wallet ${walletId}: make_invoice request for ${amount} sats...`);
            const invoice = await this.wallets[walletId].nwcClient.makeInvoice({
                amount: parseInt(amount) * 1000,
                description: description || `NWC Demo Invoice - Wallet ${walletId}`
            });
            document.getElementById(`payment-result-${walletId}`).textContent = JSON.stringify(invoice, null, 2);
            this.log(`Wallet ${walletId}: Invoice created successfully`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error creating invoice: ${error.message}`);
            document.getElementById(`payment-result-${walletId}`).textContent = `Error: ${error.message}`;
        }
    }
    async payInvoice(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        const invoice = prompt('Enter Lightning Invoice:', 'lnbc...');
        if (!invoice) return;
        try {
            this.log(`Wallet ${walletId}: pay_invoice request sent...`);
            const result = await this.wallets[walletId].nwcClient.payInvoice({
                invoice: invoice
            });
            document.getElementById(`payment-result-${walletId}`).textContent = JSON.stringify(result, null, 2);
            this.log(`Wallet ${walletId}: Payment sent successfully`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error paying invoice: ${error.message}`);
            document.getElementById(`payment-result-${walletId}`).textContent = `Error: ${error.message}`;
        }
    }
    async listTransactions(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        try {
            this.log(`Wallet ${walletId}: list_transactions request sent...`);
            const transactions = await this.wallets[walletId].nwcClient.listTransactions({
                from: 0,
                until: Math.floor(Date.now() / 1000),
                limit: 50,
                offset: 0,
                unpaid: false,
                type: undefined
            });
            document.getElementById(`payment-result-${walletId}`).textContent = JSON.stringify(transactions, null, 2);
            this.log(`Wallet ${walletId}: ${transactions.transactions ? transactions.transactions.length : 0} transactions retrieved`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error retrieving transactions: ${error.message}`);
            console.error(`Wallet ${walletId} listTransactions error:`, error);
            // Fallback: Try without parameters
            try {
                this.log(`Wallet ${walletId}: Trying listTransactions without parameters...`);
                const transactions = await this.wallets[walletId].nwcClient.listTransactions({});
                document.getElementById(`payment-result-${walletId}`).textContent = JSON.stringify(transactions, null, 2);
                this.log(`Wallet ${walletId}: Transactions retrieved with fallback method`);
            } catch (fallbackError) {
                this.log(`Wallet ${walletId}: Fallback also failed: ${fallbackError.message}`);
                document.getElementById(`payment-result-${walletId}`).textContent = `Error: ${error.message}\nFallback Error: ${fallbackError.message}`;
            }
        }
    }
    async payKeysend(walletId) {
        if (!this.wallets[walletId].isConnected || !this.wallets[walletId].nwcClient) {
            alert(`Please connect Wallet ${walletId} first`);
            return;
        }
        const pubkey = prompt('Recipient Pubkey:', '02...');
        const amount = prompt('Amount in Satoshis:', '1000');
        if (!pubkey || !amount) return;
        try {
            this.log(`Wallet ${walletId}: pay_keysend request for ${amount} sats to ${pubkey.substring(0, 10)}...`);
            const result = await this.wallets[walletId].nwcClient.payKeysend({
                pubkey: pubkey,
                amount: parseInt(amount) * 1000 // Convert to millisats
            });
            document.getElementById(`payment-result-${walletId}`).textContent = JSON.stringify(result, null, 2);
            this.log(`Wallet ${walletId}: Keysend payment sent successfully`);
        } catch (error) {
            this.log(`Wallet ${walletId}: Error sending keysend: ${error.message}`);
            document.getElementById(`payment-result-${walletId}`).textContent = `Error: ${error.message}`;
        }
    }
    saveConnectionString(walletId) {
        const nwcUrl = document.getElementById(`nwc-url-${walletId}`).value;
        if (!nwcUrl) {
            alert('No connection string to save');
            return;
        }
        this.saveNWCString(walletId, nwcUrl);
    }
    clearConnectionString(walletId) {
        this.clearNWCString(walletId);
        document.getElementById(`nwc-url-${walletId}`).value = '';
    }
    loadSavedConnectionStrings() {
        // Load saved connection strings for both wallets
        for(let walletId = 1; walletId <= 2; walletId++){
            const savedUrl = this.loadNWCString(walletId);
            if (savedUrl) {
                const textarea = document.getElementById(`nwc-url-${walletId}`);
                textarea.value = savedUrl;
                // Ensure the text is properly masked
                textarea.style.webkitTextSecurity = 'disc';
                this.log(`Wallet ${walletId}: Saved NWC string loaded`);
            }
        }
    }
    clearLog() {
        document.getElementById('debug-log').textContent = 'Debug messages will be displayed here...\n';
    }
}


// Bitcoin Price Management Module
class $46509b166df25f4f$export$1a7dcbc42b6f58b1 {
    constructor(){
        this.priceUpdateInterval = null;
        this.priceChart = null;
        this.PRICE_STORAGE_KEY = 'nwc-price-history';
        this.MAX_PRICE_HISTORY = 10000; // Keep last 10,000 price points
        this.PRICE_CHANGE_THRESHOLD = 0.5; // Minimum 0.5% price change to store point
    }
    // Price Storage Functions
    savePriceHistory(priceData) {
        try {
            const history = this.getPriceHistory();
            const timestamp = Date.now();
            // Check if we should save this point
            if (history.length > 0) {
                const lastPoint = history[history.length - 1];
                const timeDiff = timestamp - lastPoint.timestamp;
                // Minimum interval: 1 hour (to match historical data pattern)
                const minInterval = 3600000; // 1 hour in milliseconds
                // Check for significant price change
                const shouldSave = Object.keys(priceData).some((currency)=>{
                    const oldPrice = lastPoint.prices[currency];
                    const newPrice = priceData[currency];
                    const changePercent = Math.abs((newPrice - oldPrice) / oldPrice * 100);
                    return changePercent >= this.PRICE_CHANGE_THRESHOLD;
                });
                // Only save if significant change or enough time has passed
                const hoursPassed = timeDiff / 3600000;
                if (hoursPassed < 1) {
                    // Too soon, just update timestamp of last point
                    lastPoint.timestamp = timestamp;
                    localStorage.setItem(this.PRICE_STORAGE_KEY, JSON.stringify(history));
                    return;
                } else if (hoursPassed < 2 && !shouldSave) {
                    // Between 1-2 hours but no significant change, skip
                    lastPoint.timestamp = timestamp;
                    localStorage.setItem(this.PRICE_STORAGE_KEY, JSON.stringify(history));
                    return;
                }
            }
            // Add new price point
            history.push({
                timestamp: timestamp,
                prices: {
                    ...priceData
                }
            });
            // Keep only last MAX_PRICE_HISTORY points
            if (history.length > this.MAX_PRICE_HISTORY) history.splice(0, history.length - this.MAX_PRICE_HISTORY);
            localStorage.setItem(this.PRICE_STORAGE_KEY, JSON.stringify(history));
            console.log(`\u{1F4BE} Neuer Preispunkt gespeichert (${history.length} total)`);
        } catch (error) {
            console.error('Error saving price history:', error);
        }
    }
    getPriceHistory() {
        try {
            const stored = localStorage.getItem(this.PRICE_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading price history:', error);
            return [];
        }
    }
    getFilteredPriceHistory(timeRange) {
        const history = this.getPriceHistory();
        if (history.length === 0) return [];
        const now = Date.now();
        let timeWindow;
        switch(timeRange){
            case '12h':
                timeWindow = 43200000; // 12 hours
                break;
            case '24h':
                timeWindow = 86400000; // 24 hours
                break;
            case '2d':
                timeWindow = 172800000; // 2 days
                break;
            case '4d':
                timeWindow = 345600000; // 4 days
                break;
            case '7d':
                timeWindow = 604800000; // 7 days
                break;
            default:
                timeWindow = 43200000; // Default to 12 hours
        }
        const cutoffTime = now - timeWindow;
        return history.filter((point)=>point.timestamp >= cutoffTime);
    }
    clearPriceHistory() {
        localStorage.removeItem(this.PRICE_STORAGE_KEY);
        this.log('Price history cleared');
    }
    async clearAndReloadPriceData() {
        try {
            this.log("\uD83D\uDDD1\uFE0F Clearing all price data...");
            // Clear existing price history
            localStorage.removeItem(this.PRICE_STORAGE_KEY);
            // Clear chart
            if (this.priceChart) {
                this.priceChart.data.labels = [];
                this.priceChart.data.datasets.forEach((dataset)=>{
                    dataset.data = [];
                });
                this.priceChart.update();
            }
            this.log("\u2705 Price data cleared");
            // Reload fresh historical data
            await this.fetchHistoricalPrices();
            this.log("\u2705 Fresh price data loaded");
        } catch (error) {
            this.log(`\u{274C} Error reloading price data: ${error.message}`);
            console.error('Error clearing and reloading price data:', error);
        }
    }
    log(message) {
        const logElement = document.getElementById('debug-log');
        if (logElement) {
            const timestamp = new Date().toLocaleTimeString();
            logElement.textContent += `[${timestamp}] ${message}\n`;
            logElement.scrollTop = logElement.scrollHeight;
        }
    }
    // Historical Price Functions
    async fetchHistoricalPrices() {
        try {
            this.log("\uD83D\uDCC8 Loading real historical prices from mempool.space...");
            const response = await fetch('https://mempool.space/api/v1/historical-price');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.log(`\u{1F4C8} ${data.prices.length} historical data points received from API`);
            // Convert mempool.space data to our format
            const convertedHistory = data.prices.map((item)=>({
                    timestamp: item.time * 1000,
                    prices: {
                        USD: item.USD,
                        EUR: item.EUR,
                        GBP: item.GBP,
                        CHF: item.CHF,
                        CAD: item.CAD,
                        JPY: item.JPY,
                        AUD: item.AUD // Also include AUD if we want to expand later
                    }
                }));
            // Sort by timestamp (oldest first) and limit to our storage limit
            const sortedHistory = convertedHistory.sort((a, b)=>a.timestamp - b.timestamp).slice(-this.MAX_PRICE_HISTORY);
            // Save to localStorage
            localStorage.setItem(this.PRICE_STORAGE_KEY, JSON.stringify(sortedHistory));
            this.log(`\u{1F4C8} ${sortedHistory.length} real historical price points saved`);
            // Update chart if it exists
            if (this.priceChart) this.updatePriceChart();
        } catch (error) {
            this.log(`\u{1F4C8} Error loading historical prices: ${error.message}`);
            console.error('Historical price fetch error:', error);
            // Fallback: Log that we're using existing data
            const existingHistory = this.getPriceHistory();
            if (existingHistory.length > 0) this.log(`\u{1F4C8} Using ${existingHistory.length} existing price points`);
            else this.log("\uD83D\uDCC8 No historical data available");
        }
    }
    // Bitcoin Price Functions
    async fetchBitcoinPrice() {
        try {
            this.log('Fetching Bitcoin price...');
            const response = await fetch('https://mempool.space/api/v1/prices');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const priceData = await response.json();
            // Update price displays
            this.updatePriceDisplay(priceData);
            // Update live price in chart
            this.updateLivePriceInChart(priceData);
            this.log('Bitcoin price updated successfully');
        } catch (error) {
            this.log(`Error fetching Bitcoin price: ${error.message}`);
            console.error('Bitcoin price fetch error:', error);
            // Update displays with error
            const currencies = [
                'usd',
                'eur',
                'gbp',
                'chf',
                'cad',
                'jpy'
            ];
            currencies.forEach((currency)=>{
                const priceEl = document.getElementById(`price-${currency}`);
                const satsEl = document.getElementById(`sats-${currency}`);
                if (priceEl) priceEl.textContent = 'Error';
                if (satsEl) satsEl.textContent = 'Error';
            });
            const updatedEl = document.getElementById('price-updated');
            if (updatedEl) updatedEl.textContent = 'Last Update: Error';
        }
    }
    updateLivePriceInChart(priceData) {
        if (!this.priceChart) return;
        const now = Date.now();
        const selectedRange = document.querySelector('input[name="timeRange"]:checked')?.value || '12h';
        // Get current history
        const history = this.getPriceHistory();
        // Create current price point
        const currentPricePoint = {
            timestamp: now,
            prices: {
                USD: priceData.USD,
                EUR: priceData.EUR,
                GBP: priceData.GBP,
                CHF: priceData.CHF,
                CAD: priceData.CAD,
                JPY: priceData.JPY
            }
        };
        // Create temporary history with current price
        const liveHistory = [
            ...history,
            currentPricePoint
        ];
        // Filter for selected time range
        const filteredHistory = this.filterHistoryByRange(liveHistory, selectedRange);
        if (filteredHistory.length === 0) return;
        // Update chart with live data
        const labels = filteredHistory.map((item)=>item.timestamp);
        const currencies = [
            'USD',
            'EUR',
            'GBP',
            'CHF',
            'CAD',
            'JPY'
        ];
        this.priceChart.data.labels = labels;
        currencies.forEach((currency, index)=>{
            const dataPoints = filteredHistory.map((item)=>({
                    x: item.timestamp,
                    y: item.prices[currency]
                }));
            this.priceChart.data.datasets[index].data = dataPoints;
        });
        // Update chart with no animation for smooth live updates
        this.priceChart.update('none');
        // Save to persistent history only according to our rules
        this.savePriceHistory(priceData);
    }
    filterHistoryByRange(history, timeRange) {
        if (history.length === 0) return [];
        const now = Date.now();
        let timeWindow;
        switch(timeRange){
            case '12h':
                timeWindow = 43200000;
                break;
            case '24h':
                timeWindow = 86400000;
                break;
            case '2d':
                timeWindow = 172800000;
                break;
            case '4d':
                timeWindow = 345600000;
                break;
            case '7d':
                timeWindow = 604800000;
                break;
            default:
                timeWindow = 43200000;
        }
        const cutoffTime = now - timeWindow;
        return history.filter((point)=>point.timestamp >= cutoffTime);
    }
    updatePriceDisplay(priceData) {
        // Format and display prices
        const currencies = {
            usd: {
                symbol: '$',
                value: priceData.USD,
                unit: '$1'
            },
            eur: {
                symbol: "\u20AC",
                value: priceData.EUR,
                unit: "\u20AC1"
            },
            gbp: {
                symbol: "\xa3",
                value: priceData.GBP,
                unit: "\xa31"
            },
            chf: {
                symbol: "\u20A3",
                value: priceData.CHF,
                unit: "\u20A31"
            },
            cad: {
                symbol: 'C$',
                value: priceData.CAD,
                unit: 'C$1'
            },
            jpy: {
                symbol: "\xa5",
                value: priceData.JPY,
                unit: "\xa51"
            }
        };
        Object.entries(currencies).forEach(([currency, data])=>{
            const priceElement = document.getElementById(`price-${currency}`);
            const satsElement = document.getElementById(`sats-${currency}`);
            if (priceElement && satsElement && data.value) {
                // Format Bitcoin price
                const formattedValue = currency === 'jpy' ? Math.round(data.value).toLocaleString() : data.value.toLocaleString('de-DE', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                priceElement.textContent = `${data.symbol} ${formattedValue}`;
                // Calculate satoshis for 1 unit of currency
                const satoshisPerUnit = Math.round(100000000 / data.value);
                const formattedSats = satoshisPerUnit.toLocaleString('de-DE');
                satsElement.textContent = `${formattedSats} sats = ${data.unit}`;
            }
        });
        // Update timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US');
        const updatedEl = document.getElementById('price-updated');
        if (updatedEl) updatedEl.textContent = `Last Update: ${timeString}`;
    }
    startPriceUpdates() {
        // Clear existing interval
        if (this.priceUpdateInterval) clearInterval(this.priceUpdateInterval);
        // Fetch price immediately
        this.fetchBitcoinPrice();
        // Set up auto-refresh every 30 seconds
        this.priceUpdateInterval = setInterval(()=>this.fetchBitcoinPrice(), 30000);
        this.log('Bitcoin price auto-update started (every 30 seconds)');
    }
    stopPriceUpdates() {
        if (this.priceUpdateInterval) {
            clearInterval(this.priceUpdateInterval);
            this.priceUpdateInterval = null;
            this.log('Bitcoin price auto-update stopped');
        }
    }
    // Chart Functions
    initializePriceChart() {
        const ctx = document.getElementById('priceChart')?.getContext('2d');
        if (!ctx) return;
        this.priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'USD ($)',
                        data: [],
                        borderColor: '#0066cc',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: "EUR (\u20AC)",
                        data: [],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: "GBP (\xa3)",
                        data: [],
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'CHF',
                        data: [],
                        borderColor: '#ffc107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'CAD',
                        data: [],
                        borderColor: '#6f42c1',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: "JPY (\xa5)",
                        data: [],
                        borderColor: '#fd7e14',
                        backgroundColor: 'rgba(253, 126, 20, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        onClick: function(e, legendItem, legend) {
                            const index = legendItem.datasetIndex;
                            const chart = legend.chart;
                            const isVisible = chart.isDatasetVisible(index);
                            chart.setDatasetVisibility(index, !isVisible);
                            chart.update('none');
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(context) {
                                return 'Bitcoin Preis';
                            },
                            label: function(context) {
                                const currency = context.dataset.label;
                                const value = context.parsed.y;
                                return `${currency}: ${value.toLocaleString('de-DE')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: function(context) {
                            const data = context.chart.data.labels;
                            return data.length > 0 ? Math.min(...data) : 0;
                        },
                        max: function(context) {
                            const data = context.chart.data.labels;
                            return data.length > 0 ? Math.max(...data) : 0;
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                const date = new Date(value);
                                return date.toLocaleTimeString('de-DE', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                            },
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'USD/EUR/GBP/CHF/CAD'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: "JPY (\xa5)"
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
        // Update chart initially
        this.updatePriceChart();
    }
    updatePriceChart() {
        if (!this.priceChart) return;
        // Get selected time range
        const selectedRange = document.querySelector('input[name="timeRange"]:checked')?.value || '12h';
        const history = this.getFilteredPriceHistory(selectedRange);
        if (history.length === 0) {
            this.priceChart.data.labels = [];
            this.priceChart.data.datasets.forEach((dataset)=>{
                dataset.data = [];
            });
            this.priceChart.update();
            return;
        }
        // Prepare data for chart
        const labels = history.map((item)=>item.timestamp);
        const currencies = [
            'USD',
            'EUR',
            'GBP',
            'CHF',
            'CAD',
            'JPY'
        ];
        // Update chart data
        this.priceChart.data.labels = labels;
        currencies.forEach((currency, index)=>{
            const dataPoints = history.map((item)=>({
                    x: item.timestamp,
                    y: item.prices[currency]
                }));
            this.priceChart.data.datasets[index].data = dataPoints;
        });
        // Update chart
        this.priceChart.update('none'); // No animation for smoother updates
    }
}


// Balance Stabilization Manager Module
class $8fc335aec3c70df5$export$3d022597fb56d1f4 {
    constructor(walletManager){
        this.walletManager = walletManager;
        this.stabilizationData = {
            active: false,
            currency: null,
            initialBalance: 0,
            targetValue: 0,
            initialPrice: 0,
            checkInterval: null,
            threshold: 1,
            lastRebalanceTime: 0,
            rebalanceMinInterval: 5000,
            errorCount: 0,
            maxErrors: 5
        };
    }
    log(message) {
        this.walletManager.log(message);
    }
    async startStabilization() {
        const currency = document.getElementById('stabilization-currency').value;
        if (!currency) {
            alert('Please select a currency');
            return;
        }
        if (!this.walletManager.wallets[2].isConnected || !this.walletManager.wallets[2].nwcClient) {
            alert('Stability Receiver must be connected for stabilization');
            return;
        }
        if (!this.walletManager.wallets[1].isConnected || !this.walletManager.wallets[1].nwcClient) {
            alert('Stability Provider must be connected for rebalancing');
            return;
        }
        try {
            this.log(`\u{1F4B1} Starting stabilization for ${currency.toUpperCase()}...`);
            // Get current balance of Stability Receiver
            const balanceResponse = await this.walletManager.wallets[2].nwcClient.getBalance();
            // Convert from millisats to sats
            const currentBalance = Math.round(balanceResponse.balance / 1000);
            // Get current Bitcoin prices
            const response = await fetch('https://mempool.space/api/v1/prices');
            const priceData = await response.json();
            const currentPrice = priceData[currency.toUpperCase()];
            if (!currentPrice) throw new Error(`Price for ${currency.toUpperCase()} not available`);
            // Calculate target value in selected currency
            const targetValue = currentBalance / 100000000 * currentPrice;
            // Store stabilization data
            this.stabilizationData = {
                active: true,
                currency: currency,
                initialBalance: currentBalance,
                targetValue: targetValue,
                initialPrice: currentPrice,
                checkInterval: null,
                threshold: 1,
                lastRebalanceTime: 0,
                rebalanceMinInterval: 5000,
                errorCount: 0,
                maxErrors: 5
            };
            // Update UI
            this.updateStabilizationUI();
            // Start monitoring with longer interval to reduce timeout issues
            this.stabilizationData.checkInterval = setInterval(()=>this.checkRebalancing(), 15000); // every 15 seconds
            this.log(`\u{1F4B1} Stabilization active: ${currentBalance} sats = ${targetValue.toFixed(2)} ${currency.toUpperCase()}`);
            this.log(`\u{1F4B1} Monitoring started (every 15 seconds with timeout protection)`);
        } catch (error) {
            this.log(`\u{1F4B1} Error starting stabilization: ${error.message}`);
            console.error('Stabilization start error:', error);
        }
    }
    async stopStabilization() {
        if (!this.stabilizationData.active) return;
        this.log("\uD83D\uDCB1 Stopping stabilization...");
        // Clear monitoring interval
        if (this.stabilizationData.checkInterval) clearInterval(this.stabilizationData.checkInterval);
        // Reset stabilization data
        this.stabilizationData = {
            active: false,
            currency: null,
            initialBalance: 0,
            targetValue: 0,
            initialPrice: 0,
            checkInterval: null,
            threshold: 1,
            lastRebalanceTime: 0,
            rebalanceMinInterval: 5000,
            errorCount: 0,
            maxErrors: 5
        };
        // Update UI
        this.updateStabilizationUI();
        this.log("\uD83D\uDCB1 Stabilization stopped");
    }
    async checkRebalancing() {
        if (!this.stabilizationData.active) return;
        try {
            // Get current prices
            const response = await fetch('https://mempool.space/api/v1/prices');
            const priceData = await response.json();
            const currentPrice = priceData[this.stabilizationData.currency.toUpperCase()];
            // Get current balance of Stability Receiver
            const balanceResponse = await this.walletManager.wallets[2].nwcClient.getBalance();
            // Convert from millisats to sats
            const currentBalance = Math.round(balanceResponse.balance / 1000);
            // Calculate current value in target currency
            const currentValue = currentBalance / 100000000 * currentPrice;
            // Calculate required balance to maintain target value
            const requiredBalance = Math.round(this.stabilizationData.targetValue / currentPrice * 100000000);
            const difference = currentBalance - requiredBalance;
            // Update status display
            this.updateStabilizationStatus(currentBalance, currentValue, requiredBalance, difference);
            // Update wallet displays
            this.updateWalletStabilizationDisplay();
            // Check if rebalancing is needed and allowed
            const now = Date.now();
            const timeSinceLastRebalance = now - this.stabilizationData.lastRebalanceTime;
            // Debug logging
            this.log(`\u{1F4B1} Debug: difference=${difference}, abs=${Math.abs(difference)}, lastRebalance=${this.stabilizationData.lastRebalanceTime}, timeSince=${timeSinceLastRebalance}`);
            // Get current threshold from UI
            const currentThreshold = parseInt(document.getElementById('rebalance-threshold').value) || 1;
            this.stabilizationData.threshold = currentThreshold;
            if (Math.abs(difference) >= this.stabilizationData.threshold) {
                if (timeSinceLastRebalance >= this.stabilizationData.rebalanceMinInterval) {
                    this.log(`\u{1F4B1} Rebalancing needed: ${difference > 0 ? '+' : ''}${difference} sats difference`);
                    await this.performRebalancing(difference);
                } else {
                    const waitTime = Math.round((this.stabilizationData.rebalanceMinInterval - timeSinceLastRebalance) / 1000);
                    if (!isNaN(waitTime) && waitTime > 0) this.log(`\u{1F4B1} Rebalancing required (${difference > 0 ? '+' : ''}${difference} sats), but waiting ${waitTime}s (cooldown)`);
                    else {
                        this.log(`\u{1F4B1} Rebalancing required (${difference > 0 ? '+' : ''}${difference} sats), starting immediately`);
                        await this.performRebalancing(difference);
                    }
                }
            } else // Log when difference is below threshold
            if (Math.abs(difference) > 0) this.log(`\u{1F4B1} Small difference: ${difference > 0 ? '+' : ''}${difference} sats (below ${this.stabilizationData.threshold} sats threshold)`);
            // Reset error counter on successful check
            this.stabilizationData.errorCount = 0;
        } catch (error) {
            this.stabilizationData.errorCount++;
            this.log(`\u{1F4B1} Error in rebalancing check (${this.stabilizationData.errorCount}/${this.stabilizationData.maxErrors}): ${error.message}`);
            console.error('Rebalancing check error:', error);
            // Stop stabilization if too many errors
            if (this.stabilizationData.errorCount >= this.stabilizationData.maxErrors) {
                this.log(`\u{1F4B1} Too many errors (${this.stabilizationData.maxErrors}), stopping stabilization`);
                this.stopStabilization();
            }
        }
    }
    async performRebalancing(difference) {
        const amount = Math.abs(difference);
        try {
            this.log(`\u{1F4B1} Starte Rebalancing: ${amount} sats (${difference > 0 ? "Receiver \u2192 Provider" : "Provider \u2192 Receiver"})`);
            // Add timeout wrapper for all operations
            const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error('Operation timed out after 30 seconds')), 30000));
            if (difference > 0) {
                // Stability Receiver has too much -> send excess to Stability Provider
                // Create invoice on Stability Provider with timeout
                const invoicePromise = this.walletManager.wallets[1].nwcClient.makeInvoice({
                    amount: amount * 1000,
                    description: `Stabilization: excess ${amount} sats (${this.stabilizationData.currency.toUpperCase()})`
                });
                const invoice = await Promise.race([
                    invoicePromise,
                    timeoutPromise
                ]);
                this.log(`\u{1F4B1} Invoice erstellt: ${amount} sats`);
                // Pay invoice from Stability Receiver with timeout
                const paymentPromise = this.walletManager.wallets[2].nwcClient.payInvoice({
                    invoice: invoice.invoice
                });
                const payment = await Promise.race([
                    paymentPromise,
                    timeoutPromise
                ]);
                this.log(`\u{1F4B1} Rebalancing erfolgreich: ${amount} sats \xfcbertragen (Receiver \u{2192} Provider)`);
            } else {
                // Stability Receiver has too little -> receive from Stability Provider
                // Create invoice on Stability Receiver with timeout
                const invoicePromise = this.walletManager.wallets[2].nwcClient.makeInvoice({
                    amount: amount * 1000,
                    description: `Stabilization: deficit ${amount} sats (${this.stabilizationData.currency.toUpperCase()})`
                });
                const invoice = await Promise.race([
                    invoicePromise,
                    timeoutPromise
                ]);
                this.log(`\u{1F4B1} Invoice erstellt: ${amount} sats`);
                // Pay invoice from Stability Provider with timeout
                const paymentPromise = this.walletManager.wallets[1].nwcClient.payInvoice({
                    invoice: invoice.invoice
                });
                const payment = await Promise.race([
                    paymentPromise,
                    timeoutPromise
                ]);
                this.log(`\u{1F4B1} Rebalancing erfolgreich: ${amount} sats \xfcbertragen (Provider \u{2192} Receiver)`);
            }
            // Update last rebalance time
            this.stabilizationData.lastRebalanceTime = Date.now();
            this.stabilizationData.errorCount = 0; // Reset error counter on success
        } catch (error) {
            this.stabilizationData.errorCount++;
            if (error.message.includes('timed out')) {
                this.log(`\u{1F4B1} Rebalancing Timeout: ${error.message}`);
                this.log(`\u{1F4B1} M\xf6glicherweise Relay-Verbindungsprobleme. Versuche beim n\xe4chsten Zyklus erneut.`);
            } else if (error.message.includes('insufficient')) this.log(`\u{1F4B1} Rebalancing fehlgeschlagen: Unzureichende Balance`);
            else this.log(`\u{1F4B1} Rebalancing fehlgeschlagen: ${error.message}`);
            console.error('Rebalancing error:', error);
            // If too many consecutive errors, pause rebalancing for longer
            if (this.stabilizationData.errorCount >= 3) {
                this.stabilizationData.lastRebalanceTime = Date.now();
                this.log(`\u{1F4B1} Pausiere Rebalancing f\xfcr 2 Minuten nach ${this.stabilizationData.errorCount} Fehlern`);
                setTimeout(()=>{
                    this.stabilizationData.lastRebalanceTime = 0;
                    this.log(`\u{1F4B1} Rebalancing wieder bereit`);
                }, 120000); // 2 minutes pause
            }
        }
    }
    updateStabilizationUI() {
        const currencySelect = document.getElementById('stabilization-currency');
        const startBtn = document.getElementById('start-stabilization');
        const stopBtn = document.getElementById('stop-stabilization');
        const thresholdInput = document.getElementById('rebalance-threshold');
        if (this.stabilizationData.active) {
            currencySelect.disabled = true;
            thresholdInput.disabled = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } else {
            currencySelect.disabled = false;
            thresholdInput.disabled = false;
            startBtn.disabled = !currencySelect.value || !this.walletManager.wallets[1].isConnected || !this.walletManager.wallets[2].isConnected;
            stopBtn.disabled = true;
        }
    }
    updateStabilizationStatus(currentBalance, currentValue, requiredBalance, difference) {
        const statusElement = document.getElementById('stabilization-status');
        const infoElement = document.getElementById('stabilization-info');
        if (this.stabilizationData.active) {
            const currency = this.stabilizationData.currency.toUpperCase();
            const targetValue = this.stabilizationData.targetValue;
            statusElement.className = 'alert alert-success py-2 px-3 mb-2';
            statusElement.innerHTML = `Status: Aktiv (${currency})`;
            infoElement.innerHTML = `
                <div><strong>Zielwert:</strong> ${targetValue.toFixed(2)} ${currency}</div>
                <div><strong>Aktueller Wert:</strong> ${currentValue.toFixed(2)} ${currency}</div>
                <div><strong>Balance:</strong> ${currentBalance.toLocaleString()} sats</div>
                <div><strong>Soll-Balance:</strong> ${requiredBalance.toLocaleString()} sats</div>
                <div><strong>Differenz:</strong> ${difference > 0 ? '+' : ''}${difference.toLocaleString()} sats</div>
            `;
        } else {
            statusElement.className = 'alert alert-secondary py-2 px-3 mb-2';
            statusElement.innerHTML = 'Status: Nicht aktiv';
            infoElement.innerHTML = '';
        }
    }
    async updateWalletStabilizationDisplay() {
        // Update Stability Provider display
        await this.updateSingleWalletDisplay(1);
        // Update Stability Receiver display
        await this.updateSingleWalletDisplay(2);
        // Update transaction displays
        await this.updateWalletTransactions(1);
        await this.updateWalletTransactions(2);
    }
    async updateSingleWalletDisplay(walletId) {
        const infoElement = document.getElementById(`wallet${walletId}-stabilization-info`);
        if (!this.walletManager.wallets[walletId].isConnected) {
            infoElement.innerHTML = `
                <div class="text-center text-muted py-3">
                    <i class="fas fa-info-circle"></i>
                    <div>Wallet ${walletId} verbinden um Daten anzuzeigen</div>
                </div>
            `;
            return;
        }
        try {
            // Get wallet balance
            const balanceResponse = await this.walletManager.wallets[walletId].nwcClient.getBalance();
            const balanceSats = Math.round(balanceResponse.balance / 1000);
            // Get current Bitcoin price
            const priceResponse = await fetch('https://mempool.space/api/v1/prices');
            const priceData = await priceResponse.json();
            // Calculate values for different currencies
            const currencies = {
                USD: {
                    symbol: '$',
                    value: priceData.USD
                },
                EUR: {
                    symbol: "\u20AC",
                    value: priceData.EUR
                },
                GBP: {
                    symbol: "\xa3",
                    value: priceData.GBP
                },
                CHF: {
                    symbol: "\u20A3",
                    value: priceData.CHF
                },
                CAD: {
                    symbol: 'C$',
                    value: priceData.CAD
                },
                JPY: {
                    symbol: "\xa5",
                    value: priceData.JPY
                }
            };
            let currencyDisplays = '';
            Object.entries(currencies).forEach(([code, data])=>{
                const value = balanceSats / 100000000 * data.value;
                currencyDisplays += `
                    <div class="d-flex justify-content-between mb-1">
                        <span class="small">${code}:</span>
                        <span class="small fw-bold">${data.symbol}${value.toFixed(2)}</span>
                    </div>
                `;
            });
            // Show stabilization status for Stability Receiver
            let stabilizationStatus = '';
            if (walletId === 2 && this.stabilizationData.active) {
                const targetCurrency = this.stabilizationData.currency.toUpperCase();
                const currentValue = balanceSats / 100000000 * currencies[targetCurrency].value;
                const targetValue = this.stabilizationData.targetValue;
                const difference = currentValue - targetValue;
                stabilizationStatus = `
                    <div class="border-top pt-2 mt-2">
                        <div class="small text-success">
                            <strong>\u{1F3AF} Stabilisierung aktiv (${targetCurrency})</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="small">Zielwert:</span>
                            <span class="small">${currencies[targetCurrency].symbol}${targetValue.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="small">Differenz:</span>
                            <span class="small ${difference >= 0 ? 'text-success' : 'text-danger'}">
                                ${difference >= 0 ? '+' : ''}${currencies[targetCurrency].symbol}${difference.toFixed(2)}
                            </span>
                        </div>
                    </div>
                `;
            }
            infoElement.innerHTML = `
                <div class="mb-2">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="fw-bold">Balance:</span>
                        <span class="fw-bold text-primary">${balanceSats.toLocaleString()} sats</span>
                    </div>
                    <div class="border-top pt-2">
                        <div class="small text-muted mb-1">W\xe4hrungswerte:</div>
                        ${currencyDisplays}
                    </div>
                    ${stabilizationStatus}
                </div>
            `;
        } catch (error) {
            infoElement.innerHTML = `
                <div class="text-center text-danger py-3">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>Fehler beim Laden der Wallet-Daten</div>
                    <small>${error.message}</small>
                </div>
            `;
        }
    }
    async updateWalletTransactions(walletId) {
        const transactionsElement = document.getElementById(`wallet${walletId}-transactions`);
        if (!this.walletManager.wallets[walletId].isConnected) {
            transactionsElement.innerHTML = `
                <div class="text-center text-muted py-3">
                    <i class="fas fa-info-circle"></i>
                    <div>Wallet ${walletId} verbinden um Transaktionen anzuzeigen</div>
                </div>
            `;
            return;
        }
        // Check if we already know transactions are not supported
        if (this.walletManager.wallets[walletId].transactionsSupported === false) {
            transactionsElement.innerHTML = `
                <div class="text-center text-warning py-3">
                    <i class="fas fa-clock"></i>
                    <div>Transaktionen nicht verf\xfcgbar</div>
                    <small class="text-muted">NWC Provider unterst\xfctzt diese Funktion nicht</small>
                </div>
            `;
            return;
        }
        // Show loading state only on first attempt
        if (this.walletManager.wallets[walletId].transactionsSupported === null) transactionsElement.innerHTML = `
                <div class="text-center text-muted py-3">
                    <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                    <div>Transaktionen werden geladen...</div>
                </div>
            `;
        try {
            // Use the existing working listTransactions logic
            const transactionResponse = await this.walletManager.wallets[walletId].nwcClient.listTransactions({
                from: 0,
                until: Math.floor(Date.now() / 1000),
                limit: 10,
                offset: 0,
                unpaid: false,
                type: undefined
            });
            let transactions = transactionResponse.transactions || transactionResponse;
            // If that fails, try without parameters as fallback
            if (!transactions || transactions.length === 0) {
                const fallbackResponse = await this.walletManager.wallets[walletId].nwcClient.listTransactions({});
                transactions = fallbackResponse.transactions || fallbackResponse;
            }
            // Mark as supported if we get here
            this.walletManager.wallets[walletId].transactionsSupported = true;
            if (!transactions || transactions.length === 0) {
                transactionsElement.innerHTML = `
                    <div class="text-center text-muted py-3">
                        <i class="fas fa-inbox"></i>
                        <div>Keine Transaktionen gefunden</div>
                    </div>
                `;
                return;
            }
            // Sort transactions by date (newest first) and limit to last 10
            const sortedTransactions = transactions.sort((a, b)=>b.created_at - a.created_at).slice(0, 10);
            let transactionHtml = '';
            sortedTransactions.forEach((tx)=>{
                const date = new Date(tx.created_at * 1000);
                const amountSats = Math.round(tx.amount / 1000); // Convert millisats to sats
                const txType = tx.type || 'payment';
                // Determine if transaction is incoming or outgoing
                let isIncoming = false;
                let icon = "\uD83D\uDCB8";
                let colorClass = 'text-danger';
                let typeText = 'Ausgehend';
                // Check transaction type first, then amount as fallback
                if (txType === 'incoming') {
                    isIncoming = true;
                    icon = "\uD83D\uDCE5";
                    colorClass = 'text-success';
                    typeText = 'Empfangen';
                } else if (txType === 'outgoing') {
                    isIncoming = false;
                    icon = "\uD83D\uDCE4";
                    colorClass = 'text-danger';
                    typeText = 'Gesendet';
                } else {
                    // Fallback: use amount sign to determine direction
                    isIncoming = amountSats > 0;
                    if (isIncoming) {
                        icon = "\uD83D\uDCB0";
                        colorClass = 'text-success';
                        typeText = 'Eingehend';
                    }
                }
                // Format description
                let description = tx.description || tx.memo || 'Keine Beschreibung';
                if (description.length > 40) description = description.substring(0, 40) + '...';
                transactionHtml += `
                    <div class="border-bottom px-3 py-2">
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <div class="d-flex align-items-center">
                                <span class="me-2">${icon}</span>
                                <div>
                                    <div class="small fw-bold ${colorClass}">
                                        ${isIncoming ? '+' : '-'}${Math.abs(amountSats).toLocaleString()} sats
                                    </div>
                                    <div class="text-muted" style="font-size: 0.75rem;">
                                        ${typeText}
                                    </div>
                                </div>
                            </div>
                            <div class="text-end">
                                <div class="text-muted small">
                                    ${date.toLocaleString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                                </div>
                            </div>
                        </div>
                        <div class="small text-muted" style="font-size: 0.75rem;">
                            ${description}
                        </div>
                    </div>
                `;
            });
            transactionsElement.innerHTML = transactionHtml;
        } catch (error) {
            console.warn(`Wallet ${walletId} transactions error:`, error.message);
            // Determine if it's a timeout or other error
            const isTimeout = error.message.includes('Timeout') || error.message.includes('reply timeout');
            if (isTimeout) {
                // Mark transactions as unsupported for this wallet
                this.walletManager.wallets[walletId].transactionsSupported = false;
                transactionsElement.innerHTML = `
                    <div class="text-center text-warning py-3">
                        <i class="fas fa-clock"></i>
                        <div>Transaktionen nicht verf\xfcgbar</div>
                        <small class="text-muted">NWC Provider unterst\xfctzt diese Funktion nicht</small>
                    </div>
                `;
            } else {
                // For non-timeout errors, still mark as unsupported to avoid retries
                this.walletManager.wallets[walletId].transactionsSupported = false;
                transactionsElement.innerHTML = `
                    <div class="text-center text-danger py-3">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>Fehler beim Laden der Transaktionen</div>
                        <small class="text-muted">${error.message}</small>
                    </div>
                `;
            }
        }
    }
}


// Main Application Class
class $9cc2c989ea8814d0$var$NWCApp {
    constructor(){
        this.walletManager = new (0, $1954c834f2083c9f$export$d9a919bae0329c9a)();
        this.priceManager = new (0, $46509b166df25f4f$export$1a7dcbc42b6f58b1)();
        this.stabilizationManager = new (0, $8fc335aec3c70df5$export$3d022597fb56d1f4)(this.walletManager);
        this.setupEventListeners();
        this.makeGlobalFunctions();
    }
    setupEventListeners() {
        // Listen for wallet connection changes to update stabilization UI
        window.addEventListener('walletConnectionChanged', ()=>{
            this.stabilizationManager.updateStabilizationUI();
            this.stabilizationManager.updateWalletStabilizationDisplay();
        });
        // Setup currency selection handler
        const currencySelect = document.getElementById('stabilization-currency');
        if (currencySelect) currencySelect.addEventListener('change', ()=>{
            this.stabilizationManager.updateStabilizationUI();
        });
        // Handle page load
        window.addEventListener('load', ()=>{
            this.initialize();
        });
    }
    initialize() {
        this.walletManager.log('NWC Demo page loaded');
        this.walletManager.log('REAL NWC INTEGRATION with local dependencies - Use real wallet connection strings!');
        this.walletManager.log('Supported wallets: Alby Hub, Coinos, Primal, lnwallet.app, Yakihonne...');
        // Start Bitcoin price updates
        this.priceManager.startPriceUpdates();
        // Initialize stabilization UI
        this.stabilizationManager.updateStabilizationUI();
        // Load saved connection strings
        this.walletManager.loadSavedConnectionStrings();
        // Initialize price chart
        this.priceManager.initializePriceChart();
        // Load historical prices on first load if no data exists
        const existingHistory = this.priceManager.getPriceHistory();
        if (existingHistory.length === 0) this.priceManager.fetchHistoricalPrices();
    }
    // Make functions globally available for HTML onclick handlers
    makeGlobalFunctions() {
        // Wallet functions
        window.connectWallet = (walletId)=>this.walletManager.connectWallet(walletId);
        window.disconnectWallet = (walletId)=>this.walletManager.disconnectWallet(walletId);
        window.getWalletInfo = (walletId)=>this.walletManager.getWalletInfo(walletId);
        window.getBalance = (walletId)=>this.walletManager.getBalance(walletId);
        window.createInvoice = (walletId)=>this.walletManager.createInvoice(walletId);
        window.payInvoice = (walletId)=>this.walletManager.payInvoice(walletId);
        window.listTransactions = (walletId)=>this.walletManager.listTransactions(walletId);
        window.payKeysend = (walletId)=>this.walletManager.payKeysend(walletId);
        window.saveConnectionString = (walletId)=>this.walletManager.saveConnectionString(walletId);
        window.clearConnectionString = (walletId)=>this.walletManager.clearConnectionString(walletId);
        window.toggleConnectionVisibility = (walletId)=>this.walletManager.toggleConnectionVisibility(walletId);
        window.clearLog = ()=>this.walletManager.clearLog();
        // Price functions
        window.fetchBitcoinPrice = ()=>this.priceManager.fetchBitcoinPrice();
        window.startPriceUpdates = ()=>this.priceManager.startPriceUpdates();
        window.stopPriceUpdates = ()=>this.priceManager.stopPriceUpdates();
        window.fetchHistoricalPrices = ()=>this.priceManager.fetchHistoricalPrices();
        window.updatePriceChart = ()=>this.priceManager.updatePriceChart();
        window.clearAndReloadPriceData = ()=>this.priceManager.clearAndReloadPriceData();
        // Stabilization functions
        window.startStabilization = ()=>this.stabilizationManager.startStabilization();
        window.stopStabilization = ()=>this.stabilizationManager.stopStabilization();
    }
}
// Initialize the application
new $9cc2c989ea8814d0$var$NWCApp();


//# sourceMappingURL=nwc.cf396756.js.map
