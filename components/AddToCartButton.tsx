"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image_url?: string
    stock_qty: number
  }
  quantity?: number
  disabled?: boolean
  className?: string
}

export function AddToCartButton({ product, quantity = 1, disabled = false, className = "" }: AddToCartButtonProps) {
  const addProduct = useCartStore((state) => state.add)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addProduct(product, quantity)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} disabled={disabled} className={className}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  )
}
