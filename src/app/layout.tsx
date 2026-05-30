import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ViewTransitions } from "next-view-transitions";
import Cursor from "@/components/custom/Cursor";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400", // Bebas Neue only has one weight
});


export const metadata: Metadata = {
  title: "Pragyan Thapaliya - Developer",
  description: "Pragyan Thapaliya is a passionate developer with expertise in web development, software engineering, and technology. With a strong background in programming languages and frameworks, Pragyan is dedicated to creating innovative solutions and contributing to the tech community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <ViewTransitions>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar/>
            {children}
            <Footer/>

          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}