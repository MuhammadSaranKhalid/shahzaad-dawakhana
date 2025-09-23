// Currency formatter for Pakistani Rupees
export const currencyFormatter = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

// Format currency using the formatter
export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

// Alternative price formatting function
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`
}

// Utility function to create URL-friendly slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Truncate text to a specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}
