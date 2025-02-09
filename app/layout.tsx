import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppoloWrapper from "@/providers/AppoloWrapper";
import NextAuthWrapper from "@/providers/NextAuthWrapper";
import ToastProvider from "@/providers/ToastProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Bloghub - Your Ultimate Blogging Platform",
  description:
    "Bloghub is a feature-rich application designed for writers and readers. Create, edit, and discover blogs that inspire. Connect with a community that loves to share ideas.",
  keywords:
    "Bloghub, Blogging, Create Blogs, Discover Blogs, Write Blogs, Blogging Platform, Blog Community",
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` relative h-screen flex flex-col ${poppins.className}`}>
        <NextAuthWrapper>
          <AppoloWrapper>
            <ToastProvider>
              <Header />
              <div className="flex-1 overflow-auto">{children}</div>
              <Footer />
            </ToastProvider>
          </AppoloWrapper>
        </NextAuthWrapper>
      </body>
    </html>
  );
}
