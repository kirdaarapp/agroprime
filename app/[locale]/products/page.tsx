import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const categoryKeys = [
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5",
  "cat6",
] as const;

const categoryIcons: Record<(typeof categoryKeys)[number], string> = {
  cat1: "🥚",
  cat2: "🤎",
  cat3: "🐔",
  cat4: "📏",
  cat5: "📦",
  cat6: "🚛",
};

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div>
      <section className="bg-brand-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("products.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 text-lg">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categoryKeys.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-black/5 p-8 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="text-3xl">{categoryIcons[key]}</div>
              <h3 className="mt-4 font-semibold text-lg text-brand-primary-dark">
                {t(`products.${key}Title`)}
              </h3>
              <p className="mt-2 text-sm text-foreground/70 flex-1">
                {t(`products.${key}Desc`)}
              </p>
              <Link
                href="/contact"
                className="mt-6 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark"
              >
                {t("products.inquire")} {arrow}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
