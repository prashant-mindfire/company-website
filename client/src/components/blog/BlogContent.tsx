import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface BlogContentProps {
  content: BlocksContent;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div
      className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl dark:prose-invert
    dark:prose-headings:text-white
    dark:prose-p:text-gray-300
    dark:prose-a:text-blue-400
    dark:prose-strong:text-white
    dark:prose-li:text-gray-300"
    >
      <BlocksRenderer content={content} />
    </div>
  );
};

export default BlogContent;
