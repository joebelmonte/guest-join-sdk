document.addEventListener("DOMContentLoaded", (event) => {
  const iframeSrc = new URL("guestjoin.html", window.location.href);
  document.getElementById("guest-join-page").src = iframeSrc.href;
});
