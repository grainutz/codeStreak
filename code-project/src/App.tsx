
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotificationService from './services/notificationService';
import { UserProvider } from "@/contexts/UserContext"; 
import ProgressDashboard from "@/components/ProgressDashboard";
import LanguageSelector from "./components/LanguageSelector";
import AuthForm from "./pages/AuthForm";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Sonner />
          <NotificationWrapper />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

const NotificationWrapper = () => {
  useEffect(() => {
    NotificationService.initializePushNotifications();
    NotificationService.scheduleDailyReminder();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<ProgressDashboard />} />
        <Route path="/select-language" element={<LanguageSelector />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;