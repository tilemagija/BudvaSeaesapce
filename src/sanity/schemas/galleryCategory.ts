import { defineType, defineField } from "sanity";

export const galleryCategory = defineType({
  name: "galleryCategory",
  title: "Kategorija galerije",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "order", title: "Redoslijed", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title.me" },
    prepare({ title }) { return { title }; },
  },
});
