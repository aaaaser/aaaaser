import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  return DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"], // For embeds like YouTube or CodePens if added
    ADD_ATTR: [
      "target",
      "rel",
      "style",
      "class",
      "src",
      "alt",
      "width",
      "height",
      "allowfullscreen",
      "frameborder",
    ],
  });
}
