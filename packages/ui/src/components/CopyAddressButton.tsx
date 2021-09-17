import React, { useState } from 'react'
import { styled } from '@linaria/react'

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  svg > path {
    fill: var(--fg);
  }
  svg {
    margin-left: 0.5rem;
  }
`

export const CopyAddressButton = ({ address }: { address: string }) => {
  const [copied, set] = useState(false)

  return (
    <StyledButton
      onClick={() => {
        navigator.clipboard.writeText(address).then(() => set(true))
      }}
    >
      {copied ? 'Copied' : 'Copy address'}{' '}
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.01562 14.125H4.33594V15.2812C4.33594 17 5.26562 17.9219 7 17.9219H14.9766C16.7109 17.9219 17.6406 17 17.6406 15.2812V7.25781C17.6406 5.53906 16.7109 4.61719 14.9766 4.61719H13.6562V3.46094C13.6562 1.74219 12.7266 0.8125 10.9922 0.8125H3.01562C1.28125 0.8125 0.351562 1.73438 0.351562 3.46094V11.4766C0.351562 13.2031 1.28125 14.125 3.01562 14.125ZM3.17969 12.3359C2.5 12.3359 2.14062 11.9922 2.14062 11.2812V3.65625C2.14062 2.94531 2.5 2.60156 3.17969 2.60156H10.8281C11.5 2.60156 11.875 2.94531 11.875 3.65625V4.61719H7C5.26562 4.61719 4.33594 5.53906 4.33594 7.25781V12.3359H3.17969ZM7.16406 16.1328C6.48438 16.1328 6.125 15.7969 6.125 15.0859V7.45312C6.125 6.74219 6.48438 6.40625 7.16406 6.40625H14.8125C15.4844 6.40625 15.8594 6.74219 15.8594 7.45312V15.0859C15.8594 15.7969 15.4844 16.1328 14.8125 16.1328H7.16406Z"
          fill="black"
        />
      </svg>
    </StyledButton>
  )
}
