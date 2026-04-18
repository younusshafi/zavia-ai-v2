"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      setPrevPath(pathname);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-0.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.8 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.4, ease: "easeOut" },
            opacity: { duration: 0.3, delay: 0.2 },
          }}
          style={{
            transformOrigin: "left",
            background: "linear-gradient(90deg, #6872D6, #8B93E5, #34D399)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
