declare global {
  interface Window {
    ethereum: ExternalProvider
  }
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}
