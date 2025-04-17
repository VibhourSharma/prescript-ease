import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrescriptionProvider } from "@/context/PrescriptionContext";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import MedicineSearch from "./pages/medicines/MedicineSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PrescriptionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
            <Route path="/features" element={<Features />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/medicines" element={<MedicineSearch />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PrescriptionProvider>
  </QueryClientProvider>
);

export default App;
