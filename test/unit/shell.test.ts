import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveShell } from '../../src/shell';

test('uses the default shell profile when no override is configured', () => {
  assert.deepStrictEqual(resolveShell(undefined, undefined), { ok: true, options: {} });
});

test('passes through an existing shell path with its args', () => {
  const result = resolveShell(process.execPath, ['-e', 'console.log(1)']);
  assert.deepStrictEqual(result, {
    ok: true,
    options: { shellPath: process.execPath, shellArgs: ['-e', 'console.log(1)'] },
  });
});

test('defaults shell args to empty when only a path is configured', () => {
  const result = resolveShell(process.execPath, undefined);
  assert.deepStrictEqual(result, {
    ok: true,
    options: { shellPath: process.execPath, shellArgs: [] },
  });
});

test('rejects a shell path that does not exist', () => {
  const missing = 'C:\\definitely\\missing\\open-with-shell.exe';
  const result = resolveShell(missing, []);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /open-with-shell\.exe/);
    assert.match(result.error, /openWith\.shellPath/);
  }
});
