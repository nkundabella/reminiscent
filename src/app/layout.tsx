import type { Metadata } from "next";
import { Inter, Instrument_Serif, Great_Vibes, Playfair_Display, Lora } from "next/font/google";
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
const playfair = Playfair_Display({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair"
});
const lora = Lora({
  weight: ["400", "600"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-lora"
});

export const metadata: Metadata = {
  title: "Izzy's Singular Aura",
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
        className={`${inter.variable} ${instrument.variable} ${greatVibes.variable} ${playfair.variable} ${lora.variable} font-sans antialiased text-aura-foreground bg-aura-background`}
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
