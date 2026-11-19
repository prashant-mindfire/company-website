import { BlocksContent } from "@strapi/blocks-react-renderer";
import { StrapiMedia } from "./strapi";

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: BlocksContent;
  price: number;
  featured: boolean;
  image: StrapiMedia;
}
