import { medicines, type Medicine } from "@/data/products"
import { slugify } from "./helpers"

// In-memory store for products and orders
// In a real application, this would be a database or API calls.
const adminProducts = new Map<string, Medicine>()
const adminOrders = new Map<string, any>() // Simplified for now

// Seed products from initial data
medicines.forEach((med) => adminProducts.set(med.id, med))

// Seed some mock orders
const mockOrders = [
  {
    id: "order-001",
    customer_email: "customer1@example.com",
    total_amount: 35.74,
    status: "Pending",
    shipping_address: "123 Main St, Anytown, CA 12345, USA",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    items: [
      { productId: "med-001", name: "PainAway Max Strength", qty: 1, price: 12.99 },
      { productId: "med-003", name: "VitaBoost Daily", qty: 1, price: 9.75 },
      { productId: "med-004", name: "CoughEase Syrup", qty: 1, price: 8.25 },
    ],
  },
  {
    id: "order-002",
    customer_email: "customer2@example.com",
    total_amount: 27.0,
    status: "Shipped",
    shipping_address: "456 Oak Ave, Otherville, NY 67890, USA",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    items: [{ productId: "med-006", name: "SleepWell Melatonin", qty: 1, price: 15.0 }],
  },
]
mockOrders.forEach((order) => adminOrders.set(order.id, order))

// --- Product Management Functions ---

export function getAdminProducts(): Medicine[] {
  return Array.from(adminProducts.values())
}

export function getAdminProductById(id: string): Medicine | undefined {
  return adminProducts.get(id)
}

export function addAdminProduct(newProductData: Omit<Medicine, "id" | "slug">): Medicine {
  const id = crypto.randomUUID() // Changed to generate UUID
  const slug = slugify(newProductData.name)
  const newProduct: Medicine = {
    id,
    slug,
    ...newProductData,
  }
  adminProducts.set(id, newProduct)
  return newProduct
}

export function updateAdminProduct(
  id: string,
  updatedData: Partial<Omit<Medicine, "id" | "slug">>,
): Medicine | undefined {
  const existingProduct = adminProducts.get(id)
  if (!existingProduct) {
    return undefined
  }
  const updatedProduct: Medicine = {
    ...existingProduct,
    ...updatedData,
    slug: updatedData.name ? slugify(updatedData.name) : existingProduct.slug, // Update slug if name changes
  }
  adminProducts.set(id, updatedProduct)
  return updatedProduct
}

export function deleteAdminProduct(id: string): boolean {
  return adminProducts.delete(id)
}

// --- Order Management Functions ---

export function getAdminOrders(): any[] {
  return Array.from(adminOrders.values())
}

export function getAdminOrderById(id: string): any | undefined {
  return adminOrders.get(id)
}

// In a real app, you'd have functions to update order status, etc.
