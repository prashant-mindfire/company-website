import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface BlogContentProps {
  content: BlocksContent;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl">
      <BlocksRenderer content={content} />
    </div>
  );
};

export default BlogContent;
