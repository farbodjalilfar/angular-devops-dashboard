# 🌌 Orbital DevOps Dashboard

> A real-time DevOps monitoring platform with a futuristic cyberpunk interface, powered by Angular 21 and Spring Boot.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Orbital_DevOps-06B6D4?style=for-the-badge)](https://farbodjalilfar.github.io/angular-devops-dashboard/)
[![Angular](https://img.shields.io/badge/Angular-21.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](LICENSE)

---

## 📖 Overview

**Orbital DevOps** is a cutting-edge DevOps monitoring dashboard that transforms infrastructure visibility into an immersive experience. Built with the latest Angular 21 features and backed by a Spring Boot API, it provides real-time insights into your GitHub activity, system health, and technology stack—all wrapped in a stunning **Orbital Blue** cyberpunk aesthetic.

### ✨ Key Highlights

- **🎨 Futuristic UI**: HUD-style panels with neon accents, glassmorphism effects, and angled geometric shapes
- **⚡ Real-Time Data**: Live GitHub event streaming and system health monitoring
- **🔄 Full-Stack Architecture**: Angular 21 frontend + Spring Boot 4.0 backend
- **📊 Interactive Visualizations**: Dynamic tech stack analysis with drill-down capabilities
- **🚀 Production Ready**: Deployed on GitHub Pages with automated CI/CD

---

## 🎯 Features

### 📊 Overview Dashboard
- **System Health Monitoring**: Real-time latency, error rates, and status indicators
- **GitHub Statistics**: Repository count, activity metrics, and contribution tracking
- **Profile Integration**: Dynamic avatar and organization/user information
- **Activity Feed**: Live stream of GitHub events (pushes, PRs, issues, releases)
- **Pull Request Tracker**: Quick access to open PRs with direct GitHub links

### 🛠️ Tech Stack Analyzer
- **Language Detection**: Automatic analysis of programming languages across all repositories
- **Interactive Exploration**: Click any language to view repositories using that technology
- **Visual Hierarchy**: Top languages displayed with usage statistics
- **Technology Roadmap**: Planned backend and DevOps tools visualization

### 📈 Activity Timeline
- **Event Categorization**: Intelligent filtering by event type (deploy, alert, info)
- **Real-Time Updates**: Live GitHub event processing and display
- **Visual Badges**: Color-coded status indicators with neon glow effects
- **Chronological Feed**: Time-stamped activity with monospace typography

### ⚙️ Settings & Configuration
- **GitHub Integration**: Configure organization or user account
- **Mock Mode**: Toggle between live data and mock data for testing
- **Account Type Selection**: Switch between organization and user views
- **Persistent Storage**: Settings saved to browser localStorage

---

## 🏗️ Architecture

### Frontend (Angular 21)
```
src/app/
├── components/          # Reusable UI components
│   ├── stat-card/      # Metric display cards
│   ├── activity-list/  # Event feed component
│   ├── pull-requests/  # PR list widget
│   ├── status-badge/   # Status indicators
│   └── skeleton/       # Loading states
├── pages/              # Route-level views
│   ├── overview/       # Main dashboard
│   ├── stack/          # Tech stack analyzer
│   ├── activity/       # Activity timeline
│   └── settings/       # Configuration panel
├── services/           # Business logic & API clients
│   ├── github.service.ts          # GitHub API integration
│   ├── dashboard-stats.service.ts # Metrics aggregation
│   ├── system-health.service.ts   # Health monitoring
│   ├── activity.service.ts        # Event processing
│   └── settings.service.ts        # User preferences
└── layout/             # App structure
    ├── sidebar/        # Navigation menu
    └── header/         # Top bar with status
```

### Backend (Spring Boot 4.0)
```
backend/src/main/java/com/devops/api/
├── DevopsApiApplication.java    # Main application
├── controller/
│   └── HealthController.java    # REST endpoints
└── model/
    └── HealthStatus.java         # Data models
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 21+ (for backend)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farbodjalilfar/angular-devops-dashboard.git
   cd angular-devops-dashboard
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the Angular development server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200`

4. **Start the Spring Boot backend** (optional, for live health data)
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

---

## 🎨 Design System

### Color Palette (Orbital Blue)
- **Background**: Deep Slate (`#0f172a`)
- **Panels**: Semi-transparent Slate with glassmorphism
- **Primary Accent**: Neon Cyan (`#22d3ee`)
- **Secondary Accent**: Neon Purple (`#c084fc`)
- **Success**: Neon Green (`#34d399`)
- **Error**: Neon Red (`#fb7185`)

### Typography
- **Display**: Orbitron (Headers, titles)
- **Body**: Inter (General text)
- **Monospace**: JetBrains Mono (Data, metrics, code)

### Visual Effects
- **Glassmorphism**: `backdrop-filter: blur(10px)`
- **Angled Panels**: CSS `clip-path` for geometric shapes
- **Neon Glow**: `text-shadow` and `box-shadow` with neon colors
- **Grid Background**: Subtle tech-grid overlay

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 4200) |
| `npm run build` | Build for production |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm test` | Run unit tests with Vitest |
| `npm run watch` | Build in watch mode |

---

## 🌐 Deployment

The application is automatically deployed to GitHub Pages using the custom `deploy` script:

```bash
npm run deploy
```

This command:
1. Builds the production bundle with correct base-href
2. Copies `index.csr.html` to `index.html` for GitHub Pages compatibility
3. Creates `404.html` for client-side routing
4. Pushes to the `gh-pages` branch

**Live URL**: [https://farbodjalilfar.github.io/angular-devops-dashboard/](https://farbodjalilfar.github.io/angular-devops-dashboard/)

---

## 🔧 Configuration

### GitHub Integration
1. Navigate to **Settings** page
2. Enter your GitHub username or organization name
3. Select account type (User/Organization)
4. Toggle **Mock Mode** off to use live GitHub data

### Backend Connection
- The frontend connects to `http://localhost:8080/api/health` when Mock Mode is disabled
- CORS is pre-configured for `http://localhost:4200`
- For production deployment, update the API URL in `system-health.service.ts`

---

## 📦 Tech Stack

### Frontend
- **Framework**: Angular 21 (Standalone Components, Signals)
- **Language**: TypeScript 5.9
- **Styling**: Custom CSS with CSS Variables
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **State Management**: Angular Signals
- **SSR**: Angular Universal (Server-Side Rendering)

### Backend
- **Framework**: Spring Boot 4.0.1
- **Language**: Java 21
- **Build Tool**: Maven
- **Dependencies**: Spring Web, Spring DevTools, Lombok

### DevOps
- **Hosting**: GitHub Pages
- **CI/CD**: angular-cli-ghpages
- **Version Control**: Git & GitHub

---

## 🗺️ Roadmap

- [ ] **Real-time WebSocket Integration**: Live updates without polling
- [ ] **Multi-Organization Support**: Monitor multiple GitHub accounts
- [ ] **Custom Metrics**: User-defined KPIs and dashboards
- [ ] **Dark/Light Theme Toggle**: Alternative color schemes
- [ ] **Export Functionality**: PDF/CSV report generation
- [ ] **Kubernetes Integration**: Cluster health monitoring
- [ ] **CI/CD Pipeline Visualization**: Build status tracking

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## � Author

**Farbod Jalilfar**
- GitHub: [@farbodjalilfar](https://github.com/farbodjalilfar)
- Project: [angular-devops-dashboard](https://github.com/farbodjalilfar/angular-devops-dashboard)

---

## 🙏 Acknowledgments

- **Icons**: [Simple Icons](https://simpleicons.org/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Orbitron, Inter, JetBrains Mono)
- **Inspiration**: Cyberpunk aesthetics and sci-fi HUD designs
- **API**: [GitHub REST API](https://docs.github.com/en/rest)

---

<div align="center">

**Built with ❤️ using Angular & Spring Boot**

[⬆ Back to Top](#-orbital-devops-dashboard)

</div>
