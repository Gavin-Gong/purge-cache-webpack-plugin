const path = require("path");
const {
  removeSync,
  writeJsonSync,
  ensureFileSync,
  readJSONSync,
} = require("fs-extra");

const NAME = "PurgeCacheWebpackPlugin";
class PurgeCacheWebpackPlugin {
  apply(compiler) {
    compiler.hooks.beforeRun.tap(NAME, (compilation) => {
      const { cacheLocation, maxAge, type } = compilation.options.cache || {};
      if (maxAge && type === "filesystem") {
        this.purgeCache(cacheLocation, maxAge);
      }
    });
  }

  purgeCache(cacheLocation, maxAge) {
    const PATH = cacheLocation;
    const cacheJson = path.join(PATH, "cache.json");
    ensureFileSync(cacheJson);
    const now = Date.now();
    const updateFiles = () => {
      console.info(`[${NAME}]: remove webpack cache files`);
      removeSync(cacheLocation);
      ensureFileSync(cacheJson);
      writeJsonSync(cacheJson, { timestamp: now }, { spaces: 2 });
    };

    let data = {
      timestamp: 0,
    };
    try {
      data = readJSONSync(cacheJson);
    } catch {
      // ignore JSON parse error
    } finally {
      if (now - data.timestamp > maxAge || data.timestamp === 0) {
        updateFiles();
      } else {
        console.info(`[${NAME}]: use exiting webpack cache files`);
      }
    }
  }
}

module.exports = PurgeCacheWebpackPlugin;
