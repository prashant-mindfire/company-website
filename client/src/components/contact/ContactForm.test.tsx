import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("shows validation errors and does not submit invalid values", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Email address is required")
    ).toBeInTheDocument();
    expect(await screen.findByText("Message is required")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits valid values and shows success", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ message: "Message received." }),
    } as unknown as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Please help with an integration." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Message received."
    );
    expect(screen.getByLabelText("Full name")).toHaveValue("");
    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("shows an HTTP response message as an alert", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: "Service unavailable." }),
    } as unknown as Response);

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Please help with an integration." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Service unavailable."
    );
  });

  it("shows a fallback when fetch rejects", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Please help with an integration." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("offline");
    });
  });
});
