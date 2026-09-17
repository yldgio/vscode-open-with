import * as assert from 'node:assert/strict';
import * as vscode from 'vscode';
import { launch } from '../../src/extension';

suite('launcher launch', () => {
  test('creates a new editor-area terminal named after the launcher with the folder as cwd', () => {
    const folder = vscode.workspace.workspaceFolders![0].uri;

    const terminal = launch({ name: 'Test Launcher', command: 'echo open-with-test' }, folder);

    assert.ok(terminal);
    try {
      assert.equal(terminal.name, 'Test Launcher');
      const options = terminal.creationOptions as vscode.TerminalOptions;
      assert.equal(options.location, vscode.TerminalLocation.Editor);
      const cwd = options.cwd;
      const cwdPath = typeof cwd === 'string' ? cwd : cwd?.fsPath;
      assert.equal(cwdPath?.toLowerCase(), folder.fsPath.toLowerCase());
    } finally {
      terminal.dispose();
    }
  });
});
