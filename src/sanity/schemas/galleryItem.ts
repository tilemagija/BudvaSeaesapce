import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galerija",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({ name: "category", title: "Kategorija", type: "reference", to: [{ type: "galleryCategory" }] }),
    defineField({ name: "caption", title: "Opis", type: "localeString" }),
    defineField({ name: "order", title: "Redoslijed", type: "number", initialValue: 99 }),
    defineField({ name: "isActive", title: "Aktivna", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { media: "image", category: "category.title.me" },
    prepare({ media, category }) { return { title: category ?? "Galerija", media }; },
  },
});
