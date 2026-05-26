import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tutrquiz · learn the Cognition stack",
  description:
    "A short quiz on the Cognition (tutr) tech stack — Next 15, MCP, Clerk, Supabase, and the technical choices worth pitching.",
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
