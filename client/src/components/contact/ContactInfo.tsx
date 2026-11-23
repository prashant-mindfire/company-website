import Link from "next/link";
import Card from "../common/ui/Card";

interface ContactInfoProps {
  email?: string;
  phone?: string;
  address?: string;
}

export default function ContactInfo({
  email,
  phone,
  address,
}: ContactInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Get in touch
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Let&apos;s talk about your project
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          Have a question or an idea? Send us a message and we&apos;ll be happy
          to discuss how we can help.
        </p>
      </div>

      <Card padding="lg">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-900">Email</p>

            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block text-sm text-slate-600 hover:text-blue-600"
            >
              {email}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Phone</p>

            <Link
              href={`tel:${phone}`}
              className="mt-2 inline-block text-sm text-slate-600 hover:text-blue-600"
            >
              {phone}
            </Link>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Address</p>

            <p className="mt-2 text-sm leading-7 text-slate-600">{address}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
