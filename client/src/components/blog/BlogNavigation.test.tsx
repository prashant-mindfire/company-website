import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

import BlogPagination from "./BlogPagination";
import BlogSearch from "./BlogSearch";

describe("blog navigation", () => {
  it("renders no pagination for a single page", () => {
    const { container } = render(
      <BlogPagination currentPage={1} pageCount={1} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders previous and next links with search preserved", () => {
    render(
      <BlogPagination currentPage={2} pageCount={3} search="cloud & data" />
    );

    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/blog?page=1&q=cloud+%26+data"
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/blog?page=3&q=cloud+%26+data"
    );
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("disables previous on the first page and next on the last page", () => {
    const { rerender } = render(
      <BlogPagination currentPage={1} pageCount={3} />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/blog?page=2"
    );

    rerender(<BlogPagination currentPage={3} pageCount={3} />);
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/blog?page=2"
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders a GET search form with the supplied value", () => {
    render(<BlogSearch search="cloud" />);

    const input = screen.getByRole("searchbox", {
      name: "Search blog articles",
    });
    expect(input.closest("form")).toHaveAttribute("action", "/blog");
    expect(input.closest("form")).toHaveAttribute("method", "GET");
    expect(input).toHaveValue("cloud");
  });
});
