import { useState, useEffect } from "react";

const SCREENS = ["home", "policy", "claims"];

const workerData = {
  name: "Ravi Kumar",
  platform: "Zepto",
  zone: "Velachery, Chennai",
  weeklyEarnings: 5200,
  activeHours: "9 AM – 10 PM",
  premiumTier: "Standard",
  weeklyPremium: 95,
  maxPayout: 1000,
  coverageStart: "Mar 17, 2026",
  coverageEnd: "Mar 23, 2026",
  riskScore: 62,
  zone_risk: "Moderate (flood-prone)",
};

const claimsHistory = [
  {
    id: "CLM-0041",
    date: "Mar 14, 2026",
    trigger: "Heavy Rain",
    detail: "Rainfall 52mm/hr — Red Alert zone",
    hours: 3.5,
    payout: 280,
    status: "paid",
  },
  {
    id: "CLM-0039",
    date: "Mar 8, 2026",
    trigger: "AQI Alert",
    detail: "AQI 318 — Hazardous level",
    hours: 2,
    payout: 160,
    status: "paid",
  },
  {
    id: "CLM-0035",
    date: "Feb 28, 2026",
    trigger: "Heavy Rain",
    detail: "Rainfall 41mm/hr — zone waterlogged",
    hours: 4,
    payout: 320,
    status: "paid",
  },
];

const triggerThresholds = [
  { icon: "🌧", label: "Heavy Rain", condition: "≥ 40mm/hr for 30min", active: false },
  { icon: "🌫", label: "Severe AQI", condition: "≥ 300 for 1hr", active: false },
  { icon: "🌡", label: "Extreme Heat", condition: "≥ 42°C for 2hrs", active: false },
  { icon: "🚫", label: "Curfew / Bandh", condition: "Govt-declared shutdown", active: false },
  { icon: "⚡", label: "Flash Flood", condition: "IMD Red Alert issued", active: false },
];

function StatusBadge({ status }) {
  const styles = {
    paid: { bg: "#d1fae5", color: "#065f46", label: "Paid" },
    pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
    active: { bg: "#dbeafe", color: "#1e40af", label: "Active" },
  };
  const s = styles[status] || styles.active;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      {s.label}
    </span>
  );
}

