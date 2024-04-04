// Create useful variables
const urlParams = new URLSearchParams(window.location.search);
const groupid = urlParams.get("groupid") ? urlParams.get("groupid") : 20541;
const ws = urlParams.get("ws") ? urlParams.get("ws") : "www.glance.net";
const dataSite = urlParams.get("data-site")
  ? urlParams.get("data-site")
  : "production";

// Add the appropriate guest join sdk version

document.addEventListener("DOMContentLoaded", () => {
  var theGuestScript = document.createElement("script");
  var src = `https://${ws}/script/${groupid}/${dataSite}/Guest`;
  theGuestScript.setAttribute("src", src);
  document.querySelector("head").append(theGuestScript);
});

// Perform guest join functionality

function askToRefresh(timeout) {
  // Ask the user if they want more time 1 minute before the code expires
  setTimeout(() => {
    document.querySelector("#modal-overlay").style.display = "block";
  }, timeout * 1000 - 60000);
}

async function getJoinCode() {
  // define the guest name, or the generic "Guest" if the field is blank
  var guestName = document.querySelector("#GuestName").value
    ? document.querySelector("#GuestName").value
    : "Guest";

  // Show-Hide UI
  $("#headermessagetext").hide();
  $("#guestname").hide();
  $("#waitingtext").show();
  $("#joincode").show();

  // Get group id from url, otherwise use 20541
  const urlParams = new URLSearchParams(window.location.search);
  const groupid = urlParams.get("groupid") ? urlParams.get("groupid") : 20541;
  const ws = urlParams.get("ws") ? urlParams.get("ws") : "www.glance.net";

  let connector = new GLANCE.Guest.Connector({
    groupid: groupid,
    ws: ws,
  });
  connector.addEventListener("timeout", () => {
    document.querySelector("#uniqueid").innerText =
      "Timed out. Please refresh page.";
    document.querySelector("#waitingtext").style.display = "none";
    document.querySelector("#modal-overlay").style.display = "none";
  });
  connector.addEventListener("error", () => {
    alert("An error occurred. Please refresh the page.");
  });
  let guestcode = await connector.connect(guestName);
  if (!guestcode.ok) {
    alert("An error occurred. Please refresh the page.");
  }
  document.querySelector("#uniqueid").innerText = guestcode.code
    .replace(/(\d{3})/g, "$1 ")
    .replace(/(^\s+|\s+$)/, ""); // Add a blank space after 3 digits.;

  askToRefresh(guestcode.timeout);

  document.querySelector("#btn-yes").addEventListener("click", () => {
    var timeUntilTimeout = connector.moreTime();
    askToRefresh(timeUntilTimeout);
    console.log(`Timeout extended by ${timeUntilTimeout} seconds.`);
    document.querySelector("#modal-overlay").style.display = "none";
  });
  document.querySelector("#btn-no").addEventListener("click", () => {
    document.querySelector("#modal-overlay").style.display = "none";
  });
}

document
  .querySelector("#continuebutton")
  .addEventListener("click", getJoinCode);
