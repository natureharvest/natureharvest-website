// export const BACKEND_URL = (
//   (import.meta as unknown as { env?: Record<string, string> }).env
//     ?.VITE_BACKEND_URL || "http://localhost:3000"
// ).replace(/\/+$/, "");

// export const FALLBACK_IMG =
//   "data:image/svg+xml;utf8," +
//   encodeURIComponent(
//     '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
//     '<rect width="100%" height="100%" fill="#e5e7eb"/>' +
//     '<text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" ' +
//     'font-size="18" text-anchor="middle" dominant-baseline="middle">No Image</text>' +
//     "</svg>"
//   );

// export function getImageSrc(raw: unknown): string {
//   if (!raw || typeof raw !== "string" || !raw.trim()) return FALLBACK_IMG;
//   const s = raw.trim();
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:") ||
//     s.startsWith("blob:")
//   ) {
//     return s;
//   }
//   return BACKEND_URL + "/" + s.replace(/\\/g, "/").replace(/^\.?\/+/, "");
// }


export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export const FALLBACK_IMG = "/no-image.png";

export function getImageSrc(image?: string | null): string {
  if (!image) return FALLBACK_IMG;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  return `${BACKEND_URL}/${image.replace(/\\/g, "/").replace(/^\/+/, "")}`;
}