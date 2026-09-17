# Changelog

## 0.0.1

- Explorer folder context menu entry **Open With…** (folders and workspace roots,
  hidden when no valid launcher is configured) opens a picker of configured launchers.
- `openWith.launchers` object map (name → command text); Workspace entries override
  User entries by name.
- Launching creates a new editor-area terminal named after the launcher, with the
  clicked folder as working directory, running the launcher's command.
- Invalid launcher entries produce an explicit error; valid entries keep working.
- Optional `openWith.shellPath` / `openWith.shellArgs` shell override.
- Workspace-trust support: Workspace-scope values are ignored in untrusted
  workspaces.
