import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Communication Attendance SaaS",
  description: "A clear view of your team's time, attendance, and daily activity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
