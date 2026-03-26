window.addEventListener("message", (msg) => {
  // Check to make sure the message is coming from glance.net
  if (msg.origin != "https://www.glance.net") return;
  if (msg.data["glance_guest_viewer"]) {
    switch (msg.data["glance_guest_viewer"]["eventname"]) {
      case "guestjoined":
        console.log("the guest joined");
    }
  }
});
