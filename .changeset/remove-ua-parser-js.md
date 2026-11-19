---
"@rainbow-me/rainbowkit": patch
---

Removed the `ua-parser-js` dependency, which added about 27 KB (minified) to every app and is licensed AGPL-3.0-or-later. Desktop wallet download links now use a small built-in OS check. Linux distributions that were previously missed (such as CentOS and openSUSE) now get the Linux download link instead of the generic one.
