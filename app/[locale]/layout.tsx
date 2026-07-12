import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agroprime.qa"),
  title: "Agroprime | Farm-Fresh Eggs, Trusted Supply",
  description:
    "Agroprime is a Qatar-based egg producer and trading company, supplying fresh, quality-graded eggs to retail, wholesale, and export partners.",
  openGraph: {
    title: "Agroprime | Farm-Fresh Eggs, Trusted Supply",
    description:
      "Agroprime is a Qatar-based egg producer and trading company, supplying fresh, quality-graded eggs to retail, wholesale, and export partners.",
    url: "https://agroprime.qa",
    siteName: "Agroprime",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Agroprime | Farm-Fresh Eggs, Trusted Supply",
    description:
      "Agroprime is a Qatar-based egg producer and trading company, supplying fresh, quality-graded eggs to retail, wholesale, and export partners.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${notoKufiArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
