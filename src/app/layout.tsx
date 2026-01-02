import type { Metadata } from "next";
import "./globals.css";
import { Header, Nav } from "@/components/shared-ui";

export const metadata: Metadata = {
  title: "Wander Voyager",
  description: "Wander Voyager - Travel Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header>
          <Nav />
        </Header>
        {children}
      </body>
    </html>
  );
}
