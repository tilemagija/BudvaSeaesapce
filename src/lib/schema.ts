// src/lib/schema.ts

const BASE_URL = "https://budvaseaescape.com";

// ---- LocalBusiness + TouristAttraction ----

export function buildLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LocalBusiness"],
    "@id": `${BASE_URL}/#business`,
    name: "Budva Sea Escape",
    description:
      "Premium boat tours, snorkeling, fishing and sunset cruises on the Adriatic Sea in Budva, Montenegro.",
    url: BASE_URL,
    telephone: "+38267087728",
    foundingDate: "2022",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    sameAs: [
      "https://www.instagram.com/budvaseaescape",
      "https://wa.me/38267087728",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Slovenska Obala",
      addressLocality: "Budva",
      postalCode: "85310",
      addressCountry: "ME",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.2806,
      longitude: 18.8378,
    },
    hasMap: "https://maps.google.com/?q=42.2806,18.8378",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "06:00",
      closes: "23:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "108",
      bestRating: "5",
      worstRating: "1",
    },
    touristType: ["Couples", "Families", "Adventure seekers"],
  };
}

// ---- Person (Captain) ----

export function buildCaptainPerson(captainName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#captain`,
    name: captainName,
    jobTitle: "Boat Captain & Tour Guide",
    worksFor: { "@id": `${BASE_URL}/#business` },
    url: BASE_URL,
    sameAs: ["https://www.instagram.com/budvaseaescape"],
  };
}

// ---- TouristTrip (per tour page) ----

export interface TourSchemaInput {
  name: string;
  description: string;
  slug: string;
  price: number;
  duration?: string;
  maxPeople?: number;
  imageUrl: string | null;
}

export function buildTouristTrip(tour: TourSchemaInput, locale: string) {
  const tourUrl = `${BASE_URL}/${locale}/tours/${tour.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${tourUrl}#trip`,
    name: tour.name,
    description: tour.description,
    url: tourUrl,
    provider: { "@id": `${BASE_URL}/#business` },
    touristType: ["Couples", "Families", "Adventure seekers"],
    ...(tour.imageUrl && { image: tour.imageUrl }),
    ...(tour.duration && { duration: tour.duration }),
    ...(tour.maxPeople && { maximumAttendeeCapacity: tour.maxPeople }),
    offers: {
      "@type": "Offer",
      price: tour.price.toString(),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://wa.me/38267087728`,
      seller: { "@id": `${BASE_URL}/#business` },
    },
  };
}

// ---- BreadcrumbList ----

export function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
