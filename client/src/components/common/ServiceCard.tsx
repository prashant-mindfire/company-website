import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiMediaUrl } from "@/lib/utils";
import { Service } from "@/types/service";
import Card from "./ui/Card";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card padding="none" hoverable className="overflow-hidden">
      <div className="relative aspect-4/3 bg-slate-100">
        <Image
          src={getStrapiMediaUrl(service.image?.url)}
          alt={service.image?.alternativeText || service.title}
          width={800}
          height={450}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-52 w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {service.title}
        </h3>

        <div className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
          <BlocksRenderer content={service.description} />
        </div>

        <p className="mt-5 text-lg font-bold text-blue-600 dark:text-blue-400">
          ${service.price.toLocaleString("en-US")}
        </p>
      </div>
    </Card>
  );
}
