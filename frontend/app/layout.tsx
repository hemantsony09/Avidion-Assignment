import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Campaign Manager - Avidion',
  description: 'Manage your marketing campaigns with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

