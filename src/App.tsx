import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { SoundProvider } from "@/context/SoundContext";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import AnimatedRoutes from "./components/AnimatedRoutes";
import GlobalSoundEffects from "./components/GlobalSoundEffects";

const DimensionShifter = lazy(() => import("./components/DimensionShifter"));
const AmbientTear = lazy(() => import("./components/AmbientTear"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <LoadingScreen />
          <CustomCursor />
          <GlobalSoundEffects />

          <Suspense fallback={null}>
            <DimensionShifter />
            <AmbientTear />
          </Suspense>

          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </SoundProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;