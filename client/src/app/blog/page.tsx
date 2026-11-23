import type { Metadata } from "next";
import { getBlogPosts } from "@/services/blog.service";
import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogPagination from "@/components/blog/BlogPagination";
import Section from "@/components/common/ui/Section";
import Container from "@/components/common/ui/Container";
import EmptyState from "@/components/common/ui/EmptyState";
import PageHero from "@/components/common/ui/PageHero";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | TechNova Solutions",
  description:
    "Explore technology insights, development tutorials, cloud computing, and industry updates from TechNova Solutions.",
};

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const search = params.q?.trim() ?? "";

  const requestedPage = Number(params.page ?? 1);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const pageSize = 6;

  const result = await getBlogPosts({
    page,
    pageSize,
    search,
  });

  const { posts, pagination } = result;

  return (
    <main>
      <PageHero
        eyebrow="Our Blog"
        title="Insights & Ideas"
        description="Discover the latest insights, technology trends, and practical knowledge from our team."
      />

      <Section>
        <Container>
          <BlogSearch search={search} />

          {posts.length === 0 ? (
            <EmptyState
              title="No articles found"
              description={
                search
                  ? `We couldn't find any articles matching "${search}". Try another search term.`
                  : "There are no published articles available right now."
              }
            />
          ) : (
            <>
              {search && (
                <p className="mb-6 text-sm text-slate-600">
                  Showing results for <strong>{search}</strong>
                </p>
              )}

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.documentId} post={post} />
                ))}
              </div>

              <BlogPagination
                currentPage={pagination.page}
                pageCount={pagination.pageCount}
                search={search}
              />
            </>
          )}
        </Container>
      </Section>
    </main>
  );
}
