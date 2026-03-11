"use client";

import { useState, useEffect } from "react";
import { IntroAnimation } from "./IntroAnimation";
import { Navbar } from "./Navbar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showLogo={true} />
      {children}
    </>
  );
}
