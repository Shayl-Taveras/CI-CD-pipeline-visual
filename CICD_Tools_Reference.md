# CI/CD Pipeline Tools Reference

> **Living document** — add notes, links, and hands-on observations as you go.
> Last updated: May 2026

---

## How to Use This Doc

Each tool entry covers three things:
- **Type** — what category of tool it is
- **What it does** — one or two plain sentences, no jargon
- **GRC relevance** — why it matters from a compliance/security engineering angle

---

## Source Control & Triggering

| Tool | Type | What It Does |
|------|------|--------------|
| **GitHub / GitLab** | Source control + CI trigger | Where code lives. Every commit, pull request, or merge can automatically kick off a pipeline. GitHub Actions and GitLab CI are built directly into these platforms. |
| **Bitbucket** | Source control + CI trigger | Same idea as GitHub/GitLab — code repository with built-in pipeline triggering via Bitbucket Pipelines. More common in enterprise environments. |

**GRC relevance:** Branch protection rules, commit signing, and access controls in these platforms are directly auditable controls under FedRAMP and CMMC.

---

## CI/CD Orchestration (Pipeline Runners)

| Tool | Type | What It Does |
|------|------|--------------|
| **Jenkins** | CI/CD orchestration | The original pipeline automation server. You define a series of steps (build, test, scan, deploy) and Jenkins runs them automatically when triggered. Open source, highly configurable, requires self-hosting. |
| **GitHub Actions** | CI/CD orchestration | Jenkins's cloud-native competitor, built into GitHub. You write pipeline steps as YAML files that live in your repo. No separate server to manage. |
| **GitLab CI** | CI/CD orchestration | Same concept as GitHub Actions but built into GitLab. Tight integration with GitLab's source control and security scanning features. |
| **Tekton** | CI/CD orchestration | Cloud-native pipeline framework that runs on Kubernetes. More complex than GitHub Actions but designed for large-scale, containerized environments. |
| **AWS CodePipeline** | CI/CD orchestration | Amazon's managed pipeline service. Connects your code repo to build, test, and deploy stages — all within AWS. No server to manage. |

**GRC relevance:** Pipeline definitions are policy artifacts. Every stage — build, test, scan, deploy — is a potential compliance control gate. Jenkins and GitHub Actions are the two you will encounter most in DoD and federal contractor environments.

---

## Containerization

| Tool | Type | What It Does |
|------|------|--------------|
| **Docker** | Containerization | Packages an application and everything it needs to run (code, libraries, settings) into a single portable unit called a container. Runs the same way on any machine. Think of it as a lightweight, self-contained box for software. |
| **Podman** | Containerization | Docker's daemonless alternative. Does the same job but does not require a background service running as root, which makes it more secure and more common in hardened federal environments. |

**GRC relevance:** Container images are scoped assets in FedRAMP and CMMC system inventories. Image scanning (see Trivy, Snyk below) is a key continuous monitoring control.

---

## Container Orchestration

| Tool | Type | What It Does |
|------|------|--------------|
| **Kubernetes (K8s)** | Container orchestration | Manages large numbers of containers running across multiple machines. Handles starting, stopping, scaling, and restarting containers automatically. Docker runs one container; Kubernetes runs thousands. |
| **Helm** | Kubernetes package manager | Packages Kubernetes configurations into reusable, versioned bundles called charts. Instead of writing raw YAML for every deployment, you use a Helm chart and pass in your specific values. |
| **ArgoCD** | GitOps / continuous delivery | Watches a Git repository and automatically keeps your Kubernetes environment in sync with whatever is defined there. If someone manually changes something in the cluster, ArgoCD reverts it to match the repo. |

**GRC relevance:** Kubernetes RBAC, pod security policies, and network policies are all auditable controls. ArgoCD's GitOps model creates a clean, auditable change history — every deployment is a Git commit.

---

## Infrastructure as Code (IaC)

