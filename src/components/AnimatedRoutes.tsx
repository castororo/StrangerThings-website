import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import AcademyPage from "@/pages/AcademyPage";
import NotFound from "@/pages/NotFound";
import PageTransition from "./PageTransition";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <Index />
                        </PageTransition>
                    }
                />
                <Route
                    path="/academy"
                    element={
                        <PageTransition>
                            <AcademyPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="*"
                    element={
                        <PageTransition>
                            <NotFound />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}
