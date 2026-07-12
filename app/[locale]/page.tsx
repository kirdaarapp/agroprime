import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollCrackEgg from "@/components/ScrollCrackEgg";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  IconSnowflake,
  IconScale,
  IconTruck,
  IconEggWhite,
  IconEggBrown,
  IconChicken,
  IconRuler,
  IconCarton,
  IconPallet,
  IconMessage,
  IconCheckBadge,
} from "@/components/icons";

const categoryKeys = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"] as const;

const categoryIcons: Record<(typeof categoryKeys)[number], React.ComponentType<{ className?: string }>> = {
  cat1: IconEggWhite,
  cat2: IconEggBrown,
  cat3: IconChicken,
  cat4: IconRuler,
  cat5: IconCarton,
  cat6: IconPallet,
};

export default function HomePage() {
  const t = useTranslations();

  const stats = [
    { value: 10, suffix: "+", label: t("home.statsYears") },
    { value: 500, suffix: "K+", label: t("home.statsCountries") },
    { value: 6, suffix: "", label: t("home.statsProducts") },
    { value: 50, suffix: "+", label: t("home.statsPartners") },
  ];

  const why = [
    { title: t("home.why1Title"), desc: t("home.why1Desc"), Icon: IconSnowflake },
    { title: t("home.why2Title"), desc: t("home.why2Desc"), Icon: IconScale },
    { title: t("home.why3Title"), desc: t("home.why3Desc"), Icon: IconTruck },
  ];

  const heroBadges = [
    { label: t("home.badge1"), Icon: IconSnowflake },
    { label: t("home.badge2"), Icon: IconScale },
    { label: t("home.badge3"), Icon: IconTruck },
  ];

  const steps = [
    { title: t("home.step1Title"), desc: t("home.step1Desc"), Icon: IconMessage },
    { title: t("home.step2Title"), desc: t("home.step2Desc"), Icon: IconCheckBadge },
    { title: t("home.step3Title"), desc: t("home.step3Desc"), Icon: IconTruck },
  ];

  return (
    <div>
      <section className="bg-brand-cream overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-4">
              {t("common.tagline")}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-brand-primary-dark">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 text-foreground/70 text-lg max-w-xl">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-primary-dark shadow-lg shadow-brand-accent/20 hover:brightness-95 hover:-translate-y-0.5 transition"
              >
                {t("common.viewProducts")}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-brand-primary/30 px-6 py-3 text-sm font-semibold text-brand-primary-dark hover:bg-brand-primary/5 hover:-translate-y-0.5 transition"
              >
                {t("common.requestQuote")}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {heroBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary shrink-0">
                    <b.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-brand-primary-dark">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-brand-accent/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-brand-primary/15 blur-3xl"
            />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-eggs.jpg"
                alt="Fresh Agroprime eggs"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ScrollCrackEgg />

      <section className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-foreground/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {t("home.whyTitle")}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {why.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-black/5 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <item.Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-lg text-brand-primary-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary-dark">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t("home.videoTitle")}
              </h2>
              <p className="mt-3 text-white/70">{t("home.videoSubtitle")}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 relative rounded-3xl overflow-hidden shadow-2xl max-w-3xl mx-auto aspect-video">
              <video
                className="h-full w-full object-cover"
                src="/videos/eggs-showcase.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("home.categoriesTitle")}
              </h2>
              <p className="mt-3 text-foreground/70">
                {t("home.categoriesSubtitle")}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categoryKeys.map((key, i) => {
              const Icon = categoryIcons[key];
              return (
                <Reveal key={key} delay={i * 70}>
                  <div className="group h-full rounded-2xl bg-white p-6 border border-black/5 border-t-2 border-t-brand-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-brand-primary-dark">
                      {t(`products.${key}Title`)}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/70">
                      {t(`products.${key}Desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark hover:-translate-y-0.5 transition"
            >
              {t("common.viewProducts")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("home.howTitle")}
            </h2>
            <p className="mt-3 text-foreground/70">{t("home.howSubtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-brand-primary/20"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <div className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white relative z-10">
                  <step.Icon className="h-5 w-5" />
                </div>
                <div className="mt-2 text-xs font-semibold text-brand-accent tracking-wide">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-semibold text-brand-primary-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-xl mx-auto">
            {t("home.ctaSubtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-brand-accent px-8 py-3 text-sm font-semibold text-brand-primary-dark shadow-lg shadow-brand-accent/20 hover:brightness-95 hover:-translate-y-0.5 transition"
          >
            {t("home.ctaButton")}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