| Tool | Type | What It Does |
|------|------|--------------|
| **Terraform** | Infrastructure as code | Lets you define cloud infrastructure (servers, networks, databases, IAM policies) in text files instead of clicking through a console. Run the file and it builds the infrastructure. Change the file and it updates the infrastructure. Works across AWS, Azure, GCP, and more. |
| **Pulumi** | Infrastructure as code | Same concept as Terraform but lets you write infrastructure definitions in Python, TypeScript, or Go instead of Terraform's own language (HCL). More developer-friendly for teams already coding in those languages. |
| **Packer** | Machine image builder | Builds standardized, pre-configured machine images (like an AMI in AWS). You define a golden image once — with all the security settings and software installed — and Packer produces that image for every environment. |
| **AWS CloudFormation** | Infrastructure as code | Amazon's native IaC tool. Defines AWS infrastructure in YAML or JSON templates. Tightly integrated with AWS services but only works in AWS. |

**GRC relevance:** IaC is where compliance-as-code lives. Terraform files define your boundary. STIGs and baselines get baked into Packer images. Checkov and tfsec scan these files for misconfigurations before they ever reach production.

---

## Configuration Management

| Tool | Type | What It Does |
|------|------|--------------|
| **Ansible** | Configuration management | Connects to servers over SSH and runs a list of instructions (called a playbook) to install software, change settings, or apply security configurations. Agentless — nothing needs to be installed on the target machines. |
| **Chef** | Configuration management | Same idea as Ansible but uses a client-agent model. A Chef agent runs on each server and continuously checks that the machine matches the desired configuration. More complex but useful at scale. |
| **Puppet** | Configuration management | Similar to Chef. Agent-based configuration enforcement across large server fleets. Widely used in older enterprise environments. |

**GRC relevance:** Ansible playbooks are how STIG controls get applied at scale. An Ansible role that enforces a STIG baseline is a living, testable policy artifact — far more defensible than a manual checklist.

---

## Security Scanning

| Tool | Type | What It Does |
|------|------|--------------|
| **Snyk** | Dependency and container security scanning | Scans your code's dependencies and container images for known vulnerabilities. Integrates directly into the pipeline and blocks a build if it finds something above your severity threshold. |
| **Trivy** | Container and IaC security scanning | Open source scanner from Aqua Security. Scans container images, file systems, Git repos, and IaC files for vulnerabilities and misconfigurations. Faster and lighter than Snyk; commonly used as a pipeline gate. |
| **Checkov** | IaC security scanning | Scans Terraform, CloudFormation, Kubernetes, and Ansible files for security misconfigurations before they are deployed. Think of it as a linter for compliance — it checks your IaC against CIS benchmarks and other frameworks. |
| **tfsec** | Terraform security scanning | Purpose-built for Terraform. Scans .tf files for security issues specific to AWS, Azure, and GCP configurations. Lighter and faster than Checkov for Terraform-only environments. |
| **SonarQube** | Static application security testing (SAST) | Scans source code for bugs, security vulnerabilities, and code quality issues before the code is compiled or run. Integrates into the pipeline as a quality gate. |
| **OWASP Dependency-Check** | Dependency vulnerability scanning | Scans project dependencies against the National Vulnerability Database (NVD). Open source and commonly required in federal environments where Snyk licensing is not in place. |

**GRC relevance:** These tools are the technical implementation of vulnerability management controls in NIST 800-53 (RA-5), FedRAMP, and CMMC. Pipeline-embedded scanning creates an automated, continuous monitoring record.

---

## Secrets Management

| Tool | Type | What It Does |
|------|------|--------------|
| **HashiCorp Vault** | Secrets management | Stores and controls access to sensitive values like API keys, passwords, certificates, and tokens. Applications request secrets at runtime instead of having them hardcoded or stored in config files. |
| **AWS Secrets Manager** | Secrets management | Amazon's managed version of the same concept. Stores secrets in AWS, rotates them automatically, and integrates with IAM for access control. |
| **Doppler** | Secrets management | A developer-friendly secrets manager that syncs environment variables across local development, CI/CD pipelines, and cloud environments. Less complex than Vault for smaller teams. |

