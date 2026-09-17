# Launcher configuration as an object map

`openWith.launchers` is an object map of launcher name → command text, not an array of
`{ name, command }` records.

VS Code's configuration service deep-merges object settings key-by-key across scopes
(`mergeContents` in `configurationModels.ts`), so Workspace entries extend and
override User entries by name natively — exactly the merge semantics in the GOAL.
Arrays are replaced wholesale across scopes, which would require a hand-rolled
by-name merge plus duplicate-name handling. The flat string→string map also renders
as an editable grid in the Settings UI, while an array of records would be JSON-only
editing.
