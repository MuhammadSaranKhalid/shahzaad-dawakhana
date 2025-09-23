import type React from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { CartDrawer } from "@/components/CartDrawer"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  )
}

export default PublicLayout
