import { NextResponse } from "next/server"
import { encode } from "blurhash"
import sharp from "sharp"

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      console.error("Blurhash API: Image URL is missing.")
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    console.log(`Blurhash API: Fetching image from: ${imageUrl}`)
    const response = await fetch(imageUrl)

    if (!response.ok) {
      const errorText = await response.text() // Get potential error message from upstream
      console.error(
        `Blurhash API: Failed to fetch image. Status: ${response.status}, Text: ${errorText.substring(0, 100)}`,
      )
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}. Response: ${errorText.substring(0, 100)}...`,
      )
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.startsWith("image/")) {
      console.error(`Blurhash API: Fetched content is not an image. Content-Type: ${contentType}`)
      throw new Error(`Fetched URL does not point to an image. Content-Type: ${contentType}`)
    }

    const imageBuffer = await response.arrayBuffer()
    console.log(`Blurhash API: Image buffer size: ${imageBuffer.byteLength} bytes`)

    // Check for excessively large images before processing with sharp
    const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
    if (imageBuffer.byteLength > MAX_IMAGE_SIZE_BYTES) {
      console.error(
        `Blurhash API: Image too large (${imageBuffer.byteLength} bytes). Max allowed: ${MAX_IMAGE_SIZE_BYTES} bytes.`,
      )
      throw new Error("Image file is too large for processing.")
    }

    let data, info
    try {
      ;({ data, info } = await sharp(Buffer.from(imageBuffer))
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: "inside" }) // Resize to a small size for blurhash
        .toBuffer({ resolveWithObject: true }))
    } catch (sharpError: any) {
      console.error("Blurhash API: Sharp processing failed:", sharpError)
      throw new Error(`Image processing failed: ${sharpError.message || "Unknown sharp error"}`)
    }

    // Encode blurhash
    const blurhash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
    console.log(`Blurhash API: Successfully generated blurhash: ${blurhash.substring(0, 20)}...`)

    return NextResponse.json({ blurhash })
  } catch (error: any) {
    console.error("Blurhash API: Top-level error caught:", error)
    // Ensure the error message is always a string
    const errorMessage =
      typeof error.message === "string" ? error.message : "An unknown error occurred during blurhash generation."
    return NextResponse.json({ error: errorMessage || "Failed to generate blurhash" }, { status: 500 })
  }
}
