import { StrapiMedia } from "./strapi";

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  designation: string;
  photo?: StrapiMedia | null;
  bio: string;
  email?: string | null;
  displayOrder: number;
}
