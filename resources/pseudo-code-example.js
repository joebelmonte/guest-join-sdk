async function getJoinCode() {
  // define the guest's name, or use the generic "Guest" if the field is blank
  var guestName = document.querySelector("#GuestName").value
    ? document.querySelector("#GuestName").value
    : "Guest";

  // Show or hide UI as appropriate, for example:
  $("#headermessagetext").hide();
  $("#guestname").hide();
  $("#waitingtext").show();
  $("#joincode").show();

  let connector = new GLANCE.Guest.Connector({
    groupid: groupid, // Make sure to replace with your unique group id
    ws: "www.glance.net",
  });
  connector.addEventListener("timeout", () => {
    // Perform functions/adjust UI in the event that the agent fails to admit the guest before the code times out
  });
  connector.addEventListener("error", () => {
    // Perform functions/adjust UI in the event of an error
  });
  let guestcode = await connector.connect(guestName);
  if (!guestcode.ok) {
    // Perform functions/adjust UI in the event of an error
  } else {
    // guestcode.code contains the code to be displayed to the user.  Adjust the UI and display it to the user.
    // guestcode.timeout indicates the number of seconds until the code will timeout.
    // You may optionally use this to extend the timeout, possibly in response to a user prompt if desired.
  }
}
