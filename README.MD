# Guest Join SDK Sample Implementation

## By Joe Belmonte

Production deployed here: [Custom Guest Join](https://www.glancedev1.com/joeb/guestjoin/guestjoin.html)

Dev version deployed here: [Custom Guest Join - DEV](https://www.glancedev1.com/joeb/dev/guestjoin/guestjoin.html)

## Release Notes

### March 3, 2024

- Refactored `moreTime()` call so that the timeout can be extended as many times as the guest wants.

### February 25, 2024

- Added ability to dynamically specify group id via a parameter in the URL of the page, e.g., `?groupid=20541`
  - Defaults to `20541` if no group id specified in the URL.

### February 24, 2024

- Version 1.0 release
