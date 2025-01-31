"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Tabs from "@/components/tabs-section"
import Header from "@/components/header"
import StepsCredit from "@/components/creditSteps"
import SimularCredit from "@/components/simular-credit"
import HelpSection from "@/components/help-section"
import Requirements from "@/components/requirements-section"
import Footer from "@/components/footer"
import Questions from '@/components/question';
import Descarga from '@/components/descarga';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] relative">
        {/* Left Content */}
        <div className="px-8 lg:px-24 lg:w-1/2 order-2 lg:order-1 relative z-10 py-8 lg:py-16">
          <h4 className="text-[1.25rem] font-manrope font-normal text-[#200020] mb-2">Desembolsa hasta 25.000.000*</h4>
          <h1 className="text-[40px] lg:text-[48px] leading-[1.1] font-manrope font-medium text-[#200020] mb-3">
            Crédito<br />Propulsor
          </h1>
          <p className="text-gray-600 text-sm mb-2 max-w-[400px]">
            *Crédito de Consumo de Libre inversión, el monto máximo depende de tu capacidad de endeudamiento y políticas internas
          </p>
          <p className="text-xl mb-8">¡Recibe la plata de una en tu Nequi!</p>

          {/* QR Code - Desktop Only */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-start gap-6">
              <Image
                src="/qr-propulsor.svg"
                alt="Código QR para solicitar crédito"
                width={120}
                height={120}
                className="object-contain"
              />
              <p className="text-base mt-2">Escanea este código QR, descarga la app y pide tu crédito.</p>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:w-[260px]">
            <Link href="/cedula">
              <Button className="w-full py-6 text-lg bg-[#E6007E] hover:bg-[#C4006B] rounded-xl lg:py-4 lg:text-base">
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
              alt="Persona usando laptop y teléfono"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden lg:block  w-full">
            <Image
              src="/hero-desk.png"
              alt="Persona usando teléfono y laptop"
              width={800}
              height={600}
              className="h-full w-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-[#200020] text-white p-2 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
        aria-label="Abrir sección de ayuda"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Credit Steps */}
      <StepsCredit />

      {/* Credit simulation */}
      <SimularCredit />

      {/* Tabs */}
      <Tabs />

      {/* Help Section */}
      <HelpSection />

      {/* Requirements */}
      <Requirements />

      <Questions />

      {/* Descarga*/}
      <Descarga />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}