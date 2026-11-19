import { StrapiMedia } from "./strapi";

export interface SiteSettings {
  id: number;
  documentId: string;
  companyName: string;
  bannerTitle: string;
  bannerSubtitle: string;
  logo?: StrapiMedia | null;
  mission?: string;
  vision?: string;
  footerText?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}