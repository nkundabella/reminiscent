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
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9E9B96"
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
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    style={style}
  >
    <path d="M8 0 C8 0 8.8 3.5 10.5 5.5 C12.5 7.2 16 8 16 8 C16 8 12.5 8.8 10.5 10.5 C8.8 12.5 8 16 8 16 C8 16 7.2 12.5 5.5 10.5 C3.5 8.8 0 8 0 8 C0 8 3.5 7.2 5.5 5.5 C7.2 3.5 8 0 8 0Z" />
  </svg>
);

/* ─── Key icon for Polaroid corner ─────────────────────────────── */
const SmallKey = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A1A1A"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M11.5 11.5L20 3" />
    <path d="M18 5l2 2" />
    <path d="M15.5 7.5l2 2" />
  </svg>
);

/* ─── Decorative tiny icons for Quote card ─────────────────────── */
const TinySparkle = ({ color = "#B8AEE0" }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill={color}>
    <path d="M8 0 C8 0 8.8 3.5 10.5 5.5 C12.5 7.2 16 8 16 8 C16 8 12.5 8.8 10.5 10.5 C8.8 12.5 8 16 8 16 C8 16 7.2 12.5 5.5 10.5 C3.5 8.8 0 8 0 8 C0 8 3.5 7.2 5.5 5.5 C7.2 3.5 8 0 8 0Z" />
  </svg>
);

const TinyKey = ({ color = "#C4BAE8" }: { color?: string }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M11.5 11.5L20 3" />
    <path d="M18 5l2 2" />
    <path d="M15.5 7.5l2 2" />
  </svg>
);

