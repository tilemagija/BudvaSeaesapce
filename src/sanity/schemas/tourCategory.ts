import { defineType, defineField } from "sanity";

export const tourCategory = defineType({
  name: "tourCategory",
  title: "Kategorija ture",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naziv kategorije",
      type: "localeString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikonica (emoji)",
      type: "string",
      description: "Npr: 🚤 🤿 🎣 🌅 🎉 ⭐",
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title.me", icon: "icon" },
    prepare({ title, icon }) {
      return { title: `${icon ?? ""} ${title ?? ""}` };
    },
  },
  orderings: [{ title: "Redoslijed", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
