import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { env } from "@/config/env";
import { contactSchema } from "@/lib/validations/contact.schema";

export async function POST(request: NextRequest) {
  try {
    const payload: unknown = await request.json();

    // Validate and strip unknown fields.
    const validatedData = await contactSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (!env.CMS_API_TOKEN) {
      console.error("CMS_API_TOKEN is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Contact form is temporarily unavailable.",
        },
        { status: 503 }
      );
    }

    const response = await fetch(
      new URL("/api/contact-messages", env.CMS_URL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.CMS_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: validatedData,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      // Log upstream details on the server only.
      const errorDetails = await response.text();

      return NextResponse.json(
        {
          success: false,
          message: `Unable to send your message. Please try again. ${errorDetails}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us. We'll get back to you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0] || "Invalid form data.",
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
