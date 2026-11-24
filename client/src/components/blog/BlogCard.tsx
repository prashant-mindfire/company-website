import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import Card from "../common/ui/Card";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishedDate = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <Card
      padding="none"
      hoverable
      className="flex h-full flex-col overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-52 w-full shrink-0 bg-slate-100">
          <Image
            src={getStrapiMediaUrl(post.image?.url)}
            alt={post.image?.alternativeText || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.publishedDate}>{publishedDate}</time>
          </div>

          {post.featured && (
            <span className="mb-3 inline-block self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              Featured
            </span>
          )}

          <h2 className="text-xl font-semibold text-slate-900 transition hover:text-blue-600">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
            {post.excerpt}
          </p>

          <span className="mt-auto pt-5 inline-block self-start text-sm font-semibold text-blue-600">
            Read article →
          </span>
        </div>
      </Link>
    </Card>
  );
}
