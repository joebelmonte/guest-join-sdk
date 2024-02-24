/* 
 
IMPORTANT ******************************************************************************

this file is no longer maintained

If future changes are requried, see the glance-client-src repository and build a versioned file

Source code is under /src/integration
 
 */

(function () {
    'use strict';
var GLANCE = {Client:{}};
GLANCE._Client = GLANCE._Client || {};
jQuery(window).ready(function() {
  function r() {
    var a = -1 !== navigator.appName.toLowerCase().indexOf("microsoft") || -1 !== navigator.userAgent.indexOf("Trident/"), b = -1 !== navigator.platform.toLowerCase().indexOf("win");
    return a && b;
  }
  function n() {
    return navigator.vendor && navigator.vendor.match(/^Google/);
  }
  function h() {
    return navigator.vendor && navigator.vendor.includes("Apple Computer");
  }
  function u(a, b) {
    var c = "", e = b.instance || "", d, k = "";
    "joinssn" === a ? d = ["username", "sessionkey"] : "agentjoin" === a && (d = ["groupid", "sessionkey"]);
    void 0 !== d && d.forEach(function(f) {
      b[f] && (k += "/" + b[f]);
    });
    a && (c = g.protocolHandler + e + "://" + a + "/" + g.glanceServer + k + "?");
    Object.keys(b).forEach(function(f) {
      void 0 !== d && d.includes(f) || (c += f + "=" + encodeURIComponent(b[f]) + "&");
    });
    return c;
  }
  function p(a) {
    function b(d) {
      d && d.glanceClientVersion ? (e.version = d.glanceClientVersion, e.guestinstall = d.guestInstall) : d && d.version ? (e.version = d.version, e.usesextension = d.usesextension, e.versiondetection = d.versiondetection) : void 0 !== d ? console.log("Native client extension status: ", JSON.stringify(d)) : console.log("Extension " + g.extensionId + " not installed or not accessible from " + window.location.href, n() && chrome.runtime ? chrome.runtime.lastError : "");
      e.extensioninstalled = void 0 !== d;
      a && a(e);
    }
    function c(d) {
      console.log("Failed to call extension: " + d);
      e.extensioninstalled = !1;
      a && a(e);
    }
    var e = t;
    h() ? e.usesextension = !1 : e.usesextension = !0;
    e.versiondetection = !0;
    "function" === typeof _GlanceClientSendMessage ? _GlanceClientSendMessage({getClientVersion:1}, b, c) : n() && chrome.runtime ? chrome.runtime.sendMessage(g.extensionId, {getClientVersion:1}, b) : h() && window.GLANCE._Client.Safari ? window.GLANCE._Client.Safari.GetGlanceClientVersion(b) : a && a(e);
  }
  function v() {
    function a(c) {
      b && window.clearTimeout(b);
      b = window.setTimeout(function() {
        GLANCE.Client.GetGlanceClientVersion(function(e) {
          e.extensioninstalled ? c() : a(c);
        });
      }, 2000);
    }
    var b;
    GLANCE.Client.InstallExtension = function(c, e, d) {
      d ? (window.location.href.match(/.glance.net|.myglance.net|.myglance.org/) || console.log("Inline extension install only works from a Google verified site"), d = document.createElement("link"), d.setAttribute("rel", "chrome-webstore-item"), d.setAttribute("href", "https://chrome.google.com/webstore/detail/" + g.extensionId), document.head.appendChild(d), window.chrome.webstore.install(void 0, function() {
        console.log("Chrome extension install succeeded.");
        c && window.setTimeout(c, 1000);
      }, function(k) {
        console.error("Chrome extension install failed: ", k);
        e && e();
      })) : (window.open("https://chrome.google.com/webstore/detail/" + g.extensionId, "_blank", "width=1200,height=900,top=100,left=400"), a(c));
    };
    GLANCE.Client.GetGlanceClientVersion = p;
    l = function(c) {
      chrome.runtime.sendMessage(g.extensionId, {invokeClient:c}, function(e) {
      });
    };
  }
  function w() {
    function a(b) {
      var c = null;
      try {
        c = new ActiveXObject(b);
      } catch (e) {
      }
      return c;
    }
    GLANCE._Client.IsMetroMode = function() {
      var b = null;
      try {
        b = !!new ActiveXObject("htmlfile");
      } catch (c) {
        b = !1;
      }
      return !b && window.innerWidth === screen.width && 0 > window.location.href.indexOf("&desktopmode=1");
    };
    GLANCE.Client.GetGlanceClientVersion = function(b) {
      var c = a("GlanceClient.Client"), e = null === c ? "0" : c.Version;
      c = null === c ? "false" : c.IsGuestInstall;
      b && b({version:e, isguest:c, extensioninstalled:!1, usesextension:!1, versiondetection:!0});
    };
    GLANCE._Client.RefreshElevationPolicy = function() {
      var b = a("GlanceClient.Client");
      null !== b && b.RefreshElevationPolicy();
    };
  }
  function x() {
    GLANCE.Client.InstallExtension = function(a, b, c) {
      function e() {
        console.log("Firefox extension installed");
        a();
      }
      function d() {
        "function" === typeof _GlanceClientSendMessage ? e() : k || window.setTimeout(d, 1000);
      }
      var k;
      InstallTrigger.install({Glance:{URL:"/integration/glance_screen_sharing.xpi", IconURL:"/integration/GlanceExtensionIcon.png", toString:function() {
        return this.URL;
      }}}, function(f, q) {
        0 == q ? e() : (console.log("Firefox extension install failed: ", q), b(q));
      });
      d();
    };
    GLANCE.Client.GetGlanceClientVersion = function(a) {
      return p(a);
    };
    "function" === typeof _GlanceClientSendMessage && (l = function(a) {
      _GlanceClientSendMessage({invokeClient:a}, function() {
      }, function(b) {
        console.log("Failed to call extension: " + b);
      });
    });
  }
  function y() {
    GLANCE.Client.GetGlanceClientVersion = function(a) {
      return p(a);
    };
    l = function(a) {
      window.GLANCE._Client.Safari.InvokeClient({invokeClient:a}, function() {
      });
    };
    GLANCE._Client.IsSafari = function() {
      return h();
    };
  }
  var t = {version:"0", guestinstall:!1, extensioninstalled:!1, usesextension:!1, versiondetection:!1}, g = function() {
    var a = jQuery("#glanceclientsettings");
    return a ? {glanceServer:a.attr("data-glanceserver"), extensionId:a.attr("data-extensionid"), protocolHandler:a.attr("data-protocolhandler")} : (console.error("Missing meta tag glanceclientsettings"), {});
  }(), l, m;
  (function() {
    GLANCE._Client.IsMetroMode = function() {
      return !1;
    };
    GLANCE._Client.RefreshElevationPolicy = function() {
    };
    GLANCE.Client.GetGlanceClientVersion = function(a) {
      a && a(t);
      return "0";
    };
    GLANCE._Client.IsSafari = function() {
      return !1;
    };
  })();
  r() ? w() : navigator.appVersion && navigator.appVersion.match(/ Edge\/\d/) || (n() ? v() : (r() || h() ? 0 : -1 != navigator.appName.toLowerCase().indexOf("netscape")) ? x() : h() && y());
  GLANCE.Client.InvokeGlance = function(a, b) {
    void 0 !== b.ssninfo || "startssn" !== a && "show" !== a || (b.ssninfo = "0");
    a = u(a, b);
    GLANCE._Client.Glance(a);
  };
  GLANCE._Client.Glance = function(a) {
    l ? l(a) : (m || (m = document.createElement("iframe"), m.style.display = "none", document.body.appendChild(m)), m.src = a);
  };
  GLANCE._Client.ImmediateInvoke = function() {
    return !h();
  };
  window.GLANCE = window.GLANCE || {};
  window.GLANCE._Client = window.GLANCE._Client || {};
  window.GLANCE._Client.IsMetroMode = GLANCE._Client.IsMetroMode;
  window.GLANCE._Client.RefreshElevationPolicy = GLANCE._Client.RefreshElevationPolicy;
  window.GLANCE._Client.Glance = GLANCE._Client.Glance;
  window.GLANCE._Client.ImmediateInvoke = GLANCE._Client.ImmediateInvoke;
  window.GLANCE._Client.IsSafari = GLANCE._Client.IsSafari;
  window.GLANCE.Client = {CompareVersions:function(a, b) {
    a = String(a).split(".");
    var c = String(b).split(".");
    for (b = 0; 4 > b; b++) {
      isNaN(a[b]) && (a[b] = 0);
      isNaN(c[b]) && (c[b] = 0);
      if (Number(a[b]) < Number(c[b])) {
        return -1;
      }
      if (Number(a[b]) > Number(c[b])) {
        return 1;
      }
    }
    return 0;
  }, GetGlanceClientVersion:GLANCE.Client.GetGlanceClientVersion, InstallExtension:GLANCE.Client.InstallExtension, InvokeGlance:GLANCE.Client.InvokeGlance};
});
}).call(window);
