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
        "Partnered with Marketing, Accounting, Operations, and Store Operations to gather and document requirements for enterprise promotional and rewards systems supporting the Murphy Rewards platform.",
        "Designed and developed frontend UI for store employee login and authentication workflows, enabling secure access to internal promotional and rewards management features.",
        "Built UI workflows for creating and managing promotional displays and offers; translated promotional business rules into validation, usability, and end-to-end process requirements.",
        "Converted requirements into user stories, acceptance criteria, and testable behaviors; supported QA and UAT with clarifications, defect triage, and release readiness reviews.",
        "Developed and enhanced business and performance metrics for governance reporting, compliance visibility, and operational decision-making.",
        "Supported production troubleshooting, impact analysis, and issue resolution to improve stability and user experience.",
      ],
    },
    {
      company: "Murphy USA",
      role: "Software Engineer - Retail Systems ",
      start: "Feb 2023",
      end: "Aug 2024",
      bullets: [
        "Served as liaison between business stakeholders and development teams to define requirements and validate UI designs for promotional product management.",
        "Analyzed workflows and system dependencies to identify process gaps and efficiency improvements.",
        "Designed SQL data structures and analytics supporting financial, promotional, and operational dashboards.",
        "Participated in Agile ceremonies including sprint planning, backlog refinement, and release coordination; supported deployment verification and post-release triage.",
      ],
    },
    {
      company: "Murphy USA",
      role: "Business Analyst II - Retail Systems",
      start: "Aug 2017",
      end: "Feb 2023",
      bullets: [
        "Led requirements elicitation, documentation, and management for financial and operational systems across multiple business units.",
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
      role: "Planner, Global Travel Analytics",
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
};
