import type { Metadata } from "next";
import { getSiteSettings } from "@/services/site.service";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/common/ui/Container";
import PageHero from "@/components/common/ui/PageHero";
import Section from "@/components/common/ui/Section";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | TechNova Solutions",
  description:
    "Get in touch with TechNova Solutions to discuss your next technology project.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Start a Conversation"
        description="Tell us about your project, ask a question, or simply say hello. We'd love to hear from you."
      />

      <Section background="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactInfo
              email={settings.contactEmail}
              phone={settings.contactPhone}
              address={settings.address}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
