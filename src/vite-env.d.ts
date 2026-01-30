/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GETNET_BASE_URL: string
  readonly VITE_GETNET_SELLER_ID: string
  readonly VITE_GETNET_CLIENT_ID: string
  readonly VITE_GETNET_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
