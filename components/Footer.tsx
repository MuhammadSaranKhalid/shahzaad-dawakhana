import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <span className="text-xl font-bold">Shahzad Dawakhana</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted pharmacy providing quality medicines and healthcare products since 1995.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white text-sm">
                Home
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white text-sm">
                Products
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/products?category=pain-relief" className="block text-gray-400 hover:text-white text-sm">
                Pain Relief
              </Link>
              <Link href="/products?category=antibiotics" className="block text-gray-400 hover:text-white text-sm">
                Antibiotics
              </Link>
              <Link href="/products?category=vitamins" className="block text-gray-400 hover:text-white text-sm">
                Vitamins
              </Link>
              <Link href="/products?category=diabetes" className="block text-gray-400 hover:text-white text-sm">
                Diabetes Care
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-400 text-sm">123 Main Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-gray-400 text-sm">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-gray-400 text-sm">info@shahzaddawakhana.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Shahzad Dawakhana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
