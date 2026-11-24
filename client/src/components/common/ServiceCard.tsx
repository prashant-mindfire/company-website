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
    <Card
      padding="none"
      hoverable
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="relative h-52 w-full shrink-0 bg-slate-100">
        <Image
          src={getStrapiMediaUrl(service.image?.url)}
          alt={service.image?.alternativeText || service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* flex-1 stretches this body to fill the card, mt-auto pins the price */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {service.title}
        </h3>

        <div className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
          <BlocksRenderer content={service.description} />
        </div>

        <p className="mt-auto pt-5 text-lg font-bold text-blue-600 dark:text-blue-400">
          ${service.price.toLocaleString("en-US")}
        </p>
      </div>
    </Card>
  );
}
