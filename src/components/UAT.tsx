import { useMemo, useState } from "react";

type Status = "Pending" | "Pass" | "Fail" | "Blocked";

type RoleRow = { role: string; responsibility: string };

type TestCase = {
  id: string;
  scenario: string;
  preconditions: string;
  steps: string[];
  expected: string;
  status: Status;
  owner: string;
  notes: string;
};

const defaultRoles: RoleRow[] = [
  { role: "Business Analyst", responsibility: "Define UAT scope, scenarios, and coordinate execution; manage signoff." },
  { role: "Product Owner", responsibility: "Confirm business outcomes; approve UAT scope and acceptance." },
  { role: "QA Team", responsibility: "Support defect triage, test data prep, and regression validation." },
  { role: "Developers", responsibility: "Fix defects, provide technical support, and validate resolutions." },
  { role: "Business Stakeholders / Users", responsibility: "Execute test cases and provide acceptance/signoff." },
];

const seedCases: TestCase[] = [
  {
    id: "UAT-001",
    scenario: "User Login",
    preconditions: "User account exists; role assigned.",
    steps: ["Navigate to Login page", "Enter valid credentials", "Click Sign In"],
    expected: "User successfully logs in and lands on the dashboard.",
    status: "Pending",
    owner: "UAT Users",
    notes: "",
  },
  {
    id: "UAT-002",
    scenario: "Create Record",
    preconditions: "User has create permissions.",
    steps: ["Open Create form", "Complete required fields", "Save"],
    expected: "Record is saved and displayed in the list/dashboard.",
    status: "Pending",
    owner: "UAT Users",
    notes: "",
  },
  {
    id: "UAT-003",
    scenario: "Update Record",
    preconditions: "Existing record is available; user has edit permissions.",
    steps: ["Open an existing record", "Update fields", "Save"],
    expected: "Changes persist after save and display correctly on refresh.",
    status: "Pending",
    owner: "UAT Users",
    notes: "",
  },
  {
    id: "UAT-004",
    scenario: "Reporting Validation",
    preconditions: "Data exists for reporting period; report access granted.",
    steps: ["Open Reports", "Select date range", "Run report"],
    expected: "Report returns accurate metrics aligned to requirements/KPIs.",
    status: "Pending",
    owner: "BA/PO",
    notes: "",
  },
  {
    id: "UAT-005",
    scenario: "Role-Based Access",
    preconditions: "Multiple roles configured (e.g., Admin/User/Viewer).",
    steps: ["Login as each role", "Attempt restricted actions", "Verify allowed actions"],
    expected: "Permissions are enforced correctly; restricted actions are blocked.",
    status: "Pending",
    owner: "QA",
    notes: "",
  },
];

const uid = () => `UAT-${Math.floor(100 + Math.random() * 900)}`;

function toCsv(cases: TestCase[]) {
  const header = [
    "id",
    "scenario",
    "preconditions",
    "steps",
    "expected",
    "status",
    "owner",
    "notes",
  ];
  const rows = cases.map((c) => [
    c.id,
    c.scenario,
    c.preconditions,
    c.steps.join(" | "),
    c.expected,
    c.status,
    c.owner,
    c.notes,
  ]);
  const escape = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  return [header, ...rows].map((r) => r.map((v) => escape(String(v))).join(",")).join("\n");
}

