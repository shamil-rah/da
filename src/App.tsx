
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context to manage our app state
import { AppContextProvider } from "./contexts/AppContext";

// Pages
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Availability from "./pages/Availability";
import Pricing from "./pages/Pricing";
import Bookings from "./pages/Bookings";
import ClientView from "./pages/ClientView";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to track if user is a new signup that needs onboarding
  const [isNewUser, setIsNewUser] = useState(false);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    // If authenticated but is a new user, redirect to onboarding
    if (isNewUser) {
      return <Navigate to="/onboarding" />;
    }

    return <>{children}</>;
  };

  // Onboarding route - only for new users who have just signed up
  const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    // If user is not new (has completed onboarding), send to dashboard
    if (!isNewUser) {
      return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth page - visible for non-authenticated users */}
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                    (isNewUser ? <Navigate to="/onboarding" /> : <Navigate to="/dashboard" />) 
                    : 
                    <Auth 
                      onAuthenticate={() => {
                        setIsAuthenticated(true);
                        setIsNewUser(false); // Existing users don't need onboarding
                      }}
                      onSignUp={() => {
                        setIsAuthenticated(true);
                        setIsNewUser(true); // New users need onboarding
                      }}
                    />
                } 
              />
              
              {/* Onboarding page - only for new users */}
              <Route 
                path="/onboarding" 
                element={
                  <OnboardingRoute>
                    <Onboarding onComplete={() => setIsNewUser(false)} />
                  </OnboardingRoute>
                } 
              />
              
              {/* Protected app pages - only accessible when authenticated and onboarded */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/portfolio" 
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/availability" 
                element={
                  <ProtectedRoute>
                    <Availability />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pricing" 
                element={
                  <ProtectedRoute>
                    <Pricing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Public client booking page - always accessible */}
              <Route path="/:username" element={<ClientView />} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default App;
