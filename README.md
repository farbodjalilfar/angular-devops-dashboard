# 🚀 Angular DevOps Dashboard

A futuristic, real-time DevOps monitoring dashboard built with Angular 19, featuring a stunning cyberpunk-inspired "Orbital Blue" design with neon accents and HUD-style interfaces.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 📊 Real-Time Monitoring
- **Live GitHub Integration**: Connects to GitHub API to fetch real-time repository data, activity, and pull requests
- **System Health Tracking**: Monitor latency, error rates, and system status with visual indicators
- **Activity Feed**: Real-time GitHub events with intelligent categorization and badges
- **Pull Request Dashboard**: Track open PRs with direct links to GitHub

### 🎨 Futuristic UI/UX
- **Orbital Blue Theme**: High-tech cyberpunk aesthetic with neon cyan and purple accents
- **HUD-Style Panels**: Angled corners, tech borders, and glassmorphism effects
- **Digital Typography**: Custom fonts (Orbitron, JetBrains Mono) for a sci-fi feel
- **Neon Glow Effects**: Interactive elements with dynamic lighting and shadows
- **Responsive Grid Backgrounds**: Subtle tech-grid overlay for depth

### 🛠️ Tech Stack Visualization
- **Language Detection**: Automatically detects and displays top programming languages from your repositories
- **Interactive Cards**: Click any language to see which repositories use it
- **Technology Planning**: Showcase planned backend and DevOps tools
- **Icon Integration**: Beautiful tech logos via Simple Icons CDN

### ⚡ Performance
- **Smart Caching**: 15-minute localStorage cache to minimize API calls
- **Skeleton Loaders**: Smooth loading states for better UX
- **Server-Side Rendering**: Pre-rendered routes for faster initial load
- **Optimized Builds**: Production-ready with Angular's build optimization

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 19+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/angular-devops-dashboard.git
cd angular-devops-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` to see the dashboard in action!

### Configuration

Update your GitHub username in the settings page or modify the default in `src/app/services/settings.service.ts`:

```typescript
private readonly defaultSettings: AppSettings = {
  githubName: 'your-github-username',
  // ...
};
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── activity-list/   # Activity feed display
│   │   ├── pull-requests/   # PR list component
│   │   ├── stat-card/       # Metric cards
│   │   ├── status-badge/    # Status indicators
│   │   └── skeleton/        # Loading skeletons
│   ├── layout/              # App layout structure
│   │   ├── header/          # Top navigation
│   │   ├── sidebar/         # Side navigation
│   │   └── layout/          # Main layout wrapper
│   ├── pages/               # Route pages
│   │   ├── overview/        # Main dashboard
│   │   ├── stack/           # Tech stack page
│   │   ├── activity/        # Activity timeline
│   │   └── settings/        # User settings
│   └── services/            # Business logic
│       ├── github.service.ts        # GitHub API integration
│       ├── activity.service.ts      # Activity processing
│       ├── dashboard-stats.service.ts  # Stats aggregation
│       └── settings.service.ts      # User preferences
└── styles.css               # Global theme variables
```

## 🎨 Design System

### Color Palette
- **Background**: Deep Slate (`#0f172a`)
- **Panels**: Semi-transparent Slate with glassmorphism
- **Neon Cyan**: `#22d3ee` (Primary accent)
- **Neon Purple**: `#c084fc` (Secondary accent)
- **Neon Green**: `#34d399` (Success states)
- **Neon Red**: `#fb7185` (Error states)

### Typography
- **Display**: Orbitron (Headers, titles)
- **Body**: Inter (General text)
- **Mono**: JetBrains Mono (Data, code)

## 🔧 Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run e2e tests
npm run e2e

# Lint code
npm run lint
```

## 📦 Key Dependencies

- **Angular 19**: Modern web framework
- **RxJS**: Reactive programming
- **Angular SSR**: Server-side rendering
- **TypeScript 5.7**: Type-safe development

## 🌟 Features Showcase

### Interactive Tech Stack
Click on any programming language to see a modal with all repositories using that technology, complete with star counts and direct GitHub links.

### Real-Time Activity
Automatically fetches and displays your latest GitHub activity with intelligent event categorization (pushes, PRs, issues, etc.).

### System Health Monitoring
Mock system health metrics with visual status badges and the ability to simulate different states in development mode.

## 🚧 Roadmap

- [ ] Add authentication for private repositories
- [ ] Implement real-time WebSocket updates
- [ ] Add customizable dashboard widgets
- [ ] Support for multiple GitHub organizations
- [ ] Dark/Light theme toggle
- [ ] Export dashboard data as PDF

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons provided by [Simple Icons](https://simpleicons.org/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspired by cyberpunk and sci-fi HUD designs

---

**Built with ❤️ using Angular**
