import React from 'react'
export const CopyAddressButton = ({ address }: { address: string }) => (
  <button onClick={() => navigator.clipboard.writeText(address)}>Copy address </button>
)
