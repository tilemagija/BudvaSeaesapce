import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galerija",
  type: "document",
  fields: [
    defineField({
      name: "mediaType",
      title: "Tip medija",
      type: "string",
      options: { list: [{ title: "Slika", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
      initialValue: "image",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "image",
      title: "Slika",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType === "video",
    }),
    defineField({
      name: "video",
      title: "Video (MP4)",
      type: "file",
      options: { accept: "video/mp4,video/*" },
      hidden: ({ document }) => document?.mediaType !== "video",
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
