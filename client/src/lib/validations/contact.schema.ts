import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email address is required")
    .max(255, "Email cannot exceed 255 characters"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(10, "Message must contain at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
