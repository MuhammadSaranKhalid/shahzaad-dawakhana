"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ShoppingCart } from "lucide-react"
import type { Medicine } from "@/data/products"

interface AddToCartButtonProps {
  product: Medicine
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Button size="sm" onClick={handleAddToCart} disabled={!product.inStock} className="flex items-center gap-2">
      <ShoppingCart className="h-4 w-4" />
      {product.inStock ? "Add to Cart" : "Out of Stock"}
    </Button>
  )
}
