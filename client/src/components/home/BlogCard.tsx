import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative h-52">
        <Image
          src={getStrapiMediaUrl(blog.image?.url)}
          alt={blog.image?.alternativeText || blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-500">
          {blog.author} ·{" "}
          {new Date(blog.publishedDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>

        <h3 className="mt-3 text-xl font-semibold text-gray-900">
          {blog.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
