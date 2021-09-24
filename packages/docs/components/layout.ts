import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const Inline = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Main = styled.main`
  margin: 0 auto;
  max-width: 80vw;
  display: grid;
  gap: 2rem;
  width: max-content;
`

export const Button = css`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(#001a1f) padding-box, linear-gradient(to right, #f14444, #4f4fd6) border-box;
  border-radius: 15px;
  border: 4px solid transparent;
  font-weight: 800;
  line-height: 1;
  color: #ebebeb;
  font-size: 1.25rem;
  z-index: 20;
  height: 54px;
`

export const Nav = styled.nav`
  padding: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 5;

  > * {
    margin-right: 1.25rem;
  }
`

export const Header = styled.header`
  padding-top: 4vw;
  padding-bottom: 4vw;
  h1 {
    font-weight: 900;
    font-size: calc(4rem + 2vw);
  }
`

export const Icon = css`
  height: 1.25rem;
`
