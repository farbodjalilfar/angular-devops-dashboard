# 🌌 Orbital DevOps Dashboard

> A high-performance, futuristic DevOps monitoring suite engineered for visibility and real-time intervention.

[![Angular](https://img.shields.io/badge/Angular-19.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🔭 Project Overview

**Orbital DevOps** is more than just a dashboard; it's a mission control center for your software infrastructure. Designed with a breathtaking **Orbital Blue** cyberpunk aesthetic, it provides an immersive, HUD-style interface that makes monitoring system health, GitHub activity, and tech stacks feel like piloting a spacecraft.

### 🌐 [Live Deployment](https://farbodjalilfar.github.io/angular-devops-dashboard/)

---

## 🚀 Key Modules

### 📊 Real-Time Mission Control
*   **Live GitHub Streaming**: Real-time integration with GitHub's event stream for your repositories.
*   **System Telemetry**: Native Spring Boot integration for monitoring latency, error rates, and heartbeat.
*   **Intelligent Caching**: Advanced dual-layer caching strategy (Memory + LocalStorage) to optimize API usage and responsiveness.

### 🎨 HUD-Grade Interface
*   **Orbital Blue Design System**: A bespoke CSS framework featuring neon cyan accents, glassmorphism, and angled tech panels.
*   **Dynamic Typography**: Cyber-optimized fonts including *Orbitron* for headers and high-readability *JetBrains Mono* for data streams.
*   **Responsive Grids**: A digital background grid system providing structural depth across all screen sizes.

### 🛠️ Technology Intelligence
*   **Language Ecosystems**: Dynamic visualization of programming language distribution across your entire portfolio.
*   **Interactive Drill-down**: Clickable tech badges that reveal specific repository cohorts using those technologies.
*   **DevOps Roadmap**: Visual planner for backend services and infrastructure tools.

---

## 🛠️ Technical Stack

### **Frontend Architecture**
*   **Angular 19**: Leveraging the latest Signals-based reactivity for negligible performance overhead.
*   **Standalone Components**: Fully modular, tree-shakable architecture.
*   **CSS Micro-Animations**: High-performance hardware-accelerated transitions.

### **Backend Architecture**
*   **Spring Boot**: Java-based RESTful API serving critical system health telemetry.
*   **Proactive CORS Management**: Secure cross-origin resource sharing specifically tuned for Angular clients.
*   **Java 21/24 Native**: Built on the latest JVM features for maximum scalability.

---

## 🏁 Quick Initiation

### 1. Zero-Config Startup
```bash
# Clone the manifest
git clone https://github.com/farbodjalilfar/angular-devops-dashboard.git
cd angular-devops-dashboard

# Install system dependencies
npm install

# Launch Mission Control
npm start
```

### 2. Spring Boot Telemetry
```bash
# Enter telemetry module
cd backend

# Execute server
./mvnw spring-boot:run
```

---

## 📂 System Architecture

```text
├── 📦 backend/                  # Spring Boot Telemetry API (Java)
├── 📦 src/
│   ├── 🛠️ app/
│   │   ├── 🧩 components/       # HUD Widgets & Stat Cards
│   │   ├── 🧭 layout/           # Global Sidebar & Glass Header
│   │   ├── 📄 pages/            # View Controllers (Overview, Tech Stack, etc.)
│   │   └── 🔌 services/         # Logic Layers & API Clients
│   └── 📝 styles.css            # Orbital Blue Design System Core
└── 📜 package.json              # Automation Scripts
```

## 🛰️ Deployment Logic

Deploying updates to the live production server is automated via:
```bash
npm run deploy
```
This single command handles **Production Build** ➡️ **Base-HREF Alignment** ➡️ **404 Routing Fix** ➡️ **GitHub Pages Synchronization**.

---

## 🔮 Future Roadmap

- [ ] **Sentinel Protocol**: Real-time WebSocket notifications for critical failures.
- [ ] **Orbital Multi-Tenancy**: Support for multiple GitHub Organizations simultaneously.
- [ ] **Dark Matter Theme**: Ultra-high contrast mode for night-time operation.
- [ ] **Infrastructure as Code**: Integration with Terraform/Kubernetes status providers.

## ⚖️ License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Developed & Maintained by [Farbod Jalilfar](https://github.com/farbodjalilfar)**
