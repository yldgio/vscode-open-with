# Open With

A VS Code extension that runs named, user-configured terminal commands from an Explorer folder's right-click menu.

## Language

**Launcher**:
A named terminal command the user configures: a menu label (the name) plus command text (e.g., `copilot --yolo`). Launchers exist at User or Workspace scope.
_Avoid_: command (overloaded), task, profile

**Valid Launcher**:
A Launcher whose name is non-blank and whose command text is a non-blank string. Only valid launchers are offered; invalid ones produce an explicit error.
_Avoid_: enabled launcher, active launcher

**Open With**:
The single Explorer context-menu entry contributed by the extension, shown on folders (including workspace roots) when at least one valid launcher is configured. Choosing it opens a picker listing the valid launchers.
_Avoid_: Open With submenu (superseded: menus cannot list dynamic entries)

**Shell Override**:
Optional extension settings (`openWith.shellPath`, `openWith.shellArgs`) that replace the default terminal shell profile for launched terminals. References an executable directly, never a VS Code terminal profile by name.
_Avoid_: shell profile setting
