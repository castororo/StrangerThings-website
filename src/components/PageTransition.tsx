import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* 
              We use a fixed overlay for the "static" effect that appears 
              during the transition. 
            */}
            <motion.div
                className="fixed inset-0 z-[9999] pointer-events-none loading-static bg-black"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {children}
        </motion.div>
    );
}
