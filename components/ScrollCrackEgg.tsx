"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const EGG_PATH =
  "M100,6 C154,6 186,82 186,154 C186,218 148,254 100,254 C52,254 14,218 14,154 C14,82 46,6 100,6 Z";

// Tapered so the jagged crack meets the egg's true left/right tips
// (14,154) and (186,154) exactly - keeps the corners cutting cleanly
// along the shell's silhouette instead of swinging outside it.
const CRACK_LINE =
  "M0,154 L14,154 L40,162 L60,140 L80,160 L100,144 L120,163 L140,140 L160,160 L186,154 L200,154";

function Shard({
  crack,
  dx,
  apexY,
  restY,
  rotate,
}: {
  crack: import("framer-motion").MotionValue<number>;
  dx: number;
  apexY: number;
  restY: number;
  rotate: number;
}) {
  const x = useTransform(crack, [0, 0.45, 1], [100, 100 + dx * 1.15, 100 + dx]);
  const y = useTransform(crack, [0, 0.45, 1], [150, 150 + apexY, 150 + restY]);
  const rot = useTransform(crack, [0, 1], [0, rotate]);
  const opacity = useTransform(crack, [0, 0.15, 0.55, 0.95], [0, 1, 1, 0]);

  return (
    <motion.path
      d="M0,-7 L7,5 L-7,5 Z"
      fill="url(#shellGrad)"
      style={{ x, y, rotate: rot, opacity, transformOrigin: "0px 0px" }}
    />
  );
}

