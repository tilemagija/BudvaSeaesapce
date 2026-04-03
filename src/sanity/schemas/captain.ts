import { defineType, defineField } from "sanity";

export const captain = defineType({
  name: "captain",
  title: "Kapetan",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ime", type: "string", initialValue: "Nemanja" }),
    defineField({ name: "photo", title: "Fotografija", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "localeBlockContent" }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString", description: "Npr: 'Vaš kapetan, vaš vodič'" }),
    defineField({ name: "isVisible", title: "Prikaži sekciju", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
    prepare({ title, media }) { return { title: `Kapetan ${title ?? ""}`, media }; },
  },
});
