import { useMemo, useState } from "react";

type Priority = "High" | "Medium" | "Low";
type ReqStatus = "Draft" | "Approved" | "In Dev" | "In Test" | "Done" | "Deferred";
type TestStatus = "Not Started" | "In Progress" | "Pass" | "Fail" | "Blocked";

type RTMRow = {
  reqId: string;
  requirement: string;
  source: string; // sponsor, stakeholder group, etc.
  priority: Priority;
  status: ReqStatus;

  storyIds: string; // comma separated for simplicity (e.g. US-101, US-102)
  designRef: string; // link or doc id
  testCaseIds: string; // e.g. UAT-001, UAT-002
  testStatus: TestStatus;

  defectIds: string; // e.g. BUG-12, BUG-18
  release: string; // e.g. R1.0
  owner: string;
  notes: string;
};

const seed: RTMRow[] = [
  {
    reqId: "REQ-001",
    requirement: "User can sign in with role-based access.",
    source: "Product Owner",
    priority: "High",
    status: "Approved",
    storyIds: "US-101",
    designRef: "AUTH-DESIGN-01",
    testCaseIds: "UAT-001",
    testStatus: "In Progress",
    defectIds: "",
    release: "R1.0",
    owner: "BA/PO",
    notes: "Confirm roles: Admin/User/Viewer.",
  },
  {
    reqId: "REQ-002",
    requirement: "User can create a record with required fields validated.",
    source: "Operations",
    priority: "High",
    status: "In Dev",
    storyIds: "US-110, US-111",
    designRef: "FORM-DESIGN-02",
    testCaseIds: "UAT-002",
    testStatus: "Not Started",
    defectIds: "",
    release: "R1.0",
    owner: "BA",
    notes: "",
  },
  {
    reqId: "REQ-003",
    requirement: "System generates a KPI report by date range.",
    source: "Finance",
    priority: "Medium",
    status: "Approved",
    storyIds: "",
    designRef: "REPORT-03",
    testCaseIds: "",
    testStatus: "Not Started",
    defectIds: "",
    release: "R1.1",
    owner: "BA",
    notes: "Missing story + test mapping (risk).",
  },
];

const uid = (prefix: string) => `${prefix}-${Math.floor(100 + Math.random() * 900)}`;

function csvEscape(v: string) {
  return `"${(v ?? "").replace(/"/g, '""')}"`;
}

function toCsv(rows: RTMRow[]) {
  const header = [
    "reqId",
    "requirement",
    "source",
    "priority",
    "status",
    "storyIds",
    "designRef",
    "testCaseIds",
    "testStatus",
    "defectIds",
    "release",
    "owner",
    "notes",
  ];

  const body = rows.map((r) => [
    r.reqId,
    r.requirement,
    r.source,
    r.priority,
    r.status,
    r.storyIds,
    r.designRef,
    r.testCaseIds,
    r.testStatus,
    r.defectIds,
    r.release,
    r.owner,
    r.notes,
  ]);

  return [header, ...body].map((row) => row.map((c) => csvEscape(String(c))).join(",")).join("\n");
}

function hasAny(text: string) {
  return Boolean(text && text.trim().length > 0);
}

