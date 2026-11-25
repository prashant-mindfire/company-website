import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";
import Container from "./Container";
import EmptyState from "./EmptyState";
import PageHero from "./PageHero";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

describe("shared UI primitives", () => {
  it("renders Card variants and native props", () => {
    render(
      <Card padding="lg" hoverable data-testid="card" aria-label="Feature">
        Card content
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveTextContent("Card content");
    expect(card).toHaveAttribute("aria-label", "Feature");
    expect(card).toHaveClass("p-8", "hover:-translate-y-1");
  });

  it("renders Container and Section", () => {
    render(
      <Section id="features" background="light" spacing="lg">
        <Container size="lg">
          <p>Inside section</p>
        </Container>
      </Section>
    );

    expect(document.querySelector("#features")).toHaveClass(
      "bg-gray-50",
      "py-20"
    );
    expect(document.querySelector("#features p")).toHaveTextContent(
      "Inside section"
    );
  });

  it("renders section headings and empty states", () => {
    render(
      <>
        <SectionHeading
          eyebrow="Services"
          title="What we offer"
          description="Our capabilities"
          align="center"
        />
        <EmptyState title="Nothing found" description="Try a different query" />
      </>
    );

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What we offer" })
    ).toBeInTheDocument();
    expect(screen.getByText("Try a different query")).toBeInTheDocument();
  });

  it("renders PageHero content", () => {
    render(
      <PageHero
        eyebrow="Journal"
        title="Insights"
        description="Read our articles"
      />
    );

    expect(screen.getByText("Journal")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Insights" })
    ).toBeInTheDocument();
  });
});
