import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/config/env", () => ({
  env: {
    CMS_URL: "http://localhost:1337",
    CMS_API_TOKEN: "test-token",
  },
}));

import strapiFetch from "./strapi";

describe("strapiFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("builds a URL, adds authorization, and parses JSON", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: vi.fn().mockResolvedValue({ data: "ok" }),
    } as unknown as Response);

    await expect(
      strapiFetch("services", {
        query: { populate: "*", search: "a & b" },
        revalidate: false,
      })
    ).resolves.toEqual({ data: "ok" });

    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe(
      "http://localhost:1337/api/services?populate=*&search=a+%26+b"
    );
    expect(options).toMatchObject({
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test-token",
      },
    });
  });

  it("uses force-cache by default and next revalidation when requested", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ data: [] }),
    } as unknown as Response);

    await strapiFetch("services");
    expect(vi.mocked(fetch).mock.calls[0][1]).toMatchObject({
      cache: "force-cache",
    });

    await strapiFetch("blog-posts", { revalidate: 60 });
    expect(vi.mocked(fetch).mock.calls[1][1]).toMatchObject({
      next: { revalidate: 60 },
    });
  });

  it("throws an informative error for non-OK responses", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as unknown as Response);

    await expect(strapiFetch("missing")).rejects.toThrow(
      "Strapi API Error: 404 Not Found"
    );
  });
});
