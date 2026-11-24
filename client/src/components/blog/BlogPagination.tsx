import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  pageCount: number;
  search?: string;
}

const BlogPagination = ({
  currentPage,
  pageCount,
  search = "",
}: BlogPaginationProps) => {
  if (pageCount <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (search) {
      params.set("q", search);
    }

    return `/blog?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400">
          Previous
        </span>
      )}

      <span className="text-sm text-slate-600 dark:bg-blue-500">
        Page {currentPage} of {pageCount}
      </span>

      {currentPage < pageCount ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400">
          Next
        </span>
      )}
    </nav>
  );
};

export default BlogPagination;
