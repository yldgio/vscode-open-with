import * as vscode from 'vscode';
import { Launcher, parseLaunchers } from './launchers';
import { resolveShell } from './shell';

export function activate(context: vscode.ExtensionContext): void {
  refresh();
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('openWith.launchers')) {
        refresh();
      }
    }),
    vscode.commands.registerCommand('openWith.openWith', openWith),
  );
}

export function deactivate(): void {}

function refresh(): void {
  const { valid, invalid } = readLaunchers();
  void vscode.commands.executeCommand('setContext', 'openWith.hasLaunchers', valid.length > 0);
  notifyInvalid(invalid);
}

function readLaunchers(): ReturnType<typeof parseLaunchers> {
  return parseLaunchers(vscode.workspace.getConfiguration('openWith').get('launchers'));
}

function notifyInvalid(invalid: string[]): void {
  if (invalid.length > 0) {
    void vscode.window.showErrorMessage(
      `Open With: invalid launcher configuration (${invalid.map((name) => JSON.stringify(name)).join(', ')}). Fix the openWith.launchers setting.`,
    );
  }
}

async function openWith(uri?: vscode.Uri): Promise<void> {
  if (!uri) {
    void vscode.window.showErrorMessage('Open With: right-click an Explorer folder to use this command.');
    return;
  }
  const { valid, invalid } = readLaunchers();
  notifyInvalid(invalid);
  if (valid.length === 0) {
    return;
  }
  const picked = await vscode.window.showQuickPick(
    valid.map((launcher) => ({ label: launcher.name, detail: launcher.command, launcher })),
    { placeHolder: `Run in a new terminal at ${uri.fsPath}` },
  );
  if (picked) {
    launch(picked.launcher, uri);
  }
}

export function launch(launcher: Launcher, folder: vscode.Uri): vscode.Terminal | undefined {
  const config = vscode.workspace.getConfiguration('openWith');
  const shell = resolveShell(config.get<string>('shellPath') ?? undefined, config.get<string[]>('shellArgs'));
  if (!shell.ok) {
    void vscode.window.showErrorMessage(`Open With: cannot run '${launcher.name}': ${shell.error}`);
    return undefined;
  }
  const terminal = vscode.window.createTerminal({
    name: launcher.name,
    cwd: folder,
    location: vscode.TerminalLocation.Editor,
    ...shell.options,
  });
  terminal.show();
  terminal.sendText(launcher.command, true);
  return terminal;
}
