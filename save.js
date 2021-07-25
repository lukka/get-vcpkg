const cache = require('@actions/cache');
const core = require('@actions/core');
const globals = require("./globals.js").globals;

async function main() {
    core.debug(`ACTIONS_CACHE_URL=${process.env.ACTIONS_CACHE_URL}`);
    core.debug(`ACTIONS_RUNTIME_URL=${process.env.ACTIONS_RUNTIME_URL}`);
    core.debug(`ACTIONS_RUNTIME_TOKEN=${process.env.ACTIONS_RUNTIME_TOKEN}`);

    if (!process.env[globals.VCPKG_CACHE_PATHS])
        throw `env.${globals.VCPKG_CACHE_PATHS} is not defined`;
    if (!process.env[globals.VCPKG_CACHE_KEY])
        throw `env.${globals.VCPKG_CACHE_KEY} is not defined`;

    const paths = process.env[globals.VCPKG_CACHE_PATHS].split(process.env[globals.VCPKG_CACHE_PATHS_SEP]);
    const key = process.env[globals.VCPKG_CACHE_KEY];
    const cacheKey = await saveCache(paths, key);
    if (!cacheKey) {
        core.info(`Cache not saved for input keys: ${[key].join(", ")}`);
    } else {
        core.info(`Cache save for key: ${cacheKey}`);
    }
}

async function saveCache(paths, key) {
    try {
        return await cache.saveCache(paths, key);
    } catch (error) {
        if (error instanceof cache.ReserveCacheError) {
            core.info(`Cache already exists, skip saving cache`);
            core.debug(error.message);
            core.debug(error.stack || error)
        } else {
            core.warning(`Cannot save cache due to error: ${ error.message }.`);
            core.warning(error.stack || error);
            return null;
        }
    }
}

(async () => {
    await main();
})().catch(e => {
    core.error(e);
});
