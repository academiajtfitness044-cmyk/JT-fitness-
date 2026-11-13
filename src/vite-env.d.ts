/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
