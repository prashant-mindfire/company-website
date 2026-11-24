import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/services/blog.service";
import { getStrapiMediaUrl } from "@/lib/utils";
import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/common/ui/Container";
import Section from "@/components/common/ui/Section";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

// Pre-generate known blog posts at build time.
export async function generateStaticParams() {
  return getAllBlogSlugs();
}

// Generate SEO metadata for each blog post.
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | TechNova Solutions",
    };
  }

  const imageUrl = post.image?.url
    ? getStrapiMediaUrl(post.image.url)
    : undefined;

  return {
    title: `${post.title} | TechNova Solutions`,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const BlogDetail = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <main>
      <Section>
        <Container size="lg">
          <Link
            href="/blog"
            className="mb-8 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Blog
          </Link>

          <article>
            <header className="mb-10">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{post.author}</span>

                <span aria-hidden="true">•</span>

                <time dateTime={post.publishedDate}>{publishedDate}</time>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {post.excerpt}
              </p>
            </header>

            {post.image?.url && (
              <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={getStrapiMediaUrl(post.image.url)}
                  alt={post.image.alternativeText || post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            )}

            <BlogContent content={post.content} />
          </article>
        </Container>
      </Section>
    </main>
  );
};

export default BlogDetail;
