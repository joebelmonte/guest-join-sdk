# Guest Join SDK Sample Implementation

## By Joe Belmonte

- Prod
  - [Iframe Only](https://www.glancedev1.com/joeb/guestjoin/guest-join-iframe.html)
    - This flow iframes the glance.net Join and Viewer pages onto glancedev1.
    - It does not use the SDK.
    - It keeps the entire experience on glancedev1 from the perspective of the user and requires the least dev effort.
  - [SDK Only](https://www.glancedev1.com/joeb/guestjoin/sdk/guestjoin.html)
    - This flow uses the SDK for the join page, which then redirects to glance.net for the viewer window.
    - It allows for the most customization of the join page, which is also hosted on glancedev1 and does not use iframes.
    - However, the user is redirected to glance.net for the in-session viewer experience.
  - [SDK + Iframe](https://www.glancedev1.com/joeb/guestjoin/sdk/guestjoinparent.html)
    - This flow uses the SDK for the join page which itself is iframed into another page on glancedev1.
    - The benefit is that when the join page redirects to glance.net for the viewer, the parent page stays on glancedev1.
    - This offers the ability to completely customize the join page while also keeping the entire experience on glancedev1.
- Dev
  - [Iframe Only](https://www.glancedev1.com/joeb/dev/guestjoin/guest-join-iframe.html)
  - [SDK Only](https://www.glancedev1.com/joeb/dev/guestjoin/sdk/guestjoin.html)
  - [SDK + Iframe](https://www.glancedev1.com/joeb/dev/guestjoin/sdk/guestjoinparent.html)

## About

This is a working implementation of the [Glance Guest Join SDK](https://help.glance.net/glance-cobrowse/glance-cobrowse-customizing/guest_join_sdk/).

The `SDK Only` page will use group `20541` on `www.glance.net` and `production` by default.

You may specify a different group id, webserver, and/or data-site by specifying the value in the url, for example:

```
https://www.glancedev1.com/joeb/guestjoin/sdk/guestjoin.html?groupid=<put group id here>&ws=<put webserver here>&data-site=<staging||production>
```

## Release Notes

### March 26, 2026

- Commented out the CSP
- Updated README and fixed the links
- Added the iframe only option to the repo

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
