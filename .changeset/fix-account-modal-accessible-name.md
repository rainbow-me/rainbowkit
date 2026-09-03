---
"@rainbow-me/rainbowkit": patch
---

fix: give the account modal an accessible name

`AccountModal` set `aria-labelledby="rk_account_modal_title"` on its dialog,
but `ProfileDetails` rendered its heading with its own hardcoded id,
`rk_profile_title`, and put that same id on the balance heading too. The
reference never resolved, so screen readers announced the modal as an
unnamed dialog, and the duplicated id was invalid on its own.

`ProfileDetails` now takes the `titleId` from `AccountModal` and renders it
on the account name only, so the dialog is announced by the connected
address or ENS name, the way the chain and connect modals already are.
