import Button from "../common/ui/Button";

interface BlogSearchProps {
  search?: string;
}

const BlogSearch = ({ search = "" }: BlogSearchProps) => {
  return (
    <form
      action="/blog"
      method="GET"
      className="mx-auto mb-10 flex max-w-xl gap-3"
    >
      <input
        type="search"
        name="q"
        defaultValue={search}
        placeholder="Search articles..."
        aria-label="Search blog articles"
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white
    dark:placeholder:text-gray-500 dark:focus:ring-blue-900"
      />

      <Button type="submit">Search</Button>
    </form>
  );
};

export default BlogSearch;
