

const baseUrl = import.meta.env.VITE_API_BASE_URL;
// helper method for correct images retrieval
export function resolveImageUrl(path: string) {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${baseUrl}${path}`
}