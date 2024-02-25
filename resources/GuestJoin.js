function askToRefresh(timeout, connector) {
  // Ask the user if they want more time 1 minute before the code expires
  setTimeout(() => {
    document.querySelector("#modal-overlay").style.display = "block";
  }, timeout * 1000 - 60000);
  document.querySelector("#btn-yes").addEventListener("click", () => {
    connector.moreTime();
    document.querySelector("#modal-overlay").style.display = "none";
  });
  document.querySelector("#btn-no").addEventListener("click", () => {
    document.querySelector("#modal-overlay").style.display = "none";
  });
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

  let connector = new GLANCE.Guest.Connector({
    groupid: groupid,
    ws: "www.glance.net",
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
  askToRefresh(guestcode.timeout, connector);
}

document
  .querySelector("#continuebutton")
  .addEventListener("click", getJoinCode);
