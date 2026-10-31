"use client";

import { useEffect, useState } from "react";

const HCB_SLUG = "openbyte-non-profit";
const HCB_DONATION_URL =
  "https://hcb.hackclub.com/donations/start/openbyte-non-profit";
const GOAL = 5000;
const REFRESH_INTERVAL = 60_000;

type HcbTransaction = {
  amount_cents?: number;
  memo?: string;
  type?: string;
  tag?: string;
};

type TrackerState = {
  donations: HcbTransaction[];
  loading: boolean;
  error: string | null;
};

type PublicDonor = {
  name: string;
  amount_cents: number;
  rank: number;
};

type LeaderboardState = {
  donors: PublicDonor[];
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
  donors,
  loading,
  error,
}: {
  donors: PublicDonor[];
  loading: boolean;
  error: string | null;
}) {
  const largestDonation = donors[0]?.amount_cents ?? 1;

  if (loading) {
    return (
      <div className="leaderboard-list" aria-label="Loading leaderboard">
        {[1, 2, 3, 4].map((item) => (
          <div className="leaderboard-skeleton" key={item} />
        ))}
      </div>
    );
  }

  if (error || donors.length === 0) {
    return (
      <div className="leaderboard-empty">
        <strong>HCB's public donor rankings aren't available right now.</strong>
        <span>View the official rankings on Hack Club Bank instead.</span>
        <a href={HCB_DONATION_URL} target="_blank" rel="noopener noreferrer">
          View HCB donor leaderboard
        </a>
      </div>
    );
  }

  return (
    <ol className="leaderboard-list" aria-label="Top public donors">
      {donors.map((donor) => {
        const barWidth = Math.max(
          20,
          Math.round((donor.amount_cents / largestDonation) * 100),
        );
        const rankClass = donor.rank <= 3 ? ` rank-${donor.rank}` : "";

        return (
          <li className="leaderboard-row" key={donor.rank}>
            <span className={`leaderboard-rank${rankClass}`}>{donor.rank}</span>
            <span className="leaderboard-donor">{donor.name}</span>
            <span className="leaderboard-amount">
              {formatCurrency(donor.amount_cents / 100)}
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
  const [leaderboardState, setLeaderboardState] = useState<LeaderboardState>({
    donors: [],
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

  useEffect(() => {
    let mounted = true;
    let controller = new AbortController();

    const loadLeaderboard = async () => {
      try {
        const response = await fetch("/api/hcb-donors", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Public HCB leaderboard unavailable");

        const data: unknown = await response.json();
        if (
          !data ||
          typeof data !== "object" ||
          !("donors" in data) ||
          !Array.isArray(data.donors)
        ) {
          throw new Error("Unexpected HCB leaderboard response");
        }
        const donors = data.donors as PublicDonor[];
        if (
          donors.length === 0 ||
          !donors.every(
            (donor) =>
              typeof donor.name === "string" &&
              Number.isSafeInteger(donor.amount_cents) &&
              Number.isInteger(donor.rank),
          )
        ) {
          throw new Error("Invalid HCB donor rankings");
        }

        if (mounted) setLeaderboardState({ donors, loading: false, error: null });
      } catch (error) {
        if (!mounted || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
        setLeaderboardState({
          donors: [],
          loading: false,
          error: "HCB's public donor rankings are temporarily unavailable.",
        });
      }
    };

    void loadLeaderboard();
    const interval = window.setInterval(() => {
      controller.abort();
      controller = new AbortController();
      void loadLeaderboard();
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
          Donation totals come from HCB transactions. Public donor rankings
          come from HCB&apos;s donation page.
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
            <span>Goal: {formatCurrency(GOAL)}</span>
          </div>
          <div className="donor-count">
            <strong>{state.loading ? "—" : state.donations.length}</strong>
            <span>donations received</span>
          </div>
          {state.error ? <p className="tracker-error">{state.error}</p> : null}
        </div>
      ) : (
        <div className="tracker-panel" role="tabpanel">
          <LiveStatus error={leaderboardState.error} />
          <div className="leaderboard-heading">
            <div>
              <span className="tracker-label">Top donors</span>
              <p>Names and combined donations are published by HCB; anonymous donors are excluded.</p>
            </div>
            <span className="leaderboard-count">
              {leaderboardState.donors.length
                ? `Top ${leaderboardState.donors.length}`
                : "HCB donors"}
            </span>
          </div>
          <Leaderboard
            donors={leaderboardState.donors}
            loading={leaderboardState.loading}
            error={leaderboardState.error}
          />
        </div>
      )}
    </aside>
  );
}
