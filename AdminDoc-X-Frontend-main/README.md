<div align="center">
  <h1>🚀 AdminDoc-X</h1>
  <p><strong>The AI That Understands Administrative Documents</strong></p>
  <p>
    <em>OCR • NER • Layout Intelligence • Structured Data Extraction</em>
  </p>
  
  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)
</div>

---
## Backend Implementation

👉 [Backend Repo](https://github.com/tasnim-mtir/AdminDoc-X-Backend)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**AdminDoc-X** is an AI-powered document intelligence platform designed to revolutionize how organizations handle administrative documents. This repository contains the front-end landing page and showcase for the AdminDoc-X project, built with modern web technologies to deliver a fast, responsive, and visually stunning user experience.

### Key Capabilities

- **OCR (Optical Character Recognition)**: Extract text from scanned documents and images
- **NER (Named Entity Recognition)**: Identify and classify entities like names, dates, addresses, and more
- **Layout Intelligence**: Understand document structure and hierarchy
- **Structured Data Extraction**: Convert unstructured documents into structured, actionable data

---

## ✨ Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 🌓 **Dark Mode**: Full dark mode support with theme toggle
- ⚡ **Lightning Fast**: Built with Vite for instant HMR and optimized builds
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🧩 **Component Library**: Powered by shadcn/ui for consistent, accessible components
- 🎭 **Interactive Sections**: 
  - Hero section with floating documents animation
  - Pipeline visualization
  - Feature showcase
  - Interactive demo
  - Use cases presentation
  - Tech stack overview
  - Before/After comparison

---

## 🛠️ Tech Stack

### Core Technologies

- **[React](https://react.dev/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Libraries

- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation

### State Management & Routing

- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Utilities

- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[date-fns](https://date-fns.org/)** - Modern date utility library

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** - Package manager (npm comes with Node.js, or install [bun](https://bun.sh/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/admindoc-x.git
cd admindoc-x
```

2. **Install dependencies**

Using npm:
```bash
npm install
```

Or using bun (faster):
```bash
bun install
```

### Running the Project

Start the development server:

```bash
npm run dev
```

Or with bun:
```bash
bun dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
admindoc-x/
├── public/                 # Static assets
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── BeforeAfterSection.tsx
│   │   ├── DemoSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── FloatingDocuments.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   ├── PipelineSection.tsx
│   │   ├── TechStackSection.tsx
│   │   └── UseCasesSection.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

---

## 💻 Development

### Adding New Components

This project uses shadcn/ui for components. To add a new component:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add button
```

### Code Style

- Follow the existing code structure and naming conventions
- Use TypeScript for type safety
- Utilize Tailwind CSS utility classes for styling
- Keep components small and focused on a single responsibility
- Write meaningful commit messages

### Environment Variables

Create a `.env` file in the root directory if you need environment variables:

```env
VITE_API_URL=your_api_url_here
```

Access them in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Ensure your code follows the project's coding standards
- Write clear, descriptive commit messages
- Update documentation as needed
- Add tests if applicable
- Make sure all tests pass before submitting

---
## 👥 Authors

**Tasnim Mtir** - **Ikram Menyaoui** - **Aya Mekni** - **Nour Saibi**


## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---


<div align="center">
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
