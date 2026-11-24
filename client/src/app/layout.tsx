import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getSiteSettings } from "@/services/site.service";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProviders";

export const metadata: Metadata = {
  title: {
    default: "TechNova Solutions | Digital Transformation",
    template: "%s | TechNova Solutions",
  },
  description:
    "TechNova Solutions helps businesses grow through innovative technology, modern software solutions, and exceptional digital experiences.",
  applicationName: "TechNova Solutions",
  openGraph: {
    type: "website",
    siteName: "TechNova Solutions",
    title: "TechNova Solutions | Digital Transformation",
    description:
      "Innovative technology and software solutions for growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechNova Solutions",
    description:
      "Innovative technology and software solutions for growing businesses.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer
              companyName={settings.companyName}
              footerText={settings.footerText}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
