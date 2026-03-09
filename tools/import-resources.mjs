/**
 * Import resources from resourceLinks.js into Supabase.
 *
 * Usage:
 *   node tools/import-resources.mjs
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_KEY env vars.
 */
import { createClient } from '@supabase/supabase-js';
import { resourceLinks } from '../src/data/resourceLinks.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  console.log(`Importing ${resourceLinks.length} resources...`);

  const rows = resourceLinks.map((url, i) => ({
    title: `Ressource ${i + 1}`,
    category: null,
    url,
    is_memo: false,
  }));

  const BATCH = 50;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase.from('resources').insert(batch);
    if (error) {
      console.error(`Error at batch ${i}:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`  ${inserted} / ${rows.length}`);
  }

  console.log(`Done — ${inserted} resources imported.`);
}

main();
