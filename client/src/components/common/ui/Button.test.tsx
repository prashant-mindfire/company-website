import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("uses button type by default and forwards native props", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button variant="danger" size="lg" className="custom" onClick={onClick}>
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("custom", "bg-red-600", "px-6");

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports submit type and disabled state", () => {
    render(
      <Button type="submit" disabled>
        Save
      </Button>
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });
});
