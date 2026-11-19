import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getSiteSettings } from "@/services/site.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechNova Solutions",
  description: "Innovative technology solutions for businesses",
};

const RootLayout = async ({ children }: LayoutProps<"/">) => {
  const settings = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer
          companyName={settings.companyName}
          footerText={settings.footerText}
        />
      </body>
    </html>
  );
};

export default RootLayout;
