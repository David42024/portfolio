import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "David Lucano | Backend Developer",
    template: "%s | David Lucano",
  },
  description:
    "Backend Developer especializado en Node.js, PostgreSQL y arquitecturas escalables. Portfolio de proyectos y experiencia profesional.",
  keywords: [
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "API REST",
  ],
  authors: [{ name: "David Lucano" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tuportfolio.com",
    siteName: "David Lucano | Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen flex flex-col bg-background text-foreground">
            {/* Fondo con textura sutil */}
            <div className="fixed inset-0 bg-noise opacity-[0.02] pointer-events-none z-0" />
            
            {/* Grid decorativo */}
            <div className="fixed inset-0 bg-grid opacity-[0.03] pointer-events-none z-0" />

            <Header />
            
            <main className="flex-1 relative z-10">
              {children}
            </main>
            
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}