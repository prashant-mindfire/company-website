import Container from "@/components/common/ui/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center py-20">
      <Container size="md">
        <div className="text-center">
          <p className="text-7xl font-bold tracking-tight text-blue-600">404</p>

          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Page not found
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist or may have
            been moved.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3
              font-medium text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
