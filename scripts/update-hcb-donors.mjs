import { writeFile } from "node:fs/promises";

const source = "https://hcb.hackclub.com/donations/start/openbyte-non-profit";
const destination = new URL("../public/hcb-donors.json", import.meta.url);

// HCB itself groups tax-deductible, non-anonymous gifts by donor email,
// excludes refunded gifts, and publishes only names opted into public display.
// Do not reconstruct this ranking from public transaction descriptions.
function decodeHtml(text) {
  const entities = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'",
  };
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
      const normalized = entity.toLowerCase();
      if (Object.hasOwn(entities, normalized)) return entities[normalized];
      if (normalized.startsWith("#")) {
        const hexadecimal = normalized.startsWith("#x");
        const codePoint = Number.parseInt(
          normalized.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10,
        );
        if (Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff) {
          return String.fromCodePoint(codePoint);
        }
      }
      return match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function amountCents(text) {
  const match = text.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
  if (!match) return null;
  const value = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? Math.round(value * 100) : null;
}

export function parseTopDonors(html) {
  const heading = /<h2\b[^>]*>\s*Top donors\s*<\/h2>/i.exec(html);
  if (!heading) return [];

  const section = html.slice(heading.index + heading[0].length);
  const donors = new Map();
  const ranks = { first: 1, second: 2, third: 3 };

  // HCB lays out the podium in visual order: second, first, third.
  const podium = /<div\b[^>]*class=(["'])[^"']*\bpodium-block--(first|second|third)\b[^"']*\1[^>]*>([\s\S]*?)<\/div>/gi;
  for (const match of section.matchAll(podium)) {
    const paragraphs = Array.from(
      match[3].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi),
      (paragraph) => decodeHtml(paragraph[1]),
    );
    const rank = ranks[match[2].toLowerCase()];
    const name = paragraphs[0];
    const amount_cents = amountCents(paragraphs[1] ?? "");
    if (name && amount_cents !== null) {
      donors.set(rank, { rank, name, amount_cents });
    }
  }

  // Additional donors are rendered as numbered cards below the podium.
  const rows = /<div\b[^>]*class=(["'])[^"']*\bcard\b[^"']*\bbg-gray-100\b[^"']*\1[^>]*>([\s\S]*?)<\/div>/gi;
  for (const match of section.matchAll(rows)) {
    const spans = Array.from(
      match[2].matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi),
      (span) => decodeHtml(span[1]),
    );
    if (spans.length < 3) continue;
    const rank = Number(spans[0].replace(/^#/, ""));
    const name = spans[1];
    const amount_cents = amountCents(spans[2]);
    if (Number.isInteger(rank) && rank >= 4 && rank <= 10 && name && amount_cents !== null) {
      donors.set(rank, { rank, name, amount_cents });
    }
  }

  return Array.from(donors.values()).sort((a, b) => a.rank - b.rank);
}

async function main() {
  let data;
  try {
    const response = await fetch(source, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("HCB returned HTTP " + response.status);
    const donors = parseTopDonors(await response.text());
    if (donors.length < 3) {
      throw new Error("HCB's public top donors section was missing or incomplete");
    }

    data = { donors, updated_at: new Date().toISOString() };
    console.log("Loaded " + donors.length + " public donors from HCB.");
  } catch (error) {
    // Do not publish made-up, stale, or private names when HCB is unavailable.
    console.warn("HCB public donor rankings unavailable:", String(error));
    data = { donors: [], updated_at: null, error: "HCB rankings unavailable" };
  }

  await writeFile(destination, JSON.stringify(data, null, 2) + "\n");
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file:").href) {
  await main();
}
