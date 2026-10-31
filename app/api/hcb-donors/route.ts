import { NextResponse } from "next/server";

// HCB's donation page publishes its own donor rankings. The public
// transactions API does not expose the donor identities and privacy settings
// needed to reproduce those rankings safely.
const HCB_DONATION_PAGE =
  "https://hcb.hackclub.com/donations/start/openbyte-non-profit";

type PublicDonor = {
  name: string;
  amount_cents: number;
  rank: number;
};

function decodeHtml(text: string) {
  const entities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    "#39": "'",
  };

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      const normalized = entity.toLowerCase();
      if (entities[normalized]) return entities[normalized];
      if (normalized.startsWith("#")) {
        const hexadecimal = normalized.startsWith("#x");
        const codePoint = Number.parseInt(
          normalized.slice(hexadecimal ? 2 : 1),
          hexadecimal ? 16 : 10,
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

function parseAmountCents(text: string): number | null {
  const match = text.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(amount) && amount > 0
    ? Math.round(amount * 100)
    : null;
}

function parseTopDonors(html: string): PublicDonor[] {
  const heading = /<h2\b[^>]*>\s*Top donors\s*<\/h2>/i.exec(html);
  if (!heading) return [];

  // Only inspect content after HCB's "Top donors" heading, not arbitrary
  // financial transactions elsewhere on the page.
  const section = html.slice(heading.index + heading[0].length);
  const donors = new Map<number, PublicDonor>();
  const podiumRanks: Record<string, number> = {
    first: 1,
    second: 2,
    third: 3,
  };

  // HCB renders podium positions in visual order: second, first, third.
  const podium = /<div\b[^>]*class=(["'])[^"']*\bpodium-block--(first|second|third)\b[^"']*\1[^>]*>([\s\S]*?)<\/div>/gi;
  for (const match of section.matchAll(podium)) {
    const paragraphs = Array.from(
      match[3].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi),
      (paragraph) => decodeHtml(paragraph[1]),
    );
    const amount_cents = parseAmountCents(paragraphs[1] ?? "");
    const name = paragraphs[0];
    if (name && amount_cents !== null) {
      const rank = podiumRanks[match[2].toLowerCase()];
      donors.set(rank, { name, amount_cents, rank });
    }
  }

  // Additional public donors appear beneath the three podium positions.
  const rankedCards = /<div\b[^>]*class=(["'])[^"']*\bcard\b[^"']*\bbg-gray-100\b[^"']*\1[^>]*>([\s\S]*?)<\/div>/gi;
  for (const match of section.matchAll(rankedCards)) {
    const spans = Array.from(
      match[2].matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi),
      (span) => decodeHtml(span[1]),
    );
    if (spans.length < 3) continue;
    const rank = Number(spans[0].replace(/^#/, ""));
    const name = spans[1];
    const amount_cents = parseAmountCents(spans[2]);
    if (Number.isInteger(rank) && rank >= 4 && rank <= 10 && name && amount_cents !== null) {
      donors.set(rank, { name, amount_cents, rank });
    }
  }

  return Array.from(donors.values()).sort((a, b) => a.rank - b.rank);
}

export async function GET() {
  try {
    const response = await fetch(HCB_DONATION_PAGE, {
      headers: { Accept: "text/html" },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("HCB donation page unavailable");

    const donors = parseTopDonors(await response.text());
    if (donors.length === 0) throw new Error("HCB public leaderboard unavailable");

    return NextResponse.json({ donors });
  } catch {
    // Never substitute transaction descriptions or private donor details.
    return NextResponse.json(
      { donors: [], error: "HCB's public donor leaderboard is unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
