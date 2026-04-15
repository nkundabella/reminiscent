import type { Metadata } from "next";
import { Inter, Instrument_Serif, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument"
});
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes"
});

export const metadata: Metadata = {
  title: "The Essence of Izzy",
  description: "A personal editorial archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrument.variable} ${greatVibes.variable} font-sans antialiased text-essence-foreground bg-essence-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="noise-overlay pointer-events-none fixed inset-0 z-50 h-full w-full opacity-40 mix-blend-overlay"></div>
          <CustomCursor />
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
