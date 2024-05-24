const path = require("path");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

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
    rsbuildreact: "rsbuildreact@http://localhost:4004/remoteEntry.js",
  },
  exposes: {
    "./Heading": "./js/Heading.js",
  },
  shared: {
    react: {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
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
  target: "async-node",
  entry: {
    bootstrap: path.resolve(__dirname, "./js/bootstrap.js"),
  },
  output: {
    path: path.resolve(__dirname, "./public/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  plugins: [
    new ModuleFederationPlugin({
      ...clientFederationConfig,
      library: { type: "commonjs-module" },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
      ],
    }),
  ],
};

module.exports = [client, server];
