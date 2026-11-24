"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact.schema";
import { ContactFormResponse } from "@/types/contact";
import Button from "../common/ui/Button";
import Input from "../common/ui/Input";
import Textarea from "../common/ui/Textarea";
import Form from "../common/ui/Form";

export default function ContactForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const methods = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
  });

  const { isSubmitting } = methods.formState;

  const handleSubmit = async (values: ContactFormValues) => {
    setSuccessMessage("");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result: ContactFormResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your message.");
      }

      setSuccessMessage(result.message);
      methods.reset();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <Form methods={methods} onSubmit={handleSubmit} className="space-y-6">
        <Input<ContactFormValues>
          name="name"
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          disabled={isSubmitting}
        />

        <Input<ContactFormValues>
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isSubmitting}
        />

        <Textarea<ContactFormValues>
          name="message"
          label="Message"
          placeholder="Tell us how we can help..."
          rows={6}
          disabled={isSubmitting}
        />

        {serverError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
          >
            {serverError}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
          >
            {successMessage}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Sending message..." : "Send Message"}
        </Button>
      </Form>
    </div>
  );
}
