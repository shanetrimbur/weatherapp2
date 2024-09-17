/** Vendors */
import path from "path";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from "vite";

/** Types */
import type { VitePWAOptions } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const dev = env.MODE === "development";
  const claims = env.SW_CLAIMS === "true";
  const prod = env.SW === "true";
  const reload = env.SW_RELOAD === "true";
  const selfDestroying = env.SW_DESTROY === "true";

  const pwaOptions: Partial<VitePWAOptions> = {
    base: "/",
    devOptions: {
      enabled: dev,
      /* when using generateSW the PWA plugin will switch to classic */
      navigateFallback: "index.html",
      type: "module",
    },
    includeAssets: ["/robots.txt", "/sitemap.xml"],
    injectRegister: "auto",
    manifest: {
      author: [
        {
          name: "3d MAW",
          email: "Shane",
        },
      ],
      background: {
        persistent: true,
      },
      background_color: "#1B1B1D",
      description: "Weather App",
      display: "standalone",
      homepage_url: ".",
      name: "Weather App",
      orientation: "portrait-primary",
      icons: [
        {
          src: "favicon.ico",
          sizes: "96x96 64x64 48x48 32x32 16x16",
          type: "image/x-icon",
        },
        {
          purpose: "any maskable",
          sizes: "192x192",
          src: "weather-logo-512.png",
          type: "image/png",
        },
        {
          purpose: "any maskable",
          sizes: "512x512",
          src: "weather-logo-512.png",
          type: "image/png",
        },
      ],
      permissions: ["geolocation", "notifications", "storage"],
      short_name: "Weather",
      start_url: "/",
      theme_color: "#1B1B1D",
      version: "1.0.0",
    },
    mode: env.MODE,
    workbox: {
      globPatterns: ["**/*.{js,css,ico,png,svg,txt}"],
    },
  };

  if (prod) {
    pwaOptions.srcDir = "src";
    pwaOptions.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
    pwaOptions.strategies = "injectManifest";
    (pwaOptions.manifest as Partial<ManifestOptions>).name = "Material Dash";
    (pwaOptions.manifest as Partial<ManifestOptions>).short_name = "MD";
  }

  /** Auto Update SW and Skip Waiting */
  if (claims) {
    pwaOptions.registerType = "autoUpdate";
    pwaOptions.workbox = {
      clientsClaim: true,
      skipWaiting: true,
    };
  }

  /** Inline string replacements within minified code base */
  const replaceOptions = {
    __DATE__: new Date().toISOString(),
    __buildDate__: JSON.stringify(new Date()),
    __buildVersion: new Date().toISOString(),
    preventAssignment: true,
  };

  /** If the app should reload itself or not */
  if (reload) {
    // @ts-expect-error just ignore
    replaceOptions.__RELOAD_SW__ = "true";
  }

  /** Whether to uninstall the PWA or not */
  if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

  /** Remove non-react-app envs */
  const devenv = {};
  for (const key in env) {
    if (!key?.includes("REACT_APP_")) {
      delete env[key];
    } else {
      devenv[`import.meta.env.VITE_${key}`] = JSON.stringify(env[key]);
    }
  }

  return {
    build: {
      manifest: true,
      minify: true,
      outDir: "build",
    },
    define: devenv,
    plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "./src/api"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@dist": path.resolve(__dirname, "./src/dist"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        types: path.resolve(__dirname, "./src/types"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
      port: 3000,
    },
  };
});
