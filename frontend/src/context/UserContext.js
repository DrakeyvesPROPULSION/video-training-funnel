import React, { createContext, useState, useEffect, useContext } from 'react';
// import apiService from '../services/api-service'; // Import when API service is ready

// Create the context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // User object or null if not logged in
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial auth check
  const [error, setError] = useState(null); // Store any auth errors

  // Effect to check for existing session on initial load
  useEffect(() => {
    const checkUserSession = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Placeholder: Replace with actual API call to check session/token validity
        // const sessionUser = await apiService.checkSession();
        // if (sessionUser) {
        //   setUser(sessionUser);
        // } else {
        //   setUser(null);
        // }
        // Simulate async check for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        // Assume no user initially for this placeholder
        setUser(null);

      } catch (err) {
        console.error("Error checking user session:", err);
        setError("Failed to load user session.");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Login function (placeholder)
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // Placeholder: Replace with actual API call to login
      // const loggedInUser = await apiService.login(credentials);
      // setUser(loggedInUser);
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser({ id: '123', email: credentials.email, name: 'Test User' }); // Example user
      return true; // Indicate success
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please check your credentials.");
      setUser(null);
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function (placeholder)
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Placeholder: Replace with actual API call to logout
      // await apiService.logout();
      // Simulate logout
      await new Promise(resolve => setTimeout(resolve, 200));
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
      // Optionally keep user logged in if server logout fails? Depends on requirements.
    } finally {
      setIsLoading(false);
    }
  };

  // Value provided to consuming components
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}