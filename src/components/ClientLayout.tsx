"use client";

import { useState, useEffect } from "react";
import { IntroAnimation } from "./IntroAnimation";
import { Navbar } from "./Navbar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Check if intro has been shown this session
    const introShown = sessionStorage.getItem("introShown");
    if (!introShown) {
      setShowIntro(true);
    } else {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroFinished(true);
    sessionStorage.setItem("introShown", "true");
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Navbar showLogo={introFinished} />
      {children}
    </>
  );
}
