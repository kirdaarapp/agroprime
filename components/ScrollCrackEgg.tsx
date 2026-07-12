"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const EGG_PATH =
  "M100,10 C150,10 180,80 180,150 C180,210 145,250 100,250 C55,250 20,210 20,150 C20,80 50,10 100,10 Z";

const CRACK_LINE =
  "M0,150 L18,142 L34,161 L52,136 L70,157 L88,143 L106,163 L124,139 L142,159 L160,141 L180,156 L200,150";

export default function ScrollCrackEgg() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const spin = useTransform(scrollYProgress, [0, 0.5], [0, 340]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);

  const crack = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const wholeOpacity = useTransform(crack, [0, 0.2], [1, 0]);
  const crackedOpacity = useTransform(crack, [0, 0.15], [0, 1]);
  const topY = useTransform(crack, [0, 1], [0, -70]);
  const topRotate = useTransform(crack, [0, 1], [0, -18]);
  const bottomY = useTransform(crack, [0, 1], [0, 60]);
  const bottomRotate = useTransform(crack, [0, 1], [0, 14]);
  const yolkScale = useTransform(crack, [0.25, 0.9], [0, 1]);
  const yolkOpacity = useTransform(crack, [0.2, 0.4], [0, 1]);

  const captionOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.55, 0.75], [20, 0]);

  return (
    <div ref={ref} className="relative h-[260vh] bg-brand-cream">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ rotate: spin, scale }} className="relative">
          <svg
            viewBox="0 0 200 260"
            width="240"
            height="312"
            className="drop-shadow-xl"
          >
            <defs>
              <clipPath id="topHalfClip">
                <path d={`${CRACK_LINE} L200,0 L0,0 Z`} />
              </clipPath>
              <clipPath id="bottomHalfClip">
                <path d={`${CRACK_LINE} L200,260 L0,260 Z`} />
              </clipPath>
              <linearGradient id="shellGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffaf0" />
                <stop offset="100%" stopColor="#e6d8ba" />
              </linearGradient>
              <radialGradient id="yolkGrad" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#ffd27a" />
                <stop offset="100%" stopColor="#d98f1f" />
              </radialGradient>
            </defs>

            <motion.path
              d={EGG_PATH}
              fill="url(#shellGrad)"
              style={{ opacity: wholeOpacity }}
            />

            <motion.ellipse
              cx="100"
              cy="152"
              rx="34"
              ry="26"
              fill="url(#yolkGrad)"
              style={{ opacity: yolkOpacity, scale: yolkScale }}
            />

            <motion.g
              style={{
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
                y: bottomY,
                rotate: bottomRotate,
                opacity: crackedOpacity,
                transformOrigin: "100px 150px",
              }}
            >
              <path d={EGG_PATH} fill="url(#shellGrad)" clipPath="url(#bottomHalfClip)" />
            </motion.g>
          </svg>
        </motion.div>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-10 text-center text-brand-primary-dark font-semibold text-lg md:text-xl max-w-sm px-6"
        >
          {t("home.crackCaption")}
        </motion.p>
      </div>
    </div>
  );
}
