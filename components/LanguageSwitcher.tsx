"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="rounded-full border border-brand-primary/30 px-3 py-1.5 text-sm font-medium text-brand-primary-dark hover:bg-brand-primary/10 transition-colors"
    >
      {nextLocale === "ar" ? "العربية" : "English"}
    </button>
  );
}
