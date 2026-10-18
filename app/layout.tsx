import type { Metadata } from "next";
import { Geist, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";


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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${Inter.variable} h-full antialiased`}
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
      

    <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}