import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations();

  return (
    <div>
      <section className="bg-brand-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("contact.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 text-lg">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2">
        <ContactForm />

        <div>
          <h2 className="font-semibold text-brand-primary-dark">
            {t("contact.detailsTitle")}
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-foreground/50">{t("common.address")}</dt>
              <dd className="mt-1 text-foreground/80">
                {t("common.addressValue")}
              </dd>
            </div>
            <div>
              <dt className="text-foreground/50">{t("common.phone")}</dt>
              <dd className="mt-1 text-foreground/80" dir="ltr">
                <a href="tel:+97470433866" className="hover:text-brand-primary">
                  +974 7043 3866
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-foreground/50">{t("common.whatsapp")}</dt>
              <dd className="mt-1 text-foreground/80" dir="ltr">
                <a
                  href="https://wa.me/97470433866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary"
                >
                  +974 7043 3866
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-foreground/50">{t("common.email")}</dt>
              <dd className="mt-1 text-foreground/80">
                <a href="mailto:info@agroprime.qa" className="hover:text-brand-primary">
                  info@agroprime.qa
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-foreground/50">{t("contact.officeHours")}</dt>
              <dd className="mt-1 text-foreground/80">
                {t("contact.officeHoursValue")}
              </dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl overflow-hidden border border-black/5 h-56 bg-brand-cream flex items-center justify-center text-foreground/40 text-sm">
            Map placeholder — Doha, Qatar
          </div>
        </div>
      </section>
    </div>
  );
}
