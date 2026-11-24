import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-52 w-full shrink-0">
        <Image
          src={getStrapiMediaUrl(blog.image?.url)}
          alt={blog.image?.alternativeText || blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {blog.author} ·{" "}
          {new Date(blog.publishedDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>

        <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
          {blog.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {blog.excerpt}
        </p>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-auto pt-5 inline-block self-start font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
