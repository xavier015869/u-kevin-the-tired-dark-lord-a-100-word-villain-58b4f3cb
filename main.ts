import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Tired Dark Lord: a 100-word villain monologue.
// The tiredness lives in the pauses, the trailing off and the small
// deflections — never in a plain statement that he is weary.
const MONOLOGUE = `Come in, hero. Mind the— ...the steps. Third one sticks. I've meant to have it fixed for... oh, three hundred years. Sit. No, not the throne. That one's mine, and the cushion's gone flat. You want the sword, the crown, the whole little ceremony? It's in the vault. Second shelf. Beside the tax ledgers — yes, I do them. Someone has to. The ravens bring me the reports at dawn, and it keeps coming earlier. Anyway. Your destiny awaits. Just... one more minute by the fire. Then you can slay me, and I'll finally get some— ...go on. I'm listening.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate check, done here so a bad build fails loudly instead of
// silently submitting an invalid text: 1-600 chars, about 100 words.
const words = MONOLOGUE.trim().split(/\s+/).length;
if (MONOLOGUE.length < 1 || MONOLOGUE.length > 600) {
  throw new Error(`entry.txt must be 1-600 characters, got ${MONOLOGUE.length}`);
}
if (words < 95 || words > 105) {
  throw new Error(`monologue must be about 100 words, got ${words}`);
}
writeFileSync(join(outDir, "entry.txt"), MONOLOGUE, "utf8");
console.log(`wrote entry.txt: ${words} words, ${MONOLOGUE.length} chars`);
