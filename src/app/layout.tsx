import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maxime LAUNOY — Portfolio Terminal",
  description: "Portfolio interactif sous forme de terminal. Ingenieur INSA, cybersecurity & fullstack developer.",
  keywords: ["portfolio", "cybersecurity", "fullstack", "developer", "terminal", "Maxime LAUNOY"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
