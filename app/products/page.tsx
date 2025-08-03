"use client"

import { ProductGrid } from "@/components/ProductGrid"
import { useList } from "@refinedev/core"
import type { Medicine } from "@/data/products"
import { PublicLayout } from "@/components/layout/PublicLayout"

export default function ProductsPage() {
  const { data, isLoading, isError } = useList<Medicine>({
    resource: "medicines",
    sorters: [
      {
        field: "name",
        order: "asc",
      },
    ],
  })

  const products = data?.data || []

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (isError) {
    return <div className="text-center py-8 text-destructive">Error loading products.</div>
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Our Products</h1>

        <div className="grid grid-cols-1 gap-8">
          {/* Product Grid */}
          <section>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center text-muted-foreground py-16">No products found.</div>
            )}
          </section>
        </div>
      </div>
    </PublicLayout>
  )
}
