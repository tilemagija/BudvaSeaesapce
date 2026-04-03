import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Lokalizovani tekst",
  type: "object",
  fields: [
    { name: "me", title: "Crnogorski 🇲🇪", type: "string" },
    { name: "en", title: "English 🇬🇧", type: "string" },
    { name: "ru", title: "Русский 🇷🇺", type: "string" },
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Lokalizovani tekst (duži)",
  type: "object",
  fields: [
    { name: "me", title: "Crnogorski 🇲🇪", type: "text", rows: 3 },
    { name: "en", title: "English 🇬🇧", type: "text", rows: 3 },
    { name: "ru", title: "Русский 🇷🇺", type: "text", rows: 3 },
  ],
});

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Lokalizovani rich text",
  type: "object",
  fields: [
    {
      name: "me", title: "Crnogorski 🇲🇪",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "en", title: "English 🇬🇧",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "ru", title: "Русский 🇷🇺",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
