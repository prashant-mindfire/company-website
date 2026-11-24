"use client";

import Button from "@/components/common/ui/Button";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            An unexpected application error occurred. Please try again.
          </p>

          <Button
            type="button"
            onClick={reset}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3
              font-medium text-white hover:bg-blue-700"
          >
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
