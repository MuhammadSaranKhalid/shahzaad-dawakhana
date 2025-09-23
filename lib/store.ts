import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
)

export const useStore = useCartStore
export const addToCart = (item: Omit<CartItem, "quantity">) => {
  useCartStore.getState().addItem(item)
}
