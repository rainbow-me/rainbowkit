declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

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
