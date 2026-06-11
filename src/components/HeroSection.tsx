"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { motion } from "framer-motion";

const C = {
  paper: "#F8F9F3",
  dune: "#EFE5DB",
  duneDeep: "#E7DDD2",
  cardCream: "#FAF3E9",
  well: "#BDBDB8",
  cameraIcon: "#8E8E89",
  ink: "#1C1C1F",
  inkSoft: "#858681",
  pink: "#EB47A5",
  lavender: "#C9B8E8",
};

function Sparkle({
  size = 22,
  color = C.lavender,
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      style={style}
      fill={color}
    >
      <path d="M0,-11 C2,-3 3,-3 11,0 C3,3 2,3 0,11 C-2,3 -3,3 -11,0 C-3,-3 -2,-3 0,-11 Z" />
    </svg>
  );
}

function Key({
  size = 44,
  color = C.ink,
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 80 44"
      style={style}
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="14" cy="22" r="9" />
      <circle cx="14" cy="22" r="3.2" />
      <path d="M23 22 L72 22" />
      <path d="M62 22 L62 30" />
      <path d="M70 22 L70 28" />
    </svg>
  );
}

function PenNib({
  size = 36,
  color = C.ink,
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={style}
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4 L30 22 L20 36 L10 22 Z" />
      <path d="M20 14 L20 30" />
      <circle cx="20" cy="22" r="1.6" fill={color} />
    </svg>
  );
}

function SketchFrame({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 800 540"
      preserveAspectRatio="none"
      style={style}
      fill="none"
      stroke={C.ink}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M40,30 C160,18 360,22 560,20 C660,19 740,28 778,40 C786,160 784,300 782,440 C782,490 774,512 760,520 C580,528 360,524 180,522 C100,520 40,510 28,498 C20,360 22,200 24,80 C24,55 30,38 40,30 Z" />
      <path d="M50,42 C170,32 370,34 560,32 C660,32 730,40 768,52 C774,170 772,300 770,430 C770,478 762,498 750,506 C580,514 370,510 190,508 C110,506 50,498 40,488 C32,360 34,210 36,90 C36,68 42,52 50,42 Z" />
    </svg>
  );
}

interface BurstLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const BURST_CONFIGS: Record<string, BurstLine[]> = {
  "top-left": [
    { x1: 41.7, y1: 21.2, x2: 39.2, y2: 3.4 },
    { x1: 31.5, y1: 28.9, x2: 18.6, y2: 13.6 },
    { x1: 23.7, y1: 36.4, x2: 7.0, y2: 29.6 },
    { x1: 20.1, y1: 47.2, x2: 4.2, y2: 48.6 },
  ],
  "top-right": [
    { x1: 48.3, y1: 21.2, x2: 50.8, y2: 3.4 },
    { x1: 58.5, y1: 28.9, x2: 71.4, y2: 13.6 },
    { x1: 66.3, y1: 36.4, x2: 83.0, y2: 29.6 },
    { x1: 69.9, y1: 47.2, x2: 85.8, y2: 48.6 },
  ],
    "bottom-left": [
    { x1: 24, y1: 54, x2: 8, y2: 58 },
    { x1: 32, y1: 62, x2: 20, y2: 74 },
    { x1: 42, y1: 70, x2: 38, y2: 84 },
  ],
  "bottom-right": [
    { x1: 66, y1: 52, x2: 82, y2: 58 },
    { x1: 58, y1: 62, x2: 70, y2: 74 },
    { x1: 48, y1: 70, x2: 52, y2: 84 },
  ],
};

