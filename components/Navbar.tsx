"use client"

import Link from "next/link"
import { Package2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import { useState } from "react"
import { CartDrawer } from "./CartDrawer"

export function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems())
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="Home">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-lg">Shahzad Dawakhana</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="text-muted-foreground hover:text-primary">
            Products
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </header>
  )
}
