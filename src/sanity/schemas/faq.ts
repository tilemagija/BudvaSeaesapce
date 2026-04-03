import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pitanje", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Odgovor", type: "localeText", validation: (R) => R.required() }),
    defineField({ name: "order", title: "Redoslijed", type: "number", initialValue: 99 }),
    defineField({ name: "isActive", title: "Aktivno", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "question.me" },
    prepare({ title }) { return { title: title ?? "FAQ" }; },
  },
});
