---
'@rainbow-me/rainbowkit': patch
---

Shrink bundled CSS size by using minified identifiers

We were previously publishing CSS with human-readable debug identifiers (class names, keyframes etc.), but these have now been replaced with their smaller hash-only versions, e.g. the `.reset__iekbcc0` class is now `.iekbcc0`.

While these identifiers have never been guaranteed to be stable between versions, it’s possible that some consumers may have been given a false sense of API stability due to these debug names. If you have any custom CSS overrides that break due to these changes, it’s recommended that you avoid referencing them entirely rather than updating them since they’re likely to change again without notice in future releases.
