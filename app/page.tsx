"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Clock, ShoppingCart, Eye } from "lucide-react"
import { medicines } from "@/data/products"
import { useCartStore } from "@/lib/store"
import PublicLayout from "@/components/layout/PublicLayout"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const saleProducts = medicines.slice(0, 3).map((product) => ({
    ...product,
    salePrice: Math.round(product.price * 0.7), // 30% off
  }))

  const featuredProducts = medicines.slice(0, 4)

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-medicines-bg.png"
              alt="Medicine background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/80 to-blue-50/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Health, <span className="text-green-600">Delivered</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fast, reliable, and affordable medicines delivered to your doorstep. Your trusted online pharmacy for
                all your healthcare needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/products">Shop Medicines</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/products">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Flame className="h-6 w-6 animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
                <Flame className="h-6 w-6 animate-pulse" />
              </div>
              <p className="text-lg opacity-90">Limited time offer - Up to 30% off!</p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-4">
                <Clock className="h-5 w-5" />
                <div className="flex gap-2">
                  <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[50px]">
                    <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                    <div className="text-xs">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[50px]">
                    <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                    <div className="text-xs">Min</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[50px]">
                    <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                    <div className="text-xs">Sec</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {saleProducts.map((product) => (
                <Card key={product.id} className="bg-white text-gray-900 hover:shadow-lg transition-shadow">
                  <CardHeader className="p-3">
                    <div className="relative">
                      <div className="aspect-[4/3] relative mb-2">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">30% OFF</Badge>
                    </div>
                    <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-red-600">Rs. {product.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">Rs. {product.price}</span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/products/${product.slug}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and trusted medicines, carefully selected for your health needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <div className="aspect-square relative mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-green-600">Rs. {product.price}</span>
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/products/${product.slug}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Product
                        </Link>
                      </Button>
                      <Button className="flex-1" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-lg text-gray-600">Find the right medicine for your specific health needs</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Pain Relief", icon: "💊", count: "25+ products" },
                { name: "Vitamins", icon: "🌟", count: "30+ products" },
                { name: "First Aid", icon: "🏥", count: "15+ products" },
                { name: "Antibiotics", icon: "💉", count: "20+ products" },
                { name: "Heart Care", icon: "❤️", count: "18+ products" },
                { name: "Diabetes", icon: "🩺", count: "22+ products" },
                { name: "Skin Care", icon: "🧴", count: "12+ products" },
                { name: "Baby Care", icon: "👶", count: "16+ products" },
              ].map((category) => (
                <Card key={category.name} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
