"use client";

import { motion } from "framer-motion";

/* ─── SVG Icon primitives ─────────────────────────────────────── */

const KeyIcon = ({
  size = 28,
  style,
  className,
}: {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M11.5 11.5L20 3" />
    <path d="M18 5l2 2" />
    <path d="M15.5 7.5l2 2" />
  </svg>
);

const PenNibIcon = ({
  size = 30,
  style,
  className,
}: {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
    <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 16.649a1 1 0 0 0 .776.746L13 18.5" />
    <path d="m2.3 2.3 7.286 7.286" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9A9590"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const Sparkle = ({
  size = 14,
  color = "#1A1A1A",
  style,
  className,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    style={style}
    className={className}
  >
    <path d="M8 0 C8 0 8.8 3.5 10.5 5.5 C12.5 7.2 16 8 16 8 C16 8 12.5 8.8 10.5 10.5 C8.8 12.5 8 16 8 16 C8 16 7.2 12.5 5.5 10.5 C3.5 8.8 0 8 0 8 C0 8 3.5 7.2 5.5 5.5 C7.2 3.5 8 0 8 0Z" />
  </svg>
);

/* ─── Hand-drawn dangling key for Polaroid corner ──────────────── */
const PolaroidDanglingKey = () => (
  <svg
    width="28"
    height="50"
    viewBox="0 0 28 50"
    fill="none"
    stroke="#3A3530"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    {/* Top circle loop (hanging from pin) */}
    <circle cx="14" cy="8" r="6" />
    {/* Connecting link */}
    <line x1="14" y1="14" x2="14" y2="16" />
    {/* Key bow handle */}
    <circle cx="14" cy="23" r="7" />
    {/* Key shaft */}
    <line x1="14" y1="30" x2="14" y2="47" />
    {/* Key bits / teeth */}
    <line x1="14" y1="39" x2="20" y2="39" />
    <line x1="14" y1="43" x2="18" y2="43" />
    <line x1="14" y1="47" x2="20" y2="47" />
  </svg>
);

/* ─── Decorative tiny icons for Quote card ─────────────────────── */
const TinySparkle = ({ color = "#B8AEE8", size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M8 0 C8 0 8.8 3.5 10.5 5.5 C12.5 7.2 16 8 16 8 C16 8 12.5 8.8 10.5 10.5 C8.8 12.5 8 16 8 16 C8 16 7.2 12.5 5.5 10.5 C3.5 8.8 0 8 0 8 C0 8 3.5 7.2 5.5 5.5 C7.2 3.5 8 0 8 0Z" />
  </svg>
);

const TinyKey = ({ color = "#B8AEE8" }: { color?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="M11.5 11.5L20 3" />
    <path d="M18 5l2 2" />
    <path d="M15.5 7.5l2 2" />
  </svg>
);

const TinyPen = ({ color = "#B8AEE8" }: { color?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

/* ─── Burst tick marks around center card ───────────────────────── */
const BurstLines = () => (
  <svg
    viewBox="0 0 380 220"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      overflow: "visible",
    }}
  >
    {/* Top-Left Corner */}
    <line x1="0" y1="0" x2="-12" y2="-12" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Top-Middle-Left */}
    <line x1="120" y1="-2" x2="116" y2="-15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Top-Middle-Right */}
    <line x1="260" y1="-2" x2="264" y2="-15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Top-Right Corner */}
    <line x1="380" y1="0" x2="392" y2="-10" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right-Top */}
    <line x1="382" y1="65" x2="395" y2="60" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right-Bottom */}
    <line x1="382" y1="155" x2="395" y2="160" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom-Right Corner */}
    <line x1="380" y1="220" x2="392" y2="230" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom-Middle-Right */}
    <line x1="260" y1="222" x2="264" y2="235" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom-Middle-Left */}
    <line x1="120" y1="222" x2="116" y2="235" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom-Left Corner */}
    <line x1="0" y1="220" x2="-12" y2="230" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Left-Bottom */}
    <line x1="-2" y1="155" x2="-15" y2="160" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Left-Top */}
    <line x1="-2" y1="65" x2="-15" y2="60" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ─── Hand-Drawn sketchy SVG border for center card ─────────────── */
