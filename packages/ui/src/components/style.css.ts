import { style } from '@vanilla-extract/css'

/* styled.span<{ $bgColor: string }>`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor};

  font-size: 0.8em;
  margin-right: 10px;
` */
export const StyledIconClassName = style({
  borderRadius: '9999px',
  height: '1.8em',
  width: '1.8em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.8em',
  marginRight: '10px'
})

export const ExplorerLinkClassName = style({
  textDecoration: 'none',
  '&::before': {
    content: '↗ '
  },
  '&:hover': {
    textDecoration: 'underline'
  }
})
