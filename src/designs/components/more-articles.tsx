import { ArrowRight02Icon, TimeQuarter02Icon } from "@hugeicons/core-free-icons";
import { getLatestArticles } from "@/libs/article";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export function MoreArticles({ slug }: { slug: string }) {
  const articles = getLatestArticles({ max: 4, slug });

  if (articles.length > 0)
    return (
      <div className="flex size-full flex-col gap-8 p-8 max-[56rem]:p-4">
        <h4 className="flex w-full scroll-mt-19.5 items-center gap-2 truncate text-xs text-[1.2rem] leading-6 font-bold select-none max-[56rem]:px-4 sm:text-[1.3rem] sm:leading-7 md:scroll-mt-21 md:gap-4 md:text-[1.4rem] md:leading-8 [&:has(+_p)]:-mb-4 md:[&:has(+_p)]:-mb-8 [@media(width_>=_56rem)]:text-[1.8rem] [@media(width_>=_56rem)]:leading-9">
          More Cases
          <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} size={28} className="size-7 max-[56rem]:size-5.5" />
        </h4>
        <div className="-mx-4 grid grid-cols-2 gap-4 max-[56rem]:mx-0 max-[56rem]:grid-cols-1 max-[56rem]:gap-0">
          {articles.map((article) => (
            <Link key={article.slug} href={article.slug} className="hover:bg-input-2 flex flex-col gap-4 rounded-lg p-4 max-[56rem]:rounded-none">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2 truncate text-xs select-none md:text-sm">
                  <HugeiconsIcon width={20} height={20} strokeWidth={1.5} icon={TimeQuarter02Icon} className="size-4 md:size-5" />
                  {article.readTime} read
                </span>
                <span className="text-muted-foreground truncate text-xs select-none md:text-sm">{article.publishedAt}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[0.9rem] font-semibold md:text-xl">{article.title}</h4>
                <p className="text-muted-foreground line-clamp-5 w-full text-xs md:text-sm">
                  {article.content.find((content) => content.type === "description")?.value}
                </p>
              </div>
              <div className="flex items-center gap-2.5 max-[20rem]:flex-col max-[20rem]:gap-1 md:gap-3">
                <div className="flex items-center gap-2">
                  <Image src="/sumit-paul.jpg" alt="Avatar" width={22} height={22} className="size-4.5 rounded-full md:size-5.5" />
                  <p className="text-xs select-none md:text-sm">Sumeet Kumar Paul</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );

  return null;
}
