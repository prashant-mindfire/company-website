import { StrapiMedia } from "./strapi";

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  content: unknown;
  featured: boolean;
  image: StrapiMedia;
}