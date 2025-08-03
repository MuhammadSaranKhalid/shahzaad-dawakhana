"use client"

import { ProductTable } from "@/components/admin/ProductTable"
import { useList, useDelete } from "@refinedev/core"
import type { Medicine } from "@/data/products"
import { useToast } from "@/hooks/use-toast"
import { Suspense } from "react"

// Separate the main component logic that uses hooks
function AdminProductsPageContent() {
  const { data, isLoading, isError } = useList<Medicine>({
    resource: "medicines",
  })
  const { mutate: deleteProduct } = useDelete()
  const { toast } = useToast()

  const products = data?.data || []

  const handleDeleteProduct = (id: string) => {
    deleteProduct(
      {
        resource: "medicines",
        id: id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Product Deleted",
            description: "The product has been successfully removed.",
            variant: "default",
          })
        },
        onError: (error) => {
          console.error("Failed to delete product:", error)
          toast({
            title: "Error",
            description: "Failed to delete product.",
            variant: "destructive",
          })
        },
      },
    )
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (isError) {
    return <div className="text-center py-8 text-destructive">Error loading products.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Product Management</h2>
      <ProductTable products={products} onDelete={handleDeleteProduct} />
    </div>
  )
}

// Main page component wrapped with Suspense
export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
      <AdminProductsPageContent />
    </Suspense>
  )
}