**GRC relevance:** Secrets management directly addresses IA-5 (Authenticator Management) and SC-28 (Protection of Information at Rest). Vault audit logs are a continuous monitoring artifact.

---

## Policy as Code

| Tool | Type | What It Does |
|------|------|--------------|
| **Open Policy Agent (OPA)** | Policy as code engine | Lets you write security and compliance rules as code (in a language called Rego) and enforce them across your pipeline, Kubernetes cluster, or API. Instead of a human reviewing every deployment, OPA checks it automatically. |
| **Gatekeeper** | Kubernetes policy enforcement | OPA's Kubernetes-native implementation. Sits in the cluster and blocks any resource (pod, deployment, service) that violates your defined policies before it gets created. |
| **Conftest** | Policy testing | Uses OPA's Rego language to test configuration files — Terraform, Kubernetes YAML, Dockerfile, etc. — against policies you define. Runs in the pipeline before anything is deployed. |

**GRC relevance:** Policy as code is the technical backbone of compliance gates in a CI/CD pipeline. This is the core of what distinguishes a GRC Engineer from a GRC Analyst — writing and enforcing policy in code rather than documenting it in a spreadsheet.

---

## Artifact Management

| Tool | Type | What It Does |
|------|------|--------------|
| **JFrog Artifactory** | Artifact repository | Stores build outputs — compiled binaries, container images, packages — in one place with version control and access management. Acts as the single source of truth for approved, scanned artifacts. |
| **Nexus Repository** | Artifact repository | Same concept as Artifactory. Stores and manages build artifacts. Commonly used in Java-heavy and federal environments. |

**GRC relevance:** Artifact repositories are where you enforce the rule that only scanned, approved builds make it to production. They are part of the software supply chain security picture under NIST 800-161 and CMMC.

---

## Monitoring & Observability

| Tool | Type | What It Does |
|------|------|--------------|
| **Prometheus** | Metrics collection | Continuously collects performance and health metrics from your applications and infrastructure. Stores them as time-series data for querying and alerting. |
| **Grafana** | Visualization and dashboarding | Connects to Prometheus (and other data sources) to turn raw metrics into visual dashboards. The place where you actually see what is happening in your environment. |
| **Elastic Stack (ELK)** | Log aggregation and search | Collects, stores, and makes searchable the logs from every system in your environment. Elasticsearch stores, Logstash processes, Kibana visualizes. |

**GRC relevance:** AU-2 and AU-12 (Audit Events and Audit Record Generation) require continuous log collection. Prometheus and ELK are common implementations of that control in cloud-native environments.

---

## Notes & Learning Log

> Use this section to track what you have explored hands-on.

| Tool | Status | Notes |
|------|--------|-------|
| Jenkins | | |
| Docker | | |
| Kubernetes | | |
| Terraform | | |
| Ansible | | |
| Snyk | | |
| GitHub Actions | | |
| Checkov | | |
| HashiCorp Vault | | |
| OPA / Conftest | | |
| ArgoCD | | |
| Trivy | | |

---

## Suggested Learning Order

For someone coming from a GRC background building toward GRC Engineering:

1. **Docker** — foundational. Everything else builds on containers.
2. **GitHub Actions** — most accessible CI/CD entry point; no server to manage.
3. **Terraform** — IaC is where your compliance knowledge translates fastest.
4. **Checkov / tfsec** — scan your own Terraform files; immediate GRC payoff.
5. **Kubernetes basics** — know enough to scope it, not necessarily operate it.
6. **Ansible** — STIG automation is your natural on-ramp here.
7. **HashiCorp Vault** — secrets management is a common audit finding; knowing the tool is a differentiator.
8. **OPA / Conftest** — policy as code; the most GRC-engineer-specific skill on this list.
9. **ArgoCD** — GitOps model; useful once you understand Kubernetes.
10. **Snyk / Trivy** — pipeline security scanning; tie directly to RA-5 and vulnerability management.

---

*Add links, lab notes, and course references as you go.*
