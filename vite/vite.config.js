import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4001,
    cors: {
      origin: "*",
    },
  },
  plugins: [
    react(),
    federation({
      name: "vite",
      filename: "remoteEntry.js",
      exposes: {
        "./Heading": "./src/Heading.jsx",
      },
      remotes: {
        cra: {
          external: "http://localhost:4000/remoteEntry.js",
          from: "webpack",
          format: "var",
        },
        nextjs: {
          external: "http://localhost:4002/_next/static/chunks/remoteEntry.js",
          from: "webpack",
          format: "var",
        },
        plainwebpack: {
          external: "http://localhost:4003/public/client/remoteEntry.js",
          from: "webpack",
          format: "var",
        },
        rsbuildreact: {
          external: "http://localhost:4004/remoteEntry.js",
          from: "webpack",
          format: "var",
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
