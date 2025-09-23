import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  name: string
  price: number
  image_url?: string
  stock_qty: number
  qty: number
}

interface CartStore {
  items: CartItem[]
  add: (product: Omit<CartItem, "qty">, quantity: number) => void
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
      add: (product, quantity) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, qty: Math.min(item.qty + quantity, product.stock_qty) } : item,
            ),
          })
        } else {
          set({
            items: [...items, { ...product, qty: Math.min(quantity, product.stock_qty) }],
          })
        }
      },
      remove: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().remove(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, qty: Math.min(qty, item.stock_qty) } : item)),
        })
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
)

export const useStore = useCartStore
