"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import type { Medicine } from "@/data/products"
import { currencyFormatter } from "@/lib/helpers"
import { useCartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Medicine
}

export function ProductCard({ product }: ProductCardProps) {
  const addProduct = useCartStore((state) => state.add)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addProduct(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock_qty: product.stock_qty,
      },
      1,
    )
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          priority
          placeholder={product.blurhash ? "blur" : "empty"}
          blurDataURL={product.blurhash || undefined}
        />
      </Link>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.brief}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{currencyFormatter.format(product.price)}</span>
          {product.stock_qty === 0 ? (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              In Stock
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            asChild
            aria-label={`View ${product.name} details`}
          >
            <Link href={`/products/${product.slug}`}>View Product</Link>
          </Button>
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={product.stock_qty === 0}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
