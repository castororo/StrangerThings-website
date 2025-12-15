import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { SoundProvider } from "@/context/SoundContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const DimensionShifter = lazy(() => import("./components/DimensionShifter"));
const EntityRadar = lazy(() => import("./components/EntityRadar"));
const AmbientTear = lazy(() => import("./components/AmbientTear"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <Suspense fallback={null}>
            <DimensionShifter />
            <EntityRadar />
            <AmbientTear />
          </Suspense>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SoundProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;