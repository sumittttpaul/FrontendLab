import { Description } from "@/designs/elements/articles/description";
import { Separator } from "@/designs/elements/articles/separator";
import { CodePreview } from "@/designs/components/code-preview";
import { VideoPlayer } from "@/designs/components/video-player";
import { Heading } from "@/designs/elements/articles/heading";
import { Keyword } from "@/designs/elements/articles/keyword";
import { Spacing } from "@/designs/elements/articles/spacing";
import { Title } from "@/designs/elements/articles/title";
import { getArticle, getAllSlugs } from "@/libs/article";
import { Info } from "@/designs/elements/articles/info";
import { Page } from "@/designs/elements/articles/page";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ article_slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: Props) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);
  return { title: article?.title + " • Frontend Lab" || "Page Not Found • Frontend Lab" };
}

export default async function ArticlePage({ params }: Props) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);

  if (!article) return notFound();

  return (
    <Page>
      <Title>{article.title}</Title>
      <Info PublishedAt={article.publishedAt} ReadTime={article.readTime} SourceLink={article.slug} />
      {article.content.map((content, index) => {
        switch (content.type) {
          case "heading":
            return <Heading key={index}>{content.value}</Heading>;
          case "description":
            return <Description key={index}>{content.value}</Description>;
          case "code":
            if (!content.path) return null;
            return <CodePreview key={index} path={content.path} code={content.value} />;
          case "video":
            if (!content.thumbnail) return null;
            return <VideoPlayer key={index} src={content.value} thumbnail={content.thumbnail} />;
          case "separator":
            return <Separator key={index} />;
          case "spacing":
            return <Spacing key={index} />;
          default:
            return null;
        }
      })}
      <Keyword>{article.keywords.join(", ")}</Keyword>
    </Page>
  );
}
