"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-cream p-8 text-center">
        <p className="text-brand-primary-dark font-semibold">
          Thank you — we received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formName")}
        </label>
        <input
          required
          type="text"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formEmail")}
        </label>
        <input
          required
          type="email"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formCompany")}
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formMessage")}
        </label>
        <textarea
          required
          rows={4}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark transition w-fit"
      >
        {t("contact.formSubmit")}
      </button>
    </form>
  );
}
