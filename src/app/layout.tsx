import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRContext from "@/context/SWRContext";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full overflow-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white border-b shadow-sm">
            <Navbar />
          </header>
          <main className="w-full min-h-full flex justify-center bg-neutral-50">
            <SWRContext>{children}</SWRContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
