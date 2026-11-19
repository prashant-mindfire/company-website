import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/utils";
import { Service } from "@/types/service";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative h-52">
        <Image
          src={getStrapiMediaUrl(service.image?.url)}
          alt={service.image?.alternativeText || service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          <BlocksRenderer content={service.description} />
        </p>

        <p className="mt-4 font-semibold text-blue-600">
          Starting at ${service.price}
        </p>
      </div>
    </article>
  );
}
