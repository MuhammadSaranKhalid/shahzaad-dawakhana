import type { ReactNode } from "react"
import { Navbar } from "../Navbar"
import { Footer } from "../Footer"
import { FloatingWhatsApp } from "../FloatingWhatsApp"

interface PublicLayoutProps {
  children: ReactNode
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default PublicLayout
export { PublicLayout }
