import { env } from "@/config/env";

export interface StrapiFetchOptions {
  query?: Record<string, string>;
  revalidate?: number | false;
}

const strapiFetch = async <T>(
  endpoint: string,
  options: StrapiFetchOptions = {}
): Promise<T> => {
  const { query, revalidate } = options;

  const url = new URL(`/api/${endpoint}`, env.CMS_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (env.CMS_API_TOKEN) {
    headers.Authorization = `Bearer ${env.CMS_API_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : {
          cache: "force-cache" as const,
          ...(revalidate !== undefined ? { next: { revalidate } } : {}),
        }),
  });

  if (!response.ok) {
    throw new Error(
      `Strapi API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export default strapiFetch;
