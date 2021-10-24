import { styled } from '@linaria/react'

export const EmojiIcon = styled.span<{ $bgColor: string }>`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$bgColor};

  font-size: 0.8em;
  margin-right: 10px;
`
