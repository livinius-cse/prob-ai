import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgeAI | Engineering problem discovery",
  description: "From real-world problems to engineering solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
