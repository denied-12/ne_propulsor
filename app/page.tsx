"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row  min-h-[calc(100vh-80px)] relative">
        {/* Left Content */}
        <div className="px-6 lg:px-16 lg:w-1/2 order-2 lg:order-1 relative z-10 py-8 lg:py-16">
            <h4 className="text-[1.25rem] lg:text-[1.25rem] font-manrope text-[#200020]">Desembolsa hasta 25.000.000*</h4>
          <h1 className="text-[48px] lg:text-[56px] leading-tight font-manrope text-[#200020]">
            Crédito<br />Propulsor
          </h1>
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

        {/* Image Container */}
        <div className="relative lg:w-1/2 order-1 lg:order-2">
          {/* Mobile Image */}
          <div className="block lg:hidden w-full">
            <Image
              src="/nequihero.webp"
              alt="Person using laptop and phone"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden lg:block relative h-[calc(100vh-80px)] w-full">
          <div className="h-full w-full">
            <Image
              src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/66e1fee357522af9e8d1b06c_el%20mejor%20prestamo.webp"
              alt="Person using phone and laptop"
              fill
              className="object-cover object-center z-10 clip-hero"
              priority
            />
            </div>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button
  className="lg:hidden fixed bottom-6 right-6
   bg-[#200020] text-white p-2 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
  aria-label="Ayuda"
>
  <MessageCircle className="h-6 w-6" />
</button>
    </main>
  )
}