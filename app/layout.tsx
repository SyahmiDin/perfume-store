// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import FloatingCartIcon from "../components/FloatingCartIcon"; // 1. Tambah baris import ini

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katalog Perfume Mewah",
  description: "Beli perfume eksklusif secara online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <FloatingCartIcon /> {/* 2. Letak ikon di bawah children */}
        </CartProvider>
      </body>
    </html>
  );
}