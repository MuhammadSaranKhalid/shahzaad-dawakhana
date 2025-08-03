"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderSummary } from "@/components/OrderSummary"
import { useCartStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { currencyFormatter } from "@/lib/helpers" // Corrected import path
import Image from "next/image"
import Link from "next/link"
import { supabaseClient } from "@/lib/supabaseClient"
import { PublicLayout } from "@/components/layout/PublicLayout"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  address1: z.string().min(5, "Address is required."),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  zip: z.string().min(5, "Zip code is required.").max(10, "Invalid zip code."),
  country: z.string().min(2, "Country is required."),
  // Mock credit card fields
  cardNumber: z.string().min(16, "Card number must be 16 digits.").max(16, "Card number must be 16 digits."),
  cardName: z.string().min(2, "Name on card is required."),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)."),
  cardCVC: z.string().min(3, "CVC must be 3 or 4 digits.").max(4, "CVC must be 3 or 4 digits."),
})

type CheckoutFormValues = z.infer<typeof formSchema>

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.totalPrice())
  const clearCart = useCartStore((state) => state.clear)
  const router = useRouter()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shippingCost = cartItems.length > 0 ? 5.0 : 0 // Flat rate shipping
  const total = subtotal + shippingCost

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCVC: "",
    },
  })

  async function onSubmit(values: CheckoutFormValues) {
    try {
      // 1. Create the order in Supabase
      const { data: orderData, error: orderError } = await supabaseClient
        .from("orders")
        .insert({
          customer_email: values.email, // Reverted to customer_email
          total_amount: total,
          status: "Pending", // Initial status
          shipping_address: `${values.address1}, ${values.address2 ? values.address2 + ", " : ""}${values.city}, ${values.state} ${values.zip}, ${values.country}`,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // 2. Add order items
      const orderItems = cartItems.map((item) => ({
        order_id: orderData.id,
        medicine_id: item.id,
        quantity: item.qty,
        price_at_purchase: item.price,
      }))

      const { error: orderItemsError } = await supabaseClient.from("order_items").insert(orderItems)

      if (orderItemsError) throw orderItemsError

      // 3. Update product stock (optional, but good practice)
      // This would ideally be a transaction or a server action to prevent race conditions
      for (const item of cartItems) {
        const { data: productData, error: productFetchError } = await supabaseClient
          .from("medicines")
          .select("stock_qty")
          .eq("id", item.id)
          .single()

        if (productFetchError) throw productFetchError

        const newStockQty = productData.stock_qty - item.qty
        const { error: stockUpdateError } = await supabaseClient
          .from("medicines")
          .update({ stock_qty: newStockQty })
          .eq("id", item.id)

        if (stockUpdateError) throw stockUpdateError
      }

      setOrderPlaced(true)
      clearCart() // Clear cart after successful order
    } catch (error: any) {
      console.error("Order submission failed:", error.message)
      alert(`Order failed: ${error.message}`) // Simple alert for demo
    }
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Your cart is empty. Please add items before checking out.
          </p>
          <Button asChild>
            <Link href="/products">Go to Products</Link>
          </Button>
        </div>
      </PublicLayout>
    )
  }

  if (orderPlaced) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <CheckCircle2 className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order will be processed shortly.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Checkout</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing & Shipping Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apartment, suite, unit, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl>
                          <Input placeholder="CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip / Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="**** **** **** ****" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date (MM/YY)</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardCVC"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Place Order Button */}
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} shippingCost={shippingCost} total={total}>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={form.formState.isSubmitting || cartItems.length === 0}
                  aria-label="Place order"
                >
                  {form.formState.isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </OrderSummary>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Review Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.image_url || "/placeholder.svg?height=40&width=40"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                          placeholder={item.blurhash ? "blur" : "empty"}
                          blurDataURL={item.blurhash || undefined}
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">{currencyFormatter.format(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">
                    By placing your order, you agree to our terms and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </PublicLayout>
  )
}
