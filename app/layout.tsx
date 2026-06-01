import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "OutsideView",
  description: "Get perspectives beyond your own world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}