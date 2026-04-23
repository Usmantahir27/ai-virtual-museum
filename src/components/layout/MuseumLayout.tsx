"use client";

import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import { TransparencyProvider } from "@/lib/TransparencyContext";

interface MuseumLayoutProps {
  children: React.ReactNode;
}

export default function MuseumLayout({ children }: MuseumLayoutProps) {
  return (
    <TransparencyProvider>
      <div className="noise-overlay flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </TransparencyProvider>
  );
}
