"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useState, useEffect } from "react"

interface QuantityStepperProps {
  initialQuantity?: number
  onQuantityChange: (quantity: number) => void
  maxQuantity?: number
  minQuantity?: number
  id?: string
}

export function QuantityStepper({
  initialQuantity = 1,
  onQuantityChange,
  maxQuantity = 99,
  minQuantity = 1,
  id,
}: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(minQuantity, Math.min(maxQuantity, newQuantity))
    setQuantity(clampedQuantity)
    onQuantityChange(clampedQuantity)
  }

  const increment = () => {
    if (quantity < maxQuantity) {
      handleQuantityChange(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > minQuantity) {
      handleQuantityChange(quantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || minQuantity
    handleQuantityChange(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={decrement}
        disabled={quantity <= minQuantity}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        id={id}
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center"
        min={minQuantity}
        max={maxQuantity}
        aria-label="Quantity"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={increment}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
