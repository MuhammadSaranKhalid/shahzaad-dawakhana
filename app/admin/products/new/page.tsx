"use client"

import { ProductForm } from "@/components/admin/ProductForm"
import { useCreate } from "@refinedev/core"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Medicine } from "@/data/products"
import { slugify } from "@/lib/helpers"
import { Suspense } from "react"

// Separate the main component logic that uses hooks
function AdminNewProductPageContent() {
  const router = useRouter()
  const { mutate: createProduct, isLoading: isSubmitting } = useCreate<Medicine>()
  const { toast } = useToast()

  const handleAddProduct = (data: Omit<Medicine, "id" | "slug">) => {
    createProduct(
      {
        resource: "medicines",
        values: {
          ...data,
          slug: slugify(data.name), // Generate slug before sending
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Product Added",
            description: "The new product has been successfully added.",
            variant: "default",
          })
          router.push("/admin/products")
        },
        onError: (error) => {
          console.error("Failed to add product:", error)
          toast({
            title: "Error",
            description: `Failed to add product: ${error.message || "Unknown error"}`,
            variant: "destructive",
          })
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <ProductForm onSubmit={handleAddProduct} isSubmitting={isSubmitting} />
    </div>
  )
}

// Main page component wrapped with Suspense
export default function AdminNewProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminNewProductPageContent />
    </Suspense>
  )
}
