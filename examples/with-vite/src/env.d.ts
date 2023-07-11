/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_WALLETCONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
