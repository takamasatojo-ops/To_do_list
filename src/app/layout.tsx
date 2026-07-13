import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css"
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "To do list",
  description:"タスク管理アプリ"
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="ja">
        <body>
          <Header />
          <main style={{ background: "#F1F3F7", width: "100%", height: "100vh" }} >{children}</main>
        </body>
      </html>
    </>
  );
}