const SketchyBorder = () => (
  <svg
    viewBox="0 0 380 220"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
    preserveAspectRatio="none"
  >
    {/* Main outline trace */}
    <path
      d="M 28 6 
         C 120 4, 260 8, 352 6 
         C 368 6, 374 12, 374 24 
         C 372 80, 376 140, 374 196 
         C 374 208, 368 214, 352 214 
         C 260 212, 120 216, 28 214 
         C 12 214, 6 208, 6 196 
         C 8 140, 4 80, 6 24 
         C 6 12, 12 6, 28 6 Z"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Second wobbly outline overlap */}
    <path
      d="M 25 9 
         C 110 7, 270 10, 355 8 
         C 370 8, 372 18, 371 30 
         C 373 95, 372 155, 371 189 
         C 371 205, 365 211, 350 211 
         C 275 209, 110 212, 31 211 
         C 15 211, 9 205, 9 189 
         C 11 145, 8 75, 9 30 
         C 9 15, 15 9, 25 9 Z"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN HERO COMPONENT                                           */
/* ═══════════════════════════════════════════════════════════════ */

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* ── BACKGROUND DOODLE ICONS ─────────────────────────────── */}

      {/* TOP CENTER: Key */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "60px",
          left: "45%",
          transform: "rotate(-20deg)",
          opacity: 0.65,
          color: "#5A5550",
        }}
      >
        <KeyIcon size={32} />
      </div>

      {/* TOP CENTER: Pen Nib (overlapping Key) */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "50px",
          left: "52%",
          transform: "rotate(20deg)",
          opacity: 0.65,
          color: "#5A5550",
        }}
      >
        <PenNibIcon size={36} />
      </div>

      {/* LEFT SIDE: Key below/beside Polaroid */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "65%",
          left: "8%",
          transform: "rotate(-30deg)",
          opacity: 0.55,
          color: "#8A8680",
        }}
      >
        <KeyIcon size={38} />
      </div>

      {/* RIGHT SIDE / BOTTOM RIGHT: Pen Nib */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "70%",
          right: "6%",
          transform: "rotate(-15deg)",
          opacity: 0.55,
          color: "#8A8680",
        }}
      >
        <PenNibIcon size={32} />
      </div>

      {/* ── DUSTED SPARKLES ────────────────────────────────────── */}
      
      {/* 1. top:8%, left:42% - lavender, 14px */}
      <div className="hero-bg-doodle" style={{ top: "8%", left: "42%" }}>
        <Sparkle size={14} color="#C4BAE8" />
      </div>

      {/* 2. top:12%, right:15% - lavender, 10px */}
      <div className="hero-bg-doodle" style={{ top: "12%", right: "15%" }}>
        <Sparkle size={10} color="#C4BAE8" />
      </div>

      {/* 3. top:25%, right:8% - black, 18px */}
      <div className="hero-bg-doodle" style={{ top: "25%", right: "8%", opacity: 0.35 }}>
        <Sparkle size={18} color="#3A3530" />
      </div>

      {/* 4. top:50%, left:5% - lavender, 12px */}
      <div className="hero-bg-doodle" style={{ top: "50%", left: "5%" }}>
        <Sparkle size={12} color="#C4BAE8" />
      </div>

      {/* 5. top:75%, left:32% - black, 10px */}
      <div className="hero-bg-doodle" style={{ top: "75%", left: "32%", opacity: 0.35 }}>
        <Sparkle size={10} color="#3A3530" />
      </div>

      {/* 6. top:80%, right:22% - lavender, 16px */}
      <div className="hero-bg-doodle" style={{ top: "80%", right: "22%" }}>
        <Sparkle size={16} color="#C4BAE8" />
      </div>

      {/* 7. top:15%, left:18% - black, 8px */}
      <div className="hero-bg-doodle" style={{ top: "15%", left: "18%", opacity: 0.35 }}>
        <Sparkle size={8} color="#3A3530" />
      </div>

      {/* 8. top:65%, right:38% - lavender, 20px */}
      <div className="hero-bg-doodle" style={{ top: "65%", right: "38%" }}>
        <Sparkle size={20} color="#C4BAE8" />
      </div>

      {/* 9. top:30%, left:25% - lavender, 12px */}
      <div className="hero-bg-doodle" style={{ top: "30%", left: "25%" }}>
        <Sparkle size={12} color="#C4BAE8" />
      </div>

      {/* 10. top:85%, left:15% - black, 14px */}
      <div className="hero-bg-doodle" style={{ top: "85%", left: "15%", opacity: 0.35 }}>
        <Sparkle size={14} color="#3A3530" />
      </div>

      {/* 11. top:45%, right:30% - black, 9px */}
      <div className="hero-bg-doodle" style={{ top: "45%", right: "30%", opacity: 0.35 }}>
        <Sparkle size={9} color="#3A3530" />
      </div>

      {/* 12. top:70%, right:10% - lavender, 15px */}
      <div className="hero-bg-doodle" style={{ top: "70%", right: "10%" }}>
        <Sparkle size={15} color="#C4BAE8" />
      </div>

      {/* ── THREE-CARD LAYOUT ───────────────────────────────────── */}
      <div className="hero-card-row">
        {/* ══ LEFT: POLAROID CARD ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: -2, y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          style={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Key dangling off top-left */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-10px",
              zIndex: 20,
              transform: "rotate(15deg)",
            }}
          >
            <PolaroidDanglingKey />
          </div>

          {/* Polaroid body */}
          <div
            style={{
              width: "200px",
              height: "240px",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              padding: "12px 12px 0 12px",
              boxShadow: "4px 6px 18px rgba(0,0,0,0.18)",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            {/* Photo area (~75% of height) */}
            <div
              style={{
                width: "100%",
                height: "165px",
                backgroundColor: "#C8C4BE",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <CameraIcon />
                <span
                  style={{
                    color: "#9A9590",
                    fontSize: "18px",
                    lineHeight: 1,
                    fontWeight: 300,
                    fontFamily: "var(--hero-sans, 'Inter', sans-serif)",
                    marginTop: "-2px",
                  }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Caption area (at least 50px) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--hero-italic, 'Lora', 'Playfair Display', 'Georgia', serif)",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#3A3530",
                  letterSpacing: "0.02em",
                }}
              >
                Vibes.
              </span>
            </div>
          </div>
        </motion.div>

        {/* ══ CENTER: MAIN TITLE CARD ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, scale: 1.01, transition: { type: "spring", stiffness: 250, damping: 20 } }}
          style={{
            position: "relative",
            width: "380px",
            height: "220px",
            flexShrink: 0,
          }}
        >
          {/* Sketchy border + burst */}
          <SketchyBorder />
          <BurstLines />

          {/* Card background */}
          <div
            style={{
              position: "absolute",
              inset: "6px",
              backgroundColor: "#FDFAF5",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "36px 40px",
              boxSizing: "border-box",
            }}
          >
            {/* IZZY'S */}
            <div
              style={{
                fontFamily: "var(--hero-serif, 'Playfair Display', 'Georgia', serif)",
                fontWeight: 900,
                fontSize: "68px",
                color: "#1A1A1A",
                lineHeight: 0.95,
                letterSpacing: "-1px",
              }}
            >
              IZZY&apos;S
            </div>

            {/* ALTER EGO */}
            <div
              style={{
                fontFamily: "var(--hero-serif, 'Playfair Display', 'Georgia', serif)",
                fontWeight: 900,
                fontSize: "68px",
                lineHeight: 0.95,
                letterSpacing: "-1px",
                display: "flex",
                alignItems: "baseline",
                marginTop: "2px",
              }}
            >
              <span style={{ color: "#EB47A5" }}>ALTER</span>
              <span style={{ color: "#1A1A1A" }}>&nbsp;EGO</span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "var(--hero-sans, 'Inter', sans-serif)",
                fontWeight: 300,
                fontSize: "14px",
                color: "#777770",
                textAlign: "center",
                lineHeight: 1.6,
                marginTop: "16px",
                maxWidth: "280px",
              }}
            >
              A digital playground for the art of noticing everything.
            </p>
          </div>
        </motion.div>

        {/* ══ RIGHT: QUOTE CARD ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 1.5, y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          style={{
            position: "relative",
            width: "200px",
            height: "185px",
            flexShrink: 0,
            backgroundColor: "#EDE8DF",
            borderRadius: "16px",
            boxShadow: "3px 5px 14px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 20px",
            overflow: "visible",
            boxSizing: "border-box",
          }}
        >
          {/* Decorative tiny icons inside the card */}
          {/* Sparkle top-right */}
          <div style={{ position: "absolute", top: "14px", right: "14px" }}>
            <TinySparkle color="#B8AEE8" size={14} />
          </div>
          {/* Key outline bottom-left */}
          <div style={{ position: "absolute", bottom: "14px", left: "14px", transform: "rotate(20deg)" }}>
            <TinyKey color="#B8AEE8" />
          </div>
          {/* Pen nib bottom-right */}
          <div style={{ position: "absolute", bottom: "14px", right: "14px" }}>
            <TinyPen color="#B8AEE8" />
          </div>
          {/* Sparkle left-center */}
          <div style={{ position: "absolute", top: "80px", left: "12px" }}>
            <TinySparkle color="#9B8FD4" size={10} />
          </div>

          {/* Quote text */}
          <p
            style={{
              fontFamily: "var(--hero-italic, 'Lora', 'Playfair Display', 'Georgia', serif)",
              fontStyle: "italic",
              fontSize: "17px",
              fontWeight: 400,
              color: "#2A2520",
              lineHeight: 1.65,
              textAlign: "center",
              margin: 0,
              position: "relative",
              zIndex: 2,
            }}
          >
            &ldquo;Creativity is allowing yourself to make mistakes.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
