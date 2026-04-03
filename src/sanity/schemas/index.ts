import { localeString, localeText, localeBlockContent } from "./localeString";
import { tourCategory } from "./tourCategory";
import { tour } from "./tour";
import { galleryCategory } from "./galleryCategory";
import { galleryItem } from "./galleryItem";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { offer } from "./offer";
import { captain } from "./captain";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Locale types (ne-dokument)
  localeString,
  localeText,
  localeBlockContent,
  // Singletons
  siteSettings,
  captain,
  // Documents
  tour,
  tourCategory,
  galleryItem,
  galleryCategory,
  testimonial,
  faq,
  offer,
];
