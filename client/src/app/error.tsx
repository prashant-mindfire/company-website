"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Something went wrong!
      </h2>

      <p className="mt-3 text-gray-600">
        We couldn&apos;t load the page content. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
