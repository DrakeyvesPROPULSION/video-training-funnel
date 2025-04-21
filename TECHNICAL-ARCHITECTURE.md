# Video Training Funnel Website - Technical Architecture

This document provides a visual representation of the system architecture, data flows, and component relationships for the video training funnel website.

## System Architecture Overview

```mermaid
flowchart TB
    subgraph Client
        Browser[Web Browser]
        ReactApp[React Application]
    end
    
    subgraph Frontend["Frontend (React)"]
        Pages[Pages]
        Components[Components]
        Hooks[Custom Hooks]
        Context[Context API]
        ReactQuery[React Query]
        Services[Frontend Services]
    end
    
    subgraph Backend["Backend (Node.js/Express)"]
        Express[Express Server]
        Routes[API Routes]
        Controllers[Controllers]
        Middleware[Middleware]
        Services[Backend Services]
    end
    
    subgraph Database["Database (MongoDB)"]
        Users[User Collection]
        Leads[Lead Collection]
        VideoInteractions[Video Interactions Collection]
    end
    
    subgraph ExternalServices["External Services"]
        EmailService[Email Service]
        Analytics[Analytics Service]
        CDN[Content Delivery Network]
    end
    
    Browser <--> ReactApp
    ReactApp <--> Frontend
    
    Frontend <--> Backend
    Backend <--> Database
    Backend <--> ExternalServices
    
    CDN <--> Browser
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    actor User
    participant Client as Web Browser
    participant Frontend as React Frontend
    participant Backend as Express Backend
    participant DB as MongoDB
    participant Email as Email Service
    participant Analytics as Analytics Service
    
    User->>Client: Visit website
    Client->>Frontend: Load React app
    Frontend->>Backend: Request initial data
    Backend->>DB: Query data
    DB->>Backend: Return data
    Backend->>Frontend: Send data
    Frontend->>Client: Render landing page
    
    note over User,Client: User Interaction Flow
    
    User->>Client: Watch intro video
    Client->>Frontend: Track video progress
    Frontend->>Backend: Log video interaction
    Backend->>DB: Store interaction data
    Backend->>Analytics: Send analytics event
    
    User->>Client: Attempt to leave site
    Client->>Frontend: Trigger exit intent
    Frontend->>Client: Display popup with video and form
    
    User->>Client: Submit email form
    Client->>Frontend: Validate input
    Frontend->>Backend: Submit email
    Backend->>DB: Store lead information
    Backend->>Email: Send confirmation email
    Backend->>Analytics: Log conversion
    Backend->>Frontend: Confirm submission
    Frontend->>Client: Display thank you message
    Client->>User: Redirect to external site
```

## Component Architecture

```mermaid
flowchart TB
    App[App.js] --> Router[Routes.js]
    
    Router --> LandingPage[Landing Page]
    Router --> TrainingPage[Training Videos Page]
    Router --> ThankYouPage[Thank You Page]
    
    subgraph "Page Components"
        LandingPage --> HeroSection[Hero Section]
        LandingPage --> VideoIntroSection[Video Intro Section]
        LandingPage --> CTASection[CTA Section]
        
        TrainingPage --> VideoSequence[Video Sequence]
        TrainingPage --> CTAButtons[CTA Buttons]
        
        ThankYouPage --> ThankYouMessage[Thank You Message]
        ThankYouPage --> RedirectInfo[Redirect Information]
    end
    
    subgraph "Shared Components"
        Header[Header Component]
        Footer[Footer Component]
        VideoPlayer[Video Player Component]
        EmailForm[Email Capture Form]
        ExitPopup[Exit Intent Popup]
        Testimonials[Testimonial Slider]
        CountdownTimer[Countdown Timer]
    end
    
    subgraph "Context Providers"
        UserProvider[User Context]
        VideoProvider[Video Context]
    end
    
    subgraph "Custom Hooks"
        UseVideoPlayer[useVideoPlayer]
        UseScrollPosition[useScrollPosition]
        UseExitIntent[useExitIntent]
        UseForm[useForm]
    end
    
    VideoIntroSection --> VideoPlayer
    ExitPopup --> VideoPlayer
    ExitPopup --> EmailForm
    VideoSequence --> VideoPlayer
    
    LandingPage -.-> Header
    LandingPage -.-> Footer
    TrainingPage -.-> Header
    TrainingPage -.-> Footer
    ThankYouPage -.-> Header
    ThankYouPage -.-> Footer
    
    App -.-> UserProvider
    App -.-> VideoProvider
    
    VideoPlayer -.-> UseVideoPlayer
    LandingPage -.-> UseScrollPosition
    App -.-> UseExitIntent
    EmailForm -.-> UseForm
```

