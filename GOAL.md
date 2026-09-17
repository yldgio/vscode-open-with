# Open With Terminal Command

## What & Why

Create a VS Code Insiders extension that lets users run named, arbitrary terminal
commands from an Explorer folder's right-click menu. This generalizes the original
"Open with Copilot" idea so users can launch Copilot CLI (including variants such
as `copilot --yolo`), Codex, or other CLIs from the selected folder without leaving
VS Code.

## Done Looks Like

- Users configure named launchers (a menu label and command text) in the extension's
  Settings UI.
- User- and Workspace-scope launcher lists merge by name; a Workspace entry overrides
  a User entry with the same name.
- Right-clicking an Explorer folder exposes an **Open With** submenu containing valid
  configured launchers; it is not shown for files or when no valid launcher is
  configured.
- Choosing a launcher creates and reveals a new integrated terminal in the
  editor/main area, uses the selected folder as its working directory, and runs that
  launcher's command.
- Invalid launcher configuration produces a clear VS Code error rather than being
  ignored.

## Boundaries

- No built-in Copilot, Codex, or other launcher definitions.
- No launch action for files or the workspace root.
- No external system terminal or reuse of an existing terminal.
- No argument prompt or per-launcher terminal/location behavior.
- The extension runs configured commands; it does not install, authenticate, validate,
  or manage the target CLI.

## Decisions Record

- The feature is generalized from Copilot-specific to arbitrary named terminal
  commands.
- The Explorer menu is folder-only.
- Commands are grouped in an **Open With** submenu.
- Terminals are newly created and displayed in the editor/main area.
- Settings UI manages launchers at User and Workspace scope.
- Workspace launchers override User launchers with the same name.
- No default launchers are provided.
- Empty configuration hides the submenu; invalid configuration must yield an explicit
  error.
