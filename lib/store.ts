import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image_url: string
  stock_qty: number
  slug?: string
}

export interface CartStore {
  items: CartItem[]
  add: (item: Omit<CartItem, "qty">, quantity?: number) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  totalItems: () => number
  totalPrice: () => number
  addToCart: (item: any) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            const newQty = existingItem.qty + quantity
            if (newQty > item.stock_qty) {
              console.warn(`Cannot add more than available stock for ${item.name}`)
              return { items: state.items }
            }
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, qty: newQty } : i)),
            }
          } else {
            if (quantity > item.stock_qty) {
              console.warn(`Cannot add more than available stock for ${item.name}`)
              return { items: state.items }
            }
            return {
              items: [...state.items, { ...item, qty: quantity }],
            }
          }
        })
      },
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            const newQty = existingItem.qty + (item.quantity || 1)
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, qty: newQty } : i)),
            }
          } else {
            return {
              items: [
                ...state.items,
                {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  qty: item.quantity || 1,
                  image_url: item.image || item.image_url || "/placeholder.svg",
                  stock_qty: 100,
                  slug: item.slug,
                },
              ],
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
                const newQty = Math.max(1, Math.min(qty, item.stock_qty))
                return { ...item, qty: newQty }
              }
              return item
            })
            .filter((item) => item.qty > 0),
        }))
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    {
      name: "medicine-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useStore = useCartStore