export default function ScrollCrackEgg() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const spin = useTransform(scrollYProgress, [0, 0.45], [0, 300]);
  const bob = useTransform(scrollYProgress, [0, 0.25, 0.45], [0, -16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.82, 1, 1.04]);

  const crack = useTransform(scrollYProgress, [0.48, 0.82], [0, 1]);

  // Anticipation squash right before the crack begins
  const squashX = useTransform(crack, [0, 0.08, 0.16], [1, 1.06, 1]);
  const squashY = useTransform(crack, [0, 0.08, 0.16], [1, 0.92, 1]);

  const wholeOpacity = useTransform(crack, [0.16, 0.3], [1, 0]);
  const crackedOpacity = useTransform(crack, [0.16, 0.3], [0, 1]);
  const topY = useTransform(crack, [0.16, 1], [0, -78]);
  const topX = useTransform(crack, [0.16, 1], [0, -14]);
  const topRotate = useTransform(crack, [0.16, 1], [0, -22]);
  const bottomY = useTransform(crack, [0.16, 1], [0, 66]);
  const bottomX = useTransform(crack, [0.16, 1], [0, 12]);
  const bottomRotate = useTransform(crack, [0.16, 1], [0, 16]);

  const yolkScale = useTransform(crack, [0.28, 0.55], [0, 1]);
  const yolkY = useTransform(crack, [0.28, 0.5, 0.62], [-10, 6, 0]);
  const yolkOpacity = useTransform(crack, [0.24, 0.34], [0, 1]);

  const burstScale = useTransform(crack, [0.16, 0.42], [0.3, 2.2]);
  const burstOpacity = useTransform(crack, [0.16, 0.24, 0.42], [0, 0.55, 0]);

  const shadowScale = useTransform(scrollYProgress, [0, 0.45], [0.8, 1]);
  const shadowOpacity = useTransform(crack, [0, 0.16, 0.4], [0.18, 0.18, 0.05]);

  const captionOpacity = useTransform(scrollYProgress, [0.58, 0.78], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.58, 0.78], [24, 0]);

  const bgSlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgFast = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const shards = [
    { dx: -74, apexY: -52, restY: 8, rotate: -150 },
    { dx: -44, apexY: -74, restY: -12, rotate: -80 },
    { dx: -16, apexY: -88, restY: -22, rotate: -25 },
    { dx: 16, apexY: -88, restY: -22, rotate: 25 },
    { dx: 44, apexY: -74, restY: -12, rotate: 80 },
    { dx: 74, apexY: -52, restY: 8, rotate: 150 },
  ];

  return (
    <div ref={ref} className="relative h-[280vh] bg-brand-cream">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: bgSlow }}
          className="absolute top-[15%] left-[12%] w-24 h-24 rounded-full bg-brand-primary/10 blur-2xl"
        />
        <motion.div
          aria-hidden
          style={{ y: bgFast }}
          className="absolute bottom-[18%] right-[14%] w-32 h-32 rounded-full bg-brand-accent/15 blur-3xl"
        />
        <motion.div
          aria-hidden
          style={{ y: bgSlow }}
          className="absolute top-[20%] right-[18%] w-16 h-16 rounded-full bg-brand-accent/20 blur-xl"
        />

        <motion.div style={{ y: bob, scale }} className="relative">
          <motion.div style={{ rotate: spin }}>
            <motion.svg
              viewBox="0 0 200 260"
              width="280"
              height="364"
              style={{ scaleX: squashX, scaleY: squashY }}
              className="drop-shadow-2xl"
            >
              <defs>
                <clipPath id="topHalfClip">
                  <path d={`${CRACK_LINE} L200,0 L0,0 Z`} />
                </clipPath>
                <clipPath id="bottomHalfClip">
                  <path d={`${CRACK_LINE} L200,260 L0,260 Z`} />
                </clipPath>
                <radialGradient id="shellGrad" cx="38%" cy="30%" r="80%">
                  <stop offset="0%" stopColor="#fffdf8" />
                  <stop offset="55%" stopColor="#fbf3de" />
                  <stop offset="100%" stopColor="#e2d2a8" />
                </radialGradient>
                <radialGradient id="yolkGrad" cx="35%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="#ffdb8a" />
                  <stop offset="60%" stopColor="#f0a935" />
                  <stop offset="100%" stopColor="#c97e18" />
                </radialGradient>
                <radialGradient id="burstGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff3d0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fff3d0" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0d2318" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0d2318" stopOpacity="0" />
                </radialGradient>
              </defs>

              <motion.ellipse
                cx="100"
                cy="250"
                rx="70"
                ry="16"
                fill="url(#shadowGrad)"
                style={{ scale: shadowScale, opacity: shadowOpacity }}
              />

              <motion.circle
                cx="100"
                cy="150"
                r="60"
                fill="url(#burstGrad)"
                style={{ scale: burstScale, opacity: burstOpacity }}
              />

              <motion.path
                d={EGG_PATH}
                fill="url(#shellGrad)"
                style={{ opacity: wholeOpacity }}
              />
              <ellipse
                cx="72"
                cy="58"
                rx="26"
                ry="16"
                fill="#ffffff"
                opacity="0.55"
                transform="rotate(-25 72 58)"
              />

              <motion.ellipse
                cx="100"
                cy="150"
                rx="36"
                ry="27"
                fill="url(#yolkGrad)"
                style={{ opacity: yolkOpacity, scale: yolkScale, y: yolkY }}
              />
              <motion.ellipse
                cx="88"
                cy="140"
                rx="9"
                ry="6"
                fill="#ffe9b0"
                opacity="0.7"
                style={{ opacity: yolkOpacity, scale: yolkScale }}
              />

              {shards.map((s, i) => (
                <Shard key={i} crack={crack} {...s} />
              ))}

              <motion.g
                style={{
                  x: topX,
                  y: topY,
                  rotate: topRotate,
                  opacity: crackedOpacity,
                  transformOrigin: "100px 150px",
                }}
              >
                <path d={EGG_PATH} fill="url(#shellGrad)" clipPath="url(#topHalfClip)" />
              </motion.g>
              <motion.g
                style={{
                  x: bottomX,
                  y: bottomY,
                  rotate: bottomRotate,
                  opacity: crackedOpacity,
                  transformOrigin: "100px 150px",
                }}
              >
                <path d={EGG_PATH} fill="url(#shellGrad)" clipPath="url(#bottomHalfClip)" />
              </motion.g>
            </motion.svg>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-8 text-center text-brand-primary-dark font-semibold text-xl md:text-2xl max-w-md px-6"
        >
          {t("home.crackCaption")}
        </motion.p>
      </div>
    </div>
  );
}
