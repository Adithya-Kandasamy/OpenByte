import assert from "node:assert/strict";
import test from "node:test";
import { parseTopDonors } from "./update-hcb-donors.mjs";

test("parses HCB's podium in ranked order, not visual order", () => {
  const html = [
    '<h2 class="mt-0">Top donors</h2>',
    '<div class="podium-block podium-block--second">',
    "<h3>Silver</h3><p>John doe</p><p>$20.00</p></div>",
    '<div class="podium-block podium-block--first">',
    "<h3>Gold</h3><p>Chitra Bhandare</p><p>$268.82</p></div>",
    '<div class="podium-block podium-block--third">',
    "<h3>Bronze</h3><p>Ahamed</p><p>$2.00</p></div>",
    '<div class="card shadow-none bg-gray-100 mt-2 flex items-center gap-3 py-2">',
    "<span>#4</span><span>A &amp; B</span><span>$1,045.15</span></div>",
  ].join("");

  assert.deepEqual(parseTopDonors(html), [
    { rank: 1, name: "Chitra Bhandare", amount_cents: 26882 },
    { rank: 2, name: "John doe", amount_cents: 2000 },
    { rank: 3, name: "Ahamed", amount_cents: 200 },
    { rank: 4, name: "A & B", amount_cents: 104515 },
  ]);
});

test("never guesses donor identities from transaction data", () => {
  const html = '<h2>Transactions</h2><div>Anonymous $268.82</div>';
  assert.deepEqual(parseTopDonors(html), []);
});
