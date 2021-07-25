const fs = require('fs');
const os = require('os');

async function main() {
    if (!process.env.GET_VCPKG_PRE_DONE) {
        console.log(`:debug::ACTIONS_CACHE_URL=${process.env.ACTIONS_CACHE_URL}`);
        console.log(`:debug::ACTIONS_RUNTIME_URL=${process.env.ACTIONS_RUNTIME_URL}`);
        console.log(`:debug::ACTIONS_RUNTIME_TOKEN=${process.env.ACTIONS_RUNTIME_TOKEN}`);
        const envFile = process.env.GITHUB_ENV;
        await fs.promises.appendFile(envFile, `ACTIONS_CACHE_URL=${process.env.ACTIONS_CACHE_URL}${os.EOL}\n`);
        await fs.promises.appendFile(envFile, `ACTIONS_RUNTIME_URL=${process.env.ACTIONS_RUNTIME_URL}${os.EOL}`);
        await fs.promises.appendFile(envFile, `ACTIONS_RUNTIME_TOKEN=${process.env.ACTIONS_RUNTIME_TOKEN}${os.EOL}`);
        await fs.promises.appendFile(envFile, `GET_VCPKG_PRE_DONE=true${os.EOL}`);
    }
}

(async () => {
    await main();
})().catch(e => {
    console.log(e);
});
