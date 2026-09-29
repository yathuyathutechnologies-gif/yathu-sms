import React from "react";
import type { Metadata } from "next";
import { Geist, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/ui/theme-provider";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    default: "Yathu SMS",
    template: "%s | Yathu SMS",
  },
  icons: {
    icon: '/icon.svg'
  },
  description:
    "Manage SMS campaigns, contacts, delivery, and workspace preferences.",
  applicationName: "Yathu SMS",
  robots: { index: false, follow: false },
};
const Inter = localFont({
  src: "../public/font/Inter-VariableFont.ttf",
  variable: "--font-inter",
  display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${Inter.variable}`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
          {children}
          {/* <Toaster />
        </ThemeProvider> */}
      </body>
    </html>
  );
}