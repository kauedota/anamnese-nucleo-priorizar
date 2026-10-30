import { formSections } from '../src/data/formFields.js';
import { writeFileSync } from 'node:fs';
const out = formSections.map((s) => ({
  title: s.title, subtitle: s.subtitle,
  blocks: s.blocks.map((b) => ({ title: b.title, fields: b.fields.map((f) => ({ name: f.name, label: f.label, type: f.type })) })),
}));
writeFileSync(process.argv[2], JSON.stringify(out, null, 1) + '\n', 'utf-8');
console.log('secoes', out.length, 'campos', out.flatMap(s=>s.blocks).flatMap(b=>b.fields).length);
