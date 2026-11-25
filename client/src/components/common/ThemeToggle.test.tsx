import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const setTheme = vi.fn();
let resolvedTheme: string | undefined = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme, setTheme }),
}));

import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("switches to dark mode from a light theme", async () => {
    resolvedTheme = "light";
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Switch to dark mode" });
    await user.click(button);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("switches to light mode from a dark theme", async () => {
    resolvedTheme = "dark";
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(
      screen.getByRole("button", { name: "Switch to light mode" })
    );

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
