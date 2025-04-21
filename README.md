# Video Training Funnel Website

A professional React/Node.js web application that features a structured video training funnel with email capture capabilities and exit intent functionality.

## Project Status
**Current Status**: Early Development - Setting up project structure and core components.

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Development Roadmap](#development-roadmap)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Workflow Guidelines](#workflow-guidelines)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Project Overview

This project implements a professional video training funnel website with the following core components:

1. **Landing Page** with three distinct sections:
   - Hero section with compelling headline and smooth-scroll button
   - Video introduction section with auto-playing video
   - Call-to-action section with redirection to training videos

2. **Training Video Page** featuring:
   - 4 sequential training videos with high-quality player
   - Customizable CTA buttons below each video
   - Dual CTA buttons after the final video ("Book a Call" and "Join Community")

3. **Exit Intent Functionality**:
   - Exit detection on all pages
   - Overlay popup with auto-playing video
   - Email capture form for lead generation
   - Clear messaging about the free incentive

## Directory Structure

### Frontend Directory Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       ├── fonts/
│       └── videos/
├── src/
│   ├── pages/
│   │   ├── index.jsx
│   │   ├── training-videos.jsx
│   │   └── thank-you-page.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header-component.jsx
│   │   │   └── footer-component.jsx
│   │   ├── video/
│   │   │   ├── video-player.jsx
│   │   │   ├── video-progress.jsx
│   │   │   └── video-controls.jsx
│   │   ├── forms/
│   │   │   ├── email-capture-form.jsx
│   │   │   └── exit-intent-popup.jsx
│   │   └── ui/
│   │       ├── cta-button.jsx
│   │       ├── section-divider.jsx
│   │       ├── testimonial-slider.jsx
│   │       └── countdown-timer.jsx
│   ├── styles/
│   │   ├── main-styles.css
│   │   ├── video-player-styles.css
│   │   ├── popup-styles.css
│   │   ├── form-styles.css
│   │   ├── responsive-mobile.css
│   │   └── responsive-tablet.css
│   ├── services/
│   │   ├── video-service.js
│   │   ├── form-validation.js
│   │   ├── scroll-observer.js
│   │   ├── exit-intent-detection.js
│   │   └── api-service.js
│   ├── hooks/
│   │   ├── useVideoPlayer.js
│   │   └── useScrollPosition.js
│   ├── context/
│   │   ├── VideoContext.js
│   │   └── UserContext.js
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── videos/
│   ├── App.js
│   ├── index.js
│   └── routes.js
└── package.json
```

### Backend Directory Structure

```
backend/
├── controllers/
│   ├── user-controller.js
│   ├── video-controller.js
│   └── lead-controller.js
├── models/
│   ├── user-model.js
│   ├── lead-model.js
│   └── video-interaction-model.js
├── routes/
│   ├── api-routes.js
│   ├── user-routes.js
│   └── lead-routes.js
├── middleware/
│   ├── authentication.js
│   ├── input-validation.js
│   ├── error-handler.js
│   └── request-logger.js
├── services/
│   ├── email-service.js
│   ├── analytics-service.js
│   └── video-service.js
├── utils/
│   ├── logger.js
│   ├── validators.js
│   └── helpers.js
├── config/
│   ├── config.js
│   └── .env.example
├── server.js
└── package.json
```

## Features

### Landing Page

1. **Hero Section**
   - Clean headline and compelling subheadline
   - Prominent CTA button that smoothly scrolls to the video section
   - Responsive design for all device sizes

2. **Video Introduction Section**
   - Auto-play functionality triggered at 50% volume when scrolled to
   - Custom video player with volume controls
   - Progress navigation for user orientation

3. **Call-to-Action Section**
   - Clear value proposition messaging
   - Prominently styled button redirecting to training videos
   - Supporting social proof elements

### Training Video Page

- Sequential presentation of 4 training videos
- High-quality custom video player
- Unique CTA button for each video
- Special dual CTA layout after final video:
  - "Book a Call" primary button
  - "Join Community" secondary button

### Exit Intent System

- Exit detection algorithm
- Overlay popup designed for maximum conversion
- Auto-playing promotional video (50% initial volume)
- Email capture form with validation
- Clear incentive messaging
- Thank-you confirmation process

## Technical Requirements

- **Architecture**: Modular, maintainable codebase with minimal redundancy
- **Backend Focus**: Prioritize robust backend functionality with minimal frontend initially
- **Scalability**: Design with future growth in mind
- **Debugging**: Comprehensive debugging tools and logging
- **Version Control**: Git-based workflow with meaningful commits
- **Event Handling**: Proper management of all interactive elements
- **State Management**: Context API for UI state and React Query for server state
- **Video Optimization**: Efficient loading and playback for performance
- **Responsiveness**: Full support for mobile, tablet, and desktop devices

## Development Roadmap

### Phase 1: Setup
- [x] Initialize project repositories
- [x] Set up directory structure
- [ ] Install required dependencies
- [ ] Configure development environment
- [x] Prepare for version control setup

**Progress Notes:**
- Project initialized with comprehensive documentation (README.md, README-REDIRECT.md)
- File structure plan created (FILE-STRUCTURE-PLAN.md)
- Development implementation plan established (DEVELOPMENT-IMPLEMENTATION-PLAN.md)
- Technical architecture diagrams created (TECHNICAL-ARCHITECTURE.md)
- Complete directory structure created with all empty files in place
- Git setup instructions prepared (GIT-SETUP.md)
- Next step: Install required dependencies and configure development environment

### Phase 2: Frontend Core
- [ ] Create basic page layouts
- [ ] Implement responsive design framework
- [ ] Develop core components (video player, forms)
- [ ] Set up React routing between pages
- [ ] Implement form validation

### Phase 3: Video Functionality
- [ ] Create video player component with autoplay at 50% volume
- [ ] Implement scroll-based video triggering
- [ ] Develop video progress navigation
- [ ] Create sequential video playback system
- [ ] Set up CTA buttons for each video

### Phase 4: Exit Intent & Email Capture
- [ ] Implement exit intent detection
- [ ] Create exit popup with autoplay video
- [ ] Develop email capture form with validation
- [ ] Set up backend connection for form submission
- [ ] Create thank-you page flow

### Phase 5: Backend Development
- [ ] Set up Express server
- [ ] Configure database connection
- [ ] Implement API routes for email capture
- [ ] Create user/lead data models and controllers
- [ ] Set up email service integration
- [ ] Implement tracking and analytics

### Phase 6: Integration & Testing
- [ ] Connect frontend components to backend API
- [ ] Implement end-to-end user flows
- [ ] Test video playback on various devices
- [ ] Validate email capture and data storage
- [ ] Test exit intent functionality

### Phase 7: Optimization & Deployment
- [ ] Optimize video loading and playback
- [ ] Implement lazy loading and performance improvements
- [ ] Set up production environment
- [ ] Deploy frontend and backend
- [ ] Final testing in production environment

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (for database)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Drakeyvespropulsion/video-training-funnel.git
   cd video-training-funnel
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   ```bash
   cd backend/config
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start development servers (from the root directory):
   ```bash
   npm run dev
   ```
   
   This will concurrently start both frontend and backend servers.

## Technology Stack

### Frontend
- React.js
- React Router
- Context API (state management)
- React Query (server state)
- CSS Modules / Tailwind CSS
- HTML5 Video API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Nodemailer (for email services)

### DevOps & Tools
- Git & GitHub
- ESLint & Prettier
- Jest & React Testing Library
- Webpack
- Docker (optional)

## Workflow Guidelines

1. **Branching Strategy**:
   - `main` - Production-ready code
   - `develop` - Integration branch
   - `feature/feature-name` - For new features
   - `bugfix/bug-name` - For bug fixes

2. **Commit Messages**:
   - Use present tense ("Add feature" not "Added feature")
   - Be descriptive but concise
   - Reference issue numbers when applicable

3. **Pull Request Process**:
   - Create PR from feature branch to develop
   - Require code review before merging
   - Ensure all tests pass
   - Delete branch after merging

4. **Code Style**:
   - Follow ESLint configuration
   - Use consistent naming conventions
   - Document complex logic with comments

## Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.