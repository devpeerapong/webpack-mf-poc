# Module Federation POC

```sh
pnpm install
pnpm serve
```

### Application

- CRA - http://localhost:4000
  - [CRACO](https://craco.js.org/)
  - [ModuleFederationPlugin](https://webpack.js.org/plugins/module-federation-plugin/)
  - [craco.config.js](./cra/craco.config.js)
- Vite - http://localhost:4001
  - [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
  - Based on [webpack-host example](https://github.com/originjs/vite-plugin-federation/blob/main/packages/examples/webpack-host/remote/vite.config.js)
  - [vite.config.js](./vite/vite.config.js)
- Next - http://localhost:4002
  - [@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf)
  - Based on [nextjs-v13](https://github.com/module-federation/module-federation-examples/tree/master/nextjs-v13/)
  - SSR Based on [nextjs-ssr](https://github.com/module-federation/module-federation-examples/blob/master/nextjs-ssr/shop/next.config.js)
  - with Broken SSR from **Webpack** app
  - [next.config.js](./next/next.config.js)
- Webpack - http://localhost:4003
  - [ModuleFederationPlugin](https://webpack.js.org/plugins/module-federation-plugin/)
  - SSR Based on [react-18-ssr](https://github.com/module-federation/module-federation-examples/tree/master/react-18-ssr/remote2/config)
  - [webpack.config.js](./plain-webpack/webpack.config.cjs)
