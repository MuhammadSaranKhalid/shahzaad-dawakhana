"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon, ShoppingCart, Clock, Flame } from "lucide-react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { medicines } from "@/data/products"
import { currencyFormatter } from "@/lib/helpers"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const categories = [
    {
      name: "Pain Relief",
      icon: "/placeholder.svg?height=64&width=64",
      description: "Headaches, muscle aches, and more.",
    },
    {
      name: "Allergy",
      icon: "/placeholder.svg?height=64&width=64",
      description: "Seasonal and year-round allergy solutions.",
    },
    { name: "Vitamins", icon: "/placeholder.svg?height=64&width=64", description: "Boost your daily wellness." },
    {
      name: "Immune Support",
      icon: "/placeholder.svg?height=64&width=64",
      description: "Strengthen your body's defenses.",
    },
  ]

  // Get featured products (first 4 products for demo)
  const featuredProducts = medicines.slice(0, 4)

  // Flash sale products with discounts
  const flashSaleProducts = medicines.slice(0, 3).map((product) => ({
    ...product,
    originalPrice: product.price,
    salePrice: Math.round(product.price * 0.7), // 30% off
    discount: 30,
  }))

  return (
    <PublicLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-teal-600 text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/hero-medicines-bg.png"
              alt="Medicine Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-teal-600/80"></div>
          </div>

          <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                Your Health, Delivered.
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                Discover a wide range of quality medicines and health products, delivered right to your door.
              </p>
              <div className="space-x-4 pt-4">
                <Button
                  asChild
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg transition-all hover:scale-105"
                >
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg rounded-full shadow-lg transition-all hover:scale-105 bg-transparent"
                >
                  <Link href="/products">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale Section - Compact */}
        <section className="w-full py-8 md:py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-yellow-300 animate-pulse" />
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Flash Sale</h2>
                <Flame className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
              <p className="max-w-[500px] text-base md:text-lg opacity-90">
                Limited time offer! Save up to 30% on selected health products.
              </p>

              {/* Compact Countdown Timer */}
              <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-semibold">Ends in:</span>
                <div className="flex gap-1">
                  <div className="bg-white/20 rounded px-2 py-1 min-w-[45px]">
                    <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                    <div className="text-xs opacity-75">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded px-2 py-1 min-w-[45px]">
                    <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                    <div className="text-xs opacity-75">Min</div>
                  </div>
                  <div className="bg-white/20 rounded px-2 py-1 min-w-[45px]">
                    <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                    <div className="text-xs opacity-75">Sec</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Flash Sale Products */}
            <div className="mx-auto grid max-w-6xl items-start gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {flashSaleProducts.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl bg-white text-gray-900 relative"
                >
                  {/* Sale Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-red-500 text-white font-bold px-2 py-1 text-xs">-{product.discount}%</Badge>
                  </div>

                  <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=400"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      priority
                      placeholder={product.blurhash ? "blur" : "empty"}
                      blurDataURL={product.blurhash || undefined}
                    />
                  </Link>

                  <CardContent className="flex-grow p-3">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{product.brief}</p>

                    {/* Compact Price Section */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                          {currencyFormatter.format(product.salePrice)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          {currencyFormatter.format(product.originalPrice)}
                        </span>
                      </div>
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

                  <div className="p-3 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent text-xs"
                        asChild
                        aria-label={`View ${product.name} details`}
                      >
                        <Link href={`/products/${product.slug}`}>View</Link>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-xs"
                        disabled={product.stock_qty === 0}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button asChild size="sm" className="bg-white text-red-600 hover:bg-gray-100 px-6 py-2 font-semibold">
                <Link href="/products">
                  View All Sale Items
                  <ArrowRightIcon className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular and trusted health solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl items-start gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md"
                >
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
                  <div className="p-4 pt-0">
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
                        disabled={product.stock_qty === 0}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" className="px-8 py-3 bg-transparent">
                <Link href="/products">
                  View All Products
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Categories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find exactly what you need for your health and wellness journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {categories.map((category) => (
                <Card
                  key={category.name}
                  className="group flex flex-col items-center text-center p-6 transition-all hover:shadow-lg hover:border-primary"
                >
                  <CardHeader className="pb-4">
                    <Image
                      src={category.icon || "/placeholder.svg"}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="mx-auto mb-4 rounded-full bg-primary/10 p-2"
                    />
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardContent>
                  <Button variant="link" asChild className="mt-4 text-primary group-hover:underline">
                    <Link href="/products">
                      View Products
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to feel better?</h2>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl mt-4">
              Browse our extensive catalog and find the right solutions for your health needs.
            </p>
            <Button
              asChild
              className="mt-8 bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
