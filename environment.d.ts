declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STREAM_API_KEY: string;
      BACKEND_ENDPOINT: string;
    }
  }
}

export {}; 