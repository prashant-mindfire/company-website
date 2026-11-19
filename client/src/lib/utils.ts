import { env } from "@/config/env";

export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) {
    return "/images/placeholder.png";
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${env.CMS_URL}${url}`;
}
