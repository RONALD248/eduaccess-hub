import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png", "robots.txt"],
      manifest: {
        name: "EduAccess Hub - Educational Accessibility Platform",
        short_name: "EduAccess Hub",
        description: "Transform educational content into accessible formats with text-to-speech, translation, simplification, and more. Supporting UN SDG 4 - Quality Education.",
        theme_color: "#8B0000",
        background_color: "#FDF6F0",
        display: "standalone",
        orientation: "any",
        scope: "/",
        start_url: "/",
        categories: ["education", "accessibility", "utilities"],
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        shortcuts: [
          {
            name: "Text-to-Speech",
            short_name: "TTS",
            description: "Convert text to natural audio",
            url: "/text-to-speech",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          },
          {
            name: "Translation",
            short_name: "Translate",
            description: "Translate educational content",
            url: "/translation",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          },
          {
            name: "Simplify Text",
            short_name: "Simplify",
            description: "Simplify complex text",
            url: "/simplification",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
