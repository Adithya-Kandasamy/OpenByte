"use client";

import { useEffect, useMemo, useState } from "react";

const HCB_SLUG = "openbyte-non-profit";
const GOAL = 500;
const REFRESH_INTERVAL = 60_000;

type HcbTransaction = {
  amount_cents?: number;
  memo?: string;
  type?: string;
  tag?: string;
  donor_name?: string;
  description?: string;
};

type TrackerState = {
  donations: HcbTransaction[];
  loading: boolean;
  error: string | null;
};

function isDonation(transaction: HcbTransaction) {
  const amountCents = transaction.amount_cents ?? 0;
  const memo = (transaction.memo ?? "").toLowerCase();
  const type = (transaction.type ?? "").toLowerCase();

  return (
    amountCents > 0 &&
    (type === "donation" ||
      type.includes("donat") ||
      memo.includes("donat") ||
      transaction.tag === "donation")
  );
}

async function fetchHcbDonations(signal: AbortSignal) {
  const allTransactions: HcbTransaction[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(
      `https://hcb.hackclub.com/api/v3/organizations/${HCB_SLUG}/transactions?per_page=100&page=${page}`,
      { signal },
    );

    if (!response.ok) {
      throw new Error(`HCB API error: ${response.status}`);
    }

    const data: unknown = await response.json();
    const transactions = Array.isArray(data) ? data : [];

    if (transactions.length === 0) break;

    allTransactions.push(...(transactions as HcbTransaction[]));
    if (transactions.length < 100) break;
  }

  return allTransactions.filter(isDonation);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function displayName(transaction: HcbTransaction) {
  return transaction.donor_name || transaction.description || "Anonymous";
}

function LiveStatus({ error }: { error: string | null }) {
  return (
    <p className={`live-status${error ? " is-error" : ""}`}>
      <span className="live-dot" aria-hidden="true" />
      {error ? "Tracker unavailable" : "Live from Hack Club Bank"}
    </p>
  );
}

function TrackerTabs({
  activeTab,
  onChange,
}: {
  activeTab: "total" | "leaderboard";
  onChange: (tab: "total" | "leaderboard") => void;
}) {
  return (
    <div className="tracker-tabs" role="tablist" aria-label="Donation details">
      <button
        className={activeTab === "total" ? "is-active" : ""}
        onClick={() => onChange("total")}
        role="tab"
        aria-selected={activeTab === "total"}
        type="button"
      >
        Total raised
      </button>
      <button
        className={activeTab === "leaderboard" ? "is-active" : ""}
        onClick={() => onChange("leaderboard")}
        role="tab"
        aria-selected={activeTab === "leaderboard"}
        type="button"
      >
        Leaderboard
      </button>
    </div>
  );
}

function Leaderboard({
  donations,
  loading,
  error,
}: {
  donations: HcbTransaction[];
  loading: boolean;
  error: string | null;
}) {
  const rankedDonations = useMemo(
    () =>
      [...donations]
        .sort((a, b) => (b.amount_cents ?? 0) - (a.amount_cents ?? 0))
        .slice(0, 10),
    [donations],
  );
  const largestDonation = rankedDonations[0]?.amount_cents ?? 1;

  if (loading) {
    return (
      <div className="leaderboard-list" aria-label="Loading leaderboard">
        {[1, 2, 3, 4].map((item) => (
          <div className="leaderboard-skeleton" key={item} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-empty">
        <strong>We can&apos;t load the leaderboard right now.</strong>
        <span>Check back soon for the latest donor list.</span>
      </div>
    );
  }

  if (rankedDonations.length === 0) {
    return (
      <div className="leaderboard-empty">
        <strong>No donations have been recorded yet.</strong>
        <span>New donations will appear here automatically.</span>
      </div>
    );
  }

  return (
    <ol className="leaderboard-list" aria-label="Top donations">
      {rankedDonations.map((donation, index) => {
        const amountCents = donation.amount_cents ?? 0;
        const barWidth = Math.max(
          20,
          Math.round((amountCents / largestDonation) * 100),
        );
        const rank = index + 1;
        const rankClass = rank <= 3 ? ` rank-${rank}` : "";

        return (
          <li className="leaderboard-row" key={`${displayName(donation)}-${rank}`}>
            <span className={`leaderboard-rank${rankClass}`}>{rank}</span>
            <span className="leaderboard-donor">{displayName(donation)}</span>
            <span className="leaderboard-amount">
              {formatCurrency(amountCents / 100)}
            </span>
            <span className="leaderboard-bar" aria-hidden="true">
              <span style={{ width: `${barWidth}%` }} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function DonationTracker() {
  const [activeTab, setActiveTab] = useState<"total" | "leaderboard">("total");
  const [state, setState] = useState<TrackerState>({
    donations: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    let controller = new AbortController();

    const loadDonations = async (initialLoad = false) => {
      if (initialLoad) {
        setState((current) => ({ ...current, loading: true, error: null }));
      }

      try {
        const donations = await fetchHcbDonations(controller.signal);
        if (!mounted) return;
        setState({ donations, loading: false, error: null });
      } catch (error) {
        if (!mounted || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
        console.warn("HCB tracker error:", error);
        setState((current) => ({
          ...current,
          loading: false,
          error:
            "Transparency Mode may not be enabled yet. Enable it in HCB settings to show live data.",
        }));
      }
    };

    void loadDonations(true);
    const interval = window.setInterval(() => {
      controller.abort();
      controller = new AbortController();
      void loadDonations();
    }, REFRESH_INTERVAL);

    return () => {
      mounted = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  const totalRaised = state.donations.reduce(
    (sum, donation) => sum + (donation.amount_cents ?? 0),
    0,
  ) / 100;
  const progress = Math.min(Math.round((totalRaised / GOAL) * 100), 100);

  return (
    <aside className="tracker-card" aria-label="OpenByte donation tracker">
      <div className="tracker-intro">
        <span className="tracker-label">Live donation data</span>
        <h2>Community funding</h2>
        <p>
          Totals and individual donations are loaded directly from OpenByte&apos;s
          Hack Club Bank account.
        </p>
      </div>

      <TrackerTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "total" ? (
        <div className="tracker-panel" role="tabpanel">
          <LiveStatus error={state.error} />
          <div className="raised-value" aria-live="polite">
            <span>$</span>
            {state.loading ? "—" : totalRaised.toFixed(2)}
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${state.loading ? 0 : progress}%` }} />
          </div>
          <div className="progress-meta">
            <span>{state.loading ? "Loading" : `${progress}% funded`}</span>
            <span>Goal: $500</span>
          </div>
          <div className="donor-count">
            <strong>{state.loading ? "—" : state.donations.length}</strong>
            <span>donations received</span>
          </div>
          {state.error ? <p className="tracker-error">{state.error}</p> : null}
        </div>
      ) : (
        <div className="tracker-panel" role="tabpanel">
          <LiveStatus error={state.error} />
          <div className="leaderboard-heading">
            <div>
              <span className="tracker-label">Top donations</span>
              <p>Donor names appear when they are provided by HCB.</p>
            </div>
            <span className="leaderboard-count">Top 10</span>
          </div>
          <Leaderboard
            donations={state.donations}
            loading={state.loading}
            error={state.error}
          />
        </div>
      )}
    </aside>
  );
}
