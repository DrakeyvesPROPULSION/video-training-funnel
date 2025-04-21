import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for React 18+
import './styles/main-styles.css'; // Import main CSS
import App from './App';
import { UserProvider } from './context/UserContext';
import { VideoProvider } from './context/VideoContext';
import { UIProvider } from './context/UIContext'; // Import UIProvider
// import reportWebVitals from './reportWebVitals'; // Optional: for performance monitoring

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UIProvider> {/* Wrap with UIProvider */}
      <UserProvider>
        <VideoProvider>
          <App />
        </VideoProvider>
      </UserProvider>
    </UIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();