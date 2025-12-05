// components/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }: any) {
  const router = useRouter();
  const noHeaderFooterRoutes = ["/login", "/signup"]; // Add other routes if needed

  const showHeaderFooter = !noHeaderFooterRoutes.includes(router.pathname);

  return (
    <div>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </div>
  );
}