export default function RTM() {
  const [docName, setDocName] = useState("Requirements Traceability Matrix (RTM)");
  const [project, setProject] = useState("MiniSales / Portfolio Demo");
  const [release, setRelease] = useState("R1.0");
  const [owner, setOwner] = useState("Stadrey Wilson");

  const [rows, setRows] = useState<RTMRow[]>(seed);

  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ReqStatus | "All">("All");
  const [showOnlyGaps, setShowOnlyGaps] = useState(false);

  const stats = useMemo(() => {
    const total = rows.length;
    const missingStory = rows.filter((r) => !hasAny(r.storyIds)).length;
    const missingTests = rows.filter((r) => !hasAny(r.testCaseIds)).length;
    const done = rows.filter((r) => r.status === "Done").length;
    return { total, missingStory, missingTests, done };
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      const matchesPriority = priorityFilter === "All" ? true : r.priority === priorityFilter;
      const matchesStatus = statusFilter === "All" ? true : r.status === statusFilter;

      const blob = [
        r.reqId,
        r.requirement,
        r.source,
        r.priority,
        r.status,
        r.storyIds,
        r.designRef,
        r.testCaseIds,
        r.testStatus,
        r.defectIds,
        r.release,
        r.owner,
        r.notes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !q || blob.includes(q);

      const hasGap = !hasAny(r.storyIds) || !hasAny(r.testCaseIds);
      const matchesGaps = showOnlyGaps ? hasGap : true;

      return matchesPriority && matchesStatus && matchesQuery && matchesGaps;
    });
  }, [rows, query, priorityFilter, statusFilter, showOnlyGaps]);

  const updateRow = (reqId: string, patch: Partial<RTMRow>) => {
    setRows((prev) => prev.map((r) => (r.reqId === reqId ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    const newReqId = uid("REQ");
    setRows((prev) => [
      ...prev,
      {
        reqId: newReqId,
        requirement: "New requirement",
        source: "",
        priority: "Medium",
        status: "Draft",
        storyIds: "",
        designRef: "",
        testCaseIds: "",
        testStatus: "Not Started",
        defectIds: "",
        release,
        owner: "",
        notes: "",
      },
    ]);
  };

  const removeRow = (reqId: string) => {
    setRows((prev) => prev.filter((r) => r.reqId !== reqId));
  };

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rtm.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPdf = () => window.print();

  return (
    <div id="rtm" style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <style>{`
        @media print {
          .noPrint { display: none !important; }
          body { background: #fff !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          textarea { border: none !important; background: transparent !important; }
        }
        .card { border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px; background: rgba(158, 170, 184, 0.66); }
        .row { display:flex; gap: 10px; align-items: center; }
        .right { margin-left: auto; }
        .muted { opacity: 0.85; font-size: 13px; }
        .pill { display:inline-block; padding: 4px 10px; border-radius: 999px; border:1px solid rgba(255,255,255,0.14); font-size:12px; }
        .btn { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.08); color: inherit; cursor:pointer; }
        .btn:hover { background: rgba(255,255,255,0.12); }
        input, select, textarea { width: 100%; padding: 8px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); color: inherit; }
        textarea { min-height: 52px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border-bottom: 1px solid rgba(255,255,255,0.10); padding: 10px; vertical-align: top; }
        th { font-weight: 700; white-space: nowrap; }
        .gap { border-left: 4px solid rgba(245, 158, 11, 0.9); } /* amber */
        .ok { border-left: 4px solid rgba(34, 197, 94, 0.9); } /* green */
        .tiny { font-size: 12px; opacity: 0.9; }
      `}</style>

      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Requirements Traceability Matrix (RTM)</h2>
        <span className="pill">Requirements → Stories → Tests → Defects → Release</span>

        <div className="right row noPrint">
          <button className="btn" onClick={addRow}>Add Requirement</button>
          <button className="btn" onClick={exportCsv}>Export CSV</button>
          <button className="btn" onClick={printPdf}>Print / Save as PDF</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 240px" }}>
            <div className="muted">Document Name</div>
            <input value={docName} onChange={(e) => setDocName(e.target.value)} />
          </div>

          <div style={{ flex: "1 1 240px" }}>
            <div className="muted">Project</div>
            <input value={project} onChange={(e) => setProject(e.target.value)} />
          </div>

          <div style={{ flex: "1 1 140px" }}>
            <div className="muted">Current Release</div>
            <input value={release} onChange={(e) => setRelease(e.target.value)} />
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <div className="muted">Owner</div>
            <input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </div>

          <div className="right muted" style={{ minWidth: 260 }}>
            <b>Coverage:</b> {stats.total} reqs • {stats.done} done •{" "}
            {stats.missingStory} missing stories • {stats.missingTests} missing tests
          </div>
        </div>
      </div>

      <div className="card noPrint" style={{ marginBottom: 12 }}>
        <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
          <input
            style={{ maxWidth: 360 }}
            placeholder="Search (REQ, stakeholder, story, test, defect...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select style={{ maxWidth: 180 }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)}>
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select style={{ maxWidth: 200 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="All">All statuses</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="In Dev">In Dev</option>
            <option value="In Test">In Test</option>
            <option value="Done">Done</option>
            <option value="Deferred">Deferred</option>
          </select>

          <label className="row tiny" style={{ gap: 8 }}>
            <input
              type="checkbox"
              checked={showOnlyGaps}
              onChange={(e) => setShowOnlyGaps(e.target.checked)}
              style={{ width: 18 }}
            />
            Show only gaps (missing Story/Test)
          </label>
        </div>

        <div className="muted" style={{ marginTop: 8 }}>
          Tip: rows with missing Stories or Test Cases are flagged as a coverage gap.
        </div>
      </div>

      <div className="card">
        <div className="muted" style={{ marginBottom: 8 }}>
          <b>{docName}</b> — {project} — Release: {release} — Owner: {owner}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Source</th>
                <th>Priority</th>
                <th>Req Status</th>
                <th>Story IDs</th>
                <th>Design Ref</th>
                <th>Test Case IDs</th>
                <th>Test Status</th>
                <th>Defects</th>
                <th>Release</th>
                <th>Owner</th>
                <th className="noPrint">Remove</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const gap = !hasAny(r.storyIds) || !hasAny(r.testCaseIds);
                return (
                  <tr key={r.reqId} className={gap ? "gap" : "ok"}>
                    <td style={{ minWidth: 280 }}>
                      <div className="tiny muted"><b>{r.reqId}</b></div>
                      <textarea value={r.requirement} onChange={(e) => updateRow(r.reqId, { requirement: e.target.value })} />
                      <div className="tiny muted">Notes</div>
                      <textarea value={r.notes} onChange={(e) => updateRow(r.reqId, { notes: e.target.value })} />
                    </td>

                    <td style={{ minWidth: 160 }}>
                      <textarea value={r.source} onChange={(e) => updateRow(r.reqId, { source: e.target.value })} />
                    </td>

                    <td style={{ minWidth: 120 }}>
                      <select value={r.priority} onChange={(e) => updateRow(r.reqId, { priority: e.target.value as Priority })}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </td>

                    <td style={{ minWidth: 140 }}>
                      <select value={r.status} onChange={(e) => updateRow(r.reqId, { status: e.target.value as ReqStatus })}>
                        <option>Draft</option>
                        <option>Approved</option>
                        <option>In Dev</option>
                        <option>In Test</option>
                        <option>Done</option>
                        <option>Deferred</option>
                      </select>
                    </td>

                    <td style={{ minWidth: 160 }}>
                      <textarea value={r.storyIds} onChange={(e) => updateRow(r.reqId, { storyIds: e.target.value })} placeholder="US-101, US-102" />
                    </td>

                    <td style={{ minWidth: 160 }}>
                      <textarea value={r.designRef} onChange={(e) => updateRow(r.reqId, { designRef: e.target.value })} placeholder="Doc ID / link" />
                    </td>

                    <td style={{ minWidth: 160 }}>
                      <textarea value={r.testCaseIds} onChange={(e) => updateRow(r.reqId, { testCaseIds: e.target.value })} placeholder="UAT-001, UAT-002" />
                    </td>

                    <td style={{ minWidth: 160 }}>
                      <select value={r.testStatus} onChange={(e) => updateRow(r.reqId, { testStatus: e.target.value as TestStatus })}>
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Pass</option>
                        <option>Fail</option>
                        <option>Blocked</option>
                      </select>
                    </td>

                    <td style={{ minWidth: 140 }}>
                      <textarea value={r.defectIds} onChange={(e) => updateRow(r.reqId, { defectIds: e.target.value })} placeholder="BUG-12, BUG-18" />
                    </td>

                    <td style={{ minWidth: 120 }}>
                      <textarea value={r.release} onChange={(e) => updateRow(r.reqId, { release: e.target.value })} />
                    </td>

                    <td style={{ minWidth: 140 }}>
                      <textarea value={r.owner} onChange={(e) => updateRow(r.reqId, { owner: e.target.value })} />
                    </td>

                    <td className="noPrint" style={{ width: 90 }}>
                      <button className="btn" onClick={() => removeRow(r.reqId)}>X</button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="muted">
                    No requirements match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="muted" style={{ marginTop: 10 }}>
          Print tip: choose <b>“Save as PDF”</b> in the print dialog to export a signoff-ready RTM.
        </div>
      </div>
    </div>
  );
}