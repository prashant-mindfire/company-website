import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/config/env", () => ({
  env: { CMS_URL: "http://localhost:1337" },
}));

import { getStrapiMediaUrl } from "./utils";

describe("getStrapiMediaUrl", () => {
  afterEach(() => vi.clearAllMocks());

  it("returns the placeholder for missing URLs", () => {
    expect(getStrapiMediaUrl()).toBe("/images/placeholder.png");
    expect(getStrapiMediaUrl(null)).toBe("/images/placeholder.png");
    expect(getStrapiMediaUrl("")).toBe("/images/placeholder.png");
  });

  it("preserves absolute HTTP and HTTPS URLs", () => {
    expect(getStrapiMediaUrl("https://cdn.example.com/image.jpg")).toBe(
      "https://cdn.example.com/image.jpg"
    );
    expect(getStrapiMediaUrl("http://cdn.example.com/image.jpg")).toBe(
      "http://cdn.example.com/image.jpg"
    );
  });

  it("prefixes relative URLs with the CMS URL", () => {
    expect(getStrapiMediaUrl("/uploads/image.jpg")).toBe(
      "http://localhost:1337/uploads/image.jpg"
    );
  });
});
