import { CogIcon, DocumentTextIcon, TagIcon, UserIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set(["blogSettings"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog Posts")
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList("post")
            .title("Blog Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
      S.divider(),
      S.listItem()
        .title("Blog Settings")
        .icon(CogIcon)
        .child(
          S.documentTypeList("blogSettings")
            .title("Blog Settings")
            .child((id) =>
              S.document()
                .schemaType("blogSettings")
                .documentId(id),
            ),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "post",
            "author",
            "category",
            "blogSettings",
            "media.tag",
          ].includes(listItem.getId() ?? ""),
      ),
    ]);

export { SINGLETON_TYPES };
