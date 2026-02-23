export type ResumeData = {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  title: string;
  summary: string;
  skills: { label: string; items: string[] }[];
  experience: {
    company: string;
    role: string;
    start: string;
    end: string;
    bullets: string[];
  }[];
  education: { school: string; degree: string }[];
  certificates: { name: string; issuer: string }[];
  portfolio: { name: string; description: string; tags: string[]; linkLabel: string; linkUrl: string }[];

};

export const resumeData: ResumeData = {
  name: "Stadrey Wilson",
  location: "Little Rock, AR",
  phone: "(501) 231-1810",
  email: "stadreywilson@yahoo.com",
  linkedin: "https://linkedin.com/in/stadreykwilson",
  title: "Senior Business Analyst",
  summary:
    "Senior Business Analyst with 10+ years of experience evaluating business processes, gathering complex system requirements, and delivering technology solutions across Accounting, Marketing, Finance, Operations, and Product organizations. Proven connector between stakeholders and delivery teams, translating needs into clear user stories, system specifications, dashboards, and governance metrics. Strong background in Agile delivery, UAT leadership, financial systems, and production support, supported by hands-on technical experience in React/TypeScript and SQL.",
  skills: [
    {
      label: "Business Analysis",
      items: [
        "Requirements elicitation & documentation",
        "Stakeholder facilitation & cross-functional alignment",
        "User stories & acceptance criteria",
        "Process mapping & workflow design",
        "Requirements traceability",
        "UAT planning, execution & defect triage",
      ],
    },
    {
      label: "Reporting & Analytics",
      items: ["SQL (MySQL)", "Power BI", "KPI / metrics development", "Advanced Excel"],
    },
    {
      label: "Delivery & Tools",
      items: ["Agile / Scrum", "Azure DevOps", "Backlog refinement", "Release validation", "Production support & impact analysis"],
    },
    {
      label: "Technical (supporting)",
      items: ["React", "TypeScript", "Rust", "C#", "Go"],
    },
  ],
  experience: [
    {
      company: "Murphy USA",
      role: "Software Engineer III - Retail Systems ",
      start: "Apr 2024",
      end: "Sep 2025",
      bullets: [
        "Rebuilt and enhanced end-to-end UI workflows for end-of-life (EOL) core store systems, including secure store-employee authentication, end-of-shift reporting, and fuel price management.",
        "Implemented Okta-based authentication and verification within frontend UI workflows, enabling secure user login, session handling, and role-based access for internal retail systems."

],
    },
    {
      company: "Murphy USA",
      role: "Software Engineer - Retail Systems ",
      start: "Feb 2023",
      end: "Aug 2024",
      bullets: [
        "Designed and developed frontend UI components and workflows for internal retail systems role-based access to promotional and rewards management features.",
        "Enabled end-to-end UI workflows for creating, validating, and managing promotional discount displays and offers template configuration, translating complex promotional business rules into enforceable frontend logic, usability patterns, and system validations.",
        "Implemented Okta-based authentication and verification within frontend UI workflows, enabling secure user login, session handling, and role-based access for internal retail systems."

  ],
    },
    {
      company: "Murphy USA",
      role: "Business Analyst II - Retail Systems",
      start: "Aug 2017",
      end: "Feb 2023",
      bullets: [
        "Led requirements elicitation, documentation, and management for acccounting, marketing, financial, and operational systems across multiple business units.",
        "Translated stakeholder needs into user stories, workflows, functional specifications, and acceptance criteria; maintained traceability across delivery.",
        "Facilitated Agile planning and cross-team requirement reviews using Azure DevOps.",
        "Designed Power BI dashboards delivering compliance, financial performance, and risk insights to leadership.",
        "Planned and led UAT execution and defect tracking to reduce post-release issues and improve adoption.",
      ],
    },
    {
      company: "Walmart",
      role: "Business Analyst I, Health & Wellness - Pharmacy",
      start: "Apr 2016",
      end: "May 2017",
      bullets: [
        "Gathered and documented system requirements, user stories, and acceptance criteria; facilitated stakeholder alignment sessions.",
        "Developed dashboards and reports supporting compliance and operational performance.",
      ],
    },
    {
      company: "Walmart",
      role: "Project Analyst, Health & Wellness - Pharmacy",
      start: "May 2015",
      end: "Apr 2016",
      bullets: [
        "Conducted process mapping and gap analysis to improve reporting effectiveness.",
        "Prepared project documentation, metrics, and leadership reporting.",
      ],
    },
    {
      company: "Walmart",
      role: "Planner, Global Travel & Analytics",
      start: "Nov 2014",
      end: "May 2015",
      bullets: [
        "Developed analytics dashboards supporting vendor contracts and corporate travel spend decisions.",
        "Delivered cost-benefit and trend analysis identifying savings opportunities.",
      ],
    },
    {
      company: "State of Arkansas - Insurance Department",
      role: " Financial Analyst / Resource Specialist / ACA",
      start: "Oct 2013",
      end: "Nov 2014",
      bullets: [
        "Performed financial audits, compliance validation, and governance analysis.",
        "Partnered with leadership to design financial reports improving transparency and oversight.",
      ],
    },
  ],
  education: [
    {
      school: "University of Arkansas at Little Rock",
      degree: "Bachelor of Business Administration (BBA) — Management Information Systems",
    },
  ],
certificates: [
    {
      name: "Google AI Essentials",
      issuer: "Google"
    },
  ],
portfolio: [
    {
      name: "Enterprise BRD – Retail Identity & Promotions Platform",
      description:
        "Enterprise Business Requirements Document with KPI alignment, governance controls, and audit-ready structure.",
      tags: ["BRD", "Governance", "Retail", "Identity"],
      linkLabel: "View BRD",
      linkUrl: "PASTE_GOOGLE_DOC_LINK_HERE",
    },
    {
      name: "RACI Stakeholder Matrix",
      description:
        "Accountability model across Sponsor, PO, BA, Engineering, Security, QA, and Users.",
      tags: ["RACI", "Stakeholders", "Delivery"],
      linkLabel: "View RACI",
      linkUrl: "PASTE_GOOGLE_DOC_LINK_HERE",
    },
    {
      name: "UAT Strategy & Test Suite",
      description:
        "UAT plan and test cases to validate requirements, support signoff, and reduce release risk.",
      tags: ["UAT", "Testing", "Signoff"],
      linkLabel: "View UAT",
      linkUrl: "PASTE_GOOGLE_DOC_LINK_HERE",
    },
    {
      name: "Requirements Traceability Matrix (RTM)",
      description:
        "Trace requirements → user stories → test cases to support scope control and audit readiness.",
      tags: ["RTM", "Traceability", "Controls"],
      linkLabel: "View RTM",
      linkUrl: "PASTE_GOOGLE_DOC_LINK_HERE",
    },
  ],
};
