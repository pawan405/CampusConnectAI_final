import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hackthons App",
  description: "Built locally from Orchids template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