## Technology Stack Architecture

```mermaid
flowchart TB
    subgraph "Client Layer"
        HTML[HTML5]
        CSS[CSS3/Tailwind]
        JS[JavaScript ES6+]
    end
    
    subgraph "Frontend Framework"
        React[React.js]
        Router[React Router]
        StateManagement["State Management<br>(Context API)"]
        ServerState["Server State<br>(React Query)"]
    end
    
    subgraph "Frontend Services"
        APIClient[API Client/Axios]
        VideoServices[Video Services]
        ValidationServices[Validation Services]
        ExitIntentDetection[Exit Intent Detection]
    end
    
    subgraph "Backend Framework"
        Node[Node.js]
        Express[Express.js]
        Middleware["Middleware<br>(Auth, Validation, Errors)"]
    end
    
    subgraph "Backend Services"
        EmailService[Email Service]
        AnalyticsService[Analytics Service]
        FileUploadService[File Upload Service]
    end
    
    subgraph "Data Layer"
        MongoDB[MongoDB]
        Mongoose[Mongoose ODM]
        Schema["Data Schemas<br>(Users, Leads, Interactions)"]
    end
    
    subgraph "DevOps & Tools"
        Git[Git/GitHub]
        ESLint[ESLint/Prettier]
        Jest[Jest/Testing]
        Webpack[Webpack/Bundler]
    end
    
    HTML --> React
    CSS --> React
    JS --> React
    
    React --> Router
    React --> StateManagement
    React --> ServerState
    
    ServerState --> APIClient
    
    APIClient --> Express
    
    Express --> Middleware
    Express --> EmailService
    Express --> AnalyticsService
    Express --> FileUploadService
    
    Express --> Mongoose
    Mongoose --> MongoDB
    Schema --> Mongoose
    
    Node --> Express
```

## Exit Intent Popup Implementation

```mermaid
flowchart TB
    subgraph "Exit Intent Detection"
        EventListening[Mouse/Navigation Event Listeners]
        IntentDetection[Exit Intent Algorithm]
        PopupTrigger[Popup Trigger]
    end
    
    subgraph "Popup Component"
        Overlay[Background Overlay]
        Container[Popup Container]
        CloseButton[Close Button]
        VideoComponent[Autoplay Video]
        FormComponent[Email Capture Form]
        Incentive[Incentive Message]
    end
    
    subgraph "Form Processing"
        Validation[Input Validation]
        Submission[Form Submission]
        APICall[API Request]
        Success[Success Handler]
        Error[Error Handler]
    end
    
    subgraph "Backend Processing"
        Route[API Route]
        Controller[Lead Controller]
        Model[Lead Model]
        EmailNotification[Email Confirmation]
        DataStorage[Database Storage]
    end
    
    EventListening --> IntentDetection
    IntentDetection --> PopupTrigger
    PopupTrigger --> Overlay
    PopupTrigger --> Container
    
    Container --> CloseButton
    Container --> VideoComponent
    Container --> FormComponent
    Container --> Incentive
    
    FormComponent --> Validation
    Validation --> Submission
    Submission --> APICall
    APICall --> Success
    APICall --> Error
    
    Success --> PopupTrigger
    
    APICall --> Route
    Route --> Controller
    Controller --> Model
    Controller --> EmailNotification
    Model --> DataStorage
```

## Video Player Architecture

