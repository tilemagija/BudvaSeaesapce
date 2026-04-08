// src/app/[locale]/tours/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { client, urlFor } from "@/sanity/client";
import { tourBySlugQuery, tourSlugsQuery } from "@/sanity/queries";
import { routing } from "@/i18n/routing";
import type { TourDetail } from "@/types/tour";

const BASE_URL = "https://budvaseaescape.com";
const WA_NUMBER = "38267087728";
type Locale = "me" | "en" | "ru";
type Params = { locale: string; slug: string };

// Portable Text rendering without @tailwindcss/typography
// Typed via PortableTextComponents so TypeScript infers correct prop types per component
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-svetla/70 text-base leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-xl font-bold text-svetla mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold text-svetla/90 mb-2 mt-4">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-svetla">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-tirkizna underline underline-offset-2 hover:text-tirkizna/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const tours = await client.fetch<{ slug: string }[]>(
    tourSlugsQuery,
    {},
    { next: { revalidate: 3600 } }
  );
  return routing.locales.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = await client.fetch<TourDetail | null>(
    tourBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  );
  if (!tour) return {};

  const l = locale as Locale;
  const title = tour.title?.[l] ?? tour.title?.en ?? "";
  const description = tour.shortDescription?.[l] ?? tour.shortDescription?.en ?? "";
  const canonicalUrl = `${BASE_URL}/${locale}/tours/${slug}`;
  const ogImageUrl = tour.coverImage
    ? urlFor(tour.coverImage).width(1200).height(630).fit("crop").url()
    : null;

  return {
    title: `${title} — Budva Sea Escape`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/tours/${slug}`,
        "sr-ME": `${BASE_URL}/me/tours/${slug}`,
        ru: `${BASE_URL}/ru/tours/${slug}`,
        "x-default": `${BASE_URL}/en/tours/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — Budva Sea Escape`,
      description,
      url: canonicalUrl,
      siteName: "Budva Sea Escape",
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      }),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Budva Sea Escape`,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const tour = await client.fetch<TourDetail | null>(
    tourBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  );

  if (!tour) notFound();

  const l = locale as Locale;
  const title = tour.title?.[l] ?? tour.title?.en ?? "";
  const shortDesc = tour.shortDescription?.[l] ?? tour.shortDescription?.en ?? "";
  const longDesc = tour.longDescription?.[l] ?? tour.longDescription?.en ?? null;

  const imageUrl = tour.coverImage
    ? urlFor(tour.coverImage).width(1200).height(700).fit("crop").url()
    : null;

  const waMsg =
    tour.whatsappMessage ??
    `Hi! I'm interested in booking: ${tour.title?.en ?? title}`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-tamna pt-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-4xl mx-auto px-6 md:px-8 pt-8 pb-4"
        >
          <ol className="flex items-center gap-2 text-xs text-svetla/40 tracking-widest uppercase">
            <li>
              <Link href="/" className="hover:text-tirkizna transition-colors">
                Budva Sea Escape
              </Link>
            </li>
            <li className="text-svetla/20">›</li>
            <li className="text-svetla/60">{title}</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto px-6 md:px-8 pb-24">
          {/* Cover image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[420px] mb-10 overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Title + price */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-koralna leading-tight">
              {title}
            </h1>
            {tour.price && (
              <span className="flex-shrink-0 px-4 py-2 bg-tirkizna text-tamna text-lg font-bold rounded-full">
                €{tour.price}
              </span>
            )}
          </div>

          {/* Meta pills */}
          {(tour.duration || tour.maxPeople) && (
            <div className="flex gap-3 mb-6 flex-wrap">
              {tour.duration && (
                <span className="px-4 py-2 bg-white/10 text-svetla/70 text-sm rounded-full">
                  ⏱ {tour.duration}
                </span>
              )}
              {tour.maxPeople && (
                <span className="px-4 py-2 bg-white/10 text-svetla/70 text-sm rounded-full">
                  👥 max {tour.maxPeople}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-tirkizna/20 mb-8" />

          {/* Short description */}
          <p className="text-svetla/80 text-lg leading-relaxed mb-8">
            {shortDesc}
          </p>

          {/* Long description (Portable Text) */}
          {longDesc && longDesc.length > 0 && (
            <div className="mb-10">
              <PortableText
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={longDesc as any}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* WhatsApp CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-koralna hover:bg-koralna/90 text-white font-bold tracking-widest uppercase py-5 rounded-xl text-sm transition-colors"
          >
            Book via WhatsApp →
          </a>
        </article>
      </main>

      <Footer />
    </>
  );
}
