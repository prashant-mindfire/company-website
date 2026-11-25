import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/strapi", () => ({ default: vi.fn() }));

import strapiFetch from "@/lib/strapi";
import {
  getFeaturedBlogs,
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
} from "./blog.service";
import { getFeaturedServices, getServices } from "./service.service";
import { getSiteSettings } from "./site.service";
import { getTeamMembers } from "./team.service";

describe("CMS services", () => {
  beforeEach(() => {
    vi.mocked(strapiFetch).mockReset();
  });

  it("requests featured blogs with the expected filters", async () => {
    vi.mocked(strapiFetch).mockResolvedValue({ data: [{ slug: "one" }] });

    await expect(getFeaturedBlogs(4)).resolves.toEqual([{ slug: "one" }]);
    expect(strapiFetch).toHaveBeenCalledWith("blog-posts", {
      query: {
        populate: "*",
        "filters[featured][$eq]": "true",
        "sort[0]": "publishedDate:desc",
        "pagination[pageSize]": "4",
      },
    });
  });

  it("builds search and pagination for blog listings", async () => {
    vi.mocked(strapiFetch).mockResolvedValue({
      data: [{ slug: "one" }],
      meta: { pagination: { page: 2, pageSize: 3, pageCount: 5, total: 15 } },
    });

    await expect(
      getBlogPosts({ page: 2, pageSize: 3, search: "  design  " })
    ).resolves.toMatchObject({
      posts: [{ slug: "one" }],
      pagination: { page: 2, pageSize: 3, pageCount: 5, total: 15 },
    });

    expect(strapiFetch).toHaveBeenCalledWith("blog-posts", {
      query: expect.objectContaining({
        "pagination[page]": "2",
        "pagination[pageSize]": "3",
        "filters[$or][0][title][$containsi]": "design",
        "filters[$or][1][excerpt][$containsi]": "design",
        "filters[$or][2][author][$containsi]": "design",
      }),
      revalidate: 60,
    });
  });

  it("falls back to derived blog pagination metadata", async () => {
    vi.mocked(strapiFetch).mockResolvedValue({
      data: [{ slug: "one" }, { slug: "two" }],
    });

    await expect(getBlogPosts({ page: 1, pageSize: 6 })).resolves.toEqual({
      posts: [{ slug: "one" }, { slug: "two" }],
      pagination: { page: 1, pageSize: 6, pageCount: 1, total: 2 },
    });
  });

  it("gets a blog by slug and returns null when absent", async () => {
    vi.mocked(strapiFetch)
      .mockResolvedValueOnce({ data: [{ slug: "one" }] })
      .mockResolvedValueOnce({ data: [] });

    await expect(getBlogPostBySlug("one")).resolves.toEqual({ slug: "one" });
    await expect(getBlogPostBySlug("missing")).resolves.toBeNull();
  });

  it("paginates across all blog slugs", async () => {
    vi.mocked(strapiFetch)
      .mockResolvedValueOnce({
        data: [{ slug: "one" }],
        meta: { pagination: { pageCount: 2 } },
      })
      .mockResolvedValueOnce({
        data: [{ slug: "two" }],
        meta: { pagination: { pageCount: 2 } },
      });

    await expect(getAllBlogSlugs()).resolves.toEqual([
      { slug: "one" },
      { slug: "two" },
    ]);
  });

  it("requests services, settings, and team members", async () => {
    vi.mocked(strapiFetch)
      .mockResolvedValueOnce({ data: [{ title: "Web" }] })
      .mockResolvedValueOnce({ data: [{ title: "Featured" }] })
      .mockResolvedValueOnce({ data: { companyName: "Acme" } })
      .mockResolvedValueOnce({ data: [{ name: "Ada" }] });

    await expect(getServices()).resolves.toEqual([{ title: "Web" }]);
    await expect(getFeaturedServices()).resolves.toEqual([
      { title: "Featured" },
    ]);
    await expect(getSiteSettings()).resolves.toEqual({ companyName: "Acme" });
    await expect(getTeamMembers()).resolves.toEqual([{ name: "Ada" }]);

    expect(strapiFetch).toHaveBeenNthCalledWith(1, "services", {
      query: { populate: "*", sort: "createdAt:asc" },
    });
    expect(strapiFetch).toHaveBeenNthCalledWith(3, "site-setting", {
      query: { populate: "*" },
    });
    expect(strapiFetch).toHaveBeenNthCalledWith(4, "team-members", {
      query: { populate: "*", sort: "displayOrder:asc" },
    });
  });
});
