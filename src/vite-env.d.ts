/// <reference types="vite/client" />

interface Window {
  __EJSC_LOG_RELAY_ENABLED__?: boolean;
  __ejsc_relay?: (eventName: string, data: any) => void;
  EjscBridge?: {
    postMessage(data: string): void;
  };
  ejsc?: any;
}

interface ImportMetaEnv {
  readonly VITE_MINIAPP_ENV: string;
  readonly VITE_REMOTE_URL: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_SIMULATOR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

