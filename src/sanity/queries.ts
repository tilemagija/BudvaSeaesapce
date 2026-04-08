import { groq } from "next-sanity";

// ---- TOURS ----

// Full tour data (used for cards + modal — fetches everything in one query)
export const toursFullQuery = groq`
  *[_type == "tour" && (isActive == true || !defined(isActive))] | order(order asc, _createdAt asc) {
    _id,
    "title": title,
    "slug": slug.current,
    "shortDescription": shortDescription,
    price,
    duration,
    maxPeople,
    coverImage,
    whatsappMessage,
    isFeatured
  }
`;

export const toursQuery = groq`
  *[_type == "tour" && isActive == true] | order(order asc, _createdAt asc) {
    _id,
    "title": title,
    "slug": slug.current,
    "shortDescription": shortDescription,
    price,
    "priceNote": priceNote,
    duration,
    maxPeople,
    coverImage,
    isFeatured,
    "category": category->{ _id, "title": title, "slug": slug.current, icon }
  }
`;

export const tourBySlugQuery = groq`
  *[_type == "tour" && slug.current == $slug && isActive == true][0] {
    _id,
    "title": title,
    "slug": slug.current,
    "shortDescription": shortDescription,
    "longDescription": longDescription,
    price,
    "priceNote": priceNote,
    duration,
    maxPeople,
    coverImage,
    galleryImages,
    "includedItems": includedItems,
    "notIncluded": notIncluded,
    "whatToBring": whatToBring,
    "whatsappMessage": whatsappMessage,
    "category": category->{ _id, "title": title, "slug": slug.current, icon }
  }
`;

export const tourCategoriesQuery = groq`
  *[_type == "tourCategory"] | order(order asc) {
    _id,
    "title": title,
    "slug": slug.current,
    icon
  }
`;

// ---- GALLERY ----
export const galleryQuery = groq`
  *[_type == "galleryItem" && isActive == true] | order(order asc, _createdAt asc) {
    _id,
    mediaType,
    image,
    "videoUrl": video.asset->url,
    "caption": caption,
    "category": category->{ _id, "title": title, "slug": slug.current }
  }
`;

export const galleryCategoriesQuery = groq`
  *[_type == "galleryCategory"] | order(order asc) {
    _id,
    "title": title,
    "slug": slug.current
  }
`;

// ---- TESTIMONIALS ----
export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true] | order(order asc, _createdAt asc) {
    _id,
    name,
    country,
    "text": text,
    rating,
    photo
  }
`;

// ---- FAQ ----
export const faqQuery = groq`
  *[_type == "faq" && isActive == true] | order(order asc) {
    _id,
    "question": question,
    "answer": answer
  }
`;

// ---- CAPTAIN ----
export const captainQuery = groq`
  *[_type == "captain" && isVisible == true][0] {
    _id,
    name,
    photo,
    "bio": bio,
    "tagline": tagline
  }
`;

// ---- SITE SETTINGS ----
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    "tagline": tagline,
    logo,
    whatsappNumber,
    instagramUrl,
    instagramHandle,
    email,
    "heroHeadline": heroHeadline,
    "heroSubheadline": heroSubheadline,
    "heroCtaText": heroCtaText,
    heroBackgroundImage,
    heroBackgroundVideo,
    "introText": introText,
    "introCtaText": introCtaText,
    "seoTitle": seoTitle,
    "seoDescription": seoDescription,
    ogImage,
    backgroundMusicUrl,
    "footerText": footerText,
    copyrightText
  }
`;

// ---- OFFERS ----
export const offersQuery = groq`
  *[_type == "offer" && isActive == true && (validUntil >= now() || !defined(validUntil))] | order(_createdAt desc) {
    _id,
    "title": title,
    "description": description,
    "badge": badge,
    validUntil,
    "linkedTour": linkedTour->{ _id, "title": title, "slug": slug.current }
  }
`;

// ---- SITEMAP / STATIC PARAMS ----
export const tourSlugsQuery = groq`
  *[_type == "tour" && isActive == true] {
    "slug": slug.current,
    _updatedAt
  }
`;
