const assert = require('assert').strict
const {
  resolveCommit,
  resolveVersion
} = require('./versions')

async function test () {
  assert.deepEqual(resolveCommit('x64', 'linux', '0.6.0+4b48fccad'), {
    downloadUrl: 'https://ziglang.org/builds/zig-linux-x86_64-0.6.0+4b48fccad.tar.xz',
    variantName: 'zig-linux-x86_64-0.6.0+4b48fccad',
    version: '0.6.0+4b48fccad'
  })
  assert.deepEqual(resolveCommit('x64', 'win32', '0.6.0+4b48fccad'), {
    downloadUrl: 'https://ziglang.org/builds/zig-windows-x86_64-0.6.0+4b48fccad.zip',
    variantName: 'zig-windows-x86_64-0.6.0+4b48fccad',
    version: '0.6.0+4b48fccad'
  })

  assert.deepEqual(await resolveVersion('x64', 'linux', '0.7.0'), {
    downloadUrl: 'https://ziglang.org/download/0.7.0/zig-linux-x86_64-0.7.0.tar.xz',
    variantName: 'zig-linux-x86_64-0.7.0',
    version: '0.7.0'
  })
  assert.deepEqual(await resolveVersion('x64', 'win32', '0.4.0'), {
    downloadUrl: 'https://ziglang.org/download/0.4.0/zig-windows-x86_64-0.4.0.zip',
    variantName: 'zig-windows-x86_64-0.4.0',
    version: '0.4.0'
  })
  assert.deepEqual(await resolveVersion('arm64', 'darwin', '0.11.0'), {
    downloadUrl: 'https://ziglang.org/download/0.11.0/zig-macos-aarch64-0.11.0.tar.xz',
    variantName: 'zig-macos-aarch64-0.11.0',
    version: '0.11.0'
  })
  await assert.doesNotReject(resolveVersion('x64', 'linux', 'master'))
  await assert.doesNotReject(resolveVersion('x64', 'win32', 'master'))
  await assert.doesNotReject(resolveVersion('arm64', 'darwin', 'master'))
}

test().catch((error) => {
  console.error(error.stack)
  process.exit(1)
})
