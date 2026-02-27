import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminPages from "./pages/AdminPages";
import AdminPageEditor from "./pages/AdminPageEditor";
import AdminFAQ from "./pages/AdminFAQ";
import AdminContactForm from "./pages/AdminContactForm";
import AdminHomePage from "./pages/AdminHomePage";
import AdminLeads from "./pages/AdminLeads";
import AdminNotifications from "./pages/AdminNotifications";
import AdminCharts from "./pages/AdminCharts";
import AdminLayout from "./components/admin/AdminLayout";
import PropertyPage from "./pages/PropertyPage";
import CatalogPage from "./pages/CatalogPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/property-template" element={<Index />} />
            <Route path="/objects/:slug" element={<PropertyPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPages />} />
              <Route path="pages/:id" element={<AdminPageEditor />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="contact" element={<AdminContactForm />} />
              <Route path="homepage" element={<AdminHomePage />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="charts" element={<AdminCharts />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
