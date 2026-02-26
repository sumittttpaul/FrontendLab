import { Point, PointContainer } from "@/designs/elements/articles/point";
import { Description } from "@/designs/elements/articles/description";
import { Separator } from "@/designs/elements/articles/separator";
import { MoreArticles } from "@/designs/components/more-articles";
import { CodePreview } from "@/designs/components/code-preview";
import { VideoPlayer } from "@/designs/components/video-player";
import { Heading } from "@/designs/elements/articles/heading";
import { Keyword } from "@/designs/elements/articles/keyword";
import { Spacing } from "@/designs/elements/articles/spacing";
import { Wrapper } from "@/designs/elements/articles/wrapper";
import { Title } from "@/designs/elements/articles/title";
import { getArticle, getAllSlugs } from "@/libs/article";
import { Info } from "@/designs/elements/articles/info";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ article_slug: string }> }) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);

  if (!article)
    return {
      title: "Page Not Found • Frontend Lab",
      description: "The requested article could not be found.",
      robots: { index: false, follow: true },
    };

  const title = `${article.title} • Frontend Lab`;
  const description = article.content.find((content) => content.type === "description")?.value ?? "Read this article on Frontend Lab.";
  const banner = article.banner;
  const keywords = article.keywords ?? [];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Frontend Lab" }],
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: "Frontend Lab",
      authors: ["Frontend Lab"],
      publishedTime: article.publishedAt,
      title,
      description,
      images: banner ? [{ width: 1200, height: 630, alt: title, url: banner }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: banner ? [banner] : [],
    },
    other: {
      "article:published_time": article.publishedAt,
      "twitter:label1": "Reading time",
      "twitter:data1": article.readTime || "5 min read",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ article_slug: string }> }) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);

  if (!article) return notFound();

  return (
    <main className="mx-auto flex size-full max-w-300 flex-col gap-13 max-[56rem]:gap-9 max-[56rem]:py-9 md:py-23">
      <Wrapper>
        <Title>{article.title}</Title>
        <Info PublishedAt={article.publishedAt} ReadTime={article.readTime} SourceLink={article.sourceLink} />
        {article.content.map((content, index) => {
          switch (content.type) {
            case "heading":
              return <Heading key={index}>{content.value}</Heading>;
            case "description":
              return <Description key={index}>{content.value}</Description>;
            case "code":
              if (!content.path) return null;
              return <CodePreview key={index} path={content.path} code={content.value as string} />;
            case "video":
              if (!content.thumbnail) return null;
              return <VideoPlayer key={index} src={content.value as string} thumbnail={content.thumbnail} />;
            case "separator":
              return <Separator key={index} />;
            case "spacing":
              return <Spacing key={index} />;
            case "point":
              return (
                <PointContainer key={index}>
                  {(content.value as string[]).map((point, index) => (
                    <Point key={index}>{point}</Point>
                  ))}
                </PointContainer>
              );
            default:
              return null;
          }
        })}
        <Keyword>{article.keywords.join(", ")}</Keyword>
      </Wrapper>
      <MoreArticles slug={article_slug} />
    </main>
  );
}
