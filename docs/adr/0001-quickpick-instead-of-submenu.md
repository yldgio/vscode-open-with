# QuickPick instead of a dynamic submenu

Launchers appear in the Explorer folder context menu through one static **Open
With…** item that opens a QuickPick, not through a submenu listing launchers by name.

VS Code menus and their labels can only be contributed statically in `package.json`;
there is no finalized or proposed API for runtime menu items
([microsoft/vscode#110218](https://github.com/microsoft/vscode/issues/110218), open
since 2020). The alternatives were rewriting our own `package.json` and reloading the
window on every configuration change (works, but disruptive and fragile — no
marketplace extension ships it) and fixed generic slots (whose labels cannot show
launcher names). Every comparable extension (Run Terminal Command, Shell Launcher,
usernamehw/commands) uses the same static-entry + QuickPick pattern.
