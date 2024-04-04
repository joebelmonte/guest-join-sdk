# Guest Join SDK Sample Implementation

## By Joe Belmonte

- Prod
  - Production deployed here: [Custom Guest Join](https://www.glancedev1.com/joeb/guestjoin/guestjoin.html)
  - Production iframed here: [Custom Iframed Guest Join](https://www.glancedev1.com/joeb/guestjoin/guestjoinparent.html)
- Dev
  - Dev version deployed here: [Custom Guest Join - DEV](https://www.glancedev1.com/joeb/dev/guestjoin/guestjoin.html)
  - Dev iframed here: [Custom Iframed Guest Join - DEV](https://www.glancedev1.com/joeb/dev/guestjoin/guestjoinparent.html)

## About

This is a working implementation of the [Glance Guest Join SDK](https://help.glance.net/glance-cobrowse/glance-cobrowse-customizing/guest_join_sdk/).

These pages use group `20541` on `www.glance.net` and `production` by default.

You may specify a different group id, webserver, and/or data-site by specifying the value in the url, for example:

```
https://www.glancedev1.com/joeb/guestjoin/guestjoin.html?groupid=<put group id here>&ws=<put webserver here>&data-site=<staging||production>
```

## Release Notes

### April 4, 2024

- The appropriate version of the GlanceGuest script is now determined dynamically based on the group id, webserver, and data-site passed in the URL parameters.

### March 30, 2024

- Created a parent page to iframe `guestjoin.html`. This allows the entire experience to stay on the same `glancedev1` domain.

### March 3, 2024

- Refactored `moreTime()` call so that the timeout can be extended as many times as the guest wants.

### February 25, 2024

- Added ability to dynamically specify group id via a parameter in the URL of the page, e.g., `?groupid=20541`
  - Defaults to `20541` if no group id specified in the URL.

### February 24, 2024

- Version 1.0 release
