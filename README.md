# CI/CD Pipeline Reference

A living reference and interactive visual mapping every major CI/CD tool to its stage in the development cycle. Built from a GRC and compliance engineering perspective — plain-language descriptions, tool categories, and framework relevance for each tool.

## What's In Here

| File | Description |
|------|-------------|
| `CICD_Tools_Reference.md` | Full reference document organized by pipeline stage. Obsidian-ready. |
| `cicd_visual.jsx` | Interactive React visual — click through each stage to explore the tools. Deployed via Vercel. |

## The 8 Pipeline Stages Covered

| Stage | Focus |
|-------|-------|
| 01 — Plan & Code | Source control |
| 02 — Build & Trigger | CI/CD orchestration |
| 03 — Test & Scan | Security scanning and compliance gates |
| 04 — Package & Store | Containerization and artifact management |
| 05 — Provision Infrastructure | Infrastructure as code and configuration management |
| 06 — Deploy & Orchestrate | Container orchestration and GitOps |
| 07 — Secrets Management | Secure credential and token management |
| 08 — Monitor & Observe | Metrics, logging, and continuous monitoring |

## Tools Covered

Jenkins, GitHub Actions, GitLab CI, AWS CodePipeline, Tekton, Docker, Podman, Kubernetes, Helm, ArgoCD, Terraform, Pulumi, Ansible, Snyk, Trivy, Checkov, tfsec, SonarQube, OWASP Dependency-Check, OPA, Gatekeeper, Conftest, HashiCorp Vault, AWS Secrets Manager, JFrog Artifactory, Nexus, Packer, Prometheus, Grafana, Elastic Stack (ELK)

## GRC Frameworks Referenced

NIST 800-53 · FedRAMP · CMMC · CIS Benchmarks · NIST 800-171

## Live Visual

Interactive version deployed at: [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
