# PurgeCacheWebpackPlugin

## Why PurgeCacheWebpackPlugin?

webpack won't purge oudateed filesystem cache files, although we have set `maxAge` in webpack config.
This plugin provide a workaround to resolve this [issue](https://github.com/webpack/webpack/issues/13291).

## Usage

```bash
npm i purge-cache-webpack-plugin -D
```

```js
// webpack config
const PurgeCacheWebpackPlugin = require("purge-cache-webpack-plugin")

/** @type {import('webpack').Configuration}*/
const config = {
  cache: {
    type: "filesystem", // only working with filesystem cache
    maxAge: 1000 * 60,
  },
  plugins: [
    new PurgeCacheWebpackPlugin(),
    // ...
  ],
  // ...
};
```
