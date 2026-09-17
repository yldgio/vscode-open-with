import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLaunchers } from '../../src/launchers';

test('treats undefined or null config as empty, not invalid', () => {
  assert.deepStrictEqual(parseLaunchers(undefined), { valid: [], invalid: [] });
  assert.deepStrictEqual(parseLaunchers(null), { valid: [], invalid: [] });
});

test('treats an empty map as empty, not invalid', () => {
  assert.deepStrictEqual(parseLaunchers({}), { valid: [], invalid: [] });
});

test('parses a valid launcher map sorted alphabetically by name', () => {
  const result = parseLaunchers({
    'Zebra': 'zebra --run',
    'Copilot': 'copilot',
    'Copilot YOLO': 'copilot --yolo',
  });
  assert.deepStrictEqual(result, {
    valid: [
      { name: 'Copilot', command: 'copilot' },
      { name: 'Copilot YOLO', command: 'copilot --yolo' },
      { name: 'Zebra', command: 'zebra --run' },
    ],
    invalid: [],
  });
});

test('marks a launcher with a blank name invalid', () => {
  const result = parseLaunchers({ '   ': 'copilot' });
  assert.deepStrictEqual(result.valid, []);
  assert.deepStrictEqual(result.invalid, ['   ']);
});

test('marks a launcher with a non-string command invalid', () => {
  const result = parseLaunchers({ Copilot: 42 });
  assert.deepStrictEqual(result.valid, []);
  assert.deepStrictEqual(result.invalid, ['Copilot']);
});

test('marks a launcher with a blank command invalid', () => {
  const result = parseLaunchers({ Copilot: '  ' });
  assert.deepStrictEqual(result.valid, []);
  assert.deepStrictEqual(result.invalid, ['Copilot']);
});

test('keeps valid launchers when others are invalid', () => {
  const result = parseLaunchers({ Good: 'echo ok', Bad: '' });
  assert.deepStrictEqual(result.valid, [{ name: 'Good', command: 'echo ok' }]);
  assert.deepStrictEqual(result.invalid, ['Bad']);
});

test('marks a non-object config as an invalid setting', () => {
  for (const raw of [['a'], 'copilot', 42]) {
    const result = parseLaunchers(raw);
    assert.deepStrictEqual(result.valid, []);
    assert.deepStrictEqual(result.invalid, ['openWith.launchers']);
  }
});
