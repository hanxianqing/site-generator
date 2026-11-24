// Driver: read the case, run it, write the answers.
import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { run } from './solve.js';

const inputDir = process.env.MAKEFUN_INPUT_DIR || '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8'));
const answers = {};
for (const c of cases) {
  const output = run(c.input);
  for (const [path, text] of Object.entries(output)) {
    const dest = join(outputDir, path);
    mkdirSync(dest.slice(0, dest.length - path.length), { recursive: true });
    writeFileSync(dest, text, 'utf8');
  }
  const entries = Object.entries(output);
  answers[c.id] = {
    files: Object.fromEntries(entries.map(([k, v]) => [k, v])),
    count: entries.length,
  };
}
writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers), 'utf8');
