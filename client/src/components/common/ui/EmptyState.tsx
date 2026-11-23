interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

      {description && (
        <p className="mt-3 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
