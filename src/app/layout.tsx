import type { Metadata } from "next";
import { Inter, Host_Grotesk } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import Providers from "@/providers/session-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileHeader from "@/components/layout/MobileHeader";

const inter = Inter({ subsets: ["latin"] });
const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduAssess - Digital Assessment Platform",
  description:
    "AI-powered skills and knowledge assessment platform, designed for educational institutions and organizations worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} ${hostGrotesk.className}`}>
        <Providers>
          <QueryProvider>
            <div className="bg-gray-50 min-h-screen flex flex-col">
              
              {children}
            </div>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
