"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Rubik } from "next/font/google";
import "../globals.css";
import { usePathname } from "next/navigation"; 
import ToasterContext from "../context/ToastContext";

const inter = Rubik({
  subsets: ["latin"],
  weight: "500"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 

  const isDashboard = pathname.includes('dashboard')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          {!isDashboard && <Lines />}

          {!isDashboard && <Header />}
          
          <ToasterContext />
          {children}
          
          {!isDashboard && <Footer />}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
