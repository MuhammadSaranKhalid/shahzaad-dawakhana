"use client"

import { OrderTable } from "@/components/admin/OrderTable"
import { useList } from "@refinedev/core"
import { Suspense } from "react"

interface Order {
  id: string
  customer_email: string // Changed to customer_email
  total_amount: number
  status: string
  created_at: string
  shipping_address: string
  // Add other fields as per your Supabase 'orders' table
}

export default function AdminOrdersPage() {
  const { data, isLoading, isError } = useList<Order>({
    resource: "orders",
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  })

  const orders = data?.data || []

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  if (isError) {
    return <div className="text-center py-8 text-destructive">Error loading orders.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>
      <Suspense fallback={<div className="text-center py-8">Loading orders...</div>}>
      <OrderTable orders={orders} />
      </Suspense>
    </div>
  )
}
