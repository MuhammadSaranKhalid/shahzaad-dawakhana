import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image_url: string // Changed from imageUrl to image_url
  stock_qty: number // Changed from stockQty to stock_qty
}

export interface CartStore {
  items: CartItem[]
  add: (item: Omit<CartItem, "qty">, quantity?: number) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            // Check if adding more would exceed stock
            const newQty = existingItem.qty + quantity
            if (newQty > item.stock_qty) {
              // Changed from stockQty to stock_qty
              console.warn(`Cannot add more than available stock for ${item.name}`)
              return { items: state.items }
            }
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, qty: newQty } : i)),
            }
          } else {
            // Check if initial quantity exceeds stock
            if (quantity > item.stock_qty) {
              // Changed from stockQty to stock_qty
              console.warn(`Cannot add more than available stock for ${item.name}`)
              return { items: state.items }
            }
            return {
              items: [...state.items, { ...item, qty: quantity }],
            }
          }
        })
      },
      remove: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      updateQty: (id, qty) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                // Ensure quantity doesn't exceed stock and is not less than 1
                const newQty = Math.max(1, Math.min(qty, item.stock_qty)) // Changed from stockQty to stock_qty
                return { ...item, qty: newQty }
              }
              return item
            })
            .filter((item) => item.qty > 0), // Remove if quantity becomes 0
        }))
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    {
      name: "medicine-cart", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
