interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      {description && (
        <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
