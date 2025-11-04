"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AnimateLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  // Automatically scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1], // smooth "easeOutExpo" style
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
