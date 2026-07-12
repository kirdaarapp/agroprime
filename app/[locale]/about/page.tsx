import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    t("about.value1"),
    t("about.value2"),
    t("about.value3"),
    t("about.value4"),
  ];

  return (
    <div>
      <section className="bg-brand-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("about.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 text-lg">
            {t("about.intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-brand-primary-dark">
            {t("about.storyTitle")}
          </h2>
          <p className="mt-3 text-foreground/70 leading-relaxed">
            {t("about.storyBody")}
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl bg-brand-cream p-6">
            <h3 className="font-semibold text-brand-primary-dark">
              {t("about.missionTitle")}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {t("about.missionBody")}
            </p>
          </div>
          <div className="rounded-2xl bg-brand-cream p-6">
            <h3 className="font-semibold text-brand-primary-dark">
              {t("about.visionTitle")}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {t("about.visionBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-xl font-semibold text-center text-brand-primary-dark">
            {t("about.valuesTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 text-center border border-black/5"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  {i + 1}
                </div>
                <p className="mt-4 text-sm text-foreground/70">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
