import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientOnly from "@/components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KidoKulture",
  description: "Explore, learn, grow and have fun!",
  manifest: "/manifest.json",
  icons: {
    icon: "https://res.cloudinary.com/dvgv5h1u1/image/upload/v1775139446/kklogo_cwnhlq.png",
    shortcut: "https://res.cloudinary.com/dvgv5h1u1/image/upload/v1775139446/kklogo_cwnhlq.png",
    apple: "https://res.cloudinary.com/dvgv5h1u1/image/upload/v1775139446/kklogo_cwnhlq.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#fb923c" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ClientOnly />
      </body>
    </html>
  );
}
