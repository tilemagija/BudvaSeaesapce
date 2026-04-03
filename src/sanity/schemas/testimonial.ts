import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Recenzija",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ime gosta", type: "string", validation: (R) => R.required() }),
    defineField({ name: "country", title: "Zemlja", type: "string" }),
    defineField({ name: "text", title: "Recenzija", type: "localeText", validation: (R) => R.required() }),
    defineField({
      name: "rating",
      title: "Ocjena (1-5)",
      type: "number",
      validation: (R) => R.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: "photo", title: "Foto gosta", type: "image", options: { hotspot: true } }),
    defineField({ name: "isActive", title: "Aktivna", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Redoslijed", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "name", subtitle: "country", media: "photo" },
    prepare({ title, subtitle }) { return { title, subtitle: subtitle ?? "" }; },
  },
});
