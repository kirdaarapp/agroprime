import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import {
  IconEggWhite,
  IconEggBrown,
  IconChicken,
  IconRuler,
  IconCarton,
  IconPallet,
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
          {categoryKeys.map((key, i) => {
            const Icon = categoryIcons[key];
            return (
              <Reveal key={key} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-black/5 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col bg-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-semibold text-lg text-brand-primary-dark">
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
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
