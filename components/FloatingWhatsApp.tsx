"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+923001234567"
    const message = "Hello! I'm interested in your pharmacy products."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  )
}
