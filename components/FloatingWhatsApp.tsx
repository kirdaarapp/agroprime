"use client";

import { useTranslations } from "next-intl";

export default function FloatingWhatsApp() {
  const t = useTranslations();

  return (
    <a
      href="https://wa.me/97470433866"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("common.whatsapp")}
      className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.05c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.4-.71-2.87-1.14-4.71-4.03-4.85-4.22-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.27-.29.58-.36.77-.36h.55c.18 0 .42-.03.64.5.24.57.8 1.96.87 2.1.07.15.11.32.02.51-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.21 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.07.11.07.63-.17 1.31z" />
      </svg>
    </a>
  );
}
