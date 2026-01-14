import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { defaultOpenGraph, jsonLdPerson, jsonLdWebsite, siteConfig } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  openGraph: defaultOpenGraph,
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body>
        <Header />
        <div id="page-content">
          {children}
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLdWebsite(), jsonLdPerson()])
          }}
        />
      </body>
    </html>
  );
}
