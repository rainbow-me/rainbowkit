---
"@rainbow-me/rainbowkit": patch
---

Resolved an issue where `Object.keys(navigator).length` returned `0` because it couldn't access object properties due to how `navigator` window API works. This fix should now show the desired browser link and background when trying to install an extension from connect modal.
