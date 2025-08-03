import { slugify } from "@/lib/helpers"

export interface Medicine {
  id: string
  slug: string
  name: string
  brief: string
  description: string
  dosage: string
  warnings: string
  price: number
  image_url?: string
  blurhash?: string
  stock_qty: number
  category: string
}

// Initial mock data - this will be replaced by Supabase data in the admin panel
// but kept for the storefront if you don't want to seed Supabase initially.
export const medicines: Medicine[] = [
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "PainAway Max Strength",
    brief: "Fast-acting relief for headaches and body aches.",
    description:
      "PainAway Max Strength provides rapid and effective relief from various types of pain, including headaches, muscle aches, and menstrual cramps. Its advanced formula targets pain at the source, ensuring you can get back to your day quickly. Non-drowsy.",
    dosage:
      "Adults and children 12 years and over: Take 2 caplets every 4 to 6 hours while symptoms persist. Do not exceed 8 caplets in 24 hours. Consult a doctor for children under 12.",
    warnings:
      "Do not use if you are allergic to any ingredients. May cause stomach upset. If pregnant or breastfeeding, consult a healthcare professional before use. Keep out of reach of children.",
    price: 12.99,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 150,
    category: "Pain Relief",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "AllergyGuard 24HR",
    brief: "Non-drowsy allergy relief for a full day.",
    description:
      "AllergyGuard 24HR offers powerful, non-drowsy relief from common allergy symptoms like sneezing, runny nose, itchy eyes, and watery eyes. One pill provides 24 hours of continuous relief, allowing you to enjoy your day without interruption.",
    dosage: "Adults and children 6 years and over: Take 1 tablet daily. Do not exceed recommended dosage.",
    warnings:
      "Do not use with other antihistamines. May cause drowsiness in some individuals. If pregnant or breastfeeding, consult a healthcare professional. Store at room temperature.",
    price: 18.5,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 200,
    category: "Allergy",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "VitaBoost Daily",
    brief: "Comprehensive multivitamin for daily wellness.",
    description:
      "VitaBoost Daily is a complete multivitamin formulated to support overall health and well-being. It contains essential vitamins and minerals to fill nutritional gaps and boost energy levels. Ideal for adults seeking daily nutritional support.",
    dosage: "Adults: Take 1 tablet daily with food.",
    warnings:
      "Do not exceed recommended dosage. If you are pregnant, nursing, taking any medication, or have a medical condition, consult your doctor before use. Accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6.",
    price: 9.75,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 300,
    category: "Vitamins",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "CoughEase Syrup",
    brief: "Soothes coughs and clears congestion.",
    description:
      "CoughEase Syrup provides effective relief from coughs and chest congestion. Its soothing formula helps to calm irritated throats and loosen mucus, making it easier to breathe. Suitable for adults and children.",
    dosage:
      "Adults and children 12 years and over: Take 10 mL every 4 hours as needed. Children 6 to under 12 years: Take 5 mL every 4 hours as needed. Do not exceed 6 doses in 24 hours.",
    price: 8.25,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 100,
    category: "Cold & Flu",
    warnings:
      "Do not use if you have chronic lung disease or asthma without consulting a doctor. May cause drowsiness. Avoid alcohol. If cough persists for more than 7 days, consult a doctor.",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "Digestive Aid Pro",
    brief: "Supports healthy digestion and nutrient absorption.",
    description:
      "Digestive Aid Pro is a blend of enzymes and probiotics designed to support optimal digestion and nutrient absorption. It helps reduce bloating, gas, and indigestion, promoting a comfortable digestive system.",
    dosage: "Adults: Take 1 capsule with each meal, or as directed by a healthcare professional.",
    warnings:
      "Consult your doctor before use if you are pregnant, nursing, or have a medical condition. Discontinue use if adverse reactions occur. Keep out of reach of children.",
    price: 24.0,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 80,
    category: "Digestive Health",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "SleepWell Melatonin",
    brief: "Helps you fall asleep faster and stay asleep.",
    description:
      "SleepWell Melatonin is a natural sleep aid that helps regulate your sleep cycle, making it easier to fall asleep and enjoy a restful night. Ideal for occasional sleeplessness.",
    dosage: "Adults: Take 1 tablet 30 minutes before bedtime. Do not exceed 1 tablet per day.",
    warnings:
      "May cause drowsiness. Do not drive or operate machinery after taking. Do not use if pregnant or breastfeeding. Consult a doctor if you are taking other medications or have a medical condition.",
    price: 15.0,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 120,
    category: "Sleep Aids",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "JointFlex Support",
    brief: "Promotes joint health and flexibility.",
    description:
      "JointFlex Support is formulated with glucosamine and chondroitin to help maintain healthy cartilage and support joint flexibility and comfort. Ideal for active individuals and those experiencing joint stiffness.",
    dosage: "Adults: Take 2 tablets daily with a meal.",
    warnings:
      "If you have a shellfish allergy, consult your doctor before use. If pregnant, nursing, or taking medication, consult a healthcare professional. Keep out of reach of children.",
    price: 29.99,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 70,
    category: "Joint Health",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "ImmuneBoost Plus",
    brief: "Supports a healthy immune system.",
    description:
      "ImmuneBoost Plus is packed with Vitamin C, Zinc, and Echinacea to provide comprehensive support for your immune system. Helps your body's natural defenses stay strong, especially during cold and flu season.",
    dosage: "Adults: Take 1 capsule daily with food.",
    warnings:
      "Consult your doctor before use if you are pregnant, nursing, or have an autoimmune condition. Discontinue use if adverse reactions occur. Not intended for long-term use.",
    price: 14.5,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 180,
    category: "Immune Support",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "HeartGuard Omega-3",
    brief: "Supports cardiovascular health.",
    description:
      "HeartGuard Omega-3 provides essential fatty acids EPA and DHA, crucial for maintaining a healthy heart and circulatory system. Sourced from high-quality fish oil, it supports overall cardiovascular wellness.",
    dosage: "Adults: Take 1 softgel daily with a meal.",
    warnings:
      "If you are pregnant, nursing, taking blood thinners, or have a medical condition, consult your doctor before use. May cause mild digestive upset. Keep out of reach of children.",
    price: 22.0,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 90,
    category: "Heart Health",
  },
  {
    id: crypto.randomUUID(), // Changed to generate UUID
    name: "CalmMind Stress Relief",
    brief: "Helps reduce stress and promote relaxation.",
    description:
      "CalmMind Stress Relief is a natural blend of herbs like Ashwagandha and L-Theanine, designed to help calm the mind, reduce feelings of stress, and promote a sense of relaxation without causing drowsiness.",
    dosage: "Adults: Take 1 capsule twice daily, or as needed.",
    warnings:
      "Consult your doctor before use if you are pregnant, nursing, or taking sedatives. May cause mild drowsiness in some individuals. Discontinue use if adverse reactions occur.",
    price: 19.0,
    image_url: "/placeholder.svg?height=400&width=400",
    blurhash: "LGF5?I#8.R_29FNHM{_200000000",
    stock_qty: 110,
    category: "Mental Wellness",
  },
]

// Add slugs to products
medicines.forEach((med) => {
  med.slug = slugify(med.name)
})
