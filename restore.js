const cache = require('@actions/cache');
const core = require('@actions/core');
const crypto = require("crypto");
const globals = require("./globals.js").globals;
const separator = crypto.randomBytes(16).toString("hex");

async function main() {
    core.debug(`ACTIONS_CACHE_URL=${process.env.ACTIONS_CACHE_URL}`);
    core.debug(`ACTIONS_RUNTIME_URL=${process.env.ACTIONS_RUNTIME_URL}`);
    core.debug(`ACTIONS_RUNTIME_TOKEN=${process.env.ACTIONS_RUNTIME_TOKEN}`);

    if (!process.env.VCPKG_ROOT)
        throw "env.VCPKG_ROOT is not defined";
    if (!process.env.VCPKG_CACHE_KEY)
        throw "env.VCPKG_CACHE_KEY is not defined";

    console.log("::set-output name=value::" + process.env[process.env["INPUT_KEY"]])

    const paths = [
        process.env.VCPKG_ROOT,
        `!${process.env.VCPKG_ROOT}/buildtrees`,
        `!${process.env.VCPKG_ROOT}/packages`,
        `!${process.env.VCPKG_ROOT}/downloads`,
        `!${process.env.VCPKG_ROOT}/installed`
    ];
    process.env[globals.VCPKG_CACHE_PATHS_SEP] = separator;
    core.exportVariable(globals.VCPKG_CACHE_PATHS_SEP, separator);

    process.env.VCPKG_CACHE_PATHS = paths.join(separator);
    core.exportVariable(globals.VCPKG_CACHE_PATHS, process.env.VCPKG_CACHE_PATHS);
    
    const key = process.env[globals.VCPKG_CACHE_KEY];
    core.exportVariable(globals.VCPKG_CACHE_KEY, key);
    const cacheKey = await cache.restoreCache(paths, key, []);
    if (!cacheKey) {
        core.info(`Cache not found for input [key='${key}', paths='${paths}'`);
    } else {
        core.info(`Cache restored from key: ${cacheKey}`);
    }
}

(async () => {
    await main();
})().catch(e => {
    core.error(e);
});
