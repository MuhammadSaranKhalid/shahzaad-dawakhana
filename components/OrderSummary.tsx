import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currencyFormatter } from "@/lib/helpers"

interface OrderSummaryProps {
  subtotal: number
  shippingCost?: number
  total: number
  children?: React.ReactNode
}

export function OrderSummary({ subtotal, shippingCost, total, children }: OrderSummaryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{currencyFormatter.format(subtotal)}</span>
        </div>
        {shippingCost !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">{shippingCost === 0 ? "Free" : currencyFormatter.format(shippingCost)}</span>
          </div>
        )}
        <Separator className="my-2" />
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span>{currencyFormatter.format(total)}</span>
        </div>
      </CardContent>
      {children && <CardFooter className="pt-0">{children}</CardFooter>}
    </Card>
  )
}
