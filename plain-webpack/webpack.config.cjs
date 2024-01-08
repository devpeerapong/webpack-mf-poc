const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const { UniversalFederationPlugin } = require("@module-federation/node");

/** @type {Partial<import('webpack').Configuration>} */
const sharedConfig = {
  mode: "development",
  resolve: {
    extensions: [".jsx", ".js", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic", // defaults to classic
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};

/** @type {ConstructorParameters<typeof import('webpack').container.ModuleFederationPlugin>[0]} */
const clientFederationConfig = {
  name: "plainwebpack",
  filename: "remoteEntry.js",
  remotes: {
    cra: "cra@http://localhost:4000/remoteEntry.js",
    vite: `promise import("http://localhost:4001/assets/remoteEntry.js")`,
    nextjs: "nextjs@http://localhost:4002/_next/static/chunks/remoteEntry.js",
  },
  exposes: {
    "./Heading": "./js/Heading.js",
  },
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
};

/** @type {Partial<import('webpack').Configuration>} */
const client = {
  ...sharedConfig,
  name: "client",
  target: "web",
  entry: {
    bootstrap: path.resolve(__dirname, "./js/bootstrap.js"),
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "./public/client"),
    filename: "[name].js",
  },
  plugins: [new ModuleFederationPlugin(clientFederationConfig)],
};

/** @type {Partial<import('webpack').Configuration>} */
const server = {
  ...sharedConfig,
  name: "server",
  target: false,
  entry: {
    bootstrap: path.resolve(__dirname, "./js/bootstrap.js"),
  },
  output: {
    path: path.resolve(__dirname, "./public/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  plugins: [
    new UniversalFederationPlugin({
      ...clientFederationConfig,
      isServer: true,
      library: { type: "commonjs-module" },
    }),
  ],
};

module.exports = [client, server];
