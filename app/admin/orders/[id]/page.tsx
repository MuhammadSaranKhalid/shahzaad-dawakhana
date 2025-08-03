"use client"

import { useOne } from "@refinedev/core"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currencyFormatter } from "@/lib/helpers"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  customer_email: string // Changed to customer_email
  total_amount: number
  status: string
  shipping_address: string
  created_at: string
  order_items: OrderItem[] // Assuming you can fetch related order items
}

interface OrderItem {
  id: string
  medicine_id: string
  quantity: number
  price_at_purchase: number
  // You might want to fetch medicine details here too
  medicines: {
    name: string
    image_url: string
  } | null // Supabase join will put medicine details here
}

interface AdminOrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function AdminOrderDetailsPage({ params }: AdminOrderDetailsPageProps) {
  const { data, isLoading, isError } = useOne<Order>({
    resource: "orders",
    id: params.id,
    // Select related order_items and their medicine details
    meta: {
      select: "*, order_items(*, medicines(name, image_url))",
    },
  })

  const order = data?.data

  if (isLoading) {
    return <div className="text-center py-8">Loading order details...</div>
  }

  if (isError || !order) {
    notFound()
  }

  // Calculate subtotal from order items
  const subtotal = order.order_items.reduce((sum, item) => sum + item.quantity * item.price_at_purchase, 0)
  const shippingCost = 5.0 // Flat rate shipping

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Details: {order.id}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.medicines?.name || "Deleted Product"}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {currencyFormatter.format(item.price_at_purchase)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {currencyFormatter.format(item.quantity * item.price_at_purchase)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal:</span>
              <span>{currencyFormatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Shipping:</span>
              <span>{currencyFormatter.format(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total:</span>
              <span>{currencyFormatter.format(order.total_amount)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    order.status === "Pending" ? "secondary" : order.status === "Shipped" ? "default" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer & Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Customer Email:</strong> {order.customer_email} {/* Changed to customer_email */}
              </p>
              <p>
                <strong>Shipping Address:</strong>
              </p>
              <p className="ml-4">{order.shipping_address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
