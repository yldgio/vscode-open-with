import { existsSync } from 'node:fs';

export interface ShellOptions {
  shellPath?: string;
  shellArgs?: string[];
}

export type ShellResult =
  | { ok: true; options: ShellOptions }
  | { ok: false; error: string };

export function resolveShell(shellPath?: string, shellArgs?: string[]): ShellResult {
  if (!shellPath) {
    return { ok: true, options: {} };
  }
  if (!existsSync(shellPath)) {
    return { ok: false, error: `shell '${shellPath}' does not exist (openWith.shellPath)` };
  }
  return { ok: true, options: { shellPath, shellArgs: shellArgs ?? [] } };
}
