!(function () {
  "use strict";
  var o = window.location,
    i = window.document,
    r = i.currentScript,
    l = r.getAttribute("data-api") || new URL(r.src).origin + "/api/event";
  function s(t) {
    console.warn("Ignoring Event: " + t);
  }
  function t(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname) ||
      "file:" === o.protocol
    )
      return s("localhost");
    if (
      !(
        window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress
      )
    ) {
      try {
        if ("true" === window.localStorage.plausible_ignore)
          return s("localStorage flag");
      } catch (t) {}
      var a = {},
        n =
          ((a.n = t),
          (a.u = o.href),
          (a.d = r.getAttribute("data-domain")),
          (a.r = i.referrer || null),
          e && e.meta && (a.m = JSON.stringify(e.meta)),
          e && e.props && (a.p = e.props),
          new XMLHttpRequest());
      n.open("POST", l, !0),
        n.setRequestHeader("Content-Type", "text/plain"),
        n.send(JSON.stringify(a)),
        (n.onreadystatechange = function () {
          4 === n.readyState && e && e.callback && e.callback();
        });
    }
  }
  var e = (window.plausible && window.plausible.q) || [];
  window.plausible = t;
  for (var a, n = 0; n < e.length; n++) t.apply(this, e[n]);
  function p() {
    a !== o.pathname && ((a = o.pathname), t("pageview"));
  }
  var c,
    u = window.history;
  u.pushState &&
    ((c = u.pushState),
    (u.pushState = function () {
      c.apply(this, arguments), p();
    }),
    window.addEventListener("popstate", p)),
    "prerender" === i.visibilityState
      ? i.addEventListener("visibilitychange", function () {
          a || "visible" !== i.visibilityState || p();
        })
      : p();
  var d = 1;
  function f(t) {
    var e, a, n, i;
    function r() {
      n || ((n = !0), (window.location = a.href));
    }
    ("auxclick" === t.type && t.button !== d) ||
      ((e = (function (t) {
        for (
          ;
          t &&
          (void 0 === t.tagName ||
            !(e = t) ||
            !e.tagName ||
            "a" !== e.tagName.toLowerCase() ||
            !t.href);

        )
          t = t.parentNode;
        var e;
        return t;
      })(t.target)) &&
        e.href &&
        e.href.split("?")[0],
      (i = e) &&
        i.href &&
        i.host &&
        i.host !== o.host &&
        ((i = t),
        (t = {
          name: "Outbound Link: Click",
          props: {
            url: (a = e).href,
          },
        }),
        (n = !1),
        !(function (t, e) {
          if (!t.defaultPrevented)
            return (
              (e = !e.target || e.target.match(/^_(self|parent|top)$/i)),
              (t =
                !(t.ctrlKey || t.metaKey || t.shiftKey) && "click" === t.type),
              e && t
            );
        })(i, a)
          ? plausible(t.name, {
              props: t.props,
            })
          : (plausible(t.name, {
              props: t.props,
              callback: r,
            }),
            setTimeout(r, 5e3),
            i.preventDefault())));
  }
  i.addEventListener("click", f), i.addEventListener("auxclick", f);
})();
