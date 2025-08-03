"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MinusIcon, PlusIcon } from "lucide-react"

interface QuantityStepperProps {
  initialQuantity: number
  onQuantityChange: (quantity: number) => void
  maxQuantity?: number
  minQuantity?: number
  id?: string
}

export function QuantityStepper({
  initialQuantity,
  onQuantityChange,
  maxQuantity = Number.POSITIVE_INFINITY,
  minQuantity = 1,
  id,
}: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const handleDecrement = () => {
    const newQty = Math.max(minQuantity, quantity - 1)
    setQuantity(newQty)
    onQuantityChange(newQty)
  }

  const handleIncrement = () => {
    const newQty = Math.min(maxQuantity, quantity + 1)
    setQuantity(newQty)
    onQuantityChange(newQty)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= minQuantity && value <= maxQuantity) {
      setQuantity(value)
      onQuantityChange(value)
    } else if (e.target.value === "") {
      setQuantity(0) // Allow temporary empty state for user input
      onQuantityChange(0)
    }
  }

  const handleBlur = () => {
    // If the input is empty or invalid after blur, revert to minQuantity
    if (isNaN(quantity) || quantity < minQuantity) {
      setQuantity(minQuantity)
      onQuantityChange(minQuantity)
    }
  }

  return (
    <div className="flex items-center gap-2" aria-label="Quantity selector">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={quantity <= minQuantity}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        id={id}
        type="number"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        min={minQuantity}
        max={maxQuantity}
        aria-live="polite"
        aria-atomic="true"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
