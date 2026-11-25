import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/env", () => ({
  env: { CMS_URL: "http://localhost:1337", CMS_API_TOKEN: "test-token" },
}));
vi.mock("@/services/blog.service", () => ({
  getAllBlogSlugs: vi.fn().mockResolvedValue([{ slug: "hello-world" }]),
  getBlogPosts: vi.fn().mockResolvedValue({
    posts: [],
    pagination: { page: 1, pageSize: 6, pageCount: 1, total: 0 },
  }),
}));
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import sitemap from "./sitemap";
import robots from "./robots";
import BlogPage from "./blog/page";

describe("route utilities", () => {
  it("builds sitemap entries for static pages and blog posts", async () => {
    const entries = await sitemap();

    expect(entries).toHaveLength(6);
    expect(entries[0].url).toBe("http://localhost:3000");
    expect(entries[4].url).toBe("http://localhost:3000/contact");
    expect(entries[5].url).toBe("http://localhost:3000/blog/hello-world");
  });

  it("builds robots rules and sitemap URL", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "http://localhost:3000/sitemap.xml",
    });
  });

  it("renders an empty blog state and normalizes page parameters", async () => {
    render(
      await BlogPage({
        searchParams: Promise.resolve({ page: "-2", q: "  design  " }),
      })
    );

    expect(screen.getByText("No articles found")).toBeInTheDocument();
    expect(screen.getByText(/design/)).toBeInTheDocument();
  });
});
