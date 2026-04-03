import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "budvaseaescape",
  title: "Budva Sea Escape CMS",
  projectId: "f4ltbt5l",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Budva Sea Escape")
          .items([
            S.listItem()
              .title("⚙️ Podešavanja sajta")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("🚢 Ture")
              .child(S.documentTypeList("tour").title("Ture")),
            S.listItem()
              .title("🏷️ Kategorije tura")
              .child(S.documentTypeList("tourCategory").title("Kategorije tura")),
            S.divider(),
            S.listItem()
              .title("📸 Galerija")
              .child(S.documentTypeList("galleryItem").title("Slike galerije")),
            S.listItem()
              .title("🏷️ Kategorije galerije")
              .child(S.documentTypeList("galleryCategory").title("Kategorije galerije")),
            S.divider(),
            S.listItem()
              .title("⭐ Recenzije")
              .child(S.documentTypeList("testimonial").title("Recenzije")),
            S.listItem()
              .title("❓ FAQ")
              .child(S.documentTypeList("faq").title("Česta pitanja")),
            S.listItem()
              .title("🧑‍✈️ Kapetan")
              .child(
                S.document().schemaType("captain").documentId("captain")
              ),
            S.listItem()
              .title("🎁 Ponude / Akcije")
              .child(S.documentTypeList("offer").title("Ponude")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
