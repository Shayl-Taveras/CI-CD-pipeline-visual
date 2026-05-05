import { useState } from "react";

const pipeline = [
  {
    id: "plan",
    stage: "01",
    label: "Plan & Code",
    icon: "⌨",
    color: "#3B82F6",
    bg: "#1E3A5F",
    desc: "Developers write code and track work. Everything starts here.",
    tools: [
      { name: "GitHub", type: "Source Control", note: "Where code lives and changes are tracked" },
      { name: "GitLab", type: "Source Control", note: "GitHub alternative, popular in enterprise" },
      { name: "Bitbucket", type: "Source Control", note: "Common in Atlassian / Jira shops" },
    ],
  },
  {
    id: "build",
    stage: "02",
    label: "Build & Trigger",
    icon: "⚙",
    color: "#8B5CF6",
    bg: "#2D1B69",
    desc: "A code push triggers an automated pipeline. The machine takes over.",
    tools: [
      { name: "Jenkins", type: "CI Orchestration", note: "The original pipeline server — self-hosted, highly configurable" },
      { name: "GitHub Actions", type: "CI Orchestration", note: "Built into GitHub — easiest entry point" },
      { name: "GitLab CI", type: "CI Orchestration", note: "Built into GitLab — tight integration" },
      { name: "AWS CodePipeline", type: "CI Orchestration", note: "Amazon's managed pipeline, AWS-native" },
      { name: "Tekton", type: "CI Orchestration", note: "Kubernetes-native pipeline framework" },
    ],
  },
  {
    id: "scan",
    stage: "03",
    label: "Test & Scan",
    icon: "🔍",
    color: "#EF4444",
    bg: "#5C1A1A",
    desc: "Code is tested and scanned for vulnerabilities before it moves forward. This is your compliance gate.",
    tools: [
      { name: "Snyk", type: "Dependency Scanning", note: "Finds vulnerabilities in libraries and container images" },
      { name: "Trivy", type: "Container / IaC Scanning", note: "Open source scanner — images, repos, Terraform files" },
      { name: "SonarQube", type: "SAST", note: "Scans source code for bugs and security issues" },
      { name: "Checkov", type: "IaC Policy Scanning", note: "Checks Terraform / K8s configs against compliance benchmarks" },
      { name: "tfsec", type: "IaC Policy Scanning", note: "Purpose-built Terraform security linter" },
      { name: "OWASP Dep-Check", type: "Dependency Scanning", note: "Open source NVD-based vulnerability scanner" },
      { name: "Conftest / OPA", type: "Policy as Code", note: "Enforces compliance rules written as code" },
    ],
  },
  {
    id: "package",
    stage: "04",
    label: "Package & Store",
    icon: "📦",
    color: "#F59E0B",
    bg: "#451A03",
    desc: "Scanned, approved builds get packaged into containers and stored in a repository.",
    tools: [
      { name: "Docker", type: "Containerization", note: "Packages the app and everything it needs into a portable container" },
      { name: "Podman", type: "Containerization", note: "Daemonless Docker alternative — preferred in hardened federal envs" },
      { name: "JFrog Artifactory", type: "Artifact Repository", note: "Stores approved build artifacts with version control" },
      { name: "Nexus Repository", type: "Artifact Repository", note: "Common in federal / Java-heavy environments" },
      { name: "Packer", type: "Image Builder", note: "Bakes STIG baselines into standardized machine images" },
    ],
  },
  {
    id: "infra",
    stage: "05",
    label: "Provision Infrastructure",
    icon: "🏗",
    color: "#10B981",
    bg: "#052E16",
    desc: "Infrastructure is created as code — servers, networks, IAM policies — before the app is deployed.",
    tools: [
      { name: "Terraform", type: "Infrastructure as Code", note: "Defines cloud infrastructure in text files. Works across AWS, Azure, GCP." },
      { name: "Pulumi", type: "Infrastructure as Code", note: "Same as Terraform but uses Python, TypeScript, or Go" },
      { name: "AWS CloudFormation", type: "Infrastructure as Code", note: "Amazon's native IaC tool — AWS only" },
      { name: "Ansible", type: "Configuration Management", note: "Applies security configs and STIG controls to servers via SSH playbooks" },
      { name: "Chef / Puppet", type: "Configuration Management", note: "Agent-based config enforcement across large server fleets" },
    ],
  },
  {
    id: "deploy",
    stage: "06",
    label: "Deploy & Orchestrate",
    icon: "🚀",
    color: "#06B6D4",
    bg: "#0C3547",
    desc: "Containers are deployed to infrastructure and managed at scale.",
    tools: [
      { name: "Kubernetes", type: "Container Orchestration", note: "Manages thousands of containers across multiple machines automatically" },
      { name: "Helm", type: "K8s Package Manager", note: "Packages Kubernetes configs into reusable, versioned bundles" },
      { name: "ArgoCD", type: "GitOps / CD", note: "Keeps K8s environments in sync with what is defined in Git" },
      { name: "Gatekeeper / OPA", type: "Policy Enforcement", note: "Blocks any K8s resource that violates your defined policies" },
    ],
  },
  {
    id: "secrets",
    stage: "07",
    label: "Secrets Management",
    icon: "🔑",
    color: "#EC4899",
    bg: "#4A044E",
    desc: "Sensitive values are stored and accessed securely — never hardcoded in config files.",
    tools: [
      { name: "HashiCorp Vault", type: "Secrets Management", note: "Stores API keys, certs, tokens — apps request them at runtime" },
      { name: "AWS Secrets Manager", type: "Secrets Management", note: "Amazon's managed secrets store with automatic rotation" },
      { name: "Doppler", type: "Secrets Management", note: "Developer-friendly secrets sync across environments" },
    ],
  },
  {
    id: "monitor",
    stage: "08",
    label: "Monitor & Observe",
    icon: "📊",
    color: "#F97316",
    bg: "#431407",
    desc: "Everything running in production is continuously watched. This is your continuous monitoring layer.",
    tools: [
      { name: "Prometheus", type: "Metrics Collection", note: "Continuously collects health and performance metrics" },
      { name: "Grafana", type: "Dashboarding", note: "Turns raw metrics into visual dashboards" },
      { name: "Elastic Stack (ELK)", type: "Log Aggregation", note: "Collects, stores, and makes searchable all system logs" },
    ],
  },
];

