import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Little Warrior Wishes",
  description: "Supporting little warriors and their families.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#47549e] text-gray-900">
        {/* Header at top (sticky inside its own component) */}
        <Header />

        {/* Main content grows to fill remaining space */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer stays at the bottom of the viewport when content is short */}
        <Footer />
      </body>
    </html>
  );
}
