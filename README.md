<div align="center">

<!-- AI GENERATED BANNER — also commit agenthub-banner.svg to your repo root -->
<img width="100%" src="./agenthub-banner.svg" alt="AgentHub — AI Agent Marketplace &amp; Workflow Orchestrator"/>

<br/>

<!-- BADGES -->
![License](https://img.shields.io/badge/License-MIT-FF4500?style=for-the-badge&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=github-actions&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Claude AI](https://img.shields.io/badge/Claude-Anthropic-FF4500?style=for-the-badge&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Stars](https://img.shields.io/github/stars/yathboss/AgentHub?style=for-the-badge&color=FF4500)

<br/>

> **"Build with agents that are ready for production."**
> 
> *AgentHub* is a next-generation, open-source AI agent marketplace and workflow orchestrator — built for the era of autonomous software. Discover, evaluate, chain, publish, and deploy AI agents without piecing together separate tools.

<br/>

**🏆 Built for BHARAT - TECH XPERIENCE Hackathon**

[![Explore Agents](https://img.shields.io/badge/🚀%20Explore%20Agents-FF4500?style=for-the-badge)](http://localhost:3000/agents)
[![Publish an Agent](https://img.shields.io/badge/📦%20Publish%20an%20Agent-1a1a1a?style=for-the-badge)](http://localhost:3000/publish)
[![View Dashboard](https://img.shields.io/badge/📊%20Dashboard-22c55e?style=for-the-badge)](http://localhost:3000/dashboard)

</div>

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Core Features](#-core-features)
3. [Tech Stack & Architecture](#-tech-stack--architecture)
4. [Folder Structure](#-folder-structure)
5. [Getting Started](#-getting-started)
6. [Environment Variables](#-environment-variables)
7. [API Endpoints](#-api-endpoints)
8. [Team](#-team)
9. [Contributing](#-contributing)
10. [License](#-license)

---

## 🌟 Introduction

**AgentHub** is a full-stack, open-source platform that reimagines how developers discover, integrate, and orchestrate AI agents. Whether you're looking to evaluate an agent's trust signals, chain multiple agents into powerful workflows, or publish your own agent to a growing ecosystem — *AgentHub* is your single command center.

> 🎯 **Problem:** The AI agent ecosystem is fragmented. Developers waste time jumping between tools to discover, test, trust-verify, and integrate agents.
>
> 💡 **Solution:** AgentHub unifies discovery, trust analysis, semantic search, workflow chaining, and publishing into one cohesive platform — powered by Claude AI and real-time GitHub scanning.

Built at the **BHARAT - TECH XPERIENCE** hackathon by **Team Tech Resolutions**, AgentHub is designed to be the definitive developer-first AI agent hub.

---

## ⚡ Core Features

### 🏪 Agent Marketplace
- **Browse & Search** a curated registry of production-ready AI agents
- **Semantic Vector Search** — go beyond keyword matching with embedding-powered queries
- **Filter & Compare** agents by capability, trust score, and tech stack

### 🔗 Chain Studio (Workflow Orchestrator)
- Visually **compose multi-agent pipelines** — chain agents together for complex tasks
- **Real-time execution** with live output streaming per chain step
- Save, reload, and share workflow configurations

### 🔍 Repo Scan (GitHub Intelligence)
- One-click **deep scan of any GitHub repository**
- Detects agent capabilities, dependencies, and code patterns automatically
- **Gap Detection** — identifies missing capabilities in a codebase vs. agent ecosystem

### 📡 Signal (Trust & Analytics)
- **Trust Signals Dashboard** — view agent reliability, community activity, and review signals
- Monitor agent health metrics and version history
- Real-time signal feeds for subscribed agents

### 🧪 Sandbox
- **Live agent testing environment** — run agents directly from the marketplace
- Inspect input/output schemas, latency, and response quality
- No API key needed for sandbox previews

### 📦 Publish
- **Structured publishing flow** for agent creators
- Automatic metadata extraction from GitHub repos
- Submit trust verification proofs and documentation

### 📊 Dashboard & Analytics
- Personal activity feed, published agents, and workflow history
- **Usage analytics** — runs, successes, and failure rates
- Bookmarks, starred agents, and saved chains

---

## 🛠️ Tech Stack & Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│              Next.js 15 (App Router) + TypeScript            │
│         React Components · Tailwind CSS · Custom Hooks       │
└────────────────────────┬─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                      API LAYER (Server)                      │
│              Next.js Route Handlers (/api/*)                 │
│     agents · chains · github-scan · vector-search           │
└──────┬───────────────┬──────────────────┬────────────────────┘
       │               │                  │
┌──────▼──────┐ ┌──────▼──────┐ ┌────────▼────────┐
│  Anthropic  │ │   GitHub    │ │    Firebase     │
│  Claude API │ │     API     │ │ Auth + Firestore│
│  (AI Brain) │ │ (Repo Scan) │ │   (DB + Auth)  │
└─────────────┘ └─────────────┘ └────────┬────────┘
                                         │
                              ┌──────────▼──────────┐
                              │   Vector Embeddings  │
                              │  Semantic Search +   │
                              │   Gap Detection      │
                              └─────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS | UI, routing, SSR/SSG |
| **Backend** | Next.js API Routes | Server-side logic & endpoints |
| **Auth & DB** | Firebase Auth + Firestore | User auth, real-time data |
| **AI Engine** | Anthropic Claude API | Agent reasoning, summarization, analysis |
| **Code Intelligence** | GitHub API | Repo scanning, metadata, gap detection |
| **Search** | Vector Embeddings | Semantic agent search |
| **Deployment** | Vercel (frontend) + Render (backend services) | Cloud hosting |

---

## 📁 Folder Structure

```
AgentHub/
│
├── 📁 src/
│   │
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 (public)/                 # Public landing pages
│   │   ├── 📁 agents/                   # Agent marketplace browser
│   │   ├── 📁 chains/                   # Workflow chain studio
│   │   ├── 📁 dashboard/                # User dashboard & analytics
│   │   ├── 📁 scan/                     # GitHub repo scanner
│   │   ├── 📁 publish/                  # Agent publishing flow
│   │   ├── 📁 signal/                   # Trust signals & monitoring
│   │   │
│   │   └── 📁 api/                      # API Route Handlers
│   │       ├── 📁 agents/               # CRUD for agent registry
│   │       ├── 📁 chains/               # Chain execution endpoints
│   │       ├── 📁 github-scan/          # GitHub repository scanning
│   │       └── 📁 vector-search/        # Semantic vector search
│   │
│   ├── 📁 components/                   # Reusable UI Components
│   │   ├── 🧩 AgentCard.tsx             # Agent listing card
│   │   ├── 🔗 ChainStudio.tsx           # Drag-and-drop chain builder
│   │   ├── 🧪 Sandbox.tsx               # Live agent testing
│   │   ├── 📊 AnalyticsPanel.tsx        # Dashboard analytics
│   │   ├── 🔍 SearchFilter.tsx          # Search & filter widgets
│   │   ├── 📁 agenthub/                 # AgentHub-specific modules
│   │   └── 📁 publish/                  # Publishing form components
│   │
│   ├── 📁 hooks/                        # Custom React Hooks
│   │   ├── ⚓ useAgent.ts               # Single agent data fetching
│   │   └── ⚓ useAgents.ts              # Agents list with filters
│   │
│   └── 📁 lib/                          # Backend Business Logic
│       ├── 🔥 firebase.ts               # Firebase initialization
│       ├── 🔐 auth.ts                   # Firebase Auth wrappers
│       ├── 🗃️  firestore.ts             # Firestore CRUD helpers
│       ├── 🤖 claudeClient.ts           # Anthropic Claude API client
│       ├── 🐙 githubClient.ts           # GitHub API client
│       ├── 🔎 embeddings.ts             # Vector embedding utilities
│       ├── 🔎 vectorSearch.ts           # Semantic search engine
│       ├── 🌱 seed.ts                   # Development seed data
│       └── 📐 types.ts                  # TypeScript type definitions
│
├── 📄 .env.local                        # Environment variables (see below)
├── 📄 next.config.ts                    # Next.js configuration
├── 📄 tailwind.config.ts                # Tailwind CSS configuration
├── 📄 tsconfig.json                     # TypeScript configuration
└── 📄 package.json                      # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `v18.0+` — [Download](https://nodejs.org/)
- **npm** `v9.0+` or **yarn** `v1.22+`
- **Git** — [Download](https://git-scm.com/)

You'll also need accounts and API keys for:
- 🔥 [Firebase](https://console.firebase.google.com/) — Create a project, enable Auth & Firestore
- 🤖 [Anthropic](https://console.anthropic.com/) — Get your Claude API key
- 🐙 [GitHub](https://github.com/settings/tokens) — Generate a Personal Access Token

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/yathboss/AgentHub.git
cd AgentHub
```

---

### Step 2 — Install Dependencies

```bash
npm install
# or
yarn install
```

---

### Step 3 — Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then fill in your credentials (see the [Environment Variables](#-environment-variables) section below).

---

### Step 4 — Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

### Step 5 — (Optional) Seed Sample Data

```bash
npm run seed
```

> This populates Firestore with sample agents, chains, and signal data for development.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following keys:

```env
# ─────────────────────────────────────────────
# 🔥 FIREBASE CONFIGURATION
# ─────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side only)
FIREBASE_SERVICE_ACCOUNT_KEY=your_base64_encoded_service_account_json

# ─────────────────────────────────────────────
# 🤖 ANTHROPIC (CLAUDE) API
# ─────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-your_claude_api_key

# ─────────────────────────────────────────────
# 🐙 GITHUB API
# ─────────────────────────────────────────────
GITHUB_ACCESS_TOKEN=ghp_your_github_personal_access_token

# ─────────────────────────────────────────────
# 🔎 VECTOR SEARCH CONFIGURATION
# ─────────────────────────────────────────────
EMBEDDING_MODEL=text-embedding-3-small   # or your preferred model
VECTOR_SEARCH_THRESHOLD=0.75

# ─────────────────────────────────────────────
# ⚙️  APP CONFIGURATION
# ─────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/agents` | Fetch all agents with optional filters |
| `POST` | `/api/agents` | Publish a new agent |
| `GET` | `/api/agents/:id` | Get single agent details |
| `POST` | `/api/chains` | Execute a multi-agent chain workflow |
| `GET` | `/api/chains` | List saved chain configurations |
| `POST` | `/api/github-scan` | Scan a GitHub repo for agent capabilities |
| `POST` | `/api/vector-search` | Semantic search across agent registry |

---

## 👥 Team

Built with 🔥 and ☕ at **BHARAT - TECH XPERIENCE** by:

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Paras%20Bisht-Project%20Lead-FF4500?style=for-the-badge" alt="Paras Bisht"/><br/>
      <b>Paras Bisht</b><br/>
      <sub>🎯 Project Lead &amp; Full Stack Dev</sub><br/>
      <sub>App architecture, API design, end-to-end integration</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Yatharth-AI%20Engineer-3178C6?style=for-the-badge" alt="Yatharth"/><br/>
      <b>Yatharth</b><br/>
      <sub>🤖 AI Engineer &amp; Backend</sub><br/>
      <sub>Claude API, vector embeddings, chain orchestration</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Shivam-Systems%20Architect-22c55e?style=for-the-badge" alt="Shivam"/><br/>
      <b>Shivam</b><br/>
      <sub>🏗️ Systems Architect</sub><br/>
      <sub>Firebase, deployment, infrastructure, Vercel/Render setup</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Siddharth-Frontend%20Dev-FFCA28?style=for-the-badge&logoColor=black" alt="Siddharth"/><br/>
      <b>Siddharth</b><br/>
      <sub>🎨 Frontend Dev &amp; UI/UX</sub><br/>
      <sub>Component design, Tailwind, Sandbox &amp; Marketplace UI</sub>
    </td>
  </tr>
</table>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'feat: add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) spec for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

<img width="100%" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYwIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJmZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZDExMTciLz48c3RvcCBvZmZzZXQ9IjQwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFhMGQwZCIvPjxzdG9wIG9mZnNldD0iNjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWEwZDBkIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMGQxMTE3Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImZsIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGNDUwMDtzdG9wLW9wYWNpdHk6MCIvPjxzdG9wIG9mZnNldD0iMzAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY0NTAwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSI3MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjZCMzU7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjQ1MDA7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MCIgZmlsbD0idXJsKCNmZykiLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIyIiBmaWxsPSJ1cmwoI2ZsKSIvPjx0ZXh0IHg9IjYwMCIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTU1IiBsZXR0ZXItc3BhY2luZz0iMyI+aGFja2luZCDCtyBEaXNjb3ZlciDCtyBCdWlsZCDCtyBPcmNoZXN0cmF0ZTwvdGV4dD48L3N2Zz4=" alt="footer"/>

**Built with ❤️ for BHARAT - TECH XPERIENCE**

*AgentHub — Discover, Build, Orchestrate.*

[![GitHub](https://img.shields.io/badge/Star%20This%20Repo-⭐-FF4500?style=for-the-badge)](https://github.com/yathboss/AgentHub)
[![Fork](https://img.shields.io/badge/Fork%20Project-🍴-1a1a1a?style=for-the-badge)](https://github.com/yathboss/AgentHub/fork)

</div>
