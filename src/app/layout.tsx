import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";

import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";

// ----- Font -----
const inter = Inter({
  subsets: ["latin"], // Only load required glyphs
  variable: "--font-inter", // Custom CSS variable
  display: "swap", // Avoid FOIT (Flash of Invisible Text)
});
// ----- Metadata -----
export const metadata: Metadata = {
  title: "Reza Zare – Frontend Developer",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};
// ----- Viewport -----
export const viewport: Viewport = {
  themeColor: "#01a4eb",
};
// ----- Layout -----
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} h-dvh bg-gray-950 p-2`}
      lang="en"
      dir="ltr"
    >
      <body
        className="custom-scroll relative mx-auto  
       overflow-y-auto overflow-x-clip rounded-xl bg-gray-900 px-2"
      >
        <NextTopLoader
          color="#01a4eb"
          shadow="0 0 10px #54bfe4"
          speed={300}
          height={4}
        />
        <Header />
        <main className="relative mx-auto mb-2 flex max-w-[1440px] flex-col items-center overflow-x-clip ">
          <Image
            src="/images/flat/gray-950-header-template.svg"
            className="relative -top-[18px]  min-h-[95px] w-[97%]"
            alt="gray-950-header-template-bg"
            width={1440}
            height={95}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
