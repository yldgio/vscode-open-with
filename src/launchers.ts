export interface Launcher {
  name: string;
  command: string;
}

export interface ParseResult {
  valid: Launcher[];
  invalid: string[];
}

export function parseLaunchers(raw: unknown): ParseResult {
  if (raw === undefined || raw === null) {
    return { valid: [], invalid: [] };
  }
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    return { valid: [], invalid: ['openWith.launchers'] };
  }
  const valid: Launcher[] = [];
  const invalid: string[] = [];
  for (const [name, command] of Object.entries(raw)) {
    if (name.trim() && typeof command === 'string' && command.trim()) {
      valid.push({ name, command });
    } else {
      invalid.push(name);
    }
  }
  valid.sort((a, b) => a.name.localeCompare(b.name));
  return { valid, invalid };
}