function BurstCluster({
  style,
  position,
}: {
  style?: React.CSSProperties;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const config = BURST_CONFIGS[position] || [];
  const lines = config.map((line, idx) => (
    <line
      key={idx}
      x1={line.x1}
      y1={line.y1}
      x2={line.x2}
      y2={line.y2}
    />
  ));

  return (
    <svg
      width={90}
      height={90}
      viewBox="0 0 90 90"
      style={{ pointerEvents: "none", ...style }}
      stroke={C.ink}
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    >
      {lines}
    </svg>
  );
}

function WavyConnector({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 40"
      style={style}
      fill="none"
      stroke={C.ink}
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M4 20 C 20 4, 40 36, 60 20 S 100 4, 116 20" />
    </svg>
  );
}

function PolaroidUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [shake, setShake] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alterego_vibe_image");
    if (saved) setImg(saved);
  }, []);

  const accept = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setImg(url);
      try {
        localStorage.setItem("alterego_vibe_image", url);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: "relative", width: 240, height: 290 }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: C.cardCream,
          border: `1.5px solid ${C.ink}`,
          borderRadius: 6,
          transform: "translate(6px, 6px) rotate(2deg)",
          boxShadow: "0 14px 24px -14px rgba(0,0,0,0.25)",
        }}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload your vibe photo"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) accept(file);
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: C.cardCream,
          border: `1.5px solid ${C.ink}`,
          borderRadius: 6,
          boxShadow: "0 18px 30px -12px rgba(0,0,0,0.28)",
          padding: "16px 16px 56px 16px",
          cursor: "pointer",
          transition: "transform 150ms ease",
          transform: dragOver ? "scale(1.02)" : "none",
          animation: shake ? "ae-shake 0.4s" : undefined,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: C.well,
            border: dragOver ? `2px dashed ${C.pink}` : `1px solid rgba(0,0,0,0.06)`,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {img ? (
            <>
              <img
                src={img}
                alt="Your vibe"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImg(null);
                  localStorage.removeItem("alterego_vibe_image");
                }}
                aria-label="Remove image"
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div style={{ position: "relative" }}>
                <Camera size={64} color={C.cameraIcon} strokeWidth={1.6} />
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -10,
                    color: C.cameraIcon,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  +
                </span>
              </div>
              {hover && (
                <span
                  style={{
                    fontFamily: "var(--hero-italic, 'Caveat', cursive)",
                    fontSize: 14,
                    color: "#7A7A7A",
                  }}
                >
                  Click or drop image
                </span>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "var(--hero-italic, 'Caveat', cursive)",
            fontWeight: 600,
            fontSize: 22,
            color: C.ink,
          }}
        >
          Smiles.
        </div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -14,
            right: -10,
            transform: "rotate(22deg)",
          }}
        >
          <Key size={56} />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) accept(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function StickyNote() {
  return (
    <div
      style={{
        position: "relative",
        width: 240,
        height: 240,
        transform: "rotate(5deg)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: C.cardCream,
          border: `1.5px solid ${C.ink}`,
          borderRadius: 4,
          transform: "translate(5px, 5px) rotate(-3deg)",
          boxShadow: "0 12px 22px -12px rgba(0,0,0,0.22)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.cardCream,
          border: `1.5px solid ${C.ink}`,
          borderRadius: 4,
          boxShadow: "0 14px 24px -10px rgba(0,0,0,0.22)",
          padding: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sparkle size={20} style={{ position: "absolute", top: 14, right: 18 }} />
        <Sparkle size={12} style={{ position: "absolute", top: 30, right: 44 }} />
        <Sparkle size={16} style={{ position: "absolute", bottom: 18, left: 18 }} />
        <Sparkle size={10} style={{ position: "absolute", bottom: 36, left: 36 }} />
        <Key
          size={26}
          color={C.pink}
          style={{
            position: "absolute",
            top: "44%",
            right: 14,
            transform: "rotate(35deg)",
          }}
        />

        <div
          style={{
            fontFamily: "var(--hero-italic, 'Caveat', cursive)",
            fontWeight: 600,
            fontSize: 22,
            color: C.ink,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          “Creativity is
          <br />
          allowing yourself to
          <br />
          make mistakes.”
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <div
      style={{
        width: "100%",
        background: C.paper,
        padding: 8,
        fontFamily: "var(--hero-sans, 'Inter', sans-serif)",
      }}
    >
      <style>{`
        @keyframes ae-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes ae-rise { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }
        .ae-rise { animation: ae-rise 600ms ease-out both; }
        
        @media (max-width: 768px) {
          .lovable-hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 100px !important;
            padding-bottom: 80px !important;
            gap: 48px !important;
          }
          .lovable-bg-connector {
            display: none !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "calc(100vh - 16px)",
          background: C.paper,
          border: `2px solid ${C.ink}`,
          borderRadius: 28,
          overflow: "hidden",
        }}
      >
        {/* Dune Curve bottom background decoration */}
        <svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "30%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <path
            d="M0,90 C200,40 420,160 700,80 C900,30 1080,110 1200,70 L1200,240 L0,240 Z"
            fill={C.dune}
          />
          <path
            d="M0,90 C200,40 420,160 700,80 C900,30 1080,110 1200,70"
            fill="none"
            stroke={C.duneDeep}
            strokeWidth="2"
          />
        </svg>

        {/* Top-center: key + pen connectors */}
        <div
          className="lovable-bg-connector"
          style={{
            position: "absolute",
            top: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            zIndex: 10,
          }}
        >
          <Key size={46} />
          <WavyConnector style={{ width: 70, height: 28 }} />
          <PenNib size={38} />
        </div>

        {/* Floating background elements */}
        <Sparkle
          size={20}
          style={{ position: "absolute", top: "26%", right: "16%", zIndex: 8 }}
        />
        <PenNib
          size={28}
          style={{ position: "absolute", top: "22%", right: "8%", zIndex: 8 }}
        />
        <Sparkle
          size={14}
          style={{ position: "absolute", top: "32%", right: "6%", zIndex: 8 }}
        />

        <Sparkle
          size={16}
          style={{ position: "absolute", bottom: "16%", left: "6%", zIndex: 8 }}
        />
        <Sparkle
          size={11}
          style={{ position: "absolute", bottom: "22%", left: "12%", zIndex: 8 }}
        />
        <Key
          size={36}
          style={{
            position: "absolute",
            bottom: "14%",
            left: "16%",
            transform: "rotate(-15deg)",
            zIndex: 8,
          }}
        />

        {/* Three-Column Grid */}
        <div
          className="lovable-hero-grid"
          style={{
            position: "relative",
            zIndex: 5,
            display: "grid",
            gridTemplateColumns: "260px 1fr 260px",
            alignItems: "center",
            gap: 24,
            padding: "6% 5% 8% 5%",
            minHeight: "calc(100vh - 16px)",
            boxSizing: "border-box",
          }}
        >
          <div
            className="ae-rise"
            style={{
              transform: "rotate(-6deg)",
              width: "100%",
              justifySelf: "center",
            }}
          >
            <PolaroidUpload />
          </div>

          <div
            className="ae-rise"
            style={{
              position: "relative",
              animationDelay: "100ms",
              padding: "20px 20px",
            }}
          >
            <SketchFrame
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
            <div
              style={{
                position: "relative",
                padding: "12% 8% 10% 8%",
                textAlign: "center",
              }}
            >
              {/* Title block with corner burst decorations */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <BurstCluster
                  position="top-left"
                  style={{ position: "absolute", top: -30, left: -30 }}
                />
                <BurstCluster
                  position="top-right"
                  style={{ position: "absolute", top: -30, right: -30 }}
                />
                <BurstCluster
                  position="bottom-left"
                  style={{ position: "absolute", bottom: -45, left: -45 }}
                />
                <BurstCluster
                  position="bottom-right"
                  style={{ position: "absolute", bottom: -45, right: -45 }}
                />

                <h1
                  style={{
                    fontFamily: "var(--hero-serif, 'DM Serif Display', serif)",
                    color: C.ink,
                    fontSize: "clamp(36px, 5.4vw, 74px)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  IZZY&apos;S
                </h1>
                <h2
                  style={{
                    fontFamily: "var(--hero-serif, 'DM Serif Display', serif)",
                    fontSize: "clamp(40px, 6vw, 82px)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    margin: "8px 0 0 0",
                    color: C.ink,
                  }}
                >
                  <span style={{ color: C.pink, marginRight: "0.3em" }}>ALTER</span>
                  <span>EGO</span>
                </h2>
              </div>
              <p
                style={{
                  marginTop: 18,
                  fontFamily: "var(--hero-sans, 'Inter', sans-serif)",
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: C.inkSoft,
                  maxWidth: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                A digital playground for scattered thoughts & random facts😊
              </p>
            </div>
          </div>

          <div
            className="ae-rise"
            style={{
              width: "100%",
              justifySelf: "center",
              animationDelay: "200ms",
            }}
          >
            <StickyNote />
          </div>
        </div>
      </div>
    </div>
  );
}
