"use client"; 

import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/navbar/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const excludeNavFooter = pathname === "/auth/login" || pathname === "/auth/register";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {!excludeNavFooter}
          <main style={{ minHeight: "100vh" }}>{children}</main>
          {!excludeNavFooter && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
