"use client"

import { ProductForm } from "@/components/admin/ProductForm"
import { useOne, useUpdate } from "@refinedev/core"
import { notFound, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Medicine } from "@/data/products"
import { slugify } from "@/lib/helpers"

interface AdminEditProductPageProps {
  params: {
    id: string
  }
}

export default function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  const router = useRouter()
  const { toast } = useToast()

  const { data, isLoading, isError } = useOne<Medicine>({
    resource: "medicines",
    id: params.id,
  })

  const { mutate: updateProduct, isLoading: isSubmitting } = useUpdate<Medicine>()

  const product = data?.data

  if (isLoading) {
    return <div className="text-center py-8">Loading product details...</div>
  }

  if (isError || !product) {
    notFound()
  }

  const handleUpdateProduct = (values: Omit<Medicine, "id" | "slug">) => {
    updateProduct(
      {
        resource: "medicines",
        id: params.id,
        values: {
          ...values,
          slug: slugify(values.name), // Update slug if name changes
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Product Updated",
            description: "The product has been successfully updated.",
            variant: "default",
          })
          router.push("/admin/products")
        },
        onError: (error) => {
          console.error("Failed to update product:", error)
          toast({
            title: "Error",
            description: `Failed to update product: ${error.message || "Unknown error"}`,
            variant: "destructive",
          })
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <ProductForm initialData={product} onSubmit={handleUpdateProduct} isSubmitting={isSubmitting} />
    </div>
  )
}
