import { Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <Link href="/" className="relative w-24 h-12">
        <Image
          src="/placeholder.svg?height=48&width=96"
          alt="Nequi Logo"
          fill
          className="object-contain"
          priority
        />
      </Link>
      <button className="p-2" aria-label="Menu">
        <Menu className="h-6 w-6 text-gray-700" />
      </button>
    </nav>
  )
}

