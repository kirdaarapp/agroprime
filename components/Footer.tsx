import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-24 border-t border-black/5 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo companyName={t("common.companyName")} />
          <p className="mt-4 text-sm text-foreground/70 max-w-xs">
            {t("common.tagline")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-primary-dark uppercase tracking-wide">
            {t("nav.home")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li>
              <Link href="/about" className="hover:text-brand-primary">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-brand-primary">
                {t("nav.products")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-primary">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-primary-dark uppercase tracking-wide">
            {t("contact.detailsTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li>{t("common.addressValue")}</li>
            <li dir="ltr">
              <a href="tel:+97470433866" className="hover:text-brand-primary">
                +974 7043 3866
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/97470433866"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-primary"
              >
                {t("common.whatsapp")}: +974 7043 3866
              </a>
            </li>
            <li>
              <a href="mailto:info@agroprime.qa" className="hover:text-brand-primary">
                info@agroprime.qa
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 py-6 text-center text-xs text-foreground/50">
        © {new Date().getFullYear()} {t("common.companyName")} —{" "}
        {t("common.rightsReserved")}
      </div>
    </footer>
  );
}
