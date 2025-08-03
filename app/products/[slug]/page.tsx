"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import { currencyFormatter } from "@/lib/helpers"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuantityStepper } from "@/components/QuantityStepper"
import { useState } from "react"
import { useCartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useList } from "@refinedev/core" // Using useList to filter by slug
import type { Medicine } from "@/data/products"
import { PublicLayout } from "@/components/layout/PublicLayout"

interface ProductDetailsPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  // Use useList with a filter to find the product by slug
  const { data, isLoading, isError } = useList<Medicine>({
    resource: "medicines",
    filters: [
      {
        field: "slug",
        operator: "eq",
        value: params.slug,
      },
    ],
    queryOptions: {
      // Ensure we only fetch one item, or handle multiple if slug isn't unique
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  })

  const product = data?.data?.[0] // Get the first item from the filtered list
  const [quantity, setQuantity] = useState(1)
  const addProduct = useCartStore((state) => state.add)
  const { toast } = useToast()

  if (isLoading) {
    return <div className="text-center py-8">Loading product details...</div>
  }

  if (isError || !product) {
    notFound() // If no product found or error, show 404
  }

  const handleAddToCart = () => {
    addProduct(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock_qty: product.stock_qty,
      },
      quantity,
    )
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    })
  }

  const isOutOfStock = product.stock_qty === 0

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image_url || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover"
              priority
              placeholder={product.blurhash ? "blur" : "empty"}
              blurDataURL={product.blurhash || undefined}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-lg text-muted-foreground mt-2">{product.brief}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">{currencyFormatter.format(product.price)}</span>
              {isOutOfStock ? (
                <Badge variant="destructive" className="text-base px-3 py-1">
                  Out of Stock
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-base px-3 py-1">
                  In Stock ({product.stock_qty} available)
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-base font-medium">
                  Quantity:
                </label>
                <QuantityStepper
                  id="quantity"
                  initialQuantity={quantity}
                  onQuantityChange={setQuantity}
                  maxQuantity={product.stock_qty}
                  minQuantity={1}
                />
              </div>
              <Button
                size="lg"
                className="w-full md:w-auto"
                onClick={handleAddToCart}
                disabled={isOutOfStock || quantity === 0}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </Button>
            </div>

            {/* Description, Dosage & Warnings Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="dosage">Dosage & Warnings</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4 text-muted-foreground leading-relaxed">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="dosage" className="pt-4 text-muted-foreground leading-relaxed">
                <h3 className="font-semibold text-foreground mb-2">Dosage:</h3>
                <p>{product.dosage}</p>
                <h3 className="font-semibold text-foreground mt-4 mb-2">Warnings:</h3>
                <p>{product.warnings}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
