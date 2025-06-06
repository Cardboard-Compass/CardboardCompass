# TCG Collection Manager

A comprehensive trading card game collection management app built with React Native and Expo.

## Features

- 📸 Card scanning with image recognition
- 💰 Real-time price tracking (TCGPlayer & eBay AU)
- 📊 Collection analytics and statistics
- 🔄 Cross-platform synchronization
- 🌙 Dark mode support
- 🔐 Secure authentication
- 📱 Native mobile experience
- 🌐 Web compatibility

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── app/                   # Application routes
│   ├── (auth)/           # Authentication routes
│   ├── (tabs)/           # Main tab navigation
│   └── _layout.tsx       # Root layout configuration
├── components/           # Reusable components
├── constants/            # App constants and configuration
├── hooks/               # Custom React hooks
├── providers/           # Context providers
├── utils/              # Utility functions
└── docs/               # Documentation
```

## Technology Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router
- **State Management**: React Query
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Analytics**: Firebase Analytics
- **Error Tracking**: Sentry
