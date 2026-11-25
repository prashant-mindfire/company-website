import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the company name and footer text", () => {
    render(
      <Footer
        companyName="Acme Inc"
        footerText="Building reliable software since 2020"
      />
    );

    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
    expect(
      screen.getByText("Building reliable software since 2020")
    ).toBeInTheDocument();
  });

  it("renders without footer text when it is not provided", () => {
    render(<Footer companyName="Acme Inc" />);

    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
    expect(
      screen.queryByText(/Building reliable software/)
    ).not.toBeInTheDocument();
  });
});
