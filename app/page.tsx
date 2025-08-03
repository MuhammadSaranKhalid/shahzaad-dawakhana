import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import { PublicLayout } from "@/components/layout/PublicLayout"

export default function HomePage() {
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

  return (
    <PublicLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-teal-600 text-white overflow-hidden">
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
          {/* Background elements for visual interest */}
          <div className="absolute inset-0 opacity-20">
          {/*  <Image
              src="/placeholder.svg?height=1000&width=1500"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />*/}
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
