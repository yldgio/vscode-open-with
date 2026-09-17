import * as assert from 'node:assert/strict';
import * as vscode from 'vscode';

suite('launcher configuration scope merge', () => {
  const config = () => vscode.workspace.getConfiguration('openWith');

  suiteTeardown(async () => {
    await config().update('launchers', undefined, vscode.ConfigurationTarget.Global);
    await config().update('launchers', undefined, vscode.ConfigurationTarget.Workspace);
  });

  test('workspace entries extend and override user entries by name', async () => {
    await config().update('launchers', { Alpha: 'echo a', Beta: 'echo b' }, vscode.ConfigurationTarget.Global);
    await config().update('launchers', { Beta: 'echo bw', Gamma: 'echo c' }, vscode.ConfigurationTarget.Workspace);

    assert.deepStrictEqual(config().get('launchers'), {
      Alpha: 'echo a',
      Beta: 'echo bw',
      Gamma: 'echo c',
    });
  });
});
