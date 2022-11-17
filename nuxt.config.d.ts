declare module "@nuxt/schema" {
  interface NuxtConfig {
    tailwindcss?: {
      cssPath?: string;
      configPath?: string;
      exposeConfig?: boolean;
      config?: any;
      injectPosition?: number;
      viewer?: boolean;
    };
  }
}
