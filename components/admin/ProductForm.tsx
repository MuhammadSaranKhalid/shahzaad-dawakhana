"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Medicine } from "@/data/products"
import { useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"
import { Loader2, UploadCloud } from "lucide-react"
import Image from "next/image"

const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  brief: z.string().min(10, "Brief description must be at least 10 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  dosage: z.string().min(10, "Dosage instructions are required."),
  warnings: z.string().min(10, "Warnings are required."),
  price: z.coerce.number().min(0.01, "Price must be greater than 0."),
  image_url: z.string().url("Invalid image URL.").optional().or(z.literal("")), // Changed from imageUrl to image_url
  // blurhash: z.string().optional(), // Add blurhash to schema
  stock_qty: z.coerce.number().int().min(0, "Stock quantity cannot be negative."), // Changed from stockQty to stock_qty
  category: z.string().min(2, "Category is required."),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductFormProps {
  initialData?: Medicine // For editing existing products
  onSubmit: (data: ProductFormValues) => void
  isSubmitting: boolean
}

export function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      name: "",
      brief: "",
      description: "",
      dosage: "",
      warnings: "",
      price: 0.01,
      image_url: "", // Changed to image_url
      // blurhash: "",
      stock_qty: 1, // Changed to stock_qty
      category: "",
    },
  })

  const [uploading, setUploading] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(initialData?.image_url || "") // Changed to image_url

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `public/${fileName}` // Store in a 'public' folder within the bucket

      const { error: uploadError, data: uploadData } = await supabaseClient.storage
        .from("product-images") // Corrected bucket name to match SQL schema
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabaseClient.storage.from("product-images").getPublicUrl(uploadData.path)

      const publicUrl = publicUrlData.publicUrl

      // // Generate blurhash
      // // This section fetches the public URL of the uploaded image and then sends it to a Next.js API route
      // // to generate a blurhash string. The blurhash is a compact representation of an image,
      // // used for displaying a low-resolution placeholder while the full image loads.
      // const blurhashResponse = await fetch("/api/blurhash", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ imageUrl: publicUrl }),
      // })

      // if (!blurhashResponse.ok) {
      //   // Attempt to parse error response, even if not OK
      //   let errorData
      //   try {
      //     errorData = await blurhashResponse.json()
      //   } catch (parseError) {
      //     console.error("Failed to parse blurhash API error response as JSON:", parseError)
      //     throw new Error(
      //       `Blurhash API returned non-JSON error: ${blurhashResponse.status} ${blurhashResponse.statusText}`,
      //     )
      //   }
      //   throw new Error(errorData.error || `Blurhash API failed with status ${blurhashResponse.status}`)
      // }

      // const { blurhash } = await blurhashResponse.json()

      // Set the generated blurhash and the public image URL into the form fields.
      // This ensures that the blurhash is saved along with the image URL when the product form is submitted.
      form.setValue("image_url", publicUrl, { shouldValidate: true }) // Changed to image_url
      // form.setValue("blurhash", blurhash, { shouldValidate: true }) // Commented out as blurhash is not needed
      setImagePreviewUrl(publicUrl)
    } catch (error: any) {
      console.error("Image upload or blurhash error:", error.message)
      form.setError("image_url", { message: error.message }) // Changed to image_url
    } finally {
      setUploading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{initialData ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., PainAway Max Strength" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brief"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short summary of the product." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed description of the product." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Dosage Instructions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Adults: Take 1 tablet daily with food." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warnings"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Warnings</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Consult your doctor before use if..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock_qty" // Changed from stockQty to stock_qty
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pain Relief" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image_url" // Changed to image_url
              render={({ field, fieldState }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-6 relative">
                      {imagePreviewUrl && (
                        <div className="mb-4 relative w-32 h-32">
                          <Image
                            src={imagePreviewUrl || "/placeholder.svg?height=400&width=400"}
                            alt="Image Preview"
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      )}
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span className="mt-2">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-8 w-8" />
                            <span className="mt-2">Click to upload or drag and drop</span>
                          </>
                        )}
                        <Input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          // Do not spread field props directly to file input as it's uncontrolled
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Hidden fields for imageUrl and blurhash, managed by upload handler */}
            {/* This FormField is for the blurhash string, which is automatically generated and set
                after an image is uploaded. It's hidden from the user as it's an internal detail
                used for image loading optimization (e.g., displaying a blurred placeholder). */}
            {/*
            <FormField
              control={form.control}
              name="blurhash"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Blurhash (Auto-filled)</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}
          </CardContent>
        </Card>
        <Button type="submit" className="w-full" disabled={isSubmitting || uploading}>
          {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Product"}
        </Button>
      </form>
    </Form>
  )
}
