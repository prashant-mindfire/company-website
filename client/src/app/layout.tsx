import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getSiteSettings } from "@/services/site.service";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProviders";
import { getStrapiMediaUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const siteName = siteSettings?.companyName || "TechNova Solutions";
  const logoUrl = siteSettings?.logo?.url
    ? getStrapiMediaUrl(siteSettings.logo.url)
    : undefined;

  return {
    title: {
      default: `${siteName} | Digital Transformation`,
      template: `%s | ${siteName}`,
    },
    description:
      "TechNova Solutions helps businesses grow through innovative technology, modern software solutions, and exceptional digital experiences.",
    applicationName: siteName,
    ...(logoUrl && {
      icons: {
        icon: logoUrl,
        shortcut: logoUrl,
        apple: logoUrl,
      },
    }),
    openGraph: {
      type: "website",
      siteName,
      title: `${siteName} | Digital Transformation`,
      description:
        "Innovative technology and software solutions for growing businesses.",
      ...(logoUrl && { images: [logoUrl] }),
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description:
        "Innovative technology and software solutions for growing businesses.",
      ...(logoUrl && { images: [logoUrl] }),
    },
  };
}

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
            <Header
              logoUrl={getStrapiMediaUrl(settings?.logo?.url)}
              siteName={settings.companyName}
            />
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
