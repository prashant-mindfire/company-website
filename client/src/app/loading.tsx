import Container from "@/components/common/ui/Container";

export default function Loading() {
  return (
    <Container size="xl">
      <div className="animate-pulse py-16">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <div className="mx-auto h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto h-5 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mx-auto h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
