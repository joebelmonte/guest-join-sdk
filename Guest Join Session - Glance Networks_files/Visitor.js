// Javascript for the visitor pages

var GLANCE = GLANCE || {};
GLANCE.Visitor = {};

GLANCE.Visitor.getVisitorSettings = function() {
    var settingsmeta = jQuery("#visitorsettings");
    var settings = {};

    ["platform", "minver", "installerurl"].forEach(function(s) {
        settings[s] = settingsmeta.attr("data-" + s);
    });

    return settings;
}

// use .replace to avoid adding these pages to history

GLANCE.Visitor.goToDownload = function(groupid) {
    window.location.replace("/visitor/start/DownloadGlance.aspx?groupid=" + groupid);
}

GLANCE.Visitor.goToInvoke = function (groupid, invoked) {
    window.location.replace("/visitor/start/InvokeClient.aspx?groupid=" + groupid + (invoked ? "&invoked=1" : ""));
}

GLANCE.Visitor.goToDesktopMode = function(groupid, returnurl) {
    window.location.href = "/visitor/DesktopMode.aspx?groupid=" + groupid + "&url=" + returnurl;
}

GLANCE.Visitor.siteUsageStats = function(groupid, stat) {
    jQuery.get("/services/UsageStatistics/UpdateStat", {
        "groupid": groupid,
        "area": "visitor.start",
        "stat": stat
    });
}