```mermaid
flowchart TB
    subgraph "Video Player Component"
        VideoElement[HTML5 Video Element]
        ControlsContainer[Controls Container]
        ProgressBar[Progress Bar]
        VolumeControl[Volume Control]
        PlayPauseButton[Play/Pause Button]
        FullscreenButton[Fullscreen Button]
    end
    
    subgraph "Hook Implementation"
        UseVideoPlayer[useVideoPlayer Hook]
        VideoRef[Video DOM Reference]
        PlayingState[Playing State]
        ProgressState[Progress State]
        VolumeState[Volume State]
        DurationState[Duration State]
    end
    
    subgraph "Video Context"
        VideoProvider[Video Context Provider]
        CurrentVideo[Current Video Data]
        PlaybackHistory[Playback History]
        CompletionStatus[Completion Status]
    end
    
    subgraph "Auto-Play Implementation"
        UseScrollPosition[useScrollPosition Hook]
        IntersectionObserver[Intersection Observer]
        AutoPlayTrigger[Autoplay Trigger]
        VolumeInitializer[Volume Initializer]
    end
    
    subgraph "Backend Tracking"
        TrackingAPI[Video Tracking API]
        InteractionModel[Interaction Model]
        AnalyticsEvents[Analytics Events]
    end
    
    VideoElement --> ControlsContainer
    ControlsContainer --> ProgressBar
    ControlsContainer --> VolumeControl
    ControlsContainer --> PlayPauseButton
    ControlsContainer --> FullscreenButton
    
    UseVideoPlayer --> VideoRef
    UseVideoPlayer --> PlayingState
    UseVideoPlayer --> ProgressState
    UseVideoPlayer --> VolumeState
    UseVideoPlayer --> DurationState
    
    VideoElement --> UseVideoPlayer
    
    UseScrollPosition --> IntersectionObserver
    IntersectionObserver --> AutoPlayTrigger
    AutoPlayTrigger --> VolumeInitializer
    AutoPlayTrigger --> PlayingState
    VolumeInitializer --> VolumeState
    
    VideoProvider --> CurrentVideo
    VideoProvider --> PlaybackHistory
    VideoProvider --> CompletionStatus
    
    UseVideoPlayer -.-> VideoProvider
    
    PlayingState --> TrackingAPI
    ProgressState --> TrackingAPI
    TrackingAPI --> InteractionModel
    TrackingAPI --> AnalyticsEvents
```

## User Journey Flow

```mermaid
stateDiagram-v2
    [*] --> LandingPage
    
    state LandingPage {
        HeroSection --> VideoSection: Scroll/Click
        VideoSection --> CTASection: Continue Watching
    }
    
    LandingPage --> TrainingPage: Click CTA Button
    
    state TrainingPage {
        Video1 --> Video1CTA: Complete Video
        Video1CTA --> Video2: Click Continue
        Video2 --> Video2CTA: Complete Video
        Video2CTA --> Video3: Click Continue
        Video3 --> Video3CTA: Complete Video
        Video3CTA --> Video4: Click Continue
        Video4 --> FinalCTAs: Complete Video
        FinalCTAs --> BookCall: Click "Book a Call"
        FinalCTAs --> JoinCommunity: Click "Join Community"
    }
    
    state ExitIntent {
        DetectExit --> ShowPopup
        ShowPopup --> EmailForm
        EmailForm --> ProcessSubmission
        ProcessSubmission --> ThankYou
    }
    
    LandingPage --> ExitIntent: Attempt to Leave
    TrainingPage --> ExitIntent: Attempt to Leave
    
    ExitIntent --> ThankYouPage: Submit Email
    
    ThankYouPage --> ExternalSite: Automatic Redirect
    
    BookCall --> ExternalSite
    JoinCommunity --> ExternalSite
    
    ExternalSite --> [*]
```

## Security Measures

```mermaid
flowchart TB
    subgraph "Frontend Security"
        InputValidation[Form Input Validation]
        XSSPrevention[XSS Prevention]
        CSPHeaders[Content Security Policy]
        SecureCookies[Secure Cookies]
    end
    
    subgraph "API Security"
        RateLimiting[Rate Limiting]
        InputSanitization[Input Sanitization]
        Validation[Validation Middleware]
        ErrorHandling[Secure Error Handling]
    end
    
    subgraph "Backend Security"
        Helmet[Helmet.js Security Headers]
        CORS[CORS Configuration]
        MongoSanitize[MongoDB Sanitization]
        EnvProtection[Environment Variable Protection]
    end
    
    subgraph "Authentication" 
        JWT[JWT Implementation]
        TokenExpiry[Token Expiry Management]
        SecureStorage[Secure Token Storage]
    end
    
    subgraph "Data Protection"
        Encryption[Data Encryption]
        Hashing[Password Hashing]
        DataMinimization[Data Minimization]
        GDPR[GDPR Compliance]
    end
    
    InputValidation --> XSSPrevention
    XSSPrevention --> API
    
    API[API Endpoints] --> RateLimiting
    RateLimiting --> InputSanitization
    InputSanitization --> Validation
    Validation --> Controller[Controller]
    
    Controller --> Helmet
    Controller --> CORS
    Controller --> MongoSanitize
    
    Controller --> Encryption
    Controller --> Hashing
    Controller --> DataMinimization
    
    API --> JWT
    JWT --> TokenExpiry
    JWT --> SecureStorage
```

This technical architecture provides a comprehensive visualization of how the various components of the video training funnel website interact with each other, from high-level system architecture down to specific implementation details for core features like the exit intent popup and video player.