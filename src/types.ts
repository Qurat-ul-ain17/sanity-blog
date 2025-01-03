// src/types.ts
export interface Post {
    _id: string;
    title: string;
    body?: string;
    excerpt?: string;
    slug: {
      current: string;
    };
    mainImage?: {
      asset?: {
        url: string;
      };
    };
    publishedAt: string;
  }
  