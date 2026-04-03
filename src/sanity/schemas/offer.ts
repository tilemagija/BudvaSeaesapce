import { defineType, defineField } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Ponuda / Akcija",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv akcije", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Opis", type: "localeText" }),
    defineField({ name: "badge", title: "Badge tekst", type: "localeString", description: "Npr: '20% OFF'" }),
    defineField({ name: "validUntil", title: "Vrijedi do", type: "date" }),
    defineField({ name: "linkedTour", title: "Vezana tura", type: "reference", to: [{ type: "tour" }] }),
    defineField({ name: "isActive", title: "Aktivna", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title.me", active: "isActive" },
    prepare({ title, active }) { return { title: `${active ? "🔥" : "⛔"} ${title ?? ""}` }; },
  },
});
