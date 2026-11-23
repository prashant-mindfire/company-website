import { BlocksContent } from "@strapi/blocks-react-renderer";
import { StrapiMedia } from "./strapi";

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  content: BlocksContent;
  featured: boolean;
  image: StrapiMedia;
}

export interface GetBlogPostsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface BlogPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface BlogListingResult {
  posts: BlogPost[];
  pagination: BlogPagination;
}
