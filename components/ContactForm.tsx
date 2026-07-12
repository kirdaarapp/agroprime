"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""
    );
    formData.append("subject", "New inquiry from Agroprime website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
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
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formName")}
        </label>
        <input
          required
          name="name"
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
          name="email"
          type="email"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1">
          {t("contact.formCompany")}
        </label>
        <input
          name="company"
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
          name="message"
          rows={4}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brand-primary"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please try WhatsApp or email us directly instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark transition w-fit disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : t("contact.formSubmit")}
      </button>
    </form>
  );
}
