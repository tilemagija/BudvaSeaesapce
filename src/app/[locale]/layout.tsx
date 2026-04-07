import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import LenisProvider from "@/components/LenisProvider";
import { client, urlFor } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

const BASE_URL = "https://budvaseaescape.com";

const FALLBACK_TITLES: Record<string, string> = {
  me: "Budva Sea Escape — Premium morska iskustva",
  en: "Budva Sea Escape — Premium Sea Experiences",
  ru: "Budva Sea Escape — Премиум морские впечатления",
};

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  me: "Ture, ronjenje, pecanje i sunset krstarenja na Jadranskom moru u Budvi, Crna Gora.",
  en: "Tours, diving, fishing and sunset cruises on the Adriatic Sea in Budva, Montenegro.",
  ru: "Туры, дайвинг, рыбалка и закатные круизы на Адриатике в Будве, Черногория.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = null;
  try {
    settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } });
  } catch {
    // Sanity unavailable — use fallbacks
  }

  // Title: Sanity seoTitle → fallback hardcoded
  const title =
    settings?.seoTitle?.[locale] ??
    settings?.seoTitle?.en ??
    FALLBACK_TITLES[locale] ??
    FALLBACK_TITLES.en;

  // Description: Sanity seoDescription → fallback hardcoded
  const description =
    settings?.seoDescription?.[locale] ??
    settings?.seoDescription?.en ??
    FALLBACK_DESCRIPTIONS[locale] ??
    FALLBACK_DESCRIPTIONS.en;

  // OG image: Sanity ogImage → heroBackgroundImage → nothing
  const ogImageAsset = settings?.ogImage ?? settings?.heroBackgroundImage ?? null;
  const ogImageUrl: string | null = ogImageAsset
    ? urlFor(ogImageAsset).width(1200).height(630).fit("crop").url()
    : null;

  // Canonical + alternates
  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": `${BASE_URL}/en`,
        "sr-ME": `${BASE_URL}/me`,
        "ru": `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Budva Sea Escape",
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Budva Sea Escape" }],
      }),
      locale: locale === "ru" ? "ru_RU" : locale === "me" ? "sr_ME" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
    },
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
      <LenisProvider>
        {children}
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
