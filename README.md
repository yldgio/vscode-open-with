# Open With

Run named, user-configured terminal commands from an Explorer folder's right-click
menu: launch Copilot CLI (`copilot --yolo`), Codex, or any other CLI in a new
editor-area terminal with the clicked folder as its working directory.

## Usage

1. Configure launchers (Settings UI grid or `settings.json`):

   ```jsonc
   {
     "openWith.launchers": {
       "Copilot": "copilot",
       "Copilot YOLO": "copilot --yolo"
     }
   }
   ```

   Workspace values merge with User values by name; a Workspace entry overrides a
   User entry with the same name.

2. Right-click a folder in the Explorer (workspace roots included) and choose
   **Open With…**, then pick a launcher. A new terminal opens in the editor area,
   named after the launcher, with the folder as its working directory, and the
   command runs.

Invalid launcher entries (blank name, missing or blank command) produce an explicit
error; valid entries keep working. The menu item hides when no valid launcher exists.

## Settings

| Setting | Description |
| --- | --- |
| `openWith.launchers` | Object map of launcher name → command text. |
| `openWith.shellPath` | Optional shell executable replacing the default shell profile. |
| `openWith.shellArgs` | Optional arguments for `openWith.shellPath`. |

In untrusted workspaces, Workspace-scope launchers and shell override values are
ignored (enforced by VS Code).

## Development

- `npm run compile` — bundle the extension with esbuild.
- `npm run watch` — rebuild on change (use with the **Run Extension** launch config).
- `npm run test:unit` — unit tests (`node:test`).
- `npm run test:integration` — extension-host tests (`@vscode/test-electron`, mocha).
- `npm run package` — build a local VSIX with vsce.
