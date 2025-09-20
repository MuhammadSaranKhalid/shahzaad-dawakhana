export interface Medicine {
  id: string
  name: string
  brief: string
  description: string
  price: number
  image: string
  image_url: string
  inStock: boolean
  stock_qty: number
  category: string
  slug: string
  dosage?: string
  warnings?: string
  blurhash?: string
}

export const medicines: Medicine[] = [
  {
    id: "1",
    name: "Panadol Extra",
    brief: "Fast relief from headaches and fever",
    description:
      "Panadol Extra provides fast and effective relief from headaches, fever, and body aches. Contains paracetamol and caffeine for enhanced pain relief.",
    price: 45,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: true,
    stock_qty: 50,
    category: "Pain Relief",
    slug: "panadol-extra",
    dosage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    warnings: "Do not exceed recommended dose. Consult doctor if symptoms persist.",
  },
  {
    id: "2",
    name: "Brufen 400mg",
    brief: "Anti-inflammatory pain reliever",
    description:
      "Brufen 400mg tablets contain ibuprofen for effective relief from inflammation, pain, and fever. Suitable for headaches, dental pain, and muscle aches.",
    price: 85,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: true,
    stock_qty: 30,
    category: "Pain Relief",
    slug: "brufen-400mg",
    dosage: "Take 1 tablet 3-4 times daily with food. Maximum 6 tablets per day.",
    warnings: "Take with food to avoid stomach upset. Not suitable for children under 12.",
  },
  {
    id: "3",
    name: "Augmentin 625mg",
    brief: "Antibiotic for bacterial infections",
    description:
      "Augmentin 625mg is a broad-spectrum antibiotic containing amoxicillin and clavulanic acid, effective against various bacterial infections.",
    price: 320,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: true,
    stock_qty: 25,
    category: "Antibiotics",
    slug: "augmentin-625mg",
    dosage: "Take 1 tablet twice daily with meals for 5-7 days as prescribed.",
    warnings: "Complete the full course even if symptoms improve. Prescription required.",
  },
  {
    id: "4",
    name: "Vitamin D3 1000 IU",
    brief: "Essential vitamin for bone health",
    description:
      "Vitamin D3 supplements help maintain healthy bones, teeth, and immune system. Essential for calcium absorption and overall health.",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: true,
    stock_qty: 40,
    category: "Vitamins",
    slug: "vitamin-d3-1000iu",
    dosage: "Take 1 tablet daily with food or as directed by healthcare provider.",
    warnings: "Do not exceed recommended dose. Consult doctor if taking other medications.",
  },
  {
    id: "5",
    name: "Calpol Syrup",
    brief: "Children's fever and pain relief",
    description:
      "Calpol syrup provides gentle and effective relief from fever and pain in children. Sugar-free formula with pleasant strawberry flavor.",
    price: 95,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: true,
    stock_qty: 35,
    category: "Children's Medicine",
    slug: "calpol-syrup",
    dosage: "Give 2.5-5ml every 4-6 hours. Do not exceed 4 doses in 24 hours.",
    warnings: "For children 2 months to 6 years. Consult pediatrician for infants under 2 months.",
  },
  {
    id: "6",
    name: "Omeprazole 20mg",
    brief: "Acid reflux and heartburn relief",
    description:
      "Omeprazole capsules reduce stomach acid production, providing relief from acid reflux, heartburn, and stomach ulcers.",
    price: 180,
    image: "/placeholder.svg?height=300&width=300",
    image_url: "/placeholder.svg?height=300&width=300",
    inStock: false,
    stock_qty: 0,
    category: "Digestive Health",
    slug: "omeprazole-20mg",
    dosage: "Take 1 capsule daily before breakfast. Swallow whole with water.",
    warnings: "Long-term use may affect magnesium levels. Consult doctor for extended treatment.",
  },
]
