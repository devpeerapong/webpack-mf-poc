const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    /** @type {ConstructorParameters<typeof import("@module-federation/nextjs-mf").NextFederationPlugin>[0]} */
    const federationConfig = {
      name: "nextjs",
      remotes: {
        cra: "cra@http://localhost:4000/remoteEntry.js",
        vite: `promise import("http://localhost:4001/assets/remoteEntry.js")`,
        plainwebpack: `plainwebpack@http://localhost:4003/public/${
          options.isServer ? "server" : "client"
        }/remoteEntry.js`,
      },
      exposes: {
        "./Heading": "./src/components/Heading.js",
      },
      filename: "static/chunks/remoteEntry.js",
    };

    if (!options.isServer) {
      federationConfig.shared = {
        react: {
          requiredVersion: false,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: false,
          singleton: true,
        },
      };
      federationConfig.extraOptions = {
        skipSharingNextInternals: true,
      };
    }

    config.plugins.push(new NextFederationPlugin(federationConfig));

    return config;
  },
};

module.exports = nextConfig;
