import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/config/env", () => ({
  env: {
    CMS_URL: "http://localhost:1337",
    CMS_API_TOKEN: "test-token",
  },
}));

import { POST } from "./route";

function request(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("validates, strips unknown fields, and submits to Strapi", async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);

    const response = await POST(
      request({
        name: "  Ada Lovelace  ",
        email: "  ada@example.com  ",
        message: "  Please help with an integration.  ",
        admin: true,
      })
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: "Thank you for contacting us. We'll get back to you soon.",
    });

    expect(fetch).toHaveBeenCalledWith(
      new URL("/api/contact-messages", "http://localhost:1337"),
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
        body: expect.stringContaining("Ada Lovelace"),
      })
    );
  });

  it("returns 400 for malformed request data", async () => {
    const response = await POST(
      request({ name: "", email: "bad", message: "short" })
    );

    expect(response.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 502 for an upstream failure", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      text: vi.fn().mockResolvedValue("Invalid fields"),
    } as unknown as Response);

    const response = await POST(
      request({
        name: "Ada",
        email: "ada@example.com",
        message: "This is a valid message.",
      })
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });

  it("returns 500 for unexpected fetch failures", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));

    const response = await POST(
      request({
        name: "Ada",
        email: "ada@example.com",
        message: "This is a valid message.",
      })
    );

    expect(response.status).toBe(500);
  });
});
