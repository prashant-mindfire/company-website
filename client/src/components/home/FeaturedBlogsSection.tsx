import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface FeaturedBlogsSectionProps {
  blogs: BlogPost[];
}

export default function FeaturedBlogsSection({
  blogs,
}: FeaturedBlogsSectionProps) {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>

          <p className="mt-3 text-gray-600">
            Explore our latest articles and updates.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.documentId} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
