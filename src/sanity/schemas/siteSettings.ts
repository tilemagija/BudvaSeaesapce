import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Podešavanja sajta",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Naziv sajta", type: "string", initialValue: "Budva Sea Escape" }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp broj",
      type: "string",
      initialValue: "+38267087728",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/budvaseaescape",
    }),
    defineField({ name: "instagramHandle", title: "Instagram handle", type: "string", initialValue: "@budvaseaescape" }),
    defineField({ name: "email", title: "Email (opciono)", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero naslov", type: "localeString" }),
    defineField({ name: "heroSubheadline", title: "Hero podnaslov", type: "localeString" }),
    defineField({ name: "heroCtaText", title: "Hero CTA tekst", type: "localeString" }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero pozadinska slika",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "introText", title: "Intro ekran tekst", type: "localeString" }),
    defineField({ name: "introCtaText", title: "Intro CTA (dugme)", type: "localeString" }),
    defineField({ name: "seoTitle", title: "SEO naslov", type: "localeString" }),
    defineField({ name: "seoDescription", title: "SEO opis", type: "localeText" }),
    defineField({ name: "ogImage", title: "OG slika (za share preview)", type: "image" }),
    defineField({
      name: "backgroundMusicUrl",
      title: "Pozadinska muzika (direktan MP3 link)",
      type: "url",
      description: "Direktan link na MP3 fajl sa royalty-free sajtova (pixabay.com/music ili mixkit.co). NE koristiti YouTube ili Spotify linkove.",
    }),
    defineField({ name: "footerText", title: "Footer tekst", type: "localeString" }),
    defineField({
      name: "copyrightText",
      title: "Copyright tekst",
      type: "string",
      initialValue: `© ${new Date().getFullYear()} Budva Sea Escape`,
    }),
  ],
  preview: {
    prepare() { return { title: "⚙️ Podešavanja sajta" }; },
  },
});
