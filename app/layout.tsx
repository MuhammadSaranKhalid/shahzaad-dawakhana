import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { RefineConfig } from "@/refine-config" // Import RefineConfig

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PharmaStore - Your Health, Delivered",
  description: "Your trusted online pharmacy for all your medicine needs. Fast, reliable, and affordable.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RefineConfig>
            {children}
            <Toaster />
          </RefineConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}
