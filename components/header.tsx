import React from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className="relative flex items-center justify-between px-4 py-2 lg:px-12 lg:py-4 border-b bg-white">
    <Link href="/" className="flex items-center">
      <Image
        src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
        alt="Nequi Logo"
        width={96}
        height={40}
        className="object-contain"
        priority
      />
    </Link>
    

    {/* Desktop Navigation - Unchanged */}
    <nav className="hidden lg:flex items-center space-x-8 ">
      <div className="flex items-center space-x-8">
        <button className="text-gray-700 hover:text-gray-900 flex items-center">
          Para personas
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="text-gray-700 hover:text-gray-900 flex items-center">
          Ayuda
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="text-gray-700 hover:text-gray-900 flex items-center">
          Conócenos
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link href="#" className="text-gray-700 hover:text-gray-900">
          Tu negocio
        </Link>
        <Link href="#" className="text-[#E6007E] hover:text-[#C4006B]">
          Paga tu crédito
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <Button variant="outline" className="rounded-full px-8">
            Entrar
          </Button>
        </Link>
        <Button className="bg-[#E6007E] hover:bg-[#C4006B] rounded-full px-8">Recargar</Button>
      </div>
    </nav>

   {/* Mobile Menu Button */}
   <button
      className="lg:hidden flex items-center text-[#2D004C] transition-transform duration-300 ease-in-out"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      style={{
        transform: isMobileMenuOpen
          ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotate(45deg)"
          : "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotate(0deg)",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d={
            isMobileMenuOpen
              ? "M18 6L6 18M6 6l12 12"
              : "M3 12H21M3 6H21M3 18H21"
          }
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 bg-white z-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <Link href="/">
              <Image
                src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
                alt="Nequi Logo"
                width={96}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            <button
              className="text-[#2D004C]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              <Link href="#" className="block text-xl font-medium text-gray-900">
                Para personas
              </Link>
              <Link href="#" className="block text-xl font-medium text-gray-900">
                Ayuda
              </Link>
              <Link href="#" className="block text-xl font-medium text-gray-900">
                Conócenos
              </Link>
              <Link href="#" className="block text-xl font-medium text-gray-900">
                Tu negocio
              </Link>
              <Link href="#" className="block text-xl font-medium text-[#E6007E]">
                Paga tu crédito
              </Link>
            </div>
            <div className="mt-8 space-y-4">
              <Button variant="outline" className="w-full py-6 text-lg rounded-xl">
                Entrar
              </Button>
              <Button className="w-full py-6 text-lg bg-[#E6007E] hover:bg-[#C4006B] rounded-xl">
                Recargar
              </Button>
            </div>
          </nav>
        </div>
      </div>
    )}
  </header>
  )
}
