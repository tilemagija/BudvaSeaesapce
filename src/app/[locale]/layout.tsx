import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    me: "Budva Sea Escape — Premium morska iskustva",
    en: "Budva Sea Escape — Premium Sea Experiences",
    ru: "Budva Sea Escape — Премиум морские впечатления",
  };
  const descriptions: Record<string, string> = {
    me: "Ture, ronjenje, pecanje i sunset krstarenja na Jadranskom moru u Budvi, Crna Gora.",
    en: "Tours, diving, fishing and sunset cruises on the Adriatic Sea in Budva, Montenegro.",
    ru: "Туры, дайвинг, рыбалка и закатные круизы на Адриатике в Будве, Черногория.",
  };
  return {
    title: titles[locale] ?? titles.me,
    description: descriptions[locale] ?? descriptions.me,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
