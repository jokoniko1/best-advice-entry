import * as fs from "node:fs";

const ADVICE =
  "My grandmother said: do the hard thing first, and the rest of the day will feel like a gift.";

function validateAdvice(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error("Advice must be 1 to 200 characters.");
  }
  if (text.trim().length === 0 || text.trim() !== text) {
    throw new Error("Advice must not be only whitespace or have surrounding whitespace.");
  }
  if (!text.endsWith(".") || (text.match(/\./g) ?? []).length !== 1) {
    throw new Error("Advice must be a single sentence ending with exactly one period.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Advice must be a single line.");
  }
  if (/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u.test(text) || [...text].some((ch) => ch.codePointAt(0)! > 0xffff)) {
    throw new Error("Advice must not contain emoji.");
  }
}

validateAdvice(ADVICE);
fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", ADVICE, "utf8");
