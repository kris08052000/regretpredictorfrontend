"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { usePathname } from 'next/navigation';
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePageLoginSignup = (pathname === "/") || (pathname === "/login") ||(pathname === "/signup") ;
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {!isHomePageLoginSignup && <Header/>}
        <main className="p-6 mx-auto">{children}</main>
        {!isHomePageLoginSignup && <Footer/>}
      </body>
    </html>
  );
}