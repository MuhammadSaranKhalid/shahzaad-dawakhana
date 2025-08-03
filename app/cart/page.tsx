"use client"

import { useCartStore } from "@/lib/store"
import { currencyFormatter } from "@/lib/helpers"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { QuantityStepper } from "@/components/QuantityStepper"
import { Trash2 } from "lucide-react"
import { OrderSummary } from "@/components/OrderSummary"
import { useRouter } from "next/navigation"
import { PublicLayout } from "@/components/layout/PublicLayout"

export default function CartPage() {
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
    router.push("/checkout")
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] sr-only md:not-sr-only">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px] sr-only">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="hidden md:table-cell">
                          <Image
                            src={item.image_url || "/placeholder.svg"} // Changed from imageUrl to image_url
                            alt={item.name}
                            width={64}
                            height={64}
                            className="aspect-square rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/products/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">
                          <QuantityStepper
                            initialQuantity={item.qty}
                            onQuantityChange={(newQty) => handleUpdateQuantity(item.id, newQty)}
                            maxQuantity={item.stock_qty} // Changed from stockQty to stock_qty
                            minQuantity={1}
                            id={`qty-stepper-${item.id}`}
                          />
                        </TableCell>
                        <TableCell className="text-right">{currencyFormatter.format(item.price)}</TableCell>
                        <TableCell className="text-right">{currencyFormatter.format(item.price * item.qty)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} shippingCost={shippingCost} total={total}>
                <Button className="w-full" size="lg" onClick={handleCheckout} aria-label="Proceed to checkout">
                  Proceed to Checkout
                </Button>
              </OrderSummary>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