function LiveAlert({ onDismiss, payout }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "0 20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "32px 24px",
          maxWidth: 340,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 8 }}>🌧</div>
        <div
          style={{
            fontSize: 13,
            color: "#6b7280",
            marginBottom: 4,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ShieldGig Alert
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
          Heavy rain detected
        </div>
        <div style={{ fontSize: 14, color: "#374151", marginBottom: 20, lineHeight: 1.6 }}>
          Rainfall <strong>52mm/hr</strong> detected in Velachery zone. Claim auto-triggered
          on your behalf. Stay safe!
        </div>
        <div
          style={{
            background: "#f0fdf4",
            border: "1.5px solid #bbf7d0",
            borderRadius: 14,
            padding: "16px",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 12, color: "#15803d", marginBottom: 4 }}>Income protection credited</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#15803d" }}>₹{payout}</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>UPI: Simulated payout</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 12,
            fontSize: 12,
            color: "#9ca3af",
          }}
        >
          <span>✅ GPS verified</span>
          <span>·</span>
          <span>✅ Dual-source confirmed</span>
          <span>·</span>
          <span>✅ No duplicates</span>
        </div>
        <button
          onClick={onDismiss}
          style={{
            width: "100%",
            padding: "13px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ onSimulate, showSimBtn }) {
  const totalProtected = claimsHistory.reduce((a, c) => a + c.payout, 0);
  return (
    <div style={{ padding: "0 16px 24px" }}>
      {/* Coverage Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #14b8a6 100%)",
          borderRadius: 20,
          padding: "22px 20px",
          color: "#fff",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            background: "rgba(255,255,255,0.07)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -20,
            width: 160,
            height: 160,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
          }}
        />
        <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          Active coverage
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>
          Standard Plan · ₹{workerData.weeklyPremium}/week
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 18 }}>
          {workerData.coverageStart} – {workerData.coverageEnd}
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Max payout</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>₹{workerData.maxPayout}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Zone risk</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Moderate</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Triggers</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>5 active</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div
          style={{
            flex: 1,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 14,
            padding: "14px 12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#15803d" }}>₹{totalProtected}</div>
          <div style={{ fontSize: 11, color: "#4b5563" }}>Earnings protected</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 14,
            padding: "14px 12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1d4ed8" }}>{claimsHistory.length}</div>
          <div style={{ fontSize: 11, color: "#4b5563" }}>Auto-claims paid</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fefce8",
            border: "1px solid #fef08a",
            borderRadius: 14,
            padding: "14px 12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#a16207" }}>0</div>
          <div style={{ fontSize: 11, color: "#4b5563" }}>Manual claims filed</div>
        </div>
      </div>

      {/* Active Triggers */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Monitoring triggers
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {triggerThresholds.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{t.label}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{t.condition}</div>
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Button */}
      {showSimBtn && (
        <button
          onClick={onSimulate}
          style={{
            width: "100%",
            padding: "14px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          🎬 Simulate disruption (demo)
        </button>
      )}
    </div>
  );
}

function PolicyScreen() {
  const factors = [
    { label: "Base rate (Standard)", value: "₹69" },
    { label: "Zone risk multiplier", value: "× 1.2" },
    { label: "Seasonal adjustment", value: "× 1.15" },
    { label: "Final weekly premium", value: "₹95", bold: true },
  ];
  return (
    <div style={{ padding: "0 16px 24px" }}>
      {/* Policy Header */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: "18px",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Standard Plan</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Policy ID: SHG-2026-04821</div>
          </div>
          <StatusBadge status="active" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["Platform", "Zepto Q-Commerce"],
            ["Active zone", "Velachery, Chennai"],
            ["Coverage type", "Income loss only"],
            ["Payout method", "UPI instant"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Breakdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          AI-calculated weekly premium
        </div>
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {factors.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "11px 14px",
                borderBottom: i < factors.length - 1 ? "1px solid #f3f4f6" : "none",
                background: f.bold ? "#f0fdf4" : "transparent",
              }}
            >
              <span style={{ fontSize: 13, color: f.bold ? "#15803d" : "#374151", fontWeight: f.bold ? 600 : 400 }}>
                {f.label}
              </span>
              <span style={{ fontSize: 13, color: f.bold ? "#15803d" : "#374151", fontWeight: f.bold ? 700 : 500 }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Profile */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Zone risk profile (AI scored)
        </div>
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: "14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Risk score</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#d97706" }}>
              {workerData.riskScore} / 100 — Moderate
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: "#e5e7eb",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${workerData.riskScore}%`,
                height: "100%",
                background: "linear-gradient(90deg, #10b981, #f59e0b)",
                borderRadius: 8,
              }}
            />
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#6b7280", lineHeight: 1.7 }}>
            Velachery has a historical waterlogging risk score of 1.2×. Monsoon season
            adjustment applied for March–June (1.15×).
          </div>
        </div>
      </div>
    </div>
  );
}

function ClaimsScreen() {
  const total = claimsHistory.reduce((a, c) => a + c.payout, 0);
  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
          borderRadius: 16,
          padding: "18px",
          color: "#fff",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>TOTAL INCOME PROTECTED</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>₹{total}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>across {claimsHistory.length} auto-claims</div>
        </div>
        <div style={{ fontSize: 40 }}>🛡</div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
        Claim history — zero manual effort
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {claimsHistory.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: "14px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>
                  {c.trigger === "Heavy Rain" ? "🌧" : "🌫"}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{c.trigger}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{c.date}</div>
                </div>
              </div>
              <StatusBadge status="paid" />
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>{c.detail}</div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 10 }}>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                {c.hours} hrs disrupted
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#15803d" }}>
                + ₹{c.payout} credited
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          background: "#f9fafb",
          borderRadius: 12,
          padding: "12px 14px",
          fontSize: 12,
          color: "#6b7280",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        All claims auto-triggered · No manual filing ever required · Average payout time: 7 minutes
      </div>
    </div>
  );
}

export default function ShieldGig() {
  const [screen, setScreen] = useState("home");
  const [showAlert, setShowAlert] = useState(false);
  const [simDone, setSimDone] = useState(false);

  const handleSimulate = () => setShowAlert(true);
  const handleDismiss = () => {
    setShowAlert(false);
    setSimDone(true);
  };

  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "policy", icon: "📋", label: "Policy" },
    { id: "claims", icon: "💰", label: "Claims" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        maxWidth: 390,
        margin: "0 auto",
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {showAlert && <LiveAlert onDismiss={handleDismiss} payout={280} />}

      {/* Header */}
      <div
        style={{
          padding: "16px 16px 12px",
          borderBottom: "1px solid #f3f4f6",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f766e", letterSpacing: "-0.02em" }}>
              ShieldGig
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>
              {workerData.name} · {workerData.platform}
            </div>
          </div>
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: "#15803d",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: "#10b981",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            Covered
          </div>
        </div>
      </div>

      {/* Screen Title */}
      <div style={{ padding: "14px 16px 4px" }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#111827" }}>
          {screen === "home" && "Dashboard"}
          {screen === "policy" && "My Policy"}
          {screen === "claims" && "Claims History"}
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
          {screen === "home" && `Active zone: ${workerData.zone}`}
          {screen === "policy" && "AI-calculated weekly coverage"}
          {screen === "claims" && "Zero-touch parametric claims"}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: 12 }}>
        {screen === "home" && (
          <HomeScreen onSimulate={handleSimulate} showSimBtn={!simDone} />
        )}
        {screen === "policy" && <PolicyScreen />}
        {screen === "claims" && <ClaimsScreen />}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #f3f4f6",
          background: "#fff",
          position: "sticky",
          bottom: 0,
        }}
      >
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setScreen(n.id)}
            style={{
              flex: 1,
              padding: "10px 0 8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              borderTop: screen === n.id ? "2px solid #0f766e" : "2px solid transparent",
            }}
          >
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: screen === n.id ? 600 : 400,
                color: screen === n.id ? "#0f766e" : "#9ca3af",
              }}
            >
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
