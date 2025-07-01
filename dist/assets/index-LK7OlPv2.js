(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) {
    return;
  }
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) {
    a(l);
  }
  new MutationObserver(l => {
    for (const f of l) {
      if (f.type === 'childList') {
        for (const d of f.addedNodes) {
          d.tagName === 'LINK' && d.rel === 'modulepreload' && a(d);
        }
      }
    }
  }).observe(document, { childList: !0, subtree: !0 });
  function s(l) {
    const f = {};
    return (
      l.integrity && (f.integrity = l.integrity),
      l.referrerPolicy && (f.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    );
  }
  function a(l) {
    if (l.ep) {
      return;
    }
    l.ep = !0;
    const f = s(l);
    fetch(l.href, f);
  }
})();
const gl = { exports: {} },
  yi = {},
  yl = { exports: {} },
  oe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ let Of;
function n0() {
  if (Of) {
    return oe;
  }
  Of = 1;
  const n = Symbol.for('react.element'),
    r = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    a = Symbol.for('react.strict_mode'),
    l = Symbol.for('react.profiler'),
    f = Symbol.for('react.provider'),
    d = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    w = Symbol.iterator;
  function x(R) {
    return R === null || typeof R !== 'object'
      ? null
      : ((R = (w && R[w]) || R['@@iterator']),
        typeof R === 'function' ? R : null);
  }
  const N = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    T = Object.assign,
    P = {};
  function A(R, I, ie) {
    ((this.props = R),
      (this.context = I),
      (this.refs = P),
      (this.updater = ie || N));
  }
  ((A.prototype.isReactComponent = {}),
    (A.prototype.setState = function (R, I) {
      if (typeof R !== 'object' && typeof R !== 'function' && R != null) {
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        );
      }
      this.updater.enqueueSetState(this, R, I, 'setState');
    }),
    (A.prototype.forceUpdate = function (R) {
      this.updater.enqueueForceUpdate(this, R, 'forceUpdate');
    }));
  function C() {}
  C.prototype = A.prototype;
  function _(R, I, ie) {
    ((this.props = R),
      (this.context = I),
      (this.refs = P),
      (this.updater = ie || N));
  }
  const V = (_.prototype = new C());
  ((V.constructor = _), T(V, A.prototype), (V.isPureReactComponent = !0));
  const H = Array.isArray,
    $ = Object.prototype.hasOwnProperty,
    te = { current: null },
    re = { key: !0, ref: !0, __self: !0, __source: !0 };
  function X(R, I, ie) {
    let le,
      ce = {},
      de = null,
      ge = null;
    if (I != null) {
      for (le in (I.ref !== void 0 && (ge = I.ref),
      I.key !== void 0 && (de = '' + I.key),
      I)) {
        $.call(I, le) && !re.hasOwnProperty(le) && (ce[le] = I[le]);
      }
    }
    let pe = arguments.length - 2;
    if (pe === 1) {
      ce.children = ie;
    } else if (1 < pe) {
      for (var Se = Array(pe), ut = 0; ut < pe; ut++) {
        Se[ut] = arguments[ut + 2];
      }
      ce.children = Se;
    }
    if (R && R.defaultProps) {
      for (le in ((pe = R.defaultProps), pe)) {
        ce[le] === void 0 && (ce[le] = pe[le]);
      }
    }
    return {
      $$typeof: n,
      type: R,
      key: de,
      ref: ge,
      props: ce,
      _owner: te.current,
    };
  }
  function ae(R, I) {
    return {
      $$typeof: n,
      type: R.type,
      key: I,
      ref: R.ref,
      props: R.props,
      _owner: R._owner,
    };
  }
  function he(R) {
    return typeof R === 'object' && R !== null && R.$$typeof === n;
  }
  function Be(R) {
    const I = { '=': '=0', ':': '=2' };
    return (
      '$' +
      R.replace(/[=:]/g, function (ie) {
        return I[ie];
      })
    );
  }
  const lt = /\/+/g;
  function Xe(R, I) {
    return typeof R === 'object' && R !== null && R.key != null
      ? Be('' + R.key)
      : I.toString(36);
  }
  function et(R, I, ie, le, ce) {
    let de = typeof R;
    (de === 'undefined' || de === 'boolean') && (R = null);
    let ge = !1;
    if (R === null) {
      ge = !0;
    } else {
      switch (de) {
        case 'string':
        case 'number':
          ge = !0;
          break;
        case 'object':
          switch (R.$$typeof) {
            case n:
            case r:
              ge = !0;
          }
      }
    }
    if (ge) {
      return (
        (ge = R),
        (ce = ce(ge)),
        (R = le === '' ? '.' + Xe(ge, 0) : le),
        H(ce)
          ? ((ie = ''),
            R != null && (ie = R.replace(lt, '$&/') + '/'),
            et(ce, I, ie, '', function (ut) {
              return ut;
            }))
          : ce != null &&
            (he(ce) &&
              (ce = ae(
                ce,
                ie +
                  (!ce.key || (ge && ge.key === ce.key)
                    ? ''
                    : ('' + ce.key).replace(lt, '$&/') + '/') +
                  R
              )),
            I.push(ce)),
        1
      );
    }
    if (((ge = 0), (le = le === '' ? '.' : le + ':'), H(R))) {
      for (var pe = 0; pe < R.length; pe++) {
        de = R[pe];
        var Se = le + Xe(de, pe);
        ge += et(de, I, ie, Se, ce);
      }
    } else if (((Se = x(R)), typeof Se === 'function')) {
      for (R = Se.call(R), pe = 0; !(de = R.next()).done; ) {
        ((de = de.value),
          (Se = le + Xe(de, pe++)),
          (ge += et(de, I, ie, Se, ce)));
      }
    } else if (de === 'object') {
      throw (
        (I = String(R)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (I === '[object Object]'
              ? 'object with keys {' + Object.keys(R).join(', ') + '}'
              : I) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ge;
  }
  function Tt(R, I, ie) {
    if (R == null) {
      return R;
    }
    let le = [],
      ce = 0;
    return (
      et(R, le, '', '', function (de) {
        return I.call(ie, de, ce++);
      }),
      le
    );
  }
  function Ze(R) {
    if (R._status === -1) {
      let I = R._result;
      ((I = I()),
        I.then(
          function (ie) {
            (R._status === 0 || R._status === -1) &&
              ((R._status = 1), (R._result = ie));
          },
          function (ie) {
            (R._status === 0 || R._status === -1) &&
              ((R._status = 2), (R._result = ie));
          }
        ),
        R._status === -1 && ((R._status = 0), (R._result = I)));
    }
    if (R._status === 1) {
      return R._result.default;
    }
    throw R._result;
  }
  const se = { current: null },
    U = { transition: null },
    Z = {
      ReactCurrentDispatcher: se,
      ReactCurrentBatchConfig: U,
      ReactCurrentOwner: te,
    };
  function W() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  return (
    (oe.Children = {
      map: Tt,
      forEach: function (R, I, ie) {
        Tt(
          R,
          function () {
            I.apply(this, arguments);
          },
          ie
        );
      },
      count: function (R) {
        let I = 0;
        return (
          Tt(R, function () {
            I++;
          }),
          I
        );
      },
      toArray: function (R) {
        return (
          Tt(R, function (I) {
            return I;
          }) || []
        );
      },
      only: function (R) {
        if (!he(R)) {
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          );
        }
        return R;
      },
    }),
    (oe.Component = A),
    (oe.Fragment = s),
    (oe.Profiler = l),
    (oe.PureComponent = _),
    (oe.StrictMode = a),
    (oe.Suspense = h),
    (oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z),
    (oe.act = W),
    (oe.cloneElement = function (R, I, ie) {
      if (R == null) {
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            R +
            '.'
        );
      }
      let le = T({}, R.props),
        ce = R.key,
        de = R.ref,
        ge = R._owner;
      if (I != null) {
        if (
          (I.ref !== void 0 && ((de = I.ref), (ge = te.current)),
          I.key !== void 0 && (ce = '' + I.key),
          R.type && R.type.defaultProps)
        ) {
          var pe = R.type.defaultProps;
        }
        for (Se in I) {
          $.call(I, Se) &&
            !re.hasOwnProperty(Se) &&
            (le[Se] = I[Se] === void 0 && pe !== void 0 ? pe[Se] : I[Se]);
        }
      }
      var Se = arguments.length - 2;
      if (Se === 1) {
        le.children = ie;
      } else if (1 < Se) {
        pe = Array(Se);
        for (let ut = 0; ut < Se; ut++) {
          pe[ut] = arguments[ut + 2];
        }
        le.children = pe;
      }
      return {
        $$typeof: n,
        type: R.type,
        key: ce,
        ref: de,
        props: le,
        _owner: ge,
      };
    }),
    (oe.createContext = function (R) {
      return (
        (R = {
          $$typeof: d,
          _currentValue: R,
          _currentValue2: R,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (R.Provider = { $$typeof: f, _context: R }),
        (R.Consumer = R)
      );
    }),
    (oe.createElement = X),
    (oe.createFactory = function (R) {
      const I = X.bind(null, R);
      return ((I.type = R), I);
    }),
    (oe.createRef = function () {
      return { current: null };
    }),
    (oe.forwardRef = function (R) {
      return { $$typeof: p, render: R };
    }),
    (oe.isValidElement = he),
    (oe.lazy = function (R) {
      return { $$typeof: y, _payload: { _status: -1, _result: R }, _init: Ze };
    }),
    (oe.memo = function (R, I) {
      return { $$typeof: m, type: R, compare: I === void 0 ? null : I };
    }),
    (oe.startTransition = function (R) {
      const I = U.transition;
      U.transition = {};
      try {
        R();
      } finally {
        U.transition = I;
      }
    }),
    (oe.unstable_act = W),
    (oe.useCallback = function (R, I) {
      return se.current.useCallback(R, I);
    }),
    (oe.useContext = function (R) {
      return se.current.useContext(R);
    }),
    (oe.useDebugValue = function () {}),
    (oe.useDeferredValue = function (R) {
      return se.current.useDeferredValue(R);
    }),
    (oe.useEffect = function (R, I) {
      return se.current.useEffect(R, I);
    }),
    (oe.useId = function () {
      return se.current.useId();
    }),
    (oe.useImperativeHandle = function (R, I, ie) {
      return se.current.useImperativeHandle(R, I, ie);
    }),
    (oe.useInsertionEffect = function (R, I) {
      return se.current.useInsertionEffect(R, I);
    }),
    (oe.useLayoutEffect = function (R, I) {
      return se.current.useLayoutEffect(R, I);
    }),
    (oe.useMemo = function (R, I) {
      return se.current.useMemo(R, I);
    }),
    (oe.useReducer = function (R, I, ie) {
      return se.current.useReducer(R, I, ie);
    }),
    (oe.useRef = function (R) {
      return se.current.useRef(R);
    }),
    (oe.useState = function (R) {
      return se.current.useState(R);
    }),
    (oe.useSyncExternalStore = function (R, I, ie) {
      return se.current.useSyncExternalStore(R, I, ie);
    }),
    (oe.useTransition = function () {
      return se.current.useTransition();
    }),
    (oe.version = '18.3.1'),
    oe
  );
}
let zf;
function nu() {
  return (zf || ((zf = 1), (yl.exports = n0())), yl.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ let Bf;
function r0() {
  if (Bf) {
    return yi;
  }
  Bf = 1;
  const n = nu(),
    r = Symbol.for('react.element'),
    s = Symbol.for('react.fragment'),
    a = Object.prototype.hasOwnProperty,
    l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(p, h, m) {
    let y,
      w = {},
      x = null,
      N = null;
    (m !== void 0 && (x = '' + m),
      h.key !== void 0 && (x = '' + h.key),
      h.ref !== void 0 && (N = h.ref));
    for (y in h) {
      a.call(h, y) && !f.hasOwnProperty(y) && (w[y] = h[y]);
    }
    if (p && p.defaultProps) {
      for (y in ((h = p.defaultProps), h)) {
        w[y] === void 0 && (w[y] = h[y]);
      }
    }
    return {
      $$typeof: r,
      type: p,
      key: x,
      ref: N,
      props: w,
      _owner: l.current,
    };
  }
  return ((yi.Fragment = s), (yi.jsx = d), (yi.jsxs = d), yi);
}
let Uf;
function i0() {
  return (Uf || ((Uf = 1), (gl.exports = r0())), gl.exports);
}
const v = i0(),
  j = nu(),
  Xs = {},
  vl = { exports: {} },
  ot = {},
  xl = { exports: {} },
  wl = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ let $f;
function s0() {
  return (
    $f ||
      (($f = 1),
      (function (n) {
        function r(U, Z) {
          let W = U.length;
          U.push(Z);
          e: for (; 0 < W; ) {
            const R = (W - 1) >>> 1,
              I = U[R];
            if (0 < l(I, Z)) {
              ((U[R] = Z), (U[W] = I), (W = R));
            } else {
              break e;
            }
          }
        }
        function s(U) {
          return U.length === 0 ? null : U[0];
        }
        function a(U) {
          if (U.length === 0) {
            return null;
          }
          const Z = U[0],
            W = U.pop();
          if (W !== Z) {
            U[0] = W;
            e: for (let R = 0, I = U.length, ie = I >>> 1; R < ie; ) {
              const le = 2 * (R + 1) - 1,
                ce = U[le],
                de = le + 1,
                ge = U[de];
              if (0 > l(ce, W)) {
                de < I && 0 > l(ge, ce)
                  ? ((U[R] = ge), (U[de] = W), (R = de))
                  : ((U[R] = ce), (U[le] = W), (R = le));
              } else if (de < I && 0 > l(ge, W)) {
                ((U[R] = ge), (U[de] = W), (R = de));
              } else {
                break e;
              }
            }
          }
          return Z;
        }
        function l(U, Z) {
          const W = U.sortIndex - Z.sortIndex;
          return W !== 0 ? W : U.id - Z.id;
        }
        if (
          typeof performance === 'object' &&
          typeof performance.now === 'function'
        ) {
          const f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          const d = Date,
            p = d.now();
          n.unstable_now = function () {
            return d.now() - p;
          };
        }
        let h = [],
          m = [],
          y = 1,
          w = null,
          x = 3,
          N = !1,
          T = !1,
          P = !1,
          A = typeof setTimeout === 'function' ? setTimeout : null,
          C = typeof clearTimeout === 'function' ? clearTimeout : null,
          _ = typeof setImmediate < 'u' ? setImmediate : null;
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function V(U) {
          for (let Z = s(m); Z !== null; ) {
            if (Z.callback === null) {
              a(m);
            } else if (Z.startTime <= U) {
              (a(m), (Z.sortIndex = Z.expirationTime), r(h, Z));
            } else {
              break;
            }
            Z = s(m);
          }
        }
        function H(U) {
          if (((P = !1), V(U), !T)) {
            if (s(h) !== null) {
              ((T = !0), Ze($));
            } else {
              const Z = s(m);
              Z !== null && se(H, Z.startTime - U);
            }
          }
        }
        function $(U, Z) {
          ((T = !1), P && ((P = !1), C(X), (X = -1)), (N = !0));
          const W = x;
          try {
            for (
              V(Z), w = s(h);
              w !== null && (!(w.expirationTime > Z) || (U && !Be()));

            ) {
              const R = w.callback;
              if (typeof R === 'function') {
                ((w.callback = null), (x = w.priorityLevel));
                const I = R(w.expirationTime <= Z);
                ((Z = n.unstable_now()),
                  typeof I === 'function'
                    ? (w.callback = I)
                    : w === s(h) && a(h),
                  V(Z));
              } else {
                a(h);
              }
              w = s(h);
            }
            if (w !== null) {
              var ie = !0;
            } else {
              const le = s(m);
              (le !== null && se(H, le.startTime - Z), (ie = !1));
            }
            return ie;
          } finally {
            ((w = null), (x = W), (N = !1));
          }
        }
        var te = !1,
          re = null,
          X = -1,
          ae = 5,
          he = -1;
        function Be() {
          return !(n.unstable_now() - he < ae);
        }
        function lt() {
          if (re !== null) {
            const U = n.unstable_now();
            he = U;
            let Z = !0;
            try {
              Z = re(!0, U);
            } finally {
              Z ? Xe() : ((te = !1), (re = null));
            }
          } else {
            te = !1;
          }
        }
        let Xe;
        if (typeof _ === 'function') {
          Xe = function () {
            _(lt);
          };
        } else if (typeof MessageChannel < 'u') {
          const et = new MessageChannel(),
            Tt = et.port2;
          ((et.port1.onmessage = lt),
            (Xe = function () {
              Tt.postMessage(null);
            }));
        } else {
          Xe = function () {
            A(lt, 0);
          };
        }
        function Ze(U) {
          ((re = U), te || ((te = !0), Xe()));
        }
        function se(U, Z) {
          X = A(function () {
            U(n.unstable_now());
          }, Z);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (U) {
            U.callback = null;
          }),
          (n.unstable_continueExecution = function () {
            T || N || ((T = !0), Ze($));
          }),
          (n.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ae = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (n.unstable_getFirstCallbackNode = function () {
            return s(h);
          }),
          (n.unstable_next = function (U) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = x;
            }
            const W = x;
            x = Z;
            try {
              return U();
            } finally {
              x = W;
            }
          }),
          (n.unstable_pauseExecution = function () {}),
          (n.unstable_requestPaint = function () {}),
          (n.unstable_runWithPriority = function (U, Z) {
            switch (U) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                U = 3;
            }
            const W = x;
            x = U;
            try {
              return Z();
            } finally {
              x = W;
            }
          }),
          (n.unstable_scheduleCallback = function (U, Z, W) {
            const R = n.unstable_now();
            switch (
              (typeof W === 'object' && W !== null
                ? ((W = W.delay),
                  (W = typeof W === 'number' && 0 < W ? R + W : R))
                : (W = R),
              U)
            ) {
              case 1:
                var I = -1;
                break;
              case 2:
                I = 250;
                break;
              case 5:
                I = 1073741823;
                break;
              case 4:
                I = 1e4;
                break;
              default:
                I = 5e3;
            }
            return (
              (I = W + I),
              (U = {
                id: y++,
                callback: Z,
                priorityLevel: U,
                startTime: W,
                expirationTime: I,
                sortIndex: -1,
              }),
              W > R
                ? ((U.sortIndex = W),
                  r(m, U),
                  s(h) === null &&
                    U === s(m) &&
                    (P ? (C(X), (X = -1)) : (P = !0), se(H, W - R)))
                : ((U.sortIndex = I), r(h, U), T || N || ((T = !0), Ze($))),
              U
            );
          }),
          (n.unstable_shouldYield = Be),
          (n.unstable_wrapCallback = function (U) {
            const Z = x;
            return function () {
              const W = x;
              x = Z;
              try {
                return U.apply(this, arguments);
              } finally {
                x = W;
              }
            };
          }));
      })(wl)),
    wl
  );
}
let bf;
function o0() {
  return (bf || ((bf = 1), (xl.exports = s0())), xl.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ let Wf;
function a0() {
  if (Wf) {
    return ot;
  }
  Wf = 1;
  const n = nu(),
    r = o0();
  function s(e) {
    for (
      var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
        i = 1;
      i < arguments.length;
      i++
    ) {
      t += '&args[]=' + encodeURIComponent(arguments[i]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  const a = new Set(),
    l = {};
  function f(e, t) {
    (d(e, t), d(e + 'Capture', t));
  }
  function d(e, t) {
    for (l[e] = t, e = 0; e < t.length; e++) {
      a.add(t[e]);
    }
  }
  const p = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    h = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    y = {},
    w = {};
  function x(e) {
    return h.call(w, e)
      ? !0
      : h.call(y, e)
        ? !1
        : m.test(e)
          ? (w[e] = !0)
          : ((y[e] = !0), !1);
  }
  function N(e, t, i, o) {
    if (i !== null && i.type === 0) {
      return !1;
    }
    switch (typeof t) {
      case 'function':
      case 'symbol':
        return !0;
      case 'boolean':
        return o
          ? !1
          : i !== null
            ? !i.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== 'data-' && e !== 'aria-');
      default:
        return !1;
    }
  }
  function T(e, t, i, o) {
    if (t === null || typeof t > 'u' || N(e, t, i, o)) {
      return !0;
    }
    if (o) {
      return !1;
    }
    if (i !== null) {
      switch (i.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    }
    return !1;
  }
  function P(e, t, i, o, u, c, g) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = o),
      (this.attributeNamespace = u),
      (this.mustUseProperty = i),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = c),
      (this.removeEmptyString = g));
  }
  const A = {};
  ('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      A[e] = new P(e, 0, !1, e, null, !1, !1);
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      const t = e[0];
      A[t] = new P(t, 1, !1, e[1], null, !1, !1);
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (e) {
        A[e] = new P(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }
    ),
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      A[e] = new P(e, 2, !1, e, null, !1, !1);
    }),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        A[e] = new P(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      A[e] = new P(e, 3, !0, e, null, !1, !1);
    }),
    ['capture', 'download'].forEach(function (e) {
      A[e] = new P(e, 4, !1, e, null, !1, !1);
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      A[e] = new P(e, 6, !1, e, null, !1, !1);
    }),
    ['rowSpan', 'start'].forEach(function (e) {
      A[e] = new P(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  const C = /[\-:]([a-z])/g;
  function _(e) {
    return e[1].toUpperCase();
  }
  ('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      const t = e.replace(C, _);
      A[t] = new P(t, 1, !1, e, null, !1, !1);
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        const t = e.replace(C, _);
        A[t] = new P(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      const t = e.replace(C, _);
      A[t] = new P(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      A[e] = new P(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (A.xlinkHref = new P(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1
    )),
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      A[e] = new P(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function V(e, t, i, o) {
    let u = A.hasOwnProperty(t) ? A[t] : null;
    (u !== null
      ? u.type !== 0
      : o ||
        !(2 < t.length) ||
        (t[0] !== 'o' && t[0] !== 'O') ||
        (t[1] !== 'n' && t[1] !== 'N')) &&
      (T(t, i, u, o) && (i = null),
      o || u === null
        ? x(t) &&
          (i === null ? e.removeAttribute(t) : e.setAttribute(t, '' + i))
        : u.mustUseProperty
          ? (e[u.propertyName] = i === null ? (u.type === 3 ? !1 : '') : i)
          : ((t = u.attributeName),
            (o = u.attributeNamespace),
            i === null
              ? e.removeAttribute(t)
              : ((u = u.type),
                (i = u === 3 || (u === 4 && i === !0) ? '' : '' + i),
                o ? e.setAttributeNS(o, t, i) : e.setAttribute(t, i))));
  }
  const H = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    $ = Symbol.for('react.element'),
    te = Symbol.for('react.portal'),
    re = Symbol.for('react.fragment'),
    X = Symbol.for('react.strict_mode'),
    ae = Symbol.for('react.profiler'),
    he = Symbol.for('react.provider'),
    Be = Symbol.for('react.context'),
    lt = Symbol.for('react.forward_ref'),
    Xe = Symbol.for('react.suspense'),
    et = Symbol.for('react.suspense_list'),
    Tt = Symbol.for('react.memo'),
    Ze = Symbol.for('react.lazy'),
    se = Symbol.for('react.offscreen'),
    U = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e !== 'object'
      ? null
      : ((e = (U && e[U]) || e['@@iterator']),
        typeof e === 'function' ? e : null);
  }
  let W = Object.assign,
    R;
  function I(e) {
    if (R === void 0) {
      try {
        throw Error();
      } catch (i) {
        const t = i.stack.trim().match(/\n( *(at )?)/);
        R = (t && t[1]) || '';
      }
    }
    return (
      `
` +
      R +
      e
    );
  }
  let ie = !1;
  function le(e, t) {
    if (!e || ie) {
      return '';
    }
    ie = !0;
    const i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) {
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, 'props', {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect === 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (D) {
            var o = D;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (D) {
            o = D;
          }
          e.call(t.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (D) {
          o = D;
        }
        e();
      }
    } catch (D) {
      if (D && o && typeof D.stack === 'string') {
        for (
          var u = D.stack.split(`
`),
            c = o.stack.split(`
`),
            g = u.length - 1,
            S = c.length - 1;
          1 <= g && 0 <= S && u[g] !== c[S];

        ) {
          S--;
        }
        for (; 1 <= g && 0 <= S; g--, S--) {
          if (u[g] !== c[S]) {
            if (g !== 1 || S !== 1) {
              do {
                if ((g--, S--, 0 > S || u[g] !== c[S])) {
                  let k =
                    `
` + u[g].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      k.includes('<anonymous>') &&
                      (k = k.replace('<anonymous>', e.displayName)),
                    k
                  );
                }
              } while (1 <= g && 0 <= S);
            }
            break;
          }
        }
      }
    } finally {
      ((ie = !1), (Error.prepareStackTrace = i));
    }
    return (e = e ? e.displayName || e.name : '') ? I(e) : '';
  }
  function ce(e) {
    switch (e.tag) {
      case 5:
        return I(e.type);
      case 16:
        return I('Lazy');
      case 13:
        return I('Suspense');
      case 19:
        return I('SuspenseList');
      case 0:
      case 2:
      case 15:
        return ((e = le(e.type, !1)), e);
      case 11:
        return ((e = le(e.type.render, !1)), e);
      case 1:
        return ((e = le(e.type, !0)), e);
      default:
        return '';
    }
  }
  function de(e) {
    if (e == null) {
      return null;
    }
    if (typeof e === 'function') {
      return e.displayName || e.name || null;
    }
    if (typeof e === 'string') {
      return e;
    }
    switch (e) {
      case re:
        return 'Fragment';
      case te:
        return 'Portal';
      case ae:
        return 'Profiler';
      case X:
        return 'StrictMode';
      case Xe:
        return 'Suspense';
      case et:
        return 'SuspenseList';
    }
    if (typeof e === 'object') {
      switch (e.$$typeof) {
        case Be:
          return (e.displayName || 'Context') + '.Consumer';
        case he:
          return (e._context.displayName || 'Context') + '.Provider';
        case lt:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case Tt:
          return (
            (t = e.displayName || null),
            t !== null ? t : de(e.type) || 'Memo'
          );
        case Ze:
          ((t = e._payload), (e = e._init));
          try {
            return de(e(t));
          } catch {}
      }
    }
    return null;
  }
  function ge(e) {
    const t = e.type;
    switch (e.tag) {
      case 24:
        return 'Cache';
      case 9:
        return (t.displayName || 'Context') + '.Consumer';
      case 10:
        return (t._context.displayName || 'Context') + '.Provider';
      case 18:
        return 'DehydratedFragment';
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ''),
          t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
        );
      case 7:
        return 'Fragment';
      case 5:
        return t;
      case 4:
        return 'Portal';
      case 3:
        return 'Root';
      case 6:
        return 'Text';
      case 16:
        return de(t);
      case 8:
        return t === X ? 'StrictMode' : 'Mode';
      case 22:
        return 'Offscreen';
      case 12:
        return 'Profiler';
      case 21:
        return 'Scope';
      case 13:
        return 'Suspense';
      case 19:
        return 'SuspenseList';
      case 25:
        return 'TracingMarker';
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t === 'function') {
          return t.displayName || t.name || null;
        }
        if (typeof t === 'string') {
          return t;
        }
    }
    return null;
  }
  function pe(e) {
    switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function Se(e) {
    const t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    );
  }
  function ut(e) {
    let t = Se(e) ? 'checked' : 'value',
      i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      o = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof i < 'u' &&
      typeof i.get === 'function' &&
      typeof i.set === 'function'
    ) {
      const u = i.get,
        c = i.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (g) {
            ((o = '' + g), c.call(this, g));
          },
        }),
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return o;
          },
          setValue: function (g) {
            o = '' + g;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Bi(e) {
    e._valueTracker || (e._valueTracker = ut(e));
  }
  function bu(e) {
    if (!e) {
      return !1;
    }
    const t = e._valueTracker;
    if (!t) {
      return !0;
    }
    let i = t.getValue(),
      o = '';
    return (
      e && (o = Se(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = o),
      e !== i ? (t.setValue(e), !0) : !1
    );
  }
  function Ui(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    ) {
      return null;
    }
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Co(e, t) {
    const i = t.checked;
    return W({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: i ?? e._wrapperState.initialChecked,
    });
  }
  function Wu(e, t) {
    let i = t.defaultValue == null ? '' : t.defaultValue,
      o = t.checked != null ? t.checked : t.defaultChecked;
    ((i = pe(t.value != null ? t.value : i)),
      (e._wrapperState = {
        initialChecked: o,
        initialValue: i,
        controlled:
          t.type === 'checkbox' || t.type === 'radio'
            ? t.checked != null
            : t.value != null,
      }));
  }
  function Hu(e, t) {
    ((t = t.checked), t != null && V(e, 'checked', t, !1));
  }
  function To(e, t) {
    Hu(e, t);
    const i = pe(t.value),
      o = t.type;
    if (i != null) {
      o === 'number'
        ? ((i === 0 && e.value === '') || e.value != i) && (e.value = '' + i)
        : e.value !== '' + i && (e.value = '' + i);
    } else if (o === 'submit' || o === 'reset') {
      e.removeAttribute('value');
      return;
    }
    (t.hasOwnProperty('value')
      ? Po(e, t.type, i)
      : t.hasOwnProperty('defaultValue') && Po(e, t.type, pe(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function Ku(e, t, i) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
      const o = t.type;
      if (
        !(
          (o !== 'submit' && o !== 'reset') ||
          (t.value !== void 0 && t.value !== null)
        )
      ) {
        return;
      }
      ((t = '' + e._wrapperState.initialValue),
        i || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((i = e.name),
      i !== '' && (e.name = ''),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      i !== '' && (e.name = i));
  }
  function Po(e, t, i) {
    (t !== 'number' || Ui(e.ownerDocument) !== e) &&
      (i == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + i && (e.defaultValue = '' + i));
  }
  const Lr = Array.isArray;
  function Kn(e, t, i, o) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < i.length; u++) {
        t['$' + i[u]] = !0;
      }
      for (i = 0; i < e.length; i++) {
        ((u = t.hasOwnProperty('$' + e[i].value)),
          e[i].selected !== u && (e[i].selected = u),
          u && o && (e[i].defaultSelected = !0));
      }
    } else {
      for (i = '' + pe(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          ((e[u].selected = !0), o && (e[u].defaultSelected = !0));
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Eo(e, t) {
    if (t.dangerouslySetInnerHTML != null) {
      throw Error(s(91));
    }
    return W({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    });
  }
  function Gu(e, t) {
    let i = t.value;
    if (i == null) {
      if (((i = t.children), (t = t.defaultValue), i != null)) {
        if (t != null) {
          throw Error(s(92));
        }
        if (Lr(i)) {
          if (1 < i.length) {
            throw Error(s(93));
          }
          i = i[0];
        }
        t = i;
      }
      (t == null && (t = ''), (i = t));
    }
    e._wrapperState = { initialValue: pe(i) };
  }
  function Qu(e, t) {
    let i = pe(t.value),
      o = pe(t.defaultValue);
    (i != null &&
      ((i = '' + i),
      i !== e.value && (e.value = i),
      t.defaultValue == null && e.defaultValue !== i && (e.defaultValue = i)),
      o != null && (e.defaultValue = '' + o));
  }
  function Yu(e) {
    const t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== '' &&
      t !== null &&
      (e.value = t);
  }
  function Xu(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function No(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? Xu(t)
      : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
  }
  let $i,
    Zu = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (t, i, o, u) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, i, o, u);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) {
        e.innerHTML = t;
      } else {
        for (
          $i = $i || document.createElement('div'),
            $i.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
            t = $i.firstChild;
          e.firstChild;

        ) {
          e.removeChild(e.firstChild);
        }
        for (; t.firstChild; ) {
          e.appendChild(t.firstChild);
        }
      }
    });
  function Dr(e, t) {
    if (t) {
      const i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  const _r = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    ag = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(_r).forEach(function (e) {
    ag.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (_r[t] = _r[e]));
    });
  });
  function qu(e, t, i) {
    return t == null || typeof t === 'boolean' || t === ''
      ? ''
      : i || typeof t !== 'number' || t === 0 || (_r.hasOwnProperty(e) && _r[e])
        ? ('' + t).trim()
        : t + 'px';
  }
  function Ju(e, t) {
    e = e.style;
    for (let i in t) {
      if (t.hasOwnProperty(i)) {
        const o = i.indexOf('--') === 0,
          u = qu(i, t[i], o);
        (i === 'float' && (i = 'cssFloat'),
          o ? e.setProperty(i, u) : (e[i] = u));
      }
    }
  }
  const lg = W(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function jo(e, t) {
    if (t) {
      if (lg[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) {
        throw Error(s(137, e));
      }
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) {
          throw Error(s(60));
        }
        if (
          typeof t.dangerouslySetInnerHTML !== 'object' ||
          !('__html' in t.dangerouslySetInnerHTML)
        ) {
          throw Error(s(61));
        }
      }
      if (t.style != null && typeof t.style !== 'object') {
        throw Error(s(62));
      }
    }
  }
  function Ro(e, t) {
    if (e.indexOf('-') === -1) {
      return typeof t.is === 'string';
    }
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  let Mo = null;
  function Ao(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  let Lo = null,
    Gn = null,
    Qn = null;
  function ec(e) {
    if ((e = ni(e))) {
      if (typeof Lo !== 'function') {
        throw Error(s(280));
      }
      let t = e.stateNode;
      t && ((t = ds(t)), Lo(e.stateNode, e.type, t));
    }
  }
  function tc(e) {
    Gn ? (Qn ? Qn.push(e) : (Qn = [e])) : (Gn = e);
  }
  function nc() {
    if (Gn) {
      let e = Gn,
        t = Qn;
      if (((Qn = Gn = null), ec(e), t)) {
        for (e = 0; e < t.length; e++) {
          ec(t[e]);
        }
      }
    }
  }
  function rc(e, t) {
    return e(t);
  }
  function ic() {}
  let Do = !1;
  function sc(e, t, i) {
    if (Do) {
      return e(t, i);
    }
    Do = !0;
    try {
      return rc(e, t, i);
    } finally {
      ((Do = !1), (Gn !== null || Qn !== null) && (ic(), nc()));
    }
  }
  function Vr(e, t) {
    let i = e.stateNode;
    if (i === null) {
      return null;
    }
    let o = ds(i);
    if (o === null) {
      return null;
    }
    i = o[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((o = !o.disabled) ||
          ((e = e.type),
          (o = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !o));
        break e;
      default:
        e = !1;
    }
    if (e) {
      return null;
    }
    if (i && typeof i !== 'function') {
      throw Error(s(231, t, typeof i));
    }
    return i;
  }
  let _o = !1;
  if (p) {
    try {
      const Fr = {};
      (Object.defineProperty(Fr, 'passive', {
        get: function () {
          _o = !0;
        },
      }),
        window.addEventListener('test', Fr, Fr),
        window.removeEventListener('test', Fr, Fr));
    } catch {
      _o = !1;
    }
  }
  function ug(e, t, i, o, u, c, g, S, k) {
    const D = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(i, D);
    } catch (O) {
      this.onError(O);
    }
  }
  let Ir = !1,
    bi = null,
    Wi = !1,
    Vo = null,
    cg = {
      onError: function (e) {
        ((Ir = !0), (bi = e));
      },
    };
  function dg(e, t, i, o, u, c, g, S, k) {
    ((Ir = !1), (bi = null), ug.apply(cg, arguments));
  }
  function fg(e, t, i, o, u, c, g, S, k) {
    if ((dg.apply(this, arguments), Ir)) {
      if (Ir) {
        var D = bi;
        ((Ir = !1), (bi = null));
      } else {
        throw Error(s(198));
      }
      Wi || ((Wi = !0), (Vo = D));
    }
  }
  function jn(e) {
    let t = e,
      i = e;
    if (e.alternate) {
      for (; t.return; ) {
        t = t.return;
      }
    } else {
      e = t;
      do {
        ((t = e), t.flags & 4098 && (i = t.return), (e = t.return));
      } while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function oc(e) {
    if (e.tag === 13) {
      let t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      ) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function ac(e) {
    if (jn(e) !== e) {
      throw Error(s(188));
    }
  }
  function hg(e) {
    let t = e.alternate;
    if (!t) {
      if (((t = jn(e)), t === null)) {
        throw Error(s(188));
      }
      return t !== e ? null : e;
    }
    for (var i = e, o = t; ; ) {
      const u = i.return;
      if (u === null) {
        break;
      }
      let c = u.alternate;
      if (c === null) {
        if (((o = u.return), o !== null)) {
          i = o;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === i) {
            return (ac(u), e);
          }
          if (c === o) {
            return (ac(u), t);
          }
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== o.return) {
        ((i = u), (o = c));
      } else {
        for (var g = !1, S = u.child; S; ) {
          if (S === i) {
            ((g = !0), (i = u), (o = c));
            break;
          }
          if (S === o) {
            ((g = !0), (o = u), (i = c));
            break;
          }
          S = S.sibling;
        }
        if (!g) {
          for (S = c.child; S; ) {
            if (S === i) {
              ((g = !0), (i = c), (o = u));
              break;
            }
            if (S === o) {
              ((g = !0), (o = c), (i = u));
              break;
            }
            S = S.sibling;
          }
          if (!g) {
            throw Error(s(189));
          }
        }
      }
      if (i.alternate !== o) {
        throw Error(s(190));
      }
    }
    if (i.tag !== 3) {
      throw Error(s(188));
    }
    return i.stateNode.current === i ? e : t;
  }
  function lc(e) {
    return ((e = hg(e)), e !== null ? uc(e) : null);
  }
  function uc(e) {
    if (e.tag === 5 || e.tag === 6) {
      return e;
    }
    for (e = e.child; e !== null; ) {
      const t = uc(e);
      if (t !== null) {
        return t;
      }
      e = e.sibling;
    }
    return null;
  }
  let cc = r.unstable_scheduleCallback,
    dc = r.unstable_cancelCallback,
    pg = r.unstable_shouldYield,
    mg = r.unstable_requestPaint,
    Re = r.unstable_now,
    gg = r.unstable_getCurrentPriorityLevel,
    Fo = r.unstable_ImmediatePriority,
    fc = r.unstable_UserBlockingPriority,
    Hi = r.unstable_NormalPriority,
    yg = r.unstable_LowPriority,
    hc = r.unstable_IdlePriority,
    Ki = null,
    Ft = null;
  function vg(e) {
    if (Ft && typeof Ft.onCommitFiberRoot === 'function') {
      try {
        Ft.onCommitFiberRoot(Ki, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
    }
  }
  const Pt = Math.clz32 ? Math.clz32 : Sg,
    xg = Math.log,
    wg = Math.LN2;
  function Sg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((xg(e) / wg) | 0)) | 0);
  }
  let Gi = 64,
    Qi = 4194304;
  function Or(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Yi(e, t) {
    let i = e.pendingLanes;
    if (i === 0) {
      return 0;
    }
    let o = 0,
      u = e.suspendedLanes,
      c = e.pingedLanes,
      g = i & 268435455;
    if (g !== 0) {
      const S = g & ~u;
      S !== 0 ? (o = Or(S)) : ((c &= g), c !== 0 && (o = Or(c)));
    } else {
      ((g = i & ~u), g !== 0 ? (o = Or(g)) : c !== 0 && (o = Or(c)));
    }
    if (o === 0) {
      return 0;
    }
    if (
      t !== 0 &&
      t !== o &&
      !(t & u) &&
      ((u = o & -o), (c = t & -t), u >= c || (u === 16 && (c & 4194240) !== 0))
    ) {
      return t;
    }
    if ((o & 4 && (o |= i & 16), (t = e.entangledLanes), t !== 0)) {
      for (e = e.entanglements, t &= o; 0 < t; ) {
        ((i = 31 - Pt(t)), (u = 1 << i), (o |= e[i]), (t &= ~u));
      }
    }
    return o;
  }
  function kg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Cg(e, t) {
    for (
      let i = e.suspendedLanes,
        o = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes;
      0 < c;

    ) {
      const g = 31 - Pt(c),
        S = 1 << g,
        k = u[g];
      (k === -1
        ? (!(S & i) || S & o) && (u[g] = kg(S, t))
        : k <= t && (e.expiredLanes |= S),
        (c &= ~S));
    }
  }
  function Io(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function pc() {
    const e = Gi;
    return ((Gi <<= 1), !(Gi & 4194240) && (Gi = 64), e);
  }
  function Oo(e) {
    for (var t = [], i = 0; 31 > i; i++) {
      t.push(e);
    }
    return t;
  }
  function zr(e, t, i) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - Pt(t)),
      (e[t] = i));
  }
  function Tg(e, t) {
    let i = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    const o = e.eventTimes;
    for (e = e.expirationTimes; 0 < i; ) {
      const u = 31 - Pt(i),
        c = 1 << u;
      ((t[u] = 0), (o[u] = -1), (e[u] = -1), (i &= ~c));
    }
  }
  function zo(e, t) {
    let i = (e.entangledLanes |= t);
    for (e = e.entanglements; i; ) {
      const o = 31 - Pt(i),
        u = 1 << o;
      ((u & t) | (e[o] & t) && (e[o] |= t), (i &= ~u));
    }
  }
  let me = 0;
  function mc(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
  }
  let gc,
    Bo,
    yc,
    vc,
    xc,
    Uo = !1,
    Xi = [],
    rn = null,
    sn = null,
    on = null,
    Br = new Map(),
    Ur = new Map(),
    an = [],
    Pg =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      );
  function wc(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        rn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        sn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        on = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Br.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ur.delete(t.pointerId);
    }
  }
  function $r(e, t, i, o, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: i,
          eventSystemFlags: o,
          nativeEvent: c,
          targetContainers: [u],
        }),
        t !== null && ((t = ni(t)), t !== null && Bo(t)),
        e)
      : ((e.eventSystemFlags |= o),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function Eg(e, t, i, o, u) {
    switch (t) {
      case 'focusin':
        return ((rn = $r(rn, e, t, i, o, u)), !0);
      case 'dragenter':
        return ((sn = $r(sn, e, t, i, o, u)), !0);
      case 'mouseover':
        return ((on = $r(on, e, t, i, o, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (Br.set(c, $r(Br.get(c) || null, e, t, i, o, u)), !0);
      case 'gotpointercapture':
        return (
          (c = u.pointerId),
          Ur.set(c, $r(Ur.get(c) || null, e, t, i, o, u)),
          !0
        );
    }
    return !1;
  }
  function Sc(e) {
    let t = Rn(e.target);
    if (t !== null) {
      const i = jn(t);
      if (i !== null) {
        if (((t = i.tag), t === 13)) {
          if (((t = oc(i)), t !== null)) {
            ((e.blockedOn = t),
              xc(e.priority, function () {
                yc(i);
              }));
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Zi(e) {
    if (e.blockedOn !== null) {
      return !1;
    }
    for (let t = e.targetContainers; 0 < t.length; ) {
      let i = bo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        const o = new i.constructor(i.type, i);
        ((Mo = o), i.target.dispatchEvent(o), (Mo = null));
      } else {
        return ((t = ni(i)), t !== null && Bo(t), (e.blockedOn = i), !1);
      }
      t.shift();
    }
    return !0;
  }
  function kc(e, t, i) {
    Zi(e) && i.delete(t);
  }
  function Ng() {
    ((Uo = !1),
      rn !== null && Zi(rn) && (rn = null),
      sn !== null && Zi(sn) && (sn = null),
      on !== null && Zi(on) && (on = null),
      Br.forEach(kc),
      Ur.forEach(kc));
  }
  function br(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Uo ||
        ((Uo = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, Ng)));
  }
  function Wr(e) {
    function t(u) {
      return br(u, e);
    }
    if (0 < Xi.length) {
      br(Xi[0], e);
      for (var i = 1; i < Xi.length; i++) {
        var o = Xi[i];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (
      rn !== null && br(rn, e),
        sn !== null && br(sn, e),
        on !== null && br(on, e),
        Br.forEach(t),
        Ur.forEach(t),
        i = 0;
      i < an.length;
      i++
    ) {
      ((o = an[i]), o.blockedOn === e && (o.blockedOn = null));
    }
    for (; 0 < an.length && ((i = an[0]), i.blockedOn === null); ) {
      (Sc(i), i.blockedOn === null && an.shift());
    }
  }
  let Yn = H.ReactCurrentBatchConfig,
    qi = !0;
  function jg(e, t, i, o) {
    const u = me,
      c = Yn.transition;
    Yn.transition = null;
    try {
      ((me = 1), $o(e, t, i, o));
    } finally {
      ((me = u), (Yn.transition = c));
    }
  }
  function Rg(e, t, i, o) {
    const u = me,
      c = Yn.transition;
    Yn.transition = null;
    try {
      ((me = 4), $o(e, t, i, o));
    } finally {
      ((me = u), (Yn.transition = c));
    }
  }
  function $o(e, t, i, o) {
    if (qi) {
      let u = bo(e, t, i, o);
      if (u === null) {
        (oa(e, t, o, Ji, i), wc(e, o));
      } else if (Eg(u, e, t, i, o)) {
        o.stopPropagation();
      } else if ((wc(e, o), t & 4 && -1 < Pg.indexOf(e))) {
        for (; u !== null; ) {
          let c = ni(u);
          if (
            (c !== null && gc(c),
            (c = bo(e, t, i, o)),
            c === null && oa(e, t, o, Ji, i),
            c === u)
          ) {
            break;
          }
          u = c;
        }
        u !== null && o.stopPropagation();
      } else {
        oa(e, t, o, null, i);
      }
    }
  }
  var Ji = null;
  function bo(e, t, i, o) {
    if (((Ji = null), (e = Ao(o)), (e = Rn(e)), e !== null)) {
      if (((t = jn(e)), t === null)) {
        e = null;
      } else if (((i = t.tag), i === 13)) {
        if (((e = oc(t)), e !== null)) {
          return e;
        }
        e = null;
      } else if (i === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) {
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        }
        e = null;
      } else {
        t !== e && (e = null);
      }
    }
    return ((Ji = e), null);
  }
  function Cc(e) {
    switch (e) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4;
      case 'message':
        switch (gg()) {
          case Fo:
            return 1;
          case fc:
            return 4;
          case Hi:
          case yg:
            return 16;
          case hc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  let ln = null,
    Wo = null,
    es = null;
  function Tc() {
    if (es) {
      return es;
    }
    let e,
      t = Wo,
      i = t.length,
      o,
      u = 'value' in ln ? ln.value : ln.textContent,
      c = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) {}
    const g = i - e;
    for (o = 1; o <= g && t[i - o] === u[c - o]; o++) {}
    return (es = u.slice(e, 1 < o ? 1 - o : void 0));
  }
  function ts(e) {
    const t = e.keyCode;
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ns() {
    return !0;
  }
  function Pc() {
    return !1;
  }
  function ct(e) {
    function t(i, o, u, c, g) {
      ((this._reactName = i),
        (this._targetInst = u),
        (this.type = o),
        (this.nativeEvent = c),
        (this.target = g),
        (this.currentTarget = null));
      for (const S in e) {
        e.hasOwnProperty(S) && ((i = e[S]), (this[S] = i ? i(c) : c[S]));
      }
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? ns
          : Pc),
        (this.isPropagationStopped = Pc),
        this
      );
    }
    return (
      W(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          const i = this.nativeEvent;
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue !== 'unknown' && (i.returnValue = !1),
            (this.isDefaultPrevented = ns));
        },
        stopPropagation: function () {
          const i = this.nativeEvent;
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble !== 'unknown' && (i.cancelBubble = !0),
            (this.isPropagationStopped = ns));
        },
        persist: function () {},
        isPersistent: ns,
      }),
      t
    );
  }
  let Xn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ho = ct(Xn),
    Hr = W({}, Xn, { view: 0, detail: 0 }),
    Mg = ct(Hr),
    Ko,
    Go,
    Kr,
    rs = W({}, Hr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Yo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Kr &&
              (Kr && e.type === 'mousemove'
                ? ((Ko = e.screenX - Kr.screenX), (Go = e.screenY - Kr.screenY))
                : (Go = Ko = 0),
              (Kr = e)),
            Ko);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Go;
      },
    }),
    Ec = ct(rs),
    Ag = W({}, rs, { dataTransfer: 0 }),
    Lg = ct(Ag),
    Dg = W({}, Hr, { relatedTarget: 0 }),
    Qo = ct(Dg),
    _g = W({}, Xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Vg = ct(_g),
    Fg = W({}, Xn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ig = ct(Fg),
    Og = W({}, Xn, { data: 0 }),
    Nc = ct(Og),
    zg = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Bg = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Ug = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function $g(e) {
    const t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Ug[e])
        ? !!t[e]
        : !1;
  }
  function Yo() {
    return $g;
  }
  let bg = W({}, Hr, {
      key: function (e) {
        if (e.key) {
          const t = zg[e.key] || e.key;
          if (t !== 'Unidentified') {
            return t;
          }
        }
        return e.type === 'keypress'
          ? ((e = ts(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Bg[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Yo,
      charCode: function (e) {
        return e.type === 'keypress' ? ts(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? ts(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Wg = ct(bg),
    Hg = W({}, rs, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    jc = ct(Hg),
    Kg = W({}, Hr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Yo,
    }),
    Gg = ct(Kg),
    Qg = W({}, Xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Yg = ct(Qg),
    Xg = W({}, rs, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Zg = ct(Xg),
    qg = [9, 13, 27, 32],
    Xo = p && 'CompositionEvent' in window,
    Gr = null;
  p && 'documentMode' in document && (Gr = document.documentMode);
  let Jg = p && 'TextEvent' in window && !Gr,
    Rc = p && (!Xo || (Gr && 8 < Gr && 11 >= Gr)),
    Mc = ' ',
    Ac = !1;
  function Lc(e, t) {
    switch (e) {
      case 'keyup':
        return qg.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Dc(e) {
    return (
      (e = e.detail),
      typeof e === 'object' && 'data' in e ? e.data : null
    );
  }
  let Zn = !1;
  function ey(e, t) {
    switch (e) {
      case 'compositionend':
        return Dc(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Ac = !0), Mc);
      case 'textInput':
        return ((e = t.data), e === Mc && Ac ? null : e);
      default:
        return null;
    }
  }
  function ty(e, t) {
    if (Zn) {
      return e === 'compositionend' || (!Xo && Lc(e, t))
        ? ((e = Tc()), (es = Wo = ln = null), (Zn = !1), e)
        : null;
    }
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) {
            return t.char;
          }
          if (t.which) {
            return String.fromCharCode(t.which);
          }
        }
        return null;
      case 'compositionend':
        return Rc && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  const ny = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function _c(e) {
    const t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!ny[e.type] : t === 'textarea';
  }
  function Vc(e, t, i, o) {
    (tc(o),
      (t = ls(t, 'onChange')),
      0 < t.length &&
        ((i = new Ho('onChange', 'change', null, i, o)),
        e.push({ event: i, listeners: t })));
  }
  let Qr = null,
    Yr = null;
  function ry(e) {
    Jc(e, 0);
  }
  function is(e) {
    const t = nr(e);
    if (bu(t)) {
      return e;
    }
  }
  function iy(e, t) {
    if (e === 'change') {
      return t;
    }
  }
  let Fc = !1;
  if (p) {
    let Zo;
    if (p) {
      let qo = 'oninput' in document;
      if (!qo) {
        const Ic = document.createElement('div');
        (Ic.setAttribute('oninput', 'return;'),
          (qo = typeof Ic.oninput === 'function'));
      }
      Zo = qo;
    } else {
      Zo = !1;
    }
    Fc = Zo && (!document.documentMode || 9 < document.documentMode);
  }
  function Oc() {
    Qr && (Qr.detachEvent('onpropertychange', zc), (Yr = Qr = null));
  }
  function zc(e) {
    if (e.propertyName === 'value' && is(Yr)) {
      const t = [];
      (Vc(t, Yr, e, Ao(e)), sc(ry, t));
    }
  }
  function sy(e, t, i) {
    e === 'focusin'
      ? (Oc(), (Qr = t), (Yr = i), Qr.attachEvent('onpropertychange', zc))
      : e === 'focusout' && Oc();
  }
  function oy(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') {
      return is(Yr);
    }
  }
  function ay(e, t) {
    if (e === 'click') {
      return is(t);
    }
  }
  function ly(e, t) {
    if (e === 'input' || e === 'change') {
      return is(t);
    }
  }
  function uy(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  const Et = typeof Object.is === 'function' ? Object.is : uy;
  function Xr(e, t) {
    if (Et(e, t)) {
      return !0;
    }
    if (
      typeof e !== 'object' ||
      e === null ||
      typeof t !== 'object' ||
      t === null
    ) {
      return !1;
    }
    let i = Object.keys(e),
      o = Object.keys(t);
    if (i.length !== o.length) {
      return !1;
    }
    for (o = 0; o < i.length; o++) {
      const u = i[o];
      if (!h.call(t, u) || !Et(e[u], t[u])) {
        return !1;
      }
    }
    return !0;
  }
  function Bc(e) {
    for (; e && e.firstChild; ) {
      e = e.firstChild;
    }
    return e;
  }
  function Uc(e, t) {
    let i = Bc(e);
    e = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (((o = e + i.textContent.length), e <= t && o >= t)) {
          return { node: i, offset: t - e };
        }
        e = o;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = Bc(i);
    }
  }
  function $c(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? $c(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function bc() {
    for (var e = window, t = Ui(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href === 'string';
      } catch {
        i = !1;
      }
      if (i) {
        e = t.contentWindow;
      } else {
        break;
      }
      t = Ui(e.document);
    }
    return t;
  }
  function Jo(e) {
    const t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  function cy(e) {
    let t = bc(),
      i = e.focusedElem,
      o = e.selectionRange;
    if (
      t !== i &&
      i &&
      i.ownerDocument &&
      $c(i.ownerDocument.documentElement, i)
    ) {
      if (o !== null && Jo(i)) {
        if (
          ((t = o.start),
          (e = o.end),
          e === void 0 && (e = t),
          'selectionStart' in i)
        ) {
          ((i.selectionStart = t),
            (i.selectionEnd = Math.min(e, i.value.length)));
        } else if (
          ((e = ((t = i.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          let u = i.textContent.length,
            c = Math.min(o.start, u);
          ((o = o.end === void 0 ? c : Math.min(o.end, u)),
            !e.extend && c > o && ((u = o), (o = c), (c = u)),
            (u = Uc(i, c)));
          const g = Uc(i, o);
          u &&
            g &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== u.node ||
              e.anchorOffset !== u.offset ||
              e.focusNode !== g.node ||
              e.focusOffset !== g.offset) &&
            ((t = t.createRange()),
            t.setStart(u.node, u.offset),
            e.removeAllRanges(),
            c > o
              ? (e.addRange(t), e.extend(g.node, g.offset))
              : (t.setEnd(g.node, g.offset), e.addRange(t)));
        }
      }
      for (t = [], e = i; (e = e.parentNode); ) {
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      }
      for (
        typeof i.focus === 'function' && i.focus(), i = 0;
        i < t.length;
        i++
      ) {
        ((e = t[i]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
      }
    }
  }
  let dy = p && 'documentMode' in document && 11 >= document.documentMode,
    qn = null,
    ea = null,
    Zr = null,
    ta = !1;
  function Wc(e, t, i) {
    let o =
      i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    ta ||
      qn == null ||
      qn !== Ui(o) ||
      ((o = qn),
      'selectionStart' in o && Jo(o)
        ? (o = { start: o.selectionStart, end: o.selectionEnd })
        : ((o = (
            (o.ownerDocument && o.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (o = {
            anchorNode: o.anchorNode,
            anchorOffset: o.anchorOffset,
            focusNode: o.focusNode,
            focusOffset: o.focusOffset,
          })),
      (Zr && Xr(Zr, o)) ||
        ((Zr = o),
        (o = ls(ea, 'onSelect')),
        0 < o.length &&
          ((t = new Ho('onSelect', 'select', null, t, i)),
          e.push({ event: t, listeners: o }),
          (t.target = qn))));
  }
  function ss(e, t) {
    const i = {};
    return (
      (i[e.toLowerCase()] = t.toLowerCase()),
      (i['Webkit' + e] = 'webkit' + t),
      (i['Moz' + e] = 'moz' + t),
      i
    );
  }
  let Jn = {
      animationend: ss('Animation', 'AnimationEnd'),
      animationiteration: ss('Animation', 'AnimationIteration'),
      animationstart: ss('Animation', 'AnimationStart'),
      transitionend: ss('Transition', 'TransitionEnd'),
    },
    na = {},
    Hc = {};
  p &&
    ((Hc = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Jn.animationend.animation,
      delete Jn.animationiteration.animation,
      delete Jn.animationstart.animation),
    'TransitionEvent' in window || delete Jn.transitionend.transition);
  function os(e) {
    if (na[e]) {
      return na[e];
    }
    if (!Jn[e]) {
      return e;
    }
    let t = Jn[e],
      i;
    for (i in t) {
      if (t.hasOwnProperty(i) && i in Hc) {
        return (na[e] = t[i]);
      }
    }
    return e;
  }
  const Kc = os('animationend'),
    Gc = os('animationiteration'),
    Qc = os('animationstart'),
    Yc = os('transitionend'),
    Xc = new Map(),
    Zc =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  function un(e, t) {
    (Xc.set(e, t), f(t, [e]));
  }
  for (let ra = 0; ra < Zc.length; ra++) {
    const ia = Zc[ra],
      fy = ia.toLowerCase(),
      hy = ia[0].toUpperCase() + ia.slice(1);
    un(fy, 'on' + hy);
  }
  (un(Kc, 'onAnimationEnd'),
    un(Gc, 'onAnimationIteration'),
    un(Qc, 'onAnimationStart'),
    un('dblclick', 'onDoubleClick'),
    un('focusin', 'onFocus'),
    un('focusout', 'onBlur'),
    un(Yc, 'onTransitionEnd'),
    d('onMouseEnter', ['mouseout', 'mouseover']),
    d('onMouseLeave', ['mouseout', 'mouseover']),
    d('onPointerEnter', ['pointerout', 'pointerover']),
    d('onPointerLeave', ['pointerout', 'pointerover']),
    f(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    f(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    f('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    f(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    f(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    f(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  const qr =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    py = new Set(
      'cancel close invalid load scroll toggle'.split(' ').concat(qr)
    );
  function qc(e, t, i) {
    const o = e.type || 'unknown-event';
    ((e.currentTarget = i), fg(o, t, void 0, e), (e.currentTarget = null));
  }
  function Jc(e, t) {
    t = (t & 4) !== 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i],
        u = o.event;
      o = o.listeners;
      e: {
        let c = void 0;
        if (t) {
          for (var g = o.length - 1; 0 <= g; g--) {
            var S = o[g],
              k = S.instance,
              D = S.currentTarget;
            if (((S = S.listener), k !== c && u.isPropagationStopped())) {
              break e;
            }
            (qc(u, S, D), (c = k));
          }
        } else {
          for (g = 0; g < o.length; g++) {
            if (
              ((S = o[g]),
              (k = S.instance),
              (D = S.currentTarget),
              (S = S.listener),
              k !== c && u.isPropagationStopped())
            ) {
              break e;
            }
            (qc(u, S, D), (c = k));
          }
        }
      }
    }
    if (Wi) {
      throw ((e = Vo), (Wi = !1), (Vo = null), e);
    }
  }
  function ve(e, t) {
    let i = t[fa];
    i === void 0 && (i = t[fa] = new Set());
    const o = e + '__bubble';
    i.has(o) || (ed(t, e, 2, !1), i.add(o));
  }
  function sa(e, t, i) {
    let o = 0;
    (t && (o |= 4), ed(i, e, o, t));
  }
  const as = '_reactListening' + Math.random().toString(36).slice(2);
  function Jr(e) {
    if (!e[as]) {
      ((e[as] = !0),
        a.forEach(function (i) {
          i !== 'selectionchange' && (py.has(i) || sa(i, !1, e), sa(i, !0, e));
        }));
      const t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[as] || ((t[as] = !0), sa('selectionchange', !1, t));
    }
  }
  function ed(e, t, i, o) {
    switch (Cc(t)) {
      case 1:
        var u = jg;
        break;
      case 4:
        u = Rg;
        break;
      default:
        u = $o;
    }
    ((i = u.bind(null, t, i, e)),
      (u = void 0),
      !_o ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (u = !0),
      o
        ? u !== void 0
          ? e.addEventListener(t, i, { capture: !0, passive: u })
          : e.addEventListener(t, i, !0)
        : u !== void 0
          ? e.addEventListener(t, i, { passive: u })
          : e.addEventListener(t, i, !1));
  }
  function oa(e, t, i, o, u) {
    let c = o;
    if (!(t & 1) && !(t & 2) && o !== null) {
      e: for (;;) {
        if (o === null) {
          return;
        }
        let g = o.tag;
        if (g === 3 || g === 4) {
          let S = o.stateNode.containerInfo;
          if (S === u || (S.nodeType === 8 && S.parentNode === u)) {
            break;
          }
          if (g === 4) {
            for (g = o.return; g !== null; ) {
              var k = g.tag;
              if (
                (k === 3 || k === 4) &&
                ((k = g.stateNode.containerInfo),
                k === u || (k.nodeType === 8 && k.parentNode === u))
              ) {
                return;
              }
              g = g.return;
            }
          }
          for (; S !== null; ) {
            if (((g = Rn(S)), g === null)) {
              return;
            }
            if (((k = g.tag), k === 5 || k === 6)) {
              o = c = g;
              continue e;
            }
            S = S.parentNode;
          }
        }
        o = o.return;
      }
    }
    sc(function () {
      let D = c,
        O = Ao(i),
        z = [];
      e: {
        var F = Xc.get(e);
        if (F !== void 0) {
          var b = Ho,
            G = e;
          switch (e) {
            case 'keypress':
              if (ts(i) === 0) {
                break e;
              }
            case 'keydown':
            case 'keyup':
              b = Wg;
              break;
            case 'focusin':
              ((G = 'focus'), (b = Qo));
              break;
            case 'focusout':
              ((G = 'blur'), (b = Qo));
              break;
            case 'beforeblur':
            case 'afterblur':
              b = Qo;
              break;
            case 'click':
              if (i.button === 2) {
                break e;
              }
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              b = Ec;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              b = Lg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              b = Gg;
              break;
            case Kc:
            case Gc:
            case Qc:
              b = Vg;
              break;
            case Yc:
              b = Yg;
              break;
            case 'scroll':
              b = Mg;
              break;
            case 'wheel':
              b = Zg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              b = Ig;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              b = jc;
          }
          var Q = (t & 4) !== 0,
            Me = !Q && e === 'scroll',
            M = Q ? (F !== null ? F + 'Capture' : null) : F;
          Q = [];
          for (var E = D, L; E !== null; ) {
            L = E;
            var B = L.stateNode;
            if (
              (L.tag === 5 &&
                B !== null &&
                ((L = B),
                M !== null &&
                  ((B = Vr(E, M)), B != null && Q.push(ei(E, B, L)))),
              Me)
            ) {
              break;
            }
            E = E.return;
          }
          0 < Q.length &&
            ((F = new b(F, G, null, i, O)), z.push({ event: F, listeners: Q }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((F = e === 'mouseover' || e === 'pointerover'),
            (b = e === 'mouseout' || e === 'pointerout'),
            F &&
              i !== Mo &&
              (G = i.relatedTarget || i.fromElement) &&
              (Rn(G) || G[Wt]))
          ) {
            break e;
          }
          if (
            (b || F) &&
            ((F =
              O.window === O
                ? O
                : (F = O.ownerDocument)
                  ? F.defaultView || F.parentWindow
                  : window),
            b
              ? ((G = i.relatedTarget || i.toElement),
                (b = D),
                (G = G ? Rn(G) : null),
                G !== null &&
                  ((Me = jn(G)), G !== Me || (G.tag !== 5 && G.tag !== 6)) &&
                  (G = null))
              : ((b = null), (G = D)),
            b !== G)
          ) {
            if (
              ((Q = Ec),
              (B = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (E = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((Q = jc),
                (B = 'onPointerLeave'),
                (M = 'onPointerEnter'),
                (E = 'pointer')),
              (Me = b == null ? F : nr(b)),
              (L = G == null ? F : nr(G)),
              (F = new Q(B, E + 'leave', b, i, O)),
              (F.target = Me),
              (F.relatedTarget = L),
              (B = null),
              Rn(O) === D &&
                ((Q = new Q(M, E + 'enter', G, i, O)),
                (Q.target = L),
                (Q.relatedTarget = Me),
                (B = Q)),
              (Me = B),
              b && G)
            ) {
              t: {
                for (Q = b, M = G, E = 0, L = Q; L; L = er(L)) {
                  E++;
                }
                for (L = 0, B = M; B; B = er(B)) {
                  L++;
                }
                for (; 0 < E - L; ) {
                  ((Q = er(Q)), E--);
                }
                for (; 0 < L - E; ) {
                  ((M = er(M)), L--);
                }
                for (; E--; ) {
                  if (Q === M || (M !== null && Q === M.alternate)) {
                    break t;
                  }
                  ((Q = er(Q)), (M = er(M)));
                }
                Q = null;
              }
            } else {
              Q = null;
            }
            (b !== null && td(z, F, b, Q, !1),
              G !== null && Me !== null && td(z, Me, G, Q, !0));
          }
        }
        e: {
          if (
            ((F = D ? nr(D) : window),
            (b = F.nodeName && F.nodeName.toLowerCase()),
            b === 'select' || (b === 'input' && F.type === 'file'))
          ) {
            var Y = iy;
          } else if (_c(F)) {
            if (Fc) {
              Y = ly;
            } else {
              Y = oy;
              var q = sy;
            }
          } else {
            (b = F.nodeName) &&
              b.toLowerCase() === 'input' &&
              (F.type === 'checkbox' || F.type === 'radio') &&
              (Y = ay);
          }
          if (Y && (Y = Y(e, D))) {
            Vc(z, Y, i, O);
            break e;
          }
          (q && q(e, F, D),
            e === 'focusout' &&
              (q = F._wrapperState) &&
              q.controlled &&
              F.type === 'number' &&
              Po(F, 'number', F.value));
        }
        switch (((q = D ? nr(D) : window), e)) {
          case 'focusin':
            (_c(q) || q.contentEditable === 'true') &&
              ((qn = q), (ea = D), (Zr = null));
            break;
          case 'focusout':
            Zr = ea = qn = null;
            break;
          case 'mousedown':
            ta = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((ta = !1), Wc(z, i, O));
            break;
          case 'selectionchange':
            if (dy) {
              break;
            }
          case 'keydown':
          case 'keyup':
            Wc(z, i, O);
        }
        let J;
        if (Xo) {
          e: {
            switch (e) {
              case 'compositionstart':
                var ne = 'onCompositionStart';
                break e;
              case 'compositionend':
                ne = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ne = 'onCompositionUpdate';
                break e;
            }
            ne = void 0;
          }
        } else {
          Zn
            ? Lc(e, i) && (ne = 'onCompositionEnd')
            : e === 'keydown' &&
              i.keyCode === 229 &&
              (ne = 'onCompositionStart');
        }
        (ne &&
          (Rc &&
            i.locale !== 'ko' &&
            (Zn || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && Zn && (J = Tc())
              : ((ln = O),
                (Wo = 'value' in ln ? ln.value : ln.textContent),
                (Zn = !0))),
          (q = ls(D, ne)),
          0 < q.length &&
            ((ne = new Nc(ne, e, null, i, O)),
            z.push({ event: ne, listeners: q }),
            J ? (ne.data = J) : ((J = Dc(i)), J !== null && (ne.data = J)))),
          (J = Jg ? ey(e, i) : ty(e, i)) &&
            ((D = ls(D, 'onBeforeInput')),
            0 < D.length &&
              ((O = new Nc('onBeforeInput', 'beforeinput', null, i, O)),
              z.push({ event: O, listeners: D }),
              (O.data = J))));
      }
      Jc(z, t);
    });
  }
  function ei(e, t, i) {
    return { instance: e, listener: t, currentTarget: i };
  }
  function ls(e, t) {
    for (var i = t + 'Capture', o = []; e !== null; ) {
      let u = e,
        c = u.stateNode;
      (u.tag === 5 &&
        c !== null &&
        ((u = c),
        (c = Vr(e, i)),
        c != null && o.unshift(ei(e, c, u)),
        (c = Vr(e, t)),
        c != null && o.push(ei(e, c, u))),
        (e = e.return));
    }
    return o;
  }
  function er(e) {
    if (e === null) {
      return null;
    }
    do {
      e = e.return;
    } while (e && e.tag !== 5);
    return e || null;
  }
  function td(e, t, i, o, u) {
    for (var c = t._reactName, g = []; i !== null && i !== o; ) {
      let S = i,
        k = S.alternate,
        D = S.stateNode;
      if (k !== null && k === o) {
        break;
      }
      (S.tag === 5 &&
        D !== null &&
        ((S = D),
        u
          ? ((k = Vr(i, c)), k != null && g.unshift(ei(i, k, S)))
          : u || ((k = Vr(i, c)), k != null && g.push(ei(i, k, S)))),
        (i = i.return));
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  const my = /\r\n?/g,
    gy = /\u0000|\uFFFD/g;
  function nd(e) {
    return (typeof e === 'string' ? e : '' + e)
      .replace(
        my,
        `
`
      )
      .replace(gy, '');
  }
  function us(e, t, i) {
    if (((t = nd(t)), nd(e) !== t && i)) {
      throw Error(s(425));
    }
  }
  function cs() {}
  let aa = null,
    la = null;
  function ua(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children === 'string' ||
      typeof t.children === 'number' ||
      (typeof t.dangerouslySetInnerHTML === 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  const ca = typeof setTimeout === 'function' ? setTimeout : void 0,
    yy = typeof clearTimeout === 'function' ? clearTimeout : void 0,
    rd = typeof Promise === 'function' ? Promise : void 0,
    vy =
      typeof queueMicrotask === 'function'
        ? queueMicrotask
        : typeof rd < 'u'
          ? function (e) {
              return rd.resolve(null).then(e).catch(xy);
            }
          : ca;
  function xy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function da(e, t) {
    let i = t,
      o = 0;
    do {
      const u = i.nextSibling;
      if ((e.removeChild(i), u && u.nodeType === 8)) {
        if (((i = u.data), i === '/$')) {
          if (o === 0) {
            (e.removeChild(u), Wr(t));
            return;
          }
          o--;
        } else {
          (i !== '$' && i !== '$?' && i !== '$!') || o++;
        }
      }
      i = u;
    } while (i);
    Wr(t);
  }
  function cn(e) {
    for (; e != null; e = e.nextSibling) {
      let t = e.nodeType;
      if (t === 1 || t === 3) {
        break;
      }
      if (t === 8) {
        if (((t = e.data), t === '$' || t === '$!' || t === '$?')) {
          break;
        }
        if (t === '/$') {
          return null;
        }
      }
    }
    return e;
  }
  function id(e) {
    e = e.previousSibling;
    for (let t = 0; e; ) {
      if (e.nodeType === 8) {
        const i = e.data;
        if (i === '$' || i === '$!' || i === '$?') {
          if (t === 0) {
            return e;
          }
          t--;
        } else {
          i === '/$' && t++;
        }
      }
      e = e.previousSibling;
    }
    return null;
  }
  var tr = Math.random().toString(36).slice(2),
    It = '__reactFiber$' + tr,
    ti = '__reactProps$' + tr,
    Wt = '__reactContainer$' + tr,
    fa = '__reactEvents$' + tr,
    wy = '__reactListeners$' + tr,
    Sy = '__reactHandles$' + tr;
  function Rn(e) {
    let t = e[It];
    if (t) {
      return t;
    }
    for (let i = e.parentNode; i; ) {
      if ((t = i[Wt] || i[It])) {
        if (
          ((i = t.alternate),
          t.child !== null || (i !== null && i.child !== null))
        ) {
          for (e = id(e); e !== null; ) {
            if ((i = e[It])) {
              return i;
            }
            e = id(e);
          }
        }
        return t;
      }
      ((e = i), (i = e.parentNode));
    }
    return null;
  }
  function ni(e) {
    return (
      (e = e[It] || e[Wt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function nr(e) {
    if (e.tag === 5 || e.tag === 6) {
      return e.stateNode;
    }
    throw Error(s(33));
  }
  function ds(e) {
    return e[ti] || null;
  }
  let ha = [],
    rr = -1;
  function dn(e) {
    return { current: e };
  }
  function xe(e) {
    0 > rr || ((e.current = ha[rr]), (ha[rr] = null), rr--);
  }
  function ye(e, t) {
    (rr++, (ha[rr] = e.current), (e.current = t));
  }
  let fn = {},
    We = dn(fn),
    tt = dn(!1),
    Mn = fn;
  function ir(e, t) {
    const i = e.type.contextTypes;
    if (!i) {
      return fn;
    }
    const o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) {
      return o.__reactInternalMemoizedMaskedChildContext;
    }
    let u = {},
      c;
    for (c in i) {
      u[c] = t[c];
    }
    return (
      o &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      u
    );
  }
  function nt(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function fs() {
    (xe(tt), xe(We));
  }
  function sd(e, t, i) {
    if (We.current !== fn) {
      throw Error(s(168));
    }
    (ye(We, t), ye(tt, i));
  }
  function od(e, t, i) {
    let o = e.stateNode;
    if (((t = t.childContextTypes), typeof o.getChildContext !== 'function')) {
      return i;
    }
    o = o.getChildContext();
    for (const u in o) {
      if (!(u in t)) {
        throw Error(s(108, ge(e) || 'Unknown', u));
      }
    }
    return W({}, i, o);
  }
  function hs(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        fn),
      (Mn = We.current),
      ye(We, e),
      ye(tt, tt.current),
      !0
    );
  }
  function ad(e, t, i) {
    const o = e.stateNode;
    if (!o) {
      throw Error(s(169));
    }
    (i
      ? ((e = od(e, t, Mn)),
        (o.__reactInternalMemoizedMergedChildContext = e),
        xe(tt),
        xe(We),
        ye(We, e))
      : xe(tt),
      ye(tt, i));
  }
  let Ht = null,
    ps = !1,
    pa = !1;
  function ld(e) {
    Ht === null ? (Ht = [e]) : Ht.push(e);
  }
  function ky(e) {
    ((ps = !0), ld(e));
  }
  function hn() {
    if (!pa && Ht !== null) {
      pa = !0;
      let e = 0,
        t = me;
      try {
        const i = Ht;
        for (me = 1; e < i.length; e++) {
          let o = i[e];
          do {
            o = o(!0);
          } while (o !== null);
        }
        ((Ht = null), (ps = !1));
      } catch (u) {
        throw (Ht !== null && (Ht = Ht.slice(e + 1)), cc(Fo, hn), u);
      } finally {
        ((me = t), (pa = !1));
      }
    }
    return null;
  }
  let sr = [],
    or = 0,
    ms = null,
    gs = 0,
    gt = [],
    yt = 0,
    An = null,
    Kt = 1,
    Gt = '';
  function Ln(e, t) {
    ((sr[or++] = gs), (sr[or++] = ms), (ms = e), (gs = t));
  }
  function ud(e, t, i) {
    ((gt[yt++] = Kt), (gt[yt++] = Gt), (gt[yt++] = An), (An = e));
    let o = Kt;
    e = Gt;
    let u = 32 - Pt(o) - 1;
    ((o &= ~(1 << u)), (i += 1));
    let c = 32 - Pt(t) + u;
    if (30 < c) {
      const g = u - (u % 5);
      ((c = (o & ((1 << g) - 1)).toString(32)),
        (o >>= g),
        (u -= g),
        (Kt = (1 << (32 - Pt(t) + u)) | (i << u) | o),
        (Gt = c + e));
    } else {
      ((Kt = (1 << c) | (i << u) | o), (Gt = e));
    }
  }
  function ma(e) {
    e.return !== null && (Ln(e, 1), ud(e, 1, 0));
  }
  function ga(e) {
    for (; e === ms; ) {
      ((ms = sr[--or]), (sr[or] = null), (gs = sr[--or]), (sr[or] = null));
    }
    for (; e === An; ) {
      ((An = gt[--yt]),
        (gt[yt] = null),
        (Gt = gt[--yt]),
        (gt[yt] = null),
        (Kt = gt[--yt]),
        (gt[yt] = null));
    }
  }
  let dt = null,
    ft = null,
    ke = !1,
    Nt = null;
  function cd(e, t) {
    const i = St(5, null, null, 0);
    ((i.elementType = 'DELETED'),
      (i.stateNode = t),
      (i.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [i]), (e.flags |= 16)) : t.push(i));
  }
  function dd(e, t) {
    switch (e.tag) {
      case 5:
        var i = e.type;
        return (
          (t =
            t.nodeType !== 1 || i.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (dt = e), (ft = cn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (dt = e), (ft = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((i = An !== null ? { id: Kt, overflow: Gt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: i,
                retryLane: 1073741824,
              }),
              (i = St(18, null, null, 0)),
              (i.stateNode = t),
              (i.return = e),
              (e.child = i),
              (dt = e),
              (ft = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function ya(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function va(e) {
    if (ke) {
      let t = ft;
      if (t) {
        const i = t;
        if (!dd(e, t)) {
          if (ya(e)) {
            throw Error(s(418));
          }
          t = cn(i.nextSibling);
          const o = dt;
          t && dd(e, t)
            ? cd(o, i)
            : ((e.flags = (e.flags & -4097) | 2), (ke = !1), (dt = e));
        }
      } else {
        if (ya(e)) {
          throw Error(s(418));
        }
        ((e.flags = (e.flags & -4097) | 2), (ke = !1), (dt = e));
      }
    }
  }
  function fd(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    ) {
      e = e.return;
    }
    dt = e;
  }
  function ys(e) {
    if (e !== dt) {
      return !1;
    }
    if (!ke) {
      return (fd(e), (ke = !0), !1);
    }
    let t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== 'head' && t !== 'body' && !ua(e.type, e.memoizedProps))),
      t && (t = ft))
    ) {
      if (ya(e)) {
        throw (hd(), Error(s(418)));
      }
      for (; t; ) {
        (cd(e, t), (t = cn(t.nextSibling)));
      }
    }
    if ((fd(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) {
        throw Error(s(317));
      }
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            const i = e.data;
            if (i === '/$') {
              if (t === 0) {
                ft = cn(e.nextSibling);
                break e;
              }
              t--;
            } else {
              (i !== '$' && i !== '$!' && i !== '$?') || t++;
            }
          }
          e = e.nextSibling;
        }
        ft = null;
      }
    } else {
      ft = dt ? cn(e.stateNode.nextSibling) : null;
    }
    return !0;
  }
  function hd() {
    for (let e = ft; e; ) {
      e = cn(e.nextSibling);
    }
  }
  function ar() {
    ((ft = dt = null), (ke = !1));
  }
  function xa(e) {
    Nt === null ? (Nt = [e]) : Nt.push(e);
  }
  const Cy = H.ReactCurrentBatchConfig;
  function ri(e, t, i) {
    if (
      ((e = i.ref),
      e !== null && typeof e !== 'function' && typeof e !== 'object')
    ) {
      if (i._owner) {
        if (((i = i._owner), i)) {
          if (i.tag !== 1) {
            throw Error(s(309));
          }
          var o = i.stateNode;
        }
        if (!o) {
          throw Error(s(147, e));
        }
        const u = o,
          c = '' + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref === 'function' &&
          t.ref._stringRef === c
          ? t.ref
          : ((t = function (g) {
              const S = u.refs;
              g === null ? delete S[c] : (S[c] = g);
            }),
            (t._stringRef = c),
            t);
      }
      if (typeof e !== 'string') {
        throw Error(s(284));
      }
      if (!i._owner) {
        throw Error(s(290, e));
      }
    }
    return e;
  }
  function vs(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === '[object Object]'
            ? 'object with keys {' + Object.keys(t).join(', ') + '}'
            : e
        )
      )
    );
  }
  function pd(e) {
    const t = e._init;
    return t(e._payload);
  }
  function md(e) {
    function t(M, E) {
      if (e) {
        const L = M.deletions;
        L === null ? ((M.deletions = [E]), (M.flags |= 16)) : L.push(E);
      }
    }
    function i(M, E) {
      if (!e) {
        return null;
      }
      for (; E !== null; ) {
        (t(M, E), (E = E.sibling));
      }
      return null;
    }
    function o(M, E) {
      for (M = new Map(); E !== null; ) {
        (E.key !== null ? M.set(E.key, E) : M.set(E.index, E), (E = E.sibling));
      }
      return M;
    }
    function u(M, E) {
      return ((M = Sn(M, E)), (M.index = 0), (M.sibling = null), M);
    }
    function c(M, E, L) {
      return (
        (M.index = L),
        e
          ? ((L = M.alternate),
            L !== null
              ? ((L = L.index), L < E ? ((M.flags |= 2), E) : L)
              : ((M.flags |= 2), E))
          : ((M.flags |= 1048576), E)
      );
    }
    function g(M) {
      return (e && M.alternate === null && (M.flags |= 2), M);
    }
    function S(M, E, L, B) {
      return E === null || E.tag !== 6
        ? ((E = cl(L, M.mode, B)), (E.return = M), E)
        : ((E = u(E, L)), (E.return = M), E);
    }
    function k(M, E, L, B) {
      const Y = L.type;
      return Y === re
        ? O(M, E, L.props.children, B, L.key)
        : E !== null &&
            (E.elementType === Y ||
              (typeof Y === 'object' &&
                Y !== null &&
                Y.$$typeof === Ze &&
                pd(Y) === E.type))
          ? ((B = u(E, L.props)), (B.ref = ri(M, E, L)), (B.return = M), B)
          : ((B = $s(L.type, L.key, L.props, null, M.mode, B)),
            (B.ref = ri(M, E, L)),
            (B.return = M),
            B);
    }
    function D(M, E, L, B) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== L.containerInfo ||
        E.stateNode.implementation !== L.implementation
        ? ((E = dl(L, M.mode, B)), (E.return = M), E)
        : ((E = u(E, L.children || [])), (E.return = M), E);
    }
    function O(M, E, L, B, Y) {
      return E === null || E.tag !== 7
        ? ((E = Bn(L, M.mode, B, Y)), (E.return = M), E)
        : ((E = u(E, L)), (E.return = M), E);
    }
    function z(M, E, L) {
      if ((typeof E === 'string' && E !== '') || typeof E === 'number') {
        return ((E = cl('' + E, M.mode, L)), (E.return = M), E);
      }
      if (typeof E === 'object' && E !== null) {
        switch (E.$$typeof) {
          case $:
            return (
              (L = $s(E.type, E.key, E.props, null, M.mode, L)),
              (L.ref = ri(M, null, E)),
              (L.return = M),
              L
            );
          case te:
            return ((E = dl(E, M.mode, L)), (E.return = M), E);
          case Ze:
            var B = E._init;
            return z(M, B(E._payload), L);
        }
        if (Lr(E) || Z(E)) {
          return ((E = Bn(E, M.mode, L, null)), (E.return = M), E);
        }
        vs(M, E);
      }
      return null;
    }
    function F(M, E, L, B) {
      let Y = E !== null ? E.key : null;
      if ((typeof L === 'string' && L !== '') || typeof L === 'number') {
        return Y !== null ? null : S(M, E, '' + L, B);
      }
      if (typeof L === 'object' && L !== null) {
        switch (L.$$typeof) {
          case $:
            return L.key === Y ? k(M, E, L, B) : null;
          case te:
            return L.key === Y ? D(M, E, L, B) : null;
          case Ze:
            return ((Y = L._init), F(M, E, Y(L._payload), B));
        }
        if (Lr(L) || Z(L)) {
          return Y !== null ? null : O(M, E, L, B, null);
        }
        vs(M, L);
      }
      return null;
    }
    function b(M, E, L, B, Y) {
      if ((typeof B === 'string' && B !== '') || typeof B === 'number') {
        return ((M = M.get(L) || null), S(E, M, '' + B, Y));
      }
      if (typeof B === 'object' && B !== null) {
        switch (B.$$typeof) {
          case $:
            return (
              (M = M.get(B.key === null ? L : B.key) || null),
              k(E, M, B, Y)
            );
          case te:
            return (
              (M = M.get(B.key === null ? L : B.key) || null),
              D(E, M, B, Y)
            );
          case Ze:
            var q = B._init;
            return b(M, E, L, q(B._payload), Y);
        }
        if (Lr(B) || Z(B)) {
          return ((M = M.get(L) || null), O(E, M, B, Y, null));
        }
        vs(E, B);
      }
      return null;
    }
    function G(M, E, L, B) {
      for (
        var Y = null, q = null, J = E, ne = (E = 0), ze = null;
        J !== null && ne < L.length;
        ne++
      ) {
        J.index > ne ? ((ze = J), (J = null)) : (ze = J.sibling);
        const fe = F(M, J, L[ne], B);
        if (fe === null) {
          J === null && (J = ze);
          break;
        }
        (e && J && fe.alternate === null && t(M, J),
          (E = c(fe, E, ne)),
          q === null ? (Y = fe) : (q.sibling = fe),
          (q = fe),
          (J = ze));
      }
      if (ne === L.length) {
        return (i(M, J), ke && Ln(M, ne), Y);
      }
      if (J === null) {
        for (; ne < L.length; ne++) {
          ((J = z(M, L[ne], B)),
            J !== null &&
              ((E = c(J, E, ne)),
              q === null ? (Y = J) : (q.sibling = J),
              (q = J)));
        }
        return (ke && Ln(M, ne), Y);
      }
      for (J = o(M, J); ne < L.length; ne++) {
        ((ze = b(J, M, ne, L[ne], B)),
          ze !== null &&
            (e &&
              ze.alternate !== null &&
              J.delete(ze.key === null ? ne : ze.key),
            (E = c(ze, E, ne)),
            q === null ? (Y = ze) : (q.sibling = ze),
            (q = ze)));
      }
      return (
        e &&
          J.forEach(function (kn) {
            return t(M, kn);
          }),
        ke && Ln(M, ne),
        Y
      );
    }
    function Q(M, E, L, B) {
      let Y = Z(L);
      if (typeof Y !== 'function') {
        throw Error(s(150));
      }
      if (((L = Y.call(L)), L == null)) {
        throw Error(s(151));
      }
      for (
        var q = (Y = null), J = E, ne = (E = 0), ze = null, fe = L.next();
        J !== null && !fe.done;
        ne++, fe = L.next()
      ) {
        J.index > ne ? ((ze = J), (J = null)) : (ze = J.sibling);
        const kn = F(M, J, fe.value, B);
        if (kn === null) {
          J === null && (J = ze);
          break;
        }
        (e && J && kn.alternate === null && t(M, J),
          (E = c(kn, E, ne)),
          q === null ? (Y = kn) : (q.sibling = kn),
          (q = kn),
          (J = ze));
      }
      if (fe.done) {
        return (i(M, J), ke && Ln(M, ne), Y);
      }
      if (J === null) {
        for (; !fe.done; ne++, fe = L.next()) {
          ((fe = z(M, fe.value, B)),
            fe !== null &&
              ((E = c(fe, E, ne)),
              q === null ? (Y = fe) : (q.sibling = fe),
              (q = fe)));
        }
        return (ke && Ln(M, ne), Y);
      }
      for (J = o(M, J); !fe.done; ne++, fe = L.next()) {
        ((fe = b(J, M, ne, fe.value, B)),
          fe !== null &&
            (e &&
              fe.alternate !== null &&
              J.delete(fe.key === null ? ne : fe.key),
            (E = c(fe, E, ne)),
            q === null ? (Y = fe) : (q.sibling = fe),
            (q = fe)));
      }
      return (
        e &&
          J.forEach(function (t0) {
            return t(M, t0);
          }),
        ke && Ln(M, ne),
        Y
      );
    }
    function Me(M, E, L, B) {
      if (
        (typeof L === 'object' &&
          L !== null &&
          L.type === re &&
          L.key === null &&
          (L = L.props.children),
        typeof L === 'object' && L !== null)
      ) {
        switch (L.$$typeof) {
          case $:
            e: {
              for (var Y = L.key, q = E; q !== null; ) {
                if (q.key === Y) {
                  if (((Y = L.type), Y === re)) {
                    if (q.tag === 7) {
                      (i(M, q.sibling),
                        (E = u(q, L.props.children)),
                        (E.return = M),
                        (M = E));
                      break e;
                    }
                  } else if (
                    q.elementType === Y ||
                    (typeof Y === 'object' &&
                      Y !== null &&
                      Y.$$typeof === Ze &&
                      pd(Y) === q.type)
                  ) {
                    (i(M, q.sibling),
                      (E = u(q, L.props)),
                      (E.ref = ri(M, q, L)),
                      (E.return = M),
                      (M = E));
                    break e;
                  }
                  i(M, q);
                  break;
                } else {
                  t(M, q);
                }
                q = q.sibling;
              }
              L.type === re
                ? ((E = Bn(L.props.children, M.mode, B, L.key)),
                  (E.return = M),
                  (M = E))
                : ((B = $s(L.type, L.key, L.props, null, M.mode, B)),
                  (B.ref = ri(M, E, L)),
                  (B.return = M),
                  (M = B));
            }
            return g(M);
          case te:
            e: {
              for (q = L.key; E !== null; ) {
                if (E.key === q) {
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === L.containerInfo &&
                    E.stateNode.implementation === L.implementation
                  ) {
                    (i(M, E.sibling),
                      (E = u(E, L.children || [])),
                      (E.return = M),
                      (M = E));
                    break e;
                  } else {
                    i(M, E);
                    break;
                  }
                } else {
                  t(M, E);
                }
                E = E.sibling;
              }
              ((E = dl(L, M.mode, B)), (E.return = M), (M = E));
            }
            return g(M);
          case Ze:
            return ((q = L._init), Me(M, E, q(L._payload), B));
        }
        if (Lr(L)) {
          return G(M, E, L, B);
        }
        if (Z(L)) {
          return Q(M, E, L, B);
        }
        vs(M, L);
      }
      return (typeof L === 'string' && L !== '') || typeof L === 'number'
        ? ((L = '' + L),
          E !== null && E.tag === 6
            ? (i(M, E.sibling), (E = u(E, L)), (E.return = M), (M = E))
            : (i(M, E), (E = cl(L, M.mode, B)), (E.return = M), (M = E)),
          g(M))
        : i(M, E);
    }
    return Me;
  }
  let lr = md(!0),
    gd = md(!1),
    xs = dn(null),
    ws = null,
    ur = null,
    wa = null;
  function Sa() {
    wa = ur = ws = null;
  }
  function ka(e) {
    const t = xs.current;
    (xe(xs), (e._currentValue = t));
  }
  function Ca(e, t, i) {
    for (; e !== null; ) {
      const o = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), o !== null && (o.childLanes |= t))
          : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t),
        e === i)
      ) {
        break;
      }
      e = e.return;
    }
  }
  function cr(e, t) {
    ((ws = e),
      (wa = ur = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (rt = !0), (e.firstContext = null)));
  }
  function vt(e) {
    const t = e._currentValue;
    if (wa !== e) {
      if (((e = { context: e, memoizedValue: t, next: null }), ur === null)) {
        if (ws === null) {
          throw Error(s(308));
        }
        ((ur = e), (ws.dependencies = { lanes: 0, firstContext: e }));
      } else {
        ur = ur.next = e;
      }
    }
    return t;
  }
  let Dn = null;
  function Ta(e) {
    Dn === null ? (Dn = [e]) : Dn.push(e);
  }
  function yd(e, t, i, o) {
    const u = t.interleaved;
    return (
      u === null ? ((i.next = i), Ta(t)) : ((i.next = u.next), (u.next = i)),
      (t.interleaved = i),
      Qt(e, o)
    );
  }
  function Qt(e, t) {
    e.lanes |= t;
    let i = e.alternate;
    for (i !== null && (i.lanes |= t), i = e, e = e.return; e !== null; ) {
      ((e.childLanes |= t),
        (i = e.alternate),
        i !== null && (i.childLanes |= t),
        (i = e),
        (e = e.return));
    }
    return i.tag === 3 ? i.stateNode : null;
  }
  let pn = !1;
  function Pa(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function vd(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Yt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function mn(e, t, i) {
    let o = e.updateQueue;
    if (o === null) {
      return null;
    }
    if (((o = o.shared), ue & 2)) {
      var u = o.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (o.pending = t),
        Qt(e, i)
      );
    }
    return (
      (u = o.interleaved),
      u === null ? ((t.next = t), Ta(o)) : ((t.next = u.next), (u.next = t)),
      (o.interleaved = t),
      Qt(e, i)
    );
  }
  function Ss(e, t, i) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (i & 4194240) !== 0))
    ) {
      let o = t.lanes;
      ((o &= e.pendingLanes), (i |= o), (t.lanes = i), zo(e, i));
    }
  }
  function xd(e, t) {
    let i = e.updateQueue,
      o = e.alternate;
    if (o !== null && ((o = o.updateQueue), i === o)) {
      let u = null,
        c = null;
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          const g = {
            eventTime: i.eventTime,
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          };
          (c === null ? (u = c = g) : (c = c.next = g), (i = i.next));
        } while (i !== null);
        c === null ? (u = c = t) : (c = c.next = t);
      } else {
        u = c = t;
      }
      ((i = {
        baseState: o.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: o.shared,
        effects: o.effects,
      }),
        (e.updateQueue = i));
      return;
    }
    ((e = i.lastBaseUpdate),
      e === null ? (i.firstBaseUpdate = t) : (e.next = t),
      (i.lastBaseUpdate = t));
  }
  function ks(e, t, i, o) {
    let u = e.updateQueue;
    pn = !1;
    let c = u.firstBaseUpdate,
      g = u.lastBaseUpdate,
      S = u.shared.pending;
    if (S !== null) {
      u.shared.pending = null;
      var k = S,
        D = k.next;
      ((k.next = null), g === null ? (c = D) : (g.next = D), (g = k));
      var O = e.alternate;
      O !== null &&
        ((O = O.updateQueue),
        (S = O.lastBaseUpdate),
        S !== g &&
          (S === null ? (O.firstBaseUpdate = D) : (S.next = D),
          (O.lastBaseUpdate = k)));
    }
    if (c !== null) {
      let z = u.baseState;
      ((g = 0), (O = D = k = null), (S = c));
      do {
        let F = S.lane,
          b = S.eventTime;
        if ((o & F) === F) {
          O !== null &&
            (O = O.next =
              {
                eventTime: b,
                lane: 0,
                tag: S.tag,
                payload: S.payload,
                callback: S.callback,
                next: null,
              });
          e: {
            let G = e,
              Q = S;
            switch (((F = t), (b = i), Q.tag)) {
              case 1:
                if (((G = Q.payload), typeof G === 'function')) {
                  z = G.call(b, z, F);
                  break e;
                }
                z = G;
                break e;
              case 3:
                G.flags = (G.flags & -65537) | 128;
              case 0:
                if (
                  ((G = Q.payload),
                  (F = typeof G === 'function' ? G.call(b, z, F) : G),
                  F == null)
                ) {
                  break e;
                }
                z = W({}, z, F);
                break e;
              case 2:
                pn = !0;
            }
          }
          S.callback !== null &&
            S.lane !== 0 &&
            ((e.flags |= 64),
            (F = u.effects),
            F === null ? (u.effects = [S]) : F.push(S));
        } else {
          ((b = {
            eventTime: b,
            lane: F,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null,
          }),
            O === null ? ((D = O = b), (k = z)) : (O = O.next = b),
            (g |= F));
        }
        if (((S = S.next), S === null)) {
          if (((S = u.shared.pending), S === null)) {
            break;
          }
          ((F = S),
            (S = F.next),
            (F.next = null),
            (u.lastBaseUpdate = F),
            (u.shared.pending = null));
        }
      } while (!0);
      if (
        (O === null && (k = z),
        (u.baseState = k),
        (u.firstBaseUpdate = D),
        (u.lastBaseUpdate = O),
        (t = u.shared.interleaved),
        t !== null)
      ) {
        u = t;
        do {
          ((g |= u.lane), (u = u.next));
        } while (u !== t);
      } else {
        c === null && (u.shared.lanes = 0);
      }
      ((Fn |= g), (e.lanes = g), (e.memoizedState = z));
    }
  }
  function wd(e, t, i) {
    if (((e = t.effects), (t.effects = null), e !== null)) {
      for (t = 0; t < e.length; t++) {
        let o = e[t],
          u = o.callback;
        if (u !== null) {
          if (((o.callback = null), (o = i), typeof u !== 'function')) {
            throw Error(s(191, u));
          }
          u.call(o);
        }
      }
    }
  }
  const ii = {},
    Ot = dn(ii),
    si = dn(ii),
    oi = dn(ii);
  function _n(e) {
    if (e === ii) {
      throw Error(s(174));
    }
    return e;
  }
  function Ea(e, t) {
    switch ((ye(oi, t), ye(si, e), ye(Ot, ii), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : No(null, '');
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = No(t, e)));
    }
    (xe(Ot), ye(Ot, t));
  }
  function dr() {
    (xe(Ot), xe(si), xe(oi));
  }
  function Sd(e) {
    _n(oi.current);
    const t = _n(Ot.current),
      i = No(t, e.type);
    t !== i && (ye(si, e), ye(Ot, i));
  }
  function Na(e) {
    si.current === e && (xe(Ot), xe(si));
  }
  const Te = dn(0);
  function Cs(e) {
    for (let t = e; t !== null; ) {
      if (t.tag === 13) {
        let i = t.memoizedState;
        if (
          i !== null &&
          ((i = i.dehydrated), i === null || i.data === '$?' || i.data === '$!')
        ) {
          return t;
        }
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) {
          return t;
        }
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) {
        break;
      }
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) {
          return null;
        }
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  const ja = [];
  function Ra() {
    for (let e = 0; e < ja.length; e++) {
      ja[e]._workInProgressVersionPrimary = null;
    }
    ja.length = 0;
  }
  let Ts = H.ReactCurrentDispatcher,
    Ma = H.ReactCurrentBatchConfig,
    Vn = 0,
    Pe = null,
    De = null,
    Ie = null,
    Ps = !1,
    ai = !1,
    li = 0,
    Ty = 0;
  function He() {
    throw Error(s(321));
  }
  function Aa(e, t) {
    if (t === null) {
      return !1;
    }
    for (let i = 0; i < t.length && i < e.length; i++) {
      if (!Et(e[i], t[i])) {
        return !1;
      }
    }
    return !0;
  }
  function La(e, t, i, o, u, c) {
    if (
      ((Vn = c),
      (Pe = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Ts.current = e === null || e.memoizedState === null ? jy : Ry),
      (e = i(o, u)),
      ai)
    ) {
      c = 0;
      do {
        if (((ai = !1), (li = 0), 25 <= c)) {
          throw Error(s(301));
        }
        ((c += 1),
          (Ie = De = null),
          (t.updateQueue = null),
          (Ts.current = My),
          (e = i(o, u)));
      } while (ai);
    }
    if (
      ((Ts.current = js),
      (t = De !== null && De.next !== null),
      (Vn = 0),
      (Ie = De = Pe = null),
      (Ps = !1),
      t)
    ) {
      throw Error(s(300));
    }
    return e;
  }
  function Da() {
    const e = li !== 0;
    return ((li = 0), e);
  }
  function zt() {
    const e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Ie === null ? (Pe.memoizedState = Ie = e) : (Ie = Ie.next = e), Ie);
  }
  function xt() {
    if (De === null) {
      var e = Pe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else {
      e = De.next;
    }
    const t = Ie === null ? Pe.memoizedState : Ie.next;
    if (t !== null) {
      ((Ie = t), (De = e));
    } else {
      if (e === null) {
        throw Error(s(310));
      }
      ((De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        Ie === null ? (Pe.memoizedState = Ie = e) : (Ie = Ie.next = e));
    }
    return Ie;
  }
  function ui(e, t) {
    return typeof t === 'function' ? t(e) : t;
  }
  function _a(e) {
    const t = xt(),
      i = t.queue;
    if (i === null) {
      throw Error(s(311));
    }
    i.lastRenderedReducer = e;
    let o = De,
      u = o.baseQueue,
      c = i.pending;
    if (c !== null) {
      if (u !== null) {
        var g = u.next;
        ((u.next = c.next), (c.next = g));
      }
      ((o.baseQueue = u = c), (i.pending = null));
    }
    if (u !== null) {
      ((c = u.next), (o = o.baseState));
      let S = (g = null),
        k = null,
        D = c;
      do {
        const O = D.lane;
        if ((Vn & O) === O) {
          (k !== null &&
            (k = k.next =
              {
                lane: 0,
                action: D.action,
                hasEagerState: D.hasEagerState,
                eagerState: D.eagerState,
                next: null,
              }),
            (o = D.hasEagerState ? D.eagerState : e(o, D.action)));
        } else {
          const z = {
            lane: O,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          };
          (k === null ? ((S = k = z), (g = o)) : (k = k.next = z),
            (Pe.lanes |= O),
            (Fn |= O));
        }
        D = D.next;
      } while (D !== null && D !== c);
      (k === null ? (g = o) : (k.next = S),
        Et(o, t.memoizedState) || (rt = !0),
        (t.memoizedState = o),
        (t.baseState = g),
        (t.baseQueue = k),
        (i.lastRenderedState = o));
    }
    if (((e = i.interleaved), e !== null)) {
      u = e;
      do {
        ((c = u.lane), (Pe.lanes |= c), (Fn |= c), (u = u.next));
      } while (u !== e);
    } else {
      u === null && (i.lanes = 0);
    }
    return [t.memoizedState, i.dispatch];
  }
  function Va(e) {
    const t = xt(),
      i = t.queue;
    if (i === null) {
      throw Error(s(311));
    }
    i.lastRenderedReducer = e;
    let o = i.dispatch,
      u = i.pending,
      c = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      let g = (u = u.next);
      do {
        ((c = e(c, g.action)), (g = g.next));
      } while (g !== u);
      (Et(c, t.memoizedState) || (rt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (i.lastRenderedState = c));
    }
    return [c, o];
  }
  function kd() {}
  function Cd(e, t) {
    let i = Pe,
      o = xt(),
      u = t(),
      c = !Et(o.memoizedState, u);
    if (
      (c && ((o.memoizedState = u), (rt = !0)),
      (o = o.queue),
      Fa(Ed.bind(null, i, o, e), [e]),
      o.getSnapshot !== t || c || (Ie !== null && Ie.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        ci(9, Pd.bind(null, i, o, u, t), void 0, null),
        Oe === null)
      ) {
        throw Error(s(349));
      }
      Vn & 30 || Td(i, t, u);
    }
    return u;
  }
  function Td(e, t, i) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: i }),
      (t = Pe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Pe.updateQueue = t),
          (t.stores = [e]))
        : ((i = t.stores), i === null ? (t.stores = [e]) : i.push(e)));
  }
  function Pd(e, t, i, o) {
    ((t.value = i), (t.getSnapshot = o), Nd(t) && jd(e));
  }
  function Ed(e, t, i) {
    return i(function () {
      Nd(t) && jd(e);
    });
  }
  function Nd(e) {
    const t = e.getSnapshot;
    e = e.value;
    try {
      const i = t();
      return !Et(e, i);
    } catch {
      return !0;
    }
  }
  function jd(e) {
    const t = Qt(e, 1);
    t !== null && At(t, e, 1, -1);
  }
  function Rd(e) {
    const t = zt();
    return (
      typeof e === 'function' && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ui,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Ny.bind(null, Pe, e)),
      [t.memoizedState, e]
    );
  }
  function ci(e, t, i, o) {
    return (
      (e = { tag: e, create: t, destroy: i, deps: o, next: null }),
      (t = Pe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Pe.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((i = t.lastEffect),
          i === null
            ? (t.lastEffect = e.next = e)
            : ((o = i.next), (i.next = e), (e.next = o), (t.lastEffect = e))),
      e
    );
  }
  function Md() {
    return xt().memoizedState;
  }
  function Es(e, t, i, o) {
    const u = zt();
    ((Pe.flags |= e),
      (u.memoizedState = ci(1 | t, i, void 0, o === void 0 ? null : o)));
  }
  function Ns(e, t, i, o) {
    const u = xt();
    o = o === void 0 ? null : o;
    let c = void 0;
    if (De !== null) {
      const g = De.memoizedState;
      if (((c = g.destroy), o !== null && Aa(o, g.deps))) {
        u.memoizedState = ci(t, i, c, o);
        return;
      }
    }
    ((Pe.flags |= e), (u.memoizedState = ci(1 | t, i, c, o)));
  }
  function Ad(e, t) {
    return Es(8390656, 8, e, t);
  }
  function Fa(e, t) {
    return Ns(2048, 8, e, t);
  }
  function Ld(e, t) {
    return Ns(4, 2, e, t);
  }
  function Dd(e, t) {
    return Ns(4, 4, e, t);
  }
  function _d(e, t) {
    if (typeof t === 'function') {
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    }
    if (t != null) {
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
    }
  }
  function Vd(e, t, i) {
    return (
      (i = i != null ? i.concat([e]) : null),
      Ns(4, 4, _d.bind(null, t, e), i)
    );
  }
  function Ia() {}
  function Fd(e, t) {
    const i = xt();
    t = t === void 0 ? null : t;
    const o = i.memoizedState;
    return o !== null && t !== null && Aa(t, o[1])
      ? o[0]
      : ((i.memoizedState = [e, t]), e);
  }
  function Id(e, t) {
    const i = xt();
    t = t === void 0 ? null : t;
    const o = i.memoizedState;
    return o !== null && t !== null && Aa(t, o[1])
      ? o[0]
      : ((e = e()), (i.memoizedState = [e, t]), e);
  }
  function Od(e, t, i) {
    return Vn & 21
      ? (Et(i, t) ||
          ((i = pc()), (Pe.lanes |= i), (Fn |= i), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), (rt = !0)), (e.memoizedState = i));
  }
  function Py(e, t) {
    const i = me;
    ((me = i !== 0 && 4 > i ? i : 4), e(!0));
    const o = Ma.transition;
    Ma.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((me = i), (Ma.transition = o));
    }
  }
  function zd() {
    return xt().memoizedState;
  }
  function Ey(e, t, i) {
    const o = xn(e);
    if (
      ((i = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Bd(e))
    ) {
      Ud(t, i);
    } else if (((i = yd(e, t, i, o)), i !== null)) {
      const u = Je();
      (At(i, e, o, u), $d(i, t, o));
    }
  }
  function Ny(e, t, i) {
    let o = xn(e),
      u = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Bd(e)) {
      Ud(t, u);
    } else {
      let c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      ) {
        try {
          const g = t.lastRenderedState,
            S = c(g, i);
          if (((u.hasEagerState = !0), (u.eagerState = S), Et(S, g))) {
            const k = t.interleaved;
            (k === null
              ? ((u.next = u), Ta(t))
              : ((u.next = k.next), (k.next = u)),
              (t.interleaved = u));
            return;
          }
        } catch {
        } finally {
        }
      }
      ((i = yd(e, t, u, o)),
        i !== null && ((u = Je()), At(i, e, o, u), $d(i, t, o)));
    }
  }
  function Bd(e) {
    const t = e.alternate;
    return e === Pe || (t !== null && t === Pe);
  }
  function Ud(e, t) {
    ai = Ps = !0;
    const i = e.pending;
    (i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (e.pending = t));
  }
  function $d(e, t, i) {
    if (i & 4194240) {
      let o = t.lanes;
      ((o &= e.pendingLanes), (i |= o), (t.lanes = i), zo(e, i));
    }
  }
  var js = {
      readContext: vt,
      useCallback: He,
      useContext: He,
      useEffect: He,
      useImperativeHandle: He,
      useInsertionEffect: He,
      useLayoutEffect: He,
      useMemo: He,
      useReducer: He,
      useRef: He,
      useState: He,
      useDebugValue: He,
      useDeferredValue: He,
      useTransition: He,
      useMutableSource: He,
      useSyncExternalStore: He,
      useId: He,
      unstable_isNewReconciler: !1,
    },
    jy = {
      readContext: vt,
      useCallback: function (e, t) {
        return ((zt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: vt,
      useEffect: Ad,
      useImperativeHandle: function (e, t, i) {
        return (
          (i = i != null ? i.concat([e]) : null),
          Es(4194308, 4, _d.bind(null, t, e), i)
        );
      },
      useLayoutEffect: function (e, t) {
        return Es(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Es(4, 2, e, t);
      },
      useMemo: function (e, t) {
        const i = zt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (i.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, i) {
        const o = zt();
        return (
          (t = i !== void 0 ? i(t) : t),
          (o.memoizedState = o.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (o.queue = e),
          (e = e.dispatch = Ey.bind(null, Pe, e)),
          [o.memoizedState, e]
        );
      },
      useRef: function (e) {
        const t = zt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: Rd,
      useDebugValue: Ia,
      useDeferredValue: function (e) {
        return (zt().memoizedState = e);
      },
      useTransition: function () {
        let e = Rd(!1),
          t = e[0];
        return ((e = Py.bind(null, e[1])), (zt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, i) {
        const o = Pe,
          u = zt();
        if (ke) {
          if (i === void 0) {
            throw Error(s(407));
          }
          i = i();
        } else {
          if (((i = t()), Oe === null)) {
            throw Error(s(349));
          }
          Vn & 30 || Td(o, t, i);
        }
        u.memoizedState = i;
        const c = { value: i, getSnapshot: t };
        return (
          (u.queue = c),
          Ad(Ed.bind(null, o, c, e), [e]),
          (o.flags |= 2048),
          ci(9, Pd.bind(null, o, c, i, t), void 0, null),
          i
        );
      },
      useId: function () {
        let e = zt(),
          t = Oe.identifierPrefix;
        if (ke) {
          var i = Gt,
            o = Kt;
          ((i = (o & ~(1 << (32 - Pt(o) - 1))).toString(32) + i),
            (t = ':' + t + 'R' + i),
            (i = li++),
            0 < i && (t += 'H' + i.toString(32)),
            (t += ':'));
        } else {
          ((i = Ty++), (t = ':' + t + 'r' + i.toString(32) + ':'));
        }
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Ry = {
      readContext: vt,
      useCallback: Fd,
      useContext: vt,
      useEffect: Fa,
      useImperativeHandle: Vd,
      useInsertionEffect: Ld,
      useLayoutEffect: Dd,
      useMemo: Id,
      useReducer: _a,
      useRef: Md,
      useState: function () {
        return _a(ui);
      },
      useDebugValue: Ia,
      useDeferredValue: function (e) {
        const t = xt();
        return Od(t, De.memoizedState, e);
      },
      useTransition: function () {
        const e = _a(ui)[0],
          t = xt().memoizedState;
        return [e, t];
      },
      useMutableSource: kd,
      useSyncExternalStore: Cd,
      useId: zd,
      unstable_isNewReconciler: !1,
    },
    My = {
      readContext: vt,
      useCallback: Fd,
      useContext: vt,
      useEffect: Fa,
      useImperativeHandle: Vd,
      useInsertionEffect: Ld,
      useLayoutEffect: Dd,
      useMemo: Id,
      useReducer: Va,
      useRef: Md,
      useState: function () {
        return Va(ui);
      },
      useDebugValue: Ia,
      useDeferredValue: function (e) {
        const t = xt();
        return De === null ? (t.memoizedState = e) : Od(t, De.memoizedState, e);
      },
      useTransition: function () {
        const e = Va(ui)[0],
          t = xt().memoizedState;
        return [e, t];
      },
      useMutableSource: kd,
      useSyncExternalStore: Cd,
      useId: zd,
      unstable_isNewReconciler: !1,
    };
  function jt(e, t) {
    if (e && e.defaultProps) {
      ((t = W({}, t)), (e = e.defaultProps));
      for (const i in e) {
        t[i] === void 0 && (t[i] = e[i]);
      }
      return t;
    }
    return t;
  }
  function Oa(e, t, i, o) {
    ((t = e.memoizedState),
      (i = i(o, t)),
      (i = i == null ? t : W({}, t, i)),
      (e.memoizedState = i),
      e.lanes === 0 && (e.updateQueue.baseState = i));
  }
  const Rs = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? jn(e) === e : !1;
    },
    enqueueSetState: function (e, t, i) {
      e = e._reactInternals;
      const o = Je(),
        u = xn(e),
        c = Yt(o, u);
      ((c.payload = t),
        i != null && (c.callback = i),
        (t = mn(e, c, u)),
        t !== null && (At(t, e, u, o), Ss(t, e, u)));
    },
    enqueueReplaceState: function (e, t, i) {
      e = e._reactInternals;
      const o = Je(),
        u = xn(e),
        c = Yt(o, u);
      ((c.tag = 1),
        (c.payload = t),
        i != null && (c.callback = i),
        (t = mn(e, c, u)),
        t !== null && (At(t, e, u, o), Ss(t, e, u)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      const i = Je(),
        o = xn(e),
        u = Yt(i, o);
      ((u.tag = 2),
        t != null && (u.callback = t),
        (t = mn(e, u, o)),
        t !== null && (At(t, e, o, i), Ss(t, e, o)));
    },
  };
  function bd(e, t, i, o, u, c, g) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate === 'function'
        ? e.shouldComponentUpdate(o, c, g)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Xr(i, o) || !Xr(u, c)
          : !0
    );
  }
  function Wd(e, t, i) {
    let o = !1,
      u = fn,
      c = t.contextType;
    return (
      typeof c === 'object' && c !== null
        ? (c = vt(c))
        : ((u = nt(t) ? Mn : We.current),
          (o = t.contextTypes),
          (c = (o = o != null) ? ir(e, u) : fn)),
      (t = new t(i, c)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Rs),
      (e.stateNode = t),
      (t._reactInternals = e),
      o &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = u),
        (e.__reactInternalMemoizedMaskedChildContext = c)),
      t
    );
  }
  function Hd(e, t, i, o) {
    ((e = t.state),
      typeof t.componentWillReceiveProps === 'function' &&
        t.componentWillReceiveProps(i, o),
      typeof t.UNSAFE_componentWillReceiveProps === 'function' &&
        t.UNSAFE_componentWillReceiveProps(i, o),
      t.state !== e && Rs.enqueueReplaceState(t, t.state, null));
  }
  function za(e, t, i, o) {
    const u = e.stateNode;
    ((u.props = i), (u.state = e.memoizedState), (u.refs = {}), Pa(e));
    let c = t.contextType;
    (typeof c === 'object' && c !== null
      ? (u.context = vt(c))
      : ((c = nt(t) ? Mn : We.current), (u.context = ir(e, c))),
      (u.state = e.memoizedState),
      (c = t.getDerivedStateFromProps),
      typeof c === 'function' && (Oa(e, t, c, i), (u.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps === 'function' ||
        typeof u.getSnapshotBeforeUpdate === 'function' ||
        (typeof u.UNSAFE_componentWillMount !== 'function' &&
          typeof u.componentWillMount !== 'function') ||
        ((t = u.state),
        typeof u.componentWillMount === 'function' && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount === 'function' &&
          u.UNSAFE_componentWillMount(),
        t !== u.state && Rs.enqueueReplaceState(u, u.state, null),
        ks(e, i, u, o),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount === 'function' && (e.flags |= 4194308));
  }
  function fr(e, t) {
    try {
      let i = '',
        o = t;
      do {
        ((i += ce(o)), (o = o.return));
      } while (o);
      var u = i;
    } catch (c) {
      u =
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack;
    }
    return { value: e, source: t, stack: u, digest: null };
  }
  function Ba(e, t, i) {
    return { value: e, source: null, stack: i ?? null, digest: t ?? null };
  }
  function Ua(e, t) {
    try {
      console.error(t.value);
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  const Ay = typeof WeakMap === 'function' ? WeakMap : Map;
  function Kd(e, t, i) {
    ((i = Yt(-1, i)), (i.tag = 3), (i.payload = { element: null }));
    const o = t.value;
    return (
      (i.callback = function () {
        (Fs || ((Fs = !0), (nl = o)), Ua(e, t));
      }),
      i
    );
  }
  function Gd(e, t, i) {
    ((i = Yt(-1, i)), (i.tag = 3));
    const o = e.type.getDerivedStateFromError;
    if (typeof o === 'function') {
      const u = t.value;
      ((i.payload = function () {
        return o(u);
      }),
        (i.callback = function () {
          Ua(e, t);
        }));
    }
    const c = e.stateNode;
    return (
      c !== null &&
        typeof c.componentDidCatch === 'function' &&
        (i.callback = function () {
          (Ua(e, t),
            typeof o !== 'function' &&
              (yn === null ? (yn = new Set([this])) : yn.add(this)));
          const g = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: g !== null ? g : '',
          });
        }),
      i
    );
  }
  function Qd(e, t, i) {
    let o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Ay();
      var u = new Set();
      o.set(t, u);
    } else {
      ((u = o.get(t)), u === void 0 && ((u = new Set()), o.set(t, u)));
    }
    u.has(i) || (u.add(i), (e = Hy.bind(null, e, t, i)), t.then(e, e));
  }
  function Yd(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      ) {
        return e;
      }
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Xd(e, t, i, o, u) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = u), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (i.flags |= 131072),
            (i.flags &= -52805),
            i.tag === 1 &&
              (i.alternate === null
                ? (i.tag = 17)
                : ((t = Yt(-1, 1)), (t.tag = 2), mn(i, t, 1))),
            (i.lanes |= 1)),
        e);
  }
  var Ly = H.ReactCurrentOwner,
    rt = !1;
  function qe(e, t, i, o) {
    t.child = e === null ? gd(t, null, i, o) : lr(t, e.child, i, o);
  }
  function Zd(e, t, i, o, u) {
    i = i.render;
    const c = t.ref;
    return (
      cr(t, u),
      (o = La(e, t, i, o, c, u)),
      (i = Da()),
      e !== null && !rt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          Xt(e, t, u))
        : (ke && i && ma(t), (t.flags |= 1), qe(e, t, o, u), t.child)
    );
  }
  function qd(e, t, i, o, u) {
    if (e === null) {
      var c = i.type;
      return typeof c === 'function' &&
        !ul(c) &&
        c.defaultProps === void 0 &&
        i.compare === null &&
        i.defaultProps === void 0
        ? ((t.tag = 15), (t.type = c), Jd(e, t, c, o, u))
        : ((e = $s(i.type, null, o, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !(e.lanes & u))) {
      const g = c.memoizedProps;
      if (
        ((i = i.compare), (i = i !== null ? i : Xr), i(g, o) && e.ref === t.ref)
      ) {
        return Xt(e, t, u);
      }
    }
    return (
      (t.flags |= 1),
      (e = Sn(c, o)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Jd(e, t, i, o, u) {
    if (e !== null) {
      const c = e.memoizedProps;
      if (Xr(c, o) && e.ref === t.ref) {
        if (((rt = !1), (t.pendingProps = o = c), (e.lanes & u) !== 0)) {
          e.flags & 131072 && (rt = !0);
        } else {
          return ((t.lanes = e.lanes), Xt(e, t, u));
        }
      }
    }
    return $a(e, t, i, o, u);
  }
  function ef(e, t, i) {
    let o = t.pendingProps,
      u = o.children,
      c = e !== null ? e.memoizedState : null;
    if (o.mode === 'hidden') {
      if (!(t.mode & 1)) {
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ye(pr, ht),
          (ht |= i));
      } else {
        if (!(i & 1073741824)) {
          return (
            (e = c !== null ? c.baseLanes | i : i),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ye(pr, ht),
            (ht |= e),
            null
          );
        }
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (o = c !== null ? c.baseLanes : i),
          ye(pr, ht),
          (ht |= o));
      }
    } else {
      (c !== null ? ((o = c.baseLanes | i), (t.memoizedState = null)) : (o = i),
        ye(pr, ht),
        (ht |= o));
    }
    return (qe(e, t, u, i), t.child);
  }
  function tf(e, t) {
    const i = t.ref;
    ((e === null && i !== null) || (e !== null && e.ref !== i)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function $a(e, t, i, o, u) {
    let c = nt(i) ? Mn : We.current;
    return (
      (c = ir(t, c)),
      cr(t, u),
      (i = La(e, t, i, o, c, u)),
      (o = Da()),
      e !== null && !rt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          Xt(e, t, u))
        : (ke && o && ma(t), (t.flags |= 1), qe(e, t, i, u), t.child)
    );
  }
  function nf(e, t, i, o, u) {
    if (nt(i)) {
      var c = !0;
      hs(t);
    } else {
      c = !1;
    }
    if ((cr(t, u), t.stateNode === null)) {
      (As(e, t), Wd(t, i, o), za(t, i, o, u), (o = !0));
    } else if (e === null) {
      var g = t.stateNode,
        S = t.memoizedProps;
      g.props = S;
      var k = g.context,
        D = i.contextType;
      typeof D === 'object' && D !== null
        ? (D = vt(D))
        : ((D = nt(i) ? Mn : We.current), (D = ir(t, D)));
      var O = i.getDerivedStateFromProps,
        z =
          typeof O === 'function' ||
          typeof g.getSnapshotBeforeUpdate === 'function';
      (z ||
        (typeof g.UNSAFE_componentWillReceiveProps !== 'function' &&
          typeof g.componentWillReceiveProps !== 'function') ||
        ((S !== o || k !== D) && Hd(t, g, o, D)),
        (pn = !1));
      var F = t.memoizedState;
      ((g.state = F),
        ks(t, o, g, u),
        (k = t.memoizedState),
        S !== o || F !== k || tt.current || pn
          ? (typeof O === 'function' && (Oa(t, i, O, o), (k = t.memoizedState)),
            (S = pn || bd(t, i, S, o, F, k, D))
              ? (z ||
                  (typeof g.UNSAFE_componentWillMount !== 'function' &&
                    typeof g.componentWillMount !== 'function') ||
                  (typeof g.componentWillMount === 'function' &&
                    g.componentWillMount(),
                  typeof g.UNSAFE_componentWillMount === 'function' &&
                    g.UNSAFE_componentWillMount()),
                typeof g.componentDidMount === 'function' &&
                  (t.flags |= 4194308))
              : (typeof g.componentDidMount === 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = o),
                (t.memoizedState = k)),
            (g.props = o),
            (g.state = k),
            (g.context = D),
            (o = S))
          : (typeof g.componentDidMount === 'function' && (t.flags |= 4194308),
            (o = !1)));
    } else {
      ((g = t.stateNode),
        vd(e, t),
        (S = t.memoizedProps),
        (D = t.type === t.elementType ? S : jt(t.type, S)),
        (g.props = D),
        (z = t.pendingProps),
        (F = g.context),
        (k = i.contextType),
        typeof k === 'object' && k !== null
          ? (k = vt(k))
          : ((k = nt(i) ? Mn : We.current), (k = ir(t, k))));
      const b = i.getDerivedStateFromProps;
      ((O =
        typeof b === 'function' ||
        typeof g.getSnapshotBeforeUpdate === 'function') ||
        (typeof g.UNSAFE_componentWillReceiveProps !== 'function' &&
          typeof g.componentWillReceiveProps !== 'function') ||
        ((S !== z || F !== k) && Hd(t, g, o, k)),
        (pn = !1),
        (F = t.memoizedState),
        (g.state = F),
        ks(t, o, g, u));
      let G = t.memoizedState;
      S !== z || F !== G || tt.current || pn
        ? (typeof b === 'function' && (Oa(t, i, b, o), (G = t.memoizedState)),
          (D = pn || bd(t, i, D, o, F, G, k) || !1)
            ? (O ||
                (typeof g.UNSAFE_componentWillUpdate !== 'function' &&
                  typeof g.componentWillUpdate !== 'function') ||
                (typeof g.componentWillUpdate === 'function' &&
                  g.componentWillUpdate(o, G, k),
                typeof g.UNSAFE_componentWillUpdate === 'function' &&
                  g.UNSAFE_componentWillUpdate(o, G, k)),
              typeof g.componentDidUpdate === 'function' && (t.flags |= 4),
              typeof g.getSnapshotBeforeUpdate === 'function' &&
                (t.flags |= 1024))
            : (typeof g.componentDidUpdate !== 'function' ||
                (S === e.memoizedProps && F === e.memoizedState) ||
                (t.flags |= 4),
              typeof g.getSnapshotBeforeUpdate !== 'function' ||
                (S === e.memoizedProps && F === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = o),
              (t.memoizedState = G)),
          (g.props = o),
          (g.state = G),
          (g.context = k),
          (o = D))
        : (typeof g.componentDidUpdate !== 'function' ||
            (S === e.memoizedProps && F === e.memoizedState) ||
            (t.flags |= 4),
          typeof g.getSnapshotBeforeUpdate !== 'function' ||
            (S === e.memoizedProps && F === e.memoizedState) ||
            (t.flags |= 1024),
          (o = !1));
    }
    return ba(e, t, i, o, c, u);
  }
  function ba(e, t, i, o, u, c) {
    tf(e, t);
    const g = (t.flags & 128) !== 0;
    if (!o && !g) {
      return (u && ad(t, i, !1), Xt(e, t, c));
    }
    ((o = t.stateNode), (Ly.current = t));
    const S =
      g && typeof i.getDerivedStateFromError !== 'function' ? null : o.render();
    return (
      (t.flags |= 1),
      e !== null && g
        ? ((t.child = lr(t, e.child, null, c)), (t.child = lr(t, null, S, c)))
        : qe(e, t, S, c),
      (t.memoizedState = o.state),
      u && ad(t, i, !0),
      t.child
    );
  }
  function rf(e) {
    const t = e.stateNode;
    (t.pendingContext
      ? sd(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && sd(e, t.context, !1),
      Ea(e, t.containerInfo));
  }
  function sf(e, t, i, o, u) {
    return (ar(), xa(u), (t.flags |= 256), qe(e, t, i, o), t.child);
  }
  const Wa = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ha(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function of(e, t, i) {
    let o = t.pendingProps,
      u = Te.current,
      c = !1,
      g = (t.flags & 128) !== 0,
      S;
    if (
      ((S = g) ||
        (S = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0),
      S
        ? ((c = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (u |= 1),
      ye(Te, u & 1),
      e === null)
    ) {
      return (
        va(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === '$!'
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((g = o.children),
            (e = o.fallback),
            c
              ? ((o = t.mode),
                (c = t.child),
                (g = { mode: 'hidden', children: g }),
                !(o & 1) && c !== null
                  ? ((c.childLanes = 0), (c.pendingProps = g))
                  : (c = bs(g, o, 0, null)),
                (e = Bn(e, o, i, null)),
                (c.return = t),
                (e.return = t),
                (c.sibling = e),
                (t.child = c),
                (t.child.memoizedState = Ha(i)),
                (t.memoizedState = Wa),
                e)
              : Ka(t, g))
      );
    }
    if (
      ((u = e.memoizedState), u !== null && ((S = u.dehydrated), S !== null))
    ) {
      return Dy(e, t, g, o, S, u, i);
    }
    if (c) {
      ((c = o.fallback), (g = t.mode), (u = e.child), (S = u.sibling));
      const k = { mode: 'hidden', children: o.children };
      return (
        !(g & 1) && t.child !== u
          ? ((o = t.child),
            (o.childLanes = 0),
            (o.pendingProps = k),
            (t.deletions = null))
          : ((o = Sn(u, k)), (o.subtreeFlags = u.subtreeFlags & 14680064)),
        S !== null ? (c = Sn(S, c)) : ((c = Bn(c, g, i, null)), (c.flags |= 2)),
        (c.return = t),
        (o.return = t),
        (o.sibling = c),
        (t.child = o),
        (o = c),
        (c = t.child),
        (g = e.child.memoizedState),
        (g =
          g === null
            ? Ha(i)
            : {
                baseLanes: g.baseLanes | i,
                cachePool: null,
                transitions: g.transitions,
              }),
        (c.memoizedState = g),
        (c.childLanes = e.childLanes & ~i),
        (t.memoizedState = Wa),
        o
      );
    }
    return (
      (c = e.child),
      (e = c.sibling),
      (o = Sn(c, { mode: 'visible', children: o.children })),
      !(t.mode & 1) && (o.lanes = i),
      (o.return = t),
      (o.sibling = null),
      e !== null &&
        ((i = t.deletions),
        i === null ? ((t.deletions = [e]), (t.flags |= 16)) : i.push(e)),
      (t.child = o),
      (t.memoizedState = null),
      o
    );
  }
  function Ka(e, t) {
    return (
      (t = bs({ mode: 'visible', children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Ms(e, t, i, o) {
    return (
      o !== null && xa(o),
      lr(t, e.child, null, i),
      (e = Ka(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Dy(e, t, i, o, u, c, g) {
    if (i) {
      return t.flags & 256
        ? ((t.flags &= -257), (o = Ba(Error(s(422)))), Ms(e, t, g, o))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((c = o.fallback),
            (u = t.mode),
            (o = bs({ mode: 'visible', children: o.children }, u, 0, null)),
            (c = Bn(c, u, g, null)),
            (c.flags |= 2),
            (o.return = t),
            (c.return = t),
            (o.sibling = c),
            (t.child = o),
            t.mode & 1 && lr(t, e.child, null, g),
            (t.child.memoizedState = Ha(g)),
            (t.memoizedState = Wa),
            c);
    }
    if (!(t.mode & 1)) {
      return Ms(e, t, g, null);
    }
    if (u.data === '$!') {
      if (((o = u.nextSibling && u.nextSibling.dataset), o)) {
        var S = o.dgst;
      }
      return (
        (o = S),
        (c = Error(s(419))),
        (o = Ba(c, o, void 0)),
        Ms(e, t, g, o)
      );
    }
    if (((S = (g & e.childLanes) !== 0), rt || S)) {
      if (((o = Oe), o !== null)) {
        switch (g & -g) {
          case 4:
            u = 2;
            break;
          case 16:
            u = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            u = 32;
            break;
          case 536870912:
            u = 268435456;
            break;
          default:
            u = 0;
        }
        ((u = u & (o.suspendedLanes | g) ? 0 : u),
          u !== 0 &&
            u !== c.retryLane &&
            ((c.retryLane = u), Qt(e, u), At(o, e, u, -1)));
      }
      return (ll(), (o = Ba(Error(s(421)))), Ms(e, t, g, o));
    }
    return u.data === '$?'
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Ky.bind(null, e)),
        (u._reactRetry = t),
        null)
      : ((e = c.treeContext),
        (ft = cn(u.nextSibling)),
        (dt = t),
        (ke = !0),
        (Nt = null),
        e !== null &&
          ((gt[yt++] = Kt),
          (gt[yt++] = Gt),
          (gt[yt++] = An),
          (Kt = e.id),
          (Gt = e.overflow),
          (An = t)),
        (t = Ka(t, o.children)),
        (t.flags |= 4096),
        t);
  }
  function af(e, t, i) {
    e.lanes |= t;
    const o = e.alternate;
    (o !== null && (o.lanes |= t), Ca(e.return, t, i));
  }
  function Ga(e, t, i, o, u) {
    const c = e.memoizedState;
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: o,
          tail: i,
          tailMode: u,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = o),
        (c.tail = i),
        (c.tailMode = u));
  }
  function lf(e, t, i) {
    let o = t.pendingProps,
      u = o.revealOrder,
      c = o.tail;
    if ((qe(e, t, o.children, i), (o = Te.current), o & 2)) {
      ((o = (o & 1) | 2), (t.flags |= 128));
    } else {
      if (e !== null && e.flags & 128) {
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) {
            e.memoizedState !== null && af(e, i, t);
          } else if (e.tag === 19) {
            af(e, i, t);
          } else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) {
            break e;
          }
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) {
              break e;
            }
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      }
      o &= 1;
    }
    if ((ye(Te, o), !(t.mode & 1))) {
      t.memoizedState = null;
    } else {
      switch (u) {
        case 'forwards':
          for (i = t.child, u = null; i !== null; ) {
            ((e = i.alternate),
              e !== null && Cs(e) === null && (u = i),
              (i = i.sibling));
          }
          ((i = u),
            i === null
              ? ((u = t.child), (t.child = null))
              : ((u = i.sibling), (i.sibling = null)),
            Ga(t, !1, u, i, c));
          break;
        case 'backwards':
          for (i = null, u = t.child, t.child = null; u !== null; ) {
            if (((e = u.alternate), e !== null && Cs(e) === null)) {
              t.child = u;
              break;
            }
            ((e = u.sibling), (u.sibling = i), (i = u), (u = e));
          }
          Ga(t, !0, i, null, c);
          break;
        case 'together':
          Ga(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    }
    return t.child;
  }
  function As(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Xt(e, t, i) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Fn |= t.lanes),
      !(i & t.childLanes))
    ) {
      return null;
    }
    if (e !== null && t.child !== e.child) {
      throw Error(s(153));
    }
    if (t.child !== null) {
      for (
        e = t.child, i = Sn(e, e.pendingProps), t.child = i, i.return = t;
        e.sibling !== null;

      ) {
        ((e = e.sibling),
          (i = i.sibling = Sn(e, e.pendingProps)),
          (i.return = t));
      }
      i.sibling = null;
    }
    return t.child;
  }
  function _y(e, t, i) {
    switch (t.tag) {
      case 3:
        (rf(t), ar());
        break;
      case 5:
        Sd(t);
        break;
      case 1:
        nt(t.type) && hs(t);
        break;
      case 4:
        Ea(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context,
          u = t.memoizedProps.value;
        (ye(xs, o._currentValue), (o._currentValue = u));
        break;
      case 13:
        if (((o = t.memoizedState), o !== null)) {
          return o.dehydrated !== null
            ? (ye(Te, Te.current & 1), (t.flags |= 128), null)
            : i & t.child.childLanes
              ? of(e, t, i)
              : (ye(Te, Te.current & 1),
                (e = Xt(e, t, i)),
                e !== null ? e.sibling : null);
        }
        ye(Te, Te.current & 1);
        break;
      case 19:
        if (((o = (i & t.childLanes) !== 0), e.flags & 128)) {
          if (o) {
            return lf(e, t, i);
          }
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          ye(Te, Te.current),
          o)
        ) {
          break;
        }
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), ef(e, t, i));
    }
    return Xt(e, t, i);
  }
  let uf, Qa, cf, df;
  ((uf = function (e, t) {
    for (let i = t.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) {
        e.appendChild(i.stateNode);
      } else if (i.tag !== 4 && i.child !== null) {
        ((i.child.return = i), (i = i.child));
        continue;
      }
      if (i === t) {
        break;
      }
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === t) {
          return;
        }
        i = i.return;
      }
      ((i.sibling.return = i.return), (i = i.sibling));
    }
  }),
    (Qa = function () {}),
    (cf = function (e, t, i, o) {
      let u = e.memoizedProps;
      if (u !== o) {
        ((e = t.stateNode), _n(Ot.current));
        let c = null;
        switch (i) {
          case 'input':
            ((u = Co(e, u)), (o = Co(e, o)), (c = []));
            break;
          case 'select':
            ((u = W({}, u, { value: void 0 })),
              (o = W({}, o, { value: void 0 })),
              (c = []));
            break;
          case 'textarea':
            ((u = Eo(e, u)), (o = Eo(e, o)), (c = []));
            break;
          default:
            typeof u.onClick !== 'function' &&
              typeof o.onClick === 'function' &&
              (e.onclick = cs);
        }
        jo(i, o);
        let g;
        i = null;
        for (D in u) {
          if (!o.hasOwnProperty(D) && u.hasOwnProperty(D) && u[D] != null) {
            if (D === 'style') {
              var S = u[D];
              for (g in S) {
                S.hasOwnProperty(g) && (i || (i = {}), (i[g] = ''));
              }
            } else {
              D !== 'dangerouslySetInnerHTML' &&
                D !== 'children' &&
                D !== 'suppressContentEditableWarning' &&
                D !== 'suppressHydrationWarning' &&
                D !== 'autoFocus' &&
                (l.hasOwnProperty(D)
                  ? c || (c = [])
                  : (c = c || []).push(D, null));
            }
          }
        }
        for (D in o) {
          let k = o[D];
          if (
            ((S = u != null ? u[D] : void 0),
            o.hasOwnProperty(D) && k !== S && (k != null || S != null))
          ) {
            if (D === 'style') {
              if (S) {
                for (g in S) {
                  !S.hasOwnProperty(g) ||
                    (k && k.hasOwnProperty(g)) ||
                    (i || (i = {}), (i[g] = ''));
                }
                for (g in k) {
                  k.hasOwnProperty(g) &&
                    S[g] !== k[g] &&
                    (i || (i = {}), (i[g] = k[g]));
                }
              } else {
                (i || (c || (c = []), c.push(D, i)), (i = k));
              }
            } else {
              D === 'dangerouslySetInnerHTML'
                ? ((k = k ? k.__html : void 0),
                  (S = S ? S.__html : void 0),
                  k != null && S !== k && (c = c || []).push(D, k))
                : D === 'children'
                  ? (typeof k !== 'string' && typeof k !== 'number') ||
                    (c = c || []).push(D, '' + k)
                  : D !== 'suppressContentEditableWarning' &&
                    D !== 'suppressHydrationWarning' &&
                    (l.hasOwnProperty(D)
                      ? (k != null && D === 'onScroll' && ve('scroll', e),
                        c || S === k || (c = []))
                      : (c = c || []).push(D, k));
            }
          }
        }
        i && (c = c || []).push('style', i);
        var D = c;
        (t.updateQueue = D) && (t.flags |= 4);
      }
    }),
    (df = function (e, t, i, o) {
      i !== o && (t.flags |= 4);
    }));
  function di(e, t) {
    if (!ke) {
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var i = null; t !== null; ) {
            (t.alternate !== null && (i = t), (t = t.sibling));
          }
          i === null ? (e.tail = null) : (i.sibling = null);
          break;
        case 'collapsed':
          i = e.tail;
          for (var o = null; i !== null; ) {
            (i.alternate !== null && (o = i), (i = i.sibling));
          }
          o === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (o.sibling = null);
      }
    }
  }
  function Ke(e) {
    let t = e.alternate !== null && e.alternate.child === e.child,
      i = 0,
      o = 0;
    if (t) {
      for (var u = e.child; u !== null; ) {
        ((i |= u.lanes | u.childLanes),
          (o |= u.subtreeFlags & 14680064),
          (o |= u.flags & 14680064),
          (u.return = e),
          (u = u.sibling));
      }
    } else {
      for (u = e.child; u !== null; ) {
        ((i |= u.lanes | u.childLanes),
          (o |= u.subtreeFlags),
          (o |= u.flags),
          (u.return = e),
          (u = u.sibling));
      }
    }
    return ((e.subtreeFlags |= o), (e.childLanes = i), t);
  }
  function Vy(e, t, i) {
    let o = t.pendingProps;
    switch ((ga(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ke(t), null);
      case 1:
        return (nt(t.type) && fs(), Ke(t), null);
      case 3:
        return (
          (o = t.stateNode),
          dr(),
          xe(tt),
          xe(We),
          Ra(),
          o.pendingContext &&
            ((o.context = o.pendingContext), (o.pendingContext = null)),
          (e === null || e.child === null) &&
            (ys(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), Nt !== null && (sl(Nt), (Nt = null)))),
          Qa(e, t),
          Ke(t),
          null
        );
      case 5:
        Na(t);
        var u = _n(oi.current);
        if (((i = t.type), e !== null && t.stateNode != null)) {
          (cf(e, t, i, o, u),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        } else {
          if (!o) {
            if (t.stateNode === null) {
              throw Error(s(166));
            }
            return (Ke(t), null);
          }
          if (((e = _n(Ot.current)), ys(t))) {
            ((o = t.stateNode), (i = t.type));
            var c = t.memoizedProps;
            switch (((o[It] = t), (o[ti] = c), (e = (t.mode & 1) !== 0), i)) {
              case 'dialog':
                (ve('cancel', o), ve('close', o));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                ve('load', o);
                break;
              case 'video':
              case 'audio':
                for (u = 0; u < qr.length; u++) {
                  ve(qr[u], o);
                }
                break;
              case 'source':
                ve('error', o);
                break;
              case 'img':
              case 'image':
              case 'link':
                (ve('error', o), ve('load', o));
                break;
              case 'details':
                ve('toggle', o);
                break;
              case 'input':
                (Wu(o, c), ve('invalid', o));
                break;
              case 'select':
                ((o._wrapperState = { wasMultiple: !!c.multiple }),
                  ve('invalid', o));
                break;
              case 'textarea':
                (Gu(o, c), ve('invalid', o));
            }
            (jo(i, c), (u = null));
            for (var g in c) {
              if (c.hasOwnProperty(g)) {
                var S = c[g];
                g === 'children'
                  ? typeof S === 'string'
                    ? o.textContent !== S &&
                      (c.suppressHydrationWarning !== !0 &&
                        us(o.textContent, S, e),
                      (u = ['children', S]))
                    : typeof S === 'number' &&
                      o.textContent !== '' + S &&
                      (c.suppressHydrationWarning !== !0 &&
                        us(o.textContent, S, e),
                      (u = ['children', '' + S]))
                  : l.hasOwnProperty(g) &&
                    S != null &&
                    g === 'onScroll' &&
                    ve('scroll', o);
              }
            }
            switch (i) {
              case 'input':
                (Bi(o), Ku(o, c, !0));
                break;
              case 'textarea':
                (Bi(o), Yu(o));
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof c.onClick === 'function' && (o.onclick = cs);
            }
            ((o = u), (t.updateQueue = o), o !== null && (t.flags |= 4));
          } else {
            ((g = u.nodeType === 9 ? u : u.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = Xu(i)),
              e === 'http://www.w3.org/1999/xhtml'
                ? i === 'script'
                  ? ((e = g.createElement('div')),
                    (e.innerHTML = '<script><\/script>'),
                    (e = e.removeChild(e.firstChild)))
                  : typeof o.is === 'string'
                    ? (e = g.createElement(i, { is: o.is }))
                    : ((e = g.createElement(i)),
                      i === 'select' &&
                        ((g = e),
                        o.multiple
                          ? (g.multiple = !0)
                          : o.size && (g.size = o.size)))
                : (e = g.createElementNS(e, i)),
              (e[It] = t),
              (e[ti] = o),
              uf(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((g = Ro(i, o)), i)) {
                case 'dialog':
                  (ve('cancel', e), ve('close', e), (u = o));
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  (ve('load', e), (u = o));
                  break;
                case 'video':
                case 'audio':
                  for (u = 0; u < qr.length; u++) {
                    ve(qr[u], e);
                  }
                  u = o;
                  break;
                case 'source':
                  (ve('error', e), (u = o));
                  break;
                case 'img':
                case 'image':
                case 'link':
                  (ve('error', e), ve('load', e), (u = o));
                  break;
                case 'details':
                  (ve('toggle', e), (u = o));
                  break;
                case 'input':
                  (Wu(e, o), (u = Co(e, o)), ve('invalid', e));
                  break;
                case 'option':
                  u = o;
                  break;
                case 'select':
                  ((e._wrapperState = { wasMultiple: !!o.multiple }),
                    (u = W({}, o, { value: void 0 })),
                    ve('invalid', e));
                  break;
                case 'textarea':
                  (Gu(e, o), (u = Eo(e, o)), ve('invalid', e));
                  break;
                default:
                  u = o;
              }
              (jo(i, u), (S = u));
              for (c in S) {
                if (S.hasOwnProperty(c)) {
                  let k = S[c];
                  c === 'style'
                    ? Ju(e, k)
                    : c === 'dangerouslySetInnerHTML'
                      ? ((k = k ? k.__html : void 0), k != null && Zu(e, k))
                      : c === 'children'
                        ? typeof k === 'string'
                          ? (i !== 'textarea' || k !== '') && Dr(e, k)
                          : typeof k === 'number' && Dr(e, '' + k)
                        : c !== 'suppressContentEditableWarning' &&
                          c !== 'suppressHydrationWarning' &&
                          c !== 'autoFocus' &&
                          (l.hasOwnProperty(c)
                            ? k != null && c === 'onScroll' && ve('scroll', e)
                            : k != null && V(e, c, k, g));
                }
              }
              switch (i) {
                case 'input':
                  (Bi(e), Ku(e, o, !1));
                  break;
                case 'textarea':
                  (Bi(e), Yu(e));
                  break;
                case 'option':
                  o.value != null && e.setAttribute('value', '' + pe(o.value));
                  break;
                case 'select':
                  ((e.multiple = !!o.multiple),
                    (c = o.value),
                    c != null
                      ? Kn(e, !!o.multiple, c, !1)
                      : o.defaultValue != null &&
                        Kn(e, !!o.multiple, o.defaultValue, !0));
                  break;
                default:
                  typeof u.onClick === 'function' && (e.onclick = cs);
              }
              switch (i) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  o = !!o.autoFocus;
                  break e;
                case 'img':
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Ke(t), null);
      case 6:
        if (e && t.stateNode != null) {
          df(e, t, e.memoizedProps, o);
        } else {
          if (typeof o !== 'string' && t.stateNode === null) {
            throw Error(s(166));
          }
          if (((i = _n(oi.current)), _n(Ot.current), ys(t))) {
            if (
              ((o = t.stateNode),
              (i = t.memoizedProps),
              (o[It] = t),
              (c = o.nodeValue !== i) && ((e = dt), e !== null))
            ) {
              switch (e.tag) {
                case 3:
                  us(o.nodeValue, i, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    us(o.nodeValue, i, (e.mode & 1) !== 0);
              }
            }
            c && (t.flags |= 4);
          } else {
            ((o = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(o)),
              (o[It] = t),
              (t.stateNode = o));
          }
        }
        return (Ke(t), null);
      case 13:
        if (
          (xe(Te),
          (o = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ke && ft !== null && t.mode & 1 && !(t.flags & 128)) {
            (hd(), ar(), (t.flags |= 98560), (c = !1));
          } else if (((c = ys(t)), o !== null && o.dehydrated !== null)) {
            if (e === null) {
              if (!c) {
                throw Error(s(318));
              }
              if (
                ((c = t.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              ) {
                throw Error(s(317));
              }
              c[It] = t;
            } else {
              (ar(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4));
            }
            (Ke(t), (c = !1));
          } else {
            (Nt !== null && (sl(Nt), (Nt = null)), (c = !0));
          }
          if (!c) {
            return t.flags & 65536 ? t : null;
          }
        }
        return t.flags & 128
          ? ((t.lanes = i), t)
          : ((o = o !== null),
            o !== (e !== null && e.memoizedState !== null) &&
              o &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || Te.current & 1 ? _e === 0 && (_e = 3) : ll())),
            t.updateQueue !== null && (t.flags |= 4),
            Ke(t),
            null);
      case 4:
        return (
          dr(),
          Qa(e, t),
          e === null && Jr(t.stateNode.containerInfo),
          Ke(t),
          null
        );
      case 10:
        return (ka(t.type._context), Ke(t), null);
      case 17:
        return (nt(t.type) && fs(), Ke(t), null);
      case 19:
        if ((xe(Te), (c = t.memoizedState), c === null)) {
          return (Ke(t), null);
        }
        if (((o = (t.flags & 128) !== 0), (g = c.rendering), g === null)) {
          if (o) {
            di(c, !1);
          } else {
            if (_e !== 0 || (e !== null && e.flags & 128)) {
              for (e = t.child; e !== null; ) {
                if (((g = Cs(e)), g !== null)) {
                  for (
                    t.flags |= 128,
                      di(c, !1),
                      o = g.updateQueue,
                      o !== null && ((t.updateQueue = o), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      o = i,
                      i = t.child;
                    i !== null;

                  ) {
                    ((c = i),
                      (e = o),
                      (c.flags &= 14680066),
                      (g = c.alternate),
                      g === null
                        ? ((c.childLanes = 0),
                          (c.lanes = e),
                          (c.child = null),
                          (c.subtreeFlags = 0),
                          (c.memoizedProps = null),
                          (c.memoizedState = null),
                          (c.updateQueue = null),
                          (c.dependencies = null),
                          (c.stateNode = null))
                        : ((c.childLanes = g.childLanes),
                          (c.lanes = g.lanes),
                          (c.child = g.child),
                          (c.subtreeFlags = 0),
                          (c.deletions = null),
                          (c.memoizedProps = g.memoizedProps),
                          (c.memoizedState = g.memoizedState),
                          (c.updateQueue = g.updateQueue),
                          (c.type = g.type),
                          (e = g.dependencies),
                          (c.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (i = i.sibling));
                  }
                  return (ye(Te, (Te.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            }
            c.tail !== null &&
              Re() > mr &&
              ((t.flags |= 128), (o = !0), di(c, !1), (t.lanes = 4194304));
          }
        } else {
          if (!o) {
            if (((e = Cs(g)), e !== null)) {
              if (
                ((t.flags |= 128),
                (o = !0),
                (i = e.updateQueue),
                i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                di(c, !0),
                c.tail === null &&
                  c.tailMode === 'hidden' &&
                  !g.alternate &&
                  !ke)
              ) {
                return (Ke(t), null);
              }
            } else {
              2 * Re() - c.renderingStartTime > mr &&
                i !== 1073741824 &&
                ((t.flags |= 128), (o = !0), di(c, !1), (t.lanes = 4194304));
            }
          }
          c.isBackwards
            ? ((g.sibling = t.child), (t.child = g))
            : ((i = c.last),
              i !== null ? (i.sibling = g) : (t.child = g),
              (c.last = g));
        }
        return c.tail !== null
          ? ((t = c.tail),
            (c.rendering = t),
            (c.tail = t.sibling),
            (c.renderingStartTime = Re()),
            (t.sibling = null),
            (i = Te.current),
            ye(Te, o ? (i & 1) | 2 : i & 1),
            t)
          : (Ke(t), null);
      case 22:
      case 23:
        return (
          al(),
          (o = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== o && (t.flags |= 8192),
          o && t.mode & 1
            ? ht & 1073741824 &&
              (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ke(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Fy(e, t) {
    switch ((ga(t), t.tag)) {
      case 1:
        return (
          nt(t.type) && fs(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          dr(),
          xe(tt),
          xe(We),
          Ra(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return (Na(t), null);
      case 13:
        if (
          (xe(Te), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) {
            throw Error(s(340));
          }
          ar();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (xe(Te), null);
      case 4:
        return (dr(), null);
      case 10:
        return (ka(t.type._context), null);
      case 22:
      case 23:
        return (al(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  let Ls = !1,
    Ge = !1,
    Iy = typeof WeakSet === 'function' ? WeakSet : Set,
    K = null;
  function hr(e, t) {
    const i = e.ref;
    if (i !== null) {
      if (typeof i === 'function') {
        try {
          i(null);
        } catch (o) {
          Ne(e, t, o);
        }
      } else {
        i.current = null;
      }
    }
  }
  function Ya(e, t, i) {
    try {
      i();
    } catch (o) {
      Ne(e, t, o);
    }
  }
  let ff = !1;
  function Oy(e, t) {
    if (((aa = qi), (e = bc()), Jo(e))) {
      if ('selectionStart' in e) {
        var i = { start: e.selectionStart, end: e.selectionEnd };
      } else {
        e: {
          i = ((i = e.ownerDocument) && i.defaultView) || window;
          let o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            const u = o.anchorOffset,
              c = o.focusNode;
            o = o.focusOffset;
            try {
              (i.nodeType, c.nodeType);
            } catch {
              i = null;
              break e;
            }
            let g = 0,
              S = -1,
              k = -1,
              D = 0,
              O = 0,
              z = e,
              F = null;
            t: for (;;) {
              for (
                var b;
                z !== i || (u !== 0 && z.nodeType !== 3) || (S = g + u),
                  z !== c || (o !== 0 && z.nodeType !== 3) || (k = g + o),
                  z.nodeType === 3 && (g += z.nodeValue.length),
                  (b = z.firstChild) !== null;

              ) {
                ((F = z), (z = b));
              }
              for (;;) {
                if (z === e) {
                  break t;
                }
                if (
                  (F === i && ++D === u && (S = g),
                  F === c && ++O === o && (k = g),
                  (b = z.nextSibling) !== null)
                ) {
                  break;
                }
                ((z = F), (F = z.parentNode));
              }
              z = b;
            }
            i = S === -1 || k === -1 ? null : { start: S, end: k };
          } else {
            i = null;
          }
        }
      }
      i = i || { start: 0, end: 0 };
    } else {
      i = null;
    }
    for (
      la = { focusedElem: e, selectionRange: i }, qi = !1, K = t;
      K !== null;

    ) {
      if (
        ((t = K), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      ) {
        ((e.return = t), (K = e));
      } else {
        for (; K !== null; ) {
          t = K;
          try {
            var G = t.alternate;
            if (t.flags & 1024) {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (G !== null) {
                    const Q = G.memoizedProps,
                      Me = G.memoizedState,
                      M = t.stateNode,
                      E = M.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? Q : jt(t.type, Q),
                        Me
                      );
                    M.__reactInternalSnapshotBeforeUpdate = E;
                  }
                  break;
                case 3:
                  var L = t.stateNode.containerInfo;
                  L.nodeType === 1
                    ? (L.textContent = '')
                    : L.nodeType === 9 &&
                      L.documentElement &&
                      L.removeChild(L.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
            }
          } catch (B) {
            Ne(t, t.return, B);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (K = e));
            break;
          }
          K = t.return;
        }
      }
    }
    return ((G = ff), (ff = !1), G);
  }
  function fi(e, t, i) {
    let o = t.updateQueue;
    if (((o = o !== null ? o.lastEffect : null), o !== null)) {
      let u = (o = o.next);
      do {
        if ((u.tag & e) === e) {
          const c = u.destroy;
          ((u.destroy = void 0), c !== void 0 && Ya(t, i, c));
        }
        u = u.next;
      } while (u !== o);
    }
  }
  function Ds(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      let i = (t = t.next);
      do {
        if ((i.tag & e) === e) {
          const o = i.create;
          i.destroy = o();
        }
        i = i.next;
      } while (i !== t);
    }
  }
  function Xa(e) {
    const t = e.ref;
    if (t !== null) {
      const i = e.stateNode;
      switch (e.tag) {
        case 5:
          e = i;
          break;
        default:
          e = i;
      }
      typeof t === 'function' ? t(e) : (t.current = e);
    }
  }
  function hf(e) {
    let t = e.alternate;
    (t !== null && ((e.alternate = null), hf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[It],
          delete t[ti],
          delete t[fa],
          delete t[wy],
          delete t[Sy])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function pf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function mf(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || pf(e.return)) {
          return null;
        }
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) {
          continue e;
        }
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) {
        return e.stateNode;
      }
    }
  }
  function Za(e, t, i) {
    const o = e.tag;
    if (o === 5 || o === 6) {
      ((e = e.stateNode),
        t
          ? i.nodeType === 8
            ? i.parentNode.insertBefore(e, t)
            : i.insertBefore(e, t)
          : (i.nodeType === 8
              ? ((t = i.parentNode), t.insertBefore(e, i))
              : ((t = i), t.appendChild(e)),
            (i = i._reactRootContainer),
            i != null || t.onclick !== null || (t.onclick = cs)));
    } else if (o !== 4 && ((e = e.child), e !== null)) {
      for (Za(e, t, i), e = e.sibling; e !== null; ) {
        (Za(e, t, i), (e = e.sibling));
      }
    }
  }
  function qa(e, t, i) {
    const o = e.tag;
    if (o === 5 || o === 6) {
      ((e = e.stateNode), t ? i.insertBefore(e, t) : i.appendChild(e));
    } else if (o !== 4 && ((e = e.child), e !== null)) {
      for (qa(e, t, i), e = e.sibling; e !== null; ) {
        (qa(e, t, i), (e = e.sibling));
      }
    }
  }
  let Ue = null,
    Rt = !1;
  function gn(e, t, i) {
    for (i = i.child; i !== null; ) {
      (gf(e, t, i), (i = i.sibling));
    }
  }
  function gf(e, t, i) {
    if (Ft && typeof Ft.onCommitFiberUnmount === 'function') {
      try {
        Ft.onCommitFiberUnmount(Ki, i);
      } catch {}
    }
    switch (i.tag) {
      case 5:
        Ge || hr(i, t);
      case 6:
        var o = Ue,
          u = Rt;
        ((Ue = null),
          gn(e, t, i),
          (Ue = o),
          (Rt = u),
          Ue !== null &&
            (Rt
              ? ((e = Ue),
                (i = i.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(i)
                  : e.removeChild(i))
              : Ue.removeChild(i.stateNode)));
        break;
      case 18:
        Ue !== null &&
          (Rt
            ? ((e = Ue),
              (i = i.stateNode),
              e.nodeType === 8
                ? da(e.parentNode, i)
                : e.nodeType === 1 && da(e, i),
              Wr(e))
            : da(Ue, i.stateNode));
        break;
      case 4:
        ((o = Ue),
          (u = Rt),
          (Ue = i.stateNode.containerInfo),
          (Rt = !0),
          gn(e, t, i),
          (Ue = o),
          (Rt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ge &&
          ((o = i.updateQueue), o !== null && ((o = o.lastEffect), o !== null))
        ) {
          u = o = o.next;
          do {
            let c = u,
              g = c.destroy;
            ((c = c.tag),
              g !== void 0 && (c & 2 || c & 4) && Ya(i, t, g),
              (u = u.next));
          } while (u !== o);
        }
        gn(e, t, i);
        break;
      case 1:
        if (
          !Ge &&
          (hr(i, t),
          (o = i.stateNode),
          typeof o.componentWillUnmount === 'function')
        ) {
          try {
            ((o.props = i.memoizedProps),
              (o.state = i.memoizedState),
              o.componentWillUnmount());
          } catch (S) {
            Ne(i, t, S);
          }
        }
        gn(e, t, i);
        break;
      case 21:
        gn(e, t, i);
        break;
      case 22:
        i.mode & 1
          ? ((Ge = (o = Ge) || i.memoizedState !== null), gn(e, t, i), (Ge = o))
          : gn(e, t, i);
        break;
      default:
        gn(e, t, i);
    }
  }
  function yf(e) {
    const t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      let i = e.stateNode;
      (i === null && (i = e.stateNode = new Iy()),
        t.forEach(function (o) {
          const u = Gy.bind(null, e, o);
          i.has(o) || (i.add(o), o.then(u, u));
        }));
    }
  }
  function Mt(e, t) {
    const i = t.deletions;
    if (i !== null) {
      for (let o = 0; o < i.length; o++) {
        const u = i[o];
        try {
          let c = e,
            g = t,
            S = g;
          e: for (; S !== null; ) {
            switch (S.tag) {
              case 5:
                ((Ue = S.stateNode), (Rt = !1));
                break e;
              case 3:
                ((Ue = S.stateNode.containerInfo), (Rt = !0));
                break e;
              case 4:
                ((Ue = S.stateNode.containerInfo), (Rt = !0));
                break e;
            }
            S = S.return;
          }
          if (Ue === null) {
            throw Error(s(160));
          }
          (gf(c, g, u), (Ue = null), (Rt = !1));
          const k = u.alternate;
          (k !== null && (k.return = null), (u.return = null));
        } catch (D) {
          Ne(u, t, D);
        }
      }
    }
    if (t.subtreeFlags & 12854) {
      for (t = t.child; t !== null; ) {
        (vf(t, e), (t = t.sibling));
      }
    }
  }
  function vf(e, t) {
    let i = e.alternate,
      o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Mt(t, e), Bt(e), o & 4)) {
          try {
            (fi(3, e, e.return), Ds(3, e));
          } catch (Q) {
            Ne(e, e.return, Q);
          }
          try {
            fi(5, e, e.return);
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 1:
        (Mt(t, e), Bt(e), o & 512 && i !== null && hr(i, i.return));
        break;
      case 5:
        if (
          (Mt(t, e),
          Bt(e),
          o & 512 && i !== null && hr(i, i.return),
          e.flags & 32)
        ) {
          var u = e.stateNode;
          try {
            Dr(u, '');
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        if (o & 4 && ((u = e.stateNode), u != null)) {
          var c = e.memoizedProps,
            g = i !== null ? i.memoizedProps : c,
            S = e.type,
            k = e.updateQueue;
          if (((e.updateQueue = null), k !== null)) {
            try {
              (S === 'input' &&
                c.type === 'radio' &&
                c.name != null &&
                Hu(u, c),
                Ro(S, g));
              var D = Ro(S, c);
              for (g = 0; g < k.length; g += 2) {
                var O = k[g],
                  z = k[g + 1];
                O === 'style'
                  ? Ju(u, z)
                  : O === 'dangerouslySetInnerHTML'
                    ? Zu(u, z)
                    : O === 'children'
                      ? Dr(u, z)
                      : V(u, O, z, D);
              }
              switch (S) {
                case 'input':
                  To(u, c);
                  break;
                case 'textarea':
                  Qu(u, c);
                  break;
                case 'select':
                  var F = u._wrapperState.wasMultiple;
                  u._wrapperState.wasMultiple = !!c.multiple;
                  var b = c.value;
                  b != null
                    ? Kn(u, !!c.multiple, b, !1)
                    : F !== !!c.multiple &&
                      (c.defaultValue != null
                        ? Kn(u, !!c.multiple, c.defaultValue, !0)
                        : Kn(u, !!c.multiple, c.multiple ? [] : '', !1));
              }
              u[ti] = c;
            } catch (Q) {
              Ne(e, e.return, Q);
            }
          }
        }
        break;
      case 6:
        if ((Mt(t, e), Bt(e), o & 4)) {
          if (e.stateNode === null) {
            throw Error(s(162));
          }
          ((u = e.stateNode), (c = e.memoizedProps));
          try {
            u.nodeValue = c;
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 3:
        if (
          (Mt(t, e), Bt(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
        ) {
          try {
            Wr(t.containerInfo);
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 4:
        (Mt(t, e), Bt(e));
        break;
      case 13:
        (Mt(t, e),
          Bt(e),
          (u = e.child),
          u.flags & 8192 &&
            ((c = u.memoizedState !== null),
            (u.stateNode.isHidden = c),
            !c ||
              (u.alternate !== null && u.alternate.memoizedState !== null) ||
              (tl = Re())),
          o & 4 && yf(e));
        break;
      case 22:
        if (
          ((O = i !== null && i.memoizedState !== null),
          e.mode & 1 ? ((Ge = (D = Ge) || O), Mt(t, e), (Ge = D)) : Mt(t, e),
          Bt(e),
          o & 8192)
        ) {
          if (
            ((D = e.memoizedState !== null),
            (e.stateNode.isHidden = D) && !O && e.mode & 1)
          ) {
            for (K = e, O = e.child; O !== null; ) {
              for (z = K = O; K !== null; ) {
                switch (((F = K), (b = F.child), F.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    fi(4, F, F.return);
                    break;
                  case 1:
                    hr(F, F.return);
                    var G = F.stateNode;
                    if (typeof G.componentWillUnmount === 'function') {
                      ((o = F), (i = F.return));
                      try {
                        ((t = o),
                          (G.props = t.memoizedProps),
                          (G.state = t.memoizedState),
                          G.componentWillUnmount());
                      } catch (Q) {
                        Ne(o, i, Q);
                      }
                    }
                    break;
                  case 5:
                    hr(F, F.return);
                    break;
                  case 22:
                    if (F.memoizedState !== null) {
                      Sf(z);
                      continue;
                    }
                }
                b !== null ? ((b.return = F), (K = b)) : Sf(z);
              }
              O = O.sibling;
            }
          }
          e: for (O = null, z = e; ; ) {
            if (z.tag === 5) {
              if (O === null) {
                O = z;
                try {
                  ((u = z.stateNode),
                    D
                      ? ((c = u.style),
                        typeof c.setProperty === 'function'
                          ? c.setProperty('display', 'none', 'important')
                          : (c.display = 'none'))
                      : ((S = z.stateNode),
                        (k = z.memoizedProps.style),
                        (g =
                          k != null && k.hasOwnProperty('display')
                            ? k.display
                            : null),
                        (S.style.display = qu('display', g))));
                } catch (Q) {
                  Ne(e, e.return, Q);
                }
              }
            } else if (z.tag === 6) {
              if (O === null) {
                try {
                  z.stateNode.nodeValue = D ? '' : z.memoizedProps;
                } catch (Q) {
                  Ne(e, e.return, Q);
                }
              }
            } else if (
              ((z.tag !== 22 && z.tag !== 23) ||
                z.memoizedState === null ||
                z === e) &&
              z.child !== null
            ) {
              ((z.child.return = z), (z = z.child));
              continue;
            }
            if (z === e) {
              break e;
            }
            for (; z.sibling === null; ) {
              if (z.return === null || z.return === e) {
                break e;
              }
              (O === z && (O = null), (z = z.return));
            }
            (O === z && (O = null),
              (z.sibling.return = z.return),
              (z = z.sibling));
          }
        }
        break;
      case 19:
        (Mt(t, e), Bt(e), o & 4 && yf(e));
        break;
      case 21:
        break;
      default:
        (Mt(t, e), Bt(e));
    }
  }
  function Bt(e) {
    const t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (let i = e.return; i !== null; ) {
            if (pf(i)) {
              var o = i;
              break e;
            }
            i = i.return;
          }
          throw Error(s(160));
        }
        switch (o.tag) {
          case 5:
            var u = o.stateNode;
            o.flags & 32 && (Dr(u, ''), (o.flags &= -33));
            var c = mf(e);
            qa(e, c, u);
            break;
          case 3:
          case 4:
            var g = o.stateNode.containerInfo,
              S = mf(e);
            Za(e, S, g);
            break;
          default:
            throw Error(s(161));
        }
      } catch (k) {
        Ne(e, e.return, k);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function zy(e, t, i) {
    ((K = e), xf(e));
  }
  function xf(e, t, i) {
    for (let o = (e.mode & 1) !== 0; K !== null; ) {
      let u = K,
        c = u.child;
      if (u.tag === 22 && o) {
        let g = u.memoizedState !== null || Ls;
        if (!g) {
          let S = u.alternate,
            k = (S !== null && S.memoizedState !== null) || Ge;
          S = Ls;
          const D = Ge;
          if (((Ls = g), (Ge = k) && !D)) {
            for (K = u; K !== null; ) {
              ((g = K),
                (k = g.child),
                g.tag === 22 && g.memoizedState !== null
                  ? kf(u)
                  : k !== null
                    ? ((k.return = g), (K = k))
                    : kf(u));
            }
          }
          for (; c !== null; ) {
            ((K = c), xf(c), (c = c.sibling));
          }
          ((K = u), (Ls = S), (Ge = D));
        }
        wf(e);
      } else {
        u.subtreeFlags & 8772 && c !== null ? ((c.return = u), (K = c)) : wf(e);
      }
    }
  }
  function wf(e) {
    for (; K !== null; ) {
      const t = K;
      if (t.flags & 8772) {
        var i = t.alternate;
        try {
          if (t.flags & 8772) {
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ge || Ds(5, t);
                break;
              case 1:
                var o = t.stateNode;
                if (t.flags & 4 && !Ge) {
                  if (i === null) {
                    o.componentDidMount();
                  } else {
                    const u =
                      t.elementType === t.type
                        ? i.memoizedProps
                        : jt(t.type, i.memoizedProps);
                    o.componentDidUpdate(
                      u,
                      i.memoizedState,
                      o.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                }
                var c = t.updateQueue;
                c !== null && wd(t, c, o);
                break;
              case 3:
                var g = t.updateQueue;
                if (g !== null) {
                  if (((i = null), t.child !== null)) {
                    switch (t.child.tag) {
                      case 5:
                        i = t.child.stateNode;
                        break;
                      case 1:
                        i = t.child.stateNode;
                    }
                  }
                  wd(t, g, i);
                }
                break;
              case 5:
                var S = t.stateNode;
                if (i === null && t.flags & 4) {
                  i = S;
                  const k = t.memoizedProps;
                  switch (t.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      k.autoFocus && i.focus();
                      break;
                    case 'img':
                      k.src && (i.src = k.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  const D = t.alternate;
                  if (D !== null) {
                    const O = D.memoizedState;
                    if (O !== null) {
                      const z = O.dehydrated;
                      z !== null && Wr(z);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          }
          Ge || (t.flags & 512 && Xa(t));
        } catch (F) {
          Ne(t, t.return, F);
        }
      }
      if (t === e) {
        K = null;
        break;
      }
      if (((i = t.sibling), i !== null)) {
        ((i.return = t.return), (K = i));
        break;
      }
      K = t.return;
    }
  }
  function Sf(e) {
    for (; K !== null; ) {
      const t = K;
      if (t === e) {
        K = null;
        break;
      }
      const i = t.sibling;
      if (i !== null) {
        ((i.return = t.return), (K = i));
        break;
      }
      K = t.return;
    }
  }
  function kf(e) {
    for (; K !== null; ) {
      const t = K;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var i = t.return;
            try {
              Ds(4, t);
            } catch (k) {
              Ne(t, i, k);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount === 'function') {
              const u = t.return;
              try {
                o.componentDidMount();
              } catch (k) {
                Ne(t, u, k);
              }
            }
            var c = t.return;
            try {
              Xa(t);
            } catch (k) {
              Ne(t, c, k);
            }
            break;
          case 5:
            var g = t.return;
            try {
              Xa(t);
            } catch (k) {
              Ne(t, g, k);
            }
        }
      } catch (k) {
        Ne(t, t.return, k);
      }
      if (t === e) {
        K = null;
        break;
      }
      const S = t.sibling;
      if (S !== null) {
        ((S.return = t.return), (K = S));
        break;
      }
      K = t.return;
    }
  }
  var By = Math.ceil,
    _s = H.ReactCurrentDispatcher,
    Ja = H.ReactCurrentOwner,
    wt = H.ReactCurrentBatchConfig,
    ue = 0,
    Oe = null,
    Le = null,
    $e = 0,
    ht = 0,
    pr = dn(0),
    _e = 0,
    hi = null,
    Fn = 0,
    Vs = 0,
    el = 0,
    pi = null,
    it = null,
    tl = 0,
    mr = 1 / 0,
    Zt = null,
    Fs = !1,
    nl = null,
    yn = null,
    Is = !1,
    vn = null,
    Os = 0,
    mi = 0,
    rl = null,
    zs = -1,
    Bs = 0;
  function Je() {
    return ue & 6 ? Re() : zs !== -1 ? zs : (zs = Re());
  }
  function xn(e) {
    return e.mode & 1
      ? ue & 2 && $e !== 0
        ? $e & -$e
        : Cy.transition !== null
          ? (Bs === 0 && (Bs = pc()), Bs)
          : ((e = me),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Cc(e.type))),
            e)
      : 1;
  }
  function At(e, t, i, o) {
    if (50 < mi) {
      throw ((mi = 0), (rl = null), Error(s(185)));
    }
    (zr(e, i, o),
      (!(ue & 2) || e !== Oe) &&
        (e === Oe && (!(ue & 2) && (Vs |= i), _e === 4 && wn(e, $e)),
        st(e, o),
        i === 1 &&
          ue === 0 &&
          !(t.mode & 1) &&
          ((mr = Re() + 500), ps && hn())));
  }
  function st(e, t) {
    let i = e.callbackNode;
    Cg(e, t);
    const o = Yi(e, e === Oe ? $e : 0);
    if (o === 0) {
      (i !== null && dc(i), (e.callbackNode = null), (e.callbackPriority = 0));
    } else if (((t = o & -o), e.callbackPriority !== t)) {
      if ((i != null && dc(i), t === 1)) {
        (e.tag === 0 ? ky(Tf.bind(null, e)) : ld(Tf.bind(null, e)),
          vy(function () {
            !(ue & 6) && hn();
          }),
          (i = null));
      } else {
        switch (mc(o)) {
          case 1:
            i = Fo;
            break;
          case 4:
            i = fc;
            break;
          case 16:
            i = Hi;
            break;
          case 536870912:
            i = hc;
            break;
          default:
            i = Hi;
        }
        i = Lf(i, Cf.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = i));
    }
  }
  function Cf(e, t) {
    if (((zs = -1), (Bs = 0), ue & 6)) {
      throw Error(s(327));
    }
    let i = e.callbackNode;
    if (gr() && e.callbackNode !== i) {
      return null;
    }
    let o = Yi(e, e === Oe ? $e : 0);
    if (o === 0) {
      return null;
    }
    if (o & 30 || o & e.expiredLanes || t) {
      t = Us(e, o);
    } else {
      t = o;
      var u = ue;
      ue |= 2;
      var c = Ef();
      (Oe !== e || $e !== t) && ((Zt = null), (mr = Re() + 500), On(e, t));
      do {
        try {
          by();
          break;
        } catch (S) {
          Pf(e, S);
        }
      } while (!0);
      (Sa(),
        (_s.current = c),
        (ue = u),
        Le !== null ? (t = 0) : ((Oe = null), ($e = 0), (t = _e)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((u = Io(e)), u !== 0 && ((o = u), (t = il(e, u)))),
        t === 1)
      ) {
        throw ((i = hi), On(e, 0), wn(e, o), st(e, Re()), i);
      }
      if (t === 6) {
        wn(e, o);
      } else {
        if (
          ((u = e.current.alternate),
          !(o & 30) &&
            !Uy(u) &&
            ((t = Us(e, o)),
            t === 2 && ((c = Io(e)), c !== 0 && ((o = c), (t = il(e, c)))),
            t === 1))
        ) {
          throw ((i = hi), On(e, 0), wn(e, o), st(e, Re()), i);
        }
        switch (((e.finishedWork = u), (e.finishedLanes = o), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            zn(e, it, Zt);
            break;
          case 3:
            if (
              (wn(e, o),
              (o & 130023424) === o && ((t = tl + 500 - Re()), 10 < t))
            ) {
              if (Yi(e, 0) !== 0) {
                break;
              }
              if (((u = e.suspendedLanes), (u & o) !== o)) {
                (Je(), (e.pingedLanes |= e.suspendedLanes & u));
                break;
              }
              e.timeoutHandle = ca(zn.bind(null, e, it, Zt), t);
              break;
            }
            zn(e, it, Zt);
            break;
          case 4:
            if ((wn(e, o), (o & 4194240) === o)) {
              break;
            }
            for (t = e.eventTimes, u = -1; 0 < o; ) {
              let g = 31 - Pt(o);
              ((c = 1 << g), (g = t[g]), g > u && (u = g), (o &= ~c));
            }
            if (
              ((o = u),
              (o = Re() - o),
              (o =
                (120 > o
                  ? 120
                  : 480 > o
                    ? 480
                    : 1080 > o
                      ? 1080
                      : 1920 > o
                        ? 1920
                        : 3e3 > o
                          ? 3e3
                          : 4320 > o
                            ? 4320
                            : 1960 * By(o / 1960)) - o),
              10 < o)
            ) {
              e.timeoutHandle = ca(zn.bind(null, e, it, Zt), o);
              break;
            }
            zn(e, it, Zt);
            break;
          case 5:
            zn(e, it, Zt);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return (st(e, Re()), e.callbackNode === i ? Cf.bind(null, e) : null);
  }
  function il(e, t) {
    const i = pi;
    return (
      e.current.memoizedState.isDehydrated && (On(e, t).flags |= 256),
      (e = Us(e, t)),
      e !== 2 && ((t = it), (it = i), t !== null && sl(t)),
      e
    );
  }
  function sl(e) {
    it === null ? (it = e) : it.push.apply(it, e);
  }
  function Uy(e) {
    for (let t = e; ; ) {
      if (t.flags & 16384) {
        var i = t.updateQueue;
        if (i !== null && ((i = i.stores), i !== null)) {
          for (let o = 0; o < i.length; o++) {
            let u = i[o],
              c = u.getSnapshot;
            u = u.value;
            try {
              if (!Et(c(), u)) {
                return !1;
              }
            } catch {
              return !1;
            }
          }
        }
      }
      if (((i = t.child), t.subtreeFlags & 16384 && i !== null)) {
        ((i.return = t), (t = i));
      } else {
        if (t === e) {
          break;
        }
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) {
            return !0;
          }
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function wn(e, t) {
    for (
      t &= ~el,
        t &= ~Vs,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      const i = 31 - Pt(t),
        o = 1 << i;
      ((e[i] = -1), (t &= ~o));
    }
  }
  function Tf(e) {
    if (ue & 6) {
      throw Error(s(327));
    }
    gr();
    let t = Yi(e, 0);
    if (!(t & 1)) {
      return (st(e, Re()), null);
    }
    let i = Us(e, t);
    if (e.tag !== 0 && i === 2) {
      const o = Io(e);
      o !== 0 && ((t = o), (i = il(e, o)));
    }
    if (i === 1) {
      throw ((i = hi), On(e, 0), wn(e, t), st(e, Re()), i);
    }
    if (i === 6) {
      throw Error(s(345));
    }
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      zn(e, it, Zt),
      st(e, Re()),
      null
    );
  }
  function ol(e, t) {
    const i = ue;
    ue |= 1;
    try {
      return e(t);
    } finally {
      ((ue = i), ue === 0 && ((mr = Re() + 500), ps && hn()));
    }
  }
  function In(e) {
    vn !== null && vn.tag === 0 && !(ue & 6) && gr();
    const t = ue;
    ue |= 1;
    const i = wt.transition,
      o = me;
    try {
      if (((wt.transition = null), (me = 1), e)) {
        return e();
      }
    } finally {
      ((me = o), (wt.transition = i), (ue = t), !(ue & 6) && hn());
    }
  }
  function al() {
    ((ht = pr.current), xe(pr));
  }
  function On(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    let i = e.timeoutHandle;
    if ((i !== -1 && ((e.timeoutHandle = -1), yy(i)), Le !== null)) {
      for (i = Le.return; i !== null; ) {
        var o = i;
        switch ((ga(o), o.tag)) {
          case 1:
            ((o = o.type.childContextTypes), o != null && fs());
            break;
          case 3:
            (dr(), xe(tt), xe(We), Ra());
            break;
          case 5:
            Na(o);
            break;
          case 4:
            dr();
            break;
          case 13:
            xe(Te);
            break;
          case 19:
            xe(Te);
            break;
          case 10:
            ka(o.type._context);
            break;
          case 22:
          case 23:
            al();
        }
        i = i.return;
      }
    }
    if (
      ((Oe = e),
      (Le = e = Sn(e.current, null)),
      ($e = ht = t),
      (_e = 0),
      (hi = null),
      (el = Vs = Fn = 0),
      (it = pi = null),
      Dn !== null)
    ) {
      for (t = 0; t < Dn.length; t++) {
        if (((i = Dn[t]), (o = i.interleaved), o !== null)) {
          i.interleaved = null;
          const u = o.next,
            c = i.pending;
          if (c !== null) {
            const g = c.next;
            ((c.next = u), (o.next = g));
          }
          i.pending = o;
        }
      }
      Dn = null;
    }
    return e;
  }
  function Pf(e, t) {
    do {
      let i = Le;
      try {
        if ((Sa(), (Ts.current = js), Ps)) {
          for (let o = Pe.memoizedState; o !== null; ) {
            const u = o.queue;
            (u !== null && (u.pending = null), (o = o.next));
          }
          Ps = !1;
        }
        if (
          ((Vn = 0),
          (Ie = De = Pe = null),
          (ai = !1),
          (li = 0),
          (Ja.current = null),
          i === null || i.return === null)
        ) {
          ((_e = 1), (hi = t), (Le = null));
          break;
        }
        e: {
          let c = e,
            g = i.return,
            S = i,
            k = t;
          if (
            ((t = $e),
            (S.flags |= 32768),
            k !== null && typeof k === 'object' && typeof k.then === 'function')
          ) {
            const D = k,
              O = S,
              z = O.tag;
            if (!(O.mode & 1) && (z === 0 || z === 11 || z === 15)) {
              const F = O.alternate;
              F
                ? ((O.updateQueue = F.updateQueue),
                  (O.memoizedState = F.memoizedState),
                  (O.lanes = F.lanes))
                : ((O.updateQueue = null), (O.memoizedState = null));
            }
            const b = Yd(g);
            if (b !== null) {
              ((b.flags &= -257),
                Xd(b, g, S, c, t),
                b.mode & 1 && Qd(c, D, t),
                (t = b),
                (k = D));
              const G = t.updateQueue;
              if (G === null) {
                const Q = new Set();
                (Q.add(k), (t.updateQueue = Q));
              } else {
                G.add(k);
              }
              break e;
            } else {
              if (!(t & 1)) {
                (Qd(c, D, t), ll());
                break e;
              }
              k = Error(s(426));
            }
          } else if (ke && S.mode & 1) {
            const Me = Yd(g);
            if (Me !== null) {
              (!(Me.flags & 65536) && (Me.flags |= 256),
                Xd(Me, g, S, c, t),
                xa(fr(k, S)));
              break e;
            }
          }
          ((c = k = fr(k, S)),
            _e !== 4 && (_e = 2),
            pi === null ? (pi = [c]) : pi.push(c),
            (c = g));
          do {
            switch (c.tag) {
              case 3:
                ((c.flags |= 65536), (t &= -t), (c.lanes |= t));
                var M = Kd(c, k, t);
                xd(c, M);
                break e;
              case 1:
                S = k;
                var E = c.type,
                  L = c.stateNode;
                if (
                  !(c.flags & 128) &&
                  (typeof E.getDerivedStateFromError === 'function' ||
                    (L !== null &&
                      typeof L.componentDidCatch === 'function' &&
                      (yn === null || !yn.has(L))))
                ) {
                  ((c.flags |= 65536), (t &= -t), (c.lanes |= t));
                  const B = Gd(c, S, t);
                  xd(c, B);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        jf(i);
      } catch (Y) {
        ((t = Y), Le === i && i !== null && (Le = i = i.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Ef() {
    const e = _s.current;
    return ((_s.current = js), e === null ? js : e);
  }
  function ll() {
    ((_e === 0 || _e === 3 || _e === 2) && (_e = 4),
      Oe === null || (!(Fn & 268435455) && !(Vs & 268435455)) || wn(Oe, $e));
  }
  function Us(e, t) {
    const i = ue;
    ue |= 2;
    const o = Ef();
    (Oe !== e || $e !== t) && ((Zt = null), On(e, t));
    do {
      try {
        $y();
        break;
      } catch (u) {
        Pf(e, u);
      }
    } while (!0);
    if ((Sa(), (ue = i), (_s.current = o), Le !== null)) {
      throw Error(s(261));
    }
    return ((Oe = null), ($e = 0), _e);
  }
  function $y() {
    for (; Le !== null; ) {
      Nf(Le);
    }
  }
  function by() {
    for (; Le !== null && !pg(); ) {
      Nf(Le);
    }
  }
  function Nf(e) {
    const t = Af(e.alternate, e, ht);
    ((e.memoizedProps = e.pendingProps),
      t === null ? jf(e) : (Le = t),
      (Ja.current = null));
  }
  function jf(e) {
    let t = e;
    do {
      let i = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((i = Fy(i, t)), i !== null)) {
          ((i.flags &= 32767), (Le = i));
          return;
        }
        if (e !== null) {
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        } else {
          ((_e = 6), (Le = null));
          return;
        }
      } else if (((i = Vy(i, t, ht)), i !== null)) {
        Le = i;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Le = t;
        return;
      }
      Le = t = e;
    } while (t !== null);
    _e === 0 && (_e = 5);
  }
  function zn(e, t, i) {
    const o = me,
      u = wt.transition;
    try {
      ((wt.transition = null), (me = 1), Wy(e, t, i, o));
    } finally {
      ((wt.transition = u), (me = o));
    }
    return null;
  }
  function Wy(e, t, i, o) {
    do {
      gr();
    } while (vn !== null);
    if (ue & 6) {
      throw Error(s(327));
    }
    i = e.finishedWork;
    let u = e.finishedLanes;
    if (i === null) {
      return null;
    }
    if (((e.finishedWork = null), (e.finishedLanes = 0), i === e.current)) {
      throw Error(s(177));
    }
    ((e.callbackNode = null), (e.callbackPriority = 0));
    let c = i.lanes | i.childLanes;
    if (
      (Tg(e, c),
      e === Oe && ((Le = Oe = null), ($e = 0)),
      (!(i.subtreeFlags & 2064) && !(i.flags & 2064)) ||
        Is ||
        ((Is = !0),
        Lf(Hi, function () {
          return (gr(), null);
        })),
      (c = (i.flags & 15990) !== 0),
      i.subtreeFlags & 15990 || c)
    ) {
      ((c = wt.transition), (wt.transition = null));
      const g = me;
      me = 1;
      const S = ue;
      ((ue |= 4),
        (Ja.current = null),
        Oy(e, i),
        vf(i, e),
        cy(la),
        (qi = !!aa),
        (la = aa = null),
        (e.current = i),
        zy(i),
        mg(),
        (ue = S),
        (me = g),
        (wt.transition = c));
    } else {
      e.current = i;
    }
    if (
      (Is && ((Is = !1), (vn = e), (Os = u)),
      (c = e.pendingLanes),
      c === 0 && (yn = null),
      vg(i.stateNode),
      st(e, Re()),
      t !== null)
    ) {
      for (o = e.onRecoverableError, i = 0; i < t.length; i++) {
        ((u = t[i]), o(u.value, { componentStack: u.stack, digest: u.digest }));
      }
    }
    if (Fs) {
      throw ((Fs = !1), (e = nl), (nl = null), e);
    }
    return (
      Os & 1 && e.tag !== 0 && gr(),
      (c = e.pendingLanes),
      c & 1 ? (e === rl ? mi++ : ((mi = 0), (rl = e))) : (mi = 0),
      hn(),
      null
    );
  }
  function gr() {
    if (vn !== null) {
      let e = mc(Os),
        t = wt.transition,
        i = me;
      try {
        if (((wt.transition = null), (me = 16 > e ? 16 : e), vn === null)) {
          var o = !1;
        } else {
          if (((e = vn), (vn = null), (Os = 0), ue & 6)) {
            throw Error(s(331));
          }
          const u = ue;
          for (ue |= 4, K = e.current; K !== null; ) {
            var c = K,
              g = c.child;
            if (K.flags & 16) {
              var S = c.deletions;
              if (S !== null) {
                for (let k = 0; k < S.length; k++) {
                  const D = S[k];
                  for (K = D; K !== null; ) {
                    let O = K;
                    switch (O.tag) {
                      case 0:
                      case 11:
                      case 15:
                        fi(8, O, c);
                    }
                    const z = O.child;
                    if (z !== null) {
                      ((z.return = O), (K = z));
                    } else {
                      for (; K !== null; ) {
                        O = K;
                        const F = O.sibling,
                          b = O.return;
                        if ((hf(O), O === D)) {
                          K = null;
                          break;
                        }
                        if (F !== null) {
                          ((F.return = b), (K = F));
                          break;
                        }
                        K = b;
                      }
                    }
                  }
                }
                const G = c.alternate;
                if (G !== null) {
                  let Q = G.child;
                  if (Q !== null) {
                    G.child = null;
                    do {
                      const Me = Q.sibling;
                      ((Q.sibling = null), (Q = Me));
                    } while (Q !== null);
                  }
                }
                K = c;
              }
            }
            if (c.subtreeFlags & 2064 && g !== null) {
              ((g.return = c), (K = g));
            } else {
              e: for (; K !== null; ) {
                if (((c = K), c.flags & 2048)) {
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      fi(9, c, c.return);
                  }
                }
                const M = c.sibling;
                if (M !== null) {
                  ((M.return = c.return), (K = M));
                  break e;
                }
                K = c.return;
              }
            }
          }
          const E = e.current;
          for (K = E; K !== null; ) {
            g = K;
            const L = g.child;
            if (g.subtreeFlags & 2064 && L !== null) {
              ((L.return = g), (K = L));
            } else {
              e: for (g = E; K !== null; ) {
                if (((S = K), S.flags & 2048)) {
                  try {
                    switch (S.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ds(9, S);
                    }
                  } catch (Y) {
                    Ne(S, S.return, Y);
                  }
                }
                if (S === g) {
                  K = null;
                  break e;
                }
                const B = S.sibling;
                if (B !== null) {
                  ((B.return = S.return), (K = B));
                  break e;
                }
                K = S.return;
              }
            }
          }
          if (
            ((ue = u),
            hn(),
            Ft && typeof Ft.onPostCommitFiberRoot === 'function')
          ) {
            try {
              Ft.onPostCommitFiberRoot(Ki, e);
            } catch {}
          }
          o = !0;
        }
        return o;
      } finally {
        ((me = i), (wt.transition = t));
      }
    }
    return !1;
  }
  function Rf(e, t, i) {
    ((t = fr(i, t)),
      (t = Kd(e, t, 1)),
      (e = mn(e, t, 1)),
      (t = Je()),
      e !== null && (zr(e, 1, t), st(e, t)));
  }
  function Ne(e, t, i) {
    if (e.tag === 3) {
      Rf(e, e, i);
    } else {
      for (; t !== null; ) {
        if (t.tag === 3) {
          Rf(t, e, i);
          break;
        } else if (t.tag === 1) {
          const o = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError === 'function' ||
            (typeof o.componentDidCatch === 'function' &&
              (yn === null || !yn.has(o)))
          ) {
            ((e = fr(i, e)),
              (e = Gd(t, e, 1)),
              (t = mn(t, e, 1)),
              (e = Je()),
              t !== null && (zr(t, 1, e), st(t, e)));
            break;
          }
        }
        t = t.return;
      }
    }
  }
  function Hy(e, t, i) {
    const o = e.pingCache;
    (o !== null && o.delete(t),
      (t = Je()),
      (e.pingedLanes |= e.suspendedLanes & i),
      Oe === e &&
        ($e & i) === i &&
        (_e === 4 || (_e === 3 && ($e & 130023424) === $e && 500 > Re() - tl)
          ? On(e, 0)
          : (el |= i)),
      st(e, t));
  }
  function Mf(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = Qi), (Qi <<= 1), !(Qi & 130023424) && (Qi = 4194304))
        : (t = 1));
    const i = Je();
    ((e = Qt(e, t)), e !== null && (zr(e, t, i), st(e, i)));
  }
  function Ky(e) {
    let t = e.memoizedState,
      i = 0;
    (t !== null && (i = t.retryLane), Mf(e, i));
  }
  function Gy(e, t) {
    let i = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode,
          u = e.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    (o !== null && o.delete(t), Mf(e, i));
  }
  let Af;
  Af = function (e, t, i) {
    if (e !== null) {
      if (e.memoizedProps !== t.pendingProps || tt.current) {
        rt = !0;
      } else {
        if (!(e.lanes & i) && !(t.flags & 128)) {
          return ((rt = !1), _y(e, t, i));
        }
        rt = !!(e.flags & 131072);
      }
    } else {
      ((rt = !1), ke && t.flags & 1048576 && ud(t, gs, t.index));
    }
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var o = t.type;
        (As(e, t), (e = t.pendingProps));
        var u = ir(t, We.current);
        (cr(t, i), (u = La(null, t, o, e, u, i)));
        var c = Da();
        return (
          (t.flags |= 1),
          typeof u === 'object' &&
          u !== null &&
          typeof u.render === 'function' &&
          u.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              nt(o) ? ((c = !0), hs(t)) : (c = !1),
              (t.memoizedState =
                u.state !== null && u.state !== void 0 ? u.state : null),
              Pa(t),
              (u.updater = Rs),
              (t.stateNode = u),
              (u._reactInternals = t),
              za(t, o, e, i),
              (t = ba(null, t, o, !0, c, i)))
            : ((t.tag = 0), ke && c && ma(t), qe(null, t, u, i), (t = t.child)),
          t
        );
      case 16:
        o = t.elementType;
        e: {
          switch (
            (As(e, t),
            (e = t.pendingProps),
            (u = o._init),
            (o = u(o._payload)),
            (t.type = o),
            (u = t.tag = Yy(o)),
            (e = jt(o, e)),
            u)
          ) {
            case 0:
              t = $a(null, t, o, e, i);
              break e;
            case 1:
              t = nf(null, t, o, e, i);
              break e;
            case 11:
              t = Zd(null, t, o, e, i);
              break e;
            case 14:
              t = qd(null, t, o, jt(o.type, e), i);
              break e;
          }
          throw Error(s(306, o, ''));
        }
        return t;
      case 0:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : jt(o, u)),
          $a(e, t, o, u, i)
        );
      case 1:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : jt(o, u)),
          nf(e, t, o, u, i)
        );
      case 3:
        e: {
          if ((rf(t), e === null)) {
            throw Error(s(387));
          }
          ((o = t.pendingProps),
            (c = t.memoizedState),
            (u = c.element),
            vd(e, t),
            ks(t, o, null, i));
          var g = t.memoizedState;
          if (((o = g.element), c.isDehydrated)) {
            if (
              ((c = {
                element: o,
                isDehydrated: !1,
                cache: g.cache,
                pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
                transitions: g.transitions,
              }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              ((u = fr(Error(s(423)), t)), (t = sf(e, t, o, i, u)));
              break e;
            } else if (o !== u) {
              ((u = fr(Error(s(424)), t)), (t = sf(e, t, o, i, u)));
              break e;
            } else {
              for (
                ft = cn(t.stateNode.containerInfo.firstChild),
                  dt = t,
                  ke = !0,
                  Nt = null,
                  i = gd(t, null, o, i),
                  t.child = i;
                i;

              ) {
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
              }
            }
          } else {
            if ((ar(), o === u)) {
              t = Xt(e, t, i);
              break e;
            }
            qe(e, t, o, i);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Sd(t),
          e === null && va(t),
          (o = t.type),
          (u = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (g = u.children),
          ua(o, u) ? (g = null) : c !== null && ua(o, c) && (t.flags |= 32),
          tf(e, t),
          qe(e, t, g, i),
          t.child
        );
      case 6:
        return (e === null && va(t), null);
      case 13:
        return of(e, t, i);
      case 4:
        return (
          Ea(t, t.stateNode.containerInfo),
          (o = t.pendingProps),
          e === null ? (t.child = lr(t, null, o, i)) : qe(e, t, o, i),
          t.child
        );
      case 11:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : jt(o, u)),
          Zd(e, t, o, u, i)
        );
      case 7:
        return (qe(e, t, t.pendingProps, i), t.child);
      case 8:
        return (qe(e, t, t.pendingProps.children, i), t.child);
      case 12:
        return (qe(e, t, t.pendingProps.children, i), t.child);
      case 10:
        e: {
          if (
            ((o = t.type._context),
            (u = t.pendingProps),
            (c = t.memoizedProps),
            (g = u.value),
            ye(xs, o._currentValue),
            (o._currentValue = g),
            c !== null)
          ) {
            if (Et(c.value, g)) {
              if (c.children === u.children && !tt.current) {
                t = Xt(e, t, i);
                break e;
              }
            } else {
              for (c = t.child, c !== null && (c.return = t); c !== null; ) {
                let S = c.dependencies;
                if (S !== null) {
                  g = c.child;
                  for (let k = S.firstContext; k !== null; ) {
                    if (k.context === o) {
                      if (c.tag === 1) {
                        ((k = Yt(-1, i & -i)), (k.tag = 2));
                        let D = c.updateQueue;
                        if (D !== null) {
                          D = D.shared;
                          const O = D.pending;
                          (O === null
                            ? (k.next = k)
                            : ((k.next = O.next), (O.next = k)),
                            (D.pending = k));
                        }
                      }
                      ((c.lanes |= i),
                        (k = c.alternate),
                        k !== null && (k.lanes |= i),
                        Ca(c.return, i, t),
                        (S.lanes |= i));
                      break;
                    }
                    k = k.next;
                  }
                } else if (c.tag === 10) {
                  g = c.type === t.type ? null : c.child;
                } else if (c.tag === 18) {
                  if (((g = c.return), g === null)) {
                    throw Error(s(341));
                  }
                  ((g.lanes |= i),
                    (S = g.alternate),
                    S !== null && (S.lanes |= i),
                    Ca(g, i, t),
                    (g = c.sibling));
                } else {
                  g = c.child;
                }
                if (g !== null) {
                  g.return = c;
                } else {
                  for (g = c; g !== null; ) {
                    if (g === t) {
                      g = null;
                      break;
                    }
                    if (((c = g.sibling), c !== null)) {
                      ((c.return = g.return), (g = c));
                      break;
                    }
                    g = g.return;
                  }
                }
                c = g;
              }
            }
          }
          (qe(e, t, u.children, i), (t = t.child));
        }
        return t;
      case 9:
        return (
          (u = t.type),
          (o = t.pendingProps.children),
          cr(t, i),
          (u = vt(u)),
          (o = o(u)),
          (t.flags |= 1),
          qe(e, t, o, i),
          t.child
        );
      case 14:
        return (
          (o = t.type),
          (u = jt(o, t.pendingProps)),
          (u = jt(o.type, u)),
          qd(e, t, o, u, i)
        );
      case 15:
        return Jd(e, t, t.type, t.pendingProps, i);
      case 17:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : jt(o, u)),
          As(e, t),
          (t.tag = 1),
          nt(o) ? ((e = !0), hs(t)) : (e = !1),
          cr(t, i),
          Wd(t, o, u),
          za(t, o, u, i),
          ba(null, t, o, !0, e, i)
        );
      case 19:
        return lf(e, t, i);
      case 22:
        return ef(e, t, i);
    }
    throw Error(s(156, t.tag));
  };
  function Lf(e, t) {
    return cc(e, t);
  }
  function Qy(e, t, i, o) {
    ((this.tag = e),
      (this.key = i),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = o),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function St(e, t, i, o) {
    return new Qy(e, t, i, o);
  }
  function ul(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Yy(e) {
    if (typeof e === 'function') {
      return ul(e) ? 1 : 0;
    }
    if (e != null) {
      if (((e = e.$$typeof), e === lt)) {
        return 11;
      }
      if (e === Tt) {
        return 14;
      }
    }
    return 2;
  }
  function Sn(e, t) {
    let i = e.alternate;
    return (
      i === null
        ? ((i = St(e.tag, t, e.key, e.mode)),
          (i.elementType = e.elementType),
          (i.type = e.type),
          (i.stateNode = e.stateNode),
          (i.alternate = e),
          (e.alternate = i))
        : ((i.pendingProps = t),
          (i.type = e.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = e.flags & 14680064),
      (i.childLanes = e.childLanes),
      (i.lanes = e.lanes),
      (i.child = e.child),
      (i.memoizedProps = e.memoizedProps),
      (i.memoizedState = e.memoizedState),
      (i.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (i.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (i.sibling = e.sibling),
      (i.index = e.index),
      (i.ref = e.ref),
      i
    );
  }
  function $s(e, t, i, o, u, c) {
    let g = 2;
    if (((o = e), typeof e === 'function')) {
      ul(e) && (g = 1);
    } else if (typeof e === 'string') {
      g = 5;
    } else {
      e: switch (e) {
        case re:
          return Bn(i.children, u, c, t);
        case X:
          ((g = 8), (u |= 8));
          break;
        case ae:
          return (
            (e = St(12, i, t, u | 2)),
            (e.elementType = ae),
            (e.lanes = c),
            e
          );
        case Xe:
          return (
            (e = St(13, i, t, u)),
            (e.elementType = Xe),
            (e.lanes = c),
            e
          );
        case et:
          return (
            (e = St(19, i, t, u)),
            (e.elementType = et),
            (e.lanes = c),
            e
          );
        case se:
          return bs(i, u, c, t);
        default:
          if (typeof e === 'object' && e !== null) {
            switch (e.$$typeof) {
              case he:
                g = 10;
                break e;
              case Be:
                g = 9;
                break e;
              case lt:
                g = 11;
                break e;
              case Tt:
                g = 14;
                break e;
              case Ze:
                ((g = 16), (o = null));
                break e;
            }
          }
          throw Error(s(130, e == null ? e : typeof e, ''));
      }
    }
    return (
      (t = St(g, i, t, u)),
      (t.elementType = e),
      (t.type = o),
      (t.lanes = c),
      t
    );
  }
  function Bn(e, t, i, o) {
    return ((e = St(7, e, o, t)), (e.lanes = i), e);
  }
  function bs(e, t, i, o) {
    return (
      (e = St(22, e, o, t)),
      (e.elementType = se),
      (e.lanes = i),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function cl(e, t, i) {
    return ((e = St(6, e, null, t)), (e.lanes = i), e);
  }
  function dl(e, t, i) {
    return (
      (t = St(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = i),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Xy(e, t, i, o, u) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Oo(0)),
      (this.expirationTimes = Oo(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Oo(0)),
      (this.identifierPrefix = o),
      (this.onRecoverableError = u),
      (this.mutableSourceEagerHydrationData = null));
  }
  function fl(e, t, i, o, u, c, g, S, k) {
    return (
      (e = new Xy(e, t, i, S, k)),
      t === 1 ? ((t = 1), c === !0 && (t |= 8)) : (t = 0),
      (c = St(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (c.memoizedState = {
        element: o,
        isDehydrated: i,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Pa(c),
      e
    );
  }
  function Zy(e, t, i) {
    const o =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: te,
      key: o == null ? null : '' + o,
      children: e,
      containerInfo: t,
      implementation: i,
    };
  }
  function Df(e) {
    if (!e) {
      return fn;
    }
    e = e._reactInternals;
    e: {
      if (jn(e) !== e || e.tag !== 1) {
        throw Error(s(170));
      }
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (nt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      const i = e.type;
      if (nt(i)) {
        return od(e, i, t);
      }
    }
    return t;
  }
  function _f(e, t, i, o, u, c, g, S, k) {
    return (
      (e = fl(i, o, !0, e, u, c, g, S, k)),
      (e.context = Df(null)),
      (i = e.current),
      (o = Je()),
      (u = xn(i)),
      (c = Yt(o, u)),
      (c.callback = t ?? null),
      mn(i, c, u),
      (e.current.lanes = u),
      zr(e, u, o),
      st(e, o),
      e
    );
  }
  function Ws(e, t, i, o) {
    const u = t.current,
      c = Je(),
      g = xn(u);
    return (
      (i = Df(i)),
      t.context === null ? (t.context = i) : (t.pendingContext = i),
      (t = Yt(c, g)),
      (t.payload = { element: e }),
      (o = o === void 0 ? null : o),
      o !== null && (t.callback = o),
      (e = mn(u, t, g)),
      e !== null && (At(e, u, g, c), Ss(e, u, g)),
      g
    );
  }
  function Hs(e) {
    if (((e = e.current), !e.child)) {
      return null;
    }
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Vf(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      const i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function hl(e, t) {
    (Vf(e, t), (e = e.alternate) && Vf(e, t));
  }
  const Ff =
    typeof reportError === 'function'
      ? reportError
      : function (e) {
          console.error(e);
        };
  function pl(e) {
    this._internalRoot = e;
  }
  ((Ks.prototype.render = pl.prototype.render =
    function (e) {
      const t = this._internalRoot;
      if (t === null) {
        throw Error(s(409));
      }
      Ws(e, t, null, null);
    }),
    (Ks.prototype.unmount = pl.prototype.unmount =
      function () {
        const e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          const t = e.containerInfo;
          (In(function () {
            Ws(null, e, null, null);
          }),
            (t[Wt] = null));
        }
      }));
  function Ks(e) {
    this._internalRoot = e;
  }
  Ks.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      const t = vc();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < an.length && t !== 0 && t < an[i].priority; i++) {}
      (an.splice(i, 0, e), i === 0 && Sc(e));
    }
  };
  function ml(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Gs(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function If() {}
  function qy(e, t, i, o, u) {
    if (u) {
      if (typeof o === 'function') {
        const c = o;
        o = function () {
          const D = Hs(g);
          c.call(D);
        };
      }
      var g = _f(t, o, e, 0, null, !1, !1, '', If);
      return (
        (e._reactRootContainer = g),
        (e[Wt] = g.current),
        Jr(e.nodeType === 8 ? e.parentNode : e),
        In(),
        g
      );
    }
    for (; (u = e.lastChild); ) {
      e.removeChild(u);
    }
    if (typeof o === 'function') {
      const S = o;
      o = function () {
        const D = Hs(k);
        S.call(D);
      };
    }
    var k = fl(e, 0, !1, null, null, !1, !1, '', If);
    return (
      (e._reactRootContainer = k),
      (e[Wt] = k.current),
      Jr(e.nodeType === 8 ? e.parentNode : e),
      In(function () {
        Ws(t, k, i, o);
      }),
      k
    );
  }
  function Qs(e, t, i, o, u) {
    const c = i._reactRootContainer;
    if (c) {
      var g = c;
      if (typeof u === 'function') {
        const S = u;
        u = function () {
          const k = Hs(g);
          S.call(k);
        };
      }
      Ws(t, g, e, u);
    } else {
      g = qy(i, t, e, u, o);
    }
    return Hs(g);
  }
  ((gc = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          const i = Or(t.pendingLanes);
          i !== 0 &&
            (zo(t, i | 1), st(t, Re()), !(ue & 6) && ((mr = Re() + 500), hn()));
        }
        break;
      case 13:
        (In(function () {
          const o = Qt(e, 1);
          if (o !== null) {
            const u = Je();
            At(o, e, 1, u);
          }
        }),
          hl(e, 1));
    }
  }),
    (Bo = function (e) {
      if (e.tag === 13) {
        const t = Qt(e, 134217728);
        if (t !== null) {
          const i = Je();
          At(t, e, 134217728, i);
        }
        hl(e, 134217728);
      }
    }),
    (yc = function (e) {
      if (e.tag === 13) {
        const t = xn(e),
          i = Qt(e, t);
        if (i !== null) {
          const o = Je();
          At(i, e, t, o);
        }
        hl(e, t);
      }
    }),
    (vc = function () {
      return me;
    }),
    (xc = function (e, t) {
      const i = me;
      try {
        return ((me = e), t());
      } finally {
        me = i;
      }
    }),
    (Lo = function (e, t, i) {
      switch (t) {
        case 'input':
          if ((To(e, i), (t = i.name), i.type === 'radio' && t != null)) {
            for (i = e; i.parentNode; ) {
              i = i.parentNode;
            }
            for (
              i = i.querySelectorAll(
                'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
              ),
                t = 0;
              t < i.length;
              t++
            ) {
              const o = i[t];
              if (o !== e && o.form === e.form) {
                const u = ds(o);
                if (!u) {
                  throw Error(s(90));
                }
                (bu(o), To(o, u));
              }
            }
          }
          break;
        case 'textarea':
          Qu(e, i);
          break;
        case 'select':
          ((t = i.value), t != null && Kn(e, !!i.multiple, t, !1));
      }
    }),
    (rc = ol),
    (ic = In));
  const Jy = { usingClientEntryPoint: !1, Events: [ni, nr, ds, tc, nc, ol] },
    gi = {
      findFiberByHostInstance: Rn,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    e0 = {
      bundleType: gi.bundleType,
      version: gi.version,
      rendererPackageName: gi.rendererPackageName,
      rendererConfig: gi.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: H.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = lc(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: gi.findFiberByHostInstance,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    const Ys = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ys.isDisabled && Ys.supportsFiber) {
      try {
        ((Ki = Ys.inject(e0)), (Ft = Ys));
      } catch {}
    }
  }
  return (
    (ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jy),
    (ot.createPortal = function (e, t) {
      const i =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ml(t)) {
        throw Error(s(200));
      }
      return Zy(e, t, null, i);
    }),
    (ot.createRoot = function (e, t) {
      if (!ml(e)) {
        throw Error(s(299));
      }
      let i = !1,
        o = '',
        u = Ff;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (i = !0),
          t.identifierPrefix !== void 0 && (o = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = fl(e, 1, !1, null, null, i, !1, o, u)),
        (e[Wt] = t.current),
        Jr(e.nodeType === 8 ? e.parentNode : e),
        new pl(t)
      );
    }),
    (ot.findDOMNode = function (e) {
      if (e == null) {
        return null;
      }
      if (e.nodeType === 1) {
        return e;
      }
      const t = e._reactInternals;
      if (t === void 0) {
        throw typeof e.render === 'function'
          ? Error(s(188))
          : ((e = Object.keys(e).join(',')), Error(s(268, e)));
      }
      return ((e = lc(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (ot.flushSync = function (e) {
      return In(e);
    }),
    (ot.hydrate = function (e, t, i) {
      if (!Gs(t)) {
        throw Error(s(200));
      }
      return Qs(null, e, t, !0, i);
    }),
    (ot.hydrateRoot = function (e, t, i) {
      if (!ml(e)) {
        throw Error(s(405));
      }
      let o = (i != null && i.hydratedSources) || null,
        u = !1,
        c = '',
        g = Ff;
      if (
        (i != null &&
          (i.unstable_strictMode === !0 && (u = !0),
          i.identifierPrefix !== void 0 && (c = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (g = i.onRecoverableError)),
        (t = _f(t, null, e, 1, i ?? null, u, !1, c, g)),
        (e[Wt] = t.current),
        Jr(e),
        o)
      ) {
        for (e = 0; e < o.length; e++) {
          ((i = o[e]),
            (u = i._getVersion),
            (u = u(i._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [i, u])
              : t.mutableSourceEagerHydrationData.push(i, u));
        }
      }
      return new Ks(t);
    }),
    (ot.render = function (e, t, i) {
      if (!Gs(t)) {
        throw Error(s(200));
      }
      return Qs(null, e, t, !1, i);
    }),
    (ot.unmountComponentAtNode = function (e) {
      if (!Gs(e)) {
        throw Error(s(40));
      }
      return e._reactRootContainer
        ? (In(function () {
            Qs(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[Wt] = null));
            });
          }),
          !0)
        : !1;
    }),
    (ot.unstable_batchedUpdates = ol),
    (ot.unstable_renderSubtreeIntoContainer = function (e, t, i, o) {
      if (!Gs(i)) {
        throw Error(s(200));
      }
      if (e == null || e._reactInternals === void 0) {
        throw Error(s(38));
      }
      return Qs(e, t, i, !1, o);
    }),
    (ot.version = '18.3.1-next-f1338f8080-20240426'),
    ot
  );
}
let Hf;
function l0() {
  if (Hf) {
    return vl.exports;
  }
  Hf = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
      )
    ) {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
    }
  }
  return (n(), (vl.exports = a0()), vl.exports);
}
let Kf;
function u0() {
  if (Kf) {
    return Xs;
  }
  Kf = 1;
  const n = l0();
  return ((Xs.createRoot = n.createRoot), (Xs.hydrateRoot = n.hydrateRoot), Xs);
}
let c0 = u0(),
  vi = {},
  Gf;
function d0() {
  if (Gf) {
    return vi;
  }
  ((Gf = 1),
    Object.defineProperty(vi, '__esModule', { value: !0 }),
    (vi.parse = d),
    (vi.serialize = m));
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    r = /^[\u0021-\u003A\u003C-\u007E]*$/,
    s =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    a = /^[\u0020-\u003A\u003D-\u007E]*$/,
    l = Object.prototype.toString,
    f = (() => {
      const x = function () {};
      return ((x.prototype = Object.create(null)), x);
    })();
  function d(x, N) {
    const T = new f(),
      P = x.length;
    if (P < 2) {
      return T;
    }
    const A = (N == null ? void 0 : N.decode) || y;
    let C = 0;
    do {
      const _ = x.indexOf('=', C);
      if (_ === -1) {
        break;
      }
      const V = x.indexOf(';', C),
        H = V === -1 ? P : V;
      if (_ > H) {
        C = x.lastIndexOf(';', _ - 1) + 1;
        continue;
      }
      const $ = p(x, C, _),
        te = h(x, _, $),
        re = x.slice($, te);
      if (T[re] === void 0) {
        const X = p(x, _ + 1, H),
          ae = h(x, H, X);
        const he = A(x.slice(X, ae));
        T[re] = he;
      }
      C = H + 1;
    } while (C < P);
    return T;
  }
  function p(x, N, T) {
    do {
      const P = x.charCodeAt(N);
      if (P !== 32 && P !== 9) {
        return N;
      }
    } while (++N < T);
    return T;
  }
  function h(x, N, T) {
    for (; N > T; ) {
      const P = x.charCodeAt(--N);
      if (P !== 32 && P !== 9) {
        return N + 1;
      }
    }
    return T;
  }
  function m(x, N, T) {
    const P = (T == null ? void 0 : T.encode) || encodeURIComponent;
    if (!n.test(x)) {
      throw new TypeError(`argument name is invalid: ${x}`);
    }
    const A = P(N);
    if (!r.test(A)) {
      throw new TypeError(`argument val is invalid: ${N}`);
    }
    let C = x + '=' + A;
    if (!T) {
      return C;
    }
    if (T.maxAge !== void 0) {
      if (!Number.isInteger(T.maxAge)) {
        throw new TypeError(`option maxAge is invalid: ${T.maxAge}`);
      }
      C += '; Max-Age=' + T.maxAge;
    }
    if (T.domain) {
      if (!s.test(T.domain)) {
        throw new TypeError(`option domain is invalid: ${T.domain}`);
      }
      C += '; Domain=' + T.domain;
    }
    if (T.path) {
      if (!a.test(T.path)) {
        throw new TypeError(`option path is invalid: ${T.path}`);
      }
      C += '; Path=' + T.path;
    }
    if (T.expires) {
      if (!w(T.expires) || !Number.isFinite(T.expires.valueOf())) {
        throw new TypeError(`option expires is invalid: ${T.expires}`);
      }
      C += '; Expires=' + T.expires.toUTCString();
    }
    if (
      (T.httpOnly && (C += '; HttpOnly'),
      T.secure && (C += '; Secure'),
      T.partitioned && (C += '; Partitioned'),
      T.priority)
    ) {
      switch (
        typeof T.priority === 'string' ? T.priority.toLowerCase() : void 0
      ) {
        case 'low':
          C += '; Priority=Low';
          break;
        case 'medium':
          C += '; Priority=Medium';
          break;
        case 'high':
          C += '; Priority=High';
          break;
        default:
          throw new TypeError(`option priority is invalid: ${T.priority}`);
      }
    }
    if (T.sameSite) {
      switch (
        typeof T.sameSite === 'string' ? T.sameSite.toLowerCase() : T.sameSite
      ) {
        case !0:
        case 'strict':
          C += '; SameSite=Strict';
          break;
        case 'lax':
          C += '; SameSite=Lax';
          break;
        case 'none':
          C += '; SameSite=None';
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${T.sameSite}`);
      }
    }
    return C;
  }
  function y(x) {
    if (x.indexOf('%') === -1) {
      return x;
    }
    try {
      return decodeURIComponent(x);
    } catch {
      return x;
    }
  }
  function w(x) {
    return l.call(x) === '[object Date]';
  }
  return vi;
}
d0();
/**
 * react-router v7.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Qf = 'popstate';
function f0(n = {}) {
  function r(a, l) {
    const { pathname: f, search: d, hash: p } = a.location;
    return Fl(
      '',
      { pathname: f, search: d, hash: p },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || 'default'
    );
  }
  function s(a, l) {
    return typeof l === 'string' ? l : ji(l);
  }
  return p0(r, s, null, n);
}
function Ce(n, r) {
  if (n === !1 || n === null || typeof n > 'u') {
    throw new Error(r);
  }
}
function _t(n, r) {
  if (!n) {
    typeof console < 'u' && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function h0() {
  return Math.random().toString(36).substring(2, 10);
}
function Yf(n, r) {
  return { usr: n.state, key: n.key, idx: r };
}
function Fl(n, r, s = null, a) {
  return {
    pathname: typeof n === 'string' ? n : n.pathname,
    search: '',
    hash: '',
    ...(typeof r === 'string' ? Er(r) : r),
    state: s,
    key: (r && r.key) || a || h0(),
  };
}
function ji({ pathname: n = '/', search: r = '', hash: s = '' }) {
  return (
    r && r !== '?' && (n += r.charAt(0) === '?' ? r : '?' + r),
    s && s !== '#' && (n += s.charAt(0) === '#' ? s : '#' + s),
    n
  );
}
function Er(n) {
  const r = {};
  if (n) {
    const s = n.indexOf('#');
    s >= 0 && ((r.hash = n.substring(s)), (n = n.substring(0, s)));
    const a = n.indexOf('?');
    (a >= 0 && ((r.search = n.substring(a)), (n = n.substring(0, a))),
      n && (r.pathname = n));
  }
  return r;
}
function p0(n, r, s, a = {}) {
  let { window: l = document.defaultView, v5Compat: f = !1 } = a,
    d = l.history,
    p = 'POP',
    h = null,
    m = y();
  m == null && ((m = 0), d.replaceState({ ...d.state, idx: m }, ''));
  function y() {
    return (d.state || { idx: null }).idx;
  }
  function w() {
    p = 'POP';
    const A = y(),
      C = A == null ? null : A - m;
    ((m = A), h && h({ action: p, location: P.location, delta: C }));
  }
  function x(A, C) {
    p = 'PUSH';
    const _ = Fl(P.location, A, C);
    m = y() + 1;
    const V = Yf(_, m),
      H = P.createHref(_);
    try {
      d.pushState(V, '', H);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') {
        throw $;
      }
      l.location.assign(H);
    }
    f && h && h({ action: p, location: P.location, delta: 1 });
  }
  function N(A, C) {
    p = 'REPLACE';
    const _ = Fl(P.location, A, C);
    m = y();
    const V = Yf(_, m),
      H = P.createHref(_);
    (d.replaceState(V, '', H),
      f && h && h({ action: p, location: P.location, delta: 0 }));
  }
  function T(A) {
    let C = l.location.origin !== 'null' ? l.location.origin : l.location.href,
      _ = typeof A === 'string' ? A : ji(A);
    return (
      (_ = _.replace(/ $/, '%20')),
      Ce(
        C,
        `No window.location.(origin|href) available to create URL for href: ${_}`
      ),
      new URL(_, C)
    );
  }
  const P = {
    get action() {
      return p;
    },
    get location() {
      return n(l, d);
    },
    listen(A) {
      if (h) {
        throw new Error('A history only accepts one active listener');
      }
      return (
        l.addEventListener(Qf, w),
        (h = A),
        () => {
          (l.removeEventListener(Qf, w), (h = null));
        }
      );
    },
    createHref(A) {
      return r(l, A);
    },
    createURL: T,
    encodeLocation(A) {
      const C = T(A);
      return { pathname: C.pathname, search: C.search, hash: C.hash };
    },
    push: x,
    replace: N,
    go(A) {
      return d.go(A);
    },
  };
  return P;
}
function mp(n, r, s = '/') {
  return m0(n, r, s, !1);
}
function m0(n, r, s, a) {
  const l = typeof r === 'string' ? Er(r) : r,
    f = Tn(l.pathname || '/', s);
  if (f == null) {
    return null;
  }
  const d = gp(n);
  g0(d);
  let p = null;
  for (let h = 0; p == null && h < d.length; ++h) {
    const m = N0(f);
    p = P0(d[h], m, a);
  }
  return p;
}
function gp(n, r = [], s = [], a = '') {
  const l = (f, d, p) => {
    const h = {
      relativePath: p === void 0 ? f.path || '' : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: d,
      route: f,
    };
    h.relativePath.startsWith('/') &&
      (Ce(
        h.relativePath.startsWith(a),
        `Absolute route path "${h.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (h.relativePath = h.relativePath.slice(a.length)));
    const m = qt([a, h.relativePath]),
      y = s.concat(h);
    (f.children &&
      f.children.length > 0 &&
      (Ce(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
      ),
      gp(f.children, r, y, m)),
      !(f.path == null && !f.index) &&
        r.push({ path: m, score: C0(m, f.index), routesMeta: y }));
  };
  return (
    n.forEach((f, d) => {
      let p;
      if (f.path === '' || !((p = f.path) != null && p.includes('?'))) {
        l(f, d);
      } else {
        for (const h of yp(f.path)) {
          l(f, d, h);
        }
      }
    }),
    r
  );
}
function yp(n) {
  const r = n.split('/');
  if (r.length === 0) {
    return [];
  }
  const [s, ...a] = r,
    l = s.endsWith('?'),
    f = s.replace(/\?$/, '');
  if (a.length === 0) {
    return l ? [f, ''] : [f];
  }
  const d = yp(a.join('/')),
    p = [];
  return (
    p.push(...d.map(h => (h === '' ? f : [f, h].join('/')))),
    l && p.push(...d),
    p.map(h => (n.startsWith('/') && h === '' ? '/' : h))
  );
}
function g0(n) {
  n.sort((r, s) =>
    r.score !== s.score
      ? s.score - r.score
      : T0(
          r.routesMeta.map(a => a.childrenIndex),
          s.routesMeta.map(a => a.childrenIndex)
        )
  );
}
const y0 = /^:[\w-]+$/,
  v0 = 3,
  x0 = 2,
  w0 = 1,
  S0 = 10,
  k0 = -2,
  Xf = n => n === '*';
function C0(n, r) {
  let s = n.split('/'),
    a = s.length;
  return (
    s.some(Xf) && (a += k0),
    r && (a += x0),
    s
      .filter(l => !Xf(l))
      .reduce((l, f) => l + (y0.test(f) ? v0 : f === '' ? w0 : S0), a)
  );
}
function T0(n, r) {
  return n.length === r.length && n.slice(0, -1).every((a, l) => a === r[l])
    ? n[n.length - 1] - r[r.length - 1]
    : 0;
}
function P0(n, r, s = !1) {
  let { routesMeta: a } = n,
    l = {},
    f = '/',
    d = [];
  for (let p = 0; p < a.length; ++p) {
    let h = a[p],
      m = p === a.length - 1,
      y = f === '/' ? r : r.slice(f.length) || '/',
      w = oo(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: m },
        y
      ),
      x = h.route;
    if (
      (!w &&
        m &&
        s &&
        !a[a.length - 1].route.index &&
        (w = oo(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          y
        )),
      !w)
    ) {
      return null;
    }
    (Object.assign(l, w.params),
      d.push({
        params: l,
        pathname: qt([f, w.pathname]),
        pathnameBase: A0(qt([f, w.pathnameBase])),
        route: x,
      }),
      w.pathnameBase !== '/' && (f = qt([f, w.pathnameBase])));
  }
  return d;
}
function oo(n, r) {
  typeof n === 'string' && (n = { path: n, caseSensitive: !1, end: !0 });
  const [s, a] = E0(n.path, n.caseSensitive, n.end),
    l = r.match(s);
  if (!l) {
    return null;
  }
  let f = l[0],
    d = f.replace(/(.)\/+$/, '$1'),
    p = l.slice(1);
  return {
    params: a.reduce((m, { paramName: y, isOptional: w }, x) => {
      if (y === '*') {
        const T = p[x] || '';
        d = f.slice(0, f.length - T.length).replace(/(.)\/+$/, '$1');
      }
      const N = p[x];
      return (
        w && !N ? (m[y] = void 0) : (m[y] = (N || '').replace(/%2F/g, '/')),
        m
      );
    }, {}),
    pathname: f,
    pathnameBase: d,
    pattern: n,
  };
}
function E0(n, r = !1, s = !0) {
  _t(
    n === '*' || !n.endsWith('*') || n.endsWith('/*'),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, '/*')}".`
  );
  let a = [],
    l =
      '^' +
      n
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (d, p, h) => (
            a.push({ paramName: p, isOptional: h != null }),
            h ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        );
  return (
    n.endsWith('*')
      ? (a.push({ paramName: '*' }),
        (l += n === '*' || n === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : s
        ? (l += '\\/*$')
        : n !== '' && n !== '/' && (l += '(?:(?=\\/|$))'),
    [new RegExp(l, r ? void 0 : 'i'), a]
  );
}
function N0(n) {
  try {
    return n
      .split('/')
      .map(r => decodeURIComponent(r).replace(/\//g, '%2F'))
      .join('/');
  } catch (r) {
    return (
      _t(
        !1,
        `The URL path "${n}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      n
    );
  }
}
function Tn(n, r) {
  if (r === '/') {
    return n;
  }
  if (!n.toLowerCase().startsWith(r.toLowerCase())) {
    return null;
  }
  const s = r.endsWith('/') ? r.length - 1 : r.length,
    a = n.charAt(s);
  return a && a !== '/' ? null : n.slice(s) || '/';
}
function j0(n, r = '/') {
  const {
    pathname: s,
    search: a = '',
    hash: l = '',
  } = typeof n === 'string' ? Er(n) : n;
  return {
    pathname: s ? (s.startsWith('/') ? s : R0(s, r)) : r,
    search: L0(a),
    hash: D0(l),
  };
}
function R0(n, r) {
  const s = r.replace(/\/+$/, '').split('/');
  return (
    n.split('/').forEach(l => {
      l === '..' ? s.length > 1 && s.pop() : l !== '.' && s.push(l);
    }),
    s.length > 1 ? s.join('/') : '/'
  );
}
function Sl(n, r, s, a) {
  return `Cannot include a '${n}' character in a manually specified \`to.${r}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function M0(n) {
  return n.filter(
    (r, s) => s === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function ru(n) {
  const r = M0(n);
  return r.map((s, a) => (a === r.length - 1 ? s.pathname : s.pathnameBase));
}
function iu(n, r, s, a = !1) {
  let l;
  typeof n === 'string'
    ? (l = Er(n))
    : ((l = { ...n }),
      Ce(
        !l.pathname || !l.pathname.includes('?'),
        Sl('?', 'pathname', 'search', l)
      ),
      Ce(
        !l.pathname || !l.pathname.includes('#'),
        Sl('#', 'pathname', 'hash', l)
      ),
      Ce(!l.search || !l.search.includes('#'), Sl('#', 'search', 'hash', l)));
  let f = n === '' || l.pathname === '',
    d = f ? '/' : l.pathname,
    p;
  if (d == null) {
    p = s;
  } else {
    let w = r.length - 1;
    if (!a && d.startsWith('..')) {
      const x = d.split('/');
      for (; x[0] === '..'; ) {
        (x.shift(), (w -= 1));
      }
      l.pathname = x.join('/');
    }
    p = w >= 0 ? r[w] : '/';
  }
  const h = j0(l, p),
    m = d && d !== '/' && d.endsWith('/'),
    y = (f || d === '.') && s.endsWith('/');
  return (!h.pathname.endsWith('/') && (m || y) && (h.pathname += '/'), h);
}
var qt = n => n.join('/').replace(/\/\/+/g, '/'),
  A0 = n => n.replace(/\/+$/, '').replace(/^\/*/, '/'),
  L0 = n => (!n || n === '?' ? '' : n.startsWith('?') ? n : '?' + n),
  D0 = n => (!n || n === '#' ? '' : n.startsWith('#') ? n : '#' + n);
function _0(n) {
  return (
    n != null &&
    typeof n.status === 'number' &&
    typeof n.statusText === 'string' &&
    typeof n.internal === 'boolean' &&
    'data' in n
  );
}
const vp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(vp);
const V0 = ['GET', ...vp];
new Set(V0);
const Nr = j.createContext(null);
Nr.displayName = 'DataRouter';
const mo = j.createContext(null);
mo.displayName = 'DataRouterState';
const xp = j.createContext({ isTransitioning: !1 });
xp.displayName = 'ViewTransition';
const F0 = j.createContext(new Map());
F0.displayName = 'Fetchers';
const I0 = j.createContext(null);
I0.displayName = 'Await';
const Vt = j.createContext(null);
Vt.displayName = 'Navigation';
const _i = j.createContext(null);
_i.displayName = 'Location';
const bt = j.createContext({ outlet: null, matches: [], isDataRoute: !1 });
bt.displayName = 'Route';
const su = j.createContext(null);
su.displayName = 'RouteError';
function O0(n, { relative: r } = {}) {
  Ce(
    jr(),
    'useHref() may be used only in the context of a <Router> component.'
  );
  let { basename: s, navigator: a } = j.useContext(Vt),
    { hash: l, pathname: f, search: d } = Vi(n, { relative: r }),
    p = f;
  return (
    s !== '/' && (p = f === '/' ? s : qt([s, f])),
    a.createHref({ pathname: p, search: d, hash: l })
  );
}
function jr() {
  return j.useContext(_i) != null;
}
function nn() {
  return (
    Ce(
      jr(),
      'useLocation() may be used only in the context of a <Router> component.'
    ),
    j.useContext(_i).location
  );
}
const wp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Sp(n) {
  j.useContext(Vt).static || j.useLayoutEffect(n);
}
function kp() {
  const { isDataRoute: n } = j.useContext(bt);
  return n ? Z0() : z0();
}
function z0() {
  Ce(
    jr(),
    'useNavigate() may be used only in the context of a <Router> component.'
  );
  const n = j.useContext(Nr),
    { basename: r, navigator: s } = j.useContext(Vt),
    { matches: a } = j.useContext(bt),
    { pathname: l } = nn(),
    f = JSON.stringify(ru(a)),
    d = j.useRef(!1);
  return (
    Sp(() => {
      d.current = !0;
    }),
    j.useCallback(
      (h, m = {}) => {
        if ((_t(d.current, wp), !d.current)) {
          return;
        }
        if (typeof h === 'number') {
          s.go(h);
          return;
        }
        const y = iu(h, JSON.parse(f), l, m.relative === 'path');
        (n == null &&
          r !== '/' &&
          (y.pathname = y.pathname === '/' ? r : qt([r, y.pathname])),
          (m.replace ? s.replace : s.push)(y, m.state, m));
      },
      [r, s, f, l, n]
    )
  );
}
j.createContext(null);
function Vi(n, { relative: r } = {}) {
  const { matches: s } = j.useContext(bt),
    { pathname: a } = nn(),
    l = JSON.stringify(ru(s));
  return j.useMemo(() => iu(n, JSON.parse(l), a, r === 'path'), [n, l, a, r]);
}
function B0(n, r) {
  return Cp(n, r);
}
function Cp(n, r, s, a) {
  let C;
  Ce(
    jr(),
    'useRoutes() may be used only in the context of a <Router> component.'
  );
  const { navigator: l } = j.useContext(Vt),
    { matches: f } = j.useContext(bt),
    d = f[f.length - 1],
    p = d ? d.params : {},
    h = d ? d.pathname : '/',
    m = d ? d.pathnameBase : '/',
    y = d && d.route;
  {
    const _ = (y && y.path) || '';
    Tp(
      h,
      !y || _.endsWith('*') || _.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === '/' ? '*' : `${_}/*`}">.`
    );
  }
  let w = nn(),
    x;
  if (r) {
    const _ = typeof r === 'string' ? Er(r) : r;
    (Ce(
      m === '/' || ((C = _.pathname) == null ? void 0 : C.startsWith(m)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${_.pathname}" was given in the \`location\` prop.`
    ),
      (x = _));
  } else {
    x = w;
  }
  let N = x.pathname || '/',
    T = N;
  if (m !== '/') {
    const _ = m.replace(/^\//, '').split('/');
    T = '/' + N.replace(/^\//, '').split('/').slice(_.length).join('/');
  }
  const P = mp(n, { pathname: T });
  (_t(
    y || P != null,
    `No routes matched location "${x.pathname}${x.search}${x.hash}" `
  ),
    _t(
      P == null ||
        P[P.length - 1].route.element !== void 0 ||
        P[P.length - 1].route.Component !== void 0 ||
        P[P.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  const A = H0(
    P &&
      P.map(_ =>
        Object.assign({}, _, {
          params: Object.assign({}, p, _.params),
          pathname: qt([
            m,
            l.encodeLocation
              ? l.encodeLocation(_.pathname).pathname
              : _.pathname,
          ]),
          pathnameBase:
            _.pathnameBase === '/'
              ? m
              : qt([
                  m,
                  l.encodeLocation
                    ? l.encodeLocation(_.pathnameBase).pathname
                    : _.pathnameBase,
                ]),
        })
      ),
    f,
    s,
    a
  );
  return r && A
    ? j.createElement(
        _i.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              ...x,
            },
            navigationType: 'POP',
          },
        },
        A
      )
    : A;
}
function U0() {
  let n = X0(),
    r = _0(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    s = n instanceof Error ? n.stack : null,
    a = 'rgba(200,200,200, 0.5)',
    l = { padding: '0.5rem', backgroundColor: a },
    f = { padding: '2px 4px', backgroundColor: a },
    d = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', n),
    (d = j.createElement(
      j.Fragment,
      null,
      j.createElement('p', null, '💿 Hey developer 👋'),
      j.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        j.createElement('code', { style: f }, 'ErrorBoundary'),
        ' or',
        ' ',
        j.createElement('code', { style: f }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    j.createElement(
      j.Fragment,
      null,
      j.createElement('h2', null, 'Unexpected Application Error!'),
      j.createElement('h3', { style: { fontStyle: 'italic' } }, r),
      s ? j.createElement('pre', { style: l }, s) : null,
      d
    )
  );
}
const $0 = j.createElement(U0, null),
  b0 = class extends j.Component {
    constructor(n) {
      (super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, r) {
      return r.location !== n.location ||
        (r.revalidation !== 'idle' && n.revalidation === 'idle')
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : r.error,
            location: r.location,
            revalidation: n.revalidation || r.revalidation,
          };
    }
    componentDidCatch(n, r) {
      console.error(
        'React Router caught the following error during render',
        n,
        r
      );
    }
    render() {
      return this.state.error !== void 0
        ? j.createElement(
            bt.Provider,
            { value: this.props.routeContext },
            j.createElement(su.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function W0({ routeContext: n, match: r, children: s }) {
  const a = j.useContext(Nr);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = r.route.id),
    j.createElement(bt.Provider, { value: n }, s)
  );
}
function H0(n, r = [], s = null, a = null) {
  if (n == null) {
    if (!s) {
      return null;
    }
    if (s.errors) {
      n = s.matches;
    } else if (r.length === 0 && !s.initialized && s.matches.length > 0) {
      n = s.matches;
    } else {
      return null;
    }
  }
  let l = n,
    f = s == null ? void 0 : s.errors;
  if (f != null) {
    const h = l.findIndex(
      m => m.route.id && (f == null ? void 0 : f[m.route.id]) !== void 0
    );
    (Ce(
      h >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(',')}`
    ),
      (l = l.slice(0, Math.min(l.length, h + 1))));
  }
  let d = !1,
    p = -1;
  if (s) {
    for (let h = 0; h < l.length; h++) {
      const m = l[h];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (p = h),
        m.route.id)
      ) {
        let { loaderData: y, errors: w } = s,
          x =
            m.route.loader &&
            !y.hasOwnProperty(m.route.id) &&
            (!w || w[m.route.id] === void 0);
        if (m.route.lazy || x) {
          ((d = !0), p >= 0 ? (l = l.slice(0, p + 1)) : (l = [l[0]]));
          break;
        }
      }
    }
  }
  return l.reduceRight((h, m, y) => {
    let w,
      x = !1,
      N = null,
      T = null;
    s &&
      ((w = f && m.route.id ? f[m.route.id] : void 0),
      (N = m.route.errorElement || $0),
      d &&
        (p < 0 && y === 0
          ? (Tp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (x = !0),
            (T = null))
          : p === y &&
            ((x = !0), (T = m.route.hydrateFallbackElement || null))));
    const P = r.concat(l.slice(0, y + 1)),
      A = () => {
        let C;
        return (
          w
            ? (C = N)
            : x
              ? (C = T)
              : m.route.Component
                ? (C = j.createElement(m.route.Component, null))
                : m.route.element
                  ? (C = m.route.element)
                  : (C = h),
          j.createElement(W0, {
            match: m,
            routeContext: { outlet: h, matches: P, isDataRoute: s != null },
            children: C,
          })
        );
      };
    return s && (m.route.ErrorBoundary || m.route.errorElement || y === 0)
      ? j.createElement(b0, {
          location: s.location,
          revalidation: s.revalidation,
          component: N,
          error: w,
          children: A(),
          routeContext: { outlet: null, matches: P, isDataRoute: !0 },
        })
      : A();
  }, null);
}
function ou(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function K0(n) {
  const r = j.useContext(Nr);
  return (Ce(r, ou(n)), r);
}
function G0(n) {
  const r = j.useContext(mo);
  return (Ce(r, ou(n)), r);
}
function Q0(n) {
  const r = j.useContext(bt);
  return (Ce(r, ou(n)), r);
}
function au(n) {
  const r = Q0(n),
    s = r.matches[r.matches.length - 1];
  return (
    Ce(
      s.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    s.route.id
  );
}
function Y0() {
  return au('useRouteId');
}
function X0() {
  let a;
  const n = j.useContext(su),
    r = G0('useRouteError'),
    s = au('useRouteError');
  return n !== void 0 ? n : (a = r.errors) == null ? void 0 : a[s];
}
function Z0() {
  const { router: n } = K0('useNavigate'),
    r = au('useNavigate'),
    s = j.useRef(!1);
  return (
    Sp(() => {
      s.current = !0;
    }),
    j.useCallback(
      async (l, f = {}) => {
        (_t(s.current, wp),
          s.current &&
            (typeof l === 'number'
              ? n.navigate(l)
              : await n.navigate(l, { fromRouteId: r, ...f })));
      },
      [n, r]
    )
  );
}
const Zf = {};
function Tp(n, r, s) {
  !r && !Zf[n] && ((Zf[n] = !0), _t(!1, s));
}
j.memo(q0);
function q0({ routes: n, future: r, state: s }) {
  return Cp(n, void 0, s, r);
}
function J0({ to: n, replace: r, state: s, relative: a }) {
  Ce(
    jr(),
    '<Navigate> may be used only in the context of a <Router> component.'
  );
  const { static: l } = j.useContext(Vt);
  _t(
    !l,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  const { matches: f } = j.useContext(bt),
    { pathname: d } = nn(),
    p = kp(),
    h = iu(n, ru(f), d, a === 'path'),
    m = JSON.stringify(h);
  return (
    j.useEffect(() => {
      p(JSON.parse(m), { replace: r, state: s, relative: a });
    }, [p, m, a, r, s]),
    null
  );
}
function yr(n) {
  Ce(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function ev({
  basename: n = '/',
  children: r = null,
  location: s,
  navigationType: a = 'POP',
  navigator: l,
  static: f = !1,
}) {
  Ce(
    !jr(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  const d = n.replace(/^\/*/, '/'),
    p = j.useMemo(
      () => ({ basename: d, navigator: l, static: f, future: {} }),
      [d, l, f]
    );
  typeof s === 'string' && (s = Er(s));
  let {
      pathname: h = '/',
      search: m = '',
      hash: y = '',
      state: w = null,
      key: x = 'default',
    } = s,
    N = j.useMemo(() => {
      const T = Tn(h, d);
      return T == null
        ? null
        : {
            location: { pathname: T, search: m, hash: y, state: w, key: x },
            navigationType: a,
          };
    }, [d, h, m, y, w, x, a]);
  return (
    _t(
      N != null,
      `<Router basename="${d}"> is not able to match the URL "${h}${m}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    N == null
      ? null
      : j.createElement(
          Vt.Provider,
          { value: p },
          j.createElement(_i.Provider, { children: r, value: N })
        )
  );
}
function tv({ children: n, location: r }) {
  return B0(Il(n), r);
}
function Il(n, r = []) {
  const s = [];
  return (
    j.Children.forEach(n, (a, l) => {
      if (!j.isValidElement(a)) {
        return;
      }
      const f = [...r, l];
      if (a.type === j.Fragment) {
        s.push.apply(s, Il(a.props.children, f));
        return;
      }
      (Ce(
        a.type === yr,
        `[${typeof a.type === 'string' ? a.type : a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ce(
          !a.props.index || !a.props.children,
          'An index route cannot have child routes.'
        ));
      const d = {
        id: a.props.id || f.join('-'),
        caseSensitive: a.props.caseSensitive,
        element: a.props.element,
        Component: a.props.Component,
        index: a.props.index,
        path: a.props.path,
        loader: a.props.loader,
        action: a.props.action,
        hydrateFallbackElement: a.props.hydrateFallbackElement,
        HydrateFallback: a.props.HydrateFallback,
        errorElement: a.props.errorElement,
        ErrorBoundary: a.props.ErrorBoundary,
        hasErrorBoundary:
          a.props.hasErrorBoundary === !0 ||
          a.props.ErrorBoundary != null ||
          a.props.errorElement != null,
        shouldRevalidate: a.props.shouldRevalidate,
        handle: a.props.handle,
        lazy: a.props.lazy,
      };
      (a.props.children && (d.children = Il(a.props.children, f)), s.push(d));
    }),
    s
  );
}
const to = 'get',
  no = 'application/x-www-form-urlencoded';
function go(n) {
  return n != null && typeof n.tagName === 'string';
}
function nv(n) {
  return go(n) && n.tagName.toLowerCase() === 'button';
}
function rv(n) {
  return go(n) && n.tagName.toLowerCase() === 'form';
}
function iv(n) {
  return go(n) && n.tagName.toLowerCase() === 'input';
}
function sv(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function ov(n, r) {
  return n.button === 0 && (!r || r === '_self') && !sv(n);
}
let Zs = null;
function av() {
  if (Zs === null) {
    try {
      (new FormData(document.createElement('form'), 0), (Zs = !1));
    } catch {
      Zs = !0;
    }
  }
  return Zs;
}
const lv = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);
function kl(n) {
  return n != null && !lv.has(n)
    ? (_t(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${no}"`
      ),
      null)
    : n;
}
function uv(n, r) {
  let s, a, l, f, d;
  if (rv(n)) {
    const p = n.getAttribute('action');
    ((a = p ? Tn(p, r) : null),
      (s = n.getAttribute('method') || to),
      (l = kl(n.getAttribute('enctype')) || no),
      (f = new FormData(n)));
  } else if (nv(n) || (iv(n) && (n.type === 'submit' || n.type === 'image'))) {
    const p = n.form;
    if (p == null) {
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    }
    const h = n.getAttribute('formaction') || p.getAttribute('action');
    if (
      ((a = h ? Tn(h, r) : null),
      (s = n.getAttribute('formmethod') || p.getAttribute('method') || to),
      (l =
        kl(n.getAttribute('formenctype')) ||
        kl(p.getAttribute('enctype')) ||
        no),
      (f = new FormData(p, n)),
      !av())
    ) {
      const { name: m, type: y, value: w } = n;
      if (y === 'image') {
        const x = m ? `${m}.` : '';
        (f.append(`${x}x`, '0'), f.append(`${x}y`, '0'));
      } else {
        m && f.append(m, w);
      }
    }
  } else {
    if (go(n)) {
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    }
    ((s = to), (a = null), (l = no), (d = n));
  }
  return (
    f && l === 'text/plain' && ((d = f), (f = void 0)),
    { action: a, method: s.toLowerCase(), encType: l, formData: f, body: d }
  );
}
function lu(n, r) {
  if (n === !1 || n === null || typeof n > 'u') {
    throw new Error(r);
  }
}
async function cv(n, r) {
  if (n.id in r) {
    return r[n.id];
  }
  try {
    const s = await import(n.module);
    return ((r[n.id] = s), s);
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function dv(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === 'preload' &&
        typeof n.imageSrcSet === 'string' &&
        typeof n.imageSizes === 'string'
      : typeof n.rel === 'string' && typeof n.href === 'string';
}
async function fv(n, r, s) {
  const a = await Promise.all(
    n.map(async l => {
      const f = r.routes[l.route.id];
      if (f) {
        const d = await cv(f, s);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return gv(
    a
      .flat(1)
      .filter(dv)
      .filter(l => l.rel === 'stylesheet' || l.rel === 'preload')
      .map(l =>
        l.rel === 'stylesheet'
          ? { ...l, rel: 'prefetch', as: 'style' }
          : { ...l, rel: 'prefetch' }
      )
  );
}
function qf(n, r, s, a, l, f) {
  const d = (h, m) => (s[m] ? h.route.id !== s[m].route.id : !0),
    p = (h, m) => {
      let y;
      return (
        s[m].pathname !== h.pathname ||
        (((y = s[m].route.path) == null ? void 0 : y.endsWith('*')) &&
          s[m].params['*'] !== h.params['*'])
      );
    };
  return f === 'assets'
    ? r.filter((h, m) => d(h, m) || p(h, m))
    : f === 'data'
      ? r.filter((h, m) => {
          let w;
          const y = a.routes[h.route.id];
          if (!y || !y.hasLoader) {
            return !1;
          }
          if (d(h, m) || p(h, m)) {
            return !0;
          }
          if (h.route.shouldRevalidate) {
            const x = h.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin
              ),
              currentParams: ((w = s[0]) == null ? void 0 : w.params) || {},
              nextUrl: new URL(n, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x === 'boolean') {
              return x;
            }
          }
          return !0;
        })
      : [];
}
function hv(n, r) {
  return pv(
    n
      .map(s => {
        const a = r.routes[s.route.id];
        if (!a) {
          return [];
        }
        let l = [a.module];
        return (a.imports && (l = l.concat(a.imports)), l);
      })
      .flat(1)
  );
}
function pv(n) {
  return [...new Set(n)];
}
function mv(n) {
  const r = {},
    s = Object.keys(n).sort();
  for (const a of s) {
    r[a] = n[a];
  }
  return r;
}
function gv(n, r) {
  const s = new Set();
  return (
    new Set(r),
    n.reduce((a, l) => {
      const f = JSON.stringify(mv(l));
      return (s.has(f) || (s.add(f), a.push({ key: f, link: l })), a);
    }, [])
  );
}
function yv(n) {
  const r =
    typeof n === 'string'
      ? new URL(
          n,
          typeof window > 'u' ? 'server://singlefetch/' : window.location.origin
        )
      : n;
  return (
    r.pathname === '/'
      ? (r.pathname = '_root.data')
      : (r.pathname = `${r.pathname.replace(/\/$/, '')}.data`),
    r
  );
}
function vv() {
  const n = j.useContext(Nr);
  return (
    lu(
      n,
      'You must render this element inside a <DataRouterContext.Provider> element'
    ),
    n
  );
}
function xv() {
  const n = j.useContext(mo);
  return (
    lu(
      n,
      'You must render this element inside a <DataRouterStateContext.Provider> element'
    ),
    n
  );
}
const uu = j.createContext(void 0);
uu.displayName = 'FrameworkContext';
function Pp() {
  const n = j.useContext(uu);
  return (
    lu(n, 'You must render this element inside a <HydratedRouter> element'),
    n
  );
}
function wv(n, r) {
  const s = j.useContext(uu),
    [a, l] = j.useState(!1),
    [f, d] = j.useState(!1),
    {
      onFocus: p,
      onBlur: h,
      onMouseEnter: m,
      onMouseLeave: y,
      onTouchStart: w,
    } = r,
    x = j.useRef(null);
  (j.useEffect(() => {
    if ((n === 'render' && d(!0), n === 'viewport')) {
      const P = C => {
          C.forEach(_ => {
            d(_.isIntersecting);
          });
        },
        A = new IntersectionObserver(P, { threshold: 0.5 });
      return (
        x.current && A.observe(x.current),
        () => {
          A.disconnect();
        }
      );
    }
  }, [n]),
    j.useEffect(() => {
      if (a) {
        const P = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(P);
        };
      }
    }, [a]));
  const N = () => {
      l(!0);
    },
    T = () => {
      (l(!1), d(!1));
    };
  return s
    ? n !== 'intent'
      ? [f, x, {}]
      : [
          f,
          x,
          {
            onFocus: xi(p, N),
            onBlur: xi(h, T),
            onMouseEnter: xi(m, N),
            onMouseLeave: xi(y, T),
            onTouchStart: xi(w, N),
          },
        ]
    : [!1, x, {}];
}
function xi(n, r) {
  return s => {
    (n && n(s), s.defaultPrevented || r(s));
  };
}
function Sv({ page: n, ...r }) {
  const { router: s } = vv(),
    a = j.useMemo(() => mp(s.routes, n, s.basename), [s.routes, n, s.basename]);
  return a ? j.createElement(Cv, { page: n, matches: a, ...r }) : null;
}
function kv(n) {
  const { manifest: r, routeModules: s } = Pp(),
    [a, l] = j.useState([]);
  return (
    j.useEffect(() => {
      let f = !1;
      return (
        fv(n, r, s).then(d => {
          f || l(d);
        }),
        () => {
          f = !0;
        }
      );
    }, [n, r, s]),
    a
  );
}
function Cv({ page: n, matches: r, ...s }) {
  const a = nn(),
    { manifest: l, routeModules: f } = Pp(),
    { loaderData: d, matches: p } = xv(),
    h = j.useMemo(() => qf(n, r, p, l, a, 'data'), [n, r, p, l, a]),
    m = j.useMemo(() => qf(n, r, p, l, a, 'assets'), [n, r, p, l, a]),
    y = j.useMemo(() => {
      if (n === a.pathname + a.search + a.hash) {
        return [];
      }
      let N = new Set(),
        T = !1;
      if (
        (r.forEach(A => {
          let _;
          const C = l.routes[A.route.id];
          !C ||
            !C.hasLoader ||
            ((!h.some(V => V.route.id === A.route.id) &&
              A.route.id in d &&
              (_ = f[A.route.id]) != null &&
              _.shouldRevalidate) ||
            C.hasClientLoader
              ? (T = !0)
              : N.add(A.route.id));
        }),
        N.size === 0)
      ) {
        return [];
      }
      const P = yv(n);
      return (
        T &&
          N.size > 0 &&
          P.searchParams.set(
            '_routes',
            r
              .filter(A => N.has(A.route.id))
              .map(A => A.route.id)
              .join(',')
          ),
        [P.pathname + P.search]
      );
    }, [d, a, l, h, r, n, f]),
    w = j.useMemo(() => hv(m, l), [m, l]),
    x = kv(m);
  return j.createElement(
    j.Fragment,
    null,
    y.map(N =>
      j.createElement('link', {
        key: N,
        rel: 'prefetch',
        as: 'fetch',
        href: N,
        ...s,
      })
    ),
    w.map(N =>
      j.createElement('link', { key: N, rel: 'modulepreload', href: N, ...s })
    ),
    x.map(({ key: N, link: T }) => j.createElement('link', { key: N, ...T }))
  );
}
function Tv(...n) {
  return r => {
    n.forEach(s => {
      typeof s === 'function' ? s(r) : s != null && (s.current = r);
    });
  };
}
const Ep =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u';
try {
  Ep && (window.__reactRouterVersion = '7.1.1');
} catch {}
function Pv({ basename: n, children: r, window: s }) {
  const a = j.useRef();
  a.current == null && (a.current = f0({ window: s, v5Compat: !0 }));
  const l = a.current,
    [f, d] = j.useState({ action: l.action, location: l.location }),
    p = j.useCallback(
      h => {
        j.startTransition(() => d(h));
      },
      [d]
    );
  return (
    j.useLayoutEffect(() => l.listen(p), [l, p]),
    j.createElement(ev, {
      basename: n,
      children: r,
      location: f.location,
      navigationType: f.action,
      navigator: l,
    })
  );
}
const Np = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  cu = j.forwardRef(function (
    {
      onClick: r,
      discover: s = 'render',
      prefetch: a = 'none',
      relative: l,
      reloadDocument: f,
      replace: d,
      state: p,
      target: h,
      to: m,
      preventScrollReset: y,
      viewTransition: w,
      ...x
    },
    N
  ) {
    let { basename: T } = j.useContext(Vt),
      P = typeof m === 'string' && Np.test(m),
      A,
      C = !1;
    if (typeof m === 'string' && P && ((A = m), Ep)) {
      try {
        const ae = new URL(window.location.href),
          he = m.startsWith('//') ? new URL(ae.protocol + m) : new URL(m),
          Be = Tn(he.pathname, T);
        he.origin === ae.origin && Be != null
          ? (m = Be + he.search + he.hash)
          : (C = !0);
      } catch {
        _t(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    }
    const _ = O0(m, { relative: l }),
      [V, H, $] = wv(a, x),
      te = Rv(m, {
        replace: d,
        state: p,
        target: h,
        preventScrollReset: y,
        relative: l,
        viewTransition: w,
      });
    function re(ae) {
      (r && r(ae), ae.defaultPrevented || te(ae));
    }
    const X = j.createElement('a', {
      ...x,
      ...$,
      href: A || _,
      onClick: C || f ? r : re,
      ref: Tv(N, H),
      target: h,
      'data-discover': !P && s === 'render' ? 'true' : void 0,
    });
    return V && !P
      ? j.createElement(j.Fragment, null, X, j.createElement(Sv, { page: _ }))
      : X;
  });
cu.displayName = 'Link';
const Ev = j.forwardRef(function (
  {
    'aria-current': r = 'page',
    caseSensitive: s = !1,
    className: a = '',
    end: l = !1,
    style: f,
    to: d,
    viewTransition: p,
    children: h,
    ...m
  },
  y
) {
  let w = Vi(d, { relative: m.relative }),
    x = nn(),
    N = j.useContext(mo),
    { navigator: T, basename: P } = j.useContext(Vt),
    A = N != null && _v(w) && p === !0,
    C = T.encodeLocation ? T.encodeLocation(w).pathname : w.pathname,
    _ = x.pathname,
    V =
      N && N.navigation && N.navigation.location
        ? N.navigation.location.pathname
        : null;
  (s ||
    ((_ = _.toLowerCase()),
    (V = V ? V.toLowerCase() : null),
    (C = C.toLowerCase())),
    V && P && (V = Tn(V, P) || V));
  const H = C !== '/' && C.endsWith('/') ? C.length - 1 : C.length;
  let $ = _ === C || (!l && _.startsWith(C) && _.charAt(H) === '/'),
    te =
      V != null &&
      (V === C || (!l && V.startsWith(C) && V.charAt(C.length) === '/')),
    re = { isActive: $, isPending: te, isTransitioning: A },
    X = $ ? r : void 0,
    ae;
  typeof a === 'function'
    ? (ae = a(re))
    : (ae = [
        a,
        $ ? 'active' : null,
        te ? 'pending' : null,
        A ? 'transitioning' : null,
      ]
        .filter(Boolean)
        .join(' '));
  const he = typeof f === 'function' ? f(re) : f;
  return j.createElement(
    cu,
    {
      ...m,
      'aria-current': X,
      className: ae,
      ref: y,
      style: he,
      to: d,
      viewTransition: p,
    },
    typeof h === 'function' ? h(re) : h
  );
});
Ev.displayName = 'NavLink';
const Nv = j.forwardRef(
  (
    {
      discover: n = 'render',
      fetcherKey: r,
      navigate: s,
      reloadDocument: a,
      replace: l,
      state: f,
      method: d = to,
      action: p,
      onSubmit: h,
      relative: m,
      preventScrollReset: y,
      viewTransition: w,
      ...x
    },
    N
  ) => {
    const T = Lv(),
      P = Dv(p, { relative: m }),
      A = d.toLowerCase() === 'get' ? 'get' : 'post',
      C = typeof p === 'string' && Np.test(p),
      _ = V => {
        if ((h && h(V), V.defaultPrevented)) {
          return;
        }
        V.preventDefault();
        const H = V.nativeEvent.submitter,
          $ = (H == null ? void 0 : H.getAttribute('formmethod')) || d;
        T(H || V.currentTarget, {
          fetcherKey: r,
          method: $,
          navigate: s,
          replace: l,
          state: f,
          relative: m,
          preventScrollReset: y,
          viewTransition: w,
        });
      };
    return j.createElement('form', {
      ref: N,
      method: A,
      action: P,
      onSubmit: a ? h : _,
      ...x,
      'data-discover': !C && n === 'render' ? 'true' : void 0,
    });
  }
);
Nv.displayName = 'Form';
function jv(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function jp(n) {
  const r = j.useContext(Nr);
  return (Ce(r, jv(n)), r);
}
function Rv(
  n,
  {
    target: r,
    replace: s,
    state: a,
    preventScrollReset: l,
    relative: f,
    viewTransition: d,
  } = {}
) {
  const p = kp(),
    h = nn(),
    m = Vi(n, { relative: f });
  return j.useCallback(
    y => {
      if (ov(y, r)) {
        y.preventDefault();
        const w = s !== void 0 ? s : ji(h) === ji(m);
        p(n, {
          replace: w,
          state: a,
          preventScrollReset: l,
          relative: f,
          viewTransition: d,
        });
      }
    },
    [h, p, m, s, a, r, n, l, f, d]
  );
}
let Mv = 0,
  Av = () => `__${String(++Mv)}__`;
function Lv() {
  const { router: n } = jp('useSubmit'),
    { basename: r } = j.useContext(Vt),
    s = Y0();
  return j.useCallback(
    async (a, l = {}) => {
      const {
        action: f,
        method: d,
        encType: p,
        formData: h,
        body: m,
      } = uv(a, r);
      if (l.navigate === !1) {
        const y = l.fetcherKey || Av();
        await n.fetch(y, s, l.action || f, {
          preventScrollReset: l.preventScrollReset,
          formData: h,
          body: m,
          formMethod: l.method || d,
          formEncType: l.encType || p,
          flushSync: l.flushSync,
        });
      } else {
        await n.navigate(l.action || f, {
          preventScrollReset: l.preventScrollReset,
          formData: h,
          body: m,
          formMethod: l.method || d,
          formEncType: l.encType || p,
          replace: l.replace,
          state: l.state,
          fromRouteId: s,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
      }
    },
    [n, r, s]
  );
}
function Dv(n, { relative: r } = {}) {
  const { basename: s } = j.useContext(Vt),
    a = j.useContext(bt);
  Ce(a, 'useFormAction must be used inside a RouteContext');
  const [l] = a.matches.slice(-1),
    f = { ...Vi(n || '.', { relative: r }) },
    d = nn();
  if (n == null) {
    f.search = d.search;
    const p = new URLSearchParams(f.search),
      h = p.getAll('index');
    if (h.some(y => y === '')) {
      (p.delete('index'), h.filter(w => w).forEach(w => p.append('index', w)));
      const y = p.toString();
      f.search = y ? `?${y}` : '';
    }
  }
  return (
    (!n || n === '.') &&
      l.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, '?index&') : '?index'),
    s !== '/' && (f.pathname = f.pathname === '/' ? s : qt([s, f.pathname])),
    ji(f)
  );
}
function _v(n, r = {}) {
  const s = j.useContext(xp);
  Ce(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  const { basename: a } = jp('useViewTransitionState'),
    l = Vi(n, { relative: r.relative });
  if (!s.isTransitioning) {
    return !1;
  }
  const f = Tn(s.currentLocation.pathname, a) || s.currentLocation.pathname,
    d = Tn(s.nextLocation.pathname, a) || s.nextLocation.pathname;
  return oo(l.pathname, d) != null || oo(l.pathname, f) != null;
}
new TextEncoder();
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vv = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Fv = n =>
    n.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, s, a) =>
      a ? a.toUpperCase() : s.toLowerCase()
    ),
  Jf = n => {
    const r = Fv(n);
    return r.charAt(0).toUpperCase() + r.slice(1);
  },
  Rp = (...n) =>
    n
      .filter((r, s, a) => !!r && r.trim() !== '' && a.indexOf(r) === s)
      .join(' ')
      .trim();
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Iv = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ov = j.forwardRef(
  (
    {
      color: n = 'currentColor',
      size: r = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: a,
      className: l = '',
      children: f,
      iconNode: d,
      ...p
    },
    h
  ) =>
    j.createElement(
      'svg',
      {
        ref: h,
        ...Iv,
        width: r,
        height: r,
        stroke: n,
        strokeWidth: a ? (Number(s) * 24) / Number(r) : s,
        className: Rp('lucide', l),
        ...p,
      },
      [
        ...d.map(([m, y]) => j.createElement(m, y)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Fe = (n, r) => {
  const s = j.forwardRef(({ className: a, ...l }, f) =>
    j.createElement(Ov, {
      ref: f,
      iconNode: r,
      className: Rp(`lucide-${Vv(Jf(n))}`, `lucide-${n}`, a),
      ...l,
    })
  );
  return ((s.displayName = Jf(n)), s);
};
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zv = [
    [
      'path',
      {
        d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
        key: '169zse',
      },
    ],
  ],
  Ol = Fe('activity', zv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bv = [
    ['path', { d: 'M8 2v4', key: '1cmpym' }],
    ['path', { d: 'M16 2v4', key: '4m81vk' }],
    [
      'rect',
      { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' },
    ],
    ['path', { d: 'M3 10h18', key: '8toen8' }],
  ],
  Uv = Fe('calendar', Bv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $v = [
    ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
    ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
  ],
  bv = Fe('circle-check-big', $v);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wv = [
    ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
    ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
    ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
  ],
  Hv = Fe('download', Wv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kv = [
    [
      'path',
      {
        d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
        key: '1nclc0',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
  ],
  Gv = Fe('eye', Kv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qv = [
    [
      'path',
      { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' },
    ],
    ['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
    ['path', { d: 'M12 7v5l4 2', key: '1fdv2h' }],
  ],
  Yv = Fe('history', Qv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xv = [
    ['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
    ['line', { x1: '4', x2: '20', y1: '6', y2: '6', key: '1owob3' }],
    ['line', { x1: '4', x2: '20', y1: '18', y2: '18', key: 'yk5zj1' }],
  ],
  Zv = Fe('menu', Xv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qv = [
    [
      'rect',
      { x: '14', y: '4', width: '4', height: '16', rx: '1', key: 'zuxfzm' },
    ],
    [
      'rect',
      { x: '6', y: '4', width: '4', height: '16', rx: '1', key: '1okwgv' },
    ],
  ],
  Jv = Fe('pause', qv);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ex = [['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }]],
  tx = Fe('play', ex);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nx = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'M12 5v14', key: 's699le' }],
  ],
  rx = Fe('plus', nx);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ix = [
    [
      'path',
      {
        d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
        key: 'v9h5vc',
      },
    ],
    ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
    [
      'path',
      {
        d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
        key: '3uifl3',
      },
    ],
    ['path', { d: 'M8 16H3v5', key: '1cv678' }],
  ],
  Cl = Fe('refresh-cw', ix);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sx = [
    [
      'path',
      {
        d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
        key: '1c8476',
      },
    ],
    ['path', { d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7', key: '1ydtos' }],
    ['path', { d: 'M7 3v4a1 1 0 0 0 1 1h7', key: 't51u73' }],
  ],
  ox = Fe('save', sx);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ax = [
    ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
    ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
  ],
  lx = Fe('search', ax);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ux = [
    [
      'path',
      {
        d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
        key: '1qme2f',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
  ],
  Mp = Fe('settings', ux);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cx = [
    ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
    ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
    ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
    ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
    ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }],
  ],
  dx = Fe('trash-2', cx);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fx = [
    ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
    ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
  ],
  hx = Fe('trending-up', fx);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const px = [
    [
      'path',
      {
        d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
        key: 'wmoenq',
      },
    ],
    ['path', { d: 'M12 9v4', key: 'juzpu7' }],
    ['path', { d: 'M12 17h.01', key: 'p32p05' }],
  ],
  Ap = Fe('triangle-alert', px);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mx = [
    ['path', { d: 'M12 20h.01', key: 'zekei9' }],
    ['path', { d: 'M2 8.82a15 15 0 0 1 20 0', key: 'dnpr2z' }],
    ['path', { d: 'M5 12.859a10 10 0 0 1 14 0', key: '1x1e6c' }],
    ['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
  ],
  gx = Fe('wifi', mx);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yx = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  vx = Fe('x', yx),
  Lp = j.createContext({});
function xx(n) {
  const r = j.useRef(null);
  return (r.current === null && (r.current = n()), r.current);
}
const du = j.createContext(null),
  Dp = j.createContext({
    transformPagePoint: n => n,
    isStatic: !1,
    reducedMotion: 'never',
  });
function wx(n = !0) {
  const r = j.useContext(du);
  if (r === null) {
    return [!0, null];
  }
  const { isPresent: s, onExitComplete: a, register: l } = r,
    f = j.useId();
  j.useEffect(() => {
    n && l(f);
  }, [n]);
  const d = j.useCallback(() => n && a && a(f), [f, a, n]);
  return !s && a ? [!1, d] : [!0];
}
const fu = typeof window < 'u',
  Sx = fu ? j.useLayoutEffect : j.useEffect,
  pt = n => n;
const zl = pt;
function hu(n) {
  let r;
  return () => (r === void 0 && (r = n()), r);
}
const Cr = (n, r, s) => {
    const a = r - n;
    return a === 0 ? 1 : (s - n) / a;
  },
  Jt = n => n * 1e3,
  en = n => n / 1e3,
  kx = { skipAnimations: !1, useManualTiming: !1 };
function Cx(n) {
  let r = new Set(),
    s = new Set(),
    a = !1,
    l = !1;
  const f = new WeakSet();
  let d = { delta: 0, timestamp: 0, isProcessing: !1 };
  function p(m) {
    (f.has(m) && (h.schedule(m), n()), m(d));
  }
  const h = {
    schedule: (m, y = !1, w = !1) => {
      const N = w && a ? r : s;
      return (y && f.add(m), N.has(m) || N.add(m), m);
    },
    cancel: m => {
      (s.delete(m), f.delete(m));
    },
    process: m => {
      if (((d = m), a)) {
        l = !0;
        return;
      }
      ((a = !0),
        ([r, s] = [s, r]),
        r.forEach(p),
        r.clear(),
        (a = !1),
        l && ((l = !1), h.process(m)));
    },
  };
  return h;
}
const qs = [
    'read',
    'resolveKeyframes',
    'update',
    'preRender',
    'render',
    'postRender',
  ],
  Tx = 40;
function _p(n, r) {
  let s = !1,
    a = !0;
  const l = { delta: 0, timestamp: 0, isProcessing: !1 },
    f = () => (s = !0),
    d = qs.reduce((C, _) => ((C[_] = Cx(f)), C), {}),
    {
      read: p,
      resolveKeyframes: h,
      update: m,
      preRender: y,
      render: w,
      postRender: x,
    } = d,
    N = () => {
      const C = performance.now();
      ((s = !1),
        (l.delta = a ? 1e3 / 60 : Math.max(Math.min(C - l.timestamp, Tx), 1)),
        (l.timestamp = C),
        (l.isProcessing = !0),
        p.process(l),
        h.process(l),
        m.process(l),
        y.process(l),
        w.process(l),
        x.process(l),
        (l.isProcessing = !1),
        s && r && ((a = !1), n(N)));
    },
    T = () => {
      ((s = !0), (a = !0), l.isProcessing || n(N));
    };
  return {
    schedule: qs.reduce((C, _) => {
      const V = d[_];
      return (
        (C[_] = (H, $ = !1, te = !1) => (s || T(), V.schedule(H, $, te))),
        C
      );
    }, {}),
    cancel: C => {
      for (let _ = 0; _ < qs.length; _++) {
        d[qs[_]].cancel(C);
      }
    },
    state: l,
    steps: d,
  };
}
const {
    schedule: we,
    cancel: Pn,
    state: be,
    steps: Tl,
  } = _p(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : pt, !0),
  Vp = j.createContext({ strict: !1 }),
  eh = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Tr = {};
for (const n in eh) {
  Tr[n] = { isEnabled: r => eh[n].some(s => !!r[s]) };
}
function Px(n) {
  for (const r in n) {
    Tr[r] = { ...Tr[r], ...n[r] };
  }
}
const Ex = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
]);
function ao(n) {
  return (
    n.startsWith('while') ||
    (n.startsWith('drag') && n !== 'draggable') ||
    n.startsWith('layout') ||
    n.startsWith('onTap') ||
    n.startsWith('onPan') ||
    n.startsWith('onLayout') ||
    Ex.has(n)
  );
}
let Fp = n => !ao(n);
function Nx(n) {
  n && (Fp = r => (r.startsWith('on') ? !ao(r) : n(r)));
}
try {
  Nx(require('@emotion/is-prop-valid').default);
} catch {}
function jx(n, r, s) {
  const a = {};
  for (const l in n) {
    (l === 'values' && typeof n.values === 'object') ||
      ((Fp(l) ||
        (s === !0 && ao(l)) ||
        (!r && !ao(l)) ||
        (n.draggable && l.startsWith('onDrag'))) &&
        (a[l] = n[l]));
  }
  return a;
}
function Rx(n) {
  if (typeof Proxy > 'u') {
    return n;
  }
  const r = new Map(),
    s = (...a) => n(...a);
  return new Proxy(s, {
    get: (a, l) =>
      l === 'create' ? n : (r.has(l) || r.set(l, n(l)), r.get(l)),
  });
}
const yo = j.createContext({});
function Ri(n) {
  return typeof n === 'string' || Array.isArray(n);
}
function vo(n) {
  return n !== null && typeof n === 'object' && typeof n.start === 'function';
}
const pu = [
    'animate',
    'whileInView',
    'whileFocus',
    'whileHover',
    'whileTap',
    'whileDrag',
    'exit',
  ],
  mu = ['initial', ...pu];
function xo(n) {
  return vo(n.animate) || mu.some(r => Ri(n[r]));
}
function Ip(n) {
  return !!(xo(n) || n.variants);
}
function Mx(n, r) {
  if (xo(n)) {
    const { initial: s, animate: a } = n;
    return {
      initial: s === !1 || Ri(s) ? s : void 0,
      animate: Ri(a) ? a : void 0,
    };
  }
  return n.inherit !== !1 ? r : {};
}
function Ax(n) {
  const { initial: r, animate: s } = Mx(n, j.useContext(yo));
  return j.useMemo(() => ({ initial: r, animate: s }), [th(r), th(s)]);
}
function th(n) {
  return Array.isArray(n) ? n.join(' ') : n;
}
const Lx = Symbol.for('motionComponentSymbol');
function vr(n) {
  return (
    n &&
    typeof n === 'object' &&
    Object.prototype.hasOwnProperty.call(n, 'current')
  );
}
function Dx(n, r, s) {
  return j.useCallback(
    a => {
      (a && n.mount && n.mount(a),
        r && (a ? r.mount(a) : r.unmount()),
        s && (typeof s === 'function' ? s(a) : vr(s) && (s.current = a)));
    },
    [r]
  );
}
const gu = n => n.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  _x = 'framerAppearId',
  Op = 'data-' + gu(_x),
  { schedule: yu, cancel: Q2 } = _p(queueMicrotask, !1),
  zp = j.createContext({});
function Vx(n, r, s, a, l) {
  let f, d;
  const { visualElement: p } = j.useContext(yo),
    h = j.useContext(Vp),
    m = j.useContext(du),
    y = j.useContext(Dp).reducedMotion,
    w = j.useRef(null);
  ((a = a || h.renderer),
    !w.current &&
      a &&
      (w.current = a(n, {
        visualState: r,
        parent: p,
        props: s,
        presenceContext: m,
        blockInitialAnimation: m ? m.initial === !1 : !1,
        reducedMotionConfig: y,
      })));
  const x = w.current,
    N = j.useContext(zp);
  x &&
    !x.projection &&
    l &&
    (x.type === 'html' || x.type === 'svg') &&
    Fx(w.current, s, l, N);
  const T = j.useRef(!1);
  j.useInsertionEffect(() => {
    x && T.current && x.update(s, m);
  });
  const P = s[Op],
    A = j.useRef(
      !!P &&
        !(
          !((f = window.MotionHandoffIsComplete) === null || f === void 0) &&
          f.call(window, P)
        ) &&
        ((d = window.MotionHasOptimisedAnimation) === null || d === void 0
          ? void 0
          : d.call(window, P))
    );
  return (
    Sx(() => {
      x &&
        ((T.current = !0),
        (window.MotionIsMounted = !0),
        x.updateFeatures(),
        yu.render(x.render),
        A.current && x.animationState && x.animationState.animateChanges());
    }),
    j.useEffect(() => {
      x &&
        (!A.current && x.animationState && x.animationState.animateChanges(),
        A.current &&
          (queueMicrotask(() => {
            let C;
            (C = window.MotionHandoffMarkAsComplete) === null ||
              C === void 0 ||
              C.call(window, P);
          }),
          (A.current = !1)));
    }),
    x
  );
}
function Fx(n, r, s, a) {
  const {
    layoutId: l,
    layout: f,
    drag: d,
    dragConstraints: p,
    layoutScroll: h,
    layoutRoot: m,
  } = r;
  ((n.projection = new s(
    n.latestValues,
    r['data-framer-portal-id'] ? void 0 : Bp(n.parent)
  )),
    n.projection.setOptions({
      layoutId: l,
      layout: f,
      alwaysMeasureLayout: !!d || (p && vr(p)),
      visualElement: n,
      animationType: typeof f === 'string' ? f : 'both',
      initialPromotionConfig: a,
      layoutScroll: h,
      layoutRoot: m,
    }));
}
function Bp(n) {
  if (n) {
    return n.options.allowProjection !== !1 ? n.projection : Bp(n.parent);
  }
}
function Ix({
  preloadedFeatures: n,
  createVisualElement: r,
  useRender: s,
  useVisualState: a,
  Component: l,
}) {
  let f, d;
  n && Px(n);
  function p(m, y) {
    let w;
    const x = { ...j.useContext(Dp), ...m, layoutId: Ox(m) },
      { isStatic: N } = x,
      T = Ax(m),
      P = a(m, N);
    if (!N && fu) {
      zx();
      const A = Bx(x);
      ((w = A.MeasureLayout),
        (T.visualElement = Vx(l, P, x, r, A.ProjectionNode)));
    }
    return v.jsxs(yo.Provider, {
      value: T,
      children: [
        w && T.visualElement
          ? v.jsx(w, { visualElement: T.visualElement, ...x })
          : null,
        s(l, m, Dx(P, T.visualElement, y), P, N, T.visualElement),
      ],
    });
  }
  p.displayName = `motion.${typeof l === 'string' ? l : `create(${(d = (f = l.displayName) !== null && f !== void 0 ? f : l.name) !== null && d !== void 0 ? d : ''})`}`;
  const h = j.forwardRef(p);
  return ((h[Lx] = l), h);
}
function Ox({ layoutId: n }) {
  const r = j.useContext(Lp).id;
  return r && n !== void 0 ? r + '-' + n : n;
}
function zx(n, r) {
  j.useContext(Vp).strict;
}
function Bx(n) {
  const { drag: r, layout: s } = Tr;
  if (!r && !s) {
    return {};
  }
  const a = { ...r, ...s };
  return {
    MeasureLayout:
      (r != null && r.isEnabled(n)) || (s != null && s.isEnabled(n))
        ? a.MeasureLayout
        : void 0,
    ProjectionNode: a.ProjectionNode,
  };
}
const Ux = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];
function vu(n) {
  return typeof n !== 'string' || n.includes('-')
    ? !1
    : !!(Ux.indexOf(n) > -1 || /[A-Z]/u.test(n));
}
function Up(n, { style: r, vars: s }, a, l) {
  Object.assign(n.style, r, l && l.getProjectionStyles(a));
  for (const f in s) {
    n.style.setProperty(f, s[f]);
  }
}
const $p = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
]);
function bp(n, r, s, a) {
  Up(n, r, void 0, a);
  for (const l in r.attrs) {
    n.setAttribute($p.has(l) ? l : gu(l), r.attrs[l]);
  }
}
const Ye = n => !!(n && n.getVelocity),
  Rr = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  Mr = new Set(Rr),
  lo = {};
function $x(n) {
  Object.assign(lo, n);
}
function Wp(n, { layout: r, layoutId: s }) {
  return (
    Mr.has(n) ||
    n.startsWith('origin') ||
    ((r || s !== void 0) && (!!lo[n] || n === 'opacity'))
  );
}
function xu(n, r, s) {
  let a;
  const { style: l } = n,
    f = {};
  for (const d in l) {
    (Ye(l[d]) ||
      (r.style && Ye(r.style[d])) ||
      Wp(d, n) ||
      ((a = s == null ? void 0 : s.getValue(d)) === null || a === void 0
        ? void 0
        : a.liveStyle) !== void 0) &&
      (f[d] = l[d]);
  }
  return f;
}
function Hp(n, r, s) {
  const a = xu(n, r, s);
  for (const l in n) {
    if (Ye(n[l]) || Ye(r[l])) {
      const f =
        Rr.indexOf(l) !== -1
          ? 'attr' + l.charAt(0).toUpperCase() + l.substring(1)
          : l;
      a[f] = n[l];
    }
  }
  return a;
}
function nh(n) {
  const r = [{}, {}];
  return (
    n == null ||
      n.values.forEach((s, a) => {
        ((r[0][a] = s.get()), (r[1][a] = s.getVelocity()));
      }),
    r
  );
}
function wu(n, r, s, a) {
  if (typeof r === 'function') {
    const [l, f] = nh(a);
    r = r(s !== void 0 ? s : n.custom, l, f);
  }
  if (
    (typeof r === 'string' && (r = n.variants && n.variants[r]),
    typeof r === 'function')
  ) {
    const [l, f] = nh(a);
    r = r(s !== void 0 ? s : n.custom, l, f);
  }
  return r;
}
const Bl = n => Array.isArray(n),
  bx = n => !!(n && typeof n === 'object' && n.mix && n.toValue),
  Wx = n => (Bl(n) ? n[n.length - 1] || 0 : n);
function ro(n) {
  const r = Ye(n) ? n.get() : n;
  return bx(r) ? r.toValue() : r;
}
function Hx(
  { scrapeMotionValuesFromProps: n, createRenderState: r, onMount: s },
  a,
  l,
  f
) {
  const d = { latestValues: Kx(a, l, f, n), renderState: r() };
  return (s && (d.mount = p => s(a, p, d)), d);
}
const Kp = n => (r, s) => {
  const a = j.useContext(yo),
    l = j.useContext(du),
    f = () => Hx(n, r, a, l);
  return s ? f() : xx(f);
};
function Kx(n, r, s, a) {
  const l = {},
    f = a(n, {});
  for (const x in f) {
    l[x] = ro(f[x]);
  }
  let { initial: d, animate: p } = n;
  const h = xo(n),
    m = Ip(n);
  r &&
    m &&
    !h &&
    n.inherit !== !1 &&
    (d === void 0 && (d = r.initial), p === void 0 && (p = r.animate));
  let y = s ? s.initial === !1 : !1;
  y = y || d === !1;
  const w = y ? p : d;
  if (w && typeof w !== 'boolean' && !vo(w)) {
    const x = Array.isArray(w) ? w : [w];
    for (let N = 0; N < x.length; N++) {
      const T = wu(n, x[N]);
      if (T) {
        const { transitionEnd: P, transition: A, ...C } = T;
        for (const _ in C) {
          let V = C[_];
          if (Array.isArray(V)) {
            const H = y ? V.length - 1 : 0;
            V = V[H];
          }
          V !== null && (l[_] = V);
        }
        for (const _ in P) {
          l[_] = P[_];
        }
      }
    }
  }
  return l;
}
const Su = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  Gp = () => ({ ...Su(), attrs: {} }),
  Qp = n => r => typeof r === 'string' && r.startsWith(n),
  Yp = Qp('--'),
  Gx = Qp('var(--'),
  ku = n => (Gx(n) ? Qx.test(n.split('/*')[0].trim()) : !1),
  Qx =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Xp = (n, r) => (r && typeof n === 'number' ? r.transform(n) : n),
  tn = (n, r, s) => (s > r ? r : s < n ? n : s),
  Ar = {
    test: n => typeof n === 'number',
    parse: parseFloat,
    transform: n => n,
  },
  Mi = { ...Ar, transform: n => tn(0, 1, n) },
  Js = { ...Ar, default: 1 },
  Fi = n => ({
    test: r =>
      typeof r === 'string' && r.endsWith(n) && r.split(' ').length === 1,
    parse: parseFloat,
    transform: r => `${r}${n}`,
  }),
  Cn = Fi('deg'),
  Ut = Fi('%'),
  ee = Fi('px'),
  Yx = Fi('vh'),
  Xx = Fi('vw'),
  rh = {
    ...Ut,
    parse: n => Ut.parse(n) / 100,
    transform: n => Ut.transform(n * 100),
  },
  Zx = {
    borderWidth: ee,
    borderTopWidth: ee,
    borderRightWidth: ee,
    borderBottomWidth: ee,
    borderLeftWidth: ee,
    borderRadius: ee,
    radius: ee,
    borderTopLeftRadius: ee,
    borderTopRightRadius: ee,
    borderBottomRightRadius: ee,
    borderBottomLeftRadius: ee,
    width: ee,
    maxWidth: ee,
    height: ee,
    maxHeight: ee,
    top: ee,
    right: ee,
    bottom: ee,
    left: ee,
    padding: ee,
    paddingTop: ee,
    paddingRight: ee,
    paddingBottom: ee,
    paddingLeft: ee,
    margin: ee,
    marginTop: ee,
    marginRight: ee,
    marginBottom: ee,
    marginLeft: ee,
    backgroundPositionX: ee,
    backgroundPositionY: ee,
  },
  qx = {
    rotate: Cn,
    rotateX: Cn,
    rotateY: Cn,
    rotateZ: Cn,
    scale: Js,
    scaleX: Js,
    scaleY: Js,
    scaleZ: Js,
    skew: Cn,
    skewX: Cn,
    skewY: Cn,
    distance: ee,
    translateX: ee,
    translateY: ee,
    translateZ: ee,
    x: ee,
    y: ee,
    z: ee,
    perspective: ee,
    transformPerspective: ee,
    opacity: Mi,
    originX: rh,
    originY: rh,
    originZ: ee,
  },
  ih = { ...Ar, transform: Math.round },
  Cu = {
    ...Zx,
    ...qx,
    zIndex: ih,
    size: ee,
    fillOpacity: Mi,
    strokeOpacity: Mi,
    numOctaves: ih,
  },
  Jx = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
  },
  e1 = Rr.length;
function t1(n, r, s) {
  let a = '',
    l = !0;
  for (let f = 0; f < e1; f++) {
    const d = Rr[f],
      p = n[d];
    if (p === void 0) {
      continue;
    }
    let h = !0;
    if (
      (typeof p === 'number'
        ? (h = p === (d.startsWith('scale') ? 1 : 0))
        : (h = parseFloat(p) === 0),
      !h || s)
    ) {
      const m = Xp(p, Cu[d]);
      if (!h) {
        l = !1;
        const y = Jx[d] || d;
        a += `${y}(${m}) `;
      }
      s && (r[d] = m);
    }
  }
  return ((a = a.trim()), s ? (a = s(r, l ? '' : a)) : l && (a = 'none'), a);
}
function Tu(n, r, s) {
  const { style: a, vars: l, transformOrigin: f } = n;
  let d = !1,
    p = !1;
  for (const h in r) {
    const m = r[h];
    if (Mr.has(h)) {
      d = !0;
      continue;
    } else if (Yp(h)) {
      l[h] = m;
      continue;
    } else {
      const y = Xp(m, Cu[h]);
      h.startsWith('origin') ? ((p = !0), (f[h] = y)) : (a[h] = y);
    }
  }
  if (
    (r.transform ||
      (d || s
        ? (a.transform = t1(r, n.transform, s))
        : a.transform && (a.transform = 'none')),
    p)
  ) {
    const { originX: h = '50%', originY: m = '50%', originZ: y = 0 } = f;
    a.transformOrigin = `${h} ${m} ${y}`;
  }
}
function sh(n, r, s) {
  return typeof n === 'string' ? n : ee.transform(r + s * n);
}
function n1(n, r, s) {
  const a = sh(r, n.x, n.width),
    l = sh(s, n.y, n.height);
  return `${a} ${l}`;
}
const r1 = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  i1 = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function s1(n, r, s = 1, a = 0, l = !0) {
  n.pathLength = 1;
  const f = l ? r1 : i1;
  n[f.offset] = ee.transform(-a);
  const d = ee.transform(r),
    p = ee.transform(s);
  n[f.array] = `${d} ${p}`;
}
function Pu(
  n,
  {
    attrX: r,
    attrY: s,
    attrScale: a,
    originX: l,
    originY: f,
    pathLength: d,
    pathSpacing: p = 1,
    pathOffset: h = 0,
    ...m
  },
  y,
  w
) {
  if ((Tu(n, m, w), y)) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  ((n.attrs = n.style), (n.style = {}));
  const { attrs: x, style: N, dimensions: T } = n;
  (x.transform && (T && (N.transform = x.transform), delete x.transform),
    T &&
      (l !== void 0 || f !== void 0 || N.transform) &&
      (N.transformOrigin = n1(
        T,
        l !== void 0 ? l : 0.5,
        f !== void 0 ? f : 0.5
      )),
    r !== void 0 && (x.x = r),
    s !== void 0 && (x.y = s),
    a !== void 0 && (x.scale = a),
    d !== void 0 && s1(x, d, p, h, !1));
}
const Eu = n => typeof n === 'string' && n.toLowerCase() === 'svg',
  o1 = {
    useVisualState: Kp({
      scrapeMotionValuesFromProps: Hp,
      createRenderState: Gp,
      onMount: (n, r, { renderState: s, latestValues: a }) => {
        (we.read(() => {
          try {
            s.dimensions =
              typeof r.getBBox === 'function'
                ? r.getBBox()
                : r.getBoundingClientRect();
          } catch {
            s.dimensions = { x: 0, y: 0, width: 0, height: 0 };
          }
        }),
          we.render(() => {
            (Pu(s, a, Eu(r.tagName), n.transformTemplate), bp(r, s));
          }));
      },
    }),
  },
  a1 = {
    useVisualState: Kp({
      scrapeMotionValuesFromProps: xu,
      createRenderState: Su,
    }),
  };
function Zp(n, r, s) {
  for (const a in r) {
    !Ye(r[a]) && !Wp(a, s) && (n[a] = r[a]);
  }
}
function l1({ transformTemplate: n }, r) {
  return j.useMemo(() => {
    const s = Su();
    return (Tu(s, r, n), Object.assign({}, s.vars, s.style));
  }, [r]);
}
function u1(n, r) {
  const s = n.style || {},
    a = {};
  return (Zp(a, s, n), Object.assign(a, l1(n, r)), a);
}
function c1(n, r) {
  const s = {},
    a = u1(n, r);
  return (
    n.drag &&
      n.dragListener !== !1 &&
      ((s.draggable = !1),
      (a.userSelect = a.WebkitUserSelect = a.WebkitTouchCallout = 'none'),
      (a.touchAction =
        n.drag === !0 ? 'none' : `pan-${n.drag === 'x' ? 'y' : 'x'}`)),
    n.tabIndex === void 0 &&
      (n.onTap || n.onTapStart || n.whileTap) &&
      (s.tabIndex = 0),
    (s.style = a),
    s
  );
}
function d1(n, r, s, a) {
  const l = j.useMemo(() => {
    const f = Gp();
    return (
      Pu(f, r, Eu(a), n.transformTemplate),
      { ...f.attrs, style: { ...f.style } }
    );
  }, [r]);
  if (n.style) {
    const f = {};
    (Zp(f, n.style, n), (l.style = { ...f, ...l.style }));
  }
  return l;
}
function f1(n = !1) {
  return (s, a, l, { latestValues: f }, d) => {
    const h = (vu(s) ? d1 : c1)(a, f, d, s),
      m = jx(a, typeof s === 'string', n),
      y = s !== j.Fragment ? { ...m, ...h, ref: l } : {},
      { children: w } = a,
      x = j.useMemo(() => (Ye(w) ? w.get() : w), [w]);
    return j.createElement(s, { ...y, children: x });
  };
}
function h1(n, r) {
  return function (a, { forwardMotionProps: l } = { forwardMotionProps: !1 }) {
    const d = {
      ...(vu(a) ? o1 : a1),
      preloadedFeatures: n,
      useRender: f1(l),
      createVisualElement: r,
      Component: a,
    };
    return Ix(d);
  };
}
function qp(n, r) {
  if (!Array.isArray(r)) {
    return !1;
  }
  const s = r.length;
  if (s !== n.length) {
    return !1;
  }
  for (let a = 0; a < s; a++) {
    if (r[a] !== n[a]) {
      return !1;
    }
  }
  return !0;
}
function wo(n, r, s) {
  const a = n.getProps();
  return wu(a, r, s !== void 0 ? s : a.custom, n);
}
const p1 = hu(() => window.ScrollTimeline !== void 0);
class m1 {
  constructor(r) {
    ((this.stop = () => this.runAll('stop')),
      (this.animations = r.filter(Boolean)));
  }
  get finished() {
    return Promise.all(
      this.animations.map(r => ('finished' in r ? r.finished : r))
    );
  }
  getAll(r) {
    return this.animations[0][r];
  }
  setAll(r, s) {
    for (let a = 0; a < this.animations.length; a++) {
      this.animations[a][r] = s;
    }
  }
  attachTimeline(r, s) {
    const a = this.animations.map(l => {
      if (p1() && l.attachTimeline) {
        return l.attachTimeline(r);
      }
      if (typeof s === 'function') {
        return s(l);
      }
    });
    return () => {
      a.forEach((l, f) => {
        (l && l(), this.animations[f].stop());
      });
    };
  }
  get time() {
    return this.getAll('time');
  }
  set time(r) {
    this.setAll('time', r);
  }
  get speed() {
    return this.getAll('speed');
  }
  set speed(r) {
    this.setAll('speed', r);
  }
  get startTime() {
    return this.getAll('startTime');
  }
  get duration() {
    let r = 0;
    for (let s = 0; s < this.animations.length; s++) {
      r = Math.max(r, this.animations[s].duration);
    }
    return r;
  }
  runAll(r) {
    this.animations.forEach(s => s[r]());
  }
  flatten() {
    this.runAll('flatten');
  }
  play() {
    this.runAll('play');
  }
  pause() {
    this.runAll('pause');
  }
  cancel() {
    this.runAll('cancel');
  }
  complete() {
    this.runAll('complete');
  }
}
class g1 extends m1 {
  then(r, s) {
    return Promise.all(this.animations).then(r).catch(s);
  }
}
function Nu(n, r) {
  return n ? n[r] || n.default || n : void 0;
}
const Ul = 2e4;
function Jp(n) {
  let r = 0;
  const s = 50;
  let a = n.next(r);
  for (; !a.done && r < Ul; ) {
    ((r += s), (a = n.next(r)));
  }
  return r >= Ul ? 1 / 0 : r;
}
function ju(n) {
  return typeof n === 'function';
}
function oh(n, r) {
  ((n.timeline = r), (n.onfinish = null));
}
const Ru = n => Array.isArray(n) && typeof n[0] === 'number',
  y1 = { linearEasing: void 0 };
function v1(n, r) {
  const s = hu(n);
  return () => {
    let a;
    return (a = y1[r]) !== null && a !== void 0 ? a : s();
  };
}
const uo = v1(() => {
    try {
      document
        .createElement('div')
        .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
    } catch {
      return !1;
    }
    return !0;
  }, 'linearEasing'),
  em = (n, r, s = 10) => {
    let a = '';
    const l = Math.max(Math.round(r / s), 2);
    for (let f = 0; f < l; f++) {
      a += n(Cr(0, l - 1, f)) + ', ';
    }
    return `linear(${a.substring(0, a.length - 2)})`;
  };
function tm(n) {
  return !!(
    (typeof n === 'function' && uo()) ||
    !n ||
    (typeof n === 'string' && (n in $l || uo())) ||
    Ru(n) ||
    (Array.isArray(n) && n.every(tm))
  );
}
const Si = ([n, r, s, a]) => `cubic-bezier(${n}, ${r}, ${s}, ${a})`,
  $l = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: Si([0, 0.65, 0.55, 1]),
    circOut: Si([0.55, 0, 1, 0.45]),
    backIn: Si([0.31, 0.01, 0.66, -0.59]),
    backOut: Si([0.33, 1.53, 0.69, 0.99]),
  };
function nm(n, r) {
  if (n) {
    return typeof n === 'function' && uo()
      ? em(n, r)
      : Ru(n)
        ? Si(n)
        : Array.isArray(n)
          ? n.map(s => nm(s, r) || $l.easeOut)
          : $l[n];
  }
}
const Lt = { x: !1, y: !1 };
function rm() {
  return Lt.x || Lt.y;
}
function x1(n, r, s) {
  let a;
  if (n instanceof Element) {
    return [n];
  }
  if (typeof n === 'string') {
    const l = document;
    const f = (a = void 0) !== null && a !== void 0 ? a : l.querySelectorAll(n);
    return f ? Array.from(f) : [];
  }
  return Array.from(n);
}
function im(n, r) {
  const s = x1(n),
    a = new AbortController(),
    l = { passive: !0, ...r, signal: a.signal };
  return [s, l, () => a.abort()];
}
function ah(n) {
  return r => {
    r.pointerType === 'touch' || rm() || n(r);
  };
}
function w1(n, r, s = {}) {
  const [a, l, f] = im(n, s),
    d = ah(p => {
      const { target: h } = p,
        m = r(p);
      if (typeof m !== 'function' || !h) {
        return;
      }
      const y = ah(w => {
        (m(w), h.removeEventListener('pointerleave', y));
      });
      h.addEventListener('pointerleave', y, l);
    });
  return (
    a.forEach(p => {
      p.addEventListener('pointerenter', d, l);
    }),
    f
  );
}
const sm = (n, r) => (r ? (n === r ? !0 : sm(n, r.parentElement)) : !1),
  Mu = n =>
    n.pointerType === 'mouse'
      ? typeof n.button !== 'number' || n.button <= 0
      : n.isPrimary !== !1,
  S1 = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
function k1(n) {
  return S1.has(n.tagName) || n.tabIndex !== -1;
}
const ki = new WeakSet();
function lh(n) {
  return r => {
    r.key === 'Enter' && n(r);
  };
}
function Pl(n, r) {
  n.dispatchEvent(
    new PointerEvent('pointer' + r, { isPrimary: !0, bubbles: !0 })
  );
}
const C1 = (n, r) => {
  const s = n.currentTarget;
  if (!s) {
    return;
  }
  const a = lh(() => {
    if (ki.has(s)) {
      return;
    }
    Pl(s, 'down');
    const l = lh(() => {
        Pl(s, 'up');
      }),
      f = () => Pl(s, 'cancel');
    (s.addEventListener('keyup', l, r), s.addEventListener('blur', f, r));
  });
  (s.addEventListener('keydown', a, r),
    s.addEventListener('blur', () => s.removeEventListener('keydown', a), r));
};
function uh(n) {
  return Mu(n) && !rm();
}
function T1(n, r, s = {}) {
  const [a, l, f] = im(n, s),
    d = p => {
      const h = p.currentTarget;
      if (!uh(p) || ki.has(h)) {
        return;
      }
      ki.add(h);
      const m = r(p),
        y = (N, T) => {
          (window.removeEventListener('pointerup', w),
            window.removeEventListener('pointercancel', x),
            !(!uh(N) || !ki.has(h)) &&
              (ki.delete(h), typeof m === 'function' && m(N, { success: T })));
        },
        w = N => {
          y(N, s.useGlobalTarget || sm(h, N.target));
        },
        x = N => {
          y(N, !1);
        };
      (window.addEventListener('pointerup', w, l),
        window.addEventListener('pointercancel', x, l));
    };
  return (
    a.forEach(p => {
      (!k1(p) && p.getAttribute('tabindex') === null && (p.tabIndex = 0),
        (s.useGlobalTarget ? window : p).addEventListener('pointerdown', d, l),
        p.addEventListener('focus', m => C1(m, l), l));
    }),
    f
  );
}
function P1(n) {
  return n === 'x' || n === 'y'
    ? Lt[n]
      ? null
      : ((Lt[n] = !0),
        () => {
          Lt[n] = !1;
        })
    : Lt.x || Lt.y
      ? null
      : ((Lt.x = Lt.y = !0),
        () => {
          Lt.x = Lt.y = !1;
        });
}
const om = new Set([
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  ...Rr,
]);
let io;
function E1() {
  io = void 0;
}
const $t = {
  now: () => (
    io === void 0 &&
      $t.set(
        be.isProcessing || kx.useManualTiming ? be.timestamp : performance.now()
      ),
    io
  ),
  set: n => {
    ((io = n), queueMicrotask(E1));
  },
};
function Au(n, r) {
  n.indexOf(r) === -1 && n.push(r);
}
function Lu(n, r) {
  const s = n.indexOf(r);
  s > -1 && n.splice(s, 1);
}
class Du {
  constructor() {
    this.subscriptions = [];
  }
  add(r) {
    return (Au(this.subscriptions, r), () => Lu(this.subscriptions, r));
  }
  notify(r, s, a) {
    const l = this.subscriptions.length;
    if (l) {
      if (l === 1) {
        this.subscriptions[0](r, s, a);
      } else {
        for (let f = 0; f < l; f++) {
          const d = this.subscriptions[f];
          d && d(r, s, a);
        }
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function am(n, r) {
  return r ? n * (1e3 / r) : 0;
}
const ch = 30,
  N1 = n => !isNaN(parseFloat(n));
class j1 {
  constructor(r, s = {}) {
    ((this.version = '11.17.0'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (a, l = !0) => {
        const f = $t.now();
        (this.updatedAt !== f && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(a),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          l &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(r),
      (this.owner = s.owner));
  }
  setCurrent(r) {
    ((this.current = r),
      (this.updatedAt = $t.now()),
      this.canTrackVelocity === null &&
        r !== void 0 &&
        (this.canTrackVelocity = N1(this.current)));
  }
  setPrevFrameValue(r = this.current) {
    ((this.prevFrameValue = r), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(r) {
    return this.on('change', r);
  }
  on(r, s) {
    this.events[r] || (this.events[r] = new Du());
    const a = this.events[r].add(s);
    return r === 'change'
      ? () => {
          (a(),
            we.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : a;
  }
  clearListeners() {
    for (const r in this.events) {
      this.events[r].clear();
    }
  }
  attach(r, s) {
    ((this.passiveEffect = r), (this.stopPassiveEffect = s));
  }
  set(r, s = !0) {
    !s || !this.passiveEffect
      ? this.updateAndNotify(r, s)
      : this.passiveEffect(r, this.updateAndNotify);
  }
  setWithVelocity(r, s, a) {
    (this.set(s),
      (this.prev = void 0),
      (this.prevFrameValue = r),
      (this.prevUpdatedAt = this.updatedAt - a));
  }
  jump(r, s = !0) {
    (this.updateAndNotify(r),
      (this.prev = r),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      s && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const r = $t.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      r - this.updatedAt > ch
    ) {
      return 0;
    }
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, ch);
    return am(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
  }
  start(r) {
    return (
      this.stop(),
      new Promise(s => {
        ((this.hasAnimated = !0),
          (this.animation = r(s)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function Ai(n, r) {
  return new j1(n, r);
}
function R1(n, r, s) {
  n.hasValue(r) ? n.getValue(r).set(s) : n.addValue(r, Ai(s));
}
function M1(n, r) {
  const s = wo(n, r);
  let { transitionEnd: a = {}, transition: l = {}, ...f } = s || {};
  f = { ...f, ...a };
  for (const d in f) {
    const p = Wx(f[d]);
    R1(n, d, p);
  }
}
function A1(n) {
  return !!(Ye(n) && n.add);
}
function bl(n, r) {
  const s = n.getValue('willChange');
  if (A1(s)) {
    return s.add(r);
  }
}
function lm(n) {
  return n.props[Op];
}
const um = (n, r, s) =>
    (((1 - 3 * s + 3 * r) * n + (3 * s - 6 * r)) * n + 3 * r) * n,
  L1 = 1e-7,
  D1 = 12;
function _1(n, r, s, a, l) {
  let f,
    d,
    p = 0;
  do {
    ((d = r + (s - r) / 2), (f = um(d, a, l) - n), f > 0 ? (s = d) : (r = d));
  } while (Math.abs(f) > L1 && ++p < D1);
  return d;
}
function Ii(n, r, s, a) {
  if (n === r && s === a) {
    return pt;
  }
  const l = f => _1(f, 0, 1, n, s);
  return f => (f === 0 || f === 1 ? f : um(l(f), r, a));
}
const cm = n => r => (r <= 0.5 ? n(2 * r) / 2 : (2 - n(2 * (1 - r))) / 2),
  dm = n => r => 1 - n(1 - r),
  fm = Ii(0.33, 1.53, 0.69, 0.99),
  _u = dm(fm),
  hm = cm(_u),
  pm = n =>
    (n *= 2) < 1 ? 0.5 * _u(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
  Vu = n => 1 - Math.sin(Math.acos(n)),
  mm = dm(Vu),
  gm = cm(Vu),
  ym = n => /^0[^.\s]+$/u.test(n);
function V1(n) {
  return typeof n === 'number'
    ? n === 0
    : n !== null
      ? n === 'none' || n === '0' || ym(n)
      : !0;
}
const Ti = n => Math.round(n * 1e5) / 1e5,
  Fu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function F1(n) {
  return n == null;
}
const I1 =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Iu = (n, r) => s =>
    !!(
      (typeof s === 'string' && I1.test(s) && s.startsWith(n)) ||
      (r && !F1(s) && Object.prototype.hasOwnProperty.call(s, r))
    ),
  vm = (n, r, s) => a => {
    if (typeof a !== 'string') {
      return a;
    }
    const [l, f, d, p] = a.match(Fu);
    return {
      [n]: parseFloat(l),
      [r]: parseFloat(f),
      [s]: parseFloat(d),
      alpha: p !== void 0 ? parseFloat(p) : 1,
    };
  },
  O1 = n => tn(0, 255, n),
  El = { ...Ar, transform: n => Math.round(O1(n)) },
  Wn = {
    test: Iu('rgb', 'red'),
    parse: vm('red', 'green', 'blue'),
    transform: ({ red: n, green: r, blue: s, alpha: a = 1 }) =>
      'rgba(' +
      El.transform(n) +
      ', ' +
      El.transform(r) +
      ', ' +
      El.transform(s) +
      ', ' +
      Ti(Mi.transform(a)) +
      ')',
  };
function z1(n) {
  let r = '',
    s = '',
    a = '',
    l = '';
  return (
    n.length > 5
      ? ((r = n.substring(1, 3)),
        (s = n.substring(3, 5)),
        (a = n.substring(5, 7)),
        (l = n.substring(7, 9)))
      : ((r = n.substring(1, 2)),
        (s = n.substring(2, 3)),
        (a = n.substring(3, 4)),
        (l = n.substring(4, 5)),
        (r += r),
        (s += s),
        (a += a),
        (l += l)),
    {
      red: parseInt(r, 16),
      green: parseInt(s, 16),
      blue: parseInt(a, 16),
      alpha: l ? parseInt(l, 16) / 255 : 1,
    }
  );
}
const Wl = { test: Iu('#'), parse: z1, transform: Wn.transform },
  xr = {
    test: Iu('hsl', 'hue'),
    parse: vm('hue', 'saturation', 'lightness'),
    transform: ({ hue: n, saturation: r, lightness: s, alpha: a = 1 }) =>
      'hsla(' +
      Math.round(n) +
      ', ' +
      Ut.transform(Ti(r)) +
      ', ' +
      Ut.transform(Ti(s)) +
      ', ' +
      Ti(Mi.transform(a)) +
      ')',
  },
  Qe = {
    test: n => Wn.test(n) || Wl.test(n) || xr.test(n),
    parse: n =>
      Wn.test(n) ? Wn.parse(n) : xr.test(n) ? xr.parse(n) : Wl.parse(n),
    transform: n =>
      typeof n === 'string'
        ? n
        : n.hasOwnProperty('red')
          ? Wn.transform(n)
          : xr.transform(n),
  },
  B1 =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function U1(n) {
  let r, s;
  return (
    isNaN(n) &&
    typeof n === 'string' &&
    (((r = n.match(Fu)) === null || r === void 0 ? void 0 : r.length) || 0) +
      (((s = n.match(B1)) === null || s === void 0 ? void 0 : s.length) || 0) >
      0
  );
}
const xm = 'number',
  wm = 'color',
  $1 = 'var',
  b1 = 'var(',
  dh = '${}',
  W1 =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Li(n) {
  const r = n.toString(),
    s = [],
    a = { color: [], number: [], var: [] },
    l = [];
  let f = 0;
  const p = r
    .replace(
      W1,
      h => (
        Qe.test(h)
          ? (a.color.push(f), l.push(wm), s.push(Qe.parse(h)))
          : h.startsWith(b1)
            ? (a.var.push(f), l.push($1), s.push(h))
            : (a.number.push(f), l.push(xm), s.push(parseFloat(h))),
        ++f,
        dh
      )
    )
    .split(dh);
  return { values: s, split: p, indexes: a, types: l };
}
function Sm(n) {
  return Li(n).values;
}
function km(n) {
  const { split: r, types: s } = Li(n),
    a = r.length;
  return l => {
    let f = '';
    for (let d = 0; d < a; d++) {
      if (((f += r[d]), l[d] !== void 0)) {
        const p = s[d];
        p === xm
          ? (f += Ti(l[d]))
          : p === wm
            ? (f += Qe.transform(l[d]))
            : (f += l[d]);
      }
    }
    return f;
  };
}
const H1 = n => (typeof n === 'number' ? 0 : n);
function K1(n) {
  const r = Sm(n);
  return km(n)(r.map(H1));
}
const En = {
    test: U1,
    parse: Sm,
    createTransformer: km,
    getAnimatableNone: K1,
  },
  G1 = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function Q1(n) {
  const [r, s] = n.slice(0, -1).split('(');
  if (r === 'drop-shadow') {
    return n;
  }
  const [a] = s.match(Fu) || [];
  if (!a) {
    return n;
  }
  const l = s.replace(a, '');
  let f = G1.has(r) ? 1 : 0;
  return (a !== s && (f *= 100), r + '(' + f + l + ')');
}
const Y1 = /\b([a-z-]*)\(.*?\)/gu,
  Hl = {
    ...En,
    getAnimatableNone: n => {
      const r = n.match(Y1);
      return r ? r.map(Q1).join(' ') : n;
    },
  },
  X1 = {
    ...Cu,
    color: Qe,
    backgroundColor: Qe,
    outlineColor: Qe,
    fill: Qe,
    stroke: Qe,
    borderColor: Qe,
    borderTopColor: Qe,
    borderRightColor: Qe,
    borderBottomColor: Qe,
    borderLeftColor: Qe,
    filter: Hl,
    WebkitFilter: Hl,
  },
  Ou = n => X1[n];
function Cm(n, r) {
  let s = Ou(n);
  return (
    s !== Hl && (s = En),
    s.getAnimatableNone ? s.getAnimatableNone(r) : void 0
  );
}
const Z1 = new Set(['auto', 'none', '0']);
function q1(n, r, s) {
  let a = 0,
    l;
  for (; a < n.length && !l; ) {
    const f = n[a];
    (typeof f === 'string' && !Z1.has(f) && Li(f).values.length && (l = n[a]),
      a++);
  }
  if (l && s) {
    for (const f of r) {
      n[f] = Cm(s, l);
    }
  }
}
const fh = n => n === Ar || n === ee,
  hh = (n, r) => parseFloat(n.split(', ')[r]),
  ph =
    (n, r) =>
    (s, { transform: a }) => {
      if (a === 'none' || !a) {
        return 0;
      }
      const l = a.match(/^matrix3d\((.+)\)$/u);
      if (l) {
        return hh(l[1], r);
      }
      {
        const f = a.match(/^matrix\((.+)\)$/u);
        return f ? hh(f[1], n) : 0;
      }
    },
  J1 = new Set(['x', 'y', 'z']),
  ew = Rr.filter(n => !J1.has(n));
function tw(n) {
  const r = [];
  return (
    ew.forEach(s => {
      const a = n.getValue(s);
      a !== void 0 &&
        (r.push([s, a.get()]), a.set(s.startsWith('scale') ? 1 : 0));
    }),
    r
  );
}
const Pr = {
  width: ({ x: n }, { paddingLeft: r = '0', paddingRight: s = '0' }) =>
    n.max - n.min - parseFloat(r) - parseFloat(s),
  height: ({ y: n }, { paddingTop: r = '0', paddingBottom: s = '0' }) =>
    n.max - n.min - parseFloat(r) - parseFloat(s),
  top: (n, { top: r }) => parseFloat(r),
  left: (n, { left: r }) => parseFloat(r),
  bottom: ({ y: n }, { top: r }) => parseFloat(r) + (n.max - n.min),
  right: ({ x: n }, { left: r }) => parseFloat(r) + (n.max - n.min),
  x: ph(4, 13),
  y: ph(5, 14),
};
Pr.translateX = Pr.x;
Pr.translateY = Pr.y;
const Hn = new Set();
let Kl = !1,
  Gl = !1;
function Tm() {
  if (Gl) {
    const n = Array.from(Hn).filter(a => a.needsMeasurement),
      r = new Set(n.map(a => a.element)),
      s = new Map();
    (r.forEach(a => {
      const l = tw(a);
      l.length && (s.set(a, l), a.render());
    }),
      n.forEach(a => a.measureInitialState()),
      r.forEach(a => {
        a.render();
        const l = s.get(a);
        l &&
          l.forEach(([f, d]) => {
            let p;
            (p = a.getValue(f)) === null || p === void 0 || p.set(d);
          });
      }),
      n.forEach(a => a.measureEndState()),
      n.forEach(a => {
        a.suspendedScrollY !== void 0 && window.scrollTo(0, a.suspendedScrollY);
      }));
  }
  ((Gl = !1), (Kl = !1), Hn.forEach(n => n.complete()), Hn.clear());
}
function Pm() {
  Hn.forEach(n => {
    (n.readKeyframes(), n.needsMeasurement && (Gl = !0));
  });
}
function nw() {
  (Pm(), Tm());
}
class zu {
  constructor(r, s, a, l, f, d = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...r]),
      (this.onComplete = s),
      (this.name = a),
      (this.motionValue = l),
      (this.element = f),
      (this.isAsync = d));
  }
  scheduleResolve() {
    ((this.isScheduled = !0),
      this.isAsync
        ? (Hn.add(this),
          Kl || ((Kl = !0), we.read(Pm), we.resolveKeyframes(Tm)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: r,
      name: s,
      element: a,
      motionValue: l,
    } = this;
    for (let f = 0; f < r.length; f++) {
      if (r[f] === null) {
        if (f === 0) {
          const d = l == null ? void 0 : l.get(),
            p = r[r.length - 1];
          if (d !== void 0) {
            r[0] = d;
          } else if (a && s) {
            const h = a.readValue(s, p);
            h != null && (r[0] = h);
          }
          (r[0] === void 0 && (r[0] = p), l && d === void 0 && l.set(r[0]));
        } else {
          r[f] = r[f - 1];
        }
      }
    }
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Hn.delete(this));
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Hn.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Em = n => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),
  rw = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function iw(n) {
  const r = rw.exec(n);
  if (!r) {
    return [,];
  }
  const [, s, a, l] = r;
  return [`--${s ?? a}`, l];
}
function Nm(n, r, s = 1) {
  const [a, l] = iw(n);
  if (!a) {
    return;
  }
  const f = window.getComputedStyle(r).getPropertyValue(a);
  if (f) {
    const d = f.trim();
    return Em(d) ? parseFloat(d) : d;
  }
  return ku(l) ? Nm(l, r, s + 1) : l;
}
const jm = n => r => r.test(n),
  sw = { test: n => n === 'auto', parse: n => n },
  Rm = [Ar, ee, Ut, Cn, Xx, Yx, sw],
  mh = n => Rm.find(jm(n));
class Mm extends zu {
  constructor(r, s, a, l, f) {
    super(r, s, a, l, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, element: s, name: a } = this;
    if (!s || !s.current) {
      return;
    }
    super.readKeyframes();
    for (let h = 0; h < r.length; h++) {
      let m = r[h];
      if (typeof m === 'string' && ((m = m.trim()), ku(m))) {
        const y = Nm(m, s.current);
        (y !== void 0 && (r[h] = y),
          h === r.length - 1 && (this.finalKeyframe = m));
      }
    }
    if ((this.resolveNoneKeyframes(), !om.has(a) || r.length !== 2)) {
      return;
    }
    const [l, f] = r,
      d = mh(l),
      p = mh(f);
    if (d !== p) {
      if (fh(d) && fh(p)) {
        for (let h = 0; h < r.length; h++) {
          const m = r[h];
          typeof m === 'string' && (r[h] = parseFloat(m));
        }
      } else {
        this.needsMeasurement = !0;
      }
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: r, name: s } = this,
      a = [];
    for (let l = 0; l < r.length; l++) {
      V1(r[l]) && a.push(l);
    }
    a.length && q1(r, a, s);
  }
  measureInitialState() {
    const { element: r, unresolvedKeyframes: s, name: a } = this;
    if (!r || !r.current) {
      return;
    }
    (a === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Pr[a](
        r.measureViewportBox(),
        window.getComputedStyle(r.current)
      )),
      (s[0] = this.measuredOrigin));
    const l = s[s.length - 1];
    l !== void 0 && r.getValue(a, l).jump(l, !1);
  }
  measureEndState() {
    let r;
    const { element: s, name: a, unresolvedKeyframes: l } = this;
    if (!s || !s.current) {
      return;
    }
    const f = s.getValue(a);
    f && f.jump(this.measuredOrigin, !1);
    const d = l.length - 1,
      p = l[d];
    ((l[d] = Pr[a](s.measureViewportBox(), window.getComputedStyle(s.current))),
      p !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = p),
      !((r = this.removedTransforms) === null || r === void 0) &&
        r.length &&
        this.removedTransforms.forEach(([h, m]) => {
          s.getValue(h).set(m);
        }),
      this.resolveNoneKeyframes());
  }
}
const gh = (n, r) =>
  r === 'zIndex'
    ? !1
    : !!(
        typeof n === 'number' ||
        Array.isArray(n) ||
        (typeof n === 'string' &&
          (En.test(n) || n === '0') &&
          !n.startsWith('url('))
      );
function ow(n) {
  const r = n[0];
  if (n.length === 1) {
    return !0;
  }
  for (let s = 0; s < n.length; s++) {
    if (n[s] !== r) {
      return !0;
    }
  }
}
function aw(n, r, s, a) {
  const l = n[0];
  if (l === null) {
    return !1;
  }
  if (r === 'display' || r === 'visibility') {
    return !0;
  }
  const f = n[n.length - 1],
    d = gh(l, r),
    p = gh(f, r);
  return !d || !p ? !1 : ow(n) || ((s === 'spring' || ju(s)) && a);
}
const lw = n => n !== null;
function So(n, { repeat: r, repeatType: s = 'loop' }, a) {
  const l = n.filter(lw),
    f = r && s !== 'loop' && r % 2 === 1 ? 0 : l.length - 1;
  return !f || a === void 0 ? l[f] : a;
}
const uw = 40;
class Am {
  constructor({
    autoplay: r = !0,
    delay: s = 0,
    type: a = 'keyframes',
    repeat: l = 0,
    repeatDelay: f = 0,
    repeatType: d = 'loop',
    ...p
  }) {
    ((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = $t.now()),
      (this.options = {
        autoplay: r,
        delay: s,
        type: a,
        repeat: l,
        repeatDelay: f,
        repeatType: d,
        ...p,
      }),
      this.updateFinishedPromise());
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > uw
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return (
      !this._resolved && !this.hasAttemptedResolve && nw(),
      this._resolved
    );
  }
  onKeyframesResolved(r, s) {
    ((this.resolvedAt = $t.now()), (this.hasAttemptedResolve = !0));
    const {
      name: a,
      type: l,
      velocity: f,
      delay: d,
      onComplete: p,
      onUpdate: h,
      isGenerator: m,
    } = this.options;
    if (!m && !aw(r, a, l, f)) {
      if (d) {
        this.options.duration = 0;
      } else {
        (h == null || h(So(r, this.options, s)),
          p == null || p(),
          this.resolveFinishedPromise());
        return;
      }
    }
    const y = this.initPlayback(r, s);
    y !== !1 &&
      ((this._resolved = { keyframes: r, finalKeyframe: s, ...y }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(r, s) {
    return this.currentFinishedPromise.then(r, s);
  }
  flatten() {
    ((this.options.type = 'keyframes'), (this.options.ease = 'linear'));
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise(r => {
      this.resolveFinishedPromise = r;
    });
  }
}
const Ee = (n, r, s) => n + (r - n) * s;
function Nl(n, r, s) {
  return (
    s < 0 && (s += 1),
    s > 1 && (s -= 1),
    s < 1 / 6
      ? n + (r - n) * 6 * s
      : s < 1 / 2
        ? r
        : s < 2 / 3
          ? n + (r - n) * (2 / 3 - s) * 6
          : n
  );
}
function cw({ hue: n, saturation: r, lightness: s, alpha: a }) {
  ((n /= 360), (r /= 100), (s /= 100));
  let l = 0,
    f = 0,
    d = 0;
  if (!r) {
    l = f = d = s;
  } else {
    const p = s < 0.5 ? s * (1 + r) : s + r - s * r,
      h = 2 * s - p;
    ((l = Nl(h, p, n + 1 / 3)), (f = Nl(h, p, n)), (d = Nl(h, p, n - 1 / 3)));
  }
  return {
    red: Math.round(l * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: a,
  };
}
function co(n, r) {
  return s => (s > 0 ? r : n);
}
const jl = (n, r, s) => {
    const a = n * n,
      l = s * (r * r - a) + a;
    return l < 0 ? 0 : Math.sqrt(l);
  },
  dw = [Wl, Wn, xr],
  fw = n => dw.find(r => r.test(n));
function yh(n) {
  const r = fw(n);
  if (!r) {
    return !1;
  }
  let s = r.parse(n);
  return (r === xr && (s = cw(s)), s);
}
const vh = (n, r) => {
    const s = yh(n),
      a = yh(r);
    if (!s || !a) {
      return co(n, r);
    }
    const l = { ...s };
    return f => (
      (l.red = jl(s.red, a.red, f)),
      (l.green = jl(s.green, a.green, f)),
      (l.blue = jl(s.blue, a.blue, f)),
      (l.alpha = Ee(s.alpha, a.alpha, f)),
      Wn.transform(l)
    );
  },
  hw = (n, r) => s => r(n(s)),
  Oi = (...n) => n.reduce(hw),
  Ql = new Set(['none', 'hidden']);
function pw(n, r) {
  return Ql.has(n) ? s => (s <= 0 ? n : r) : s => (s >= 1 ? r : n);
}
function mw(n, r) {
  return s => Ee(n, r, s);
}
function Bu(n) {
  return typeof n === 'number'
    ? mw
    : typeof n === 'string'
      ? ku(n)
        ? co
        : Qe.test(n)
          ? vh
          : vw
      : Array.isArray(n)
        ? Lm
        : typeof n === 'object'
          ? Qe.test(n)
            ? vh
            : gw
          : co;
}
function Lm(n, r) {
  const s = [...n],
    a = s.length,
    l = n.map((f, d) => Bu(f)(f, r[d]));
  return f => {
    for (let d = 0; d < a; d++) {
      s[d] = l[d](f);
    }
    return s;
  };
}
function gw(n, r) {
  const s = { ...n, ...r },
    a = {};
  for (const l in s) {
    n[l] !== void 0 && r[l] !== void 0 && (a[l] = Bu(n[l])(n[l], r[l]));
  }
  return l => {
    for (const f in a) {
      s[f] = a[f](l);
    }
    return s;
  };
}
function yw(n, r) {
  let s;
  const a = [],
    l = { color: 0, var: 0, number: 0 };
  for (let f = 0; f < r.values.length; f++) {
    const d = r.types[f],
      p = n.indexes[d][l[d]],
      h = (s = n.values[p]) !== null && s !== void 0 ? s : 0;
    ((a[f] = h), l[d]++);
  }
  return a;
}
const vw = (n, r) => {
  const s = En.createTransformer(r),
    a = Li(n),
    l = Li(r);
  return a.indexes.var.length === l.indexes.var.length &&
    a.indexes.color.length === l.indexes.color.length &&
    a.indexes.number.length >= l.indexes.number.length
    ? (Ql.has(n) && !l.values.length) || (Ql.has(r) && !a.values.length)
      ? pw(n, r)
      : Oi(Lm(yw(a, l), l.values), s)
    : co(n, r);
};
function Dm(n, r, s) {
  return typeof n === 'number' && typeof r === 'number' && typeof s === 'number'
    ? Ee(n, r, s)
    : Bu(n)(n, r);
}
const xw = 5;
function _m(n, r, s) {
  const a = Math.max(r - xw, 0);
  return am(s - n(a), r - a);
}
const je = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  xh = 0.001;
function ww({
  duration: n = je.duration,
  bounce: r = je.bounce,
  velocity: s = je.velocity,
  mass: a = je.mass,
}) {
  let l,
    f,
    d = 1 - r;
  ((d = tn(je.minDamping, je.maxDamping, d)),
    (n = tn(je.minDuration, je.maxDuration, en(n))),
    d < 1
      ? ((l = m => {
          const y = m * d,
            w = y * n,
            x = y - s,
            N = Yl(m, d),
            T = Math.exp(-w);
          return xh - (x / N) * T;
        }),
        (f = m => {
          const w = m * d * n,
            x = w * s + s,
            N = Math.pow(d, 2) * Math.pow(m, 2) * n,
            T = Math.exp(-w),
            P = Yl(Math.pow(m, 2), d);
          return ((-l(m) + xh > 0 ? -1 : 1) * ((x - N) * T)) / P;
        }))
      : ((l = m => {
          const y = Math.exp(-m * n),
            w = (m - s) * n + 1;
          return -0.001 + y * w;
        }),
        (f = m => {
          const y = Math.exp(-m * n),
            w = (s - m) * (n * n);
          return y * w;
        })));
  const p = 5 / n,
    h = kw(l, f, p);
  if (((n = Jt(n)), isNaN(h))) {
    return { stiffness: je.stiffness, damping: je.damping, duration: n };
  }
  {
    const m = Math.pow(h, 2) * a;
    return { stiffness: m, damping: d * 2 * Math.sqrt(a * m), duration: n };
  }
}
const Sw = 12;
function kw(n, r, s) {
  let a = s;
  for (let l = 1; l < Sw; l++) {
    a = a - n(a) / r(a);
  }
  return a;
}
function Yl(n, r) {
  return n * Math.sqrt(1 - r * r);
}
const Cw = ['duration', 'bounce'],
  Tw = ['stiffness', 'damping', 'mass'];
function wh(n, r) {
  return r.some(s => n[s] !== void 0);
}
function Pw(n) {
  let r = {
    velocity: je.velocity,
    stiffness: je.stiffness,
    damping: je.damping,
    mass: je.mass,
    isResolvedFromDuration: !1,
    ...n,
  };
  if (!wh(n, Tw) && wh(n, Cw)) {
    if (n.visualDuration) {
      const s = n.visualDuration,
        a = (2 * Math.PI) / (s * 1.2),
        l = a * a,
        f = 2 * tn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(l);
      r = { ...r, mass: je.mass, stiffness: l, damping: f };
    } else {
      const s = ww(n);
      ((r = { ...r, ...s, mass: je.mass }), (r.isResolvedFromDuration = !0));
    }
  }
  return r;
}
function Vm(n = je.visualDuration, r = je.bounce) {
  const s =
    typeof n !== 'object'
      ? { visualDuration: n, keyframes: [0, 1], bounce: r }
      : n;
  let { restSpeed: a, restDelta: l } = s;
  const f = s.keyframes[0],
    d = s.keyframes[s.keyframes.length - 1],
    p = { done: !1, value: f },
    {
      stiffness: h,
      damping: m,
      mass: y,
      duration: w,
      velocity: x,
      isResolvedFromDuration: N,
    } = Pw({ ...s, velocity: -en(s.velocity || 0) }),
    T = x || 0,
    P = m / (2 * Math.sqrt(h * y)),
    A = d - f,
    C = en(Math.sqrt(h / y)),
    _ = Math.abs(A) < 5;
  (a || (a = _ ? je.restSpeed.granular : je.restSpeed.default),
    l || (l = _ ? je.restDelta.granular : je.restDelta.default));
  let V;
  if (P < 1) {
    const $ = Yl(C, P);
    V = te => {
      const re = Math.exp(-P * C * te);
      return (
        d -
        re * (((T + P * C * A) / $) * Math.sin($ * te) + A * Math.cos($ * te))
      );
    };
  } else if (P === 1) {
    V = $ => d - Math.exp(-C * $) * (A + (T + C * A) * $);
  } else {
    const $ = C * Math.sqrt(P * P - 1);
    V = te => {
      const re = Math.exp(-P * C * te),
        X = Math.min($ * te, 300);
      return (
        d - (re * ((T + P * C * A) * Math.sinh(X) + $ * A * Math.cosh(X))) / $
      );
    };
  }
  const H = {
    calculatedDuration: (N && w) || null,
    next: $ => {
      const te = V($);
      if (N) {
        p.done = $ >= w;
      } else {
        let re = 0;
        P < 1 && (re = $ === 0 ? Jt(T) : _m(V, $, te));
        const X = Math.abs(re) <= a,
          ae = Math.abs(d - te) <= l;
        p.done = X && ae;
      }
      return ((p.value = p.done ? d : te), p);
    },
    toString: () => {
      const $ = Math.min(Jp(H), Ul),
        te = em(re => H.next($ * re).value, $, 30);
      return $ + 'ms ' + te;
    },
  };
  return H;
}
function Sh({
  keyframes: n,
  velocity: r = 0,
  power: s = 0.8,
  timeConstant: a = 325,
  bounceDamping: l = 10,
  bounceStiffness: f = 500,
  modifyTarget: d,
  min: p,
  max: h,
  restDelta: m = 0.5,
  restSpeed: y,
}) {
  const w = n[0],
    x = { done: !1, value: w },
    N = X => (p !== void 0 && X < p) || (h !== void 0 && X > h),
    T = X =>
      p === void 0
        ? h
        : h === void 0 || Math.abs(p - X) < Math.abs(h - X)
          ? p
          : h;
  let P = s * r;
  const A = w + P,
    C = d === void 0 ? A : d(A);
  C !== A && (P = C - w);
  const _ = X => -P * Math.exp(-X / a),
    V = X => C + _(X),
    H = X => {
      const ae = _(X),
        he = V(X);
      ((x.done = Math.abs(ae) <= m), (x.value = x.done ? C : he));
    };
  let $, te;
  const re = X => {
    N(x.value) &&
      (($ = X),
      (te = Vm({
        keyframes: [x.value, T(x.value)],
        velocity: _m(V, X, x.value),
        damping: l,
        stiffness: f,
        restDelta: m,
        restSpeed: y,
      })));
  };
  return (
    re(0),
    {
      calculatedDuration: null,
      next: X => {
        let ae = !1;
        return (
          !te && $ === void 0 && ((ae = !0), H(X), re(X)),
          $ !== void 0 && X >= $ ? te.next(X - $) : (!ae && H(X), x)
        );
      },
    }
  );
}
const Ew = Ii(0.42, 0, 1, 1),
  Nw = Ii(0, 0, 0.58, 1),
  Fm = Ii(0.42, 0, 0.58, 1),
  jw = n => Array.isArray(n) && typeof n[0] !== 'number',
  kh = {
    linear: pt,
    easeIn: Ew,
    easeInOut: Fm,
    easeOut: Nw,
    circIn: Vu,
    circInOut: gm,
    circOut: mm,
    backIn: _u,
    backInOut: hm,
    backOut: fm,
    anticipate: pm,
  },
  Ch = n => {
    if (Ru(n)) {
      zl(n.length === 4);
      const [r, s, a, l] = n;
      return Ii(r, s, a, l);
    } else if (typeof n === 'string') {
      return (zl(kh[n] !== void 0), kh[n]);
    }
    return n;
  };
function Rw(n, r, s) {
  const a = [],
    l = s || Dm,
    f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let p = l(n[d], n[d + 1]);
    if (r) {
      const h = Array.isArray(r) ? r[d] || pt : r;
      p = Oi(h, p);
    }
    a.push(p);
  }
  return a;
}
function Mw(n, r, { clamp: s = !0, ease: a, mixer: l } = {}) {
  const f = n.length;
  if ((zl(f === r.length), f === 1)) {
    return () => r[0];
  }
  if (f === 2 && r[0] === r[1]) {
    return () => r[1];
  }
  const d = n[0] === n[1];
  n[0] > n[f - 1] && ((n = [...n].reverse()), (r = [...r].reverse()));
  const p = Rw(r, a, l),
    h = p.length,
    m = y => {
      if (d && y < n[0]) {
        return r[0];
      }
      let w = 0;
      if (h > 1) {
        for (; w < n.length - 2 && !(y < n[w + 1]); w++) {}
      }
      const x = Cr(n[w], n[w + 1], y);
      return p[w](x);
    };
  return s ? y => m(tn(n[0], n[f - 1], y)) : m;
}
function Aw(n, r) {
  const s = n[n.length - 1];
  for (let a = 1; a <= r; a++) {
    const l = Cr(0, r, a);
    n.push(Ee(s, 1, l));
  }
}
function Lw(n) {
  const r = [0];
  return (Aw(r, n.length - 1), r);
}
function Dw(n, r) {
  return n.map(s => s * r);
}
function _w(n, r) {
  return n.map(() => r || Fm).splice(0, n.length - 1);
}
function fo({
  duration: n = 300,
  keyframes: r,
  times: s,
  ease: a = 'easeInOut',
}) {
  const l = jw(a) ? a.map(Ch) : Ch(a),
    f = { done: !1, value: r[0] },
    d = Dw(s && s.length === r.length ? s : Lw(r), n),
    p = Mw(d, r, { ease: Array.isArray(l) ? l : _w(r, l) });
  return {
    calculatedDuration: n,
    next: h => ((f.value = p(h)), (f.done = h >= n), f),
  };
}
const Vw = n => {
    const r = ({ timestamp: s }) => n(s);
    return {
      start: () => we.update(r, !0),
      stop: () => Pn(r),
      now: () => (be.isProcessing ? be.timestamp : $t.now()),
    };
  },
  Fw = { decay: Sh, inertia: Sh, tween: fo, keyframes: fo, spring: Vm },
  Iw = n => n / 100;
class Uu extends Am {
  constructor(r) {
    (super(r),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = 'running'),
      (this.startTime = null),
      (this.state = 'idle'),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')
        ) {
          return;
        }
        this.teardown();
        const { onStop: h } = this.options;
        h && h();
      }));
    const { name: s, motionValue: a, element: l, keyframes: f } = this.options,
      d = (l == null ? void 0 : l.KeyframeResolver) || zu,
      p = (h, m) => this.onKeyframesResolved(h, m);
    ((this.resolver = new d(f, p, s, a, l)), this.resolver.scheduleResolve());
  }
  flatten() {
    (super.flatten(),
      this._resolved &&
        Object.assign(
          this._resolved,
          this.initPlayback(this._resolved.keyframes)
        ));
  }
  initPlayback(r) {
    const {
        type: s = 'keyframes',
        repeat: a = 0,
        repeatDelay: l = 0,
        repeatType: f,
        velocity: d = 0,
      } = this.options,
      p = ju(s) ? s : Fw[s] || fo;
    let h, m;
    p !== fo &&
      typeof r[0] !== 'number' &&
      ((h = Oi(Iw, Dm(r[0], r[1]))), (r = [0, 100]));
    const y = p({ ...this.options, keyframes: r });
    (f === 'mirror' &&
      (m = p({ ...this.options, keyframes: [...r].reverse(), velocity: -d })),
      y.calculatedDuration === null && (y.calculatedDuration = Jp(y)));
    const { calculatedDuration: w } = y,
      x = w + l,
      N = x * (a + 1) - l;
    return {
      generator: y,
      mirroredGenerator: m,
      mapPercentToKeyframes: h,
      calculatedDuration: w,
      resolvedDuration: x,
      totalDuration: N,
    };
  }
  onPostResolved() {
    const { autoplay: r = !0 } = this.options;
    (this.play(),
      this.pendingPlayState === 'paused' || !r
        ? this.pause()
        : (this.state = this.pendingPlayState));
  }
  tick(r, s = !1) {
    const { resolved: a } = this;
    if (!a) {
      const { keyframes: X } = this.options;
      return { done: !0, value: X[X.length - 1] };
    }
    const {
      finalKeyframe: l,
      generator: f,
      mirroredGenerator: d,
      mapPercentToKeyframes: p,
      keyframes: h,
      calculatedDuration: m,
      totalDuration: y,
      resolvedDuration: w,
    } = a;
    if (this.startTime === null) {
      return f.next(0);
    }
    const {
      delay: x,
      repeat: N,
      repeatType: T,
      repeatDelay: P,
      onUpdate: A,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, r))
      : this.speed < 0 &&
        (this.startTime = Math.min(r - y / this.speed, this.startTime)),
      s
        ? (this.currentTime = r)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(r - this.startTime) * this.speed));
    const C = this.currentTime - x * (this.speed >= 0 ? 1 : -1),
      _ = this.speed >= 0 ? C < 0 : C > y;
    ((this.currentTime = Math.max(C, 0)),
      this.state === 'finished' &&
        this.holdTime === null &&
        (this.currentTime = y));
    let V = this.currentTime,
      H = f;
    if (N) {
      const X = Math.min(this.currentTime, y) / w;
      let ae = Math.floor(X),
        he = X % 1;
      (!he && X >= 1 && (he = 1),
        he === 1 && ae--,
        (ae = Math.min(ae, N + 1)),
        !!(ae % 2) &&
          (T === 'reverse'
            ? ((he = 1 - he), P && (he -= P / w))
            : T === 'mirror' && (H = d)),
        (V = tn(0, 1, he) * w));
    }
    const $ = _ ? { done: !1, value: h[0] } : H.next(V);
    p && ($.value = p($.value));
    let { done: te } = $;
    !_ &&
      m !== null &&
      (te = this.speed >= 0 ? this.currentTime >= y : this.currentTime <= 0);
    const re =
      this.holdTime === null &&
      (this.state === 'finished' || (this.state === 'running' && te));
    return (
      re && l !== void 0 && ($.value = So(h, this.options, l)),
      A && A($.value),
      re && this.finish(),
      $
    );
  }
  get duration() {
    const { resolved: r } = this;
    return r ? en(r.calculatedDuration) : 0;
  }
  get time() {
    return en(this.currentTime);
  }
  set time(r) {
    ((r = Jt(r)),
      (this.currentTime = r),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = r)
        : this.driver && (this.startTime = this.driver.now() - r / this.speed));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(r) {
    const s = this.playbackSpeed !== r;
    ((this.playbackSpeed = r), s && (this.time = en(this.currentTime)));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = 'running';
      return;
    }
    if (this.isStopped) {
      return;
    }
    const { driver: r = Vw, onPlay: s, startTime: a } = this.options;
    (this.driver || (this.driver = r(f => this.tick(f))), s && s());
    const l = this.driver.now();
    (this.holdTime !== null
      ? (this.startTime = l - this.holdTime)
      : this.startTime
        ? this.state === 'finished' && (this.startTime = l)
        : (this.startTime = a ?? this.calcStartTime()),
      this.state === 'finished' && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start());
  }
  pause() {
    let r;
    if (!this._resolved) {
      this.pendingPlayState = 'paused';
      return;
    }
    ((this.state = 'paused'),
      (this.holdTime =
        (r = this.currentTime) !== null && r !== void 0 ? r : 0));
  }
  complete() {
    (this.state !== 'running' && this.play(),
      (this.pendingPlayState = this.state = 'finished'),
      (this.holdTime = null));
  }
  finish() {
    (this.teardown(), (this.state = 'finished'));
    const { onComplete: r } = this.options;
    r && r();
  }
  cancel() {
    (this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise());
  }
  teardown() {
    ((this.state = 'idle'),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel());
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(r) {
    return ((this.startTime = 0), this.tick(r, !0));
  }
}
const Ow = new Set(['opacity', 'clipPath', 'filter', 'transform']);
function zw(
  n,
  r,
  s,
  {
    delay: a = 0,
    duration: l = 300,
    repeat: f = 0,
    repeatType: d = 'loop',
    ease: p = 'easeInOut',
    times: h,
  } = {}
) {
  const m = { [r]: s };
  h && (m.offset = h);
  const y = nm(p, l);
  return (
    Array.isArray(y) && (m.easing = y),
    n.animate(m, {
      delay: a,
      duration: l,
      easing: Array.isArray(y) ? 'linear' : y,
      fill: 'both',
      iterations: f + 1,
      direction: d === 'reverse' ? 'alternate' : 'normal',
    })
  );
}
const Bw = hu(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
  ho = 10,
  Uw = 2e4;
function $w(n) {
  return ju(n.type) || n.type === 'spring' || !tm(n.ease);
}
function bw(n, r) {
  const s = new Uu({
    ...r,
    keyframes: n,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let a = { done: !1, value: n[0] };
  const l = [];
  let f = 0;
  for (; !a.done && f < Uw; ) {
    ((a = s.sample(f)), l.push(a.value), (f += ho));
  }
  return { times: void 0, keyframes: l, duration: f - ho, ease: 'linear' };
}
const Im = { anticipate: pm, backInOut: hm, circInOut: gm };
function Ww(n) {
  return n in Im;
}
class Th extends Am {
  constructor(r) {
    super(r);
    const { name: s, motionValue: a, element: l, keyframes: f } = this.options;
    ((this.resolver = new Mm(
      f,
      (d, p) => this.onKeyframesResolved(d, p),
      s,
      a,
      l
    )),
      this.resolver.scheduleResolve());
  }
  initPlayback(r, s) {
    let a;
    let {
      duration: l = 300,
      times: f,
      ease: d,
      type: p,
      motionValue: h,
      name: m,
      startTime: y,
    } = this.options;
    if (!(!((a = h.owner) === null || a === void 0) && a.current)) {
      return !1;
    }
    if (
      (typeof d === 'string' && uo() && Ww(d) && (d = Im[d]), $w(this.options))
    ) {
      const {
          onComplete: x,
          onUpdate: N,
          motionValue: T,
          element: P,
          ...A
        } = this.options,
        C = bw(r, A);
      ((r = C.keyframes),
        r.length === 1 && (r[1] = r[0]),
        (l = C.duration),
        (f = C.times),
        (d = C.ease),
        (p = 'keyframes'));
    }
    const w = zw(h.owner.current, m, r, {
      ...this.options,
      duration: l,
      times: f,
      ease: d,
    });
    return (
      (w.startTime = y ?? this.calcStartTime()),
      this.pendingTimeline
        ? (oh(w, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (w.onfinish = () => {
            const { onComplete: x } = this.options;
            (h.set(So(r, this.options, s)),
              x && x(),
              this.cancel(),
              this.resolveFinishedPromise());
          }),
      { animation: w, duration: l, times: f, type: p, ease: d, keyframes: r }
    );
  }
  get duration() {
    const { resolved: r } = this;
    if (!r) {
      return 0;
    }
    const { duration: s } = r;
    return en(s);
  }
  get time() {
    const { resolved: r } = this;
    if (!r) {
      return 0;
    }
    const { animation: s } = r;
    return en(s.currentTime || 0);
  }
  set time(r) {
    const { resolved: s } = this;
    if (!s) {
      return;
    }
    const { animation: a } = s;
    a.currentTime = Jt(r);
  }
  get speed() {
    const { resolved: r } = this;
    if (!r) {
      return 1;
    }
    const { animation: s } = r;
    return s.playbackRate;
  }
  set speed(r) {
    const { resolved: s } = this;
    if (!s) {
      return;
    }
    const { animation: a } = s;
    a.playbackRate = r;
  }
  get state() {
    const { resolved: r } = this;
    if (!r) {
      return 'idle';
    }
    const { animation: s } = r;
    return s.playState;
  }
  get startTime() {
    const { resolved: r } = this;
    if (!r) {
      return null;
    }
    const { animation: s } = r;
    return s.startTime;
  }
  attachTimeline(r) {
    if (!this._resolved) {
      this.pendingTimeline = r;
    } else {
      const { resolved: s } = this;
      if (!s) {
        return pt;
      }
      const { animation: a } = s;
      oh(a, r);
    }
    return pt;
  }
  play() {
    if (this.isStopped) {
      return;
    }
    const { resolved: r } = this;
    if (!r) {
      return;
    }
    const { animation: s } = r;
    (s.playState === 'finished' && this.updateFinishedPromise(), s.play());
  }
  pause() {
    const { resolved: r } = this;
    if (!r) {
      return;
    }
    const { animation: s } = r;
    s.pause();
  }
  stop() {
    if (
      (this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')
    ) {
      return;
    }
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    const { resolved: r } = this;
    if (!r) {
      return;
    }
    const {
      animation: s,
      keyframes: a,
      duration: l,
      type: f,
      ease: d,
      times: p,
    } = r;
    if (s.playState === 'idle' || s.playState === 'finished') {
      return;
    }
    if (this.time) {
      const {
          motionValue: m,
          onUpdate: y,
          onComplete: w,
          element: x,
          ...N
        } = this.options,
        T = new Uu({
          ...N,
          keyframes: a,
          duration: l,
          type: f,
          ease: d,
          times: p,
          isGenerator: !0,
        }),
        P = Jt(this.time);
      m.setWithVelocity(T.sample(P - ho).value, T.sample(P).value, ho);
    }
    const { onStop: h } = this.options;
    (h && h(), this.cancel());
  }
  complete() {
    const { resolved: r } = this;
    r && r.animation.finish();
  }
  cancel() {
    const { resolved: r } = this;
    r && r.animation.cancel();
  }
  static supports(r) {
    const {
      motionValue: s,
      name: a,
      repeatDelay: l,
      repeatType: f,
      damping: d,
      type: p,
    } = r;
    return (
      Bw() &&
      a &&
      Ow.has(a) &&
      s &&
      s.owner &&
      s.owner.current instanceof HTMLElement &&
      !s.owner.getProps().onUpdate &&
      !l &&
      f !== 'mirror' &&
      d !== 0 &&
      p !== 'inertia'
    );
  }
}
const Hw = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  Kw = n => ({
    type: 'spring',
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Gw = { type: 'keyframes', duration: 0.8 },
  Qw = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  Yw = (n, { keyframes: r }) =>
    r.length > 2
      ? Gw
      : Mr.has(n)
        ? n.startsWith('scale')
          ? Kw(r[1])
          : Hw
        : Qw;
function Xw({
  when: n,
  delay: r,
  delayChildren: s,
  staggerChildren: a,
  staggerDirection: l,
  repeat: f,
  repeatType: d,
  repeatDelay: p,
  from: h,
  elapsed: m,
  ...y
}) {
  return !!Object.keys(y).length;
}
const $u =
  (n, r, s, a = {}, l, f) =>
  d => {
    const p = Nu(a, n) || {},
      h = p.delay || a.delay || 0;
    let { elapsed: m = 0 } = a;
    m = m - Jt(h);
    let y = {
      keyframes: Array.isArray(s) ? s : [null, s],
      ease: 'easeOut',
      velocity: r.getVelocity(),
      ...p,
      delay: -m,
      onUpdate: x => {
        (r.set(x), p.onUpdate && p.onUpdate(x));
      },
      onComplete: () => {
        (d(), p.onComplete && p.onComplete());
      },
      name: n,
      motionValue: r,
      element: f ? void 0 : l,
    };
    (Xw(p) || (y = { ...y, ...Yw(n, y) }),
      y.duration && (y.duration = Jt(y.duration)),
      y.repeatDelay && (y.repeatDelay = Jt(y.repeatDelay)),
      y.from !== void 0 && (y.keyframes[0] = y.from));
    let w = !1;
    if (
      ((y.type === !1 || (y.duration === 0 && !y.repeatDelay)) &&
        ((y.duration = 0), y.delay === 0 && (w = !0)),
      w && !f && r.get() !== void 0)
    ) {
      const x = So(y.keyframes, p);
      if (x !== void 0) {
        return (
          we.update(() => {
            (y.onUpdate(x), y.onComplete());
          }),
          new g1([])
        );
      }
    }
    return !f && Th.supports(y) ? new Th(y) : new Uu(y);
  };
function Zw({ protectedKeys: n, needsAnimating: r }, s) {
  const a = n.hasOwnProperty(s) && r[s] !== !0;
  return ((r[s] = !1), a);
}
function Om(n, r, { delay: s = 0, transitionOverride: a, type: l } = {}) {
  let f;
  let { transition: d = n.getDefaultTransition(), transitionEnd: p, ...h } = r;
  a && (d = a);
  const m = [],
    y = l && n.animationState && n.animationState.getState()[l];
  for (const w in h) {
    const x = n.getValue(
        w,
        (f = n.latestValues[w]) !== null && f !== void 0 ? f : null
      ),
      N = h[w];
    if (N === void 0 || (y && Zw(y, w))) {
      continue;
    }
    const T = { delay: s, ...Nu(d || {}, w) };
    let P = !1;
    if (window.MotionHandoffAnimation) {
      const C = lm(n);
      if (C) {
        const _ = window.MotionHandoffAnimation(C, w, we);
        _ !== null && ((T.startTime = _), (P = !0));
      }
    }
    (bl(n, w),
      x.start(
        $u(w, x, N, n.shouldReduceMotion && om.has(w) ? { type: !1 } : T, n, P)
      ));
    const A = x.animation;
    A && m.push(A);
  }
  return (
    p &&
      Promise.all(m).then(() => {
        we.update(() => {
          p && M1(n, p);
        });
      }),
    m
  );
}
function Xl(n, r, s = {}) {
  let a;
  const l = wo(
    n,
    r,
    s.type === 'exit'
      ? (a = n.presenceContext) === null || a === void 0
        ? void 0
        : a.custom
      : void 0
  );
  let { transition: f = n.getDefaultTransition() || {} } = l || {};
  s.transitionOverride && (f = s.transitionOverride);
  const d = l ? () => Promise.all(Om(n, l, s)) : () => Promise.resolve(),
    p =
      n.variantChildren && n.variantChildren.size
        ? (m = 0) => {
            const {
              delayChildren: y = 0,
              staggerChildren: w,
              staggerDirection: x,
            } = f;
            return qw(n, r, y + m, w, x, s);
          }
        : () => Promise.resolve(),
    { when: h } = f;
  if (h) {
    const [m, y] = h === 'beforeChildren' ? [d, p] : [p, d];
    return m().then(() => y());
  } else {
    return Promise.all([d(), p(s.delay)]);
  }
}
function qw(n, r, s = 0, a = 0, l = 1, f) {
  const d = [],
    p = (n.variantChildren.size - 1) * a,
    h = l === 1 ? (m = 0) => m * a : (m = 0) => p - m * a;
  return (
    Array.from(n.variantChildren)
      .sort(Jw)
      .forEach((m, y) => {
        (m.notify('AnimationStart', r),
          d.push(
            Xl(m, r, { ...f, delay: s + h(y) }).then(() =>
              m.notify('AnimationComplete', r)
            )
          ));
      }),
    Promise.all(d)
  );
}
function Jw(n, r) {
  return n.sortNodePosition(r);
}
function eS(n, r, s = {}) {
  n.notify('AnimationStart', r);
  let a;
  if (Array.isArray(r)) {
    const l = r.map(f => Xl(n, f, s));
    a = Promise.all(l);
  } else if (typeof r === 'string') {
    a = Xl(n, r, s);
  } else {
    const l = typeof r === 'function' ? wo(n, r, s.custom) : r;
    a = Promise.all(Om(n, l, s));
  }
  return a.then(() => {
    n.notify('AnimationComplete', r);
  });
}
const tS = mu.length;
function zm(n) {
  if (!n) {
    return;
  }
  if (!n.isControllingVariants) {
    const s = n.parent ? zm(n.parent) || {} : {};
    return (n.props.initial !== void 0 && (s.initial = n.props.initial), s);
  }
  const r = {};
  for (let s = 0; s < tS; s++) {
    const a = mu[s],
      l = n.props[a];
    (Ri(l) || l === !1) && (r[a] = l);
  }
  return r;
}
const nS = [...pu].reverse(),
  rS = pu.length;
function iS(n) {
  return r => Promise.all(r.map(({ animation: s, options: a }) => eS(n, s, a)));
}
function sS(n) {
  let r = iS(n),
    s = Ph(),
    a = !0;
  const l = h => (m, y) => {
    let w;
    const x = wo(
      n,
      y,
      h === 'exit'
        ? (w = n.presenceContext) === null || w === void 0
          ? void 0
          : w.custom
        : void 0
    );
    if (x) {
      const { transition: N, transitionEnd: T, ...P } = x;
      m = { ...m, ...P, ...T };
    }
    return m;
  };
  function f(h) {
    r = h(n);
  }
  function d(h) {
    const { props: m } = n,
      y = zm(n.parent) || {},
      w = [],
      x = new Set();
    let N = {},
      T = 1 / 0;
    for (let A = 0; A < rS; A++) {
      const C = nS[A],
        _ = s[C],
        V = m[C] !== void 0 ? m[C] : y[C],
        H = Ri(V),
        $ = C === h ? _.isActive : null;
      $ === !1 && (T = A);
      let te = V === y[C] && V !== m[C] && H;
      if (
        (te && a && n.manuallyAnimateOnMount && (te = !1),
        (_.protectedKeys = { ...N }),
        (!_.isActive && $ === null) ||
          (!V && !_.prevProp) ||
          vo(V) ||
          typeof V === 'boolean')
      ) {
        continue;
      }
      const re = oS(_.prevProp, V);
      let X = re || (C === h && _.isActive && !te && H) || (A > T && H),
        ae = !1;
      const he = Array.isArray(V) ? V : [V];
      let Be = he.reduce(l(C), {});
      $ === !1 && (Be = {});
      const { prevResolvedValues: lt = {} } = _,
        Xe = { ...lt, ...Be },
        et = se => {
          ((X = !0),
            x.has(se) && ((ae = !0), x.delete(se)),
            (_.needsAnimating[se] = !0));
          const U = n.getValue(se);
          U && (U.liveStyle = !1);
        };
      for (const se in Xe) {
        const U = Be[se],
          Z = lt[se];
        if (N.hasOwnProperty(se)) {
          continue;
        }
        let W = !1;
        (Bl(U) && Bl(Z) ? (W = !qp(U, Z)) : (W = U !== Z),
          W
            ? U != null
              ? et(se)
              : x.add(se)
            : U !== void 0 && x.has(se)
              ? et(se)
              : (_.protectedKeys[se] = !0));
      }
      ((_.prevProp = V),
        (_.prevResolvedValues = Be),
        _.isActive && (N = { ...N, ...Be }),
        a && n.blockInitialAnimation && (X = !1),
        X &&
          (!(te && re) || ae) &&
          w.push(...he.map(se => ({ animation: se, options: { type: C } }))));
    }
    if (x.size) {
      const A = {};
      (x.forEach(C => {
        const _ = n.getBaseTarget(C),
          V = n.getValue(C);
        (V && (V.liveStyle = !0), (A[C] = _ ?? null));
      }),
        w.push({ animation: A }));
    }
    let P = !!w.length;
    return (
      a &&
        (m.initial === !1 || m.initial === m.animate) &&
        !n.manuallyAnimateOnMount &&
        (P = !1),
      (a = !1),
      P ? r(w) : Promise.resolve()
    );
  }
  function p(h, m) {
    let y;
    if (s[h].isActive === m) {
      return Promise.resolve();
    }
    ((y = n.variantChildren) === null ||
      y === void 0 ||
      y.forEach(x => {
        let N;
        return (N = x.animationState) === null || N === void 0
          ? void 0
          : N.setActive(h, m);
      }),
      (s[h].isActive = m));
    const w = d(h);
    for (const x in s) {
      s[x].protectedKeys = {};
    }
    return w;
  }
  return {
    animateChanges: d,
    setActive: p,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      ((s = Ph()), (a = !0));
    },
  };
}
function oS(n, r) {
  return typeof r === 'string' ? r !== n : Array.isArray(r) ? !qp(r, n) : !1;
}
function Un(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Ph() {
  return {
    animate: Un(!0),
    whileInView: Un(),
    whileHover: Un(),
    whileTap: Un(),
    whileDrag: Un(),
    whileFocus: Un(),
    exit: Un(),
  };
}
class Nn {
  constructor(r) {
    ((this.isMounted = !1), (this.node = r));
  }
  update() {}
}
class aS extends Nn {
  constructor(r) {
    (super(r), r.animationState || (r.animationState = sS(r)));
  }
  updateAnimationControlsSubscription() {
    const { animate: r } = this.node.getProps();
    vo(r) && (this.unmountControls = r.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: r } = this.node.getProps(),
      { animate: s } = this.node.prevProps || {};
    r !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    let r;
    (this.node.animationState.reset(),
      (r = this.unmountControls) === null || r === void 0 || r.call(this));
  }
}
let lS = 0;
class uS extends Nn {
  constructor() {
    (super(...arguments), (this.id = lS++));
  }
  update() {
    if (!this.node.presenceContext) {
      return;
    }
    const { isPresent: r, onExitComplete: s } = this.node.presenceContext,
      { isPresent: a } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || r === a) {
      return;
    }
    const l = this.node.animationState.setActive('exit', !r);
    s && !r && l.then(() => s(this.id));
  }
  mount() {
    const { register: r } = this.node.presenceContext || {};
    r && (this.unmount = r(this.id));
  }
  unmount() {}
}
const cS = { animation: { Feature: aS }, exit: { Feature: uS } };
function Di(n, r, s, a = { passive: !0 }) {
  return (n.addEventListener(r, s, a), () => n.removeEventListener(r, s));
}
function zi(n) {
  return { point: { x: n.pageX, y: n.pageY } };
}
const dS = n => r => Mu(r) && n(r, zi(r));
function Pi(n, r, s, a) {
  return Di(n, r, dS(s), a);
}
const Eh = (n, r) => Math.abs(n - r);
function fS(n, r) {
  const s = Eh(n.x, r.x),
    a = Eh(n.y, r.y);
  return Math.sqrt(s ** 2 + a ** 2);
}
class Bm {
  constructor(
    r,
    s,
    { transformPagePoint: a, contextWindow: l, dragSnapToOrigin: f = !1 } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) {
          return;
        }
        const w = Ml(this.lastMoveEventInfo, this.history),
          x = this.startEvent !== null,
          N = fS(w.offset, { x: 0, y: 0 }) >= 3;
        if (!x && !N) {
          return;
        }
        const { point: T } = w,
          { timestamp: P } = be;
        this.history.push({ ...T, timestamp: P });
        const { onStart: A, onMove: C } = this.handlers;
        (x ||
          (A && A(this.lastMoveEvent, w),
          (this.startEvent = this.lastMoveEvent)),
          C && C(this.lastMoveEvent, w));
      }),
      (this.handlePointerMove = (w, x) => {
        ((this.lastMoveEvent = w),
          (this.lastMoveEventInfo = Rl(x, this.transformPagePoint)),
          we.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (w, x) => {
        this.end();
        const { onEnd: N, onSessionEnd: T, resumeAnimation: P } = this.handlers;
        if (
          (this.dragSnapToOrigin && P && P(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        ) {
          return;
        }
        const A = Ml(
          w.type === 'pointercancel'
            ? this.lastMoveEventInfo
            : Rl(x, this.transformPagePoint),
          this.history
        );
        (this.startEvent && N && N(w, A), T && T(w, A));
      }),
      !Mu(r))
    ) {
      return;
    }
    ((this.dragSnapToOrigin = f),
      (this.handlers = s),
      (this.transformPagePoint = a),
      (this.contextWindow = l || window));
    const d = zi(r),
      p = Rl(d, this.transformPagePoint),
      { point: h } = p,
      { timestamp: m } = be;
    this.history = [{ ...h, timestamp: m }];
    const { onSessionStart: y } = s;
    (y && y(r, Ml(p, this.history)),
      (this.removeListeners = Oi(
        Pi(this.contextWindow, 'pointermove', this.handlePointerMove),
        Pi(this.contextWindow, 'pointerup', this.handlePointerUp),
        Pi(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )));
  }
  updateHandlers(r) {
    this.handlers = r;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Pn(this.updatePoint));
  }
}
function Rl(n, r) {
  return r ? { point: r(n.point) } : n;
}
function Nh(n, r) {
  return { x: n.x - r.x, y: n.y - r.y };
}
function Ml({ point: n }, r) {
  return {
    point: n,
    delta: Nh(n, Um(r)),
    offset: Nh(n, hS(r)),
    velocity: pS(r, 0.1),
  };
}
function hS(n) {
  return n[0];
}
function Um(n) {
  return n[n.length - 1];
}
function pS(n, r) {
  if (n.length < 2) {
    return { x: 0, y: 0 };
  }
  let s = n.length - 1,
    a = null;
  const l = Um(n);
  for (; s >= 0 && ((a = n[s]), !(l.timestamp - a.timestamp > Jt(r))); ) {
    s--;
  }
  if (!a) {
    return { x: 0, y: 0 };
  }
  const f = en(l.timestamp - a.timestamp);
  if (f === 0) {
    return { x: 0, y: 0 };
  }
  const d = { x: (l.x - a.x) / f, y: (l.y - a.y) / f };
  return (d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d);
}
const $m = 1e-4,
  mS = 1 - $m,
  gS = 1 + $m,
  bm = 0.01,
  yS = 0 - bm,
  vS = 0 + bm;
function mt(n) {
  return n.max - n.min;
}
function xS(n, r, s) {
  return Math.abs(n - r) <= s;
}
function jh(n, r, s, a = 0.5) {
  ((n.origin = a),
    (n.originPoint = Ee(r.min, r.max, n.origin)),
    (n.scale = mt(s) / mt(r)),
    (n.translate = Ee(s.min, s.max, n.origin) - n.originPoint),
    ((n.scale >= mS && n.scale <= gS) || isNaN(n.scale)) && (n.scale = 1),
    ((n.translate >= yS && n.translate <= vS) || isNaN(n.translate)) &&
      (n.translate = 0));
}
function Ei(n, r, s, a) {
  (jh(n.x, r.x, s.x, a ? a.originX : void 0),
    jh(n.y, r.y, s.y, a ? a.originY : void 0));
}
function Rh(n, r, s) {
  ((n.min = s.min + r.min), (n.max = n.min + mt(r)));
}
function wS(n, r, s) {
  (Rh(n.x, r.x, s.x), Rh(n.y, r.y, s.y));
}
function Mh(n, r, s) {
  ((n.min = r.min - s.min), (n.max = n.min + mt(r)));
}
function Ni(n, r, s) {
  (Mh(n.x, r.x, s.x), Mh(n.y, r.y, s.y));
}
function SS(n, { min: r, max: s }, a) {
  return (
    r !== void 0 && n < r
      ? (n = a ? Ee(r, n, a.min) : Math.max(n, r))
      : s !== void 0 && n > s && (n = a ? Ee(s, n, a.max) : Math.min(n, s)),
    n
  );
}
function Ah(n, r, s) {
  return {
    min: r !== void 0 ? n.min + r : void 0,
    max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0,
  };
}
function kS(n, { top: r, left: s, bottom: a, right: l }) {
  return { x: Ah(n.x, s, l), y: Ah(n.y, r, a) };
}
function Lh(n, r) {
  let s = r.min - n.min,
    a = r.max - n.max;
  return (
    r.max - r.min < n.max - n.min && ([s, a] = [a, s]),
    { min: s, max: a }
  );
}
function CS(n, r) {
  return { x: Lh(n.x, r.x), y: Lh(n.y, r.y) };
}
function TS(n, r) {
  let s = 0.5;
  const a = mt(n),
    l = mt(r);
  return (
    l > a
      ? (s = Cr(r.min, r.max - a, n.min))
      : a > l && (s = Cr(n.min, n.max - l, r.min)),
    tn(0, 1, s)
  );
}
function PS(n, r) {
  const s = {};
  return (
    r.min !== void 0 && (s.min = r.min - n.min),
    r.max !== void 0 && (s.max = r.max - n.min),
    s
  );
}
const Zl = 0.35;
function ES(n = Zl) {
  return (
    n === !1 ? (n = 0) : n === !0 && (n = Zl),
    { x: Dh(n, 'left', 'right'), y: Dh(n, 'top', 'bottom') }
  );
}
function Dh(n, r, s) {
  return { min: _h(n, r), max: _h(n, s) };
}
function _h(n, r) {
  return typeof n === 'number' ? n : n[r] || 0;
}
const Vh = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  wr = () => ({ x: Vh(), y: Vh() }),
  Fh = () => ({ min: 0, max: 0 }),
  Ae = () => ({ x: Fh(), y: Fh() });
function Ct(n) {
  return [n('x'), n('y')];
}
function Wm({ top: n, left: r, right: s, bottom: a }) {
  return { x: { min: r, max: s }, y: { min: n, max: a } };
}
function NS({ x: n, y: r }) {
  return { top: r.min, right: n.max, bottom: r.max, left: n.min };
}
function jS(n, r) {
  if (!r) {
    return n;
  }
  const s = r({ x: n.left, y: n.top }),
    a = r({ x: n.right, y: n.bottom });
  return { top: s.y, left: s.x, bottom: a.y, right: a.x };
}
function Al(n) {
  return n === void 0 || n === 1;
}
function ql({ scale: n, scaleX: r, scaleY: s }) {
  return !Al(n) || !Al(r) || !Al(s);
}
function $n(n) {
  return (
    ql(n) ||
    Hm(n) ||
    n.z ||
    n.rotate ||
    n.rotateX ||
    n.rotateY ||
    n.skewX ||
    n.skewY
  );
}
function Hm(n) {
  return Ih(n.x) || Ih(n.y);
}
function Ih(n) {
  return n && n !== '0%';
}
function po(n, r, s) {
  const a = n - s,
    l = r * a;
  return s + l;
}
function Oh(n, r, s, a, l) {
  return (l !== void 0 && (n = po(n, l, a)), po(n, s, a) + r);
}
function Jl(n, r = 0, s = 1, a, l) {
  ((n.min = Oh(n.min, r, s, a, l)), (n.max = Oh(n.max, r, s, a, l)));
}
function Km(n, { x: r, y: s }) {
  (Jl(n.x, r.translate, r.scale, r.originPoint),
    Jl(n.y, s.translate, s.scale, s.originPoint));
}
const zh = 0.999999999999,
  Bh = 1.0000000000001;
function RS(n, r, s, a = !1) {
  const l = s.length;
  if (!l) {
    return;
  }
  r.x = r.y = 1;
  let f, d;
  for (let p = 0; p < l; p++) {
    ((f = s[p]), (d = f.projectionDelta));
    const { visualElement: h } = f.options;
    (h && h.props.style && h.props.style.display === 'contents') ||
      (a &&
        f.options.layoutScroll &&
        f.scroll &&
        f !== f.root &&
        kr(n, { x: -f.scroll.offset.x, y: -f.scroll.offset.y }),
      d && ((r.x *= d.x.scale), (r.y *= d.y.scale), Km(n, d)),
      a && $n(f.latestValues) && kr(n, f.latestValues));
  }
  (r.x < Bh && r.x > zh && (r.x = 1), r.y < Bh && r.y > zh && (r.y = 1));
}
function Sr(n, r) {
  ((n.min = n.min + r), (n.max = n.max + r));
}
function Uh(n, r, s, a, l = 0.5) {
  const f = Ee(n.min, n.max, l);
  Jl(n, r, s, f, a);
}
function kr(n, r) {
  (Uh(n.x, r.x, r.scaleX, r.scale, r.originX),
    Uh(n.y, r.y, r.scaleY, r.scale, r.originY));
}
function Gm(n, r) {
  return Wm(jS(n.getBoundingClientRect(), r));
}
function MS(n, r, s) {
  const a = Gm(n, s),
    { scroll: l } = r;
  return (l && (Sr(a.x, l.offset.x), Sr(a.y, l.offset.y)), a);
}
const Qm = ({ current: n }) => (n ? n.ownerDocument.defaultView : null),
  AS = new WeakMap();
class LS {
  constructor(r) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Ae()),
      (this.visualElement = r));
  }
  start(r, { snapToCursor: s = !1 } = {}) {
    const { presenceContext: a } = this.visualElement;
    if (a && a.isPresent === !1) {
      return;
    }
    const l = y => {
        const { dragSnapToOrigin: w } = this.getProps();
        (w ? this.pauseAnimation() : this.stopAnimation(),
          s && this.snapToCursor(zi(y).point));
      },
      f = (y, w) => {
        const { drag: x, dragPropagation: N, onDragStart: T } = this.getProps();
        if (
          x &&
          !N &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = P1(x)),
          !this.openDragLock)
        ) {
          return;
        }
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Ct(A => {
            let C = this.getAxisMotionValue(A).get() || 0;
            if (Ut.test(C)) {
              const { projection: _ } = this.visualElement;
              if (_ && _.layout) {
                const V = _.layout.layoutBox[A];
                V && (C = mt(V) * (parseFloat(C) / 100));
              }
            }
            this.originPoint[A] = C;
          }),
          T && we.postRender(() => T(y, w)),
          bl(this.visualElement, 'transform'));
        const { animationState: P } = this.visualElement;
        P && P.setActive('whileDrag', !0);
      },
      d = (y, w) => {
        const {
          dragPropagation: x,
          dragDirectionLock: N,
          onDirectionLock: T,
          onDrag: P,
        } = this.getProps();
        if (!x && !this.openDragLock) {
          return;
        }
        const { offset: A } = w;
        if (N && this.currentDirection === null) {
          ((this.currentDirection = DS(A)),
            this.currentDirection !== null && T && T(this.currentDirection));
          return;
        }
        (this.updateAxis('x', w.point, A),
          this.updateAxis('y', w.point, A),
          this.visualElement.render(),
          P && P(y, w));
      },
      p = (y, w) => this.stop(y, w),
      h = () =>
        Ct(y => {
          let w;
          return (
            this.getAnimationState(y) === 'paused' &&
            ((w = this.getAxisMotionValue(y).animation) === null || w === void 0
              ? void 0
              : w.play())
          );
        }),
      { dragSnapToOrigin: m } = this.getProps();
    this.panSession = new Bm(
      r,
      {
        onSessionStart: l,
        onStart: f,
        onMove: d,
        onSessionEnd: p,
        resumeAnimation: h,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: m,
        contextWindow: Qm(this.visualElement),
      }
    );
  }
  stop(r, s) {
    const a = this.isDragging;
    if ((this.cancel(), !a)) {
      return;
    }
    const { velocity: l } = s;
    this.startAnimation(l);
    const { onDragEnd: f } = this.getProps();
    f && we.postRender(() => f(r, s));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: r, animationState: s } = this.visualElement;
    (r && (r.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: a } = this.getProps();
    (!a &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      s && s.setActive('whileDrag', !1));
  }
  updateAxis(r, s, a) {
    const { drag: l } = this.getProps();
    if (!a || !eo(r, l, this.currentDirection)) {
      return;
    }
    const f = this.getAxisMotionValue(r);
    let d = this.originPoint[r] + a[r];
    (this.constraints &&
      this.constraints[r] &&
      (d = SS(d, this.constraints[r], this.elastic[r])),
      f.set(d));
  }
  resolveConstraints() {
    let r;
    const { dragConstraints: s, dragElastic: a } = this.getProps(),
      l =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (r = this.visualElement.projection) === null || r === void 0
            ? void 0
            : r.layout,
      f = this.constraints;
    (s && vr(s)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : s && l
        ? (this.constraints = kS(l.layoutBox, s))
        : (this.constraints = !1),
      (this.elastic = ES(a)),
      f !== this.constraints &&
        l &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Ct(d => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(d) &&
            (this.constraints[d] = PS(l.layoutBox[d], this.constraints[d]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: r, onMeasureDragConstraints: s } = this.getProps();
    if (!r || !vr(r)) {
      return !1;
    }
    const a = r.current,
      { projection: l } = this.visualElement;
    if (!l || !l.layout) {
      return !1;
    }
    const f = MS(a, l.root, this.visualElement.getTransformPagePoint());
    let d = CS(l.layout.layoutBox, f);
    if (s) {
      const p = s(NS(d));
      ((this.hasMutatedConstraints = !!p), p && (d = Wm(p)));
    }
    return d;
  }
  startAnimation(r) {
    const {
        drag: s,
        dragMomentum: a,
        dragElastic: l,
        dragTransition: f,
        dragSnapToOrigin: d,
        onDragTransitionEnd: p,
      } = this.getProps(),
      h = this.constraints || {},
      m = Ct(y => {
        if (!eo(y, s, this.currentDirection)) {
          return;
        }
        let w = h[y] || {};
        d && (w = { min: 0, max: 0 });
        const x = l ? 200 : 1e6,
          N = l ? 40 : 1e7,
          T = {
            type: 'inertia',
            velocity: a ? r[y] : 0,
            bounceStiffness: x,
            bounceDamping: N,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...f,
            ...w,
          };
        return this.startAxisValueAnimation(y, T);
      });
    return Promise.all(m).then(p);
  }
  startAxisValueAnimation(r, s) {
    const a = this.getAxisMotionValue(r);
    return (
      bl(this.visualElement, r),
      a.start($u(r, a, 0, s, this.visualElement, !1))
    );
  }
  stopAnimation() {
    Ct(r => this.getAxisMotionValue(r).stop());
  }
  pauseAnimation() {
    Ct(r => {
      let s;
      return (s = this.getAxisMotionValue(r).animation) === null || s === void 0
        ? void 0
        : s.pause();
    });
  }
  getAnimationState(r) {
    let s;
    return (s = this.getAxisMotionValue(r).animation) === null || s === void 0
      ? void 0
      : s.state;
  }
  getAxisMotionValue(r) {
    const s = `_drag${r.toUpperCase()}`,
      a = this.visualElement.getProps(),
      l = a[s];
    return (
      l ||
      this.visualElement.getValue(r, (a.initial ? a.initial[r] : void 0) || 0)
    );
  }
  snapToCursor(r) {
    Ct(s => {
      const { drag: a } = this.getProps();
      if (!eo(s, a, this.currentDirection)) {
        return;
      }
      const { projection: l } = this.visualElement,
        f = this.getAxisMotionValue(s);
      if (l && l.layout) {
        const { min: d, max: p } = l.layout.layoutBox[s];
        f.set(r[s] - Ee(d, p, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) {
      return;
    }
    const { drag: r, dragConstraints: s } = this.getProps(),
      { projection: a } = this.visualElement;
    if (!vr(s) || !a || !this.constraints) {
      return;
    }
    this.stopAnimation();
    const l = { x: 0, y: 0 };
    Ct(d => {
      const p = this.getAxisMotionValue(d);
      if (p && this.constraints !== !1) {
        const h = p.get();
        l[d] = TS({ min: h, max: h }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = f ? f({}, '') : 'none'),
      a.root && a.root.updateScroll(),
      a.updateLayout(),
      this.resolveConstraints(),
      Ct(d => {
        if (!eo(d, r, null)) {
          return;
        }
        const p = this.getAxisMotionValue(d),
          { min: h, max: m } = this.constraints[d];
        p.set(Ee(h, m, l[d]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) {
      return;
    }
    AS.set(this.visualElement, this);
    const r = this.visualElement.current,
      s = Pi(r, 'pointerdown', h => {
        const { drag: m, dragListener: y = !0 } = this.getProps();
        m && y && this.start(h);
      }),
      a = () => {
        const { dragConstraints: h } = this.getProps();
        vr(h) && h.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: l } = this.visualElement,
      f = l.addEventListener('measure', a);
    (l && !l.layout && (l.root && l.root.updateScroll(), l.updateLayout()),
      we.read(a));
    const d = Di(window, 'resize', () => this.scalePositionWithinConstraints()),
      p = l.addEventListener(
        'didUpdate',
        ({ delta: h, hasLayoutChanged: m }) => {
          this.isDragging &&
            m &&
            (Ct(y => {
              const w = this.getAxisMotionValue(y);
              w &&
                ((this.originPoint[y] += h[y].translate),
                w.set(w.get() + h[y].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      (d(), s(), f(), p && p());
    };
  }
  getProps() {
    const r = this.visualElement.getProps(),
      {
        drag: s = !1,
        dragDirectionLock: a = !1,
        dragPropagation: l = !1,
        dragConstraints: f = !1,
        dragElastic: d = Zl,
        dragMomentum: p = !0,
      } = r;
    return {
      ...r,
      drag: s,
      dragDirectionLock: a,
      dragPropagation: l,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: p,
    };
  }
}
function eo(n, r, s) {
  return (r === !0 || r === n) && (s === null || s === n);
}
function DS(n, r = 10) {
  let s = null;
  return (Math.abs(n.y) > r ? (s = 'y') : Math.abs(n.x) > r && (s = 'x'), s);
}
class _S extends Nn {
  constructor(r) {
    (super(r),
      (this.removeGroupControls = pt),
      (this.removeListeners = pt),
      (this.controls = new LS(r)));
  }
  mount() {
    const { dragControls: r } = this.node.getProps();
    (r && (this.removeGroupControls = r.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || pt));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const $h = n => (r, s) => {
  n && we.postRender(() => n(r, s));
};
class VS extends Nn {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = pt));
  }
  onPointerDown(r) {
    this.session = new Bm(r, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Qm(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: r,
      onPanStart: s,
      onPan: a,
      onPanEnd: l,
    } = this.node.getProps();
    return {
      onSessionStart: $h(r),
      onStart: $h(s),
      onMove: a,
      onEnd: (f, d) => {
        (delete this.session, l && we.postRender(() => l(f, d)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Pi(this.node.current, 'pointerdown', r =>
      this.onPointerDown(r)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const so = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function bh(n, r) {
  return r.max === r.min ? 0 : (n / (r.max - r.min)) * 100;
}
const wi = {
    correct: (n, r) => {
      if (!r.target) {
        return n;
      }
      if (typeof n === 'string') {
        if (ee.test(n)) {
          n = parseFloat(n);
        } else {
          return n;
        }
      }
      const s = bh(n, r.target.x),
        a = bh(n, r.target.y);
      return `${s}% ${a}%`;
    },
  },
  FS = {
    correct: (n, { treeScale: r, projectionDelta: s }) => {
      const a = n,
        l = En.parse(n);
      if (l.length > 5) {
        return a;
      }
      const f = En.createTransformer(n),
        d = typeof l[0] !== 'number' ? 1 : 0,
        p = s.x.scale * r.x,
        h = s.y.scale * r.y;
      ((l[0 + d] /= p), (l[1 + d] /= h));
      const m = Ee(p, h, 0.5);
      return (
        typeof l[2 + d] === 'number' && (l[2 + d] /= m),
        typeof l[3 + d] === 'number' && (l[3 + d] /= m),
        f(l)
      );
    },
  };
class IS extends j.Component {
  componentDidMount() {
    const {
        visualElement: r,
        layoutGroup: s,
        switchLayoutGroup: a,
        layoutId: l,
      } = this.props,
      { projection: f } = r;
    ($x(OS),
      f &&
        (s.group && s.group.add(f),
        a && a.register && l && a.register(f),
        f.root.didUpdate(),
        f.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        f.setOptions({
          ...f.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (so.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(r) {
    const {
        layoutDependency: s,
        visualElement: a,
        drag: l,
        isPresent: f,
      } = this.props,
      d = a.projection;
    return (
      d &&
        ((d.isPresent = f),
        l || r.layoutDependency !== s || s === void 0
          ? d.willUpdate()
          : this.safeToRemove(),
        r.isPresent !== f &&
          (f
            ? d.promote()
            : d.relegate() ||
              we.postRender(() => {
                const p = d.getStack();
                (!p || !p.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: r } = this.props.visualElement;
    r &&
      (r.root.didUpdate(),
      yu.postRender(() => {
        !r.currentAnimation && r.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: r,
        layoutGroup: s,
        switchLayoutGroup: a,
      } = this.props,
      { projection: l } = r;
    l &&
      (l.scheduleCheckAfterUnmount(),
      s && s.group && s.group.remove(l),
      a && a.deregister && a.deregister(l));
  }
  safeToRemove() {
    const { safeToRemove: r } = this.props;
    r && r();
  }
  render() {
    return null;
  }
}
function Ym(n) {
  const [r, s] = wx(),
    a = j.useContext(Lp);
  return v.jsx(IS, {
    ...n,
    layoutGroup: a,
    switchLayoutGroup: j.useContext(zp),
    isPresent: r,
    safeToRemove: s,
  });
}
const OS = {
  borderRadius: {
    ...wi,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: wi,
  borderTopRightRadius: wi,
  borderBottomLeftRadius: wi,
  borderBottomRightRadius: wi,
  boxShadow: FS,
};
function zS(n, r, s) {
  const a = Ye(n) ? n : Ai(n);
  return (a.start($u('', a, r, s)), a.animation);
}
function BS(n) {
  return n instanceof SVGElement && n.tagName !== 'svg';
}
const US = (n, r) => n.depth - r.depth;
class $S {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(r) {
    (Au(this.children, r), (this.isDirty = !0));
  }
  remove(r) {
    (Lu(this.children, r), (this.isDirty = !0));
  }
  forEach(r) {
    (this.isDirty && this.children.sort(US),
      (this.isDirty = !1),
      this.children.forEach(r));
  }
}
function bS(n, r) {
  const s = $t.now(),
    a = ({ timestamp: l }) => {
      const f = l - s;
      f >= r && (Pn(a), n(f - r));
    };
  return (we.read(a, !0), () => Pn(a));
}
const Xm = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  WS = Xm.length,
  Wh = n => (typeof n === 'string' ? parseFloat(n) : n),
  Hh = n => typeof n === 'number' || ee.test(n);
function HS(n, r, s, a, l, f) {
  l
    ? ((n.opacity = Ee(0, s.opacity !== void 0 ? s.opacity : 1, KS(a))),
      (n.opacityExit = Ee(r.opacity !== void 0 ? r.opacity : 1, 0, GS(a))))
    : f &&
      (n.opacity = Ee(
        r.opacity !== void 0 ? r.opacity : 1,
        s.opacity !== void 0 ? s.opacity : 1,
        a
      ));
  for (let d = 0; d < WS; d++) {
    const p = `border${Xm[d]}Radius`;
    let h = Kh(r, p),
      m = Kh(s, p);
    if (h === void 0 && m === void 0) {
      continue;
    }
    (h || (h = 0),
      m || (m = 0),
      h === 0 || m === 0 || Hh(h) === Hh(m)
        ? ((n[p] = Math.max(Ee(Wh(h), Wh(m), a), 0)),
          (Ut.test(m) || Ut.test(h)) && (n[p] += '%'))
        : (n[p] = m));
  }
  (r.rotate || s.rotate) && (n.rotate = Ee(r.rotate || 0, s.rotate || 0, a));
}
function Kh(n, r) {
  return n[r] !== void 0 ? n[r] : n.borderRadius;
}
const KS = Zm(0, 0.5, mm),
  GS = Zm(0.5, 0.95, pt);
function Zm(n, r, s) {
  return a => (a < n ? 0 : a > r ? 1 : s(Cr(n, r, a)));
}
function Gh(n, r) {
  ((n.min = r.min), (n.max = r.max));
}
function kt(n, r) {
  (Gh(n.x, r.x), Gh(n.y, r.y));
}
function Qh(n, r) {
  ((n.translate = r.translate),
    (n.scale = r.scale),
    (n.originPoint = r.originPoint),
    (n.origin = r.origin));
}
function Yh(n, r, s, a, l) {
  return (
    (n -= r),
    (n = po(n, 1 / s, a)),
    l !== void 0 && (n = po(n, 1 / l, a)),
    n
  );
}
function QS(n, r = 0, s = 1, a = 0.5, l, f = n, d = n) {
  if (
    (Ut.test(r) &&
      ((r = parseFloat(r)), (r = Ee(d.min, d.max, r / 100) - d.min)),
    typeof r !== 'number')
  ) {
    return;
  }
  let p = Ee(f.min, f.max, a);
  (n === f && (p -= r),
    (n.min = Yh(n.min, r, s, p, l)),
    (n.max = Yh(n.max, r, s, p, l)));
}
function Xh(n, r, [s, a, l], f, d) {
  QS(n, r[s], r[a], r[l], r.scale, f, d);
}
const YS = ['x', 'scaleX', 'originX'],
  XS = ['y', 'scaleY', 'originY'];
function Zh(n, r, s, a) {
  (Xh(n.x, r, YS, s ? s.x : void 0, a ? a.x : void 0),
    Xh(n.y, r, XS, s ? s.y : void 0, a ? a.y : void 0));
}
function qh(n) {
  return n.translate === 0 && n.scale === 1;
}
function qm(n) {
  return qh(n.x) && qh(n.y);
}
function Jh(n, r) {
  return n.min === r.min && n.max === r.max;
}
function ZS(n, r) {
  return Jh(n.x, r.x) && Jh(n.y, r.y);
}
function ep(n, r) {
  return (
    Math.round(n.min) === Math.round(r.min) &&
    Math.round(n.max) === Math.round(r.max)
  );
}
function Jm(n, r) {
  return ep(n.x, r.x) && ep(n.y, r.y);
}
function tp(n) {
  return mt(n.x) / mt(n.y);
}
function np(n, r) {
  return (
    n.translate === r.translate &&
    n.scale === r.scale &&
    n.originPoint === r.originPoint
  );
}
class qS {
  constructor() {
    this.members = [];
  }
  add(r) {
    (Au(this.members, r), r.scheduleRender());
  }
  remove(r) {
    if (
      (Lu(this.members, r),
      r === this.prevLead && (this.prevLead = void 0),
      r === this.lead)
    ) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(r) {
    const s = this.members.findIndex(l => r === l);
    if (s === 0) {
      return !1;
    }
    let a;
    for (let l = s; l >= 0; l--) {
      const f = this.members[l];
      if (f.isPresent !== !1) {
        a = f;
        break;
      }
    }
    return a ? (this.promote(a), !0) : !1;
  }
  promote(r, s) {
    const a = this.lead;
    if (r !== a && ((this.prevLead = a), (this.lead = r), r.show(), a)) {
      (a.instance && a.scheduleRender(),
        r.scheduleRender(),
        (r.resumeFrom = a),
        s && (r.resumeFrom.preserveOpacity = !0),
        a.snapshot &&
          ((r.snapshot = a.snapshot),
          (r.snapshot.latestValues = a.animationValues || a.latestValues)),
        r.root && r.root.isUpdating && (r.isLayoutDirty = !0));
      const { crossfade: l } = r.options;
      l === !1 && a.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach(r => {
      const { options: s, resumingFrom: a } = r;
      (s.onExitComplete && s.onExitComplete(),
        a && a.options.onExitComplete && a.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach(r => {
      r.instance && r.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function JS(n, r, s) {
  let a = '';
  const l = n.x.translate / r.x,
    f = n.y.translate / r.y,
    d = (s == null ? void 0 : s.z) || 0;
  if (
    ((l || f || d) && (a = `translate3d(${l}px, ${f}px, ${d}px) `),
    (r.x !== 1 || r.y !== 1) && (a += `scale(${1 / r.x}, ${1 / r.y}) `),
    s)
  ) {
    const {
      transformPerspective: m,
      rotate: y,
      rotateX: w,
      rotateY: x,
      skewX: N,
      skewY: T,
    } = s;
    (m && (a = `perspective(${m}px) ${a}`),
      y && (a += `rotate(${y}deg) `),
      w && (a += `rotateX(${w}deg) `),
      x && (a += `rotateY(${x}deg) `),
      N && (a += `skewX(${N}deg) `),
      T && (a += `skewY(${T}deg) `));
  }
  const p = n.x.scale * r.x,
    h = n.y.scale * r.y;
  return ((p !== 1 || h !== 1) && (a += `scale(${p}, ${h})`), a || 'none');
}
const bn = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Ci = typeof window < 'u' && window.MotionDebug !== void 0,
  Ll = ['', 'X', 'Y', 'Z'],
  e2 = { visibility: 'hidden' },
  rp = 1e3;
let t2 = 0;
function Dl(n, r, s, a) {
  const { latestValues: l } = r;
  l[n] && ((s[n] = l[n]), r.setStaticValue(n, 0), a && (a[n] = 0));
}
function eg(n) {
  if (((n.hasCheckedOptimisedAppear = !0), n.root === n)) {
    return;
  }
  const { visualElement: r } = n.options;
  if (!r) {
    return;
  }
  const s = lm(r);
  if (window.MotionHasOptimisedAnimation(s, 'transform')) {
    const { layout: l, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(s, 'transform', we, !(l || f));
  }
  const { parent: a } = n;
  a && !a.hasCheckedOptimisedAppear && eg(a);
}
function tg({
  attachResizeListener: n,
  defaultParent: r,
  measureScroll: s,
  checkIsScrollRoot: a,
  resetTransform: l,
}) {
  return class {
    constructor(d = {}, p = r == null ? void 0 : r()) {
      ((this.id = t2++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            Ci &&
              (bn.totalNodes =
                bn.resolvedTargetDeltas =
                bn.recalculatedProjection =
                  0),
            this.nodes.forEach(i2),
            this.nodes.forEach(u2),
            this.nodes.forEach(c2),
            this.nodes.forEach(s2),
            Ci && window.MotionDebug.record(bn));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = p ? p.root || p : this),
        (this.path = p ? [...p.path, p] : []),
        (this.parent = p),
        (this.depth = p ? p.depth + 1 : 0));
      for (let h = 0; h < this.path.length; h++) {
        this.path[h].shouldResetTransform = !0;
      }
      this.root === this && (this.nodes = new $S());
    }
    addEventListener(d, p) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new Du()),
        this.eventHandlers.get(d).add(p)
      );
    }
    notifyListeners(d, ...p) {
      const h = this.eventHandlers.get(d);
      h && h.notify(...p);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d, p = this.root.hasTreeAnimated) {
      if (this.instance) {
        return;
      }
      ((this.isSVG = BS(d)), (this.instance = d));
      const { layoutId: h, layout: m, visualElement: y } = this.options;
      if (
        (y && !y.current && y.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        p && (m || h) && (this.isLayoutDirty = !0),
        n)
      ) {
        let w;
        const x = () => (this.root.updateBlockedByResize = !1);
        n(d, () => {
          ((this.root.updateBlockedByResize = !0),
            w && w(),
            (w = bS(x, 250)),
            so.hasAnimatedSinceResize &&
              ((so.hasAnimatedSinceResize = !1), this.nodes.forEach(sp)));
        });
      }
      (h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          y &&
          (h || m) &&
          this.addEventListener(
            'didUpdate',
            ({
              delta: w,
              hasLayoutChanged: x,
              hasRelativeTargetChanged: N,
              layout: T,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const P =
                  this.options.transition || y.getDefaultTransition() || m2,
                { onLayoutAnimationStart: A, onLayoutAnimationComplete: C } =
                  y.getProps(),
                _ = !this.targetLayout || !Jm(this.targetLayout, T) || N,
                V = !x && N;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                V ||
                (x && (_ || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(w, V));
                const H = { ...Nu(P, 'layout'), onPlay: A, onComplete: C };
                ((y.shouldReduceMotion || this.options.layoutRoot) &&
                  ((H.delay = 0), (H.type = !1)),
                  this.startAnimation(H));
              } else {
                (x || sp(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              }
              this.targetLayout = T;
            }
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const d = this.getStack();
      (d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Pn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(d2),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          eg(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      ) {
        return;
      }
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const w = this.path[y];
        ((w.shouldResetTransform = !0),
          w.updateScroll('snapshot'),
          w.options.layoutRoot && w.willUpdate(!1));
      }
      const { layoutId: p, layout: h } = this.options;
      if (p === void 0 && !h) {
        return;
      }
      const m = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = m
        ? m(this.latestValues, '')
        : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners('willUpdate'));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(ip));
        return;
      }
      (this.isUpdating || this.nodes.forEach(a2),
        (this.isUpdating = !1),
        this.nodes.forEach(l2),
        this.nodes.forEach(n2),
        this.nodes.forEach(r2),
        this.clearAllSnapshots());
      const p = $t.now();
      ((be.delta = tn(0, 1e3 / 60, p - be.timestamp)),
        (be.timestamp = p),
        (be.isProcessing = !0),
        Tl.update.process(be),
        Tl.preRender.process(be),
        Tl.render.process(be),
        (be.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), yu.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(o2), this.sharedNodes.forEach(f2));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        we.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      we.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      ) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let h = 0; h < this.path.length; h++) {
          this.path[h].updateScroll();
        }
      }
      const d = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = Ae()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox));
      const { visualElement: p } = this.options;
      p &&
        p.notify(
          'LayoutMeasure',
          this.layout.layoutBox,
          d ? d.layoutBox : void 0
        );
    }
    updateScroll(d = 'measure') {
      let p = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (p = !1),
        p)
      ) {
        const h = a(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: h,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : h,
        };
      }
    }
    resetTransform() {
      if (!l) {
        return;
      }
      const d =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        p = this.projectionDelta && !qm(this.projectionDelta),
        h = this.getTransformTemplate(),
        m = h ? h(this.latestValues, '') : void 0,
        y = m !== this.prevTransformTemplateValue;
      d &&
        (p || $n(this.latestValues) || y) &&
        (l(this.instance, m),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(d = !0) {
      const p = this.measurePageBox();
      let h = this.removeElementScroll(p);
      return (
        d && (h = this.removeTransform(h)),
        g2(h),
        {
          animationId: this.root.animationId,
          measuredBox: p,
          layoutBox: h,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      let d;
      const { visualElement: p } = this.options;
      if (!p) {
        return Ae();
      }
      const h = p.measureViewportBox();
      if (
        !(
          ((d = this.scroll) === null || d === void 0 ? void 0 : d.wasRoot) ||
          this.path.some(y2)
        )
      ) {
        const { scroll: y } = this.root;
        y && (Sr(h.x, y.offset.x), Sr(h.y, y.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      let p;
      const h = Ae();
      if (
        (kt(h, d), !((p = this.scroll) === null || p === void 0) && p.wasRoot)
      ) {
        return h;
      }
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m],
          { scroll: w, options: x } = y;
        y !== this.root &&
          w &&
          x.layoutScroll &&
          (w.wasRoot && kt(h, d), Sr(h.x, w.offset.x), Sr(h.y, w.offset.y));
      }
      return h;
    }
    applyTransform(d, p = !1) {
      const h = Ae();
      kt(h, d);
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m];
        (!p &&
          y.options.layoutScroll &&
          y.scroll &&
          y !== y.root &&
          kr(h, { x: -y.scroll.offset.x, y: -y.scroll.offset.y }),
          $n(y.latestValues) && kr(h, y.latestValues));
      }
      return ($n(this.latestValues) && kr(h, this.latestValues), h);
    }
    removeTransform(d) {
      const p = Ae();
      kt(p, d);
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h];
        if (!m.instance || !$n(m.latestValues)) {
          continue;
        }
        ql(m.latestValues) && m.updateSnapshot();
        const y = Ae(),
          w = m.measurePageBox();
        (kt(y, w),
          Zh(p, m.latestValues, m.snapshot ? m.snapshot.layoutBox : void 0, y));
      }
      return ($n(this.latestValues) && Zh(p, this.latestValues), p);
    }
    setTargetDelta(d) {
      ((this.targetDelta = d),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== be.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      let p;
      const h = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = h.isSharedProjectionDirty));
      const m = !!this.resumingFrom || this !== h;
      if (
        !(
          d ||
          (m && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((p = this.parent) === null || p === void 0) &&
            p.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      ) {
        return;
      }
      const { layout: w, layoutId: x } = this.options;
      if (!(!this.layout || !(w || x))) {
        if (
          ((this.resolvedRelativeTargetAt = be.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const N = this.getClosestProjectingParent();
          N && N.layout && this.animationProgress !== 1
            ? ((this.relativeParent = N),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Ae()),
              (this.relativeTargetOrigin = Ae()),
              Ni(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                N.layout.layoutBox
              ),
              kt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = Ae()), (this.targetWithTransforms = Ae())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                wS(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : kt(this.target, this.layout.layoutBox),
                  Km(this.target, this.targetDelta))
                : kt(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const N = this.getClosestProjectingParent();
            N &&
            !!N.resumingFrom == !!this.resumingFrom &&
            !N.options.layoutScroll &&
            N.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = N),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Ae()),
                (this.relativeTargetOrigin = Ae()),
                Ni(this.relativeTargetOrigin, this.target, N.target),
                kt(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          Ci && bn.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          ql(this.parent.latestValues) ||
          Hm(this.parent.latestValues)
        )
      ) {
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      let d;
      const p = this.getLead(),
        h = !!this.resumingFrom || this !== p;
      let m = !0;
      if (
        ((this.isProjectionDirty ||
          (!((d = this.parent) === null || d === void 0) &&
            d.isProjectionDirty)) &&
          (m = !1),
        h &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (m = !1),
        this.resolvedRelativeTargetAt === be.timestamp && (m = !1),
        m)
      ) {
        return;
      }
      const { layout: y, layoutId: w } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(y || w))
      ) {
        return;
      }
      kt(this.layoutCorrected, this.layout.layoutBox);
      const x = this.treeScale.x,
        N = this.treeScale.y;
      (RS(this.layoutCorrected, this.treeScale, this.path, h),
        p.layout &&
          !p.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((p.target = p.layout.layoutBox), (p.targetWithTransforms = Ae())));
      const { target: T } = p;
      if (!T) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Qh(this.prevProjectionDelta.x, this.projectionDelta.x),
          Qh(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Ei(this.projectionDelta, this.layoutCorrected, T, this.latestValues),
        (this.treeScale.x !== x ||
          this.treeScale.y !== N ||
          !np(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !np(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', T)),
        Ci && bn.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      let p;
      if (
        ((p = this.options.visualElement) === null ||
          p === void 0 ||
          p.scheduleRender(),
        d)
      ) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = wr()),
        (this.projectionDelta = wr()),
        (this.projectionDeltaWithTransform = wr()));
    }
    setAnimationOrigin(d, p = !1) {
      const h = this.snapshot,
        m = h ? h.latestValues : {},
        y = { ...this.latestValues },
        w = wr();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !p));
      const x = Ae(),
        N = h ? h.source : void 0,
        T = this.layout ? this.layout.source : void 0,
        P = N !== T,
        A = this.getStack(),
        C = !A || A.members.length <= 1,
        _ = !!(P && !C && this.options.crossfade === !0 && !this.path.some(p2));
      this.animationProgress = 0;
      let V;
      ((this.mixTargetDelta = H => {
        const $ = H / 1e3;
        (op(w.x, d.x, $),
          op(w.y, d.y, $),
          this.setTargetDelta(w),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Ni(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            h2(this.relativeTarget, this.relativeTargetOrigin, x, $),
            V && ZS(this.relativeTarget, V) && (this.isProjectionDirty = !1),
            V || (V = Ae()),
            kt(V, this.relativeTarget)),
          P &&
            ((this.animationValues = y), HS(y, m, this.latestValues, $, _, C)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = $));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(d) {
      (this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (Pn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = we.update(() => {
          ((so.hasAnimatedSinceResize = !0),
            (this.currentAnimation = zS(0, rp, {
              ...d,
              onUpdate: p => {
                (this.mixTargetDelta(p), d.onUpdate && d.onUpdate(p));
              },
              onComplete: () => {
                (d.onComplete && d.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      (d && d.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners('animationComplete'));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(rp),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let {
        targetWithTransforms: p,
        target: h,
        layout: m,
        latestValues: y,
      } = d;
      if (!(!p || !h || !m)) {
        if (
          this !== d &&
          this.layout &&
          m &&
          ng(this.options.animationType, this.layout.layoutBox, m.layoutBox)
        ) {
          h = this.target || Ae();
          const w = mt(this.layout.layoutBox.x);
          ((h.x.min = d.target.x.min), (h.x.max = h.x.min + w));
          const x = mt(this.layout.layoutBox.y);
          ((h.y.min = d.target.y.min), (h.y.max = h.y.min + x));
        }
        (kt(p, h),
          kr(p, y),
          Ei(this.projectionDeltaWithTransform, this.layoutCorrected, p, y));
      }
    }
    registerSharedNode(d, p) {
      (this.sharedNodes.has(d) || this.sharedNodes.set(d, new qS()),
        this.sharedNodes.get(d).add(p));
      const m = p.options.initialPromotionConfig;
      p.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity:
          m && m.shouldPreserveFollowOpacity
            ? m.shouldPreserveFollowOpacity(p)
            : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      let d;
      const { layoutId: p } = this.options;
      return p
        ? ((d = this.getStack()) === null || d === void 0 ? void 0 : d.lead) ||
            this
        : this;
    }
    getPrevLead() {
      let d;
      const { layoutId: p } = this.options;
      return p
        ? (d = this.getStack()) === null || d === void 0
          ? void 0
          : d.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) {
        return this.root.sharedNodes.get(d);
      }
    }
    promote({ needsReset: d, transition: p, preserveFollowOpacity: h } = {}) {
      const m = this.getStack();
      (m && m.promote(this, h),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        p && this.setOptions({ transition: p }));
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) {
        return;
      }
      let p = !1;
      const { latestValues: h } = d;
      if (
        ((h.z ||
          h.rotate ||
          h.rotateX ||
          h.rotateY ||
          h.rotateZ ||
          h.skewX ||
          h.skewY) &&
          (p = !0),
        !p)
      ) {
        return;
      }
      const m = {};
      h.z && Dl('z', d, m, this.animationValues);
      for (let y = 0; y < Ll.length; y++) {
        (Dl(`rotate${Ll[y]}`, d, m, this.animationValues),
          Dl(`skew${Ll[y]}`, d, m, this.animationValues));
      }
      d.render();
      for (const y in m) {
        (d.setStaticValue(y, m[y]),
          this.animationValues && (this.animationValues[y] = m[y]));
      }
      d.scheduleRender();
    }
    getProjectionStyles(d) {
      let p, h;
      if (!this.instance || this.isSVG) {
        return;
      }
      if (!this.isVisible) {
        return e2;
      }
      const m = { visibility: '' },
        y = this.getTransformTemplate();
      if (this.needsReset) {
        return (
          (this.needsReset = !1),
          (m.opacity = ''),
          (m.pointerEvents = ro(d == null ? void 0 : d.pointerEvents) || ''),
          (m.transform = y ? y(this.latestValues, '') : 'none'),
          m
        );
      }
      const w = this.getLead();
      if (!this.projectionDelta || !this.layout || !w.target) {
        const P = {};
        return (
          this.options.layoutId &&
            ((P.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (P.pointerEvents = ro(d == null ? void 0 : d.pointerEvents) || '')),
          this.hasProjected &&
            !$n(this.latestValues) &&
            ((P.transform = y ? y({}, '') : 'none'), (this.hasProjected = !1)),
          P
        );
      }
      const x = w.animationValues || w.latestValues;
      (this.applyTransformsToTarget(),
        (m.transform = JS(
          this.projectionDeltaWithTransform,
          this.treeScale,
          x
        )),
        y && (m.transform = y(x, m.transform)));
      const { x: N, y: T } = this.projectionDelta;
      ((m.transformOrigin = `${N.origin * 100}% ${T.origin * 100}% 0`),
        w.animationValues
          ? (m.opacity =
              w === this
                ? (h =
                    (p = x.opacity) !== null && p !== void 0
                      ? p
                      : this.latestValues.opacity) !== null && h !== void 0
                  ? h
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : x.opacityExit)
          : (m.opacity =
              w === this
                ? x.opacity !== void 0
                  ? x.opacity
                  : ''
                : x.opacityExit !== void 0
                  ? x.opacityExit
                  : 0));
      for (const P in lo) {
        if (x[P] === void 0) {
          continue;
        }
        const { correct: A, applyTo: C } = lo[P],
          _ = m.transform === 'none' ? x[P] : A(x[P], w);
        if (C) {
          const V = C.length;
          for (let H = 0; H < V; H++) {
            m[C[H]] = _;
          }
        } else {
          m[P] = _;
        }
      }
      return (
        this.options.layoutId &&
          (m.pointerEvents =
            w === this
              ? ro(d == null ? void 0 : d.pointerEvents) || ''
              : 'none'),
        m
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach(d => {
        let p;
        return (p = d.currentAnimation) === null || p === void 0
          ? void 0
          : p.stop();
      }),
        this.root.nodes.forEach(ip),
        this.root.sharedNodes.clear());
    }
  };
}
function n2(n) {
  n.updateLayout();
}
function r2(n) {
  let r;
  const s =
    ((r = n.resumeFrom) === null || r === void 0 ? void 0 : r.snapshot) ||
    n.snapshot;
  if (n.isLead() && n.layout && s && n.hasListeners('didUpdate')) {
    const { layoutBox: a, measuredBox: l } = n.layout,
      { animationType: f } = n.options,
      d = s.source !== n.layout.source;
    f === 'size'
      ? Ct(w => {
          const x = d ? s.measuredBox[w] : s.layoutBox[w],
            N = mt(x);
          ((x.min = a[w].min), (x.max = x.min + N));
        })
      : ng(f, s.layoutBox, a) &&
        Ct(w => {
          const x = d ? s.measuredBox[w] : s.layoutBox[w],
            N = mt(a[w]);
          ((x.max = x.min + N),
            n.relativeTarget &&
              !n.currentAnimation &&
              ((n.isProjectionDirty = !0),
              (n.relativeTarget[w].max = n.relativeTarget[w].min + N)));
        });
    const p = wr();
    Ei(p, a, s.layoutBox);
    const h = wr();
    d ? Ei(h, n.applyTransform(l, !0), s.measuredBox) : Ei(h, a, s.layoutBox);
    const m = !qm(p);
    let y = !1;
    if (!n.resumeFrom) {
      const w = n.getClosestProjectingParent();
      if (w && !w.resumeFrom) {
        const { snapshot: x, layout: N } = w;
        if (x && N) {
          const T = Ae();
          Ni(T, s.layoutBox, x.layoutBox);
          const P = Ae();
          (Ni(P, a, N.layoutBox),
            Jm(T, P) || (y = !0),
            w.options.layoutRoot &&
              ((n.relativeTarget = P),
              (n.relativeTargetOrigin = T),
              (n.relativeParent = w)));
        }
      }
    }
    n.notifyListeners('didUpdate', {
      layout: a,
      snapshot: s,
      delta: h,
      layoutDelta: p,
      hasLayoutChanged: m,
      hasRelativeTargetChanged: y,
    });
  } else if (n.isLead()) {
    const { onExitComplete: a } = n.options;
    a && a();
  }
  n.options.transition = void 0;
}
function i2(n) {
  (Ci && bn.totalNodes++,
    n.parent &&
      (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
      n.isSharedProjectionDirty ||
        (n.isSharedProjectionDirty = !!(
          n.isProjectionDirty ||
          n.parent.isProjectionDirty ||
          n.parent.isSharedProjectionDirty
        )),
      n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty)));
}
function s2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function o2(n) {
  n.clearSnapshot();
}
function ip(n) {
  n.clearMeasurements();
}
function a2(n) {
  n.isLayoutDirty = !1;
}
function l2(n) {
  const { visualElement: r } = n.options;
  (r && r.getProps().onBeforeLayoutMeasure && r.notify('BeforeLayoutMeasure'),
    n.resetTransform());
}
function sp(n) {
  (n.finishAnimation(),
    (n.targetDelta = n.relativeTarget = n.target = void 0),
    (n.isProjectionDirty = !0));
}
function u2(n) {
  n.resolveTargetDelta();
}
function c2(n) {
  n.calcProjection();
}
function d2(n) {
  n.resetSkewAndRotation();
}
function f2(n) {
  n.removeLeadSnapshot();
}
function op(n, r, s) {
  ((n.translate = Ee(r.translate, 0, s)),
    (n.scale = Ee(r.scale, 1, s)),
    (n.origin = r.origin),
    (n.originPoint = r.originPoint));
}
function ap(n, r, s, a) {
  ((n.min = Ee(r.min, s.min, a)), (n.max = Ee(r.max, s.max, a)));
}
function h2(n, r, s, a) {
  (ap(n.x, r.x, s.x, a), ap(n.y, r.y, s.y, a));
}
function p2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const m2 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  lp = n =>
    typeof navigator < 'u' &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(n),
  up = lp('applewebkit/') && !lp('chrome/') ? Math.round : pt;
function cp(n) {
  ((n.min = up(n.min)), (n.max = up(n.max)));
}
function g2(n) {
  (cp(n.x), cp(n.y));
}
function ng(n, r, s) {
  return (
    n === 'position' || (n === 'preserve-aspect' && !xS(tp(r), tp(s), 0.2))
  );
}
function y2(n) {
  let r;
  return (
    n !== n.root &&
    ((r = n.scroll) === null || r === void 0 ? void 0 : r.wasRoot)
  );
}
const v2 = tg({
    attachResizeListener: (n, r) => Di(n, 'resize', r),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  _l = { current: void 0 },
  rg = tg({
    measureScroll: n => ({ x: n.scrollLeft, y: n.scrollTop }),
    defaultParent: () => {
      if (!_l.current) {
        const n = new v2({});
        (n.mount(window), n.setOptions({ layoutScroll: !0 }), (_l.current = n));
      }
      return _l.current;
    },
    resetTransform: (n, r) => {
      n.style.transform = r !== void 0 ? r : 'none';
    },
    checkIsScrollRoot: n => window.getComputedStyle(n).position === 'fixed',
  }),
  x2 = {
    pan: { Feature: VS },
    drag: { Feature: _S, ProjectionNode: rg, MeasureLayout: Ym },
  };
function dp(n, r, s) {
  const { props: a } = n;
  n.animationState &&
    a.whileHover &&
    n.animationState.setActive('whileHover', s === 'Start');
  const l = 'onHover' + s,
    f = a[l];
  f && we.postRender(() => f(r, zi(r)));
}
class w2 extends Nn {
  mount() {
    const { current: r } = this.node;
    r &&
      (this.unmount = w1(
        r,
        s => (dp(this.node, s, 'Start'), a => dp(this.node, a, 'End'))
      ));
  }
  unmount() {}
}
class S2 extends Nn {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let r = !1;
    try {
      r = this.node.current.matches(':focus-visible');
    } catch {
      r = !0;
    }
    !r ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Oi(
      Di(this.node.current, 'focus', () => this.onFocus()),
      Di(this.node.current, 'blur', () => this.onBlur())
    );
  }
  unmount() {}
}
function fp(n, r, s) {
  const { props: a } = n;
  n.animationState &&
    a.whileTap &&
    n.animationState.setActive('whileTap', s === 'Start');
  const l = 'onTap' + (s === 'End' ? '' : s),
    f = a[l];
  f && we.postRender(() => f(r, zi(r)));
}
class k2 extends Nn {
  mount() {
    const { current: r } = this.node;
    r &&
      (this.unmount = T1(
        r,
        s => (
          fp(this.node, s, 'Start'),
          (a, { success: l }) => fp(this.node, a, l ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
}
const eu = new WeakMap(),
  Vl = new WeakMap(),
  C2 = n => {
    const r = eu.get(n.target);
    r && r(n);
  },
  T2 = n => {
    n.forEach(C2);
  };
function P2({ root: n, ...r }) {
  const s = n || document;
  Vl.has(s) || Vl.set(s, {});
  const a = Vl.get(s),
    l = JSON.stringify(r);
  return (
    a[l] || (a[l] = new IntersectionObserver(T2, { root: n, ...r })),
    a[l]
  );
}
function E2(n, r, s) {
  const a = P2(r);
  return (
    eu.set(n, s),
    a.observe(n),
    () => {
      (eu.delete(n), a.unobserve(n));
    }
  );
}
const N2 = { some: 0, all: 1 };
class j2 extends Nn {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: r = {} } = this.node.getProps(),
      { root: s, margin: a, amount: l = 'some', once: f } = r,
      d = {
        root: s ? s.current : void 0,
        rootMargin: a,
        threshold: typeof l === 'number' ? l : N2[l],
      },
      p = h => {
        const { isIntersecting: m } = h;
        if (
          this.isInView === m ||
          ((this.isInView = m), f && !m && this.hasEnteredView)
        ) {
          return;
        }
        (m && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive('whileInView', m));
        const { onViewportEnter: y, onViewportLeave: w } = this.node.getProps(),
          x = m ? y : w;
        x && x(h);
      };
    return E2(this.node.current, d, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > 'u') {
      return;
    }
    const { props: r, prevProps: s } = this.node;
    ['amount', 'margin', 'root'].some(R2(r, s)) && this.startObserver();
  }
  unmount() {}
}
function R2({ viewport: n = {} }, { viewport: r = {} } = {}) {
  return s => n[s] !== r[s];
}
const M2 = {
    inView: { Feature: j2 },
    tap: { Feature: k2 },
    focus: { Feature: S2 },
    hover: { Feature: w2 },
  },
  A2 = { layout: { ProjectionNode: rg, MeasureLayout: Ym } },
  tu = { current: null },
  ig = { current: !1 };
function L2() {
  if (((ig.current = !0), !!fu)) {
    if (window.matchMedia) {
      const n = window.matchMedia('(prefers-reduced-motion)'),
        r = () => (tu.current = n.matches);
      (n.addListener(r), r());
    } else {
      tu.current = !1;
    }
  }
}
const D2 = [...Rm, Qe, En],
  _2 = n => D2.find(jm(n)),
  hp = new WeakMap();
function V2(n, r, s) {
  for (const a in r) {
    const l = r[a],
      f = s[a];
    if (Ye(l)) {
      n.addValue(a, l);
    } else if (Ye(f)) {
      n.addValue(a, Ai(l, { owner: n }));
    } else if (f !== l) {
      if (n.hasValue(a)) {
        const d = n.getValue(a);
        d.liveStyle === !0 ? d.jump(l) : d.hasAnimated || d.set(l);
      } else {
        const d = n.getStaticValue(a);
        n.addValue(a, Ai(d !== void 0 ? d : l, { owner: n }));
      }
    }
  }
  for (const a in s) {
    r[a] === void 0 && n.removeValue(a);
  }
  return r;
}
const pp = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
];
class F2 {
  scrapeMotionValuesFromProps(r, s, a) {
    return {};
  }
  constructor(
    {
      parent: r,
      props: s,
      presenceContext: a,
      reducedMotionConfig: l,
      blockInitialAnimation: f,
      visualState: d,
    },
    p = {}
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = zu),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const x = $t.now();
        this.renderScheduledAt < x &&
          ((this.renderScheduledAt = x), we.render(this.render, !1, !0));
      }));
    const { latestValues: h, renderState: m } = d;
    ((this.latestValues = h),
      (this.baseTarget = { ...h }),
      (this.initialValues = s.initial ? { ...h } : {}),
      (this.renderState = m),
      (this.parent = r),
      (this.props = s),
      (this.presenceContext = a),
      (this.depth = r ? r.depth + 1 : 0),
      (this.reducedMotionConfig = l),
      (this.options = p),
      (this.blockInitialAnimation = !!f),
      (this.isControllingVariants = xo(s)),
      (this.isVariantNode = Ip(s)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(r && r.current)));
    const { willChange: y, ...w } = this.scrapeMotionValuesFromProps(
      s,
      {},
      this
    );
    for (const x in w) {
      const N = w[x];
      h[x] !== void 0 && Ye(N) && N.set(h[x], !1);
    }
  }
  mount(r) {
    ((this.current = r),
      hp.set(r, this),
      this.projection && !this.projection.instance && this.projection.mount(r),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((s, a) => this.bindToMotionValue(a, s)),
      ig.current || L2(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
            ? !0
            : tu.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (hp.delete(this.current),
      this.projection && this.projection.unmount(),
      Pn(this.notifyUpdate),
      Pn(this.render),
      this.valueSubscriptions.forEach(r => r()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const r in this.events) {
      this.events[r].clear();
    }
    for (const r in this.features) {
      const s = this.features[r];
      s && (s.unmount(), (s.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(r, s) {
    this.valueSubscriptions.has(r) && this.valueSubscriptions.get(r)();
    const a = Mr.has(r),
      l = s.on('change', p => {
        ((this.latestValues[r] = p),
          this.props.onUpdate && we.preRender(this.notifyUpdate),
          a && this.projection && (this.projection.isTransformDirty = !0));
      }),
      f = s.on('renderRequest', this.scheduleRender);
    let d;
    (window.MotionCheckAppearSync &&
      (d = window.MotionCheckAppearSync(this, r, s)),
      this.valueSubscriptions.set(r, () => {
        (l(), f(), d && d(), s.owner && s.stop());
      }));
  }
  sortNodePosition(r) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== r.type
      ? 0
      : this.sortInstanceNodePosition(this.current, r.current);
  }
  updateFeatures() {
    let r = 'animation';
    for (r in Tr) {
      const s = Tr[r];
      if (!s) {
        continue;
      }
      const { isEnabled: a, Feature: l } = s;
      if (
        (!this.features[r] &&
          l &&
          a(this.props) &&
          (this.features[r] = new l(this)),
        this.features[r])
      ) {
        const f = this.features[r];
        f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Ae();
  }
  getStaticValue(r) {
    return this.latestValues[r];
  }
  setStaticValue(r, s) {
    this.latestValues[r] = s;
  }
  update(r, s) {
    ((r.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = r),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = s));
    for (let a = 0; a < pp.length; a++) {
      const l = pp[a];
      this.propEventSubscriptions[l] &&
        (this.propEventSubscriptions[l](),
        delete this.propEventSubscriptions[l]);
      const f = 'on' + l,
        d = r[f];
      d && (this.propEventSubscriptions[l] = this.on(l, d));
    }
    ((this.prevMotionValues = V2(
      this,
      this.scrapeMotionValuesFromProps(r, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(r) {
    return this.props.variants ? this.props.variants[r] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(r) {
    const s = this.getClosestVariantNode();
    if (s) {
      return (
        s.variantChildren && s.variantChildren.add(r),
        () => s.variantChildren.delete(r)
      );
    }
  }
  addValue(r, s) {
    const a = this.values.get(r);
    s !== a &&
      (a && this.removeValue(r),
      this.bindToMotionValue(r, s),
      this.values.set(r, s),
      (this.latestValues[r] = s.get()));
  }
  removeValue(r) {
    this.values.delete(r);
    const s = this.valueSubscriptions.get(r);
    (s && (s(), this.valueSubscriptions.delete(r)),
      delete this.latestValues[r],
      this.removeValueFromRenderState(r, this.renderState));
  }
  hasValue(r) {
    return this.values.has(r);
  }
  getValue(r, s) {
    if (this.props.values && this.props.values[r]) {
      return this.props.values[r];
    }
    let a = this.values.get(r);
    return (
      a === void 0 &&
        s !== void 0 &&
        ((a = Ai(s === null ? void 0 : s, { owner: this })),
        this.addValue(r, a)),
      a
    );
  }
  readValue(r, s) {
    let a;
    let l =
      this.latestValues[r] !== void 0 || !this.current
        ? this.latestValues[r]
        : (a = this.getBaseTargetFromProps(this.props, r)) !== null &&
            a !== void 0
          ? a
          : this.readValueFromInstance(this.current, r, this.options);
    return (
      l != null &&
        (typeof l === 'string' && (Em(l) || ym(l))
          ? (l = parseFloat(l))
          : !_2(l) && En.test(s) && (l = Cm(r, s)),
        this.setBaseTarget(r, Ye(l) ? l.get() : l)),
      Ye(l) ? l.get() : l
    );
  }
  setBaseTarget(r, s) {
    this.baseTarget[r] = s;
  }
  getBaseTarget(r) {
    let s;
    const { initial: a } = this.props;
    let l;
    if (typeof a === 'string' || typeof a === 'object') {
      const d = wu(
        this.props,
        a,
        (s = this.presenceContext) === null || s === void 0 ? void 0 : s.custom
      );
      d && (l = d[r]);
    }
    if (a && l !== void 0) {
      return l;
    }
    const f = this.getBaseTargetFromProps(this.props, r);
    return f !== void 0 && !Ye(f)
      ? f
      : this.initialValues[r] !== void 0 && l === void 0
        ? void 0
        : this.baseTarget[r];
  }
  on(r, s) {
    return (
      this.events[r] || (this.events[r] = new Du()),
      this.events[r].add(s)
    );
  }
  notify(r, ...s) {
    this.events[r] && this.events[r].notify(...s);
  }
}
class sg extends F2 {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = Mm));
  }
  sortInstanceNodePosition(r, s) {
    return r.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(r, s) {
    return r.style ? r.style[s] : void 0;
  }
  removeValueFromRenderState(r, { vars: s, style: a }) {
    (delete s[r], delete a[r]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: r } = this.props;
    Ye(r) &&
      (this.childSubscription = r.on('change', s => {
        this.current && (this.current.textContent = `${s}`);
      }));
  }
}
function I2(n) {
  return window.getComputedStyle(n);
}
class O2 extends sg {
  constructor() {
    (super(...arguments), (this.type = 'html'), (this.renderInstance = Up));
  }
  readValueFromInstance(r, s) {
    if (Mr.has(s)) {
      const a = Ou(s);
      return (a && a.default) || 0;
    } else {
      const a = I2(r),
        l = (Yp(s) ? a.getPropertyValue(s) : a[s]) || 0;
      return typeof l === 'string' ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(r, { transformPagePoint: s }) {
    return Gm(r, s);
  }
  build(r, s, a) {
    Tu(r, s, a.transformTemplate);
  }
  scrapeMotionValuesFromProps(r, s, a) {
    return xu(r, s, a);
  }
}
class z2 extends sg {
  constructor() {
    (super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Ae));
  }
  getBaseTargetFromProps(r, s) {
    return r[s];
  }
  readValueFromInstance(r, s) {
    if (Mr.has(s)) {
      const a = Ou(s);
      return (a && a.default) || 0;
    }
    return ((s = $p.has(s) ? s : gu(s)), r.getAttribute(s));
  }
  scrapeMotionValuesFromProps(r, s, a) {
    return Hp(r, s, a);
  }
  build(r, s, a) {
    Pu(r, s, this.isSVGTag, a.transformTemplate);
  }
  renderInstance(r, s, a, l) {
    bp(r, s, a, l);
  }
  mount(r) {
    ((this.isSVGTag = Eu(r.tagName)), super.mount(r));
  }
}
const B2 = (n, r) =>
    vu(n) ? new z2(r) : new O2(r, { allowProjection: n !== j.Fragment }),
  U2 = h1({ ...cS, ...M2, ...x2, ...A2 }, B2),
  Ve = Rx(U2),
  $2 = ({ children: n }) => {
    const [r, s] = j.useState(!1),
      a = nn(),
      l = [
        { name: 'Dashboard', href: '/dashboard', icon: Ol },
        { name: 'Scheduler', href: '/scheduler', icon: Uv },
        { name: 'History', href: '/history', icon: Yv },
        { name: 'Settings', href: '/settings', icon: Mp },
      ],
      f = d => a.pathname === d;
    return v.jsxs('div', {
      className: 'min-h-screen bg-gray-50',
      children: [
        r &&
          v.jsx('div', {
            className: 'fixed inset-0 z-40 lg:hidden',
            children: v.jsx('div', {
              className: 'fixed inset-0 bg-gray-600 bg-opacity-75',
              onClick: () => s(!1),
            }),
          }),
        v.jsxs('div', {
          className: `fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${r ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:static lg:inset-0`,
          children: [
            v.jsxs('div', {
              className:
                'flex items-center justify-between h-16 px-6 border-b border-gray-200',
              children: [
                v.jsx('img', {
                  src: '/linktest/assets/gvec.svg',
                  alt: 'GVEC',
                  className: 'h-8',
                }),
                v.jsx('button', {
                  onClick: () => s(!1),
                  className: 'lg:hidden',
                  children: v.jsx(vx, { className: 'w-6 h-6' }),
                }),
              ],
            }),
            v.jsx('nav', {
              className: 'mt-8',
              children: l.map(d => {
                const p = d.icon;
                return v.jsxs(
                  cu,
                  {
                    to: d.href,
                    className: `flex items-center px-6 py-3 text-sm font-medium transition-colors ${f(d.href) ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`,
                    onClick: () => s(!1),
                    children: [v.jsx(p, { className: 'w-5 h-5 mr-3' }), d.name],
                  },
                  d.name
                );
              }),
            }),
          ],
        }),
        v.jsxs('div', {
          className: 'lg:pl-64',
          children: [
            v.jsx('div', {
              className:
                'sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200',
              children: v.jsxs('div', {
                className:
                  'flex items-center justify-between h-16 px-4 sm:px-6',
                children: [
                  v.jsx('button', {
                    onClick: () => s(!0),
                    className:
                      'lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100',
                    children: v.jsx(Zv, { className: 'w-6 h-6' }),
                  }),
                  v.jsx('h1', {
                    className: 'text-xl font-semibold text-gray-900',
                    children: 'GVEC Link Capacity Testing',
                  }),
                  v.jsx('div', {
                    className: 'flex items-center space-x-4',
                    children: v.jsxs('div', {
                      className: 'flex items-center space-x-2',
                      children: [
                        v.jsx('div', {
                          className: 'w-2 h-2 bg-green-400 rounded-full',
                        }),
                        v.jsx('span', {
                          className: 'text-sm text-gray-500',
                          children: 'Online',
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            v.jsx('main', {
              className: 'p-4 sm:p-6',
              children: v.jsx(Ve.div, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3 },
                children: n,
              }),
            }),
          ],
        }),
      ],
    });
  },
  at = ({ children: n, className: r = '', hover: s = !1, ...a }) => {
    const d = `bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${s ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${r}`;
    return v.jsx(Ve.div, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      className: d,
      ...a,
      children: n,
    });
  },
  og = ({ status: n }) => {
    const r = {
        success: { classes: 'bg-green-100 text-green-800', text: 'Success' },
        failed: { classes: 'bg-red-100 text-red-800', text: 'Failed' },
        running: { classes: 'bg-yellow-100 text-yellow-800', text: 'Running' },
        queued: { classes: 'bg-gray-100 text-gray-800', text: 'Queued' },
        online: { classes: 'bg-green-100 text-green-800', text: 'Online' },
        offline: { classes: 'bg-red-100 text-red-800', text: 'Offline' },
      },
      s = r[n] || r.queued;
    return v.jsx('span', {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.classes}`,
      children: s.text,
    });
  },
  ko = ({ size: n = 'md', className: r = '' }) => {
    const s = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return v.jsx(Ve.div, {
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: 1 / 0, ease: 'linear' },
      className: `${s[n]} ${r}`,
      children: v.jsxs('svg', {
        className: 'w-full h-full text-blue-600',
        fill: 'none',
        viewBox: '0 0 24 24',
        children: [
          v.jsx('circle', {
            className: 'opacity-25',
            cx: '12',
            cy: '12',
            r: '10',
            stroke: 'currentColor',
            strokeWidth: '4',
          }),
          v.jsx('path', {
            className: 'opacity-75',
            fill: 'currentColor',
            d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
          }),
        ],
      }),
    });
  },
  Dt = ({
    children: n,
    variant: r = 'primary',
    size: s = 'md',
    disabled: a = !1,
    onClick: l,
    className: f = '',
    ...d
  }) => {
    const p =
        'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      h = {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
        secondary:
          'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
        outline:
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed',
        danger:
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
      },
      m = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
      y = `${p} ${h[r]} ${m[s]} ${f}`;
    return v.jsx(Ve.button, {
      whileHover: { scale: a ? 1 : 1.02 },
      whileTap: { scale: a ? 1 : 0.98 },
      className: y,
      disabled: a,
      onClick: l,
      ...d,
      children: n,
    });
  },
  b2 = () => {
    const [n, r] = j.useState({
        totalAPs: 0,
        onlineAPs: 0,
        totalSMs: 0,
        onlineSMs: 0,
        activeTests: 0,
        avgThroughput: 0,
      }),
      [s, a] = j.useState([]),
      [l, f] = j.useState([]),
      [d, p] = j.useState(!0);
    j.useEffect(() => {
      h();
      const m = setInterval(h, 3e4);
      return () => clearInterval(m);
    }, []);
    const h = async () => {
      try {
        (r({
          totalAPs: 24,
          onlineAPs: 22,
          totalSMs: 156,
          onlineSMs: 142,
          activeTests: 3,
          avgThroughput: 85.6,
        }),
          a([
            {
              id: 1,
              apName: 'WestHill-AP1',
              smMac: '00:04:56:11:22:33',
              status: 'success',
              throughput: 128.5,
              timestamp: '2024-01-15T10:30:00Z',
            },
            {
              id: 2,
              apName: 'EastTower-AP2',
              smMac: '00:04:56:44:55:66',
              status: 'running',
              throughput: null,
              timestamp: '2024-01-15T10:25:00Z',
            },
            {
              id: 3,
              apName: 'SouthSite-AP3',
              smMac: '00:04:56:77:88:99',
              status: 'failed',
              throughput: null,
              timestamp: '2024-01-15T10:20:00Z',
            },
          ]),
          f([
            {
              id: 1,
              type: 'warning',
              message: 'Low throughput detected on WestHill-AP1',
              timestamp: '2024-01-15T10:15:00Z',
            },
            {
              id: 2,
              type: 'error',
              message: 'SNMP timeout on EastTower-AP2',
              timestamp: '2024-01-15T10:10:00Z',
            },
          ]),
          p(!1));
      } catch (m) {
        (console.error('Error fetching dashboard data:', m), p(!1));
      }
    };
    return d
      ? v.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: v.jsx(ko, {}),
        })
      : v.jsxs('div', {
          className: 'space-y-6',
          children: [
            v.jsxs('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
              children: [
                v.jsx(Ve.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  children: v.jsx(at, {
                    children: v.jsxs('div', {
                      className: 'flex items-center',
                      children: [
                        v.jsx('div', {
                          className: 'p-3 bg-blue-100 rounded-lg',
                          children: v.jsx(gx, {
                            className: 'w-6 h-6 text-blue-600',
                          }),
                        }),
                        v.jsxs('div', {
                          className: 'ml-4',
                          children: [
                            v.jsx('p', {
                              className: 'text-sm font-medium text-gray-600',
                              children: 'Access Points',
                            }),
                            v.jsxs('p', {
                              className: 'text-2xl font-bold text-gray-900',
                              children: [n.onlineAPs, '/', n.totalAPs],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
                v.jsx(Ve.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 },
                  children: v.jsx(at, {
                    children: v.jsxs('div', {
                      className: 'flex items-center',
                      children: [
                        v.jsx('div', {
                          className: 'p-3 bg-green-100 rounded-lg',
                          children: v.jsx(Ol, {
                            className: 'w-6 h-6 text-green-600',
                          }),
                        }),
                        v.jsxs('div', {
                          className: 'ml-4',
                          children: [
                            v.jsx('p', {
                              className: 'text-sm font-medium text-gray-600',
                              children: 'Subscriber Modules',
                            }),
                            v.jsxs('p', {
                              className: 'text-2xl font-bold text-gray-900',
                              children: [n.onlineSMs, '/', n.totalSMs],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
                v.jsx(Ve.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 },
                  children: v.jsx(at, {
                    children: v.jsxs('div', {
                      className: 'flex items-center',
                      children: [
                        v.jsx('div', {
                          className: 'p-3 bg-orange-100 rounded-lg',
                          children: v.jsx(hx, {
                            className: 'w-6 h-6 text-orange-600',
                          }),
                        }),
                        v.jsxs('div', {
                          className: 'ml-4',
                          children: [
                            v.jsx('p', {
                              className: 'text-sm font-medium text-gray-600',
                              children: 'Active Tests',
                            }),
                            v.jsx('p', {
                              className: 'text-2xl font-bold text-gray-900',
                              children: n.activeTests,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
                v.jsx(Ve.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4 },
                  children: v.jsx(at, {
                    children: v.jsxs('div', {
                      className: 'flex items-center',
                      children: [
                        v.jsx('div', {
                          className: 'p-3 bg-purple-100 rounded-lg',
                          children: v.jsx(Ol, {
                            className: 'w-6 h-6 text-purple-600',
                          }),
                        }),
                        v.jsxs('div', {
                          className: 'ml-4',
                          children: [
                            v.jsx('p', {
                              className: 'text-sm font-medium text-gray-600',
                              children: 'Avg Throughput',
                            }),
                            v.jsxs('p', {
                              className: 'text-2xl font-bold text-gray-900',
                              children: [n.avgThroughput, ' Mbps'],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
            v.jsxs('div', {
              className: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
              children: [
                v.jsx(Ve.div, {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.5 },
                  children: v.jsxs(at, {
                    children: [
                      v.jsxs('div', {
                        className: 'flex items-center justify-between mb-4',
                        children: [
                          v.jsx('h3', {
                            className: 'text-lg font-medium text-gray-900',
                            children: 'Recent Tests',
                          }),
                          v.jsx(Dt, {
                            variant: 'outline',
                            size: 'sm',
                            children: 'View All',
                          }),
                        ],
                      }),
                      v.jsx('div', {
                        className: 'space-y-3',
                        children: s.map(m =>
                          v.jsxs(
                            'div',
                            {
                              className:
                                'flex items-center justify-between p-3 bg-gray-50 rounded-lg',
                              children: [
                                v.jsxs('div', {
                                  children: [
                                    v.jsx('p', {
                                      className: 'font-medium text-gray-900',
                                      children: m.apName,
                                    }),
                                    v.jsx('p', {
                                      className: 'text-sm text-gray-500',
                                      children: m.smMac,
                                    }),
                                  ],
                                }),
                                v.jsxs('div', {
                                  className: 'flex items-center space-x-3',
                                  children: [
                                    m.throughput &&
                                      v.jsxs('span', {
                                        className:
                                          'text-sm font-medium text-gray-900',
                                        children: [m.throughput, ' Mbps'],
                                      }),
                                    v.jsx(og, { status: m.status }),
                                  ],
                                }),
                              ],
                            },
                            m.id
                          )
                        ),
                      }),
                    ],
                  }),
                }),
                v.jsx(Ve.div, {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.6 },
                  children: v.jsxs(at, {
                    children: [
                      v.jsxs('div', {
                        className: 'flex items-center justify-between mb-4',
                        children: [
                          v.jsx('h3', {
                            className: 'text-lg font-medium text-gray-900',
                            children: 'Alerts',
                          }),
                          v.jsx(Dt, {
                            variant: 'outline',
                            size: 'sm',
                            children: 'Clear All',
                          }),
                        ],
                      }),
                      v.jsx('div', {
                        className: 'space-y-3',
                        children: l.map(m =>
                          v.jsxs(
                            'div',
                            {
                              className:
                                'flex items-start space-x-3 p-3 bg-gray-50 rounded-lg',
                              children: [
                                v.jsx(Ap, {
                                  className: `w-5 h-5 mt-0.5 ${m.type === 'error' ? 'text-red-500' : 'text-yellow-500'}`,
                                }),
                                v.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    v.jsx('p', {
                                      className:
                                        'text-sm font-medium text-gray-900',
                                      children: m.message,
                                    }),
                                    v.jsx('p', {
                                      className: 'text-xs text-gray-500',
                                      children: new Date(
                                        m.timestamp
                                      ).toLocaleString(),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            m.id
                          )
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
  },
  W2 = () => {
    const [n, r] = j.useState([]),
      [s, a] = j.useState(''),
      [l, f] = j.useState('individual'),
      [d, p] = j.useState([]),
      [h, m] = j.useState(!0),
      [y, w] = j.useState(!1);
    j.useEffect(() => {
      (x(), N());
    }, []);
    const x = async () => {
        try {
          (r([
            {
              id: 1,
              name: 'WestHill-AP1',
              mac: '00:04:56:AA:BB:CC',
              model: '450v',
              ip: '192.168.1.100',
              online: !0,
              smCount: 12,
            },
            {
              id: 2,
              name: 'EastTower-AP2',
              mac: '00:04:56:DD:EE:FF',
              model: '450m',
              ip: '192.168.1.101',
              online: !0,
              smCount: 8,
            },
            {
              id: 3,
              name: 'SouthSite-AP3',
              mac: '00:04:56:11:22:33',
              model: '450v',
              ip: '192.168.1.102',
              online: !1,
              smCount: 0,
            },
          ]),
            m(!1));
        } catch (C) {
          (console.error('Error fetching access points:', C), m(!1));
        }
      },
      N = async () => {
        try {
          p([
            {
              id: 1,
              apName: 'WestHill-AP1',
              apMac: '00:04:56:AA:BB:CC',
              testType: 'individual',
              status: 'queued',
              scheduledAt: '2024-01-15T14:00:00Z',
            },
            {
              id: 2,
              apName: 'EastTower-AP2',
              apMac: '00:04:56:DD:EE:FF',
              testType: 'flood',
              status: 'running',
              scheduledAt: '2024-01-15T13:30:00Z',
            },
          ]);
        } catch (C) {
          console.error('Error fetching scheduled tests:', C);
        }
      },
      T = async () => {
        if (!s) {
          return;
        }
        const C = n.find(V => V.mac === s);
        if (!C) {
          return;
        }
        const _ = {
          id: Date.now(),
          apName: C.name,
          apMac: C.mac,
          testType: l,
          status: 'queued',
          scheduledAt: new Date().toISOString(),
        };
        (p(V => [...V, _]), a(''));
      },
      P = C => {
        p(_ => _.filter(V => V.id !== C));
      },
      A = async C => {
        (w(!0),
          p(_ => _.map(V => (V.id === C ? { ...V, status: 'running' } : V))),
          setTimeout(() => {
            (p(_ => _.map(V => (V.id === C ? { ...V, status: 'success' } : V))),
              w(!1));
          }, 5e3));
      };
    return h
      ? v.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: v.jsx(ko, {}),
        })
      : v.jsxs('div', {
          className: 'space-y-6',
          children: [
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('h3', {
                    className: 'text-lg font-medium text-gray-900 mb-4',
                    children: 'Schedule New Test',
                  }),
                  v.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
                    children: [
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Access Point',
                          }),
                          v.jsxs('select', {
                            value: s,
                            onChange: C => a(C.target.value),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                            children: [
                              v.jsx('option', {
                                value: '',
                                children: 'Select Access Point',
                              }),
                              n
                                .filter(C => C.online)
                                .map(C =>
                                  v.jsxs(
                                    'option',
                                    {
                                      value: C.mac,
                                      children: [
                                        C.name,
                                        ' (',
                                        C.model,
                                        ') - ',
                                        C.smCount,
                                        ' SMs',
                                      ],
                                    },
                                    C.mac
                                  )
                                ),
                            ],
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Test Type',
                          }),
                          v.jsxs('select', {
                            value: l,
                            onChange: C => f(C.target.value),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                            children: [
                              v.jsx('option', {
                                value: 'individual',
                                children: 'Individual SM',
                              }),
                              v.jsx('option', {
                                value: 'flood',
                                children: 'Flood Mode (450m only)',
                              }),
                            ],
                          }),
                        ],
                      }),
                      v.jsx('div', {
                        className: 'flex items-end',
                        children: v.jsxs(Dt, {
                          onClick: T,
                          disabled: !s,
                          className: 'w-full',
                          children: [
                            v.jsx(rx, { className: 'w-4 h-4 mr-2' }),
                            'Schedule Test',
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              children: v.jsxs(at, {
                children: [
                  v.jsxs('div', {
                    className: 'flex items-center justify-between mb-4',
                    children: [
                      v.jsx('h3', {
                        className: 'text-lg font-medium text-gray-900',
                        children: 'Scheduled Tests',
                      }),
                      v.jsx('div', {
                        className: 'flex items-center space-x-2',
                        children: v.jsxs(Dt, {
                          variant: 'outline',
                          size: 'sm',
                          children: [
                            v.jsx(Mp, { className: 'w-4 h-4 mr-2' }),
                            'Settings',
                          ],
                        }),
                      }),
                    ],
                  }),
                  d.length === 0
                    ? v.jsx('div', {
                        className: 'text-center py-8 text-gray-500',
                        children: 'No tests scheduled',
                      })
                    : v.jsx('div', {
                        className: 'space-y-3',
                        children: d.map(C =>
                          v.jsxs(
                            'div',
                            {
                              className:
                                'flex items-center justify-between p-4 bg-gray-50 rounded-lg',
                              children: [
                                v.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    v.jsxs('div', {
                                      className: 'flex items-center space-x-4',
                                      children: [
                                        v.jsxs('div', {
                                          children: [
                                            v.jsx('p', {
                                              className:
                                                'font-medium text-gray-900',
                                              children: C.apName,
                                            }),
                                            v.jsx('p', {
                                              className:
                                                'text-sm text-gray-500',
                                              children: C.apMac,
                                            }),
                                          ],
                                        }),
                                        v.jsx('div', {
                                          children: v.jsx('span', {
                                            className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${C.testType === 'flood' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`,
                                            children:
                                              C.testType === 'flood'
                                                ? 'Flood Mode'
                                                : 'Individual',
                                          }),
                                        }),
                                        v.jsx('div', {
                                          children: v.jsx('span', {
                                            className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${C.status === 'running' ? 'bg-yellow-100 text-yellow-800' : C.status === 'success' ? 'bg-green-100 text-green-800' : C.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`,
                                            children:
                                              C.status.charAt(0).toUpperCase() +
                                              C.status.slice(1),
                                          }),
                                        }),
                                      ],
                                    }),
                                    v.jsxs('p', {
                                      className: 'text-xs text-gray-500 mt-1',
                                      children: [
                                        'Scheduled: ',
                                        new Date(
                                          C.scheduledAt
                                        ).toLocaleString(),
                                      ],
                                    }),
                                  ],
                                }),
                                v.jsxs('div', {
                                  className: 'flex items-center space-x-2',
                                  children: [
                                    C.status === 'queued' &&
                                      v.jsx(Dt, {
                                        size: 'sm',
                                        onClick: () => A(C.id),
                                        disabled: y,
                                        children: v.jsx(tx, {
                                          className: 'w-4 h-4',
                                        }),
                                      }),
                                    C.status === 'running' &&
                                      v.jsx(Dt, {
                                        size: 'sm',
                                        variant: 'outline',
                                        disabled: !0,
                                        children: v.jsx(Jv, {
                                          className: 'w-4 h-4',
                                        }),
                                      }),
                                    v.jsx(Dt, {
                                      size: 'sm',
                                      variant: 'outline',
                                      onClick: () => P(C.id),
                                      disabled: C.status === 'running',
                                      children: v.jsx(dx, {
                                        className: 'w-4 h-4',
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            C.id
                          )
                        ),
                      }),
                ],
              }),
            }),
          ],
        });
  },
  H2 = () => {
    const [n, r] = j.useState([]),
      [s, a] = j.useState([]),
      [l, f] = j.useState(!0),
      [d, p] = j.useState(''),
      [h, m] = j.useState('all'),
      [y, w] = j.useState('all');
    (j.useEffect(() => {
      x();
    }, []),
      j.useEffect(() => {
        N();
      }, [n, d, h, y]));
    const x = async () => {
        try {
          (r([
            {
              id: 1,
              apName: 'WestHill-AP1',
              apMac: '00:04:56:AA:BB:CC',
              smMac: '00:04:56:11:22:33',
              testType: 'individual',
              status: 'success',
              uplinkMbps: 63.4,
              downlinkMbps: 128.2,
              snrDl: 26.1,
              snrUl: 24.8,
              startTime: '2024-01-15T10:30:00Z',
              endTime: '2024-01-15T10:32:15Z',
              duration: 135,
            },
            {
              id: 2,
              apName: 'EastTower-AP2',
              apMac: '00:04:56:DD:EE:FF',
              smMac: '00:04:56:44:55:66',
              testType: 'flood',
              status: 'failed',
              uplinkMbps: null,
              downlinkMbps: null,
              snrDl: null,
              snrUl: null,
              startTime: '2024-01-15T09:15:00Z',
              endTime: '2024-01-15T09:16:30Z',
              duration: 90,
              errorMessage: 'SNMP timeout',
            },
            {
              id: 3,
              apName: 'SouthSite-AP3',
              apMac: '00:04:56:11:22:33',
              smMac: '00:04:56:77:88:99',
              testType: 'individual',
              status: 'success',
              uplinkMbps: 45.2,
              downlinkMbps: 89.7,
              snrDl: 22.3,
              snrUl: 21.1,
              startTime: '2024-01-14T16:45:00Z',
              endTime: '2024-01-14T16:47:20Z',
              duration: 140,
            },
          ]),
            f(!1));
        } catch (P) {
          (console.error('Error fetching test history:', P), f(!1));
        }
      },
      N = () => {
        let P = n;
        if (
          (d &&
            (P = P.filter(
              A =>
                A.apName.toLowerCase().includes(d.toLowerCase()) ||
                A.apMac.toLowerCase().includes(d.toLowerCase()) ||
                A.smMac.toLowerCase().includes(d.toLowerCase())
            )),
          h !== 'all' && (P = P.filter(A => A.status === h)),
          y !== 'all')
        ) {
          const A = new Date(),
            C = new Date();
          switch (y) {
            case 'today':
              C.setHours(0, 0, 0, 0);
              break;
            case 'week':
              C.setDate(A.getDate() - 7);
              break;
            case 'month':
              C.setMonth(A.getMonth() - 1);
              break;
          }
          y !== 'all' && (P = P.filter(_ => new Date(_.startTime) >= C));
        }
        a(P);
      },
      T = () => {
        const P = [
            [
              'AP Name',
              'AP MAC',
              'SM MAC',
              'Test Type',
              'Status',
              'Uplink (Mbps)',
              'Downlink (Mbps)',
              'SNR DL',
              'SNR UL',
              'Start Time',
              'Duration (s)',
            ].join(','),
            ...s.map(V =>
              [
                V.apName,
                V.apMac,
                V.smMac,
                V.testType,
                V.status,
                V.uplinkMbps || 'N/A',
                V.downlinkMbps || 'N/A',
                V.snrDl || 'N/A',
                V.snrUl || 'N/A',
                V.startTime,
                V.duration,
              ].join(',')
            ),
          ].join(`
`),
          A = new Blob([P], { type: 'text/csv' }),
          C = window.URL.createObjectURL(A),
          _ = document.createElement('a');
        ((_.href = C),
          (_.download = `link-test-history-${new Date().toISOString().split('T')[0]}.csv`),
          _.click(),
          window.URL.revokeObjectURL(C));
      };
    return l
      ? v.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: v.jsx(ko, {}),
        })
      : v.jsxs('div', {
          className: 'space-y-6',
          children: [
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              children: v.jsx(at, {
                children: v.jsxs('div', {
                  className: 'grid grid-cols-1 md:grid-cols-4 gap-4',
                  children: [
                    v.jsxs('div', {
                      children: [
                        v.jsx('label', {
                          className:
                            'block text-sm font-medium text-gray-700 mb-2',
                          children: 'Search',
                        }),
                        v.jsxs('div', {
                          className: 'relative',
                          children: [
                            v.jsx(lx, {
                              className:
                                'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4',
                            }),
                            v.jsx('input', {
                              type: 'text',
                              value: d,
                              onChange: P => p(P.target.value),
                              placeholder: 'Search AP name, MAC...',
                              className:
                                'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                            }),
                          ],
                        }),
                      ],
                    }),
                    v.jsxs('div', {
                      children: [
                        v.jsx('label', {
                          className:
                            'block text-sm font-medium text-gray-700 mb-2',
                          children: 'Status',
                        }),
                        v.jsxs('select', {
                          value: h,
                          onChange: P => m(P.target.value),
                          className:
                            'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          children: [
                            v.jsx('option', {
                              value: 'all',
                              children: 'All Status',
                            }),
                            v.jsx('option', {
                              value: 'success',
                              children: 'Success',
                            }),
                            v.jsx('option', {
                              value: 'failed',
                              children: 'Failed',
                            }),
                            v.jsx('option', {
                              value: 'running',
                              children: 'Running',
                            }),
                          ],
                        }),
                      ],
                    }),
                    v.jsxs('div', {
                      children: [
                        v.jsx('label', {
                          className:
                            'block text-sm font-medium text-gray-700 mb-2',
                          children: 'Date Range',
                        }),
                        v.jsxs('select', {
                          value: y,
                          onChange: P => w(P.target.value),
                          className:
                            'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          children: [
                            v.jsx('option', {
                              value: 'all',
                              children: 'All Time',
                            }),
                            v.jsx('option', {
                              value: 'today',
                              children: 'Today',
                            }),
                            v.jsx('option', {
                              value: 'week',
                              children: 'Last Week',
                            }),
                            v.jsx('option', {
                              value: 'month',
                              children: 'Last Month',
                            }),
                          ],
                        }),
                      ],
                    }),
                    v.jsx('div', {
                      className: 'flex items-end',
                      children: v.jsxs(Dt, {
                        onClick: T,
                        variant: 'outline',
                        className: 'w-full',
                        children: [
                          v.jsx(Hv, { className: 'w-4 h-4 mr-2' }),
                          'Export CSV',
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('div', {
                    className: 'flex items-center justify-between mb-4',
                    children: v.jsxs('h3', {
                      className: 'text-lg font-medium text-gray-900',
                      children: ['Test History (', s.length, ' results)'],
                    }),
                  }),
                  s.length === 0
                    ? v.jsx('div', {
                        className: 'text-center py-8 text-gray-500',
                        children: 'No test results found',
                      })
                    : v.jsx('div', {
                        className: 'overflow-x-auto',
                        children: v.jsxs('table', {
                          className: 'min-w-full divide-y divide-gray-200',
                          children: [
                            v.jsx('thead', {
                              className: 'bg-gray-50',
                              children: v.jsxs('tr', {
                                children: [
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Access Point',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'SM MAC',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Type',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Status',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Throughput',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'SNR',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Date',
                                  }),
                                  v.jsx('th', {
                                    className:
                                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    children: 'Actions',
                                  }),
                                ],
                              }),
                            }),
                            v.jsx('tbody', {
                              className: 'bg-white divide-y divide-gray-200',
                              children: s.map(P =>
                                v.jsxs(
                                  'tr',
                                  {
                                    className: 'hover:bg-gray-50',
                                    children: [
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap',
                                        children: v.jsxs('div', {
                                          children: [
                                            v.jsx('div', {
                                              className:
                                                'text-sm font-medium text-gray-900',
                                              children: P.apName,
                                            }),
                                            v.jsx('div', {
                                              className:
                                                'text-sm text-gray-500',
                                              children: P.apMac,
                                            }),
                                          ],
                                        }),
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                                        children: P.smMac,
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap',
                                        children: v.jsx('span', {
                                          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${P.testType === 'flood' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`,
                                          children:
                                            P.testType === 'flood'
                                              ? 'Flood'
                                              : 'Individual',
                                        }),
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap',
                                        children: v.jsx(og, {
                                          status: P.status,
                                        }),
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                                        children:
                                          P.uplinkMbps && P.downlinkMbps
                                            ? v.jsxs('div', {
                                                children: [
                                                  v.jsxs('div', {
                                                    children: [
                                                      '↑ ',
                                                      P.uplinkMbps,
                                                      ' Mbps',
                                                    ],
                                                  }),
                                                  v.jsxs('div', {
                                                    children: [
                                                      '↓ ',
                                                      P.downlinkMbps,
                                                      ' Mbps',
                                                    ],
                                                  }),
                                                ],
                                              })
                                            : v.jsx('span', {
                                                className: 'text-gray-400',
                                                children: 'N/A',
                                              }),
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                                        children:
                                          P.snrDl && P.snrUl
                                            ? v.jsxs('div', {
                                                children: [
                                                  v.jsxs('div', {
                                                    children: [
                                                      'DL: ',
                                                      P.snrDl,
                                                      ' dB',
                                                    ],
                                                  }),
                                                  v.jsxs('div', {
                                                    children: [
                                                      'UL: ',
                                                      P.snrUl,
                                                      ' dB',
                                                    ],
                                                  }),
                                                ],
                                              })
                                            : v.jsx('span', {
                                                className: 'text-gray-400',
                                                children: 'N/A',
                                              }),
                                      }),
                                      v.jsxs('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                                        children: [
                                          new Date(
                                            P.startTime
                                          ).toLocaleDateString(),
                                          v.jsx('div', {
                                            className: 'text-xs text-gray-500',
                                            children: new Date(
                                              P.startTime
                                            ).toLocaleTimeString(),
                                          }),
                                        ],
                                      }),
                                      v.jsx('td', {
                                        className:
                                          'px-6 py-4 whitespace-nowrap text-sm font-medium',
                                        children: v.jsx(Dt, {
                                          size: 'sm',
                                          variant: 'outline',
                                          children: v.jsx(Gv, {
                                            className: 'w-4 h-4',
                                          }),
                                        }),
                                      }),
                                    ],
                                  },
                                  P.id
                                )
                              ),
                            }),
                          ],
                        }),
                      }),
                ],
              }),
            }),
          ],
        });
  },
  K2 = () => {
    const [n, r] = j.useState({
        snmpTimeout: 5,
        snmpRetries: 2,
        snmpVersion: '2c',
        testConcurrency: 3,
        enableAI: !0,
        alertThresholds: { lowThroughput: 50, lowSNR: 15, highLatency: 100 },
        cnMaestroSettings: {
          apiUrl: 'https://cnmaestro.gvec.net/api/v2/',
          clientId: '',
          clientSecret: '',
          refreshInterval: 300,
        },
      }),
      [s, a] = j.useState(!0),
      [l, f] = j.useState(!1),
      [d, p] = j.useState(!1),
      [h, m] = j.useState(null);
    j.useEffect(() => {
      y();
    }, []);
    const y = async () => {
        try {
          setTimeout(() => {
            a(!1);
          }, 1e3);
        } catch (T) {
          (console.error('Error fetching settings:', T), a(!1));
        }
      },
      w = async () => {
        f(!0);
        try {
          (await new Promise(T => setTimeout(T, 1500)),
            console.log('Settings saved:', n));
        } catch (T) {
          console.error('Error saving settings:', T);
        } finally {
          f(!1);
        }
      },
      x = async () => {
        (p(!0), m(null));
        try {
          (await new Promise(T => setTimeout(T, 2e3)), m('success'));
        } catch {
          m('error');
        } finally {
          p(!1);
        }
      },
      N = (T, P) => {
        r(A => {
          const C = { ...A },
            _ = T.split('.');
          let V = C;
          for (let H = 0; H < _.length - 1; H++) {
            V = V[_[H]];
          }
          return ((V[_[_.length - 1]] = P), C);
        });
      };
    return s
      ? v.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: v.jsx(ko, {}),
        })
      : v.jsxs('div', {
          className: 'space-y-6',
          children: [
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('h3', {
                    className: 'text-lg font-medium text-gray-900 mb-4',
                    children: 'SNMP Configuration',
                  }),
                  v.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
                    children: [
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Timeout (seconds)',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '1',
                            max: '30',
                            value: n.snmpTimeout,
                            onChange: T =>
                              N('snmpTimeout', parseInt(T.target.value)),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Retries',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '0',
                            max: '5',
                            value: n.snmpRetries,
                            onChange: T =>
                              N('snmpRetries', parseInt(T.target.value)),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Version',
                          }),
                          v.jsxs('select', {
                            value: n.snmpVersion,
                            onChange: T => N('snmpVersion', T.target.value),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                            children: [
                              v.jsx('option', {
                                value: '1',
                                children: 'SNMPv1',
                              }),
                              v.jsx('option', {
                                value: '2c',
                                children: 'SNMPv2c',
                              }),
                              v.jsx('option', {
                                value: '3',
                                children: 'SNMPv3',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('h3', {
                    className: 'text-lg font-medium text-gray-900 mb-4',
                    children: 'Test Configuration',
                  }),
                  v.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                    children: [
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Concurrent Tests',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '1',
                            max: '10',
                            value: n.testConcurrency,
                            onChange: T =>
                              N('testConcurrency', parseInt(T.target.value)),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                          v.jsx('p', {
                            className: 'text-xs text-gray-500 mt-1',
                            children: 'Maximum number of simultaneous tests',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsxs('label', {
                            className: 'flex items-center',
                            children: [
                              v.jsx('input', {
                                type: 'checkbox',
                                checked: n.enableAI,
                                onChange: T => N('enableAI', T.target.checked),
                                className:
                                  'rounded border-gray-300 text-blue-600 focus:ring-blue-500',
                              }),
                              v.jsx('span', {
                                className:
                                  'ml-2 text-sm font-medium text-gray-700',
                                children: 'Enable AI Analysis',
                              }),
                            ],
                          }),
                          v.jsx('p', {
                            className: 'text-xs text-gray-500 mt-1',
                            children:
                              'Use machine learning for anomaly detection and forecasting',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('h3', {
                    className: 'text-lg font-medium text-gray-900 mb-4',
                    children: 'Alert Thresholds',
                  }),
                  v.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
                    children: [
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Low Throughput (Mbps)',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '1',
                            value: n.alertThresholds.lowThroughput,
                            onChange: T =>
                              N(
                                'alertThresholds.lowThroughput',
                                parseInt(T.target.value)
                              ),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Low SNR (dB)',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '1',
                            value: n.alertThresholds.lowSNR,
                            onChange: T =>
                              N(
                                'alertThresholds.lowSNR',
                                parseInt(T.target.value)
                              ),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'High Latency (ms)',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '1',
                            value: n.alertThresholds.highLatency,
                            onChange: T =>
                              N(
                                'alertThresholds.highLatency',
                                parseInt(T.target.value)
                              ),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              children: v.jsxs(at, {
                children: [
                  v.jsx('h3', {
                    className: 'text-lg font-medium text-gray-900 mb-4',
                    children: 'cnMaestro Integration',
                  }),
                  v.jsxs('div', {
                    className: 'space-y-4',
                    children: [
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'API URL',
                          }),
                          v.jsx('input', {
                            type: 'url',
                            value: n.cnMaestroSettings.apiUrl,
                            onChange: T =>
                              N('cnMaestroSettings.apiUrl', T.target.value),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                        children: [
                          v.jsxs('div', {
                            children: [
                              v.jsx('label', {
                                className:
                                  'block text-sm font-medium text-gray-700 mb-2',
                                children: 'Client ID',
                              }),
                              v.jsx('input', {
                                type: 'text',
                                value: n.cnMaestroSettings.clientId,
                                onChange: T =>
                                  N(
                                    'cnMaestroSettings.clientId',
                                    T.target.value
                                  ),
                                className:
                                  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                              }),
                            ],
                          }),
                          v.jsxs('div', {
                            children: [
                              v.jsx('label', {
                                className:
                                  'block text-sm font-medium text-gray-700 mb-2',
                                children: 'Client Secret',
                              }),
                              v.jsx('input', {
                                type: 'password',
                                value: n.cnMaestroSettings.clientSecret,
                                onChange: T =>
                                  N(
                                    'cnMaestroSettings.clientSecret',
                                    T.target.value
                                  ),
                                className:
                                  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                              }),
                            ],
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        children: [
                          v.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Refresh Interval (seconds)',
                          }),
                          v.jsx('input', {
                            type: 'number',
                            min: '60',
                            max: '3600',
                            value: n.cnMaestroSettings.refreshInterval,
                            onChange: T =>
                              N(
                                'cnMaestroSettings.refreshInterval',
                                parseInt(T.target.value)
                              ),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        className: 'flex items-center space-x-4',
                        children: [
                          v.jsxs(Dt, {
                            onClick: x,
                            disabled: d,
                            variant: 'outline',
                            children: [
                              d
                                ? v.jsx(Cl, {
                                    className: 'w-4 h-4 mr-2 animate-spin',
                                  })
                                : v.jsx(Cl, { className: 'w-4 h-4 mr-2' }),
                              'Test Connection',
                            ],
                          }),
                          h &&
                            v.jsxs('div', {
                              className: `flex items-center space-x-2 ${h === 'success' ? 'text-green-600' : 'text-red-600'}`,
                              children: [
                                h === 'success'
                                  ? v.jsx(bv, { className: 'w-4 h-4' })
                                  : v.jsx(Ap, { className: 'w-4 h-4' }),
                                v.jsx('span', {
                                  className: 'text-sm',
                                  children:
                                    h === 'success'
                                      ? 'Connection successful'
                                      : 'Connection failed',
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            v.jsx(Ve.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              children: v.jsx('div', {
                className: 'flex justify-end',
                children: v.jsxs(Dt, {
                  onClick: w,
                  disabled: l,
                  size: 'lg',
                  children: [
                    l
                      ? v.jsx(Cl, { className: 'w-4 h-4 mr-2 animate-spin' })
                      : v.jsx(ox, { className: 'w-4 h-4 mr-2' }),
                    l ? 'Saving...' : 'Save Settings',
                  ],
                }),
              }),
            }),
          ],
        });
  },
  G2 = () =>
    v.jsx(Pv, {
      basename: '/linktest',
      children: v.jsx($2, {
        children: v.jsxs(tv, {
          children: [
            v.jsx(yr, {
              path: '/',
              element: v.jsx(J0, { to: '/dashboard', replace: !0 }),
            }),
            v.jsx(yr, { path: '/dashboard', element: v.jsx(b2, {}) }),
            v.jsx(yr, { path: '/scheduler', element: v.jsx(W2, {}) }),
            v.jsx(yr, { path: '/history', element: v.jsx(H2, {}) }),
            v.jsx(yr, { path: '/settings', element: v.jsx(K2, {}) }),
          ],
        }),
      }),
    });
c0.createRoot(document.getElementById('root')).render(
  v.jsx(j.StrictMode, { children: v.jsx(G2, {}) })
);
//# sourceMappingURL=index-LK7OlPv2.js.map
