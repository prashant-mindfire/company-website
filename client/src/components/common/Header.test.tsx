import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

let pathname = "/blog";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
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
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));
vi.mock("./ThemeToggle", () => ({
  default: () => <button type="button">Theme</button>,
}));

import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
    pathname = "/blog";
  });

  it("marks the current route in desktop navigation", () => {
    render(<Header />);

    const blogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(blogLinks[0]).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const openButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    await user.click(openButton);

    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close navigation menu" })
    ).toHaveAttribute("aria-expanded", "true");

    await user.click(
      screen.getByRole("button", { name: "Close navigation menu" })
    );
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" })
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a link is selected", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    await user.click(screen.getAllByRole("link", { name: "Contact" })[1]);

    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" })
    ).not.toBeInTheDocument();
  });

  it("renders a custom logo and site name", () => {
    render(<Header logoUrl="/logo.svg" logoAlt="Acme logo" siteName="Acme" />);

    expect(screen.getByRole("img", { name: "Acme logo" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Acme logo Acme|Acme/ })
    ).toBeInTheDocument();
  });
});
