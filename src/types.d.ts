import type { UrlObject } from "url";

// Global types shared across the website
declare global {
  type Href = UrlObject | __next_route_internal_types__.RouteImpl<string> | any;

  type ClickHandler = () => void;
}

// Required to ensure TypeScript treats this file as a module
export = {};