const TinyPen = ({ color = "#9B8FD4" }: { color?: string }) => (
  <svg
    width="13"
    height="13"
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
const BurstLines = () => {
  const count = 10;
  const innerR = 118; // distance from center (card half-diagonal ≈ 110px)
  const outerR = 132;
  const cx = 150; // half of 300px wide card
  const cy = 100; // half of 200px tall card
  const lines = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 - 90; // start from top
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + innerR * Math.cos(rad);
    const y1 = cy + innerR * Math.sin(rad);
    const x2 = cx + outerR * Math.cos(rad);
    const y2 = cy + outerR * Math.sin(rad);
    return { x1, y1, x2, y2 };
  });
  return (
    <svg
      viewBox="0 0 300 200"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

/* ─── Sketchy SVG border for center card ───────────────────────── */
const SketchyBorder = () => (
  <svg
    viewBox="0 0 300 200"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
    preserveAspectRatio="none"
  >
    <rect
      x="4"
      y="4"
      width="292"
      height="192"
      rx="16"
      ry="16"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeDasharray="4 1.5"
      strokeDashoffset="2"
      pathLength="800"
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

      {/* Top-center: Key */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "14%",
          left: "50%",
          transform: "translateX(-80px) rotate(-15deg)",
          opacity: 0.6,
          color: "#1A1A1A",
        }}
      >
        <KeyIcon size={28} />
      </div>

      {/* Top-center: Pen Nib */}
      <div
        className="hero-bg-doodle"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(30px) rotate(40deg)",
          opacity: 0.65,
          color: "#1A1A1A",
        }}
      >
        <PenNibIcon size={32} />
      </div>

      {/* Bottom-left: Key */}
      <div
        className="hero-bg-doodle"
        style={{
          bottom: "14%",
          left: "9%",
          transform: "rotate(-30deg)",
          opacity: 0.55,
          color: "#1A1A1A",
        }}
      >
        <KeyIcon size={32} />
      </div>

      {/* Bottom-right: Pen Nib */}
      <div
        className="hero-bg-doodle"
        style={{
          bottom: "16%",
          right: "7%",
          transform: "rotate(-20deg)",
          opacity: 0.6,
          color: "#1A1A1A",
        }}
      >
        <PenNibIcon size={30} />
      </div>

      {/* ── SPARKLES scattered ─────────────────────────────────── */}

      {/* Top-right area */}
      <div className="hero-bg-doodle" style={{ top: "12%", right: "8%", opacity: 0.7 }}>
        <Sparkle size={16} color="#C4BAE8" />
      </div>
      <div className="hero-bg-doodle" style={{ top: "22%", right: "13%", opacity: 0.5 }}>
        <Sparkle size={11} color="#1A1A1A" />
      </div>
      <div className="hero-bg-doodle" style={{ top: "8%", right: "19%", opacity: 0.65 }}>
        <Sparkle size={13} color="#9B8FD4" />
      </div>

      {/* Left of quote card */}
      <div className="hero-bg-doodle" style={{ top: "35%", right: "22%", opacity: 0.6 }}>
        <Sparkle size={10} color="#C4BAE8" />
      </div>
      <div className="hero-bg-doodle" style={{ bottom: "30%", right: "17%", opacity: 0.55 }}>
        <Sparkle size={14} color="#1A1A1A" />
      </div>

      {/* Above title card */}
      <div className="hero-bg-doodle" style={{ top: "9%", left: "44%", opacity: 0.5 }}>
        <Sparkle size={12} color="#9B8FD4" />
      </div>

      {/* Below / right of polaroid */}
      <div className="hero-bg-doodle" style={{ bottom: "20%", left: "14%", opacity: 0.6 }}>
        <Sparkle size={15} color="#C4BAE8" />
      </div>
      <div className="hero-bg-doodle" style={{ bottom: "36%", left: "8%", opacity: 0.45 }}>
        <Sparkle size={10} color="#1A1A1A" />
      </div>

      {/* ── THREE-CARD LAYOUT ───────────────────────────────────── */}
      <div className="hero-card-row">
        {/* ══ LEFT: POLAROID CARD ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: -2, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          style={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Key hanging off top-left */}
          <div
            style={{
              position: "absolute",
              top: "-18px",
              left: "10px",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Loop / ring */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
              <ellipse cx="5" cy="5" rx="4" ry="4" />
            </svg>
            <SmallKey />
          </div>

          {/* Polaroid body */}
          <div
            style={{
              width: "160px",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              padding: "8px 8px 20px 8px",
              boxShadow: "3px 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            {/* Photo area */}
            <div
              style={{
                width: "100%",
                height: "122px",
                backgroundColor: "#D9D6D0",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <CameraIcon />
              <span
                style={{
                  color: "#9E9B96",
                  fontSize: "20px",
                  lineHeight: 1,
                  fontWeight: 300,
                  fontFamily: "Inter, sans-serif",
                  marginTop: "-4px",
                }}
              >
                +
              </span>
            </div>

            {/* Caption area */}
            <div
              style={{
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--hero-italic, 'Playfair Display', 'Georgia', serif)",
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "#2B2B2B",
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 250, damping: 20 } }}
          style={{
            position: "relative",
            width: "300px",
            height: "200px",
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
              inset: "4px",
              backgroundColor: "#FDFAF5",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 24px",
              gap: "0",
            }}
          >
            {/* IZZY'S */}
            <div
              style={{
                fontFamily: "var(--hero-serif, 'Playfair Display', 'Georgia', serif)",
                fontWeight: 900,
                fontSize: "42px",
                color: "#1A1A1A",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              IZZY&apos;S
            </div>

            {/* ALTER EGO */}
            <div
              style={{
                fontFamily: "var(--hero-serif, 'Playfair Display', 'Georgia', serif)",
                fontWeight: 900,
                fontSize: "42px",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <span style={{ color: "#D91A6A" }}>ALTER</span>
              <span style={{ color: "#1A1A1A" }}>&nbsp;EGO</span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "var(--hero-sans, 'Inter', sans-serif)",
                fontWeight: 300,
                fontSize: "12.5px",
                color: "#666666",
                textAlign: "center",
                lineHeight: 1.5,
                marginTop: "10px",
                maxWidth: "220px",
              }}
            >
              A digital playground for the art of noticing everything.
            </p>
          </div>
        </motion.div>

        {/* ══ RIGHT: QUOTE CARD ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 3.5 }}
          animate={{ opacity: 1, y: 0, rotate: 3.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 1.5, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          style={{
            position: "relative",
            width: "170px",
            height: "160px",
            flexShrink: 0,
            backgroundColor: "#EDE8E0",
            borderRadius: "14px",
            boxShadow: "2px 3px 10px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 16px",
            overflow: "visible",
          }}
        >
          {/* Decorative tiny icons inside the card */}
          <div style={{ position: "absolute", top: "10px", right: "12px" }}>
            <TinySparkle color="#C4BAE8" />
          </div>
          <div style={{ position: "absolute", bottom: "12px", right: "10px" }}>
            <TinyKey color="#B8AEE0" />
          </div>
          <div style={{ position: "absolute", bottom: "14px", left: "10px" }}>
            <TinySparkle color="#9B8FD4" />
          </div>
          <div style={{ position: "absolute", top: "10px", left: "12px" }}>
            <TinyPen color="#C4BAE8" />
          </div>

          {/* Quote text */}
          <p
            style={{
              fontFamily: "var(--hero-italic, 'Lora', 'Playfair Display', 'Georgia', serif)",
              fontStyle: "italic",
              fontSize: "14.5px",
              color: "#1A1A1A",
              lineHeight: 1.55,
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
