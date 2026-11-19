const Loading = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="h-12 w-2/3 animate-pulse rounded bg-gray-200" />

      <div className="mt-6 h-6 w-1/2 animate-pulse rounded bg-gray-200" />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </main>
  );
};

export default Loading;
