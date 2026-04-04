import { defineType, defineField } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tura",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naziv ture",
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
      name: "shortDescription",
      title: "Kratki opis (max 160 znakova)",
      type: "localeText",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Puni opis",
      type: "localeBlockContent",
    }),
    defineField({
      name: "price",
      title: "Cijena (EUR)",
      type: "number",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "duration",
      title: "Trajanje",
      type: "string",
      description: "Npr: '3h', 'Full day', '2-3h'",
    }),
    defineField({
      name: "maxPeople",
      title: "Maksimalan broj osoba",
      type: "number",
    }),
    defineField({
      name: "coverImage",
      title: "Naslovna slika",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp poruka (EN)",
      type: "string",
      description: "Pre-popunjena poruka na engleskom — npr: 'Hi! I'm interested in the Sunset Cruise.'",
    }),
    defineField({
      name: "isActive",
      title: "Aktivna tura",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Istaknuta tura",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Redoslijed prikaza",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "title.me",
      price: "price",
      active: "isActive",
      media: "coverImage",
    },
    prepare({ title, price, active, media }) {
      return {
        title: `${active ? "✅" : "⛔"} ${title ?? ""}`,
        subtitle: price ? `€${price}` : "",
        media,
      };
    },
  },
  orderings: [{ title: "Redoslijed", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
