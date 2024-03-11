---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug that caused a "missing translation" message in the connect modal when users created their own wallet with steps. This happened due to how we store the translations internally. Now, if a translation is missing, we'll display the original message from the user. This fix applies only to the connect modal steps section.
