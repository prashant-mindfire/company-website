export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}