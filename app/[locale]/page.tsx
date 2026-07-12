import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import EggHeroCanvas from "@/components/EggHeroCanvas";

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

export default function HomePage() {
  const t = useTranslations();

  const stats = [
    { value: "10+", label: t("home.statsYears") },
    { value: "500K+", label: t("home.statsCountries") },
    { value: "6", label: t("home.statsProducts") },
    { value: "50+", label: t("home.statsPartners") },
  ];

  const why = [
    { title: t("home.why1Title"), desc: t("home.why1Desc"), icon: "🧊" },
    { title: t("home.why2Title"), desc: t("home.why2Desc"), icon: "⚖️" },
    { title: t("home.why3Title"), desc: t("home.why3Desc"), icon: "🚚" },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-primary-dark text-white min-h-[85vh] flex items-center">
        <EggHeroCanvas className="absolute inset-0 z-0" />
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-brand-primary-dark via-brand-primary-dark/75 to-brand-primary-dark/10"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32 w-full">
          <p className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-4">
            {t("common.tagline")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-white/80 text-lg">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-primary-dark hover:brightness-95 transition"
            >
              {t("common.viewProducts")}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              {t("common.requestQuote")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-brand-primary">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {t("home.whyTitle")}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {why.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/5 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 font-semibold text-lg text-brand-primary-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("home.categoriesTitle")}
            </h2>
            <p className="mt-3 text-foreground/70">
              {t("home.categoriesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categoryKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl bg-white p-6 border border-black/5"
              >
                <div className="text-2xl">{categoryIcons[key]}</div>
                <h3 className="mt-3 font-semibold text-brand-primary-dark">
                  {t(`products.${key}Title`)}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {t(`products.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark transition"
            >
              {t("common.viewProducts")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("home.ctaTitle")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-xl mx-auto">
          {t("home.ctaSubtitle")}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-brand-accent px-8 py-3 text-sm font-semibold text-brand-primary-dark hover:brightness-95 transition"
        >
          {t("home.ctaButton")}
        </Link>
      </section>
    </div>
  );
}
