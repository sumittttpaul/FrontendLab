import "server-only";

import articlesData from "@/content/articles.json";
import { slugify } from "@/libs/helpers";

const formattedArticles: Article[] = (articlesData as Omit<Article, "slug">[]).map((article) => ({
  ...article,
  slug: slugify(article.title),
}));

const articleMap = new Map<string, Article>(formattedArticles.map((article) => [article.slug, article] as [string, Article]));

export const getArticle = (slug: string): Article | undefined => articleMap.get(slug);

export const getAllSlugs = () => formattedArticles.map((article) => ({ slug: article.slug }));
