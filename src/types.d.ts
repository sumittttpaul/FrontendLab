import type { UrlObject } from "url";

// Global types shared across the website
declare global {
  type Href = UrlObject | __next_route_internal_types__.RouteImpl<string> | any;

  type ClickHandler = () => void;

  type Article = {
    id: string;
    title: string;
    slug: string;
    publishedAt: string;
    readTime: string;
    sourceLink: string;
    keywords: string[];
    content: {
      type: "heading" | "description" | "code" | "video" | "separator" | "spacing";
      value: string;
      path?: string;
      thumbnail?: string;
    }[];
  };
}

// Required to ensure TypeScript treats this file as a module
export = {};
