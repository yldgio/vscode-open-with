export interface ShellOptions {
  shellPath?: string;
  shellArgs?: string[];
}

export type ShellResult =
  | { ok: true; options: ShellOptions }
  | { ok: false; error: string };

export function resolveShell(_shellPath?: string, _shellArgs?: string[]): ShellResult {
  throw new Error('not implemented');
}
