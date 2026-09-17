# Open With

## What & Why

Create a VS Code extension (`open-with`, display name **Open With**) that lets users
run named, arbitrary terminal commands from an Explorer folder's right-click menu.
This generalizes the original "Open with Copilot" idea so users can launch Copilot CLI
(including variants such as `copilot --yolo`), Codex, or other CLIs from the selected
folder without leaving VS Code.

Prior art (checked 2026-09): the closest existing extension, *Run Terminal Command*
(~500k installs), uses the same architecture but has been unmaintained since 2019 and
only opens terminals in the panel. Nothing available offers named, folder-scoped
launcher commands in a new **editor-area** terminal; the built-in *Open in Integrated
Terminal* runs no configured commands and also targets the panel.

Target: stable-compatible `engines.vscode`; VS Code Insiders is the dogfood
environment, not a hard requirement.

## Done Looks Like

- Users configure launchers as an object map `openWith.launchers` (name → command
  text) in the Settings UI (renders as an editable grid) or `settings.json`.
- User- and Workspace-scope maps merge by name; a Workspace entry overrides a User
  entry with the same name (native VS Code object-merge, no custom code).
- Right-clicking an Explorer folder — including workspace roots — shows an
  **Open With…** menu item when at least one valid launcher is configured; it is not
  shown for files or when no valid launcher exists.
- Choosing **Open With…** opens a picker listing the valid launchers by name, sorted
  alphabetically, with the command text as the detail line.
- Choosing a launcher creates and reveals a new integrated terminal in the editor
  area, named after the launcher, with the right-clicked folder as working directory,
  and runs the launcher's command as typed input.
- An optional shell override (`openWith.shellPath`, `openWith.shellArgs`,
  machine-overridable scope) replaces the default shell profile; a missing path
  produces a clear error naming the launcher.
- Invalid launcher configuration (blank name, missing/blank command) produces one
  clear error notification listing the offending names — on activation, on
  configuration change, and again on invocation — while valid launchers keep working.
- In untrusted workspaces, Workspace-scope launchers are ignored (enforced by VS Code
  via `restrictedConfigurations`); User-scope launchers remain available.

## Boundaries

- No built-in Copilot, Codex, or other launcher definitions.
- No launch action for files.
- No external system terminal or reuse of an existing terminal.
- No argument prompt or per-launcher terminal/location behavior.
- No Command Palette surface; the Explorer folder context menu is the only entry.
- No terminal-profile references by name (no such VS Code API exists); the shell
  override takes an explicit executable path.
- The extension runs configured commands; it does not install, authenticate, validate,
  or manage the target CLI.

## Decisions Record

- The feature is generalized from Copilot-specific to arbitrary named terminal
  commands.
- The Explorer menu is folder-only, and includes workspace roots.
- Launchers surface through a single static **Open With…** item plus a picker,
  because VS Code menus cannot list dynamic entries (ADR-0001).
- Launcher configuration is an object map to get native per-key scope merging
  (ADR-0002).
- Terminals are newly created and displayed in the editor area.
- Launchers are configured at User and Workspace scope (`window`-scoped setting);
  Workspace overrides User by name.
- No default launchers are provided.
- Empty configuration hides the menu item; invalid configuration yields an explicit
  error while valid launchers stay usable.
- Shell override is an explicit `shellPath`/`shellArgs` setting; the API offers no
  profile-name resolution.
- Workspace trust: `untrustedWorkspaces: "limited"` with `restrictedConfigurations`,
  so repo-controlled Workspace launchers are ignored when untrusted.
- Extension identity: id `open-with`, display name **Open With**, settings namespace
  `openWith.*`.
- Toolchain: hand-rolled minimal scaffold (TypeScript + esbuild), local VSIX for
  dogfooding, marketplace deferred.
