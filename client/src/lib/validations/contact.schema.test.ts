import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact.schema";

describe("contactSchema", () => {
  it("accepts and trims valid values", async () => {
    await expect(
      contactSchema.validate({
        name: "  Ada Lovelace  ",
        email: "  ada@example.com  ",
        message: "  Please help with an integration.  ",
      })
    ).resolves.toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please help with an integration.",
    });
  });

  it("rejects missing required values", async () => {
    await expect(
      contactSchema.validate(
        { name: "", email: "", message: "" },
        {
          abortEarly: false,
        }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining([
        "Name is required",
        "Email address is required",
        "Message is required",
      ]),
    });
  });

  it("rejects invalid email format", async () => {
    await expect(
      contactSchema.validate({
        name: "Ada",
        email: "not-an-email",
        message: "This is a valid message.",
      })
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("enforces field boundaries", async () => {
    await expect(
      contactSchema.validate({
        name: "n".repeat(101),
        email: "ada@example.com",
        message: "This is a valid message.",
      })
    ).rejects.toThrow("Name cannot exceed 100 characters");

    await expect(
      contactSchema.validate({
        name: "Ada",
        email: "ada@example.com",
        message: "123456789",
      })
    ).rejects.toThrow("Message must contain at least 10 characters");

    await expect(
      contactSchema.validate({
        name: "Ada",
        email: "ada@example.com",
        message: "m".repeat(5001),
      })
    ).rejects.toThrow("Message cannot exceed 5000 characters");
  });
});