export default function UAT() {
  const [projectName, setProjectName] = useState("UAT Strategy & Test Suite");
  const [release, setRelease] = useState("Release 1.0");
  const [environment, setEnvironment] = useState("UAT");
  const [owner, setOwner] = useState("Stadrey Wilson");

  const [roles] = useState<RoleRow[]>(defaultRoles);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [cases, setCases] = useState<TestCase[]>(seedCases);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesStatus = statusFilter === "All" ? true : c.status === statusFilter;
      const blob = `${c.id} ${c.scenario} ${c.preconditions} ${c.expected} ${c.owner} ${c.notes}`.toLowerCase();
      const matchesQuery = !q || blob.includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [cases, query, statusFilter]);

  const updateCase = (id: string, patch: Partial<TestCase>) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addCase = () => {
    setCases((prev) => [
      ...prev,
      {
        id: uid(),
        scenario: "New scenario",
        preconditions: "",
        steps: ["Step 1"],
        expected: "",
        status: "Pending",
        owner: "",
        notes: "",
      },
    ]);
  };

  const removeCase = (id: string) => setCases((prev) => prev.filter((c) => c.id !== id));

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uat_test_suite.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPdf = () => window.print();

  const summary = useMemo(() => {
    const total = cases.length;
    const pass = cases.filter((c) => c.status === "Pass").length;
    const fail = cases.filter((c) => c.status === "Fail").length;
    const blocked = cases.filter((c) => c.status === "Blocked").length;
    const pending = cases.filter((c) => c.status === "Pending").length;
    return { total, pass, fail, blocked, pending };
  }, [cases]);

  return (
    <div id="uat" style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* Print styles: only show content, hide controls */}
      <style>{`
        @media print {
          button, input, select, .noPrint { display: none !important; }
          body { background: #316cbe49 !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
        }
        .card { border: 2px solid darkblue; border-radius: 14px; padding: 14px; background: #8bbbe0c0; color: black; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .muted { opacity: 0.85; font-size: 13px; color: darkblue; }
        .pill { display:inline-block; padding: 4px 10px; border-radius: 999px; border:1px solid rgba(201, 225, 241, 0.04); font-size:12px; }
        table { width: 100%; border-collapse: collapse; border: 1px solid darkblue; }
        th, td { border: 1px solid darkblue; padding: 10px; vertical-align: top; text-align: left; }
        th { font-weight: 700; }
        input, select, textarea { width: 100%; padding: 8px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.16); color: inherit; }
        textarea { min-height: 70px; }
        .btn { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.08); color: inherit; cursor:pointer; }
        .btn:hover { background: rgba(255,255,255,0.12); }
        .row { display:flex; gap: 10px; align-items: center; }
        .right { margin-left: auto; }
      `}</style>

      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>UAT Strategy & Test Suite</h2>
        <span className="pill">Support signoff • Reduce release risk</span>
        <div className="right row noPrint">
          <button className="btn" onClick={addCase}>Add Test Case</button>
          <button className="btn" onClick={exportCsv}>Export CSV</button>
          <button className="btn" onClick={printPdf}>Print / Save as PDF</button>
        </div>
      </div>

      <div className="grid2" style={{ marginBottom: 12 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Document Details</h3>
          <div className="grid2">
            <div>
              <label className="muted">Project / Document Name</label>
              <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            <div>
              <label className="muted">Release / Version</label>
              <input value={release} onChange={(e) => setRelease(e.target.value)} />
            </div>
            <div>
              <label className="muted">Environment</label>
              <input value={environment} onChange={(e) => setEnvironment(e.target.value)} />
            </div>
            <div>
              <label className="muted">Owner</label>
              <input value={owner} onChange={(e) => setOwner(e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: 10 }} className="muted">
            <b>Status Summary:</b> {summary.total} total • {summary.pass} pass • {summary.fail} fail •{" "}
            {summary.blocked} blocked • {summary.pending} pending
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Strategy</h3>

          <p className="muted" style={{ marginTop: 0 }}>
            UAT validates business requirements, ensures workflows meet user expectations, supports formal signoff,
            and reduces release risk before production deployment.
          </p>

          <div className="grid2">
            <div>
              <b>Objectives</b>
              <ul className="muted">
                <li>Validate functional and non-functional requirements</li>
                <li>Confirm end-to-end workflows and role-based access</li>
                <li>Identify defects before release</li>
                <li>Document acceptance and signoff</li>
              </ul>
            </div>
            <div>
              <b>Scope</b>
              <ul className="muted">
                <li>Core user journeys and business rules</li>
                <li>Integrations and data flows (as applicable)</li>
                <li>Reports/KPIs aligned to requirements</li>
                <li>Security permissions and auditability</li>
              </ul>
            </div>
          </div>

          <div className="grid2" style={{ marginTop: 8 }}>
            <div>
              <b>Entry Criteria</b>
              <ul className="muted">
                <li>Requirements approved and baselined</li>
                <li>Build deployed to UAT environment</li>
                <li>Test data prepared; users provisioned</li>
              </ul>
            </div>
            <div>
              <b>Exit Criteria</b>
              <ul className="muted">
                <li>All critical tests executed</li>
                <li>Sev 1–2 defects resolved or accepted</li>
                <li>Formal stakeholder signoff captured</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <h3 style={{ marginTop: 0 }}>Roles & Responsibilities</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: "220px" }}>Role</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.role}>
                <td><b>{r.role}</b></td>
                <td className="muted">{r.responsibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="row noPrint" style={{ marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>UAT Test Cases</h3>
          <div className="right row" style={{ gap: 8 }}>
            <input
              style={{ width: 260 }}
              placeholder="Search test cases..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              style={{ width: 160 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ width: 110 }}>ID</th>
              <th style={{ width: 220 }}>Scenario</th>
              <th>Steps / Expected</th>
              <th style={{ width: 120 }}>Status</th>
              <th style={{ width: 140 }}>Owner</th>
              <th style={{ width: 90 }} className="noPrint">Remove</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tc) => (
              <tr key={tc.id}>
                <td><b>{tc.id}</b></td>

                <td>
                  <textarea
                    value={tc.scenario}
                    onChange={(e) => updateCase(tc.id, { scenario: e.target.value })}
                  />
                  <div style={{ height: 8 }} />
                  <label className="muted">Preconditions</label>
                  <textarea
                    value={tc.preconditions}
                    onChange={(e) => updateCase(tc.id, { preconditions: e.target.value })}
                  />
                </td>

                <td>
                  <label className="muted"><b>Steps</b> (one per line)</label>
                  <textarea
                    value={tc.steps.join("\n")}
                    onChange={(e) =>
                      updateCase(tc.id, {
                        steps: e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                  <div style={{ height: 8 }} />
                  <label className="muted"><b>Expected Result</b></label>
                  <textarea
                    value={tc.expected}
                    onChange={(e) => updateCase(tc.id, { expected: e.target.value })}
                  />
                  <div style={{ height: 8 }} />
                  <label className="muted">Notes</label>
                  <textarea
                    value={tc.notes}
                    onChange={(e) => updateCase(tc.id, { notes: e.target.value })}
                  />
                </td>

                <td>
                  <select
                    value={tc.status}
                    onChange={(e) => updateCase(tc.id, { status: e.target.value as Status })}
                  >
                    <option>Pending</option>
                    <option>Pass</option>
                    <option>Fail</option>
                    <option>Blocked</option>
                  </select>
                </td>

                <td>
                  <input
                    value={tc.owner}
                    onChange={(e) => updateCase(tc.id, { owner: e.target.value })}
                    placeholder="e.g., QA / BA / User"
                  />
                </td>

                <td className="noPrint">
                  <button className="btn" onClick={() => removeCase(tc.id)}>X</button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">No test cases match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="muted" style={{ marginTop: 10 }}>
          Tip: Use <b>Print / Save as PDF</b> to export a clean UAT document for signoff.
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>UAT Signoff</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          After UAT completion and resolution of critical defects, stakeholders confirm acceptance for production release.
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: 220 }}>Role</th>
              <th style={{ width: 220 }}>Signature</th>
              <th style={{ width: 140 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ height: 36 }}></td><td></td><td></td><td></td></tr>
            <tr><td style={{ height: 36 }}></td><td></td><td></td><td></td></tr>
            <tr><td style={{ height: 36 }}></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
