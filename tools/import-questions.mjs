/**
 * Import questions from quizData.js into Supabase.
 *
 * Usage:
 *   node tools/import-questions.mjs
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_KEY env vars
 * (use service role key for bypassing RLS).
 */
import { createClient } from '@supabase/supabase-js';
import { quizData } from '../src/data/quizData.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// SSUAP questions with ids 1-100 are the free quiz
const FREE_100_IDS = new Set(
  quizData
    .filter((q) => q.theme === 'SSUAP')
    .slice(0, 100)
    .map((q) => q.id)
);

async function main() {
  console.log(`Importing ${quizData.length} questions...`);

  const rows = quizData.map((q) => ({
    theme: q.theme,
    difficulty: q.difficulty || 'medium',
    tags: q.tags || [],
    question: q.question,
    answers: q.answers, // JSONB — array of strings
    correct_answer: q.correctAnswer,
    explanation: q.explanation || null,
    resource_url: q.resourceUrl || null,
    is_premium: !FREE_100_IDS.has(q.id),
    is_free_100: FREE_100_IDS.has(q.id),
    active: true,
  }));

  // Insert in batches of 100
  const BATCH = 100;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase.from('questions').insert(batch);
    if (error) {
      console.error(`Error at batch ${i}:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`  ${inserted} / ${rows.length}`);
  }

  console.log(`Done — ${inserted} questions imported.`);
  console.log(`  Free 100 SSUAP: ${FREE_100_IDS.size} questions`);
  console.log(`  Premium: ${rows.length - FREE_100_IDS.size} questions`);
}

main();
