import { StrapiMedia } from "./strapi";

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  featured: boolean;
  image: StrapiMedia;
}