import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingCheck from "@/components/OnboardingCheck";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyGreenScore - Track Your Carbon Footprint",
  description: "AI-powered carbon footprint tracker to help you live sustainably",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <OnboardingCheck>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </OnboardingCheck>
        </body>
      </html>
    </ClerkProvider>
  );
}