const typeColors: Record<string, string> = {
  "Source Control": "#3B82F6",
  "CI Orchestration": "#8B5CF6",
  "Dependency Scanning": "#EF4444",
  "Container / IaC Scanning": "#EF4444",
  "SAST": "#EF4444",
  "IaC Policy Scanning": "#F59E0B",
  "Policy as Code": "#F59E0B",
  "Policy Enforcement": "#F59E0B",
  "Containerization": "#F59E0B",
  "Artifact Repository": "#F59E0B",
  "Image Builder": "#10B981",
  "Infrastructure as Code": "#10B981",
  "Configuration Management": "#10B981",
  "Container Orchestration": "#06B6D4",
  "K8s Package Manager": "#06B6D4",
  "GitOps / CD": "#06B6D4",
  "Secrets Management": "#EC4899",
  "Metrics Collection": "#F97316",
  "Dashboarding": "#F97316",
  "Log Aggregation": "#F97316",
};

export default function CICDVisual() {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const activeStage = pipeline.find(s => s.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", fontFamily: "'Courier New', Courier, monospace", color: "#E2E8F0", padding: "32px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-block", background: "linear-gradient(135deg, #1E3A5F 0%, #0A0E1A 100%)", border: "1px solid #3B82F6", borderRadius: 4, padding: "4px 16px", fontSize: 11, color: "#3B82F6", letterSpacing: 4, marginBottom: 16, textTransform: "uppercase" }}>
          CI/CD Pipeline
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", color: "#F8FAFC", letterSpacing: -0.5 }}>Development Cycle: Tool Map</h1>
        <p style={{ color: "#64748B", fontSize: 13, margin: 0 }}>Click any stage to explore the tools</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32, maxWidth: 960, margin: "0 auto 32px" }}>
        {pipeline.map((stage, i) => (
          <div key={stage.id} style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => setActive(active === stage.id ? null : stage.id)} style={{ background: active === stage.id ? stage.bg : "#111827", border: `2px solid ${active === stage.id ? stage.color : "#1F2937"}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", transition: "all 0.2s ease", textAlign: "center", minWidth: 88, boxShadow: active === stage.id ? `0 0 20px ${stage.color}40` : "none", transform: active === stage.id ? "translateY(-2px)" : "none" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{stage.icon}</div>
              <div style={{ fontSize: 9, color: stage.color, letterSpacing: 2, marginBottom: 2, textTransform: "uppercase" }}>{stage.stage}</div>
              <div style={{ fontSize: 11, color: active === stage.id ? "#F8FAFC" : "#9CA3AF", fontWeight: active === stage.id ? 700 : 400, lineHeight: 1.3 }}>{stage.label}</div>
            </button>
            {i < pipeline.length - 1 && <div style={{ color: "#374151", fontSize: 16, margin: "0 2px", marginTop: -8 }}>›</div>}
          </div>
        ))}
      </div>

      {activeStage && (
        <div style={{ maxWidth: 960, margin: "0 auto", background: activeStage.bg, border: `1px solid ${activeStage.color}40`, borderRadius: 12, padding: 28, boxShadow: `0 0 40px ${activeStage.color}20` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
            <div style={{ background: `${activeStage.color}20`, border: `1px solid ${activeStage.color}`, borderRadius: 8, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{activeStage.icon}</div>
            <div>
              <div style={{ fontSize: 10, color: activeStage.color, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Stage {activeStage.stage}</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: "#F8FAFC" }}>{activeStage.label}</h2>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: 13, lineHeight: 1.6 }}>{activeStage.desc}</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
            {activeStage.tools.map(tool => (
              <div key={tool.name} onMouseEnter={() => setHoveredTool(tool.name)} onMouseLeave={() => setHoveredTool(null)} style={{ background: hoveredTool === tool.name ? "#0F172A" : "#0A0E1A", border: `1px solid ${hoveredTool === tool.name ? activeStage.color + "80" : "#1F2937"}`, borderRadius: 8, padding: "14px 16px", transition: "all 0.15s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#F8FAFC" }}>{tool.name}</span>
                  <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 99, background: `${typeColors[tool.type] || activeStage.color}20`, color: typeColors[tool.type] || activeStage.color, border: `1px solid ${typeColors[tool.type] || activeStage.color}40`, letterSpacing: 0.5, whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0 }}>{tool.type}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{tool.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!activeStage && (
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ border: "1px solid #1F2937", borderRadius: 12, overflow: "hidden" }}>
            {pipeline.map((stage, i) => (
              <div key={stage.id} onClick={() => setActive(stage.id)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", background: i % 2 === 0 ? "#0D1117" : "#0A0E1A", cursor: "pointer", borderBottom: i < pipeline.length - 1 ? "1px solid #1F2937" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#111827")}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#0D1117" : "#0A0E1A")}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: `${stage.color}15`, border: `1px solid ${stage.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{stage.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: stage.color, letterSpacing: 2, textTransform: "uppercase" }}>{stage.stage}</span>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#E2E8F0" }}>{stage.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>{stage.desc}</p>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 280 }}>
                  {stage.tools.slice(0, 4).map(t => (
                    <span key={t.name} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "#1F2937", color: "#9CA3AF" }}>{t.name}</span>
                  ))}
                  {stage.tools.length > 4 && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "#1F2937", color: "#6B7280" }}>+{stage.tools.length - 4} more</span>}
                </div>
                <div style={{ color: "#374151", fontSize: 18, flexShrink: 0 }}>›</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 960, margin: "24px auto 0", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>Code → Build → Scan → Package → Provision → Deploy → Secure → Monitor</p>
      </div>
    </div>
  );
}