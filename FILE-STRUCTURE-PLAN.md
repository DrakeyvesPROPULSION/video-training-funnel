# Video Training Funnel Website - File Structure Plan

This document provides a complete blueprint of the file structure for implementing the video training funnel website. Use this as a guide to create the actual files and directories.

## Root Directory Structure

```
video-training-funnel/
├── README.md (Primary documentation)
├── README-REDIRECT.md (Redirect to primary documentation)
├── frontend/ (React frontend application)
└── backend/ (Node.js/Express backend application)
```

## Frontend Directory Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       │   └── .gitkeep
│       ├── fonts/
│       │   └── .gitkeep
│       └── videos/
│           └── .gitkeep
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
│   │   │   └── .gitkeep
│   │   ├── fonts/
│   │   │   └── .gitkeep
│   │   └── videos/
│   │       └── .gitkeep
│   ├── App.js
│   ├── index.js
│   └── routes.js
└── package.json
```

## Backend Directory Structure

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

## Frontend File Descriptions

### Public Directory

- **index.html**: Main HTML entry point for the React application
- **favicon.ico**: Website favicon
- **manifest.json**: Progressive Web App manifest file
- **assets/**: Directory for static assets like images, fonts, and videos

### Source Directory (src)

#### Pages

- **index.jsx**: Landing page with three main sections (hero, video intro, CTA)
- **training-videos.jsx**: Page with 4 sequential training videos and CTAs
- **thank-you-page.jsx**: Confirmation page after email submission

#### Components

##### Layout Components
- **header-component.jsx**: Site header with navigation
- **footer-component.jsx**: Site footer with links and information

##### Video Components
- **video-player.jsx**: Custom video player with autoplay and volume control
- **video-progress.jsx**: Component for tracking and displaying video progress
- **video-controls.jsx**: Custom video player controls

##### Form Components
- **email-capture-form.jsx**: Form for collecting user emails
- **exit-intent-popup.jsx**: Exit intent popup with video and form

##### UI Components
- **cta-button.jsx**: Reusable call-to-action button component
- **section-divider.jsx**: Section separation component
- **testimonial-slider.jsx**: Component for displaying testimonials
- **countdown-timer.jsx**: Timer component for creating urgency

#### Styles
- **main-styles.css**: Core application styles
- **video-player-styles.css**: Styles for the video player components
- **popup-styles.css**: Styles for popups and overlays
- **form-styles.css**: Styles for form elements
- **responsive-mobile.css**: Mobile-specific responsive styles
- **responsive-tablet.css**: Tablet-specific responsive styles

#### Services
- **video-service.js**: Handling video-related functionalities
- **form-validation.js**: Form validation utilities
- **scroll-observer.js**: Service for scroll position observation
- **exit-intent-detection.js**: Service for detecting exit intent
- **api-service.js**: API interaction service

#### Hooks
- **useVideoPlayer.js**: Custom hook for video player functionality
- **useScrollPosition.js**: Custom hook for scroll position tracking

#### Context
- **VideoContext.js**: Context for video state management
- **UserContext.js**: Context for user data management

#### Core Files
- **App.js**: Main React component
- **index.js**: React application entry point
- **routes.js**: Application routing configuration

## Backend File Descriptions

### Controllers
- **user-controller.js**: Handling user-related operations
- **video-controller.js**: Managing video tracking and analytics
- **lead-controller.js**: Processing lead capture operations

### Models
- **user-model.js**: User data schema
- **lead-model.js**: Lead/email capture data schema
- **video-interaction-model.js**: Schema for tracking video interactions

### Routes
- **api-routes.js**: Main API route definitions
- **user-routes.js**: User-specific API routes
- **lead-routes.js**: Lead management API routes

### Middleware
- **authentication.js**: Authentication middleware
- **input-validation.js**: Request data validation middleware
- **error-handler.js**: Error handling middleware
- **request-logger.js**: Request logging middleware

### Services
- **email-service.js**: Email processing service
- **analytics-service.js**: Analytics and tracking service
- **video-service.js**: Video-related operations service

### Utils
- **logger.js**: Logging utility
- **validators.js**: Data validation utilities
- **helpers.js**: General helper functions

### Configuration
- **config.js**: Application configuration
- **.env.example**: Environment variables template

### Core Files
- **server.js**: Express server entry point
- **package.json**: Backend dependencies and scripts