export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends
    .normalize("NFD") // Separate accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Remove the separated accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove start/end hyphens
};
