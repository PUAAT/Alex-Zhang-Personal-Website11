"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const SESSION_KEY = "az-intro-played";
const DISABLE_KEY = "az-intro-disabled";

export function CinematicIntro() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const skip =
        pathname !== "/" ||
        reduce ||
        sessionStorage.getItem(SESSION_KEY) === "1" ||
        localStorage.getItem(DISABLE_KEY) === "1";
      if (skip) return;
      setShow(true);
      const t = setTimeout(() => finish(), 4800);
      return () => clearTimeout(t);
    } catch {
      // Storage blocked: skip the intro rather than replaying it on every page.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  function finish(disableForever = false) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
      if (disableForever) localStorage.setItem(DISABLE_KEY, "1");
    } catch {}
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Introduction"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6 text-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-serif text-5xl tracking-editorial text-paper sm:text-7xl"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            ALEX ZHANG
          </motion.h1>
          <motion.span
            className="mt-8 block h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 2.2 }}
          />
          <motion.p
            className="mt-8 font-serif text-xl italic text-mute sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.8 }}
          >
            {profile.tagline}
          </motion.p>
          <div className="absolute bottom-8 flex gap-6 text-xs uppercase tracking-widest text-mute">
            <button onClick={() => finish()} className="hover:text-gold">Skip intro</button>
            <button onClick={() => finish(true)} className="hover:text-gold">Don&apos;t show again</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
