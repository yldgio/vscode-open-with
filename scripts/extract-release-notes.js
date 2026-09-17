// Prints the CHANGELOG.md section for a version (e.g. `node extract-release-notes.js 0.0.1`),
// used by the release workflow as the GitHub release body.
const { readFileSync } = require('node:fs');

const version = process.argv[2];
const section = readFileSync('CHANGELOG.md', 'utf8')
  .split(/^## /m)
  .find((s) => s.startsWith(version));

if (!section) {
  console.error(`No CHANGELOG.md section found for version ${version}`);
  process.exit(1);
}

console.log(section.split(/\r?\n/).slice(1).join('\n').trim());
