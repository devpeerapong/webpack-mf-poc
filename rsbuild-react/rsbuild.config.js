import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: "./public/index.html",
  },
  output: {
    assetPrefix: "http://localhost:4004",
    distPath: {
      root: "build",
    },
  },
  source: {
    define: publicVars,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output.uniqueName = "rsbuildreact";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "rsbuildreact",
          exposes: {
            "./Heading": "./src/Heading",
          },
          remotes: {
            cra: "cra@http://localhost:4000/remoteEntry.js",
            vite: `promise import("http://localhost:4001/assets/remoteEntry.js")`,
            nextjs:
              "nextjs@http://localhost:4002/_next/static/chunks/remoteEntry.js",
            plainwebpack:
              "plainwebpack@http://localhost:4003/public/client/remoteEntry.js",
          },
          filename: "remoteEntry.js",
          shared: {
            react: {
              singleton: true,
            },
            "react-dom": {
              singleton: true,
            },
          },
        }),
      ]);
    },
  },
});
