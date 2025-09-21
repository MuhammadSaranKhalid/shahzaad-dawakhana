"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+923001234567"
    const message = "Hello! I'm interested in your medicines. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
