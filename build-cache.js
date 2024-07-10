'use strict'

const actions = require('@actions/core')
const cache = require('@actions/cache')
const exec = require('@actions/exec')

async function main () {
  const buildCache = actions.getBooleanInput('build-cache')
  const buildCacheKey = actions.getInput('build-cache-key')
  if (buildCache) {
    let { stdout, stderr, exitCode } = await exec.getExecOutput(
      'zig',
      'env',
      { ignoreReturnCode: true }
    )

    if (exitCode) {
      stderr = !stderr.trim()
        ? `The 'zig command' command failed with exit code: ${exitCode}`
        : stderr
      throw new Error(stderr)
    }

    const envs = JSON.parse(stdout)

    const cachePath = envs.global_cache_dir.trim()

    const cacheId = await cache.saveCache([cachePath], buildCacheKey)
    if (cacheId === -1) {
      return
    }
    actions.info(`Cache saved with the key: ${buildCacheKey}`)
  }
}

main().catch((err) => {
  console.error(err.stack)
  actions.setFailed(err.message)
  process.exit(1)
})
