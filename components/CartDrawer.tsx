"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store"
import { currencyFormatter } from "@/lib/helpers"
import Image from "next/image"
import Link from "next/link"
import { QuantityStepper } from "./QuantityStepper"
import { Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cartItems = useCartStore((state) => state.items)
  const updateQty = useCartStore((state) => state.updateQty)
  const removeItem = useCartStore((state) => state.remove)
  const subtotal = useCartStore((state) => state.totalPrice())
  const router = useRouter()

  const shippingCost = cartItems.length > 0 ? 5.0 : 0 // Flat rate shipping
  const total = subtotal + shippingCost

  const handleUpdateQuantity = (id: string, newQty: number) => {
    updateQty(id, newQty)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const handleCheckout = () => {
    onClose() // Close the drawer
    router.push("/checkout")
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto pr-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image_url || "/placeholder.svg"} // Changed from imageUrl to image_url
                    alt={item.name}
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <Link href={`/products/${item.slug}`} className="font-medium hover:underline" onClick={onClose}>
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{currencyFormatter.format(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <QuantityStepper
                        initialQuantity={item.qty}
                        onQuantityChange={(newQty) => handleUpdateQuantity(item.id, newQty)}
                        maxQuantity={item.stock_qty} // Changed from stockQty to stock_qty
                        minQuantity={1}
                        id={`drawer-qty-${item.id}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="mt-auto pt-4 border-t">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{currencyFormatter.format(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shippingCost === 0 ? "Free" : currencyFormatter.format(shippingCost)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>{currencyFormatter.format(total)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </Button>
            <Button className="w-full bg-transparent" variant="outline" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
