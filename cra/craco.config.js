const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 4000,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "cra",
          exposes: {
            "./Heading": "./src/Heading",
          },
          remotes: {
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
              requiredVersion: false,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
            },
          },
        }),
      ],
    },
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        output: {
          ...webpackConfig.output,
          publicPath: "auto",
        },
      };
    },
  },
};
