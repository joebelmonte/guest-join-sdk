// (c) 2021 Glance Networks, Inc.
// 
// GuestJoin.js - script for Guest Join page

var g_bgFilterPerformanceFail = false;

/** 
 * GetGuestCode
 * Get guest code, also send guest name 
 * @param {string} guestName
 *
 */
function GetGuestCode(guestName) {
    console.log("GuestJoin: get guest code...");
    g_visitorPresence = new GLANCE.Presence.Visitor({
        groupid: GROUP_ID
    });

    // Setup event handlers:        
    g_visitorPresence.onerror = function (e) {
        console.error('GuestJoin - Visitor presence error: ', JSON.stringify(e));
    };

    g_visitorPresence.onsignal = function (msg) {
        console.log('GuestJoin - Visitor presence onsignal: ' + JSON.stringify(msg));
    };

    g_visitorPresence.onuniqueid = function (uniqueid, timeout) {
        console.log('GuestJoin - received guest code: ' + uniqueid);        
        g_uniqueid = uniqueid.replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/, ''); // Add a blank space after 3 digits.
        jQuery("#uniqueid").html(g_uniqueid);

        // Show-Hide UI               
        $("#headermessagetext").hide();
        $("#guestname").hide();

        $("#vpguestname").html(g_guestName);
        $("#waitingtext").show();
        $("#joincode").show();

        // Accessibility requirement: Alert the guest before the key code times out
        let TIMEOUT_WARNING_SECS = 20;

        function checkTimeout() {
            window.setTimeout(alerttimeout, (timeout - TIMEOUT_WARNING_SECS) * 1000);
        }

        function alerttimeout() {
            GLANCE.UI.MessageBox.show("codeExpiring").then(yes => {
                if (yes) {
                    g_visitorPresence.extendUnique();
                    checkTimeout();
                }
                else {
                    g_visitorPresence.disconnect();
                    g_visitorPresence.onclose();
                }
            })
        }

        if (g_visitorPresence.extendUnique) // 5.7+ presence scripts
            checkTimeout();
    };



    g_visitorPresence.onclose = function () {
        jQuery("#uniqueid").html("<i>Connection timed out</i>");
        $("#waitingtext").hide();

        // Dismiss any open message box
        GLANCE.UI.MessageBox.close(false);

        console.log('GuestJoin - Guest connection timed out!');
    };

    // Get guest code and set guest name
    g_visitorPresence.connectUnique({
        data: { guestname: guestName }
    });
    console.log("GuestJoin: send guest name: " + guestName);

    return true;
}

/**
 * Join session click 
 *
 */
function onClickJoinSession(e) {
    console.log("GuestJoin: Join session");
    e.preventDefault();
    g_guestName = document.getElementById(GUEST_NAME_ID).value;
    if (g_guestName.length === 0) {
        jQuery("#guestnameerror").css("display", "block");
        jQuery("#GuestName").addClass("input-validation-error").attr("aria-invalid", "true").attr("aria-describedby", "guestnameerror");
        return false;
    }
    jQuery('#GuestName').removeClass("input-validation-error").attr("aria-invalid", "false");
    jQuery("#guestnameerror").css("display", "none");

    GetGuestCode(g_guestName);

    return true;
}
/////////////////////////////
/**
 * Global variables
 * */
var g_visitorPresence = null;
var g_uniqueid = null;
var g_guestName = null;

$(window).ready(function () {      
    $('#aspnetForm').submit(function (event) {
        return false; // Prevent form input to reload a page when use ENTER key
    });

    //setupVideoPreview();
    $("#joincode").hide();
    $("#waitingtext").hide();

    $("#continuebutton").click(onClickJoinSession);

    // Guest name text field using ENTER key
    var input = document.getElementById("GuestName");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("continuebutton").click();
        }
    });
});

// Guest Join
//
// Presence visitor is invoked from the agent side with:
// "func": "GLANCE.Guest.joinSession",
// "args": { "ssnid": <ssnid>, "callid": <callid>, "authToken": <token> }
// The token is in the form: "ssnid=13010.3301.885889002&serverkey=3a81b16576c3100a44cb36975ebb4ccf&privs=cobrowse%3aon%3b+groupid%3a13010%3b+callid%3a13721596%3b+guestname%3aGreta%252520Guest"
// This page will then redirect to /guest/viewer/?callid=<callid>
const COOKIE_DURATION = 10;   // minutes
GLANCE.Guest = GLANCE.Guest || {};
GLANCE.Guest.joinSession = function (args) {
    var domain = "." + window.location.host.split(".").splice(-2).join("."); // myglance.net, myglance.org, glance.net
    var exp = new Date(Date.now() + COOKIE_DURATION * 60 * 1000).toUTCString();
    var name = encodeURIComponent(g_guestName);

    // Create a form with action /guest/viewer/?callid (see below for full url)
    var url;
    url = `/guest/viewer/?name=${name}&callid=${args.callid}`;

    let form = jQuery(`<form action='${url}' method='POST'><input name='authtoken' id='authtoken' value='${args.authToken}' type='text' style='display: none;' /></form>`);
    jQuery(document.body).append(form);
    form.submit();
}

