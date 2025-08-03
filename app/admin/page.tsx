"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminOrders, getAdminProducts } from "@/lib/admin-data"
import { Box, ShoppingBag, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const products = getAdminProducts()
  const orders = getAdminOrders()

  const totalProducts = products.length
  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === "Pending").length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Box className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">Number of items in your catalog</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">{pendingOrders} pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue (Mock)</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Simulated revenue from all orders</p>
        </CardContent>
      </Card>
      {/* Add more dashboard cards or charts here */}
    </div>
  )
}
